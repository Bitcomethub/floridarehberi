#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// Krem/bej koruma kapısı — GERÇEK RENDER katmanı
//
// palette-guard.mjs kaynak metnini tarar. Bu script tarayıcının fiilen
// BOYADIĞI rengi okur. İkisi farklı sorular:
//   • Kaynakta hiç krem hex'i yokken ekranda krem olabilir:
//       color-mix(in oklch, var(--color-sun) 12%, white)
//       opacity/alpha katmanları, gradient stop'ları, üçüncü parti CSS.
//   • Bant kuralı (BAND) tek kaynaktan import edilir — iki katman aynı
//     tanımı paylaşır, ayrışamaz.
//
// AKIŞ: npm run build → next start → varlık bütünlüğü → headless Chrome
//       (CDP) → her sayfada getComputedStyle → OKLCH → bant testi.
//
// NEDEN VARLIK BÜTÜNLÜĞÜ KONTROLÜ (LEARNINGS.md'den):
//   Stilsiz sayfa bu denetimi SAHTE geçer — CSS 500/404 dönerse her
//   backgroundColor rgba(0,0,0,0) olur ve "bej yok" çıkar. Bu yüzden
//   ölçümden ÖNCE: sunucu log'unda EADDRINUSE yok + HTML'deki her
//   /_next/static/**.{css,js} referansı 200. Çözülemeyen renk string'i
//   de sessizce geçmez, ihlal sayılır.
//
// Kullanım:
//   npm run palette:render                 # build varsa kullanır
//   npm run palette:render -- --rebuild    # önce yeniden build
//   npm run palette:render -- --port=4317
//   (node --experimental-websocket gerekir — npm script'i zaten veriyor)
// ─────────────────────────────────────────────────────────────────────────

import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { BAND, isWarmNeutral, parseColorFunction, hexToOklch, fmt } from './palette-guard.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const log = (...m) => console.log('[render-kapisi]', ...m);
const args = process.argv.slice(2);
const FLAGS = {
  rebuild: args.includes('--rebuild'),
  port: Number((args.find((a) => a.startsWith('--port=')) || '').split('=')[1]) || 0,
  maxPages: Number((args.find((a) => a.startsWith('--max=')) || '').split('=')[1]) || 30,
};

if (typeof WebSocket === 'undefined') {
  console.error('[render-kapisi] WebSocket yok. Çalıştırma: node --experimental-websocket scripts/check-render-palette.mjs');
  console.error('                (npm run palette:render bu bayrağı zaten veriyor)');
  process.exit(1);
}

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

// ── 1) Build ──────────────────────────────────────────────────────────────
function ensureBuild() {
  const buildId = path.join(ROOT, '.next', 'BUILD_ID');
  if (!FLAGS.rebuild && fs.existsSync(buildId)) {
    log('mevcut build kullanılıyor (.next/BUILD_ID) — yenilemek için --rebuild');
    return;
  }
  log('build alınıyor (npm run build — statik palet kapısı da bu yolda çalışır)…');
  const res = spawnSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' });
  if (res.status !== 0) {
    console.error('[render-kapisi] build başarısız — render kontrolü yapılamaz');
    process.exit(1);
  }
}

// ── 2) Sunucu ─────────────────────────────────────────────────────────────
async function startServer(port) {
  const child = spawn('npx', ['next', 'start', '-p', String(port)], { cwd: ROOT });
  let logBuf = '';
  child.stdout.on('data', (d) => { logBuf += d; });
  child.stderr.on('data', (d) => { logBuf += d; });

  const origin = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    // Sessiz ölüm senaryosu: port dolu → süreç ölür, eski sunucu yanıt verir.
    if (/EADDRINUSE/i.test(logBuf)) {
      console.error(`[render-kapisi] ✗ EADDRINUSE — ${port} portu başka bir süreçte. Ölçüm YAPILMADI.`);
      console.error(logBuf.slice(-600));
      child.kill('SIGKILL');
      process.exit(1);
    }
    if (child.exitCode !== null) {
      console.error('[render-kapisi] ✗ next start beklenmedik şekilde çıktı:', child.exitCode);
      console.error(logBuf.slice(-600));
      process.exit(1);
    }
    try {
      const res = await fetch(origin + '/', { redirect: 'manual' });
      if (res.status < 500) { log(`sunucu hazır: ${origin}`); return { child, origin, logBuf: () => logBuf }; }
    } catch { /* henüz ayakta değil */ }
    await sleep(300);
  }
  child.kill('SIGKILL');
  console.error('[render-kapisi] ✗ sunucu 60 sn içinde hazır olmadı');
  console.error(logBuf.slice(-600));
  process.exit(1);
}

// ── 3) Varlık bütünlüğü — stilsiz sayfa denetimi sahte geçer ──────────────
async function assertAssetsOk(origin) {
  const html = await (await fetch(origin + '/')).text();
  const refs = [...new Set([...html.matchAll(/["'(](\/_next\/static\/[^"')]+\.(?:css|js))/g)].map((m) => m[1]))];
  if (!refs.length) {
    console.error('[render-kapisi] ✗ HTML içinde /_next/static varlık referansı yok — sayfa stilsiz ölçülürdü');
    process.exit(1);
  }
  const bad = [];
  for (const ref of refs) {
    const res = await fetch(origin + ref);
    if (res.status !== 200) bad.push(`${ref} → HTTP ${res.status}`);
  }
  if (bad.length) {
    console.error('[render-kapisi] ✗ varlıklar 200 dönmüyor — ölçüm güvenilmez:');
    bad.forEach((b) => console.error('   ' + b));
    process.exit(1);
  }
  const css = refs.filter((r) => r.endsWith('.css')).length;
  log(`varlık bütünlüğü: ${refs.length} referans 200 (${css} CSS) — sayfa stilli ölçülecek`);
}

// ── 4) URL listesi: sitemap SSOT ──────────────────────────────────────────
async function collectUrls(origin) {
  const xml = await (await fetch(origin + '/sitemap.xml')).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((u) => new URL(u).pathname);
  const uniq = [...new Set(['/', ...paths, '/bulunamayan-sayfa-404-testi'])];
  return uniq.slice(0, FLAGS.maxPages);
}

// ── 5) CDP istemcisi (bağımlılık yok) ─────────────────────────────────────
class CDP {
  constructor(ws) {
    this.ws = ws; this.seq = 0; this.pending = new Map(); this.handlers = new Set();
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(typeof ev.data === 'string' ? ev.data : String(ev.data));
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      } else {
        this.handlers.forEach((h) => h(msg));
      }
    });
  }
  static connect(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      ws.addEventListener('open', () => resolve(new CDP(ws)), { once: true });
      ws.addEventListener('error', (e) => reject(new Error('CDP bağlantısı kurulamadı: ' + (e.message || ''))), { once: true });
    });
  }
  send(method, params = {}, sessionId) {
    const id = ++this.seq;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
      setTimeout(() => {
        if (this.pending.delete(id)) reject(new Error(`CDP zaman aşımı: ${method}`));
      }, 30_000);
    });
  }
  once(event, sessionId) {
    return new Promise((resolve) => {
      const h = (msg) => {
        if (msg.method === event && (!sessionId || msg.sessionId === sessionId)) {
          this.handlers.delete(h); resolve(msg.params);
        }
      };
      this.handlers.add(h);
    });
  }
}

async function startChrome() {
  const bin = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
  if (!bin) {
    console.error('[render-kapisi] ✗ Chrome bulunamadı. CHROME_PATH ile yol ver.');
    process.exit(1);
  }
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'palet-chrome-'));
  const child = spawn(bin, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--hide-scrollbars', '--force-color-profile=srgb',
    `--user-data-dir=${userDataDir}`, '--remote-debugging-port=0', 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  const portFile = path.join(userDataDir, 'DevToolsActivePort');
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (fs.existsSync(portFile)) {
      const [port, wsPath] = fs.readFileSync(portFile, 'utf8').trim().split('\n');
      if (port && wsPath) {
        const cdp = await CDP.connect(`ws://127.0.0.1:${port}${wsPath}`);
        log(`headless Chrome hazır (${path.basename(bin)})`);
        return { child, cdp, userDataDir };
      }
    }
    await sleep(150);
  }
  child.kill('SIGKILL');
  console.error('[render-kapisi] ✗ Chrome DevTools portu açılmadı');
  process.exit(1);
}

// ── 6) Sayfa içi toplayıcı ────────────────────────────────────────────────
// EN KRİTİK NOKTA: ham computed değeri test etmek YANLIŞ soruyu sorar.
//   background: rgba(255, 209, 102, 0.12)   → computed'da sun (C=0.135, bant
//   dışı) görünür, ama ekranda boyanan piksel #FFF6E5 — düpedüz krem.
// Doğru soru "piksel ne renk". Bu yüzden her elemanın ata zincirindeki
// zeminler beyaz üstüne sırayla 1×1 canvas'a boyanır ve piksel geri okunur.
// Alfa kompozitini, oklch/color-mix dönüşümünü tarayıcının kendisi yapar —
// sRGB matematiğini yeniden yazmıyoruz.
// Yaklaşıklık: kardeş elemanların üst üste binmesi ve arka plan görselleri
// hesaba katılmaz; gradient'ler ayrı yoldan (literal taraması) denetlenir.
const COLLECTOR = `(() => {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  const unsupported = [];
  const SENTINEL = '#010203';
  const setFill = (color) => {
    ctx.fillStyle = SENTINEL;
    try { ctx.fillStyle = color; } catch (e) { unsupported.push(color); return false; }
    if (ctx.fillStyle === SENTINEL && color.trim().toLowerCase() !== SENTINEL) {
      unsupported.push(color);
      return false;
    }
    return true;
  };
  const paint = (stack) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1, 1);
    for (const c of stack) if (setFill(c)) ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return 'rgb(' + d[0] + ', ' + d[1] + ', ' + d[2] + ')';
  };
  const EMPTY = ['rgba(0, 0, 0, 0)', 'transparent', ''];
  const stackFor = (el) => {
    const out = [];
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const bg = getComputedStyle(n).backgroundColor;
      if (EMPTY.indexOf(bg) === -1) out.unshift(bg);
    }
    return out;
  };
  const label = (el) => {
    const cls = (el.getAttribute('class') || '').split(' ').filter(Boolean).slice(0, 3).join('.');
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (cls ? '.' + cls : '');
  };
  const colors = new Map();
  const images = new Map();
  const record = (map, key, rec) => {
    const cur = map.get(key);
    if (cur) cur.count++; else map.set(key, Object.assign({ count: 1 }, rec));
  };

  const all = document.querySelectorAll('*');
  for (const el of all) {
    for (const pseudo of [null, '::before', '::after']) {
      const cs = getComputedStyle(el, pseudo);
      if (pseudo && cs.content === 'none') continue;
      const tag = pseudo || '';
      const bg = cs.backgroundColor;
      if (EMPTY.indexOf(bg) === -1) {
        const stack = pseudo ? stackFor(el).concat([bg]) : stackFor(el);
        const painted = paint(stack);
        record(colors, 'bg' + tag + '|' + bg + '|' + painted,
          { declared: bg, painted, source: 'background-color' + tag, sample: label(el) });
      }
      const img = cs.backgroundImage;
      if (img && img !== 'none') {
        record(images, 'img' + tag + '|' + img,
          { declared: img, source: 'background-image' + tag, sample: label(el) });
      }
    }
  }
  return {
    colors: Array.from(colors.values()),
    images: Array.from(images.values()),
    unsupported: Array.from(new Set(unsupported)),
    bodyDeclared: getComputedStyle(document.body).backgroundColor,
    bodyPainted: paint(stackFor(document.body)),
    elements: all.length,
  };
})()`;

// ── 7) Renk string'i → bant kararı ────────────────────────────────────────
// Çözülemeyen string SESSİZCE GEÇMEZ: "unresolved" ihlal sayılır (stilsiz
// sayfanın sahte yeşil vermesiyle aynı tuzak).
function classifyComputed(raw) {
  const findings = [];
  let parsedAny = false;
  const consider = (c, literal) => {
    if (!c) return;
    parsedAny = true;
    if (isWarmNeutral(c)) findings.push({ literal, c });
  };

  for (const m of raw.matchAll(/\b(rgba?|hsla?|oklch|oklab)\(([^()]*)\)/gi)) {
    consider(parseColorFunction(m[1], m[2]), m[0]);
  }
  for (const m of raw.matchAll(/#([0-9a-fA-F]{3,8})(?![0-9a-fA-F])/g)) {
    consider(hexToOklch(m[0]), m[0]);
  }
  // color(srgb r g b) — Chrome bazı durumlarda bu biçimi döndürür
  for (const m of raw.matchAll(/color\(\s*srgb\s+([^)]+)\)/gi)) {
    const parts = m[1].split('/')[0].trim().split(/\s+/).map(Number);
    if (parts.length >= 3 && parts.every((n) => !Number.isNaN(n))) {
      consider(parseColorFunction('rgb', `${parts[0] * 255} ${parts[1] * 255} ${parts[2] * 255}`), m[0]);
    }
  }
  const colorish = /rgb|hsl|oklch|oklab|#|color\(/i.test(raw);
  return { findings, unresolved: colorish && !parsedAny ? raw : null };
}

// Rapor için: bir renk bandın DIŞINDA ise hangi gerekçeyle?
function whyOutOfBand(c) {
  if (c.C < BAND.minC) return 'akromatik (tint yok)';
  if (c.C > BAND.maxC) return 'yüksek kroma — vurgu rengi';
  if (c.h < BAND.minH || c.h > BAND.maxH) return `bant dışı hue (${c.h.toFixed(0)}°)`;
  if (c.L < BAND.minL) return 'koyu ton';
  return 'BANT İÇİ';
}

// ── 8) Ana akış ───────────────────────────────────────────────────────────
async function main() {
  ensureBuild();
  const port = FLAGS.port || (await freePort());
  const server = await startServer(port);
  let chrome = null;
  const violations = [];
  const unresolved = [];
  const paintedSeen = new Map();
  let pagesChecked = 0, colorsChecked = 0;

  try {
    await assertAssetsOk(server.origin);
    const urls = await collectUrls(server.origin);
    log(`${urls.length} sayfa ölçülecek (sitemap + anasayfa + 404)`);

    chrome = await startChrome();
    const { targetId } = await chrome.cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await chrome.cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await chrome.cdp.send('Page.enable', {}, sessionId);
    await chrome.cdp.send('Emulation.setDeviceMetricsOverride',
      { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);

    for (const p of urls) {
      const loaded = chrome.cdp.once('Page.loadEventFired', sessionId);
      await chrome.cdp.send('Page.navigate', { url: server.origin + p }, sessionId);
      await Promise.race([loaded, sleep(15_000)]);
      await chrome.cdp.send('Runtime.evaluate',
        { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true }, sessionId);

      const { result } = await chrome.cdp.send('Runtime.evaluate',
        { expression: COLLECTOR, returnByValue: true }, sessionId);
      const data = result.value;
      pagesChecked++;

      for (const raw of data.unsupported) unresolved.push({ page: p, sample: '(canvas)', raw });

      // body zemini kuralın ana yüzeyi — ayrıca ve açıkça denetlenir.
      const records = [
        { declared: data.bodyDeclared, painted: data.bodyPainted, source: 'body', sample: 'body' },
        ...data.colors,
      ];
      for (const rec of records) {
        colorsChecked++;
        const seen = paintedSeen.get(rec.painted) || { count: 0, sample: rec.sample };
        seen.count += rec.count || 1;
        paintedSeen.set(rec.painted, seen);

        const res = classifyComputed(rec.painted);
        if (res.unresolved) unresolved.push({ page: p, sample: rec.sample, raw: res.unresolved });
        res.findings.forEach((f) => violations.push({ page: p, ...rec, ...f, layer: 'boyanmış piksel' }));
      }
      // Gradient'ler kompozit edilemez — durakları literal olarak denetlenir.
      for (const rec of data.images) {
        const res = classifyComputed(rec.declared);
        res.findings.forEach((f) => violations.push({ page: p, ...rec, painted: '(gradient durağı)', ...f, layer: 'gradient' }));
      }

      const bodyOk = data.bodyPainted === 'rgb(255, 255, 255)';
      log(`  ${p.padEnd(34)} ${String(data.elements).padStart(4)} eleman · ${String(data.colors.length).padStart(2)} zemin · body=${data.bodyPainted}${bodyOk ? '' : ' ⚠︎ (--color-page beklenirdi)'}`);
    }
  } finally {
    // Temizlik ASLA sonucu değiştirmez: Chrome SIGKILL sonrası profil
    // dizinine yazmayı sürdürebiliyor ve rmSync ENOTEMPTY ile patlıyordu —
    // yani GEÇEN bir koşu temizlik yüzünden kırmızıya dönüyordu.
    if (chrome) {
      chrome.child.kill('SIGKILL');
      await Promise.race([new Promise((r) => chrome.child.once('exit', r)), sleep(3000)]);
      for (let i = 0; i < 5; i++) {
        try { fs.rmSync(chrome.userDataDir, { recursive: true, force: true }); break; }
        catch { await sleep(200); }
      }
    }
    server.child.kill('SIGTERM');
  }

  console.log('');
  if (unresolved.length) {
    console.error(`[render-kapisi] ✗ ÇÖZÜLEMEYEN RENK — ${unresolved.length} adet (sessiz geçiş kabul edilmez):`);
    unresolved.slice(0, 10).forEach((u) => console.error(`   ${u.page} ${u.sample} → ${u.raw}`));
  }
  if (violations.length) {
    console.error(`[render-kapisi] ✗ EKRANDA KREM/BEJ — ${violations.length} bulgu:`);
    violations.slice(0, 25).forEach((v) =>
      console.error(`   ${v.page} ${v.sample} [${v.source}] ${v.literal} → ${fmt(v.c)}`));
  }
  if (violations.length || unresolved.length) process.exit(1);

  log(`✓ ${pagesChecked} sayfa · ${colorsChecked} render edilmiş zemin — hepsi sıcak nötr bandın DIŞINDA`);
  log(`  bant: L≥${BAND.minL} · C ${BAND.minC}–${BAND.maxC} · hue ${BAND.minH}°–${BAND.maxH}°`);
  log('  ekranda fiilen boyanan zeminler:');
  [...paintedSeen.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .forEach(([raw, meta]) => {
      const c = classifyComputed(raw).findings.length ? null : parseColorFunction('rgb', raw.replace(/rgba?\(|\)/g, ''));
      const why = c ? whyOutOfBand(c) : '?';
      const okl = c ? fmt(c) : '';
      console.log(`     ${raw.padEnd(22)} ×${String(meta.count).padStart(4)}  ${okl.padEnd(30)} ${why}`);
    });
}

main().catch((e) => { console.error('[render-kapisi] hata:', e); process.exit(1); });

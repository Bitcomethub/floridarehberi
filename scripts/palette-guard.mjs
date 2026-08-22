#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// Krem/bej koruma kapısı — floridarehberi
//
// NEDEN: "Krem/bej YASAK" (CLAUDE.md / tasarım sistemi). Kardeş yayın
// miamigezi o alanı tutuyor; iki site birbirine benzemeyecek. Bu kural
// bugüne kadar yalnız yazılı bir niyetti — bir sonraki "biraz sıcaklık
// katalım" düzenlemesi onu sessizce delerdi. Bu script kuralı
// ÇALIŞTIRILABİLİR hâle getirir: ihlalde exit 1.
//
// İKİ KATMAN, çünkü tek başına liste yetmez:
//   1) YASAK LİSTE — bilinen krem/bej hex değerleri.
//   2) SICAK NÖTR BANDI — asıl kapı. #E8DDD0 yasaklanınca bir sonraki
//      düzenleme #E9DECF yazar ve kural delinir. Bu yüzden her renk
//      literali (hex / rgb / hsl / oklch / isimli renk) OKLCH'e çevrilir
//      ve şu banda düşerse reddedilir:
//        açık (L ≥ 0.70) + tint var ama vurgu değil (0.0012 ≤ C ≤ 0.08)
//        + sıcak hue (40° ≤ h ≤ 118°)
//
// KALİBRASYON — ölçülmüş, tahmin değil:
//   yasak: #E8DDD0 L.903 C.021 h72 · #F2EDE7 L.948 C.010 h73
//          #C9B89E L.790 C.041 h79 · #FAFAF7 L.984 C.004 h107
//          #f5f1ea L.959 C.010 h82 · #FAF9F6 L.982 C.004 h91
//          beige   L.964 C.033 h107 · amber-50 L.987 C.021 h95
//   meşru: mist #EFF9F7 h183 (SOĞUK hue → bant dışı)
//          line #D4E7E3 h182 · line-strong #B4D4CE h183
//          sun  #FFD166 C.135 → bandın kroma tavanının 1.7 katı (VURGU)
//          beyaz #FFFFFF ve nötr gri #F5F5F5 → C=0.0000 (bant tint ister)
//   Yani bant, palete dokunmadan krem/bej ailesini kapatıyor. Bir renk
//   eklerken bu üç sayıya bak: soğuk hue, akromatik ya da yüksek kroma.
//
// KAPSAM: src/ ve public/ — yani RENDER'a giren her şey. scripts/ bilerek
// taranmıyor: yasak listesinin kendisi bu dosyada duruyor.
//
// Kullanım:
//   node scripts/palette-guard.mjs              # tarama (ihlalde exit 1)
//   node scripts/palette-guard.mjs --self-test  # kapının birim testi
//   node scripts/palette-guard.mjs --list       # çözülen tüm renkleri dök
// ─────────────────────────────────────────────────────────────────────────

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.PALETTE_ROOT || path.resolve(SCRIPT_DIR, '..');

const SCAN_ROOTS = ['src', 'public'];
const SCAN_EXT = new Set([
  '.css', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
  '.json', '.svg', '.html', '.webmanifest',
]);
const SKIP_DIR = new Set(['node_modules', '.next', '.git', '.vercel', 'out', 'dist', 'coverage']);

const log = (...m) => console.log('[palet-kapisi]', ...m);

// ── Bant tanımı (tek kaynak — render kontrolü de bunu import eder) ────────
export const BAND = {
  minL: 0.70,   // altı: koyu ton, krem olamaz
  minC: 0.0012, // altı: akromatik (beyaz / nötr gri) — serbest
  maxC: 0.08,   // üstü: doygun vurgu (sun C=0.135) — krem değil
  minH: 40,     // altı: mercan/blush bölgesi (coral h≈28) — bandın dışı
  maxH: 118,    // üstü: yeşil-sarı, palm bölgesine geçiş
};

export const BANNED_HEX = new Map([
  ['#e8ddd0', 'krem/bej — kardeş yayının alanı'],
  ['#f2ede7', 'krem/bej — kardeş yayının alanı'],
  ['#c9b89e', 'koyu bej / kum'],
  ['#fafaf7', 'sıcak kırık beyaz'],
  ['#f5f1ea', 'krem kağıt'],
  ['#faf9f6', 'sıcak kırık beyaz'],
]);

// Bandı tetikleyebilecek CSS isimli renkleri — karar yine banda ait,
// bu liste yalnız "hangi isimleri çözmeye değer" sorusunu yanıtlıyor.
export const NAMED_CANDIDATES = new Map([
  ['beige', '#f5f5dc'], ['antiquewhite', '#faebd7'], ['linen', '#faf0e6'],
  ['oldlace', '#fdf5e6'], ['ivory', '#fffff0'], ['wheat', '#f5deb3'],
  ['seashell', '#fff5ee'], ['floralwhite', '#fffaf0'], ['cornsilk', '#fff8dc'],
  ['blanchedalmond', '#ffebcd'], ['papayawhip', '#ffefd5'], ['bisque', '#ffe4c4'],
  ['moccasin', '#ffe4b5'], ['navajowhite', '#ffdead'], ['peachpuff', '#ffdab9'],
  ['lemonchiffon', '#fffacd'], ['palegoldenrod', '#eee8aa'],
  ['lightgoldenrodyellow', '#fafad2'], ['burlywood', '#deb887'], ['tan', '#d2b48c'],
]);

// Tailwind v4'te @theme tokenları VARSAYILAN paleti silmiyor — bg-stone-100
// hâlâ derlenir. Sisteme ait olmayan bu sıcak-nötr aile açıkça kapatılıyor.
const TW_WARM_RE =
  /\b(?:bg|text|border|ring|from|via|to|divide|outline|decoration|shadow|accent|caret|fill|stroke|placeholder)-(?:(stone)-(50|100|200|300)|(amber|orange|yellow)-(50|100|200))\b/g;

// ── Renk matematiği: her şey OKLCH'e indirgenir ───────────────────────────
function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function rgbToOklch(r, g, b) {
  const R = srgbToLinear(r / 255), G = srgbToLinear(g / 255), B = srgbToLinear(b / 255);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const Bb = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  let h = (Math.atan2(Bb, A) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { L, C: Math.hypot(A, Bb), h };
}

export function hexToOklch(hex) {
  let n = hex.replace('#', '').toLowerCase();
  if (n.length === 3 || n.length === 4) n = n.split('').map((c) => c + c).join('');
  if (n.length !== 6 && n.length !== 8) return null;
  const alpha = n.length === 8 ? parseInt(n.slice(6, 8), 16) / 255 : 1;
  const c = rgbToOklch(parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16));
  return { ...c, alpha };
}

function num(token, { pct = 1 } = {}) {
  if (token == null) return NaN;
  const t = String(token).trim().replace(/deg$/i, '');
  // CSS Color 4: eksik bileşen 'none' olarak serileşir (color-mix(..., transparent)
  // hue'yu powerless yapar). Kullanım değeri 0'dır — parse hatası DEĞİL.
  // Bunu NaN saymak, tarayıcıdan gelen meşru bir rengi "çözülemedi" diye
  // ihlal listesine düşürüyordu.
  if (t.toLowerCase() === 'none') return 0;
  if (t.endsWith('%')) return (parseFloat(t) / 100) * pct;
  return parseFloat(t);
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
  };
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}

function oklabToOklch(L, a, b) {
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { L, C: Math.hypot(a, b), h };
}

// rgb() / hsl() / oklch() / oklab() — Tailwind arbitrary value'larında
// boşluklar '_' olur (bg-[oklch(0.95_0.02_80)]); önce normalize ediliyor.
export function parseColorFunction(fn, argsRaw) {
  const norm = argsRaw.replace(/_/g, ' ').replace(/,/g, ' ');
  const [main, alphaRaw] = norm.split('/');
  const parts = main.trim().split(/\s+/).filter(Boolean);
  const alpha = alphaRaw != null ? num(alphaRaw) : 1;
  const kind = fn.toLowerCase();
  if (parts.length < 3) return null;
  if (kind === 'rgb' || kind === 'rgba') {
    const [r, g, b] = parts.slice(0, 3).map((p) => num(p, { pct: 255 }));
    if ([r, g, b].some(Number.isNaN)) return null;
    return { ...rgbToOklch(r, g, b), alpha: parts[3] != null ? num(parts[3]) : alpha };
  }
  if (kind === 'hsl' || kind === 'hsla') {
    const H = num(parts[0]), S = num(parts[1], { pct: 1 }), L = num(parts[2], { pct: 1 });
    if ([H, S, L].some(Number.isNaN)) return null;
    return { ...rgbToOklch(...hslToRgb(H, S, L)), alpha: parts[3] != null ? num(parts[3]) : alpha };
  }
  if (kind === 'oklch') {
    const L = num(parts[0], { pct: 1 }), C = num(parts[1], { pct: 0.4 }), H = num(parts[2]);
    if ([L, C, H].some(Number.isNaN)) return null;
    return { L, C, h: ((H % 360) + 360) % 360, alpha };
  }
  if (kind === 'oklab') {
    const L = num(parts[0], { pct: 1 }), a = num(parts[1], { pct: 0.4 }), b = num(parts[2], { pct: 0.4 });
    if ([L, a, b].some(Number.isNaN)) return null;
    return { ...oklabToOklch(L, a, b), alpha };
  }
  return null;
}

export function isWarmNeutral(c) {
  if (!c || Number.isNaN(c.L)) return false;
  if (c.alpha === 0) return false; // tamamen saydam → ekranda yok
  return (
    c.L >= BAND.minL &&
    c.C >= BAND.minC && c.C <= BAND.maxC &&
    c.h >= BAND.minH && c.h <= BAND.maxH
  );
}

export const fmt = (c) => `L=${c.L.toFixed(3)} C=${c.C.toFixed(4)} h=${c.h.toFixed(1)}°`;

// ── Metin tarayıcı ────────────────────────────────────────────────────────
function lineOf(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

export function scanText(text) {
  const hits = [];
  let resolved = 0;
  const push = (index, raw, rule, detail) => hits.push({ line: lineOf(text, index), raw, rule, detail });

  // 1) hex literalleri
  for (const m of text.matchAll(/#([0-9a-fA-F]{3,8})(?![0-9a-fA-F])/g)) {
    const digits = m[1];
    if (![3, 4, 6, 8].includes(digits.length)) continue;
    const c = hexToOklch(m[0]);
    if (!c) continue;
    resolved++;
    const key = '#' + (digits.length <= 4
      ? digits.slice(0, 3).split('').map((d) => d + d).join('')
      : digits.slice(0, 6)).toLowerCase();
    if (BANNED_HEX.has(key)) push(m.index, m[0], 'yasak-liste', BANNED_HEX.get(key));
    else if (isWarmNeutral(c)) push(m.index, m[0], 'sıcak-nötr-bandı', fmt(c));
  }

  // 2) fonksiyonel renkler — oklch() dahil (palet zaten oklch ile yazılı)
  for (const m of text.matchAll(/\b(rgba?|hsla?|oklch|oklab)\(([^()]*)\)/gi)) {
    const c = parseColorFunction(m[1], m[2]);
    if (!c) continue;
    resolved++;
    if (isWarmNeutral(c)) push(m.index, `${m[1]}(${m[2]})`, 'sıcak-nötr-bandı', fmt(c));
  }

  // 3) isimli renkler — yalnız DEĞER konumunda (Türkçe düz metinde 'tan',
  //    'linen' gibi kelimeler yanlış pozitif üretmesin diye)
  const namedRe = new RegExp(
    String.raw`(?::|,|\(|\b(?:bg|text|border|from|via|to|fill|stroke)-\[)\s*['"]?(` +
      [...NAMED_CANDIDATES.keys()].join('|') + String.raw`)\b`,
    'gi',
  );
  for (const m of text.matchAll(namedRe)) {
    const c = hexToOklch(NAMED_CANDIDATES.get(m[1].toLowerCase()));
    resolved++;
    if (isWarmNeutral(c)) push(m.index, m[1], 'isimli-krem', fmt(c));
  }

  // 4) Tailwind'in varsayılan sıcak-nötr ailesi
  for (const m of text.matchAll(TW_WARM_RE)) {
    push(m.index, m[0], 'tailwind-sıcak-nötr', 'sistem dışı palet — token kullan (bg-mist / bg-page / bg-ink)');
  }

  return { hits, resolved };
}

// ── Dosya gezintisi ───────────────────────────────────────────────────────
function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || SKIP_DIR.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (SCAN_EXT.has(path.extname(entry.name))) yield full;
  }
}

function scanRepo({ list = false } = {}) {
  const violations = [];
  let files = 0, resolved = 0;
  for (const root of SCAN_ROOTS) {
    const dir = path.join(ROOT, root);
    if (!fs.existsSync(dir)) continue;
    for (const file of walk(dir)) {
      files++;
      const text = fs.readFileSync(file, 'utf8');
      const res = scanText(text);
      resolved += res.resolved;
      for (const h of res.hits) violations.push({ ...h, file: path.relative(ROOT, file) });
    }
  }
  if (list) log(`${resolved} renk literali çözüldü, ${files} dosya`);
  return { violations, files, resolved };
}

// ── Self-test: iki yönlü (mutasyon yakalanmalı + meşru yazım geçmeli) ─────
// Tek yönlü test edilirse kapı ya delik kalır ya da paleti yanlışlıkla
// reddedip her düzenlemeyi kilitler.
function selfTest() {
  const mutations = [
    ['yasak hex (css)', 'body { background: #E8DDD0; }'],
    ['yasak hex küçük harf', 'body { background: #f5f1ea; }'],
    ['yasak hex alfa ile', '.x { background: #F2EDE7CC; }'],
    ['liste dışı yakın bej', '.x { background: #EFE7DA; }'],
    ['kısa hex (#eda)', '.x { background: #eda; }'],
    ['rgb() bej', '.x { background: rgb(232, 221, 208); }'],
    ['hsl() krem', '.x { background: hsl(38 32% 94%); }'],
    ['oklch() krem — paletin kendi dili', '--color-sand: oklch(0.95 0.02 80);'],
    ['tailwind arbitrary oklch (alt çizgili)', '<div className="bg-[oklch(0.95_0.02_80)]" />'],
    ['tailwind arbitrary hex', '<div className="bg-[#FAF9F6]" />'],
    ['isimli renk (css değeri)', '.x { background: beige; }'],
    ['isimli renk (JSX style)', "<div style={{ background: 'antiquewhite' }} />"],
    ['tailwind bg-stone-100', '<section className="bg-stone-100 px-4" />'],
    ['tailwind bg-amber-50', '<div className="rounded bg-amber-50" />'],
    ['SVG fill', '<svg><rect fill="#FAFAF7" /></svg>'],
    ['inline gradient stop', '.x { background: linear-gradient(90deg, #FFFFFF 0%, #F2EDE7 100%); }'],
    ['alfalı krem yıkama', '.x { background: rgba(232, 221, 208, 0.4); }'],
    ['oklch krem + alfa', '.x { background: oklch(0.95 0.02 80 / 0.6); }'],
  ];
  for (const [name, src] of mutations) {
    const { hits } = scanText(src);
    if (!hits.length) {
      console.error(`SELF-TEST FAIL: '${name}' YAKALANMALIYDI → ${src}`);
      process.exit(1);
    }
    log(`✓ mutasyon yakalandı: ${name} → ${hits[0].rule} (${hits[0].detail})`);
  }

  // Yanlış-pozitif sondaları: Coastal Calm'ın kendisi kapıdan geçmeli.
  const probes = [
    ['saf beyaz zemin', '--color-page: #ffffff;'],
    ['mist (soğuk)', '--color-mist: oklch(0.9741 0.0109 182.88); /* #EFF9F7 */'],
    ['line / line-strong', '--color-line: #D4E7E3; --color-line-strong: #B4D4CE;'],
    ['ink ailesi', '--color-ink: #0B2E2B; --color-ink-soft: #3A5C57; --color-mute: #55706C;'],
    ['sun vurgusu', '--color-sun: oklch(0.8803 0.1348 86.06); /* #FFD166 */'],
    ['coral ailesi', '--color-coral: #FF6B5E; --color-coral-deep: #C4372C;'],
    ['palm / sea', '--color-palm: #0E9F6E; --color-sea: #2AA8E0; --color-sea-deep: #0A6C93;'],
    ['nötr gri (akromatik)', '.x { background: #F5F5F5; color: rgb(250,250,250); }'],
    ['token sınıfları', '<section className="bg-mist text-ink border-line" />'],
    ['koyu bant', '<footer className="bg-ink text-mist" />'],
    ['Türkçe metinde krem/bej kelimesi', '// krem ve bej bu sitede yasak; beige kelimesi de düz metinde geçebilir'],
    ['JS tanımlayıcısı', 'const beige = 0; Math.tan(x);'],
    ['tailwind koyu amber (bej değil)', '<div className="text-amber-700" />'],
    ['mercan/blush yıkama (bant dışı hue)', '.x { background: #FFF1EF; }'],
    // Tarayıcıdan dönen gerçek bir değer: .band-ink .tide için
    // color-mix(in oklch, var(--color-mist) 26%, transparent) çıktısı.
    ['oklch none bileşeni (color-mix çıktısı)', '.x { background: oklch(0.974097 0.0109078 none / 0.26); }'],
    ['tamamen saydam', '.x { background: rgba(232, 221, 208, 0); }'],
  ];
  for (const [name, src] of probes) {
    const { hits } = scanText(src);
    if (hits.length) {
      console.error(`SELF-TEST FAIL: '${name}' YANLIŞ POZİTİF — geçmeliydi:`, hits);
      process.exit(1);
    }
    log(`✓ yanlış pozitif yok: ${name}`);
  }

  log(`SELF-TEST OK — ${mutations.length} mutasyon yakalandı, ${probes.length} meşru yazım geçti`);
}

// ── Ana akış ──────────────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) return selfTest();

  const { violations, files, resolved } = scanRepo({ list: args.includes('--list') });
  if (violations.length) {
    console.error('');
    console.error(`[palet-kapisi] ✗ KREM/BEJ İHLALİ — ${violations.length} bulgu`);
    for (const v of violations) {
      console.error(`  ${v.file}:${v.line}  ${v.raw}  → ${v.rule}  (${v.detail})`);
    }
    console.error('');
    console.error('  Kural: krem/bej bu yayında kullanılmaz (kardeş yayın miamigezi o alanı tutuyor).');
    console.error('  Zemin için: --color-page (#FFFFFF) veya --color-mist (#EFF9F7). Sıcaklık gerekiyorsa');
    console.error('  --color-sun / --color-coral VURGU olarak kullanılır, zemin yıkaması olarak değil.');
    process.exit(1);
  }
  log(`✓ krem/bej yok — ${files} dosya, ${resolved} renk literali çözüldü (src/ + public/)`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

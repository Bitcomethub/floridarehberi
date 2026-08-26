#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// Unsplash görsel indirme — TEK SEFERLİK araç, runtime bağımlılığı DEĞİL.
//
// Bu script siteyi çalıştırmaz. Bir kere koşar, `public/gorseller/` altına
// WebP dosyaları bırakır, dosyalar commit'lenir. Site hiçbir zaman Unsplash'e
// istek atmaz — `.env.local`'deki anahtar tarayıcıya HİÇ gitmez.
//
// LİSANS UYUMU — iki ayrı zorunluluk, ikisi de burada:
//   1) TETİKLEME UCU: bir fotoğraf fiilen kullanıldığında Unsplash'in
//      `links.download_location` ucuna istek atmak ZORUNLUDUR (API
//      Guidelines). Fotoğrafçının indirme sayacı böyle işler; atlamak
//      sessiz bir ihlaldir, hiçbir hata dönmez.
//   2) ATIF: fotoğrafçı adı + Unsplash, ikisi de linkli, UTM'li.
//      Atıf SİTEDE yapılır — bkz. `src/lib/unsplash.ts` ve
//      `src/components/ContentImage.tsx`. Bu script atfın VERİSİNİ üretir.
//
// KOTA: demo uygulama saatte 50 istek. Akış buna göre kurulu:
//   --search  → anahtar başına 1 arama  (20 istek)
//   --fetch   → seçilen başına 1 tetikleme (20 istek)   toplam 40 < 50
// Arama yanıtı fotoğraf nesnesinin TAMAMINI taşıdığı için ayrıca
// `GET /photos/:id` ÇAĞRILMAZ — o 20 istek daha olurdu ve kotayı aşardı.
// Görselin kendisi imgix CDN'inden iner, kotaya SAYILMAZ.
//
// KREM/BEJ KÜRASYONU: `check-render-palette.mjs` yalnız ZEMİN rengini ölçer;
// bir `<img>` içindeki kum bej'i kapıdan görünmez. Bu yüzden yasak, seçim
// anında uygulanır: Unsplash'in döndürdüğü baskın renk (`color`) palet
// kapısının KENDİ `isWarmNeutral()` fonksiyonundan geçirilir. Bej fotoğraf
// aday listesinde ⚠ ile işaretlenir.
//
// Kullanım:
//   node scripts/fetch-unsplash.mjs --search        # adayları tara
//   node scripts/fetch-unsplash.mjs --fetch         # seçilenleri indir
//   node scripts/fetch-unsplash.mjs --search --only=ehliyet
// ─────────────────────────────────────────────────────────────────────────

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isWarmNeutral, hexToOklch } from './palette-guard.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const OUT_DIR = path.join(ROOT, 'public', 'gorseller');
const CACHE = path.join(SCRIPT_DIR, '.unsplash-candidates.json');
const PICKS = path.join(SCRIPT_DIR, 'image-picks.json');
const META = path.join(SCRIPT_DIR, '.unsplash-meta.json');

const log = (...m) => console.log('[gorsel]', ...m);
const args = process.argv.slice(2);
const ONLY = (args.find((a) => a.startsWith('--only=')) || '').split('=')[1] || null;

// ── Genişlik bütçesi ──────────────────────────────────────────────────────
// Ana sayfa bandı sayfa genişliğinde (74rem ≈ 1184px), içerik bandı okuma
// kolonunda (46rem ≈ 736px). 2× DPR için sırasıyla ~2368 / ~1472 gerekir.
const WIDTH = { anasayfa: 2400, content: 1600 };
const QUALITY = 76;

// ── MANİFEST ──────────────────────────────────────────────────────────────
// `query` yazının GERÇEK konusundan türer. Kural: yazıda bir şehir/bölge
// geçiyorsa arama o şehre demirlenir; geçmiyorsa konunun kendisi aranır.
// Genel "Florida beach" ile doldurma YOK — `reason` her seçimin gerekçesi.
const MANIFEST = [
  // ── Ana sayfa ──
  { key: 'anasayfa', kind: 'anasayfa', query: 'Florida skyline',
    reason: 'Site eyalet geneli. YER İDDİASI TAŞIYAN konu → sorgu Florida’ya demirlendi; seçilen kare Unsplash location alanında Florida göstermek ZORUNDA.' },

  // ── Rehberler (şehir geçen: manifest o şehre demirlenir) ──
  { key: 'nerede-yasanir', kind: 'content', query: 'Tampa Florida downtown skyline',
    reason: 'Bölge karşılaştırması; metinde Tampa ×10 ve Jacksonville ×10 en çok geçenler. (İlk sorgu «Tampa Bay skyline waterfront» tek sonuç döndürdü.)' },
  { key: 'yasam-maliyeti', kind: 'content', query: 'downtown Orlando skyline lake',
    reason: 'Metinde Orlando ×10 ile başı çekiyor (Tampa ×8, Miami ×7).' },
  { key: 'ev-kiralamak', kind: 'content', query: 'Miami residential apartment building palm',
    reason: 'Kiralama bölümünde geçen tek şehir Miami (×3).' },
  { key: 'ehliyet', kind: 'content', query: 'Florida highway road palm trees driving',
    reason: 'Şehir geçmiyor; konu sürüş — eyalet yolu görsel karşılığı.' },
  { key: 'arac-sahibi-olmak', kind: 'content', query: 'Florida street parked cars palm trees',
    reason: 'Sokak sahnesi yer iddiası taşır (palmiyeli cadde Kaliforniya da olabilir) → Florida’ya demirlendi.' },
  { key: 'okul-sistemi', kind: 'content', query: 'yellow school bus',
    reason: 'İlk seçimin arka planı tepelikti — Florida düpedüz düz, görsel çelişki. Konu SÜREÇ → yer iddiası taşımayan yakın plan otobüs güvenli.' },
  { key: 'saglik-sistemi', kind: 'content', query: 'health insurance form clipboard stethoscope',
    reason: 'İlk seçim (Ytcp0r7SIE4) ekranda «SPRINGBANK MEDICAL CENTRE» tabelası taşıyordu — Londra, Ontario; kural gereği kullanılamaz. «Florida hospital» sorgusu da tanımlı Florida hastanesi döndürmedi (Red Cross binaları çıktı, konuyla ilgisiz). Bölüm SİGORTA/sistem anlatıyor → yer iddiası taşımayan NESNE çekimi hem güvenli hem daha yerinde.' },
  { key: 'vergiler', kind: 'content', query: 'florida county courthouse government building',
    reason: 'Miami-Dade anılıyor; vergi/ilçe yönetimi görsel karşılığı adliye/idare binası.' },
  { key: 'banka-ve-kredi', kind: 'content', query: 'credit card payment hand bank',
    reason: 'Şehir geçmiyor; konu banka hesabı ve KREDİ geçmişi — kart/ödeme, bina cephesinden daha somut. (İlk sorgu yalnız jenerik bina cepheleri döndürdü.)' },
  { key: 'kasirga-sezonu', kind: 'content', query: 'Florida hurricane palm trees storm',
    reason: 'Konu doğrudan Florida kasırga sezonu → GERÇEK Florida şart. Yaklaşan fırtına; felaket/enkaz görüntüsü DEĞİL.' },

  // ── Blog (hiçbirinde şehir geçmiyor → konu bazlı) ──
  { key: 'floridada-elektrik-su-internet-nasil-baglanir', kind: 'content',
    query: 'electricity meter box wall',
    reason: 'İlk seçim tipik Florida’ya benzemeyen (koyu ahşap cephe, ılıman bitki) bir evdi. Konu SÜREÇ/abonelik → yer iddiası taşımayan NESNE çekimi güvenli.' },
  { key: 'floridada-arac-muayenesi-var-mi', kind: 'content',
    query: 'car mechanic garage vehicle inspection',
    reason: 'Şehir geçmiyor; konu araç muayenesi.' },
  { key: 'floridada-yaz-elektrik-faturasi-neden-yuksek', kind: 'content',
    query: 'air conditioning unit house exterior summer',
    reason: 'Şehir geçmiyor; konu yaz kliması ve elektrik faturası.' },
  { key: 'florida-kira-sozlesmesinde-nelere-dikkat-edilir', kind: 'content',
    query: 'signing lease contract document house keys',
    reason: 'Şehir geçmiyor; konu kira sözleşmesi.' },
  { key: 'florida-hoa-aidati-nedir-ne-icerir', kind: 'content',
    query: 'Florida gated community aerial homes',
    reason: 'Mahalle sahnesi yer iddiası taşır → Florida’ya demirlendi. (İlk Florida sorgusu tek ve alakasız sonuç döndürdü.)' },
  { key: 'florida-ehliyet-yazili-sinavina-nasil-hazirlanilir', kind: 'content',
    query: 'student studying notes desk exam preparation',
    reason: 'Şehir geçmiyor; konu YAZILI sınav hazırlığı (yol değil, masa başı).' },
  { key: 'florida-arac-sigortasi-nasil-secilir', kind: 'content',
    query: 'cars parking lot aerial view',
    reason: 'Şehir geçmiyor; konu araç sigortası karşılaştırması.' },
  { key: 'florida-devlet-okuluna-kayit-icin-gereken-belgeler', kind: 'content',
    query: 'documents forms paperwork desk',
    reason: 'Şehir geçmiyor; konu kayıt BELGELERİ. (İlk sorgu SIFIR sonuç döndürdü.)' },
  { key: 'amerikada-acil-servise-gitmeden-once-bilinmesi-gerekenler', kind: 'content',
    query: 'Florida hospital emergency entrance',
    reason: 'Yazı ABD geneli («Amerika’da acil servis») ama ilk seçimin (Exh5m8sgCBQ) kayıtlı yeri Rome, Georgia çıktı — karede tanımlayıcı bir ad görünmüyor, yine de kardeş projedeki «Chinook Regional Hospital, Alberta» vakasıyla aynı şekil. Önce Florida denenir.' },
];

// ── Anahtar ───────────────────────────────────────────────────────────────
// .env.local'den okunur. Kabuk komutuna ASLA yazılmaz (bkz. gizlilik kuralı).
function accessKey() {
  if (process.env.UNSPLASH_ACCESS_KEY) return process.env.UNSPLASH_ACCESS_KEY;
  const envFile = path.join(ROOT, '.env.local');
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
      const m = line.match(/^\s*UNSPLASH_ACCESS_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, '');
    }
  }
  console.error('[gorsel] UNSPLASH_ACCESS_KEY yok (.env.local ya da ortam).');
  process.exit(1);
}

const KEY = accessKey();
let spent = 0;

async function api(url) {
  spent++;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${KEY}`, 'Accept-Version': 'v1' },
  });
  const remaining = res.headers.get('x-ratelimit-remaining');
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Unsplash ${res.status} (kalan kota: ${remaining ?? '?'}) — ${body.slice(0, 200)}`);
  }
  return { json: await res.json(), remaining };
}

/** Baskın rengi palet kapısının BANT kuralından geçirir. */
function warmFlag(hex) {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return '';
  const c = hexToOklch(hex);
  return c && isWarmNeutral(c) ? ' ⚠KREM' : '';
}

// ── 1) ARAMA ──────────────────────────────────────────────────────────────
async function search() {
  const items = MANIFEST.filter((m) => !ONLY || m.key === ONLY);
  const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
  log(`${items.length} anahtar aranacak — tahmini ${items.length} istek (kota 50/saat)`);

  for (const item of items) {
    const url = new URL('https://api.unsplash.com/search/photos');
    url.searchParams.set('query', item.query);
    url.searchParams.set('per_page', '8');
    url.searchParams.set('orientation', 'landscape');
    url.searchParams.set('content_filter', 'high');

    const { json, remaining } = await api(url.toString());
    cache[item.key] = { query: item.query, reason: item.reason, results: json.results };

    console.log(`\n── ${item.key}  «${item.query}»  (kalan kota: ${remaining})`);
    json.results.forEach((p, i) => {
      const desc = (p.description || p.alt_description || '(açıklama yok)').replace(/\s+/g, ' ').slice(0, 68);
      console.log(
        `   [${i}] ${p.id.padEnd(12)} ${p.color}${warmFlag(p.color).padEnd(7)} ` +
        `${String(p.width).padStart(5)}×${String(p.height).padEnd(5)} ` +
        `${(p.user.name || '').slice(0, 22).padEnd(23)} ${desc}`
      );
    });
    fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
  }
  log(`\nbitti — ${spent} istek harcandı. Seçimleri ${path.relative(ROOT, PICKS)} dosyasına yaz.`);
}

// ── 2) İNDİRME ────────────────────────────────────────────────────────────
async function fetchPicked() {
  if (!fs.existsSync(PICKS)) {
    console.error(`[gorsel] ${path.relative(ROOT, PICKS)} yok — önce --search çalıştır ve seçimleri yaz.`);
    process.exit(1);
  }
  const picks = JSON.parse(fs.readFileSync(PICKS, 'utf8'));
  const cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
  const sharp = (await import('sharp')).default;
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const meta = fs.existsSync(META) ? JSON.parse(fs.readFileSync(META, 'utf8')) : {};

  for (const item of MANIFEST) {
    if (ONLY && item.key !== ONLY) continue;
    const wanted = picks[item.key];
    if (!wanted) { log(`⊘ ${item.key} — seçim yok, atlanıyor`); continue; }

    const photo = (cache[item.key]?.results || []).find((p) => p.id === wanted.id);
    if (!photo) throw new Error(`${item.key}: ${wanted.id} önbellekte yok — --search tazele`);

    // (1) ZORUNLU tetikleme ucu. Atlanırsa fotoğrafçının sayacı işlemez.
    const { remaining } = await api(`${photo.links.download_location}`);

    // (2) Görsel imgix'ten iner — kotaya sayılmaz.
    const width = WIDTH[item.kind];
    const src = new URL(photo.urls.raw);
    src.searchParams.set('w', String(width));
    src.searchParams.set('fit', 'max');
    src.searchParams.set('fm', 'jpg');
    src.searchParams.set('q', '90');

    const bin = Buffer.from(await (await fetch(src.toString())).arrayBuffer());
    const file = path.join(OUT_DIR, `${item.key}.webp`);
    const out = await sharp(bin).webp({ quality: QUALITY }).toBuffer();
    fs.writeFileSync(file, out);
    const dim = await sharp(out).metadata();
    const blurDataURL = await makeBlur(sharp, out);

    // Önceki `--verify` sonucunu KORU: burada nesneyi komple değiştirmek
    // `location` alanını sessizce düşürür ve doğrulanmış yer bilgisi kaybolur.
    meta[item.key] = {
      ...(meta[item.key]?.location ? { location: meta[item.key].location,
                                       locationIsFlorida: meta[item.key].locationIsFlorida } : {}),
      file: `/gorseller/${item.key}.webp`,
      width: dim.width,
      height: dim.height,
      bytes: out.length,
      blurDataURL,
      photoId: photo.id,
      photographer: photo.user.name,
      username: photo.user.username,
      color: photo.color,
      warmNeutral: Boolean(warmFlag(photo.color)),
      unsplashDescription: photo.description || photo.alt_description || null,
      query: item.query,
      reason: item.reason,
    };
    fs.writeFileSync(META, JSON.stringify(meta, null, 2));
    log(`✓ ${item.key.padEnd(50)} ${String(dim.width)}×${dim.height} ` +
        `${(out.length / 1024).toFixed(0).padStart(4)}KB  ${photo.user.name}${warmFlag(photo.color)} (kota: ${remaining})`);
  }
  log(`bitti — ${spent} istek harcandı. Meta: ${path.relative(ROOT, META)}`);
}

/**
 * Bulanık önizleme: 16px genişliğinde WebP, base64 data URL.
 * next/image `placeholder="blur"` bunu CSS zemin olarak büyütüp bulanıklaştırır;
 * ~300–600 bayt, HTML'e gömülüyor, ayrı istek yok.
 */
async function makeBlur(sharp, buf) {
  const tiny = await sharp(buf).resize(16, null, { fit: 'inside' }).webp({ quality: 45 }).toBuffer();
  return `data:image/webp;base64,${tiny.toString('base64')}`;
}

/** İnmiş dosyalardan blur'ları yeniden üretir — API çağrısı YOK. */
async function blurOnly() {
  const sharp = (await import('sharp')).default;
  const meta = JSON.parse(fs.readFileSync(META, 'utf8'));
  for (const [key, m] of Object.entries(meta)) {
    const file = path.join(ROOT, 'public', m.file.replace(/^\//, ''));
    if (!fs.existsSync(file)) { log(`⊘ ${key} — dosya yok`); continue; }
    m.blurDataURL = await makeBlur(sharp, fs.readFileSync(file));
    log(`✓ ${key.padEnd(50)} blur ${String(m.blurDataURL.length).padStart(4)} bayt`);
  }
  fs.writeFileSync(META, JSON.stringify(meta, null, 2));
  log('blur üretimi bitti — API çağrısı yapılmadı');
}

/**
 * Seçilen fotoğrafın Unsplash'teki KAYITLI YERİNİ okur (`GET /photos/:id`).
 *
 * NEDEN GEREKLİ: arama yanıtı `location` alanını TAŞIMAZ. Bir fotoğrafın
 * açıklaması yer adı içermiyor diye yerinin belirsiz olduğu sonucu çıkmaz —
 * kayıtlı yeri Florida dışı olabilir. Yer iddiası taşıyan konularda
 * (şehir/manzara/mahalle) bu doğrulama atlanmaz.
 */
async function verifyLocations() {
  const picks = JSON.parse(fs.readFileSync(PICKS, 'utf8'));
  const meta = fs.existsSync(META) ? JSON.parse(fs.readFileSync(META, 'utf8')) : {};
  for (const key of Object.keys(picks)) {
    if (key === '_') continue;
    if (ONLY && key !== ONLY) continue;
    const { json, remaining } = await api(`https://api.unsplash.com/photos/${picks[key].id}`);
    const loc = json.location || {};
    const where = [loc.name, loc.city, loc.country].filter(Boolean).join(' · ') || '(kayıtlı yer yok)';
    const fl = /florida|,\s*FL\b|miami|orlando|tampa|jacksonville|tallahassee|naples/i.test(where);
    if (meta[key]) { meta[key].location = where; meta[key].locationIsFlorida = fl; }
    log(`${fl ? 'FL ' : '?? '}${key.padEnd(50)} ${where}   (kota: ${remaining})`);
  }
  fs.writeFileSync(META, JSON.stringify(meta, null, 2));
}

if (args.includes('--verify')) await verifyLocations();
else if (args.includes('--blur')) await blurOnly();
else if (args.includes('--search')) await search();
else if (args.includes('--fetch')) await fetchPicked();
else {
  console.log('Kullanım: --search | --fetch | --blur | --verify   [--only=<anahtar>]');
  process.exit(1);
}

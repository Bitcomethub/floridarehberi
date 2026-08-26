#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// YER İDDİASI KAPISI — "gerçek Florida ya da hiç yer yok"
//
// NEDEN VAR: bir fotoğraf tanımlı bir yeri gösteriyorsa (şehir silueti,
// adı okunan bir bina, bir mahalle) ve o yer Florida DEĞİLSE, sayfa okuru
// yanlış bir yere inandırır. Alt metni "temsilî" diye yumuşatmak bunu
// ÇÖZMEZ — okur fotoğrafa bakar, alt metni okumaz.
//
// Kardeş projede yaşandı: bir hastane tabelası fotoğrafı «Chinook Regional
// Hospital, Lethbridge, Alberta», bir cami fotoğrafı Abu Dabi çıktı. Bu
// projede de ilk turda «SPRINGBANK MEDICAL CENTRE» (Londra, Ontario)
// seçilmişti ve gözle yakalandı — gözle yakalamak kapı değildir.
//
// KURAL: `place === null`  → nesne/süreç çekimi, yer iddiası yok, SERBEST.
//        `place !== null`  → Florida işareti taşımak ZORUNDA.
//
// Kullanım: npm run images:check | npm run images:test
// ─────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY = path.join(ROOT, 'src/content/images/index.ts');
const log = (...m) => console.log('[yer-kapisi]', ...m);

/** Florida işaretleri — eyalet adı, "FL" kısaltması ve başlıca yerleşimler. */
export const FLORIDA = new RegExp(
  [
    'florida', '\\\\bFL\\\\b',
    'miami', 'miami beach', 'miami-dade', 'little havana', 'coral gables',
    'orlando', 'lake eola', 'kissimmee', 'winter park',
    'tampa', 'st\\\\.? petersburg', 'clearwater', 'hillsborough',
    'jacksonville', 'tallahassee', 'gainesville', 'ocala', 'pensacola',
    'naples', 'sarasota', 'fort lauderdale', 'fort myers', 'cape coral',
    'boca raton', 'palm beach', 'daytona', 'key west', 'florida keys',
    'everglades', 'sanibel', 'destin', 'venetian islands', 'brickell',
  ].join('|'),
  'i',
);

/** Kayıt defterinden `key`, `place` ve `alt` çiftlerini çıkarır. */
export function parseRegistry(source) {
  const out = [];
  const block = /'([^']+)':\s*\{([\s\S]*?)\n  \},/g;
  for (const m of source.matchAll(block)) {
    const body = m[2];
    const place = /place:\s*null/.test(body)
      ? null
      : (body.match(/place:\s*'((?:[^'\\]|\\.)*)'/) || [])[1];
    out.push({ key: m[1], place, hasField: /place:/.test(body) });
  }
  return out;
}

export function violations(entries) {
  const bad = [];
  for (const e of entries) {
    if (!e.hasField) { bad.push(`${e.key}: 'place' alanı YOK — yer iddiası var mı, açıkça belirt`); continue; }
    if (e.place === null || e.place === undefined) continue; // nesne çekimi
    if (!FLORIDA.test(e.place)) bad.push(`${e.key}: yer «${e.place}» Florida DEĞİL`);
  }
  return bad;
}

// ── Kendi kendini test: mutasyon YAKALANMALI, meşru yazım GEÇMELİ ────────
function selfTest() {
  const mk = (place) =>
    `export const IMAGES = {\n  'x': {\n    src: '/a.webp',\n    ${place}\n    alt: 'a',\n  },\n};`;
  const mutations = [
    ["Alberta hastanesi", mk("place: 'Chinook Regional Hospital, Lethbridge, Alberta',")],
    ["Abu Dabi camii", mk("place: 'Sheikh Zayed Grand Mosque, Abu Dhabi',")],
    ["Ontario tıp merkezi", mk("place: 'Springbank Medical Centre, London, Ontario',")],
    ["Kaliforniya sahili", mk("place: 'Santa Monica, California',")],
    ["Havana (Küba) — Little Havana değil", mk("place: 'Havana, Cuba',")],
    ["place alanı hiç yok", `export const IMAGES = {\n  'x': {\n    src: '/a.webp',\n    alt: 'a',\n  },\n};`],
  ];
  const legit = [
    ["nesne çekimi (yer yok)", mk("place: null,")],
    ["Tallahassee", mk("place: 'Tallahassee, Florida',")],
    ["Little Havana", mk("place: 'Little Havana, Miami, Florida',")],
    ["Naples FL", mk("place: 'Naples, FL',")],
    ["Lake Eola", mk("place: 'Lake Eola Park, Orlando, FL',")],
    ["Venetian Islands", mk("place: 'Venetian Islands, Miami, Florida',")],
  ];
  let fail = 0;
  for (const [name, src] of mutations) {
    const v = violations(parseRegistry(src));
    if (v.length) log(`✓ mutasyon yakalandı: ${name}`);
    else { console.error(`[yer-kapisi] ✗ KAÇTI: ${name}`); fail++; }
  }
  for (const [name, src] of legit) {
    const v = violations(parseRegistry(src));
    if (!v.length) log(`✓ yanlış pozitif yok: ${name}`);
    else { console.error(`[yer-kapisi] ✗ MEŞRU YAZIM REDDEDİLDİ: ${name} → ${v[0]}`); fail++; }
  }
  if (fail) { console.error(`[yer-kapisi] SELF-TEST BAŞARISIZ — ${fail} sorun`); process.exit(1); }
  log(`SELF-TEST OK — ${mutations.length} mutasyon yakalandı, ${legit.length} meşru yazım geçti`);
}

const isMain = process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  if (process.argv.includes('--self-test')) selfTest();
  else {
    const entries = parseRegistry(fs.readFileSync(REGISTRY, 'utf8'));
    const bad = violations(entries);
    if (bad.length) {
      console.error('[yer-kapisi] ✗ Florida DIŞI yer iddiası:');
      bad.forEach((b) => console.error('   ' + b));
      console.error('   Kural: fotoğraf tanımlı bir yer gösteriyorsa o yer Florida olmak zorunda;');
      console.error('   göstermiyorsa place: null yaz. "Temsilî" demek yeterli DEĞİL.');
      process.exit(1);
    }
    const withPlace = entries.filter((e) => e.place);
    log(`✓ ${entries.length} görsel — ${withPlace.length} gerçek Florida yeri, ${entries.length - withPlace.length} yer iddiasız nesne çekimi`);
  }
}

#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// Günlük içerik üretim hattı — floridarehberi
//
// miamigezi'deki hattın uyarlaması. Akış aynı: backlog'dan sıradaki konu →
// model (structured output) → kalite kapısı (1 kez otomatik retry, ikinci
// başarısızlıkta insan incelemesine düşür) → src/content/blog/generated-posts.json'a
// append + backlog güncelle. Sitemap otomatik büyür (sitemap.ts ALL_POSTS'tan
// türer); IndexNow ping'i workflow'da push SONRASI atılır.
//
// UYARLAMA FARKLARI (miamigezi'den bilinçli olarak ayrılan yerler):
//   • Kapı bu sitenin İKİ SERT YASAĞINI makine düzeyinde uygular:
//     (a) vize / göçmenlik / oturum izni konusu — kapsam dışı, ihlal = ret.
//         Gerekçe mimari: bu alan ayrı bir yayında ele alınıyor, burada
//         yanlış bilginin bedeli ağır ve konu bilinçli olarak kapatıldı.
//     (b) uydurma istatistik VE uydurma yorum/okur hikâyesi.
//   • İzinli alan adları Florida/ABD resmî kurumlarıdır (seyahat kurumları
//     değil): FLHSMV, floridarevenue, fldoe, healthcare.gov, nhc.noaa.gov...
//   • Marka gerçekleri public/llms.txt'ten okunur; kanonik varlık
//     Florida Rehberi + yayıncı MiamiLi Media'dır.
//
// Dedupe garantileri:
//   1. Aynı güne ikinci yayın yok (generated-posts içinde bugünün tarihi varsa çık).
//   2. Slug tekilliği: backlog slug'ı mevcut slug'larla (10 rehber + seed
//      yazılar + üretilmiş yazılar) çakışırsa 'skipped_duplicate', sıradakine geç.
//   3. Yayımlanan konu backlog'da 'published' olur, bir daha seçilmez.
//
// Kullanım:
//   OPENROUTER_API_KEY=... node scripts/generate-blog-post.mjs     # gerçek üretim
//   node scripts/generate-blog-post.mjs --mock --dry-run           # API'siz uçtan uca prova
//   node scripts/generate-blog-post.mjs --self-test                # kalite kapısı birim testi
//   Flags: --dry-run (dosya yazma), --mock (API yerine fixture),
//          --date=YYYY-MM-DD (tarih override, test için)
// ─────────────────────────────────────────────────────────────────────────

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
// PIPELINE_ROOT: testlerin scratch dizinine yönlenebilmesi için override edilebilir.
const ROOT = process.env.PIPELINE_ROOT || path.resolve(SCRIPT_DIR, '..');

const PATHS = {
  backlog: path.join(ROOT, 'content', 'blog-topic-backlog.json'),
  generated: path.join(ROOT, 'src', 'content', 'blog', 'generated-posts.json'),
  seed: path.join(ROOT, 'src', 'content', 'blog', 'seed.ts'),
  guidesDir: path.join(ROOT, 'src', 'content', 'guides'),
  llmsTxt: path.join(ROOT, 'public', 'llms.txt'),
  rejectedDir: path.join(ROOT, 'content', 'rejected-drafts'),
  mockFixture: path.join(SCRIPT_DIR, 'fixtures', 'mock-post.json'),
};

const SITE = 'https://floridarehberi.com';
// Model env ile değiştirilebilir. Tüm projeler OpenRouter üzerinden çalışır.
// DİKKAT — model seçimi: Gemini 3.x "thinking" modelleri bu hatta
// KULLANILMAZ. Structured output çağrısında düşünme bütçesini tüketip
// content alanını BOŞ döndürüyorlar; hat sessizce her gün needs_review'a
// düşer. Doğrulanmış varsayılan: anthropic/claude-sonnet-5.
const MODEL = process.env.BLOG_MODEL || 'anthropic/claude-sonnet-5';

const args = process.argv.slice(2);
const FLAGS = {
  dryRun: args.includes('--dry-run'),
  mock: args.includes('--mock'),
  selfTest: args.includes('--self-test'),
  date: (args.find((a) => a.startsWith('--date=')) || '').split('=')[1] || null,
};

const log = (...m) => console.log('[icerik-hatti]', ...m);
const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const writeJSON = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

// ── Tarih (UTC gün bazlı — cron UTC çalışır) ──────────────────────────────
function todayISO() {
  if (FLAGS.date) return FLAGS.date;
  return new Date().toISOString().slice(0, 10);
}

// ── Kanonik marka gerçekleri: llms.txt makine-okunur SSOT'tan çekilir ─────
// Modelin Florida Rehberi/MiamiLi Media hakkında söylemesine izin verilen TEK
// veri kümesi budur. llms.txt değişirse prompt da kendiliğinden değişir.
function loadBrandFacts() {
  const txt = fs.readFileSync(PATHS.llmsTxt, 'utf8');
  const grab = (re, fallback) => (txt.match(re) || [, fallback])[1].trim();
  return {
    publisher: grab(/- Publisher:\s*(.+)/, 'MiamiLi Media'),
    contact: grab(/- Contact:\s*(.+)/, 'erman@miamili.com'),
    positioning: grab(
      /- Positioning:\s*(.+)/,
      'Florida Rehberi is a reference handbook, not a service provider. It sells nothing and carries no affiliate links.'
    ),
    editorial: grab(
      /- Editorial rule:\s*(.+)/,
      'No invented prices, statistics or testimonials. Volatile figures are not stated as fixed numbers.'
    ),
    scope: grab(
      /- Scope limit:\s*(.+)/,
      'Visa, residence permit and immigration status are deliberately out of scope and are never covered.'
    ),
  };
}

// ── Mevcut slug'lar: 10 rehber + seed yazılar + üretilmiş yazılar ─────────
// Rehber slug'ları da toplanır: /ehliyet ile /blog/ehliyet teknik olarak
// çakışmaz ama AYNI sorguyu hedefler — kanibalizasyon.
function loadExistingSlugs() {
  const generated = readJSON(PATHS.generated).map((p) => p.slug);
  const fromTs = (file) =>
    [...fs.readFileSync(file, 'utf8').matchAll(/^\s*slug:\s*'([^']+)'/gm)].map((m) => m[1]);

  const seed = fromTs(PATHS.seed);
  const guides = fs
    .readdirSync(PATHS.guidesDir)
    .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts')
    .flatMap((f) => fromTs(path.join(PATHS.guidesDir, f)));

  return new Set([...guides, ...seed, ...generated]);
}

// ── Konu seçimi ───────────────────────────────────────────────────────────
function pickTopic(backlog, existingSlugs) {
  const pending = backlog.topics
    .filter((t) => t.status === 'pending')
    .sort((a, b) => (a.priority ?? 9) - (b.priority ?? 9));
  for (const topic of pending) {
    if (existingSlugs.has(topic.slug)) {
      topic.status = 'skipped_duplicate';
      log(`slug çakışması, atlandı: ${topic.slug}`);
      continue;
    }
    return topic;
  }
  return null;
}

// ── Türkçe-toleranslı normalizasyon (answer-first örtüşme kontrolü için) ──
const TR_MAP = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', İ: 'i' };
function normalizeWord(w) {
  return w
    .toLocaleLowerCase('tr')
    .split('')
    .map((c) => TR_MAP[c] ?? c)
    .join('')
    .replace(/[^a-z0-9]/g, '');
}
// DİKKAT: liste normalize edilmiş hâliyle tutulur. Diacritic'li yazılırsa
// ('nasıl') hiçbir zaman eşleşmez, çünkü karşılaştırma normalize edilmiş
// kelimeyle yapılıyor — sessizce etkisiz bir stopword listesi olur.
const STOPWORDS = new Set(
  [
    'için', 'nasıl', 'nedir', 'neler', 'nelerdir', 'hangi', 'hangisi', 'ile',
    'veya', 'gibi', 'daha', 'olarak', 'olan', 'bir', 'mi', 'mı', 'mu', 'mü',
    'yapmak', 'almak', 'gerekir', 'gerekiyor', 'olmak', 'etmek',
    'florida', 'floridada', 'floridaya', 'abd', 'abdde', 'amerika',
    'amerikada', 'eyalet', 'eyalette', 'türkler', 'türkiye',
  ].map(normalizeWord)
);
function significantStems(text) {
  return text
    .split(/\s+/)
    .map(normalizeWord)
    .filter((w) => w.length >= 5 && !STOPWORDS.has(w))
    .map((w) => w.slice(0, 5));
}

const words = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
const firstSentence = (s) => ((s || '').match(/^.*?[.!]/s) || [s || ''])[0].trim();
const sentences = (s) => (s || '').split(/(?<=[.!?])\s+/).filter(Boolean);

// ── Kalite kapısı sabitleri ───────────────────────────────────────────────

// Oynak veriyi "aralık + kayıt" çerçevesine sokan işaretler. Bir cümlede para,
// yüzde ya da kat iddiası geçiyorsa bunlardan biri de geçmek ZORUNDA — bu,
// "uydurma istatistik/rakam yok" yasağının makine kontrolüdür.
const HEDGE = /(yaklaşık|civar|genellikle|tipik|ortalama|aralığ|arası|bandında|değişir|değişebil|değişken|ilçeye göre|bölgeye göre|duruma göre|döneme göre|kişiye göre|güncel|kadar olabil|olabilir|sabit değil|farklılık göster)/i;
const RANGE = /\d+\s*[-–—]\s*\d+/;

// Sabit, doğrulanabilir ve rehberlerde zaten kayıtlı olan sayılar. Bunlar
// "istatistik" değil, değişmeyen kural/eşiktir; hedge aranmaz.
const CANONICAL_FIGURES = new Set([
  '6',    // Florida eyalet satış vergisi (%)
  '100',  // "yüzde 100" — oran değil, bütünün kendisi
]);

// Metinde geçmesine izin verilen TEK alan adları: Florida/ABD resmî kurumları
// ve bu sitenin kendisi. Geri kalan her alan-benzeri dizge reddedilir —
// affiliate/aracı/karşılaştırma sitesi bağlantısı bu kuralla yapısal olarak
// imkânsız hale gelir.
const ALLOWED_DOMAINS = new Set([
  'floridarehberi.com',
  // Eyalet
  'flhsmv.gov', 'floridarevenue.com', 'fldoe.org', 'floridahealth.gov',
  'floridadisaster.org', 'myflorida.com', 'floir.com', 'myfloridacfo.com',
  'floridabar.org', 'fdacs.gov',
  // Federal
  'irs.gov', 'ssa.gov', 'healthcare.gov', 'medicare.gov', 'usa.gov',
  'consumerfinance.gov', 'fema.gov', 'floodsmart.gov', 'ftc.gov',
  'nhc.noaa.gov', 'weather.gov', 'noaa.gov', 'ready.gov', 'annualcreditreport.com',
]);
const DOMAIN_LIKE = /\b(?:[a-z0-9-]+\.)+(?:com|net|org|io|co|gov|edu|tr|info)\b/gi;

// SERT YASAK 1 — vize/göçmenlik. Statü ve prosedür terimleri hedeflenir;
// demografik anlamdaki tek başına "göçmen" kelimesi kapsam dışı bırakılmıştır
// (bir bölge yazısında "göçmen nüfusu yoğun" demek yasak değil).
const IMMIGRATION_TERMS =
  /\b(vize\w*|vizesiz|göçmenlik|oturum izni|oturma izni|ikamet izni|çalışma izni|yeşil kart|green ?card|uscis|i-?94|h-?1b|eb-?5|e-?2 vize|f-?1 vize|iltica|sığınma|mülteci\w*)\b/i;

// SERT YASAK 2 — uydurma yorum / okur hikâyesi. Bu site tanıklık yayınlamaz;
// "bir okurumuz" cümlesi doğrulanamaz ve uydurmadır.
const FAKE_TESTIMONIAL =
  /(bir okurumuz|okuyucularımızdan|kullanıcılarımızdan|müşterilerimizden|danışanlarımızdan|bize yazan|bir tanıdığım|arkadaşımın başına|deneyimlerimize göre|gözlemlerimize göre)/i;

// ── KALİTE KAPISI ─────────────────────────────────────────────────────────
// Dönen dizi boşsa geçer; doluysa maddeler retry feedback'i olur.
// Her kural ya GEO alıntılanabilirliğine ya da bu sitenin açık yasaklarına bağlı.
export function validatePost(post, topic) {
  const problems = [];
  const push = (m) => problems.push(m);

  // 1) Şekil
  if (!Array.isArray(post.intro) || post.intro.length < 1 || post.intro.length > 3)
    push('intro 1-3 paragraf olmalı');
  if (!Array.isArray(post.sections) || post.sections.length < 4 || post.sections.length > 7)
    push('sections 4-7 bölüm olmalı');
  if (!Array.isArray(post.faqs) || post.faqs.length < 4)
    push('en az 4 FAQ gerekli');
  if (!Array.isArray(post.keywords) || post.keywords.length < 4)
    push('en az 4 keyword gerekli');
  if (problems.length) return problems; // şekil bozuksa gerisini kontrol etme

  // 2) Answer-first giriş: ilk cümle çekirdek soruyu DOĞRUDAN yanıtlamalı
  const fs1 = firstSentence(post.intro[0]);
  if (fs1.includes('?')) push('intro ilk cümlesi soru olamaz — doğrudan cevap olmalı');
  if (words(fs1) < 8) push('intro ilk cümlesi çok kısa (min 8 kelime) — kendi başına cevap taşımalı');
  const BANNED_OPENERS = /^(bu yazıda|bu makalede|bu rehberde|gelin|merhaba|hoş geldiniz|florida'ya taşınacaksanız)/i;
  if (BANNED_OPENERS.test(fs1))
    push('intro "Bu yazıda/Gelin..." ile başlayamaz — ilk cümle cevabın kendisi olmalı');
  const qStems = new Set(significantStems(topic.question));
  const overlap = significantStems(fs1).filter((w) => qStems.has(w)).length;
  if (qStems.size >= 2 && overlap < 2)
    push(`intro ilk cümlesi soruyla yeterince örtüşmüyor (örtüşen kök: ${overlap}) — soruyu doğrudan yanıtla`);

  // 3) Bölümler: soru-format H2 + kendi başına alıntılanabilir pasaj
  const questionHeadings = post.sections.filter((s) => (s.heading || '').includes('?')).length;
  if (questionHeadings / post.sections.length < 0.6)
    push(`bölüm başlıklarının en az %60'ı soru formatında olmalı`);
  post.sections.forEach((s, i) => {
    if (!s.heading || s.heading.length < 10 || s.heading.length > 130)
      push(`bölüm ${i + 1}: başlık 10-130 karakter olmalı`);
    const total =
      (s.body || []).reduce((n, p) => n + words(p), 0) +
      (s.list || []).reduce((n, p) => n + words(p), 0);
    // Ret sınırı (60/260) ile tasarım hedefi (135-170) BİLEREK ayrıdır.
    // Önceki hal (110'da ret) yapısal bir çelişki yüzünden her koşuyu reddediyordu:
    // şemadaki "1-2 paragraf" açıklaması Türkçe'de ~110 kelime üretir, model somut
    // olan yapısal kısıtı seçer ve tam ret sınırının altında kalırdı. Çözüm miamili
    // hattından port edildi (commit 6e37194): şema "3 paragraf" der, prompt kuralı
    // 3b/3c kabul şartını ve nasıl tutturulacağını açık yazar, ret sınırı yalnızca
    // kabul edilemez uçları keser.
    if (total < 60) push(`bölüm ${i + 1} (${s.heading}): ${total} kelime — ret sınırı 60'ın altında (tasarım hedefi 135-170)`);
    if (total > 260) push(`bölüm ${i + 1} (${s.heading}): ${total} kelime — ret sınırı 260'ın üstünde (tasarım hedefi 135-170)`);
    if (/yukarıda (bahsettiğimiz|anlattığımız)|bir önceki bölümde|az önce değindiğimiz/i.test((s.body || []).join(' ')))
      push(`bölüm ${i + 1}: çapraz referans var — her bölüm kendi başına alıntılanabilir olmalı`);
  });

  // 4) FAQ: kendi başına yeten cevaplar
  post.faqs.forEach((f, i) => {
    if (!(f.q || '').trim().endsWith('?')) push(`FAQ ${i + 1}: soru '?' ile bitmeli`);
    const aw = words(f.a);
    if (aw < 25 || aw > 120)
      push(`FAQ ${i + 1}: cevap ${aw} kelime — 25-120 aralığında, kendi başına yeten bir cevap olmalı`);
  });

  // 5) Meta alanlar
  if ((post.excerpt || '').length < 100 || post.excerpt.length > 350)
    push('excerpt 100-350 karakter olmalı');

  // Tüm serbest metin alanları — cümle bazlı taramalar bunun üstünde yürür.
  // JSON.stringify üzerinden tarama yapılmaz: alan sınırları cümleleri birbirine
  // yapıştırıp komşu alanın rakamını yanlış pozitif yapıyor (miamili'de yaşandı).
  const textFields = [
    post.excerpt,
    ...post.intro,
    ...post.sections.flatMap((s) => [s.heading, ...(s.body || []), ...(s.list || [])]),
    ...post.faqs.flatMap((f) => [f.q, f.a]),
    ...(post.keywords || []),
  ];
  const allText = textFields.join('\n');

  // 6) Türkçe bütünlüğü (diacritics)
  const diacritics = (allText.match(/[çğışöüÇĞİŞÖÜ]/g) || []).length;
  if (diacritics < 30)
    push(`Türkçe karakter yoğunluğu şüpheli düşük — ASCII'leşme (ı→i, ş→s) kontrolü gerekli`);
  if (/\bIstanbul\b/.test(allText)) push(`"Istanbul" ASCII'leşmiş — "İstanbul" olmalı`);

  // 7) SERT YASAK: vize / göçmenlik / oturum izni. Bu sitenin kapsamı dışında.
  const immigration = allText.match(IMMIGRATION_TERMS);
  if (immigration)
    push(`kapsam dışı konu (vize/göçmenlik): "${immigration[0]}" — bu sitede vize, oturum izni ve göçmenlik statüsü İŞLENMEZ; konuyu yaşamsal/pratik tarafından anlat ya da o cümleyi tamamen çıkar`);

  // 8) SERT YASAK: uydurma yorum / okur hikâyesi.
  const testimonial = allText.match(FAKE_TESTIMONIAL);
  if (testimonial)
    push(`uydurma tanıklık: "${testimonial[0]}" — bu sitede okur hikâyesi, yorum ve anonim deneyim aktarımı yayınlanmaz`);

  // 9) YASAK: uydurma fiyat. Para geçen her cümle ya aralık verir ya çerçeveler.
  //    "dolar" sonrası \b KOYMA — Türkçe ek alıyor ("185 dolardır") ve sınır
  //    eşleşmediği için kural sessizce devre dışı kalıyor.
  const MONEY = /(\$\s?\d[\d.,]*)|(\b\d[\d.,]*\s*(dolar|usd))/i;
  for (const s of textFields.flatMap(sentences)) {
    if (!MONEY.test(s)) continue;
    if (HEDGE.test(s) || RANGE.test(s)) continue;
    push(`kesin fiyat iddiası: "${s.slice(0, 120)}" — para tutarı ya aralık olarak ya da "yaklaşık/değişebilir" çerçevesiyle verilir`);
  }

  // 10) YASAK: uydurma istatistik. Yüzde/oran iddiası hedge'siz geçemez.
  for (const s of textFields.flatMap(sentences)) {
    const hits = [...s.matchAll(/(?:%\s?|yüzde\s+)(\d+(?:[.,]\d+)?)/g)];
    if (!hits.length) continue;
    if (HEDGE.test(s) || RANGE.test(s)) continue;
    const uncanonical = hits.map((h) => h[1]).filter((n) => !CANONICAL_FIGURES.has(n));
    if (uncanonical.length)
      push(`doğrulanmamış istatistik (%${uncanonical[0]}): "${s.slice(0, 120)}" — kaynağı belirsiz oran yazılamaz`);
  }

  // 11) YASAK: çerçevesiz "kat" karşılaştırması ("üç kat pahalı") — kaynağı
  //     olmayan bir orandır, yüzde iddiasından farkı yoktur.
  for (const s of textFields.flatMap(sentences)) {
    if (!/\b\d+([.,]\d+)?\s*kat\b/i.test(s)) continue;
    if (HEDGE.test(s) || RANGE.test(s)) continue;
    push(`çerçevesiz oran iddiası: "${s.slice(0, 120)}" — "X kat" karşılaştırması aralık ya da "yaklaşık/değişir" çerçevesi ister`);
  }

  // 12) YASAK: aracı/karşılaştırma/affiliate sitesi. İzinli resmî kaynaklar
  //     dışında hiçbir alan adı geçemez — link olarak da, düz metin olarak da.
  for (const d of allText.matchAll(DOMAIN_LIKE)) {
    const domain = d[0].toLowerCase();
    if (ALLOWED_DOMAINS.has(domain)) continue;
    push(`izinsiz alan adı: "${d[0]}" — bu sitede aracı/affiliate bağlantısı yasak, yalnızca resmî kurum kaynakları anılabilir`);
  }
  if (/https?:\/\//i.test(allText))
    push('metinde ham URL var — kaynak, adres yerine kurum adıyla anılır (metin linkleştirilmiyor)');

  // 13) MiamiLi bağlantı disiplini: günlük yazı MiamiLi'ye DEĞİNMEZ.
  //     Sahiplik zaten her sayfanın footer'ında yazıyor; her gün bir marka
  //     bahsi eklemek tam olarak kaçınılmak istenen link-ağı desenidir.
  if (/miamili/i.test(allText))
    push("yazıda MiamiLi geçiyor — günlük yazılar MiamiLi'ye değinmez; sahiplik footer künyesinde belirtilir");

  // 14) Marka gerçekliği: Florida Rehberi'nin telefonu, adresi, ofisi YOK.
  for (const phone of allText.matchAll(/\+?1?[\s(-]*\d{3}[\s)-]*\d{3}[\s-]*\d{4}/g))
    push(`uydurma telefon numarası: ${phone[0]} — bu sitede yayınlanan bir telefon numarası yok (911 gibi kısa acil numaralar serbesttir)`);
  for (const mail of allText.matchAll(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g))
    push(`metinde e-posta adresi var: ${mail[0]} — iletişim bilgisi yalnızca Hakkında sayfasında durur`);
  for (const addr of allText.matchAll(/\b\d{2,5}\s+[A-Z][a-zA-Z]+\s+(Ave|Avenue|St|Street|Rd|Road|Blvd|Boulevard|Dr|Drive|Way|Ln|Lane)\b/g))
    push(`spesifik sokak adresi: "${addr[0]}" — kurum adresi doğrulanamadığı için yazılmaz, kurumu adıyla an`);

  return problems;
}

// ── Prompt ────────────────────────────────────────────────────────────────
function buildSystemPrompt(brandFacts) {
  return `Sen Florida Rehberi (floridarehberi.com) için yazan kıdemli bir Türkçe editörsün. Florida Rehberi, ${brandFacts.publisher} tarafından yayınlanan bağımsız bir Türkçe "Florida'da yaşam" el kitabıdır.

KONUM: ${brandFacts.positioning}
YAYIN KURALI: ${brandFacts.editorial}
KAPSAM SINIRI: ${brandFacts.scope}

HEDEF: ChatGPT, Perplexity ve Google AI Overviews tarafından alıntılanmaya (GEO) optimize, gerçekten işe yarayan bir Türkçe makale. Okuyucu Florida'ya taşınmış ya da taşınmak üzere olan, Türkçe konuşan bir yetişkin. Turist değil — burada yaşayacak.

BİÇİM KURALLARI (hepsi zorunlu):
1. ANSWER-FIRST: intro'nun İLK CÜMLESİ makalenin sorusunu doğrudan ve net yanıtlar. "Bu yazıda...", "Gelin..." gibi girizgâh yasak. Cevap Evet/Hayır ise ilk kelime o olsun.
2. Bölüm başlıkları (heading) soru formatında olsun — insanların arama motoruna ve AI'ya yazdığı biçimde.
3. Her bölümün gövdesi (body paragrafları + varsa liste) KENDİ BAŞINA ALINTILANABİLİR, bağlamsız okunabilir tek bir pasaj oluşturur. "Yukarıda bahsettiğimiz" tarzı çapraz referans yasak.
3b. UZUNLUK — KABUL ŞARTI: her bölümün gövdesi (body + list kelimelerinin TOPLAMI) EN AZ 140, EN ÇOK 165 kelime olmalı. Bunu tutturmanın yolu bölümü ÜÇ paragraf yazmaktır (~50 kelimelik üç paragraf) ya da iki paragraf + 3-4 maddelik liste. İKİ KISA PARAGRAF YETMEZ: tipik hata budur ve pasajı 110 kelimede bırakır, o uzunluktaki pasaj AI motorlarında alıntılanmak için fazla incedir.
3c. Her bölümü bitirdikten sonra kelimelerini SAY. 140'ın altındaysa somut içerik ekleyerek yükselt — örnek durum, sayısal aralık, süreç adımı, istisna, "şu koşulda şöyle olur" ayrımı. Dolgu cümlesi veya tekrar EKLEME; bilgi ekle.
4. 5-6 bölüm; en az 4, ideali 5 FAQ. FAQ cevapları 30-90 kelime, kendi başına yeten cümleler.
5. Ton: burada yaşamış, işleri bilen birinin anlatımı — net, abartısız, satış baskısı yok, korkutmuyor. Reklam dili ("hayalinizdeki yaşam", "eşsiz fırsat", "cennet") YASAK.
6. Kusursuz Türkçe imla ve diacritics (ı/İ, ş, ğ, ü, ö, ç). İngilizce terim kalabilir (lease, deductible, escrow, homestead) ama ilk geçişte parantezle Türkçe açıkla — okuyucu bu terimi belgede İngilizce görecek.

GERÇEKLİK KURALLARI (ihlal = ret, taslak yayınlanmaz):
- KAPSAM: Vize, oturum izni, göçmenlik statüsü, yeşil kart, çalışma izni konularına HİÇ girme. Kelime olarak bile geçirme. Bir konu zorunlu olarak statüye değiyorsa, o cümleyi yaz(ma) ve "bu konuda yetkili bir uzmana danışın" bile deme — konuyu tamamen atla, yazının pratik/yaşamsal tarafına odaklan.
- FİYAT: Kesin fiyat İCAT ETME. Para tutarı yazacaksan ya aralık ver ya "yaklaşık / genellikle / ilçeye göre değişir" çerçevesiyle ver. Emin değilsen rakamı hiç yazma; bunun yerine maliyetin hangi kalemlerden oluştuğunu ve "nereye bakılacağını" yaz.
- İSTATİSTİK: Kaynağını bilmediğin oran, yüzde, sıralama ya da "X kat" karşılaştırması yazma. "Florida'nın en ucuz..." gibi doğrulanamaz üstünlük iddiası kurma.
- TANIKLIK: Okur hikâyesi, kullanıcı yorumu, "bir tanıdığım" anlatısı UYDURMA. Bu sitede tanıklık yayınlanmıyor.
- BAĞLANTI: Hiçbir aracı, karşılaştırma, sigorta satış ya da emlak sitesinin adını/adresini yazma. Bu sitede affiliate bağlantı YOK. Kaynak göstermen gerekiyorsa resmî kurumu ADIYLA an (örn. "FLHSMV'nin sayfası", "Florida Department of Revenue"), URL yapıştırma.
- İŞLETME: Banka, sigorta şirketi, okul ya da hastane adı ve sokak adresi yazma — koşulları değişiyor ve doğrulayamıyoruz. Bunun yerine türü tarif et ve "nasıl karşılaştırılır" öğret. Kamu kurumlarının adı serbesttir.
- TARİH/SAAT: Başvuru son tarihi, çalışma saati ve kampanya dönemi yazma; "güncel tarihi kurumun kendi sayfasından doğrulayın" de.
- Florida Rehberi ya da ${brandFacts.publisher} hakkında hiçbir iddia kurma; bu yazının içinde markadan söz edilmez. Telefon, e-posta, ofis adresi yazma — yok.
- Hukuk, vergi ve sağlık konularında bunun tavsiye olmadığını belirt ve yetkili mercie/uzmana yönlendir.`;
}

function buildUserPrompt(topic) {
  return `Aşağıdaki konu için makale üret. Başlık ve çekirdek soru SABİT (değiştirme, çıktına dahil etme) — sen excerpt, intro, sections, faqs ve keywords üreteceksin.

BAŞLIK: ${topic.title}
ÇEKİRDEK SORU (intro ilk cümlesi bunu doğrudan yanıtlamalı): ${topic.question}
KATEGORİ: ${topic.category}
KAPSAM/AÇI NOTU (buna harfiyen sadık kal — neyi YAZMAYACAĞINI da söylüyor): ${topic.angle}
ÇEKİRDEK KEYWORDLER: ${topic.keywords.join(', ')}

Şemaya uygun JSON üret. keywords alanına çekirdek keywordleri aynen dahil et, en fazla 3 yeni long-tail ekleyebilirsin.`;
}

const OUTPUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['excerpt', 'intro', 'sections', 'faqs', 'keywords'],
  properties: {
    excerpt: {
      type: 'string',
      description: 'Meta description / kart özeti, 120-320 karakter, answer-first',
    },
    intro: {
      type: 'array',
      items: { type: 'string' },
      description: '2 paragraf; ilki çekirdek soruyu doğrudan yanıtlar',
    },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['heading', 'body'],
        properties: {
          heading: { type: 'string', description: 'Soru formatında H2' },
          body: {
            type: 'array',
            items: { type: 'string' },
            description: '3 paragraf (veya 2 paragraf + kısa liste); bölüm toplamı 140-165 kelime',
          },
          list: {
            type: 'array',
            items: { type: 'string' },
            description: 'Opsiyonel madde listesi (kelimeleri bölüm toplamına dahildir)',
          },
        },
      },
    },
    faqs: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['q', 'a'],
        properties: { q: { type: 'string' }, a: { type: 'string' } },
      },
    },
    keywords: { type: 'array', items: { type: 'string' } },
  },
};

// ── LLM çağrısı ───────────────────────────────────────────────────────────
async function generateDraft(topic, brandFacts, feedback) {
  if (FLAGS.mock) {
    log('mock mod: fixtures/mock-post.json kullanılıyor');
    return readJSON(PATHS.mockFixture);
  }
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      'OPENROUTER_API_KEY tanımlı değil. GitHub repo secret olarak eklenmeli ' +
        '(Settings → Secrets and variables → Actions). Bkz. docs/blog-pipeline.md'
    );
  }

  const messages = [
    { role: 'system', content: buildSystemPrompt(brandFacts) },
    { role: 'user', content: buildUserPrompt(topic) },
  ];
  if (feedback) {
    messages.push({
      role: 'user',
      content: `Önceki taslak kalite kapısından döndü. Şu sorunları düzelterek TAMAMEN yeni bir JSON üret:\n- ${feedback.join('\n- ')}`,
    });
  }

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': SITE,
      'X-Title': 'floridarehberi-blog',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 16000,
      messages,
      response_format: {
        type: 'json_schema',
        json_schema: { name: 'blog_post', strict: true, schema: OUTPUT_SCHEMA },
      },
    }),
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`OpenRouter ${res.status}: ${errBody.slice(0, 300)}`);
  }
  const data = await res.json();
  const choice = data.choices?.[0];
  if (!choice) throw new Error(`yanıtta choice yok: ${JSON.stringify(data).slice(0, 300)}`);
  if (choice.finish_reason === 'length') throw new Error('çıktı max_tokens sınırına çarptı');
  if (choice.finish_reason === 'content_filter') throw new Error('model isteği reddetti (content_filter)');
  const text = choice.message?.content;
  // Boş content = düşünme bütçesini tüketen "thinking" modeli belirtisi.
  // Sessizce needs_review'a düşmesin diye burada açık hata veriyoruz.
  if (!text) throw new Error(`yanıtta içerik yok (model: ${MODEL}) — thinking modeli kullanılıyorsa BLOG_MODEL'i değiştir`);
  return JSON.parse(text);
}

// ── Yayınlama ─────────────────────────────────────────────────────────────
// Çıktı, src/content/blog/types.ts'teki BlogPost tipiyle BİREBİR uyuşmak
// zorunda: generated-posts.json TypeScript tarafından `as BlogPost[]` okunuyor.
function assemblePost(draft, topic, dateISO) {
  const keywords = [...new Set([...topic.keywords, ...draft.keywords])].slice(0, 8);
  return {
    slug: topic.slug,
    title: topic.title,
    question: topic.question,
    excerpt: draft.excerpt,
    keywords,
    publishedAt: dateISO,
    updatedAt: dateISO,
    intro: draft.intro,
    sections: draft.sections,
    faqs: draft.faqs,
    status: 'published',
    generated: true,
  };
}

function publish(post, backlog, topic) {
  const generated = readJSON(PATHS.generated);
  generated.push(post);
  topic.status = 'published';
  topic.publishedAt = post.publishedAt;
  if (FLAGS.dryRun) {
    log(`DRY-RUN: dosya yazılmadı. Yayımlanacak yazı: ${post.slug}`);
    log(`  bölüm: ${post.sections.length} · FAQ: ${post.faqs.length} · keyword: ${post.keywords.length}`);
    return;
  }
  writeJSON(PATHS.generated, generated);
  writeJSON(PATHS.backlog, backlog);
  log(`yayımlandı: ${SITE}/blog/${post.slug}`);
  emitGithubOutput('published', 'true');
  emitGithubOutput('post_url', `${SITE}/blog/${post.slug}`);
}

function flagForReview(draft, topic, backlog, problems, dateISO) {
  topic.status = 'needs_review';
  if (!FLAGS.dryRun) {
    fs.mkdirSync(PATHS.rejectedDir, { recursive: true });
    writeJSON(path.join(PATHS.rejectedDir, `${dateISO}-${topic.slug}.json`), {
      topic: topic.id,
      slug: topic.slug,
      problems,
      draft,
    });
    writeJSON(PATHS.backlog, backlog);
  }
  log(`İNSAN İNCELEMESİ GEREKLİ — taslak 2 kez kalite kapısından döndü: ${topic.slug}`);
  problems.forEach((p) => log('  ✗', p));
}

function emitGithubOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
  }
}

// ── Self-test: kalite kapısı fixture üstünde doğrulanır (API'siz) ─────────
// İki yönlü test: (a) temiz fixture GEÇMELİ, (b) her mutasyon YAKALANMALI,
// (c) meşru yazım YANLIŞ POZİTİF vermemeli.
// Sadece (b) test edilirse kapı zamanla o kadar sıkılaşır ki hiçbir gerçek
// makale geçemez ve hat her gün needs_review'a düşer.
function selfTest() {
  const fixture = readJSON(PATHS.mockFixture);
  const topic = readJSON(PATHS.backlog).topics[0];

  const pass = validatePost(fixture, topic);
  if (pass.length) {
    console.error('SELF-TEST FAIL: fixture kalite kapısını GEÇMELİYDİ, sorunlar:', pass);
    process.exit(1);
  }
  log('✓ temiz fixture kapıdan geçti');

  const mutations = [
    ['faq sayısı', (p) => { p.faqs = p.faqs.slice(0, 2); }],
    ['soru intro', (p) => { p.intro[0] = 'Peki bu konuda ne yapmak gerekir? Hemen bakalım birlikte.'; }],
    ['girizgâh intro', (p) => { p.intro[0] = 'Bu yazıda kira sözleşmesi sürecinin tüm detaylarını kapsamlı biçimde ele alacağız.'; }],
    ['kısa bölüm', (p) => { p.sections[0].body = ['Çok kısa bölüm.']; delete p.sections[0].list; }],
    ['uydurma fiyat', (p) => { p.sections[0].body[0] += ' Depozito tutarı 1850 dolardır.'; }],
    ['uydurma istatistik', (p) => { p.sections[0].body[0] += ' Kiracıların %38 kadarı depozitosunu geri alamıyor.'; }],
    ['çerçevesiz kat iddiası', (p) => { p.sections[0].body[0] += ' Sigorta primi burada 3 kat yüksektir.'; }],
    ['vize konusu', (p) => { p.faqs[0].a += ' Bu işlem için geçerli bir vize sahibi olmanız gerekir.'; }],
    ['göçmenlik konusu', (p) => { p.sections[1].body[0] += ' Oturum izni başvurunuz sürerken de aynı kural işler.'; }],
    ['uydurma tanıklık', (p) => { p.sections[1].body[0] += ' Bir okurumuz bu yüzden depozitosunu kaybetti.'; }],
    ['aracı sitesi', (p) => { p.faqs[0].a += ' Karşılaştırma için zillow.com üzerinden bakabilirsiniz.'; }],
    ['ham URL', (p) => { p.faqs[0].a += ' Ayrıntı için https://floridarehberi.com/blog adresine bakın.'; }],
    ['MiamiLi bahsi', (p) => { p.sections[1].body[0] += ' Bu konuda MiamiLi ekibi de yardımcı olabilir.'; }],
    ['uydurma telefon', (p) => { p.faqs[0].a += ' Bilgi için +1 (786) 555-1234 numarasını arayın.'; }],
    ['uydurma adres', (p) => { p.sections[1].body[0] += ' Ofis 1234 Brickell Avenue üzerindedir.'; }],
    // İzinli alan adı bilinçli seçildi: bu mutasyon alan-adı kuralına DEĞİL,
    // e-posta kuralına takılmalı. Yasak bir alan adı kullanılsaydı test,
    // e-posta kuralı silinse bile yeşil kalırdı.
    ['e-posta', (p) => { p.faqs[1].a += ' Sorularınızı destek@floridarehberi.com adresine yazın.'; }],
    ['ASCII Istanbul', (p) => { p.sections[0].body[0] += ' Istanbul çıkışlı gelenler için de aynısı geçerli.'; }],
    ['çapraz referans', (p) => { p.sections[2].body[0] += ' Yukarıda bahsettiğimiz maddeleri unutmayın.'; }],
  ];
  for (const [name, mutate] of mutations) {
    const clone = JSON.parse(JSON.stringify(fixture));
    mutate(clone);
    const problems = validatePost(clone, topic);
    if (!problems.length) {
      console.error(`SELF-TEST FAIL: '${name}' mutasyonu YAKALANMALIYDI`);
      process.exit(1);
    }
    log(`✓ mutasyon yakalandı: ${name} → ${problems[0].slice(0, 100)}`);
  }

  // Yanlış-pozitif sondaları: MEŞRU yazımın kapıdan geçtiğini doğrular.
  const probes = [
    ['çerçevelenmiş fiyat', (p) => { p.sections[0].body[0] += ' Başvuru bedeli yaklaşık 50 dolar civarındadır ve ilçeye göre değişir.'; }],
    ['aralıklı fiyat', (p) => { p.sections[0].body[0] += ' Dosya masrafı 35-75 dolar arasında değişir.'; }],
    ['kanonik oran', (p) => { p.sections[0].body[0] += ' Florida eyalet satış vergisi %6 olarak uygulanır.'; }],
    ['izinli resmî kaynak', (p) => { p.faqs[0].a += ' Güncel bilgi flhsmv.gov üzerinde yayınlanır.'; }],
    ['çerçevelenmiş oran', (p) => { p.faqs[1].a += ' Başvuruların yaklaşık %10 kadarı ek incelemeye alınabilir, bu oran değişir.'; }],
    ['çerçevelenmiş kat', (p) => { p.faqs[2].a += ' Sahil şeridinde prim genellikle 2 kat kadar yüksek olabilir, bölgeye göre değişir.'; }],
    ['acil numara', (p) => { p.faqs[2].a += ' Acil durumda 911 aranır.'; }],
    ['demografik göçmen', (p) => { p.sections[2].body[0] += ' Bölgede göçmen nüfusu yoğundur ve Türkçe konuşan komşu bulmak kolaydır.'; }],
  ];
  for (const [name, mutate] of probes) {
    const clone = JSON.parse(JSON.stringify(fixture));
    mutate(clone);
    const problems = validatePost(clone, topic);
    if (problems.length) {
      console.error(`SELF-TEST FAIL: '${name}' YANLIŞ POZİTİF — geçmeliydi:`, problems);
      process.exit(1);
    }
    log(`✓ yanlış pozitif yok: ${name}`);
  }

  log(`SELF-TEST OK — ${mutations.length} mutasyon yakalandı, ${probes.length} meşru yazım geçti`);
}

// ── Ana akış ──────────────────────────────────────────────────────────────
async function main() {
  if (FLAGS.selfTest) return selfTest();

  const dateISO = todayISO();
  const brandFacts = loadBrandFacts();
  const backlog = readJSON(PATHS.backlog);
  const generated = readJSON(PATHS.generated);

  // Dedupe guard 1: aynı güne ikinci yayın yok
  if (generated.some((p) => (p.publishedAt || '').startsWith(dateISO))) {
    log(`bugün (${dateISO}) zaten yayın yapılmış — çıkılıyor (dedupe guard)`);
    emitGithubOutput('published', 'false');
    return;
  }

  // Dedupe guard 2+3: slug tekilliği (rehberler dahil) + published konular seçilmez
  const topic = pickTopic(backlog, loadExistingSlugs());
  if (!topic) {
    log(`backlog'da pending konu kalmadı — yeni konu ekleme rehberi: docs/blog-pipeline.md`);
    emitGithubOutput('published', 'false');
    if (!FLAGS.dryRun) writeJSON(PATHS.backlog, backlog); // skipped_duplicate işaretleri kalıcı olsun
    return;
  }
  log(`konu seçildi: [${topic.id}] ${topic.title}`);

  let draft = await generateDraft(topic, brandFacts, null);
  let problems = validatePost(draft, topic);

  if (problems.length) {
    log(`kalite kapısı: ${problems.length} sorun, retry yapılıyor`);
    problems.forEach((p) => log('  ✗', p));
    draft = await generateDraft(topic, brandFacts, problems);
    problems = validatePost(draft, topic);
  }

  if (problems.length) {
    flagForReview(draft, topic, backlog, problems, dateISO);
    emitGithubOutput('published', 'false');
    process.exit(1); // Action fail → bildirim
  }

  publish(assemblePost(draft, topic, dateISO), backlog, topic);
}

main().catch((err) => {
  console.error('[icerik-hatti] HATA:', err.message);
  emitGithubOutput('published', 'false');
  process.exit(1);
});

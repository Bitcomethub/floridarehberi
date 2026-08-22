@AGENTS.md

# Florida Rehberi — Türkçe "Florida'da yaşam" el kitabı

`floridarehberi.com` — Florida'ya taşınmış ya da taşınmak üzere olan Türkçe
konuşan hanelere yönelik, ticari olmayan bir referans yayını. Yayıncı:
**MiamiLi Media** (miamili.com'un da yayıncısı). Orta-funnel: kimse burada bir
şey satın almıyor; site alıntılanmak ve güven kurmak için var.

## Bağlayıcı Standartlar (önce oku)

1. **Oturum protokolü:** Başta `.claude/LEARNINGS.md` oku (arşivi DEĞİL). Sonda,
   oturum şu eşiklerden birini geçtiyse `extract-approach` uygula: düzeltmeden
   önce 2+ başarısız deneme, semptomdan uzakta bulunan kök neden, gerçek mimari
   seçim, ya da geri alınamaz veriye dokunan değişiklik.
2. **SERT KAPSAM SINIRI — vize/göçmenlik YAZILMAZ.** Vize, oturum/ikamet izni,
   çalışma izni, yeşil kart, statü prosedürleri bu sitede İŞLENMEZ. Konu ayrı
   bir yayında ele alınıyor. Bu bir eksiklik değil, karar. Kapı bunu makine
   düzeyinde uyguluyor (`IMMIGRATION_TERMS`), ama elle yazılan rehber metnini
   kapı taramaz — rehber sayfası yazarken sen uygula.
3. **Uydurma yok.** Fiyat, oran, istatistik, okur yorumu, vaka hikâyesi
   ÜRETİLMEZ. Oynak bir sayı yazmak yerine maliyetin neyden oluştuğu anlatılır
   ve güncel rakamın hangi resmî kurumda olduğu söylenir. Sabit ve doğrulanabilir
   olan tek istisna türü: eyalet satış vergisi gibi kanuni eşikler.
4. **Tüm kullanıcıya dönük metin Türkçe**, diacritics eksiksiz (ı İ ş ğ ç ö ü).
   Kod ve yorumlar Türkçe/İngilizce karışık olabilir. İngilizce hukuki/teknik
   terim (lease, deductible, homestead) ilk geçişte parantezle açıklanır —
   okuyucu o kelimeyi belgede İngilizce görecek.
5. **miamili.com bağlantıları yalnız bağlamsal ve `miamiliUrl()` üzerinden.**
   Elle yazılan link `utm_source=floridarehberi` taşımaz ve uydu yayının trafik
   getirip getirmediği ölçülemez hâle gelir. Sayfa başına bir link kotası YOK —
   konu gerçekten mülk alımına dönüyorsa link vardır, dönmüyorsa yoktur. Günlük
   blog yazılarında MiamiLi'ye HİÇ değinilmez (kapı bunu reddeder).
   İSTİSNA: `rel="author"`, JSON-LD `url`/`sameAs` gibi kimlik URL'leri UTM
   ALMAZ — UTM'li varyant iki markayı aynı varlığa bağlama sinyalini böler.
6. **Her şey statik.** Backend yok, DB yok, API route yok. Dinamik segmentler
   `generateStaticParams()` + `dynamicParams = false`; diğerleri
   `export const dynamic = 'force-static'`. Bir sayfa build'de üretilemiyorsa
   tasarım yanlıştır.
7. **`new Date()` uygulama kodunda YASAK.** Vercel UTC'de çalışır; build zamanı
   damgası statik sayfalarda sessizce eskir ve sitemap'te "her şey değişti"
   yalanı üretir. Tarihler içeriğin kendi alanlarından gelir, footer yılı sabit
   (`const YEAR = 2026`). Tek istisna: Node hattı (`generate-blog-post.mjs`)
   yayın tarihini `new Date().toISOString().slice(0,10)` ile alır.
8. **Onay kapısı RENDER'ı kontrol eder, görünürlüğü değil.** `hidden` ile
   saklanan bir `<Script>` yine yüklenir ve çerez yazar. Yeni bir üçüncü parti
   yüzey eklerken `consent === 'granted'` iken AĞACA GİREN bir JSX yaz.
   "Reddet" butonu "Kabul et" ile aynı ağırlıkta olmak zorunda (GDPR Art. 7(3)).
9. **Doküman gerçekliği:** mimari değiştiren oturum bu dosyayı AYNI oturumda
   günceller. **Boyut kapağı 40k karakter** — tarihli faz anlatısı buraya
   BİRİKMEZ, `.claude/CLAUDE_ARCHIVE.md`'ye gider.

## Mimari

| Katman | Seçim |
|---|---|
| Framework | Next.js 16 App Router (Turbopack), React 19, TypeScript 5 |
| Stil | Tailwind CSS v4 — tokenlar `globals.css` içinde `@theme` ile |
| Render | Tamamen statik (SSG). Sunucu çalışma zamanı yok. |
| Hosting | Vercel |
| İçerik | Kod içinde veri: `src/content/guides/*.ts` + `src/content/blog/` |
| Ölçüm | GA4, kendi onay kapımızın arkasında (`components/Analytics.tsx`) |
| Hat | GitHub Actions cron → OpenRouter → kalite kapısı → commit |

### İçerik = veri, sayfa = türev

`src/content/guides/*.ts` içindeki `Guide` nesneleri SSOT'tur. Rota
(`/[slug]`), footer navigasyonu, ana sayfa listesi, JSON-LD ve `sitemap.ts`
hepsi `GUIDES` dizisinden türer. Bir rehberin başlığını değiştirmek için tek
dosya düzenlenir. Yeni rehber eklemek = yeni dosya + `index.ts`'e ekleme;
başka hiçbir yerde liste güncellenmez.

`slug` alanı YAYINDA OLAN URL'dir. Yeniden adlandırmak canlı bir URL'i kırar.

Blog iki parçalı: elle yazılan `src/content/blog/seed.ts` + hattın append
ettiği `generated-posts.json`. `lib/blogData.ts` ikisini birleştirir,
`status !== 'needs_review'` olanları süzer ve tarihe göre sıralar.
`generated-posts.json`'u ELLE büyütme — hat yazar.

**Yayınlanmamış taslak = var olmayan URL.** `generateStaticParams()` zaten
süzülmüş `ALL_POSTS`'u okur ve `dynamicParams = false` olduğu için kapıdan
geçemeyen taslağın URL'i hiç oluşmaz. Bu koşullu bir gizleme değil, yapısal.

### JSON-LD

`lib/schema.ts` tek kaynak. **`graph()` sarmalayıcısı ZORUNLU** — `@context`
olmadan bir node dizisi geçerli JSON-LD değildir ve sessizce yok sayılır
(kardeş projede yaşandı, parse hatası vermiyor).

schema.org **domainIncludes disiplini:** `inLanguage`, `about`, `isPartOf`,
`mainEntityOfPage` yalnızca `CreativeWork` türevlerine yazılabilir. `Place` ya
da `Service` düğümüne yazmak ihlaldir ve hiçbir parse hatası vermez. Yeni bir
özellik eklerken o özelliğin domain'ini kontrol et.

## Tasarım sistemi — "Coastal Calm"

Ferah, sakin, nefes alan bir Florida gündüzü. **Krem/bej YASAK** (kardeş yayın
miamigezi o alanı tutuyor; iki site birbirine benzemeyecek). Bu yasak artık
niyet değil, ÇALIŞAN KAPI — iki katman, ikisi de exit 1:

- **Statik:** `npm run palette:check` — `src/` + `public/` içindeki her renk
  literalini (hex / rgb / hsl / **oklch** / isimli renk / Tailwind sıcak-nötr
  sınıfı) OKLCH'e çevirir. Yasak liste + **sıcak nötr bandı**:
  `L ≥ 0.70` · `0.0012 ≤ C ≤ 0.08` · `40° ≤ hue ≤ 118°`. Bant liste yerine
  ölçü kullanır — `#E8DDD0` yasaklanınca `#E9DECF` yazılmasını da keser.
  `prebuild`'e bağlı: Vercel deploy'u dahil her `npm run build` bu kapıdan
  geçer.
- **Render:** `npm run palette:render` — build alır, `next start` eder,
  headless Chrome'u CDP ile sürer, her sayfada zemini ölçer.
  Neden ayrı katman: `color-mix(in oklch, var(--color-sun) 12%, white)`
  kaynakta HİÇ renk literali içermez, `rgba(255,209,102,.12)` ise computed
  style'da sun kromasıyla (0.135) bandın dışında görünür — ama ekranda ikisi
  de krem. Bu yüzden ham computed değil, **ata zinciri beyaz üstüne kompozit
  edilip 1×1 canvas'tan okunan BOYANMIŞ PİKSEL** sınıflandırılır.

Bant sayılarına dokunmadan önce kalibrasyona bak (`scripts/palette-guard.mjs`
başlığı): meşru palet banda üç ayrı gerekçeyle uzak — mist/line SOĞUK hue
(183°), beyaz/gri AKROMATİK (C=0), sun/coral/palm/sea YÜKSEK KROMA
(sun C=0.135, tavanın 1.7 katı). Kapı `--self-test` ile iki yönlü korunur
(18 mutasyon yakalanmalı, 16 meşru yazım geçmeli) — yeni kural eklerken
İKİSİNİ birden ekle.

- Zemin `--color-page` #FFFFFF, ikincil `--color-mist` #EFF9F7
- Metin `--color-ink` #0B2E2B · `--color-ink-soft` #3A5C57 (7.37:1) ·
  `--color-mute` #55706C (5.36:1)
- Çizgi `--color-line` #D4E7E3 · `--color-line-strong` #B4D4CE
- Birincil `--color-palm` #0E9F6E · ikincil `--color-sea` #2AA8E0 ·
  vurgu `--color-coral` #FF6B5E · az dozda `--color-sun` #FFD166
- Metin için koyu varyantlar: `palm-deep` #067A53, `sea-deep` #0A6C93,
  `coral-deep` #C4372C

**KONTRAST KURALI:** parlak dörtlü (palm/sea/coral/sun) beyaz üstünde METİN
olarak KULLANILMAZ — palm 3.39, sea 2.70, coral 2.79, sun 1.44. Beyaz üstünde
metin gerekiyorsa `-deep` varyantı kullanılır. Aynı renkler `--color-ink`
zemininde güvenlidir (palm 4.31, sea 5.40, coral 5.22, sun 10.11) — koyu
bantlarda kullanılan tam da bu.

- Fontlar: **Bricolage Grotesque** (display, `--font-bricolage`) + **Public
  Sans** (gövde, `--font-public-sans`). İkisi de `latin` + `latin-ext`
  subset'i ile yüklenir — `latin-ext` olmadan tarayıcı ı/ş için fallback fonta
  düşer ve satır içinde iki font karışır.
- İmza sınıfları (`globals.css`): `.tide` (renkli ince gradyan çizgi,
  `-coral/-sea/-sun` varyantları), `.chapter-num` (bölüm numarası),
  `.horizon` (yatay ayraç), `.swell` (staggered giriş animasyonu,
  `--i` değişkeniyle), `.prose-fr` (okuma kolonu), `.tabular`.
- Ölçek tokenları: `--text-hero/h1/h2/h3/body/small/label`, `--spacing-band`,
  `--spacing-stack`, `--container-prose: 68ch`, `--container-page: 74rem`.
- Kart ızgarası deseni bilinçli olarak KULLANILMIYOR — ana sayfa numaralı bir
  bölüm listesi. Editoryal kimlik bundan geliyor; "kartlara çevirelim" bir
  sadeleştirme değil, kimliğin kaybı.
- `body { overflow-x: hidden }` mobil taşma emniyet ağı olarak duruyor; ama
  gerçek taşmayı gizlemek için bahane değil — 393px'te `scrollWidth ===
  clientWidth` ölçülerek doğrulanır.

## İçerik hattı (günlük blog)

`scripts/generate-blog-post.mjs` → kalite kapısı → `generated-posts.json`.
Model: **`anthropic/claude-sonnet-5`** (OpenRouter). **Gemini 3.x thinking
modelleri KULLANILMAZ** — structured output çağrısında `content` boş döner ve
hat her gün sessizce `needs_review`'a düşer.

Kapı bu projenin yasaklarının çalıştırılabilir hâlidir; prompt'ta rica etmek
yeterli değildir. `npm run blog:test` iki yönlü: 18 mutasyon yakalanmalı, 8
meşru yazım geçmeli. Yeni kural eklerken İKİSİNİ birden ekle.

Marka gerçekleri SSOT'u `public/llms.txt` — prompt izinli iddiaları ve kapsam
sınırını oradan okur. Adres/iletişim/konumlandırma değişirse ÖNCE llms.txt.

Ayrıntılı işletim rehberi: `docs/blog-pipeline.md`.

## Komutlar

```bash
npm run dev            # localhost:3000
npm run build          # SSG — tüm rotalar prerender edilmeli
npm run lint
npm run palette:check  # krem/bej statik kapısı (prebuild'de otomatik)
npm run palette:test   # palet kapısının birim testi (iki yönlü)
npm run palette:render # gerçek render — headless Chrome, boyanmış piksel
npm run blog:test      # kalite kapısı birim testi (API yok)
npm run blog:dry       # uçtan uca prova (API yok, dosya yazmaz)
npm run blog:generate  # gerçek üretim
```

## Env

`.env.example` isim + açıklama taşır, DEĞER TAŞIMAZ. Şu an tek değişken:
`NEXT_PUBLIC_GA4_MEASUREMENT_ID` (tarayıcıya gider, gizli değil).
`NEXT_PUBLIC_*` BUILD anında gömülür — Vercel'e ekledikten sonra yeniden
deploy edilmezse ölçüm çalışmaz. `OPENROUTER_API_KEY` yalnızca GitHub Actions
secret'ıdır, siteye hiç girmez.

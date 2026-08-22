# LEARNINGS ARŞİVİ — floridarehberi

> Tam vaka anlatıları. Bu dosya oturum başında OKUNMAZ; yalnızca buradaki bir
> başlığa benzeyen bir semptomu debug ederken açılır. Kompakt özet:
> `LEARNINGS.md`.

---

## 2026-08-22 — "Krem/bej yasak" kuralı 4 aydır yalnız yazılı bir niyetti

**Problem.** Tasarım sistemi krem/bej'i yasaklıyor (kardeş yayın miamigezi o
alanı tutuyor), ama kuralı hiçbir şey uygulamıyordu. Denetimde `src/` temiz
çıktı — yani ihlal YOKTU; sorun kuralın bir sonraki "biraz sıcaklık katalım"
düzenlemesinde sessizce delinebilecek olmasıydı. İhlal aramak değil, ihlali
imkânsızlaştırmak gerekiyordu.

**Elenen seçenekler.**
- *Yalnız yasak-hex listesi* → işe yaramaz. `#E8DDD0` yasaklanınca bir sonraki
  düzenleme `#E9DECF` yazar; liste yalnız kendi elemanlarını korur, rengi değil.
- *HSL bandı* → aşırı açık renklerde doygunluk patlıyor: `#FFFEFC` HSL'de
  `s=100%` verir (L→1 iken payda sıfıra gider). Krem tam da o bölgede yaşıyor,
  yani ölçüm aracının kör noktası hedefin tam üstüne düşüyordu. OKLCH kroması
  algısal ve kararlı: aynı renk C=0.0013.
- *`@theme { --color-*: initial }` ile Tailwind varsayılan paletini tamamen
  silmek* → beji temsil edilemez yapardı ve daha güçlü bir çözümdür, AMA
  `bg-white`/`text-black` dahil her varsayılan yardımcıyı da siler; tasarım
  sistemine dokunmak bu görevin kapsamı değildi. Yerine Tailwind'in sıcak-nötr
  ailesi (`stone-50..300`, `amber|orange|yellow-50..200`) sınıf düzeyinde
  yasaklandı. Kapsam genişletilecekse ilk aday bu.
- *Yalnız statik tarama* → aşağıdaki kök neden yüzünden yetersiz.
- *Yalnız render taraması* → build gerektirir, deploy yolunda ucuz değil ve
  yorumdaki/ölü koddaki bej'i hiç görmez.

**Semptomdan uzaktaki kök neden (asıl bulgu).** Statik tarama "kaynakta krem
literali var mı" sorusunu yanıtlar; kuralın gerçek konusu ise "ekranda krem
var mı". İkisi ayrışıyor:
- `color-mix(in oklch, var(--color-sun) 12%, white)` kaynakta HİÇ renk
  literali içermez → statik kapı kör.
- `rgba(255, 209, 102, 0.12)` computed style'da sun'ın kromasıyla (C=0.135)
  görünür, yani bandın 1.7 katı uzağında "temiz" okunur — ama beyaz üstüne
  boyandığında piksel `rgb(255, 250, 238)`, düpedüz krem.
Yani ham computed değeri sınıflandırmak YANLIŞ soruyu sorar. Doğru ölçüm
birimi BOYANMIŞ PİKSEL: elemanın ata zincirindeki tüm zeminler beyaz üstüne
1×1 canvas'a sırayla boyanıp `getImageData` ile geri okunuyor. Alfa
kompozitini, oklch/color-mix dönüşümünü tarayıcının kendisi yapıyor — sRGB
matematiğini yeniden yazmıyoruz.

**İki küçük tuzak (ikisi de sahte yeşil üretirdi).**
1. `color-mix(..., transparent)` çıktısı `oklch(0.974097 0.0109078 none / 0.26)`
   biçiminde geliyor. CSS Color 4'te eksik bileşen `none` olarak serileşir ve
   kullanım değeri 0'dır; parser bunu NaN sayıp "çözülemedi" diye ihlal
   listesine düşürüyordu. Çözülemeyen rengi sessizce GEÇİRMEK de olmaz — o
   yüzden `none`→0 düzeltildi, çözülemeyen string ise hâlâ ihlal sayılıyor.
2. Chrome SIGKILL'den sonra profil dizinine yazmayı sürdürüyor; `rmSync`
   `ENOTEMPTY` fırlatıp GEÇEN bir koşuyu kırmızıya çeviriyordu. Temizlik artık
   `exit` bekliyor, 5 kez deniyor ve sonucu asla değiştirmiyor.

**Seçilen mimari.** İki katman, tek bant tanımı (`BAND` yalnız
`palette-guard.mjs`'te; render script'i onu import eder — ayrışamazlar).
- Statik: `scripts/palette-guard.mjs` → `npm run palette:check`, `prebuild`'e
  bağlı, yani Vercel deploy'u dahil her build bu kapıdan geçiyor.
- Render: `scripts/check-render-palette.mjs` → `npm run palette:render`;
  build + `next start` + headless Chrome (CDP, ek bağımlılık yok).
  Ölçümden ÖNCE `EADDRINUSE` ve `/_next/static/**` 200 kontrolü yapıyor —
  2026-08-08 vakasının (stilsiz sayfa denetimi sahte geçer) kodlanmış hâli.

**Bant kalibrasyonu (ölçülmüş).** `L ≥ 0.70` · `0.0012 ≤ C ≤ 0.08` ·
`40° ≤ h ≤ 118°`. Meşru palet banda üç ayrı gerekçeyle uzak: mist/line SOĞUK
hue (183°), beyaz/gri AKROMATİK (C=0.0000), sun/coral/palm/sea YÜKSEK KROMA
(sun C=0.135). Yani bant, paleti hiç tırmalamadan krem ailesini kapatıyor.

**Kanıt.** `npm run palette:test` → 18 mutasyon yakalandı, 16 meşru yazım
geçti. Sabotajlar: `#FAF9F6` (liste) exit 1 · `#EDE4D6` (listede yok, bant)
exit 1 · `oklch(0.95 0.02 80)` (paletin kendi dili) exit 1 · `bg-stone-100`
exit 1 · sabotajlı `npm run build` exit 1 (prebuild kesti, `next build` hiç
çalışmadı). Literalsiz sabotaj (`color-mix` + `rgba` yıkaması): statik kapı
exit 0 (beklenen körlük), render kapısı 55 bulguyla exit 1 — `body` →
`rgb(255, 250, 238)`, hatta yarı saydam sticky header krem gövde üstünde
`rgb(255, 255, 254)` (C=0.0013, bant tabanının hemen üstü). Temiz ağaç:
18 sayfa, 158 boyanmış zemin, hepsi bant dışı.

**Kural.** Bir tasarım yasağını "renk listesi" olarak değil ÖLÇÜLEBİLİR BANT
olarak yaz, ve ekrandaki rengi ham computed değerden değil kompozit edilmiş
pikselden oku — alfa yıkaması ve `color-mix` kaynakta hiçbir iz bırakmaz.

---

## 2026-08-08 — Lighthouse a11y 100 verdi ama sayfa STİLSİZDİ (yanlış yeşil)

**Problem.** Erişilebilirlik denetimi `color-contrast` ve
`label-content-name-mismatch` hatalarını gösteriyordu. İkisi de düzeltildi,
`npm run build` temiz geçti, sunucu yeniden başlatıldı, Lighthouse tekrar
koşuldu: `color-contrast` GİTMİŞTİ — ama yerine hiç görülmemiş bir
`target-size` hatası çıktı ve daha önce 100 alan `/blog` da 96'ya düştü.
Yani "düzeltme" skorları iyileştirmiş gibi görünürken aslında ölçüm zeminini
kaydırmıştı.

**Semptomdan uzaktaki kök neden.** Önceki turdan kalan bir `next start`
süreci 4311 portunu hâlâ tutuyordu. Yeni sunucu `EADDRINUSE` ile ölmüştü
(hata yalnızca log dosyasına yazıldı, `curl` ise ESKİ süreçten anında 200
döndüğü için "hazır" sanıldı). Eski süreç eski HTML'i servis ediyordu; o
HTML'in işaret ettiği içerik-hash'li CSS chunk'ı ise yeni build tarafından
değiştirilmişti → **stylesheet 500 dönüyordu**. Stilsiz sayfa varsayılan
siyah-beyaz olduğu için `color-contrast`'ı zahmetsizce geçti; nav
bağlantıları padding'ini kaybettiği için `target-size` düştü.

**Elenenler.**
- "`target-size` benim `-my-3 py-3` düzeltmemden çıktı" → yanlış teşhis;
  padding hit alanını büyütür, küçültmez.
- "axe örneklemesi belirlenimci değil, tur tur değişiyor" → yanlış; axe
  aynı DOM'da aynı sonucu verir, değişen DOM'du.
- "`.next` önbelleği bayat, temiz build al" → sorunu maskeleyip geri
  getirirdi; build zaten doğruydu, servis edilen şey yanlıştı.
- "Sunucuyu yeniden başlatmak yeter" → başlatma zaten SESSİZCE
  başarısızdı; eksik olan başlatma değil, başlatmanın DOĞRULANMASIYDI.

**Seçilen.** Doğrulama zincirine varlık sağlığı kapısı eklendi: her sayfanın
HTML'i çekilir, içindeki `/_next/static/**.{css,js}` referansları toplanır ve
hepsinin 200 döndüğü tek tek doğrulanır. Skor okumadan ÖNCE bu kapı geçilmeli.
Ayrıca sunucu başlatıldıktan sonra `lsof -ti :PORT` ile sürecin GERÇEKTEN
bizim yeni süreç olduğu, log'da `EADDRINUSE` olmadığı kontrol edilir.

**Kanıt.** `cat /tmp/fr-server.log` → `Error: listen EADDRINUSE :::4311`;
sayfanın referans verdiği `/_next/static/chunks/2pea5ec9qvm9h.css` → HTTP
**500**. Eski süreç öldürülüp yeniden başlatıldıktan sonra: 16/16 sayfa
"HTML 200 + 8 varlık 200", servis edilen HTML'de
`aria-label="floridarehberi — ana sayfa"` ve CSS'te
`--color-numeral:#609189` doğrulandı, ardından beş sayfada a11y 100 / SEO 100.

**Kural.** Denetim skoru, sayfanın KENDİ CSS/JS varlıklarının 200 döndüğü
doğrulanmadan okunmaz. Stilsiz sayfa kontrast denetimini sahte geçer —
bozuk stylesheet üstünde alınan yeşil, kırmızıdan daha tehlikelidir.

---

## 2026-08-08 — `aria-hidden` kontrast muafiyeti sanıldı; künye adı sesli komutla çağrılamıyordu

**Problem.** İki WCAG hatası aynı anda duruyordu.
(a) `.chapter-num` bölüm rakamları `--color-line-strong` (#B4D4CE) ile
çiziliyordu: mist üstünde **1.47:1**, beyazda 1.58:1. CSS yorumu bunu
"`aria-hidden` — dekoratif kontrast yeterli" diye gerekçelendiriyordu.
(b) Başlıktaki künye bağlantısının erişilebilir adı `${SITE.name} — ana sayfa`
= "Florida Rehberi — ana sayfa", ekranda yazan ise boşluksuz
"floridarehberi".

**Elenenler.**
- (a) için "aria-hidden olduğu için muaf" → YANLIŞ: `aria-hidden` yalnız
  erişilebilirlik ağacından çıkarır, rakam ekranda durmaya devam eder ve az
  gören kullanıcı onu okur; axe/Lighthouse de bu metni denetler.
- (a) için tek koyu ton (`#5A736D`, 4.76:1) → geçerdi ama 52px'lik imza
  rakamını gövde metni ağırlığında koyu bir kütleye çevirip H1 ile
  yarıştırırdı.
- (a) için mevcut `--color-mute` (4.99:1) → aynı ağırlık sorunu, üstelik
  rakamı gövde metninden ayırt edilemez kılardı.
- (b) için `aria-label`'ı tamamen kaldırmak → ad kendiliğinden eşleşirdi ama
  "ana sayfa" bağlam bilgisi kaybolurdu.
- (b) için künyeyi "Florida Rehberi" diye yazmak → marka kimliği kararını
  erişilebilirlik hatası yüzünden bozmak olurdu.

**Seçilen.** (a) Eşik puntoya göre DEĞİŞTİĞİ için iki token: `--color-numeral`
(#609189 — 3.31 mist / 3.55 beyaz) ≥24px "büyük metin" örnekleri için,
`--color-numeral-deep` (#5A736D — 4.76 / 5.11) ise `.chapter-num-sm` ile
15–18px satır içi örnekler için. Küçük örneklerin `group-hover` rengi de
`text-palm` → `text-palm-deep`'e çekildi (palm beyazda 3.39:1, küçük metni
taşımaz). (b) `SITE.wordmark = 'floridarehberi'` eklendi; erişilebilir ad
buradan üretiliyor, `SITE.name` başlıkta kullanılmıyor.

**Kanıt.** Beş sayfada Lighthouse: her ikisi de listeden düştü, a11y 100.
Servis edilen CSS'te `--color-numeral:#609189` ve
`--color-numeral-deep:#5a736d` görüldü.

**Kural.** `aria-hidden` bir kontrast muafiyeti DEĞİLDİR. Ve kontrast eşiği
tek sayı değildir: ≥24px (veya ≥18.66px kalın) için 3:1, altındaki her şey
için 4.5:1 — aynı sınıf iki puntoda kullanılıyorsa iki tona ihtiyaç var.

---

## 2026-08-08 — Sıfırdan kuruluş: kardeş projeden taşınan kararlar

**Bağlam.** Site, `~/code/miamigezi` mimari şablonundan türetildi: Next.js
SSG, günlük blog hattı, onay kapılı GA4, IndexNow. Aşağıdakiler kopyalama
sırasında bilinçli olarak DEĞİŞTİRİLEN ya da kaynakta bulunup düzeltilen
noktalar.

**1. Kaynakta bulunan latent bug: `@context`'siz JSON-LD.** miamigezi'de şema
düğümleri bir dizi olarak `JSON.stringify` ediliyordu. Çıktı geçerli JSON,
sayfada `<script type="application/ld+json">` içinde duruyor, hiçbir hata
vermiyor — ama `@context` olmadığı için hiçbir tüketici onu yapılandırılmış
veri saymaz. Yani şema aylarca "var gibi" görünüp hiç çalışmamış. Buraya
taşınırken `lib/schema.ts` içine `graph(nodes)` sarmalayıcısı kondu; tüm
sayfalar tek `@graph` yayınlıyor. Ders: yapılandırılmış veriyi "parse ediyor"
diye geçerli sayma.

**2. Renk kimliği ayrımı bir marka kararı, estetik tercih değil.** İki yayın
aynı yayıncıya ait ve birbirine link veriyor; görsel olarak ayırt edilemezlerse
"aynı şablondan üretilmiş uydu ağı" izlenimi doğar. Brief bu yüzden krem/bej'i
açıkça yasakladı. Palet beyaz + çok soluk aqua zemine, koyu deniz yeşili
metne, palmiye yeşili/deniz mavisi/mercan vurguya kuruldu.

Kurulum sırasında ölçülen kontrastlar (WCAG AA metin eşiği 4.5:1):

| Renk | Beyaz üstünde | `ink` (#0B2E2B) üstünde |
|---|---|---|
| palm #0E9F6E | 3.39 ✗ | 4.31 ✓ |
| sea #2AA8E0 | 2.70 ✗ | 5.40 ✓ |
| coral #FF6B5E | 2.79 ✗ | 5.22 ✓ |
| sun #FFD166 | 1.44 ✗ | 10.11 ✓ |

Marka renkleri beyaz zeminde METİN olarak kullanılamıyor. Çözüm iki katmanlı:
(a) beyaz zeminde metin için `palm-deep` / `sea-deep` / `coral-deep`
varyantları türetildi, (b) parlak dörtlü koyu bantlarda ve dekoratif
öğelerde (`.tide` çizgisi, bölüm numaraları) kullanılıyor. "Rengi
canlandıralım" isteği geldiğinde ölçüm yapılmadan değiştirilmemeli.

**3. Font seçimi reflekse bırakılmadı.** `impeccable` skill'inin
`reflex_fonts_to_reject` listesi Inter ve Plus Jakarta Sans dâhil olmak üzere
alışılmış tercihleri kapatıyor. Marka üç kelimeyle tanımlandı (ferah, sakin,
bilgili), oradan **Bricolage Grotesque** (display — hafif tuhaf, sıcak,
editoryal) + **Public Sans** (gövde — kamu kurumu tipografisi geleneğinden,
"resmî bilgi" tonuna oturuyor) seçildi. İkisi de `latin` + `latin-ext`
subset'iyle yükleniyor; `latin-ext` olmadan tarayıcı ı/ş için fallback fonta
düşer ve tek satırda iki font karışır.

**4. Ana sayfa kart ızgarası DEĞİL, numaralı bölüm listesi.** Kart ızgarası
bu içerik için varsayılan çözümdü ve tam da bu yüzden reddedildi: on rehber
eşit ağırlıklı on kart olarak çizildiğinde site "jenerik içerik portalı"
gibi okunuyor. Numaralı liste (`.chapter-num` + tam genişlik satırlar) el
kitabı metaforunu taşıyor ve okuma sırası öneriyor.

**5. Kalite kapısına iki yeni sert yasak eklendi.** Kaynak projede olmayan,
bu yayının kimliğinden doğan iki kural:

- **Vize/göçmenlik yasağı.** Konu ayrı bir yayında ele alınıyor; burada
  yanlış bilginin bedeli ağır. Regex statü ve prosedür terimlerini hedefler
  (`vize\w*`, `göçmenlik`, `oturum/ikamet/çalışma izni`, `yeşil kart`,
  `uscis`, `i-94`, `h-1b`, `eb-5`, `iltica`…). Tek başına demografik anlamdaki
  **"göçmen"** kelimesi BİLİNÇLİ olarak serbest bırakıldı — "bölgede göçmen
  nüfusu yoğun" cümlesi yasak değil, statü tarif etmiyor. Bunun için ayrı bir
  yanlış-pozitif sondası var.
- **Uydurma tanıklık yasağı.** "bir okurumuz", "bir tanıdığım",
  "deneyimlerimize göre" gibi kalıplar. Bu site tanıklık yayınlamıyor;
  doğrulanamayan anlatı uydurmadır ve tam olarak modelin doldurmaya meyilli
  olduğu boşluktur.

Ayrıca `\d+\s*kat` kuralı eklendi: "üç kat pahalı" kaynağı olmayan bir orandır,
yüzde iddiasından farkı yoktur — hedge ya da aralık ister.

**6. Türkçe `\b` tuzağı, kaynak projeden aynen taşındı.** JS'te `\b` ASCII
kelime sınırıdır. Para taramasındaki `dolar` ifadesinin sonuna `\b` konursa
"dolardır" / "dolardan" eşleşmez ve kural sessizce ölür. Kaynak dosyada bu bir
satır içi uyarı olarak duruyordu; buraya da aynen taşındı. Aynı sınıftan ikinci
tuzak: `STOPWORDS` listesinin normalize edilmemiş hâlde saklanması.

**7. Self-test mutasyonunun hangi kurala takıldığı önemli.** İlk yazımda
"e-posta yasağı" mutasyonu `destek@ornekfirma.net` kullanıyordu ve test yeşildi
— ama yakalayan kural e-posta kuralı değil, alan adı allowlist'iydi. Yani
e-posta kuralı tamamen silinse test yine geçerdi. Mutasyon izinli bir alan
adına çevrildi (`destek@floridarehberi.com`), böylece yalnızca hedef kural
yakalayabiliyor. Genel ders: bir mutasyonun YAKALANMASI yetmez, DOĞRU KURAL
tarafından yakalanması gerekir.

**8. Sitemap `lastModified` build zamanından türemiyor.** `new Date()`
kullanmak her deploy'da tüm URL'leri "değişti" diye işaretler; hiçbir şey
değişmediği hâlde tarama bütçesi harcanır ve sinyal anlamsızlaşır. Tarihler
`GUIDES[].updated` ve `ALL_POSTS[].updatedAt` alanlarından geliyor,
`latestContentDate()` en yenisini seçiyor.

**9. robots.txt AI tarayıcılarını KAPATMIYOR.** Bu bir gözden kaçma değil:
yayının işi alıntılanmak. GPTBot / ClaudeBot / PerplexityBot / Google-Extended
engellenirse GEO hedefinin tam tersi yapılmış olur. "AI botlarını kapatalım"
isteği gelirse görünürlük maliyeti ayrıca konuşulmalı.

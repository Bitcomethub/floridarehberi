# LEARNINGS ARŞİVİ — floridarehberi

> Tam vaka anlatıları. Bu dosya oturum başında OKUNMAZ; yalnızca buradaki bir
> başlığa benzeyen bir semptomu debug ederken açılır. Kompakt özet:
> `LEARNINGS.md`.

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

# LEARNINGS — floridarehberi (kompakt)

> Her oturum başında BU dosya okunur. Tam vaka anlatıları
> `LEARNINGS_ARCHIVE.md`'de — oraya yalnızca benzer bir semptomu debug ederken
> bakılır. Bu dosya ~12.000 karakteri aşmamalı; aşarsa en az kritik madde
> arşive taşınır.

## Kalıcı kurallar

**Üretken görsel modelinde "logo" isteyeceksen model ailesini doğru seç.**
Recraft'ın `*_illustration` aileleri editoryal SAHNE çizer ve negative prompt'u
onurlandırmaz — prompt sıkılaştırmak çözmez (2 tur ispatlandı). Marka işareti
için `fal-ai/ideogram/v3` + `style: DESIGN` + `negative_prompt` +
`color_palette`, ve **`expand_prompt: false`** (açıksa MagicPrompt manzarayı
geri getirir). Model yeteneğini şema enum'undan doğrula, hafızadan değil.
Raster→SVG'de `recraft/vectorize` ALFAYI DÜZLEŞTİRİR; yerel `potrace` ile
alfadan izle. Anahtar: `~/.config/superpowers/worktrees/vitrin-ai/fal-logo/.env.local`.

**Başlığa görsel eklemek sarma eşiğini taşır — ölç, sonra breakpoint'le çöz.**
Marka işareti tek-satır eşiğini 352→375px'e itti. Çözüm ikon'a
`hidden min-[375px]:block` vermek oldu (`display:none` flex öğesini kutudan
çıkarır, `gap` de uygulanmaz → dar ekran birebir eski hâline döner). Başlığın
ölçülmüş `gap` değerlerine DOKUNULMADI. Ölçüm: headless Chrome CDP, sarma
tespiti `header` YÜKSEKLİĞİNDEN (nav.top karşılaştırması yanıltıyor).

**JSON-LD `@context` olmadan sessizce yok sayılır.** Node dizisini doğrudan
`JSON.stringify` etmek geçerli görünen ama hiçbir arama motorunun okumadığı
bir çıktı üretir; parse hatası da vermez. Bu yüzden `lib/schema.ts`'teki
`graph()` sarmalayıcısı zorunlu. (Kardeş projede canlıya çıkmış hâli
bulundu.)

**schema.org `domainIncludes` ihlalleri parse hatası vermez.** `inLanguage`,
`about`, `isPartOf`, `mainEntityOfPage` yalnız `CreativeWork` türevlerine
yazılabilir; `Place` / `Service` düğümüne yazmak sessiz hatadır. Yeni bir
özellik eklerken önce o özelliğin domain'ini doğrula.

**`new Date()` uygulama kodunda kullanılmaz.** Vercel UTC'de build alır;
build zamanı damgası sitemap'te tüm URL'lerin `lastModified` değerini her
deploy'da değiştirir ve tarama sinyalini anlamsızlaştırır. Tarih içeriğin
kendi alanından gelir; footer yılı sabittir. İstisna: Node hattı script'i.

**Onay gating'i RENDER'ı kontrol eder, görünürlüğü değil.** CSS ile gizlenen
`<Script>` yine yüklenir ve çerez yazar. Üçüncü parti JSX yalnızca
`consent === 'granted'` iken ağaca girmeli. "Reddet" butonu "Kabul et" ile
aynı ağırlıkta olmak zorunda (GDPR Art. 7(3) / EDPB 05/2020).

**Türkçe metin taramasında ASCII `\b` güvenilmezdir.** JS'te `\b` ASCII kelime
sınırıdır; `ö`, `ç`, `ş` non-word sayılır. Bir Türkçe kelimenin sonuna `\b`
koymak kuralı sessizce etkisiz kılabilir. Somut vaka: `dolar\b` — Türkçe ek
alan "dolardır" eşleşmez, para kuralı devre dışı kalır. Ek alan kelimelerde
sınır koyma.

**Normalize edilerek karşılaştırılan listeler normalize halde saklanır.**
`STOPWORDS` diacritic'li yazılırsa (`nasıl`) hiçbir zaman eşleşmez, çünkü
karşılaştırma `normalizeWord()` çıktısıyla yapılır. Liste `.map(normalizeWord)`
ile kurulur.

**Metin kuralları `JSON.stringify` üzerinden taranmaz.** Alan sınırları
cümleleri birbirine yapıştırır ve komşu alanın rakamını yanlış pozitif yapar.
Alanlar tek tek toplanır, sonra cümleye bölünür.

**Kalite kapısı testi iki yönlü olmak zorunda.** Yalnız "mutasyon yakalanıyor
mu" test edilirse kapı zamanla o kadar sıkılaşır ki hiçbir gerçek makale
geçmez ve hat her gün sessizce `needs_review`'a düşer. Her yeni kural için bir
ihlal mutasyonu VE bir meşru sonda eklenir. Mutasyon, hedeflediği kuraldan
başka bir kurala takılmamalı — aksi hâlde asıl kural silinse bile test yeşil
kalır.

**Gemini 3.x "thinking" modelleri structured output hattında kullanılmaz.**
Düşünme bütçesini tüketip `content` alanını boş döndürüyorlar; hat sessizce
her gün insan incelemesine düşer. `generateDraft()` boş içeriği artık açık
hata olarak fırlatıyor. Model değiştirmeden önce `--dry-run` ile gerçek bir
çağrı yapıp çıktının geldiğini gör.

**Renk yasağı liste değil BANT olur, ve ekrandaki renk kompozit edilmiş
pikselden okunur.** Krem/bej kapısı (`npm run palette:check` + `:render`)
her renk literalini OKLCH'e çevirip şu banda bakar: L≥0.70, C 0.0012–0.08,
hue 40°–118°. Liste yaklaşımı delinir (`#E8DDD0` yasaklanınca `#E9DECF`
yazılır); HSL ise aşırı açık renklerde doygunluğu patlatır (kör nokta tam
kremin üstünde). Ayrıca ham computed değer yanıltır: `rgba(255,209,102,.12)`
computed'da sun kromasıyla temiz görünür, ekranda krem boyar — bu yüzden
render katmanı ata zincirini beyaz üstüne kompozit edip 1×1 canvas'tan okur.
Bant sayısına dokunmadan önce `scripts/palette-guard.mjs` başlığındaki
kalibrasyona bak.

**Marka renkleri metin rengi değildir.** Coastal Calm'ın parlak dörtlüsü
(palm/sea/coral/sun) beyaz üstünde 1.44–3.39 kontrast verir. Beyaz zeminde
metin için `-deep` varyantları var; parlak olanlar yalnız koyu (`ink`) bantta
metin olabilir. "Rengi biraz canlandıralım" isteği geldiğinde ölçmeden değişme.

**Denetim skoru, sayfanın KENDİ varlıkları 200 dönmeden okunmaz.** Stilsiz
sayfa varsayılan siyah-beyazdır ve `color-contrast` denetimini sahte geçer.
Somut vaka: eski `next start` süreci portu tutuyordu, yeni sunucu `EADDRINUSE`
ile sessizce ölmüştü, eski HTML'in işaret ettiği hash'li CSS chunk'ı 500
dönüyordu — Lighthouse "düzeldi" dedi. Sunucu başlattıktan sonra log'da
`EADDRINUSE` olmadığını ve HTML'deki her `/_next/static/**.{css,js}`
referansının 200 döndüğünü doğrula; skoru ancak ondan sonra oku.

**`aria-hidden` kontrast muafiyeti DEĞİLDİR.** Erişilebilirlik ağacından
çıkarır, ekrandan çıkarmaz — az gören kullanıcı o metni okur, axe de denetler.
Ayrıca eşik tek sayı değil: ≥24px (veya ≥18.66px kalın) için 3:1, altındaki
her şey için 4.5:1. Aynı sınıf iki puntoda kullanılıyorsa iki ton gerekir —
`.chapter-num` / `.chapter-num-sm` bu yüzden ayrı.

**Erişilebilir ad, GÖRÜNEN metni içermek zorunda** (WCAG 2.5.3). Künye ekranda
boşluksuz "floridarehberi"; `aria-label`'a `SITE.name` ("Florida Rehberi")
yazmak sesli komut kullanıcısını dışarıda bırakıyordu. Başlıkta `SITE.wordmark`
kullanılır. Bir bağlantıya `aria-label` yazarken görünen metnin adın İÇİNDE
kaldığını kontrol et.

**Yayınlanmamış içerik = var olmayan URL.** `generateStaticParams()` süzülmüş
listeyi okur + `dynamicParams = false`. Koşullu gizleme (sayfa var ama boş)
yerine yapısal yokluk tercih edilir.

**Kapının yeşil yanması, o şeyi ÖLÇTÜĞÜ anlamına gelmez.** Krem/bej render
kapısı yalnız `backgroundColor`/`backgroundImage` örnekler; bir `<img>`
içindeki kum bej'ini HİÇ görmez ve sahte yeşil verir. Bu yüzden fotoğraf
yasağı render'da değil SEÇİM anında uygulanıyor: indirme aracı Unsplash'in
baskın rengini kapının kendi `isWarmNeutral()` bandından geçiriyor. Yeni bir
içerik türü (video, SVG, gömülü iframe) eklerken önce kapının ne
örneklediğini oku; ölçmediği bir alan varsa yasağı zincirin daha erkeninde
uygula. Fotoğraf bu nedenle `<img>` olmak zorunda — CSS `background-image`
hem alt metni öldürür hem kapıya çözülemeyen `url(...)` sokar.

**Yerel doğrulamada sabit port kullanma; HTTP 200 kimlik değildir.** `-p 4399`
ile açılan sunucu sessizce ölüp port başka bir projenin dev sunucusunda
kalabilir; o da her yola 200 + `text/html` döner ve "varlıklar sağlam"
yanılsaması üretir (yaşandı: `.webp` isteğine `<title>Vetto</title>` döndü).
Portu `net.createServer()` ile çekirdekten iste ve yanıtın
`content-type`'ının beklenen tür olduğunu ayrıca doğrula.

**Stok fotoğraf TANIMLI bir yer gösteriyorsa, o yer konunun yeri olmak
zorunda.** "Temsilî" demek okuru yanıltmayı önlemez — okur fotoğrafa bakar,
alt metni okumaz. Kardeş projede hastane tabelası «Chinook Regional
Hospital, Lethbridge, Alberta», cami Abu Dabi çıktı; burada da
«SPRINGBANK MEDICAL CENTRE» (Londra, Ontario) seçilmişti. Kural artık
çalıştırılabilir: `ContentImage.place` `string | null` (isteğe bağlı DEĞİL,
"yer iddiası var mı" sorusuna açık cevap zorunlu) + `npm run images:check`
prebuild'de. Ayrıca arama yanıtı `location` alanını TAŞIMAZ — açıklamada yer
adı geçmemesi yerin belirsiz olduğu anlamına gelmez; `GET /photos/:id`
(`--verify`) ile bakılır. Süreç/belge konularında NESNE çekimi seç: bir
sigorta evrakı hangi ülkede çekilirse çekilsin aynı görünür.

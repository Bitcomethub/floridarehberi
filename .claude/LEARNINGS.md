# LEARNINGS — floridarehberi (kompakt)

> Her oturum başında BU dosya okunur. Tam vaka anlatıları
> `LEARNINGS_ARCHIVE.md`'de — oraya yalnızca benzer bir semptomu debug ederken
> bakılır. Bu dosya ~12.000 karakteri aşmamalı; aşarsa en az kritik madde
> arşive taşınır.

## Kalıcı kurallar

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

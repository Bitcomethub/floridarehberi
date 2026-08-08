# İçerik hattı — işletim rehberi

Her sabah 06:30 UTC'de (09:30 İstanbul) bir GitHub Action çalışır, konu
kuyruğundan sıradaki başlığı alır, modele yazdırır, **çalıştırılabilir bir
kalite kapısından** geçirir ve geçtiyse repoya commit'ler. Push, Vercel
deploy'unu tetikler; yeni yazı `sitemap.xml`'e otomatik girer.

Bu doküman hattı **işletmek** içindir: nerede ne var, ne zaman kırılır, nasıl
müdahale edilir.

---

## 1. Parçalar

| Dosya | Rolü |
|---|---|
| `content/blog-topic-backlog.json` | Konu kuyruğu (30 konu). Hat buradan sıradaki `pending` konuyu alır, yayınlayınca `status`'ü `published` yapar. |
| `scripts/generate-blog-post.mjs` | Hattın tamamı: konu seçimi → prompt → API → kalite kapısı → yayın. |
| `scripts/fixtures/mock-post.json` | Kapının birim testi fixture'ı. Gerçek yazı DEĞİL, yayınlanmaz. |
| `public/llms.txt` | **Marka gerçekleri SSOT'u.** Prompt, izinli iddiaları ve kapsam sınırını buradan okur. |
| `src/content/blog/generated-posts.json` | Hattın append ettiği yayınlanmış yazılar. Elle büyütme. |
| `src/content/blog/types.ts` | `BlogPost` şekli. Script'teki `OUTPUT_SCHEMA` ve `assemblePost` ile senkron kalmak zorunda. |
| `content/rejected-drafts/` | Kapıdan 2 kez dönen taslaklar (inceleme için). Git'te tutulur. |
| `.github/workflows/daily-blog-post.yml` | Cron + manuel tetikleme + IndexNow ping. |

---

## 2. Günlük akış

```
konu seç (ilk pending, slug çakışması varsa atla)
   ↓
llms.txt'ten marka gerçeklerini oku  →  system prompt
   ↓
OpenRouter → anthropic/claude-sonnet-5 (structured output)  →  taslak
   ↓
validatePost()  ──✗──►  aynı prompta "şu sorunlar var" geri bildirimi + 1 retry
   ↓ ✓                        ↓ yine ✗
generated-posts.json'a append   content/rejected-drafts/ + backlog'da needs_review
   ↓                            ↓
commit + push → Vercel deploy   job KIRMIZI (e-posta bildirimi)
   ↓
IndexNow ping (Bing/Yandex)
```

Retry **aynı konuyla** yapılır, yeni konuya atlanmaz: konu kuyruğunu sessizce
tüketmek, bir konunun neden geçemediğini görünmez kılar.

---

## 3. Kalite kapısı — neyi neden eliyor

Kapı `validatePost()` içinde. Kuralların çoğu bu projenin **yasaklarının
çalıştırılabilir hâli**; "prompt'ta rica etmek" yeterli değil, çünkü prompt
ihlali sessizce geçer, kapı ihlali kırmızıya boyar.

| # | Kural | Neden |
|---|---|---|
| 1 | Şekil: intro 1-3 paragraf, 4-7 bölüm, ≥4 FAQ, ≥4 keyword | Şekil bozuksa kalan kontroller anlamsız — erken döner. |
| 2 | **Answer-first**: ilk cümle soru olamaz, ≥8 kelime, konunun sorusuyla ≥2 kök örtüşmesi | AI arama motorları pasajı bağlamsız alıntılar. "Bu yazıda anlatacağız" alıntılanamaz. |
| 3 | Bölümlerin ≥%60'ı soru başlıklı; bölüm başına 110-260 kelime (hedef 135-170); çapraz referans yasak | Alıntılanan birim bölümdür. Kısa bölüm cevap taşımaz, uzun bölüm alıntılanmaz, "yukarıda bahsettiğimiz" bağlamsız okununca kırılır. |
| 4 | FAQ cevabı 25-120 kelime, soru `?` ile biter | FAQPage şeması bu şekliyle alıntılanıyor. |
| 5 | Diacritics yoğunluğu ≥30, `Istanbul` yasak | ASCII'leşme (ı→i, ş→s) Türkçe metnin en sık sessiz bozulması. |
| 6 | **Vize/göçmenlik/oturum izni terimleri yasak** | Bu sitenin sert kapsam sınırı. Konu ayrı bir yayında ele alınıyor; burada yanlış bilginin bedeli ağır. Demografik anlamdaki tek başına "göçmen" kelimesi bilinçli olarak serbest. |
| 7 | **Uydurma tanıklık yasak** ("bir okurumuz", "bir tanıdığım", "deneyimlerimize göre") | Bu site tanıklık yayınlamıyor; doğrulanamayan anlatı uydurmadır. |
| 8 | Para geçen cümle hedge ya da aralık ister | Kira/prim/ücret oynak. Sabit rakam yazan yazı yayınlandığı gün eskir. |
| 9 | Yüzde/oran hedge ister (kanonik sayılar hariç: `%6` eyalet satış vergisi, `%100`) | Kaynağı olmayan istatistik en kolay uydurulan şey. |
| 10 | Çerçevesiz "X kat" karşılaştırması yasak | Yüzde iddiasının kelimeyle yazılmış hâli; aynı kural uygulanır. |
| 11 | Alan adı allowlist'i (yalnız Florida/ABD resmî kurumları + kendi domainimiz) + ham URL yasağı | Affiliate/aracı bağlantısı yapısal olarak imkânsız hale gelir. |
| 12 | Yazıda `miamili` geçmesi yasak | Sahiplik footer künyesinde yazıyor. Her gün marka bahsi eklemek tam da kaçınılan link-ağı desenidir. |
| 13 | Telefon / e-posta / sokak adresi yasak | Bu sitenin telefonu ve ofisi yok; kurum adresleri doğrulanamıyor. `911` gibi kısa acil numaralar serbest. |

### Kapının kendi testi

```bash
npm run blog:test     # API çağırmaz, saniyeler sürer
```

Test **iki yönlü**: 18 mutasyon YAKALANMALI + 8 meşru yazım GEÇMELİ.

Tek yönlü olsaydı (sadece "mutasyon yakalanıyor mu") kapı zamanla o kadar
sıkılaşırdı ki hiçbir gerçek makale geçemez ve hat her gün sessizce
`needs_review`'a düşerdi. Yanlış-pozitif sondaları bunu engelliyor.

**Yeni kural eklerken ikisini birden ekle:** kuralı ihlal eden bir mutasyon VE
kurala takılmaması gereken meşru bir sonda. Mutasyonu, test etmek istediğin
kuraldan BAŞKA bir kurala takılmayacak şekilde yaz — aksi hâlde asıl kural
silinse bile test yeşil kalır (`e-posta` mutasyonu bu yüzden izinli bir alan
adı kullanıyor).

---

## 4. Komutlar

```bash
npm run blog:test      # kalite kapısı birim testi (API yok)
npm run blog:dry       # uçtan uca prova: fixture + dosya yazmadan (API yok)
npm run blog:generate  # gerçek üretim (OPENROUTER_API_KEY gerekir)

# tek seferlik varyasyonlar
node scripts/generate-blog-post.mjs --dry-run          # gerçek API, dosya yazma yok
node scripts/generate-blog-post.mjs --date=2026-09-01  # tarih override (test)
BLOG_MODEL=anthropic/claude-opus-4-8 npm run blog:generate
```

---

## 5. Model seçimi

Varsayılan: `anthropic/claude-sonnet-5` (OpenRouter üzerinden).

**Gemini 3.x "thinking" modelleri bu hatta KULLANILMAZ.** Structured output
çağrısında düşünme bütçesini tüketip `content` alanını boş döndürüyorlar; hat
sessizce her gün `needs_review`'a düşer. `generateDraft()` boş içeriği artık
açık bir hata olarak fırlatıyor, ama model değiştirmeden önce `--dry-run` ile
gerçek bir çağrı yapıp çıktının geldiğini görmek şart.

---

## 6. Sık karşılaşılan durumlar

**Job kırmızı, log'da `needs_review`.** Taslak kapıdan iki kez döndü.
`content/rejected-drafts/<tarih>-<slug>.json` içinde taslak + sorun listesi
var. Ya taslağı elle düzeltip `generated-posts.json`'a ekle, ya backlog'daki
konunun `angle` alanını netleştirip `status`'ü tekrar `pending` yap.

**`OPENROUTER_API_KEY tanımlı değil`.** Repo secret'ı eksik: Settings →
Secrets and variables → Actions. Hat bilinçli olarak sessizce atlamaz, kırmızı
düşer.

**"backlog'da pending konu kalmadı".** 30 konu bitti. Yeni konu eklerken:
slug tekilliği (10 rehber + tüm yazılar) VE mevcut yazılarla kanibalizasyon
kontrolü zorunlu. `angle` alanına neyin yazılmayacağını da yaz — prompt'un en
etkili kısmı orası.

**Aynı gün ikinci çalıştırma.** `generated-posts.json` içinde bugünün tarihi
varsa hat çıkar (dedupe guard). Manuel yayın için `--date=` ile ilerlet.

**Yazı yayınlandı ama sitede yok.** Push → Vercel deploy zinciri kopmuş
olabilir. Actions log'unda "Commit ve push" adımının `pushed=true` dediğini ve
Vercel'de main deploy'unun tetiklendiğini kontrol et.

---

## 7. Değiştirirken dikkat

- `OUTPUT_SCHEMA` ile `src/content/blog/types.ts` **aynı anda** değişir. Şema
  fazladan alan üretirse `assemblePost` onu düşürür, eksik üretirse sayfa
  render'ında `undefined` patlar.
- `STOPWORDS` listesi **normalize edilmiş** hâlde tutulur (`normalizeWord`
  üzerinden geçirilir). Diacritic'li yazılırsa hiçbir zaman eşleşmez ve liste
  sessizce etkisiz kalır.
- Para taramasında `dolar` sonrası `\b` KOYMA — Türkçe ek alıyor ("dolardır")
  ve sınır eşleşmediği için kural sessizce devre dışı kalır.
- Metin taraması `JSON.stringify` üzerinden YAPILMAZ: alan sınırları cümleleri
  birbirine yapıştırıp komşu alanın rakamını yanlış pozitif yapar. Alanlar tek
  tek toplanıp cümleye bölünür.
- IndexNow anahtarı gizli değildir; protokol gereği `public/<key>.txt` olarak
  yayınlanır. Anahtarı değiştirirsen dosya adını da değiştir.

# Florida Rehberi

`floridarehberi.com` — Florida'ya taşınmış ya da taşınmak üzere olan Türkçe
konuşan hanelere yönelik, ticari olmayan bir referans yayını.
Yayıncı: **MiamiLi Media**.

Site hiçbir şey satmaz. İşi, somut bir soruya (kira sözleşmesi, ehliyet, okul
kaydı, kasırga sezonu, sağlık sigortası) net cevap vermek ve doğru resmî
kaynağa yönlendirmek.

---

## Hızlı başlangıç

```bash
npm install
npm run dev          # http://localhost:3000
```

Ortam değişkeni gerekmez — GA4 kimliği yokken site ölçümleme olmadan çalışır.
Şablon: `.env.example` → `cp .env.example .env.local`.

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu (Turbopack) |
| `npm run build` | Statik üretim — tüm rotalar prerender edilir |
| `npm run start` | Üretim build'ini yerelde çalıştırır |
| `npm run lint` | ESLint |
| `npm run blog:test` | Blog kalite kapısının birim testi (API çağırmaz) |
| `npm run blog:dry` | Hattın uçtan uca provası (API çağırmaz, dosya yazmaz) |
| `npm run blog:generate` | Gerçek üretim (`OPENROUTER_API_KEY` gerekir) |

## Mimari

| Katman | Seçim |
|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript 5 |
| Stil | Tailwind CSS v4 — tokenlar `src/app/globals.css` içinde `@theme` |
| Render | **Tamamen statik (SSG).** Backend yok, DB yok, API route yok. |
| Hosting | Vercel |
| Ölçüm | GA4, kendi onay kapımızın arkasında |
| İçerik hattı | GitHub Actions cron → OpenRouter → kalite kapısı → commit |

### İçerik = veri, sayfa = türev

```
src/content/
  guides/           10 rehber — Guide nesneleri (SSOT)
  blog/seed.ts      elle yazılan yazılar
  blog/generated-posts.json   hattın append ettiği yazılar (ELLE BÜYÜTME)
```

Rotalar, ana sayfa listesi, footer navigasyonu, JSON-LD ve `sitemap.ts` hepsi
bu dizilerden türer. Bir rehberin başlığını değiştirmek için tek dosya
düzenlenir. `slug` alanı yayında olan URL'dir — yeniden adlandırmak canlı bir
URL'i kırar.

Kapıdan geçemeyen taslağın URL'i hiç oluşmaz: `generateStaticParams()` süzülmüş
listeyi okur ve `dynamicParams = false`.

### Günlük blog hattı

Her sabah 06:30 UTC'de bir GitHub Action konu kuyruğundan sıradaki başlığı
alır, modele yazdırır, **çalıştırılabilir bir kalite kapısından** geçirir ve
geçtiyse commit'ler. Push, Vercel deploy'unu tetikler.

Kapı, bu projenin editoryal yasaklarının kod hâlidir — kaynaksız istatistik,
uydurma tanıklık, vize/göçmenlik konusu, izinsiz dış bağlantı ve
çerçevesiz fiyat iddiası yayına giremez. Ayrıntılı işletim rehberi:
[`docs/blog-pipeline.md`](docs/blog-pipeline.md).

## Katkı verirken

Önce [`CLAUDE.md`](CLAUDE.md) (bağlayıcı standartlar) ve
[`.impeccable.md`](.impeccable.md) (tasarım bağlamı) okunur. Kısa hâli:

- Kullanıcıya dönük tüm metin Türkçe, diacritics eksiksiz.
- Fiyat/oran/istatistik/tanıklık **üretilmez**. Rakam yerine maliyetin neyden
  oluştuğu anlatılır ve güncel değerin hangi resmî kurumda olduğu söylenir.
- Vize / oturum izni / göçmenlik prosedürü bu sitede işlenmez (ayrı yayın).
- miamili.com bağlantıları yalnız bağlamsal ve `miamiliUrl()` üzerinden
  (UTM atfı oradan geliyor).
- Uygulama kodunda `new Date()` kullanılmaz — tarih içeriğin kendi alanından
  gelir.
- Üçüncü parti script/iframe yalnızca onay verildiğinde **ağaca girer**;
  CSS ile gizlemek yeterli değildir.

/**
 * Site sabitleri ve atıf (attribution) yardımcıları — TEK KAYNAK.
 *
 * `miamiliUrl()` neden var: elle yazılan bir miamili.com linkinde
 * `utm_source=floridarehberi` sessizce düşer ve uydu yayının gerçekten
 * trafik getirip getirmediği ÖLÇÜLEMEZ hâle gelir. Tıklanabilir her
 * miamili bağlantısı buradan üretilir.
 *
 * İSTİSNA — kimlik/köken URL'leri UTM ALMAZ: `<link rel="author">`,
 * JSON-LD `url` / `sameAs`. Bunlar tıklanmaz; UTM'li varyant arama
 * motorlarının iki markayı aynı varlığa bağlama sinyalini böler.
 * Onlar için düz `PUBLISHER.site` kullanılır.
 */

export const SITE = {
  name: 'Florida Rehberi',
  /**
   * Künyenin EKRANDA yazıldığı hâli — boşluksuz, küçük harf. `name`'den
   * ayrı durur çünkü erişilebilir ad görünen metni İÇERMEK zorunda
   * (WCAG 2.5.3): başlıktaki bağlantıya "Florida Rehberi" demek, ekranda
   * "floridarehberi" gören sesli komut kullanıcısını dışarıda bırakır.
   * Başlıktaki iki renkli span'in birleşimi bu değere EŞİT olmalı.
   */
  wordmark: 'floridarehberi',
  legalName: 'floridarehberi.com',
  url: 'https://floridarehberi.com',
  locale: 'tr_TR',
  lang: 'tr',
  tagline: 'Florida’da yaşamanın Türkçe el kitabı',
  description:
    'Florida’ya taşınan ve orada yaşayan Türkler için pratik rehber: ev kiralamak, ehliyet, okul sistemi, sağlık, vergiler, araç ve kasırga sezonu.',
} as const;

export const PUBLISHER = {
  name: 'MiamiLi Media',
  site: 'https://miamili.com',
} as const;

/** Tıklanabilir miamili.com bağlantısı — atıf parametreleriyle. */
export function miamiliUrl(path: string, campaign: string): string {
  const url = new URL(path, PUBLISHER.site);
  url.searchParams.set('utm_source', 'floridarehberi');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', campaign);
  return url.toString();
}

/** Site içi göreli yolu mutlak URL'e çevirir (JSON-LD, sitemap, OG). */
export function abs(path: string): string {
  return new URL(path, SITE.url).toString();
}

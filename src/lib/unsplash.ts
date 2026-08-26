/**
 * Unsplash atıf (attribution) yardımcıları.
 *
 * NEDEN `site.ts`'TEN AYRI: `site.ts` BİZİM kimliğimizi ve BİZİM giden
 * bağlantılarımızın UTM'ini tutar (miamili.com). Buradaki UTM ise üçüncü
 * bir tarafın lisans şartı — Unsplash'in bizden istediği geri-atıf. İkisi
 * aynı dosyada durursa "hangi UTM bizim ölçümümüz, hangisi lisans borcu"
 * ayrımı kaybolur ve biri diğerinin kuralıyla düzenlenir.
 *
 * LİSANS: Unsplash, fotoğrafçı adının ve Unsplash'in İKİSİNİN DE linkli
 * olmasını ve bağlantıların `utm_source` + `utm_medium=referral` taşımasını
 * şart koşar. `utm_source` Unsplash'te KAYITLI UYGULAMA ADI olmak zorunda —
 * uydurma bir değer atıfı geçersiz kılar.
 *
 * İkinci zorunluluk — `links.download_location` tetikleme ucu — siteye
 * girmez; indirme anında `scripts/fetch-unsplash.mjs` tarafından çağrılır.
 */

/** Unsplash'te kayıtlı uygulama adı. Değiştirilirse atıf bağlantıları kırılır. */
export const UNSPLASH_APP = 'florida_rehberi';

export const UNSPLASH_LICENSE_URL = 'https://unsplash.com/license';

function withReferral(url: string): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', UNSPLASH_APP);
  u.searchParams.set('utm_medium', 'referral');
  return u.toString();
}

/** Fotoğrafçının Unsplash profili. */
export function photographerUrl(username: string): string {
  return withReferral(`https://unsplash.com/@${username}`);
}

/** Fotoğrafın Unsplash'teki sayfası. */
export function photoUrl(photoId: string): string {
  return withReferral(`https://unsplash.com/photos/${photoId}`);
}

/** Unsplash ana sayfası — künyedeki "Unsplash" kelimesinin hedefi. */
export function unsplashHomeUrl(): string {
  return withReferral('https://unsplash.com');
}

const AYLAR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

/**
 * ISO tarihi Türkçe biçime çevirir — `new Date()` KULLANMADAN.
 *
 * Neden: Vercel build sunucusu UTC'de çalışır. `new Date(iso)` yerel saat
 * diliminde yorumlanırsa gün bir ileri/geri kayabilir ve aynı içerik build'e
 * göre farklı tarih gösterir. String dilimlemek deterministiktir.
 */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-');
  const ay = AYLAR[Number(m) - 1] ?? '';
  return `${Number(d)} ${ay} ${y}`;
}

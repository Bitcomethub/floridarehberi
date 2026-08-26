/**
 * Görsel içerik tipleri.
 *
 * Görsel de VERİ: dosya, ölçü, Türkçe alt metin ve LİSANS ATFI aynı nesnede
 * durur. Atıf alanları (`photoId`, `photographer`, `username`) isteğe bağlı
 * DEĞİL — atıfsız bir görsel Unsplash lisansını ihlal eder, bu yüzden tip
 * seviyesinde zorunlu tutulur: atıfı unutmak derlenmeyen kod olur.
 */

export type ContentImage = {
  /** `public/` altındaki yol. */
  src: string;
  /** Gerçek dosya ölçüleri — next/image yer ayırması (CLS) için zorunlu. */
  width: number;
  height: number;
  /**
   * Türkçe alternatif metin. Fotoğrafta NE GÖRÜLDÜĞÜNÜ anlatır; sayfa
   * başlığını TEKRARLAMAZ — ekran okuyucu başlığı zaten okumuştur.
   */
  alt: string;
  /** Unsplash fotoğraf kimliği — atıf bağlantısının hedefi. */
  photoId: string;
  /** Fotoğrafçının görünen adı — künyede yazılan. */
  photographer: string;
  /** Fotoğrafçının Unsplash kullanıcı adı — profil bağlantısı için. */
  username: string;
};

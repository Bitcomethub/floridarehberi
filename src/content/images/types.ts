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
  /**
   * Fotoğrafın GERÇEKTEN gösterdiği, TANIMLI yer — Unsplash'in kayıtlı
   * konumundan/açıklamasından birebir alınır.
   *
   * `null` = fotoğraf yer iddiası TAŞIMIYOR (belge, kart, klima dış ünitesi
   * gibi nesne çekimi). Bir sigorta evrakı hangi ülkede çekilirse çekilsin
   * aynı görünür; okuru yanlış bir yere inandırmaz.
   *
   * İsteğe bağlı DEĞİL, bilerek `| null`: her görsel için "yer iddiası var
   * mı" sorusuna açık cevap vermek zorunludur. Doldurulduğunda değeri
   * Florida'da olmak ZORUNDA — `npm run images:check` bunu uygular.
   * (Kardeş projede bir hastane tabelası «Chinook Regional Hospital,
   * Lethbridge, Alberta» çıktı; "temsilî" demek okuru yanıltmayı önlemez.)
   */
  place: string | null;
  /**
   * Gömülü bulanık önizleme (base64). Görsel inerken bandın yerinde düz bir
   * kutu değil, fotoğrafın rengi durur. Dosyadan ÜRETİLİR (sharp, 16px),
   * elle yazılmaz; `fetch-unsplash.mjs --blur` yeniden hesaplar.
   */
  blurDataURL: string;
};

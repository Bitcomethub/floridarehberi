/**
 * Görsel kayıt defteri (SSOT).
 *
 * ANAHTAR = sayfanın slug'ı. Rehber ve blog yazısı aynı ad alanını paylaşır
 * çünkü ikisinin slug'ı da site genelinde tekildir; ana sayfa `anasayfa`
 * anahtarını kullanır.
 *
 * EKSİK ANAHTAR BİR HATA DEĞİL, TASARIM: `getImage()` `undefined` döner ve
 * sayfa görsel bandını HİÇ render etmez. Günlük blog hattı her sabah yeni
 * bir yazı üretiyor ve o yazının küratörlüğü yapılmış bir görseli olmuyor —
 * hat için görsel bulmaya çalışmak ya uydurma alt metin ya da konuyla
 * ilgisiz bir stok fotoğraf üretirdi. Görselsiz yayınlanır; sonradan
 * `scripts/fetch-unsplash.mjs` ile eklenebilir.
 *
 * Dosyalar `public/gorseller/` altında COMMIT'LİDİR. Site çalışma zamanında
 * Unsplash'e istek atmaz.
 */
import type { ContentImage } from './types';

export const IMAGES: Record<string, ContentImage> = {
  'anasayfa': {
    src: '/gorseller/anasayfa.webp',
    width: 2400,
    height: 1600,
    alt: 'Bir su kıyısı boyunca sıralanmış uzun palmiyeler; arkada açık mavi gökyüzü ve karşı kıyı.',
    photoId: '6nxZiyU4AyU',
    photographer: 'Jeffrey Eisen',
    username: 'jeisen',
  },
  'nerede-yasanir': {
    src: '/gorseller/nerede-yasanir.webp',
    width: 1600,
    height: 1200,
    alt: 'Havadan geniş bir su yolu; ilerleyen teknenin bıraktığı iz ve ufukta Tampa’nın gökdelenleri.',
    photoId: 'VyyNcb4plSM',
    photographer: 'Anita Denunzio',
    username: 'dronepilot',
  },
  'yasam-maliyeti': {
    src: '/gorseller/yasam-maliyeti.webp',
    width: 1600,
    height: 1067,
    alt: 'Alacakaranlıkta Orlando’da Lake Eola; gölün yüzeyinde yansıyan yüksek binalar ve ortadaki fıskiye.',
    photoId: 'Tyn3-Cljx-A',
    photographer: 'Mick Haupt',
    username: 'rocinante_11',
  },
  'ev-kiralamak': {
    src: '/gorseller/ev-kiralamak.webp',
    width: 1600,
    height: 1067,
    alt: 'Miami’de Little Havana’da bir köşe başındaki pembe apartman; önünde palmiyeler ve sokak lambaları.',
    photoId: 'fNNlAxGMVMw',
    photographer: 'Kian Lem',
    username: 'kianlem',
  },
  'ehliyet': {
    src: '/gorseller/ehliyet.webp',
    width: 1600,
    height: 971,
    alt: 'Palmiyelerle çevrili bir yerleşim caddesi; kenarda park etmiş araçlar ve parlak mavi gökyüzü.',
    photoId: 'zh9LAc3vynE',
    photographer: 'Zoshua Colah',
    username: 'zoshuacolah',
  },
  'arac-sahibi-olmak': {
    src: '/gorseller/arac-sahibi-olmak.webp',
    width: 1600,
    height: 1060,
    alt: 'Ağaçlı bir caddenin kenarına sıra sıra park etmiş arabalar; önde palmiyeler ve yeşillik.',
    photoId: 'QNGMeba_PLk',
    photographer: 'cody reed',
    username: 'editable_edits',
  },
  'okul-sistemi': {
    src: '/gorseller/okul-sistemi.webp',
    width: 1600,
    height: 1067,
    alt: 'Bulutlu bir gökyüzünün altında yoldan geçen sarı okul otobüsü.',
    photoId: 'IGfYkjawPAc',
    photographer: 'Denisse Leon',
    username: 'denisseleon',
  },
  'saglik-sistemi': {
    src: '/gorseller/saglik-sistemi.webp',
    width: 1600,
    height: 1067,
    alt: 'Alacakaranlıkta cam cepheli, kavisli hatlı modern bir sağlık merkezi binası.',
    photoId: 'Ytcp0r7SIE4',
    photographer: 'LEDC',
    username: 'ledc',
  },
  'vergiler': {
    src: '/gorseller/vergiler.webp',
    width: 1600,
    height: 1067,
    alt: 'Tallahassee’deki tarihî Florida eyalet meclis binası; kırmızı-beyaz çizgili tenteleri ve arkasında yeni meclis kulesi.',
    photoId: 'Cidfg4k5NxM',
    photographer: 'Mick Haupt',
    username: 'rocinante_11',
  },
  'banka-ve-kredi': {
    src: '/gorseller/banka-ve-kredi.webp',
    width: 1600,
    height: 1067,
    alt: 'Ahşap bir tezgâhın üzerindeki küçük ödeme terminaline temassız kart uzatan bir el.',
    photoId: '3YSDTzqnVtQ',
    photographer: 'Nathana Rebouças',
    username: 'nathanareboucas',
  },
  'kasirga-sezonu': {
    src: '/gorseller/kasirga-sezonu.webp',
    width: 1600,
    height: 1067,
    alt: 'Sahildeki palmiyelerin ardında denizin üstünü kaplayan koyu fırtına bulutları.',
    photoId: 'EEAdIxllp-0',
    photographer: 'Lina Micán',
    username: 'l1na',
  },
  'floridada-elektrik-su-internet-nasil-baglanir': {
    src: '/gorseller/floridada-elektrik-su-internet-nasil-baglanir.webp',
    width: 1600,
    height: 1067,
    alt: 'Müstakil bir evin önü: tuğla duvar, çiçekli çalılar, çim ve girişe uzanan beton yol.',
    photoId: 'VZJ1BnsMTb4',
    photographer: 'Kellen Riggin',
    username: 'kalaniparker',
  },
  'floridada-arac-muayenesi-var-mi': {
    src: '/gorseller/floridada-arac-muayenesi-var-mi.webp',
    width: 1600,
    height: 1065,
    alt: 'Loş bir tamirhanede yukarıdan görünen bir araç ve çevresinde çalışan kişiler.',
    photoId: 'C4dFQqNVt8g',
    photographer: 'Egor Myznik',
    username: 'vonshnauzer',
  },
  'floridada-yaz-elektrik-faturasi-neden-yuksek': {
    src: '/gorseller/floridada-yaz-elektrik-faturasi-neden-yuksek.webp',
    width: 1600,
    height: 1067,
    alt: 'Yıpranmış beyaz bir tuğla duvara monte edilmiş dış klima ünitesi.',
    photoId: 'JBw9IlbHhVY',
    photographer: 'Vladislav Nikonov',
    username: 'memtor',
  },
  'florida-kira-sozlesmesinde-nelere-dikkat-edilir': {
    src: '/gorseller/florida-kira-sozlesmesinde-nelere-dikkat-edilir.webp',
    width: 1600,
    height: 1067,
    alt: 'Bir masanın iki yanında oturan çift ve önlerindeki dosyada belge imzalayan el.',
    photoId: 'wNxbeoNUg_4',
    photographer: 'Annika Wischnewsky',
    username: 'wischn',
  },
  'florida-hoa-aidati-nedir-ne-icerir': {
    src: '/gorseller/florida-hoa-aidati-nedir-ne-icerir.webp',
    width: 1600,
    height: 1059,
    alt: 'Bakımlı çimleri, palmiyeleri ve kiremit çatılı evleriyle sakin bir banliyö sokağı.',
    photoId: '4T4AcGJvARQ',
    photographer: 'FilterGrade',
    username: 'filtergrade',
  },
  'florida-ehliyet-yazili-sinavina-nasil-hazirlanilir': {
    src: '/gorseller/florida-ehliyet-yazili-sinavina-nasil-hazirlanilir.webp',
    width: 1600,
    height: 1067,
    alt: 'Bir deftere eğilmiş, kalemle not alan bir kişi.',
    photoId: 'AZrBFoXP_3I',
    photographer: 'Joshua Hoehne',
    username: 'joshua_hoehne',
  },
  'florida-arac-sigortasi-nasil-secilir': {
    src: '/gorseller/florida-arac-sigortasi-nasil-secilir.webp',
    width: 1600,
    height: 900,
    alt: 'Havadan bir alışveriş merkezi otoparkı; sıra sıra park etmiş araçlar ve aralarındaki palmiyeler.',
    photoId: 'oY-Mo5hh3r4',
    photographer: 'Michael Moloney',
    username: 'mjmolo',
  },
  'florida-devlet-okuluna-kayit-icin-gereken-belgeler': {
    src: '/gorseller/florida-devlet-okuluna-kayit-icin-gereken-belgeler.webp',
    width: 1600,
    height: 1067,
    alt: 'Beyaz bir masada boş belgeler, kalem, klavye ve küçük bir saksı bitkisi.',
    photoId: 'nCk22aqZjlM',
    photographer: 'Mediamodifier',
    username: 'mediamodifier',
  },
  'amerikada-acil-servise-gitmeden-once-bilinmesi-gerekenler': {
    src: '/gorseller/amerikada-acil-servise-gitmeden-once-bilinmesi-gerekenler.webp',
    width: 1600,
    height: 1067,
    alt: 'Bir hastane binasının duvarında kırmızı neonla yazılmış “TRAUMA CENTER” tabelası.',
    photoId: 'Exh5m8sgCBQ',
    photographer: 'Jacob McGowin',
    username: 'bamaham93',
  },
};

export function getImage(key: string): ContentImage | undefined {
  return IMAGES[key];
}

/** Atıf sayfası için — kayıt sırasını korur. */
export const ALL_IMAGES: Array<ContentImage & { key: string }> = Object.entries(
  IMAGES,
).map(([key, image]) => ({ key, ...image }));

export type { ContentImage } from './types';

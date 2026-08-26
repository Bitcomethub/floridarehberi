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
    height: 1350,
    alt: 'Havadan Miami South Beach: kıyı boyunca uzanan gökdelenler, dalgakıran ve turkuaz deniz.',
    place: 'South Beach, Miami, Florida',
    photoId: 'kqpkGXju6po',
    photographer: 'Dennis Zhang',
    username: 'windagh',
    blurDataURL: 'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoQAAkAAwBSJYwC7ADR2kevCgAA/sb2Mx+QOjZJIiS3QOWVzQ5m00sv1wS/N1vX8wVP7J7gg08cC8kJuR3AAA==',
  },
  'nerede-yasanir': {
    src: '/gorseller/nerede-yasanir.webp',
    width: 1600,
    height: 1200,
    alt: 'Havadan geniş bir su yolu; ilerleyen teknenin bıraktığı iz ve ufukta Tampa’nın gökdelenleri.',
    place: 'Tampa, FL, USA',
    photoId: 'VyyNcb4plSM',
    photographer: 'Anita Denunzio',
    username: 'dronepilot',
    blurDataURL: 'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoQAAwAAwBSJZACdAEOxO/hDwAA/sRqA/K1YDquy6kJ0X4SjLuwIj1Flo9DUsrLGzEdJ5CEEDvozaNXi5MoQ5AAAAA=',
  },
  'yasam-maliyeti': {
    src: '/gorseller/yasam-maliyeti.webp',
    width: 1600,
    height: 1067,
    alt: 'Alacakaranlıkta Orlando’da Lake Eola; gölün yüzeyinde yansıyan yüksek binalar ve ortadaki fıskiye.',
    place: 'Lake Eola, Orlando, FL, USA',
    photoId: 'Tyn3-Cljx-A',
    photographer: 'Mick Haupt',
    username: 'rocinante_11',
    blurDataURL: 'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAwAgCdASoQAAsAAwBSJbACdLoAAnMbse18AAD+6zaZbS0914Dcv27UpU9kGNOz3uhent/890Bbyscmz5cff/Eh3W21uLvyJaOk3q+tHAQMZ041KYychGdAiq+bgoUY8qx2Y1KQ9lS66h3ZUu/5AAAA',
  },
  'ev-kiralamak': {
    src: '/gorseller/ev-kiralamak.webp',
    width: 1600,
    height: 1067,
    alt: 'Miami’de Little Havana’da bir köşe başındaki pembe apartman; önünde palmiyeler ve sokak lambaları.',
    place: 'Little Havana, Miami, FL, USA',
    photoId: 'fNNlAxGMVMw',
    photographer: 'Kian Lem',
    username: 'kianlem',
    blurDataURL: 'data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAQAgCdASoQAAsAAwBSJYwCdAYwTjG3jNgAAP7rJgTZCNmTkEIWxJbH3+hwvk7PTcckiWj3lpT3YVA79U5HeLMp+rlOmAUoyTfP3DazMLy3/oYWLKgcVXJ+r6lgAA==',
  },
  'ehliyet': {
    src: '/gorseller/ehliyet.webp',
    width: 1600,
    height: 971,
    alt: 'Palmiyelerle çevrili bir yerleşim caddesi; kenarda park etmiş araçlar ve parlak mavi gökyüzü.',
    place: 'Venetian Islands, Miami Beach, FL, USA',
    photoId: 'zh9LAc3vynE',
    photographer: 'Zoshua Colah',
    username: 'zoshuacolah',
    blurDataURL: 'data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADwAQCdASoQAAoAAwBSJbACdAEX2BPUNYAA/uaNN9oX2C1H+JeteHK89AANBy9n6re/+lKMsEMAHoH+Ur87qWKboXGxWvcPYVNvogzaqVbTleWPLVE/fC/iFu7xX/9uf3vRWf2AAAA=',
  },
  'arac-sahibi-olmak': {
    src: '/gorseller/arac-sahibi-olmak.webp',
    width: 1600,
    height: 1048,
    alt: 'Key West’te palmiyeli bir cadde; kaldırım boyunca park etmiş arabalar ve yoldan geçen üstü açık bir otomobil.',
    place: 'Key West, Florida',
    photoId: 'kKynV_4hbto',
    photographer: 'Zoshua Colah',
    username: 'zoshuacolah',
    blurDataURL: 'data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAwAgCdASoQAAoAAwBSJZgCdAD1G8nnSXSsAAD5Yf9OzrruRo/5xTjykiSIp2TugpbDXZxRmMNjqbuQWtpMKj73J8lM70xT3CCKpC9udGb2A+TrGiM04BW51F1+h6QxZgUAAA==',
  },
  'okul-sistemi': {
    src: '/gorseller/okul-sistemi.webp',
    width: 1600,
    height: 1067,
    alt: 'Önden yakın planda sarı bir okul otobüsü; ön camın üstünde “SCHOOL BUS” yazısı.',
    place: null,
    photoId: 'apP7443MXIQ',
    photographer: 'Thomas Park',
    username: 'thomascpark',
    blurDataURL: 'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABwAgCdASoQAAsAAwBSJaACdFQA5/8Dzxv18zj8AP7t3nHRUgb+tfPumdW2/hksWJvtQ31eqlycoFApdmsXtNWzRyTSM/l0p3zkfl6yOq8EHNTtkDict4pbEqn14/zYPLjzC2tXCIMAAA==',
  },
  'saglik-sistemi': {
    src: '/gorseller/saglik-sistemi.webp',
    width: 1600,
    height: 974,
    alt: 'Üzerinde “Health insurance” yazan bir sağlık sigortası kartı ve yanında steteskop.',
    place: null,
    photoId: 'Mmx6dI3PVtM',
    photographer: 'Marek Studzinski',
    username: 'jccards',
    blurDataURL: 'data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoQAAoAAwBSJYwCdAYuG/bvyEAAzdm+/H74POcMP2sFRrA1MYe/zLWHe6vYM2lOr5NcRtv/LtVm1CgJ2nlNVWN46UYrLYteTV3kiQNKhYQODCAA',
  },
  'vergiler': {
    src: '/gorseller/vergiler.webp',
    width: 1600,
    height: 1067,
    alt: 'Tallahassee’deki tarihî Florida eyalet meclis binası; kırmızı-beyaz çizgili tenteleri ve arkasında yeni meclis kulesi.',
    place: 'Florida Historic Capitol Museum, South Monroe Street, Tallahassee, FL, USA',
    photoId: 'Cidfg4k5NxM',
    photographer: 'Mick Haupt',
    username: 'rocinante_11',
    blurDataURL: 'data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAQAgCdASoQAAsAAwBSJbACdAC6FsK3xtAAAP6PGVkGcQ0zGFu7p6vNEHxwCH1fFQnU9B0w1oUrIw0hLprKCbn7Icf0Aa9t+2zIkj3y1HL2psIXKAA=',
  },
  'banka-ve-kredi': {
    src: '/gorseller/banka-ve-kredi.webp',
    width: 1600,
    height: 1067,
    alt: 'Ahşap bir tezgâhın üzerindeki küçük ödeme terminaline temassız kart uzatan bir el.',
    place: null,
    photoId: '3YSDTzqnVtQ',
    photographer: 'Nathana Rebouças',
    username: 'nathanareboucas',
    blurDataURL: 'data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAQAgCdASoQAAsAAwBSJbACdAYsFuyHzU/YAP6b8kH5UKQJ1visRCYEjui7Eg4NpLZhk9Ied21XAYu54CS8O8UwlhdJjglsoszqGja67y3BsXRvWcLGoKnqhWd+v+sbSjRaiWTfBblIM+ryb1rNHlfpHz2nmaBSwAA=',
  },
  'kasirga-sezonu': {
    src: '/gorseller/kasirga-sezonu.webp',
    width: 1600,
    height: 1067,
    alt: 'Captiva Island’da alacakaranlıkta palmiye siluetleri ve denizin üstünü kaplayan koyu bulutlar.',
    place: 'Captiva Island, Florida',
    photoId: 'TQe8ClKeA2k',
    photographer: 'Mariah Reever',
    username: 'mreever',
    blurDataURL: 'data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAAAQAgCdASoQAAsAAwBSJaACdADp5hVGE/qAAP5Apm95xLjSsODXOXWtM8ZBfdOcRsak72IuC5RwbXL61PiH2oBs+hkY0cMYa1WO49B/CXgAAA==',
  },
  'floridada-elektrik-su-internet-nasil-baglanir': {
    src: '/gorseller/floridada-elektrik-su-internet-nasil-baglanir.webp',
    width: 1600,
    height: 1067,
    alt: 'Bir binanın duvarında sıra sıra dizilmiş elektrik sayaçları ve kabloları.',
    place: null,
    photoId: 'PeGyRpDKQy4',
    photographer: 'Han-Hsing Tu',
    username: 'icefish',
    blurDataURL: 'data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAAAwAgCdASoQAAsAAwBSJZwAD49w5RGGuQKkAAD+74cyzeR4n/Y7qcoiTIddPWUjA9LdaRNtRBUSma6iTjgwW7NsWfwhzHzYB2fpimGpPUEcTMbVTHgIAA==',
  },
  'floridada-arac-muayenesi-var-mi': {
    src: '/gorseller/floridada-arac-muayenesi-var-mi.webp',
    width: 1600,
    height: 1065,
    alt: 'Loş bir tamirhanede yukarıdan görünen bir araç ve çevresinde çalışan kişiler.',
    place: null,
    photoId: 'C4dFQqNVt8g',
    photographer: 'Egor Myznik',
    username: 'vonshnauzer',
    blurDataURL: 'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACwAQCdASoQAAsAAwBSJaQAAlXpjhgAAP7xozazaUywLr9bfCNZhMj1AibH8RftS4GAAA==',
  },
  'floridada-yaz-elektrik-faturasi-neden-yuksek': {
    src: '/gorseller/floridada-yaz-elektrik-faturasi-neden-yuksek.webp',
    width: 1600,
    height: 1067,
    alt: 'Yıpranmış beyaz bir tuğla duvara monte edilmiş dış klima ünitesi.',
    place: null,
    photoId: 'JBw9IlbHhVY',
    photographer: 'Vladislav Nikonov',
    username: 'memtor',
    blurDataURL: 'data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABQAgCdASoQAAsAAwBSJZQC7AYu5t1nHtuZwgAA/u5bSJ4VZdOGd+sPV9O3SE9I52jgvfgmhuqa0DGmpGemxOLdIbsKzaI90k6uUxPTi5z9M7GPw+/4LSvRtUET3+OvnQgvmQKAAAA=',
  },
  'florida-kira-sozlesmesinde-nelere-dikkat-edilir': {
    src: '/gorseller/florida-kira-sozlesmesinde-nelere-dikkat-edilir.webp',
    width: 1600,
    height: 1067,
    alt: 'Bir masanın iki yanında oturan çift ve önlerindeki dosyada belge imzalayan el.',
    place: null,
    photoId: 'wNxbeoNUg_4',
    photographer: 'Annika Wischnewsky',
    username: 'wischn',
    blurDataURL: 'data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADQAQCdASoQAAsAAwBSJYwCdAEQZ5GoyAD+szHCyXb7Hym6O6y2cwvVvr5B789cxbq7VrDER70aOXZ74rrwv8aWAmSXptrnKc0BRGe7XF0JWgAA',
  },
  'florida-hoa-aidati-nedir-ne-icerir': {
    src: '/gorseller/florida-hoa-aidati-nedir-ne-icerir.webp',
    width: 1600,
    height: 1200,
    alt: 'Havadan Miami Beach’te bir konut adası: ortasında golf sahası, çevresinde kanallar ve evler.',
    place: 'Miami Beach, Florida',
    photoId: 'jzyAoEn3kx4',
    photographer: 'Chris Norberg',
    username: 'activityauthority',
    blurDataURL: 'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoQAAwAAwBSJZgCdAEO4/Ki2AAA/I/1aNgIhgDz3KE0ynBbe9QIbUvsrJfTPFOBQbkirVk3IS1eEI/z9IwAAA==',
  },
  'florida-ehliyet-yazili-sinavina-nasil-hazirlanilir': {
    src: '/gorseller/florida-ehliyet-yazili-sinavina-nasil-hazirlanilir.webp',
    width: 1600,
    height: 1067,
    alt: 'Bir deftere eğilmiş, kalemle not alan bir kişi.',
    place: null,
    photoId: 'AZrBFoXP_3I',
    photographer: 'Joshua Hoehne',
    username: 'joshua_hoehne',
    blurDataURL: 'data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADwAQCdASoQAAsAAwBSJagCdADdqyFzVWAA/t1b4jARgTNLshAe5r0qEyBQatIVPLwvNr6+XAuD/t9+iDJXe07aNc65Erl68/D/ihTu5dj7AzCIos0jpXGYAAA=',
  },
  'florida-arac-sigortasi-nasil-secilir': {
    src: '/gorseller/florida-arac-sigortasi-nasil-secilir.webp',
    width: 1600,
    height: 900,
    alt: 'Havadan bir alışveriş merkezi otoparkı; sıra sıra park etmiş araçlar ve aralarındaki palmiyeler.',
    place: 'Naples, FL, USA',
    photoId: 'oY-Mo5hh3r4',
    photographer: 'Michael Moloney',
    username: 'mjmolo',
    blurDataURL: 'data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACwAQCdASoQAAkAAwBSJZQAApf0uOawAPkRWMui+AVr624mmnVFSz/zv2oZnYhFUZpM89ALM74e56rZ0aoyJY7yhSOB+1mJ3ghDAEEMLSAAAA==',
  },
  'florida-devlet-okuluna-kayit-icin-gereken-belgeler': {
    src: '/gorseller/florida-devlet-okuluna-kayit-icin-gereken-belgeler.webp',
    width: 1600,
    height: 1067,
    alt: 'Beyaz bir masada boş belgeler, kalem, klavye ve küçük bir saksı bitkisi.',
    place: null,
    photoId: 'nCk22aqZjlM',
    photographer: 'Mediamodifier',
    username: 'mediamodifier',
    blurDataURL: 'data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAAAQAgCdASoQAAsAAwBSJZQCsAD0Wqds4xgAAP4K2SXhaN6VndKidy2/M1tj3fcZ63lrHkYDmJeqRwXeyIiJoAAA',
  },
  'amerikada-acil-servise-gitmeden-once-bilinmesi-gerekenler': {
    src: '/gorseller/amerikada-acil-servise-gitmeden-once-bilinmesi-gerekenler.webp',
    width: 1600,
    height: 1067,
    alt: 'Bir hastane binasının duvarında kırmızı neonla yazılmış “TRAUMA CENTER” tabelası.',
    place: null,
    photoId: 'Exh5m8sgCBQ',
    photographer: 'Jacob McGowin',
    username: 'bamaham93',
    blurDataURL: 'data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAAAQAgCdASoQAAsAAwBSJZACdADdpjnT1uFAAP7CPjNMiRbs8eBOHdwYCs/qRmFbmHMRUvPMPoZz8qBbEuSRrjZYsxHKvVCTvMAAAA==',
  },
};

export function getImage(key: string): ContentImage | undefined {
  return IMAGES[key];
}

/**
 * Paylaşım kartı görseli (Open Graph + Twitter).
 *
 * `twitter.card` zaten `summary_large_image` idi ama HİÇBİR görsel
 * tanımlı değildi — yani kart boş bir kutu olarak render ediliyordu.
 * Sayfa kendi `openGraph`'ını tanımladığı anda kökten miras ALMAZ, bu
 * yüzden her sayfa görselini açıkça vermek zorunda.
 */
export function ogImage(key: string) {
  const image = IMAGES[key];
  if (!image) return undefined;
  return [{ url: image.src, width: image.width, height: image.height, alt: image.alt }];
}

/** Atıf sayfası için — kayıt sırasını korur. */
export const ALL_IMAGES: Array<ContentImage & { key: string }> = Object.entries(
  IMAGES,
).map(([key, image]) => ({ key, ...image }));

export type { ContentImage } from './types';

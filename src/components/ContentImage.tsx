import Image from 'next/image';
import type { ContentImage as ContentImageData } from '@/content/images/types';
import { photoUrl, photographerUrl } from '@/lib/unsplash';

/**
 * Başlık altı görsel bandı + lisans künyesi.
 *
 * NEDEN `<Image>`, NEDEN CSS `background-image` DEĞİL — iki ayrı sebep:
 *  1) Erişilebilirlik: CSS zemin görselinin alt metni olmaz.
 *  2) Palet kapısı: `check-render-palette.mjs` her elemanın
 *     `backgroundImage`'ini toplayıp sınıflandırır. Fotoğrafı zemine
 *     koymak kapıya çözülemeyen bir `url(...)` sokar; `<img>` içeriği ise
 *     kapının ölçtüğü şey değildir. Fotoğraf zemin değil, İÇERİKTİR.
 *
 * KREM/BEJ: Kapı bir fotoğrafın içindeki kum bej'ini GÖREMEZ. O yasak
 * seçim anında uygulanıyor — bkz. `scripts/fetch-unsplash.mjs`, Unsplash'in
 * baskın rengi kapının kendi `isWarmNeutral()` bandından geçiriliyor.
 *
 * ORAN: mobilde 3:2, sm üstünde 21:9. Tek oran kullanılırsa ya 393px'te
 * görsel 150px'lik bir şerite düşer (okunmaz), ya da geniş ekranda sayfayı
 * ikiye böler. Kırpma `object-cover` ile yapılır, dosya tektir.
 */
export function ContentImage({
  image,
  sizes,
  priority = false,
}: {
  image: ContentImageData;
  /** Bandın kapsayıcı genişliği — yanlış değer mobilde gereksiz büyük dosya indirtir. */
  sizes: string;
  /** Sayfanın ilk ekranındaki görsel için true (LCP). Sayfada EN FAZLA bir tane. */
  priority?: boolean;
}) {
  return (
    <figure className="mt-8">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-mist sm:aspect-[21/9]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          className="object-cover"
        />
      </div>

      {/* Lisans künyesi. Unsplash fotoğrafçı adının VE Unsplash'in linkli
          olmasını şart koşar; ikisi de UTM taşır (lib/unsplash.ts). */}
      <figcaption className="mt-2.5 text-[0.8125rem] leading-relaxed text-mute">
        Fotoğraf:{' '}
        <a
          href={photographerUrl(image.username)}
          rel="noopener"
          className="text-palm-deep underline decoration-palm-deep/40 underline-offset-2 hover:decoration-palm-deep"
        >
          {image.photographer}
        </a>{' '}
        <span aria-hidden="true">·</span>{' '}
        <a
          href={photoUrl(image.photoId)}
          rel="noopener"
          className="text-palm-deep underline decoration-palm-deep/40 underline-offset-2 hover:decoration-palm-deep"
        >
          Unsplash
        </a>
      </figcaption>
    </figure>
  );
}

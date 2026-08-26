import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/content/guides';
import { ALL_IMAGES } from '@/content/images';
import { ALL_POSTS } from '@/lib/blogData';
import { breadcrumbSchema, graph } from '@/lib/schema';
import {
  UNSPLASH_LICENSE_URL,
  photoUrl,
  photographerUrl,
  unsplashHomeUrl,
} from '@/lib/unsplash';
import { SITE, abs } from '@/lib/site';

/**
 * Görsel atıf sayfası.
 *
 * Unsplash lisansı atfın fotoğrafın YANINDA yapılmasını ister — o künye
 * `ContentImage` içinde zaten var. Bu sayfa onun yerine geçmez, ÜSTÜNE
 * gelir: tek bakışta denetlenebilir bir liste. "Hangi görsel nereden geldi"
 * sorusunun cevabı bir sayfada duruyorsa, bir görsel değiştirildiğinde
 * atfının güncellenmediği hemen görülür.
 */
export const dynamic = 'force-static';

const TITLE = 'Görsel kaynakları ve atıflar';
const DESCRIPTION =
  'Florida Rehberi’nde kullanılan fotoğrafların tamamı Unsplash lisansı altındadır. Her görselin fotoğrafçısı, kaynağı ve kullanıldığı sayfa bu listede yer alır.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/gorseller' },
  openGraph: {
    type: 'website',
    url: abs('/gorseller'),
    title: TITLE,
    description: DESCRIPTION,
    locale: SITE.locale,
    siteName: SITE.name,
  },
};

/**
 * Anahtar → görselin kullanıldığı sayfa. Kayıt defteri anahtarı slug
 * olduğu için eşleme içerikten TÜRER; elle sayfa listesi tutulmaz.
 */
function usage(key: string): { label: string; href: string } | null {
  if (key === 'anasayfa') return { label: 'Ana sayfa', href: '/' };
  const guide = GUIDES.find((g) => g.slug === key);
  if (guide) return { label: guide.navLabel, href: `/${guide.slug}` };
  const post = ALL_POSTS.find((p) => p.slug === key);
  if (post) return { label: post.title, href: `/blog/${post.slug}` };
  return null;
}

export default function GorsellerPage() {
  const jsonLd = graph([
    breadcrumbSchema([
      { name: 'Ana sayfa', path: '/' },
      { name: 'Görsel kaynakları', path: '/gorseller' },
    ]),
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-page px-5 pt-10 pb-stack sm:px-8 sm:pt-14">
        <nav aria-label="Kırıntı navigasyonu" className="text-small text-mute">
          <Link href="/" className="text-palm-deep no-underline hover:underline">
            Ana sayfa
          </Link>
          <span aria-hidden="true" className="px-2">
            ·
          </span>
          <span>Görsel kaynakları</span>
        </nav>

        <div className="mt-8 max-w-[46rem]">
          <div className="tide tide-sea mb-5 w-10" aria-hidden="true" />
          <h1 className="font-display text-h1 font-semibold text-ink">{TITLE}</h1>
          <div className="prose-fr mt-6 text-ink-soft">
            <p className="text-[1.0625em] text-ink">
              Bu sitedeki fotoğrafların tamamı{' '}
              <a href={unsplashHomeUrl()} rel="noopener">
                Unsplash
              </a>{' '}
              üzerinden alınmıştır ve{' '}
              <a href={UNSPLASH_LICENSE_URL} rel="noopener">
                Unsplash lisansı
              </a>{' '}
              altında kullanılır. Fotoğraflar sitenin kendi sunucusundan
              servis edilir; sayfayı açtığınızda tarayıcınız Unsplash’e
              herhangi bir istek göndermez.
            </p>
            <p>
              Fotoğrafçı adı her görselin hemen altında da yazılıdır. Bu
              sayfa o künyelerin yerine geçmez, tek listede toplanmış
              hâlidir.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-page px-5 pb-band sm:px-8">
        {ALL_IMAGES.length === 0 ? (
          <p className="max-w-prose text-small text-mute">
            Şu anda sitede kullanılan bir fotoğraf bulunmuyor.
          </p>
        ) : (
          <ol className="max-w-[52rem] border-t border-line-strong">
            {ALL_IMAGES.map((image) => {
              const page = usage(image.key);
              return (
                <li key={image.key} className="border-b border-line py-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-small font-semibold text-ink">
                      {page ? (
                        <Link
                          href={page.href}
                          className="no-underline transition-colors hover:text-palm-deep"
                        >
                          {page.label}
                        </Link>
                      ) : (
                        image.key
                      )}
                    </span>
                    <span className="text-[0.8125rem] text-mute tabular">
                      {image.width}×{image.height}
                    </span>
                  </div>

                  <p className="mt-1.5 max-w-[60ch] text-small text-ink-soft">
                    {image.alt}
                  </p>

                  <p className="mt-2 text-[0.8125rem] text-mute">
                    Foto:{' '}
                    <a
                      href={photographerUrl(image.username)}
                      rel="noopener"
                      className="text-palm-deep underline decoration-palm-deep/40 underline-offset-2 hover:decoration-palm-deep"
                    >
                      {image.photographer}
                    </a>{' '}
                    /{' '}
                    <a
                      href={photoUrl(image.photoId)}
                      rel="noopener"
                      className="text-palm-deep underline decoration-palm-deep/40 underline-offset-2 hover:decoration-palm-deep"
                    >
                      Unsplash
                    </a>
                  </p>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

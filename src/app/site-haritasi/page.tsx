import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, graph } from '@/lib/schema';
import { abs } from '@/lib/site';
import { sitemapEntries } from '../sitemap';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Site Haritası — Tüm Rehberler ve Yazılar',
  description:
    'Florida Rehberi’ndeki bütün sayfalar tek listede: on bölümlük el kitabı, blog yazıları, hakkında ve yasal metinler. Liste, XML site haritasıyla aynı kaynaktan üretilir.',
  alternates: { canonical: '/site-haritasi' },
  openGraph: {
    type: 'website',
    url: abs('/site-haritasi'),
    title: 'Site Haritası — Tüm Rehberler ve Yazılar',
    description:
      'Florida Rehberi’ndeki bütün sayfalar tek listede. Liste, XML site haritasıyla aynı kaynaktan üretilir.',
  },
};

const jsonLd = graph([
  {
    '@type': 'CollectionPage',
    '@id': `${abs('/site-haritasi')}#page`,
    url: abs('/site-haritasi'),
    name: 'Site Haritası — Florida Rehberi',
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${abs('/')}#website` },
  },
  breadcrumbSchema([
    { name: 'Ana sayfa', path: '/' },
    { name: 'Site Haritası', path: '/site-haritasi' },
  ]),
]);

/**
 * `/site-haritasi` — `/sitemap.xml`in okunabilir hâli.
 *
 * Liste `sitemapEntries()`ten geliyor; ikinci bir elle yazılmış adres listesi
 * YOK. Yeni rehber ya da yazı eklendiğinde XML ve HTML indeks aynı anda
 * güncellenir.
 */
export default function SiteHaritasiPage() {
  const paths = sitemapEntries().map((entry) => new URL(entry.url).pathname);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-page px-5 pt-12 pb-stack sm:px-8 sm:pt-16">
        <nav aria-label="Kırıntı navigasyonu" className="text-small text-mute">
          <Link href="/" className="text-palm-deep no-underline hover:underline">
            Ana sayfa
          </Link>
          <span aria-hidden="true" className="px-2">
            ·
          </span>
          <span>Site Haritası</span>
        </nav>

        <h1 className="mt-8 max-w-[18ch] font-display text-h1 font-semibold text-ink">
          Sitedeki bütün sayfalar
        </h1>
        <p className="prose-fr mt-5 text-ink-soft">
          El kitabının on bölümü, blog yazıları ve künye tek listede. Liste, XML
          site haritasıyla aynı kaynaktan üretilir.
        </p>
      </header>

      <div className="mx-auto max-w-page px-5 pb-band sm:px-8">
        <ul className="grid grid-cols-1 gap-x-14 gap-y-2 sm:grid-cols-2">
          {paths.map((path) => (
            <li key={path}>
              <Link
                href={path}
                className="inline-flex text-body text-ink-soft no-underline transition-colors hover:text-palm-deep"
              >
                {path}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

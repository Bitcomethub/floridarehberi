import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_POSTS } from '@/lib/blogData';
import { formatDate } from '@/lib/format';
import { breadcrumbSchema, graph } from '@/lib/schema';
import { SITE, abs } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog — Florida’da yaşama dair güncel yazılar',
  description:
    'Florida’da günlük hayata dair kısa ve pratik yazılar: faturalar, araç, ev, okul ve mevsimsel konular. El kitabındaki bölümleri tamamlar.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: abs('/blog'),
    title: 'Blog — Florida’da yaşama dair güncel yazılar',
    description:
      'Florida’da günlük hayata dair kısa ve pratik yazılar: faturalar, araç, ev, okul ve mevsimsel konular.',
    locale: SITE.locale,
    siteName: SITE.name,
  },
};

const jsonLd = graph([
  {
    '@type': 'Blog',
    '@id': `${abs('/blog')}#blog`,
    url: abs('/blog'),
    name: `${SITE.name} — Blog`,
    inLanguage: SITE.lang,
    publisher: { '@id': `${SITE.url}/#publisher` },
    blogPost: ALL_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${abs(`/blog/${post.slug}`)}#article`,
      headline: post.title,
      url: abs(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
    })),
  },
  breadcrumbSchema([
    { name: 'Ana sayfa', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]),
]);

export default function BlogIndexPage() {
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
          <span>Blog</span>
        </nav>

        <h1 className="mt-8 max-w-[18ch] font-display text-h1 font-semibold text-ink">
          Günlük hayattan notlar
        </h1>
        <p className="prose-fr mt-5 text-ink-soft">
          El kitabındaki on bölüm Florida’da yaşamanın iskeletini kurar. Blog,
          o iskeletin üzerine oturan tekil soruları ele alır: elektriği kim
          bağlar, muayene zorunlu mu, faturanın yazın neden şiştiği gibi.
        </p>
      </header>

      <div className="mx-auto max-w-page px-5 pb-band sm:px-8">
        {ALL_POSTS.length === 0 ? (
          <p className="border border-line bg-mist px-5 py-8 text-small text-ink-soft">
            Henüz yazı yok. El kitabındaki{' '}
            <Link href="/#rehberler" className="text-palm-deep">
              on bölümden
            </Link>{' '}
            başlayabilirsiniz.
          </p>
        ) : (
          <ol className="border-t border-line-strong">
            {ALL_POSTS.map((post) => (
              <li key={post.slug} className="border-b border-line-strong">
                <article>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-x-8 gap-y-2 py-7 no-underline sm:grid-cols-[9rem_minmax(0,1fr)] sm:py-8"
                  >
                    <time
                      dateTime={post.publishedAt}
                      className="tabular text-[0.8125rem] text-mute sm:pt-1.5"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                    <div className="min-w-0">
                      <h2 className="font-display text-h3 font-semibold text-ink transition-colors group-hover:text-palm-deep">
                        {post.title}
                      </h2>
                      <p className="mt-2 max-w-[62ch] text-small text-mute">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

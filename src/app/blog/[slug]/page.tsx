import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentSections } from '@/components/ContentSections';
import { FaqList } from '@/components/FaqList';
import { ALL_POSTS, getPost } from '@/lib/blogData';
import { formatDate } from '@/lib/format';
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
} from '@/lib/schema';
import { SITE, abs } from '@/lib/site';

/**
 * Blog yazısı — statik.
 *
 * `generateStaticParams` YALNIZCA yayınlanmış yazıları döndürür: ALL_POSTS
 * zaten `needs_review` taslaklarını eler. `dynamicParams = false` ile
 * birlikte bu, kalite kapısını geçemeyen bir taslağın URL'inin hiç var
 * olmaması demektir — "yayınlanmadı" gerçekten yayınlanmadı olur.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: abs(`/blog/${post.slug}`),
      title: post.title,
      description: post.excerpt,
      locale: SITE.locale,
      siteName: SITE.name,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = abs(`/blog/${post.slug}`);
  const others = ALL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = graph([
    blogPostingSchema(post),
    faqSchema(post.faqs, `${url}#faq`),
    breadcrumbSchema([
      { name: 'Ana sayfa', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ]);

  return (
    <article>
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
          <Link href="/blog" className="text-palm-deep no-underline hover:underline">
            Blog
          </Link>
        </nav>

        <div className="mt-8 max-w-[46rem]">
          <div className="tide tide-sun mb-5 w-10" aria-hidden="true" />
          <h1 className="font-display text-h1 font-semibold text-ink">
            {post.title}
          </h1>
          <p className="mt-4 text-small text-mute">
            <time dateTime={post.publishedAt} className="tabular">
              {formatDate(post.publishedAt)}
            </time>
            {post.updatedAt !== post.publishedAt ? (
              <>
                {' · Güncellendi '}
                <time dateTime={post.updatedAt} className="tabular">
                  {formatDate(post.updatedAt)}
                </time>
              </>
            ) : null}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-page px-5 pb-band sm:px-8">
        <div className="max-w-[46rem]">
          <div className="prose-fr text-ink-soft">
            <p className="sr-only">{post.question}</p>
            {post.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="first:text-[1.0625em] first:text-ink">
                {paragraph}
              </p>
            ))}
          </div>

          <ContentSections sections={post.sections} />

          <FaqList faqs={post.faqs} />

          <p className="mt-stack max-w-prose bg-mist px-5 py-4 text-small text-ink-soft">
            Bu yazı genel bilgilendirme amaçlıdır. Kurallar ve ücretler
            ilçeye ve döneme göre değişir; işlem yapmadan önce ilgili kurumun
            güncel bilgisini esas alın.
          </p>

          {others.length > 0 ? (
            <nav aria-labelledby="diger-yazilar" className="mt-band">
              <div className="tide mb-5 w-10" aria-hidden="true" />
              <h2
                id="diger-yazilar"
                className="font-display text-h3 font-semibold text-ink"
              >
                Diğer yazılar
              </h2>
              <ul className="mt-5 border-t border-line">
                {others.map((item) => (
                  <li key={item.slug} className="border-b border-line">
                    <Link
                      href={`/blog/${item.slug}`}
                      className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4 no-underline"
                    >
                      <time
                        dateTime={item.publishedAt}
                        className="tabular text-[0.8125rem] text-mute"
                      >
                        {formatDate(item.publishedAt)}
                      </time>
                      <span className="font-display text-small font-medium text-ink transition-colors group-hover:text-palm-deep">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    </article>
  );
}

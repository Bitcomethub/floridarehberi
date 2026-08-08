import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentSections } from '@/components/ContentSections';
import { FaqList } from '@/components/FaqList';
import { GUIDE_SLUGS, getGuide, relatedGuides } from '@/content/guides';
import { formatDate } from '@/lib/format';
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  guideArticleSchema,
} from '@/lib/schema';
import { SITE, abs, miamiliUrl } from '@/lib/site';

/**
 * Rehber bölümü — tamamen statik.
 *
 * `dynamicParams = false`: bilinmeyen slug 404 döner. Aksi hâlde Next
 * çalışma anında render etmeye çalışır; içerik veriden geldiği için
 * bunun karşılığı boş bir sayfadır. Bilinmeyen URL'in doğru cevabı 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const url = abs(`/${guide.slug}`);
  return {
    title: guide.title,
    description: guide.excerpt,
    keywords: guide.keywords,
    alternates: { canonical: `/${guide.slug}` },
    openGraph: {
      type: 'article',
      url,
      title: guide.title,
      description: guide.excerpt,
      locale: SITE.locale,
      siteName: SITE.name,
      modifiedTime: guide.updated,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = abs(`/${guide.slug}`);
  const related = relatedGuides(guide);

  const jsonLd = graph([
    guideArticleSchema(guide),
    faqSchema(guide.faqs, `${url}#faq`),
    breadcrumbSchema([
      { name: 'Ana sayfa', path: '/' },
      { name: guide.navLabel, path: `/${guide.slug}` },
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
          <span>{guide.navLabel}</span>
        </nav>

        <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-[5rem_minmax(0,1fr)]">
          <span aria-hidden="true" className="chapter-num text-[3.25rem]">
            {String(guide.number).padStart(2, '0')}
          </span>
          <div>
            <h1 className="max-w-[20ch] font-display text-h1 font-semibold text-ink">
              {guide.title}
            </h1>
            <p className="mt-4 text-small text-mute">
              El kitabı, bölüm {guide.number} · Güncellendi{' '}
              <time dateTime={guide.updated} className="tabular">
                {formatDate(guide.updated)}
              </time>
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-page px-5 pb-band sm:px-8">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:items-start">
          {/* ── Gövde ── */}
          <div className="min-w-0">
            {/* Answer-first giriş: cevap ilk paragrafta, kurulum yok. */}
            <div className="prose-fr text-ink-soft">
              <p className="sr-only">{guide.question}</p>
              {guide.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="first:text-[1.0625em] first:text-ink">
                  {paragraph}
                </p>
              ))}
            </div>

            <ContentSections sections={guide.sections} />

            {guide.miamili ? (
              <aside className="mt-stack bg-mist px-5 py-6 sm:px-7 sm:py-7">
                <div className="tide tide-coral mb-4 w-8" aria-hidden="true" />
                <p className="prose-fr text-small text-ink-soft">
                  {guide.miamili.context}{' '}
                  <a
                    href={miamiliUrl(guide.miamili.path, guide.miamili.campaign)}
                    className="font-medium"
                  >
                    {guide.miamili.label}
                  </a>
                  .
                </p>
              </aside>
            ) : null}

            <FaqList faqs={guide.faqs} />

            {guide.sources?.length ? (
              <section className="mt-stack" aria-labelledby="kaynaklar">
                <h2
                  id="kaynaklar"
                  className="font-display text-h3 font-semibold text-ink"
                >
                  Resmî kaynaklar
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {guide.sources.map((source) => (
                    <li key={source.url} className="flex gap-3 text-small">
                      <span
                        aria-hidden="true"
                        className="mt-[0.62em] h-[5px] w-[5px] shrink-0 bg-sea"
                      />
                      <a
                        href={source.url}
                        rel="noopener"
                        className="text-palm-deep underline decoration-palm-deep/40 underline-offset-4 hover:decoration-palm-deep"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 max-w-prose text-[0.8125rem] leading-relaxed text-mute">
                  Kurallar, ücretler ve süreler değişebilir. Bu sayfa genel
                  bilgilendirme amaçlıdır; bağlayıcı bilgi için yukarıdaki
                  resmî kaynakları esas alın.
                </p>
              </section>
            ) : null}
          </div>

          {/* ── Künye. Yapışkan DEĞİL: uzun sayfada takip eden bir kutu
              okuma alanını daraltır ve mobilde hiçbir işe yaramaz. ── */}
          <aside className="lg:pt-2">
            <div className="border border-line">
              <h2 className="border-b border-line bg-mist px-5 py-3 font-display text-label font-semibold tracking-[0.14em] text-ink uppercase">
                Künye
              </h2>
              <dl className="px-5 py-4">
                {guide.quickFacts.map((fact) => (
                  <div key={fact.label} className="border-t border-line py-3 first:border-t-0 first:pt-0 last:pb-0">
                    <dt className="text-[0.8125rem] text-mute">{fact.label}</dt>
                    <dd className="mt-1 font-display text-small font-semibold text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {related.length > 0 ? (
              <nav aria-labelledby="ilgili" className="mt-8">
                <h2
                  id="ilgili"
                  className="font-display text-label font-semibold tracking-[0.14em] text-mute uppercase"
                >
                  İlgili bölümler
                </h2>
                <ul className="mt-4">
                  {related.map((item) => (
                    <li key={item.slug} className="border-t border-line first:border-t-0">
                      <Link
                        href={`/${item.slug}`}
                        className="group flex items-baseline gap-3 py-3 no-underline"
                      >
                        <span
                          aria-hidden="true"
                          className="chapter-num chapter-num-sm text-[0.9375rem] transition-colors group-hover:text-palm-deep"
                        >
                          {String(item.number).padStart(2, '0')}
                        </span>
                        <span className="font-display text-small font-medium text-ink transition-colors group-hover:text-palm-deep">
                          {item.navLabel}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  );
}

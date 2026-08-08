import Link from 'next/link';
import { GUIDES } from '@/content/guides';
import { SITE, PUBLISHER, miamiliUrl } from '@/lib/site';

// `new Date()` YOK: Vercel UTC'de çalışır ve build zamanına göre değişen bir
// yıl, statik sayfalarda sessizce eskiyen tek dinamik veri olurdu.
const YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="mt-band border-t border-line bg-mist">
      <div className="mx-auto max-w-page px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr]">
          <div>
            <p className="font-display text-h3 font-semibold tracking-tight text-ink">
              florida<span className="text-palm-deep">rehberi</span>
            </p>
            <p className="mt-3 max-w-[36ch] text-small text-mute">{SITE.tagline}</p>
            <div className="tide mt-6 w-16" aria-hidden="true" />
          </div>

          <nav aria-label="Rehberler">
            <h2 className="font-display text-label font-semibold tracking-[0.14em] text-mute uppercase">
              El kitabı
            </h2>
            <ul className="mt-4 space-y-2">
              {GUIDES.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/${guide.slug}`}
                    className="text-small text-ink-soft no-underline transition-colors hover:text-palm-deep"
                  >
                    {guide.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-label font-semibold tracking-[0.14em] text-mute uppercase">
              Yayın
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-small text-ink-soft no-underline transition-colors hover:text-palm-deep"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkinda"
                  className="text-small text-ink-soft no-underline transition-colors hover:text-palm-deep"
                >
                  Hakkında
                </Link>
              </li>
            </ul>

            <p className="mt-7 text-small text-mute">
              Bir{' '}
              <a
                href={miamiliUrl('/', 'footer')}
                className="font-medium text-palm-deep underline decoration-palm-deep/40 underline-offset-4 transition-colors hover:decoration-palm-deep"
              >
                {PUBLISHER.name}
              </a>{' '}
              yayınıdır.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-line-strong pt-6">
          <p className="text-[0.8125rem] leading-relaxed text-mute">
            © {YEAR} {SITE.legalName}. Buradaki bilgiler genel bilgilendirme
            amaçlıdır; hukuki, mali ya da tıbbi tavsiye değildir. Kurallar ve
            tutarlar değişebilir — kararınızı vermeden önce resmî kaynaktan
            doğrulayın.
          </p>
        </div>
      </div>
    </footer>
  );
}

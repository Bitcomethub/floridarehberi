import Link from 'next/link';
import { GUIDES } from '@/content/guides';

/**
 * 404 — boş bir özür değil, gezinme sunar.
 *
 * Bu sayfanın gerçekten görüldüğü ana senaryo: eski/yanlış yazılmış bir
 * rehber URL'i. Dolayısıyla doğru cevap on bölümün listesini göstermek.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-page px-5 py-band sm:px-8">
      <p className="chapter-num text-[4rem]">404</p>
      <h1 className="mt-6 max-w-[20ch] font-display text-h1 font-semibold text-ink">
        Bu adreste bir sayfa yok
      </h1>
      <p className="prose-fr mt-5 text-ink-soft">
        Bağlantı eskimiş ya da adres yanlış yazılmış olabilir. El kitabının
        on bölümü aşağıda; aradığınız konu büyük ihtimalle bunlardan biridir.
      </p>

      <ol className="mt-10 max-w-[46rem] border-t border-line-strong">
        {GUIDES.map((guide) => (
          <li key={guide.slug} className="border-b border-line-strong">
            <Link
              href={`/${guide.slug}`}
              className="group flex items-baseline gap-4 py-4 no-underline"
            >
              <span
                aria-hidden="true"
                className="chapter-num chapter-num-sm text-[1.125rem] transition-colors group-hover:text-palm-deep"
              >
                {String(guide.number).padStart(2, '0')}
              </span>
              <span className="font-display text-small font-medium text-ink transition-colors group-hover:text-palm-deep">
                {guide.navLabel}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-small">
        <Link href="/" className="text-palm-deep underline underline-offset-4">
          Ana sayfaya dön
        </Link>
      </p>
    </div>
  );
}

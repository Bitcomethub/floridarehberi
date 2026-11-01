import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/schema';
import { PUBLISHER, SITE, abs } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Kullanım Şartları',
  description:
    'Florida Rehberi içeriğini kimin yayınladığı, bilgilerin hangi sınırlar içinde sunulduğu ve izinsiz kullanımda ne olduğu: kısa kullanım şartları.',
  alternates: { canonical: '/kullanim-sartlari' },
  openGraph: { url: abs('/kullanim-sartlari'), locale: 'tr_TR' },
};

export default function KullanimSartlariPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Kullanım Şartları', path: '/kullanim-sartlari' }]),
          ),
        }}
      />

      <header className="mx-auto max-w-page px-5 pt-12 pb-stack sm:px-8 sm:pt-16">
        <nav aria-label="Kırıntı navigasyonu" className="text-small text-mute">
          <Link href="/" className="text-palm-deep no-underline hover:underline">
            Ana sayfa
          </Link>
          <span aria-hidden="true" className="px-2">
            ·
          </span>
          <span>Kullanım Şartları</span>
        </nav>

        <h1 className="mt-8 max-w-[24ch] font-display text-h1 font-semibold text-ink">
          Bu siteyi kullanırken neyi kabul ediyorsunuz?
        </h1>
        <p className="mt-6 max-w-[62ch] text-body text-ink-2">
          Siteyi kullanmak bu şartları kabul etmek anlamına gelir. Kim
          yayınlıyor, bilgi ne kadar bağlayıcı ve içerik nasıl kullanılabilir:
          üçü de bu sayfada.
        </p>
      </header>

      <section className="mx-auto max-w-page px-5 pb-16 sm:px-8">
        <h2 className="font-display text-h2 font-semibold text-ink">Yayıncı</h2>
        <p className="mt-4 text-body text-ink-2">
          {SITE.name}, {PUBLISHER.name} tarafından yayınlanan Türkçe bir Florida
          yaşam rehberidir. Sitede emlak satışı, vize danışmanlığı ya da hukuki
          danışmanlık yapılmaz.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold text-ink">
          Bilginin sınırı
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Kira, sigorta, vergi, ehliyet ve okul kaydı gibi konulardaki kurallar
          ilçeye ve döneme göre değişir. Buradaki bilgiler yayın tarihindeki en
          iyi kanaatimizi yansıtır, kesin taahhüt değildir. Bağlayıcı konularda
          resmî kaynağı esas alın. Bu bilgilere dayanarak alınan kararların
          sonuçlarından yayıncı sorumlu tutulamaz.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold text-ink">
          İçeriğin kullanımı
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Metinlerin ve görsellerin hakkı {PUBLISHER.name} ve ilgili sahiplerine
          aittir. Kısa alıntı, kaynak gösterilerek ve bağlantı verilerek
          yapılabilir. İçeriğin bütün olarak kopyalanması, başka bir sitede
          yayınlanması veya ticari materyale dönüştürülmesi yazılı izin
          gerektirir.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold text-ink">
          Dış bağlantılar
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Siteden resmî kurumlara ve başka sitelere bağlantı verilir. Bu
          sitelerin içeriği ve kuralları bizim denetimimizde değildir; onlara
          ilişkin bir sorumluluk üstlenmiyoruz.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold text-ink">
          Değişiklik
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Şartlar gerektiğinde güncellenir ve güncel sürüm bu sayfada yayınlanır.
          Yürürlük tarihi: 31 Ekim 2026.
        </p>
      </section>
    </>
  );
}

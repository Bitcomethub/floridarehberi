import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/schema';
import { PUBLISHER, SITE, abs } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Gizlilik',
  description:
    'Florida Rehberi hangi veriyi topluyor, hangisini toplamıyor, çerezleri nasıl kullanıyor ve silme talebini nasıl iletiyorsunuz? Kısa ve açık gizlilik beyanı.',
  alternates: { canonical: '/gizlilik' },
  openGraph: { url: abs('/gizlilik'), locale: 'tr_TR' },
};

export default function GizlilikPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: 'Gizlilik', path: '/gizlilik' }])),
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
          <span>Gizlilik</span>
        </nav>

        <h1 className="mt-8 max-w-[22ch] font-display text-h1 font-semibold text-ink">
          Hangi veriyi topluyoruz?
        </h1>
        <p className="mt-6 max-w-[62ch] text-body text-ink-2">
          {SITE.name}, {PUBLISHER.name} tarafından yayınlanır. Bu sayfa hangi
          verinin işlendiğini, hangisinin işlenmediğini ve silme talebini nasıl
          iletebileceğinizi anlatır.
        </p>
      </header>

      <section className="mx-auto max-w-page px-5 pb-16 sm:px-8">
        <h2 className="font-display text-h2 font-semibold text-ink">
          Hesap açmanız gerekmiyor
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Sitede üyelik, giriş ya da yorum yazma yok. Adınız, e-postanız veya
          telefonunuz bir hesap altında tutulmuyor. Rehberleri okumak için
          hiçbir bilgi vermeniz gerekmiyor.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold text-ink">
          Ölçümleme yalnız onay verirseniz çalışır
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Hangi sayfaların okunduğunu görmek için Google Analytics
          kullanıyoruz. Çerez onayı vermezseniz ölçümleme çalışmaz ve site aynı
          şekilde çalışmaya devam eder. Reklam çerezi, kişiselleştirilmiş reklam
          ve profilleme yok.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold text-ink">
          Sunucu kayıtları
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Sayfaların sunulması sırasında barındırma sağlayıcısı teknik kayıt
          tutar: istek zamanı, sayfa adresi, tarayıcı bilgisi ve IP adresi. Bu
          kayıtlar sitenin çalışması ve kötüye kullanımın önlenmesi için
          tutulur, pazarlama amacıyla kullanılmaz.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold text-ink">
          Bağlantılar ve üçüncü taraflar
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Sitede {PUBLISHER.name} tarafından yayınlanan diğer yayınlara
          bağlantılar bulunur. Bu bağlantılar kaynak gösterme amaçlıdır;
          tıkladığınızda o sitenin kendi gizlilik kuralları geçerli olur. Sitede
          satış, komisyonlu bağlantı ya da yönlendirme geliri yoktur.
        </p>

        <h2 className="mt-stack font-display text-h2 font-semibold text-ink">
          Silme ve düzeltme talebi
        </h2>
        <p className="mt-4 text-body text-ink-2">
          Hakkınızda işlenen bir veri olduğunu düşünüyorsanız ya da bir bilginin
          yanlış olduğunu fark ettiyseniz, hangi sayfa ve hangi ifade olduğunu
          yazarak bildirin. Talebi aldıktan sonra kaydı inceler, gerekiyorsa
          siler ve sonucu size bildiririz. İletişim için{' '}
          <a href="https://miamili.com" rel="noopener">
            miamili.com
          </a>{' '}
          üzerindeki iletişim kanalını kullanabilirsiniz.
        </p>

        <p className="mt-stack text-small text-mute">
          Bu beyan {SITE.name} için geçerlidir. Yürürlük tarihi: 31 Ekim 2026.
        </p>
      </section>
    </>
  );
}

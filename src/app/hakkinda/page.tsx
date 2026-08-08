import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/content/guides';
import { breadcrumbSchema, faqSchema, graph } from '@/lib/schema';
import { PUBLISHER, SITE, abs, miamiliUrl } from '@/lib/site';

export const dynamic = 'force-static';

const FAQS = [
  {
    q: 'Florida Rehberi’ni kim yayınlıyor?',
    a: 'Florida Rehberi, Miami merkezli MiamiLi Media tarafından yayınlanan Türkçe bir rehber yayınıdır. Sahiplik ilişkisi her sayfanın altında açıkça belirtilir.',
  },
  {
    q: 'İçerikte neden çok az rakam var?',
    a: 'Kira, sigorta primi, maaş ve vergi tutarı gibi değerler ilçeye, döneme ve kişisel duruma göre değişir. Bu tür rakamları sabitlemek, birkaç ay içinde yanlış hâle gelen bir metin üretir. Bunun yerine maliyetin hangi kalemlerden oluştuğu anlatılır ve güncel rakamın hangi resmî kaynaktan alınacağı gösterilir.',
  },
  {
    q: 'Vize ve göçmenlik konularında bilgi var mı?',
    a: 'Hayır. Vize, oturum ve göçmenlik statüsü konuları bu sitenin kapsamı dışındadır. Bu alan uzmanlık gerektirir ve yanlış bilgi ciddi sonuçlar doğurur; bu yüzden kasıtlı olarak ele alınmaz.',
  },
  {
    q: 'İçerikler ne sıklıkla güncelleniyor?',
    a: 'El kitabı bölümleri kural değişikliklerinde elden geçirilir ve her sayfada son güncelleme tarihi görünür. Blog bölümüne düzenli olarak yeni yazı eklenir.',
  },
  {
    q: 'Bu site bir danışmanlık hizmeti mi?',
    a: 'Hayır. Site genel bilgilendirme amaçlıdır; hukuki, mali, vergisel ya da tıbbi tavsiye niteliği taşımaz. Kendi durumunuz için yetkili bir uzmana danışmanız gerekir.',
  },
];

export const metadata: Metadata = {
  title: 'Hakkında — Florida Rehberi nasıl yazılıyor',
  description:
    'Florida Rehberi’nin yayın ilkeleri: rakam uydurmama kuralı, resmî kaynak zorunluluğu, kapsam dışı bıraktığımız konular ve yayıncı MiamiLi Media ile ilişki.',
  alternates: { canonical: '/hakkinda' },
  openGraph: {
    type: 'website',
    url: abs('/hakkinda'),
    title: 'Hakkında — Florida Rehberi nasıl yazılıyor',
    description:
      'Yayın ilkeleri, kapsam sınırları ve yayıncı bilgisi.',
    locale: SITE.locale,
    siteName: SITE.name,
  },
};

const jsonLd = graph([
  {
    '@type': 'AboutPage',
    '@id': `${abs('/hakkinda')}#page`,
    url: abs('/hakkinda'),
    name: 'Hakkında — Florida Rehberi',
    inLanguage: SITE.lang,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#publisher` },
  },
  faqSchema(FAQS, `${abs('/hakkinda')}#faq`),
  breadcrumbSchema([
    { name: 'Ana sayfa', path: '/' },
    { name: 'Hakkında', path: '/hakkinda' },
  ]),
]);

export default function AboutPage() {
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
          <span>Hakkında</span>
        </nav>

        <h1 className="mt-8 max-w-[20ch] font-display text-h1 font-semibold text-ink">
          Bu rehber nasıl yazılıyor
        </h1>
      </header>

      <div className="mx-auto max-w-page px-5 pb-band sm:px-8">
        <div className="max-w-[46rem]">
          <div className="prose-fr text-ink-soft">
            <p className="text-[1.0625em] text-ink">
              Florida Rehberi, Florida’ya taşınan ve orada yaşayan Türkçe
              konuşanlar için hazırlanmış bir el kitabıdır. Amaç, ilk yılda
              karşınıza çıkan işleri — ev, ehliyet, okul, sağlık, vergi,
              araç, kasırga sezonu — sıfırdan anlaşılır biçimde anlatmaktır.
            </p>
            <p>
              Bu tür konularda Türkçe kaynak bulmak zordur. Bulunanların çoğu
              ya kişisel deneyim anlatısıdır ya da yıllar önce yazılmış,
              kimin yazdığı belli olmayan metinlerdir. Buradaki fark,
              yazılanların bir yayın ilkesine bağlı olması: neyi
              yazmadığımızı da açıkça söylüyoruz.
            </p>
          </div>

          <section className="mt-band" aria-labelledby="ilkeler">
            <div className="tide mb-5 w-10" aria-hidden="true" />
            <h2 id="ilkeler" className="font-display text-h2 font-semibold text-ink">
              Yayın ilkeleri
            </h2>

            <dl className="mt-7">
              <div className="border-t border-line py-6 first:border-t-0 first:pt-0">
                <dt className="font-display text-h3 font-semibold text-ink">
                  Rakam uydurulmaz
                </dt>
                <dd className="prose-fr mt-2.5 text-ink-soft">
                  <p>
                    Ortalama kira, sigorta primi, maaş ya da vergi tutarı gibi
                    hızla eskiyen sayılar yazılmaz. Bunlar ilçeye, döneme ve
                    kişiye göre değişir; sabit bir sayı vermek okuyucuyu
                    yanıltır. Yerine maliyetin hangi kalemlerden oluştuğu
                    anlatılır ve güncel rakamın nereden alınacağı gösterilir.
                  </p>
                </dd>
              </div>

              <div className="border-t border-line py-6">
                <dt className="font-display text-h3 font-semibold text-ink">
                  Kaynak gösterilir
                </dt>
                <dd className="prose-fr mt-2.5 text-ink-soft">
                  <p>
                    Bir kural anlatılıyorsa, o kuralı belirleyen kurumun
                    bağlantısı sayfanın altında bulunur: FLHSMV (ehliyet ve
                    araç), Florida Department of Revenue (vergi), Florida
                    Department of Education (okul), HealthCare.gov (sağlık
                    sigortası), National Hurricane Center (kasırga).
                  </p>
                </dd>
              </div>

              <div className="border-t border-line py-6">
                <dt className="font-display text-h3 font-semibold text-ink">
                  Sahte deneyim yazılmaz
                </dt>
                <dd className="prose-fr mt-2.5 text-ink-soft">
                  <p>
                    Uydurulmuş kullanıcı yorumu, olmamış vaka anlatısı ya da
                    ismi olmayan “bir okurumuz” hikâyesi bu sitede yer almaz.
                    Bir deneyim aktarılıyorsa kimin deneyimi olduğu bellidir.
                  </p>
                </dd>
              </div>

              <div className="border-t border-line py-6 last:pb-0">
                <dt className="font-display text-h3 font-semibold text-ink">
                  Kapsam sınırlıdır
                </dt>
                <dd className="prose-fr mt-2.5 text-ink-soft">
                  <p>
                    Vize, oturum izni ve göçmenlik statüsü konuları kasıtlı
                    olarak ele alınmaz. Bu alan hukuki uzmanlık gerektirir ve
                    yanlış bilginin bedeli ağırdır. Sitede yazan hiçbir şey
                    hukuki, mali, vergisel ya da tıbbi tavsiye değildir.
                  </p>
                </dd>
              </div>
            </dl>
          </section>

          <section className="mt-band" aria-labelledby="yayinci">
            <div className="tide tide-coral mb-5 w-10" aria-hidden="true" />
            <h2 id="yayinci" className="font-display text-h2 font-semibold text-ink">
              Yayıncı kim?
            </h2>
            <div className="prose-fr mt-4 text-ink-soft">
              <p>
                Florida Rehberi, {PUBLISHER.name} tarafından yayınlanır.
                MiamiLi, Miami’de Türk yatırımcılara ve alıcılara hizmet veren
                bir gayrimenkul markasıdır; bu rehber onun bağımsız yayın
                kolu olarak hazırlanır.
              </p>
              <p>
                Bu ilişkiyi gizlemiyoruz, çünkü okuyucunun kimin yazdığını
                bilmeye hakkı var. Rehber içeriği emlak satmak için
                yazılmamıştır: on bölümün çoğunda MiamiLi’ye hiçbir bağlantı
                yoktur. Yalnızca konu doğrudan mülk almakla ilgili olduğunda —
                örneğin emlak vergisi ya da konut maliyeti anlatılırken —
                bağlamsal bir bağlantı verilir ve bunun bir MiamiLi bağlantısı
                olduğu açıkça yazılır.
              </p>
              <p>
                Miami’de mülk alım-satımı konusunda doğrudan destek arıyorsanız{' '}
                <a href={miamiliUrl('/', 'hakkinda')}>miamili.com</a> üzerinden
                ulaşabilirsiniz.
              </p>
            </div>
          </section>

          <section className="mt-band" aria-labelledby="icindekiler">
            <div className="tide tide-sea mb-5 w-10" aria-hidden="true" />
            <h2
              id="icindekiler"
              className="font-display text-h2 font-semibold text-ink"
            >
              El kitabında ne var?
            </h2>
            <ol className="mt-6 border-t border-line">
              {GUIDES.map((guide) => (
                <li key={guide.slug} className="border-b border-line">
                  <Link
                    href={`/${guide.slug}`}
                    className="group flex items-baseline gap-4 py-3.5 no-underline"
                  >
                    <span
                      aria-hidden="true"
                      className="chapter-num chapter-num-sm text-[0.9375rem] transition-colors group-hover:text-palm-deep"
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
          </section>

          <section className="mt-band" aria-labelledby="sss-hakkinda">
            <div className="tide tide-sun mb-5 w-10" aria-hidden="true" />
            <h2
              id="sss-hakkinda"
              className="font-display text-h2 font-semibold text-ink"
            >
              Sık sorulan sorular
            </h2>
            <dl className="mt-7">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="border-t border-line py-6 first:border-t-0 first:pt-0"
                >
                  <dt className="font-display text-h3 font-semibold text-ink">
                    {faq.q}
                  </dt>
                  <dd className="mt-2.5 max-w-prose text-ink-soft">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </>
  );
}

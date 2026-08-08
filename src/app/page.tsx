import Link from 'next/link';
import { GUIDES } from '@/content/guides';
import { getRecentPosts } from '@/lib/blogData';
import { formatDate } from '@/lib/format';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const recentPosts = getRecentPosts(3);

export default function HomePage() {
  return (
    <>
      {/* ── Giriş: answer-first. Sayfanın ilk paragrafı sitenin ne
          olduğunu bir cümlede söyler; süslü açılış cümlesi yok. ── */}
      <section className="mx-auto max-w-page px-5 pt-14 pb-band sm:px-8 sm:pt-20">
        <p className="swell font-display text-label font-semibold tracking-[0.14em] text-palm-deep uppercase">
          Türkçe · Florida
        </p>

        <h1
          className="swell mt-5 max-w-[16ch] font-display text-hero font-semibold text-ink"
          style={{ '--i': 1 } as React.CSSProperties}
        >
          Florida’da yaşamanın el kitabı
        </h1>

        <div
          className="swell mt-8 grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]"
          style={{ '--i': 2 } as React.CSSProperties}
        >
          <div className="prose-fr text-ink-soft">
            <p>
              Florida’ya taşınan bir hanenin ilk yılında karşısına çıkan işler
              bellidir: ev kiralamak, ehliyet almak, çocuğu okula yazdırmak,
              sağlık sigortası seçmek, vergileri anlamak ve kasırga sezonuna
              hazırlanmak. Bu sitede o işlerin her biri için bir bölüm var —
              hepsi Türkçe, hepsi resmî kaynağa bağlı.
            </p>
            <p>
              Burada tahmin edilmiş rakam ya da uydurulmuş yorum
              bulamazsınız. Değişken olan her şey — fiyatlar, oranlar, süreler
              — sabit sayı olarak değil, nereden doğrulanacağı gösterilerek
              anlatılır.
            </p>
          </div>

          <aside className="lg:pt-1">
            <div className="horizon mb-5 w-full" aria-hidden="true" />
            <p className="font-display text-small font-medium text-ink">
              Vize ve göçmenlik konuları bu sitenin kapsamı dışındadır.
            </p>
            <p className="mt-2 text-small text-mute">
              Yaşamla ilgili pratik sorulara odaklanıyoruz; hukuki statü
              konuları ayrı bir uzmanlık alanıdır.
            </p>
          </aside>
        </div>
      </section>

      {/* ── El kitabı dizini. Kart ızgarası DEĞİL: numaralı bölüm listesi.
          Sıra anlamlıdır — taşınma sürecinin doğal akışını izler. ── */}
      <section
        id="rehberler"
        aria-labelledby="rehberler-baslik"
        className="border-t border-line bg-mist"
      >
        <div className="mx-auto max-w-page px-5 py-band sm:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2
              id="rehberler-baslik"
              className="font-display text-h1 font-semibold text-ink"
            >
              On bölüm
            </h2>
            <p className="text-small text-mute">
              Taşınma sırasına göre dizildi — baştan okunabilir, tek tek de
              açılabilir.
            </p>
          </div>

          <ol className="mt-12 border-t border-line-strong">
            {GUIDES.map((guide) => (
              <li key={guide.slug} className="border-b border-line-strong">
                <Link
                  href={`/${guide.slug}`}
                  className="group grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-x-4 gap-y-2 py-7 no-underline sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-x-8 sm:py-9"
                >
                  <span
                    aria-hidden="true"
                    className="chapter-num text-[2.25rem] transition-colors group-hover:text-palm sm:text-[3.25rem]"
                  >
                    {String(guide.number).padStart(2, '0')}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-display text-h3 font-semibold text-ink transition-colors group-hover:text-palm-deep">
                      {guide.title}
                    </h3>
                    <p className="mt-2 max-w-[62ch] text-small text-mute">
                      {guide.excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Yayın politikası. Koyu bant: canlı marka renkleri burada
          METİN taşıyabiliyor (ölçülmüş kontrast, bkz. globals.css). ── */}
      <section className="band-ink bg-ink text-mist" aria-labelledby="politika">
        <div className="horizon" aria-hidden="true" />
        <div className="mx-auto max-w-page px-5 py-band sm:px-8">
          <h2
            id="politika"
            className="max-w-[20ch] font-display text-h1 font-semibold text-page"
          >
            Ne yazdığımız kadar ne yazmadığımız da önemli
          </h2>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="tide mb-4 w-8" aria-hidden="true" />
              <h3 className="font-display text-h3 font-semibold text-sun">
                Rakam uydurmuyoruz
              </h3>
              <p className="mt-2.5 text-small leading-relaxed text-mist/80">
                Ortalama kira, maaş ya da prim gibi hızla eskiyen sayılar
                yazılmaz. Bunun yerine maliyetin hangi kalemlerden oluştuğu
                anlatılır ve güncel rakamın nereden alınacağı gösterilir.
              </p>
            </div>

            <div>
              <div className="tide tide-sea mb-4 w-8" aria-hidden="true" />
              <h3 className="font-display text-h3 font-semibold text-sea">
                Kaynak gösteriyoruz
              </h3>
              <p className="mt-2.5 text-small leading-relaxed text-mist/80">
                Her bölümün altında konuyla ilgili resmî kurum bağlantısı
                bulunur: FLHSMV, Florida Department of Revenue, HealthCare.gov,
                National Hurricane Center.
              </p>
            </div>

            <div>
              <div className="tide tide-coral mb-4 w-8" aria-hidden="true" />
              <h3 className="font-display text-h3 font-semibold text-coral">
                Tavsiye değil, çerçeve
              </h3>
              <p className="mt-2.5 text-small leading-relaxed text-mist/80">
                Burası hukuki, mali ya da tıbbi danışmanlık yeri değildir.
                Kararı siz verirsiniz; biz kararı vermek için hangi soruları
                sormanız gerektiğini anlatırız.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      {recentPosts.length > 0 ? (
        <section
          aria-labelledby="blog-baslik"
          className="mx-auto max-w-page px-5 py-band sm:px-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2 id="blog-baslik" className="font-display text-h1 font-semibold text-ink">
              Güncel yazılar
            </h2>
            <Link
              href="/blog"
              className="font-display text-small font-medium text-palm-deep underline decoration-palm-deep/40 underline-offset-4 transition-colors hover:decoration-palm-deep"
            >
              Tüm yazılar
            </Link>
          </div>

          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <article>
                  <div className="tide tide-sun mb-4 w-8" aria-hidden="true" />
                  <p className="text-[0.8125rem] text-mute tabular">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h3 className="mt-1.5 font-display text-h3 font-semibold text-ink">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="no-underline transition-colors hover:text-palm-deep"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-small text-mute">{post.excerpt}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="sr-only">{SITE.description}</p>
    </>
  );
}

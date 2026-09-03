import Link from 'next/link';
import { SITE } from '@/lib/site';
import { SiteMark } from './SiteMark';

/**
 * Sabit üst bant. Açılır menü YOK — 10 rehberin tamamı ana sayfa dizininde ve
 * footer'da duruyor. Açılır menü klavye/odak yükü getirir, buradaki bilgi
 * mimarisi (tek seviye) onu gerektirmiyor.
 *
 * `flex-wrap` DEKORATİF DEĞİL: sarma olmadan "Hakkında" bağlantısı
 * `body{overflow-x:hidden}` tarafından kırpılıp ERİŞİLEMEZ hâle geliyordu —
 * WCAG 1.4.10 (Reflow) ihlali; kaydırma çubuğu bile görünmediği için sessiz.
 *
 * ÖLÇÜLEN EŞİK (headless Chrome, 320→393px tarandı; menü sabit 201px):
 *   marka 106px (işaretsiz) → ≥352px tek satır
 *   marka 128px (işaretli)  → ≥375px tek satır
 * Marka işareti 22px (16px ikon + 6px boşluk) ekliyor ve eşiği 352→375'e
 * taşıyordu: 360px Android'de başlık 58px'ten 88px'e çıkıyordu. ÇÖZÜM:
 * işaret 375px ALTINDA hiç render EDİLMEZ (`hidden min-[375px]:block`).
 * Böylece dar ekran ölçülmüş 352px eşiğini AYNEN korur — bu başlığın
 * boşluk değerlerine (`gap-4`, `gap-x-3`) DOKUNULMADI, kasıtlı.
 * `display:none` bir flex öğesini kutudan tamamen çıkarır: `gap-1.5` de
 * uygulanmaz, yani 375 altında künye baytı baytına eski hâline döner.
 * Bu sayıları değiştiren her düzenleme yeniden ÖLÇER — tahmin etme.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/92 backdrop-blur-sm">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-3 gap-y-1.5 px-4 py-3.5 sm:flex-nowrap sm:gap-x-6 sm:px-8">
        {/*
          Erişilebilir ad GÖRÜNEN metni İÇERMEK zorunda (WCAG 2.5.3,
          Label in Name). Burada `SITE.name` KULLANILMAZ: künye ekranda
          boşluksuz "floridarehberi", SITE.name ise "Florida Rehberi" —
          sesli komutla "floridarehberi" diyen kullanıcı bağlantıyı
          çağıramıyordu. Aşağıdaki iki span'in birleşimi SITE.wordmark'a
          eşit kalmalı.
        */}
        <Link
          href="/"
          className="group flex items-center gap-1.5 no-underline"
          aria-label={`${SITE.wordmark} — ana sayfa`}
        >
          {/* İşaret künye GENİŞLİĞİNE eklenir; eşiği 352→375px'e taşıyor
              (yukarıdaki ölçüm notu). `items-baseline` → `items-center`:
              SVG'nin metin taban çizgisi yok, baseline'da ikon aşağı kayıyordu. */}
          <SiteMark className="hidden h-4 w-4 shrink-0 min-[375px]:block" />
          <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.03em] text-ink">
            florida<span className="text-palm-deep">rehberi</span>
          </span>
        </Link>

        <nav aria-label="Ana menü">
          <ul className="flex items-center gap-4 text-small sm:gap-7">
            <li>
              <Link
                href="/#rehberler"
                className="-my-3 py-3 font-display font-medium text-ink-soft no-underline transition-colors hover:text-palm-deep"
              >
                Rehberler
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="-my-3 py-3 font-display font-medium text-ink-soft no-underline transition-colors hover:text-palm-deep"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/hakkinda"
                className="-my-3 py-3 font-display font-medium text-ink-soft no-underline transition-colors hover:text-palm-deep"
              >
                Hakkında
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

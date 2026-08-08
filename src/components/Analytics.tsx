'use client';

import { useSyncExternalStore } from 'react';
import Script from 'next/script';

// ─────────────────────────────────────────────────────────────────────────
// GA4 + kendi onay kapımız (KVKK/GDPR)
//
// KURAL: onay kapısı GÖRÜNÜRLÜĞÜ değil RENDER'ı kontrol eder. `hidden` ile
// saklanan bir <Script> yine de yüklenir ve çerez yazar. Bu yüzden gtag
// JSX'i yalnızca `consent === 'granted'` iken AĞACA GİRER.
//
// "Reddet" butonu "Kabul et" ile aynı ağırlıkta erişilebilir olmak zorunda
// (GDPR Art. 7(3) / EDPB 05/2020) — tek butonlu banner UYUMSUZDUR.
//
// Ölçüm kimliği env'den okunur (NEXT_PUBLIC_GA4_MEASUREMENT_ID). Değişken
// BUILD anında gömülür: Vercel'e eklendikten sonra yeniden deploy edilmezse
// mevcut sürümlerde ölçüm çalışmaz.
//
// Durum `useSyncExternalStore` ile okunur, `useEffect` + `setState` ile DEĞİL:
// localStorage React'in dışındaki bir depodur ve effect içinde senkron
// setState çağırmak garanti bir ikinci render turu doğurur (React 19'da
// `react-hooks/set-state-in-effect` bunu hata sayıyor). Yan kazanç: `storage`
// olayına abone olduğumuz için bir sekmede verilen karar diğerlerine yayılır.
// ─────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'fr-consent-v1';
const GA_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

type Consent = 'unknown' | 'granted' | 'denied';

const listeners = new Set<() => void>();

// getSnapshot her render'da çağrılır; localStorage'ı her seferinde okumamak
// için önbelleğe alınır. Modül seviyesinde HEMEN okumak yanlış olurdu —
// bu dosya SSR sırasında da değerlendiriliyor, `window` orada yok.
let cache: Consent | null = null;

function readStored(): Consent {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') return stored;
  } catch {
    // localStorage engelliyse (private mode / 3rd-party kısıtı) onay
    // sorulmamış sayılır; ölçüm yapılmaz, banner her oturumda görünür.
  }
  return 'unknown';
}

function emit() {
  for (const listener of listeners) listener();
}

function onStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  cache = readStored();
  emit();
}

function subscribe(onChange: () => void) {
  if (listeners.size === 0) window.addEventListener('storage', onStorage);
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot(): Consent {
  if (cache === null) cache = readStored();
  return cache;
}

// Sunucu ve hidrasyon turu daima 'unknown' döner: statik HTML'e asla üçüncü
// parti `src` gömülmez ve hydration uyuşmazlığı da olmaz.
function getServerSnapshot(): Consent {
  return 'unknown';
}

// Hidrasyon bitti mi? Banner'ın statik HTML'de yer alıp kararını çoktan vermiş
// ziyaretçide bir kare "yanıp sönmesini" engelliyor.
const noopSubscribe = () => () => {};

export function Analytics() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  function decide(value: Exclude<Consent, 'unknown'>) {
    cache = value;
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* yazılamıyorsa karar yalnızca bu oturum için geçerli */
    }
    emit();
  }

  const showBanner = hydrated && consent === 'unknown' && Boolean(GA_ID);

  return (
    <>
      {consent === 'granted' && GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {showBanner ? (
        <div
          role="dialog"
          aria-labelledby="consent-title"
          aria-describedby="consent-desc"
          className="fixed inset-x-3 bottom-3 z-50 border border-line-strong bg-page px-5 py-4 shadow-[0_12px_44px_-14px_oklch(27%_0.04_187/0.4)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
        >
          <h2
            id="consent-title"
            className="font-display text-small font-semibold tracking-tight text-ink"
          >
            Ölçümleme çerezleri
          </h2>
          <p id="consent-desc" className="mt-1.5 text-[0.8125rem] leading-relaxed text-mute">
            Hangi rehberlerin işe yaradığını görmek için Google Analytics
            kullanmak istiyoruz. Reklam çerezi yok. Reddederseniz site aynı
            şekilde çalışır.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => decide('granted')}
              className="cursor-pointer bg-ink px-4 py-2 font-display text-[0.8125rem] font-medium text-page transition-colors hover:bg-palm-deep"
            >
              Kabul et
            </button>
            <button
              type="button"
              onClick={() => decide('denied')}
              className="cursor-pointer px-3 py-2 font-display text-[0.8125rem] font-medium text-ink-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
            >
              Reddet
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

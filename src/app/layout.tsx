import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Public_Sans } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Analytics } from '@/components/Analytics';
import { SITE, PUBLISHER } from '@/lib/site';
import { graph, organizationSchema, websiteSchema } from '@/lib/schema';

// Türkçe diacritics (ı İ ş ğ ç ö ü) `latin-ext` subset'inde — ikisi de
// zorunlu, aksi hâlde tarayıcı ı/ş için fallback fonta düşer ve satır
// içinde iki farklı font karışır.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricolage',
  display: 'swap',
});

const publicSans = Public_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-public-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Florida Rehberi — Türkler için Florida’da yaşam el kitabı',
    template: '%s | Florida Rehberi',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: PUBLISHER.name, url: PUBLISHER.site }],
  publisher: SITE.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: 'Florida Rehberi — Türkler için Florida’da yaşam el kitabı',
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={SITE.lang}
      className={`${bricolage.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-page text-ink">
        {/* Site geneli kimlik grafiği. `@context` ZORUNLU — bağlamsız bir
            node dizisi geçerli JSON-LD değildir ve sessizce yok sayılır. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graph([organizationSchema(), websiteSchema()])),
          }}
        />
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-display focus:text-small focus:text-page"
        >
          İçeriğe atla
        </a>
        <SiteHeader />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

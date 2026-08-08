/**
 * Rehber içerik tipleri.
 *
 * İçerik VERİ olarak yazılır, JSX olarak değil: route, JSON-LD, sitemap ve
 * footer navigasyonu AYNI diziden türer. Metni sayfa dosyasına gömmek dört
 * yerde birden tutarsızlık üretir.
 */

export type GuideTable = {
  caption: string;
  columns: string[];
  rows: string[][];
  /** Rakamların oynaklığını çerçeveleyen not — uydurma kesinlik yasak. */
  note?: string;
};

export type GuideSection = {
  /** Soru formatında olması tercih edilir (GEO: pasaj alıntılanabilirliği). */
  heading: string;
  body: string[];
  list?: string[];
  table?: GuideTable;
  note?: string;
};

export type GuideFAQ = {
  q: string;
  a: string;
};

export type GuideFact = {
  label: string;
  value: string;
};

export type GuideSource = {
  label: string;
  url: string;
};

/**
 * Bağlamsal miamili.com bağlantısı. Rehber başına EN FAZLA bir tane ve
 * yalnızca emlak/yatırım/taşınma konusu doğal geçtiğinde.
 * Bkz. CLAUDE.md — bağlantı disiplini.
 */
export type MiamiliLink = {
  /** miamili.com üzerindeki yol; UTM `miamiliUrl()` tarafından eklenir. */
  path: string;
  label: string;
  /** Linki çerçeveleyen cümle — link tek başına asılı kalmaz. */
  context: string;
  campaign: string;
};

export type Guide = {
  slug: string;
  /** El kitabı bölüm numarası — sıralama ve görsel imza. */
  number: number;
  title: string;
  /** Navigasyon ve footer için kısa etiket. */
  navLabel: string;
  /** Sayfanın cevapladığı ana soru — answer-first girişin hedefi. */
  question: string;
  excerpt: string;
  keywords: string[];
  /** ISO tarih (YYYY-MM-DD). `new Date()` ile ÜRETİLMEZ. */
  updated: string;
  intro: string[];
  quickFacts: GuideFact[];
  sections: GuideSection[];
  faqs: GuideFAQ[];
  sources?: GuideSource[];
  /** Diğer rehber slug'ları. */
  related: string[];
  miamili?: MiamiliLink;
};

/**
 * Blog içerik tipleri.
 *
 * DİKKAT: Bu şekil değişirse `scripts/generate-blog-post.mjs` içindeki
 * `OUTPUT_SCHEMA` **aynı commit'te** değişmek zorundadır. Aksi hâlde hat
 * ertesi sabah şemaya uymayan bir taslak üretir ve sessizce `needs_review`
 * yığını büyür.
 */

export type BlogSection = {
  heading: string;
  body: string[];
  list?: string[];
};

export type BlogFAQ = {
  q: string;
  a: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Yazının cevapladığı ana soru. */
  question: string;
  excerpt: string;
  keywords: string[];
  /** ISO tarih (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt: string;
  intro: string[];
  sections: BlogSection[];
  faqs: BlogFAQ[];
  /** Kalite kapısını geçemeyen taslaklar `needs_review` ile işaretlenir ve YAYINLANMAZ. */
  status?: 'published' | 'needs_review';
  /** Otomatik hat tarafından üretildiyse true. */
  generated?: boolean;
};

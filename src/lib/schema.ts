import { SITE, PUBLISHER, abs } from '@/lib/site';
import type { Guide } from '@/content/guides/types';
import type { BlogPost } from '@/content/blog/types';

/**
 * JSON-LD üreticileri.
 *
 * ŞEMA DİSİPLİNİ: bir özelliği yazmadan önce `domainIncludes`'una bak.
 * `inLanguage`, `isPartOf`, `mainEntityOfPage`, `about` yalnız CreativeWork
 * türevlerine yazılır — `Organization`'a YAZILMAZ (Organization'ın ata
 * zinciri `Thing`). Bu ihlaller parse hatası VERMEZ, sessizce yanlış olur.
 */

const ORG_ID = `${SITE.url}/#publisher`;
const SITE_ID = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    // Sahiplik açıkça beyan edilir — gizli link ağı değil, uydu yayın.
    // Kimlik URL'i: UTM ALMAZ (bkz. site.ts).
    parentOrganization: {
      '@type': 'Organization',
      name: PUBLISHER.name,
      url: PUBLISHER.site,
    },
    // Sitenin GERÇEKTEN yayınladığı konular — rehber listesinden türetildi.
    knowsAbout: [
      'Florida’ya taşınmak',
      'Florida’da ev kiralama',
      'Florida’da ehliyet ve araç sigortası',
      'Florida’da sağlık sigortası',
      'Florida’da okul sistemi',
      'Florida’da vergiler',
      'Kasırga sezonu hazırlığı',
      'Florida’da yaşam maliyeti',
    ],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.lang,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function guideArticleSchema(guide: Guide) {
  const url = abs(`/${guide.slug}`);
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: guide.title,
    description: guide.excerpt,
    url,
    inLanguage: SITE.lang,
    datePublished: guide.updated,
    dateModified: guide.updated,
    keywords: guide.keywords.join(', '),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    mainEntityOfPage: url,
  };
}

export function blogPostingSchema(post: BlogPost) {
  const url = abs(`/blog/${post.slug}`);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    inLanguage: SITE.lang,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    keywords: post.keywords.join(', '),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    mainEntityOfPage: url,
  };
}

/** `@graph` sarmalayıcı — sayfa başına TEK script etiketi. */
export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

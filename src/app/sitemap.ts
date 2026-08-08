import type { MetadataRoute } from 'next';
import { GUIDES } from '@/content/guides';
import { ALL_POSTS } from '@/lib/blogData';
import { abs } from '@/lib/site';

/**
 * Sitemap — içerikten türer, elle URL listesi TUTULMAZ.
 *
 * `new Date()` KULLANILMIYOR: build zamanı damgası her deploy'da tüm
 * URL'lerin `lastModified` değerini değiştirir ve tarama sinyalini
 * anlamsızlaştırır (hiçbir şey değişmediği hâlde "her şey değişti" der).
 * Tarihler içeriğin kendi alanlarından gelir.
 */
function latestContentDate(): string {
  const dates = [
    ...GUIDES.map((g) => g.updated),
    ...ALL_POSTS.map((p) => p.updatedAt),
  ].sort();
  return dates[dates.length - 1] ?? '2026-08-08';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = latestContentDate();

  const staticPages: MetadataRoute.Sitemap = [
    { url: abs('/'), lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: abs('/hakkinda'), lastModified: latest, changeFrequency: 'yearly', priority: 0.4 },
    { url: abs('/blog'), lastModified: ALL_POSTS[0]?.publishedAt ?? latest, changeFrequency: 'daily', priority: 0.7 },
  ];

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: abs(`/${guide.slug}`),
    lastModified: guide.updated,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const postPages: MetadataRoute.Sitemap = ALL_POSTS.map((post) => ({
    url: abs(`/blog/${post.slug}`),
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...guidePages, ...postPages];
}

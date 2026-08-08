import type { MetadataRoute } from 'next';
import { abs } from '@/lib/site';

/**
 * robots.txt
 *
 * AI tarayıcıları BİLEREK engellenmiyor. Bu yayının işi alıntılanmak;
 * GPTBot / ClaudeBot / PerplexityBot / Google-Extended'i kapatmak, GEO
 * hedefinin tam tersini yapar. Yeni bir "AI botlarını kapatalım" isteği
 * gelirse bunun görünürlük maliyeti olduğu ayrıca konuşulmalı.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: abs('/sitemap.xml'),
    host: abs('/').replace(/\/$/, ''),
  };
}

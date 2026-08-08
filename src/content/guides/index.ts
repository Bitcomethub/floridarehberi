/**
 * Rehber kayıt defteri (SSOT).
 *
 * `/[slug]` route'u, ana sayfa listesi, footer navigasyonu, sitemap ve JSON-LD
 * hepsi buradan türer. Yeni rehber eklerken: dosyayı yaz, buraya import et,
 * `GUIDES` dizisine `number` sırasına göre koy. Başka hiçbir yerde elle rehber
 * listesi TUTULMAZ.
 *
 * `slug` yayında olan bir URL'dir — yeniden adlandırmak canlı bağlantı kırar.
 */
import type { Guide } from './types';

import nereedYasanir from './nerede-yasanir';
import yasamMaliyeti from './yasam-maliyeti';
import evKiralamak from './ev-kiralamak';
import ehliyet from './ehliyet';
import aracSahibiOlmak from './arac-sahibi-olmak';
import okulSistemi from './okul-sistemi';
import saglikSistemi from './saglik-sistemi';
import vergiler from './vergiler';
import bankaVeKredi from './banka-ve-kredi';
import kasirgaSezonu from './kasirga-sezonu';

export const GUIDES: Guide[] = [
  nereedYasanir,
  yasamMaliyeti,
  evKiralamak,
  ehliyet,
  aracSahibiOlmak,
  okulSistemi,
  saglikSistemi,
  vergiler,
  bankaVeKredi,
  kasirgaSezonu,
];

export const GUIDE_SLUGS: string[] = GUIDES.map((g) => g.slug);

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** `related` slug'larını gerçek rehberlere çevirir; bilinmeyen slug sessizce düşer. */
export function relatedGuides(guide: Guide): Guide[] {
  return guide.related
    .map((slug) => getGuide(slug))
    .filter((g): g is Guide => Boolean(g) && g!.slug !== guide.slug);
}

export type { Guide } from './types';

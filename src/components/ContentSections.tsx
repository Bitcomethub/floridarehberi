import { DataTable } from '@/components/DataTable';
import type { GuideTable } from '@/content/guides/types';

/**
 * Rehber ve blog gövdesi aynı bileşenden çizilir. Yapı GuideSection'ın
 * üst kümesi: blog bölümlerinde `table`/`note` bulunmaz, bu yüzden ikisi de
 * opsiyonel. İki ayrı renderer yazmak, GEO açısından kritik olan
 * başlık/pasaj yapısının zamanla ayrışmasına yol açardı.
 *
 * H2'ler SORU formatındadır (kaynak veride öyle yazılır) — pasaj
 * alıntılanabilirliğinin taşıyıcısı budur.
 */
type Section = {
  heading: string;
  body: string[];
  list?: string[];
  table?: GuideTable;
  note?: string;
};

export function ContentSections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.heading} className="mt-stack">
          <div className="tide mb-5 w-10" aria-hidden="true" />
          <h2 className="font-display text-h2 font-semibold text-ink">
            {section.heading}
          </h2>

          <div className="prose-fr mt-4 text-ink-soft">
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          {section.list ? (
            <ul className="prose-fr mt-5 space-y-2.5">
              {section.list.map((item) => (
                <li key={item} className="flex gap-3 text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-[0.62em] h-[5px] w-[5px] shrink-0 bg-palm"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.table ? <DataTable table={section.table} /> : null}

          {section.note ? (
            <p className="prose-fr mt-5 bg-mist px-4 py-3 text-small text-ink-soft">
              <span className="font-display font-semibold text-ink">Not: </span>
              {section.note}
            </p>
          ) : null}
        </section>
      ))}
    </>
  );
}

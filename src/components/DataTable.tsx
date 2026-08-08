import type { GuideTable } from '@/content/guides/types';

/**
 * Karşılaştırma tablosu.
 *
 * Mobil taşma kuralı: tablo KENDİ kapsayıcısında yatay kayar
 * (`overflow-x:auto`), sayfa gövdesi asla kaymaz. Kayan bölgeye klavye
 * erişimi için `tabIndex={0}` + `role="region"` + erişilebilir ad gerekir —
 * aksi hâlde klavye kullanıcısı tablonun sağ tarafını hiç göremez.
 */
export function DataTable({ table }: { table: GuideTable }) {
  return (
    <figure className="my-8">
      <div
        role="region"
        aria-label={table.caption}
        tabIndex={0}
        className="overflow-x-auto border border-line focus-visible:outline-2 focus-visible:outline-palm-deep"
      >
        <table className="w-full min-w-[34rem] border-collapse text-small">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr className="bg-mist">
              {table.columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="border-b border-line-strong px-4 py-3 text-left font-display text-[0.8125rem] font-semibold tracking-tight text-ink"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={row[0] ?? i} className="border-b border-line last:border-0">
                {row.map((cell, j) => (
                  <td
                    key={`${i}-${j}`}
                    className={
                      j === 0
                        ? 'px-4 py-3 align-top font-medium text-ink'
                        : 'px-4 py-3 align-top text-ink-soft'
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2.5 text-[0.8125rem] leading-relaxed text-mute">
        {table.caption}
        {table.note ? <span className="block mt-1">{table.note}</span> : null}
      </figcaption>
    </figure>
  );
}

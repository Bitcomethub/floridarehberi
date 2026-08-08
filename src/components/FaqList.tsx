/**
 * SSS listesi.
 *
 * Cevaplar hem JSON-LD'de hem EKRANDA görünür. Google, yalnızca şemada olup
 * sayfada görünmeyen SSS içeriğini geçersiz sayar — birini kaldırırsan
 * ikisini birden kaldır.
 *
 * `<details>` KULLANILMIYOR: kapalı bir <details> içeriği DOM'da olsa da bazı
 * çıkarıcılar için "gizli" sayılır ve alıntılanabilirlik düşer. Bu sitenin işi
 * alıntılanmak; cevaplar açık durur.
 */
type FAQ = { q: string; a: string };

export function FaqList({ faqs, title = 'Sık sorulan sorular' }: { faqs: FAQ[]; title?: string }) {
  return (
    <section className="mt-band" aria-labelledby="sss">
      <div className="tide tide-sea mb-5 w-10" aria-hidden="true" />
      <h2 id="sss" className="font-display text-h2 font-semibold text-ink">
        {title}
      </h2>

      <dl className="mt-7 max-w-prose">
        {faqs.map((faq) => (
          <div key={faq.q} className="border-t border-line py-6 first:border-t-0 first:pt-0">
            <dt className="font-display text-h3 font-semibold text-ink">{faq.q}</dt>
            <dd className="mt-2.5 text-ink-soft">{faq.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

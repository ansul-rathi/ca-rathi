import { Plus } from 'lucide-react'

export type QA = { q: string; a: string }

// Native <details> accordion: accessible, works without JS, and the answers
// stay in the HTML for search / answer engines.
export function FaqList({ items }: { items: QA[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="group card p-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-heading font-semibold text-brand-800">
            <span>{f.q}</span>
            <Plus
              size={20}
              className="mt-0.5 shrink-0 text-accent-600 transition group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export const faqLd = (items: QA[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

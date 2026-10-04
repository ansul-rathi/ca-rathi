import { useEffect, useMemo, useState } from 'react'
import { Printer } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { DueDateCard } from '@/components/ui/DueDateCard'
import { CTABand } from '@/components/sections/CTABand'
import { getDueDates, DUE_CATEGORIES, type DueCategory, type DueDate } from '@/data'

const DESC =
  'Compliance calendar with due dates for GST returns (GSTR-1, GSTR-3B, GSTR-9), TDS/TCS, advance tax, income-tax returns, ROC filings and PF/ESI.'

export default function ComplianceCalendar() {
  const [now, setNow] = useState<Date | null>(null)
  const [offset, setOffset] = useState(0) // months from current
  const [filter, setFilter] = useState<DueCategory | 'All'>('All')

  useEffect(() => setNow(new Date()), [])

  const { label, items } = useMemo(() => {
    if (!now) return { label: '', items: [] as DueDate[] }
    const start = new Date(now.getFullYear(), now.getMonth() + offset, 1)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)
    return {
      label: start.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      items: getDueDates(start, end).filter((d) => filter === 'All' || d.category === filter),
    }
  }, [now, offset, filter])

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
      active ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-100 bg-white text-brand-700 hover:border-brand-300'
    }`

  return (
    <>
      <Seo title="Compliance Calendar — GST, TDS, Income Tax & ROC Due Dates" description={DESC} path="/compliance-calendar" />
      <PageHeader
        eyebrow="compliance calendar"
        title="Compliance Calendar"
        intro="Monthly statutory due dates. Dates shown are as prescribed under the law and are subject to extensions notified by the government."
        crumbs={[{ label: 'Tools', to: '/tools' }, { label: 'Compliance Calendar' }]}
      />
      <section className="py-12 md:py-20">
        <Container className="max-w-5xl">
          <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <button type="button" className={chip(false)} onClick={() => setOffset((o) => o - 1)} aria-label="Previous month">
                ←
              </button>
              <h2 className="min-w-[10rem] text-center text-xl font-bold" aria-live="polite">
                {label || '—'}
              </h2>
              <button type="button" className={chip(false)} onClick={() => setOffset((o) => o + 1)} aria-label="Next month">
                →
              </button>
              {offset !== 0 && (
                <button type="button" className="ml-1 text-sm font-semibold text-accent-700 underline" onClick={() => setOffset(0)}>
                  Today
                </button>
              )}
            </div>
            <button type="button" onClick={() => window.print()} className={`${chip(false)} inline-flex items-center gap-2 self-start`}>
              <Printer size={16} aria-hidden="true" /> Print
            </button>
          </div>
          <div className="no-print mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {(['All', ...DUE_CATEGORIES] as const).map((c) => (
              <button key={c} type="button" aria-pressed={filter === c} className={chip(filter === c)} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {!now ? (
              <p className="text-slate-500">Loading calendar…</p>
            ) : items.length === 0 ? (
              <p className="text-slate-500">No due dates for this filter.</p>
            ) : (
              items.map((d) => <DueDateCard key={`${d.title}-${d.date.getTime()}`} item={d} />)
            )}
          </div>

          <p className="mt-10 text-xs leading-relaxed text-slate-500">
            Note: Where a due date falls on a holiday, the applicable law may permit filing on the next
            working day. QRMP GSTR-3B is due on the 22nd or 24th depending on the state. ROC dates assume an
            AGM held on 30 September. Always verify with the latest notifications.
          </p>
        </Container>
      </section>
      <CTABand />
    </>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarClock } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getDueDates, type DueDate } from '@/data'
import { DueDateCard } from '@/components/ui/DueDateCard'

// Next few statutory due dates. Computed in the browser from today's date so
// it is always current (the prerendered HTML shows a placeholder list).
export function CompliancePreview() {
  const [items, setItems] = useState<DueDate[] | null>(null)

  useEffect(() => {
    const now = new Date()
    const to = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate())
    setItems(getDueDates(now, to).slice(0, 6))
  }, [])

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="compliance calendar"
            title="Upcoming Due Dates"
            intro="Key statutory due dates under Income-tax, GST, TDS and company law. Dates are as per the law and subject to extensions notified by the government."
          />
          <Link
            to="/compliance-calendar"
            className="inline-flex shrink-0 items-center gap-2 font-heading text-sm font-semibold text-accent-700 hover:text-accent-800"
          >
            Full calendar
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {items
            ? items.map((d) => <DueDateCard key={`${d.title}-${d.date.toISOString()}`} item={d} />)
            : Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card flex h-[104px] items-center gap-4 p-5">
                  <CalendarClock className="text-brand-200" size={28} aria-hidden="true" />
                  <span className="text-sm text-slate-400">Loading due dates…</span>
                </div>
              ))}
        </div>
      </Container>
    </section>
  )
}

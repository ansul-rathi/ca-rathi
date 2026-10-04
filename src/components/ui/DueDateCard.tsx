import type { DueDate, DueCategory } from '@/data'

const tone: Record<DueCategory, string> = {
  GST: 'bg-emerald-50 text-emerald-800',
  'Income Tax': 'bg-sky-50 text-sky-800',
  'TDS / TCS': 'bg-violet-50 text-violet-800',
  'Company Law': 'bg-amber-50 text-amber-900',
  Payroll: 'bg-rose-50 text-rose-800',
}

export function DueDateCard({ item }: { item: DueDate }) {
  const day = item.date.getDate()
  const mon = item.date.toLocaleDateString('en-IN', { month: 'short' })
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = Math.round((item.date.getTime() - today.getTime()) / 86_400_000)
  return (
    <article className="card flex gap-4 p-5">
      <time
        dateTime={item.date.toLocaleDateString('en-CA')}
        className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-brand-700 text-center leading-none text-white"
      >
        <span>
          <span className="block font-heading text-2xl font-extrabold">{day}</span>
          <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-accent-200">
            {mon}
          </span>
        </span>
      </time>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone[item.category]}`}>
            {item.category}
          </span>
          <span className="text-[11px] font-medium text-slate-500">
            {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `in ${days} days`}
          </span>
        </div>
        <h3 className="mt-1.5 font-heading text-base font-bold text-brand-800">{item.title}</h3>
        <p className="mt-0.5 text-sm text-slate-600">{item.detail}</p>
      </div>
    </article>
  )
}

import { Container } from '@/components/ui/Container'
import { CountUp } from '@/components/ui/CountUp'
import { stats } from '@/data'

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-brand-700 py-14" aria-label="Firm at a glance">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      <Container className="relative grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-heading text-4xl font-extrabold text-accent-300 md:text-5xl">
              <CountUp end={s.value} suffix={s.suffix} animate={s.value < 1000} />
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-brand-100">
              {s.label}
            </p>
          </div>
        ))}
      </Container>
    </section>
  )
}

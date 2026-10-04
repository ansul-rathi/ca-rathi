import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, CalendarClock, BadgePercent } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { FinanceArt } from '@/components/ui/FinanceArt'
import { SITE } from '@/config/site'

const quick = [
  { label: 'Income Tax Calculator', to: '/tools/income-tax-calculator', Icon: Calculator },
  { label: 'GST Calculator', to: '/tools/gst-calculator', Icon: BadgePercent },
  { label: 'Compliance Calendar', to: '/compliance-calendar', Icon: CalendarClock },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-700 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-10 py-14 md:py-24 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4 text-accent-300">
            {SITE.designation} · FRN {SITE.firmRegNo}
          </p>
          <h1 className="text-[2rem] font-extrabold leading-tight text-white sm:text-5xl">
            {SITE.firmName}
          </h1>
          <p className="mt-3 font-heading text-xl font-semibold text-accent-300 sm:text-2xl">
            Audit · Taxation · GST · Company Law · Advisory
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
            A firm of Chartered Accountants registered with ICAI since {SITE.foundedYear}, with{' '}
            {SITE.partnersCount} partners and {SITE.professionalsCount}+ professional staff based in{' '}
            {SITE.addressLocality}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <ButtonLink to="/services" size="lg" variant="secondary">
              Our Services
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              to="/contact"
              size="lg"
              variant="ghost"
              className="!border-white !text-white hover:!bg-white hover:!text-brand-900"
            >
              Contact Us
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {quick.map(({ label, to, Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-brand-100 transition hover:border-accent-300 hover:text-white"
                >
                  <Icon size={15} className="text-accent-300" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto hidden w-full max-w-lg sm:block">
          <FinanceArt className="h-auto w-full drop-shadow-2xl" />
        </div>
      </Container>
    </section>
  )
}

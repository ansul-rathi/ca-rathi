import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, BadgePercent, Home, CalendarClock, Link2, ClipboardList } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export const tools = [
  {
    title: 'Income Tax Calculator',
    desc: 'Compare tax under the old and new regimes for FY 2026-27.',
    to: '/tools/income-tax-calculator',
    Icon: Calculator,
  },
  {
    title: 'GST Calculator',
    desc: 'Add or remove GST and split it into CGST, SGST or IGST.',
    to: '/tools/gst-calculator',
    Icon: BadgePercent,
  },
  {
    title: 'HRA Exemption Calculator',
    desc: 'Compute exempt and taxable HRA, including the expanded metro list.',
    to: '/tools/hra-calculator',
    Icon: Home,
  },
  {
    title: 'Compliance Calendar',
    desc: 'Statutory due dates for GST, TDS, Income-tax and ROC filings.',
    to: '/compliance-calendar',
    Icon: CalendarClock,
  },
  {
    title: 'Document Checklists',
    desc: 'Documents required for returns, registrations and audits.',
    to: '/resources#checklists',
    Icon: ClipboardList,
  },
  {
    title: 'Useful Links',
    desc: 'Income-tax, GST, MCA and other government portals.',
    to: '/resources',
    Icon: Link2,
  },
]

export function ToolsTeaser({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <Container>
        {heading && (
          <SectionHeading
            eyebrow="knowledge tools"
            title="Calculators & Resources"
            intro="Free-to-use calculators and reference material for taxpayers. Results are indicative estimates."
            align="center"
          />
        )}
        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${heading ? 'mt-12' : ''}`}>
          {tools.map(({ title, desc, to, Icon }, i) => (
            <Reveal key={to} delay={(i % 3) * 80}>
              <Link
                to={to}
                className="group flex h-full items-start gap-4 rounded-xl2 border border-brand-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-accent-300"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 transition group-hover:bg-accent-400 group-hover:text-brand-900">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span>
                  <span className="flex items-center gap-1 font-heading text-base font-bold text-brand-800">
                    {title}
                    <ArrowRight size={15} className="opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">{desc}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

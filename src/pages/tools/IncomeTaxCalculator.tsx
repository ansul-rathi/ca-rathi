import { useMemo, useState } from 'react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { MoneyField, CalcDisclaimer } from '@/components/ui/MoneyField'
import { FaqList, faqLd } from '@/components/ui/FaqList'
import { CTABand } from '@/components/sections/CTABand'
import { computeTax, inr, type AgeGroup, type TaxInput } from '@/lib/tax'
import { toolLd } from '@/lib/schema'

const PATH = '/tools/income-tax-calculator'
const DESC =
  'Free income tax calculator for FY 2026-27: compare tax under the old and new regimes with standard deduction, 80C, 80D, HRA, rebate, surcharge and cess.'

const faq = [
  {
    q: 'What are the new tax regime slabs for FY 2026-27?',
    a: 'Nil up to ₹4 lakh; 5% for ₹4–8 lakh; 10% for ₹8–12 lakh; 15% for ₹12–16 lakh; 20% for ₹16–20 lakh; 25% for ₹20–24 lakh; and 30% above ₹24 lakh. Health and education cess of 4% applies on the tax.',
  },
  {
    q: 'What is the standard deduction for salaried individuals?',
    a: '₹75,000 under the new regime and ₹50,000 under the old regime.',
  },
  {
    q: 'Which deductions are allowed under the new regime?',
    a: 'Most deductions such as 80C, 80D and HRA are not allowed. The standard deduction and employer contribution to NPS (up to 14% of salary) are allowed.',
  },
]

const initial: TaxInput = {
  age: 'below60',
  salary: 1500000,
  otherIncome: 0,
  hraExemption: 0,
  sec80C: 150000,
  sec80D: 25000,
  homeLoanInterest: 0,
  sec80CCD1B: 0,
  otherDeductions: 0,
  employerNps: 0,
}

export default function IncomeTaxCalculator() {
  const [v, setV] = useState<TaxInput>(initial)
  const set = (k: keyof TaxInput) => (n: number | string) => setV((s) => ({ ...s, [k]: n }))
  const res = useMemo(() => ({ n: computeTax(v, 'new'), o: computeTax(v, 'old') }), [v])
  const better = res.n.total === res.o.total ? null : res.n.total < res.o.total ? 'new' : 'old'
  const saving = Math.abs(res.n.total - res.o.total)

  const rows: [string, (r: typeof res.n) => string][] = [
    ['Gross total income', (r) => inr(r.grossIncome)],
    ['Deductions & exemptions', (r) => `− ${inr(r.deductions)}`],
    ['Taxable income', (r) => inr(r.taxableIncome)],
    ['Tax on slabs', (r) => inr(r.slabTax)],
    ['Rebate / marginal relief', (r) => `− ${inr(r.rebate)}`],
    ['Surcharge', (r) => inr(r.surcharge)],
    ['Health & education cess (4%)', (r) => inr(r.cess)],
  ]

  return (
    <>
      <Seo
        title="Income Tax Calculator FY 2026-27 (Old vs New Regime)"
        description={DESC}
        path={PATH}
        jsonLd={[toolLd('Income Tax Calculator FY 2026-27', DESC, PATH), faqLd(faq)]}
      />
      <PageHeader
        eyebrow="tools"
        title="Income Tax Calculator"
        intro="Estimate your income-tax for FY 2026-27 and compare the old and new tax regimes."
        crumbs={[{ label: 'Tools', to: '/tools' }, { label: 'Income Tax Calculator' }]}
      />

      <section className="py-12 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <form className="card space-y-5 p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-xl font-bold">Your details</h2>
            <div>
              <label htmlFor="age" className="field-label">
                Age group
              </label>
              <select
                id="age"
                className="field"
                value={v.age}
                onChange={(e) => set('age')(e.target.value as AgeGroup)}
              >
                <option value="below60">Below 60 years</option>
                <option value="60to80">60 – 80 years (senior citizen)</option>
                <option value="above80">Above 80 years (super senior citizen)</option>
              </select>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <MoneyField label="Gross annual salary" value={v.salary} onChange={set('salary')} />
              <MoneyField
                label="Other income"
                value={v.otherIncome}
                onChange={set('otherIncome')}
                hint="Interest, rent (net), business income"
              />
            </div>
            <MoneyField
              label="Employer NPS contribution"
              value={v.employerNps}
              onChange={set('employerNps')}
              hint="Allowed in both regimes (14% / 10% of salary cap)"
            />

            <fieldset className="rounded-xl border border-dashed border-brand-200 p-4 sm:p-5">
              <legend className="px-2 text-sm font-semibold text-brand-700">
                Old regime deductions
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <MoneyField label="HRA exemption" value={v.hraExemption} onChange={set('hraExemption')} />
                <MoneyField label="Section 80C" value={v.sec80C} onChange={set('sec80C')} hint="Max ₹1,50,000" />
                <MoneyField label="Section 80D" value={v.sec80D} onChange={set('sec80D')} hint="Health insurance" />
                <MoneyField
                  label="Home loan interest"
                  value={v.homeLoanInterest}
                  onChange={set('homeLoanInterest')}
                  hint="Self-occupied, max ₹2,00,000"
                />
                <MoneyField label="NPS 80CCD(1B)" value={v.sec80CCD1B} onChange={set('sec80CCD1B')} hint="Max ₹50,000" />
                <MoneyField label="Other deductions" value={v.otherDeductions} onChange={set('otherDeductions')} hint="80E, 80G, 80TTA etc." />
              </div>
            </fieldset>
          </form>

          <div aria-live="polite">
            <div className="rounded-xl2 bg-brand-800 p-6 text-white sm:p-8">
              <p className="eyebrow text-accent-300">result</p>
              {better ? (
                <p className="mt-2 font-heading text-2xl font-bold text-white">
                  The {better} regime saves you {inr(saving)}
                </p>
              ) : (
                <p className="mt-2 font-heading text-2xl font-bold text-white">
                  Both regimes result in the same tax
                </p>
              )}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {(['n', 'o'] as const).map((k) => (
                  <div
                    key={k}
                    className={`rounded-xl p-4 ${
                      better === (k === 'n' ? 'new' : 'old') ? 'bg-accent-400 text-brand-900' : 'bg-white/10'
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                      {k === 'n' ? 'New regime' : 'Old regime'}
                    </p>
                    <p className="mt-1 font-heading text-2xl font-extrabold sm:text-3xl">{inr(res[k].total)}</p>
                    <p className="mt-1 text-xs opacity-80">Effective rate {res[k].effectiveRate.toFixed(2)}%</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mt-6 overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="bg-brand-50 text-left text-brand-800">
                    <th scope="col" className="px-4 py-3 font-semibold">Particulars</th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">New</th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">Old</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, f]) => (
                    <tr key={label} className="border-t border-brand-50">
                      <th scope="row" className="px-4 py-2.5 text-left font-normal text-slate-600">{label}</th>
                      <td className="px-4 py-2.5 text-right tabular-nums">{f(res.n)}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{f(res.o)}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-brand-100 font-semibold text-brand-800">
                    <th scope="row" className="px-4 py-3 text-left">Total tax payable</th>
                    <td className="px-4 py-3 text-right tabular-nums">{inr(res.n.total)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{inr(res.o.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CalcDisclaimer />
          </div>
        </Container>

        <Container className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold">About this calculator</h2>
          <div className="mt-6">
            <FaqList items={faq} />
          </div>
        </Container>
      </section>
      <CTABand />
    </>
  )
}

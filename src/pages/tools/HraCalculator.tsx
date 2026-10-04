import { useMemo, useState } from 'react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { MoneyField, CalcDisclaimer } from '@/components/ui/MoneyField'
import { FaqList, faqLd } from '@/components/ui/FaqList'
import { CTABand } from '@/components/sections/CTABand'
import { computeHra, inr, HRA_METROS } from '@/lib/tax'
import { toolLd } from '@/lib/schema'

const PATH = '/tools/hra-calculator'
const DESC =
  'HRA exemption calculator for FY 2026-27 with the expanded list of 8 metro cities (50% of salary). Compute exempt and taxable HRA under the old regime.'

const faq = [
  {
    q: 'How is HRA exemption calculated?',
    a: 'The exemption is the least of: (a) actual HRA received, (b) rent paid minus 10% of salary, and (c) 50% of salary in metro cities or 40% elsewhere. Salary means basic pay plus dearness allowance forming part of retirement benefits.',
  },
  {
    q: 'Which cities qualify for the 50% limit?',
    a: `From FY 2026-27 the 50% limit applies to ${HRA_METROS.join(', ')}. Other cities use 40%.`,
  },
  {
    q: 'Is HRA exemption available under the new tax regime?',
    a: 'No. HRA exemption is available only if you opt for the old tax regime.',
  },
]

export default function HraCalculator() {
  const [basicDa, setBasicDa] = useState(600000)
  const [hraReceived, setHra] = useState(240000)
  const [rentPaid, setRent] = useState(300000)
  const [metro, setMetro] = useState(true)
  const r = useMemo(() => computeHra({ basicDa, hraReceived, rentPaid, metro }), [basicDa, hraReceived, rentPaid, metro])

  return (
    <>
      <Seo title="HRA Exemption Calculator FY 2026-27" description={DESC} path={PATH} jsonLd={[toolLd('HRA Exemption Calculator', DESC, PATH), faqLd(faq)]} />
      <PageHeader
        eyebrow="tools"
        title="HRA Exemption Calculator"
        intro="Compute the exempt and taxable portion of House Rent Allowance (old tax regime)."
        crumbs={[{ label: 'Tools', to: '/tools' }, { label: 'HRA Calculator' }]}
      />
      <section className="py-12 md:py-20">
        <Container className="grid max-w-5xl gap-8 lg:grid-cols-2">
          <form className="card space-y-5 p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
            <MoneyField label="Annual basic salary + DA" value={basicDa} onChange={setBasicDa} />
            <MoneyField label="Annual HRA received" value={hraReceived} onChange={setHra} />
            <MoneyField label="Annual rent paid" value={rentPaid} onChange={setRent} />
            <fieldset>
              <legend className="field-label">City of residence</legend>
              <div className="space-y-2 text-sm">
                <label className="flex items-start gap-3">
                  <input type="radio" name="metro" checked={metro} onChange={() => setMetro(true)} className="mt-1 accent-[rgb(var(--brand-700))]" />
                  <span>Metro (50%) — {HRA_METROS.join(', ')}</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="metro" checked={!metro} onChange={() => setMetro(false)} className="accent-[rgb(var(--brand-700))]" />
                  <span>Other city (40%)</span>
                </label>
              </div>
            </fieldset>
          </form>
          <div aria-live="polite">
            <div className="rounded-xl2 bg-brand-800 p-6 text-white sm:p-8">
              <p className="eyebrow text-accent-300">result</p>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ['Actual HRA received', r.a],
                  ['Rent paid − 10% of salary', r.b],
                  [`${metro ? '50' : '40'}% of salary`, r.c],
                ].map(([k, n]) => (
                  <div key={k as string} className="flex justify-between gap-4">
                    <dt className="text-brand-100">{k}</dt>
                    <dd className={`font-semibold tabular-nums ${n === r.exempt ? 'text-accent-300' : ''}`}>{inr(n as number)}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 rounded-xl bg-accent-400 p-4 text-brand-900">
                  <dt className="font-semibold">Exempt HRA (least)</dt>
                  <dd className="font-heading text-2xl font-extrabold tabular-nums">{inr(r.exempt)}</dd>
                </div>
                <div className="flex justify-between gap-4 pt-1">
                  <dt className="text-brand-100">Taxable HRA</dt>
                  <dd className="font-semibold tabular-nums">{inr(r.taxable)}</dd>
                </div>
              </dl>
            </div>
            <CalcDisclaimer />
          </div>
        </Container>
        <Container className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold">About HRA exemption</h2>
          <div className="mt-6">
            <FaqList items={faq} />
          </div>
        </Container>
      </section>
      <CTABand />
    </>
  )
}

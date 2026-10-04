import { useMemo, useState } from 'react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { MoneyField, CalcDisclaimer } from '@/components/ui/MoneyField'
import { FaqList, faqLd } from '@/components/ui/FaqList'
import { CTABand } from '@/components/sections/CTABand'
import { computeGst, inr } from '@/lib/tax'
import { toolLd } from '@/lib/schema'

const PATH = '/tools/gst-calculator'
const DESC =
  'Free GST calculator: add or remove GST at 5%, 18%, 40% and other rates, with CGST, SGST and IGST breakup.'
const RATES = [0.25, 3, 5, 18, 40]

const faq = [
  {
    q: 'How is GST calculated on an amount?',
    a: 'For a GST-exclusive amount, GST = amount × rate ÷ 100. For a GST-inclusive amount, the base value = amount × 100 ÷ (100 + rate), and GST is the difference.',
  },
  {
    q: 'When do CGST and SGST apply instead of IGST?',
    a: 'CGST and SGST (each half of the rate) apply to intra-state supplies, where the supplier and place of supply are in the same state. IGST applies to inter-state supplies and imports.',
  },
]

export default function GstCalculator() {
  const [amount, setAmount] = useState(100000)
  const [rate, setRate] = useState(18)
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive')
  const [interState, setInterState] = useState(false)
  const r = useMemo(() => computeGst({ amount, rate, mode, interState }), [amount, rate, mode, interState])

  const seg = (active: boolean) =>
    `flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
      active ? 'bg-brand-700 text-white' : 'text-brand-700 hover:bg-brand-50'
    }`

  return (
    <>
      <Seo title="GST Calculator — Add or Remove GST" description={DESC} path={PATH} jsonLd={[toolLd('GST Calculator', DESC, PATH), faqLd(faq)]} />
      <PageHeader
        eyebrow="tools"
        title="GST Calculator"
        intro="Add GST to a base amount or extract GST from an inclusive amount."
        crumbs={[{ label: 'Tools', to: '/tools' }, { label: 'GST Calculator' }]}
      />
      <section className="py-12 md:py-20">
        <Container className="grid max-w-5xl gap-8 lg:grid-cols-2">
          <form className="card space-y-6 p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
            <MoneyField label="Amount" value={amount} onChange={setAmount} />
            <fieldset>
              <legend className="field-label">GST rate</legend>
              <div className="flex flex-wrap gap-2">
                {RATES.map((x) => (
                  <button
                    key={x}
                    type="button"
                    aria-pressed={rate === x}
                    onClick={() => setRate(x)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      rate === x
                        ? 'border-brand-700 bg-brand-700 text-white'
                        : 'border-brand-100 text-brand-700 hover:border-brand-300'
                    }`}
                  >
                    {x}%
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="field-label">Amount entered is</legend>
              <div className="flex gap-1 rounded-xl border border-brand-100 p-1">
                <button type="button" aria-pressed={mode === 'exclusive'} className={seg(mode === 'exclusive')} onClick={() => setMode('exclusive')}>
                  Excluding GST
                </button>
                <button type="button" aria-pressed={mode === 'inclusive'} className={seg(mode === 'inclusive')} onClick={() => setMode('inclusive')}>
                  Including GST
                </button>
              </div>
            </fieldset>
            <fieldset>
              <legend className="field-label">Type of supply</legend>
              <div className="flex gap-1 rounded-xl border border-brand-100 p-1">
                <button type="button" aria-pressed={!interState} className={seg(!interState)} onClick={() => setInterState(false)}>
                  Intra-state
                </button>
                <button type="button" aria-pressed={interState} className={seg(interState)} onClick={() => setInterState(true)}>
                  Inter-state
                </button>
              </div>
            </fieldset>
          </form>

          <div aria-live="polite">
            <div className="rounded-xl2 bg-brand-800 p-6 text-white sm:p-8">
              <p className="eyebrow text-accent-300">result</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-brand-100">Taxable value</dt>
                  <dd className="font-semibold tabular-nums">{inr(r.base, 2)}</dd>
                </div>
                {interState ? (
                  <div className="flex justify-between gap-4">
                    <dt className="text-brand-100">IGST @ {rate}%</dt>
                    <dd className="font-semibold tabular-nums">{inr(r.igst, 2)}</dd>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between gap-4">
                      <dt className="text-brand-100">CGST @ {rate / 2}%</dt>
                      <dd className="font-semibold tabular-nums">{inr(r.cgst, 2)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-brand-100">SGST @ {rate / 2}%</dt>
                      <dd className="font-semibold tabular-nums">{inr(r.sgst, 2)}</dd>
                    </div>
                  </>
                )}
                <div className="flex justify-between gap-4 border-t border-white/15 pt-3">
                  <dt className="text-brand-100">Total GST</dt>
                  <dd className="font-semibold tabular-nums">{inr(r.gst, 2)}</dd>
                </div>
                <div className="flex justify-between gap-4 rounded-xl bg-accent-400 p-4 text-brand-900">
                  <dt className="font-semibold">Invoice value</dt>
                  <dd className="font-heading text-2xl font-extrabold tabular-nums">{inr(r.total, 2)}</dd>
                </div>
              </dl>
            </div>
            <CalcDisclaimer />
          </div>
        </Container>
        <Container className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold">About GST calculation</h2>
          <div className="mt-6">
            <FaqList items={faq} />
          </div>
        </Container>
      </section>
      <CTABand />
    </>
  )
}

import { ExternalLink, Check, Printer } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { CTABand } from '@/components/sections/CTABand'
import { usefulLinks, checklists } from '@/data'

export default function Resources() {
  return (
    <>
      <Seo
        title="Useful Links & Document Checklists"
        description="Links to Income-tax, GST, MCA, TRACES, EPFO, RBI and ICAI portals, with document checklists for ITR filing, GST registration, company incorporation and tax audit."
        path="/resources"
      />
      <PageHeader
        eyebrow="resources"
        title="Useful Links & Checklists"
        intro="Official government and regulator portals, and checklists of documents for common compliance work."
        crumbs={[{ label: 'Tools', to: '/tools' }, { label: 'Resources' }]}
      />

      <section className="py-12 md:py-20">
        <Container>
          <h2 className="text-2xl font-bold">Useful Links</h2>
          <p className="mt-2 text-sm text-slate-600">All links open the official website in a new tab.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {usefulLinks.map((g) => (
              <div key={g.group} className="card p-6">
                <h3 className="font-heading text-lg font-bold text-brand-800">{g.group}</h3>
                <ul className="mt-4 divide-y divide-brand-50">
                  {g.links.map((l) => (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-4 py-3"
                      >
                        <span>
                          <span className="block font-semibold text-brand-700 group-hover:text-accent-700">{l.name}</span>
                          <span className="block text-sm text-slate-500">{l.desc}</span>
                        </span>
                        <ExternalLink size={16} className="mt-1 shrink-0 text-slate-400" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="checklists" className="scroll-mt-24 bg-paper py-12 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Document Checklists</h2>
              <p className="mt-2 text-sm text-slate-600">Indicative lists — additional documents may be required depending on facts.</p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              <Printer size={16} aria-hidden="true" /> Print checklists
            </button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {checklists.map((c) => (
              <article key={c.slug} id={c.slug} className="card scroll-mt-24 p-6">
                <h3 className="font-heading text-lg font-bold text-brand-800">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{c.intro}</p>
                <ul className="mt-4 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTABand />
    </>
  )
}

import { Target, Eye, Scale, Check } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { FinanceArt } from '@/components/ui/FinanceArt'
import { StatsBand } from '@/components/sections/StatsBand'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { CTABand } from '@/components/sections/CTABand'
import { SITE } from '@/config/site'
import { firmLd } from '@/lib/schema'

const values = [
  {
    icon: Target,
    title: 'Objective',
    desc: 'To provide professional services that help clients meet their statutory obligations accurately and on time.',
  },
  {
    icon: Eye,
    title: 'Approach',
    desc: 'Partner-supervised engagements, written engagement terms and documented working papers.',
  },
  {
    icon: Scale,
    title: 'Ethics',
    desc: 'Independence, integrity, objectivity and confidentiality as required by the ICAI Code of Ethics.',
  },
]

const profile: [string, string][] = [
  ['Name of the firm', SITE.firmLegalName],
  ['Constitution', 'Partnership firm'],
  ['ICAI Firm Registration No.', SITE.firmRegNo],
  ['Year of establishment', String(SITE.foundedYear)],
  ['Number of partners', String(SITE.partnersCount)],
  ['Professional staff', `${SITE.professionalsCount}+`],
  ['Office', SITE.address],
]

export default function About() {
  return (
    <>
      <Seo
        title="About the Firm"
        description={`About ${SITE.firmName}, Chartered Accountants (FRN ${SITE.firmRegNo}), established in ${SITE.foundedYear} in ${SITE.addressLocality} — firm profile, partners and approach.`}
        path="/about"
        jsonLd={firmLd()}
      />
      <PageHeader
        eyebrow="about the firm"
        title={`About ${SITE.firmName}`}
        intro={`A firm of Chartered Accountants established in ${SITE.foundedYear}, registered with The Institute of Chartered Accountants of India.`}
        crumbs={[{ label: 'About' }]}
      />

      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="overflow-hidden rounded-xl2 bg-brand-900 p-8 sm:p-10">
              <FinanceArt className="h-auto w-full" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="the firm"
              title="Firm Profile"
              intro={`${SITE.firmName} was established in ${SITE.foundedYear} and provides audit and assurance, direct and indirect taxation, company law, international taxation and advisory services.`}
            />
            <p className="mt-4 text-slate-600">
              Engagements are accepted after evaluating independence and are carried out in accordance with
              the Standards on Auditing, Guidance Notes and the Code of Ethics issued by ICAI. Client
              information is handled confidentially.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                'Partner-supervised engagements',
                'Written engagement letters',
                'Secure digital document exchange',
                'Peer review compliant documentation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brand-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container className="max-w-4xl">
          <h2 className="text-2xl font-bold">Firm Details</h2>
          <div className="card mt-6 overflow-hidden">
            <table className="w-full text-left text-sm">
              <tbody>
                {profile.map(([k, v]) => (
                  <tr key={k} className="border-b border-brand-50 last:border-0">
                    <th scope="row" className="w-2/5 bg-brand-50/60 px-5 py-3.5 font-semibold text-brand-800">
                      {k}
                    </th>
                    <td className="px-5 py-3.5 text-slate-600">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="principles" title="Objective, Approach & Ethics" align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card h-full p-7">
                  <span className="grid h-14 w-14 place-items-center rounded-xl2 bg-brand-50 text-brand-700">
                    <v.icon size={26} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-bold text-brand-800">{v.title}</h3>
                  <p className="mt-2 text-slate-600">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <StatsBand />
      <TeamGrid />
      <CTABand />
    </>
  )
}

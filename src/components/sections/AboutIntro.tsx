import { ArrowRight, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { FinanceArt } from '@/components/ui/FinanceArt'
import { SITE } from '@/config/site'

const facts = [
  `Registered with ICAI — FRN ${SITE.firmRegNo}`,
  `Established in ${SITE.foundedYear}`,
  `${SITE.partnersCount} partners, ${SITE.professionalsCount}+ staff`,
  `Office at ${SITE.addressLocality}, ${SITE.addressRegion}`,
]

export function AboutIntro() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <Reveal className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-xl2 bg-brand-900 p-8 sm:p-10">
            <FinanceArt className="h-auto w-full" />
          </div>
          <div className="absolute -bottom-6 right-4 rounded-xl2 bg-accent-400 px-6 py-4 text-brand-900 shadow-card sm:-right-6">
            <p className="font-heading text-3xl font-extrabold">{SITE.foundedYear}</p>
            <p className="text-sm font-semibold">Year Established</p>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={100}>
          <SectionHeading
            eyebrow="about the firm"
            title={`About ${SITE.firmName}`}
            intro={`${SITE.firmName} is a firm of Chartered Accountants providing audit, taxation, GST, company law and advisory services to individuals, businesses, trusts and non-residents. Each engagement is supervised by a partner and carried out in accordance with the standards and Code of Ethics issued by ICAI.`}
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {facts.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-brand-700">
                <Check size={16} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink to="/about" className="mt-8">
            About the firm
            <ArrowRight size={18} aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  )
}

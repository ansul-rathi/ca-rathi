import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'
import { services } from '@/data'

export function ServicesGrid({ limit, heading = true }: { limit?: number; heading?: boolean }) {
  const list = services.slice(0, limit ?? undefined)

  return (
    <section className="py-16 md:py-24">
      <Container>
        {heading && (
          <SectionHeading
            eyebrow="our services"
            title="Professional Services"
            intro="Audit, taxation, regulatory compliance and advisory services for individuals, businesses, trusts and non-residents."
            align="center"
          />
        )}
        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${heading ? 'mt-12' : ''}`}>
          {list.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 80}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-xl2 border border-brand-100 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg sm:p-7"
              >
                <span className="grid h-14 w-14 place-items-center rounded-xl2 bg-brand-50 text-brand-700 transition group-hover:bg-accent-400 group-hover:text-brand-900">
                  <Icon name={s.icon} size={26} />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-brand-800">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.shortDesc}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-semibold text-accent-700">
                  Read more<span className="sr-only"> about {s.title}</span>
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

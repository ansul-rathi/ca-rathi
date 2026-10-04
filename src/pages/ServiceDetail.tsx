import { useParams, Link } from 'react-router-dom'
import { Check, ArrowRight, FileText } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { FaqList, faqLd } from '@/components/ui/FaqList'
import { CTABand } from '@/components/sections/CTABand'
import { getServiceBySlug, services } from '@/data'
import { SITE, telHref } from '@/config/site'
import { firmId } from '@/lib/schema'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug = '' } = useParams()
  const service = getServiceBySlug(slug)
  if (!service) return <NotFound />

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4)
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.shortDesc,
    url: `${SITE.domain}/services/${service.slug}`,
    provider: { '@id': firmId },
    areaServed: { '@type': 'Country', name: 'India' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.offerings.map((o) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: o },
      })),
    },
  }

  return (
    <>
      <Seo
        title={service.title}
        description={`${service.shortDesc} ${SITE.firmName}, Chartered Accountants, ${SITE.addressLocality}.`}
        path={`/services/${service.slug}`}
        jsonLd={[serviceLd, ...(service.faqs.length ? [faqLd(service.faqs)] : [])]}
      />
      <PageHeader
        eyebrow="our services"
        title={service.title}
        intro={service.heroLine}
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
      />

      <section className="py-14 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <span className="grid h-16 w-16 place-items-center rounded-xl2 bg-brand-50 text-brand-700">
              <Icon name={service.icon} size={30} />
            </span>
            <div className="mt-8 space-y-5">
              {service.overview.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-slate-600 sm:text-lg">
                  {p}
                </p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-bold">Scope of Services</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.offerings.map((o) => (
                <li key={o} className="card flex gap-3 p-4">
                  <Check size={20} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
                  <span className="text-sm text-brand-700">{o}</span>
                </li>
              ))}
            </ul>

            {service.documents && (
              <>
                <h2 className="mt-12 text-2xl font-bold">Documents Typically Required</h2>
                <ul className="card mt-6 divide-y divide-brand-50">
                  {service.documents.map((d) => (
                    <li key={d} className="flex items-start gap-3 px-5 py-3 text-sm text-slate-600">
                      <FileText size={18} className="mt-0.5 shrink-0 text-brand-400" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {service.faqs.length > 0 && (
              <>
                <h2 className="mt-12 text-2xl font-bold">Frequently Asked Questions</h2>
                <div className="mt-6">
                  <FaqList items={service.faqs} />
                </div>
              </>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <nav className="card p-6" aria-label="All services">
              <h2 className="font-heading text-lg font-bold text-brand-800">All Services</h2>
              <ul className="mt-4 space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      aria-current={s.slug === service.slug ? 'page' : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm transition ${
                        s.slug === service.slug
                          ? 'bg-brand-700 font-semibold text-white'
                          : 'text-brand-700 hover:bg-paper hover:text-accent-700'
                      }`}
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rounded-xl2 bg-brand-800 p-6 text-white">
              <h2 className="font-heading text-lg font-bold text-white">Have a query?</h2>
              <p className="mt-2 text-sm text-brand-100">
                Share your requirement and the concerned partner will respond.
              </p>
              <ButtonLink to={`/contact?service=${service.slug}`} variant="secondary" className="mt-4 w-full">
                Send an enquiry
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <a
                href={telHref(SITE.phonePrimary)}
                className="mt-3 block text-center text-sm text-accent-200 hover:text-accent-100"
              >
                {SITE.phonePrimary}
              </a>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-paper py-14">
        <Container>
          <h2 className="text-2xl font-bold">Related Services</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group card p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl2 bg-brand-50 text-brand-700 transition group-hover:bg-accent-400 group-hover:text-brand-900">
                  <Icon name={s.icon} size={22} />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-brand-800">{s.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  )
}

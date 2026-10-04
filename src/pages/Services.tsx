import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { CTABand } from '@/components/sections/CTABand'
import { SITE } from '@/config/site'
import { services } from '@/data'

export default function Services() {
  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: `${SITE.domain}/services/${s.slug}`,
    })),
  }
  return (
    <>
      <Seo
        title="Services"
        description={`Services of ${SITE.firmName}: audit and assurance, income-tax, GST, international taxation, company law, business registrations, accounting, virtual CFO and NRI taxation.`}
        path="/services"
        jsonLd={listLd}
      />
      <PageHeader
        eyebrow="our services"
        title="Professional Services"
        intro="Audit, taxation, regulatory compliance and advisory services — select a service for details."
        crumbs={[{ label: 'Services' }]}
      />
      <ServicesGrid heading={false} />
      <HowWeWork />
      <CTABand />
    </>
  )
}

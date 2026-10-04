import { MapPin, Mail, Phone, Clock, MessageCircle } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { EnquiryForm } from '@/components/ui/EnquiryForm'
import { SITE, telHref, waHref } from '@/config/site'
import { firmLd } from '@/lib/schema'

export default function Contact() {
  const cards = [
    { Icon: Phone, label: 'Phone', value: [SITE.phonePrimary, SITE.phoneSecondary].filter(Boolean).join(' · '), href: telHref(SITE.phonePrimary) },
    { Icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    ...(SITE.whatsapp ? [{ Icon: MessageCircle, label: 'WhatsApp', value: SITE.phonePrimary, href: waHref() }] : []),
    { Icon: MapPin, label: 'Office', value: SITE.address, href: SITE.mapLink },
    { Icon: Clock, label: 'Office hours', value: SITE.officeHours, href: '' },
  ]

  return (
    <>
      <Seo
        title="Contact"
        description={`Contact ${SITE.firmName}, Chartered Accountants, ${SITE.addressLocality}. Phone ${SITE.phonePrimary}, email ${SITE.email}. Office hours ${SITE.officeHours}.`}
        path="/contact"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'ContactPage', url: `${SITE.domain}/contact`, mainEntity: firmLd() }}
      />
      <PageHeader
        eyebrow="contact"
        title="Contact Us"
        intro="Send your query using the form, or reach the office by phone or email."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="py-12 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="space-y-4">
            {cards.map(({ Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl2 bg-brand-50 text-brand-700">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading font-semibold text-brand-800">{label}</span>
                    <span className="block break-words text-sm text-slate-600">{value}</span>
                  </span>
                </>
              )
              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="card flex items-start gap-4 p-5 transition hover:border-accent-300"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className="card flex items-start gap-4 p-5">
                  {inner}
                </div>
              )
            })}

            {SITE.mapEmbedUrl && (
              <iframe
                title={`Map showing the office of ${SITE.firmName}`}
                src={SITE.mapEmbedUrl}
                className="h-64 w-full rounded-xl2 border border-brand-100"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>

          <div className="card p-6 sm:p-8 md:p-9">
            <h2 className="text-2xl font-bold">Send an enquiry</h2>
            <p className="mt-2 text-sm text-slate-600">Fields marked * are required.</p>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { FaqList, faqLd } from '@/components/ui/FaqList'
import { CTABand } from '@/components/sections/CTABand'
import { faqs } from '@/data'

export default function Faqs() {
  const groups = [...new Set(faqs.map((f) => f.category))]
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions on income-tax returns, the new tax regime, GST registration and returns, and company law compliance."
        path="/faqs"
        jsonLd={faqLd(faqs)}
      />
      <PageHeader eyebrow="faqs" title="Frequently Asked Questions" crumbs={[{ label: 'FAQs' }]} />
      <section className="py-12 md:py-20">
        <Container className="max-w-3xl space-y-12">
          {groups.map((g) => (
            <div key={g}>
              <h2 className="text-2xl font-bold">{g}</h2>
              <div className="mt-5">
                <FaqList items={faqs.filter((f) => f.category === g)} />
              </div>
            </div>
          ))}
        </Container>
      </section>
      <CTABand />
    </>
  )
}

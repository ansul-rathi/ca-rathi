import { Seo } from '@/components/Seo'
import { Hero } from '@/components/sections/Hero'
import { AboutIntro } from '@/components/sections/AboutIntro'
import { StatsBand } from '@/components/sections/StatsBand'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { CompliancePreview } from '@/components/sections/CompliancePreview'
import { ToolsTeaser } from '@/components/sections/ToolsTeaser'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { LatestPosts } from '@/components/sections/LatestPosts'
import { CTABand } from '@/components/sections/CTABand'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FaqList, faqLd } from '@/components/ui/FaqList'
import { ButtonLink } from '@/components/ui/Button'
import { faqs } from '@/data'
import { firmLd, websiteLd } from '@/lib/schema'
import { SITE } from '@/config/site'

export default function Home() {
  const homeFaqs = faqs.slice(0, 5)
  return (
    <>
      <Seo
        title="Home"
        description={`${SITE.firmName}, Chartered Accountants in ${SITE.addressLocality} (FRN ${SITE.firmRegNo}) — audit and assurance, income-tax, GST, company law, international taxation and advisory services.`}
        path="/"
        jsonLd={[firmLd(), websiteLd(), faqLd(homeFaqs)]}
      />
      <Hero />
      <ServicesGrid limit={6} />
      <StatsBand />
      <AboutIntro />
      <HowWeWork />
      <CompliancePreview />
      <ToolsTeaser />
      <TeamGrid />
      <LatestPosts />

      <section className="bg-paper py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow="faqs"
              title="Frequently Asked Questions"
              intro="Answers to common questions on income-tax, GST and company law compliance."
            />
            <ButtonLink to="/faqs" variant="ghost" className="mt-6">
              View all FAQs
            </ButtonLink>
          </div>
          <FaqList items={homeFaqs} />
        </Container>
      </section>

      <CTABand />
    </>
  )
}

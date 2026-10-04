import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { ToolsTeaser } from '@/components/sections/ToolsTeaser'
import { CTABand } from '@/components/sections/CTABand'
import { SITE } from '@/config/site'

export default function Tools() {
  return (
    <>
      <Seo
        title="Tax Calculators & Resources"
        description={`Free income tax, GST and HRA calculators, compliance calendar, document checklists and useful government links from ${SITE.firmName}.`}
        path="/tools"
      />
      <PageHeader
        eyebrow="knowledge tools"
        title="Calculators & Resources"
        intro="Reference tools for taxpayers. Results are indicative and not professional advice."
        crumbs={[{ label: 'Tools' }]}
      />
      <ToolsTeaser heading={false} />
      <CTABand />
    </>
  )
}

import ReactMarkdown from 'react-markdown'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { fmtDate } from '@/components/ui/PostCard'
import { legalPages } from '@/data/legal'

export default function Legal({ slug }: { slug: string }) {
  const page = legalPages.find((p) => p.slug === slug)!
  return (
    <>
      <Seo title={page.title} description={page.description} path={`/${page.slug}`} />
      <PageHeader title={page.title} crumbs={[{ label: page.title }]} />
      <section className="py-12 md:py-20">
        <Container className="max-w-3xl">
          <p className="text-sm text-slate-500">Last updated: {fmtDate(page.updated, 'long')}</p>
          <div className="prose-content mt-6">
            <ReactMarkdown>{page.body}</ReactMarkdown>
          </div>
        </Container>
      </section>
    </>
  )
}

import { useState } from 'react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { PostCard } from '@/components/ui/PostCard'
import { sortedPosts } from '@/data'
import { SITE } from '@/config/site'

export default function Blog() {
  const posts = sortedPosts()
  const cats = ['All', ...new Set(posts.map((p) => p.category))]
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? posts : posts.filter((p) => p.category === cat)

  return (
    <>
      <Seo
        title="Insights — Tax, GST & Company Law Updates"
        description={`Professional updates on income-tax, GST and company law from the partners of ${SITE.firmName}.`}
        path="/blog"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${SITE.firmName} — Insights`,
          url: `${SITE.domain}/blog`,
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `${SITE.domain}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        }}
      />
      <PageHeader
        eyebrow="insights"
        title="Insights"
        intro="Professional updates on taxation, GST and corporate law, written by the partners."
        crumbs={[{ label: 'Insights' }]}
      />
      <section className="py-12 md:py-20">
        <Container>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                  cat === c ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-100 bg-white text-brand-700 hover:border-brand-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((post, i) => (
              <PostCard key={post.slug} post={post} delay={(i % 3) * 80} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

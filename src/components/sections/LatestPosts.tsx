import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PostCard } from '@/components/ui/PostCard'
import { sortedPosts } from '@/data'

export function LatestPosts() {
  const list = sortedPosts().slice(0, 3)
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="insights"
            title="Professional Updates"
            intro="Articles on tax, GST and corporate law written by the partners."
          />
          <Link
            to="/blog"
            className="inline-flex shrink-0 items-center gap-2 font-heading text-sm font-semibold text-accent-700 hover:text-accent-800"
          >
            All articles
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <PostCard key={p.slug} post={p} delay={i * 80} />
          ))}
        </div>
      </Container>
    </section>
  )
}

import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CalendarDays, Clock, User, ArrowLeft } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { PostCard, fmtDate } from '@/components/ui/PostCard'
import { getPostBySlug, sortedPosts } from '@/data'
import { SITE } from '@/config/site'
import { firmId } from '@/lib/schema'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug = '' } = useParams()
  const post = getPostBySlug(slug)
  if (!post) return <NotFound />

  const related = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
  const url = `${SITE.domain}/blog/${post.slug}`
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Person', name: post.author, jobTitle: 'Chartered Accountant', worksFor: { '@id': firmId } },
    publisher: { '@id': firmId },
    image: `${SITE.domain}/og-image.png`,
    mainEntityOfPage: url,
    inLanguage: 'en-IN',
  }

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.coverImage || undefined}
        jsonLd={articleLd}
        published={post.date}
        modified={post.updated}
      />
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ label: 'Insights', to: '/blog' }, { label: post.title }]}
      />

      <article className="py-12 md:py-20">
        <Container className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <User size={15} aria-hidden="true" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={15} aria-hidden="true" />
              <time dateTime={post.date}>{fmtDate(post.date, 'long')}</time>
            </span>
            {post.updated && (
              <span>
                Updated <time dateTime={post.updated}>{fmtDate(post.updated, 'long')}</time>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={15} aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>

          <div className="prose-content mt-8 overflow-x-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>

          <div className="mt-12 border-t border-brand-100 pt-8">
            <Link to="/blog" className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-accent-700">
              <ArrowLeft size={16} aria-hidden="true" />
              All articles
            </Link>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="bg-paper py-14">
          <Container>
            <h2 className="text-2xl font-bold">Related Articles</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}

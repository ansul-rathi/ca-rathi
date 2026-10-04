import { Link } from 'react-router-dom'
import { CalendarDays, Clock, ArrowRight, Newspaper } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import type { BlogPost } from '@/data'

export const fmtDate = (iso: string, month: 'short' | 'long' = 'short') =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month,
    year: 'numeric',
  })

export function PostCard({ post, delay = 0 }: { post: BlogPost; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl2 border border-brand-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative flex aspect-[16/9] items-center justify-center bg-brand-800">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt=""
              loading="lazy"
              width={640}
              height={360}
              className="h-full w-full object-cover"
            />
          ) : (
            <Newspaper size={40} className="text-accent-400" aria-hidden="true" />
          )}
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-800">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} aria-hidden="true" />
              <time dateTime={post.date}>{fmtDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>
          <h3 className="mt-3 font-heading text-lg font-bold text-brand-800">
            <Link
              to={`/blog/${post.slug}`}
              className="after:absolute after:inset-0 group-hover:text-accent-700"
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-semibold text-accent-700">
            Read article
            <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Reveal>
  )
}

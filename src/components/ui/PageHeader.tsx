import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'

type Crumb = { label: string; to?: string }

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs = [],
}: {
  eyebrow?: string
  title: string
  intro?: string
  crumbs?: Crumb[]
}) {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-12 text-white md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        {eyebrow && (
          <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-accent-300">
            <span className="text-accent-400" aria-hidden="true">// </span>
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-brand-100">{intro}</p>}
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mt-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-brand-200">
              <li>
                <Link to="/" className="hover:text-accent-400">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1">
                  <ChevronRight size={14} className="text-brand-400" />
                  {c.to ? (
                    <Link to={c.to} className="hover:text-accent-400">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-accent-300">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </Container>
    </section>
  )
}

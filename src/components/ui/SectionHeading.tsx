import type { ReactNode } from 'react'

// Section heading with the reference "// eyebrow" style.
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
  as = 'h2',
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  light?: boolean
  as?: 'h1' | 'h2'
}) {
  const Title = as
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      <p
        className={`mb-3 font-heading text-sm font-semibold uppercase tracking-wider ${
          light ? 'text-accent-300' : 'text-accent-700'
        }`}
      >
        <span className={light ? 'text-accent-400' : 'text-accent-600'} aria-hidden="true">// </span>
        {eyebrow}
      </p>
      <Title
        className={`text-3xl font-bold leading-tight md:text-4xl ${
          light ? 'text-white' : 'text-brand-800'
        }`}
      >
        {title}
      </Title>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? 'text-brand-100' : 'text-slate-600'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}

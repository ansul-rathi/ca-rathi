import { Link } from 'react-router-dom'
import { SITE } from '@/config/site'

// ICAI: the firm name must be written in plain text, not styled as a
// logo/monogram. Name + designation in a single typeface and colour.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className="inline-flex flex-col leading-none"
      aria-label={`${SITE.firmName} — home`}
    >
      <span
        className={`font-heading text-xl font-extrabold tracking-wide ${
          light ? 'text-white' : 'text-brand-800'
        }`}
      >
        {SITE.brandName}
      </span>
      <span
        className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
          light ? 'text-brand-200' : 'text-slate-500'
        }`}
      >
        {SITE.designation}
      </span>
    </Link>
  )
}

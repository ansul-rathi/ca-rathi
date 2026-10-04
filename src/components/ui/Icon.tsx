import {
  Receipt,
  Globe,
  ShieldCheck,
  Briefcase,
  SearchCheck,
  Scale,
  Calculator,
  BadgePercent,
  Building2,
  LineChart,
  Plane,
  Home,
  CalendarClock,
  type LucideIcon,
} from 'lucide-react'

// Maps icon-name strings stored in data to lucide components, so data files
// stay free of component imports.
const map: Record<string, LucideIcon> = {
  Receipt,
  Globe,
  ShieldCheck,
  Briefcase,
  SearchCheck,
  Scale,
  Calculator,
  BadgePercent,
  Building2,
  LineChart,
  Plane,
  Home,
  CalendarClock,
}

export function Icon({
  name,
  className = '',
  size = 24,
}: {
  name: string
  className?: string
  size?: number
}) {
  const Cmp = map[name] ?? Briefcase
  return <Cmp className={className} size={size} aria-hidden="true" />
}

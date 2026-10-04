import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { services } from '@/data/services'

type NavItem = { label: string; to: string; children?: { label: string; to: string }[] }

export const toolLinks = [
  { label: 'Income Tax Calculator', to: '/tools/income-tax-calculator' },
  { label: 'GST Calculator', to: '/tools/gst-calculator' },
  { label: 'HRA Exemption Calculator', to: '/tools/hra-calculator' },
  { label: 'Compliance Calendar', to: '/compliance-calendar' },
  { label: 'Useful Links & Checklists', to: '/resources' },
  { label: 'FAQs', to: '/faqs' },
]

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    children: [
      { label: 'All Services', to: '/services' },
      ...services.map((s) => ({ label: s.title, to: `/services/${s.slug}` })),
    ],
  },
  { label: 'Resources', to: '/tools', children: [{ label: 'All Tools', to: '/tools' }, ...toolLinks] },
  { label: 'Insights', to: '/blog' },
  { label: 'Careers', to: '/careers' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  // Desktop dropdown that was just clicked: kept hidden until the pointer leaves,
  // otherwise :hover / :focus-within would keep it open after navigation.
  const [dismissed, setDismissed] = useState<string | null>(null)
  const location = useLocation()

  const closeDropdown = (label: string) => {
    setDismissed(label)
    ;(document.activeElement as HTMLElement | null)?.blur()
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setExpanded(null)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `font-heading text-sm font-semibold transition hover:text-accent-700 ${
      isActive ? 'text-accent-700' : 'text-brand-800'
    }`

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-card' : 'shadow-sm'
      }`}
    >
      <Container className="flex h-16 items-center justify-between lg:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="group relative"
                onMouseLeave={() => setDismissed(null)}
                onBlur={(e) => {
                  // Reset only when keyboard focus moves elsewhere (not on our own blur()).
                  if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setDismissed(null)
                }}
              >
                <NavLink
                  to={item.to}
                  className={linkCls}
                  aria-haspopup="true"
                  onClick={() => closeDropdown(item.label)}
                >
                  <span className="inline-flex items-center gap-1 py-3">
                    {item.label}
                    <ChevronDown
                      size={15}
                      className="transition group-focus-within:rotate-180 group-hover:rotate-180"
                      aria-hidden="true"
                    />
                  </span>
                </NavLink>
                <div
                  className={`invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-1 opacity-0 transition-all ${
                    dismissed === item.label
                      ? ''
                      : 'group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100'
                  }`}
                >
                  <ul className="max-h-[70vh] overflow-y-auto rounded-xl2 border border-brand-100 bg-white p-2 shadow-card">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <Link
                          to={c.to}
                          onClick={() => closeDropdown(item.label)}
                          className="block rounded-lg px-3 py-2 text-sm text-brand-700 transition hover:bg-paper hover:text-accent-700"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkCls}>
                {item.label}
              </NavLink>
            ),
          )}
          <ButtonLink to="/contact" size="md">
            Contact Us
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="-mr-2 rounded-lg p-2 text-brand-800 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-brand-100 bg-white transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-[calc(100vh-4rem)] overflow-y-auto' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="px-5 py-4" aria-label="Mobile">
          <ul className="flex flex-col">
            {[...navItems, { label: 'Contact', to: '/contact' }].map((item) =>
              item.children ? (
                <li key={item.label} className="border-b border-brand-50">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3 font-heading text-base font-semibold text-brand-800"
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                    tabIndex={open ? 0 : -1}
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={`transition ${expanded === item.label ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  {expanded === item.label && (
                    <ul className="mb-3 ml-2 border-l-2 border-accent-200 pl-3">
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link to={c.to} className="block py-2 text-sm text-brand-700">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.to} className="border-b border-brand-50">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    tabIndex={open ? 0 : -1}
                    className={({ isActive }) =>
                      `block py-3 font-heading text-base font-semibold ${
                        isActive ? 'text-accent-700' : 'text-brand-800'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

import { SITE } from '@/config/site'
import { services } from '@/data/services'

// Sample-site gating: in Services and Resources only the first N entries are
// open; the rest show the "contact for full demo" popup. Everything else is open.
// Order of the Resources menu (see Navbar toolLinks).
export const resourcePaths = [
  '/tools/income-tax-calculator',
  '/tools/gst-calculator',
  '/tools/hra-calculator',
  '/compliance-calendar',
  '/resources',
  '/faqs',
]

const gated = new Set<string>(
  SITE.teaser.enabled
    ? [
        ...services.slice(SITE.teaser.openServices).map((s) => `/services/${s.slug}`),
        ...resourcePaths.slice(SITE.teaser.openResources),
      ]
    : [],
)

export const gatedPaths = [...gated]

export const isGatedPath = (path: string) => gated.has(path.split(/[?#]/)[0].replace(/\/$/, ''))

// Page a gated URL falls back to when opened directly.
export const gateParent = (path: string) => (path.startsWith('/services/') ? '/services' : '/tools')

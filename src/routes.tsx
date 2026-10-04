import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { services, posts } from '@/data'
import { legalPages } from '@/data/legal'
import { gatedPaths, gateParent, isGatedPath } from '@/lib/gate'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'))
const Contact = lazy(() => import('@/pages/Contact'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const Careers = lazy(() => import('@/pages/Careers'))
const Tools = lazy(() => import('@/pages/tools/Tools'))
const IncomeTaxCalculator = lazy(() => import('@/pages/tools/IncomeTaxCalculator'))
const GstCalculator = lazy(() => import('@/pages/tools/GstCalculator'))
const HraCalculator = lazy(() => import('@/pages/tools/HraCalculator'))
const ComplianceCalendar = lazy(() => import('@/pages/ComplianceCalendar'))
const Resources = lazy(() => import('@/pages/Resources'))
const Faqs = lazy(() => import('@/pages/Faqs'))
const Legal = lazy(() => import('@/pages/Legal'))
const HtmlSitemap = lazy(() => import('@/pages/HtmlSitemap'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const allPaths = [
  '/',
  '/about',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/tools',
  '/tools/income-tax-calculator',
  '/tools/gst-calculator',
  '/tools/hra-calculator',
  '/compliance-calendar',
  '/resources',
  '/faqs',
  '/blog',
  ...posts.map((p) => `/blog/${p.slug}`),
  '/careers',
  '/contact',
  ...legalPages.map((p) => `/${p.slug}`),
  '/sitemap',
]

// Indexable URLs (sitemap). Gated URLs are still prerendered, as their parent page.
export const staticPaths = allPaths.filter((p) => !isGatedPath(p))
export const prerenderPaths = [...staticPaths, ...gatedPaths]

// A gated URL opened directly renders its parent page, then switches the URL
// to the parent and opens the demo popup.
function GateGuard({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const gated = isGatedPath(pathname)
  const parent = gateParent(pathname)
  useEffect(() => {
    if (gated) navigate(parent, { replace: true, state: { gate: true } })
  }, [gated, parent, navigate])
  if (!gated) return children
  return parent === '/services' ? <Services /> : <Tools />
}

function Fallback() {
  return <div className="min-h-[60vh]" aria-busy="true" />
}

export function AppRoutes() {
  const g = (el: ReactNode) => <GateGuard>{el}</GateGuard>
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={g(<ServiceDetail />)} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/income-tax-calculator" element={g(<IncomeTaxCalculator />)} />
        <Route path="/tools/gst-calculator" element={g(<GstCalculator />)} />
        <Route path="/tools/hra-calculator" element={g(<HraCalculator />)} />
        <Route path="/compliance-calendar" element={g(<ComplianceCalendar />)} />
        <Route path="/resources" element={g(<Resources />)} />
        <Route path="/faqs" element={g(<Faqs />)} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        {legalPages.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<Legal slug={p.slug} />} />
        ))}
        <Route path="/sitemap" element={<HtmlSitemap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

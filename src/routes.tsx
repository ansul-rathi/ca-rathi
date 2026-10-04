import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { services, posts } from '@/data'
import { legalPages } from '@/data/legal'

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

// Every indexable URL — used by the prerender script and sitemap.xml.
export const staticPaths = [
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

function Fallback() {
  return <div className="min-h-[60vh]" aria-busy="true" />
}

export function AppRoutes() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/income-tax-calculator" element={<IncomeTaxCalculator />} />
        <Route path="/tools/gst-calculator" element={<GstCalculator />} />
        <Route path="/tools/hra-calculator" element={<HraCalculator />} />
        <Route path="/compliance-calendar" element={<ComplianceCalendar />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faqs" element={<Faqs />} />
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

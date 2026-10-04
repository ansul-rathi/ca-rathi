import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Container } from '@/components/ui/Container'
import { services, posts } from '@/data'
import { toolLinks } from '@/components/layout/Navbar'
import { legalPages } from '@/data/legal'

export default function HtmlSitemap() {
  const groups = [
    {
      title: 'Firm',
      links: [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Careers', to: '/careers' },
        { label: 'Contact', to: '/contact' },
      ],
    },
    { title: 'Services', links: [{ label: 'All Services', to: '/services' }, ...services.map((s) => ({ label: s.title, to: `/services/${s.slug}` }))] },
    { title: 'Tools & Resources', links: [{ label: 'All Tools', to: '/tools' }, ...toolLinks] },
    { title: 'Insights', links: [{ label: 'All Articles', to: '/blog' }, ...posts.map((p) => ({ label: p.title, to: `/blog/${p.slug}` }))] },
    { title: 'Legal', links: legalPages.map((p) => ({ label: p.title, to: `/${p.slug}` })) },
  ]
  return (
    <>
      <Seo title="Sitemap" description="All pages on this website." path="/sitemap" />
      <PageHeader title="Sitemap" crumbs={[{ label: 'Sitemap' }]} />
      <section className="py-12 md:py-20">
        <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="text-lg font-bold">{g.title}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-brand-700 hover:text-accent-700 hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>
    </>
  )
}

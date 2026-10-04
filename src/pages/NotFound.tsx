import { Home, Search } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for could not be found."
        path="/404"
        noindex
      />
      <section className="bg-brand-900 py-24 text-center text-white md:py-32">
        <Container>
          <p className="font-heading text-7xl font-extrabold text-accent-400 md:text-8xl">404</p>
          <h1 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">Page Not Found</h1>
          <p className="mx-auto mt-4 max-w-md text-brand-100">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink to="/" variant="secondary" size="lg">
              <Home size={18} aria-hidden="true" />
              Back to Home
            </ButtonLink>
            <ButtonLink
              to="/sitemap"
              variant="ghost"
              size="lg"
              className="!border-white !text-white hover:!bg-white hover:!text-brand-900"
            >
              <Search size={18} aria-hidden="true" />
              View Sitemap
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}

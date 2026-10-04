import { ArrowRight, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { SITE, telHref } from '@/config/site'

export function CTABand() {
  return (
    <section className="py-12">
      <Container>
        <div className="relative overflow-hidden rounded-xl2 bg-brand-800 px-6 py-10 sm:px-10 md:px-14 md:py-14">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-accent-400/20 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="eyebrow text-accent-300">contact</p>
              <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
                Have a query?
              </h2>
              <p className="mt-3 text-brand-100">
                Write to us or call the office during working hours ({SITE.officeHours}).
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <ButtonLink to="/contact" size="lg" variant="secondary">
                Send an enquiry
                <ArrowRight size={18} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                to={telHref(SITE.phonePrimary)}
                external
                size="lg"
                variant="ghost"
                className="!border-white !text-white hover:!bg-white hover:!text-brand-900"
              >
                <Phone size={18} aria-hidden="true" />
                Call
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

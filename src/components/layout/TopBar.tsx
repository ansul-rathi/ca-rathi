import { Clock, Mail, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SITE, telHref } from '@/config/site'

export function TopBar() {
  return (
    <div className="hidden bg-brand-900 text-brand-100 md:block">
      <Container className="flex items-center justify-between py-2 text-sm">
        <p className="flex items-center gap-2">
          <Clock size={15} aria-hidden="true" />
          {SITE.officeHours}
        </p>
        <div className="flex items-center gap-6">
          <a href={telHref(SITE.phonePrimary)} className="flex items-center gap-2 hover:text-accent-300">
            <Phone size={15} aria-hidden="true" />
            {SITE.phonePrimary}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-accent-300">
            <Mail size={15} aria-hidden="true" />
            {SITE.email}
          </a>
        </div>
      </Container>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Clock } from 'lucide-react'
import { XIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/Social'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { SITE, telHref } from '@/config/site'
import { services } from '@/data/services'
import { toolLinks } from './Navbar'

const socials = [
  { href: SITE.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: SITE.social.twitter, label: 'X (Twitter)', Icon: XIcon },
  { href: SITE.social.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: SITE.social.instagram, label: 'Instagram', Icon: InstagramIcon },
].filter((s) => s.href)

const heading = 'font-heading text-sm font-bold uppercase tracking-wider text-white'
const link = 'text-brand-200 transition hover:text-accent-300'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-brand-900 text-brand-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">
            {SITE.firmLegalName}. Firm Registration No. (ICAI): {SITE.firmRegNo}. Established{' '}
            {SITE.foundedYear}.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                rel="noopener noreferrer"
                target={href.startsWith('http') ? '_blank' : undefined}
                className="rounded-full bg-brand-800 p-2.5 transition hover:bg-accent-400 hover:text-brand-900"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className={heading}>Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className={link}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Resources</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[...toolLinks, { label: 'Insights', to: '/blog' }, { label: 'Careers', to: '/careers' }].map(
              (l) => (
                <li key={l.to}>
                  <Link to={l.to} className={link}>
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Contact</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-brand-200">
            <p className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent-400" aria-hidden="true" />
              <span>{SITE.address}</span>
            </p>
            <p className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-accent-400" aria-hidden="true" />
              <span className="flex flex-col">
                <a href={telHref(SITE.phonePrimary)} className="hover:text-accent-300">
                  {SITE.phonePrimary}
                </a>
                {SITE.phoneSecondary && (
                  <a href={telHref(SITE.phoneSecondary)} className="hover:text-accent-300">
                    {SITE.phoneSecondary}
                  </a>
                )}
              </span>
            </p>
            <p className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-accent-400" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-accent-300">
                {SITE.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-accent-400" aria-hidden="true" />
              <span>{SITE.officeHours}</span>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-brand-800">
        <Container className="py-5 text-xs leading-relaxed text-brand-300">
          <p>
            This website is maintained in accordance with the guidelines of The Institute of Chartered
            Accountants of India. Information on this website is for general information only and does
            not constitute professional advice or solicitation.
          </p>
          <div className="mt-4 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p>
              © {year} {SITE.firmName}. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5 gap-y-1">
              <Link to="/disclaimer" className="hover:text-accent-300">
                Disclaimer
              </Link>
              <Link to="/privacy-policy" className="hover:text-accent-300">
                Privacy Policy
              </Link>
              <Link to="/terms-of-use" className="hover:text-accent-300">
                Terms of Use
              </Link>
              <Link to="/sitemap" className="hover:text-accent-300">
                Sitemap
              </Link>
            </nav>
            <p className="text-brand-400">{SITE.credit}</p>
          </div>
        </Container>
      </div>
    </footer>
  )
}

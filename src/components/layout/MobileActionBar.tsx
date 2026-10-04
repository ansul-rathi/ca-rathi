import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/Social'
import { SITE, telHref, waHref } from '@/config/site'

// Sticky contact bar on small screens (pull model: visitor-initiated contact only).
export function MobileActionBar() {
  const item =
    'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-semibold'
  return (
    <nav
      aria-label="Quick contact"
      className="no-print fixed inset-x-0 bottom-0 z-50 flex border-t border-brand-100 bg-white/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a href={telHref(SITE.phonePrimary)} className={`${item} text-brand-800`}>
        <Phone size={20} aria-hidden="true" />
        Call
      </a>
      {SITE.whatsapp && (
        <a href={waHref()} target="_blank" rel="noopener noreferrer" className={`${item} text-brand-800`}>
          <WhatsAppIcon size={20} className="text-[#25D366]" />
          WhatsApp
        </a>
      )}
      <Link to="/contact" className={`${item} bg-brand-700 text-white`}>
        <Mail size={20} aria-hidden="true" />
        Enquire
      </Link>
    </nav>
  )
}

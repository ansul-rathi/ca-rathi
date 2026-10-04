import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/Social'
import { SITE } from '@/config/site'
import { isGatedPath } from '@/lib/gate'

export const demoWhatsAppHref = () =>
  `https://wa.me/${SITE.teaser.whatsapp}?text=${encodeURIComponent(SITE.teaser.whatsappText)}`

const prettyNumber = (d: string) => `+${d.replace(/^91(\d{5})(\d{5})$/, '91 $1 $2')}`

// Sample-site gate: links to gated services/resources (see lib/gate.ts) open
// this popup instead of the page.
export function DemoGate() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const btnRef = useRef<HTMLAnchorElement>(null)

  // Opened after a direct visit to a gated URL (see GateGuard in routes.tsx).
  useEffect(() => {
    if ((location.state as { gate?: boolean } | null)?.gate) {
      setOpen(true)
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.state, location.pathname, navigate])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a')
      const href = a?.getAttribute('href')
      if (!href || !href.startsWith('/') || !isGatedPath(href)) return
      e.preventDefault()
      e.stopPropagation()
      ;(document.activeElement as HTMLElement | null)?.blur()
      setOpen(true)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    btnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-slate-900/50 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div className="w-full max-w-[420px] rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 pb-4 pt-5">
          <div>
            <h2 id="gate-title" className="font-heading text-lg font-bold text-slate-900">
              Available in the full demo
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              This sample opens the first two services and tools.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="-mr-2 -mt-1 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-[15px] leading-relaxed text-slate-700">
            To see every page of the website, message <strong className="font-semibold text-slate-900">{SITE.teaser.contactName}</strong>{' '}
            on WhatsApp and we'll walk you through it.
          </p>

          <a
            ref={btnRef}
            href={demoWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2.5 rounded-lg bg-[#25D366] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#1DA851] focus-visible:ring-[#25D366]"
          >
            <WhatsAppIcon size={20} />
            WhatsApp {SITE.teaser.contactName.split(' ')[0]}
          </a>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-500">{prettyNumber(SITE.teaser.whatsapp)}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="font-medium text-slate-600 hover:text-slate-900"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { SITE } from '@/config/site'

const KEY = 'icai-disclaimer-accepted-v1'

// First-visit disclaimer required in practice for CA firm websites: the visitor
// confirms they are seeking information of their own accord (no solicitation).
// Client-only (renders nothing during prerender, so crawlers see the content).
export function DisclaimerModal() {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY) && !navigator.webdriver) setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    btnRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const accept = () => {
    try {
      localStorage.setItem(KEY, new Date().toISOString())
    } catch {
      /* storage unavailable — accept for this page view only */
    }
    setOpen(false)
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-brand-900/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl2 bg-white p-6 shadow-2xl sm:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-700">
          <ShieldCheck size={24} aria-hidden="true" />
        </span>
        <h2 id="disclaimer-title" className="mt-4 text-xl font-bold">
          Disclaimer
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
          <p>
            As per the guidelines of The Institute of Chartered Accountants of India (ICAI), Chartered
            Accountants are not permitted to solicit work or advertise.
          </p>
          <p>By clicking “I Agree”, you acknowledge that:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              you are seeking information about {SITE.firmName} of your own accord, and there has been
              no solicitation, invitation or inducement of any sort from the firm or its members;
            </li>
            <li>
              the information on this website is for general information only and is not professional
              advice; and
            </li>
            <li>no client relationship is created by using this website.</li>
          </ul>
          <p>
            Read the full{' '}
            <Link to="/disclaimer" onClick={accept} className="font-medium text-accent-700 underline">
              disclaimer
            </Link>
            .
          </p>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <a
            href="https://www.icai.org"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-brand-200 px-5 py-2.5 font-heading text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Disagree
          </a>
          <button
            ref={btnRef}
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  )
}

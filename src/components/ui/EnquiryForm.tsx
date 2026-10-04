import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { submitForm, isEmail, isPhone } from '@/lib/forms'
import { services } from '@/data'
import { SITE } from '@/config/site'

type Values = {
  name: string
  email: string
  phone: string
  service: string
  message: string
  consent: string
}
type Errors = Partial<Record<keyof Values, string>>

const empty: Values = { name: '', email: '', phone: '', service: '', message: '', consent: '' }

// Enquiry form. Prerendered with data-netlify so Netlify Forms registers it at
// deploy time; submitted via fetch (see lib/forms.ts). Includes a honeypot and
// DPDP-style consent.
export function EnquiryForm() {
  const [v, setV] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [bot, setBot] = useState('')

  // Preselect service from ?service=<slug> (after hydration, to match prerendered HTML).
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('service')
    if (s && services.some((x) => x.slug === s)) setV((cur) => ({ ...cur, service: s }))
  }, [])

  const update = (k: keyof Values, val: string) => setV((s) => ({ ...s, [k]: val }))

  const validate = () => {
    const e: Errors = {}
    if (v.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!isEmail(v.email)) e.email = 'Please enter a valid email address.'
    if (!isPhone(v.phone)) e.phone = 'Please enter a valid phone number.'
    if (v.message.trim().length < 10) e.message = 'Please describe your query (at least 10 characters).'
    if (!v.consent) e.consent = 'Please provide consent to be contacted.'
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) document.getElementById(`f-${first}`)?.focus()
    return !first
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (bot) return // honeypot filled — silently drop
    if (!validate()) return
    setStatus('sending')
    try {
      await submitForm('enquiry', { ...v, consent: 'yes', page: window.location.pathname })
      setStatus('success')
      setV(empty)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" role="status">
        <CheckCircle2 size={56} className="text-emerald-600" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold">Thank you</h3>
        <p className="mt-2 max-w-sm text-slate-600">
          Your enquiry has been received. We will respond within one working day.
        </p>
        <Button variant="ghost" className="mt-6" onClick={() => setStatus('idle')}>
          Send another enquiry
        </Button>
      </div>
    )
  }

  const err = (k: keyof Values) =>
    errors[k] && (
      <p id={`f-${k}-err`} className="mt-1 text-xs text-red-600">
        {errors[k]}
      </p>
    )
  const aria = (k: keyof Values) => ({
    id: `f-${k}`,
    name: k,
    'aria-invalid': !!errors[k] || undefined,
    'aria-describedby': errors[k] ? `f-${k}-err` : undefined,
  })

  return (
    <form
      name="enquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="company_website"
      onSubmit={onSubmit}
      noValidate
      className="space-y-5"
    >
      <input type="hidden" name="form-name" value="enquiry" />
      <p className="hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input name="company_website" tabIndex={-1} autoComplete="off" value={bot} onChange={(e) => setBot(e.target.value)} />
        </label>
      </p>
      <input type="hidden" name="page" defaultValue="" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="field-label">
            Full name <span className="text-red-600">*</span>
          </label>
          <input {...aria('name')} type="text" autoComplete="name" className="field" value={v.name} onChange={(e) => update('name', e.target.value)} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="f-email" className="field-label">
            Email <span className="text-red-600">*</span>
          </label>
          <input {...aria('email')} type="email" autoComplete="email" className="field" value={v.email} onChange={(e) => update('email', e.target.value)} />
          {err('email')}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-phone" className="field-label">
            Phone <span className="text-red-600">*</span>
          </label>
          <input {...aria('phone')} type="tel" autoComplete="tel" inputMode="tel" className="field" value={v.phone} onChange={(e) => update('phone', e.target.value)} />
          {err('phone')}
        </div>
        <div>
          <label htmlFor="f-service" className="field-label">
            Service
          </label>
          <select {...aria('service')} className="field" value={v.service} onChange={(e) => update('service', e.target.value)}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="f-message" className="field-label">
          Your query <span className="text-red-600">*</span>
        </label>
        <textarea {...aria('message')} rows={5} className="field" value={v.message} onChange={(e) => update('message', e.target.value)} />
        {err('message')}
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            {...aria('consent')}
            type="checkbox"
            value="yes"
            checked={!!v.consent}
            onChange={(e) => update('consent', e.target.checked ? 'yes' : '')}
            className="mt-1 h-4 w-4 shrink-0 accent-[rgb(var(--brand-700))]"
          />
          <span>
            I consent to {SITE.firmName} using these details to respond to my query, as described in the{' '}
            <Link to="/privacy-policy" className="font-medium text-accent-700 underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {err('consent')}
      </div>

      {status === 'error' && (
        <p className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            Your message could not be sent. Please try again or email us at{' '}
            <a href={`mailto:${SITE.email}`} className="font-semibold underline">
              {SITE.email}
            </a>
            .
          </span>
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full">
        {status === 'sending' ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Submit Enquiry'
        )}
      </Button>
    </form>
  )
}

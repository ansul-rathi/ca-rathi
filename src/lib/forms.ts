import { SITE } from '@/config/site'

// Submits a form according to SITE.formProvider.
// - netlify:  POST url-encoded to "/" (Netlify Forms detects the prerendered
//             <form data-netlify="true"> at deploy time; submissions appear in
//             the Netlify dashboard and can be emailed to the firm).
// - endpoint: POST JSON to SITE.formEndpoint (Formspree, Web3Forms, own API).
// - demo:     simulated success (dev / preview).
export async function submitForm(formName: string, data: Record<string, string>) {
  const provider = import.meta.env.DEV ? 'demo' : SITE.formProvider

  if (provider === 'demo') {
    console.info(`[form:${formName}]`, data)
    await new Promise((r) => setTimeout(r, 700))
    return
  }

  if (provider === 'endpoint') {
    if (!SITE.formEndpoint) throw new Error('Form endpoint not configured')
    const res = await fetch(SITE.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ form: formName, ...data }),
    })
    if (!res.ok) throw new Error(`Submission failed (${res.status})`)
    return
  }

  const body = new URLSearchParams({ 'form-name': formName, ...data }).toString()
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const isPhone = (v: string) => /^[+\d][\d\s-]{8,15}$/.test(v.trim())

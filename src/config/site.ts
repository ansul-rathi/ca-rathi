// src/config/site.ts — SINGLE source of truth for firm details.
// Every value below is DUMMY sample data. Replace per client before go-live.
import type { ThemeId } from './themes'

const domain = (import.meta.env.VITE_SITE_URL || 'https://ca-rathi.netlify.app').replace(/\/$/, '')

export const SITE = {
  // --- Identity (ICAI: firm name must be shown in plain text, not as a logo/monogram)
  brandName: 'CA RATHI',
  firmName: 'CA Rathi & Associates',
  firmLegalName: 'CA Rathi & Associates, Chartered Accountants',
  designation: 'Chartered Accountants',
  firmRegNo: '000000C', // ICAI Firm Registration Number (dummy)
  foundedYear: 2008,
  partnersCount: 4,
  professionalsCount: 25,
  tagline: 'Chartered Accountants — Audit, Taxation & Advisory',
  description:
    'CA Rathi & Associates is a firm of Chartered Accountants registered with ICAI, providing audit and assurance, direct and indirect taxation, GST, company law and advisory services.',

  // --- Contact (dummy)
  email: 'info@carathi.example',
  careersEmail: 'careers@carathi.example',
  phonePrimary: '+91 98765 43210',
  phoneSecondary: '+91 141 400 0000' as string, // leave '' to hide
  whatsapp: '919876543210', // digits only, '' to hide
  officeHours: 'Mon – Sat, 10:00 AM – 7:00 PM',
  openingHoursSpec: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '19:00' },

  address: 'Office No. 501, Fifth Floor, Sample Business Tower, Tonk Road, Jaipur, Rajasthan 302018',
  addressStreet: 'Office No. 501, Fifth Floor, Sample Business Tower, Tonk Road',
  addressLocality: 'Jaipur',
  addressRegion: 'Rajasthan',
  postalCode: '302018',
  addressCountry: 'IN',
  geo: { lat: 26.8505, lng: 75.8064 },
  mapEmbedUrl: 'https://www.google.com/maps?q=Tonk%20Road%2C%20Jaipur%2C%20Rajasthan%20302018&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Tonk+Road+Jaipur+302018',

  social: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
    instagram: '#',
    youtube: '#',
  },

  domain,
  locale: 'en_IN',
  defaultTheme: 'classic' as ThemeId,

  // --- Forms: 'netlify' (zero-config on Netlify), 'endpoint' (POST JSON to formEndpoint,
  // e.g. Formspree / Web3Forms / your API) or 'demo' (simulated, logs to console).
  formProvider: 'netlify' as 'netlify' | 'endpoint' | 'demo',
  formEndpoint: '',

  // --- Demo/sample mode: shows the theme switcher + "sample website" notice.
  // Set to false for a real client deployment.
  demoMode: true,

  // Credit line in footer (plain text, not a hyperlink — ICAI bars links to commercial entities)
  credit: 'Website by Veestar Infotech Solutions LLP',
} as const

export type Site = typeof SITE

export const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, '')}`
export const waHref = (text = 'Hello, I would like to make an enquiry.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

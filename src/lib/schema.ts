import { SITE } from '@/config/site'

// Shared JSON-LD entities.
export const firmId = `${SITE.domain}/#firm`

export const firmLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  '@id': firmId,
  name: SITE.firmName,
  legalName: SITE.firmLegalName,
  description: SITE.description,
  url: `${SITE.domain}/`,
  logo: `${SITE.domain}/icon-512.png`,
  image: `${SITE.domain}/og-image.png`,
  email: SITE.email,
  telephone: SITE.phonePrimary,
  foundingDate: String(SITE.foundedYear),
  numberOfEmployees: { '@type': 'QuantitativeValue', value: SITE.professionalsCount },
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.addressStreet,
    addressLocality: SITE.addressLocality,
    addressRegion: SITE.addressRegion,
    postalCode: SITE.postalCode,
    addressCountry: SITE.addressCountry,
  },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  hasMap: SITE.mapLink,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: SITE.openingHoursSpec.days,
    opens: SITE.openingHoursSpec.opens,
    closes: SITE.openingHoursSpec.closes,
  },
  areaServed: { '@type': 'Country', name: 'India' },
  sameAs: Object.values(SITE.social).filter((u) => u && u.startsWith('http')),
})

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.domain}/#website`,
  url: `${SITE.domain}/`,
  name: SITE.firmName,
  inLanguage: 'en-IN',
  publisher: { '@id': firmId },
})

export const toolLd = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  description,
  url: `${SITE.domain}${path}`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  isAccessibleForFree: true,
  provider: { '@id': firmId },
})

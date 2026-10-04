import { createContext, useContext, useEffect } from 'react'
import { SITE } from '@/config/site'

// Tiny head manager. During prerender the page's <Seo> writes into a collector
// (HeadContext) that the build script serialises into the static HTML <head>.
// In the browser it updates document.head on navigation. Renders nothing, so
// it can never cause hydration mismatches.

export type HeadData = {
  title: string
  description: string
  canonical: string
  type: string
  image: string
  imageAlt: string
  noindex: boolean
  jsonLd: object[]
  published?: string
  modified?: string
}

export const HeadContext = createContext<{ head?: HeadData } | null>(null)

type SeoProps = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: object | object[]
  noindex?: boolean
  published?: string
  modified?: string
}

const breadcrumbFor = (path: string, title: string) => {
  if (path === '/') return null
  const parts = path.split('/').filter(Boolean)
  const items = [{ name: 'Home', url: `${SITE.domain}/` }]
  let acc = ''
  parts.forEach((p, i) => {
    acc += `/${p}`
    const last = i === parts.length - 1
    items.push({
      name: last ? title : p.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      url: `${SITE.domain}${acc}`,
    })
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

export function buildHead({
  title,
  description,
  path,
  image = '/og-image.png',
  type = 'website',
  jsonLd,
  noindex = false,
  published,
  modified,
}: SeoProps): HeadData {
  const canonical = `${SITE.domain}${path === '/' ? '/' : path}`
  const fullTitle =
    path === '/' ? `${SITE.firmName} | ${SITE.tagline}` : `${title} | ${SITE.firmName}`
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  const crumb = breadcrumbFor(path, title)
  return {
    title: fullTitle,
    description,
    canonical,
    type,
    image: image.startsWith('http') ? image : `${SITE.domain}${image}`,
    imageAlt: `${SITE.firmName} — ${SITE.designation}`,
    noindex,
    jsonLd: crumb ? [...blocks, crumb] : blocks,
    published,
    modified,
  }
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const metaList = (h: HeadData): [string, string, string][] => {
  const list: [string, string, string][] = [
    ['name', 'description', h.description],
    ['name', 'robots', h.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
    ['property', 'og:type', h.type],
    ['property', 'og:site_name', SITE.firmName],
    ['property', 'og:locale', SITE.locale],
    ['property', 'og:title', h.title],
    ['property', 'og:description', h.description],
    ['property', 'og:url', h.canonical],
    ['property', 'og:image', h.image],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', h.imageAlt],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', h.title],
    ['name', 'twitter:description', h.description],
    ['name', 'twitter:image', h.image],
  ]
  if (h.published) list.push(['property', 'article:published_time', h.published])
  if (h.modified) list.push(['property', 'article:modified_time', h.modified])
  return list
}

// Used by the prerender script.
export function headToHtml(h: HeadData): string {
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<link rel="canonical" href="${esc(h.canonical)}" data-seo="" />`,
    ...metaList(h).map(([k, n, v]) => `<meta ${k}="${n}" content="${esc(v)}" data-seo="" />`),
    ...h.jsonLd.map(
      (b) =>
        `<script type="application/ld+json" data-seo="">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`,
    ),
  ]
  return tags.join('\n    ')
}

function applyHead(h: HeadData) {
  document.title = h.title
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
  const frag = document.createDocumentFragment()
  const link = document.createElement('link')
  link.rel = 'canonical'
  link.href = h.canonical
  link.setAttribute('data-seo', '')
  frag.appendChild(link)
  metaList(h).forEach(([k, n, v]) => {
    const m = document.createElement('meta')
    m.setAttribute(k, n)
    m.content = v
    m.setAttribute('data-seo', '')
    frag.appendChild(m)
  })
  h.jsonLd.forEach((b) => {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.text = JSON.stringify(b)
    s.setAttribute('data-seo', '')
    frag.appendChild(s)
  })
  document.head.appendChild(frag)
}

export function Seo(props: SeoProps) {
  const ctx = useContext(HeadContext)
  const head = buildHead(props)
  if (ctx) ctx.head = head // server collection
  const key = JSON.stringify(head)
  useEffect(() => {
    // Skip the very first client render when the prerendered head already matches.
    if (document.querySelector(`link[rel="canonical"][data-seo]`)?.getAttribute('href') === head.canonical && document.title === head.title) return
    applyHead(head)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return null
}

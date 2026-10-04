// Post-build: renders every route to static HTML (full content + per-page
// <head> tags for SEO/social), then writes sitemap.xml, robots.txt, llms.txt
// and 404.html. Requires `vite build` and `vite build --ssr` to have run.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const serverEntry = resolve(root, 'dist-server/entry-server.js')

const { render, staticPaths, SITE, services, posts, faqs } = await import(pathToFileURL(serverEntry).href)
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

const fill = (tpl, { html, head }) => {
  let out = tpl.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
  out = out.replace('data-theme="classic"', `data-theme="${SITE.defaultTheme}"`)
  if (!SITE.demoMode) out = out.replace(' data-demo=""', '')
  return out
}

const write = (path, content) => {
  const file = path === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${path}`, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

for (const path of staticPaths) {
  write(path, fill(template, await render(path)))
}
writeFileSync(resolve(dist, '404.html'), fill(template, await render('/__not-found__')))
console.log(`prerendered ${staticPaths.length} pages + 404.html`)

// ---- sitemap.xml
const today = new Date().toISOString().slice(0, 10)
const postDate = Object.fromEntries(posts.map((p) => [`/blog/${p.slug}`, p.updated ?? p.date]))
const priority = (p) =>
  p === '/' ? '1.0' : p.startsWith('/services') || p.startsWith('/tools') ? '0.8' : p === '/sitemap' ? '0.3' : '0.6'
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths
  .map(
    (p) =>
      `  <url><loc>${SITE.domain}${p}</loc><lastmod>${postDate[p] ?? today}</lastmod><priority>${priority(p)}</priority></url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)

// ---- robots.txt (search + AI answer engines explicitly allowed)
writeFileSync(
  resolve(dist, 'robots.txt'),
  `User-agent: *
Allow: /

# AI / answer engines
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE.domain}/sitemap.xml
`,
)

// ---- llms.txt (generative engine optimisation: concise, citable summary)
const llms = `# ${SITE.firmName}

> ${SITE.description}

- Firm Registration No. (ICAI): ${SITE.firmRegNo}
- Established: ${SITE.foundedYear}
- Address: ${SITE.address}
- Phone: ${SITE.phonePrimary}
- Email: ${SITE.email}
- Office hours: ${SITE.officeHours}

## Services
${services.map((s) => `- [${s.title}](${SITE.domain}/services/${s.slug}): ${s.shortDesc}`).join('\n')}

## Tools
- [Income Tax Calculator FY 2026-27](${SITE.domain}/tools/income-tax-calculator): old vs new regime comparison
- [GST Calculator](${SITE.domain}/tools/gst-calculator): add/remove GST with CGST/SGST/IGST split
- [HRA Exemption Calculator](${SITE.domain}/tools/hra-calculator)
- [Compliance Calendar](${SITE.domain}/compliance-calendar): GST, TDS, income-tax and ROC due dates

## Articles
${posts.map((p) => `- [${p.title}](${SITE.domain}/blog/${p.slug}): ${p.excerpt}`).join('\n')}

## FAQs
${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}
`
writeFileSync(resolve(dist, 'llms.txt'), llms)

rmSync(resolve(root, 'dist-server'), { recursive: true, force: true })
console.log('sitemap.xml, robots.txt, llms.txt written')

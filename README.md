# CA RATHI — Sample CA Firm Website

ICAI-compliant, prerendered website template for Chartered Accountant firms.
**All names, numbers, FRN, membership numbers, phone, email and address are dummy data.**

React 19 · Vite · TypeScript · Tailwind CSS · React Router (prerendered to static HTML).

## Features

- 31 static, SEO-ready pages (full HTML per route, per-page title/description/canonical/OG/Twitter tags)
- JSON-LD: AccountingService, WebSite, Service, FAQPage, BlogPosting, JobPosting, BreadcrumbList, WebApplication
- `sitemap.xml`, `robots.txt` (AI crawlers allowed), `llms.txt` (GEO / answer-engine summary), real 404 page
- Calculators: Income Tax FY 2026-27 (old vs new, rebate, marginal relief, surcharge, cess), GST (5/18/40%, CGST/SGST/IGST), HRA (8 metro cities)
- Auto-updating compliance calendar (GST, TDS/TCS, advance tax, ITR, ROC, PF/ESI)
- Useful govt/regulator links, document checklists (printable), FAQs, insights/blog with categories, careers
- Enquiry form (Netlify Forms out of the box; or any JSON endpoint), honeypot, DPDP consent
- ICAI first-visit disclaimer, Disclaimer / Privacy Policy (DPDP Act 2023) / Terms pages
- 6 colour themes, switchable live in demo mode; shareable as `/?theme=maroon`
- Self-hosted fonts, code-split routes, security headers (CSP, HSTS), immutable asset caching
- Accessible: skip link, keyboard nav, labelled forms, reduced-motion support; mobile call/WhatsApp bar

## ICAI compliance (Website Guidelines, Code of Ethics 2020, Advisory 14.10.2020)

Removed/avoided: client names & logos, testimonials, "why choose us", superlatives, fees, client counts,
"countries served", firm name as logo/monogram, awards/rankings, links to commercial entities, push-mode
pop-ups. Shown: firm name in plain text, FRN, partners with membership numbers, factual services,
professional updates, govt/ICAI links.

## Customising for a client

1. `src/config/site.ts` — all firm details, domain, `defaultTheme`, set `demoMode: false`.
2. `src/data/*` — services, partners, posts, jobs, FAQs, legal text.
3. `scripts/gen-assets.mjs` — edit brand text/colours, then `npm run assets` (OG image + icons).
4. New theme colours: `src/styles/themes.css` + `src/config/themes.ts`.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check, client + SSR build, prerender all pages to dist/
npm run preview
```

## Deploy

Netlify (recommended — forms work with zero config) or Vercel; configs included. Set env
`VITE_SITE_URL` to the live domain so canonicals and the sitemap are correct. On Netlify, enable
form notifications under Forms → enquiry.

---

Website by Veestar Infotech Solutions LLP.

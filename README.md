# NKS & Associates — Website

Fully static, multi-page marketing website for **NKS & Associates**, a Chartered Accountancy firm. Built with React + Vite + TypeScript + Tailwind CSS + React Router.

## Tech stack

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS v3** (Navy + Gold theme)
- **React Router v7** (client-side SPA, `BrowserRouter`)
- **react-helmet-async** for per-page SEO
- **lucide-react** icons + custom inline brand glyphs
- **react-markdown** for blog content
- Scroll reveal + count-up via `IntersectionObserver` (no animation libraries)

No backend, database, CMS, or animation libraries — entirely static.

## Project structure

```
src/
  config/site.ts      # SINGLE source of truth for all client details
  data/               # typed seed content + async-ready accessors (data/index.ts)
  hooks/              # useReveal, useAsyncData
  components/         # layout, ui primitives, page sections
  pages/              # route pages
  routes.tsx          # route table (lazy-loaded)
public/               # robots.txt, sitemap.xml, favicon, og-image, logo
scripts/gen-sitemap.mjs  # builds sitemap.xml from data (runs on prebuild)
```

## Editing content

- **Client details** (name, phone, email, address, social, domain): edit only
  [`src/config/site.ts`](src/config/site.ts).
- **All copy** (services, team, testimonials, clients, stats, blog posts, jobs):
  edit the files in [`src/data/`](src/data/). Components never hardcode copy — they
  read through the accessors in [`src/data/index.ts`](src/data/index.ts).

### Future API swap

The accessors in `data/index.ts` return `Promise<T>` and are consumed via the
`useAsyncData` hook. To move to a live API later, change the accessor bodies to
`fetch()` calls — **no component changes required**.

The contact form calls `submitContact()` in `data/index.ts`, which currently
logs to the console and resolves after a fake delay. Replace its body with a
`POST` to your dashboard API (see the `// TODO` marker).

## Local development

```bash
npm install
npm run dev        # start dev server (http://localhost:5173)
```

## Build & preview

```bash
npm run build      # generates sitemap, type-checks, builds to dist/
npm run preview    # serve the production build locally
```

Other scripts: `npm run lint` (oxlint), `npm run format` (prettier),
`npm run sitemap` (regenerate `public/sitemap.xml`).

## Deploy (Vercel)

The repo includes [`vercel.json`](vercel.json) with an SPA catch-all rewrite to
`index.html`. Import the project into Vercel — it auto-detects Vite. Build
command `npm run build`, output directory `dist/`.

Remember to update `SITE.domain` in `src/config/site.ts` so canonical URLs and
the sitemap point at the live domain.

---

Crafted by Veestar Infotech Solutions LLP.
# ca-rathi

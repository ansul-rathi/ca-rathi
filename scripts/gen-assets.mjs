// Generates raster icons + the Open Graph share image into public/.
// Run once per client (after editing the text below): `npm run assets`.
// Social networks (WhatsApp, LinkedIn, Facebook) do not render SVG OG images,
// so a 1200x630 PNG is required.
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pub = (f) => resolve(root, 'public', f)

// Keep in sync with src/config/site.ts
const BRAND = 'CA RATHI'
const FIRM = 'CA Rathi &amp; Associates'
const LINE = 'Chartered Accountants · Audit · Taxation · GST · Advisory'
const CITY = 'Jaipur, Rajasthan'
const C = { brand: '#162c57', dark: '#0a162b', accent: '#cda433', light: '#e9d28e' }

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.brand}"/><stop offset="1" stop-color="${C.dark}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1060" cy="110" r="220" fill="${C.accent}" opacity="0.08"/>
  <g transform="translate(860,250)">
    <rect x="0" y="120" width="56" height="110" rx="10" fill="${C.accent}"/>
    <rect x="80" y="70" width="56" height="160" rx="10" fill="${C.accent}"/>
    <rect x="160" y="0" width="56" height="230" rx="10" fill="${C.light}"/>
  </g>
  <rect x="80" y="110" width="80" height="6" rx="3" fill="${C.accent}"/>
  <text x="80" y="230" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="800" fill="#ffffff" letter-spacing="2">${BRAND}</text>
  <text x="80" y="300" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="600" fill="${C.light}">${FIRM}</text>
  <text x="80" y="380" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#d4dbe9">${LINE}</text>
  <text x="80" y="520" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#a9b7d3">${CITY}</text>
</svg>`

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(pub('og-image.png'))

const icon = readFileSync(pub('favicon.svg'))
for (const [file, size] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(icon, { density: 512 }).resize(size, size).png().toFile(pub(file))
}

// Maskable icon: same artwork with safe-zone padding.
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${C.brand}"/><g transform="translate(9.6,9.6) scale(0.7)">${icon
  .toString()
  .replace(/<\/?svg[^>]*>/g, '')}</g></svg>`
await sharp(Buffer.from(maskable), { density: 512 }).resize(512, 512).png().toFile(pub('icon-maskable-512.png'))

writeFileSync(
  pub('site.webmanifest'),
  JSON.stringify(
    {
      name: FIRM.replace('&amp;', '&'),
      short_name: BRAND,
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: C.brand,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  ) + '\n',
)
console.log('assets written to public/')

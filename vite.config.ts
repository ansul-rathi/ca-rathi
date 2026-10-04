import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Teaser (preview) build by default: only the home page ships; every other
// link opens the "contact for full demo" popup. Build the complete site with
//   VITE_FULL_SITE=true npm run build
const fullSite = process.env.VITE_FULL_SITE === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __FULL_SITE__: JSON.stringify(fullSite),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

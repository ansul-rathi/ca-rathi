// Server entry used only at build time by scripts/prerender.mjs.
import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { HeadContext, headToHtml, type HeadData } from './components/Seo'
export { staticPaths } from './routes'
export { SITE } from './config/site'
export { services, posts, faqs } from './data'

export async function render(url: string) {
  const ctx: { head?: HeadData } = {}
  const { prelude } = await prerender(
    <StrictMode>
      <HeadContext.Provider value={ctx}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  )
  const html = await new Response(prelude).text()
  return { html, head: ctx.head ? headToHtml(ctx.head) : '' }
}

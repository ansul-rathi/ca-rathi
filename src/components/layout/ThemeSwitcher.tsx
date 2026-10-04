import { useEffect, useState } from 'react'
import { Palette, X } from 'lucide-react'
import { THEMES, THEME_STORAGE_KEY, type ThemeId } from '@/config/themes'
import { SITE } from '@/config/site'

// Demo-only floating panel that previews colour themes live. Shareable via
// ?theme=<id> (handled before paint by the inline script in index.html).
export function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<ThemeId>(SITE.defaultTheme)

  useEffect(() => {
    const t = document.documentElement.dataset.theme as ThemeId | undefined
    if (t) setActive(t)
  }, [])

  const apply = (id: ThemeId) => {
    setActive(id)
    document.documentElement.dataset.theme = id
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', THEMES.find((t) => t.id === id)?.brand ?? '')
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="no-print fixed bottom-20 left-4 z-[60] md:bottom-5">
      {open && (
        <div
          id="theme-panel"
          className="mb-3 w-64 rounded-xl2 border border-brand-100 bg-white p-4 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <p className="font-heading text-sm font-bold text-brand-800">Preview colour themes</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close theme panel"
              className="rounded p-1 text-slate-500 hover:bg-paper"
            >
              <X size={16} />
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Sample website — all names, numbers and details are dummy data.
          </p>
          <ul className="mt-3 grid gap-1.5">
            {THEMES.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => apply(t.id)}
                  aria-pressed={active === t.id}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition ${
                    active === t.id
                      ? 'border-brand-700 bg-brand-50 font-semibold text-brand-800'
                      : 'border-transparent text-slate-600 hover:bg-paper'
                  }`}
                >
                  <span className="flex" aria-hidden="true">
                    <span className="h-5 w-5 rounded-l-full" style={{ background: t.brand }} />
                    <span className="h-5 w-5 rounded-r-full" style={{ background: t.accent }} />
                  </span>
                  {t.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="theme-panel"
        className="flex items-center gap-2 rounded-full bg-brand-800 px-4 py-2.5 font-heading text-xs font-semibold text-white shadow-lg ring-2 ring-white transition hover:bg-brand-700"
      >
        <Palette size={16} aria-hidden="true" />
        Themes
      </button>
    </div>
  )
}

// Colour themes available to the site. Values live in src/styles/themes.css;
// this list powers the demo theme switcher and the <meta name="theme-color">.
export type ThemeId = 'classic' | 'emerald' | 'maroon' | 'royal' | 'teal' | 'graphite'

export const THEMES: { id: ThemeId; name: string; brand: string; accent: string }[] = [
  { id: 'classic', name: 'Navy & Gold', brand: '#162c57', accent: '#cda433' },
  { id: 'emerald', name: 'Emerald & Amber', brand: '#045a42', accent: '#fbbf24' },
  { id: 'maroon', name: 'Burgundy & Gold', brand: '#73182e', accent: '#cda433' },
  { id: 'royal', name: 'Indigo & Rose', brand: '#4338ca', accent: '#fb7185' },
  { id: 'teal', name: 'Teal & Orange', brand: '#0f6660', accent: '#fb923c' },
  { id: 'graphite', name: 'Slate & Sky', brand: '#334155', accent: '#38bdf8' },
]

export const THEME_STORAGE_KEY = 'site-theme'

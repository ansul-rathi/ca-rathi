/** @type {import('tailwindcss').Config} */

// Brand + accent palettes are driven by CSS variables (see src/styles/themes.css)
// so a whole colour theme can be swapped by changing `data-theme` on <html>.
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const scale = (name) =>
  Object.fromEntries(shades.map((s) => [s, `rgb(var(--${name}-${s}) / <alpha-value>)`]))

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: scale('brand'),
        accent: scale('accent'),
        ink: 'rgb(var(--brand-900) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans Variable"', 'system-ui', 'sans-serif'],
        body: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      boxShadow: { card: '0 10px 30px -12px rgb(var(--brand-900) / 0.18)' },
      borderRadius: { xl2: 'var(--radius)' },
      maxWidth: { '7xl': '80rem' },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        reveal: 'reveal 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}

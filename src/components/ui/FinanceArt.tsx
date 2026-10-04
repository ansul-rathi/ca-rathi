// Layered finance illustration — pure SVG, colours follow the active theme.
const c = (v: string) => ({ fill: `rgb(var(--${v}))` })
const stop = (v: string) => ({ stopColor: `rgb(var(--${v}))` })

export function FinanceArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 420"
      className={className}
      role="img"
      aria-label="Illustration of financial charts and reports"
    >
      <defs>
        <linearGradient id="fa-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={stop('brand-600')} />
          <stop offset="1" style={stop('brand-800')} />
        </linearGradient>
        <linearGradient id="fa-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" style={stop('accent-400')} />
          <stop offset="1" style={stop('accent-200')} />
        </linearGradient>
      </defs>

      <circle cx="380" cy="80" r="70" style={c('accent-400')} opacity="0.18" />
      <circle cx="90" cy="330" r="90" style={c('brand-400')} opacity="0.18" />

      <rect x="60" y="70" width="300" height="220" rx="22" fill="url(#fa-card)" />
      <rect x="84" y="96" width="120" height="12" rx="6" style={c('brand-400')} opacity="0.7" />
      <rect x="84" y="116" width="80" height="10" rx="5" style={c('brand-400')} opacity="0.4" />

      <g>
        <rect x="92" y="220" width="34" height="40" rx="6" fill="url(#fa-bar)" />
        <rect x="138" y="196" width="34" height="64" rx="6" fill="url(#fa-bar)" />
        <rect x="184" y="168" width="34" height="92" rx="6" fill="url(#fa-bar)" />
        <rect x="230" y="206" width="34" height="54" rx="6" fill="url(#fa-bar)" />
        <rect x="276" y="150" width="34" height="110" rx="6" fill="url(#fa-bar)" />
      </g>

      <polyline
        points="92,200 138,176 184,150 230,160 276,128 322,108"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="322" cy="108" r="6" fill="#ffffff" />

      <g>
        <rect x="300" y="250" width="130" height="100" rx="18" fill="#ffffff" style={{ stroke: 'rgb(var(--brand-100))' }} />
        <circle cx="338" cy="300" r="22" fill="url(#fa-bar)" />
        <text
          x="338"
          y="307"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans Variable', sans-serif"
          fontWeight="800"
          fontSize="20"
          style={c('brand-700')}
        >
          ₹
        </text>
        <rect x="372" y="288" width="44" height="9" rx="4.5" style={c('brand-700')} opacity="0.85" />
        <rect x="372" y="304" width="34" height="8" rx="4" style={c('brand-700')} opacity="0.4" />
      </g>

      <g transform="translate(110,60)">
        <circle r="26" fill="#ffffff" style={{ stroke: 'rgb(var(--brand-100))' }} />
        <path d="M0 0 L0 -26 A26 26 0 0 1 22 13 Z" style={c('accent-400')} />
        <path d="M0 0 L22 13 A26 26 0 0 1 -18 18 Z" style={c('brand-400')} />
      </g>
    </svg>
  )
}

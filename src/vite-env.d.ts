/// <reference types="vite/client" />

// true = complete website; false = teaser (home page only). Set in vite.config.ts.
declare const __FULL_SITE__: boolean

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

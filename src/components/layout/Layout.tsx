import type { ReactNode } from 'react'
import { TopBar } from './TopBar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { DisclaimerModal } from './DisclaimerModal'
import { ThemeSwitcher } from './ThemeSwitcher'
import { MobileActionBar } from './MobileActionBar'
import { DemoGate } from './DemoGate'
import { SITE } from '@/config/site'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <a
        href="#main"
        className="sr-only z-[200] rounded-lg bg-brand-800 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <TopBar />
      <Navbar />
      <main id="main" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <MobileActionBar />
      {SITE.demoMode && <ThemeSwitcher />}
      <DisclaimerModal />
      {SITE.teaser.enabled && <DemoGate />}
    </div>
  )
}

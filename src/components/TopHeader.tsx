import { Phone } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Logo from './Logo'

const TopHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-14 rounded-3xl bg-gradient-to-br from-white/70 to-white/50 dark:from-navy/70 dark:to-navy/50 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(23,41,60,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          <div className="flex items-center justify-between h-full px-4">
            {/* Left: Call us */}
            <a href="tel:+61272299577" className="flex items-center gap-2 text-navy dark:text-white/80 text-xs hover:text-cyan transition-colors hidden md:flex">
              <Phone size={14} />
              <span>Call us</span>
            </a>

            {/* Center: Brand Logo */}
            <div className="flex-1 flex justify-center">
              <Logo />
            </div>

            {/* Right: theme toggle */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopHeader

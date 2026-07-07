import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="py-12 bg-white dark:bg-navy-dark border-t border-lightgray dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Logo + Contact Info */}
          <div className="space-y-6">
            <Logo />
            <div className="space-y-3">
              <a href="tel:+6172299577" className="flex items-center gap-3 text-navy/80 dark:text-white/80 text-sm hover:text-cyan transition-colors">
                <Phone size={16} className="text-cyan" />
                <span>+61 2 7229 9577</span>
              </a>
              <a href="tel:+61422512130" className="flex items-center gap-3 text-navy/80 dark:text-white/80 text-sm hover:text-cyan transition-colors">
                <Phone size={16} className="text-cyan" />
                <span>+61 422 512 130</span>
              </a>
              <a href="mailto:contact@clickbit.com" className="flex items-center gap-3 text-navy/80 dark:text-white/80 text-sm hover:text-cyan transition-colors">
                <Mail size={16} className="text-cyan" />
                <span>contact@clickbit.com</span>
              </a>
              <div className="flex items-start gap-3 text-navy/80 dark:text-white/80 text-sm">
                <MapPin size={16} className="text-cyan flex-shrink-0 mt-0.5" />
                <span>19 Drysdale Approach<br />Baldivis WA 6171<br />Australia</span>
              </div>
            </div>
          </div>

          {/* Right: Social Icons + Links */}
          <div className="flex flex-col items-end justify-between">
            <div className="flex gap-3">
              <a href="https://www.facebook.com/clickbitau/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-offwhite dark:bg-white/5 rounded-full border border-lightgray dark:border-white/10 flex items-center justify-center hover:border-cyan transition-colors">
                <Facebook size={18} className="text-navy dark:text-white" />
              </a>
              <a href="https://www.instagram.com/clickbitau/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-offwhite dark:bg-white/5 rounded-full border border-lightgray dark:border-white/10 flex items-center justify-center hover:border-cyan transition-colors">
                <Instagram size={18} className="text-navy dark:text-white" />
              </a>
              <a href="https://www.linkedin.com/company/clickbitau/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-offwhite dark:bg-white/5 rounded-full border border-lightgray dark:border-white/10 flex items-center justify-center hover:border-cyan transition-colors">
                <Linkedin size={18} className="text-navy dark:text-white" />
              </a>
              <a href="https://www.tiktok.com/@clickbitau" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-offwhite dark:bg-white/5 rounded-full border border-lightgray dark:border-white/10 flex items-center justify-center hover:border-cyan transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-navy dark:text-white">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-4 text-sm text-navy/60 dark:text-white/60">
              <a href="/privacy" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/privacy'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="hover:text-cyan transition-colors">
                Privacy
              </a>
              <span>·</span>
              <span>© 2026 Clickbit</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

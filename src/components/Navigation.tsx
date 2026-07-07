import ThemeToggle from './ThemeToggle'

const Navigation = () => {
  return (
    <nav className="bg-navy border-b border-navy">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="flex items-center">
            <img
              src="/img/logo (1).svg"
              alt="Dockbit"
              className="h-10 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/80 hover:text-cyan transition-colors text-sm">
              Features
            </a>
            <a href="#infrastructure" className="text-white/80 hover:text-cyan transition-colors text-sm">
              Infrastructure
            </a>
            <a href="#" className="text-white/80 hover:text-cyan transition-colors text-sm">
              Docs
            </a>
            <a href="#" className="text-white/80 hover:text-cyan transition-colors text-sm">
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-white/80 hover:text-cyan transition-colors text-sm hidden sm:block">
              Sign in
            </a>
            <button className="px-4 py-2 bg-cyan text-white text-sm font-semibold rounded-sm hover:bg-cyan/90 transition-colors">
              Get Started
            </button>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

import { ArrowRight, Rocket, Globe, RotateCcw, FileX } from 'lucide-react'

const MidPageCTA = () => {
  const stats = [
    { text: '155+ deployments tracked', icon: Rocket },
    { text: '3 regions', icon: Globe },
    { text: '1-click rollback', icon: RotateCcw },
    { text: '0 Dockerfiles needed', icon: FileX },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#17293c] relative overflow-hidden">
      {/* Radial Cyan glow from top left */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1ebbd4] opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-[60%_40%] gap-8 items-center">
          {/* Left Side: Hook & Action */}
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Ship your next deploy in under 2 minutes.
            </h2>

            <button className="group px-8 py-4 bg-[#f89c11] text-white font-semibold rounded-sm hover:bg-[#f89c11]/90 transition-all inline-flex items-center gap-2 relative overflow-hidden shadow-[0_0_0_rgba(248,156,17,0)] hover:shadow-[0_0_20px_rgba(248,156,17,0.3)] transition-shadow duration-300">
              {/* Inner shadow effect */}
              <span className="absolute inset-0 border-t border-white/20 rounded-sm pointer-events-none" />
              
              Get started free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Side: Trust Signals - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <Icon size={20} className="text-[#1ebbd4] flex-shrink-0" />
                  <span className="text-white/80 text-sm font-medium">
                    {stat.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MidPageCTA

import { Check, X, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import BreathingGlowBackground from './animations/BreathingGlowBackground'

const features = [
  { name: 'Deploy any stack', dokploy: true, dockbit: true },
  { name: 'Docker Compose support', dokploy: true, dockbit: true },
  { name: 'Built-in databases', dokploy: true, dockbit: true },
  { name: 'Multi-node clustering', dokploy: true, dockbit: true },
  { name: 'Auto SSL with Traefik', dokploy: true, dockbit: true },
  { name: 'Real-time monitoring', dokploy: true, dockbit: true },
  { name: 'Auto GitHub setup', dokploy: false, dockbit: true, highlight: true, description: 'Zero-config repo import' },
  { name: 'Tailscale VPN built-in', dokploy: false, dockbit: true, highlight: true, description: 'Private mesh networking' },
  { name: 'Cloudflare integration', dokploy: false, dockbit: true, highlight: true, description: 'Managed from dashboard' },
]

const ComparisonStrip = () => {

  return (
    <section className="py-16 md:py-24 bg-offwhite dark:bg-navy-dark relative">
      <BreathingGlowBackground />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-navy dark:text-white">
          Why Dockbit over Dokploy?
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto dark:text-white/60">
          Full feature parity, plus three things Dokploy doesn't do
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-lg shadow-window bg-white/80 backdrop-blur-xl border border-white/20 overflow-hidden dark:bg-navy/80 dark:border-white/10"
        >
          {/* Header Row */}
          <div className="grid grid-cols-3 border-b border-lightgray dark:border-white/10">
            <div className="p-4 md:p-6">
              <span className="text-gray-500 text-sm font-medium dark:text-white/50">Feature</span>
            </div>
            <div className="p-4 md:p-6 text-center">
              <span className="text-gray-500 text-sm font-medium dark:text-white/50">Dokploy</span>
            </div>
            <div className="p-4 md:p-6 text-center relative">
              <span className="text-cyan text-sm font-semibold pr-16 md:pr-20">Dockbit</span>
              <span className="absolute top-4 right-4 md:top-6 md:right-6 text-[10px] uppercase tracking-wider bg-cyan/10 text-cyan px-2 py-0.5 rounded-full font-medium">
                Recommended
              </span>
            </div>
          </div>

          {/* Feature Rows */}
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 border-b border-lightgray ${index % 2 === 0 ? 'bg-gray-50' : ''} dark:border-white/5 dark:bg-white/[0.03]`}
            >
              <div className="p-4 md:p-6">
                <span className={feature.highlight ? 'text-orange font-semibold' : 'text-gray-700 dark:text-white/80'}>
                  {feature.name}
                </span>
                {feature.description && (
                  <p className="text-gray-500 text-xs mt-1 dark:text-white/40">{feature.description}</p>
                )}
              </div>
              <div className="p-4 md:p-6 flex justify-center items-center">
                {feature.dokploy ? (
                  <div className="w-6 h-6 bg-cyan/10 rounded flex items-center justify-center">
                    <Check size={16} className="text-cyan" />
                  </div>
                ) : (
                  <X size={16} className="text-gray-300 dark:text-white/20" />
                )}
              </div>
              <div className="p-4 md:p-6 flex justify-center items-center">
                {feature.dockbit ? (
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${feature.highlight ? 'bg-orange/10' : 'bg-cyan/10'}`}>
                    <Check size={16} className={feature.highlight ? 'text-orange' : 'text-cyan'} />
                  </div>
                ) : (
                  <X size={16} className="text-gray-300 dark:text-white/20" />
                )}
              </div>
            </div>
          ))}

          {/* CTA Section */}
          <div className="p-6 md:p-8 text-center border-t border-lightgray dark:border-white/10">
            <p className="text-gray-500 text-sm mb-4 dark:text-white/50">See why teams switch from Dokploy</p>
            <button className="px-8 py-4 bg-orange text-white font-semibold rounded-sm hover:bg-orange/90 transition-colors inline-flex items-center gap-2">
              Try Dockbit Free
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ComparisonStrip

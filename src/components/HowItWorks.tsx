import { GitBranch, Server, LayoutDashboard } from 'lucide-react'
import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'

const SceneCanvas = lazy(() => import('./animations/three/SceneCanvas'))
const ParticleNetworkScene = lazy(() => import('./animations/three/ParticleNetworkScene'))

const steps = [
  {
    icon: GitBranch,
    title: 'Connect your repository',
    description: 'Link your GitHub repository. Dockbit automatically detects your stack and configures the build.',
  },
  {
    icon: Server,
    title: 'Deploy from Git or Docker',
    description: 'Push to your branch or use Docker Compose. Dockbit handles the rest automatically.',
  },
  {
    icon: LayoutDashboard,
    title: 'Manage from one dashboard',
    description: 'Monitor all your services, databases, and deployments from a single interface.',
  },
]

const HowItWorks = () => {

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-navy relative overflow-hidden">
      <Suspense fallback={null}>
        <SceneCanvas cameraPosition={[0, 0, 9]} fov={50}>
          {(ctx: { theme: string; isMobile: boolean; reducedMotion: boolean }) => (
            <ParticleNetworkScene {...ctx} accentRatio={0.12} maxDistance={2.6} />
          )}
        </SceneCanvas>
      </Suspense>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <p className="text-cyan text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-center">
          How it works
        </p>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-navy dark:text-white">
          Three steps to deployment
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50, rotateX: -20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
              style={{ transformStyle: 'preserve-3d', translateZ: `${index * 20}px` }}
            >
              <div className="relative bg-white/80 backdrop-blur-xl rounded-xl border border-white/40 p-6 shadow-lg hover:shadow-2xl hover:shadow-cyan/20 transition-all duration-300 dark:bg-navy/80 dark:border-white/20 dark:hover:shadow-cyan/30 group overflow-hidden">
                {/* Step number */}
                <div className="absolute top-4 right-4 text-6xl font-bold bg-gradient-to-br from-cyan/20 to-orange/20 bg-clip-text text-transparent opacity-50 select-none">
                  {index + 1}
                </div>
                
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan/20 to-cyan/10 rounded-xl flex items-center justify-center mb-4 border border-cyan/20 group-hover:from-cyan/30 group-hover:to-cyan/20 group-hover:border-cyan/40 transition-all duration-300">
                    <step.icon size={28} className="text-cyan" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-navy dark:text-white group-hover:text-cyan transition-colors">{step.title}</h3>
                  <p className="text-gray-600 text-sm dark:text-white/70 leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 text-cyan/30 z-10 ml-4"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.2 }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

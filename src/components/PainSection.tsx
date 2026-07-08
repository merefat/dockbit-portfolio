import React, { Suspense, useState } from 'react'
import { Terminal, FileWarning, EyeOff, Zap, FileCheck, BarChart3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
const SceneCanvas = React.lazy(() => import('./animations/three/SceneCanvas'))
const ChaosScene = React.lazy(() => import('./animations/three/ChaosScene'))
const OrderScene = React.lazy(() => import('./animations/three/OrderScene'))
const TerminalMonitor = React.lazy(() => import('./TerminalMonitor'))

const pains = [
  {
    icon: Terminal,
    title: 'SSH-ing into servers',
    description: 'Manual commands, no history, easy to make mistakes.',
  },
  {
    icon: FileWarning,
    title: 'Writing Dockerfiles by hand',
    description: 'Complex syntax, version conflicts, hard to debug.',
  },
  {
    icon: EyeOff,
    title: 'No visibility',
    description: 'What\'s running where? When did it last deploy?',
  },
]

const solutions = [
  {
    icon: Zap,
    title: 'One-click deploys',
    description: 'Push to git, and we handle the rest. Zero manual intervention.',
  },
  {
    icon: FileCheck,
    title: 'Auto-generated configs',
    description: 'We detect your stack and generate optimized Dockerfiles automatically.',
  },
  {
    icon: BarChart3,
    title: 'Full visibility dashboard',
    description: 'Real-time logs, deployment history, and health metrics in one place.',
  },
]

const PainSection = () => {
  const [activeView, setActiveView] = useState<'problem' | 'solution'>('problem')

  return (
    <section className="py-16 md:py-24 bg-offwhite dark:bg-navy-dark relative overflow-hidden">
      <Suspense fallback={null}>
        <SceneCanvas cameraPosition={[0, 0, 7]} fov={55}>
          {(ctx: { theme: string; isMobile: boolean; reducedMotion: boolean }) => (
            activeView === 'problem' ? <ChaosScene {...ctx} /> : <OrderScene {...ctx} />
          )}
        </SceneCanvas>
      </Suspense>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <p className="text-cyan text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-center">
          {activeView === 'problem' ? 'The Problem' : 'The Solution'}
        </p>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-navy dark:text-white">
          {activeView === 'problem' ? 'Manual deploys don\'t scale.' : 'Automated deploys that just work.'}
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            onClick={() => setActiveView('problem')}
            className={`px-6 py-3 rounded-sm font-semibold transition-all duration-300 ${
              activeView === 'problem'
                ? 'bg-cyan text-white shadow-lg shadow-cyan/30'
                : 'bg-white text-navy dark:bg-navy dark:text-white border border-navy/20 dark:border-white/20 hover:border-cyan/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Problem
          </motion.button>
          <motion.button
            onClick={() => setActiveView('solution')}
            className={`px-6 py-3 rounded-sm font-semibold transition-all duration-300 ${
              activeView === 'solution'
                ? 'bg-orange text-white shadow-lg shadow-orange/30'
                : 'bg-white text-navy dark:bg-navy dark:text-white border border-navy/20 dark:border-white/20 hover:border-orange/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solution
          </motion.button>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Content Cards */}
          <div className="space-y-6" style={{ perspective: '1000px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {(activeView === 'problem' ? pains : solutions).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotateX: -15, y: 40 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                    whileHover={{ rotateX: 4, rotateY: -4, transition: { duration: 0.2 } }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className={`flex items-start gap-4 p-6 rounded-md border shadow-card transition-colors ${
                      activeView === 'problem'
                        ? 'bg-white border-navy hover:border-cyan/30 dark:bg-navy dark:border-white/20'
                        : 'bg-white border-orange/30 hover:border-orange/50 dark:bg-navy dark:border-orange/30'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 ${
                      activeView === 'problem' ? 'bg-cyan/10' : 'bg-orange/10'
                    }`}>
                      <item.icon size={20} className={activeView === 'problem' ? 'text-cyan' : 'text-orange'} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-navy dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-white/60">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Terminal Monitor */}
          <div className="md:sticky md:top-8">
            <Suspense fallback={
              <div className="h-[400px] rounded-3xl bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10 animate-pulse" />
            }>
              <TerminalMonitor activeView={activeView} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PainSection

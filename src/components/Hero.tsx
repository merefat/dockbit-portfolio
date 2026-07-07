import { motion } from 'framer-motion'
import HeroAnimation from './HeroAnimation'
import GradientText from './GradientText'
import SceneCanvas from './animations/three/SceneCanvas'
import DataStreamScene from './animations/three/DataStreamScene'
import ErrorBoundary from './ErrorBoundary'

const Hero = () => {
  return (
    <section className="py-20 md:py-32 bg-offwhite dark:bg-navy-dark relative overflow-hidden">
      <ErrorBoundary>
        <SceneCanvas cameraPosition={[0, 3, 8]} fov={50}>
          {({ theme, isMobile, reducedMotion }) => (
            <DataStreamScene theme={theme} isMobile={isMobile} reducedMotion={reducedMotion} />
          )}
        </SceneCanvas>
      </ErrorBoundary>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p 
              className="text-cyan text-sm font-semibold tracking-[0.15em] uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Self-Hosted · Git-Native
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-navy dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Deploy from <span className="text-orange">GitHub</span>.<br />
              DockBit handles the rest.
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl font-semibold mb-6 text-navy dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <GradientText>We'll handle the infrastructure.</GradientText>
            </motion.p>
            
            <motion.p
              className="text-lg md:text-xl text-navy-light max-w-xl mb-8 dark:text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              Connect your repository and DockBit automatically detects your stack, configures deployment, provisions services, and keeps everything updated.
            </motion.p>
            
            <motion.button
              className="px-8 py-4 bg-cyan text-white font-semibold rounded-sm hover:bg-cyan/90 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Contact
            </motion.button>
          </div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeroAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

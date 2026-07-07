import { motion } from 'framer-motion'

const BreathingGlowBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Spotlight glow behind DockBit column */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-1/3"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(248, 156, 17, 0.12) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export default BreathingGlowBackground

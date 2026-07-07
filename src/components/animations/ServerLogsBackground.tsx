import { motion } from 'framer-motion'

const ServerLogsBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Navy depth background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(23, 41, 60, 0.03) 0%, transparent 60%)',
        }}
      />

      {/* Heavily blurred radiating waves from center */}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(30, 187, 212, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 10],
            opacity: [0.06, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: index * 2.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Additional subtle pulse waves */}
      {[0, 1].map((index) => (
        <motion.div
          key={`pulse-${index}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(30, 187, 212, 0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 8],
            opacity: [0.04, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatDelay: index * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export default ServerLogsBackground

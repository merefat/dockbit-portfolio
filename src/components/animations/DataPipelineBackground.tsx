import { motion } from 'framer-motion'

const DataPipelineBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Network of horizontal and diagonal lines - faint navy */}
        <g opacity={0.07}>
          {/* Main horizontal line */}
          <motion.path
            d="M 0 200 L 1200 200"
            stroke="#17293c"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Diagonal connections */}
          <motion.path
            d="M 200 200 L 400 150"
            stroke="#17293c"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
          />
          <motion.path
            d="M 400 150 L 600 200"
            stroke="#17293c"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
          />
          <motion.path
            d="M 600 200 L 800 250"
            stroke="#17293c"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
          />
          <motion.path
            d="M 800 250 L 1000 200"
            stroke="#17293c"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
          />
          
          {/* Secondary horizontal lines */}
          <motion.path
            d="M 0 150 L 400 150"
            stroke="#17293c"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
          />
          <motion.path
            d="M 600 200 L 1200 200"
            stroke="#17293c"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
        </g>

        {/* Data packets - cyan with every 4th being orange */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
          const isOrange = (index + 1) % 4 === 0
          const delay = index * 0.8
          
          return (
            <motion.circle
              key={index}
              r="5"
              fill={isOrange ? '#f89c11' : '#1ebbd4'}
              opacity={0.15}
              initial={{ cx: 0, cy: 200 }}
              whileInView={{
                cx: [0, 300, 600, 900, 1200],
                cy: [200, 180, 200, 220, 200],
              }}
              viewport={{ once: false }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatDelay: 0,
                delay: delay,
                ease: "linear",
              }}
            />
          )
        })}

        {/* Connection nodes at intersections */}
        {[200, 400, 600, 800, 1000].map((x, index) => (
          <motion.circle
            key={`node-${index}`}
            cx={x}
            cy={200}
            r="4"
            fill="#17293c"
            opacity={0.1}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
          />
        ))}
      </svg>
    </div>
  )
}

export default DataPipelineBackground

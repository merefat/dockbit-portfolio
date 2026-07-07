interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

const GradientText = ({ children, className = '' }: GradientTextProps) => {
  return (
    <span className={`bg-gradient-to-r from-cyan via-cyan to-orange bg-clip-text text-transparent drop-shadow-sm ${className}`}>
      {children}
    </span>
  )
}

export default GradientText

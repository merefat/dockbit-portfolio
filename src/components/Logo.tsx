import { useTheme } from '../context/ThemeContext'

interface LogoProps {
  className?: string
  iconSize?: number
  textSize?: string
  forceLight?: boolean
}

const Logo = ({ className = '', iconSize = 28, textSize = 'text-xl', forceLight = false }: LogoProps) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const useLightColors = forceLight || !isDark
  const barFill = useLightColors ? '#1B2A3B' : '#ffffff'
  const dockColor = useLightColors ? 'text-navy' : 'text-white'
  const bitColor = 'text-cyan'
  const tealStroke = useLightColors ? '#1ABCCD' : '#22D3EE'
  const yellowFill = '#F5C518'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Dockbit logo"
      >
        <rect x="7" y="5" width="11" height="44" rx="3.5" fill={barFill} />
        <path d="M18 5 Q50 5 50 27 Q50 49 18 49" fill="none" stroke={tealStroke} strokeWidth="11" strokeLinecap="butt" />
        <rect x="40" y="21.5" width="16" height="11" fill={yellowFill} />
        <path d="M49.5 21.5 Q52.5 27 49.5 32.5" fill="none" stroke={yellowFill} strokeWidth="11" strokeLinecap="butt" />
      </svg>
      <span className={`font-bold tracking-tight ${textSize} ${dockColor}`}>
        dock<span className={bitColor}>bit</span>
      </span>
    </div>
  )
}

export default Logo

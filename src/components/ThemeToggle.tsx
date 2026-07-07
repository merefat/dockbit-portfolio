import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-sm border border-lightgray dark:border-white/20 transition-colors hover:border-cyan/50 hover:bg-lightgray dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-navy" />
      ) : (
        <Sun size={20} className="text-white" />
      )}
    </button>
  )
}

export default ThemeToggle

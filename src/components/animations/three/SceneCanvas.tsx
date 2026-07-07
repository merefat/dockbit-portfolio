import { useRef, useState, useEffect, ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { useTheme } from '../../../context/ThemeContext'

type SceneChildren = ReactNode | ((ctx: { theme: string; isMobile: boolean; reducedMotion: boolean }) => ReactNode)

interface SceneCanvasProps {
  children: SceneChildren
  cameraPosition?: [number, number, number]
  fov?: number
}

const SceneCanvas = ({ children, cameraPosition = [0, 0, 8], fov = 50 }: SceneCanvasProps) => {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const bgColor = theme === 'dark' ? '#0d1b2a' : '#f5f7fa'

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {inView && (
        <Canvas
          camera={{ position: cameraPosition, fov }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
          frameloop={reducedMotion ? 'demand' : 'always'}
        >
          <fog attach="fog" args={[bgColor, 10, 25]} />
          {typeof children === 'function'
            ? children({ theme, isMobile, reducedMotion })
            : children}
        </Canvas>
      )}
    </div>
  )
}

export default SceneCanvas

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_POSITIONS: [number, number, number][] = [
  [-5, 0.5, 0],
  [-1.5, -0.8, 1],
  [2, 0.8, -0.5],
  [5.5, -0.3, 0.5],
]

const PipelineNode = ({ position, color, opacity }: { position: [number, number, number]; color: string; opacity: number }) => {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const scale = 1 + Math.sin(t * 2 + position[0]) * 0.15
    ref.current.scale.setScalar(scale)
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

const PipelineTube = ({ points, color, opacity }: { points: [number, number, number][]; color: string; opacity: number }) => {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), [points])
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.04, 8, false), [curve])
  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

const FlowingParticle = ({ curve, color, delay, reducedMotion }: { curve: THREE.CatmullRomCurve3; color: string; delay: number; reducedMotion: boolean }) => {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = reducedMotion ? 0.5 : ((state.clock.elapsedTime + delay) % 4) / 4
    const point = curve.getPointAt(t)
    ref.current.position.copy(point)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

interface PipelineSceneProps {
  theme: string
  isMobile: boolean
  reducedMotion: boolean
}

const PipelineScene = ({ theme, isMobile, reducedMotion }: PipelineSceneProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const cyan = '#1ebbd4'
  const orange = '#f89c11'
  const lineColor = theme === 'dark' ? '#1ebbd4' : '#17293c'

  const curve = useMemo(() => {
    const points = NODE_POSITIONS.map((p) => new THREE.Vector3(...p))
    return new THREE.CatmullRomCurve3(points)
  }, [])

  const particleCount = isMobile ? 6 : 12

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.1
  })

  return (
    <group ref={groupRef}>
      <PipelineTube points={NODE_POSITIONS} color={lineColor} opacity={0.12} />
      {NODE_POSITIONS.map((pos, i) => (
        <PipelineNode key={i} position={pos} color={cyan} opacity={0.15} />
      ))}
      {Array.from({ length: particleCount }, (_, i) => (
        <FlowingParticle
          key={i}
          curve={curve}
          color={(i + 1) % 4 === 0 ? orange : cyan}
          delay={i * (4 / particleCount)}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  )
}

export default PipelineScene

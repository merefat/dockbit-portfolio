import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ServerBoxProps {
  position: [number, number, number]
  color: string
  opacity: number
  pulsePhase: number
  reducedMotion: boolean
}

const ServerBox = ({ position, color, opacity, pulsePhase, reducedMotion }: ServerBoxProps) => {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current || reducedMotion) return
    const t = state.clock.elapsedTime
    const pulse = Math.sin(t * 1.5 + pulsePhase)
    if (pulse > 0.92) {
      ref.current.scale.setScalar(1 + (pulse - 0.92) * 2)
    } else {
      ref.current.scale.setScalar(1)
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.5, 0.8, 0.5]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  )
}

interface ServerGridSceneProps {
  theme: string
  isMobile: boolean
  reducedMotion: boolean
}

const ServerGridScene = ({ theme, isMobile, reducedMotion }: ServerGridSceneProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const cyan = '#1ebbd4'
  const baseColor = theme === 'dark' ? '#1ebbd4' : '#17293c'

  const boxes = useMemo(() => {
    const cols = isMobile ? 6 : 10
    const rows = isMobile ? 3 : 5
    const spacing = 1.2
    const result: { position: [number, number, number]; color: string; opacity: number; pulsePhase: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isPulse = Math.random() > 0.7
        result.push({
          position: [
            (c - cols / 2) * spacing,
            (r - rows / 2) * spacing - 1,
            -r * 1.5 - 1,
          ],
          color: isPulse ? cyan : baseColor,
          opacity: 0.04 + Math.random() * 0.06,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }
    return result
  }, [baseColor, cyan, isMobile])

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.08
    groupRef.current.position.y = Math.sin(t * 0.06) * 0.15
  })

  return (
    <group ref={groupRef} rotation={[-0.3, 0, 0]}>
      {boxes.map((box, i) => (
        <ServerBox key={i} {...box} reducedMotion={reducedMotion} />
      ))}
    </group>
  )
}

export default ServerGridScene

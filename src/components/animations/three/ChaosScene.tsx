import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ChaosCubeProps {
  position: [number, number, number]
  rotationSpeed: [number, number, number]
  scale: number
  color: string
  opacity: number
  reducedMotion: boolean
}

const ChaosCube = ({ position, rotationSpeed, scale, color, opacity, reducedMotion }: ChaosCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) return
    meshRef.current.rotation.x += rotationSpeed[0] * delta
    meshRef.current.rotation.y += rotationSpeed[1] * delta
    meshRef.current.rotation.z += rotationSpeed[2] * delta
    meshRef.current.position.y += Math.sin(Date.now() * 0.0005 + position[0]) * 0.002
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  )
}

interface ChaosSceneProps {
  theme: string
  isMobile: boolean
  reducedMotion: boolean
}

const ChaosScene = ({ theme, isMobile, reducedMotion }: ChaosSceneProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const color = theme === 'dark' ? '#1ebbd4' : '#17293c'

  const cubes = useMemo(() => {
    const count = isMobile ? 8 : 16
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      rotationSpeed: [
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.3,
      ] as [number, number, number],
      scale: 0.4 + Math.random() * 1.2,
      color: i % 4 === 0 ? '#f89c11' : color,
      opacity: 0.06 + Math.random() * 0.06,
    }))
  }, [color, isMobile])

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.15
    groupRef.current.position.x = Math.sin(t * 0.08) * 0.3
  })

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <ChaosCube key={i} {...cube} reducedMotion={reducedMotion} />
      ))}
    </group>
  )
}

export default ChaosScene

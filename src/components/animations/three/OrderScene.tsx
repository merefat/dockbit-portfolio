import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface OrderCubeProps {
  position: [number, number, number]
  delay: number
  color: string
  opacity: number
  reducedMotion: boolean
}

const OrderCube = ({ position, delay, color, opacity, reducedMotion }: OrderCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return
    const time = state.clock.getElapsedTime() + delay
    // Gentle, synchronized floating animation
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1
    // Subtle, uniform rotation
    meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.1
    meshRef.current.rotation.x = Math.cos(time * 0.2) * 0.05
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  )
}

interface OrderSceneProps {
  theme: string
  isMobile: boolean
  reducedMotion: boolean
}

const OrderScene = ({ theme, isMobile, reducedMotion }: OrderSceneProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const color = theme === 'dark' ? '#1ebbd4' : '#17293c'

  const cubes = useMemo(() => {
    const count = isMobile ? 8 : 16
    // Create organized grid pattern
    const gridSize = Math.ceil(Math.sqrt(count))
    const spacing = 1.5
    const offset = (gridSize * spacing) / 2
    
    return Array.from({ length: count }, (_, i) => {
      const row = Math.floor(i / gridSize)
      const col = i % gridSize
      return {
        position: [
          col * spacing - offset,
          row * spacing - offset * 0.5,
          -2,
        ] as [number, number, number],
        delay: i * 0.1,
        color: i % 4 === 0 ? '#f89c11' : color,
        opacity: 0.15 + Math.random() * 0.1,
      }
    })
  }, [color, isMobile])

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    // Gentle, slow rotation of entire group
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
  })

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <OrderCube key={i} {...cube} reducedMotion={reducedMotion} />
      ))}
    </group>
  )
}

export default OrderScene

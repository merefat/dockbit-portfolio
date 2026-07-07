import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GridMeshSceneProps {
  theme: string
  isMobile: boolean
  reducedMotion: boolean
}

const GridMeshScene = ({ theme, isMobile, reducedMotion }: GridMeshSceneProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Grid configuration
  const gridConfig = useMemo(() => ({
    segmentsX: isMobile ? 18 : 30,
    segmentsY: isMobile ? 12 : 20,
    spacing: isMobile ? 0.5 : 0.6,
  }), [isMobile])

  // Create grid geometry and colors
  const { pointGeometry, lineGeometry, initialPositions } = useMemo(() => {
    const { segmentsX, segmentsY, spacing } = gridConfig
    const pointCount = (segmentsX + 1) * (segmentsY + 1)
    
    // Point positions
    const positions = new Float32Array(pointCount * 3)
    const colors = new Float32Array(pointCount * 3)
    
    const cyan = new THREE.Color('#1ebbd4')
    const navy = new THREE.Color('#17293c')
    const orange = new THREE.Color('#f89c11')
    const baseColor = theme === 'dark' ? cyan : navy
    
    let index = 0
    for (let y = 0; y <= segmentsY; y++) {
      for (let x = 0; x <= segmentsX; x++) {
        positions[index * 3] = (x - segmentsX / 2) * spacing
        positions[index * 3 + 1] = 0
        positions[index * 3 + 2] = (y - segmentsY / 2) * spacing
        
        // Every ~10th point gets orange accent
        const isAccent = (x + y) % 10 === 0
        const color = isAccent ? orange : baseColor
        colors[index * 3] = color.r
        colors[index * 3 + 1] = color.g
        colors[index * 3 + 2] = color.b
        
        index++
      }
    }
    
    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    // Line geometry (grid lines)
    const linePositions: number[] = []
    for (let y = 0; y <= segmentsY; y++) {
      for (let x = 0; x < segmentsX; x++) {
        const i1 = y * (segmentsX + 1) + x
        const i2 = y * (segmentsX + 1) + x + 1
        linePositions.push(
          positions[i1 * 3], positions[i1 * 3 + 1], positions[i1 * 3 + 2],
          positions[i2 * 3], positions[i2 * 3 + 1], positions[i2 * 3 + 2]
        )
      }
    }
    for (let x = 0; x <= segmentsX; x++) {
      for (let y = 0; y < segmentsY; y++) {
        const i1 = y * (segmentsX + 1) + x
        const i2 = (y + 1) * (segmentsX + 1) + x
        linePositions.push(
          positions[i1 * 3], positions[i1 * 3 + 1], positions[i1 * 3 + 2],
          positions[i2 * 3], positions[i2 * 3 + 1], positions[i2 * 3 + 2]
        )
      }
    }
    
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))
    
    return { pointGeometry, lineGeometry, initialPositions: positions.slice() }
  }, [gridConfig, theme])

  // Mouse parallax
  useEffect(() => {
    if (isMobile || reducedMotion) return
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile, reducedMotion])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      // Tilted floor perspective
      groupRef.current.rotation.x = -1.2
      
      if (!reducedMotion) {
        // Slow sine-wave camera drift
        groupRef.current.position.y = Math.sin(time * 0.15) * 0.15
        groupRef.current.position.z = Math.sin(time * 0.1) * 0.1
        
        // Mouse parallax
        if (!isMobile) {
          groupRef.current.position.x = mousePos.x * 0.3
          groupRef.current.rotation.z = mousePos.y * 0.05
        }
      }
    }
    
    // Gentle vertex ripple
    if (pointsRef.current && !reducedMotion) {
      const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
      const positions = posAttr.array as Float32Array
      const { segmentsX, segmentsY } = gridConfig
      
      let index = 0
      for (let y = 0; y <= segmentsY; y++) {
        for (let x = 0; x <= segmentsX; x++) {
          const baseX = initialPositions[index * 3]
          const baseZ = initialPositions[index * 3 + 2]
          
          // Ripple effect from center
          const dist = Math.sqrt(baseX * baseX + baseZ * baseZ)
          const ripple = Math.sin(dist * 2 - time * 1.5) * 0.08 * Math.exp(-dist * 0.15)
          
          positions[index * 3 + 1] = ripple
          index++
        }
      }
      posAttr.needsUpdate = true
    }
    
    // Update line positions to match points
    if (linesRef.current && pointsRef.current && !reducedMotion) {
      const pointPos = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
      const linePos = linesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
      const { segmentsX, segmentsY } = gridConfig
      
      const pointPositions = pointPos.array as Float32Array
      const linePositions = linePos.array as Float32Array
      
      let lineIndex = 0
      // Horizontal lines
      for (let y = 0; y <= segmentsY; y++) {
        for (let x = 0; x < segmentsX; x++) {
          const i1 = y * (segmentsX + 1) + x
          const i2 = y * (segmentsX + 1) + x + 1
          linePositions[lineIndex++] = pointPositions[i1 * 3]
          linePositions[lineIndex++] = pointPositions[i1 * 3 + 1]
          linePositions[lineIndex++] = pointPositions[i1 * 3 + 2]
          linePositions[lineIndex++] = pointPositions[i2 * 3]
          linePositions[lineIndex++] = pointPositions[i2 * 3 + 1]
          linePositions[lineIndex++] = pointPositions[i2 * 3 + 2]
        }
      }
      // Vertical lines
      for (let x = 0; x <= segmentsX; x++) {
        for (let y = 0; y < segmentsY; y++) {
          const i1 = y * (segmentsX + 1) + x
          const i2 = (y + 1) * (segmentsX + 1) + x
          linePositions[lineIndex++] = pointPositions[i1 * 3]
          linePositions[lineIndex++] = pointPositions[i1 * 3 + 1]
          linePositions[lineIndex++] = pointPositions[i1 * 3 + 2]
          linePositions[lineIndex++] = pointPositions[i2 * 3]
          linePositions[lineIndex++] = pointPositions[i2 * 3 + 1]
          linePositions[lineIndex++] = pointPositions[i2 * 3 + 2]
        }
      }
      linePos.needsUpdate = true
    }
  })

  const pointOpacity = theme === 'dark' ? 0.7 : 0.5
  const lineOpacity = theme === 'dark' ? 0.25 : 0.15
  const lineColor = theme === 'dark' ? '#1ebbd4' : '#17293c'

  return (
    <group ref={groupRef}>
      {/* Points */}
      <points ref={pointsRef} geometry={pointGeometry}>
        <pointsMaterial
          size={isMobile ? 0.04 : 0.05}
          vertexColors
          transparent
          opacity={pointOpacity}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      
      {/* Grid lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={lineOpacity}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

export default GridMeshScene

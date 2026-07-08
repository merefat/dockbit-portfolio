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
  const pointUniformsRef = useRef<{ uTime: { value: number } } | null>(null)
  const lineUniformsRef = useRef<{ uTime: { value: number } } | null>(null)
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Grid configuration
  const gridConfig = useMemo(() => ({
    segmentsX: isMobile ? 18 : 30,
    segmentsY: isMobile ? 12 : 20,
    spacing: isMobile ? 0.5 : 0.6,
  }), [isMobile])

  // Create grid geometry and colors
  const { pointGeometry, lineGeometry } = useMemo(() => {
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
    
    return { pointGeometry, lineGeometry }
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

  const pointOpacity = theme === 'dark' ? 0.7 : 0.5
  const lineOpacity = theme === 'dark' ? 0.25 : 0.15
  const lineColor = theme === 'dark' ? '#1ebbd4' : '#17293c'

  const pointMaterial = useMemo(() => {
    const mat = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: pointOpacity,
      sizeAttenuation: true,
      depthWrite: false,
    })
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 }
      shader.uniforms.uRippleStrength = { value: reducedMotion ? 0 : 1 }
      shader.vertexShader = 'uniform float uTime;\nuniform float uRippleStrength;\n' + shader.vertexShader
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         float distFromCenter = length(transformed.xz);
         transformed.y = sin(distFromCenter * 2.0 - uTime * 1.5) * 0.08 * exp(-distFromCenter * 0.15) * uRippleStrength;`
      )
      pointUniformsRef.current = shader.uniforms as { uTime: { value: number } }
    }
    return mat
  }, [pointOpacity, isMobile, reducedMotion])

  const lineMaterial = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: lineOpacity,
      depthWrite: false,
    })
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 }
      shader.uniforms.uRippleStrength = { value: reducedMotion ? 0 : 1 }
      shader.vertexShader = 'uniform float uTime;\nuniform float uRippleStrength;\n' + shader.vertexShader
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         float distFromCenter = length(transformed.xz);
         transformed.y = sin(distFromCenter * 2.0 - uTime * 1.5) * 0.08 * exp(-distFromCenter * 0.15) * uRippleStrength;`
      )
      lineUniformsRef.current = shader.uniforms as { uTime: { value: number } }
    }
    return mat
  }, [lineColor, lineOpacity, reducedMotion])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (pointUniformsRef.current) {
      pointUniformsRef.current.uTime.value = time
    }
    if (lineUniformsRef.current) {
      lineUniformsRef.current.uTime.value = time
    }

    if (groupRef.current) {
      groupRef.current.rotation.x = -1.2

      if (!reducedMotion) {
        groupRef.current.position.y = Math.sin(time * 0.15) * 0.15
        groupRef.current.position.z = Math.sin(time * 0.1) * 0.1

        if (!isMobile) {
          groupRef.current.position.x = mousePos.x * 0.3
          groupRef.current.rotation.z = mousePos.y * 0.05
        }
      }
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={pointGeometry}>
        <primitive object={pointMaterial} attach="material" />
      </points>

      <lineSegments geometry={lineGeometry}>
        <primitive object={lineMaterial} attach="material" />
      </lineSegments>
    </group>
  )
}

export default GridMeshScene

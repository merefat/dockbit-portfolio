import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BOUNDS: [number, number, number] = [14, 7, 5]

class SpatialHashGrid {
  private cellSize: number
  private cells: Map<number, number[]>

  constructor(cellSize: number) {
    this.cellSize = cellSize
    this.cells = new Map()
  }

  private hash(cx: number, cy: number, cz: number): number {
    return cx * 73856093 ^ cy * 19349663 ^ cz * 83492791
  }

  clear() {
    this.cells.clear()
  }

  insert(index: number, x: number, y: number, z: number) {
    const cx = Math.floor(x / this.cellSize)
    const cy = Math.floor(y / this.cellSize)
    const cz = Math.floor(z / this.cellSize)
    const key = this.hash(cx, cy, cz)
    let bucket = this.cells.get(key)
    if (!bucket) {
      bucket = []
      this.cells.set(key, bucket)
    }
    bucket.push(index)
  }

  queryNeighbors(x: number, y: number, z: number): number[] {
    const cx = Math.floor(x / this.cellSize)
    const cy = Math.floor(y / this.cellSize)
    const cz = Math.floor(z / this.cellSize)
    const result: number[] = []
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const bucket = this.cells.get(this.hash(cx + dx, cy + dy, cz + dz))
          if (bucket) {
            for (let k = 0; k < bucket.length; k++) {
              result.push(bucket[k])
            }
          }
        }
      }
    }
    return result
  }
}

const lineVertexShader = `
attribute float aAlpha;
varying float vAlpha;
void main() {
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const lineFragmentShader = `
uniform vec3 uColor;
varying float vAlpha;
void main() {
  gl_FragColor = vec4(uColor, vAlpha);
}
`

interface ParticleNetworkSceneProps {
  theme: string
  isMobile: boolean
  reducedMotion: boolean
  count?: number
  maxDistance?: number
  accentRatio?: number
  speed?: number
}

const ParticleNetworkScene = ({
  theme,
  isMobile,
  reducedMotion,
  count,
  maxDistance = 2.8,
  accentRatio = 0.15,
  speed = 1,
}: ParticleNetworkSceneProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)

  const particleCount = count ?? (isMobile ? 45 : 90)
  const maxSegments = particleCount * 8
  const lineColor = theme === 'dark' ? '#1ebbd4' : '#17293c'
  const lineAlphaScale = theme === 'dark' ? 0.32 : 0.18

  const { velocities, pointGeometry } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const cyan = new THREE.Color('#1ebbd4')
    const orange = new THREE.Color('#f89c11')
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS[0]
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS[1]
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS[2]
      velocities[i * 3] = (Math.random() - 0.5) * 0.35
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.35
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2
      const color = Math.random() < accentRatio ? orange : cyan
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return { velocities, pointGeometry }
  }, [particleCount, accentRatio])

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxSegments * 6), 3))
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(maxSegments * 2), 1))
    geo.setDrawRange(0, 0)
    return geo
  }, [maxSegments])

  const lineMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(lineColor) } },
        vertexShader: lineVertexShader,
        fragmentShader: lineFragmentShader,
        transparent: true,
        depthWrite: false,
      }),
    [lineColor]
  )

  const grid = useMemo(() => new SpatialHashGrid(maxDistance), [maxDistance])

  useFrame((state, delta) => {
    const points = pointsRef.current
    if (!points) return
    const posAttr = points.geometry.getAttribute('position') as THREE.BufferAttribute
    const positions = posAttr.array as Float32Array

    if (!reducedMotion) {
      const dt = Math.min(delta, 0.05) * speed
      for (let i = 0; i < particleCount; i++) {
        for (let axis = 0; axis < 3; axis++) {
          const idx = i * 3 + axis
          positions[idx] += velocities[idx] * dt
          const limit = BOUNDS[axis] / 2
          if (positions[idx] > limit || positions[idx] < -limit) {
            velocities[idx] *= -1
            positions[idx] = THREE.MathUtils.clamp(positions[idx], -limit, limit)
          }
        }
      }
      posAttr.needsUpdate = true

      if (groupRef.current) {
        const t = state.clock.elapsedTime
        groupRef.current.rotation.y = Math.sin(t * 0.06) * 0.08
        groupRef.current.position.y = Math.sin(t * 0.1) * 0.2
      }
    }

    const linePos = lineGeometry.getAttribute('position') as THREE.BufferAttribute
    const lineAlpha = lineGeometry.getAttribute('aAlpha') as THREE.BufferAttribute
    const lp = linePos.array as Float32Array
    const la = lineAlpha.array as Float32Array

    grid.clear()
    for (let i = 0; i < particleCount; i++) {
      grid.insert(i, positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
    }

    let segIndex = 0
    const maxDistSq = maxDistance * maxDistance
    for (let i = 0; i < particleCount && segIndex < maxSegments; i++) {
      const ix = positions[i * 3]
      const iy = positions[i * 3 + 1]
      const iz = positions[i * 3 + 2]
      const neighbors = grid.queryNeighbors(ix, iy, iz)
      for (let k = 0; k < neighbors.length && segIndex < maxSegments; k++) {
        const j = neighbors[k]
        if (j <= i) continue
        const dx = ix - positions[j * 3]
        const dy = iy - positions[j * 3 + 1]
        const dz = iz - positions[j * 3 + 2]
        const distSq = dx * dx + dy * dy + dz * dz
        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq)
          const alpha = (1 - dist / maxDistance) * lineAlphaScale
          const base = segIndex * 6
          lp[base] = ix
          lp[base + 1] = iy
          lp[base + 2] = iz
          lp[base + 3] = positions[j * 3]
          lp[base + 4] = positions[j * 3 + 1]
          lp[base + 5] = positions[j * 3 + 2]
          la[segIndex * 2] = alpha
          la[segIndex * 2 + 1] = alpha
          segIndex++
        }
      }
    }
    lineGeometry.setDrawRange(0, segIndex * 2)
    linePos.needsUpdate = true
    lineAlpha.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointGeometry}>
        <pointsMaterial
          size={0.09}
          vertexColors
          transparent
          opacity={theme === 'dark' ? 0.75 : 0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={lineGeometry} material={lineMaterial} />
    </group>
  )
}

export default ParticleNetworkScene

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const gridVertexShader = `
uniform float uTime;
uniform float uWaveHeight;
uniform float uWaveFreq;
uniform float uSpeed;
varying vec2 vUv;
varying float vElevation;
varying float vDistFromCenter;

void main() {
  vUv = uv;
  vec3 pos = position;

  float wave1 = sin(pos.x * uWaveFreq + uTime * uSpeed) * cos(pos.y * uWaveFreq * 0.8 + uTime * uSpeed * 0.7);
  float wave2 = sin(pos.x * uWaveFreq * 0.5 - uTime * uSpeed * 0.6) * 0.5;
  float elevation = (wave1 + wave2) * uWaveHeight;
  pos.z += elevation;

  vElevation = elevation;
  vDistFromCenter = length(pos.xy);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const gridFragmentShader = `
uniform vec3 uColor;
uniform vec3 uAccentColor;
uniform float uOpacity;
uniform float uGridSize;
uniform float uFadeStart;
uniform float uFadeEnd;
varying vec2 vUv;
varying float vElevation;
varying float vDistFromCenter;

float gridLine(float coord, float width) {
  float l = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  return 1.0 - min(l * width, 1.0);
}

void main() {
  float gx = gridLine(vUv.x * uGridSize, 1.0);
  float gy = gridLine(vUv.y * uGridSize, 1.0);
  float grid = max(gx, gy);

  float distFade = 1.0 - smoothstep(uFadeStart, uFadeEnd, vDistFromCenter);

  float elevationGlow = smoothstep(0.3, 1.0, abs(vElevation));
  vec3 color = mix(uColor, uAccentColor, elevationGlow * 0.6);

  float alpha = grid * uOpacity * distFade;
  gl_FragColor = vec4(color, alpha);
}
`

const pulseVertexShader = `
attribute float aProgress;
attribute float aOffset;
attribute vec3 aColor;
uniform float uTime;
uniform float uSpeed;
uniform float uGridWidth;
uniform float uGridDepth;
uniform float uWaveHeight;
uniform float uWaveFreq;
uniform float uPulseSpeed;
varying float vAlpha;
varying vec3 vColor;

float waveElev(float x, float y, float t) {
  float w1 = sin(x * uWaveFreq + t * uSpeed) * cos(y * uWaveFreq * 0.8 + t * uSpeed * 0.7);
  float w2 = sin(x * uWaveFreq * 0.5 - t * uSpeed * 0.6) * 0.5;
  return (w1 + w2) * uWaveHeight;
}

void main() {
  vColor = aColor;
  float progress = fract(aProgress + uTime * uPulseSpeed * aOffset);
  float x = (progress - 0.5) * uGridWidth;
  float y = (aOffset - 0.5) * uGridDepth;
  float z = waveElev(x, y, uTime) + 0.05;

  vec3 pos = vec3(x, y, z);
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float distFade = 1.0 - smoothstep(8.0, 16.0, length(pos.xy));
  vAlpha = distFade * 0.9;
  gl_PointSize = (12.0 / -mvPosition.z) * (0.8 + sin(uTime * 3.0 + aProgress * 10.0) * 0.2);
}
`

const pulseFragmentShader = `
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);
  float glow = 1.0 - smoothstep(0.0, 0.5, dist);
  float core = 1.0 - smoothstep(0.0, 0.15, dist);
  float alpha = (glow * 0.4 + core * 0.6) * vAlpha;
  gl_FragColor = vec4(vColor, alpha);
}
`

interface DataStreamSceneProps {
  theme: string
  isMobile: boolean
  reducedMotion: boolean
}

const DataStreamScene = ({ theme, isMobile, reducedMotion }: DataStreamSceneProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const gridMatRef = useRef<THREE.ShaderMaterial>(null)
  const pulseMatRef = useRef<THREE.ShaderMaterial>(null)

  const isDark = theme === 'dark'
  const gridColor = isDark ? '#1ebbd4' : '#17293c'
  const accentColor = '#f89c11'
  const gridOpacity = isDark ? 0.28 : 0.14
  const pulseOpacity = isDark ? 0.9 : 0.6

  const gridSegments = isMobile ? 40 : 80
  const gridSize = isMobile ? 18 : 28
  const gridWidth = gridSize
  const gridDepth = gridSize * 0.7
  const waveHeight = isMobile ? 0.5 : 0.8
  const waveFreq = 0.35
  const waveSpeed = reducedMotion ? 0 : 0.6
  const pulseCount = isMobile ? 30 : 60
  const pulseSpeed = reducedMotion ? 0 : 0.12

  const gridGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(gridWidth, gridDepth, gridSegments, Math.floor(gridSegments * 0.7))
    geo.rotateX(-Math.PI / 2)
    return geo
  }, [gridWidth, gridDepth, gridSegments])

  const gridMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(gridColor) },
          uAccentColor: { value: new THREE.Color(accentColor) },
          uOpacity: { value: gridOpacity },
          uWaveHeight: { value: waveHeight },
          uWaveFreq: { value: waveFreq },
          uSpeed: { value: waveSpeed },
          uGridSize: { value: gridSegments },
          uFadeStart: { value: gridSize * 0.3 },
          uFadeEnd: { value: gridSize * 0.65 },
        },
        vertexShader: gridVertexShader,
        fragmentShader: gridFragmentShader,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [gridColor, accentColor, gridOpacity, waveHeight, waveFreq, waveSpeed, gridSegments, gridSize]
  )

  const pulseGeometry = useMemo(() => {
    const positions = new Float32Array(pulseCount * 3)
    const progress = new Float32Array(pulseCount)
    const offsets = new Float32Array(pulseCount)
    const colors = new Float32Array(pulseCount * 3)
    const cyan = new THREE.Color('#1ebbd4')
    const orange = new THREE.Color('#f89c11')
    for (let i = 0; i < pulseCount; i++) {
      progress[i] = Math.random()
      offsets[i] = Math.random()
      const c = Math.random() < 0.2 ? orange : cyan
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aProgress', new THREE.BufferAttribute(progress, 1))
    geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1))
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [pulseCount])

  const pulseMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: waveSpeed },
          uGridWidth: { value: gridWidth },
          uGridDepth: { value: gridDepth },
          uWaveHeight: { value: waveHeight },
          uWaveFreq: { value: waveFreq },
          uPulseSpeed: { value: pulseSpeed },
          uOpacity: { value: pulseOpacity },
        },
        vertexShader: pulseVertexShader,
        fragmentShader: pulseFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [waveSpeed, gridWidth, gridDepth, waveHeight, waveFreq, pulseSpeed, pulseOpacity]
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (gridMatRef.current) {
      gridMatRef.current.uniforms.uTime.value = t
    }
    if (pulseMatRef.current) {
      pulseMatRef.current.uniforms.uTime.value = t
    }
    if (groupRef.current && !reducedMotion) {
      groupRef.current.position.y = Math.sin(t * 0.1) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      <mesh geometry={gridGeometry}>
        <primitive object={gridMaterial} ref={gridMatRef} attach="material" />
      </mesh>
      <points geometry={pulseGeometry}>
        <primitive object={pulseMaterial} ref={pulseMatRef} attach="material" />
      </points>
    </group>
  )
}

export default DataStreamScene

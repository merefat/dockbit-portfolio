import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'

// Data Block Component - represents server containers
const DataBlock = ({ position, color, delay = 0 }: { position: [number, number, number], color: string, delay?: number }) => {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (mesh.current) {
      // Breathing/pulse animation
      const time = state.clock.getElapsedTime() + delay
      const scale = 1 + Math.sin(time * 2) * 0.05
      mesh.current.scale.setScalar(scale)
      
      // Subtle rotation
      mesh.current.rotation.y = Math.sin(time * 0.5) * 0.1
      mesh.current.rotation.x = Math.cos(time * 0.3) * 0.05
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={mesh}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

// Globe Component - for "3 regions" stat
const Globe = ({ position }: { position: [number, number, number] }) => {
  const mesh = useRef<THREE.Mesh>(null)
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005
    }
  })

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#1ebbd4"
          transparent
          opacity={0.6}
          emissive="#1ebbd4"
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        3 Regions
      </Text>
    </group>
  )
}

// Switch Component - for "1-click rollback" stat
const Switch = ({ position }: { position: [number, number, number] }) => {
  const switchRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (switchRef.current) {
      const time = state.clock.getElapsedTime()
      switchRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1
    }
  })

  return (
    <group ref={switchRef} position={position}>
      <mesh>
        <boxGeometry args={[1.5, 0.4, 0.6]} />
        <meshStandardMaterial color="#17293c" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.4, 0, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#1ebbd4" emissive="#1ebbd4" emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        1-Click Rollback
      </Text>
    </group>
  )
}

// Counter Component - for "155+ deployments" stat
const Counter = ({ position }: { position: [number, number, number] }) => {
  const [count, setCount] = useState(0)
  const meshRef = useRef<THREE.Mesh>(null)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 155) return 155
        return prev + 1
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.z = Math.sin(time * 3) * 0.1
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.2, 1.2, 0.3]} />
        <meshStandardMaterial
          color="#f89c11"
          transparent
          opacity={0.8}
          emissive="#f89c11"
          emissiveIntensity={0.3}
        />
      </mesh>
      <Text
        position={[0, 0, 0.2]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {count}+
      </Text>
      <Text
        position={[0, -0.9, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Deployments
      </Text>
    </group>
  )
}

// File Icon Component - for "0 Dockerfiles needed" stat
const FileIcon = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.8, 1, 0.1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Cross-out symbol */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[1.2, 0.15, 0.05]} />
        <meshStandardMaterial color="#f89c11" emissive="#f89c11" emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        0 Dockerfiles
      </Text>
    </group>
  )
}

// Data Pipeline Line - connects button to 3D scene
const DataPipeline = ({ active }: { active: boolean }) => {
  const lineRef = useRef<THREE.Mesh>(null)
  
  useFrame(() => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.MeshStandardMaterial
      material.opacity = active ? 0.8 : 0.1
      material.emissiveIntensity = active ? 1 : 0.2
    }
  })

  return (
    <mesh ref={lineRef} position={[2, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
      <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
      <meshStandardMaterial
        color="#f89c11"
        transparent
        opacity={0.1}
        emissive="#f89c11"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// Main 3D Scene
const Scene3D = ({ isHovering }: { isHovering: boolean }) => {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation of entire scene
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
      
      // Faster rotation when hovering
      if (isHovering) {
        groupRef.current.rotation.y += 0.02
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* Data Farm - isometric arrangement of blocks */}
      <DataBlock position={[0, 0, 0]} color="#1ebbd4" delay={0} />
      <DataBlock position={[1.2, 0.5, 0]} color="#1ebbd4" delay={0.5} />
      <DataBlock position={[-1.2, 0.3, 0.5]} color="#1ebbd4" delay={1} />
      <DataBlock position={[0.6, 1, -0.8]} color="#1ebbd4" delay={1.5} />
      <DataBlock position={[-0.6, -0.5, 1]} color="#1ebbd4" delay={2} />
      <DataBlock position={[1.5, -0.3, 0.6]} color="#1ebbd4" delay={2.5} />
      <DataBlock position={[-1.5, 0.8, -0.3]} color="#1ebbd4" delay={3} />
      
      {/* Secondary blocks for depth */}
      <DataBlock position={[0.3, 1.5, 0.3]} color="#0f8a9e" delay={0.3} />
      <DataBlock position={[-0.8, -1, -0.5]} color="#0f8a9e" delay={0.8} />
      
      {/* Stats integrated into scene */}
      <Globe position={[2.5, 1.5, 0]} />
      <Switch position={[2.5, 0, 1]} />
      <Counter position={[2.5, -1.5, 0]} />
      <FileIcon position={[2.5, -0.5, -1]} />
      
      {/* Data pipeline - visible when hovering */}
      <DataPipeline active={isHovering} />
    </group>
  )
}

// Main Hero3D Component
const Hero3D = () => {
  const [isHovering, setIsHovering] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsHovering(true)
    // GSAP animation for button
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        boxShadow: '0 0 30px rgba(248, 156, 17, 0.6)',
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        boxShadow: '0 4px 15px rgba(248, 156, 17, 0.3)',
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-navy-dark dark:to-slate-900 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan/10 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-navy/10 blur-3xl rounded-full -z-10" />
      
      {/* Main Command Console Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto px-4 py-12"
      >
        {/* Glassmorphism Command Console */}
        <div className="relative rounded-3xl bg-gradient-to-br from-white/70 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] overflow-hidden">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan/20 via-transparent to-orange/20 -z-10" />
          
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-between z-10">
              <div>
                <p className="text-cyan text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                  Automated Infrastructure Command Console
                </p>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-navy dark:text-white">
                  Ship your next deploy in under 2 minutes.
                </h1>
                
                <p className="text-lg text-navy-light dark:text-white/70 mb-8 max-w-md">
                  Connect your repository and DockBit automatically detects your stack, configures deployment, and provisions services.
                </p>
              </div>
              
              <button
                ref={buttonRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="px-8 py-4 bg-orange text-white font-semibold rounded-sm hover:bg-orange/90 transition-all duration-300 shadow-[0_4px_15px_rgba(248,156,17,0.3)] w-fit"
                style={{ boxShadow: '0 4px 15px rgba(248, 156, 17, 0.3)' }}
              >
                Get Started
              </button>
            </div>
            
            {/* Right Side - 3D Scene */}
            <div className="relative h-[400px] md:h-[500px]">
              <Canvas
                shadows
                camera={{ position: [5, 3, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
              >
                <PerspectiveCamera makeDefault position={[5, 3, 5]} />
                <Environment preset="city" background={false} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#1ebbd4" />
                <pointLight position={[5, -5, 5]} intensity={0.3} color="#f89c11" />
                
                <Scene3D isHovering={isHovering} />
                
                <ContactShadows
                  position={[0, -2, 0]}
                  opacity={0.3}
                  scale={10}
                  blur={2.5}
                  far={4}
                  color="#17293c"
                />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero3D

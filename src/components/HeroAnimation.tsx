import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Github, Gitlab, Server } from 'lucide-react'

const HeroAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const sourceNodeRefs = useRef<(SVGGElement | null)[]>([])
  const lineRefs = useRef<(SVGLineElement | null)[]>([])
  const pulseDotRefs = useRef<(SVGCircleElement | null)[]>([])
  const serverNodeRef = useRef<SVGGElement>(null)
  const serverFillRef = useRef<SVGCircleElement>(null)
  const badgeGroupRef = useRef<SVGGElement>(null)
  const checkmarkRef = useRef<SVGPathElement>(null)
  const badgeGlowRef = useRef<SVGCircleElement>(null)
  const deployedCaptionRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Hub-and-spoke coordinates
    const CENTER = { x: 240, y: 160 }
    const DISTANCE = 110

    // Source positions (X pattern around center)
    const sources = [
      { x: CENTER.x - DISTANCE, y: CENTER.y - DISTANCE }, // GitHub: top-left
      { x: CENTER.x + DISTANCE, y: CENTER.y - DISTANCE }, // GitLab: top-right
      { x: CENTER.x - DISTANCE, y: CENTER.y + DISTANCE }, // Bitbucket: bottom-left
      { x: CENTER.x + DISTANCE, y: CENTER.y + DISTANCE }, // Azure: bottom-right
    ]

    // Initial state
    gsap.set(sourceNodeRefs.current, { opacity: 0, scale: 0.8, transformOrigin: 'center center' })
    gsap.set(serverNodeRef.current, { opacity: 0 })
    gsap.set(lineRefs.current, { opacity: 0 })
    gsap.set(pulseDotRefs.current, { opacity: 0 })
    gsap.set(badgeGroupRef.current, { opacity: 0, scale: 0, transformOrigin: 'center center' })
    gsap.set(badgeGlowRef.current, { opacity: 0 })
    gsap.set(deployedCaptionRef.current, { opacity: 0 })
    gsap.set(serverFillRef.current, { opacity: 0 })

    // Prepare lines for draw-in
    lineRefs.current.forEach((line) => {
      if (line) {
        const len = Math.sqrt(Math.pow(CENTER.x - sources[0].x, 2) + Math.pow(CENTER.y - sources[0].y, 2))
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
      }
    })

    // Play-once timeline with loop
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      repeat: -1,
      repeatDelay: 1.5
    })

    // 1. Server fades in first (hub anchor)
    tl.to(serverNodeRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    })

    // 2. Sources fade in around it, staggered 60ms
    tl.to(sourceNodeRefs.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: 0.06,
      ease: 'power2.out'
    }, '-=0.2')

    // 3. All four lines draw toward center simultaneously (80ms wave stagger)
    tl.to(lineRefs.current, {
      strokeDashoffset: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.inOut'
    }, '+=0.1')

    // 4. Four pulse dots converge on server at once
    tl.to(pulseDotRefs.current, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.08
    }, '-=0.4')

    sources.forEach((_, i) => {
      const dot = pulseDotRefs.current[i]
      if (!dot) return
      tl.to(dot, {
        attr: { cx: CENTER.x, cy: CENTER.y },
        duration: 0.5,
        ease: 'power2.inOut'
      }, '-=0.5')
    })

    tl.to(pulseDotRefs.current, {
      opacity: 0,
      duration: 0.1,
      stagger: 0.02
    }, '>-0.05')

    // 5. Server completes on arrival
    tl.to(serverFillRef.current, {
      opacity: 1,
      duration: 0.3
    }, '-=0.1')

    tl.to(badgeGroupRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.5)'
    }, '-=0.1')

    tl.to(checkmarkRef.current, {
      strokeDashoffset: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.2')

    tl.to(badgeGlowRef.current, {
      opacity: 0.3,
      duration: 0.3
    }, '-=0.2')
    tl.to(badgeGlowRef.current, {
      opacity: 0.15,
      duration: 0.5,
      ease: 'sine.out'
    })

    tl.to(deployedCaptionRef.current, {
      opacity: 1,
      duration: 0.3
    }, '-=0.4')

    // 6. Hold before reset
    tl.to({}, { duration: 1.5 })

    // 7. Reset all elements for next loop
    tl.to(deployedCaptionRef.current, {
      opacity: 0,
      duration: 0.3
    })

    tl.to(badgeGroupRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.3
    }, '<')

    tl.to(badgeGlowRef.current, {
      opacity: 0,
      duration: 0.3
    }, '<')

    tl.to(serverFillRef.current, {
      opacity: 0,
      duration: 0.3
    }, '<')

    tl.to(lineRefs.current, {
      strokeDashoffset: () => {
        const len = Math.sqrt(Math.pow(CENTER.x - sources[0].x, 2) + Math.pow(CENTER.y - sources[0].y, 2))
        return len
      },
      duration: 0.3
    }, '<')

    tl.to(sourceNodeRefs.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      stagger: 0.05
    }, '<')

    tl.to(serverNodeRef.current, {
      opacity: 0,
      duration: 0.3
    }, '<')

    // End state holds

    return () => {
      tl.kill()
    }
  }, [])

  // Source positions (X pattern)
  const CENTER = { x: 240, y: 160 }
  const DISTANCE = 110
  const sources = [
    { x: CENTER.x - DISTANCE, y: CENTER.y - DISTANCE },
    { x: CENTER.x + DISTANCE, y: CENTER.y - DISTANCE },
    { x: CENTER.x - DISTANCE, y: CENTER.y + DISTANCE },
    { x: CENTER.x + DISTANCE, y: CENTER.y + DISTANCE },
  ]

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative" style={{ perspective: '1000px' }}>
      {/* Ambient gradient blobs behind glass */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-cyan/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-navy/10 blur-3xl rounded-full -z-10" />

      {/* Modern glassmorphism panel */}
      <div
        className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-white/60 to-white/30 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(23,41,60,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] p-4"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 480 320"
          className="w-full h-full"
          style={{ transform: 'rotateX(10deg)', transformStyle: 'preserve-3d' }}
        >
          <defs>
            {/* Soft glow filter */}
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Multi-layer shadow for depth */}
            <filter id="depthShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.15" />
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.1" />
            </filter>

            {/* Radial gradient for nodes - light mode */}
            <radialGradient id="nodeGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </radialGradient>

            {/* Radial gradient for nodes - dark mode */}
            <radialGradient id="nodeGradientDark" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>

            {/* Faint dot grid pattern */}
            <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#17293c" opacity="0.03" />
            </pattern>

            {/* Subtle radial highlight behind server */}
            <radialGradient id="hubHighlight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1ebbd4" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#1ebbd4" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Dot grid background */}
          <rect x="0" y="0" width="480" height="320" fill="url(#dotGrid)" />

          {/* Hub highlight behind server */}
          <circle cx={CENTER.x} cy={CENTER.y} r={80} fill="url(#hubHighlight)" />

          {/* Connection lines (spokes) */}
          {sources.map((source, i) => (
            <line
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el
              }}
              x1={source.x}
              y1={source.y}
              x2={CENTER.x}
              y2={CENTER.y}
              stroke="#1ebbd4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}

          {/* Pulse dots */}
          {sources.map((source, i) => (
            <circle
              key={i}
              ref={(el) => {
                pulseDotRefs.current[i] = el
              }}
              cx={source.x}
              cy={source.y}
              r="4"
              fill="#1ebbd4"
              filter="url(#softGlow)"
            />
          ))}

          {/* Source node: GitHub (top-left) */}
          <g
            ref={(el) => {
              sourceNodeRefs.current[0] = el
            }}
            transform={`translate(${sources[0].x}, ${sources[0].y})`}
          >
            <circle
              cx="0"
              cy="0"
              r="44"
              className="fill-white dark:fill-slate-800"
              stroke="#1ebbd4"
              strokeWidth="2"
              filter="url(#depthShadow)"
            />
            <Github size={48} x={-24} y={-24} className="text-navy dark:text-white" />
          </g>

          {/* Source node: GitLab (top-right) */}
          <g
            ref={(el) => {
              sourceNodeRefs.current[1] = el
            }}
            transform={`translate(${sources[1].x}, ${sources[1].y})`}
          >
            <circle
              cx="0"
              cy="0"
              r="44"
              className="fill-white dark:fill-slate-800"
              stroke="#1ebbd4"
              strokeWidth="2"
              filter="url(#depthShadow)"
            />
            <Gitlab size={48} x={-24} y={-24} className="text-navy dark:text-white" />
          </g>

          {/* Source node: Bitbucket (bottom-left) */}
          <g
            ref={(el) => {
              sourceNodeRefs.current[2] = el
            }}
            transform={`translate(${sources[2].x}, ${sources[2].y})`}
          >
            <circle
              cx="0"
              cy="0"
              r="44"
              className="fill-white dark:fill-slate-800"
              stroke="#1ebbd4"
              strokeWidth="2"
              filter="url(#depthShadow)"
            />
            <g transform="translate(-20, -20) scale(1.666)" className="text-navy dark:text-white">
              <path
                d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 00.77-.646l3.27-20.03a.768.768 0 00-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z"
                fill="currentColor"
              />
            </g>
          </g>

          {/* Source node: Azure DevOps (bottom-right) */}
          <g
            ref={(el) => {
              sourceNodeRefs.current[3] = el
            }}
            transform={`translate(${sources[3].x}, ${sources[3].y})`}
          >
            <circle
              cx="0"
              cy="0"
              r="44"
              className="fill-white dark:fill-slate-800"
              stroke="#1ebbd4"
              strokeWidth="2"
              filter="url(#depthShadow)"
            />
            <g transform="translate(-20, -20) scale(1.666)" className="text-navy dark:text-white">
              <path
                d="M0 8.877 L2.247 5.91 L10.66 2.492 V.033 L18.041 5.44 2.881 8.393 V16.6 L0 15.775 Z M24 3.293 V19.53 L18.279 24 L9.049 20.958 V23.986 L2.881 16.6 L18.041 18.416 V5.44 Z"
                fill="currentColor"
              />
            </g>
          </g>

          {/* Server node (hub, centered) */}
          <g ref={serverNodeRef} transform={`translate(${CENTER.x}, ${CENTER.y})`}>
            <circle
              cx="0"
              cy="0"
              r="34"
              className="fill-white dark:fill-slate-800"
              stroke="#1ebbd4"
              strokeWidth="2.5"
              filter="url(#depthShadow)"
            />
            <circle
              ref={serverFillRef}
              cx="0"
              cy="0"
              r="34"
              fill="#1ebbd4"
              opacity="0"
            />
            <Server size={30} x={-15} y={-15} className="text-navy dark:text-white" />
            <text
              x="0"
              y="52"
              textAnchor="middle"
              className="text-xs font-semibold fill-navy dark:fill-white"
              fontSize="11"
            >
              Server
            </text>
            <text
              ref={deployedCaptionRef}
              x="0"
              y="67"
              textAnchor="middle"
              className="text-xs font-semibold"
              fill="#f89c11"
              fontSize="10"
              opacity="0"
            >
              Deployed
            </text>
          </g>

          {/* Status badge (pinned to server node top-right) */}
          <g ref={badgeGroupRef} transform={`translate(${CENTER.x + 22}, ${CENTER.y - 22})`} filter="url(#depthShadow)">
            <circle
              cx="0"
              cy="0"
              r={14}
              fill="#1ebbd4"
            />
            <circle
              ref={badgeGlowRef}
              cx="0"
              cy="0"
              r={10}
              fill="#ffffff"
              opacity="0"
            />
            <path
              ref={checkmarkRef}
              d="M-5 0 L-1 4 L5 -4"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="20"
              strokeDashoffset="20"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default HeroAnimation

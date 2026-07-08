import { Suspense, lazy, useState, useMemo } from 'react'
import {
  Check,
  X,
  AlertTriangle,
  Minus,
  Box,
  Layers,
  Database,
  Network,
  Shield,
  Activity,
  GitBranch,
  Globe,
  Cloud,
  Layout,
  Server,
  DollarSign,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ErrorBoundary from './ErrorBoundary'
import {
  features,
  competitors,
  type FeatureStatus,
} from '../data/comparisonData'

const SceneCanvas = lazy(() => import('./animations/three/SceneCanvas'))
const ParticleNetworkScene = lazy(() => import('./animations/three/ParticleNetworkScene'))

const iconMap: Record<string, LucideIcon> = {
  Box,
  Layers,
  Database,
  Network,
  Shield,
  Activity,
  GitBranch,
  Globe,
  Cloud,
  Layout,
  Server,
  DollarSign,
}

const StatusCell = ({ status, note }: { status: FeatureStatus; note?: string }) => {
  if (status === 'yes') {
    return (
      <div className="w-6 h-6 bg-cyan/10 rounded flex items-center justify-center">
        <Check size={16} className="text-cyan" />
      </div>
    )
  }
  if (status === 'partial') {
    return (
      <div className="w-6 h-6 bg-amber-500/10 rounded flex items-center justify-center group relative" title={note}>
        <AlertTriangle size={15} className="text-amber-500" />
        {note && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-navy text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 dark:bg-white dark:text-navy">
            {note}
          </div>
        )}
      </div>
    )
  }
  if (status === 'no') {
    return <X size={16} className="text-gray-300 dark:text-white/20" />
  }
  return <Minus size={16} className="text-gray-300 dark:text-white/20" />
}

const ComparisonMatrix = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('all')

  const competitorMap = useMemo(() => {
    const map = new Map<string, typeof competitors[number]>()
    for (const c of competitors) {
      map.set(c.id, c)
    }
    return map
  }, [])

  const filteredCompetitors =
    selectedCompetitor === 'all'
      ? competitors
      : competitorMap.has(selectedCompetitor)
        ? [competitorMap.get(selectedCompetitor)!]
        : competitors

  return (
    <section className="py-16 md:py-24 bg-offwhite dark:bg-navy-dark relative overflow-hidden">
      <ErrorBoundary>
        <Suspense fallback={null}>
          <SceneCanvas cameraPosition={[0, 0, 8]} fov={50}>
            {(ctx: { theme: string; isMobile: boolean; reducedMotion: boolean }) => (
              <ParticleNetworkScene {...ctx} />
            )}
          </SceneCanvas>
        </Suspense>
      </ErrorBoundary>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-cyan text-xs font-semibold tracking-[0.15em] uppercase mb-4">
            Comparison
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy dark:text-white">
            Why <span className="text-orange">Dockbit</span>?
          </h2>
          <p className="text-navy-light max-w-2xl mx-auto dark:text-white/60">
            Full feature parity with every self-hosted PaaS, plus exclusive capabilities they don't offer.
          </p>
        </div>


        {/* Competitor tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button
            onClick={() => setSelectedCompetitor('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCompetitor === 'all'
                ? 'bg-cyan/10 border border-cyan text-cyan'
                : 'bg-white border border-lightgray text-navy/70 hover:border-cyan/50 dark:bg-navy dark:border-white/10 dark:text-white/70 dark:hover:border-cyan/50'
            }`}
          >
            All
          </button>
          {competitors.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCompetitor(c.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCompetitor === c.id
                  ? 'bg-cyan/10 border border-cyan text-cyan'
                  : 'bg-white border border-lightgray text-navy/70 hover:border-cyan/50 dark:bg-navy dark:border-white/10 dark:text-white/70 dark:hover:border-cyan/50'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Feature matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-lg shadow-window bg-white/80 backdrop-blur-xl border border-white/20 overflow-hidden dark:bg-navy/80 dark:border-white/10"
        >
          <div>
            <table className="w-full">
              {/* Header row */}
              <thead>
                <tr className="border-b border-lightgray dark:border-white/10">
                  <th className="p-4 md:p-5 text-left">
                    <span className="text-gray-500 text-sm font-medium dark:text-white/50">Feature</span>
                  </th>
                  <th className="p-4 md:p-5 text-center relative min-w-[110px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-cyan text-sm font-semibold">Dockbit</span>
                      <span className="text-[10px] uppercase tracking-wider bg-cyan/10 text-cyan px-2 py-0.5 rounded-full font-medium">
                        Recommended
                      </span>
                    </div>
                  </th>
                  {filteredCompetitors.map((c) => (
                    <th
                      key={c.id}
                      onClick={() => setSelectedCompetitor(c.id)}
                      className={`p-4 md:p-5 text-center min-w-[90px] cursor-pointer hover:bg-cyan/5 transition-colors ${
                        selectedCompetitor === c.id ? 'bg-cyan/5' : ''
                      }`}
                    >
                      <span className={`text-sm font-medium ${selectedCompetitor === c.id ? 'text-cyan' : 'text-gray-500 dark:text-white/50'}`}>{c.name}</span>
                      {c.category === 'managed' && (
                        <span className="block text-[10px] text-gray-400 mt-0.5 dark:text-white/30">Managed</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Feature rows */}
              <tbody>
                {features.map((row, index) => {
              const Icon = iconMap[row.icon] || Box
              return (
                <tr
                  key={index}
                  className={`border-b border-lightgray dark:border-white/5 ${
                    index % 2 === 0 ? 'bg-gray-50/50 dark:bg-white/[0.02]' : ''
                  } ${row.dockbitExclusive ? 'border-l-2 border-l-orange' : ''}`}
                >
                  <td className="p-4 md:p-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${
                        row.dockbitExclusive ? 'bg-orange/10' : 'bg-cyan/10'
                      }`}>
                        <Icon size={16} className={row.dockbitExclusive ? 'text-orange' : 'text-cyan'} />
                      </div>
                      <div>
                        <span className={`text-sm ${row.dockbitExclusive ? 'text-orange font-semibold' : 'text-gray-700 dark:text-white/80'}`}>
                          {row.feature}
                        </span>
                        {row.description && (
                          <p className="text-gray-500 text-xs mt-0.5 dark:text-white/40">{row.description}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 text-center">
                    <div className="flex justify-center">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${
                        row.dockbitExclusive ? 'bg-orange/10' : 'bg-cyan/10'
                      }`}>
                        <Check size={16} className={row.dockbitExclusive ? 'text-orange' : 'text-cyan'} />
                      </div>
                    </div>
                  </td>
                  {filteredCompetitors.map((c) => (
                    <td key={c.id} className="p-4 md:p-5 text-center">
                      <div className="flex justify-center">
                        <StatusCell
                          status={row[c.id as keyof typeof row] as FeatureStatus}
                          note={row.notes?.[c.id]}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              )
            })}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 px-4 md:px-6 py-4 border-t border-lightgray dark:border-white/10 text-xs text-gray-500 dark:text-white/50">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-cyan/10 rounded flex items-center justify-center">
                <Check size={12} className="text-cyan" />
              </div>
              <span>Full support</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-amber-500/10 rounded flex items-center justify-center">
                <AlertTriangle size={12} className="text-amber-500" />
              </div>
              <span>Partial / limited</span>
            </div>
            <div className="flex items-center gap-1.5">
              <X size={14} className="text-gray-300 dark:text-white/20" />
              <span>Not supported</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Minus size={14} className="text-gray-300 dark:text-white/20" />
              <span>N/A</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <div className="w-3 h-3 bg-orange/20 border border-orange/40 rounded-full" />
              <span>Dockbit exclusive</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default ComparisonMatrix

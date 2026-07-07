import { useState, Suspense, lazy } from 'react'
import { GitBranch, LayoutDashboard, Server, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const SceneCanvas = lazy(() => import('./animations/three/SceneCanvas'))
const DataStreamScene = lazy(() => import('./animations/three/DataStreamScene'))

const DeepDiveTabs = () => {
  const [activeTab, setActiveTab] = useState('deployments')

  const tabs = [
    { id: 'deployments', label: 'Deployments', icon: GitBranch },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'infrastructure', label: 'Infrastructure', icon: Server },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'deployments':
        return (
          <div className="bg-white rounded-md border border-lightgray p-6 shadow-card dark:bg-navy dark:border-white/10">
            <div className="flex items-center justify-between border-b border-lightgray pb-4 mb-4 dark:border-white/10">
              <span className="text-cyan font-semibold text-sm">Deployment Feed</span>
              <span className="text-navy/60 text-xs flex items-center gap-1 dark:text-white/60">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Live
              </span>
            </div>
            <div className="space-y-3">
              {[
                { branch: 'main', hash: 'a1b2c3d', service: 'api-web', duration: '42s', time: '2m ago', status: 'success' },
                { branch: 'feature/auth', hash: 'e4f5g6h', service: 'api-auth', duration: '38s', time: '5m ago', status: 'success' },
                { branch: 'main', hash: 'i7j8k9l', service: 'worker-jobs', duration: '51s', time: '12m ago', status: 'success' },
                { branch: 'staging', hash: 'm0n1o2p', service: 'api-web', duration: '45s', time: '18m ago', status: 'building' },
              ].map((deploy, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-offwhite rounded-md border border-lightgray dark:bg-white/5 dark:border-white/10">
                  <div className="w-8 h-8 bg-cyan/10 rounded-sm flex items-center justify-center">
                    <GitBranch size={14} className="text-cyan" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-navy dark:text-white">{deploy.branch}</span>
                      <span className="text-xs text-navy/60 font-mono dark:text-white/60">{deploy.hash}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-navy/60">
                      <span className="text-navy/60 dark:text-white/60">{deploy.service}</span>
                      <span className="text-navy/60 dark:text-white/60">•</span>
                      <span className="text-navy/60 dark:text-white/60">{deploy.duration}</span>
                      <span className="text-navy/60 dark:text-white/60">•</span>
                      <span className="text-navy/60 dark:text-white/60">{deploy.time}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded font-medium ${
                    deploy.status === 'success' 
                      ? 'bg-green-500/20 text-green-600' 
                      : 'bg-cyan/20 text-cyan'
                  }`}>
                    {deploy.status === 'success' ? 'Success' : 'Building'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'dashboard':
        return (
          <div className="bg-white rounded-md border border-lightgray p-6 shadow-card dark:bg-navy dark:border-white/10">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: 'Services', value: '12' },
                { label: 'Deployments', value: '234' },
                { label: 'Uptime', value: '99.9%' },
                { label: 'Nodes', value: '3' },
              ].map((stat, i) => (
                <div key={i} className="bg-offwhite p-4 rounded-md border border-lightgray dark:bg-white/5 dark:border-white/10">
                  <div className="text-navy/60 text-xs mb-1 dark:text-white/60">{stat.label}</div>
                  <div className="text-2xl font-bold text-cyan">{stat.value}</div>
                </div>
              ))}
            </div>
            <div className="bg-offwhite p-4 rounded-md border border-lightgray dark:bg-white/5 dark:border-white/10">
              <div className="text-navy/60 text-xs mb-3 dark:text-white/60">Resource Usage</div>
              <div className="space-y-3">
                {[
                  { label: 'CPU', value: 67 },
                  { label: 'Memory', value: 45 },
                  { label: 'Storage', value: 32 },
                ].map((resource, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-navy/60 dark:text-white/60">{resource.label}</span>
                      <span className="text-cyan">{resource.value}%</span>
                    </div>
                    <div className="h-2 bg-lightgray rounded-full overflow-hidden dark:bg-white/10">
                      <div 
                        className="h-full bg-cyan rounded-full"
                        style={{ width: `${resource.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'infrastructure':
        return (
          <div className="bg-white rounded-md border border-lightgray p-6 shadow-card dark:bg-navy dark:border-white/10">
            <div className="space-y-3">
              {[
                { name: 'Manager Nodes', status: 'healthy', latency: '12ms' },
                { name: 'Reverse Proxy', status: 'healthy', latency: '8ms' },
                { name: 'Registry', status: 'healthy', latency: '15ms' },
                { name: 'VPN', status: 'healthy', latency: '5ms' },
                { name: 'Builder', status: 'healthy', latency: '22ms' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-offwhite rounded-md border border-lightgray dark:bg-white/5 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <Server size={16} className="text-cyan/60" />
                    <div>
                      <div className="text-sm font-medium text-navy dark:text-white">{item.name}</div>
                      <div className="text-xs text-navy/60 dark:text-white/60">{item.latency}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    <span className="text-xs text-green-600 font-medium">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section id="infrastructure" className="py-16 md:py-24 bg-offwhite dark:bg-navy-dark relative overflow-hidden">
      <Suspense fallback={null}>
        <SceneCanvas cameraPosition={[0, 3, 9]} fov={55}>
          {(ctx: { theme: string; isMobile: boolean; reducedMotion: boolean }) => (
            <DataStreamScene {...ctx} />
          )}
        </SceneCanvas>
      </Suspense>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <p className="text-cyan text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-center">
          Deep Dive
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-navy dark:text-white">
          See it in action
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-cyan/10 border border-cyan text-cyan'
                      : 'bg-white border border-lightgray text-navy/70 hover:border-cyan/50 dark:bg-navy dark:border-white/10 dark:text-white/70 dark:hover:border-cyan/50'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="md:w-2/3" style={{ perspective: '1000px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, rotateY: 15 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -15 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeepDiveTabs

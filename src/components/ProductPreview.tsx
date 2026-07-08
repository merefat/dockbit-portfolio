import { useState, useMemo } from 'react'
import { LayoutDashboard, Folder, Rocket, Server, Monitor, Bell, MoreHorizontal, Plus, Search } from 'lucide-react'

const tabs = [
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'deployments', label: 'Deployments', icon: Rocket },
  { id: 'nodes', label: 'Nodes', icon: Server },
  { id: 'monitoring', label: 'Monitoring', icon: Monitor },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

const ProductPreview = () => {
  const [activeTab, setActiveTab] = useState('projects')

  const tabContentMap = useMemo<Record<string, React.FC>>(() => ({
    projects: ProjectsView,
    deployments: DeploymentsView,
    nodes: NodesView,
    monitoring: MonitoringView,
    notifications: NotificationsView,
  }), [])

  return (
    <section className="py-16 md:py-24 bg-offwhite">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-cyan text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-center">
          Product Preview
        </p>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-navy">
          See it in action
        </h2>

        {/* Tab navigation */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-navy text-white'
                    : 'bg-white text-navy hover:bg-lightgray'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Dashboard mockup */}
        <div className="bg-white rounded-lg border border-lightgray shadow-window overflow-hidden">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-lightgray p-4 hidden md:block">
              <div className="mb-6">
                <button className="w-full bg-cyan text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                  <Plus size={16} />
                  New Project
                </button>
              </div>

              <nav className="space-y-1">
                {[
                  { icon: LayoutDashboard, label: 'Dashboard', active: false },
                  { icon: Folder, label: 'Projects', active: activeTab === 'projects' },
                  { icon: Rocket, label: 'Deployments', active: activeTab === 'deployments' },
                  { icon: Server, label: 'Nodes', active: activeTab === 'nodes' },
                  { icon: Bell, label: 'Notifications', active: activeTab === 'notifications' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={i}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                        item.active ? 'bg-cyan/10 text-cyan' : 'text-navy hover:bg-lightgray'
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 border border-lightgray rounded-lg text-sm w-64"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-lightgray rounded-lg text-sm text-navy">
                    Add Node
                  </button>
                  <button className="px-4 py-2 bg-cyan text-white rounded-lg text-sm">
                    New Project
                  </button>
                </div>
              </div>

              {/* Content based on active tab */}
              {(() => {
                const Content = tabContentMap[activeTab]
                return Content ? <Content /> : null
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ProjectsView = () => (
  <div>
    {/* Stats cards */}
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Active Services', value: '' },
        { label: 'Deployments (24H)', value: '' },
        { label: 'Active Domains', value: '' },
        { label: 'Total Nodes', value: '' },
      ].map((stat, i) => (
        <div key={i} className="bg-offwhite p-4 rounded-lg border border-lightgray">
          <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-navy">{stat.value || '---'}</p>
        </div>
      ))}
    </div>

    {/* Active Projects */}
    <h3 className="text-lg font-semibold text-navy mb-4">Active Projects</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-offwhite p-4 rounded-lg border border-lightgray">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs px-2 py-1 bg-cyan/10 text-cyan rounded">
              {i % 2 === 0 ? 'DEVELOPMENT' : 'PRODUCTION'}
            </span>
            <button className="text-gray-400 hover:text-navy">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <h4 className="font-semibold text-navy mb-2">Project Name</h4>
          <p className="text-sm text-gray-500 mb-3">Description</p>
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="text-xs px-2 py-1 bg-lightgray rounded">Service</span>
            <span className="text-xs px-2 py-1 bg-lightgray rounded">Service</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>--- services</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Status
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const DeploymentsView = () => (
  <div>
    {/* Stats cards */}
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Total', value: '' },
        { label: 'Successful', value: '' },
        { label: 'Failed', value: '' },
        { label: 'In Progress', value: '' },
      ].map((stat, i) => (
        <div key={i} className="bg-offwhite p-4 rounded-lg border border-lightgray">
          <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-navy">{stat.value || '---'}</p>
        </div>
      ))}
    </div>

    {/* Recent Deployments */}
    <h3 className="text-lg font-semibold text-navy mb-4 dark:text-white">Recent Deployments</h3>
    <div className="bg-offwhite rounded-lg border border-lightgray overflow-hidden dark:bg-white/5 dark:border-white/10">
      <table className="w-full">
        <thead className="bg-lightgray dark:bg-white/10">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-semibold text-navy dark:text-white">Project</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-navy dark:text-white">Status</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-navy dark:text-white">Time</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-navy dark:text-white">Duration</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="border-t border-lightgray dark:border-white/10">
              <td className="px-4 py-3 text-sm text-navy dark:text-white">Project Name</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-1 rounded ${
                  i === 3 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {i === 3 ? 'Error' : 'Done'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500 dark:text-white/60">--- ago</td>
              <td className="px-4 py-3 text-sm text-gray-500 dark:text-white/60">---s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const NodesView = () => (
  <div>
    {/* Stats cards */}
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Total Nodes', value: '' },
        { label: 'Online', value: '' },
        { label: 'Offline', value: '' },
        { label: 'Maintenance', value: '' },
      ].map((stat, i) => (
        <div key={i} className="bg-offwhite p-4 rounded-lg border border-lightgray">
          <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-navy">{stat.value || '---'}</p>
        </div>
      ))}
    </div>

    {/* Cluster Nodes */}
    <h3 className="text-lg font-semibold text-navy mb-4">Cluster Nodes</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {['Node 1', 'Node 2', 'Node 3'].map((node, i) => (
        <div key={i} className="bg-offwhite p-4 rounded-lg border border-lightgray">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-navy">{node}</h4>
            <span className="flex items-center gap-1 text-xs text-green-600">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Online
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">CPU</span>
              <span className="text-navy">---%</span>
            </div>
            <div className="h-2 bg-lightgray rounded-full overflow-hidden">
              <div className="h-full bg-cyan rounded-full" style={{ width: '0%' }} />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Memory</span>
              <span className="text-navy">---%</span>
            </div>
            <div className="h-2 bg-lightgray rounded-full overflow-hidden">
              <div className="h-full bg-orange rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const MonitoringView = () => (
  <div>
    {/* Stats cards */}
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { label: 'CPU Usage', value: '' },
        { label: 'Memory', value: '' },
        { label: 'Disk', value: '' },
        { label: 'Cluster Health', value: '' },
      ].map((stat, i) => (
        <div key={i} className="bg-offwhite p-4 rounded-lg border border-lightgray">
          <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-navy">{stat.value || '---'}</p>
        </div>
      ))}
    </div>

    {/* Node Resources */}
    <h3 className="text-lg font-semibold text-navy mb-4">Node Resources</h3>
    <div className="bg-offwhite rounded-lg border border-lightgray p-4">
      <table className="w-full">
        <thead className="bg-lightgray">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-semibold text-navy">Node</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-navy">CPU</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-navy">Memory</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-navy">Disk</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-navy">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((i) => (
            <tr key={i} className="border-t border-lightgray">
              <td className="px-4 py-3 text-sm text-navy">Node {i}</td>
              <td className="px-4 py-3 text-sm text-gray-500">---%</td>
              <td className="px-4 py-3 text-sm text-gray-500">---%</td>
              <td className="px-4 py-3 text-sm text-gray-500">---%</td>
              <td className="px-4 py-3">
                <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">Healthy</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const NotificationsView = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-navy">Notification Channels</h3>
      <button className="px-4 py-2 bg-cyan text-white rounded-lg text-sm flex items-center gap-2">
        <Plus size={16} />
        Add Channel
      </button>
    </div>

    <div className="bg-offwhite rounded-lg border border-lightgray p-8 text-center">
      <Bell size={48} className="mx-auto text-gray-300 mb-4" />
      <h4 className="text-lg font-semibold text-navy mb-2">No notification channels</h4>
      <p className="text-sm text-gray-500 mb-4">
        Add a notification channel to receive alerts about your deployments and services.
      </p>
      <button className="px-4 py-2 bg-cyan text-white rounded-lg text-sm">
        Add Channel
      </button>
    </div>
  </div>
)

export default ProductPreview

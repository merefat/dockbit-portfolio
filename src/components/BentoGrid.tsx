import { 
  Database, 
  Layers, 
  Shield, 
  Package, 
  Network, 
  RotateCcw, 
  Activity, 
  Bell, 
  Code, 
  Users, 
  Zap,
  GitBranch,
  Globe
} from 'lucide-react'

const BentoGrid = () => {
  const features = [
    {
      title: 'Auto GitHub Import',
      description: 'Connect your repo and Dockbit configures the build automatically. No manual setup.',
      icon: GitBranch,
      exclusive: true,
    },
    {
      title: 'Deploy Any Stack',
      description: 'Node, PHP, Python, Go, Ruby — Nixpacks, Buildpacks, or custom Dockerfile.',
      icon: Zap,
    },
    {
      title: 'One Dashboard, Every Node',
      description: 'Service placement matrix across all your servers in one view.',
      icon: Layers,
    },
    {
      title: 'Built-in Databases',
      description: 'Postgres, MySQL, Mongo, MariaDB, Redis, LibSQL with automated backups.',
      icon: Database,
    },
    {
      title: 'Multi-Node Clustering',
      description: 'Docker Swarm support. Scale horizontally across multiple servers.',
      icon: Network,
    },
    {
      title: 'Traefik + Auto SSL',
      description: 'Automatic routing, load balancing, and HTTPS via Let\'s Encrypt.',
      icon: Shield,
    },
    {
      title: 'Self-Hosted Registry',
      description: 'No Docker Hub dependency. Keep your images private and local.',
      icon: Package,
    },
    {
      title: 'Tailscale VPN',
      description: 'Private mesh networking between nodes. Zero setup required.',
      icon: Globe,
      exclusive: true,
    },
    {
      title: 'Cloudflare Integration',
      description: 'DNS and proxy managed directly from the dashboard.',
      icon: Globe,
      exclusive: true,
    },
    {
      title: 'Instant Rollback',
      description: 'One click back to any previous deployment.',
      icon: RotateCcw,
    },
    {
      title: 'Real-Time Monitoring',
      description: 'CPU, memory, network metrics per service.',
      icon: Activity,
    },
    {
      title: 'Notifications Everywhere',
      description: 'Slack, Discord, Telegram, webhook, email, and more.',
      icon: Bell,
    },
    {
      title: 'Full API & CLI',
      description: 'Automate anything you can click in the dashboard.',
      icon: Code,
    },
    {
      title: 'Team Roles & Permissions',
      description: 'Multi-tenant support with RBAC built in.',
      icon: Users,
    },
    {
      title: 'One-Click Templates',
      description: 'Plausible, Pocketbase, Cal.com, and more.',
      icon: Zap,
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24 bg-offwhite dark:bg-navy-dark">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-cyan text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-center">
          Features
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-navy dark:text-white">
          Everything you need to <span className="text-orange">self-host</span>
        </h2>

        <p className="text-navy-light text-center mb-12 max-w-2xl mx-auto dark:text-white/70">
          Full feature parity with Dokploy, plus exclusive capabilities that make deployment effortless.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 bg-white rounded-md border border-lightgray shadow-card hover:shadow-card-hover transition-shadow hover:border-cyan/30 dark:bg-navy dark:border-white/10 dark:hover:shadow-white/5"
            >
              <div className="w-10 h-10 bg-cyan/10 rounded-sm flex items-center justify-center flex-shrink-0">
                <feature.icon size={20} className="text-cyan" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-navy dark:text-white">{feature.title}</h3>
                  {feature.exclusive && (
                    <span className="px-2 py-0.5 bg-orange/20 border border-orange/40 rounded-full text-orange text-xs font-semibold">
                      Exclusive
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm dark:text-white/60">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BentoGrid

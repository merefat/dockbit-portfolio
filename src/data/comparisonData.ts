export type FeatureStatus = 'yes' | 'partial' | 'no' | 'na'

export interface FeatureRow {
  feature: string
  description?: string
  icon: string
  dockbit: FeatureStatus
  dokploy: FeatureStatus
  coolify: FeatureStatus
  caprover: FeatureStatus
  dokku: FeatureStatus
  vercel: FeatureStatus
  dockbitExclusive?: boolean
  notes?: Partial<Record<string, string>>
}

export interface Competitor {
  id: string
  name: string
  category: 'self-hosted' | 'managed'
}

export const competitors: Competitor[] = [
  { id: 'dokploy', name: 'Dokploy', category: 'self-hosted' },
  { id: 'coolify', name: 'Coolify', category: 'self-hosted' },
  { id: 'caprover', name: 'CapRover', category: 'self-hosted' },
  { id: 'dokku', name: 'Dokku', category: 'self-hosted' },
  { id: 'vercel', name: 'Vercel', category: 'managed' },
]

export const features: FeatureRow[] = [
  {
    feature: 'Deploy any stack (Docker)',
    icon: 'Box',
    dockbit: 'yes',
    dokploy: 'yes',
    coolify: 'yes',
    caprover: 'yes',
    dokku: 'yes',
    vercel: 'partial',
    notes: {
      vercel: 'Vercel supports arbitrary Dockerfiles but runs as OCI images on Vercel Functions with serverless limits: capped size/duration, scale-to-zero, no durable storage.',
    },
  },
  {
    feature: 'Docker Compose support',
    icon: 'Layers',
    dockbit: 'yes',
    dokploy: 'yes',
    coolify: 'yes',
    caprover: 'partial',
    dokku: 'no',
    vercel: 'no',
    notes: {
      caprover: 'Parser only reads 6 fields (image, environment, ports, volumes, depends_on, hostname). Build contexts, networks, and profiles are silently ignored.',
    },
  },
  {
    feature: 'Built-in databases',
    icon: 'Database',
    dockbit: 'yes',
    dokploy: 'yes',
    coolify: 'yes',
    caprover: 'yes',
    dokku: 'yes',
    vercel: 'partial',
    notes: {
      vercel: 'Vercel killed first-party Postgres — existing DBs migrated to Neon, new projects provision through Marketplace integrations. Not self-hosted or bundled.',
    },
  },
  {
    feature: 'Multi-node clustering',
    icon: 'Network',
    dockbit: 'yes',
    dokploy: 'yes',
    coolify: 'partial',
    caprover: 'yes',
    dokku: 'partial',
    vercel: 'na',
    notes: {
      coolify: 'Docker Swarm clustering still labeled experimental in Coolify docs. Kubernetes support planned but not yet on roadmap.',
      dokku: 'Native multi-node via k3s scheduler added a couple years back, but opt-in and not how most people run it.',
    },
  },
  {
    feature: 'Auto SSL',
    icon: 'Shield',
    dockbit: 'yes',
    dokploy: 'yes',
    coolify: 'yes',
    caprover: 'yes',
    dokku: 'yes',
    vercel: 'yes',
  },
  {
    feature: 'Real-time monitoring',
    icon: 'Activity',
    dockbit: 'yes',
    dokploy: 'yes',
    coolify: 'yes',
    caprover: 'partial',
    dokku: 'no',
    vercel: 'yes',
  },
  {
    feature: 'Auto GitHub setup',
    icon: 'GitBranch',
    dockbit: 'yes',
    dokploy: 'no',
    coolify: 'yes',
    caprover: 'partial',
    dokku: 'partial',
    vercel: 'yes',
    notes: {
      caprover: 'Limited GitHub integration — requires manual webhook configuration.',
      dokku: 'No native GitHub integration — community plugins required.',
    },
  },
  {
    feature: 'Tailscale VPN built-in',
    icon: 'Globe',
    dockbit: 'yes',
    dokploy: 'no',
    coolify: 'no',
    caprover: 'no',
    dokku: 'no',
    vercel: 'no',
    dockbitExclusive: true,
    description: 'Private mesh networking between nodes, zero setup',
    notes: {
      coolify: 'Community feature request that hasn\'t shipped — people wire it up manually alongside Coolify.',
    },
  },
  {
    feature: 'Cloudflare integration (dashboard)',
    icon: 'Cloud',
    dockbit: 'yes',
    dokploy: 'no',
    coolify: 'partial',
    caprover: 'no',
    dokku: 'no',
    vercel: 'no',
    dockbitExclusive: true,
    description: 'DNS and proxy managed directly from the dashboard',
    notes: {
      coolify: 'Cloudflare Tunnel available as a one-click service template you deploy yourself, not a native dashboard setting.',
    },
  },
  {
    feature: 'WordPress hosting',
    icon: 'Layout',
    dockbit: 'yes',
    dokploy: 'no',
    coolify: 'no',
    caprover: 'no',
    dokku: 'no',
    vercel: 'no',
    dockbitExclusive: true,
    description: 'One-click WordPress site deployment on your own infrastructure',
  },
  {
    feature: 'Persistent stateful containers',
    icon: 'Server',
    dockbit: 'yes',
    dokploy: 'yes',
    coolify: 'yes',
    caprover: 'yes',
    dokku: 'yes',
    vercel: 'no',
    notes: {
      vercel: 'Vercel Functions scale to zero after idle — no persistent containers or durable storage attached.',
    },
  },
  {
    feature: 'Flat server pricing',
    icon: 'DollarSign',
    dockbit: 'yes',
    dokploy: 'yes',
    coolify: 'yes',
    caprover: 'yes',
    dokku: 'yes',
    vercel: 'no',
    notes: {
      vercel: 'Usage-based billing — costs scale with bandwidth, function invocations, and build minutes.',
    },
  },
]

export interface CompetitorPitch {
  title: string
  points: string[]
}

export const competitorPitches: Record<string, CompetitorPitch> = {
  dokploy: {
    title: 'vs. Dokploy — your closest rival',
    points: [
      'Tailscale VPN built-in for private mesh networking',
      'Native Cloudflare integration from the dashboard',
      'Non-experimental clustering out of the box',
      'One-click WordPress hosting on your own infra',
    ],
  },
  coolify: {
    title: 'vs. Coolify — stability where it counts',
    points: [
      'Native Cloudflare dashboard integration, not a service template',
      'Tailscale VPN built-in, not a manual side project',
      'Stable, non-experimental multi-node clustering',
      'One-click WordPress hosting',
    ],
  },
  caprover: {
    title: 'vs. CapRover — modern where it matters',
    points: [
      'Full Docker Compose support — no 6-field parser limits',
      'Modern dashboard with real-time monitoring',
      'Tailscale VPN + native Cloudflare integration',
      'One-click WordPress hosting',
    ],
  },
  dokku: {
    title: 'vs. Dokku — a dashboard changes everything',
    points: [
      'Full web dashboard — no CLI-only workflow',
      'Native Docker Compose support',
      'Clustering on by default, not a k3s side-quest',
      'One-click WordPress hosting',
    ],
  },
  vercel: {
    title: 'vs. Vercel — own your infrastructure',
    points: [
      'Persistent stateful containers, not scale-to-zero functions',
      'Flat server pricing instead of usage-based billing',
      'Your own data, your own servers, your own rules',
      'Tailscale VPN + Cloudflare integration built in',
      'One-click WordPress hosting on your own infra',
    ],
  },
}

export const lastVerified = 'July 2026'

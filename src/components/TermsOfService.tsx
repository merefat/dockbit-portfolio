import { ArrowLeft } from 'lucide-react'

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-navy-dark">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          className="inline-flex items-center gap-2 text-cyan hover:text-cyan/80 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to home
        </a>

        <div className="bg-white dark:bg-navy rounded-lg border border-lightgray dark:border-white/10 p-8 md:p-12 shadow-card">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-navy dark:text-white">
            Dockbit Terms of Service
          </h1>

          <div className="grid md:grid-cols-2 gap-4 mb-8 p-4 bg-offwhite dark:bg-white/5 rounded-sm border border-lightgray dark:border-white/10">
            <div>
              <span className="text-xs text-navy/60 dark:text-white/60 uppercase tracking-wider">Platform</span>
              <p className="text-sm font-medium text-navy dark:text-white">Dockbit</p>
            </div>
            <div>
              <span className="text-xs text-navy/60 dark:text-white/60 uppercase tracking-wider">Operating Entity</span>
              <p className="text-sm font-medium text-navy dark:text-white">ClickBit</p>
            </div>
            <div>
              <span className="text-xs text-navy/60 dark:text-white/60 uppercase tracking-wider">Effective Date</span>
              <p className="text-sm font-medium text-navy dark:text-white">July 8, 2026</p>
            </div>
            <div>
              <span className="text-xs text-navy/60 dark:text-white/60 uppercase tracking-wider">Jurisdiction</span>
              <p className="text-sm font-medium text-navy dark:text-white">Commonwealth of Australia</p>
            </div>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
            <p className="text-navy/80 dark:text-white/80 leading-relaxed">
              Welcome to Dockbit. These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and dockbit ("Company", "we," "us," or "our"), concerning your access to, download, and use of the Dockbit deployment software and platform (collectively, the "Software").
            </p>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">1. Service Description</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Dockbit is a self-hosted platform deployment tool designed to streamline application delivery. The Software provides features including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Zero-config GitHub auto-import</strong> (utilizing Nixpacks, Buildpacks, or custom Dockerfiles).</li>
                <li><strong>Native Docker Compose support</strong> for multi-service orchestration.</li>
                <li><strong>Database creation and management</strong> (PostgreSQL, MySQL, MongoDB, MariaDB, Redis, and LibSQL) with automated S3-compatible storage backups.</li>
                <li><strong>Multi-node deployment scaling</strong> via Docker Swarm clustering.</li>
                <li><strong>Proprietary built-in Tailscale VPN</strong> for private mesh networking and first-class Cloudflare integrations managed from the dashboard.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">2. License and Acceptable Use</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                ClickBit grants you a revocable, non-exclusive, non-transferable, limited right to install and use the Software on servers and infrastructure owned or controlled by you.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Self-Hosted Infrastructure:</strong> Dockbit is designed to be self-hosted. You are entirely responsible for procuring, maintaining, and securing the physical or virtual servers required to run the Software.</li>
                <li><strong>Acceptable Use:</strong> You may not use the Software to host malware, facilitate cyber-attacks, or engage in unlawful activities. You may not reverse-engineer or attempt to extract the source code of proprietary ClickBit integrations without express written permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">3. Fees and Paid Services</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Dockbit operates under a freemium model to accommodate diverse deployment needs:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Free Tier:</strong> The core self-hosted deployment Software is provided free of charge, with no required subscription fees.</li>
                <li><strong>Enterprise Features and Support:</strong> ClickBit offers optional paid support packages and enterprise-grade features for teams. If you elect to purchase these services, you agree to pay all applicable fees in advance. Paid support fees are strictly non-refundable.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">4. Infrastructure Responsibility and Disclaimer of SLA</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Because Dockbit is self-hosted on your own infrastructure, ClickBit does not provide a Service Level Agreement (SLA) for uptime or availability of your deployments.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>You are solely responsible for the security, backups, performance, and hardware maintenance of the servers running Dockbit.</strong></li>
                <li><strong>ClickBit is not liable for any data loss, database corruption, or downtime resulting from hardware failures, misconfigurations, or third-party cloud provider outages on your infrastructure.</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">5. Intellectual Property</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                You retain absolute ownership of all applications, databases, user data, Dockerfiles, and source code you deploy using Dockbit. ClickBit claims no rights over your proprietary software. ClickBit retains all ownership and intellectual property rights to the Dockbit Software, including its interface, documentation, and proprietary networking integrations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">6. Limitation of Liability</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE." CLICKBIT MAKES NO WARRANTIES, EXPRESS OR IMPLIED, REGARDING THE SOFTWARE'S FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. IN NO EVENT SHALL CLICKBIT BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, OR INCIDENTAL DAMAGES ARISING OUT OF YOUR USE OR INABILITY TO USE THE SOFTWARE.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">7. Contact Information</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                For inquiries regarding enterprise features, paid support, or legal terms, please contact us:
              </p>
              <ul className="list-none space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Corporate Entity:</strong> ClickBit (ABN: 59 267 698 766)</li>
                <li><strong>Address:</strong> 19 Drysdale Approach, Baldivis WA 6171, Australia</li>
                <li><strong>Email:</strong> contact@clickbit.com</li>
                <li><strong>Phone:</strong> +61 2 7229 9577 / +61 422 512 130</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService

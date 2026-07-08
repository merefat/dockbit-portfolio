import { ArrowLeft } from 'lucide-react'

const ThirdPartyLicenses = () => {
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
            Dockbit Third-Party & Open Source Licenses
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
              ClickBit respects the intellectual property rights of others and complies with the Copyright Act 1968 (Cth) and applicable international copyright frameworks. The self-hosted Dockbit platform integrates, interfaces with, or utilizes several open-source software projects and third-party libraries.
            </p>
            <p className="text-navy/80 dark:text-white/80 leading-relaxed">
              This page serves as public attribution for these projects, acknowledging their creators and the licenses under which their software is distributed.
            </p>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">1. Acknowledgment of Open Source Technologies</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Dockbit's core deployment, networking, and orchestration capabilities are made possible by the following prominent open-source and third-party technologies:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Docker & Docker Compose:</strong> Utilized for core containerization and multi-service orchestration. (Licensed under the Apache License 2.0).</li>
                <li><strong>Nixpacks:</strong> Utilized for zero-config GitHub auto-import and buildpack generation. (Licensed under the MIT License / Apache License 2.0).</li>
                <li><strong>Tailscale:</strong> Utilized for built-in private mesh networking integrations. (Client code licensed under the BSD 3-Clause License).</li>
                <li><strong>Databases (PostgreSQL, MySQL, MongoDB, MariaDB, Redis, LibSQL):</strong> Integrated as deployable instances within the dashboard. Each database operates under its respective open-source or source-available license (e.g., PostgreSQL License, GNU GPL, Server Side Public License).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">2. Disclaimer of Warranties for Third-Party Software</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                All open-source and third-party software components bundled or integrated with Dockbit are provided "AS IS," without warranty of any kind from ClickBit, either express or implied.
              </p>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                ClickBit disclaims all warranties regarding these third-party tools, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Any specific warranties or liability limitations dictated by the original open-source licenses remain strictly between you and the original authors of those components.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">3. Obtaining Source Code</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                Where required by a specific open-source license (such as the GNU General Public License), ClickBit will make the corresponding source code available upon request or direct you to the upstream repository where the source code can be freely obtained. Dockbit's proprietary additions and integrations remain the exclusive property of ClickBit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">4. Contact Information</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                For inquiries regarding our open-source integrations, license compliance, or to request specific third-party source code disclosures, please contact our corporate team:
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

export default ThirdPartyLicenses

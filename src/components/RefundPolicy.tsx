import { ArrowLeft } from 'lucide-react'

const RefundPolicy = () => {
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
            Dockbit Refund Policy
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
              This Refund Policy applies to users who purchase optional paid support packages or premium enterprise features for the self-hosted Dockbit platform. The core self-hosted deployment software remains entirely free of charge.
            </p>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">1. Consumer Guarantees</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Our enterprise services and features are provided in compliance with standard statutory consumer guarantees. These rights cannot be excluded, restricted, or modified by this policy. When purchasing premium services from us, you are entitled to expect that:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Services are delivered with due care, technical skill, and professional diligence.</strong></li>
                <li><strong>The platform and support features are reasonably fit for their stated purpose.</strong></li>
                <li><strong>All technical support responses are delivered within a reasonable timeframe.</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">2. Service Failures and Faults</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Your eligibility for a remedy or refund depends on the nature of the technical or service issue:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Major Failures:</strong> A major failure occurs if a paid enterprise feature fundamentally fails to operate as advertised and cannot be rectified within a reasonable period. In these instances, you have the right to cancel the service contract and request a pro-rata refund for the remaining, unused portion of your subscription term.</li>
                <li><strong>Minor Failures:</strong> If a service issue or software bug is resolvable within a reasonable timeframe, ClickBit will prioritize repairing or re-supplying the service. If the issue cannot be resolved within a reasonable window, it may then be treated as a major failure.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">3. Change of Mind</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                We advise all clients to evaluate their enterprise infrastructure requirements thoroughly before purchasing premium tiers. ClickBit does not offer refunds, partial credits, or contract cancellations for a simple change of mind, shifting business requirements, or if you discover you no longer utilize the paid features after the billing cycle has processed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">4. Infrastructure Exclusions</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Because Dockbit is a self-hosted platform deployed on your own infrastructure, ClickBit assumes no responsibility and will not issue refunds for service interruptions caused by elements outside our software. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Underlying hardware failures, server crashes, or local operating system misconfigurations.</strong></li>
                <li><strong>Downtime, routing issues, or outages originating from third-party cloud infrastructure providers (such as AWS, DigitalOcean, or Linode).</strong></li>
                <li><strong>Conflicts arising from custom application code running inside your containers or unauthorized modifications made to the Dockbit codebase.</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">5. Contact and Claims</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                To submit a formal service claim, review an invoicing issue, or request a contract evaluation under this policy, please reach out to our corporate team:
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

export default RefundPolicy

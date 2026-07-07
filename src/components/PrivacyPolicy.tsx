import { ArrowLeft } from 'lucide-react'

const PrivacyPolicy = () => {
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
            Enterprise Privacy & Data Governance Policy
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
              <p className="text-sm font-medium text-navy dark:text-white">July 6, 2026</p>
            </div>
            <div>
              <span className="text-xs text-navy/60 dark:text-white/60 uppercase tracking-wider">Jurisdiction</span>
              <p className="text-sm font-medium text-navy dark:text-white">Commonwealth of Australia</p>
            </div>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">1. Legislative Framework and Scope</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                This document constitutes the binding Data Governance and Privacy Policy for ClickBit ("we," "our," or "the Company"). It governs the collection, processing, and protection of personal and technical data across the Dockbit web platform, API endpoints, and associated mobile applications (collectively, "the Platform").
              </p>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                This policy has been structured to strictly comply with the Privacy Act 1988 (Cth), encompassing the 13 Australian Privacy Principles (APPs). We have designed our data handling to address modern regulatory requirements introduced by recent legislative amendments, including transparent automated decision-making obligations, statutory tort protections for serious invasions of privacy, and strict breach assessment timelines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">2. Comprehensive Data Mapping and Collection</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                To provide absolute transparency, ClickBit strictly adheres to data minimisation. We only collect information reasonably necessary for our business functions. The exact datasets processed by the Platform are classified as follows:
              </p>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">A. Centralised Identity and Commercial Data</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-2">
                Collected directly from the user during account provisioning and billing:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Profile Identity:</strong> Full display name, corporate/individual email address, and user-uploaded avatars. Due to the stringent security, CI/CD orchestration, and financial billing requirements of the Platform, it is impracticable for users to interact with ClickBit anonymously or via pseudonyms. Verified identification is a prerequisite for Platform access.</li>
                <li><strong>Security Credentials:</strong> Cryptographically hashed passwords and ephemeral session authentication tokens.</li>
                <li><strong>Financial Telemetry:</strong> Payment processing metadata handled securely via our third-party payment gateways (ClickBit does not store raw credit card numbers).</li>
              </ul>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2 mt-4">B. CI/CD Pipeline and Version Control Telemetry</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-2">
                To execute automated deployment pipelines, the Platform integrates with external Version Control Systems (e.g., GitHub).
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Integration Tokens:</strong> We collect, encrypt, and securely store OAuth access tokens and API keys necessary to read repository data.</li>
                <li><strong>Deployment Metadata:</strong> The Platform logs commit hashes, branch configurations, webhook triggers, and the associated commit author email addresses to track deployment success or failure across Staging and Production environments.</li>
                <li><strong>Ephemeral Code Custody:</strong> Source code pulled from connected repositories is cloned ephemerally. Build caches are strictly isolated and are automatically destroyed upon the compilation of the container image.</li>
              </ul>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2 mt-4">C. Localised Infrastructure Credentials (BYOI)</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-2">
                In alignment with our Bring-Your-Own-Infrastructure (BYOI) architecture, highly sensitive target infrastructure data is intentionally isolated:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Edge Data:</strong> Specific instance IP addresses, target server addresses, and localised deployment node credentials are saved exclusively within the local client storage of your device.</li>
                <li><strong>Custody Disclaimer:</strong> ClickBit does not transmit, process, or archive these specific infrastructure credentials on our central cloud servers.</li>
              </ul>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2 mt-4">D. Transient Edge Processing and Mobile Diagnostics</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-2">
                The Platform's routing utilities (Traefik, Tailscale, Cloudflare) and mobile applications require automated technical data collection:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Routing Telemetry:</strong> Edge reverse proxies process transient network traffic, connecting IP addresses, and routing logs. This information is processed strictly for infrastructure routing and DDoS mitigation, and is routinely purged.</li>
                <li><strong>Mobile Diagnostics:</strong> When utilising Dockbit via our iOS or Android mobile applications, we collect device operating system versions, hardware models, and crash diagnostic logs to ensure application stability.</li>
              </ul>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2 mt-4">E. Direct Marketing (APP 7)</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                ClickBit strictly utilises collected contact information for operational platform notifications and billing. We do not use personal information or platform telemetry for direct marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">3. Automated Decision-Making (ADM) Transparency</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                In strict compliance with APP 1.7 and APP 1.8 obligations (commencing 10 December 2026), ClickBit provides the following transparency regarding our use of personal information in automated systems that make, or substantially assist in making, decisions that could reasonably be expected to significantly affect the rights or interests of an individual (such as access to our services).
              </p>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Note: Routine technical operations, such as CI/CD pipeline execution, container compiling, and automated infrastructure scaling, are classified as purely operational computing processes and do not meet the materiality threshold of significantly affecting an individual's rights or interests under APP 1.7.
              </p>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Where ADM is utilised for security and platform integrity, we disclose the following in accordance with APP 1.8:
              </p>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">A. Kinds of Personal Information Used</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                The automated systems evaluate transient network traffic, connecting IP addresses, routing logs, session authentication tokens, and account behavioural telemetry.
              </p>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2 mt-4">B. Kinds of Decisions Made</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Automated security decisions executed by the Platform include:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80">
                <li><strong>Autonomous Blocking:</strong> Instant denial of network access from IP addresses exhibiting malicious behaviour (e.g., volumetric DDoS attacks or brute-force credential stuffing).</li>
                <li><strong>Account Isolation:</strong> Temporary suspension of deployment environments for accounts flagged for suspected Acceptable Use Policy violations (e.g., unauthorised cryptographic miners or phishing nodes).</li>
              </ul>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2 mt-4">C. Decisions Substantially Assisting Human Review</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                Automated security algorithms may flag user accounts for suspected violations of our Acceptable Use Policy (such as the deployment of unauthorised cryptographic miners or phishing nodes). The computer program may temporarily isolate the deployment environment, which acts as a mechanism substantially and directly related to assisting ClickBit's administrative team. A human administrator conducts a manual review of the flagged telemetry to make the final decision regarding permanent account suspension or termination.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">4. Cross-Border Disclosures (APP 8) and Sub-Processors</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Dockbit integrates with designated third-party sub-processors to deliver global orchestration. These include Cloudflare Inc. (edge routing), Tailscale (secure networking), S3-compatible storage providers, and GitHub Inc. (version control).
              </p>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                Under APP 8.1, ClickBit retains full legal accountability for the privacy compliance of its overseas sub-processors. Prior to disclosing any personal or technical information to these overseas recipients (including servers located in the United States and Singapore), ClickBit executes stringent Data Processing Addendums (DPAs). We accept liability for ensuring that these overseas entities handle your data in a manner consistent with the Australian Privacy Principles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">5. Technical and Organisational Security Measures</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                All personal and technical information is held electronically within secure, cloud-based infrastructure hosted by our designated overseas sub-processors. As mandated by APP 11, ClickBit has implemented measures to protect personal information from misuse, interference, unauthorised access, modification, or loss.
              </p>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">Technical Defences (APP 11)</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                All data in transit is protected via Transport Layer Security (TLS/SSL). We utilise multi-factor authentication (MFA) for internal administrative access, encrypt databases at rest, and employ strict role-based access controls (RBAC).
              </p>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2 mt-4">Organisational Controls & Tort Mitigation</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                To mitigate risks associated with the statutory tort for serious invasions of privacy (commenced 10 June 2025), which targets intentional or reckless intrusions on seclusion or the misuse of personal information, ClickBit enforces a zero-tolerance disciplinary framework. We mandate strict internal data-handling policies and logging to detect and prevent any unauthorised, intentional snooping or misuse of user information by corporate staff.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">6. Data Breach Response Plan</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                ClickBit operates a formalised Data Breach Response Plan in strict compliance with the Notifiable Data Breaches (NDB) scheme.
              </p>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">Assessment SLA</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                If we suspect a data breach has occurred, we will immediately isolate the affected infrastructure and commence an assessment. By law, we have a maximum of 30 days to complete this assessment.
              </p>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">Notification Protocol</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                However, the 30-day window is a statutory ceiling, not a grace period. Once ClickBit forms a reasonable belief that an eligible data breach has occurred, we will notify the affected individuals and the Office of the Australian Information Commissioner (OAIC) as soon as practicable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">7. Mandatory Account Deletion and Data Retention</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                To comply with global mobile marketplace Data Safety regulations and Australian privacy frameworks, ClickBit provides explicit data erasure pathways:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-navy/80 dark:text-white/80 mb-4">
                <li><strong>In-App Deletion:</strong> Users may initiate the permanent erasure of their account and all associated personal profile data directly within the Dockbit application settings.</li>
                <li><strong>Web Portal Deletion:</strong> Users may also request complete data destruction via our authenticated web portal, independent of the application installation.</li>
              </ul>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">Destruction SLA</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                Upon initiation, ClickBit executes automated scripts to permanently destroy profile data, deployment telemetry, and stored OAuth tokens across all production systems and cold backups within a maximum 30-day retention window. Data destruction is subject to mandatory statutory retention periods. For example, financial and billing metadata will be retained for the minimum period required by Australian corporate and taxation laws before being destroyed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">8. Platform Age-Gating and the Children's Online Privacy Code</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                The Platform is enterprise infrastructure software designed exclusively for professional developers and corporate entities. It is not designed for, marketed to, or intended to be accessed by individuals under the age of 18.
              </p>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                We acknowledge that the OAIC is currently developing a Children's Online Privacy Code, mandated to be in place by 10 December 2026. By enforcing strict age-gating mechanisms, ClickBit actively positions its operations outside the intended scope of a service that is "likely to be accessed by children," thereby ensuring our infrastructure remains a secure, adult-only professional environment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-3">9. User Rights, Access, and Complaints</h2>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Under APPs 12 and 13, users retain complete control over their personal information.
              </p>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">Access & Correction</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                Users can access, correct, or update their display name, email, avatar, and connected integrations at any time via the Platform dashboard. To request access to, or correction of, broader personal data not directly available via the dashboard (such as platform telemetry or mobile diagnostics), users may submit a formal request to contact@clickbit.com.au.
              </p>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">Complaints</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed mb-4">
                If you believe ClickBit has breached the APPs, you must first lodge a formal complaint by emailing contact@clickbit.com.au. We will investigate and respond in writing within 30 days.
              </p>

              <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">Regulatory Escalation</h3>
              <p className="text-navy/80 dark:text-white/80 leading-relaxed">
                If you are unsatisfied with our internal resolution, you possess an absolute right to escalate the grievance directly to the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

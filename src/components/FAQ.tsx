import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import GradientText from './GradientText'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's the difference between Dockbit and Dokploy?",
      answer: "Dockbit has full feature parity with Dokploy, but adds three key differentiators: zero-config GitHub auto-import (no manual build tool selection), built-in Tailscale VPN for private mesh networking, and first-class Cloudflare integration managed from the dashboard.",
    },
    {
      question: "Do I need to write a Dockerfile?",
      answer: "No. Dockbit automatically detects your stack from your GitHub repository and configures the build using Nixpacks, Buildpacks, or a custom Dockerfile if you prefer. Just push your code and we handle the rest.",
    },
    {
      question: "Do you support Docker Compose?",
      answer: "Yes. Dockbit has native Docker Compose support for full multi-service orchestration. Deploy complex applications with multiple containers, networks, and volumes.",
    },
    {
      question: "Which databases are supported?",
      answer: "PostgreSQL, MySQL, MongoDB, MariaDB, Redis, and LibSQL. All databases can be created, managed, and backed up directly from the dashboard with automated S3-compatible storage backups.",
    },
    {
      question: "Can I run this across multiple servers?",
      answer: "Yes. Dockbit supports Docker Swarm clustering for multi-node deployments. Scale your services horizontally across multiple servers with automatic load balancing and service discovery.",
    },
    {
      question: "What's the pricing model?",
      answer: "Dockbit is self-hosted and free to use. You deploy it on your own infrastructure, so there are no subscription fees. Optional paid support and enterprise features are available for teams that need them.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-navy">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-cyan text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-center">
          FAQ
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-navy dark:text-white">
          Frequently asked <GradientText>questions</GradientText>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-md border border-lightgray overflow-hidden shadow-card hover:border-cyan/30 transition-colors dark:bg-navy dark:border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold pr-8 text-navy dark:text-white">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-cyan transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 bg-cyan/5 dark:text-white/60 dark:bg-cyan/10">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

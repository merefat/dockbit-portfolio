import { useState } from 'react'
import { Check, ArrowRight, AlertCircle } from 'lucide-react'
import GradientText from './GradientText'

const WEB3FORMS_ACCESS_KEY = 'dddaa146-17a7-4718-9858-9ea5579da96a'
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(false)

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New contact form submission — DockBit landing page',
          from_name: 'DockBit Website',
        }),
      })

      const result = await response.json()
      console.log('Web3Forms response:', result)
      if (response.ok && result.success) {
        setSubmitted(true)
      } else {
        console.error('Web3Forms error:', result.message || result)
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <section className="py-16 md:py-24 bg-offwhite dark:bg-navy-dark">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="bg-white dark:bg-navy rounded-lg border border-lightgray dark:border-white/10 p-12 shadow-card">
            <div className="w-16 h-16 bg-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-cyan" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy dark:text-white">
              Thanks for reaching out!
            </h2>
            <p className="text-navy/70 dark:text-white/70 mb-6">
              We'll get back to you within one business day.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' })
              }}
              className="px-6 py-3 bg-cyan text-white font-semibold rounded-sm hover:bg-cyan/90 transition-colors"
            >
              Send another message
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-offwhite dark:bg-navy-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div>
            <p className="text-cyan text-xs font-semibold tracking-[0.15em] uppercase mb-4">
              / CONTACT · FREE DEMO /
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy dark:text-white leading-tight">
              Tell us what's slowing your deploys down.
            </h2>
            <p className="text-xl md:text-2xl font-semibold mb-6 text-navy dark:text-white">
              <GradientText>We'll fix it.</GradientText>
            </p>
            <p className="text-navy/70 dark:text-white/70 mb-8 text-sm leading-relaxed">
              Whether it's flaky CI pipelines, slow rollback times, or infrastructure that's too complex to manage — we've seen it all. Book a free demo and let's get your deployments flowing.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Fixed pricing, no hidden fees',
                'Honest advice, no sales pressure',
                'Direct access to senior engineers',
                'Free onboarding & support',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-navy/80 dark:text-white/80">
                  <Check size={16} className="text-cyan flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Form Card */}
          <div className="bg-white dark:bg-navy rounded-lg border border-lightgray dark:border-white/10 p-6 md:p-8 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-navy dark:text-white">
                Get your free demo
              </h3>
              <span className="px-3 py-1 bg-cyan/10 text-cyan text-xs font-semibold rounded-full">
                Replies within 1 business day
              </span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-navy/70 dark:text-white/70 mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-offwhite dark:bg-white/5 border border-lightgray dark:border-white/10 rounded-sm text-sm text-navy dark:text-white placeholder-navy/40 dark:placeholder-white/40 focus:outline-none focus:border-cyan/50 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy/70 dark:text-white/70 mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-offwhite dark:bg-white/5 border border-lightgray dark:border-white/10 rounded-sm text-sm text-navy dark:text-white placeholder-navy/40 dark:placeholder-white/40 focus:outline-none focus:border-cyan/50 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-navy/70 dark:text-white/70 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-offwhite dark:bg-white/5 border border-lightgray dark:border-white/10 rounded-sm text-sm text-navy dark:text-white placeholder-navy/40 dark:placeholder-white/40 focus:outline-none focus:border-cyan/50 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy/70 dark:text-white/70 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-offwhite dark:bg-white/5 border border-lightgray dark:border-white/10 rounded-sm text-sm text-navy dark:text-white placeholder-navy/40 dark:placeholder-white/40 focus:outline-none focus:border-cyan/50 transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-navy/70 dark:text-white/70 mb-1.5">
                  What are you deploying?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 bg-offwhite dark:bg-white/5 border border-lightgray dark:border-white/10 rounded-sm text-sm text-navy dark:text-white placeholder-navy/40 dark:placeholder-white/40 focus:outline-none focus:border-cyan/50 transition-colors resize-none"
                  placeholder="App, API, infra setup... tell us about your stack."
                />
              </div>
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-sm">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700 dark:text-red-300">
                    Something went wrong. Please email us directly at <a href="mailto:contact@clickbit.com.au" className="underline font-medium">contact@clickbit.com.au</a>
                  </p>
                </div>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full px-6 py-3 bg-cyan text-white font-semibold rounded-sm hover:bg-cyan/90 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : 'Book My Free Demo'}
                {!sending && <ArrowRight size={18} />}
              </button>
              <p className="text-xs text-navy/50 dark:text-white/50 text-center">
                No spam, no pressure. We reply within one business day.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

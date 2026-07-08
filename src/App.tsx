import { useState, useEffect } from 'react'
import TopHeader from './components/TopHeader'
import Hero from './components/Hero'
import PainSection from './components/PainSection'
import BentoGrid from './components/BentoGrid'
import HowItWorks from './components/HowItWorks'
import DeepDiveTabs from './components/DeepDiveTabs'
import ComparisonMatrix from './components/ComparisonMatrix'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import RefundPolicy from './components/RefundPolicy'
import ThirdPartyLicenses from './components/ThirdPartyLicenses'
import TermsOfService from './components/TermsOfService'

function App() {
  const [route, setRoute] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname)
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (route === '/privacy') {
    return (
      <div className="min-h-screen">
        <TopHeader />
        <div className="pt-20">
          <PrivacyPolicy />
        </div>
        <Footer />
      </div>
    )
  }

  if (route === '/refund') {
    return (
      <div className="min-h-screen">
        <TopHeader />
        <div className="pt-20">
          <RefundPolicy />
        </div>
        <Footer />
      </div>
    )
  }

  if (route === '/licenses') {
    return (
      <div className="min-h-screen">
        <TopHeader />
        <div className="pt-20">
          <ThirdPartyLicenses />
        </div>
        <Footer />
      </div>
    )
  }

  if (route === '/terms') {
    return (
      <div className="min-h-screen">
        <TopHeader />
        <div className="pt-20">
          <TermsOfService />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <TopHeader />
      <div className="pt-20">
        <Hero />
        <PainSection />
        <BentoGrid />
        <HowItWorks />
        <DeepDiveTabs />
        <ComparisonMatrix />
        <Testimonials />
        <FAQ />
        <ContactSection />
      </div>
      <Footer />
    </div>
  )
}

export default App

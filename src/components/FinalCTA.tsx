import { Github, ArrowRight } from 'lucide-react'
import GradientText from './GradientText'

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-navy">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Let's ship something.
        </h2>
        <p className="text-xl md:text-2xl font-semibold mb-8 text-white">
          <GradientText>We'll get you deployed.</GradientText>
        </p>

        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
          Deploy your first application in under 2 minutes. No credit card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-cyan text-white font-semibold rounded-sm hover:bg-cyan/90 transition-colors inline-flex items-center gap-2">
            <Github size={20} />
            Sign up with GitHub
            <ArrowRight size={20} />
          </button>

          <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors">
            Start with email
          </button>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA

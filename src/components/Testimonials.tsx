import { Quote, Star } from 'lucide-react'
import GradientText from './GradientText'

const Testimonials = () => {
  const testimonials = [
    {
      quote: 'Dockbit saved us hours every week. The auto GitHub setup is a game changer.',
      name: 'Sarah Chen',
      role: 'CTO, TechStartup',
    },
    {
      quote: 'Finally, a self-hosted platform that just works. No more Dockerfile headaches.',
      name: 'Marcus Johnson',
      role: 'Senior Dev, Agency',
    },
    {
      quote: 'The Tailscale integration alone is worth it. Our infra is now actually secure.',
      name: 'Elena Rodriguez',
      role: 'DevOps Lead, Enterprise',
    },
    {
      quote: 'Deployed our entire stack in under 10 minutes. The dashboard is incredibly intuitive.',
      name: 'James Park',
      role: 'Founder, Startup',
    },
    {
      quote: 'Multi-node clustering was a breeze. Dockbit handles what used to take our team days.',
      name: 'Aisha Patel',
      role: 'Platform Engineer',
    },
    {
      quote: 'WordPress hosting on our own infrastructure — exactly what we needed. No vendor lock-in.',
      name: 'David Kim',
      role: 'Lead Developer, Agency',
    },
  ]

  // Duplicate testimonials for seamless looping
  const carouselItems = [...testimonials, ...testimonials]

  return (
    <section className="py-16 md:py-24 bg-offwhite dark:bg-navy-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <p className="text-cyan text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-center">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-navy dark:text-white">
          Loved by <GradientText>developers</GradientText>
        </h2>
      </div>

      {/* Carousel container */}
      <div className="relative">
        {/* Fade masks on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-offwhite to-transparent z-10 dark:from-navy-dark" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-offwhite to-transparent z-10 dark:from-navy-dark" />

        {/* Scrolling track */}
        <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused]">
          {carouselItems.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[380px] md:w-[420px] bg-white/80 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-card dark:bg-navy/80 dark:border-white/10"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Quote size={18} className="text-cyan" />
                </div>
                <div className="flex-1">
                  <p className="text-navy italic text-sm leading-relaxed dark:text-white">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-orange fill-orange" />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-lightgray dark:border-white/10">
                <div className="font-semibold text-navy text-sm dark:text-white">{testimonial.name}</div>
                <div className="text-gray-600 text-xs dark:text-white/60">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  )
}

export default Testimonials

const TrustStrip = () => {
  const trustItems = [
    { icon: 'Git Integration', label: 'Git Integration' },
    { icon: 'Automatic Deployments', label: 'Automatic Deployments' },
    { icon: 'Custom Domains', label: 'Custom Domains' },
  ]

  return (
    <section className="py-8 border-y border-lightgray bg-white dark:bg-navy dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {trustItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-cyan font-semibold text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustStrip

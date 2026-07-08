const stats = [
  '155+ deployments tracked',
  '3 regions',
  '1-click rollback',
  '0 Dockerfiles needed',
]

const StatsStrip = () => {

  return (
    <section className="py-8 border-y border-lightgray bg-white dark:bg-navy dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-gray-600 font-medium dark:text-white/60"
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsStrip

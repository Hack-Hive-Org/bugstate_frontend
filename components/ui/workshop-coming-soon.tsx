"use client"

const WorkshopsComingSoon = () => {
  const workshops = [
    {
      name: "Microservices with Spring Boot",
      description:
        "Learn to design and build scalable microservice architectures using Spring Boot and Docker."
    },
    {
      name: "Event-Driven Backend Systems",
      description:
        "Build asynchronous systems using Kafka, message queues, and event-driven architecture."
    },
    {
      name: "Backend Performance Engineering",
      description:
        "Understand caching, database optimization, and scaling strategies used in production systems."
    }
  ]

  return (
    <section className="font-cabin bg-slate-50 px-6 py-24">

      <div className="max-w-7xl mx-auto w-full space-y-14">

        <div className="text-center space-y-4">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Learn & Build</p>
          <h2 className="text-4xl md:text-5xl font-changa-one font-bold text-slate-900">
            Upcoming Workshops
          </h2>

          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            Practical sessions designed to teach modern backend architecture
            and scalable engineering practices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {workshops.map((workshop, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-3 text-slate-900">
                {workshop.name}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                {workshop.description}
              </p>

              <div className="mt-5 text-indigo-600 text-sm font-medium">
                Announcing Soon
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WorkshopsComingSoon
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
    <section className="min-h-screen font-cabin flex items-center bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white px-6 py-20">

      <div className="max-w-7xl mx-auto w-full space-y-14">

        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-changa-one font-bold">
            Upcoming <span className="text-lime-400">Workshops</span>
          </h2>

          <p className="text-purple-100 max-w-xl mx-auto">
            Practical sessions designed to teach modern backend architecture
            and scalable engineering practices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {workshops.map((workshop, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-lg hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {workshop.name}
              </h3>

              <p className="text-purple-100 text-sm">
                {workshop.description}
              </p>

              <div className="mt-4 text-lime-400 text-sm">
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
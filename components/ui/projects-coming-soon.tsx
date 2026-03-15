"use client"

const ProjectsComingSoon = () => {
  const projects = [
    {
      name: "Distributed Task Queue",
      description:
        "Build a scalable background job processing system similar to Celery or Sidekiq using message queues."
    },
    {
      name: "Real-Time Collaboration Platform",
      description:
        "Create a collaborative editor using WebSockets, operational transforms, and scalable backend APIs."
    },
    {
      name: "AI Developer Assistant",
      description:
        "Develop an AI-powered coding assistant that helps review pull requests and detect bugs automatically."
    }
  ]

  return (
    <section className="min-h-screen font-cabin flex items-center bg-white px-6 py-20">

      <div className="max-w-7xl mx-auto w-full space-y-14">

        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-changa-one font-bold text-gray-900">
            Live Projects <span className="text-purple-600">Coming Soon</span>
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto">
            Work on real-world engineering problems and collaborate with developers
            building production-grade systems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {project.name}
              </h3>

              <p className="text-gray-600 text-sm">
                {project.description}
              </p>

              <div className="mt-4 text-purple-600 text-sm font-medium">
                Launching Soon
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ProjectsComingSoon
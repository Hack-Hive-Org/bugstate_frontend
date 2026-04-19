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
    <section className="font-cabin bg-white px-6 py-24">

      <div className="max-w-7xl mx-auto w-full space-y-14">

        <div className="text-center space-y-4">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Open Source</p>
          <h2 className="text-4xl md:text-5xl font-changa-one font-bold text-slate-900">
            Live Projects Coming Soon
          </h2>

          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            Work on real-world engineering problems and collaborate with developers
            building production-grade systems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-3 text-slate-900">
                {project.name}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="mt-5 text-indigo-600 text-sm font-medium">
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
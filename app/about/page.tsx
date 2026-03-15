"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white px-6 py-20">

      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-changa-one">
            About <span className="text-lime-400">BugState</span>
          </h1>

          <p className="text-lg font-cabin text-purple-100 max-w-2xl mx-auto">
            BugState is a platform built to help developers gain practical
            experience through workshops and real-world projects.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white/10 font-cabin backdrop-blur-lg border border-white/20 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-purple-100">
            Many developers learn theory but struggle with real-world
            engineering challenges. BugState focuses on bridging that gap by
            providing hands-on workshops and live projects where developers
            can learn modern backend systems, scalable architecture, and
            production-ready development practices.
          </p>
        </div>

        {/* What we offer */}
        <div className="grid md:grid-cols-3 gap-6 font-cabin">

          <div className="bg-white/10 border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Workshops</h3>
            <p className="text-purple-100 text-sm">
              Interactive workshops covering backend development, modern
              architecture, microservices, Docker, and cloud systems.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Live Projects</h3>
            <p className="text-purple-100 text-sm">
              Real-world projects where students and professionals collaborate
              to build production-grade applications.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-purple-100 text-sm">
              A community of developers learning, building, and improving
              together through practical development experience.
            </p>
          </div>

        </div>

        {/* Founder Section */}
        <div className="bg-white/10 font-cabin backdrop-blur-lg border border-white/20 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold">About the Founder</h2>

          <p className="text-purple-100">
            BugState is built by a developer passionate about backend systems,
            scalable architecture, and practical engineering education.
          </p>

          <p className="text-purple-100">
            The goal is to help developers move beyond tutorials and start
            building systems that resemble real production environments.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-6 font-cabin">
          <Link href="/workshops">
            <Button className="bg-black hover:bg-neutral-900 text-white">
              Explore Workshops
            </Button>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default About
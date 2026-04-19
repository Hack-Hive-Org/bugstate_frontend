"use client"

import { Button } from "@/components/ui/button"
import Footer from "@/components/ui/footer"
import Link from "next/link"

const About = () => {
  return (
    <div>
      <div className="bg-white px-6 py-20">

        <div className="max-w-5xl mx-auto space-y-16">

          {/* Header */}
          <div className="text-center space-y-6 pt-10">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider font-cabin">Who We Are</p>
            <h1 className="text-4xl md:text-6xl font-bold font-changa-one text-slate-900">
              About BugState
            </h1>

            <p className="text-lg font-cabin text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We are a digital services company helping businesses
              build their online presence through modern web solutions,
              creative design, and strategic marketing.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-slate-50 font-cabin border border-slate-200 rounded-2xl p-8 md:p-10 space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              Every business deserves a strong digital presence. Our mission is to
              make professional web development, design, and digital marketing
              accessible to businesses of all sizes. We combine technical expertise
              with creative thinking to deliver solutions that drive real results.
            </p>
          </div>

          {/* What We Do */}
          <div className="grid md:grid-cols-3 gap-6 font-cabin">

            <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-sm">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Build</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We develop custom websites, web applications, and mobile apps
                using modern technologies that scale with your business.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-sm">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Design</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We create compelling visual designs, landing pages, and branded
                email templates that make your business stand out.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <span className="text-indigo-600 font-bold text-sm">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Grow</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We run targeted ad campaigns, set up automation, and implement
                strategies that drive traffic and conversions.
              </p>
            </div>

          </div>

          {/* Our Approach */}
          <div className="bg-slate-50 font-cabin border border-slate-200 rounded-2xl p-8 md:p-10 space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Our Approach</h2>

            <p className="text-slate-600 leading-relaxed">
              We believe in building long-term partnerships with our clients.
              Every project starts with understanding your goals, audience, and
              challenges. From there, we craft tailored solutions — not
              one-size-fits-all templates.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Our team stays current with the latest technologies and design
              trends to ensure your digital products are modern, performant,
              and built to last.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center pt-6 font-cabin">
            <Link href="/contact">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 px-7">
                Work With Us
              </Button>
            </Link>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default About

"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] font-cabin overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white flex items-center">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Digital Solutions for Modern Business
          </div>

          <h1 className="text-4xl md:text-6xl font-changa-one font-extrabold leading-[1.1] text-slate-900 tracking-tight">
            We Build Digital
            <br />
            <span className="text-indigo-600">Experiences</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            From websites and mobile apps to ad campaigns and automation —
            we help businesses launch, grow, and scale with modern digital solutions.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">Web Development</span>
            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">Mobile Apps</span>
            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">Ad Campaigns</span>
            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">Automation</span>
          </div>

          <div className="flex items-center gap-5 pt-2">
            <Link href="/services">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-cabin font-medium shadow-lg shadow-indigo-200 px-7">
                Explore Our Services
              </Button>
            </Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              Get in Touch &rarr;
            </Link>
          </div>
        </div>

        {/* Right Stats Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-xl shadow-slate-100">
          <h3 className="text-xl font-semibold text-slate-900">Why BugState?</h3>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">01</div>
              <div>
                <p className="font-semibold text-slate-900">End-to-End Solutions</p>
                <p className="text-sm text-slate-500 mt-0.5">From design to deployment, we handle it all.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">02</div>
              <div>
                <p className="font-semibold text-slate-900">Modern Tech Stack</p>
                <p className="text-sm text-slate-500 mt-0.5">Built with the latest frameworks and tools.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">03</div>
              <div>
                <p className="font-semibold text-slate-900">Results Driven</p>
                <p className="text-sm text-slate-500 mt-0.5">We focus on performance, conversions, and growth.</p>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100 text-sm text-slate-500">
            Trusted by startups and businesses to deliver quality digital products.
          </div>
        </div>

      </div>
    </section>
  )
}

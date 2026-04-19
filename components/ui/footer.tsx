"use client"

import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-slate-50 px-6 py-16 border-t border-slate-200 font-cabin">

      <div className="max-w-7xl mx-auto space-y-10">

        <div className="grid md:grid-cols-4 gap-10">

          <div className="md:col-span-1">
            <h3 className="text-2xl font-changa-one font-bold text-slate-900">
              BugState
            </h3>

            <p className="text-slate-500 mt-3 text-sm leading-relaxed">
              Digital services that help businesses build, grow, and
              scale their online presence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>

            <div className="flex flex-col gap-2.5 text-slate-500 text-sm">
              <Link href="/services" className="hover:text-indigo-600 transition-colors">Website Development</Link>
              <Link href="/services" className="hover:text-indigo-600 transition-colors">Ad Campaign</Link>
              <Link href="/services" className="hover:text-indigo-600 transition-colors">Landing Pages</Link>
              <Link href="/services" className="hover:text-indigo-600 transition-colors">Branded Emails</Link>
              <Link href="/services" className="hover:text-indigo-600 transition-colors">Website Automation</Link>
              <Link href="/services" className="hover:text-indigo-600 transition-colors">Mobile Apps</Link>
              <Link href="/services" className="hover:text-indigo-600 transition-colors">Web Designing</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>

            <div className="flex flex-col gap-2.5 text-slate-500 text-sm">
              <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
              <Link href="/blogs" className="hover:text-indigo-600 transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
              <Link href="/rss.xml" className="hover:text-indigo-600 transition-colors">RSS</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">
              Get in Touch
            </h4>

            <p className="text-slate-500 text-sm leading-relaxed">
              Have a project in mind? Reach out and let&apos;s build
              something great together.
            </p>

            <Link
              href="/contact"
              className="inline-block mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors"
            >
              Contact Us &rarr;
            </Link>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 text-sm text-slate-400 text-center">
          &copy; {new Date().getFullYear()} BugState. All rights reserved.
        </div>

      </div>

    </footer>
  )
}

export default Footer

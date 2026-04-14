"use client"

import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-white px-6 py-14 border-t font-cabin">

      <div className="max-w-7xl mx-auto space-y-10">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-3xl font-changa-one font-bold text-gray-900">
              BugState
            </h3>

            <p className="text-gray-600 mt-3 text-sm font-cabin">
              Helping developers learn backend engineering through hands-on
              workshops and real-world projects.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Navigation
            </h4>

            <div className="flex flex-col gap-2 text-gray-600 text-sm">
              <Link href="/workshops">Workshops</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/blogs">Blog</Link>
              <Link href="/about">About</Link>
              <Link href="/profile">Profile</Link>
              <Link href="/rss.xml">RSS</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Community
            </h4>

            <p className="text-gray-600 text-sm">
              Join upcoming workshops and collaborate with developers
              building real production systems.
            </p>
          </div>

        </div>

        <div className="border-t pt-6 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} BugState. All rights reserved.
        </div>

      </div>

    </footer>
  )
}

export default Footer
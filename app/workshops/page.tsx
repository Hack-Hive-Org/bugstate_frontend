"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const Workshops = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white px-6">

      <div className="max-w-2xl text-center space-y-6">

        <h1 className="text-4xl md:text-6xl font-bold font-changa-one">
          More Workshops <br />
          <span className="text-lime-400">Coming Soon</span>
        </h1>

        <p className="text-lg text-purple-100 font-cabin">
          We are preparing more hands-on workshops to help developers
          learn modern backend systems, cloud infrastructure, and scalable architecture.
        </p>

        <p className="text-purple-200">
          Stay tuned for upcoming sessions.
        </p>

        <div className="pt-4">
          <Link href="/">
            <Button className="bg-black hover:bg-neutral-900 text-white">
              Go Back Home
            </Button>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Workshops
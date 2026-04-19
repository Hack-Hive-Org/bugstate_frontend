"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="font-cabin px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">

        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl px-8 py-16 md:px-16 md:py-20 shadow-2xl shadow-indigo-200">
          <h2 className="text-3xl md:text-5xl font-changa-one font-bold text-white leading-tight">
            Ready to Build Something Great?
          </h2>

          <p className="text-indigo-100 text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
            Whether you need a website, a mobile app, or a complete digital strategy —
            we&apos;re here to help you bring your vision to life.
          </p>

          <div className="flex items-center justify-center gap-4 pt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 font-cabin font-semibold shadow-lg px-7">
                Get a Free Consultation
              </Button>
            </Link>

            <Link href="/services">
              <Button size="lg" variant="outline" className="font-cabin text-white border-white/30 hover:bg-white/10 hover:text-white">
                View Services
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

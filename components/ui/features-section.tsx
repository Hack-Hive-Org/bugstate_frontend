"use client"

import { Zap, Shield, Users, TrendingUp, Clock, Headphones } from "lucide-react"

const features = [
  {
    name: "Fast Delivery",
    description: "We ship on time without compromising quality. Agile workflows keep your project moving.",
    icon: Zap,
  },
  {
    name: "Secure & Reliable",
    description: "Security-first development practices ensure your digital assets are protected.",
    icon: Shield,
  },
  {
    name: "Dedicated Team",
    description: "A focused team of designers, developers, and strategists working on your project.",
    icon: Users,
  },
  {
    name: "Growth Focused",
    description: "Every solution is designed to drive traffic, engagement, and conversions for your business.",
    icon: TrendingUp,
  },
  {
    name: "Ongoing Support",
    description: "We don't disappear after launch. Continuous maintenance and support to keep things running.",
    icon: Clock,
  },
  {
    name: "24/7 Communication",
    description: "Transparent updates and responsive communication throughout the project lifecycle.",
    icon: Headphones,
  },
]

export default function FeaturesSection() {
  return (
    <section className="font-cabin bg-slate-50 px-6 py-24">
      <div className="max-w-7xl mx-auto w-full space-y-14">

        <div className="text-center space-y-4">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Our Advantage</p>
          <h2 className="text-4xl md:text-5xl font-changa-one font-bold text-slate-900">
            Why Choose BugState
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            We combine technical expertise with creative thinking to deliver
            solutions that actually work for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5 text-indigo-600" />
              </div>

              <h3 className="text-lg font-semibold mb-2 text-slate-900">
                {feature.name}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

"use client"

import { Globe, Megaphone, FileText, Mail, Cog, Smartphone, Palette } from "lucide-react"
import Link from "next/link"

const services = [
  {
    name: "Website Development",
    description:
      "Custom, responsive websites built with modern frameworks. From business sites to complex web applications.",
    icon: Globe,
  },
  {
    name: "Ad Campaign",
    description:
      "Data-driven advertising campaigns across Google, Meta, and social platforms that maximize your ROI.",
    icon: Megaphone,
  },
  {
    name: "Landing Pages",
    description:
      "High-converting landing pages designed to capture leads and drive action for your products and services.",
    icon: FileText,
  },
  {
    name: "Branded Emails",
    description:
      "Professional email templates and campaigns that strengthen your brand and engage your audience.",
    icon: Mail,
  },
  {
    name: "Website Automation",
    description:
      "Automate repetitive tasks, workflows, and integrations to save time and reduce manual effort.",
    icon: Cog,
  },
  {
    name: "Mobile Application Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android that deliver seamless user experiences.",
    icon: Smartphone,
  },
  {
    name: "Web Designing",
    description:
      "Beautiful, user-centered UI/UX designs that make your brand stand out and keep visitors engaged.",
    icon: Palette,
  },
]

export default function ServicesSection() {
  return (
    <section className="font-cabin bg-white px-6 py-24">
      <div className="max-w-7xl mx-auto w-full space-y-14">

        <div className="text-center space-y-4">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-changa-one font-bold text-slate-900">
            Our Services
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            Everything you need to establish and grow your digital presence —
            all under one roof.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-indigo-50 hover:border-indigo-200 transition-all duration-300 group bg-white"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors duration-300">
                <service.icon className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors duration-300" />
              </div>

              <h3 className="text-base font-semibold mb-2 text-slate-900">
                {service.name}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/services"
            className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors text-sm"
          >
            View all service details &rarr;
          </Link>
        </div>

      </div>
    </section>
  )
}

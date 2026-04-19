"use client"

import { Button } from "@/components/ui/button"
import Footer from "@/components/ui/footer"
import Link from "next/link"
import {
  Globe,
  Megaphone,
  FileText,
  Mail,
  Cog,
  Smartphone,
  Palette,
  CheckCircle,
} from "lucide-react"

const services = [
  {
    name: "Website Development",
    description:
      "We build fast, responsive, and SEO-friendly websites tailored to your business needs. Whether it's a company site, e-commerce platform, or a complex web application — we deliver production-ready solutions using modern frameworks like Next.js, React, and Node.js.",
    features: [
      "Custom design & development",
      "Responsive across all devices",
      "SEO optimized from day one",
      "Performance tuned for speed",
    ],
    icon: Globe,
  },
  {
    name: "Ad Campaign",
    description:
      "Reach the right audience with data-driven advertising campaigns. We plan, execute, and optimize campaigns across Google Ads, Facebook, Instagram, and LinkedIn to maximize your return on investment.",
    features: [
      "Google & Meta Ads management",
      "Audience targeting & retargeting",
      "A/B testing & optimization",
      "Detailed analytics & reporting",
    ],
    icon: Megaphone,
  },
  {
    name: "Landing Pages",
    description:
      "Convert visitors into customers with high-performing landing pages. We design and develop focused, conversion-optimized pages for product launches, lead generation, and marketing campaigns.",
    features: [
      "Conversion-focused design",
      "Fast load times",
      "A/B test ready",
      "CRM & analytics integration",
    ],
    icon: FileText,
  },
  {
    name: "Branded Emails",
    description:
      "Strengthen your brand communication with professionally designed email templates. From newsletters to transactional emails, we create on-brand email experiences that drive engagement.",
    features: [
      "Custom HTML email templates",
      "Responsive email design",
      "Email automation setup",
      "Campaign performance tracking",
    ],
    icon: Mail,
  },
  {
    name: "Website Automation",
    description:
      "Eliminate repetitive tasks and streamline your business workflows. We build custom automations for form processing, notifications, CRM sync, scheduling, and more — so you can focus on what matters.",
    features: [
      "Workflow automation",
      "API integrations",
      "Automated reporting",
      "Custom scripts & bots",
    ],
    icon: Cog,
  },
  {
    name: "Mobile Application Development",
    description:
      "Launch your mobile presence with native and cross-platform apps for iOS and Android. We build intuitive, performant applications using React Native and Flutter that your users will love.",
    features: [
      "iOS & Android development",
      "Cross-platform with React Native / Flutter",
      "Push notifications & analytics",
      "App Store submission & support",
    ],
    icon: Smartphone,
  },
  {
    name: "Web Designing",
    description:
      "Great products start with great design. We create modern, user-centered UI/UX designs that are visually compelling and intuitive. From wireframes to polished prototypes — we bring your ideas to life.",
    features: [
      "UI/UX design & prototyping",
      "Brand identity & style guides",
      "Figma & design system delivery",
      "User research & testing",
    ],
    icon: Palette,
  },
]

const Services = () => {
  return (
    <div>
      <div className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-20">

          {/* Header */}
          <div className="text-center space-y-6 pt-10">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider font-cabin">What We Offer</p>
            <h1 className="text-4xl md:text-6xl font-bold font-changa-one text-slate-900">
              Our Services
            </h1>
            <p className="text-lg font-cabin text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We offer a full range of digital services to help your business
              establish a strong online presence and grow.
            </p>
          </div>

          {/* Service Cards */}
          <div className="space-y-8 font-cabin">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h2 className="text-2xl font-semibold text-slate-900">{service.name}</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                      What&apos;s included
                    </p>
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center py-10 font-cabin space-y-6">
            <h3 className="text-3xl font-changa-one font-bold text-slate-900">
              Have a project in mind?
            </h3>
            <p className="text-slate-500 max-w-lg mx-auto">
              Let&apos;s discuss how we can help bring your idea to life.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 px-7">
                Get in Touch
              </Button>
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Services

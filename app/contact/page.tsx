"use client"

import { Button } from "@/components/ui/button"
import Footer from "@/components/ui/footer"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Thanks for reaching out! We'll get back to you soon.")
    setFormData({ name: "", email: "", service: "", message: "" })
  }

  return (
    <div>
      <div className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Header */}
          <div className="text-center space-y-6 pt-10">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider font-cabin">Contact</p>
            <h1 className="text-4xl md:text-6xl font-bold font-changa-one text-slate-900">
              Get in Touch
            </h1>
            <p className="text-lg font-cabin text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Have a project idea or need help with your digital presence?
              We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 font-cabin">

            {/* Contact Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-slate-900">Send us a message</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-600 mb-1.5 font-medium">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1.5 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1.5 font-medium">Service Interested In</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  >
                    <option value="">Select a service</option>
                    <option value="website-development">Website Development</option>
                    <option value="ad-campaign">Ad Campaign</option>
                    <option value="landing-pages">Landing Pages</option>
                    <option value="branded-emails">Branded Emails</option>
                    <option value="website-automation">Website Automation</option>
                    <option value="mobile-app">Mobile Application Development</option>
                    <option value="web-designing">Web Designing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-600 mb-1.5 font-medium">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Email</p>
                      <p className="text-slate-500 text-sm">hello@bugstate.dev</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Phone</p>
                      <p className="text-slate-500 text-sm">+91 XXXXX XXXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Location</p>
                      <p className="text-slate-500 text-sm">India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">Working Hours</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monday – Friday</span>
                    <span className="text-slate-900 font-medium">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Saturday</span>
                    <span className="text-slate-900 font-medium">10:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sunday</span>
                    <span className="text-slate-900 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact

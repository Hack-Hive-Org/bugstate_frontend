"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "../provider/AuthProvider"
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function WorkshopBanner() {
    const {user} = useAuth();
    const registerUser = async () => {
  if (user?.id == null) {
    toast.message("Please login to register for the workshop.")
    return
  }

  try {
    // check if already registered
    const { data: existing } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", user.id)
      .eq("workshop", "spring_boot")
      .single()

    if (existing) {
      toast.message("You are already registered for this workshop.")
      return
    }

    const { error } = await supabase.from("registrations").insert({
      user_id: user.id,
      workshop: "spring_boot",
      workshop_name: "Spring Boot Workshop"
    })

    if (error) {
      console.error(error)
      toast.message("Registration failed.")
      return
    }

    toast.message("Successfully registered ")
  } catch (err) {
    console.error(err)
  }
}
  return (
    <section className="relative w-full min-h-[90vh] font-cabin overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white flex items-center">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="space-y-6">

          <h1 className="text-4xl md:text-6xl font-changa-one font-extrabold leading-[1.1] text-slate-900 tracking-tight">
            Spring Boot <br />
            <span className="text-indigo-600">Workshop</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-lg font-cabin leading-relaxed">
            Learn how to build scalable, production-ready, event-driven backend
            systems using modern backend architecture.
          </p>

          {/* Topics */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
              Microservices
            </span>
            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
              Docker
            </span>
            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
              Event-Driven Architecture
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4 pt-4">
            <Button onClick={registerUser} size="lg" className="bg-indigo-600 hover:bg-indigo-700 font-cabin text-white shadow-lg shadow-indigo-200 px-7">
              Register For Free
            </Button>

            <span className="text-sm text-slate-500">
              Limited seats available
            </span>
          </div>
      

        </div>

        {/* Right Info Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-xl shadow-slate-100">

          <h3 className="text-xl font-semibold text-slate-900">
            Workshop Details
          </h3>

          <div className="space-y-4 text-sm">

            <div className="flex justify-between">
              <span className="text-slate-500">Date</span>
              <span className="font-medium text-slate-900">
                20 March 2026
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Time</span>
              <span className="font-medium text-slate-900">
                1:00 – 2:30 PM
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Mode</span>
              <span className="font-medium text-slate-900">
                Online
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Schedule</span>
              <span className="font-medium text-slate-900">
                3 days / week
              </span>
            </div>

          </div>

          <div className="pt-5 border-t border-slate-100 text-sm text-slate-500">
            Build production-grade backend systems using modern practices.
          </div>

        </div>

      </div>

    </section>
  )
}
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
    <section className="relative w-full min-h-screen font-cabin overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white flex items-center">

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="space-y-6">

          <h1 className="text-4xl md:text-6xl font-changa-one font-extrabold leading-tight">
            Spring Boot <br />
            <span className="text-lime-400">Workshop</span>
          </h1>

          <p className="text-xl text-purple-100 max-w-lg font-cabin">
            Learn how to build scalable, production-ready, event-driven backend
            systems using modern backend architecture.
          </p>

          {/* Topics */}
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              Microservices
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              Docker
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              Event-Driven Architecture
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4 pt-4 text-lg">
            <Button onClick={registerUser} size="lg" className="bg-black font-cabin text-white hover:bg-neutral-900">
              Register For Free
            </Button>

            <span className="text-sm text-purple-200">
              Limited seats available
            </span>
          </div>
      

        </div>

        {/* Right Info Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 space-y-6">

          <h3 className="text-xl font-semibold">
            Workshop Details
          </h3>

          <div className="space-y-3 text-purple-100">

            <div className="flex justify-between">
              <span>Date</span>
              <span className="font-medium text-white">
                20 March 2026
              </span>
            </div>

            <div className="flex justify-between">
              <span>Time</span>
              <span className="font-medium text-white">
                1:00 – 2:30 PM
              </span>
            </div>

            <div className="flex justify-between">
              <span>Mode</span>
              <span className="font-medium text-white">
                Online
              </span>
            </div>

            <div className="flex justify-between">
              <span>Schedule</span>
              <span className="font-medium text-white">
                3 days / week
              </span>
            </div>

          </div>

          <div className="pt-4 border-t border-white/20 text-sm text-purple-200">
            Build production-grade backend systems using modern practices.
          </div>

        </div>

      </div>

    </section>
  )
}
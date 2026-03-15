"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/provider/AuthProvider"

const Profile = () => {
  const { user } = useAuth()
  const name = user?.user_metadata?.name
  const avatar = user?.user_metadata?.avatar_url
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRegistrations = async () => {
    if (!user?.id) return

    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", user.id)

    if (!error && data) {
      setRegistrations(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchRegistrations()
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white px-6 py-16">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* User Info */}
      <div className="bg-white/10 border font-cabin border-white/20 backdrop-blur-lg rounded-2xl p-8">

  <h2 className="text-2xl font-semibold mb-6">
    Your Profile
  </h2>

  <div className="flex items-center gap-6">

    {/* Avatar */}
    <img
      src={avatar}
      alt="User Avatar"
      className="w-20 h-20 rounded-full border-2 border-white/30"
    />

    {/* User Details */}
    <div className="space-y-1">

      <p className="text-xl font-semibold text-white">
        {name}
      </p>

      <p className="text-purple-200 text-sm">
        {user.email}
      </p>

    </div>

  </div>

</div>

        {/* Registered Workshops */}
        <div className="bg-white/10 border font-cabin border-white/20 backdrop-blur-lg rounded-2xl p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Registered Workshops
          </h2>

          {loading ? (
            <p className="text-purple-200">Loading workshops...</p>
          ) : registrations.length === 0 ? (
            <p className="text-purple-200">
              You haven't registered for any workshops yet.
            </p>
          ) : (
            <div className="space-y-4">

              {registrations.map((workshop) => (
                <div
                  key={workshop.id}
                  className="bg-white/10 border border-white/20 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {workshop.workshop_name}
                    </p>

                    <p className="text-sm text-purple-200">
                      Workshop ID: {workshop.workshop}
                    </p>
                  </div>

                  <Button size="sm" variant="secondary">
                    Registered
                  </Button>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default Profile
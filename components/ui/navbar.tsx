"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import LoginPopup from "./login-popup"
import { useAuth } from "../provider/AuthProvider"
import { supabase } from "@/lib/supabase"

export default function Navbar() {
  const { user } = useAuth()

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="text-3xl font-changa-one">
          BugState
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-cabin">
          <Link href="/workshops">Workshops</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
             {!user? (
            <></>) : (<Link href="/profile">Profile</Link>)
          }
          {!user ? (
            <LoginPopup />
          ) : (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          )}
         
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6 font-cabin">
                <Link href="/workshops">Workshops</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/about">About</Link>

                {!user ? (
                  <LoginPopup />
                ) : (
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  )
}
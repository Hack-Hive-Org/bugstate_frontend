"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="text-2xl font-changa-one text-slate-900 tracking-tight">
          BugState
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-cabin">
          <Link href="/services" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Services</Link>
          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">About</Link>
          <Link href="/blogs" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Blog</Link>
          <Link href="/contact">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 font-medium text-sm px-5">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-700">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-white">
              <div className="flex flex-col gap-6 mt-8 font-cabin">
                <Link href="/services" className="text-slate-700 font-medium hover:text-indigo-600 transition-colors">Services</Link>
                <Link href="/about" className="text-slate-700 font-medium hover:text-indigo-600 transition-colors">About</Link>
                <Link href="/blogs" className="text-slate-700 font-medium hover:text-indigo-600 transition-colors">Blog</Link>
                <Link href="/contact">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full shadow-sm">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  )
}

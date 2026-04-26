"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/provider/AuthProvider"
import { isAdmin } from "@/lib/admin"
import { db } from "@/lib/firebase"
import { supabase } from "@/lib/supabase"
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore"
import { FcGoogle } from "react-icons/fc"
import { Download, RefreshCw, Search, ShieldAlert, Mail, Calendar, Inbox } from "lucide-react"
import { toast } from "sonner"

type ContactSubmission = {
  id: string
  name: string
  email: string
  service: string
  message: string
  createdAt: Date | null
}

type WorkshopRegistration = {
  id: string | number
  user_id: string
  workshop: string
  workshop_name: string
  created_at: string | null
}

type TabKey = "contact" | "workshops"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const admin = isAdmin(user?.email)

  const [tab, setTab] = useState<TabKey>("contact")
  const [search, setSearch] = useState("")
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [workshops, setWorkshops] = useState<WorkshopRegistration[]>([])
  const [contactsLoading, setContactsLoading] = useState(false)
  const [workshopsLoading, setWorkshopsLoading] = useState(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const loadContacts = async () => {
    setContactsLoading(true)
    try {
      const q = query(
        collection(db, "contact_submissions"),
        orderBy("createdAt", "desc"),
      )
      const snap = await getDocs(q)
      const rows: ContactSubmission[] = snap.docs.map((d) => {
        const data = d.data() as Record<string, unknown>
        const ts = data.createdAt as Timestamp | undefined
        return {
          id: d.id,
          name: (data.name as string) ?? "",
          email: (data.email as string) ?? "",
          service: (data.service as string) ?? "",
          message: (data.message as string) ?? "",
          createdAt: ts?.toDate ? ts.toDate() : null,
        }
      })
      setContacts(rows)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load contact submissions. Check Firestore rules.")
    } finally {
      setContactsLoading(false)
    }
  }

  const loadWorkshops = async () => {
    setWorkshopsLoading(true)
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false })
      if (error) throw error
      setWorkshops((data ?? []) as WorkshopRegistration[])
    } catch (err) {
      console.error(err)
      toast.error("Failed to load registrations. Check Supabase RLS policies.")
    } finally {
      setWorkshopsLoading(false)
    }
  }

  useEffect(() => {
    if (!admin) return
    loadContacts()
    loadWorkshops()
  }, [admin])

  const filteredContacts = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return contacts
    return contacts.filter((c) =>
      [c.name, c.email, c.service, c.message].some((v) =>
        (v ?? "").toLowerCase().includes(s),
      ),
    )
  }, [contacts, search])

  const filteredWorkshops = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return workshops
    return workshops.filter((w) =>
      [w.user_id, w.workshop, w.workshop_name].some((v) =>
        (v ?? "").toLowerCase().includes(s),
      ),
    )
  }, [workshops, search])

  const exportCSV = () => {
    const filename =
      tab === "contact" ? "contact-submissions.csv" : "workshop-registrations.csv"
    const csv =
      tab === "contact"
        ? toCSV(
            ["Date", "Name", "Email", "Service", "Message"],
            filteredContacts.map((c) => [
              c.createdAt ? c.createdAt.toISOString() : "",
              c.name,
              c.email,
              c.service,
              c.message,
            ]),
          )
        : toCSV(
            ["Date", "User ID", "Workshop", "Workshop Name"],
            filteredWorkshops.map((w) => [
              w.created_at ?? "",
              w.user_id,
              w.workshop,
              w.workshop_name,
            ]),
          )
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center font-cabin">
        <p className="text-slate-500">Loading…</p>
      </main>
    )
  }

  if (!user) {
    return <UnauthenticatedView />
  }

  if (!admin) {
    return <ForbiddenView email={user.email} />
  }

  return (
    <main className="min-h-screen bg-slate-50 font-cabin">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              Admin
            </p>
            <h1 className="text-3xl md:text-4xl font-changa-one text-slate-900 mt-2">
              Form Submissions
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Signed in as <span className="font-medium text-slate-700">{user.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                if (tab === "contact") loadContacts()
                else loadWorkshops()
              }}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button
              onClick={exportCSV}
              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <StatCard
            icon={<Mail className="w-5 h-5 text-indigo-600" />}
            label="Contact submissions"
            value={contacts.length}
            loading={contactsLoading}
            onClick={() => setTab("contact")}
            active={tab === "contact"}
          />
          <StatCard
            icon={<Calendar className="w-5 h-5 text-indigo-600" />}
            label="Workshop registrations"
            value={workshops.length}
            loading={workshopsLoading}
            onClick={() => setTab("workshops")}
            active={tab === "workshops"}
          />
        </div>

        {/* Tabs + Search */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 border-b border-slate-100">
            <div className="flex gap-2">
              <TabButton
                active={tab === "contact"}
                onClick={() => setTab("contact")}
              >
                Contact ({contacts.length})
              </TabButton>
              <TabButton
                active={tab === "workshops"}
                onClick={() => setTab("workshops")}
              >
                Workshops ({workshops.length})
              </TabButton>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full md:w-64"
              />
            </div>
          </div>

          {tab === "contact" ? (
            <ContactTable
              rows={filteredContacts}
              loading={contactsLoading}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ) : (
            <WorkshopTable rows={filteredWorkshops} loading={workshopsLoading} />
          )}
        </div>
      </div>
    </main>
  )
}

function StatCard({
  icon,
  label,
  value,
  loading,
  onClick,
  active,
}: {
  icon: React.ReactNode
  label: string
  value: number
  loading: boolean
  onClick: () => void
  active: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left bg-white border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md ${
        active ? "border-indigo-500 ring-2 ring-indigo-100" : "border-slate-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-semibold text-slate-900 mt-0.5">
            {loading ? "…" : value}
          </p>
        </div>
      </div>
    </button>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-600 text-white"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  )
}

function ContactTable({
  rows,
  loading,
  expanded,
  setExpanded,
}: {
  rows: ContactSubmission[]
  loading: boolean
  expanded: Record<string, boolean>
  setExpanded: (v: Record<string, boolean>) => void
}) {
  if (loading) {
    return <TableState>Loading submissions…</TableState>
  }
  if (rows.length === 0) {
    return (
      <TableState>
        <Inbox className="w-8 h-8 text-slate-300 mb-2" />
        No contact submissions yet.
      </TableState>
    )
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
          <tr>
            <th className="text-left px-6 py-3 font-medium">Date</th>
            <th className="text-left px-6 py-3 font-medium">Name</th>
            <th className="text-left px-6 py-3 font-medium">Email</th>
            <th className="text-left px-6 py-3 font-medium">Service</th>
            <th className="text-left px-6 py-3 font-medium">Message</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => {
            const isExpanded = expanded[r.id]
            const truncated = r.message.length > 120 && !isExpanded
            return (
              <tr key={r.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                  {r.createdAt ? formatDate(r.createdAt) : "—"}
                </td>
                <td className="px-6 py-4 text-slate-900 font-medium whitespace-nowrap">
                  {r.name || "—"}
                </td>
                <td className="px-6 py-4 text-slate-700 whitespace-nowrap">
                  <a
                    href={`mailto:${r.email}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {r.email}
                  </a>
                </td>
                <td className="px-6 py-4">
                  {r.service ? (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
                      {r.service}
                    </span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-700 max-w-md">
                  <span className="whitespace-pre-wrap">
                    {truncated ? `${r.message.slice(0, 120)}…` : r.message}
                  </span>
                  {r.message.length > 120 && (
                    <button
                      onClick={() =>
                        setExpanded({ ...expanded, [r.id]: !isExpanded })
                      }
                      className="ml-2 text-xs text-indigo-600 hover:underline"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function WorkshopTable({
  rows,
  loading,
}: {
  rows: WorkshopRegistration[]
  loading: boolean
}) {
  if (loading) {
    return <TableState>Loading registrations…</TableState>
  }
  if (rows.length === 0) {
    return (
      <TableState>
        <Inbox className="w-8 h-8 text-slate-300 mb-2" />
        No workshop registrations yet.
      </TableState>
    )
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
          <tr>
            <th className="text-left px-6 py-3 font-medium">Date</th>
            <th className="text-left px-6 py-3 font-medium">Workshop</th>
            <th className="text-left px-6 py-3 font-medium">User ID</th>
            <th className="text-left px-6 py-3 font-medium">Slug</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={String(r.id)} className="hover:bg-slate-50/50">
              <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                {r.created_at ? formatDate(new Date(r.created_at)) : "—"}
              </td>
              <td className="px-6 py-4 text-slate-900 font-medium">
                {r.workshop_name || "—"}
              </td>
              <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                {r.user_id}
              </td>
              <td className="px-6 py-4">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs">
                  {r.workshop}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TableState({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-sm">
      {children}
    </div>
  )
}

function UnauthenticatedView() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: typeof window !== "undefined" ? `${window.location.origin}/admin` : undefined },
    })
    if (error) toast.error("Login failed. Try again.")
  }
  return (
    <main className="min-h-[80vh] flex items-center justify-center font-cabin px-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-10 max-w-md w-full text-center shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-6 h-6 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-changa-one text-slate-900">Admin sign-in required</h1>
        <p className="text-slate-500 text-sm mt-2">
          Sign in with an authorized admin Google account to view form submissions.
        </p>
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="mt-6 w-full gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </Button>
      </div>
    </main>
  )
}

function ForbiddenView({ email }: { email: string | undefined }) {
  const signOut = async () => {
    await supabase.auth.signOut()
  }
  return (
    <main className="min-h-[80vh] flex items-center justify-center font-cabin px-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-10 max-w-md w-full text-center shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-6 h-6 text-red-600" />
        </div>
        <h1 className="text-2xl font-changa-one text-slate-900">Access denied</h1>
        <p className="text-slate-500 text-sm mt-2">
          {email ? (
            <>
              <span className="font-medium text-slate-700">{email}</span> is not on the admin
              allow-list.
            </>
          ) : (
            "Your account is not on the admin allow-list."
          )}
        </p>
        <p className="text-slate-400 text-xs mt-4">
          Add your email to <code className="bg-slate-100 px-1.5 py-0.5 rounded">NEXT_PUBLIC_ADMIN_EMAILS</code> in your env file (comma-separated).
        </p>
        <Button variant="outline" onClick={signOut} className="mt-6 w-full">
          Sign out
        </Button>
      </div>
    </main>
  )
}

function toCSV(headers: string[], rows: (string | number)[][]): string {
  const escape = (v: string | number) => {
    const s = String(v ?? "")
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  return [headers, ...rows]
    .map((row) => row.map(escape).join(","))
    .join("\n")
}

function formatDate(d: Date): string {
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

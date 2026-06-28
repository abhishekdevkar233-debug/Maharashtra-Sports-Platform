import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye, EyeOff, ArrowRight, Lock, Mail, RefreshCw,
  ShieldCheck, Users, Trophy, Building2, BookOpen,
  Database, BarChart3, GraduationCap, User, Bell,
  Settings, LogOut, ChevronRight, LayoutDashboard, Plus, Palette,
} from "lucide-react";
import { VisualEditor } from "@/components/editor/VisualEditor";
import { Header } from "@/components/layout/Header";
import { GMSPortal } from "@/components/gms/GMSPortal";
import { HMSPortal } from "@/components/gms/HMSPortal";
import { HRPortal } from "@/components/gms/HRPortal";
import { SSCMPortal } from "@/components/gms/SSCMPortal";
import { CRDMPortal } from "@/components/gms/CRDMPortal";
import { LMSPortal } from "@/components/gms/LMSPortal";
import { AIMAPPortal } from "@/components/gms/AIMAPPortal";
import { AthleteDashboard } from "@/components/gms/AthletePortal";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Login — Sports & Youth Services" },
    { name: "description", content: "Sign in to the Sports & Youth Services portal, Government of Maharashtra." },
  ] }),
  component: Page,
});

const ROLES = [
  { id: "admin",   label: "Admin",   icon: ShieldCheck, color: "#363092" },
  { id: "athlete", label: "Athlete", icon: Trophy,       color: "#FF6B35" },
  { id: "other",   label: "Other",   icon: Users,        color: "#0ea5e9" },
];

const OTHER_ROLES = [
  "District Sports Officer",
  "State Sports Officer",
  "Coach / Trainer",
  "Institute / Academy",
  "Media Representative",
];

const ADMIN_MODULES = [
  {
    icon: Trophy,
    label: "Games Management System",
    short: "GMS",
    desc: "Manage tournaments, events, fixtures & results",
    color: "#363092",
    bg: "#eeeefa",
  },
  {
    icon: Building2,
    label: "Hostel Management System",
    short: "HMS",
    desc: "Athlete accommodation, allotments & facilities",
    color: "#7c3aed",
    bg: "#f3f0ff",
  },
  {
    icon: User,
    label: "HR & Employee Payroll Management",
    short: "HR & Pay",
    desc: "Staff records, payroll, leaves & appraisals",
    color: "#0891b2",
    bg: "#e0f7fa",
  },
  {
    icon: GraduationCap,
    label: "Scholarship, Stipend & Certificate Management",
    short: "SSCM",
    desc: "Award scholarships, stipends & merit certificates",
    color: "#059669",
    bg: "#e6f7f2",
  },
  {
    icon: Database,
    label: "Central Repository & Data Management",
    short: "CRDM",
    desc: "Unified data store for athletes, clubs & assets",
    color: "#d97706",
    bg: "#fef3e2",
  },
  {
    icon: BookOpen,
    label: "Learning Management System & e-Learning",
    short: "LMS",
    desc: "Online courses, certifications & coach training",
    color: "#dc2626",
    bg: "#fee2e2",
  },
  {
    icon: BarChart3,
    label: "AI-Based Monitoring & Analytics Platform",
    short: "AI MAP",
    desc: "Real-time dashboards, predictions & insights",
    color: "#7c3aed",
    bg: "#f3f0ff",
  },
];

/* ── GMS Portal is in @/components/gms/GMSPortal.tsx ──────────── */


/* ── Admin Dashboard ─────────────────────────────────────────────── */
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  if (activeModule === "GMS") return <GMSPortal onBack={() => setActiveModule(null)} />;
  if (activeModule === "HMS") return <HMSPortal onBack={() => setActiveModule(null)} />;
  if (activeModule === "HR & Pay") return <HRPortal onBack={() => setActiveModule(null)} />;
  if (activeModule === "SSCM") return <SSCMPortal onBack={() => setActiveModule(null)} />;
  if (activeModule === "CRDM") return <CRDMPortal onBack={() => setActiveModule(null)} />;
  if (activeModule === "LMS") return <LMSPortal onBack={() => setActiveModule(null)} />;
  if (activeModule === "AI MAP") return <AIMAPPortal onBack={() => setActiveModule(null)} />;

  return (
    <>
    <VisualEditor open={editorOpen} onClose={() => setEditorOpen(false)} />
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>

      {/* Top navbar */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        {/* Main nav row */}
        <div className="h-14 flex items-center px-6 gap-4">
        <div className="flex items-center gap-2.5 mr-auto">
          <div className="h-8 w-8 rounded-lg grid place-items-center" style={{ background: "#363092" }}>
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900 leading-none">DSYS Maharashtra</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Admin Portal</div>
          </div>
        </div>

        <button className="relative h-9 w-9 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-[#363092] hover:text-[#363092] transition">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <button
          onClick={() => setEditorOpen(o => !o)}
          title="Visual Editor"
          className={`h-9 w-9 rounded-xl border grid place-items-center transition ${editorOpen ? "border-[#363092] bg-[#363092] text-white" : "border-gray-200 text-gray-500 hover:border-[#363092] hover:text-[#363092]"}`}>
          <Palette className="h-4 w-4" />
        </button>
        <button className="h-9 w-9 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-[#363092] hover:text-[#363092] transition">
          <Settings className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="h-9 w-9 rounded-xl grid place-items-center text-white text-xs font-bold" style={{ background: "#363092" }}>AD</div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-gray-900 leading-none">Admin User</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Super Administrator</div>
          </div>
          <button onClick={onLogout}
            className="ml-2 h-8 px-3 rounded-lg border border-gray-200 flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:border-red-300 hover:text-red-500 transition">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">

        {/* Welcome bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: "#363092" }}>
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Welcome back, Admin</h1>
            <p className="text-sm text-gray-500">Select a module to get started</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Athletes", value: "12,480", color: "#363092" },
            { label: "Active Events",  value: "34",      color: "#059669" },
            { label: "Hostels",        value: "18",      color: "#7c3aed" },
            { label: "Scholarships",   value: "2,310",   color: "#d97706" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm">
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Modules grid */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Management Modules</h2>
          <span className="text-xs text-gray-400">{ADMIN_MODULES.length} modules available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ADMIN_MODULES.map((m, i) => (
            <button key={i} onClick={() => setActiveModule(m.short)}
              className={`text-left rounded-2xl border p-5 shadow-sm transition-all duration-200 group hover:shadow-md hover:-translate-y-0.5 ${activeModule === m.short ? "border-2 shadow-md" : "border-gray-200 bg-white"}`}
              style={activeModule === m.short ? { borderColor: m.color, background: m.bg } : {}}>
              <div className="flex items-start justify-between mb-4">
                <div className="h-11 w-11 rounded-xl grid place-items-center" style={{ background: m.bg }}>
                  <m.icon className="h-5 w-5" style={{ color: m.color }} />
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition mt-1" style={activeModule === m.short ? { color: m.color } : {}} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: m.color }}>{m.short}</div>
              <div className="text-sm font-bold text-gray-900 leading-snug mb-1.5">{m.label}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{m.desc}</div>
            </button>
          ))}

          {/* Placeholder 8th card — coming soon */}
          <div className="rounded-2xl border border-dashed border-gray-300 p-5 flex flex-col items-center justify-center text-center opacity-50 cursor-not-allowed select-none">
            <div className="h-11 w-11 rounded-xl bg-gray-100 grid place-items-center mb-3">
              <Settings className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">More Modules</div>
            <div className="text-[11px] text-gray-400 mt-1">Coming soon</div>
          </div>
        </div>

      </main>
    </div>
    </>
  );
}

/* ── Login Page ──────────────────────────────────────────────────── */
function Page() {
  const [role, setRole] = useState("admin");
  const [show, setShow] = useState(false);
  const [otherRole, setOtherRole] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const activeRole = ROLES.find(r => r.id === role)!;

  if (loggedIn && role === "admin")   return <AdminDashboard   onLogout={() => setLoggedIn(false)} />;
  if (loggedIn && role === "athlete") return <AthleteDashboard onLogout={() => setLoggedIn(false)} />;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoggedIn(true);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg,#f0f0fa 0%,#e8e8f5 100%)" }}>
      <Header />
      <div className="flex-1 flex items-center justify-center py-10 px-4">
        <div className="fixed inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(#363092 1px,transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative w-full max-w-lg">

          {/* Role tabs */}
          <div className="flex rounded-2xl bg-white border border-gray-200 shadow-sm p-1.5 mb-5 gap-1">
            {ROLES.map(r => (
              <button key={r.id} onClick={() => setRole(r.id)}
                className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-semibold transition ${role === r.id ? "bg-[#363092] text-white shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
                <r.icon className="h-4 w-4" />
                {r.label}
              </button>
            ))}
          </div>

          {/* Form card */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-[0_30px_60px_-20px_rgba(54,48,146,0.18)] overflow-hidden">

            {/* Header strip */}
            <div className="px-8 py-5 border-b border-gray-100" style={{ background: "#363092" + "08" }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: "#363092" + "15" }}>
                  <activeRole.icon className="h-5 w-5" style={{ color: "#363092" }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {role === "admin" ? "Admin Sign In" : role === "athlete" ? "Athlete Sign In" : "Portal Sign In"}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {role === "admin" ? "Access all 7 management modules"
                      : role === "athlete" ? "View your profile, scores & events"
                      : "Sign in with your official credentials"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {role === "other" && (
                <div className="mb-4">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Select Your Role</label>
                  <div className="mt-1.5 relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select value={otherRole} onChange={e => setOtherRole(e.target.value)}
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/15 outline-none text-sm bg-white transition appearance-none">
                      <option value="">Select role…</option>
                      {OTHER_ROLES.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    {role === "admin" ? "Admin ID or Email" : "Email or Mobile"}
                  </label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text"
                      placeholder={role === "admin" ? "admin@dsys.mah.gov.in" : "you@example.com or +91 9XXXXXXXXX"}
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/15 outline-none text-sm transition" />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Password</label>
                  <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type={show ? "text" : "password"} placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-10 rounded-xl border border-gray-200 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/15 outline-none text-sm transition" />
                    <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 accent-[#363092]" /> Remember me
                  </label>
                  <a href="#" className="text-xs font-semibold text-[#363092] hover:underline">Forgot password?</a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-11 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center font-mono tracking-[0.3em] text-sm text-gray-700 select-none relative">
                    A7K9X2
                    <button type="button" className="absolute right-2.5 text-gray-400 hover:text-[#363092]">
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <input type="text" placeholder="Enter captcha"
                    className="flex-1 h-11 px-3 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm" />
                </div>

                <button type="submit"
                  className="w-full h-12 rounded-xl text-white font-bold text-base inline-flex items-center justify-center gap-2 transition hover:opacity-90 shadow-lg mt-2"
                  style={{ background: "linear-gradient(135deg,#363092,#1e2a7a)" }}>
                  Sign In <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {role !== "admin" && (
                <>
                  <div className="mt-5 flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest">
                    <div className="flex-1 h-px bg-gray-100" /> New to portal? <div className="flex-1 h-px bg-gray-100" />
                  </div>
                  <Link to="/register"
                    className="mt-4 w-full h-11 rounded-xl border-2 border-[#363092] text-[#363092] font-semibold text-sm inline-flex items-center justify-center gap-2 transition hover:bg-[#363092] hover:text-white">
                    Create an Account <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-gray-400">
            Directorate of Sports & Youth Services, Maharashtra · Secure Portal
          </p>
        </div>
      </div>
    </div>
  );
}

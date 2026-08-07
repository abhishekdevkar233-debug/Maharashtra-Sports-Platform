import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutGrid, BookOpen, GraduationCap as SubjectsIcon, ClipboardList, FileText,
  CalendarDays, Download, Sparkles, User, Search, Bell, Menu, X,
  Languages, Users2, Megaphone, ShieldCheck, PhoneCall, Smartphone,
} from "lucide-react";
import { STUDENT, LMS_COLORS } from "@/lib/lms-data";

const NAV = [
  { label: "Dashboard", to: "/lms", icon: LayoutGrid },
  { label: "My Learning", to: "/lms/my-learning", icon: BookOpen },
  { label: "Subjects", to: "/lms/subjects", icon: SubjectsIcon },
  { label: "Assignments", to: "/lms/assignments", icon: ClipboardList },
  { label: "Exams", to: "/lms/exams", icon: FileText },
  { label: "Competition Calendar", to: "/lms/calendar", icon: CalendarDays },
  { label: "Downloads", to: "/lms/downloads", icon: Download },
  { label: "AI Mentor (MOA Mitra)", to: "/lms/ai-mentor", icon: Sparkles },
  { label: "Profile", to: "/lms/profile", icon: User },
  { label: "App View", to: "/lms/app", icon: Smartphone },
];

const OTHER_PORTALS = [
  { label: "Teacher Portal", icon: Users2 },
  { label: "Coach Dashboard", icon: Megaphone },
  { label: "Directorate Admin", icon: ShieldCheck },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link to="/lms" onClick={onNavigate} className="flex items-center gap-2.5 px-5 h-16 shrink-0 border-b" style={{ borderColor: LMS_COLORS.border }}>
        <div className="h-9 w-9 rounded-xl grid place-items-center text-white shrink-0 text-base font-bold" style={{ background: `linear-gradient(135deg, ${LMS_COLORS.primary}, ${LMS_COLORS.primaryDark})` }}>
          अ
        </div>
        <div className="min-w-0">
          <div className="text-[13px] font-bold text-slate-900 leading-tight truncate">Athlete Learning Hub</div>
          <div className="text-[11px] text-slate-400 leading-tight truncate">Sports & Youth Services, MH</div>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const active = item.to === "/lms" ? pathname === "/lms" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all"
              style={active
                ? { background: LMS_COLORS.primarySoft, color: LMS_COLORS.primary }
                : { color: "#475569" }}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={active ? 2.3 : 1.9} style={{ color: active ? LMS_COLORS.primary : "#94A3B8" }} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-3 border-t" style={{ borderColor: LMS_COLORS.border }}>
          <div className="px-3 pb-2 text-[10.5px] font-bold tracking-wider text-slate-400 uppercase">Other Portals</div>
          {OTHER_PORTALS.map((p) => (
            <div key={p.label} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-400 cursor-not-allowed">
              <p.icon className="h-[18px] w-[18px] shrink-0 text-slate-300" strokeWidth={1.9} />
              <span className="truncate">{p.label}</span>
            </div>
          ))}
        </div>
      </nav>

      <div className="p-3 border-t" style={{ borderColor: LMS_COLORS.border }}>
        <div className="rounded-2xl p-4" style={{ background: LMS_COLORS.accentSoft }}>
          <div className="flex items-center gap-2 mb-1">
            <PhoneCall className="h-3.5 w-3.5" style={{ color: LMS_COLORS.accent }} />
            <div className="text-[12.5px] font-bold text-slate-800">Emergency academic support</div>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5">On tour? Reach a teacher within 30 minutes.</p>
          <button className="w-full rounded-xl bg-white border py-2 text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition" style={{ borderColor: LMS_COLORS.border }}>
            Call helpdesk
          </button>
        </div>
      </div>
    </div>
  );
}

export function LmsShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen font-[Inter,sans-serif]" style={{ background: LMS_COLORS.bg }}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-[264px] bg-white border-r z-30" style={{ borderColor: LMS_COLORS.border }}>
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-2xl">
            <div className="flex items-center justify-end px-3 pt-3">
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-slate-100" aria-label="Close menu">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-[264px]">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b flex items-center gap-3 px-4 sm:px-6" style={{ borderColor: LMS_COLORS.border }}>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 shrink-0" aria-label="Open menu">
            <Menu className="h-5 w-5 text-slate-600" />
          </button>

          <div className="hidden md:flex items-center gap-2.5 rounded-full bg-slate-100 pl-4 pr-2.5 py-2 flex-1 max-w-xl">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              placeholder="Search subjects, lectures, notes, teachers…"
              className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400"
            />
            <kbd className="hidden lg:inline-flex items-center rounded-md border bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 shrink-0" style={{ borderColor: LMS_COLORS.border }}>
              Ctrl K
            </kbd>
          </div>

          <div className="flex-1 md:hidden" />

          <button className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-slate-600 hover:text-slate-900 transition shrink-0">
            <Languages className="h-4 w-4" /> English
          </button>

          <button className="relative p-2 rounded-full hover:bg-slate-100 shrink-0" aria-label="Notifications">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full" style={{ background: LMS_COLORS.accent }} />
          </button>

          <Link to="/lms/profile" className="flex items-center gap-2.5 shrink-0">
            <div className="h-9 w-9 rounded-full grid place-items-center text-white text-xs font-bold shrink-0" style={{ background: LMS_COLORS.primary }}>
              {STUDENT.initials}
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-[13px] font-bold text-slate-900">{STUDENT.name}</div>
              <div className="text-[11px] text-slate-400">{STUDENT.course}</div>
            </div>
          </Link>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1400px] mx-auto">
          {title && (
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h1>
              {subtitle && <p className="text-[13px] text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

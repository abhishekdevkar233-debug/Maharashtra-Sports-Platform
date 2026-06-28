import React, { useState } from "react";
import {
  Trophy, Wallet, Brain, Home, GraduationCap, MessageSquare,
  ArrowLeft, Bell, LogOut, LayoutDashboard, ChevronRight,
  Award, Calendar, MapPin, CheckCircle, Clock, AlertCircle,
  Download, BookOpen, Send, TrendingUp, Zap,
  Play, Lock, Star, FileText, Video, ChevronDown, ChevronUp, BarChart2,
} from "lucide-react";
const ACCENT = "#f97316";

const ATHLETE_MODULES = [
  {
    icon: Trophy,
    label: "My Events & Fixtures",
    short: "Events",
    desc: "View tournaments, match schedules, results & download participation certificates",
    color: "#363092",
    bg: "#eeeefa",
  },
  {
    icon: Wallet,
    label: "Scholarships & Schemes",
    short: "Scholarships",
    desc: "Track applied schemes, disbursement history & upload documents",
    color: "#059669",
    bg: "#e6f7f2",
  },
  {
    icon: Brain,
    label: "Performance & AI Analytics",
    short: "Performance",
    desc: "AI-powered score, attribute breakdown, injury risk & training recommendations",
    color: "#7c3aed",
    bg: "#f3f0ff",
  },
  {
    icon: Home,
    label: "Hostel & Accommodation",
    short: "Hostel",
    desc: "Room details, mess schedule, leave balance & maintenance requests",
    color: "#ec4899",
    bg: "#fdf2f8",
  },
  {
    icon: GraduationCap,
    label: "Training & e-Learning",
    short: "Training",
    desc: "Enrolled courses, video library, progress tracker & certifications",
    color: "#dc2626",
    bg: "#fee2e2",
  },
  {
    icon: MessageSquare,
    label: "Grievances & Support",
    short: "Grievances",
    desc: "Submit complaints, track resolution status & communicate with officials",
    color: "#0891b2",
    bg: "#e0f7fa",
  },
];

/* ── Shared header ──────────────────────────────────────────────── */
function AthleteHeader({
  onBack,
  onLogout,
  subtitle,
}: {
  onBack?: () => void;
  onLogout: () => void;
  subtitle: string;
}) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="h-14 flex items-center px-6 gap-4">
        <div className="flex items-center gap-2.5 mr-auto">
          {onBack && (
            <button
              onClick={onBack}
              className="h-8 px-3 rounded-lg border border-gray-200 flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:border-orange-400 hover:text-orange-500 transition mr-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          )}
          <div className="h-8 w-8 rounded-lg grid place-items-center" style={{ background: ACCENT }}>
            <Trophy className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900 leading-none">DSYS Maharashtra</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{subtitle}</div>
          </div>
        </div>

        <button className="relative h-9 w-9 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-orange-400 hover:text-orange-500 transition">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div
            className="h-9 w-9 rounded-xl grid place-items-center text-white text-xs font-bold"
            style={{ background: ACCENT }}
          >
            RS
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-gray-900 leading-none">Rahul Shinde</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Athletics · ATH-2024-00481</div>
          </div>
          <button
            onClick={onLogout}
            className="ml-2 h-8 px-3 rounded-lg border border-gray-200 flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:border-red-300 hover:text-red-500 transition"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}

/* ── Status pill ────────────────────────────────────────────────── */
function Pill({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide" style={{ color, background: bg }}>
      {label}
    </span>
  );
}

/* ── Screen: Events ─────────────────────────────────────────────── */
function ScreenEvents({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const events = [
    { name: "State Athletics Championship 2025", venue: "Balewadi Stadium, Pune", date: "Mar 12–14, 2025", status: "Completed", medal: "Gold", event: "100m Sprint" },
    { name: "National Junior Athletics Meet",    venue: "SAI Centre, Delhi",       date: "Jan 20–22, 2025", status: "Completed", medal: "Silver", event: "200m Sprint" },
    { name: "Maharashtra Open Track Meet",       venue: "Shivaji Stadium, Mumbai", date: "Apr 5–6, 2025",  status: "Registered", medal: null,    event: "100m & 200m" },
    { name: "Khelo India Youth Games 2025",      venue: "Bhubaneswar, Odisha",     date: "May 1–11, 2025", status: "Selected",   medal: null,    event: "100m Sprint" },
    { name: "South Asian Athletics Championship",venue: "Colombo, Sri Lanka",      date: "Jul 2025",       status: "Nominated",  medal: null,    event: "100m Sprint" },
  ];

  const statusStyle: Record<string, { color: string; bg: string }> = {
    Completed:  { color: "#059669", bg: "#dcfce7" },
    Registered: { color: "#363092", bg: "#eeeefa" },
    Selected:   { color: "#f97316", bg: "#fff7ed" },
    Nominated:  { color: "#7c3aed", bg: "#f3f0ff" },
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>
      <AthleteHeader onBack={onBack} onLogout={onLogout} subtitle="My Events & Fixtures" />
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: "#eeeefa" }}>
            <Trophy className="h-5 w-5" style={{ color: "#363092" }} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">My Events & Fixtures</h1>
            <p className="text-sm text-gray-500">All registered tournaments and participation history</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Events",     value: "5",  color: "#363092" },
            { label: "Medals Won",       value: "2",  color: ACCENT    },
            { label: "Upcoming",         value: "3",  color: "#059669" },
            { label: "Certificates",     value: "2",  color: "#7c3aed" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm">
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {events.map((ev, i) => (
            <div key={i} className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-900">{ev.name}</span>
                  <Pill label={ev.status} {...statusStyle[ev.status]} />
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {ev.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {ev.venue}</span>
                  <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> {ev.event}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {ev.medal && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: ev.medal === "Gold" ? "#fef9c3" : "#f1f5f9", color: ev.medal === "Gold" ? "#ca8a04" : "#64748b" }}>
                    <Award className="h-3.5 w-3.5" /> {ev.medal}
                  </span>
                )}
                {ev.status === "Completed" && (
                  <button className="flex items-center gap-1.5 h-8 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:border-orange-400 hover:text-orange-500 transition">
                    <Download className="h-3.5 w-3.5" /> Certificate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ── Screen: Scholarships ───────────────────────────────────────── */
function ScreenScholarships({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const schemes = [
    { name: "Shiv Chhatrapati Award Scheme",          amount: "₹48,000", period: "2024–25", status: "Active",   disbursed: "₹36,000", pending: "₹12,000" },
    { name: "Sports Stipend for Elite Athletes",       amount: "₹18,000", period: "2024–25", status: "Active",   disbursed: "₹18,000", pending: "₹0"      },
    { name: "National Merit Scholarship (Sports)",     amount: "₹25,000", period: "2024–25", status: "Pending",  disbursed: "₹0",       pending: "₹25,000" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>
      <AthleteHeader onBack={onBack} onLogout={onLogout} subtitle="Scholarships & Schemes" />
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: "#e6f7f2" }}>
            <Wallet className="h-5 w-5" style={{ color: "#059669" }} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Scholarships & Schemes</h1>
            <p className="text-sm text-gray-500">Applied schemes, disbursements & documents</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Sanctioned",  value: "₹91K", color: "#059669" },
            { label: "Disbursed",         value: "₹54K", color: "#363092" },
            { label: "Pending",           value: "₹37K", color: ACCENT    },
            { label: "Active Schemes",    value: "2",    color: "#7c3aed" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm">
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {schemes.map((sc, i) => (
            <div key={i} className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm font-bold text-gray-900 mb-1">{sc.name}</div>
                  <div className="text-xs text-gray-400">{sc.period} · Total: {sc.amount}</div>
                </div>
                <Pill
                  label={sc.status}
                  color={sc.status === "Active" ? "#059669" : "#f97316"}
                  bg={sc.status === "Active" ? "#dcfce7" : "#fff7ed"}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 px-4 py-3">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Disbursed</div>
                  <div className="text-base font-black text-green-600">{sc.disbursed}</div>
                </div>
                <div className="rounded-xl bg-gray-50 px-4 py-3">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Pending</div>
                  <div className="text-base font-black" style={{ color: sc.pending === "₹0" ? "#9ca3af" : ACCENT }}>{sc.pending}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ── Screen: Performance ────────────────────────────────────────── */
function ScreenPerformance({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const attrs = [
    { label: "Speed",        value: 91 },
    { label: "Endurance",    value: 76 },
    { label: "Strength",     value: 68 },
    { label: "Agility",      value: 84 },
    { label: "Recovery",     value: 72 },
    { label: "Mental Focus", value: 80 },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>
      <AthleteHeader onBack={onBack} onLogout={onLogout} subtitle="Performance & AI Analytics" />
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: "#f3f0ff" }}>
            <Brain className="h-5 w-5" style={{ color: "#7c3aed" }} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Performance & AI Analytics</h1>
            <p className="text-sm text-gray-500">Real-time AI assessment and training insights</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "AI Score",      value: "82%", color: "#7c3aed" },
            { label: "Medal Potential",value: "High", color: "#059669" },
            { label: "Injury Risk",   value: "34%", color: ACCENT    },
            { label: "Rank (State)",  value: "#4",  color: "#363092" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm">
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
            <div className="text-sm font-bold text-gray-800 mb-5">Attribute Breakdown</div>
            <div className="space-y-3">
              {attrs.map(a => (
                <div key={a.label}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span className="font-medium">{a.label}</span>
                    <span className="font-bold">{a.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${a.value}%`, background: "linear-gradient(90deg,#7c3aed,#a855f7)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4" style={{ color: "#7c3aed" }} />
                <span className="text-sm font-bold text-gray-800">AI Recommendations</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" /> Increase strength training by 20% — currently 34th percentile</li>
                <li className="flex items-start gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" /> Add active recovery sessions post-Tuesday training</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-3.5 w-3.5 text-orange-500 mt-0.5 shrink-0" /> Right hamstring stress elevated — reduce sprint volume 15%</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4" style={{ color: "#059669" }} />
                <span className="text-sm font-bold text-gray-800">Progress vs Last Quarter</span>
              </div>
              {[["Speed", +4], ["Endurance", +8], ["Strength", -2], ["Agility", +6]].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between text-xs py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-600">{k}</span>
                  <span className="font-bold" style={{ color: (v as number) >= 0 ? "#059669" : "#ef4444" }}>
                    {(v as number) >= 0 ? "+" : ""}{v}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Screen: Hostel ─────────────────────────────────────────────── */
function ScreenHostel({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>
      <AthleteHeader onBack={onBack} onLogout={onLogout} subtitle="Hostel & Accommodation" />
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: "#fdf2f8" }}>
            <Home className="h-5 w-5" style={{ color: "#ec4899" }} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Hostel & Accommodation</h1>
            <p className="text-sm text-gray-500">Room details, mess schedule & leave management</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Room",         value: "204",       color: "#ec4899" },
            { label: "Block",        value: "C",         color: "#363092" },
            { label: "Leave Balance",value: "8 days",    color: "#059669" },
            { label: "Pending Req.", value: "1",         color: ACCENT    },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm">
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
            <div className="text-sm font-bold text-gray-800 mb-4">Room Information</div>
            {[
              ["Hostel",       "Balewadi Sports Hostel, Pune"],
              ["Block",        "Block C"],
              ["Room No.",     "204 (Double Occupancy)"],
              ["Roommate",     "Arjun Pawar — Athletics"],
              ["Allotted On",  "Aug 15, 2024"],
              ["Valid Until",  "Mar 31, 2025"],
              ["Warden",       "Mr. Suresh Patil — +91 98765 43210"],
            ].map(([k, v]) => (
              <div key={String(k)} className="flex justify-between text-xs py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-400">{k}</span>
                <span className="font-semibold text-gray-800 text-right max-w-[60%]">{v}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
            <div className="text-sm font-bold text-gray-800 mb-4">Today's Mess Menu</div>
            {[
              ["Breakfast", "Poha, Chai, Banana"],
              ["Lunch",     "Rice, Dal, Sabzi, Roti, Salad"],
              ["Snacks",    "Milk, Sprouts, Biscuits"],
              ["Dinner",    "Rice, Dal Tadka, Paneer Curry, Roti"],
            ].map(([meal, items]) => (
              <div key={String(meal)} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-16 shrink-0 pt-0.5">{meal}</div>
                <div className="text-xs text-gray-700">{items}</div>
              </div>
            ))}
            <button className="mt-4 w-full h-9 rounded-xl border border-dashed border-gray-300 text-xs font-semibold text-gray-400 hover:border-orange-400 hover:text-orange-500 transition flex items-center justify-center gap-1.5">
              <Send className="h-3.5 w-3.5" /> Apply for Leave
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Screen: Training ───────────────────────────────────────────── */
/* ── LMS course data ────────────────────────────────────────────── */
type Lesson = { id: string; title: string; duration: string; type: "video" | "article"; completed: boolean };
type Module = { title: string; lessons: Lesson[] };
type Course = { id: string; title: string; category: string; totalDuration: string; color: string; instructor: string; desc: string; modules: Module[] };

const LMS_COURSES: Course[] = [
  {
    id: "nutrition", title: "Sports Nutrition & Recovery", category: "Health & Wellness",
    totalDuration: "1h 43m", color: "#059669", instructor: "Dr. Anjali Desai",
    desc: "Learn optimal nutrition strategies, hydration, supplement facts and recovery protocols for elite athletes.",
    modules: [
      { title: "Module 1 — Fundamentals", lessons: [
        { id: "n1", title: "Introduction to Sports Nutrition", duration: "12 min", type: "video", completed: true },
        { id: "n2", title: "Macronutrients for Athletes",      duration: "18 min", type: "video", completed: true },
      ]},
      { title: "Module 2 — Practical Strategies", lessons: [
        { id: "n3", title: "Hydration & Electrolytes",         duration: "15 min", type: "video", completed: true },
        { id: "n4", title: "Pre-Competition Diet Plan",        duration: "20 min", type: "video", completed: false },
        { id: "n5", title: "Recovery Nutrition",               duration: "16 min", type: "video", completed: false },
      ]},
      { title: "Module 3 — Advanced Topics", lessons: [
        { id: "n6", title: "Supplements — Myths & Facts",      duration: "22 min", type: "article", completed: false },
      ]},
    ],
  },
  {
    id: "antidoping", title: "Anti-Doping Awareness (NADA)", category: "Compliance",
    totalDuration: "54 min", color: "#363092", instructor: "Mr. Rajesh Kumar, NADA",
    desc: "Mandatory NADA certification — WADA prohibited list, TUE process, sample collection and athlete rights.",
    modules: [
      { title: "Module 1 — Foundations", lessons: [
        { id: "a1", title: "What is Doping?",              duration: "10 min", type: "video", completed: true },
        { id: "a2", title: "WADA Prohibited List",         duration: "15 min", type: "video", completed: true },
      ]},
      { title: "Module 2 — Process & Rights", lessons: [
        { id: "a3", title: "Sample Collection Procedure",  duration: "18 min", type: "video", completed: true },
        { id: "a4", title: "TUE & Athlete Rights",         duration: "11 min", type: "video", completed: true },
      ]},
    ],
  },
  {
    id: "mental", title: "Mental Toughness for Athletes", category: "Psychology",
    totalDuration: "1h 18m", color: "#7c3aed", instructor: "Dr. Priya Shah, Sports Psychologist",
    desc: "Build mental resilience, manage competition anxiety, develop focus and a champion's mindset.",
    modules: [
      { title: "Module 1 — Mindset Foundations", lessons: [
        { id: "m1", title: "Growth Mindset in Sports",     duration: "14 min", type: "video", completed: true },
        { id: "m2", title: "Goal Setting Techniques",      duration: "16 min", type: "video", completed: true },
      ]},
      { title: "Module 2 — Competition Psychology", lessons: [
        { id: "m3", title: "Managing Pre-Race Anxiety",    duration: "18 min", type: "video", completed: false },
        { id: "m4", title: "Visualisation & Focus",        duration: "15 min", type: "video", completed: false },
        { id: "m5", title: "Post-Competition Recovery",    duration: "15 min", type: "article", completed: false },
      ]},
    ],
  },
  {
    id: "biomechanics", title: "Biomechanics of Sprinting", category: "Technical Skills",
    totalDuration: "1h 30m", color: "#d97706", instructor: "Coach Suresh Patel, Athletics",
    desc: "Analyse sprinting mechanics, stride patterns, block starts and technique using video analysis.",
    modules: [
      { title: "Module 1 — Sprint Mechanics", lessons: [
        { id: "b1", title: "Biomechanics Fundamentals",    duration: "15 min", type: "video", completed: false },
        { id: "b2", title: "Stride Length vs. Frequency",  duration: "18 min", type: "video", completed: false },
        { id: "b3", title: "Block Start Technique",        duration: "20 min", type: "video", completed: false },
      ]},
      { title: "Module 2 — Technique Optimisation", lessons: [
        { id: "b4", title: "Arm Drive & Posture",          duration: "12 min", type: "video", completed: false },
        { id: "b5", title: "Video Analysis Session",       duration: "15 min", type: "video", completed: false },
        { id: "b6", title: "Drill Exercises",              duration: "10 min", type: "article", completed: false },
      ]},
    ],
  },
];

function courseProgress(course: Course) {
  const all = course.modules.flatMap(m => m.lessons);
  const done = all.filter(l => l.completed).length;
  return { done, total: all.length, pct: Math.round((done / all.length) * 100) };
}

/* ── Lesson Player ──────────────────────────────────────────────── */
function LessonPlayer({
  course, lesson, allLessons, onBack, onComplete,
}: {
  course: Course; lesson: Lesson; allLessons: Lesson[];
  onBack: () => void; onComplete: (id: string) => void;
}) {
  const idx = allLessons.findIndex(l => l.id === lesson.id);
  const next = allLessons[idx + 1] ?? null;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0f172a" }}>
      {/* Dark top bar */}
      <div className="flex items-center gap-3 px-6 h-14 border-b border-white/10 shrink-0">
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition">
          <ArrowLeft className="h-4 w-4" /> Back to course
        </button>
        <span className="mx-3 h-4 w-px bg-white/20" />
        <span className="text-xs text-white/50 truncate">{course.title}</span>
        <span className="mx-1 text-white/30">›</span>
        <span className="text-xs text-white/80 font-semibold truncate">{lesson.title}</span>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Video / content area */}
        <div className="flex-1 flex flex-col">
          {lesson.type === "video" ? (
            <div className="relative w-full bg-black" style={{ aspectRatio: "16/9", maxHeight: "62vh" }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="h-20 w-20 rounded-full bg-white/10 border-2 border-white/30 grid place-items-center backdrop-blur-sm hover:bg-white/20 cursor-pointer transition">
                  <Play className="h-9 w-9 text-white ml-1" />
                </div>
                <div className="text-white/60 text-sm">{lesson.duration} · Video Lesson</div>
              </div>
              {/* fake progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div className="h-full bg-orange-500" style={{ width: lesson.completed ? "100%" : "0%" }} />
              </div>
            </div>
          ) : (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-orange-400" />
                  <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Reading Material · {lesson.duration}</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-4">{lesson.title}</h2>
                <div className="prose prose-invert text-white/70 text-sm leading-relaxed space-y-4">
                  <p>This lesson covers the key concepts and practical applications related to <strong className="text-white">{lesson.title.toLowerCase()}</strong>.</p>
                  <p>Athletes who complete this module will understand the fundamentals, be able to apply the concepts during training and competition, and demonstrate knowledge in the assessment quiz.</p>
                  <p>Review the material carefully and use the Mark as Complete button once you've finished reading to track your progress.</p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom action bar */}
          <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {lesson.completed ? (
                <span className="flex items-center gap-1.5 text-green-400 text-sm font-semibold">
                  <CheckCircle className="h-4 w-4" /> Completed
                </span>
              ) : (
                <button onClick={() => onComplete(lesson.id)}
                  className="flex items-center gap-2 h-10 px-5 rounded-xl font-bold text-sm text-white transition hover:opacity-90"
                  style={{ background: ACCENT }}>
                  <CheckCircle className="h-4 w-4" /> Mark as Complete
                </button>
              )}
            </div>
            {next && (
              <button onClick={() => onComplete(lesson.id)}
                className="flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition">
                Next: {next.title} <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar — lesson list */}
        <div className="w-72 border-l border-white/10 overflow-y-auto hidden lg:flex flex-col">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Course Contents</div>
          </div>
          {course.modules.map((mod, mi) => (
            <div key={mi}>
              <div className="px-4 py-2 text-[10px] font-bold text-white/30 uppercase tracking-widest bg-white/5">{mod.title}</div>
              {mod.lessons.map((l) => (
                <button key={l.id} onClick={() => onBack()}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left transition border-l-2 ${
                    l.id === lesson.id
                      ? "border-orange-500 bg-white/10"
                      : "border-transparent hover:bg-white/5"
                  }`}>
                  <div className="shrink-0 mt-0.5">
                    {l.completed
                      ? <CheckCircle className="h-4 w-4 text-green-400" />
                      : l.id === lesson.id
                        ? <Play className="h-4 w-4 text-orange-400" />
                        : <div className="h-4 w-4 rounded-full border border-white/20" />
                    }
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs font-semibold leading-snug ${l.id === lesson.id ? "text-white" : "text-white/60"}`}>{l.title}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {l.type === "video" ? <Video className="h-2.5 w-2.5 text-white/30" /> : <FileText className="h-2.5 w-2.5 text-white/30" />}
                      <span className="text-[10px] text-white/30">{l.duration}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Course Detail ──────────────────────────────────────────────── */
function CourseDetail({
  course, onBack, onLogout, onOpenLesson,
}: {
  course: Course; onBack: () => void; onLogout: () => void;
  onOpenLesson: (lesson: Lesson) => void;
}) {
  const { done, total, pct } = courseProgress(course);
  const [expanded, setExpanded] = useState<number[]>([0]);
  const allLessons = course.modules.flatMap(m => m.lessons);
  const nextLesson = allLessons.find(l => !l.completed) ?? allLessons[0];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>
      <AthleteHeader onBack={onBack} onLogout={onLogout} subtitle={course.title} />
      <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full">

        {/* Course hero */}
        <div className="rounded-2xl p-6 mb-6 flex flex-col md:flex-row gap-6 items-start" style={{ background: course.color }}>
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">{course.category}</div>
            <h1 className="text-2xl font-black text-white mb-2">{course.title}</h1>
            <p className="text-sm text-white/80 leading-relaxed mb-4">{course.desc}</p>
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><GraduationCap className="h-4 w-4" /> {course.instructor}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.totalDuration}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {total} lessons</span>
            </div>
          </div>
          <div className="shrink-0 w-full md:w-48">
            <div className="rounded-2xl bg-white/15 backdrop-blur p-5 text-center">
              <div className="text-4xl font-black text-white mb-1">{pct}%</div>
              <div className="text-xs text-white/70 mb-3">{done} of {total} lessons done</div>
              <div className="h-2 rounded-full bg-white/20 mb-4 overflow-hidden">
                <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
              </div>
              {pct === 100 ? (
                <button className="w-full h-10 rounded-xl bg-white font-bold text-sm flex items-center justify-center gap-2"
                  style={{ color: course.color }}>
                  <Download className="h-4 w-4" /> Get Certificate
                </button>
              ) : (
                <button onClick={() => onOpenLesson(nextLesson)}
                  className="w-full h-10 rounded-xl bg-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
                  style={{ color: course.color }}>
                  <Play className="h-4 w-4" /> {done === 0 ? "Start Course" : "Continue"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Lessons Completed", value: `${done}/${total}`, color: course.color },
            { label: "Time Remaining",    value: `~${Math.round((total - done) * 15)} min`, color: "#f97316" },
            { label: "Certificate",       value: pct === 100 ? "Earned" : "Pending",        color: pct === 100 ? "#059669" : "#9ca3af" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm">
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Modules & lessons */}
        <div className="space-y-3">
          {course.modules.map((mod, mi) => {
            const isOpen = expanded.includes(mi);
            const modDone = mod.lessons.filter(l => l.completed).length;
            return (
              <div key={mi} className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpanded(e => isOpen ? e.filter(x => x !== mi) : [...e, mi])}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition">
                  <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0" style={{ background: course.color + "15" }}>
                    <BarChart2 className="h-4 w-4" style={{ color: course.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900">{mod.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{modDone}/{mod.lessons.length} lessons · {mod.lessons.reduce((s, l) => s + parseInt(l.duration), 0)} min</div>
                  </div>
                  {modDone === mod.lessons.length && <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />}
                  {isOpen ? <ChevronUp className="h-4 w-4 text-gray-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100">
                    {mod.lessons.map((lesson, li) => (
                      <button key={lesson.id} onClick={() => onOpenLesson(lesson)}
                        className="w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-gray-50 transition border-b border-gray-50 last:border-0 group">
                        <div className="shrink-0">
                          {lesson.completed
                            ? <CheckCircle className="h-5 w-5 text-green-500" />
                            : <div className="h-5 w-5 rounded-full border-2 border-gray-200 group-hover:border-orange-400 transition" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{lesson.title}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            {lesson.type === "video"
                              ? <Video className="h-3 w-3 text-gray-400" />
                              : <FileText className="h-3 w-3 text-gray-400" />
                            }
                            <span className="text-xs text-gray-400">{lesson.type === "video" ? "Video" : "Article"} · {lesson.duration}</span>
                          </div>
                        </div>
                        <Play className="h-4 w-4 text-gray-300 group-hover:text-orange-500 shrink-0 transition" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

/* ── Screen: Training (course list hub) ─────────────────────────── */
function ScreenTraining({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [courses, setCourses] = useState<Course[]>(LMS_COURSES);

  function handleComplete(lessonId: string) {
    setCourses(prev => prev.map(c => ({
      ...c,
      modules: c.modules.map(m => ({
        ...m,
        lessons: m.lessons.map(l => l.id === lessonId ? { ...l, completed: true } : l),
      })),
    })));
    // advance to next lesson if available
    if (activeCourse && activeLesson) {
      const updated = courses.map(c => c.id === activeCourse.id ? {
        ...c, modules: c.modules.map(m => ({ ...m, lessons: m.lessons.map(l => l.id === lessonId ? { ...l, completed: true } : l) }))
      } : c);
      const updatedCourse = updated.find(c => c.id === activeCourse.id)!;
      const allLessons = updatedCourse.modules.flatMap(m => m.lessons);
      const idx = allLessons.findIndex(l => l.id === lessonId);
      const next = allLessons[idx + 1];
      if (next) {
        setActiveLesson(next);
        setActiveCourse(updatedCourse);
      } else {
        setActiveLesson(null);
      }
    }
  }

  if (activeCourse && activeLesson) {
    const currentCourse = courses.find(c => c.id === activeCourse.id) ?? activeCourse;
    const allLessons = currentCourse.modules.flatMap(m => m.lessons);
    return (
      <LessonPlayer
        course={currentCourse}
        lesson={allLessons.find(l => l.id === activeLesson.id) ?? activeLesson}
        allLessons={allLessons}
        onBack={() => setActiveLesson(null)}
        onComplete={handleComplete}
      />
    );
  }

  if (activeCourse) {
    const currentCourse = courses.find(c => c.id === activeCourse.id) ?? activeCourse;
    return (
      <CourseDetail
        course={currentCourse}
        onBack={() => setActiveCourse(null)}
        onLogout={onLogout}
        onOpenLesson={(lesson) => { setActiveCourse(currentCourse); setActiveLesson(lesson); }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>
      <AthleteHeader onBack={onBack} onLogout={onLogout} subtitle="Training & e-Learning" />
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: "#fee2e2" }}>
            <GraduationCap className="h-5 w-5" style={{ color: "#dc2626" }} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Training & e-Learning</h1>
            <p className="text-sm text-gray-500">Click any course to open lessons and watch training content</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Enrolled Courses", value: "4",    color: "#dc2626" },
            { label: "Completed",        value: "1",    color: "#059669" },
            { label: "Certificates",     value: "1",    color: "#363092" },
            { label: "Total Duration",   value: "5h+",  color: "#7c3aed" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm">
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((c) => {
            const { done, total, pct } = courseProgress(c);
            const status = pct === 100 ? "Completed" : pct > 0 ? "In Progress" : "Not Started";
            return (
              <button key={c.id} onClick={() => setActiveCourse(c)}
                className="text-left rounded-2xl bg-white border border-gray-200 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-11 w-11 rounded-xl grid place-items-center shrink-0" style={{ background: c.color + "15" }}>
                    <BookOpen className="h-5 w-5" style={{ color: c.color }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill
                      label={status}
                      color={status === "Completed" ? "#059669" : status === "In Progress" ? c.color : "#9ca3af"}
                      bg={status === "Completed" ? "#dcfce7" : status === "In Progress" ? c.color + "15" : "#f3f4f6"}
                    />
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-orange-500 transition" />
                  </div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: c.color }}>{c.category}</div>
                <div className="text-sm font-bold text-gray-900 mb-1">{c.title}</div>
                <div className="text-xs text-gray-400 mb-3 flex items-center gap-3">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.totalDuration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {total} lessons</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>{done}/{total} lessons</span>
                  <span className="font-bold" style={{ color: c.color }}>{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: c.color }} />
                </div>
                {status === "Completed" && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-green-600">
                    <Star className="h-3.5 w-3.5 fill-current" /> Certificate Earned
                  </div>
                )}
                {status !== "Completed" && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-orange-500 opacity-0 group-hover:opacity-100 transition">
                    <Play className="h-3.5 w-3.5" /> {done === 0 ? "Start course" : "Continue learning"}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

/* ── Grievance categories ───────────────────────────────────────── */
const GRIEV_CATS = [
  { id: "scholarship", label: "Scholarship & Stipend", icon: Wallet,         color: "#059669", bg: "#e6f7f2", dept: "Finance Department"       },
  { id: "hostel",      label: "Hostel & Accommodation",icon: Home,           color: "#ec4899", bg: "#fdf2f8", dept: "Hostel Management"         },
  { id: "events",      label: "Events & Fixtures",     icon: Trophy,         color: "#363092", bg: "#eeeefa", dept: "Sports Department"         },
  { id: "training",    label: "Training & LMS",        icon: GraduationCap,  color: "#dc2626", bg: "#fee2e2", dept: "Training Department"       },
  { id: "performance", label: "Coaching & Performance",icon: Brain,          color: "#7c3aed", bg: "#f3f0ff", dept: "Performance Unit"          },
  { id: "admin",       label: "Administration",        icon: MessageSquare,  color: "#0891b2", bg: "#e0f7fa", dept: "Administration Office"     },
] as const;

type GrievCat = typeof GRIEV_CATS[number];

/* ── New Grievance 4-step flow ──────────────────────────────────── */
function NewGrievanceFlow({ onCancel }: { onCancel: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [category, setCategory] = useState<GrievCat | null>(null);
  const [subject, setSubject]   = useState("");
  const [desc, setDesc]         = useState("");
  const [priority, setPriority] = useState("Normal");
  const [file, setFile]         = useState("");
  const ticketId = React.useMemo(() => `GRV-2025-0${Math.floor(Math.random() * 900 + 100)}`, []);

  const stepLabels = ["Category", "Details", "Review", "Done"];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>
      {/* Step header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="h-14 flex items-center px-6 gap-4">
          {step < 4 && (
            <button onClick={step === 1 ? onCancel : () => setStep(s => (s - 1) as 1)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition">
              <ArrowLeft className="h-4 w-4" /> {step === 1 ? "Cancel" : "Back"}
            </button>
          )}
          <span className="font-bold text-gray-900 flex-1">New Grievance</span>
          {/* progress dots */}
          <div className="flex items-center gap-1.5">
            {stepLabels.map((l, i) => (
              <div key={l} className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full transition-colors ${i + 1 <= step ? "bg-orange-500" : "bg-gray-200"}`} />
                {i < stepLabels.length - 1 && <div className={`h-px w-6 ${i + 1 < step ? "bg-orange-300" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 pb-3 flex gap-6">
          {stepLabels.map((l, i) => (
            <span key={l} className={`text-xs font-semibold ${i + 1 === step ? "text-orange-500" : i + 1 < step ? "text-gray-400" : "text-gray-300"}`}>{l}</span>
          ))}
        </div>
      </div>

      <main className="flex-1 p-6 md:p-8 max-w-2xl mx-auto w-full">

        {/* ── Step 1: Category ── */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-1">What is your grievance about?</h2>
            <p className="text-sm text-gray-500 mb-6">Select the department closest to your issue</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GRIEV_CATS.map(cat => (
                <button key={cat.id} onClick={() => { setCategory(cat); setStep(2); }}
                  className={`text-left rounded-2xl border p-5 transition-all duration-150 group hover:shadow-md hover:-translate-y-0.5 ${category?.id === cat.id ? "border-2 shadow-sm" : "border-gray-200 bg-white"}`}
                  style={category?.id === cat.id ? { borderColor: cat.color, background: cat.bg } : {}}>
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-xl grid place-items-center shrink-0" style={{ background: cat.bg }}>
                      <cat.icon className="h-5 w-5" style={{ color: cat.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-gray-900">{cat.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{cat.dept}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 ml-auto shrink-0 transition" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Details ── */}
        {step === 2 && category && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: category.bg }}>
                <category.icon className="h-5 w-5" style={{ color: category.color }} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Fill in the details</h2>
                <p className="text-xs text-gray-400">{category.label} · {category.dept}</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Subject <span className="text-red-400">*</span></label>
                <input value={subject} onChange={e => setSubject(e.target.value)}
                  placeholder="Brief description of the issue"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 outline-none text-sm transition" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Description <span className="text-red-400">*</span></label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)}
                  placeholder="Describe your issue in detail — dates, amounts, persons involved, etc."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 outline-none text-sm transition resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Priority</label>
                  <select value={priority} onChange={e => setPriority(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-gray-200 focus:border-orange-400 outline-none text-sm bg-white appearance-none">
                    <option>Low</option><option>Normal</option><option>High</option><option>Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Supporting Document</label>
                  <input value={file} onChange={e => setFile(e.target.value)}
                    placeholder="File name or URL (optional)"
                    className="w-full h-11 px-3 rounded-xl border border-gray-200 focus:border-orange-400 outline-none text-sm transition" />
                </div>
              </div>
              <button
                disabled={!subject.trim() || !desc.trim()}
                onClick={() => setStep(3)}
                className="w-full h-12 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: ACCENT }}>
                Review Grievance <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Review ── */}
        {step === 3 && category && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-1">Review before submitting</h2>
            <p className="text-sm text-gray-500 mb-6">Verify all details — you cannot edit after submission</p>

            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3" style={{ background: category.bg }}>
                <div className="h-9 w-9 rounded-lg grid place-items-center" style={{ background: category.color + "20" }}>
                  <category.icon className="h-4 w-4" style={{ color: category.color }} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: category.color }}>{category.label}</div>
                  <div className="text-[11px] text-gray-500">{category.dept}</div>
                </div>
              </div>
              {[
                ["Athlete",  "Rahul Shinde (ATH-2024-00481)"],
                ["Subject",  subject],
                ["Priority", priority],
                ["Document", file || "None attached"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start px-5 py-3 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-400 w-24 shrink-0 font-medium mt-0.5">{k}</span>
                  <span className="text-sm text-gray-800 font-semibold flex-1">{v}</span>
                </div>
              ))}
              <div className="px-5 py-3">
                <span className="text-xs text-gray-400 font-medium">Description</span>
                <p className="text-sm text-gray-800 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex gap-3 mb-6 text-xs text-amber-700">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Once submitted, the concerned department will respond within <strong>5 working days</strong>. Track status in the Grievances section.</span>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)}
                className="flex-1 h-12 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center gap-2 hover:border-gray-400 transition">
                <ArrowLeft className="h-4 w-4" /> Edit Details
              </button>
              <button onClick={() => setStep(4)}
                className="flex-1 h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition hover:opacity-90"
                style={{ background: "#0891b2" }}>
                <Send className="h-4 w-4" /> Submit Grievance
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Success ── */}
        {step === 4 && category && (
          <div className="flex flex-col items-center text-center py-12">
            <div className="h-20 w-20 rounded-full grid place-items-center mb-5" style={{ background: "#e6f7f2" }}>
              <CheckCircle className="h-10 w-10" style={{ color: "#059669" }} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Grievance Submitted!</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-sm">Your grievance has been registered and forwarded to {category.dept}. You'll receive updates via notification.</p>

            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-8 py-6 mb-8 w-full max-w-sm">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ticket Number</div>
              <div className="text-2xl font-black" style={{ color: "#0891b2" }}>{ticketId}</div>
              <div className="text-xs text-gray-500 mt-2">Save this number to track your grievance</div>
              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-left">
                <div><div className="text-[10px] text-gray-400 font-medium">Department</div><div className="text-xs font-bold text-gray-800 mt-0.5">{category.dept}</div></div>
                <div><div className="text-[10px] text-gray-400 font-medium">Priority</div><div className="text-xs font-bold mt-0.5" style={{ color: priority === "Urgent" ? "#dc2626" : priority === "High" ? ACCENT : "#059669" }}>{priority}</div></div>
                <div><div className="text-[10px] text-gray-400 font-medium">Expected Response</div><div className="text-xs font-bold text-gray-800 mt-0.5">5 working days</div></div>
                <div><div className="text-[10px] text-gray-400 font-medium">Status</div><Pill label="Submitted" color="#0891b2" bg="#e0f7fa" /></div>
              </div>
            </div>

            <button onClick={onCancel}
              className="h-12 px-8 rounded-xl text-white font-bold flex items-center gap-2 transition hover:opacity-90"
              style={{ background: ACCENT }}>
              Back to Grievances
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

/* ── Screen: Grievances ─────────────────────────────────────────── */
function ScreenGrievances({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const [showNew, setShowNew] = useState(false);
  const tickets = [
    { id: "GRV-2025-0041", subject: "Scholarship disbursement delayed for Dec 2024", status: "In Progress", date: "Jan 10, 2025", dept: "Finance" },
    { id: "GRV-2025-0018", subject: "Room maintenance request – broken window latch", status: "Resolved",    date: "Dec 5, 2024",  dept: "Hostel"  },
  ];

  if (showNew) return <NewGrievanceFlow onCancel={() => setShowNew(false)} />;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>
      <AthleteHeader onBack={onBack} onLogout={onLogout} subtitle="Grievances & Support" />
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: "#e0f7fa" }}>
              <MessageSquare className="h-5 w-5" style={{ color: "#0891b2" }} />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">Grievances & Support</h1>
              <p className="text-sm text-gray-500">Submit & track your complaints</p>
            </div>
          </div>
          <button onClick={() => setShowNew(true)}
            className="h-10 px-4 rounded-xl text-white text-sm font-bold flex items-center gap-2 transition hover:opacity-90"
            style={{ background: ACCENT }}>
            <Send className="h-4 w-4" /> New Grievance
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Filed",  value: "2",  color: "#0891b2" },
            { label: "In Progress",  value: "1",  color: ACCENT    },
            { label: "Resolved",     value: "1",  color: "#059669" },
            { label: "Avg. Closure", value: "6d", color: "#7c3aed" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm">
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {tickets.map((t, i) => (
            <div key={i} className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.id}</span>
                  <Pill label={t.status} color={t.status === "Resolved" ? "#059669" : "#f97316"} bg={t.status === "Resolved" ? "#dcfce7" : "#fff7ed"} />
                </div>
                <div className="text-sm font-bold text-gray-900 mb-1">{t.subject}</div>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t.date}</span>
                  <span>{t.dept} Dept.</span>
                </div>
              </div>
              <button className="shrink-0 h-8 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:border-orange-400 hover:text-orange-500 transition">
                View
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ── Athlete Dashboard Hub ──────────────────────────────────────── */
export function AthleteDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  if (activeModule === "Events")       return <ScreenEvents       onBack={() => setActiveModule(null)} onLogout={onLogout} />;
  if (activeModule === "Scholarships") return <ScreenScholarships onBack={() => setActiveModule(null)} onLogout={onLogout} />;
  if (activeModule === "Performance")  return <ScreenPerformance  onBack={() => setActiveModule(null)} onLogout={onLogout} />;
  if (activeModule === "Hostel")       return <ScreenHostel       onBack={() => setActiveModule(null)} onLogout={onLogout} />;
  if (activeModule === "Training")     return <ScreenTraining     onBack={() => setActiveModule(null)} onLogout={onLogout} />;
  if (activeModule === "Grievances")   return <ScreenGrievances   onBack={() => setActiveModule(null)} onLogout={onLogout} />;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>
      <AthleteHeader onLogout={onLogout} subtitle="Athlete Portal" />

      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">

        {/* Welcome bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: ACCENT }}>
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Welcome back, Rahul</h1>
            <p className="text-sm text-gray-500">Select a module to get started</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Events Registered", value: "5",   color: "#363092" },
            { label: "Medals Won",        value: "2",   color: ACCENT    },
            { label: "Scholarship (₹)",   value: "91K", color: "#059669" },
            { label: "AI Score",          value: "82%", color: "#7c3aed" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm">
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Modules grid */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Athlete Modules</h2>
          <span className="text-xs text-gray-400">{ATHLETE_MODULES.length} modules available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ATHLETE_MODULES.map((m, i) => (
            <button
              key={i}
              onClick={() => setActiveModule(m.short)}
              className="text-left rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 group hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-11 w-11 rounded-xl grid place-items-center" style={{ background: m.bg }}>
                  <m.icon className="h-5 w-5" style={{ color: m.color }} />
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition mt-1" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: m.color }}>{m.short}</div>
              <div className="text-sm font-bold text-gray-900 leading-snug mb-1.5">{m.label}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{m.desc}</div>
            </button>
          ))}
        </div>

      </main>
    </div>
  );
}

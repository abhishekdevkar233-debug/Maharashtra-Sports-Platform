import { useState } from "react";
import mhSeal from "@/assets/mh-seal.png";
import {
  Home, Trophy, Wallet, Bell, User, ChevronRight, ArrowLeft,
  Star, MapPin, Calendar, Clock, CheckCircle, AlertCircle,
  TrendingUp, Zap, BookOpen, MessageSquare, Settings,
  Play, Download, LogOut, Activity, BedDouble, Award,
  ChevronLeft, Heart, Share2, MoreHorizontal, Search,
  Flame, Target, Shield, Medal,
} from "lucide-react";

/* ─── colour tokens ─────────────────────────── */
const P  = "#363092";   // navy
const OR = "#f97316";   // orange
const GR = "#059669";   // green

/* ─── mock data ─────────────────────────────── */
const ATHLETE = {
  name: "Arjun Deshmukh",
  sport: "Athletics · 400m",
  district: "Pune",
  rank: 3,
  points: 1840,
  avatar: "AD",
};

const UPCOMING = [
  { title: "Maharashtra State Athletics Championship", date: "18 Jul 2026", venue: "Balewadi, Pune",        status: "Confirmed", days: 19 },
  { title: "District Level Track & Field Meet",         date: "05 Aug 2026", venue: "Nashik District Stadium", status: "Registered", days: 37 },
  { title: "Junior National Athletics",                  date: "22 Sep 2026", venue: "Jawaharlal Nehru, Delhi", status: "Qualified",  days: 85 },
];

const NOTIFICATIONS = [
  { icon: Trophy,  color: P,  title: "Event Confirmed",     body: "Maharashtra State Athletics — you're confirmed", time: "2m ago",  unread: true  },
  { icon: Wallet,  color: GR, title: "Scholarship Credited", body: "₹12,000 disbursed to your account",            time: "1h ago",  unread: true  },
  { icon: Bell,    color: OR, title: "Training Reminder",    body: "Morning session at 6:00 AM tomorrow",           time: "3h ago",  unread: false },
  { icon: Shield,  color: P,  title: "Document Required",   body: "Upload Aadhaar card for hostel renewal",        time: "1d ago",  unread: false },
];

const PERFORMANCE = [
  { label: "Speed",    value: 82, color: OR },
  { label: "Endurance",value: 75, color: P  },
  { label: "Strength", value: 68, color: GR },
  { label: "Agility",  value: 88, color: "#7c3aed" },
];

const RESULTS = [
  { event: "Pune District Open", pos: "🥇 1st", time: "48.32s", date: "Jun 2026" },
  { event: "Deccan Athletics Cup", pos: "🥈 2nd", time: "48.91s", date: "Apr 2026" },
  { event: "Western Region Trial",  pos: "🥇 1st", time: "49.10s", date: "Feb 2026" },
];

const COURSES = [
  { title: "Sports Nutrition Basics",       progress: 80, lessons: 12, duration: "3h 20m" },
  { title: "Mental Conditioning for Athletes", progress: 45, lessons: 8,  duration: "2h 10m" },
  { title: "Injury Prevention & Recovery",  progress: 10, lessons: 15, duration: "4h 05m" },
];

/* ─── bottom nav tabs ────────────────────────── */
const NAV_TABS = [
  { id: "home",    icon: Home,         label: "Home"    },
  { id: "events",  icon: Trophy,       label: "Events"  },
  { id: "perf",    icon: TrendingUp,   label: "Stats"   },
  { id: "learn",   icon: BookOpen,     label: "Learn"   },
  { id: "profile", icon: User,         label: "Profile" },
];

/* ═══ SCREENS ═══════════════════════════════════ */

function HomeScreen({ setTab }: { setTab: (t: string) => void }) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-4">
      {/* Header */}
      <div className="px-5 pt-5 pb-4" style={{ background: `linear-gradient(135deg, ${P} 0%, #1a1f5e 100%)` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white/60 text-[11px] font-medium">Good Morning 👋</div>
            <div className="text-white font-black text-lg leading-tight">{ATHLETE.name}</div>
            <div className="text-white/70 text-[11px] mt-0.5">{ATHLETE.sport} · {ATHLETE.district}</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded-full bg-white/15 grid place-items-center relative">
              <Bell className="h-4 w-4 text-white" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-400" />
            </button>
            <img src={mhSeal} alt="MH Seal" className="h-9 w-9 rounded-full object-contain bg-white p-0.5" />
          </div>
        </div>
        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-2">
          {[["State Rank", `#${ATHLETE.rank}`, OR], ["Points", ATHLETE.points, "#a78bfa"], ["Events", "3 Upcoming", GR]].map(([l, v, c]) => (
            <div key={l as string} className="rounded-xl bg-white/10 p-2.5 text-center">
              <div className="text-[13px] font-black" style={{ color: c as string }}>{v as string}</div>
              <div className="text-[9px] text-white/60 font-medium mt-0.5">{l as string}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-4 mt-4">
        {/* Next event */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-gray-800 uppercase tracking-wider">Next Event</span>
            <button onClick={() => setTab("events")} className="text-[11px] font-bold" style={{ color: P }}>See all</button>
          </div>
          <div className="rounded-2xl p-4 text-white shadow-lg" style={{ background: `linear-gradient(135deg,${OR},#fb923c)` }}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-[10px] font-bold opacity-80 uppercase tracking-wider mb-1">In {UPCOMING[0].days} days</div>
                <div className="font-black text-sm leading-snug">{UPCOMING[0].title}</div>
                <div className="flex items-center gap-1 mt-2 opacity-80 text-[11px]">
                  <MapPin className="h-3 w-3" />{UPCOMING[0].venue}
                </div>
                <div className="flex items-center gap-1 mt-1 opacity-80 text-[11px]">
                  <Calendar className="h-3 w-3" />{UPCOMING[0].date}
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/20 grid place-items-center shrink-0 ml-3">
                <Trophy className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" />
              <span className="text-[11px] font-bold">{UPCOMING[0].status}</span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <div className="text-xs font-black text-gray-800 uppercase tracking-wider mb-2">Quick Actions</div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Trophy,  label: "Events",    color: P,        tab: "events"  },
              { icon: TrendingUp, label: "Stats",  color: "#7c3aed", tab: "perf"  },
              { icon: BookOpen,label: "Learn",     color: "#dc2626", tab: "learn"  },
              { icon: User,    label: "Profile",   color: OR,        tab: "profile" },
            ].map(a => (
              <button key={a.label} onClick={() => setTab(a.tab)} className="flex flex-col items-center gap-1.5">
                <div className="h-12 w-12 rounded-2xl grid place-items-center shadow-sm" style={{ background: `${a.color}15` }}>
                  <a.icon className="h-5 w-5" style={{ color: a.color }} />
                </div>
                <span className="text-[10px] font-semibold text-gray-600">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Performance snapshot */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-gray-800 uppercase tracking-wider">Performance</span>
            <button onClick={() => setTab("perf")} className="text-[11px] font-bold" style={{ color: P }}>Details</button>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              {PERFORMANCE.map(p => (
                <div key={p.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold text-gray-500">{p.label}</span>
                    <span className="text-[10px] font-black" style={{ color: p.color }}>{p.value}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p.value}%`, background: p.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scholarship badge */}
        <div className="rounded-2xl p-4 border border-emerald-200 bg-emerald-50 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500 grid place-items-center shrink-0">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-emerald-800">Scholarship Active</div>
            <div className="text-[11px] text-emerald-600 mt-0.5">₹48,000 / year · Next: ₹12,000 in Aug</div>
          </div>
          <ChevronRight className="h-4 w-4 text-emerald-400 shrink-0" />
        </div>
      </div>
    </div>
  );
}

function EventsScreen() {
  const [tab, setTab] = useState("upcoming");
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-4">
      <div className="px-5 pt-5 pb-3 bg-white border-b border-gray-100">
        <div className="text-lg font-black text-gray-900 mb-3">My Events</div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {["upcoming","results"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold capitalize transition ${tab===t?"bg-white shadow-sm text-gray-900":"text-gray-400"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {tab === "upcoming" ? UPCOMING.map((e, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 pr-2">
                <div className="text-xs font-black text-gray-900 leading-snug">{e.title}</div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                  <MapPin className="h-3 w-3" />{e.venue}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                  <Calendar className="h-3 w-3" />{e.date}
                </div>
              </div>
              <div className="shrink-0 text-center bg-orange-50 border border-orange-200 rounded-xl px-2 py-1.5">
                <div className="text-base font-black text-orange-500">{e.days}</div>
                <div className="text-[9px] text-orange-400 font-bold">days</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${e.status==="Confirmed"?"bg-emerald-50 text-emerald-600":e.status==="Qualified"?"bg-blue-50 text-blue-600":"bg-amber-50 text-amber-600"}`}>
                {e.status}
              </span>
              <button className="text-[10px] font-bold flex items-center gap-1" style={{ color: P }}>
                <Download className="h-3 w-3" /> Certificate
              </button>
            </div>
          </div>
        )) : RESULTS.map((r, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="text-2xl">{r.pos.split(" ")[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-black text-gray-900 truncate">{r.event}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{r.date}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-black" style={{ color: P }}>{r.time}</div>
              <div className="text-[9px] text-gray-400">Personal Best</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsScreen() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-4">
      <div className="px-5 pt-5 pb-3 bg-white border-b border-gray-100">
        <div className="text-lg font-black text-gray-900">Performance Stats</div>
        <div className="text-[11px] text-gray-400 mt-0.5">AI-powered analytics · Updated today</div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* AI Score card */}
        <div className="rounded-2xl p-5 text-white shadow-lg" style={{ background: `linear-gradient(135deg,#7c3aed,#4f46e5)` }}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-yellow-300" />
            <span className="text-xs font-bold text-white/80">AI Performance Score</span>
          </div>
          <div className="flex items-end gap-3">
            <div className="text-5xl font-black">78</div>
            <div className="text-white/70 text-sm pb-1">/100</div>
            <div className="ml-auto text-right">
              <div className="text-emerald-300 text-xs font-bold">↑ +4 pts</div>
              <div className="text-white/50 text-[10px]">vs last month</div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-white/70 bg-white/10 rounded-xl px-3 py-2">
            💡 Focus on endurance training — 15% below your category average
          </div>
        </div>

        {/* Attribute bars */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="text-xs font-black text-gray-800 mb-3">Attribute Breakdown</div>
          <div className="space-y-3">
            {PERFORMANCE.map(p => (
              <div key={p.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-600">{p.label}</span>
                  <span className="text-xs font-black" style={{ color: p.color }}>{p.value}/100</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${p.value}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent results */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="text-xs font-black text-gray-800 mb-3">Recent Results</div>
          <div className="space-y-2">
            {RESULTS.map((r, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-lg">{r.pos.split(" ")[0]}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-gray-800 truncate">{r.event}</div>
                  <div className="text-[10px] text-gray-400">{r.date}</div>
                </div>
                <div className="text-xs font-black" style={{ color: P }}>{r.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Injury risk */}
        <div className="rounded-2xl p-4 border border-amber-200 bg-amber-50 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-400 grid place-items-center shrink-0">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-black text-amber-800">Injury Risk — Low</div>
            <div className="text-[11px] text-amber-600 mt-0.5">No alerts · Recovery score 91%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LearnScreen() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-4">
      <div className="px-5 pt-5 pb-3 bg-white border-b border-gray-100">
        <div className="text-lg font-black text-gray-900 mb-3">e-Learning</div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input placeholder="Search courses…" className="w-full h-9 pl-8 pr-3 rounded-xl bg-gray-100 text-xs text-gray-700 outline-none" />
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">In Progress</div>
        {COURSES.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: "#fee2e2" }}>
                <BookOpen className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black text-gray-900 leading-snug">{c.title}</div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                  <span>{c.lessons} lessons</span>
                  <span>·</span>
                  <span>{c.duration}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-gray-400">Progress</span>
                    <span className="text-[10px] font-black" style={{ color: P }}>{c.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: P }} />
                  </div>
                </div>
              </div>
              <button className="h-8 w-8 rounded-full grid place-items-center shrink-0 shadow-sm text-white" style={{ background: P }}>
                <Play className="h-3.5 w-3.5 ml-0.5" />
              </button>
            </div>
          </div>
        ))}

        <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider pt-2">Recommended</div>
        {["Yoga for Athletes", "Speed & Power Training", "Competition Psychology"].map((t, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-50 grid place-items-center shrink-0">
              <Star className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-800">{t}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Free · Certificate included</div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-4">
      {/* Profile header */}
      <div className="px-5 pt-6 pb-5 text-center" style={{ background: `linear-gradient(135deg,${P},#1a1f5e)` }}>
        <img src={mhSeal} alt="MH Seal" className="h-16 w-16 rounded-2xl object-contain bg-white p-1 mx-auto mb-3" />
        <div className="text-white font-black text-base">{ATHLETE.name}</div>
        <div className="text-white/60 text-[11px] mt-0.5">{ATHLETE.sport}</div>
        <div className="flex items-center justify-center gap-1 mt-1 text-white/50 text-[11px]">
          <MapPin className="h-3 w-3" />{ATHLETE.district}
        </div>
        <div className="flex gap-2 justify-center mt-4">
          {[["#3", "State Rank"], ["1840", "Points"], ["3", "Events"]].map(([v, l]) => (
            <div key={l} className="flex-1 bg-white/10 rounded-xl py-2 text-center">
              <div className="text-white font-black text-sm">{v}</div>
              <div className="text-white/50 text-[9px] font-medium mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {/* Info cards */}
        {[
          { icon: Award,        color: OR, label: "Athlete ID",        value: "MH-ATH-2024-4421" },
          { icon: Trophy,       color: P,  label: "Sport",             value: "Athletics · 400m Sprint" },
          { icon: Calendar,     color: GR, label: "DOB",               value: "14 March 2005 · Age 21" },
          { icon: BedDouble,    color: "#7c3aed", label: "Hostel",     value: "Shiv Chhatrapati, Pune · Room 204" },
          { icon: Wallet,       color: GR, label: "Scholarship",       value: "Active · ₹48,000/year" },
        ].map(row => (
          <div key={row.label} className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0" style={{ background: `${row.color}15` }}>
              <row.icon className="h-4 w-4" style={{ color: row.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-gray-400 font-semibold">{row.label}</div>
              <div className="text-xs font-bold text-gray-800 truncate">{row.value}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-200 shrink-0" />
          </div>
        ))}

        {/* Settings & logout */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-2">
          {[
            { icon: Bell,        label: "Notifications",   color: P  },
            { icon: Settings,    label: "Account Settings", color: P  },
            { icon: MessageSquare, label: "Support & Help", color: P  },
          ].map(row => (
            <button key={row.label} className="w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
              <row.icon className="h-4 w-4 shrink-0" style={{ color: row.color }} />
              <span className="text-xs font-semibold text-gray-700 flex-1 text-left">{row.label}</span>
              <ChevronRight className="h-4 w-4 text-gray-200" />
            </button>
          ))}
        </div>

        <button onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 h-11 rounded-2xl border border-red-200 bg-red-50 text-red-500 text-sm font-bold hover:bg-red-100 transition">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}

/* ═══ NOTIFICATIONS OVERLAY ══════════════════════ */
function NotifOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 bg-white z-20 flex flex-col">
      <div className="flex items-center gap-3 px-4 pt-5 pb-3 border-b border-gray-100">
        <button onClick={onClose} className="h-8 w-8 rounded-full bg-gray-100 grid place-items-center">
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </button>
        <span className="font-black text-gray-900 text-base">Notifications</span>
        <span className="ml-auto text-[11px] font-bold text-blue-500">Mark all read</span>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
        {NOTIFICATIONS.map((n, i) => (
          <div key={i} className={`flex gap-3 px-4 py-4 ${n.unread ? "bg-blue-50/40" : ""}`}>
            <div className="h-9 w-9 rounded-full grid place-items-center shrink-0" style={{ background: `${n.color}15` }}>
              <n.icon className="h-4 w-4" style={{ color: n.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-black text-gray-900">{n.title}</span>
                {n.unread && <span className="h-2 w-2 rounded-full mt-1 shrink-0" style={{ background: P }} />}
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">{n.body}</div>
              <div className="text-[10px] text-gray-300 mt-1 font-medium">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ PHONE FRAME ════════════════════════════════ */
export function AthleteAppMockup({ onBack }: { onBack: () => void }) {
  const [tab, setTab]         = useState("home");
  const [notifOpen, setNotifOpen] = useState(false);

  function renderScreen() {
    switch (tab) {
      case "events":  return <EventsScreen />;
      case "perf":    return <StatsScreen />;
      case "learn":   return <LearnScreen />;
      case "profile": return <ProfileScreen onLogout={onBack} />;
      default:        return <HomeScreen setTab={setTab} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4"
      style={{ background: "linear-gradient(135deg,#f0f4ff 0%,#fdf4ff 100%)" }}>

      {/* Back button */}
      <div className="mb-6 w-full max-w-sm flex items-center justify-between">
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>
        <div className="text-xs font-bold text-gray-400">Maharashtra Sports App</div>
      </div>

      {/* Phone shell */}
      <div className="relative rounded-[44px] shadow-2xl overflow-hidden"
        style={{ width: 300, height: 620, background: "#1a1a2e", border: "10px solid #1a1a2e" }}>

          {/* Screen area */}
          <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-gray-50 flex flex-col">

            {/* Status bar */}
            <div className="h-8 shrink-0 flex items-center justify-between px-5 text-white text-[10px] font-bold z-10"
              style={{ background: tab === "home" || tab === "profile" ? P : "white",
                       color: tab === "home" || tab === "profile" ? "white" : "#111" }}>
              <span>9:41</span>
              <div className="absolute left-1/2 -translate-x-1/2 top-1.5 h-4 w-20 rounded-full bg-black/80" />
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                <span>5G</span>
              </div>
            </div>

            {/* Notifications overlay */}
            {notifOpen && <NotifOverlay onClose={() => setNotifOpen(false)} />}

            {/* Screen content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {renderScreen()}
            </div>

            {/* Bottom nav */}
            <div className="h-14 shrink-0 bg-white border-t border-gray-100 flex items-center px-2">
              {NAV_TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="flex-1 flex flex-col items-center gap-0.5 py-1.5 transition">
                  <t.icon className="h-4.5 w-4.5 h-[18px] w-[18px]"
                    style={{ color: tab === t.id ? P : "#9ca3af", strokeWidth: tab === t.id ? 2.5 : 1.8 }} />
                  <span className="text-[9px] font-bold" style={{ color: tab === t.id ? P : "#9ca3af" }}>{t.label}</span>
                  {tab === t.id && <div className="h-0.5 w-4 rounded-full mt-0.5" style={{ background: P }} />}
                </button>
              ))}
            </div>

            {/* Home indicator bar */}
            <div className="h-4 shrink-0 bg-white flex items-center justify-center">
              <div className="h-1 w-16 rounded-full bg-gray-300" />
            </div>
          </div>
      </div>

      {/* Screen label */}
      <div className="mt-6 text-center">
        <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Maharashtra Sports — Athlete App</div>
        <div className="text-[11px] text-gray-300 mt-1">Tap the bottom nav to switch screens</div>
      </div>
    </div>
  );
}

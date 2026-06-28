import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, Trophy, Wallet, Brain, Home, GraduationCap,
  MessageSquare, LogOut, ArrowLeft, Bell, TrendingUp, Award,
  Download, CheckCircle, Zap, BookOpen, Target, Send, Medal,
  Calendar, MapPin, Shield, RefreshCw, Plus, Eye,
} from "lucide-react";
import mhSeal from "@/assets/mh-seal.png";

export const Route = createFileRoute("/athlete-portal")({
  head: () => ({ meta: [{ title: "Athlete Portal — DSYS Maharashtra" }] }),
  component: AthletePortal,
});

const PRIMARY  = "#1e3a5f";
const ACCENT   = "#f97316";
const AI_COLOR = "#7c3aed";

/* ── mock data ── */
const ATHLETE = {
  name: "Rahul Shinde", initials: "RS",
  sport: "Athletics", event: "100m / 200m Sprint",
  district: "Pune", id: "ATH-2024-00481", category: "Senior",
  dob: "12 Aug 2000", coach: "Ramesh Patil", joined: "01 Apr 2024",
};

const EVENTS = [
  { id: "EVT-001", name: "State Athletics Championship 2027", cat: "100m Dash",  date: "15 Jul 2027", venue: "Balewadi, Pune",               status: "Upcoming",  entry: "Confirmed", result: "",       time: "" },
  { id: "EVT-002", name: "National Athletics Meet 2027",      cat: "200m Dash",  date: "22 Aug 2027", venue: "Indira Gandhi Stadium, Delhi",  status: "Upcoming",  entry: "Confirmed", result: "",       time: "" },
  { id: "EVT-003", name: "Maharashtra Games 2026",            cat: "100m Dash",  date: "10 Nov 2026", venue: "Pune",                          status: "Completed", entry: "Confirmed", result: "Gold",   time: "10.42s" },
  { id: "EVT-004", name: "Maharashtra Games 2026",            cat: "200m Dash",  date: "12 Nov 2026", venue: "Pune",                          status: "Completed", entry: "Confirmed", result: "Silver", time: "21.18s" },
  { id: "EVT-005", name: "National Junior Championships 2026",cat: "100m",       date: "18 Mar 2026", venue: "Hyderabad",                     status: "Completed", entry: "Confirmed", result: "Silver", time: "10.48s" },
];

const SCHEMES = [
  { name: "Shiv Chhatrapati Scholarship", year: "2026-27", amount: 48000, paid: 48000, status: "Active"  },
  { name: "Sports Hostel Stipend",         year: "2026-27", amount: 18000, paid: 18000, status: "Active"  },
  { name: "CM Youth Sports Fund",          year: "2026-27", amount: 25000, paid: 0,     status: "Pending" },
];

const PAYMENTS = [
  { scheme: "Shiv Chhatrapati Scholarship", date: "02 Jun 2027", amount: 12000, ref: "PAY2027061201" },
  { scheme: "Sports Hostel Stipend",         date: "01 Jun 2027", amount: 4500,  ref: "PAY2027060101" },
  { scheme: "Shiv Chhatrapati Scholarship", date: "01 Mar 2027", amount: 12000, ref: "PAY2027030101" },
  { scheme: "Sports Hostel Stipend",         date: "01 Mar 2027", amount: 4500,  ref: "PAY2027030102" },
];

const PERF = {
  aiScore: 82, medalPotential: 82, injuryRisk: 34,
  attrs: [
    { label: "Speed",     val: 91, color: "#3b82f6" },
    { label: "Technique", val: 83, color: "#7c3aed" },
    { label: "Mental",    val: 78, color: "#f97316" },
    { label: "Endurance", val: 74, color: "#10b981" },
    { label: "Recovery",  val: 72, color: "#06b6d4" },
    { label: "Strength",  val: 69, color: "#f59e0b" },
  ],
  trend: [72, 74, 73, 77, 79, 80, 82],
  trendLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
};

const RECS = [
  { icon: Zap,       text: "Increase sprint interval training — 4×150m reps, 3 sessions/week", priority: "High" },
  { icon: Shield,    text: "Injury risk at 34% — reduce heavy load on left hamstring",          priority: "Medium" },
  { icon: Target,    text: "Target sub-10.35s for State Championship qualifier",                 priority: "High" },
  { icon: RefreshCw, text: "Ice bath + stretching routine after every training session",         priority: "Low" },
];

const HOSTEL = {
  block: "C", room: "204", complex: "Balewadi Sports Complex, Pune",
  checkIn: "01 Apr 2026", mess: "Non-Vegetarian",
  session: "Morning (6:00 AM – 8:30 AM)",
  leaveBalance: 8, leaveUsed: 4,
  roommates: ["Ajay Naik (Wrestling)", "Kedar Mote (Athletics)"],
};

const LEAVES = [
  { from: "10 Jun 2027", days: 3, reason: "Family function",     status: "Approved" },
  { from: "14 Apr 2027", days: 1, reason: "Medical appointment", status: "Approved" },
];

const MESS_MENU = [
  { day: "Mon", bfast: "Poha, Tea",     lunch: "Dal, Rice, Roti, Veg",    dinner: "Chicken Curry, Rice, Roti" },
  { day: "Tue", bfast: "Upma, Milk",    lunch: "Rajma, Rice, Roti, Salad",dinner: "Mutton Curry, Rice, Roti"  },
  { day: "Wed", bfast: "Idli, Sambar",  lunch: "Chole, Rice, Puri",       dinner: "Fish Curry, Rice"          },
  { day: "Thu", bfast: "Paratha, Curd", lunch: "Dal Fry, Rice, Roti",     dinner: "Chicken, Rice, Roti"       },
  { day: "Fri", bfast: "Bread, Eggs",   lunch: "Palak Paneer, Rice, Roti",dinner: "Egg Curry, Rice"           },
  { day: "Sat", bfast: "Misal Pav",     lunch: "Veg Biryani, Raita",      dinner: "Mutton Biryani"            },
  { day: "Sun", bfast: "Puri Bhaji",    lunch: "Special Thali",            dinner: "Chicken + Sweets"          },
];

const COURSES = [
  { name: "Sports Nutrition & Diet Planning", module: "LMS-NUT-01", progress: 80,  lessons: 10, done: 8, cert: false },
  { name: "Mental Performance Coaching",      module: "LMS-MNT-03", progress: 45,  lessons: 8,  done: 4, cert: false },
  { name: "Anti-Doping Awareness (NADA)",     module: "LMS-ADA-01", progress: 100, lessons: 5,  done: 5, cert: true, certDate: "12 Mar 2027" },
  { name: "Strength & Conditioning Basics",   module: "LMS-STR-02", progress: 20,  lessons: 6,  done: 1, cert: false },
];

const GRIEVANCES_DATA = [
  { id: "GRV/2027/04/042", subject: "Training ground not available during assigned slot", cat: "Facility",  date: "22 Apr 2027", status: "Resolved" },
  { id: "GRV/2027/01/018", subject: "Sprint spikes not provided before National Meet",    cat: "Equipment", date: "15 Jan 2027", status: "Closed"   },
];

const NOTIFS = [
  { icon: Trophy,       color: ACCENT,    text: "Entry confirmed for State Athletics Championship — 100m Dash",     time: "2h ago"  },
  { icon: Wallet,       color: "#059669", text: "₹12,000 Shiv Chhatrapati Scholarship payment credited",            time: "2 Jun"   },
  { icon: Brain,        color: AI_COLOR,  text: "AI recommendation: increase sprint intervals — check Performance",  time: "28 Jun"  },
  { icon: CheckCircle,  color: "#059669", text: "Grievance GRV/2027/04/042 resolved by District Sports Officer",    time: "30 Apr"  },
];

/* ── shared ui ── */
function StatusPill({ s }: { s: string }) {
  const m: Record<string, string> = {
    Upcoming:  "bg-blue-50 text-blue-700 border border-blue-200",
    Completed: "bg-gray-100 text-gray-500 border border-gray-200",
    Confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Active:    "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Pending:   "bg-amber-50 text-amber-700 border border-amber-200",
    Approved:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Resolved:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Closed:    "bg-gray-100 text-gray-500 border border-gray-200",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${m[s] ?? "bg-gray-100 text-gray-500 border border-gray-200"}`}>{s}</span>;
}

function MedalBadge({ m }: { m: string }) {
  if (!m) return null;
  const c = m === "Gold" ? "bg-amber-50 text-amber-700 border border-amber-300"
    : m === "Silver" ? "bg-gray-100 text-gray-600 border border-gray-300"
    : "bg-orange-50 text-orange-700 border border-orange-200";
  return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c}`}>{m}</span>;
}

function KpiCard({ label, value, sub, accent, iconBg, Icon, loaded, delay = 0 }: {
  label: string; value: string | number; sub: string;
  accent: string; iconBg: string; Icon: React.ElementType;
  loaded: boolean; delay?: number;
}) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow duration-300"
      style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.45s ease, transform 0.45s ease", transitionDelay: `${delay}ms` }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 90% 10%, ${accent}08 0%, transparent 70%)` }}/>
      <div className="flex-1 min-w-0 relative">
        <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400 leading-none mb-2">{label}</div>
        <div className="text-2xl font-black text-gray-900 leading-none tracking-tight">{value}</div>
        <div className="text-xs font-semibold mt-1.5" style={{ color: accent }}>{sub}</div>
      </div>
      <div className="h-14 w-14 rounded-2xl grid place-items-center shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: iconBg }}>
        <Icon className="h-6 w-6" style={{ color: accent }}/>
      </div>
    </div>
  );
}

function Sparkline({ data, color, width = 200, height = 60 }: { data: number[]; color: string; width?: number; height?: number }) {
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 10) - 5;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((v - min) / range) * (height - 10) - 5;
        return <circle key={i} cx={x} cy={y} r={i === data.length - 1 ? 4 : 2.5}
          fill={i === data.length - 1 ? color : "white"} stroke={color} strokeWidth="1.5"/>;
      })}
    </svg>
  );
}

/* ══════════════════════════════════════
   SCREEN 1 — DASHBOARD
══════════════════════════════════════ */
function ScreenDashboard({ setNav }: { setNav: (n: string) => void }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);
  const gold   = EVENTS.filter(e => e.result === "Gold").length;
  const silver = EVENTS.filter(e => e.result === "Silver").length;
  const totalSch = SCHEMES.filter(s => s.status === "Active").reduce((a, s) => a + s.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-semibold text-gray-900">Welcome back, Rahul</h1>
          <p className="text-xs text-gray-400 mt-0.5">Athlete Portal · Government of Maharashtra</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar className="h-3.5 w-3.5"/>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Events Registered" value={EVENTS.length}           sub="2 upcoming"             accent={PRIMARY}   iconBg="rgba(30,58,95,0.10)"    Icon={Calendar} loaded={loaded} delay={0}/>
        <KpiCard label="Medal Tally"        value={`${gold}G · ${silver}S`} sub="FY 2026-27"             accent="#d97706"   iconBg="rgba(217,119,6,0.10)"   Icon={Medal}    loaded={loaded} delay={70}/>
        <KpiCard label="Scholarship"        value={`₹${totalSch/1000}K`}   sub="This financial year"    accent="#059669"   iconBg="rgba(5,150,105,0.10)"   Icon={Wallet}   loaded={loaded} delay={140}/>
        <KpiCard label="AI Performance"     value={PERF.aiScore}            sub="Medal potential: High"  accent={AI_COLOR}  iconBg="rgba(124,58,237,0.10)"  Icon={Brain}    loaded={loaded} delay={210}/>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800">Upcoming Events</h2>
            <button onClick={() => setNav("events")} className="text-xs font-bold hover:underline" style={{ color: PRIMARY }}>All Events →</button>
          </div>
          <div className="space-y-3">
            {EVENTS.filter(e => e.status === "Upcoming").map(ev => (
              <div key={ev.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50/50 transition">
                <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0 text-white" style={{ background: PRIMARY }}>
                  <Trophy className="h-4 w-4"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-gray-800">{ev.name}</span>
                    <StatusPill s={ev.entry}/>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/>{ev.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{ev.venue}</span>
                  </div>
                  <div className="text-[11px] font-semibold mt-1" style={{ color: ACCENT }}>{ev.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800">Notifications</h2>
            <span className="h-5 w-5 rounded-full grid place-items-center text-[10px] font-black text-white" style={{ background: ACCENT }}>4</span>
          </div>
          <div className="space-y-3">
            {NOTIFS.map((n, i) => (
              <div key={i} className={`flex items-start gap-3 ${i > 0 ? "pt-3 border-t border-gray-100" : ""}`}>
                <div className="h-7 w-7 rounded-lg grid place-items-center shrink-0" style={{ background: `${n.color}15` }}>
                  <n.icon className="h-3.5 w-3.5" style={{ color: n.color }}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-700 leading-snug">{n.text}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {([
            { label: "My Performance",       Icon: Brain,         color: AI_COLOR,  nav: "performance"  },
            { label: "Scholarship Status",   Icon: Wallet,        color: "#059669", nav: "scholarships" },
            { label: "Submit Grievance",     Icon: MessageSquare, color: "#dc2626", nav: "grievances"   },
            { label: "Training Courses",     Icon: BookOpen,      color: PRIMARY,   nav: "training"     },
            { label: "Hostel Details",       Icon: Home,          color: "#ec4899", nav: "hostel"       },
          ] as const).map(({ label, Icon, color, nav }) => (
            <button key={nav} onClick={() => setNav(nav)}
              className="flex items-center gap-2 h-9 px-4 rounded-xl border text-xs font-semibold transition-all hover:text-white"
              style={{ borderColor: `${color}50`, color, background: `${color}08` }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = color; el.style.color = "#fff"; el.style.borderColor = color; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = `${color}08`; el.style.color = color; el.style.borderColor = `${color}50`; }}>
              <Icon className="h-3.5 w-3.5"/>{label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SCREEN 2 — MY EVENTS
══════════════════════════════════════ */
function ScreenEvents() {
  const upcoming = EVENTS.filter(e => e.status === "Upcoming");
  const past     = EVENTS.filter(e => e.status === "Completed");
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-[18px] font-semibold text-gray-900">My Events</h1>
        <p className="text-xs text-gray-400 mt-0.5">Event entries, results & certificates</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {([
          { label: "Total Events", value: EVENTS.length, color: PRIMARY   },
          { label: "Upcoming",     value: upcoming.length, color: "#2563eb" },
          { label: "Medals Won",   value: past.filter(e => e.result).length, color: "#d97706" },
        ] as const).map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="text-2xl font-black" style={{ color }}>{value}</div>
            <div className="text-xs font-semibold text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {upcoming.map(ev => (
            <div key={ev.id} className="flex items-start gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50/40">
              <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0 text-white" style={{ background: PRIMARY }}>
                <Trophy className="h-5 w-5"/>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-gray-900">{ev.name}</span>
                  <StatusPill s="Confirmed"/>
                  <StatusPill s="Upcoming"/>
                </div>
                <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5"/>{ev.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5"/>{ev.venue}</span>
                </div>
                <div className="mt-1.5 text-xs font-semibold" style={{ color: ACCENT }}>Event: {ev.cat}</div>
              </div>
              <button className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#1e3a5f] hover:text-[#1e3a5f] transition flex items-center gap-1.5 shrink-0">
                <Eye className="h-3.5 w-3.5"/> View
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Results & Certificates</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Event", "Category", "Date", "Venue", "Time", "Result", "Certificate"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {past.map(ev => (
                <tr key={ev.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-xs font-semibold text-gray-800 whitespace-nowrap">{ev.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{ev.cat}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{ev.date}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{ev.venue}</td>
                  <td className="px-4 py-3 text-xs font-mono font-bold text-gray-700">{ev.time}</td>
                  <td className="px-4 py-3"><MedalBadge m={ev.result}/></td>
                  <td className="px-4 py-3">
                    <button className="h-7 w-7 rounded-full border border-gray-200 grid place-items-center hover:border-[#1e3a5f] hover:text-[#1e3a5f] transition text-gray-400">
                      <Download className="h-3.5 w-3.5"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SCREEN 3 — SCHOLARSHIPS
══════════════════════════════════════ */
function ScreenScholarships() {
  const totalPaid = PAYMENTS.reduce((a, p) => a + p.amount, 0);
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-[18px] font-semibold text-gray-900">Scholarships & Schemes</h1>
        <p className="text-xs text-gray-400 mt-0.5">Applied schemes, payment history & documents</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {([
          { label: "Total Received",  value: `₹${(totalPaid / 1000).toFixed(0)}K`, color: "#059669" },
          { label: "Active Schemes",  value: SCHEMES.filter(s => s.status === "Active").length, color: PRIMARY },
          { label: "Pending Review",  value: SCHEMES.filter(s => s.status === "Pending").length, color: "#d97706" },
        ] as const).map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="text-2xl font-black" style={{ color }}>{value}</div>
            <div className="text-xs font-semibold text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">My Schemes</h2>
        <div className="space-y-3">
          {SCHEMES.map((s, i) => {
            const active = s.status === "Active";
            return (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:shadow-sm transition">
                <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0"
                  style={{ background: active ? "rgba(5,150,105,0.10)" : "rgba(217,119,6,0.10)" }}>
                  <Wallet className="h-5 w-5" style={{ color: active ? "#059669" : "#d97706" }}/>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{s.name}</span>
                    <StatusPill s={s.status}/>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">FY {s.year}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-base font-black text-gray-900">₹{s.amount.toLocaleString("en-IN")}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Paid: ₹{s.paid.toLocaleString("en-IN")}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Scheme", "Date", "Amount", "Reference"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PAYMENTS.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-xs font-semibold text-gray-800">{p.scheme}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{p.date}</td>
                  <td className="px-4 py-3 text-xs font-black" style={{ color: "#059669" }}>₹{p.amount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-400">{p.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SCREEN 4 — PERFORMANCE
══════════════════════════════════════ */
function ScreenPerformance() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-[18px] font-semibold text-gray-900">My Performance</h1>
        <p className="text-xs text-gray-400 mt-0.5">AI-powered analytics · AIMAP module</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center justify-center text-center">
          <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">AI Performance Score</div>
          <div className="text-6xl font-black" style={{ color: AI_COLOR }}>{PERF.aiScore}</div>
          <div className="text-xs font-semibold mt-2" style={{ color: AI_COLOR }}>Medal Potential: High</div>
          <div className="mt-3 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${loaded ? PERF.aiScore : 0}%`, background: AI_COLOR }}/>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-black text-red-500">{PERF.injuryRisk}%</div>
              <div className="text-[10px] text-gray-400 font-semibold">Injury Risk</div>
            </div>
            <div className="w-px h-8 bg-gray-200"/>
            <div className="text-center">
              <div className="text-lg font-black" style={{ color: AI_COLOR }}>{PERF.medalPotential}%</div>
              <div className="text-[10px] text-gray-400 font-semibold">Medal Potential</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Attribute Breakdown</h2>
          <div className="space-y-3">
            {PERF.attrs.map(({ label, val, color }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600">{label}</span>
                  <span className="text-xs font-black" style={{ color }}>{val}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: loaded ? `${val}%` : "0%", background: color }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-1">Performance Trend</h2>
          <p className="text-[10px] text-gray-400 mb-4">Jan – Jul 2027</p>
          <Sparkline data={PERF.trend} color={AI_COLOR} width={190} height={70}/>
          <div className="mt-2 flex justify-between text-[10px] text-gray-400">
            {PERF.trendLabels.map(l => <span key={l}>{l}</span>)}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500"/>
            <span className="text-xs font-semibold text-emerald-600">+10 points since January</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-4 w-4" style={{ color: AI_COLOR }}/>
          <h2 className="text-sm font-bold text-gray-800">AI Recommendations</h2>
          <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: `${AI_COLOR}15`, color: AI_COLOR }}>Updated 28 Jun 2027</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {RECS.map(({ icon: Icon, text, priority }, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/60">
              <div className="h-8 w-8 rounded-lg grid place-items-center shrink-0" style={{ background: `${AI_COLOR}10` }}>
                <Icon className="h-4 w-4" style={{ color: AI_COLOR }}/>
              </div>
              <div className="flex-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded mb-1 inline-block ${
                  priority === "High" ? "bg-red-50 text-red-600" : priority === "Medium" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"
                }`}>{priority}</span>
                <p className="text-[11px] text-gray-700 leading-snug">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SCREEN 5 — HOSTEL
══════════════════════════════════════ */
function ScreenHostel() {
  const today = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][(new Date().getDay() + 6) % 7];
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-[18px] font-semibold text-gray-900">Hostel & Accommodation</h1>
        <p className="text-xs text-gray-400 mt-0.5">Room details, mess schedule & leave management</p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl grid place-items-center shrink-0" style={{ background: "rgba(236,72,153,0.10)" }}>
              <Home className="h-6 w-6" style={{ color: "#ec4899" }}/>
            </div>
            <div>
              <div className="text-lg font-black text-gray-900">Room {HOSTEL.room} · Block {HOSTEL.block}</div>
              <div className="text-xs text-gray-500 mt-0.5">{HOSTEL.complex}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Check-in: {HOSTEL.checkIn}</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {([
              { label: "Mess Type",   value: HOSTEL.mess },
              { label: "Session",     value: HOSTEL.session },
              { label: "Roommates",   value: HOSTEL.roommates[0] },
              { label: "",            value: HOSTEL.roommates[1] },
            ] as const).map(({ label, value }, i) => (
              <div key={i} className="rounded-xl bg-gray-50 px-3 py-2">
                {label && <div className="text-[10px] text-gray-400 uppercase font-bold">{label}</div>}
                <div className="text-xs font-semibold text-gray-800 mt-0.5">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-3">Leave Balance</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-black" style={{ color: PRIMARY }}>{HOSTEL.leaveBalance}</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold">Remaining</div>
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between text-[11px] text-gray-500">
                <span>Used</span><span className="font-bold">{HOSTEL.leaveUsed} days</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(HOSTEL.leaveUsed / (HOSTEL.leaveBalance + HOSTEL.leaveUsed)) * 100}%`, background: PRIMARY }}/>
              </div>
              <div className="flex justify-between text-[11px] text-gray-500">
                <span>Total</span><span className="font-bold">{HOSTEL.leaveBalance + HOSTEL.leaveUsed} days/year</span>
              </div>
            </div>
          </div>
          <h3 className="text-xs font-bold text-gray-600 mb-2">Recent Leaves</h3>
          {LEAVES.map((l, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-t border-gray-100">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0"/>
              <div className="flex-1 text-[11px] text-gray-600">{l.reason} <span className="text-gray-400">({l.days}d)</span></div>
              <div className="text-[10px] text-gray-400 whitespace-nowrap">{l.from}</div>
              <StatusPill s={l.status}/>
            </div>
          ))}
          <button className="mt-3 w-full h-9 rounded-xl border border-dashed border-gray-300 text-xs font-semibold text-gray-500 hover:border-[#ec4899] hover:text-[#ec4899] transition flex items-center justify-center gap-2">
            <Plus className="h-3.5 w-3.5"/> Apply for Leave
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Weekly Mess Menu</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Day", "Breakfast", "Lunch", "Dinner"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MESS_MENU.map(r => (
                <tr key={r.day} className={r.day === today ? "bg-blue-50/60" : "hover:bg-gray-50 transition"}>
                  <td className="px-4 py-2.5 text-xs font-black" style={{ color: r.day === today ? PRIMARY : "#374151" }}>
                    {r.day}{r.day === today ? " · Today" : ""}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{r.bfast}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{r.lunch}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{r.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SCREEN 6 — TRAINING
══════════════════════════════════════ */
function ScreenTraining() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-[18px] font-semibold text-gray-900">Training & Learning</h1>
        <p className="text-xs text-gray-400 mt-0.5">Enrolled courses & certifications · LMS module</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {([
          { label: "Courses Enrolled", value: COURSES.length, color: PRIMARY },
          { label: "Completed",        value: COURSES.filter(c => c.progress === 100).length, color: "#059669" },
          { label: "Certificates",     value: COURSES.filter(c => c.cert).length, color: ACCENT },
        ] as const).map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="text-2xl font-black" style={{ color }}>{value}</div>
            <div className="text-xs font-semibold text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {COURSES.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl grid place-items-center shrink-0" style={{ background: `${PRIMARY}10` }}>
                <BookOpen className="h-6 w-6" style={{ color: PRIMARY }}/>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-gray-900">{c.name}</span>
                  {c.cert && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <Award className="h-3 w-3"/> Certified
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  {c.module} · {c.done}/{c.lessons} lessons completed
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: loaded ? `${c.progress}%` : "0%", background: c.progress === 100 ? "#059669" : PRIMARY, transitionDelay: `${i * 100}ms` }}/>
                  </div>
                  <span className="text-xs font-black shrink-0" style={{ color: c.progress === 100 ? "#059669" : PRIMARY }}>{c.progress}%</span>
                </div>
                {"certDate" in c && c.certDate && (
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1.5">Certificate issued: {c.certDate}</div>
                )}
              </div>
              <div className="shrink-0 flex gap-2">
                {c.cert && (
                  <button className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#1e3a5f] hover:text-[#1e3a5f] transition flex items-center gap-1.5">
                    <Download className="h-3.5 w-3.5"/> Certificate
                  </button>
                )}
                <button className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#1e3a5f] hover:text-[#1e3a5f] transition flex items-center gap-1.5">
                  {c.progress === 100 ? <Eye className="h-3.5 w-3.5"/> : <BookOpen className="h-3.5 w-3.5"/>}
                  {c.progress === 100 ? "Review" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SCREEN 7 — GRIEVANCES
══════════════════════════════════════ */
function ScreenGrievances() {
  const [subject, setSubject]   = useState("");
  const [category, setCategory] = useState("Facility");
  const [desc, setDesc]         = useState("");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-[18px] font-semibold text-gray-900">My Grievances</h1>
        <p className="text-xs text-gray-400 mt-0.5">Submit complaints & track resolution status</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {([
          { label: "Total Submitted", value: GRIEVANCES_DATA.length, color: PRIMARY },
          { label: "Resolved",        value: GRIEVANCES_DATA.filter(g => g.status === "Resolved").length, color: "#059669" },
          { label: "Pending",         value: GRIEVANCES_DATA.filter(g => !["Resolved","Closed"].includes(g.status)).length, color: "#d97706" },
        ] as const).map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="text-2xl font-black" style={{ color }}>{value}</div>
            <div className="text-xs font-semibold text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Submit New Grievance</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-[#363092]">
              {["Facility","Equipment","Scholarship","Hostel","Coaching","Other"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Brief subject..."
              className="w-full h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-700 placeholder:text-gray-300 bg-white focus:outline-none focus:border-[#363092]"/>
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
          <textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)}
            placeholder="Describe your grievance in detail..."
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 placeholder:text-gray-300 bg-white focus:outline-none focus:border-[#363092] resize-none"/>
        </div>
        <div className="mt-3 flex justify-end">
          <button className="h-9 px-5 rounded-xl text-xs font-bold text-white flex items-center gap-2 hover:opacity-90 transition"
            style={{ background: PRIMARY }}>
            <Send className="h-3.5 w-3.5"/> Submit Grievance
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Grievance History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Grievance ID", "Subject", "Category", "Filed On", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {GRIEVANCES_DATA.map((g, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{g.id}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-800">{g.subject}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{g.cat}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{g.date}</td>
                  <td className="px-4 py-3"><StatusPill s={g.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PORTAL SHELL
══════════════════════════════════════ */
const NAV_ITEMS = [
  { key: "dashboard",    label: "Dashboard",    Icon: LayoutDashboard },
  { key: "events",       label: "My Events",    Icon: Trophy          },
  { key: "scholarships", label: "Scholarships", Icon: Wallet          },
  { key: "performance",  label: "Performance",  Icon: Brain           },
  { key: "hostel",       label: "Hostel",       Icon: Home            },
  { key: "training",     label: "Training",     Icon: GraduationCap   },
  { key: "grievances",   label: "Grievances",   Icon: MessageSquare   },
] as const;

type NavKey = typeof NAV_ITEMS[number]["key"];

function AthletePortal() {
  const [nav, setNav] = useState<NavKey>("dashboard");
  const activeLabel = NAV_ITEMS.find(n => n.key === nav)?.label ?? "";

  const screen: Record<NavKey, React.ReactNode> = {
    dashboard:    <ScreenDashboard setNav={n => setNav(n as NavKey)}/>,
    events:       <ScreenEvents/>,
    scholarships: <ScreenScholarships/>,
    performance:  <ScreenPerformance/>,
    hostel:       <ScreenHostel/>,
    training:     <ScreenTraining/>,
    grievances:   <ScreenGrievances/>,
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ── sidebar ── */}
      <aside className="w-60 shrink-0 flex flex-col sticky top-0 h-screen"
        style={{ background: "linear-gradient(180deg,#2a2080 0%,#16104a 100%)" }}>

        <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10">
          <img src={mhSeal} alt="" className="h-8 w-8 object-contain shrink-0"/>
          <div>
            <div className="text-[11px] leading-tight font-black text-white">Athlete Portal</div>
            <div className="text-[9px] text-white/50 mt-0.5 leading-tight">DSYS Maharashtra</div>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full grid place-items-center text-xs font-black text-white shrink-0"
              style={{ background: ACCENT }}>{ATHLETE.initials}</div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{ATHLETE.name}</div>
              <div className="text-[10px] text-white/50 truncate">{ATHLETE.sport} · {ATHLETE.district}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setNav(key)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
              style={nav === key
                ? { background: "linear-gradient(135deg,#4a41c4,#363092)", boxShadow: "0 2px 10px rgba(0,0,0,0.3)", color: "#fff" }
                : { color: "rgba(255,255,255,0.55)" }}>
              <Icon className="h-4 w-4 shrink-0"/>
              <span className="text-[13px] font-semibold">{label}</span>
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 space-y-2">
          <Link to="/" className="flex items-center gap-2 text-[12px] text-white/50 hover:text-white/80 transition">
            <ArrowLeft className="h-3.5 w-3.5"/> Back to Home
          </Link>
          <button className="flex items-center gap-2 text-[12px] text-white/50 hover:text-white/80 transition">
            <LogOut className="h-3.5 w-3.5"/> Sign Out
          </button>
        </div>
      </aside>

      {/* ── content ── */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 sticky top-0 z-10">
          <span className="font-semibold text-gray-900 text-sm">{activeLabel}</span>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative h-8 w-8 rounded-full border border-gray-200 grid place-items-center text-gray-500 hover:border-gray-300 transition">
              <Bell className="h-4 w-4"/>
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full grid place-items-center text-[9px] font-black text-white"
                style={{ background: ACCENT }}>4</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full grid place-items-center text-xs font-black text-white shrink-0"
                style={{ background: ACCENT }}>{ATHLETE.initials}</div>
              <div className="text-xs leading-tight">
                <div className="font-semibold text-gray-800">{ATHLETE.name}</div>
                <div className="text-gray-400">{ATHLETE.id}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {screen[nav]}
        </main>
      </div>
    </div>
  );
}

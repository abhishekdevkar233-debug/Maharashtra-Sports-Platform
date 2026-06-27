import { useState } from "react";
import {
  LayoutDashboard, Trophy, Calendar, Users, ShieldCheck,
  BarChart3, FileText, Settings, Bell, ChevronRight,
  LogOut, Plus, Eye, Edit3, Award, AlertCircle, CheckCircle,
  Clock, MapPin, Filter, Search, Download, Upload,
  Lock, Zap, Target, Activity, Send, TrendingUp,
  X, Check, ArrowLeft, Star, Radio, Wifi, WifiOff, ChevronLeft,
} from "lucide-react";
import mhSeal from "@/assets/mh-seal.png";

/* ═══════════════════════════════════════
   DESIGN TOKENS  (match HMS / AIMAP)
═══════════════════════════════════════ */
const PRIMARY = "#1e3a5f";
const ACCENT  = "#f97316";

/* ═══════════════════════════════════════
   SPORT PALETTE
═══════════════════════════════════════ */
const SPORT_COLORS: Record<string, string> = {
  Athletics: "#3b82f6", Football: "#22c55e", Wrestling: "#f59e0b",
  Swimming: "#14b8a6", Boxing: "#ef4444", Badminton: "#a855f7",
  Kabaddi: "#f97316", Archery: "#06b6d4", Cricket: "#84cc16", "Kho-Kho": "#ec4899",
};

/* ═══════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════ */
function Badge({ label, color }: { label: string; color: string }) {
  const map: Record<string, string> = {
    green:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
    red:    "bg-red-50 text-red-600 border border-red-200",
    amber:  "bg-amber-50 text-amber-700 border border-amber-200",
    blue:   "bg-blue-50 text-blue-700 border border-blue-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
    gray:   "bg-gray-100 text-gray-500 border border-gray-200",
    navy:   "bg-[#1e3a5f]/10 text-[#1e3a5f] border border-[#1e3a5f]/20",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${map[color] || map.gray}`}>{label}</span>;
}

type StatusType = "Live"|"Upcoming"|"Registration Open"|"Completed"|"Cancelled"|"Confirmed"|"Pending"|"Rejected"|"Withdrawn"|"Upheld"|"Dismissed"|"Under Review"|"Certified"|"Under Protest"|"Pending Certification"|"Ineligible"|"Pending Documents";

function StatusBadge({ status }: { status: StatusType | string }) {
  const map: Record<string, string> = {
    "Live":                  "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "Upcoming":              "bg-blue-50 text-blue-700 border border-blue-200",
    "Registration Open":     "bg-amber-50 text-amber-700 border border-amber-200",
    "Completed":             "bg-gray-100 text-gray-500 border border-gray-200",
    "Cancelled":             "bg-red-50 text-red-600 border border-red-200",
    "Confirmed":             "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "Pending":               "bg-amber-50 text-amber-700 border border-amber-200",
    "Pending Documents":     "bg-amber-50 text-amber-700 border border-amber-200",
    "Rejected":              "bg-red-50 text-red-600 border border-red-200",
    "Withdrawn":             "bg-gray-100 text-gray-500 border border-gray-200",
    "Upheld":                "bg-red-50 text-red-600 border border-red-200",
    "Dismissed":             "bg-gray-100 text-gray-500 border border-gray-200",
    "Under Review":          "bg-amber-50 text-amber-700 border border-amber-200",
    "Certified":             "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "Under Protest":         "bg-red-50 text-red-600 border border-red-200",
    "Pending Certification": "bg-blue-50 text-blue-700 border border-blue-200",
    "Ineligible":            "bg-red-50 text-red-600 border border-red-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${map[status] || "bg-gray-100 text-gray-500 border border-gray-200"}`}>
      {status === "Live" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"/>}
      {status}
    </span>
  );
}

function Sparkline({ data, color, width = 120, height = 40 }: { data: number[]; color: string; width?: number; height?: number }) {
  if (data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(" ");
  const area = `${width},${height} 0,${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`gr${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={`${pts} ${area}`} fill={`url(#gr${color.replace("#","")})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle
        cx={(data.length-1)/(data.length-1)*width}
        cy={height - ((data[data.length-1]-min)/range)*(height-6) - 3}
        r="3" fill={color}
      />
    </svg>
  );
}

function DonutChart({ pct, color, size = 72 }: { pct: number; color: string; size?: number }) {
  const r = (size - 10) / 2, c = size / 2, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="#f3f4f6" strokeWidth="7"/>
        <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ * 0.25} strokeLinecap="round"/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-black" style={{ color }}>{pct}%</span>
      </div>
    </div>
  );
}

function TableWrap({ heads, children }: { heads: string[]; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {heads.map(h => (
                <th key={h} className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MASTER DATA
═══════════════════════════════════════ */
const EVENTS_DATA = [
  { name: "Maharashtra State Athletics Championship 2027", sport: "Athletics", dates: "18 Jul → 22 Jul", venue: "Shiv Chhatrapati Complex, Pune",  status: "Live",              entries: 842,  capacity: 1000, district: "Pune",       sparkData: [620,680,710,750,780,800,820,842] },
  { name: "39th National Games — Wrestling Trials",         sport: "Wrestling", dates: "19 Jul → 21 Jul", venue: "Mahalaxmi Akhada, Kolhapur",    status: "Live",              entries: 312,  capacity: 400,  district: "Kolhapur",   sparkData: [200,230,260,280,290,300,308,312] },
  { name: "Inter-District Football Cup 2027",               sport: "Football",  dates: "02 Aug → 14 Aug", venue: "Cooperage Ground, Mumbai",       status: "Registration Open", entries: 28,   capacity: 36,   district: "Mumbai City",sparkData: [10,14,18,20,22,25,26,28] },
  { name: "Maharashtra Open Badminton Championship",        sport: "Badminton", dates: "10 Aug → 15 Aug", venue: "Khalsa College Hall, Mumbai",    status: "Upcoming",          entries: 184,  capacity: 256,  district: "Mumbai Sub", sparkData: [80,100,120,140,155,165,175,184] },
  { name: "State Kabaddi Premier League — Season 4",        sport: "Kabaddi",   dates: "01 Sep → 18 Sep", venue: "Nehru Indoor Stadium, Nagpur",   status: "Registration Open", entries: 14,   capacity: 16,   district: "Nagpur",     sparkData: [4,6,8,10,11,12,13,14] },
  { name: "Maharashtra Swimming Meet — Long Course",        sport: "Swimming",  dates: "26 Jul → 28 Jul", venue: "Balewadi Aquatic Centre, Pune",  status: "Upcoming",          entries: 416,  capacity: 500,  district: "Pune",       sparkData: [200,260,310,340,370,390,405,416] },
  { name: "State Boxing Open 2027",                         sport: "Boxing",    dates: "05 Aug → 08 Aug", venue: "Shivaji Indoor, Nashik",         status: "Completed",         entries: 220,  capacity: 250,  district: "Nashik",     sparkData: [80,110,140,165,185,200,212,220] },
];

/* ═══════════════════════════════════════
   SCREEN 1 — DASHBOARD  (redesigned)
═══════════════════════════════════════ */
function ScreenDashboard({ onCreateEvent }: { onCreateEvent: () => void }) {
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = EVENTS_DATA.filter(e => {
    const q = search.toLowerCase();
    return (sportFilter === "All" || e.sport === sportFilter)
      && (statusFilter === "All" || e.status === statusFilter)
      && (q === "" || e.name.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q));
  });

  const live     = EVENTS_DATA.filter(e => e.status === "Live").length;
  const upcoming = EVENTS_DATA.filter(e => e.status === "Upcoming" || e.status === "Registration Open").length;
  const total    = EVENTS_DATA.reduce((a, e) => a + e.entries, 0);
  const sports   = [...new Set(EVENTS_DATA.map(e => e.sport))].length;

  const PENDING_ACTIONS = [
    { count: 14, label: "Late entry approvals",    sub: "Entries",  color: "#f59e0b" },
    { count: 3,  label: "Protest decisions",       sub: "Protests", color: "#ef4444" },
    { count: 22, label: "Result certifications",   sub: "Results",  color: PRIMARY   },
    { count: 6,  label: "Accreditation overrides", sub: "Accred.",  color: "#7c3aed" },
  ];

  const LIVE_SESSIONS = [
    { venue: "Shiv Chhatrapati Complex", sport: "Athletics", session: "Track Finals Day 3", status: "On Time",  color: "#3b82f6" },
    { venue: "Mahalaxmi Akhada",         sport: "Wrestling", session: "Semi-Finals",        status: "Delayed",  color: "#f59e0b" },
    { venue: "Balewadi Aquatic Centre",  sport: "Swimming",  session: "Morning Heats",      status: "On Time",  color: "#14b8a6" },
  ];

  const SPORT_DIST = Object.entries(
    EVENTS_DATA.reduce((acc, e) => ({ ...acc, [e.sport]: (acc[e.sport] || 0) + e.entries }), {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);
  const maxEntries = Math.max(...SPORT_DIST.map(([, v]) => v));

  const statusMap: Record<string,string> = { Live:"green", Upcoming:"blue", "Registration Open":"amber", Completed:"gray", Cancelled:"red" };

  return (
    <div className="p-6 space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Events Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">Directorate of Sports & Youth Services · Government of Maharashtra</p>
        </div>
        <button onClick={onCreateEvent}
          className="h-10 px-5 rounded-xl text-white text-sm font-bold flex items-center gap-2 hover:opacity-90 transition shadow-sm"
          style={{ background: PRIMARY }}>
          <Plus className="h-4 w-4"/> Create Event
        </button>
      </div>

      {/* Hero KPI strip */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Events",       value: EVENTS_DATA.length, sub: "Across "+sports+" sports",   color1: PRIMARY,   color2: "#2d5986", icon: Trophy    },
          { label: "Live Right Now",     value: live,               sub: "Active venues",              color1: "#059669", color2: "#047857", icon: Activity  },
          { label: "Upcoming / Reg Open",value: upcoming,           sub: "Next 60 days",               color1: ACCENT,    color2: "#ea580c", icon: Clock     },
          { label: "Total Entries",      value: total.toLocaleString(), sub: "All events combined",    color1: "#7c3aed", color2: "#6d28d9", icon: Users     },
        ].map(({ label, value, sub, color1, color2, icon: Icon }) => (
          <div key={label} className="rounded-2xl p-5 text-white shadow-lg relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}>
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-10 bg-white"/>
            <div className="absolute -right-2 -bottom-6 h-24 w-24 rounded-full opacity-10 bg-white"/>
            <Icon className="h-7 w-7 mb-3 opacity-90"/>
            <div className="text-3xl font-black">{value}</div>
            <div className="text-xs font-bold opacity-90 mt-0.5">{label}</div>
            <div className="text-[11px] opacity-70 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {/* Second KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          ["Completed This Year", "33", "92% on schedule", "#6b7280"],
          ["Pending Certifications","22","Awaiting sign-off","#ef4444"],
          ["Open Protests",       "3",  "Require decision", "#f59e0b"],
          ["Accreditations Issued","1,840","Active passes", PRIMARY],
        ].map(([l,v,s,c])=>(
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black" style={{color:c as string}}>{v as string}</div>
              <div className="text-xs font-semibold text-gray-800 mt-0.5">{l as string}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{s as string}</div>
            </div>
            <div className="h-10 w-10 rounded-xl grid place-items-center" style={{background:`${c as string}15`}}>
              <BarChart3 className="h-5 w-5" style={{color:c as string}}/>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Events table — 2/3 */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">All Events</span>
            <span className="text-xs text-gray-400 font-semibold">{filtered.length} of {EVENTS_DATA.length}</span>
          </div>
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50">
            <select value={sportFilter} onChange={e => setSportFilter(e.target.value)}
              className="h-8 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none focus:border-blue-400">
              <option>All</option>
              {Object.keys(SPORT_COLORS).map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="h-8 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none focus:border-blue-400">
              {["All","Live","Upcoming","Registration Open","Completed","Cancelled"].map(s => <option key={s}>{s}</option>)}
            </select>
            <div className="flex-1 min-w-40 relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"/>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events…"
                className="w-full h-8 pl-8 pr-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-blue-400"/>
            </div>
            <button className="h-8 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5"/> Export
            </button>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Event","Sport","Dates","Status","Entries","Trend","Actions"].map(h => (
                    <th key={h} className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((e, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-gray-900 text-xs leading-snug">{e.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1"><MapPin className="h-2.5 w-2.5"/>{e.venue}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:`${SPORT_COLORS[e.sport]}20`, color:SPORT_COLORS[e.sport] }}>{e.sport}</span>
                    </td>
                    <td className="px-5 py-3.5 text-[11px] text-gray-500 whitespace-nowrap">{e.dates}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={e.status}/></td>
                    <td className="px-5 py-3.5">
                      <div className="text-xs font-bold text-gray-800">{e.entries}/{e.capacity}</div>
                      <div className="mt-1 h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{width:`${Math.round(e.entries/e.capacity*100)}%`, background:SPORT_COLORS[e.sport]}}/>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Sparkline data={e.sparkData} color={SPORT_COLORS[e.sport]} width={72} height={28}/>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        {[{ icon: Eye, tip:"View" },{ icon: Edit3, tip:"Edit" },{ icon: Award, tip:"Results" }].map(({ icon: Ic, tip }) => (
                          <button key={tip} title={tip} className="h-6 w-6 rounded-lg grid place-items-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition">
                            <Ic className="h-3.5 w-3.5"/>
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar panels — 1/3 */}
        <div className="space-y-4">
          {/* Live sessions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="font-bold text-gray-800 text-sm">Live Sessions</span>
            </div>
            <div className="divide-y divide-gray-50">
              {LIVE_SESSIONS.map((s, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-800">{s.sport}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.status==="On Time"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>{s.status}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-semibold">{s.session}</div>
                  <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="h-2.5 w-2.5"/>{s.venue}</div>
                  <button className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-lg border transition"
                    style={{color:s.color, borderColor:`${s.color}40`}}>Monitor →</button>
                </div>
              ))}
            </div>
          </div>

          {/* Pending actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500"/>
              <span className="font-bold text-gray-800 text-sm">Pending Actions</span>
              <span className="ml-auto h-5 w-5 rounded-full bg-red-500 text-white text-[9px] font-black grid place-items-center">
                {PENDING_ACTIONS.reduce((a,p)=>a+p.count,0)}
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {PENDING_ACTIONS.map((p, i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3">
                  <div className="h-7 w-7 rounded-xl grid place-items-center text-xs font-black text-white shrink-0" style={{ background: p.color }}>
                    {p.count}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-800 truncate">{p.label}</div>
                    <div className="text-[10px] text-gray-400">{p.sub}</div>
                  </div>
                  <button className="text-[10px] font-bold hover:underline shrink-0" style={{color:PRIMARY}}>Review →</button>
                </div>
              ))}
            </div>
          </div>

          {/* Sport-wise entries mini chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="font-bold text-gray-800 text-sm mb-3">Entries by Sport</div>
            <div className="space-y-2.5">
              {SPORT_DIST.map(([sport, count]) => (
                <div key={sport} className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-500 w-16 truncate">{sport}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width:`${Math.round((count/maxEntries)*100)}%`, background: SPORT_COLORS[sport] }}/>
                  </div>
                  <span className="text-[10px] font-black w-8 text-right" style={{color:SPORT_COLORS[sport]}}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 2 — CREATE EVENT WIZARD
═══════════════════════════════════════ */
const WIZARD_STEPS = ["Basic Details","Sports Config","Categories","Venues & Officials","Review & Publish"];
const SPORTS_LIST  = ["Athletics","Football","Kabaddi","Kho-Kho","Wrestling","Swimming","Boxing","Archery","Badminton","Cricket","Hockey","Volleyball"];

function ScreenCreateEvent({ onBack }: { onBack: () => void }) {
  const [step, setStep]               = useState(0);
  const [form, setForm]               = useState({ name:"",eventType:"",level:"",startDate:"",endDate:"",regOpen:"",regClose:"",expectedCount:"", multiSport:false });
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [published, setPublished]     = useState(false);

  const n = WIZARD_STEPS.length;
  const edgePct = 100 / (2 * n);
  const trackWidth = 100 - 2 * edgePct;
  const filledWidth = step === 0 ? 0 : (step / (n - 1)) * trackWidth;

  const inp = `w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-[${PRIMARY}] focus:ring-2 focus:ring-[${PRIMARY}]/10 outline-none text-sm transition`;
  const sel = `w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-[${PRIMARY}] outline-none text-sm bg-white transition`;
  const lbl = "block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1";

  if (published) return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="h-20 w-20 rounded-full bg-emerald-50 border-4 border-emerald-200 grid place-items-center mb-5">
        <CheckCircle className="h-10 w-10 text-emerald-600"/>
      </div>
      <h2 className="text-2xl font-black text-gray-900">Event Published!</h2>
      <p className="text-sm text-gray-500 mt-2">Maharashtra State Athletics Championship 2027 is now live.</p>
      <div className="mt-4 text-xs font-mono bg-gray-100 px-4 py-2 rounded-xl text-gray-600 border border-gray-200">Event ID: GMS-EVT-2027-0049</div>
      <button onClick={onBack} className="mt-6 px-6 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition flex items-center gap-2" style={{background:PRIMARY}}>
        <ArrowLeft className="h-4 w-4"/> Back to Dashboard
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="h-8 px-3 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition flex items-center gap-1.5 text-xs font-semibold">
          <ArrowLeft className="h-3.5 w-3.5"/> Back
        </button>
        <div>
          <h1 className="text-xl font-black text-gray-900">Create New Event</h1>
          <p className="text-xs text-gray-400">{WIZARD_STEPS[step]} — Step {step+1} of {n}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 px-8 py-5">
        <div className="relative flex items-start">
          <div className="absolute top-[17px] h-0.5 bg-gray-200" style={{left:`${edgePct}%`,width:`${trackWidth}%`}}/>
          <div className="absolute top-[17px] h-0.5 transition-all duration-500" style={{background:PRIMARY,left:`${edgePct}%`,width:`${filledWidth}%`}}/>
          {WIZARD_STEPS.map((s, i) => {
            const done = i < step, cur = i === step;
            return (
              <div key={s} className="relative z-10 flex flex-col items-center flex-1">
                <div className={`h-9 w-9 rounded-full grid place-items-center text-xs font-bold border-2 transition-all ${done?"text-white border-transparent":cur?"bg-white":"bg-white border-gray-200 text-gray-400"}`}
                  style={done?{background:PRIMARY,borderColor:PRIMARY}:cur?{borderColor:PRIMARY,color:PRIMARY}:{}}>
                  {done ? <Check className="h-4 w-4"/> : i+1}
                </div>
                <span className={`mt-2 text-[10px] font-semibold text-center leading-tight px-1 ${cur?"font-bold":done?"text-gray-700":"text-gray-400"}`}
                  style={cur?{color:PRIMARY}:{}}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {step === 0 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 text-base border-b border-gray-100 pb-3">Basic Details</h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className={lbl}>Event Name <span className="text-red-500">*</span></label>
                <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Maharashtra State Athletics Championship 2027" className={inp}/>
              </div>
              <div>
                <label className={lbl}>Event Type <span className="text-red-500">*</span></label>
                <select value={form.eventType} onChange={e=>setForm(f=>({...f,eventType:e.target.value}))} className={sel}>
                  <option value="">Select type…</option>
                  {["Single Sport Event","Multi-Sport Event","State Championship","District Meet","Selection Trial","Invitational","Friendly","State Games"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Event Level <span className="text-red-500">*</span></label>
                <select value={form.level} onChange={e=>setForm(f=>({...f,level:e.target.value}))} className={sel}>
                  <option value="">Select level…</option>
                  {["District","Division","State","National"].map(l=><option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Hosting Association</label>
                <input placeholder="e.g. Maharashtra Athletics Association" className={inp}/>
              </div>
              <div>
                <label className={lbl}>Host District</label>
                <select className={sel}>
                  <option value="">Select district…</option>
                  {["Pune","Mumbai City","Nagpur","Nashik","Kolhapur","Aurangabad","Thane","Solapur"].map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Start Date <span className="text-red-500">*</span></label>
                <input type="date" value={form.startDate} onChange={e=>setForm(f=>({...f,startDate:e.target.value}))} className={inp}/>
              </div>
              <div>
                <label className={lbl}>End Date <span className="text-red-500">*</span></label>
                <input type="date" value={form.endDate} onChange={e=>setForm(f=>({...f,endDate:e.target.value}))} className={inp}/>
              </div>
              <div>
                <label className={lbl}>Registration Opens</label>
                <input type="date" value={form.regOpen} onChange={e=>setForm(f=>({...f,regOpen:e.target.value}))} className={inp}/>
              </div>
              <div>
                <label className={lbl}>Registration Closes</label>
                <input type="date" value={form.regClose} onChange={e=>setForm(f=>({...f,regClose:e.target.value}))} className={inp}/>
              </div>
              <div>
                <label className={lbl}>Expected Participation</label>
                <input type="number" value={form.expectedCount} onChange={e=>setForm(f=>({...f,expectedCount:e.target.value}))} placeholder="e.g. 1200" className={inp}/>
              </div>
              <div className="col-span-2">
                <label className={lbl}>Event Description</label>
                <textarea rows={3} placeholder="Describe the event objectives, scope, and key highlights…" className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-400 outline-none text-sm transition"/>
              </div>
              <div className="col-span-2">
                <label className={lbl}>Upload Event Logo / Poster</label>
                <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 cursor-pointer transition">
                  <Upload className="h-5 w-5 text-gray-400"/>
                  <span className="text-sm text-gray-500">Click to upload logo or poster · PNG / JPG / PDF · Max 5MB</span>
                  <input type="file" className="hidden"/>
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 text-base border-b border-gray-100 pb-3">Sports Configuration</h3>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <input type="checkbox" id="multi" checked={form.multiSport} onChange={e=>setForm(f=>({...f,multiSport:e.target.checked}))} className="h-4 w-4"/>
              <label htmlFor="multi" className="text-sm font-semibold text-amber-800">This is a Multi-Sport Event</label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {SPORTS_LIST.map(sport => {
                const sel = selectedSports.includes(sport);
                const toggle = () => setSelectedSports(ss => form.multiSport ? (sel ? ss.filter(s=>s!==sport) : [...ss,sport]) : [sport]);
                return (
                  <button key={sport} onClick={toggle}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-sm font-semibold transition ${sel?"text-white":"border-gray-200 text-gray-700 hover:border-blue-300"}`}
                    style={sel?{background:SPORT_COLORS[sport]||PRIMARY,borderColor:SPORT_COLORS[sport]||PRIMARY}:{}}>
                    {sel ? <Check className="h-4 w-4 shrink-0"/> : <div className="h-4 w-4 rounded border border-gray-300 shrink-0"/>}
                    {sport}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 text-base border-b border-gray-100 pb-3">Categories & Disciplines</h3>
            {(selectedSports.length>0?selectedSports:["Athletics"]).map(sport=>(
              <div key={sport} className="rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 flex items-center justify-between" style={{background:`${SPORT_COLORS[sport]||PRIMARY}10`}}>
                  <span className="font-bold text-sm" style={{color:SPORT_COLORS[sport]||PRIMARY}}>{sport}</span>
                  <button className="text-xs font-bold flex items-center gap-1" style={{color:PRIMARY}}><Plus className="h-3.5 w-3.5"/> Add Category</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {(sport==="Athletics"?["U14 Boys","U14 Girls","U17 Boys","U17 Girls","Senior Men","Senior Women"]:["Senior Men","Senior Women","U17 Boys","U17 Girls"]).map((cat,ci)=>(
                    <div key={ci} className="px-5 py-3 grid grid-cols-5 gap-3 items-center text-xs">
                      <span className="font-semibold text-gray-800">{cat}</span>
                      <select className="h-8 px-2 rounded-xl border border-gray-200 text-xs bg-white outline-none"><option>Individual</option><option>Team</option></select>
                      <div className="flex items-center gap-2">
                        <input type="number" placeholder="Min" className="w-14 h-8 px-2 rounded-xl border border-gray-200 text-xs outline-none"/>
                        <span className="text-gray-400">–</span>
                        <input type="number" placeholder="Max" className="w-14 h-8 px-2 rounded-xl border border-gray-200 text-xs outline-none"/>
                      </div>
                      <div className="flex gap-3">
                        {["Para","Weight Class"].map(tog=>(
                          <label key={tog} className="flex items-center gap-1 text-[10px] text-gray-500">
                            <input type="checkbox" className="h-3 w-3"/>{tog}
                          </label>
                        ))}
                      </div>
                      <button className="text-red-400 hover:text-red-600 transition text-[10px] font-bold">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 text-base border-b border-gray-100 pb-3">Venues & Officials</h3>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Venue Assignment</div>
                <div className="space-y-3">
                  {[
                    { name:"Shiv Chhatrapati Sports Complex", type:"Athletic Track", cap:"5000", status:"Available" },
                    { name:"Balewadi Stadium",                type:"Multi-Sport",    cap:"8000", status:"Available" },
                    { name:"Khalsa College Indoor Hall",      type:"Indoor Hall",   cap:"1200", status:"Booked"    },
                    { name:"Balewadi Aquatic Centre",         type:"Swimming Pool", cap:"800",  status:"Available" },
                  ].map((v,i)=>(
                    <div key={i} className={`p-4 rounded-2xl border-2 transition ${v.status==="Available"?"border-gray-200 hover:border-blue-300":"border-gray-100 bg-gray-50 opacity-60"}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{v.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{v.type} · Cap: {v.cap}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.status==="Available"?"bg-emerald-50 text-emerald-700":"bg-red-50 text-red-600"}`}>{v.status}</span>
                      </div>
                      {v.status==="Available"&&<button className="mt-3 text-xs font-bold border rounded-xl px-3 py-1 transition" style={{color:PRIMARY,borderColor:`${PRIMARY}30`}}>Assign Venue</button>}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Officials Assignment</div>
                <div className="space-y-3">
                  {[
                    { role:"Technical Director",   required:true,  assigned:"Dr. R. Kulkarni" },
                    { role:"Competition Manager",  required:true,  assigned:"" },
                    { role:"Chief Referee",        required:true,  assigned:"" },
                    { role:"Starters (Athletics)", required:false, assigned:"S. Patil, M. Shah" },
                    { role:"Timekeepers",          required:false, assigned:"" },
                    { role:"Medical Officer",      required:true,  assigned:"Dr. A. Deshpande" },
                  ].map((o,i)=>(
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-gray-200">
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-800">{o.role} {o.required&&<span className="text-red-500">*</span>}</div>
                        {o.assigned
                          ? <div className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-1"><CheckCircle className="h-3 w-3"/>{o.assigned}</div>
                          : <div className="text-[10px] text-amber-600 mt-0.5">Not assigned</div>}
                      </div>
                      <button className="text-xs font-bold border rounded-lg px-2 py-1 transition" style={{color:PRIMARY,borderColor:`${PRIMARY}30`}}>
                        {o.assigned?"Change":"Assign"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 text-base border-b border-gray-100 pb-3">Review & Publish</h3>
            <div className="grid grid-cols-2 gap-5">
              {[
                { title:"Event Details",         rows:[["Name",form.name||"Maharashtra State Athletics Championship 2027"],["Type",form.eventType||"State Championship"],["Level",form.level||"State"],["Dates",`${form.startDate||"18 Jul"} → ${form.endDate||"22 Jul 2027"}`]] },
                { title:"Sports & Participation",rows:[["Sports",selectedSports.join(", ")||"Athletics"],["Expected Athletes",form.expectedCount||"1,200"],["Categories","14 configured"],["Venues","3 assigned"]] },
              ].map(({ title, rows })=>(
                <div key={title} className="rounded-2xl border border-gray-100 p-4">
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:PRIMARY}}>{title}</div>
                  <dl className="space-y-2">
                    {rows.map(([k,v])=>(
                      <div key={k} className="flex justify-between text-xs">
                        <dt className="text-gray-400">{k}</dt>
                        <dd className="font-semibold text-gray-800 text-right max-w-[60%] truncate">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 mb-1"><CheckCircle className="h-4 w-4"/> All checks passed</div>
              <div className="text-xs text-emerald-700">Event is ready for publication. It will be visible to participants and the public immediately.</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
          <div className="flex gap-2">
            {step>0&&(
              <button onClick={()=>setStep(s=>s-1)}
                className="h-10 px-5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 hover:text-blue-600 transition">
                <ChevronLeft className="h-4 w-4"/> Previous
              </button>
            )}
            <button className="h-10 px-5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:text-gray-700 transition">Save Draft</button>
          </div>
          <span className="text-xs text-gray-400">Step {step+1} of {n}</span>
          {step<n-1?(
            <button onClick={()=>setStep(s=>s+1)}
              className="h-10 px-6 rounded-xl text-white text-sm font-bold flex items-center gap-1.5 hover:opacity-90 transition"
              style={{background:PRIMARY}}>
              Next <ChevronRight className="h-4 w-4"/>
            </button>
          ):(
            <button onClick={()=>setPublished(true)}
              className="h-10 px-6 rounded-xl text-white text-sm font-bold flex items-center gap-1.5 hover:opacity-90 transition shadow"
              style={{background:"#059669"}}>
              <Zap className="h-4 w-4"/> Publish Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 3 — CALENDAR
═══════════════════════════════════════ */
const MONTH_DAYS = (() => {
  const days: {day:number;events:{name:string;sport:string}[]}[] = [];
  for(let i=1;i<=31;i++){
    const evs: {name:string;sport:string}[] = [];
    if(i===18) evs.push({name:"MH Athletics",sport:"Athletics"});
    if(i===19) evs.push({name:"Wrestling Trials",sport:"Wrestling"});
    if(i===20){evs.push({name:"Athletics Day 3",sport:"Athletics"});evs.push({name:"Wrestling SF",sport:"Wrestling"});}
    if(i===22) evs.push({name:"Athletics Finals",sport:"Athletics"});
    if(i===26) evs.push({name:"Swimming Meet",sport:"Swimming"});
    days.push({day:i,events:evs});
  }
  return days;
})();

function ScreenCalendar() {
  const [view, setView] = useState<"month"|"agenda">("month");
  const [selected, setSelected] = useState<{name:string;sport:string}|null>(null);
  const startDow = 2;
  const blanks = Array(startDow).fill(null);

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button className="h-8 w-8 rounded-xl border border-gray-200 grid place-items-center hover:border-blue-400 transition"><ChevronLeft className="h-4 w-4"/></button>
            <h2 className="font-black text-gray-900 text-lg">July 2027</h2>
            <button className="h-8 w-8 rounded-xl border border-gray-200 grid place-items-center hover:border-blue-400 transition"><ChevronRight className="h-4 w-4"/></button>
            <button className="h-8 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-blue-400 transition">Today</button>
          </div>
          <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1">
            {["month","agenda"].map(v=>(
              <button key={v} onClick={()=>setView(v as "month"|"agenda")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${view===v?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>{v}</button>
            ))}
          </div>
        </div>

        {view==="month"?(
          <>
            <div className="grid grid-cols-7 border-b border-gray-100">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
                <div key={d} className="text-center text-[11px] font-bold text-gray-400 uppercase py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {blanks.map((_,i)=><div key={`b${i}`} className="min-h-[90px] border-b border-r border-gray-50 bg-gray-50/50"/>)}
              {MONTH_DAYS.map(({day,events})=>(
                <div key={day} className="min-h-[90px] border-b border-r border-gray-100 p-1.5 hover:bg-gray-50/50 transition">
                  <div className="text-xs font-bold text-gray-500 mb-1">{day}</div>
                  <div className="space-y-0.5">
                    {events.slice(0,2).map((e,i)=>(
                      <button key={i} onClick={()=>setSelected(e)}
                        className="w-full text-left px-1.5 py-0.5 rounded-lg text-[9px] font-semibold truncate transition hover:opacity-80"
                        style={{background:`${SPORT_COLORS[e.sport]}20`,color:SPORT_COLORS[e.sport]}}>
                        {e.name}
                      </button>
                    ))}
                    {events.length>2&&<div className="text-[9px] text-gray-400 pl-1">+{events.length-2} more</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        ):(
          <div className="divide-y divide-gray-100">
            {MONTH_DAYS.filter(d=>d.events.length>0).map(({day,events})=>(
              <div key={day} className="px-5 py-4 flex gap-5 items-start">
                <div className="w-16 shrink-0 text-center">
                  <div className="text-2xl font-black text-gray-900">{day}</div>
                  <div className="text-xs text-gray-400">Jul 2027</div>
                </div>
                <div className="flex-1 space-y-2">
                  {events.map((e,i)=>(
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-gray-200 hover:border-blue-300 transition cursor-pointer" onClick={()=>setSelected(e)}>
                      <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{background:SPORT_COLORS[e.sport]}}/>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800">{e.name}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                          <span style={{color:SPORT_COLORS[e.sport]}}>{e.sport}</span>
                          <span>· Shiv Chhatrapati Complex, Pune</span>
                        </div>
                      </div>
                      <StatusBadge status="Live"/>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected?(
        <div className="w-72 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="font-bold text-gray-800 text-sm">Event Details</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-700"><X className="h-4 w-4"/></button>
          </div>
          <div className="p-5">
            <div className="h-10 w-10 rounded-2xl mb-3 grid place-items-center font-bold text-sm" style={{background:`${SPORT_COLORS[selected.sport]}15`,color:SPORT_COLORS[selected.sport]}}>
              {selected.sport.slice(0,2)}
            </div>
            <h3 className="font-black text-gray-900 text-base leading-snug">{selected.name}</h3>
            <div className="mt-2"><StatusBadge status="Live"/></div>
            <div className="mt-4 space-y-2.5 text-xs text-gray-600">
              {[["Sport",selected.sport],["Dates","18 Jul → 22 Jul 2027"],["Venue","Shiv Chhatrapati Complex, Pune"],["Host","Maharashtra Athletics Assoc."],["Entries","842 / 1000"]].map(([l,v])=>(
                <div key={l} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400">{l}</span><span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {["View Full Details","Edit Event","Manage Entries"].map(btn=>(
                <button key={btn} className="w-full h-9 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-blue-400 hover:text-blue-600 transition">{btn}</button>
              ))}
            </div>
          </div>
        </div>
      ):(
        <div className="w-52 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 font-bold text-sm text-gray-800 flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-gray-400"/> Filters
          </div>
          <div className="p-4 space-y-5">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Sport</div>
              <div className="space-y-1.5">
                {Object.keys(SPORT_COLORS).slice(0,6).map(s=>(
                  <label key={s} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="h-3.5 w-3.5"/>
                    <span className="h-2 w-2 rounded-full shrink-0" style={{background:SPORT_COLORS[s]}}/>
                    {s}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Status</div>
              <div className="space-y-1.5">
                {["Active","Upcoming","Completed"].map(s=>(
                  <label key={s} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="h-3.5 w-3.5"/>{s}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 4 — PARTICIPATION
═══════════════════════════════════════ */
function ScreenParticipation() {
  const [tab, setTab] = useState<"assoc"|"athlete">("assoc");
  const [search, setSearch] = useState("");

  const ASSOCS = [
    { name:"Maharashtra Athletics Association", district:"Pune",        submitted:142,confirmed:136,pending:4, rejected:2, withdrawn:3,  updated:"2 hrs ago" },
    { name:"Mumbai Football Federation",        district:"Mumbai City", submitted:36, confirmed:32, pending:2, rejected:0, withdrawn:4,  updated:"5 hrs ago" },
    { name:"Vidarbha Sports Association",       district:"Nagpur",      submitted:88, confirmed:70, pending:12,rejected:3, withdrawn:5,  updated:"1 day ago" },
    { name:"Konkan Districts SA",               district:"Raigad",      submitted:54, confirmed:54, pending:0, rejected:0, withdrawn:0,  updated:"3 hrs ago" },
    { name:"Nashik District Sports",            district:"Nashik",      submitted:67, confirmed:58, pending:6, rejected:1, withdrawn:2,  updated:"6 hrs ago" },
  ];
  const ATHLETES = [
    { name:"Ajay Shelar",    id:"MH-ATH-2027-001",assoc:"Maharashtra AA",sport:"Athletics",cat:"Senior Men",  entry:"Confirmed",        medical:"Cleared",  accred:"Issued"  },
    { name:"Priya Nimkar",   id:"MH-ATH-2027-002",assoc:"Pune DSA",      sport:"Athletics",cat:"Senior Women",entry:"Pending Documents", medical:"Pending",  accred:"Pending" },
    { name:"Rahul Khedkar",  id:"MH-WRS-2027-011",assoc:"Kolhapur SA",   sport:"Wrestling",cat:"U17 Boys",    entry:"Confirmed",        medical:"Cleared",  accred:"Issued"  },
    { name:"Sneha Patankar", id:"MH-SWM-2027-034",assoc:"Mumbai FA",     sport:"Swimming", cat:"Senior Women",entry:"Ineligible",        medical:"Not Done", accred:"Blocked" },
    { name:"Rohan Deshmukh", id:"MH-KBD-2027-007",assoc:"Nagpur SA",     sport:"Kabaddi",  cat:"Senior Men",  entry:"Withdrawn",        medical:"Cleared",  accred:"Revoked" },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Entry Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Maharashtra State Athletics Championship 2027</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition"><Download className="h-3.5 w-3.5"/> Export</button>
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition"><Send className="h-3.5 w-3.5"/> Send Reminder</button>
          <button className="h-9 px-4 rounded-xl bg-red-50 text-xs font-bold text-red-600 border border-red-200 flex items-center gap-1.5 hover:bg-red-100 transition"><Lock className="h-3.5 w-3.5"/> Close Registration</button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-4 gap-4">
        {[
          ["Total Associations","35","All districts",PRIMARY,"#059669"],
          ["Entries Submitted","28","of 35 associations","#f59e0b","#f59e0b"],
          ["Entries Confirmed","24","4 pending review","#059669","#059669"],
          ["Withdrawals","6","since registration","#ef4444","#ef4444"],
        ].map(([l,v,s,c,ic])=>(
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 relative overflow-hidden">
            <div className="text-2xl font-black" style={{color:c as string}}>{v as string}</div>
            <div className="text-xs font-semibold text-gray-800 mt-0.5">{l as string}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s as string}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
        {[["assoc","By Association"],["athlete","By Athlete"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id as "assoc"|"athlete")}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition ${tab===id?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>{label}</button>
        ))}
      </div>

      {tab==="assoc"?(
        <TableWrap heads={["Association","District","Submitted","Confirmed","Pending","Rejected","Withdrawn","Updated","Actions"]}>
          {ASSOCS.map((a,i)=>(
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3.5 font-semibold text-gray-800 text-xs">{a.name}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{a.district}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-gray-800">{a.submitted}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-emerald-600">{a.confirmed}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-amber-600">{a.pending}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-red-500">{a.rejected}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-gray-400">{a.withdrawn}</td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{a.updated}</td>
              <td className="px-5 py-3.5">
                <button className="text-[10px] font-bold border rounded-lg px-2 py-1 transition" style={{color:PRIMARY,borderColor:`${PRIMARY}30`}}>View Entries</button>
              </td>
            </tr>
          ))}
        </TableWrap>
      ):(
        <>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or registration ID…"
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-gray-200 text-xs outline-none focus:border-blue-400"/>
          </div>
          <TableWrap heads={["Athlete","Reg ID","Association","Sport","Category","Entry Status","Medical","Accred.","Action"]}>
            {ATHLETES.filter(a=>!search||a.name.toLowerCase().includes(search.toLowerCase())||a.id.toLowerCase().includes(search.toLowerCase())).map((a,i)=>(
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3.5 font-semibold text-gray-800 text-xs">{a.name}</td>
                <td className="px-5 py-3.5 font-mono text-gray-500 text-[10px]">{a.id}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500 truncate max-w-xs">{a.assoc}</td>
                <td className="px-5 py-3.5"><span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{background:`${SPORT_COLORS[a.sport]}15`,color:SPORT_COLORS[a.sport]}}>{a.sport}</span></td>
                <td className="px-5 py-3.5 text-xs text-gray-500">{a.cat}</td>
                <td className="px-5 py-3.5"><StatusBadge status={a.entry}/></td>
                <td className="px-5 py-3.5"><span className={`text-[10px] font-bold ${a.medical==="Cleared"?"text-emerald-600":"text-amber-600"}`}>{a.medical}</span></td>
                <td className="px-5 py-3.5"><span className={`text-[10px] font-bold ${a.accred==="Issued"?"text-emerald-600":a.accred==="Blocked"?"text-red-500":"text-amber-600"}`}>{a.accred}</span></td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1">
                    <button className="text-[10px] font-bold text-emerald-700 border border-emerald-200 rounded-lg px-2 py-0.5 hover:bg-emerald-50 transition">Approve</button>
                    <button className="text-[10px] font-bold text-red-600 border border-red-200 rounded-lg px-2 py-0.5 hover:bg-red-50 transition">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </TableWrap>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 5 — RESULTS
═══════════════════════════════════════ */
function ScreenResults() {
  const [tab, setTab] = useState("pending");
  const RESULTS = [
    { sport:"Athletics",cat:"Senior Men — 100m",    round:"Final",      summary:"1st: Ajay Shelar 10.42s",  by:"S. Gaikwad",window:"28 min left",status:"Pending Certification" },
    { sport:"Athletics",cat:"Senior Women — 200m",  round:"Final",      summary:"1st: Priya Nimkar 23.18s", by:"S. Gaikwad",window:"45 min left",status:"Pending Certification" },
    { sport:"Wrestling",cat:"U17 — 60kg",           round:"Semi-Final", summary:"Rahul K. won by Fall",     by:"M. Borate",window:"Expired",    status:"Pending Certification" },
    { sport:"Athletics",cat:"Senior Men — Long Jump",round:"Final",     summary:"1st: V. More 7.84m",       by:"T. Kadam", window:"Certified",  status:"Certified"             },
    { sport:"Football", cat:"U17 Boys",             round:"QF 1",       summary:"Pune 2 — 0 Nashik",        by:"R. Jadhav",window:"Under Review",status:"Under Protest"         },
  ];
  const filtered = RESULTS.filter(r =>
    tab==="pending"?r.status==="Pending Certification":
    tab==="certified"?r.status==="Certified":
    tab==="protest"?r.status==="Under Protest":true
  );

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Results Centre</h1>
          <p className="text-xs text-gray-400 mt-0.5">Maharashtra State Athletics Championship 2027</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition"><Download className="h-3.5 w-3.5"/> Export</button>
        </div>
      </div>

      <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
        {[["pending","Pending Certification"],["certified","Certified"],["protest","Under Protest"],["published","Published"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${tab===id?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>{label}</button>
        ))}
      </div>

      <TableWrap heads={["Sport","Category","Round","Result Summary","Entered By","Protest Window","Status","Actions"]}>
        {filtered.map((r,i)=>(
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-5 py-4"><span className="font-bold px-2 py-0.5 rounded-full text-[10px]" style={{background:`${SPORT_COLORS[r.sport]}15`,color:SPORT_COLORS[r.sport]}}>{r.sport}</span></td>
            <td className="px-5 py-4 font-semibold text-gray-800 text-[11px]">{r.cat}</td>
            <td className="px-5 py-4 text-xs text-gray-500">{r.round}</td>
            <td className="px-5 py-4 text-xs font-semibold text-gray-700">{r.summary}</td>
            <td className="px-5 py-4 text-xs text-gray-400">{r.by}</td>
            <td className="px-5 py-4">
              <span className={`text-[10px] font-bold ${r.window.includes("min")?"text-amber-600":r.window==="Expired"?"text-red-500":"text-gray-400"}`}>{r.window}</span>
            </td>
            <td className="px-5 py-4"><StatusBadge status={r.status}/></td>
            <td className="px-5 py-4">
              <div className="flex gap-1.5">
                <button className="text-[10px] font-bold border rounded-lg px-2 py-0.5 transition" style={{color:PRIMARY,borderColor:`${PRIMARY}30`}}>Review</button>
                {r.status==="Pending Certification"&&<button className="text-[10px] font-bold text-emerald-700 border border-emerald-200 rounded-lg px-2 py-0.5 hover:bg-emerald-50 transition">Certify</button>}
              </div>
            </td>
          </tr>
        ))}
        {filtered.length===0&&(
          <tr><td colSpan={8} className="px-5 py-10 text-center text-sm text-gray-400">No results in this category.</td></tr>
        )}
      </TableWrap>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 6 — REPORTS
═══════════════════════════════════════ */
function ScreenReports() {
  const [activeReport, setActiveReport] = useState("participation");
  const REPORT_CATS = [
    {id:"participation",label:"Participation Reports"},
    {id:"results",      label:"Results Reports"},
    {id:"accreditation",label:"Accreditation Reports"},
    {id:"medals",       label:"Medal Tally Reports"},
    {id:"financial",    label:"Financial Reports"},
    {id:"comparison",   label:"Comparison Reports"},
    {id:"custom",       label:"Custom Report Builder"},
  ];
  const BAR_DATA = [
    {label:"Athletics",val:842},{label:"Swimming",val:416},{label:"Wrestling",val:312},
    {label:"Football",val:284},{label:"Badminton",val:184},{label:"Kabaddi",val:196},
  ];
  const maxVal = Math.max(...BAR_DATA.map(d=>d.val));

  return (
    <div className="p-6 flex gap-5">
      <div className="w-52 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 font-bold text-sm text-gray-800">Report Categories</div>
        <div className="py-2">
          {REPORT_CATS.map(c=>(
            <button key={c.id} onClick={()=>setActiveReport(c.id)}
              className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition ${activeReport===c.id?"text-white":"text-gray-600 hover:bg-gray-50"}`}
              style={activeReport===c.id?{background:PRIMARY}:{}}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-900">Sport-wise Participation Summary</h2>
              <p className="text-xs text-gray-400 mt-0.5">All sports · All categories · Maharashtra State Championship 2027</p>
            </div>
            <div className="flex gap-2">
              {[{icon:Download,label:"PDF"},{icon:Download,label:"Excel"},{icon:Send,label:"Email"}].map(({icon:Ic,label})=>(
                <button key={label} className="h-8 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
                  <Ic className="h-3.5 w-3.5"/>{label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[["Sport","All Sports"],["Category","All Categories"],["District","All Districts"]].map(([l,ph])=>(
              <select key={l} className="h-8 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none"><option>{ph}</option></select>
            ))}
            <button className="h-8 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:PRIMARY}}>Generate Report</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            ["Total Entries","2,234","Across all sports",PRIMARY],
            ["Confirmed","1,986","88.9% rate","#059669"],
            ["Districts Repr.","34","of 36 districts","#f59e0b"],
            ["Avg / District","65","athletes","#7c3aed"],
          ].map(([l,v,s,c])=>(
            <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
              <div className="text-2xl font-black" style={{color:c as string}}>{v as string}</div>
              <div className="text-xs font-semibold text-gray-800 mt-0.5">{l as string}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{s as string}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 text-sm mb-5">Entries by Sport</h3>
          <div className="space-y-3.5">
            {BAR_DATA.map(d=>(
              <div key={d.label} className="flex items-center gap-3">
                <div className="w-20 text-xs font-semibold text-gray-700 text-right shrink-0">{d.label}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden">
                  <div className="h-full rounded-full flex items-center pl-3 text-white text-[11px] font-bold transition-all duration-700"
                    style={{width:`${(d.val/maxVal)*100}%`,background:SPORT_COLORS[d.label]||PRIMARY}}>
                    {d.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <TableWrap heads={["Sport","Total Entries","Confirmed","Pending","Districts Rep.","Completion %"]}>
          {BAR_DATA.map((d,i)=>(
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3.5"><span className="font-bold px-2 py-0.5 rounded-full text-[10px]" style={{background:`${SPORT_COLORS[d.label]}15`,color:SPORT_COLORS[d.label]}}>{d.label}</span></td>
              <td className="px-5 py-3.5 text-xs font-black text-gray-800">{d.val}</td>
              <td className="px-5 py-3.5 text-xs font-semibold text-emerald-600">{Math.round(d.val*0.92)}</td>
              <td className="px-5 py-3.5 text-xs font-semibold text-amber-600">{Math.round(d.val*0.08)}</td>
              <td className="px-5 py-3.5 text-xs text-gray-600">{20+i*2}</td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{width:"92%",background:SPORT_COLORS[d.label]}}/>
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">92%</span>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 7 — SETTINGS
═══════════════════════════════════════ */
function ScreenSettings() {
  return (
    <div className="p-6 max-w-3xl space-y-5">
      <h1 className="text-xl font-black text-gray-900">Settings</h1>
      {[
        {title:"General Configuration",         fields:[["Portal Name","GMS — Maharashtra Sports"],["Default Language","English"],["Timezone","IST (UTC+5:30)"],["Auto Logout (min)","30"]]},
        {title:"Notification Preferences",       fields:[["Email Alerts","Enabled"],["SMS Alerts","Enabled"],["WhatsApp Alerts","Enabled"],["Push Notifications","Disabled"]]},
        {title:"Result Certification Settings",  fields:[["Protest Window (minutes)","30"],["Auto-certify after window","Yes"],["Require dual scorer sign-off","Yes"]]},
      ].map(({title,fields})=>(
        <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 text-sm mb-4 pb-3 border-b border-gray-100">{title}</h3>
          <div className="grid grid-cols-2 gap-4">
            {fields.map(([label,value])=>(
              <div key={label}>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
                <input defaultValue={value} className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:border-blue-400 outline-none text-sm transition"/>
              </div>
            ))}
          </div>
          <button className="mt-4 h-9 px-5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:PRIMARY}}>Save Changes</button>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   GMS PORTAL SHELL
═══════════════════════════════════════ */
const NAV_ITEMS = [
  { id:"dashboard",     label:"Dashboard",        icon:LayoutDashboard, badge:0 },
  { id:"events",        label:"Events",            icon:Trophy,          badge:0 },
  { id:"schedule",      label:"Schedule",          icon:Calendar,        badge:0 },
  { id:"participation", label:"Participation",     icon:Users,           badge:4 },
  { id:"accreditation", label:"Accreditation",     icon:ShieldCheck,     badge:6 },
  { id:"results",       label:"Results & Scoring", icon:BarChart3,       badge:3 },
  { id:"reports",       label:"Reports",           icon:FileText,        badge:0 },
  { id:"settings",      label:"Settings",          icon:Settings,        badge:0 },
];

export function GMSPortal({ onBack }: { onBack: () => void }) {
  const [nav, setNav]             = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [online]                  = useState(true);

  const activeLabel = NAV_ITEMS.find(n => n.id === nav)?.label ?? "Dashboard";
  const totalBadge  = NAV_ITEMS.reduce((a,n) => a + n.badge, 0);

  function renderScreen() {
    if (createMode) return <ScreenCreateEvent onBack={() => setCreateMode(false)}/>;
    switch (nav) {
      case "dashboard":     return <ScreenDashboard onCreateEvent={() => setCreateMode(true)}/>;
      case "events":        return <ScreenDashboard onCreateEvent={() => setCreateMode(true)}/>;
      case "schedule":      return <ScreenCalendar/>;
      case "participation": return <ScreenParticipation/>;
      case "results":       return <ScreenResults/>;
      case "reports":       return <ScreenReports/>;
      case "settings":      return <ScreenSettings/>;
      default:              return <ScreenDashboard onCreateEvent={() => setCreateMode(true)}/>;
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f6fa" }}>
      {/* Sidebar — white like HMS */}
      <aside className={`${collapsed?"w-16":"w-[220px]"} shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen z-30 bg-white border-r border-gray-100 shadow-sm`}>
        {/* Logo strip */}
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-gray-100 min-h-[64px]">
          <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0 text-white font-black text-xs shrink-0"
            style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})` }}>
            GMS
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-black text-gray-900 text-sm leading-none">GMS Portal</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Games Management System</div>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)} className="ml-auto text-gray-300 hover:text-gray-600 transition shrink-0">
            <ChevronRight className={`h-4 w-4 transition-transform ${collapsed?"":"rotate-180"}`}/>
          </button>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <button key={item.id}
              onClick={() => { setNav(item.id); setCreateMode(false); }}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all ${nav===item.id&&!createMode?"text-white shadow-sm":"text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
              style={nav===item.id&&!createMode?{background:`linear-gradient(135deg, ${PRIMARY}, #2d5986)`}:{}}>
              <item.icon className="h-4 w-4 shrink-0"/>
              {!collapsed && <span className="flex-1 text-left text-xs truncate">{item.label}</span>}
              {!collapsed && item.badge > 0 && (
                <span className={`h-5 min-w-5 px-1 rounded-full text-[10px] font-black grid place-items-center ${nav===item.id&&!createMode?"bg-white/20 text-white":"bg-orange-100 text-orange-600"}`}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Connectivity badge */}
        {!collapsed && (
          <div className="mx-2 mb-2 p-3 rounded-xl border border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              {online ? <Wifi className="h-3.5 w-3.5 text-emerald-500"/> : <WifiOff className="h-3.5 w-3.5 text-amber-500"/>}
              <span className={`text-[10px] font-bold ${online?"text-emerald-700":"text-amber-700"}`}>{online?"Live Sync Active":"Offline Mode"}</span>
            </div>
          </div>
        )}

        <div className="p-2 border-t border-gray-100">
          <button onClick={onBack} title={collapsed?"Back to Admin":undefined}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-xs text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition">
            <LogOut className="h-4 w-4 shrink-0"/>
            {!collapsed && <span>Back to Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
          <img src={mhSeal} alt="MH Seal" className="h-8 w-auto object-contain shrink-0"/>
          <div className="h-5 w-px bg-gray-200"/>
          {(nav !== "dashboard" || createMode) && (
            <button onClick={() => { setNav("dashboard"); setCreateMode(false); }}
              className="flex items-center gap-1.5 h-8 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition shrink-0">
              <ArrowLeft className="h-3.5 w-3.5"/> Back
            </button>
          )}
          <div className="text-sm text-gray-500">
            <span className="font-black text-gray-900 cursor-pointer hover:text-blue-600 transition" onClick={() => { setNav("dashboard"); setCreateMode(false); }}>GMS Portal</span>
            <ChevronRight className="inline h-3.5 w-3.5 mx-1 text-gray-300"/>
            <span className="font-semibold">{createMode ? "Create Event" : activeLabel}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
              {["EN","HI","MR"].map(l=>(
                <button key={l} className={`px-2 py-1 rounded text-[11px] font-bold transition ${l==="EN"?"bg-white shadow-sm":"text-gray-400"}`}>{l}</button>
              ))}
            </div>
            <button className="relative h-8 w-8 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-blue-400 transition">
              <Bell className="h-4 w-4"/>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[8px] font-black grid place-items-center">{totalBadge}</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full grid place-items-center text-white text-xs font-black shrink-0" style={{background:PRIMARY}}>AP</div>
              <div>
                <div className="text-xs font-bold text-gray-800 leading-none">A. Pawar</div>
                <div className="text-[10px] font-bold" style={{color:ACCENT}}>ADMIN</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}

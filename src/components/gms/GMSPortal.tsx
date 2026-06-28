import { useState, useEffect } from "react";
import {
  LayoutDashboard, Trophy, Calendar, Users, ShieldCheck,
  BarChart3, FileText, Settings, Bell, ChevronRight,
  LogOut, Plus, Eye, Edit3, Award, AlertCircle, CheckCircle, CheckCircle2,
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
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 80); return () => clearTimeout(t); }, []);
  const r = (size - 10) / 2, c = size / 2, circ = 2 * Math.PI * r;
  const dash = anim ? (pct / 100) * circ : 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="#f3f4f6" strokeWidth="7"/>
        <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ * 0.25} strokeLinecap="round"
          style={{transition:"stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)"}}/>
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
   SCREEN 1 — DASHBOARD
═══════════════════════════════════════ */
function ScreenDashboard({ onCreateEvent }: { onCreateEvent: () => void }) {
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  const filtered = EVENTS_DATA.filter(e => {
    const q = search.toLowerCase();
    return (statusFilter === "All" || e.status === statusFilter)
      && (q === "" || e.name.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q));
  });

  const live         = EVENTS_DATA.filter(e => e.status === "Live").length;
  const totalEntries = EVENTS_DATA.reduce((a, e) => a + e.entries, 0);
  const sports       = [...new Set(EVENTS_DATA.map(e => e.sport))].length;

  const statusCounts = {
    Live:      EVENTS_DATA.filter(e => e.status === "Live").length,
    Upcoming:  EVENTS_DATA.filter(e => e.status === "Upcoming").length,
    "Reg Open":EVENTS_DATA.filter(e => e.status === "Registration Open").length,
    Completed: EVENTS_DATA.filter(e => e.status === "Completed").length,
  };

  const SPORT_DIST = Object.entries(
    EVENTS_DATA.reduce((acc, e) => ({ ...acc, [e.sport]: (acc[e.sport] || 0) + e.entries }), {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]);
  const maxE = Math.max(...SPORT_DIST.map(([, v]) => v));

  const LIVE_SESSIONS = [
    { venue: "Shiv Chhatrapati Complex", sport: "Athletics", session: "Track Finals — Day 3", status: "On Time", color: "#3b82f6" },
    { venue: "Mahalaxmi Akhada",         sport: "Wrestling", session: "Semi-Finals",          status: "Delayed", color: "#f59e0b" },
    { venue: "Balewadi Aquatic Centre",  sport: "Swimming",  session: "Morning Heats",        status: "On Time", color: "#14b8a6" },
  ];

  const totalEvents = EVENTS_DATA.length;

  const KPIs = [
    { label: "Total Events",     value: String(totalEvents),          sub: `Across ${sports} sports`,   icon: Trophy,     accent: PRIMARY    },
    { label: "Live Right Now",   value: String(live),                 sub: "Active venues",             icon: Activity,   accent: "#059669"  },
    { label: "Total Entries",    value: totalEntries.toLocaleString(),sub: "All events combined",       icon: Users,      accent: "#7c3aed"  },
    { label: "Accreditations",   value: "1,840",                      sub: "Active passes issued",      icon: ShieldCheck,accent: "#0891b2"  },
  ];

  return (
    <div className="min-h-full relative" style={{ background: "linear-gradient(180deg,#F5F6FB 0%,#EEF1F8 100%)" }}>
      {/* background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full" style={{ background:"radial-gradient(circle,#363092 0%,transparent 70%)", opacity:0.08 }}/>
        <div className="absolute top-32 right-0 h-72 w-72 rounded-full" style={{ background:"radial-gradient(circle,#f97316 0%,transparent 70%)", opacity:0.07 }}/>
      </div>

      <div className="relative p-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[18px] font-semibold text-gray-900">Events Dashboard</h1>
            <p className="text-xs text-gray-400 mt-0.5">Directorate of Sports & Youth Services · Government of Maharashtra</p>
          </div>
        </div>

        {/* KPI row — CM dashboard card style */}
        <div className="grid grid-cols-4 gap-4">
          {KPIs.map(({ label, value, sub, icon: Icon, accent }, i) => (
            <div key={label} className="relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 px-4 py-3 shadow-[0_8px_30px_-12px_rgba(54,48,146,0.2)] overflow-hidden"
              style={{opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(14px)", transition:`opacity 0.45s ease, transform 0.45s ease`, transitionDelay:`${i*70}ms`}}>
              <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full opacity-10" style={{ background: accent }}/>
              <div className="flex items-start justify-between">
                <div className="text-[10px] uppercase tracking-wider font-bold text-gray-500">{label}</div>
                <div className="h-8 w-8 rounded-xl grid place-items-center text-white shadow-md shrink-0" style={{ background:`linear-gradient(135deg,${accent},${accent}cc)` }}>
                  <Icon className="h-3.5 w-3.5"/>
                </div>
              </div>
              <div className="mt-2 text-xl font-bold text-gray-900 tracking-tight">{value}</div>
              <div className="mt-0.5 text-[11px] font-medium" style={{ color: accent }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Secondary KPI row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { l:"Completed This Year",   v:"33",   s:"92% on schedule",   c:"#6b7280", i:CheckCircle2 },
            { l:"Pending Certifications",v:"22",   s:"Awaiting sign-off", c:"#ef4444", i:AlertCircle  },
            { l:"Open Protests",         v:"3",    s:"Require decision",  c:"#f59e0b", i:AlertCircle  },
            { l:"Districts Represented", v:"34",   s:"of 36 districts",   c:"#0891b2", i:MapPin       },
          ].map(({ l,v,s,c },i)=>(
            <div key={l} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4"
              style={{opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(12px)", transition:`opacity 0.4s ease, transform 0.4s ease`, transitionDelay:`${280+i*70}ms`}}>
              <div className="text-2xl font-black" style={{ color:c }}>{v}</div>
              <div className="text-xs font-semibold text-gray-800 mt-0.5">{l}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{s}</div>
            </div>
          ))}
        </div>

        {/* Row 1 — chart + Event Status (same height via items-stretch) */}
        <div className="flex gap-5 items-stretch">
          <div className="flex-1 min-w-0 relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_-12px_rgba(54,48,146,0.18)] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm">Sport-wise Entry Distribution</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{totalEntries.toLocaleString()} Total Entries</span>
            </div>
            <div className="space-y-2.5">
              {SPORT_DIST.map(([sport, count], si) => (
                <div key={sport} className="flex items-center gap-3">
                  <div className="w-20 text-xs font-semibold text-gray-600 text-right shrink-0">{sport}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div className="h-full rounded-full flex items-center pl-3 text-white text-[10px] font-bold"
                      style={{ width: loaded ? `${(count/maxE)*100}%` : "0%", background: SPORT_COLORS[sport] || PRIMARY, transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)", transitionDelay:`${550+si*60}ms` }}>
                      {loaded ? count : ""}
                    </div>
                  </div>
                  <div className="w-8 text-[10px] text-gray-400 text-right shrink-0">{Math.round((count/totalEntries)*100)}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Status Donut */}
          <div className="w-64 shrink-0 relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_-12px_rgba(54,48,146,0.18)] p-5 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Event Status</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{totalEvents} total events</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{live} Live</span>
            </div>
            <div className="flex items-center justify-center my-2">
              <DonutChart pct={Math.round((live/totalEvents)*100)} color="#059669" size={108}/>
            </div>
            <div className="mt-4 space-y-2.5">
              {([
                { label:"Live",      count:statusCounts.Live,        color:"#059669" },
                { label:"Upcoming",  count:statusCounts.Upcoming,    color:"#3b82f6" },
                { label:"Reg. Open", count:statusCounts["Reg Open"], color:"#f59e0b" },
                { label:"Completed", count:statusCounts.Completed,   color:"#9ca3af" },
              ] as {label:string;count:number;color:string}[]).map(({ label,count,color })=>{
                const pct = Math.round((count/totalEvents)*100);
                return (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ background:color }}/>
                        <span className="text-[11px] text-gray-600">{label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-gray-900">{count}</span>
                        <span className="text-[10px] text-gray-400 w-6 text-right">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-1 rounded-full transition-all duration-500" style={{ width:`${pct}%`, background:color }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2 — events table + right sidebar */}
        <div className="flex gap-5">

          {/* Events table */}
          <div className="flex-1 min-w-0">
            <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_-12px_rgba(54,48,146,0.18)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span className="font-bold text-gray-900 text-sm">All Events</span>
                <div className="flex gap-2">
                  <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
                    className="h-8 px-3 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white outline-none">
                    {["All","Live","Upcoming","Registration Open","Completed"].map(s=><option key={s}>{s}</option>)}
                  </select>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"/>
                    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
                      className="h-8 pl-8 pr-3 rounded-lg border border-gray-200 text-xs outline-none focus:border-[#1e3a5f] w-36"/>
                  </div>
                </div>
              </div>
              <div className="grid text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-2.5 border-b border-gray-50 bg-gray-50/60"
                style={{ gridTemplateColumns:"2.2fr 0.9fr 1fr 0.9fr 1.1fr" }}>
                {["Event","Sport","Dates","Status","Entries"].map(h=><span key={h}>{h}</span>)}
              </div>
              <div className="divide-y divide-gray-50">
                {filtered.map((e,i)=>(
                  <div key={i} className="grid items-center px-5 py-3 hover:bg-gray-50/60 transition"
                    style={{ gridTemplateColumns:"2.2fr 0.9fr 1fr 0.9fr 1.1fr" }}>
                    <div>
                      <div className="text-xs font-semibold text-gray-900 leading-snug truncate pr-2">{e.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1"><MapPin className="h-2.5 w-2.5"/>{e.venue}</div>
                    </div>
                    <div><span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:`${SPORT_COLORS[e.sport]}18`, color:SPORT_COLORS[e.sport] }}>{e.sport}</span></div>
                    <div className="text-[10px] text-gray-500">{e.dates}</div>
                    <div><StatusBadge status={e.status}/></div>
                    <div>
                      <div className="text-xs font-bold text-gray-800">{e.entries}/{e.capacity}</div>
                      <div className="mt-1 h-1.5 w-20 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-1.5 rounded-full" style={{ width:`${(e.entries/e.capacity)*100}%`, background:SPORT_COLORS[e.sport]||PRIMARY }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
    <div className="p-6 space-y-4">
      {/* Page header card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4">
        <button onClick={onBack}
          className="h-9 w-9 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-[#363092] hover:text-[#363092] transition shrink-0">
          <ArrowLeft className="h-4 w-4"/>
        </button>
        <div className="h-9 w-9 rounded-xl grid place-items-center text-white shrink-0 shadow-sm"
          style={{ background:"linear-gradient(135deg,#363092,#1e2a7a)" }}>
          <Plus className="h-4 w-4"/>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-[18px] font-semibold text-gray-900 leading-tight">Create New Event</h1>
        </div>
        <div className="text-[11px] font-bold px-3 py-1.5 rounded-full border shrink-0"
          style={{ color:PRIMARY, borderColor:`${PRIMARY}30`, background:`${PRIMARY}0a` }}>
          Step {step+1} of {n}
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-10 py-6">
        <div className="flex items-start">
          {WIZARD_STEPS.map((s, i) => {
            const done = i < step, cur = i === step, isLast = i === n - 1;
            return (
              <div key={s} className={`flex items-start ${!isLast ? "flex-1" : ""}`}>
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className={`h-9 w-9 rounded-full grid place-items-center text-sm font-bold border-2 transition-all duration-300 ${done?"text-white":cur?"bg-white":"bg-white border-gray-200 text-gray-400"}`}
                    style={done?{background:PRIMARY,borderColor:PRIMARY}:cur?{borderColor:PRIMARY,color:PRIMARY}:{}}>
                    {done ? <Check className="h-4 w-4"/> : i+1}
                  </div>
                  <span className={`text-[10px] font-semibold text-center leading-tight max-w-[72px] ${done?"text-gray-500":cur?"":"text-gray-400"}`}
                    style={cur?{color:PRIMARY,fontWeight:700}:{}}>
                    {s}
                  </span>
                </div>
                {!isLast && (
                  <div className="flex-1 h-0.5 mt-[18px] mx-3 rounded-full transition-all duration-500"
                    style={{ background: done ? PRIMARY : "#e5e7eb" }}/>
                )}
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

const MONTH_NAMES  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_SHORT  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function ScreenCalendar() {
  const now = new Date();
  const [viewYear,  setViewYear]  = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [view, setView]           = useState<"month"|"agenda">("month");
  const [selected, setSelected]   = useState<{name:string;sport:string}|null>(null);

  const TODAY_DAY   = now.getDate();
  const TODAY_MONTH = now.getMonth();
  const TODAY_YEAR  = now.getFullYear();
  const isCurrentMonth = viewYear === TODAY_YEAR && viewMonth === TODAY_MONTH;

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const blanks   = Array(firstDow).fill(null);
  const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const goToPrev = () => viewMonth === 0 ? (setViewMonth(11), setViewYear(y=>y-1)) : setViewMonth(m=>m-1);
  const goToNext = () => viewMonth === 11 ? (setViewMonth(0), setViewYear(y=>y+1)) : setViewMonth(m=>m+1);
  const goToToday = () => { setViewYear(TODAY_YEAR); setViewMonth(TODAY_MONTH); };

  const monthEventMap: Record<number,{name:string;sport:string}[]> = Object.fromEntries(MONTH_DAYS.map(d=>[d.day, d.events]));
  const upcomingEvents = MONTH_DAYS.filter(d=>d.events.length>0);
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();

  return (
    <div className="p-6 space-y-0 flex flex-col gap-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={goToPrev} className="h-8 w-8 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-[#363092] hover:text-[#363092] transition"><ChevronLeft className="h-4 w-4"/></button>
          <div>
            <span className="font-bold text-gray-900 text-base">{MONTH_NAMES[viewMonth]}</span>
            <span className="text-gray-400 text-base ml-1.5">{viewYear}</span>
          </div>
          <button onClick={goToNext} className="h-8 w-8 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-[#363092] hover:text-[#363092] transition"><ChevronRight className="h-4 w-4"/></button>
          <button onClick={goToToday} className="h-8 px-3 rounded-xl text-xs font-semibold text-white transition" style={{background:"linear-gradient(135deg,#363092,#1e2a7a)"}}>Today</button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            {Object.entries(SPORT_COLORS).slice(0,4).map(([sport, color])=>(
              <span key={sport} className="flex items-center gap-1"><span className="h-2 w-2 rounded-full inline-block" style={{background:color}}/>{sport}</span>
            ))}
          </div>
          <div className="h-5 w-px bg-gray-200"/>
          <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1">
            {(["month","agenda"] as const).map(v=>(
              <button key={v} onClick={()=>setView(v)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${view===v?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex gap-5 items-start">
        {/* Calendar / Agenda */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {view==="month" ? (
            <>
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/60">
                {DAYS.map((d,i)=>(
                  <div key={d} className={`text-center text-[11px] font-bold uppercase py-3 ${i===0||i===6?"text-gray-300":"text-gray-400"}`}>{d}</div>
                ))}
              </div>
              {/* Grid */}
              <div className="grid grid-cols-7">
                {blanks.map((_,i)=>(
                  <div key={`b${i}`} className="min-h-[104px] border-b border-r border-gray-50 bg-gray-50/30"/>
                ))}
                {Array.from({length: daysInMonth}, (_,idx)=>{
                  const day = idx + 1;
                  const col = (firstDow + idx) % 7;
                  const isToday = isCurrentMonth && day === TODAY_DAY;
                  const isWeekend = col === 0 || col === 6;
                  const events = monthEventMap[day] ?? [];
                  return (
                    <div key={day}
                      className={`min-h-[104px] border-b border-r border-gray-100 p-2 group transition-colors duration-150 ${isWeekend?"bg-gray-50/40":"hover:bg-indigo-50/30"}`}>
                      <div className="flex justify-end mb-1.5">
                        <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors
                          ${isToday?"text-white":"text-gray-500 group-hover:text-gray-800"}`}
                          style={isToday?{background:"linear-gradient(135deg,#363092,#1e2a7a)"}:{}}>
                          {day}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        {events.slice(0,2).map((e,i)=>(
                          <button key={i} onClick={()=>setSelected(e)}
                            className="w-full text-left pl-2 pr-1 py-0.5 rounded-md text-[9px] font-semibold truncate transition-all hover:opacity-90 hover:scale-[1.01] border-l-2"
                            style={{borderColor:SPORT_COLORS[e.sport], background:`${SPORT_COLORS[e.sport]}12`, color:SPORT_COLORS[e.sport]}}>
                            {e.name}
                          </button>
                        ))}
                        {events.length>2&&(
                          <span className="text-[9px] text-gray-400 pl-2">+{events.length-2} more</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Agenda view */
            <div className="divide-y divide-gray-50">
              {upcomingEvents.map(({day,events})=>(
                <div key={day} className="flex gap-0 hover:bg-gray-50/50 transition-colors">
                  {/* Date column */}
                  <div className="w-20 shrink-0 px-4 py-5 border-r border-gray-100 flex flex-col items-center justify-start pt-4">
                    <div className="text-2xl font-black text-gray-900 leading-none">{day}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{MONTH_SHORT[viewMonth]} '{String(viewYear).slice(2)}</div>
                    {isCurrentMonth && day===TODAY_DAY&&<span className="mt-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{background:"#363092"}}>Today</span>}
                  </div>
                  {/* Events */}
                  <div className="flex-1 px-4 py-3 space-y-2">
                    {events.map((e,i)=>(
                      <div key={i} onClick={()=>setSelected(e)}
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer group"
                        style={{borderLeft:`3px solid ${SPORT_COLORS[e.sport]}`}}>
                        <div className="h-8 w-8 rounded-lg grid place-items-center shrink-0 text-[10px] font-black"
                          style={{background:`${SPORT_COLORS[e.sport]}15`,color:SPORT_COLORS[e.sport]}}>
                          {e.sport.slice(0,2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-800 group-hover:text-[#363092] transition-colors">{e.name}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-2">
                            <span style={{color:SPORT_COLORS[e.sport]}}>{e.sport}</span>
                            <span>· Shiv Chhatrapati Sports Complex, Pune</span>
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

        {/* Sidebar */}
        <div className="w-64 shrink-0 space-y-4">
          {/* Event detail panel or upcoming summary */}
          {selected ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="font-bold text-gray-900 text-sm">Event Details</span>
                <button onClick={()=>setSelected(null)} className="h-6 w-6 rounded-lg bg-gray-100 grid place-items-center text-gray-500 hover:bg-gray-200 transition"><X className="h-3.5 w-3.5"/></button>
              </div>
              <div className="p-4">
                <div className="h-10 w-10 rounded-xl mb-3 grid place-items-center text-sm font-black"
                  style={{background:`${SPORT_COLORS[selected.sport]}18`,color:SPORT_COLORS[selected.sport]}}>
                  {selected.sport.slice(0,2).toUpperCase()}
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug">{selected.name}</h3>
                <div className="mt-1.5"><StatusBadge status="Live"/></div>
                <div className="mt-3 space-y-2 text-xs">
                  {[["Sport",selected.sport],["Dates",`18 ${MONTH_SHORT[viewMonth]} → 22 ${MONTH_SHORT[viewMonth]} ${viewYear}`],["Venue","Shiv Chhatrapati Complex"],["Entries","842 / 1000"]].map(([l,v])=>(
                    <div key={l} className="flex justify-between pb-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-gray-400">{l}</span>
                      <span className="font-semibold text-gray-700">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  {["View Full Details","Edit Event","Manage Entries"].map(btn=>(
                    <button key={btn} className="w-full h-8 rounded-xl border border-gray-200 text-[11px] font-semibold text-gray-600 hover:border-[#363092] hover:text-[#363092] transition">{btn}</button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-[#363092]"/>
                <span className="font-bold text-gray-900 text-sm">Upcoming Events</span>
                <span className="ml-auto text-[10px] font-bold text-[#363092] bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">{upcomingEvents.reduce((a,d)=>a+d.events.length,0)}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {upcomingEvents.slice(0,5).map(({day,events})=>(
                  <div key={day} className="px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer" onClick={()=>setSelected(events[0])}>
                    <div className="h-9 w-9 rounded-xl shrink-0 grid place-items-center font-bold text-xs"
                      style={{background:`${SPORT_COLORS[events[0].sport]}12`,color:SPORT_COLORS[events[0].sport]}}>
                      {day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-800 truncate">{events[0].name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{events[0].sport} · {MONTH_SHORT[viewMonth]} {viewYear}</div>
                      {events.length>1&&<div className="text-[10px] text-gray-400">+{events.length-1} more</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sport filter */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-gray-400"/>
              <span className="font-bold text-gray-900 text-sm">Sports Filter</span>
            </div>
            <div className="p-4 space-y-2">
              {Object.entries(SPORT_COLORS).slice(0,6).map(([sport,color])=>(
                <label key={sport} className="flex items-center gap-2.5 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="h-3.5 w-3.5 rounded accent-[#363092]"/>
                  <span className="h-2.5 w-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125" style={{background:color}}/>
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">{sport}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
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
          <h1 className="text-[18px] font-semibold text-gray-900">Entry Management</h1>
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

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            Show
            <select className="h-8 w-16 px-2 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-[#363092]">
              {[5,10,25].map(n=><option key={n}>{n}</option>)}
            </select>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
              className="h-8 w-44 pl-8 pr-3 rounded-lg border border-gray-200 text-xs outline-none focus:border-[#363092]"/>
          </div>
          <button className="ml-auto h-9 px-4 rounded-xl text-white text-xs font-bold flex items-center gap-2 hover:opacity-90 transition shadow-sm"
            style={{background:"linear-gradient(135deg,#363092,#1e2a7a)"}}>
            <Download className="h-3.5 w-3.5"/> Export
          </button>
        </div>

        {tab==="assoc" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="px-5 py-3 w-10"><input type="checkbox" className="h-4 w-4 rounded accent-[#363092]"/></th>
                  {["S.L","Association","District","Submitted","Confirmed","Pending","Rejected","Actions"].map(h=>(
                    <th key={h} className="text-left text-[11px] font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ASSOCS.map((a,i)=>(
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5"><input type="checkbox" className="h-4 w-4 rounded accent-[#363092]"/></td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-gray-500">{String(i+1).padStart(2,"0")}</td>
                    <td className="px-4 py-3.5">
                      <div className="text-xs font-semibold text-gray-900">{a.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Updated {a.updated}</div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500">{a.district}</td>
                    <td className="px-4 py-3.5 text-xs font-bold text-gray-800">{a.submitted}</td>
                    <td className="px-4 py-3.5"><span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-400 text-emerald-600">{a.confirmed}</span></td>
                    <td className="px-4 py-3.5"><span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-amber-400 text-amber-600">{a.pending}</span></td>
                    <td className="px-4 py-3.5"><span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-red-400 text-red-500">{a.rejected}</span></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button title="View" className="h-7 w-7 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center hover:bg-emerald-100 transition"><Eye className="h-3.5 w-3.5"/></button>
                        <button title="Edit" className="h-7 w-7 rounded-full bg-blue-50 text-blue-500 grid place-items-center hover:bg-blue-100 transition"><Edit3 className="h-3.5 w-3.5"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="px-5 py-3 w-10"><input type="checkbox" className="h-4 w-4 rounded accent-[#363092]"/></th>
                  {["S.L","Athlete","Reg ID","Sport","Entry Status","Medical","Accred.","Actions"].map(h=>(
                    <th key={h} className="text-left text-[11px] font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ATHLETES.filter(a=>!search||a.name.toLowerCase().includes(search.toLowerCase())||a.id.toLowerCase().includes(search.toLowerCase())).map((a,i)=>(
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5"><input type="checkbox" className="h-4 w-4 rounded accent-[#363092]"/></td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-gray-500">{String(i+1).padStart(2,"0")}</td>
                    <td className="px-4 py-3.5">
                      <div className="text-xs font-semibold text-gray-900">{a.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{a.assoc}</div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-gray-500 text-[10px]">{a.id}</td>
                    <td className="px-4 py-3.5"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{background:`${SPORT_COLORS[a.sport]}15`,color:SPORT_COLORS[a.sport]}}>{a.sport}</span></td>
                    <td className="px-4 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${a.entry==="Confirmed"?"border-emerald-400 text-emerald-600":a.entry==="Ineligible"?"border-red-400 text-red-500":a.entry==="Withdrawn"?"border-gray-300 text-gray-500":"border-amber-400 text-amber-600"}`}>{a.entry}</span></td>
                    <td className="px-4 py-3.5"><span className={`text-[10px] font-bold ${a.medical==="Cleared"?"text-emerald-600":"text-amber-600"}`}>{a.medical}</span></td>
                    <td className="px-4 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${a.accred==="Issued"?"border-emerald-400 text-emerald-600":a.accred==="Blocked"?"border-red-400 text-red-500":a.accred==="Revoked"?"border-gray-300 text-gray-500":"border-amber-400 text-amber-600"}`}>{a.accred}</span></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button title="Approve" className="h-7 w-7 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center hover:bg-emerald-100 transition"><Check className="h-3.5 w-3.5"/></button>
                        <button title="Reject" className="h-7 w-7 rounded-full bg-red-50 text-red-500 grid place-items-center hover:bg-red-100 transition"><X className="h-3.5 w-3.5"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Showing {tab==="assoc"?ASSOCS.length:ATHLETES.length} entries</span>
          <div className="flex items-center gap-1">
            {["‹‹","‹","1","2","›","››"].map(p=>(
              <button key={p} className={`h-7 min-w-7 px-2 rounded text-xs font-bold transition ${p==="1"?"text-white":"text-gray-500 hover:bg-gray-100"}`}
                style={p==="1"?{background:"#363092"}:{}}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 5 — ACCREDITATION
═══════════════════════════════════════ */
function ScreenAccreditation() {
  const [tab, setTab]       = useState<"athlete"|"official"|"media"|"coach">("athlete");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const PASSES = [
    { name:"Ajay Shelar",      id:"ACC-ATH-001", category:"Athlete",  event:"Athletics Championship",  status:"Issued",   zone:"Field of Play", valid:"31 Dec 2027", photo:true  },
    { name:"Priya Nimkar",     id:"ACC-ATH-002", category:"Athlete",  event:"Athletics Championship",  status:"Pending",  zone:"Field of Play", valid:"—",           photo:false },
    { name:"Rahul Khedkar",    id:"ACC-WRS-003", category:"Athlete",  event:"Wrestling Championship",  status:"Issued",   zone:"Field of Play", valid:"31 Dec 2027", photo:true  },
    { name:"Sneha Patankar",   id:"ACC-SWM-004", category:"Athlete",  event:"Swimming Championship",   status:"Blocked",  zone:"—",             valid:"—",           photo:false },
    { name:"Rohan Deshmukh",   id:"ACC-KBD-005", category:"Athlete",  event:"Kabaddi Championship",    status:"Revoked",  zone:"—",             valid:"—",           photo:true  },
    { name:"Dr. Suresh Patil", id:"ACC-OFF-001", category:"Official", event:"Athletics Championship",  status:"Issued",   zone:"Technical Area", valid:"31 Dec 2027", photo:true  },
    { name:"Anita Kulkarni",   id:"ACC-OFF-002", category:"Official", event:"Wrestling Championship",  status:"Pending",  zone:"Technical Area", valid:"—",           photo:false },
    { name:"Raj Mehta",        id:"ACC-MED-001", category:"Media",    event:"Multi-Sport Games",       status:"Issued",   zone:"Media Tribune",  valid:"31 Dec 2027", photo:true  },
    { name:"Neha Joshi",       id:"ACC-MED-002", category:"Media",    event:"Multi-Sport Games",       status:"Pending",  zone:"Media Tribune",  valid:"—",           photo:false },
    { name:"Coach Vikram",     id:"ACC-COA-001", category:"Coach",    event:"Athletics Championship",  status:"Issued",   zone:"Bench Area",     valid:"31 Dec 2027", photo:true  },
  ];

  const tabCat: Record<string,string> = { athlete:"Athlete", official:"Official", media:"Media", coach:"Coach" };
  const filtered = PASSES
    .filter(p => p.category === tabCat[tab])
    .filter(p => statusFilter === "All" || p.status === statusFilter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));

  const counts = { total: PASSES.length, issued: PASSES.filter(p=>p.status==="Issued").length, pending: PASSES.filter(p=>p.status==="Pending").length, blocked: PASSES.filter(p=>p.status==="Blocked"||p.status==="Revoked").length };

  const statusStyle = (s: string) => {
    if (s === "Issued")  return "border-emerald-200 text-emerald-700 bg-emerald-50";
    if (s === "Pending") return "border-amber-200 text-amber-700 bg-amber-50";
    if (s === "Blocked") return "border-red-200 text-red-600 bg-red-50";
    if (s === "Revoked") return "border-gray-300 text-gray-500 bg-gray-50";
    return "border-gray-200 text-gray-500 bg-gray-50";
  };

  const TABS = [
    { id:"athlete",  label:"Athletes"  },
    { id:"official", label:"Officials" },
    { id:"media",    label:"Media"     },
    { id:"coach",    label:"Coaches"   },
  ] as const;

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-semibold text-gray-900">Accreditation</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage passes for athletes, officials, media & coaches</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition"><Download className="h-3.5 w-3.5"/> Export</button>
          <button className="h-9 px-4 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition shadow-sm" style={{ background:"linear-gradient(135deg,#363092,#1e2a7a)" }}><ShieldCheck className="h-3.5 w-3.5"/> Issue Pass</button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { l:"Total Passes",    v:String(counts.total),   s:"All categories",     c:"#363092" },
          { l:"Issued",          v:String(counts.issued),  s:"Active accreditations", c:"#059669" },
          { l:"Pending Review",  v:String(counts.pending), s:"Awaiting approval",  c:"#f59e0b" },
          { l:"Blocked/Revoked", v:String(counts.blocked), s:"Access denied",      c:"#ef4444" },
        ].map(({ l,v,s,c })=>(
          <div key={l} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="text-2xl font-black" style={{ color:c }}>{v}</div>
            <div className="text-xs font-semibold text-gray-800 mt-0.5">{l}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s}</div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-100">
          {/* Tabs */}
          <div className="flex gap-1">
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${tab===t.id?"text-white shadow-sm":"text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                style={tab===t.id?{background:"linear-gradient(135deg,#363092,#1e2a7a)"}:{}}>
                {t.label}
              </button>
            ))}
          </div>
          {/* Filters */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              Show <select className="h-8 w-16 px-2 rounded-lg border border-gray-200 text-xs bg-white outline-none">{[5,10,25].map(n=><option key={n}>{n}</option>)}</select>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or ID…"
                className="h-8 pl-8 pr-3 rounded-lg border border-gray-200 text-xs outline-none focus:border-[#363092] w-44"/>
            </div>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
              className="h-8 px-3 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white outline-none">
              {["All","Issued","Pending","Blocked","Revoked"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-5 py-3 w-10"><input type="checkbox" className="h-4 w-4 rounded accent-[#363092]"/></th>
                {["S.L","Pass ID","Name","Event","Zone","Status","Valid Until","Actions"].map(h=>(
                  <th key={h} className="text-left text-[11px] font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-sm text-gray-400">No records found</td></tr>
              ) : filtered.map((p,i)=>(
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5"><input type="checkbox" className="h-4 w-4 rounded accent-[#363092]"/></td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-gray-500">{String(i+1).padStart(2,"0")}</td>
                  <td className="px-4 py-3.5 font-mono text-[10px] text-gray-500">{p.id}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full grid place-items-center text-white text-[9px] font-black shrink-0"
                        style={{background:"linear-gradient(135deg,#363092,#1e2a7a)"}}>
                        {p.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-gray-900 truncate">{p.name}</div>
                        <div className={`text-[9px] font-bold ${p.photo?"text-emerald-600":"text-amber-600"}`}>{p.photo?"Photo ✓":"No Photo"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 max-w-[160px] truncate">{p.event}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{p.zone}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusStyle(p.status)}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{p.valid}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {p.status === "Issued" && <button title="Print" className="h-7 w-7 rounded-full bg-blue-50 text-blue-500 grid place-items-center hover:bg-blue-100 transition"><Eye className="h-3.5 w-3.5"/></button>}
                      {p.status === "Pending" && <button title="Approve" className="h-7 w-7 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center hover:bg-emerald-100 transition"><Check className="h-3.5 w-3.5"/></button>}
                      {p.status === "Issued" && <button title="Revoke" className="h-7 w-7 rounded-full bg-red-50 text-red-500 grid place-items-center hover:bg-red-100 transition"><X className="h-3.5 w-3.5"/></button>}
                      {(p.status === "Blocked" || p.status === "Revoked") && <button title="Edit" className="h-7 w-7 rounded-full bg-gray-50 text-gray-500 grid place-items-center hover:bg-gray-100 transition"><Edit3 className="h-3.5 w-3.5"/></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Showing {filtered.length} of {PASSES.filter(p=>p.category===tabCat[tab]).length} entries</span>
          <div className="flex items-center gap-1">
            {["‹‹","‹","1","2","›","››"].map(p=>(
              <button key={p} className={`h-7 min-w-7 px-2 rounded text-xs font-bold transition ${p==="1"?"text-white":"text-gray-500 hover:bg-gray-100"}`}
                style={p==="1"?{background:"#363092"}:{}}>{p}</button>
            ))}
          </div>
        </div>
      </div>
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
          <h1 className="text-[18px] font-semibold text-gray-900">Results Centre</h1>
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

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-600">Show <select className="h-8 w-16 px-2 rounded-lg border border-gray-200 text-xs bg-white outline-none">{[5,10,25].map(n=><option key={n}>{n}</option>)}</select></div>
          <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"/><input placeholder="Search…" className="h-8 w-44 pl-8 pr-3 rounded-lg border border-gray-200 text-xs outline-none focus:border-[#363092]"/></div>
          <button className="ml-auto h-9 px-4 rounded-xl text-white text-xs font-bold flex items-center gap-2 hover:opacity-90 transition shadow-sm" style={{background:"linear-gradient(135deg,#363092,#1e2a7a)"}}><Download className="h-3.5 w-3.5"/> Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-5 py-3 w-10"><input type="checkbox" className="h-4 w-4 rounded accent-[#363092]"/></th>
                {["S.L","Sport","Category","Round","Result Summary","Protest Window","Status","Actions"].map(h=>(
                  <th key={h} className="text-left text-[11px] font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r,i)=>(
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5"><input type="checkbox" className="h-4 w-4 rounded accent-[#363092]"/></td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-gray-500">{String(i+1).padStart(2,"0")}</td>
                  <td className="px-4 py-3.5"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{background:`${SPORT_COLORS[r.sport]}15`,color:SPORT_COLORS[r.sport]}}>{r.sport}</span></td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-gray-800">{r.cat}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{r.round}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-gray-700">{r.summary}</td>
                  <td className="px-4 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${r.window.includes("min")?"border-amber-400 text-amber-600":r.window==="Expired"?"border-red-400 text-red-500":"border-gray-300 text-gray-400"}`}>{r.window}</span></td>
                  <td className="px-4 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${r.status==="Certified"?"border-emerald-400 text-emerald-600":r.status==="Under Protest"?"border-red-400 text-red-500":"border-amber-400 text-amber-600"}`}>{r.status}</span></td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button title="Review" className="h-7 w-7 rounded-full bg-blue-50 text-blue-500 grid place-items-center hover:bg-blue-100 transition"><Eye className="h-3.5 w-3.5"/></button>
                      {r.status==="Pending Certification"&&<button title="Certify" className="h-7 w-7 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center hover:bg-emerald-100 transition"><Check className="h-3.5 w-3.5"/></button>}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length===0&&<tr><td colSpan={9} className="px-5 py-10 text-center text-sm text-gray-400">No results in this category.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Showing {filtered.length} entries</span>
          <div className="flex items-center gap-1">
            {["‹‹","‹","1","›","››"].map(p=>(
              <button key={p} className={`h-7 min-w-7 px-2 rounded text-xs font-bold transition ${p==="1"?"text-white":"text-gray-500 hover:bg-gray-100"}`} style={p==="1"?{background:"#363092"}:{}}>{p}</button>
            ))}
          </div>
        </div>
      </div>
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

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-600">Show <select className="h-8 w-16 px-2 rounded-lg border border-gray-200 text-xs bg-white outline-none">{[5,10,25].map(n=><option key={n}>{n}</option>)}</select></div>
            <div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"/><input placeholder="Search…" className="h-8 w-44 pl-8 pr-3 rounded-lg border border-gray-200 text-xs outline-none focus:border-[#363092]"/></div>
            <button className="ml-auto h-9 px-4 rounded-xl text-white text-xs font-bold flex items-center gap-2 hover:opacity-90 transition shadow-sm" style={{background:"linear-gradient(135deg,#363092,#1e2a7a)"}}><Download className="h-3.5 w-3.5"/> Export</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="px-5 py-3 w-10"><input type="checkbox" className="h-4 w-4 rounded accent-[#363092]"/></th>
                  {["S.L","Sport","Total Entries","Confirmed","Pending","Districts","Completion","Actions"].map(h=>(
                    <th key={h} className="text-left text-[11px] font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {BAR_DATA.map((d,i)=>(
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5"><input type="checkbox" className="h-4 w-4 rounded accent-[#363092]"/></td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-gray-500">{String(i+1).padStart(2,"0")}</td>
                    <td className="px-4 py-3.5"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{background:`${SPORT_COLORS[d.label]}15`,color:SPORT_COLORS[d.label]}}>{d.label}</span></td>
                    <td className="px-4 py-3.5 text-xs font-bold text-gray-800">{d.val}</td>
                    <td className="px-4 py-3.5"><span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-400 text-emerald-600">{Math.round(d.val*0.92)}</span></td>
                    <td className="px-4 py-3.5"><span className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-amber-400 text-amber-600">{Math.round(d.val*0.08)}</span></td>
                    <td className="px-4 py-3.5 text-xs text-gray-600">{20+i*2}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 w-32">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="h-1.5 rounded-full transition-all duration-700" style={{width:"92%",background:SPORT_COLORS[d.label]}}/>
                        </div>
                        <span className="text-[11px] font-bold text-gray-600 shrink-0">92%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button title="View" className="h-7 w-7 rounded-full bg-blue-50 text-blue-500 grid place-items-center hover:bg-blue-100 transition"><Eye className="h-3.5 w-3.5"/></button>
                        <button title="Download" className="h-7 w-7 rounded-full bg-gray-50 text-gray-500 grid place-items-center hover:bg-gray-100 transition"><Download className="h-3.5 w-3.5"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Showing {BAR_DATA.length} of {BAR_DATA.length} entries</span>
            <div className="flex items-center gap-1">
              {["‹‹","‹","1","›","››"].map(p=>(
                <button key={p} className={`h-7 min-w-7 px-2 rounded text-xs font-bold transition ${p==="1"?"text-white":"text-gray-500 hover:bg-gray-100"}`} style={p==="1"?{background:"#363092"}:{}}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 7 — SETTINGS
═══════════════════════════════════════ */
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full transition-colors duration-200 shrink-0 ${on ? "" : "bg-gray-200"}`}
      style={on ? { background: "linear-gradient(135deg,#363092,#1e2a7a)" } : {}}>
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? "translate-x-5" : ""}`}/>
    </button>
  );
}

function ScreenSettings() {
  const [notifs, setNotifs] = useState({ email: true, sms: true, whatsapp: true, push: false });
  const [cert, setCert]     = useState({ autoCertify: true, dualScorer: true });

  return (
    <div className="p-6 space-y-6 max-w-3xl">

      {/* Page header */}
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-2xl grid place-items-center text-white shadow-md shrink-0"
          style={{ background: "linear-gradient(135deg,#363092,#1e2a7a)" }}>
          <Settings className="h-5 w-5"/>
        </div>
        <div>
          <h1 className="text-[18px] font-semibold text-gray-900 leading-tight">Portal Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage your GMS configuration, notifications, and certification rules.</p>
        </div>
      </div>

      {/* Section 1 — General */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl grid place-items-center" style={{ background: "#363092" + "12" }}>
            <LayoutDashboard className="h-4 w-4" style={{ color: "#363092" }}/>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">General Configuration</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Basic identity and session settings for the portal.</p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Portal Name</label>
            <input defaultValue="GMS — Maharashtra Sports" className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm transition"/>
            <p className="text-[11px] text-gray-400 mt-1.5">Displayed in headers, reports, and official documents.</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Default Language</label>
              <select className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm bg-white transition">
                <option>English</option><option>Marathi</option><option>Hindi</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Timezone</label>
              <select className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm bg-white transition">
                <option>IST (UTC+5:30)</option>
              </select>
            </div>
          </div>
          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Auto Logout (minutes)</label>
            <input type="number" defaultValue={30} className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm transition"/>
            <p className="text-[11px] text-gray-400 mt-1.5">Minutes of inactivity before automatic sign-out.</p>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <button className="h-9 px-6 rounded-xl text-white text-xs font-bold hover:opacity-90 transition shadow-sm"
            style={{ background: "linear-gradient(135deg,#363092,#1e2a7a)" }}>Save Changes</button>
        </div>
      </div>

      {/* Section 2 — Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl grid place-items-center" style={{ background: "#0891b2" + "12" }}>
            <Bell className="h-4 w-4 text-cyan-600"/>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Notification Preferences</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Choose how the portal delivers alerts and updates.</p>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {([
            { key:"email",    icon:Send,     label:"Email Alerts",        desc:"Send event updates and entry confirmations via email." },
            { key:"sms",      icon:Zap,      label:"SMS Alerts",          desc:"Deliver time-sensitive alerts to registered phone numbers." },
            { key:"whatsapp", icon:Activity, label:"WhatsApp Alerts",     desc:"Send messages to athlete and official WhatsApp numbers." },
            { key:"push",     icon:Bell,     label:"Push Notifications",  desc:"Browser push notifications for admin dashboard users." },
          ] as { key: keyof typeof notifs; icon: typeof Bell; label: string; desc: string }[]).map(({ key, icon: Icon, label, desc }) => (
            <div key={key} className="flex items-center gap-4 px-6 py-4">
              <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0 bg-gray-50">
                <Icon className="h-4 w-4 text-gray-500"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800">{label}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{desc}</div>
              </div>
              <Toggle on={notifs[key]} onChange={v => setNotifs(n => ({ ...n, [key]: v }))}/>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <button className="h-9 px-6 rounded-xl text-white text-xs font-bold hover:opacity-90 transition shadow-sm"
            style={{ background: "linear-gradient(135deg,#363092,#1e2a7a)" }}>Save Changes</button>
        </div>
      </div>

      {/* Section 3 — Result Certification */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl grid place-items-center" style={{ background: "#059669" + "12" }}>
            <ShieldCheck className="h-4 w-4 text-emerald-600"/>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Result Certification</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Configure protest windows and dual sign-off requirements.</p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Protest Window (minutes)</label>
            <input type="number" defaultValue={30} className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm transition"/>
            <p className="text-[11px] text-gray-400 mt-1.5">Time window after result entry during which protests can be filed.</p>
          </div>
          <div className="space-y-0 divide-y divide-gray-50 rounded-xl border border-gray-100 overflow-hidden">
            {([
              { key:"autoCertify", label:"Auto-certify after window", desc:"Automatically mark results as certified once the protest window expires." },
              { key:"dualScorer",  label:"Require dual scorer sign-off", desc:"Two officials must independently validate each result before entry." },
            ] as { key: keyof typeof cert; label: string; desc: string }[]).map(({ key, label, desc }) => (
              <div key={key} className="flex items-center gap-4 px-4 py-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800">{label}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{desc}</div>
                </div>
                <Toggle on={cert[key]} onChange={v => setCert(c => ({ ...c, [key]: v }))}/>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <button className="h-9 px-6 rounded-xl text-white text-xs font-bold hover:opacity-90 transition shadow-sm"
            style={{ background: "linear-gradient(135deg,#363092,#1e2a7a)" }}>Save Changes</button>
        </div>
      </div>

      {/* Section 4 — Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-red-100 flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl grid place-items-center bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-500"/>
          </div>
          <div>
            <h3 className="font-bold text-red-600 text-sm">Danger Zone</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">These actions are irreversible. Proceed with caution.</p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-3">
          {[
            { label:"Archive All Events",   desc:"Move all completed events to archived state. Entries and results are preserved." },
            { label:"Reset Portal Data",    desc:"Delete all draft events and clear temporary data. This cannot be undone." },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-red-100 bg-red-50/30">
              <div>
                <div className="text-sm font-semibold text-gray-800">{label}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{desc}</div>
              </div>
              <button className="h-9 px-4 rounded-xl border border-red-300 text-red-600 text-xs font-bold hover:bg-red-50 transition shrink-0">{label.split(" ")[0]}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   GMS PORTAL SHELL
═══════════════════════════════════════ */
/* ═══════════════════════════════════════
   SCREEN — EVENTS
═══════════════════════════════════════ */
function ScreenEvents({ onCreateEvent }: { onCreateEvent: () => void }) {
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [perPage, setPerPage]           = useState(10);
  const [page, setPage]                 = useState(1);
  const [checked, setChecked]           = useState<number[]>([]);

  const filtered = EVENTS_DATA.filter(e =>
    (statusFilter === "All" || e.status === statusFilter) &&
    (search === "" || e.name.toLowerCase().includes(search.toLowerCase()) || e.sport.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged      = filtered.slice((page - 1) * perPage, page * perPage);
  const allChecked = paged.length > 0 && paged.every((_, i) => checked.includes((page - 1) * perPage + i));

  const toggleAll  = () => setChecked(allChecked ? [] : paged.map((_, i) => (page - 1) * perPage + i));
  const toggleOne  = (idx: number) => setChecked(c => c.includes(idx) ? c.filter(x => x !== idx) : [...c, idx]);

  const statusStyle: Record<string, string> = {
    "Live":              "border border-emerald-500 text-emerald-600",
    "Upcoming":          "border border-blue-500 text-blue-600",
    "Registration Open": "border border-amber-500 text-amber-600",
    "Completed":         "border border-gray-400 text-gray-500",
    "Cancelled":         "border border-red-400 text-red-500",
  };

  return (
    <div className="p-6 space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-semibold text-gray-900">Events</h1>
        <div className="text-xs text-gray-400">
          Dashboard
          <span className="mx-1.5 text-gray-300">&rsaquo;</span>
          <span className="text-gray-600 font-semibold">Events</span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-gray-100">
          {/* Show N */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Show</span>
            <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
              className="h-8 w-16 px-2 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-[#363092]">
              {[5,10,25,50].map(n => <option key={n}>{n}</option>)}
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"/>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search"
              className="h-8 w-44 pl-8 pr-3 rounded-lg border border-gray-200 text-xs outline-none focus:border-[#363092]"/>
          </div>

          {/* Status filter */}
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="h-8 px-3 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white outline-none focus:border-[#363092]">
            <option value="All">All Status</option>
            {["Live","Upcoming","Registration Open","Completed","Cancelled"].map(s => <option key={s}>{s}</option>)}
          </select>

          {/* Create button */}
          <button onClick={onCreateEvent}
            className="ml-auto h-9 px-4 rounded-xl text-white text-xs font-bold flex items-center gap-2 hover:opacity-90 transition shadow-sm"
            style={{ background:"linear-gradient(135deg,#363092,#1e2a7a)" }}>
            <Plus className="h-3.5 w-3.5"/> Create Event
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-5 py-3 w-10">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll}
                    className="h-4 w-4 rounded accent-[#363092] cursor-pointer"/>
                </th>
                {["S.L","Create Date","Event Name","Description","Status","Action"].map(h => (
                  <th key={h} className="text-left text-[11px] font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paged.map((e, i) => {
                const absIdx = (page - 1) * perPage + i;
                const isChecked = checked.includes(absIdx);
                return (
                  <tr key={i} className={`hover:bg-gray-50 transition-colors ${isChecked ? "bg-[#363092]/4" : ""}`}>
                    {/* Checkbox */}
                    <td className="px-5 py-3.5">
                      <input type="checkbox" checked={isChecked} onChange={() => toggleOne(absIdx)}
                        className="h-4 w-4 rounded accent-[#363092] cursor-pointer"/>
                    </td>
                    {/* S.L */}
                    <td className="px-4 py-3.5 text-sm font-semibold text-gray-600 whitespace-nowrap">
                      {String(absIdx + 1).padStart(2, "0")}
                    </td>
                    {/* Date */}
                    <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                      {e.dates.split("→")[0].trim()}
                    </td>
                    {/* Event Name */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-gray-900 text-sm leading-snug max-w-[220px] truncate">{e.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">GMS-EVT-2027-{String(absIdx + 1).padStart(3,"0")}</div>
                    </td>
                    {/* Description */}
                    <td className="px-4 py-3.5 text-sm text-gray-500 max-w-[240px]">
                      <div className="truncate">{e.sport} · {e.venue}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{e.entries}/{e.capacity} entries · {e.district}</div>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${statusStyle[e.status] || "border border-gray-300 text-gray-500"}`}>
                        {e.status === "Live" && <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse mr-1 -mb-px"/>}
                        {e.status}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button title="Edit" className="h-7 w-7 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center hover:bg-emerald-100 transition">
                          <Edit3 className="h-3.5 w-3.5"/>
                        </button>
                        <button title="Delete" className="h-7 w-7 rounded-full bg-red-50 text-red-500 grid place-items-center hover:bg-red-100 transition">
                          <X className="h-3.5 w-3.5"/>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paged.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-sm text-gray-400">No events found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: count + pagination */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} entries
          </span>
          <div className="flex items-center gap-1">
            {/* First / Prev */}
            <button onClick={() => setPage(1)} disabled={page === 1}
              className="h-7 w-7 rounded text-xs font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center transition">‹‹</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="h-7 w-7 rounded text-xs font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center transition">‹</button>
            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className={`h-7 w-7 rounded text-xs font-bold transition ${page === n ? "text-white" : "text-gray-500 hover:bg-gray-100"}`}
                style={page === n ? { background:"#363092" } : {}}>
                {n}
              </button>
            ))}
            {/* Next / Last */}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="h-7 w-7 rounded text-xs font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center transition">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
              className="h-7 w-7 rounded text-xs font-bold text-gray-500 hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center transition">››</button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      case "events":        return <ScreenEvents onCreateEvent={() => setCreateMode(true)}/>;
      case "schedule":      return <ScreenCalendar/>;
      case "participation":  return <ScreenParticipation/>;
      case "accreditation": return <ScreenAccreditation/>;
      case "results":       return <ScreenResults/>;
      case "reports":       return <ScreenReports/>;
      case "settings":      return <ScreenSettings/>;
      default:              return <ScreenDashboard onCreateEvent={() => setCreateMode(true)}/>;
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f6fa", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar — white like HMS */}
      <aside className={`${collapsed?"w-16":"w-[220px]"} shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen z-30 bg-white border-r border-gray-100 shadow-sm`}>
        {/* Logo strip */}
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-gray-100 min-h-[64px]">
          <img src={mhSeal} alt="Maharashtra Seal" className="h-10 w-10 object-contain shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-black text-gray-900 text-[11px] leading-tight">Game Management System</div>
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
              style={nav===item.id&&!createMode?{background:"linear-gradient(135deg,#363092,#1e2a7a)"}:{}}>
              <item.icon className="h-4 w-4 shrink-0"/>
              {!collapsed && <span className="flex-1 text-left text-xs truncate">{item.label}</span>}
              {!collapsed && item.badge > 0 && (
                <span className={`h-5 min-w-5 px-1 rounded-full text-[10px] font-black grid place-items-center ${nav===item.id&&!createMode?"bg-white/20 text-white":"bg-orange-100 text-orange-600"}`}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-100">
          <button onClick={onBack} title={collapsed?"Back to Admin":undefined}
            className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition group">
            <ArrowLeft className="h-4 w-4 shrink-0 group-hover:-translate-x-0.5 transition-transform"/>
            {!collapsed && <span>Back to Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
          {(nav !== "dashboard" || createMode) && (
            <button onClick={() => { setNav("dashboard"); setCreateMode(false); }}
              className="flex items-center gap-1.5 h-8 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition shrink-0">
              <ArrowLeft className="h-3.5 w-3.5"/> Back
            </button>
          )}
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

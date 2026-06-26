import { useState } from "react";
import {
  LayoutDashboard, Trophy, Calendar, Users, ShieldCheck,
  BarChart3, BookOpen, Settings, Bell, ChevronRight, ChevronLeft,
  LogOut, Plus, Eye, Edit3, Award, AlertCircle, CheckCircle,
  Clock, MapPin, Filter, Search, Download, Upload, RefreshCw,
  Lock, Zap, Target, Activity, FileText, Printer, Send,
  TrendingUp, X, Check, ArrowRight, ArrowLeft, Star,
  Radio, Wifi, WifiOff, Monitor, Flag, Play, Pause,
} from "lucide-react";
import mhSeal from "@/assets/mh-seal.png";

/* ═══════════════════════════════════════════════════════════════════
   SHARED COMPONENT LIBRARY
═══════════════════════════════════════════════════════════════════ */

type StatusType = "Live" | "Upcoming" | "Registration Open" | "Completed" | "Cancelled";

function StatusBadge({ status }: { status: StatusType | string }) {
  const map: Record<string, string> = {
    "Live":              "bg-green-100 text-green-700 border border-green-200",
    "Upcoming":          "bg-blue-100 text-blue-700 border border-blue-200",
    "Registration Open": "bg-amber-100 text-amber-700 border border-amber-200",
    "Completed":         "bg-gray-100 text-gray-600 border border-gray-200",
    "Cancelled":         "bg-red-100 text-red-700 border border-red-200",
    "Confirmed":         "bg-green-100 text-green-700 border border-green-200",
    "Pending":           "bg-amber-100 text-amber-700 border border-amber-200",
    "Rejected":          "bg-red-100 text-red-700 border border-red-200",
    "Withdrawn":         "bg-gray-100 text-gray-500 border border-gray-200",
    "Upheld":            "bg-red-100 text-red-700 border border-red-200",
    "Dismissed":         "bg-gray-100 text-gray-500 border border-gray-200",
    "Under Review":      "bg-amber-100 text-amber-700 border border-amber-200",
    "Certified":         "bg-green-100 text-green-700 border border-green-200",
    "Under Protest":     "bg-red-100 text-red-700 border border-red-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status === "Live" && <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />}
      {status}
    </span>
  );
}

function MetricCard({ label, value, sub, color = "#363092", icon: Icon }: {
  label: string; value: string | number; sub?: string; color?: string; icon?: React.ElementType;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm" style={{ borderLeftWidth: 3, borderLeftColor: color }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-gray-300" />}
      </div>
      <div className="text-3xl font-black" style={{ color }}>{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

const SPORT_COLORS: Record<string, string> = {
  Athletics: "#3b82f6", Football: "#22c55e", Wrestling: "#f59e0b",
  Swimming: "#14b8a6", Boxing: "#ef4444", Badminton: "#a855f7",
  Kabaddi: "#f97316", Archery: "#06b6d4", Cricket: "#84cc16", "Kho-Kho": "#ec4899",
};

const EVENTS_DATA = [
  { name: "Maharashtra State Athletics Championship 2027", sport: "Athletics", dates: "18 Jul → 22 Jul", venue: "Shiv Chhatrapati Complex, Pune",  status: "Live",              entries: "842/1000", district: "Pune"        },
  { name: "39th National Games — Wrestling Trials",         sport: "Wrestling", dates: "19 Jul → 21 Jul", venue: "Mahalaxmi Akhada, Kolhapur",    status: "Live",              entries: "312/400",  district: "Kolhapur"    },
  { name: "Inter-District Football Cup 2027",               sport: "Football",  dates: "02 Aug → 14 Aug", venue: "Cooperage Ground, Mumbai",       status: "Registration Open", entries: "28/36",    district: "Mumbai City" },
  { name: "Maharashtra Open Badminton Championship",        sport: "Badminton", dates: "10 Aug → 15 Aug", venue: "Khalsa College Hall, Mumbai",    status: "Upcoming",          entries: "184/256",  district: "Mumbai Sub"  },
  { name: "State Kabaddi Premier League — Season 4",        sport: "Kabaddi",   dates: "01 Sep → 18 Sep", venue: "Nehru Indoor Stadium, Nagpur",   status: "Registration Open", entries: "14/16",    district: "Nagpur"      },
  { name: "Maharashtra Swimming Meet — Long Course",        sport: "Swimming",  dates: "26 Jul → 28 Jul", venue: "Balewadi Aquatic Centre, Pune",  status: "Upcoming",          entries: "416/500",  district: "Pune"        },
  { name: "State Boxing Open 2027",                         sport: "Boxing",    dates: "05 Aug → 08 Aug", venue: "Shivaji Indoor, Nashik",         status: "Completed",         entries: "220/250",  district: "Nashik"      },
];

/* ═══════════════════════════════════════════════════════════════════
   SCREEN 1 — EVENT DASHBOARD
═══════════════════════════════════════════════════════════════════ */
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

  const UPCOMING_7 = [
    { name: "Inter-District Football Cup 2027",        date: "02 Aug · Cooperage Ground",        entries: 28,  icon: "⚽" },
    { name: "Maharashtra Open Badminton Championship", date: "10 Aug · Khalsa College Hall",      entries: 184, icon: "🏸" },
    { name: "State Kabaddi Premier League — S4",       date: "01 Sep · Nehru Indoor, Nagpur",    entries: 14,  icon: "🤸" },
    { name: "Maharashtra Swimming Meet",               date: "26 Jul · Balewadi Aquatic Centre", entries: 416, icon: "🏊" },
    { name: "State Archery Open 2027",                 date: "22 Aug · Wakad Archery Range",     entries: 72,  icon: "🏹" },
  ];
  const PENDING = [
    { count: 14, label: "Late entry approvals",     sub: "Entries",  color: "#f59e0b" },
    { count: 3,  label: "Protest decisions",        sub: "Protests", color: "#ef4444" },
    { count: 22, label: "Result certifications",    sub: "Results",  color: "#363092" },
    { count: 6,  label: "Accreditation overrides",  sub: "Accred.",  color: "#7c3aed" },
  ];
  const LIVE_SESSIONS = [
    { venue: "Shiv Chhatrapati Complex", sport: "Athletics", session: "Track Finals Day 3", status: "On Time" },
    { venue: "Mahalaxmi Akhada",         sport: "Wrestling", session: "Semi-Finals",        status: "Delayed" },
    { venue: "Balewadi Pool",            sport: "Swimming",  session: "Morning Heats",      status: "On Time" },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Events Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">Directorate of Sports and Youth Services · Government of Maharashtra</p>
        </div>
        <button onClick={onCreateEvent}
          className="h-10 px-5 rounded-xl text-white text-sm font-bold flex items-center gap-2 hover:opacity-90 transition shadow"
          style={{ background: "#1a1f3c" }}>
          <Plus className="h-4 w-4" /> Create Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Events"        value="48" sub="Across 12 sports"  color="#363092" icon={Trophy}      />
        <MetricCard label="Active Now"          value="3"  sub="2 venues live"     color="#22c55e" icon={Activity}    />
        <MetricCard label="Upcoming (30 days)"  value="12" sub="+4 vs last month"  color="#f59e0b" icon={Clock}       />
        <MetricCard label="Completed This Year" value="33" sub="92% on schedule"   color="#6b7280" icon={CheckCircle} />
      </div>

      <div className="flex gap-5">
        {/* Left — Events table */}
        <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">All Events</span>
            <span className="text-xs text-gray-400">{filtered.length} of {EVENTS_DATA.length}</span>
          </div>
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50">
            <select value={sportFilter} onChange={e => setSportFilter(e.target.value)}
              className="h-8 px-3 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white outline-none">
              <option>All</option>
              {Object.keys(SPORT_COLORS).map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="h-8 px-3 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white outline-none">
              {["All","Live","Upcoming","Registration Open","Completed","Cancelled"].map(s => <option key={s}>{s}</option>)}
            </select>
            <div className="flex-1 min-w-40 relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events…"
                className="w-full h-8 pl-8 pr-3 rounded-lg border border-gray-200 text-xs outline-none focus:border-[#363092]" />
            </div>
          </div>
          {/* Table head */}
          <div className="grid text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-2.5 border-b border-gray-100 bg-gray-50"
            style={{ gridTemplateColumns: "2.5fr 0.9fr 1.1fr 1fr 0.8fr 0.9fr" }}>
            <span>EVENT</span><span>SPORT</span><span>DATES</span><span>STATUS</span><span>ENTRIES</span><span>ACTIONS</span>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map((e, i) => (
              <div key={i} className="grid items-center px-5 py-3.5 hover:bg-gray-50 transition text-sm"
                style={{ gridTemplateColumns: "2.5fr 0.9fr 1.1fr 1fr 0.8fr 0.9fr" }}>
                <div>
                  <div className="font-semibold text-gray-900 leading-snug text-xs">{e.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1"><MapPin className="h-2.5 w-2.5" />{e.venue}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${SPORT_COLORS[e.sport]}20`, color: SPORT_COLORS[e.sport] }}>{e.sport}</span>
                </div>
                <div className="text-[10px] text-gray-500">{e.dates}</div>
                <div><StatusBadge status={e.status} /></div>
                <div className="text-xs font-semibold text-gray-700">{e.entries}</div>
                <div className="flex items-center gap-1.5">
                  {[{ icon: Eye, tip: "View" }, { icon: Edit3, tip: "Edit" }, { icon: Award, tip: "Results" }].map(({ icon: Ic, tip }) => (
                    <button key={tip} title={tip} className="h-6 w-6 rounded grid place-items-center text-gray-400 hover:text-[#363092] hover:bg-[#363092]/8 transition">
                      <Ic className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-64 shrink-0 space-y-4">
          {/* Upcoming 7 days */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 font-bold text-sm text-gray-800 flex items-center justify-between">
              Upcoming in 7 Days <Clock className="h-3.5 w-3.5 text-gray-400" />
            </div>
            <div className="divide-y divide-gray-50">
              {UPCOMING_7.map((u, i) => (
                <div key={i} className="px-4 py-3 flex items-start gap-3">
                  <span className="text-xl leading-none mt-0.5">{u.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-800 leading-snug">{u.name}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{u.date}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-gray-800">{u.entries}</div>
                    <div className="text-[9px] text-gray-400 uppercase">Entries</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 font-bold text-sm text-gray-800 flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500" /> Pending Actions
            </div>
            <div className="divide-y divide-gray-50">
              {PENDING.map((p, i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg grid place-items-center text-xs font-black text-white shrink-0" style={{ background: p.color }}>{p.count}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-800 truncate">{p.label}</div>
                    <div className="text-[10px] text-gray-400">{p.sub}</div>
                  </div>
                  <button className="text-[10px] font-bold text-[#363092] hover:underline shrink-0">Review ›</button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 font-bold text-sm text-gray-800 flex items-center gap-2">
              <Radio className="h-3.5 w-3.5 text-green-500 animate-pulse" /> Active Sessions
            </div>
            <div className="divide-y divide-gray-50">
              {LIVE_SESSIONS.map((s, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-800">{s.sport}</span>
                    <span className={`text-[10px] font-bold ${s.status === "On Time" ? "text-green-600" : "text-amber-600"}`}>{s.status}</span>
                  </div>
                  <div className="text-[10px] text-gray-500">{s.session}</div>
                  <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="h-2.5 w-2.5" />{s.venue}</div>
                  <button className="mt-2 text-[10px] font-bold text-[#363092] border border-[#363092]/30 rounded px-2 py-0.5 hover:bg-[#363092]/8 transition">Monitor →</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN 2 — CREATE EVENT WIZARD
═══════════════════════════════════════════════════════════════════ */
const WIZARD_STEPS = ["Basic Details", "Sports Config", "Categories", "Venues & Officials", "Review & Publish"];
const SPORTS_LIST = ["Athletics","Football","Kabaddi","Kho-Kho","Wrestling","Swimming","Boxing","Archery","Badminton","Cricket","Hockey","Volleyball"];

function ScreenCreateEvent({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", eventType: "", level: "", startDate: "", endDate: "", regOpen: "", regClose: "", expectedCount: "", desc: "", multiSport: false });
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [published, setPublished] = useState(false);

  const n = WIZARD_STEPS.length;
  const edgePct = 100 / (2 * n);
  const trackWidth = 100 - 2 * edgePct;
  const filledWidth = step === 0 ? 0 : (step / (n - 1)) * trackWidth;

  const inp = "w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/10 outline-none text-sm transition";
  const sel = "w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-[#363092] outline-none text-sm bg-white transition";
  const lbl = "block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1";

  if (published) return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="h-20 w-20 rounded-full bg-green-100 grid place-items-center mb-5">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-black text-gray-900">Event Published!</h2>
      <p className="text-sm text-gray-500 mt-2">Maharashtra State Athletics Championship 2027 is now live.</p>
      <div className="mt-4 text-xs font-mono bg-gray-100 px-4 py-2 rounded-lg text-gray-600">Event ID: GMS-EVT-2027-0049</div>
      <button onClick={onBack} className="mt-6 px-6 py-2.5 rounded-xl bg-[#363092] text-white font-bold text-sm hover:opacity-90 transition flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Events
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="h-8 w-8 rounded-lg border border-gray-200 grid place-items-center text-gray-500 hover:border-[#363092] hover:text-[#363092] transition">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-xl font-black text-gray-900">Create New Event</h1>
          <p className="text-xs text-gray-400">{WIZARD_STEPS[step]} — Step {step + 1} of {n}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-5 px-8 py-5">
        <div className="relative flex items-start">
          <div className="absolute top-[17px] h-0.5 bg-gray-200" style={{ left: `${edgePct}%`, width: `${trackWidth}%` }} />
          <div className="absolute top-[17px] h-0.5 bg-[#363092] transition-all duration-500" style={{ left: `${edgePct}%`, width: `${filledWidth}%` }} />
          {WIZARD_STEPS.map((s, i) => {
            const done = i < step, cur = i === step;
            return (
              <div key={s} className="relative z-10 flex flex-col items-center flex-1">
                <div className={`h-9 w-9 rounded-full grid place-items-center text-xs font-bold border-2 transition-all ${done ? "bg-[#363092] border-[#363092] text-white" : cur ? "bg-white border-[#363092] text-[#363092]" : "bg-white border-gray-200 text-gray-400"}`}>
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`mt-2 text-[10px] font-semibold text-center leading-tight px-1 ${cur ? "text-[#363092]" : done ? "text-gray-700" : "text-gray-400"}`}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {step === 0 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 text-base border-b border-gray-100 pb-3">Basic Details</h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className={lbl}>Event Name <span className="text-red-500">*</span></label>
                <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="e.g. Maharashtra State Athletics Championship 2027" className={inp} />
              </div>
              <div>
                <label className={lbl}>Event Type <span className="text-red-500">*</span></label>
                <select value={form.eventType} onChange={e => setForm(f => ({...f, eventType: e.target.value}))} className={sel}>
                  <option value="">Select type…</option>
                  {["Single Sport Event","Multi-Sport Event","State Championship","District Meet","Selection Trial","Invitational","Friendly","State Games"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Event Level <span className="text-red-500">*</span></label>
                <select value={form.level} onChange={e => setForm(f => ({...f, level: e.target.value}))} className={sel}>
                  <option value="">Select level…</option>
                  {["District","Division","State","National"].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Hosting Association</label>
                <input placeholder="e.g. Maharashtra Athletics Association" className={inp} />
              </div>
              <div>
                <label className={lbl}>Organizing Authority</label>
                <input placeholder="e.g. DSYS Maharashtra" className={inp} />
              </div>
              <div>
                <label className={lbl}>Host District</label>
                <select className={sel}>
                  <option value="">Select district…</option>
                  {["Pune","Mumbai City","Nagpur","Nashik","Kolhapur","Aurangabad","Thane","Solapur"].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>Edition / Year</label>
                <input placeholder="e.g. 2027" className={inp} />
              </div>
              <div>
                <label className={lbl}>Start Date <span className="text-red-500">*</span></label>
                <input type="date" value={form.startDate} onChange={e => setForm(f => ({...f, startDate: e.target.value}))} className={inp} />
              </div>
              <div>
                <label className={lbl}>End Date <span className="text-red-500">*</span></label>
                <input type="date" value={form.endDate} onChange={e => setForm(f => ({...f, endDate: e.target.value}))} className={inp} />
              </div>
              <div>
                <label className={lbl}>Registration Opens</label>
                <input type="date" value={form.regOpen} onChange={e => setForm(f => ({...f, regOpen: e.target.value}))} className={inp} />
              </div>
              <div>
                <label className={lbl}>Registration Closes</label>
                <input type="date" value={form.regClose} onChange={e => setForm(f => ({...f, regClose: e.target.value}))} className={inp} />
              </div>
              <div>
                <label className={lbl}>Technical Meeting Date</label>
                <input type="date" className={inp} />
              </div>
              <div>
                <label className={lbl}>Expected Participation Count</label>
                <input type="number" value={form.expectedCount} onChange={e => setForm(f => ({...f, expectedCount: e.target.value}))} placeholder="e.g. 1200" className={inp} />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Event Description</label>
                <textarea rows={3} placeholder="Describe the event objectives, scope, and key highlights…" className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#363092] outline-none text-sm transition" />
              </div>
              <div className="col-span-2">
                <label className={lbl}>Upload Event Logo / Poster</label>
                <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#363092] cursor-pointer transition">
                  <Upload className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">Click to upload logo or poster · PNG / JPG / PDF · Max 5MB</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 text-base border-b border-gray-100 pb-3">Sports Configuration</h3>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <input type="checkbox" id="multi" checked={form.multiSport} onChange={e => setForm(f => ({...f, multiSport: e.target.checked}))} className="h-4 w-4 accent-[#363092]" />
              <label htmlFor="multi" className="text-sm font-semibold text-amber-800">This is a Multi-Sport Event</label>
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                {form.multiSport ? "Select Sports (Multi-select)" : "Select Sport"}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {SPORTS_LIST.map(sport => {
                  const selected = selectedSports.includes(sport);
                  const toggle = () => setSelectedSports(ss => form.multiSport ? (selected ? ss.filter(s => s !== sport) : [...ss, sport]) : [sport]);
                  return (
                    <button key={sport} onClick={toggle}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-sm font-semibold transition ${selected ? "text-white" : "border-gray-200 text-gray-700 hover:border-[#363092]/50"}`}
                      style={selected ? { background: SPORT_COLORS[sport] || "#363092", borderColor: SPORT_COLORS[sport] || "#363092" } : {}}>
                      {selected ? <Check className="h-4 w-4 shrink-0" /> : <div className="h-4 w-4 rounded border border-gray-300 shrink-0" />}
                      {sport}
                    </button>
                  );
                })}
              </div>
            </div>
            {selectedSports.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Sport","Categories","Venues","Officials","Configure"].map(h => (
                        <th key={h} className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedSports.map(s => (
                      <tr key={s} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${SPORT_COLORS[s]}15`, color: SPORT_COLORS[s] }}>{s}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">0 added</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">Not assigned</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">Not assigned</td>
                        <td className="px-4 py-3">
                          <button className="text-xs font-bold text-[#363092] border border-[#363092]/30 rounded px-3 py-1 hover:bg-[#363092]/8 transition">Configure</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-800 text-base border-b border-gray-100 pb-3">Categories & Disciplines</h3>
            {(selectedSports.length > 0 ? selectedSports : ["Athletics"]).map(sport => (
              <div key={sport} className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-3 flex items-center justify-between" style={{ background: `${SPORT_COLORS[sport] || "#363092"}10` }}>
                  <span className="font-bold text-sm" style={{ color: SPORT_COLORS[sport] || "#363092" }}>{sport}</span>
                  <button className="text-xs font-bold text-[#363092] flex items-center gap-1"><Plus className="h-3.5 w-3.5" /> Add Category</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {(sport === "Athletics" ? ["U14 Boys","U14 Girls","U17 Boys","U17 Girls","Senior Men","Senior Women"] : ["Senior Men","Senior Women","U17 Boys","U17 Girls"]).map((cat, ci) => (
                    <div key={ci} className="px-5 py-3 grid grid-cols-5 gap-3 items-center text-xs">
                      <span className="font-semibold text-gray-800">{cat}</span>
                      <select className="h-8 px-2 rounded-lg border border-gray-200 text-xs bg-white outline-none">
                        <option>Individual</option><option>Team</option><option>Mixed</option>
                      </select>
                      <div className="flex items-center gap-2">
                        <input type="number" placeholder="Min" className="w-16 h-8 px-2 rounded-lg border border-gray-200 text-xs outline-none" />
                        <span className="text-gray-400">-</span>
                        <input type="number" placeholder="Max" className="w-16 h-8 px-2 rounded-lg border border-gray-200 text-xs outline-none" />
                      </div>
                      <div className="flex gap-3">
                        {["Para","Weight Class"].map(tog => (
                          <label key={tog} className="flex items-center gap-1 text-[10px] text-gray-500">
                            <input type="checkbox" className="h-3 w-3 accent-[#363092]" />{tog}
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
              {/* Venues */}
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Venues Assignment</div>
                <div className="space-y-3">
                  {[
                    { name: "Shiv Chhatrapati Sports Complex", type: "Athletic Track", cap: "5000", status: "Available" },
                    { name: "Balewadi Stadium",                type: "Multi-Sport",    cap: "8000", status: "Available" },
                    { name: "Khalsa College Indoor Hall",      type: "Indoor Hall",   cap: "1200", status: "Booked"    },
                    { name: "Balewadi Aquatic Centre",         type: "Swimming Pool", cap: "800",  status: "Available" },
                  ].map((v, i) => (
                    <div key={i} className={`p-4 rounded-xl border-2 transition ${v.status === "Available" ? "border-gray-200 hover:border-[#363092]/50" : "border-gray-100 bg-gray-50 opacity-60"}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{v.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{v.type} · Cap: {v.cap}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{v.status}</span>
                      </div>
                      {v.status === "Available" && (
                        <button className="mt-3 text-xs font-bold text-[#363092] border border-[#363092]/30 rounded-lg px-3 py-1 hover:bg-[#363092]/8 transition">Assign Venue</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Officials */}
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Officials Assignment</div>
                <div className="space-y-3">
                  {[
                    { role: "Technical Director",       required: true,  assigned: "Dr. R. Kulkarni" },
                    { role: "Competition Manager",       required: true,  assigned: "" },
                    { role: "Chief Referee",             required: true,  assigned: "" },
                    { role: "Starters (Athletics)",      required: false, assigned: "S. Patil, M. Shah" },
                    { role: "Timekeepers",               required: false, assigned: "" },
                    { role: "Medical Officer",           required: true,  assigned: "Dr. A. Deshpande" },
                  ].map((o, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200">
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-800">{o.role} {o.required && <span className="text-red-500">*</span>}</div>
                        {o.assigned ? (
                          <div className="text-[10px] text-green-600 mt-0.5 flex items-center gap-1"><CheckCircle className="h-3 w-3" />{o.assigned}</div>
                        ) : (
                          <div className="text-[10px] text-amber-600 mt-0.5">Not assigned</div>
                        )}
                      </div>
                      <button className="text-xs font-bold text-[#363092] border border-[#363092]/30 rounded px-2 py-1 hover:bg-[#363092]/8 transition">
                        {o.assigned ? "Change" : "Assign"}
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
                { title: "Event Details", rows: [["Name", form.name || "Maharashtra State Athletics Championship 2027"], ["Type", form.eventType || "State Championship"], ["Level", form.level || "State"], ["Dates", `${form.startDate || "18 Jul"} → ${form.endDate || "22 Jul 2027"}`], ["Registration", `${form.regOpen || "01 Jun"} → ${form.regClose || "30 Jun 2027"}`]] },
                { title: "Sports & Participation", rows: [["Sports", selectedSports.join(", ") || "Athletics"], ["Expected Athletes", form.expectedCount || "1,200"], ["Categories", "14 configured"], ["Venues", "3 assigned"]] },
              ].map(({ title, rows }) => (
                <div key={title} className="rounded-xl border border-gray-200 p-4">
                  <div className="text-xs font-bold text-[#363092] uppercase tracking-widest mb-3">{title}</div>
                  <dl className="space-y-2">
                    {rows.map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <dt className="text-gray-500">{k}</dt>
                        <dd className="font-semibold text-gray-800 text-right max-w-[60%] truncate">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 text-sm font-bold text-green-800 mb-1"><CheckCircle className="h-4 w-4" /> All checks passed</div>
              <div className="text-xs text-green-700">Event is ready for publication. It will be visible to participants and the public immediately.</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
          <div className="flex gap-2">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="h-10 px-5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 flex items-center gap-1.5 hover:border-[#363092] hover:text-[#363092] transition">
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
            )}
            <button className="h-10 px-5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:text-gray-700 transition">Save Draft</button>
          </div>
          <span className="text-xs text-gray-400">Step {step + 1} of {n}</span>
          {step < n - 1 ? (
            <button onClick={() => setStep(s => s + 1)}
              className="h-10 px-6 rounded-xl text-white text-sm font-bold flex items-center gap-1.5 hover:opacity-90 transition"
              style={{ background: "#363092" }}>
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={() => setPublished(true)}
              className="h-10 px-6 rounded-xl text-white text-sm font-bold flex items-center gap-1.5 hover:opacity-90 transition shadow"
              style={{ background: "#22c55e" }}>
              <Zap className="h-4 w-4" /> Publish Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN 3 — EVENT CALENDAR
═══════════════════════════════════════════════════════════════════ */
const MONTH_DAYS = (() => {
  const days: { day: number; events: { name: string; sport: string }[] }[] = [];
  for (let i = 1; i <= 31; i++) {
    const evs: { name: string; sport: string }[] = [];
    if (i === 18) evs.push({ name: "MH Athletics", sport: "Athletics" });
    if (i === 19) evs.push({ name: "Wrestling Trials", sport: "Wrestling" });
    if (i === 20) { evs.push({ name: "Athletics Day 3", sport: "Athletics" }); evs.push({ name: "Wrestling SF", sport: "Wrestling" }); }
    if (i === 22) evs.push({ name: "Athletics Finals", sport: "Athletics" });
    if (i === 26) evs.push({ name: "Swimming Meet", sport: "Swimming" });
    days.push({ day: i, events: evs });
  }
  return days;
})();

function ScreenCalendar() {
  const [view, setView] = useState<"month" | "agenda">("month");
  const [selected, setSelected] = useState<{ name: string; sport: string } | null>(null);

  const startDow = 2; // July 2027 starts Tuesday
  const blanks = Array(startDow).fill(null);

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Calendar header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button className="h-8 w-8 rounded-lg border border-gray-200 grid place-items-center hover:border-[#363092] transition"><ChevronLeft className="h-4 w-4" /></button>
            <h2 className="font-black text-gray-900 text-lg">July 2027</h2>
            <button className="h-8 w-8 rounded-lg border border-gray-200 grid place-items-center hover:border-[#363092] transition"><ChevronRight className="h-4 w-4" /></button>
            <button className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#363092] transition">Today</button>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            {["month","agenda"].map(v => (
              <button key={v} onClick={() => setView(v as "month" | "agenda")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition ${view === v ? "bg-white text-[#363092] shadow-sm" : "text-gray-500"}`}>{v}</button>
            ))}
          </div>
        </div>

        {view === "month" ? (
          <>
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-gray-100">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                <div key={d} className="text-center text-[11px] font-bold text-gray-400 uppercase py-2">{d}</div>
              ))}
            </div>
            {/* Grid */}
            <div className="grid grid-cols-7">
              {blanks.map((_, i) => <div key={`b${i}`} className="min-h-[90px] border-b border-r border-gray-50 bg-gray-50/50" />)}
              {MONTH_DAYS.map(({ day, events }) => (
                <div key={day} className="min-h-[90px] border-b border-r border-gray-100 p-1.5">
                  <div className="text-xs font-bold text-gray-500 mb-1">{day}</div>
                  <div className="space-y-0.5">
                    {events.slice(0, 2).map((e, i) => (
                      <button key={i} onClick={() => setSelected(e)}
                        className="w-full text-left px-1.5 py-0.5 rounded text-[9px] font-semibold truncate transition hover:opacity-80"
                        style={{ background: `${SPORT_COLORS[e.sport]}20`, color: SPORT_COLORS[e.sport] }}>
                        {e.name}
                      </button>
                    ))}
                    {events.length > 2 && <div className="text-[9px] text-gray-400 pl-1">+{events.length - 2} more</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="divide-y divide-gray-100">
            {MONTH_DAYS.filter(d => d.events.length > 0).map(({ day, events }) => (
              <div key={day} className="px-5 py-4 flex gap-5 items-start">
                <div className="w-16 shrink-0 text-center">
                  <div className="text-2xl font-black text-gray-900">{day}</div>
                  <div className="text-xs text-gray-400">Jul 2027</div>
                </div>
                <div className="flex-1 space-y-2">
                  {events.map((e, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#363092]/50 transition">
                      <div className="h-2 w-2 rounded-full" style={{ background: SPORT_COLORS[e.sport] }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800">{e.name}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                          <span style={{ color: SPORT_COLORS[e.sport] }}>{e.sport}</span>
                          <span>· Shiv Chhatrapati Complex, Pune</span>
                        </div>
                      </div>
                      <StatusBadge status="Live" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: event slide-in OR filter panel */}
      {selected ? (
        <div className="w-72 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="font-bold text-gray-800 text-sm">Event Details</span>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5">
            <div className="h-10 w-10 rounded-xl mb-3" style={{ background: `${SPORT_COLORS[selected.sport]}15` }}>
              <div className="h-full w-full grid place-items-center font-bold text-sm" style={{ color: SPORT_COLORS[selected.sport] }}>
                {selected.sport.slice(0, 2)}
              </div>
            </div>
            <h3 className="font-black text-gray-900 text-base leading-snug">{selected.name}</h3>
            <div className="mt-2"><StatusBadge status="Live" /></div>
            <div className="mt-4 space-y-2.5 text-xs text-gray-600">
              {[["Sport", selected.sport], ["Dates", "18 Jul → 22 Jul 2027"], ["Venue", "Shiv Chhatrapati Complex, Pune"], ["Host", "Maharashtra Athletics Assoc."], ["Entries", "842 / 1000"]].map(([l, v]) => (
                <div key={l} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400">{l}</span><span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {["View Full Details","Edit Event","Manage Entries"].map(btn => (
                <button key={btn} className="w-full h-9 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#363092] hover:text-[#363092] transition">{btn}</button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-56 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 font-bold text-sm text-gray-800 flex items-center gap-2"><Filter className="h-3.5 w-3.5" /> Filters</div>
          <div className="p-4 space-y-5">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Sport</div>
              <div className="space-y-1.5">
                {Object.keys(SPORT_COLORS).slice(0, 6).map(s => (
                  <label key={s} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#363092]" />
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: SPORT_COLORS[s] }} />
                    {s}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Status</div>
              <div className="space-y-1.5">
                {["Active","Upcoming","Completed"].map(s => (
                  <label key={s} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#363092]" />{s}
                  </label>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
              <input type="checkbox" className="h-3.5 w-3.5 accent-[#363092]" /> My Events Only
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN 4 — PARTICIPATION MANAGEMENT
═══════════════════════════════════════════════════════════════════ */
function ScreenParticipation() {
  const [tab, setTab] = useState<"assoc"|"athlete">("assoc");
  const [search, setSearch] = useState("");

  const ASSOCS = [
    { name: "Maharashtra Athletics Association", district: "Pune",          submitted: 142, confirmed: 136, pending: 4,  rejected: 2,  withdrawn: 3,  updated: "2 hrs ago" },
    { name: "Mumbai Football Federation",        district: "Mumbai City",   submitted: 36,  confirmed: 32,  pending: 2,  rejected: 0,  withdrawn: 4,  updated: "5 hrs ago" },
    { name: "Vidarbha Sports Association",       district: "Nagpur",        submitted: 88,  confirmed: 70,  pending: 12, rejected: 3,  withdrawn: 5,  updated: "1 day ago" },
    { name: "Konkan Districts SA",               district: "Raigad",        submitted: 54,  confirmed: 54,  pending: 0,  rejected: 0,  withdrawn: 0,  updated: "3 hrs ago" },
    { name: "Nashik District Sports",            district: "Nashik",        submitted: 67,  confirmed: 58,  pending: 6,  rejected: 1,  withdrawn: 2,  updated: "6 hrs ago" },
  ];
  const ATHLETES = [
    { name: "Ajay Shelar",     id: "MH-ATH-2027-001", assoc: "Maharashtra AA", sport: "Athletics", cat: "Senior Men",  entry: "Confirmed",         medical: "Cleared",    accred: "Issued"  },
    { name: "Priya Nimkar",    id: "MH-ATH-2027-002", assoc: "Pune DSA",       sport: "Athletics", cat: "Senior Women",entry: "Pending Documents",  medical: "Pending",    accred: "Pending" },
    { name: "Rahul Khedkar",   id: "MH-WRS-2027-011", assoc: "Kolhapur SA",    sport: "Wrestling", cat: "U17 Boys",    entry: "Confirmed",         medical: "Cleared",    accred: "Issued"  },
    { name: "Sneha Patankar",  id: "MH-SWM-2027-034", assoc: "Mumbai FA",      sport: "Swimming",  cat: "Senior Women",entry: "Ineligible",        medical: "Not Done",   accred: "Blocked" },
    { name: "Rohan Deshmukh",  id: "MH-KBD-2027-007", assoc: "Nagpur SA",      sport: "Kabaddi",   cat: "Senior Men",  entry: "Withdrawn",         medical: "Cleared",    accred: "Revoked" },
  ];

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-black text-gray-900">Entry Management — Maharashtra State Athletics Championship 2027</h1>
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Total Associations" value="35"  sub="All districts"     color="#363092" icon={Users}      />
        <MetricCard label="Entries Submitted"  value="28"  sub="of 35 associations" color="#f59e0b" icon={FileText}  />
        <MetricCard label="Entries Confirmed"  value="24"  sub="4 pending review"   color="#22c55e" icon={CheckCircle} />
        <MetricCard label="Withdrawals"        value="6"   sub="since registration" color="#ef4444" icon={X}         />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[["assoc","By Association"],["athlete","By Athlete"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id as "assoc"|"athlete")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${tab === id ? "bg-white text-[#363092] shadow-sm" : "text-gray-500"}`}>{label}</button>
        ))}
      </div>

      {tab === "assoc" ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3 border-b border-gray-100 bg-gray-50"
            style={{ gridTemplateColumns: "2fr 1fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 1fr 1fr" }}>
            {["Association","District","Submitted","Confirmed","Pending","Rejected","Withdrawn","Updated","Actions"].map(h => <span key={h}>{h}</span>)}
          </div>
          <div className="divide-y divide-gray-50">
            {ASSOCS.map((a, i) => (
              <div key={i} className="grid items-center px-5 py-4 hover:bg-gray-50 transition text-xs"
                style={{ gridTemplateColumns: "2fr 1fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 1fr 1fr" }}>
                <div className="font-semibold text-gray-800">{a.name}</div>
                <div className="text-gray-500">{a.district}</div>
                <div className="font-bold text-gray-800">{a.submitted}</div>
                <div className="font-bold text-green-600">{a.confirmed}</div>
                <div className="font-bold text-amber-600">{a.pending}</div>
                <div className="font-bold text-red-500">{a.rejected}</div>
                <div className="font-bold text-gray-400">{a.withdrawn}</div>
                <div className="text-gray-400">{a.updated}</div>
                <button className="text-xs font-bold text-[#363092] border border-[#363092]/30 rounded px-2 py-1 hover:bg-[#363092]/8 transition w-fit">View Entries</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or registration ID…"
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-200 text-xs outline-none focus:border-[#363092]" />
            </div>
          </div>
          <div className="grid text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3 border-b border-gray-100 bg-gray-50"
            style={{ gridTemplateColumns: "1.5fr 1.2fr 1.5fr 0.8fr 0.8fr 1fr 0.8fr 0.8fr 1fr" }}>
            {["Athlete","Reg ID","Association","Sport","Category","Entry Status","Medical","Accred.","Action"].map(h => <span key={h}>{h}</span>)}
          </div>
          <div className="divide-y divide-gray-50">
            {ATHLETES.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase())).map((a, i) => (
              <div key={i} className="grid items-center px-5 py-3.5 hover:bg-gray-50 transition text-xs"
                style={{ gridTemplateColumns: "1.5fr 1.2fr 1.5fr 0.8fr 0.8fr 1fr 0.8fr 0.8fr 1fr" }}>
                <div className="font-semibold text-gray-800">{a.name}</div>
                <div className="font-mono text-gray-500 text-[10px]">{a.id}</div>
                <div className="text-gray-500 truncate">{a.assoc}</div>
                <div><span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${SPORT_COLORS[a.sport]}15`, color: SPORT_COLORS[a.sport] }}>{a.sport}</span></div>
                <div className="text-gray-500">{a.cat}</div>
                <div><StatusBadge status={a.entry} /></div>
                <div className={`text-[10px] font-bold ${a.medical === "Cleared" ? "text-green-600" : "text-amber-600"}`}>{a.medical}</div>
                <div className={`text-[10px] font-bold ${a.accred === "Issued" ? "text-green-600" : a.accred === "Blocked" ? "text-red-500" : "text-amber-600"}`}>{a.accred}</div>
                <div className="flex gap-1">
                  <button className="text-[10px] font-bold text-green-700 border border-green-200 rounded px-1.5 py-0.5 hover:bg-green-50 transition">Approve</button>
                  <button className="text-[10px] font-bold text-red-600 border border-red-200 rounded px-1.5 py-0.5 hover:bg-red-50 transition">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-5 py-3 flex gap-3 -mx-6 -mb-6 shadow-lg">
        {[{ label: "Download Entry List (Excel)", icon: Download }, { label: "Send Reminder", icon: Send }, { label: "Close Registrations", icon: Lock, danger: true }].map(({ label, icon: Ic, danger }) => (
          <button key={label} className={`h-9 px-4 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${danger ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100" : "border border-gray-200 text-gray-700 hover:border-[#363092] hover:text-[#363092]"}`}>
            <Ic className="h-3.5 w-3.5" />{label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN 5 — RESULTS MANAGEMENT
═══════════════════════════════════════════════════════════════════ */
function ScreenResults() {
  const [tab, setTab] = useState("pending");
  const RESULTS = [
    { sport: "Athletics", cat: "Senior Men — 100m",     round: "Final",      summary: "1st: Ajay Shelar 10.42s", by: "S. Gaikwad",   window: "28 min left", status: "Pending Certification" },
    { sport: "Athletics", cat: "Senior Women — 200m",   round: "Final",      summary: "1st: Priya Nimkar 23.18s",by: "S. Gaikwad",   window: "45 min left", status: "Pending Certification" },
    { sport: "Wrestling", cat: "U17 — 60kg",            round: "Semi-Final", summary: "Rahul K. won by Fall",    by: "M. Borate",    window: "Expired",     status: "Pending Certification" },
    { sport: "Athletics", cat: "Senior Men — Long Jump", round: "Final",     summary: "1st: V. More 7.84m",      by: "T. Kadam",     window: "Certified",   status: "Certified"             },
    { sport: "Football",  cat: "U17 Boys",              round: "QF 1",       summary: "Pune 2 — 0 Nashik",       by: "R. Jadhav",    window: "Under Review", status: "Under Protest"         },
  ];
  const filtered = RESULTS.filter(r =>
    tab === "pending" ? r.status === "Pending Certification" :
    tab === "certified" ? r.status === "Certified" :
    tab === "protest" ? r.status === "Under Protest" : true
  );

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-black text-gray-900">Results Centre — Maharashtra State Athletics Championship 2027</h1>
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[["pending","Pending Certification"],["certified","Certified"],["protest","Under Protest"],["published","Published"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${tab === id ? "bg-white text-[#363092] shadow-sm" : "text-gray-500"}`}>{label}</button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3 border-b border-gray-100 bg-gray-50"
          style={{ gridTemplateColumns: "0.8fr 1.2fr 0.8fr 1.5fr 0.8fr 1fr 0.8fr 1fr" }}>
          {["Sport","Category","Round","Result Summary","Entered By","Protest Window","Status","Actions"].map(h => <span key={h}>{h}</span>)}
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.map((r, i) => (
            <div key={i} className="grid items-center px-5 py-4 hover:bg-gray-50 transition text-xs"
              style={{ gridTemplateColumns: "0.8fr 1.2fr 0.8fr 1.5fr 0.8fr 1fr 0.8fr 1fr" }}>
              <div><span className="font-bold px-1.5 py-0.5 rounded-full text-[10px]" style={{ background: `${SPORT_COLORS[r.sport]}15`, color: SPORT_COLORS[r.sport] }}>{r.sport}</span></div>
              <div className="font-semibold text-gray-800 text-[11px]">{r.cat}</div>
              <div className="text-gray-500">{r.round}</div>
              <div className="text-gray-700 font-medium">{r.summary}</div>
              <div className="text-gray-400">{r.by}</div>
              <div className={`font-semibold text-[10px] ${r.window.includes("min") ? "text-amber-600" : r.window === "Expired" ? "text-red-500" : "text-gray-400"}`}>{r.window}</div>
              <div><StatusBadge status={r.status} /></div>
              <div className="flex gap-1.5">
                <button className="text-[10px] font-bold text-[#363092] border border-[#363092]/30 rounded px-2 py-0.5 hover:bg-[#363092]/8 transition">Review</button>
                {r.status === "Pending Certification" && (
                  <button className="text-[10px] font-bold text-green-700 border border-green-200 rounded px-2 py-0.5 hover:bg-green-50 transition">Certify</button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-5 py-10 text-center text-sm text-gray-400">No results in this category.</div>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN 6 — REPORTS
═══════════════════════════════════════════════════════════════════ */
function ScreenReports() {
  const [activeReport, setActiveReport] = useState("participation");
  const REPORT_CATS = [
    { id: "participation", label: "Participation Reports" },
    { id: "results",       label: "Results Reports" },
    { id: "accreditation", label: "Accreditation Reports" },
    { id: "medals",        label: "Medal Tally Reports" },
    { id: "financial",     label: "Financial Reports" },
    { id: "comparison",    label: "Comparison Reports" },
    { id: "custom",        label: "Custom Report Builder" },
  ];
  const BAR_DATA = [
    { label: "Athletics", val: 842 }, { label: "Wrestling", val: 312 }, { label: "Football", val: 284 },
    { label: "Swimming", val: 416 }, { label: "Kabaddi", val: 196 }, { label: "Badminton", val: 184 },
  ];
  const max = Math.max(...BAR_DATA.map(d => d.val));

  return (
    <div className="p-6 flex gap-5">
      {/* Sidebar */}
      <div className="w-52 shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 font-bold text-sm text-gray-800">Report Categories</div>
        <div className="py-2">
          {REPORT_CATS.map(c => (
            <button key={c.id} onClick={() => setActiveReport(c.id)}
              className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition ${activeReport === c.id ? "bg-[#363092]/8 text-[#363092]" : "text-gray-600 hover:bg-gray-50"}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 min-w-0 space-y-5">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-bold text-gray-900">Sport-wise Participation Summary</h2>
              <p className="text-xs text-gray-400 mt-0.5">All sports · All categories · Maharashtra State Championship 2027</p>
            </div>
            <div className="flex gap-2">
              {[{ icon: Download, label: "PDF" }, { icon: Download, label: "Excel" }, { icon: Send, label: "Email" }].map(({ icon: Ic, label }) => (
                <button key={label} className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 flex items-center gap-1.5 hover:border-[#363092] transition">
                  <Ic className="h-3.5 w-3.5" />{label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[["Sport","All Sports"],["Category","All Categories"],["District","All Districts"]].map(([l, ph]) => (
              <select key={l} className="h-8 px-3 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white outline-none">{<option>{ph}</option>}</select>
            ))}
            <button className="h-8 px-4 rounded-lg bg-[#363092] text-white text-xs font-bold hover:opacity-90 transition">Generate Report</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Total Entries"     value="2,234" sub="Across all sports" color="#363092" icon={Users}      />
          <MetricCard label="Confirmed"         value="1,986" sub="88.9% confirmation" color="#22c55e" icon={CheckCircle} />
          <MetricCard label="Districts Rep."    value="34"    sub="of 36 districts"   color="#f59e0b" icon={MapPin}      />
          <MetricCard label="Avg per District"  value="65"    sub="athletes"           color="#7c3aed" icon={TrendingUp}  />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 text-sm mb-5">Entries by Sport</h3>
          <div className="space-y-3">
            {BAR_DATA.map(d => (
              <div key={d.label} className="flex items-center gap-3">
                <div className="w-20 text-xs font-semibold text-gray-700 text-right shrink-0">{d.label}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div className="h-full rounded-full flex items-center pl-3 text-white text-[10px] font-bold transition-all duration-700"
                    style={{ width: `${(d.val / max) * 100}%`, background: SPORT_COLORS[d.label] || "#363092" }}>
                    {d.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3 border-b border-gray-100 bg-gray-50"
            style={{ gridTemplateColumns: "1.5fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr" }}>
            {["Sport","Total Entries","Confirmed","Pending","Districts Rep.","Completion %"].map(h => <span key={h}>{h}</span>)}
          </div>
          <div className="divide-y divide-gray-50">
            {BAR_DATA.map((d, i) => (
              <div key={i} className="grid items-center px-5 py-3.5 hover:bg-gray-50 text-xs" style={{ gridTemplateColumns: "1.5fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr" }}>
                <span className="font-bold px-2 py-0.5 rounded-full w-fit text-[10px]" style={{ background: `${SPORT_COLORS[d.label]}15`, color: SPORT_COLORS[d.label] }}>{d.label}</span>
                <span className="font-black text-gray-800">{d.val}</span>
                <span className="text-green-600 font-semibold">{Math.round(d.val * 0.92)}</span>
                <span className="text-amber-600 font-semibold">{Math.round(d.val * 0.08)}</span>
                <span className="text-gray-600">{20 + i * 2}</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: "92%", background: SPORT_COLORS[d.label] }} />
                  </div>
                  <span className="text-gray-600 font-semibold">92%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SCREEN 7 — SETTINGS
═══════════════════════════════════════════════════════════════════ */
function ScreenSettings() {
  return (
    <div className="p-6 max-w-3xl space-y-5">
      <h1 className="text-xl font-black text-gray-900">Settings</h1>
      {[
        { title: "General Configuration", fields: [["Portal Name","GMS — Maharashtra Sports"],["Default Language","English"],["Timezone","IST (UTC+5:30)"],["Auto Logout (min)","30"]] },
        { title: "Notification Preferences", fields: [["Email Alerts","Enabled"],["SMS Alerts","Enabled"],["WhatsApp Alerts","Enabled"],["Push Notifications","Disabled"]] },
        { title: "Result Certification Settings", fields: [["Protest Window (minutes)","30"],["Auto-certify after window","Yes"],["Require dual scorer sign-off","Yes"]] },
      ].map(({ title, fields }) => (
        <div key={title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 text-sm mb-4 pb-3 border-b border-gray-100">{title}</h3>
          <div className="grid grid-cols-2 gap-4">
            {fields.map(([label, value]) => (
              <div key={label}>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
                <input defaultValue={value} className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-[#363092] outline-none text-sm transition" />
              </div>
            ))}
          </div>
          <button className="mt-4 h-9 px-5 rounded-lg bg-[#363092] text-white text-xs font-bold hover:opacity-90 transition">Save Changes</button>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GMS PORTAL SHELL
═══════════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "dashboard",      label: "Dashboard",        icon: LayoutDashboard },
  { id: "events",         label: "Events",            icon: Trophy          },
  { id: "schedule",       label: "Schedule",          icon: Calendar        },
  { id: "participation",  label: "Participation",     icon: Users           },
  { id: "accreditation",  label: "Accreditation",     icon: ShieldCheck     },
  { id: "results",        label: "Results & Scoring", icon: BarChart3       },
  { id: "reports",        label: "Reports",           icon: FileText        },
  { id: "settings",       label: "Settings",          icon: Settings        },
];

export function GMSPortal({ onBack }: { onBack: () => void }) {
  const [nav, setNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [online] = useState(true);

  const activeLabel = NAV_ITEMS.find(n => n.id === nav)?.label ?? "Dashboard";

  function renderScreen() {
    if (createMode) return <ScreenCreateEvent onBack={() => setCreateMode(false)} />;
    switch (nav) {
      case "dashboard":     return <ScreenDashboard onCreateEvent={() => setCreateMode(true)} />;
      case "events":        return <ScreenDashboard onCreateEvent={() => setCreateMode(true)} />;
      case "schedule":      return <ScreenCalendar />;
      case "participation": return <ScreenParticipation />;
      case "results":       return <ScreenResults />;
      case "reports":       return <ScreenReports />;
      case "settings":      return <ScreenSettings />;
      default:              return <ScreenDashboard onCreateEvent={() => setCreateMode(true)} />;
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#f0f2f8" }}>
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-[220px]"} shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen z-30`}
        style={{ background: "#1a1f3c" }}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-white/10 min-h-[64px]">
          <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0 text-white font-black text-xs" style={{ background: "#FF6B35" }}>GMS</div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-white text-sm font-bold leading-none">GMS Portal</div>
              <div className="text-white/40 text-[10px] mt-0.5">Maharashtra Sports</div>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)} className="ml-auto text-white/30 hover:text-white transition shrink-0">
            <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => { setNav(item.id); setCreateMode(false); }}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all ${nav === item.id && !createMode ? "text-white" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
              style={nav === item.id && !createMode ? { background: "#363092" } : {}}>
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Back */}
        <div className="p-2 border-t border-white/10">
          <button onClick={onBack} title={collapsed ? "Back to Admin" : undefined}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-xs text-white/30 hover:text-white/60 transition">
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Back to Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
          <img src={mhSeal} alt="MH Seal" className="h-8 w-auto object-contain shrink-0" />
          <div className="h-6 w-px bg-gray-200" />
          <div className="text-sm text-gray-500">
            <span className="font-bold text-gray-800">GMS Portal</span>
            <span className="mx-1.5 text-gray-300">/</span>
            <span>{createMode ? "Create Event" : activeLabel}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {/* Sync */}
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${online ? "text-green-600" : "text-amber-600"}`}>
              {online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
              {online ? "Live" : "Offline"}
            </div>
            {/* Lang */}
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
              {["EN","HI","MR"].map(l => (
                <button key={l} className={`px-2 py-1 rounded text-[11px] font-bold transition ${l === "EN" ? "bg-white text-[#363092] shadow-sm" : "text-gray-400 hover:text-gray-700"}`}>{l}</button>
              ))}
            </div>
            <button className="relative h-8 w-8 rounded-lg border border-gray-200 grid place-items-center text-gray-500 hover:border-[#363092] transition">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full grid place-items-center bg-red-500 text-white text-[8px] font-black">7</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full grid place-items-center text-white text-xs font-black shrink-0" style={{ background: "#363092" }}>AP</div>
              <div>
                <div className="text-xs font-bold text-gray-800 leading-none">A. Pawar</div>
                <div className="text-[10px] text-orange-500 font-bold">ADMIN</div>
              </div>
            </div>
          </div>
        </header>

        {/* Screen content */}
        <main className="flex-1 overflow-auto">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}

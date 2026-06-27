import { useState } from "react";
import {
  LayoutDashboard, Home, Users, BedDouble, BarChart3,
  ClipboardList, Wrench, MessageSquare, Package, FileText,
  Bell, Settings, ChevronRight, Search, Filter, Plus,
  CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp,
  TrendingDown, Eye, Edit3, Trash2, Download, Send,
  LogOut, ArrowLeft, ArrowRight, X, Check, Star,
  Building2, MapPin, Phone, Mail, Calendar, User,
  Shield, Wifi, Activity, RefreshCw, MoreVertical,
  ChevronDown, ChevronUp, Zap, Upload, Lock,
} from "lucide-react";
import mhSeal from "@/assets/mh-seal.png";

/* ═══════════════════════════════════════════════════════
   THEME & CONSTANTS
═══════════════════════════════════════════════════════ */
const PRIMARY = "#1e3a5f";
const ACCENT  = "#f97316";

const HOSTELS = [
  "Shiv Chhatrapati Hostel, Pune",
  "Balewadi Sports Hostel, Pune",
  "Nagpur Sports Hostel",
  "Nashik District Hostel",
  "Aurangabad Sports Hostel",
  "Kolhapur Wrestling Hostel",
];

const SPORTS = ["Athletics","Football","Wrestling","Swimming","Boxing","Badminton","Kabaddi","Cricket"];

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════ */
function DynIcon({ icon: Icon, className, style }: { icon: React.ElementType; className?: string; style?: React.CSSProperties }) {
  return <Icon className={className} style={style} />;
}

function Badge({ label, color }: { label: string; color: string }) {
  const map: Record<string, string> = {
    green:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
    red:    "bg-red-50 text-red-600 border border-red-200",
    amber:  "bg-amber-50 text-amber-700 border border-amber-200",
    blue:   "bg-blue-50 text-blue-700 border border-blue-200",
    gray:   "bg-gray-100 text-gray-500 border border-gray-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${map[color] || map.gray}`}>{label}</span>;
}

function KpiCard({ label, value, sub, icon: Icon, color, trend }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; trend?: "up"|"down"|"neutral";
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-start">
      <div className="h-12 w-12 rounded-xl grid place-items-center shrink-0" style={{ background: `${color}15` }}>
        <Icon className="h-6 w-6" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</div>
        <div className="text-2xl font-black text-gray-900 mt-0.5">{value}</div>
        {sub && (
          <div className={`text-xs mt-1 flex items-center gap-1 font-medium ${trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-gray-400"}`}>
            {trend === "up" && <TrendingUp className="h-3 w-3" />}
            {trend === "down" && <TrendingDown className="h-3 w-3" />}
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ title, action, actionLabel }: { title: string; action?: () => void; actionLabel?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-bold text-gray-800">{title}</h2>
      {action && actionLabel && (
        <button onClick={action} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition" style={{ background: PRIMARY }}>
          <Plus className="h-3.5 w-3.5" />{actionLabel}
        </button>
      )}
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
              {heads.map(h => <th key={h} className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Search…"}
        className="h-9 pl-9 pr-9 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition w-64" />
      {value && <button onClick={() => onChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="h-3.5 w-3.5" /></button>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ALL-MAHARASHTRA HOSTEL DATA (shared across screens)
═══════════════════════════════════════════════════════ */
const ALL_HOSTELS_DATA = [
  { id:"H001", name:"Shiv Chhatrapati Sports Hostel", city:"Pune",       division:"Pune",       district:"Pune",       type:"Male",   status:"Active",      total:120, occupied:108, sports:["Athletics","Football","Wrestling"], warden:"Sunil Patil",    phone:"9800001111", est:"2005" },
  { id:"H002", name:"Balewadi Sports Hostel",         city:"Pune",       division:"Pune",       district:"Pune",       type:"Male",   status:"Active",      total:80,  occupied:62,  sports:["Swimming","Badminton"],           warden:"Rekha More",     phone:"9800002222", est:"2010" },
  { id:"H003", name:"Nagpur Sports Hostel",           city:"Nagpur",     division:"Nagpur",     district:"Nagpur",     type:"Male",   status:"Active",      total:60,  occupied:55,  sports:["Kabaddi","Boxing"],               warden:"Rajan Bhele",    phone:"9800003333", est:"2008" },
  { id:"H004", name:"Nashik District Sports Hostel",  city:"Nashik",     division:"Nashik",     district:"Nashik",     type:"Mixed",  status:"Active",      total:50,  occupied:38,  sports:["Athletics","Cricket"],            warden:"Priya Kale",     phone:"9800004444", est:"2012" },
  { id:"H005", name:"Kolhapur Wrestling Hostel",      city:"Kolhapur",   division:"Konkan",     district:"Kolhapur",   type:"Male",   status:"Active",      total:40,  occupied:28,  sports:["Wrestling"],                      warden:"Ganesh Jadhav",  phone:"9800005555", est:"2003" },
  { id:"H006", name:"Aurangabad Sports Hostel",       city:"Aurangabad", division:"Aurangabad", district:"Aurangabad", type:"Mixed",  status:"Maintenance", total:30,  occupied:18,  sports:["Badminton","Kabaddi"],            warden:"Sonal Desai",    phone:"9800006666", est:"2015" },
  { id:"H007", name:"Amravati Sports Hostel",         city:"Amravati",   division:"Amravati",   district:"Amravati",   type:"Female", status:"Active",      total:45,  occupied:32,  sports:["Athletics","Badminton"],          warden:"Kavita Shinde",  phone:"9800007777", est:"2018" },
  { id:"H008", name:"Solapur District Hostel",        city:"Solapur",    division:"Pune",       district:"Solapur",    type:"Male",   status:"Active",      total:35,  occupied:22,  sports:["Kabaddi","Football"],             warden:"Dinesh Rao",     phone:"9800008888", est:"2019" },
  { id:"H009", name:"Latur Sports Hostel",            city:"Latur",      division:"Aurangabad", district:"Latur",      type:"Mixed",  status:"Inactive",    total:25,  occupied:0,   sports:["Athletics"],                      warden:"Pending",        phone:"—",          est:"2022" },
  { id:"H010", name:"Ratnagiri Coastal Hostel",       city:"Ratnagiri",  division:"Konkan",     district:"Ratnagiri",  type:"Male",   status:"Active",      total:20,  occupied:14,  sports:["Swimming","Kabaddi"],             warden:"Akash Sawant",   phone:"9800010000", est:"2021" },
];

/* ═══════════════════════════════════════════════════════
   SCREEN 1 — DASHBOARD (State-Wide View)
═══════════════════════════════════════════════════════ */
function ScreenDashboard({ setNav }: { setNav: (n: string) => void }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [divisionFilter, setDivisionFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [view, setView] = useState<"grid"|"list">("grid");

  const DIVISIONS = ["All","Pune","Nashik","Nagpur","Aurangabad","Amravati","Konkan"];
  const STATUSES  = ["All","Active","Maintenance","Inactive"];
  const TYPES     = ["All","Male","Female","Mixed"];

  const filtered = ALL_HOSTELS_DATA.filter(h => {
    const s = statusFilter   === "All" || h.status   === statusFilter;
    const d = divisionFilter === "All" || h.division === divisionFilter;
    const t = typeFilter     === "All" || h.type     === typeFilter;
    return s && d && t;
  });

  const active      = ALL_HOSTELS_DATA.filter(h => h.status === "Active").length;
  const maintenance = ALL_HOSTELS_DATA.filter(h => h.status === "Maintenance").length;
  const inactive    = ALL_HOSTELS_DATA.filter(h => h.status === "Inactive").length;
  const totalCap    = ALL_HOSTELS_DATA.reduce((a, h) => a + h.total, 0);
  const totalOcc    = ALL_HOSTELS_DATA.reduce((a, h) => a + h.occupied, 0);
  const overallPct  = Math.round((totalOcc / totalCap) * 100);

  const ALERTS = [
    { msg: "Aurangabad Hostel under maintenance — 18 residents to relocate", type: "warning" },
    { msg: "12 athletes absent >3 days across Maharashtra hostels",          type: "danger"  },
    { msg: "Grievance #GRV-034 awaiting resolution (7 days)",                type: "danger"  },
    { msg: "Latur Hostel — warden appointment pending",                      type: "info"    },
  ];

  const RECENT_APPS = [
    { name: "Arjun Deshmukh", hostel: "Shiv Chhatrapati, Pune", sport: "Athletics", date: "Today 09:14", status: "Pending" },
    { name: "Priya Jadhav",   hostel: "Balewadi, Pune",          sport: "Swimming",  date: "Today 08:30", status: "Pending" },
    { name: "Ravi Bhosale",   hostel: "Kolhapur Hostel",         sport: "Wrestling", date: "Yesterday",   status: "Approved"},
    { name: "Sneha Kulkarni", hostel: "Nashik Hostel",           sport: "Badminton", date: "Yesterday",   status: "Review"  },
  ];

  const statusStyle: Record<string,{ card: string; dot: string; badge: string }> = {
    Active:      { card: "border-emerald-200 bg-emerald-50/30", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
    Maintenance: { card: "border-amber-200 bg-amber-50/30",     dot: "bg-amber-500",   badge: "bg-amber-100 text-amber-700"     },
    Inactive:    { card: "border-gray-200 bg-gray-50",          dot: "bg-gray-400",    badge: "bg-gray-100 text-gray-500"       },
  };

  return (
    <div className="p-6 space-y-5">
      {/* Website sync banner */}
      <div className="rounded-2xl p-4 flex items-center gap-4 border border-blue-200" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
        <div className="h-10 w-10 rounded-xl bg-blue-600 grid place-items-center shrink-0"><Wifi className="h-5 w-5 text-white" /></div>
        <div className="flex-1">
          <div className="text-sm font-bold text-blue-900">Live Connection — Public Website</div>
          <div className="text-xs text-blue-600 mt-0.5">2 new hostel applications from <span className="font-bold">/hostel-schemes</span> in the last hour · across all Maharashtra hostels</div>
        </div>
        <button onClick={() => setNav("admissions")} className="h-8 px-4 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shrink-0">Review Now →</button>
      </div>

      {/* State-wide KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Total Hostels"      value={ALL_HOSTELS_DATA.length} sub="Across Maharashtra"  icon={Building2}     color={PRIMARY}    />
        <KpiCard label="Active Hostels"     value={active}      sub={`${maintenance} maintenance`}    icon={CheckCircle}   color="#059669"    trend="up" />
        <KpiCard label="Total Capacity"     value={totalCap}    sub="Beds across all hostels"         icon={BedDouble}     color="#7c3aed"    />
        <KpiCard label="Overall Occupancy"  value={`${overallPct}%`} sub={`${totalOcc} of ${totalCap} beds`} icon={Activity} color="#f97316" trend="up" />
        <KpiCard label="Pending Admissions" value="14"          sub="8 from website today"            icon={ClipboardList} color="#dc2626"    trend="neutral" />
      </div>

      {/* Hostel status summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[["Active Hostels", active, "#059669", "bg-emerald-500"], ["Under Maintenance", maintenance, "#f59e0b", "bg-amber-500"], ["Inactive", inactive, "#9ca3af", "bg-gray-400"]].map(([l, v, c]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black" style={{ color: c as string }}>{v as number}</div>
              <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
            </div>
            <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: `${c as string}15` }}>
              <Building2 className="h-5 w-5" style={{ color: c as string }} />
            </div>
          </div>
        ))}
      </div>

      {/* Hostel cards section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        {/* Filter + view toggle bar */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <h2 className="text-base font-bold text-gray-900 mr-2">All Hostels — Maharashtra</h2>
          <div className="flex gap-1 ml-auto">
            {STATUSES.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`h-7 px-3 rounded-lg text-[11px] font-bold transition ${statusFilter === s ? "text-white" : "border border-gray-200 text-gray-500 hover:border-blue-300"}`}
                style={statusFilter === s ? { background: PRIMARY } : {}}>
                {s}
              </button>
            ))}
          </div>
          <div className="h-5 w-px bg-gray-200" />
          <select value={divisionFilter} onChange={e => setDivisionFilter(e.target.value)}
            className="h-7 px-2 rounded-lg border border-gray-200 text-[11px] text-gray-600 bg-white outline-none">
            {DIVISIONS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="h-7 px-2 rounded-lg border border-gray-200 text-[11px] text-gray-600 bg-white outline-none">
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <div className="flex gap-1 border border-gray-200 rounded-lg p-0.5">
            <button onClick={() => setView("grid")} className={`h-6 w-6 rounded grid place-items-center transition ${view === "grid" ? "bg-gray-200" : "text-gray-400"}`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="5" height="5"/><rect x="7" y="0" width="5" height="5"/><rect x="0" y="7" width="5" height="5"/><rect x="7" y="7" width="5" height="5"/></svg>
            </button>
            <button onClick={() => setView("list")} className={`h-6 w-6 rounded grid place-items-center transition ${view === "list" ? "bg-gray-200" : "text-gray-400"}`}>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor"><rect x="0" y="0" width="12" height="2"/><rect x="0" y="4" width="12" height="2"/><rect x="0" y="8" width="12" height="2"/></svg>
            </button>
          </div>
          <button onClick={() => setNav("hostel-reg")} className="h-7 px-3 rounded-lg text-white text-[11px] font-bold flex items-center gap-1 hover:opacity-90 transition" style={{ background: ACCENT }}>
            <Plus className="h-3.5 w-3.5" /> Add Hostel
          </button>
        </div>

        <p className="text-xs text-gray-400 mb-4">Showing {filtered.length} of {ALL_HOSTELS_DATA.length} hostels</p>

        {view === "grid" ? (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(h => {
              const pct = Math.round((h.occupied / h.total) * 100);
              const st  = statusStyle[h.status];
              return (
                <div key={h.id} className={`rounded-2xl border p-4 transition hover:shadow-md cursor-pointer ${st.card}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-sm leading-tight truncate">{h.name}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{h.city} · {h.division} Division
                      </div>
                    </div>
                    <span className={`shrink-0 ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${st.badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />{h.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                    <div className="bg-white/70 rounded-xl py-2">
                      <div className="text-base font-black text-gray-900">{h.total}</div>
                      <div className="text-[9px] text-gray-400 font-semibold uppercase">Capacity</div>
                    </div>
                    <div className="bg-white/70 rounded-xl py-2">
                      <div className="text-base font-black text-gray-900">{h.occupied}</div>
                      <div className="text-[9px] text-gray-400 font-semibold uppercase">Occupied</div>
                    </div>
                    <div className="bg-white/70 rounded-xl py-2">
                      <div className={`text-base font-black ${pct >= 90 ? "text-red-500" : pct >= 75 ? "text-amber-500" : "text-emerald-600"}`}>{h.status === "Inactive" ? "—" : `${pct}%`}</div>
                      <div className="text-[9px] text-gray-400 font-semibold uppercase">Occ %</div>
                    </div>
                  </div>
                  {h.status !== "Inactive" && (
                    <div className="h-2 bg-white/60 rounded-full overflow-hidden mb-3">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#059669" }} />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {h.sports.map(s => <span key={s} className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">{s}</span>)}
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100">{h.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-white/50 pt-2">
                    <span>Warden: <span className="font-semibold text-gray-600">{h.warden}</span></span>
                    <span>Est. {h.est}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <TableWrap heads={["ID","Hostel Name","Division","District","Type","Status","Capacity","Occupied","Occ %","Warden","Action"]}>
            {filtered.map(h => {
              const pct = Math.round((h.occupied / h.total) * 100);
              return (
                <tr key={h.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-mono text-[10px] text-gray-400">{h.id}</td>
                  <td className="px-4 py-3 font-bold text-gray-800 text-xs max-w-[160px]">{h.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{h.division}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{h.district}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{h.type}</td>
                  <td className="px-4 py-3"><Badge label={h.status} color={h.status==="Active"?"green":h.status==="Maintenance"?"amber":"gray"} /></td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-700">{h.total}</td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-700">{h.occupied}</td>
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#059669" }}>{h.status === "Inactive" ? "—" : `${pct}%`}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{h.warden}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="h-6 px-2 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition">View</button>
                      <button className="h-6 px-2 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:border-amber-300 hover:text-amber-600 transition">Edit</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </TableWrap>
        )}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Occupancy bars */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800">Occupancy Rate — All Hostels</h2>
            <span className="text-xs text-gray-400">Statewide avg: <span className="font-black text-gray-700">{overallPct}%</span></span>
          </div>
          <div className="space-y-3">
            {ALL_HOSTELS_DATA.filter(h => h.status !== "Inactive").map(h => {
              const pct = Math.round((h.occupied / h.total) * 100);
              return (
                <div key={h.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700 truncate max-w-[55%]">{h.name}</span>
                    <span className="text-[10px] text-gray-400 ml-2 shrink-0">{h.occupied}/{h.total} · <span className={`font-black ${pct>=90?"text-red-500":pct>=75?"text-amber-500":"text-emerald-600"}`}>{pct}%</span></span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width:`${pct}%`, background: pct>=90?"#ef4444":pct>=75?"#f59e0b":"#059669" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="State-wide Alerts" />
          <div className="space-y-3">
            {ALERTS.map((a, i) => (
              <div key={i} className={`flex gap-2 p-3 rounded-xl text-xs ${a.type==="danger"?"bg-red-50 border border-red-100":a.type==="warning"?"bg-amber-50 border border-amber-100":"bg-blue-50 border border-blue-100"}`}>
                <AlertTriangle className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${a.type==="danger"?"text-red-500":a.type==="warning"?"text-amber-500":"text-blue-500"}`} />
                <span className={`font-medium leading-snug ${a.type==="danger"?"text-red-700":a.type==="warning"?"text-amber-700":"text-blue-700"}`}>{a.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent applications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-800">Recent Applications — All Hostels</h2>
            <p className="text-xs text-gray-400 mt-0.5">From public website · /hostel-schemes</p>
          </div>
          <button onClick={() => setNav("admissions")} className="text-xs font-bold text-blue-600 hover:underline">View All →</button>
        </div>
        <TableWrap heads={["Athlete","Sport","Applied Hostel","Received","Status","Action"]}>
          {RECENT_APPS.map((a, i) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3 font-semibold text-gray-800 text-xs">{a.name}</td>
              <td className="px-5 py-3 text-xs text-gray-500">{a.sport}</td>
              <td className="px-5 py-3 text-xs text-gray-500">{a.hostel}</td>
              <td className="px-5 py-3 text-xs text-gray-400">{a.date}</td>
              <td className="px-5 py-3"><Badge label={a.status} color={a.status==="Approved"?"green":a.status==="Pending"?"amber":"blue"} /></td>
              <td className="px-5 py-3">
                <div className="flex gap-1.5">
                  <button className="h-7 px-2.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 hover:bg-emerald-100 transition">Approve</button>
                  <button className="h-7 px-2.5 rounded-lg bg-gray-50 text-gray-500 text-[10px] font-bold border border-gray-200 hover:bg-gray-100 transition">View</button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 2 — ADMISSIONS MANAGEMENT
═══════════════════════════════════════════════════════ */
function ScreenAdmissions() {
  const [tab, setTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number|null>(null);

  const APPS = [
    { id:"HMS-2027-089", name:"Arjun Deshmukh",  sport:"Athletics", district:"Pune",    hostel:"Shiv Chhatrapati", dob:"14 Mar 2009", phone:"9876543210", status:"Pending",  docs:"Complete",   received:"Today",      src:"website" },
    { id:"HMS-2027-088", name:"Priya Jadhav",    sport:"Swimming",  district:"Nashik",  hostel:"Balewadi",         dob:"22 Jun 2008", phone:"9765432109", status:"Pending",  docs:"Missing Aadhaar", received:"Today", src:"website" },
    { id:"HMS-2027-087", name:"Ravi Bhosale",    sport:"Wrestling", district:"Kolhapur",hostel:"Kolhapur Hostel",  dob:"05 Jan 2007", phone:"9654321098", status:"Approved", docs:"Complete",   received:"Yesterday",  src:"website" },
    { id:"HMS-2027-086", name:"Sneha Kulkarni",  sport:"Badminton", district:"Nashik",  hostel:"Nashik Hostel",    dob:"11 Sep 2010", phone:"9543210987", status:"Review",   docs:"Complete",   received:"Yesterday",  src:"website" },
    { id:"HMS-2027-085", name:"Omkar Shinde",    sport:"Boxing",    district:"Nagpur",  hostel:"Nagpur Hostel",    dob:"30 Nov 2006", phone:"9432109876", status:"Waitlist", docs:"Complete",   received:"2 days ago", src:"website" },
    { id:"HMS-2027-084", name:"Kavita Patil",    sport:"Athletics", district:"Pune",    hostel:"Shiv Chhatrapati", dob:"18 Feb 2009", phone:"9321098765", status:"Rejected", docs:"Incomplete", received:"3 days ago", src:"offline" },
  ];

  const tabs = [["pending","Pending",APPS.filter(a=>a.status==="Pending").length],["review","In Review",1],["approved","Approved",2],["waitlist","Waitlist",1],["rejected","Rejected",1]];
  const filtered = APPS.filter(a => {
    const matchTab = tab === "pending" ? a.status === "Pending" : tab === "review" ? a.status === "Review" : tab === "approved" ? a.status === "Approved" : tab === "waitlist" ? a.status === "Waitlist" : a.status === "Rejected";
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });
  const app = selected !== null ? APPS[selected] : null;

  const statusColor: Record<string,string> = { Pending: "amber", Approved: "green", Review: "blue", Waitlist: "purple", Rejected: "red" };

  return (
    <div className="p-6 flex gap-5 h-full">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Admissions Management</h1>
            <p className="text-xs text-gray-400 mt-0.5">Applications received from website & offline submissions</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: PRIMARY }}>
            <Plus className="h-4 w-4" /> Manual Entry
          </button>
        </div>

        {/* Website live feed banner */}
        <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-200 bg-blue-50">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-semibold text-blue-700">Live sync active — new applications from <strong>/hostel-schemes</strong> appear here automatically</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
          {tabs.map(([id, label, count]) => (
            <button key={id} onClick={() => setTab(id as string)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${tab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {label}
              <span className={`h-5 min-w-5 px-1 rounded-full text-[10px] font-black grid place-items-center ${tab === id ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}>{count as number}</span>
            </button>
          ))}
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID…" />
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Hostels</option>
            {HOSTELS.map(h => <option key={h}>{h}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Sports</option>
            {SPORTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <TableWrap heads={["App ID","Athlete","Sport","District","Applied Hostel","Docs","Received","Source","Actions"]}>
          {filtered.map((a, i) => (
            <tr key={i} onClick={() => setSelected(APPS.indexOf(a))} className={`cursor-pointer transition ${selected === APPS.indexOf(a) ? "bg-blue-50" : "hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[11px] text-gray-500">{a.id}</td>
              <td className="px-5 py-3.5"><span className="font-bold text-gray-800 text-xs">{a.name}</span></td>
              <td className="px-5 py-3.5"><span className="text-xs text-gray-600">{a.sport}</span></td>
              <td className="px-5 py-3.5"><span className="text-xs text-gray-500">{a.district}</span></td>
              <td className="px-5 py-3.5"><span className="text-xs text-gray-600">{a.hostel}</span></td>
              <td className="px-5 py-3.5">
                <Badge label={a.docs === "Complete" ? "✓ Complete" : a.docs} color={a.docs === "Complete" ? "green" : "amber"} />
              </td>
              <td className="px-5 py-3.5"><span className="text-xs text-gray-400">{a.received}</span></td>
              <td className="px-5 py-3.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.src === "website" ? "bg-blue-50 text-blue-600 border border-blue-200" : "bg-gray-100 text-gray-500"}`}>
                  {a.src === "website" ? "🌐 Website" : "Offline"}
                </span>
              </td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1.5">
                  <button className="h-7 px-2 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 hover:bg-emerald-100 transition">Approve</button>
                  <button className="h-7 px-2 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold border border-red-200 hover:bg-red-100 transition">Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {/* Detail panel */}
      {app && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Application Detail</span>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl grid place-items-center text-white font-black text-xl shrink-0" style={{ background: PRIMARY }}>
                {app.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="font-black text-gray-900">{app.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{app.sport} · {app.district}</div>
                <Badge label={app.status} color={statusColor[app.status]} />
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["App ID", app.id], ["Date of Birth", app.dob], ["Mobile", app.phone], ["Applied Hostel", app.hostel], ["Documents", app.docs], ["Source", app.src === "website" ? "🌐 Public Website" : "Offline"]].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700">{v}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button className="w-full h-9 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" /> Approve & Allocate Room
              </button>
              <button className="w-full h-9 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" /> Add to Waitlist
              </button>
              <button className="w-full h-9 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition flex items-center justify-center gap-2">
                <XCircle className="h-4 w-4" /> Reject Application
              </button>
              <button className="w-full h-9 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> Download Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 3 — ROOM ALLOCATION
═══════════════════════════════════════════════════════ */
function ScreenRooms() {
  const [hostel, setHostel] = useState(HOSTELS[0]);
  const [floor, setFloor] = useState(1);

  const ROOMS = Array.from({ length: 20 }, (_, i) => {
    const n = (floor - 1) * 20 + i + 1;
    const status = i < 14 ? "occupied" : i < 17 ? "available" : i === 17 ? "maintenance" : "reserved";
    const occupants = status === "occupied" ? [`Athlete ${n}A`, n % 2 === 0 ? `Athlete ${n}B` : ""][0] : null;
    return { room: `${floor}0${String(i+1).padStart(2,"0")}`, status, occupants, type: i < 10 ? "Double" : "Single" };
  });

  const statusStyle: Record<string,string> = {
    occupied:    "bg-[#1e3a5f] text-white",
    available:   "bg-emerald-50 text-emerald-700 border-2 border-emerald-200 border-dashed",
    maintenance: "bg-amber-50 text-amber-600 border border-amber-200",
    reserved:    "bg-purple-50 text-purple-700 border border-purple-200",
  };
  const LEGEND = [["occupied","Occupied","bg-[#1e3a5f]"],["available","Available","bg-emerald-400"],["maintenance","Maintenance","bg-amber-400"],["reserved","Reserved","bg-purple-400"]];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Room Allocation</h1>
          <p className="text-xs text-gray-400 mt-0.5">Visual floor plan — click a room to manage</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: ACCENT }}>
          <Plus className="h-4 w-4" /> Assign Room
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <select value={hostel} onChange={e => setHostel(e.target.value)}
          className="h-9 px-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white outline-none font-medium min-w-[220px]">
          {HOSTELS.map(h => <option key={h}>{h}</option>)}
        </select>
        <div className="flex gap-1">
          {[1,2,3,4].map(f => (
            <button key={f} onClick={() => setFloor(f)}
              className={`h-9 w-9 rounded-xl text-sm font-bold transition ${floor === f ? "text-white" : "border border-gray-200 text-gray-600 hover:border-blue-400"}`}
              style={floor === f ? { background: PRIMARY } : {}}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 ml-auto">
          {LEGEND.map(([,label,cls]) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-gray-600">
              <div className={`h-3 w-3 rounded ${cls}`} />{label}
            </div>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-4">
        {[["Total Rooms","20",Building2,"#1e3a5f"],["Occupied","14",Users,"#059669"],["Available","3",BedDouble,"#f97316"],["Maintenance","3",Wrench,"#dc2626"]].map(([label,val,Ic,color]) => (
          <div key={label as string} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${color as string}15` }}>
              <DynIcon icon={Ic as React.ElementType} className="h-5 w-5" style={{ color: color as string }} />
            </div>
            <div>
              <div className="text-xl font-black text-gray-900">{val as string}</div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{label as string}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Room grid */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-700 text-sm mb-4">Floor {floor} — Room Map</h3>
        <div className="grid grid-cols-5 gap-3">
          {ROOMS.map((r, i) => (
            <button key={i} className={`p-3 rounded-xl text-left transition hover:scale-105 ${statusStyle[r.status]}`}>
              <div className="font-black text-sm">{r.room}</div>
              <div className={`text-[10px] mt-1 ${r.status === "occupied" ? "text-white/70" : "text-current opacity-70"}`}>{r.type}</div>
              {r.occupants && <div className={`text-[10px] mt-1 truncate font-medium ${r.status === "occupied" ? "text-white/80" : ""}`}>{r.occupants}</div>}
              {r.status === "available" && <div className="text-[10px] mt-1 font-bold">Click to assign</div>}
              {r.status === "maintenance" && <div className="text-[10px] mt-1 font-bold">Under repair</div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 4 — OCCUPANCY TRACKING
═══════════════════════════════════════════════════════ */
function ScreenOccupancy() {
  const DATA = [
    { hostel:"Shiv Chhatrapati, Pune",  total:120, occupied:108, males:72, females:36, sports:["Athletics","Football","Wrestling"] },
    { hostel:"Balewadi Hostel, Pune",   total:80,  occupied:62,  males:40, females:22, sports:["Swimming","Badminton"] },
    { hostel:"Nagpur Sports Hostel",    total:60,  occupied:55,  males:38, females:17, sports:["Kabaddi","Boxing"] },
    { hostel:"Nashik Hostel",           total:50,  occupied:38,  males:24, females:14, sports:["Athletics","Cricket"] },
    { hostel:"Kolhapur Hostel",         total:40,  occupied:28,  males:28, females:0,  sports:["Wrestling"] },
    { hostel:"Aurangabad Hostel",       total:30,  occupied:18,  males:12, females:6,  sports:["Badminton","Kabaddi"] },
  ];

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-xl font-black text-gray-900">Occupancy Tracking</h1>
      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="Total Capacity"  value="380" sub="All hostels"        icon={Building2} color={PRIMARY}   />
        <KpiCard label="Total Occupied"  value="309" sub="81.3% overall rate" icon={Users}     color="#059669"  trend="up" />
        <KpiCard label="Vacancies"       value="71"  sub="Across 6 hostels"   icon={BedDouble} color={ACCENT}   />
      </div>
      <div className="space-y-4">
        {DATA.map((h, i) => {
          const pct = Math.round((h.occupied / h.total) * 100);
          const vacancies = h.total - h.occupied;
          return (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-bold text-gray-900">{h.hostel}</div>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    {h.sports.map(s => <span key={s} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{s}</span>)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black" style={{ color: pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#059669" }}>{pct}%</div>
                  <div className="text-xs text-gray-400">{h.occupied}/{h.total} beds</div>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 90 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#059669" }} />
              </div>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[["Male",h.males,"#1e3a5f"],["Female",h.females,"#7c3aed"],["Vacant",vacancies,"#059669"],["Capacity",h.total,"#6b7280"]].map(([l,v,c]) => (
                  <div key={l as string} className="rounded-xl py-2" style={{ background: `${c as string}08` }}>
                    <div className="text-lg font-black" style={{ color: c as string }}>{v as number}</div>
                    <div className="text-[10px] text-gray-400 font-semibold">{l as string}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 5 — ATTENDANCE MANAGEMENT
═══════════════════════════════════════════════════════ */
function ScreenAttendance() {
  const today = new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
  const ATHLETES = [
    { name:"Arjun Deshmukh",  sport:"Athletics", room:"101", checkIn:"06:12 AM", checkOut:"", status:"Present"  },
    { name:"Priya Jadhav",    sport:"Swimming",  room:"102", checkIn:"05:45 AM", checkOut:"", status:"Present"  },
    { name:"Ravi Bhosale",    sport:"Wrestling", room:"203", checkIn:"",         checkOut:"", status:"Absent"   },
    { name:"Sneha Kulkarni",  sport:"Badminton", room:"104", checkIn:"07:00 AM", checkOut:"", status:"Present"  },
    { name:"Omkar Shinde",    sport:"Boxing",    room:"301", checkIn:"",         checkOut:"", status:"On Leave" },
    { name:"Kavita Patil",    sport:"Athletics", room:"105", checkIn:"06:30 AM", checkOut:"06:00 PM", status:"Present" },
    { name:"Rahul Khedkar",   sport:"Wrestling", room:"206", checkIn:"",         checkOut:"", status:"Absent"   },
    { name:"Sonal More",      sport:"Badminton", room:"107", checkIn:"06:55 AM", checkOut:"", status:"Present"  },
  ];
  const statusColor: Record<string,string> = { Present: "green", Absent: "red", "On Leave": "blue", Late: "amber" };
  const present = ATHLETES.filter(a => a.status === "Present").length;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Attendance Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">{today}</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{ background: PRIMARY }}>
            <RefreshCw className="h-3.5 w-3.5" /> Mark Bulk
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[["Present",present,"#059669",CheckCircle],["Absent",2,"#dc2626",XCircle],["On Leave",1,"#3b82f6",Clock],["Attendance %",`${Math.round(present/ATHLETES.length*100)}%`,"#f97316",Activity]].map(([l,v,c,Ic]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl grid place-items-center shrink-0" style={{ background: `${c as string}15` }}>
              <DynIcon icon={Ic as React.ElementType} className="h-5 w-5" style={{ color: c as string }} />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">{v as string | number}</div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{l as string}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <SearchBar value="" onChange={() => {}} placeholder="Search resident…" />
        <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
          <option>All Hostels</option>
          {HOSTELS.map(h => <option key={h}>{h}</option>)}
        </select>
        <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
          <option>All Status</option>
          {["Present","Absent","On Leave","Late"].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <TableWrap heads={["Resident","Sport","Room","Check-In","Check-Out","Status","Action"]}>
        {ATHLETES.map((a, i) => (
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-5 py-3.5 font-semibold text-gray-800 text-xs">{a.name}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500">{a.sport}</td>
            <td className="px-5 py-3.5 text-xs font-mono text-gray-600">Room {a.room}</td>
            <td className="px-5 py-3.5 text-xs text-gray-600">{a.checkIn || <span className="text-gray-300">—</span>}</td>
            <td className="px-5 py-3.5 text-xs text-gray-600">{a.checkOut || <span className="text-gray-300">—</span>}</td>
            <td className="px-5 py-3.5"><Badge label={a.status} color={statusColor[a.status]} /></td>
            <td className="px-5 py-3.5">
              <div className="flex gap-1.5">
                {a.status === "Absent" && <button className="h-6 px-2 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 hover:bg-emerald-100 transition">Mark Present</button>}
                <button className="h-6 px-2 rounded-lg bg-gray-50 text-gray-500 text-[10px] font-bold border border-gray-200 hover:bg-gray-100 transition">Edit</button>
              </div>
            </td>
          </tr>
        ))}
      </TableWrap>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 6 — RESIDENTS RECORDS
═══════════════════════════════════════════════════════ */
function ScreenResidents() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number|null>(null);
  const RESIDENTS = [
    { id:"RES-001", name:"Arjun Deshmukh",  sport:"Athletics", hostel:"Shiv Chhatrapati", room:"101", district:"Pune",     since:"01 Apr 2027", status:"Active",   dob:"14 Mar 2009", phone:"9876543210", parent:"Suresh Deshmukh", blood:"O+", medical:"Cleared" },
    { id:"RES-002", name:"Priya Jadhav",    sport:"Swimming",  hostel:"Balewadi",          room:"204", district:"Nashik",   since:"15 Mar 2027", status:"Active",   dob:"22 Jun 2008", phone:"9765432109", parent:"Rajesh Jadhav",   blood:"A+", medical:"Cleared" },
    { id:"RES-003", name:"Ravi Bhosale",    sport:"Wrestling", hostel:"Kolhapur",          room:"105", district:"Kolhapur", since:"10 Jan 2027", status:"Active",   dob:"05 Jan 2007", phone:"9654321098", parent:"Ganesh Bhosale",  blood:"B+", medical:"Pending" },
    { id:"RES-004", name:"Omkar Shinde",    sport:"Boxing",    hostel:"Nagpur",            room:"302", district:"Nagpur",   since:"20 Feb 2027", status:"On Leave", dob:"30 Nov 2006", phone:"9543210987", parent:"Dilip Shinde",    blood:"AB+",medical:"Cleared" },
    { id:"RES-005", name:"Kavita Patil",    sport:"Athletics", hostel:"Shiv Chhatrapati", room:"103", district:"Pune",     since:"01 Apr 2027", status:"Active",   dob:"18 Feb 2009", phone:"9432109876", parent:"Deepak Patil",    blood:"O-", medical:"Cleared" },
  ];
  const filtered = RESIDENTS.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()));
  const res = selected !== null ? RESIDENTS[selected] : null;

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-900">Residents Records</h1>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: PRIMARY }}>
            <Download className="h-4 w-4" /> Export Records
          </button>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID…" />
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs bg-white outline-none text-gray-600">
            <option>All Hostels</option>
            {HOSTELS.map(h => <option key={h}>{h}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs bg-white outline-none text-gray-600">
            <option>All Sports</option>
            {SPORTS.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs bg-white outline-none text-gray-600">
            <option>All Status</option>
            <option>Active</option><option>On Leave</option><option>Vacated</option>
          </select>
        </div>
        <TableWrap heads={["ID","Resident","Sport","Hostel","Room","District","Since","Status","Action"]}>
          {filtered.map((r, i) => (
            <tr key={i} onClick={() => setSelected(RESIDENTS.indexOf(r))} className={`cursor-pointer transition ${selected === RESIDENTS.indexOf(r) ? "bg-blue-50" : "hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[11px] text-gray-400">{r.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{r.name}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{r.sport}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{r.hostel}</td>
              <td className="px-5 py-3.5 text-xs font-mono text-gray-600">{r.room}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{r.district}</td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{r.since}</td>
              <td className="px-5 py-3.5"><Badge label={r.status} color={r.status==="Active"?"green":"blue"} /></td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1.5">
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"><Eye className="h-3.5 w-3.5" /></button>
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 hover:border-amber-300 transition"><Edit3 className="h-3.5 w-3.5" /></button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {res && (
        <div className="w-72 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Profile</span>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5">
            <div className="h-16 w-16 rounded-2xl grid place-items-center text-white font-black text-2xl mx-auto mb-3" style={{ background: PRIMARY }}>
              {res.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="text-center mb-4">
              <div className="font-black text-gray-900 text-base">{res.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{res.sport} · {res.district}</div>
              <div className="mt-2"><Badge label={res.status} color={res.status==="Active"?"green":"blue"} /></div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Resident ID",res.id],["Date of Birth",res.dob],["Phone",res.phone],["Parent/Guardian",res.parent],["Blood Group",res.blood],["Medical Status",res.medical],["Hostel",res.hostel],["Room No.",res.room],["Stay Since",res.since]].map(([k,v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700 text-right max-w-[55%] truncate">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Download className="h-3.5 w-3.5" /> Download Profile
              </button>
              <button className="w-full h-8 rounded-xl border border-amber-200 text-xs font-bold text-amber-700 hover:bg-amber-50 flex items-center justify-center gap-2 transition">
                <Edit3 className="h-3.5 w-3.5" /> Edit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 7 — FACILITIES MANAGEMENT
═══════════════════════════════════════════════════════ */
function ScreenFacilities() {
  const [active, setActive] = useState<number|null>(null);
  const FACILITIES = [
    { name:"Mess / Dining Hall",       icon:"🍽️", status:"Operational", capacity:"150",   next:"Dinner: 7:00 PM",       issues:0 },
    { name:"Gymnasium",                icon:"💪", status:"Operational", capacity:"40",    next:"Open till 9:00 PM",     issues:1 },
    { name:"Medical Room",             icon:"🏥", status:"Operational", capacity:"5",     next:"Dr. Sharma: 10AM–2PM",  issues:0 },
    { name:"Study / Reading Room",     icon:"📚", status:"Operational", capacity:"30",    next:"Open 6AM–10PM",         issues:0 },
    { name:"Laundry",                  icon:"👕", status:"Maintenance", capacity:"20",    next:"Back online: 3 Jul",    issues:2 },
    { name:"Sports Equipment Store",   icon:"🏅", status:"Operational", capacity:"—",     next:"Checkout: 9AM–5PM",     issues:0 },
    { name:"CCTV & Security",          icon:"📷", status:"Partial",     capacity:"24 cam",next:"2 cameras offline",     issues:2 },
    { name:"Wi-Fi Network",            icon:"📶", status:"Operational", capacity:"All rooms",next:"Speed: 100 Mbps",    issues:0 },
  ];
  const REQUESTS = [
    { id:"MR-041", facility:"Gymnasium",  issue:"AC not working in weights area", raised:"2 days ago", priority:"High",   status:"In Progress" },
    { id:"MR-040", facility:"Laundry",    issue:"Washing machine #2 broken",       raised:"3 days ago", priority:"High",   status:"Pending"     },
    { id:"MR-039", facility:"CCTV",       issue:"Camera near Gate 2 offline",      raised:"4 days ago", priority:"Medium", status:"Pending"     },
    { id:"MR-038", facility:"Mess",       issue:"Water heater leaking",            raised:"5 days ago", priority:"Low",    status:"Resolved"    },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">Facilities Management</h1>
        <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: ACCENT }}>
          <Plus className="h-4 w-4" /> Log Maintenance Request
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[["Total Facilities","8",Building2,PRIMARY],["Operational","6",CheckCircle,"#059669"],["Under Maintenance","1",Wrench,ACCENT],["Open Issues","5",AlertTriangle,"#dc2626"]].map(([l,v,Ic,c]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${c as string}15` }}>
              <DynIcon icon={Ic as React.ElementType} className="h-5 w-5" style={{ color: c as string }} />
            </div>
            <div>
              <div className="text-xl font-black text-gray-900">{v as string}</div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{l as string}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {FACILITIES.map((f, i) => (
          <div key={i} onClick={() => setActive(active === i ? null : i)}
            className={`bg-white rounded-2xl border shadow-sm p-5 cursor-pointer transition ${active === i ? "border-blue-300 ring-2 ring-blue-100" : "border-gray-100 hover:border-gray-200"}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{f.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-gray-800 text-sm">{f.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">Capacity: {f.capacity}</div>
              </div>
              <Badge label={f.status} color={f.status === "Operational" ? "green" : f.status === "Maintenance" ? "amber" : "blue"} />
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{f.next}</div>
            {f.issues > 0 && <div className="mt-2 text-xs text-red-600 font-semibold flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" />{f.issues} open issue{f.issues > 1 ? "s" : ""}</div>}
          </div>
        ))}
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionHeader title="Maintenance Requests" />
        <TableWrap heads={["Request ID","Facility","Issue","Raised","Priority","Status","Action"]}>
          {REQUESTS.map((r, i) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3.5 font-mono text-[11px] text-gray-400">{r.id}</td>
              <td className="px-5 py-3.5 text-xs font-semibold text-gray-700">{r.facility}</td>
              <td className="px-5 py-3.5 text-xs text-gray-600 max-w-[200px]">{r.issue}</td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{r.raised}</td>
              <td className="px-5 py-3.5"><Badge label={r.priority} color={r.priority==="High"?"red":r.priority==="Medium"?"amber":"gray"} /></td>
              <td className="px-5 py-3.5"><Badge label={r.status} color={r.status==="Resolved"?"green":r.status==="In Progress"?"blue":"amber"} /></td>
              <td className="px-5 py-3.5">
                <button className="h-6 px-2 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition">Update</button>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 8 — GRIEVANCE MANAGEMENT
═══════════════════════════════════════════════════════ */
function ScreenGrievances() {
  const [selected, setSelected] = useState<number|null>(null);
  const GRIEVANCES = [
    { id:"GRV-041", resident:"Arjun Deshmukh",  type:"Mess / Food",        desc:"Unhygienic food served on 28 Jun. Found insects in dal.",              date:"29 Jun 2027", priority:"High",   status:"Under Review", assigned:"Mess Manager"    },
    { id:"GRV-040", resident:"Priya Jadhav",    type:"Room / Facility",    desc:"Bathroom tap broken in Room 204. Water leaking continuously.",          date:"27 Jun 2027", priority:"Medium", status:"In Progress",  assigned:"Maintenance Team" },
    { id:"GRV-039", resident:"Ravi Bhosale",    type:"Behaviour / Ragging",desc:"Being harassed by senior residents in Block B.",                       date:"25 Jun 2027", priority:"High",   status:"Escalated",    assigned:"Hostel Warden"   },
    { id:"GRV-038", resident:"Sneha Kulkarni",  type:"Medical",            desc:"Requested medical attention for knee injury but no doctor available.", date:"24 Jun 2027", priority:"High",   status:"Resolved",     assigned:"Medical Officer" },
    { id:"GRV-037", resident:"Omkar Shinde",    type:"Internet / Wi-Fi",   desc:"No Wi-Fi signal in Block C rooms for last 3 days.",                    date:"22 Jun 2027", priority:"Low",    status:"Resolved",     assigned:"IT Team"         },
  ];
  const g = selected !== null ? GRIEVANCES[selected] : null;
  const statusColor: Record<string,string> = { "Under Review":"amber", "In Progress":"blue", "Escalated":"red", "Resolved":"green" };
  const STATS = [["Total",GRIEVANCES.length,"#1e3a5f"],["Open",3,"#f97316"],["Resolved",2,"#059669"],["Escalated",1,"#dc2626"]];

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-900">Grievance Management</h1>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: PRIMARY }}>
            <Plus className="h-4 w-4" /> New Grievance
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {STATS.map(([l,v,c]) => (
            <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <div className="text-2xl font-black" style={{ color: c as string }}>{v as number}</div>
              <div className="text-[10px] text-gray-400 font-semibold mt-1 uppercase tracking-wider">{l as string}</div>
            </div>
          ))}
        </div>
        <TableWrap heads={["ID","Resident","Type","Date","Priority","Status","Assigned","Action"]}>
          {GRIEVANCES.map((g, i) => (
            <tr key={i} onClick={() => setSelected(i)} className={`cursor-pointer transition ${selected === i ? "bg-blue-50" : "hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[11px] text-gray-400">{g.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{g.resident}</td>
              <td className="px-5 py-3.5 text-xs text-gray-600">{g.type}</td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{g.date}</td>
              <td className="px-5 py-3.5"><Badge label={g.priority} color={g.priority==="High"?"red":g.priority==="Medium"?"amber":"gray"} /></td>
              <td className="px-5 py-3.5"><Badge label={g.status} color={statusColor[g.status]} /></td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{g.assigned}</td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1.5">
                  <button className="h-6 px-2 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition">Resolve</button>
                  <button className="h-6 px-2 rounded-lg border border-red-200 text-[10px] font-bold text-red-600 hover:bg-red-50 transition">Escalate</button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {g && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">{g.id}</span>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge label={g.status} color={statusColor[g.status]} />
              <Badge label={g.priority + " Priority"} color={g.priority==="High"?"red":"amber"} />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Resident</div>
              <div className="font-bold text-gray-800">{g.resident}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Type</div>
              <div className="text-sm text-gray-700">{g.type}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Description</div>
              <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3">{g.desc}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Assigned To</div>
              <div className="text-sm font-semibold text-gray-700">{g.assigned}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Add Response</div>
              <textarea rows={3} placeholder="Type resolution notes…" className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs outline-none focus:border-blue-400 transition" />
            </div>
            <div className="space-y-2">
              <button className="w-full h-9 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition">Mark as Resolved</button>
              <button className="w-full h-9 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition">Escalate to Authority</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 9 — ASSETS MANAGEMENT
═══════════════════════════════════════════════════════ */
function ScreenAssets() {
  const [cat, setCat] = useState("All");
  const CATS = ["All","Furniture","Sports Equipment","Electronics","Kitchen","Medical","Security"];
  const ASSETS = [
    { id:"AST-001", name:"Steel Beds (Double)",         cat:"Furniture",        qty:80,  good:74, damaged:6,  hostel:"Shiv Chhatrapati", value:"₹3,20,000" },
    { id:"AST-002", name:"Study Tables",                cat:"Furniture",        qty:120, good:118,damaged:2,  hostel:"All Hostels",       value:"₹1,80,000" },
    { id:"AST-003", name:"Treadmills",                  cat:"Sports Equipment", qty:8,   good:7,  damaged:1,  hostel:"Balewadi",          value:"₹6,40,000" },
    { id:"AST-004", name:"Weight Training Equipment",   cat:"Sports Equipment", qty:1,   good:1,  damaged:0,  hostel:"Balewadi",          value:"₹2,50,000" },
    { id:"AST-005", name:"CCTV Cameras (IP)",           cat:"Electronics",      qty:24,  good:22, damaged:2,  hostel:"All Hostels",       value:"₹3,60,000" },
    { id:"AST-006", name:"Desktop Computers",           cat:"Electronics",      qty:10,  good:9,  damaged:1,  hostel:"Nagpur",            value:"₹4,50,000" },
    { id:"AST-007", name:"Industrial Washing Machine",  cat:"Kitchen",          qty:4,   good:3,  damaged:1,  hostel:"All Hostels",       value:"₹2,00,000" },
    { id:"AST-008", name:"First Aid Kits",              cat:"Medical",          qty:12,  good:12, damaged:0,  hostel:"All Hostels",       value:"₹24,000"   },
  ];
  const filtered = ASSETS.filter(a => cat === "All" || a.cat === cat);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">Assets Management</h1>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition"><Download className="h-3.5 w-3.5" />Export</button>
          <button className="h-9 px-4 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition" style={{ background: PRIMARY }}><Plus className="h-3.5 w-3.5" />Add Asset</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[["Total Items","377",Package,PRIMARY],["Good Condition","369",CheckCircle,"#059669"],["Damaged","13",AlertTriangle,ACCENT],["Total Value","₹24.2L",Star,"#7c3aed"]].map(([l,v,Ic,c]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${c as string}15` }}>
              <DynIcon icon={Ic as React.ElementType} className="h-5 w-5" style={{ color: c as string }} />
            </div>
            <div>
              <div className="text-xl font-black text-gray-900">{v as string}</div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{l as string}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`h-8 px-4 rounded-full text-xs font-bold transition ${cat === c ? "text-white" : "border border-gray-200 text-gray-600 hover:border-blue-300"}`}
            style={cat === c ? { background: PRIMARY } : {}}>
            {c}
          </button>
        ))}
      </div>

      <TableWrap heads={["Asset ID","Item Name","Category","Total Qty","Good","Damaged","Hostel","Est. Value","Action"]}>
        {filtered.map((a, i) => (
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-5 py-3.5 font-mono text-[11px] text-gray-400">{a.id}</td>
            <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{a.name}</td>
            <td className="px-5 py-3.5"><Badge label={a.cat} color="blue" /></td>
            <td className="px-5 py-3.5 text-xs font-black text-gray-800">{a.qty}</td>
            <td className="px-5 py-3.5 text-xs font-bold text-emerald-600">{a.good}</td>
            <td className="px-5 py-3.5 text-xs font-bold text-red-500">{a.damaged}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500">{a.hostel}</td>
            <td className="px-5 py-3.5 text-xs font-semibold text-gray-700">{a.value}</td>
            <td className="px-5 py-3.5">
              <div className="flex gap-1.5">
                <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"><Edit3 className="h-3.5 w-3.5" /></button>
                <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-red-500 hover:border-red-300 transition"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </td>
          </tr>
        ))}
      </TableWrap>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 10 — REPORTS CENTRE
═══════════════════════════════════════════════════════ */
function ScreenReports() {
  const [activeReport, setActiveReport] = useState("occupancy");
  const REPORT_CATS = [
    { id:"occupancy",   label:"Occupancy Reports"   },
    { id:"utilization", label:"Utilization Reports"  },
    { id:"admissions",  label:"Admissions Reports"   },
    { id:"attendance",  label:"Attendance Reports"   },
    { id:"grievances",  label:"Grievance Reports"    },
    { id:"assets",      label:"Asset Reports"        },
    { id:"financial",   label:"Financial Reports"    },
  ];
  const BAR = [
    { label:"Shiv Chhatrapati", val:90 },
    { label:"Balewadi",         val:78 },
    { label:"Nagpur",           val:92 },
    { label:"Nashik",           val:76 },
    { label:"Kolhapur",         val:70 },
    { label:"Aurangabad",       val:60 },
  ];

  return (
    <div className="p-6 flex gap-5">
      <div className="w-52 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="font-bold text-gray-800 text-sm">Report Categories</div>
        </div>
        <div className="py-2">
          {REPORT_CATS.map(c => (
            <button key={c.id} onClick={() => setActiveReport(c.id)}
              className={`w-full text-left px-4 py-3 text-xs font-semibold transition ${activeReport === c.id ? "text-white" : "text-gray-600 hover:bg-gray-50"}`}
              style={activeReport === c.id ? { background: PRIMARY } : {}}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900 text-base capitalize">
              {REPORT_CATS.find(r => r.id === activeReport)?.label}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">All hostels · June 2027</p>
          </div>
          <div className="flex gap-2">
            <select className="h-8 px-3 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white outline-none"><option>June 2027</option></select>
            <select className="h-8 px-3 rounded-lg border border-gray-200 text-xs text-gray-600 bg-white outline-none"><option>All Hostels</option></select>
            <button className="h-8 px-3 rounded-lg text-white text-xs font-bold hover:opacity-90 transition" style={{ background: PRIMARY }}>Generate</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[["Avg Occupancy","81.3%","#059669",TrendingUp],["Total Residents","253","#1e3a5f",Users],["New Admissions","28","#f97316",ClipboardList],["Vacated","6","#dc2626",LogOut]].map(([l,v,c,Ic]) => (
            <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${c as string}15` }}>
                <DynIcon icon={Ic as React.ElementType} className="h-5 w-5" style={{ color: c as string }} />
              </div>
              <div>
                <div className="text-xl font-black text-gray-900">{v as string}</div>
                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{l as string}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 text-sm mb-5">Occupancy Rate by Hostel (%)</h3>
          <div className="space-y-3">
            {BAR.map(d => (
              <div key={d.label} className="flex items-center gap-4">
                <div className="w-36 text-xs font-semibold text-gray-600 text-right shrink-0">{d.label}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden">
                  <div className="h-full rounded-full flex items-center pl-3 text-white text-xs font-bold transition-all duration-700"
                    style={{ width: `${d.val}%`, background: d.val >= 90 ? "#ef4444" : d.val >= 75 ? PRIMARY : "#059669" }}>
                    {d.val}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-sm">Month-wise Occupancy Summary</h3>
          </div>
          <TableWrap heads={["Month","Avg Occupancy","Admissions","Vacated","Grievances","Utilization %"]}>
            {[["April 2027","78%","45","12","8","78%"],["May 2027","80%","38","9","6","80%"],["June 2027","84%","28","6","7","84%"]].map(([m,...vals]) => (
              <tr key={m} className="hover:bg-gray-50">
                <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{m}</td>
                {vals.map((v, i) => <td key={i} className="px-5 py-3.5 text-xs text-gray-600 font-semibold">{v}</td>)}
              </tr>
            ))}
          </TableWrap>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex gap-3 sticky bottom-0 shadow-lg">
          {[["Download PDF",Download],["Download Excel",Download],["Email Report",Mail],["Schedule Auto-Send",Send]].map(([l,Ic]) => (
            <button key={l as string} className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 flex items-center gap-1.5 hover:border-blue-400 hover:text-blue-600 transition">
              <DynIcon icon={Ic as React.ElementType} className="h-3.5 w-3.5" />{l as string}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 11 — HOSTEL REGISTRATION
═══════════════════════════════════════════════════════ */
function ScreenHostelRegistration() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name:"", code:"", type:"Male", division:"Pune", district:"", city:"", address:"", pincode:"",
    totalRooms:"", bedsPerRoom:"2", totalCapacity:"",
    wardenName:"", wardenPhone:"", wardenEmail:"", adminContact:"",
    sports:[] as string[], facilities:[] as string[],
    estYear:"", govtOrderNo:"", remarks:"",
  });
  const [submitted, setSubmitted] = useState(false);

  const upd = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (k: "sports"|"facilities", v: string) =>
    setForm(f => ({ ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v] }));

  const DIVISIONS_MAP: Record<string,string[]> = {
    Pune:        ["Pune","Solapur","Satara","Sangli","Kolhapur"],
    Nashik:      ["Nashik","Ahmednagar","Dhule","Nandurbar","Jalgaon"],
    Nagpur:      ["Nagpur","Wardha","Yavatmal","Chandrapur","Gadchiroli","Gondia","Bhandara"],
    Aurangabad:  ["Aurangabad","Jalna","Beed","Osmanabad","Nanded","Parbhani","Hingoli","Latur"],
    Amravati:    ["Amravati","Akola","Buldhana","Washim","Yavatmal"],
    Konkan:      ["Raigad","Ratnagiri","Sindhudurg","Thane","Mumbai City","Mumbai Suburban"],
  };
  const FACILITY_LIST = ["Mess / Dining","Gymnasium","Medical Room","Study Room","Laundry","CCTV Security","Wi-Fi","Sports Equipment Store","Physiotherapy","Swimming Pool"];
  const STEPS = ["Basic Info","Capacity & Location","Sports & Facilities","Staff & Contacts","Review & Submit"];

  const totalCap = form.totalRooms && form.bedsPerRoom
    ? String(Number(form.totalRooms) * Number(form.bedsPerRoom)) : "";

  if (submitted) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="h-20 w-20 rounded-full bg-emerald-100 grid place-items-center mx-auto mb-5">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Hostel Registered!</h2>
          <p className="text-sm text-gray-500 mb-1">Hostel <span className="font-bold text-gray-700">"{form.name}"</span> has been added to the Maharashtra Sports Hostel network.</p>
          <p className="text-xs text-gray-400 mb-6">Hostel Code: <span className="font-mono font-bold text-gray-600">{form.code || "H011"}</span> · Status: <span className="text-amber-600 font-bold">Pending Verification</span></p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setSubmitted(false); setStep(1); setForm(f => ({ ...f, name:"", code:"" })); }}
              className="h-10 px-6 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition">Add Another</button>
            <button className="h-10 px-6 rounded-xl text-white text-sm font-bold hover:opacity-90 transition" style={{ background: PRIMARY }}>View All Hostels</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-black text-gray-900">Hostel Registration</h1>
        <p className="text-xs text-gray-400 mt-0.5">Register a new sports hostel into the Maharashtra HMS network</p>
      </div>

      {/* Step progress */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-1">
          {STEPS.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              {i < STEPS.length - 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 ${i < step - 1 ? "" : "bg-gray-200"}`}
                  style={i < step - 1 ? { background: PRIMARY } : {}} />
              )}
              <div className={`h-8 w-8 rounded-full grid place-items-center text-xs font-black z-10 transition ${i < step - 1 ? "text-white" : i === step - 1 ? "text-white ring-4 ring-blue-100" : "bg-gray-100 text-gray-400"}`}
                style={i < step ? { background: PRIMARY } : {}}>
                {i < step - 1 ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <div className={`text-[10px] font-semibold mt-1.5 text-center ${i === step - 1 ? "text-blue-700" : "text-gray-400"}`}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 — Basic Info */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-gray-800">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-500 block mb-1">Hostel Full Name *</label>
              <input value={form.name} onChange={e => upd("name", e.target.value)} placeholder="e.g. Nashik District Sports Hostel"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Hostel Code *</label>
              <input value={form.code} onChange={e => upd("code", e.target.value)} placeholder="e.g. H011"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition font-mono" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Hostel Type *</label>
              <select value={form.type} onChange={e => upd("type", e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 bg-white">
                {["Male","Female","Mixed (Co-ed)"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Division *</label>
              <select value={form.division} onChange={e => upd("division", e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 bg-white">
                {Object.keys(DIVISIONS_MAP).map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">District *</label>
              <select value={form.district} onChange={e => upd("district", e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 bg-white">
                <option value="">Select District</option>
                {(DIVISIONS_MAP[form.division] || []).map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">City / Taluka *</label>
              <input value={form.city} onChange={e => upd("city", e.target.value)} placeholder="City or Taluka"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-500 block mb-1">Full Address *</label>
              <textarea value={form.address} onChange={e => upd("address", e.target.value)} rows={2} placeholder="Street address, landmark…"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">PIN Code</label>
              <input value={form.pincode} onChange={e => upd("pincode", e.target.value)} placeholder="400001"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Establishment Year</label>
              <input value={form.estYear} onChange={e => upd("estYear", e.target.value)} placeholder="2024"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-500 block mb-1">Govt. Order / Sanction No.</label>
              <input value={form.govtOrderNo} onChange={e => upd("govtOrderNo", e.target.value)} placeholder="GO/DSYS/2024/XXX"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition font-mono" />
            </div>
          </div>
        </div>
      )}

      {/* Step 2 — Capacity */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-gray-800">Capacity Details</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Total Rooms *</label>
              <input type="number" value={form.totalRooms} onChange={e => upd("totalRooms", e.target.value)} placeholder="60"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Beds per Room *</label>
              <select value={form.bedsPerRoom} onChange={e => upd("bedsPerRoom", e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 bg-white">
                {["1","2","3","4"].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Total Capacity (auto)</label>
              <div className="h-10 px-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center text-sm font-black text-gray-700">
                {totalCap || "—"} beds
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50 text-xs text-blue-700 font-medium">
            Total capacity = Rooms × Beds per Room. You can add room-level details after registration.
          </div>
        </div>
      )}

      {/* Step 3 — Sports & Facilities */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Sports Disciplines</h3>
            <div className="flex flex-wrap gap-2">
              {[...SPORTS, "Volleyball","Gymnastics","Cycling","Shooting","Archery"].map(s => (
                <button key={s} onClick={() => toggleArr("sports", s)}
                  className={`h-8 px-3 rounded-full text-xs font-bold transition ${form.sports.includes(s) ? "text-white" : "border border-gray-200 text-gray-600 hover:border-blue-300"}`}
                  style={form.sports.includes(s) ? { background: PRIMARY } : {}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Available Facilities</h3>
            <div className="grid grid-cols-2 gap-2">
              {FACILITY_LIST.map(f => (
                <label key={f} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${form.facilities.includes(f) ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}>
                  <div className={`h-5 w-5 rounded-md border-2 grid place-items-center shrink-0 transition ${form.facilities.includes(f) ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
                    onClick={() => toggleArr("facilities", f)}>
                    {form.facilities.includes(f) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className={`text-xs font-semibold ${form.facilities.includes(f) ? "text-blue-700" : "text-gray-600"}`}>{f}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4 — Staff */}
      {step === 4 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-gray-800">Staff & Contact Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-500 block mb-1">Warden Full Name *</label>
              <input value={form.wardenName} onChange={e => upd("wardenName", e.target.value)} placeholder="e.g. Sunil Ranjit Patil"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Warden Mobile *</label>
              <input value={form.wardenPhone} onChange={e => upd("wardenPhone", e.target.value)} placeholder="98XXXXXXXX"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Warden Email</label>
              <input value={form.wardenEmail} onChange={e => upd("wardenEmail", e.target.value)} placeholder="warden@dsys.mah.gov.in"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-500 block mb-1">Admin / Office Contact</label>
              <input value={form.adminContact} onChange={e => upd("adminContact", e.target.value)} placeholder="Landline / admin phone"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-500 block mb-1">Additional Remarks</label>
              <textarea value={form.remarks} onChange={e => upd("remarks", e.target.value)} rows={3} placeholder="Any additional notes about the hostel…"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none" />
            </div>
          </div>
        </div>
      )}

      {/* Step 5 — Review */}
      {step === 5 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="font-bold text-gray-800">Review & Confirm</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[["Hostel Name",form.name||"—"],["Code",form.code||"—"],["Type",form.type],["Division",form.division],["District",form.district||"—"],["City",form.city||"—"],["Address",form.address||"—"],["PIN",form.pincode||"—"],["Total Rooms",form.totalRooms||"—"],["Beds/Room",form.bedsPerRoom],["Total Capacity",totalCap||"—"],["Warden",form.wardenName||"—"],["Warden Phone",form.wardenPhone||"—"],["Est. Year",form.estYear||"—"],["Govt. Order",form.govtOrderNo||"—"]].map(([k,v]) => (
              <div key={k} className="flex gap-3 py-2 border-b border-gray-50">
                <span className="text-gray-400 font-medium text-xs w-32 shrink-0">{k}</span>
                <span className="font-bold text-gray-800 text-xs">{v}</span>
              </div>
            ))}
          </div>
          {form.sports.length > 0 && (
            <div>
              <div className="text-xs font-bold text-gray-400 mb-2">Sports</div>
              <div className="flex flex-wrap gap-1">{form.sports.map(s => <Badge key={s} label={s} color="blue" />)}</div>
            </div>
          )}
          {form.facilities.length > 0 && (
            <div>
              <div className="text-xs font-bold text-gray-400 mb-2">Facilities</div>
              <div className="flex flex-wrap gap-1">{form.facilities.map(f => <Badge key={f} label={f} color="green" />)}</div>
            </div>
          )}
          <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-xs font-medium text-amber-700">The hostel will be added with status <strong>Pending Verification</strong>. A supervisor will review and activate it.</span>
          </div>
        </div>
      )}

      {/* Nav buttons */}
      <div className="flex items-center justify-between">
        <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
          className="h-10 px-5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>
        <div className="text-xs text-gray-400 font-medium">Step {step} of {STEPS.length}</div>
        {step < STEPS.length ? (
          <button onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
            className="h-10 px-5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition flex items-center gap-2" style={{ background: PRIMARY }}>
            Next <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={() => setSubmitted(true)}
            className="h-10 px-6 rounded-xl text-white text-sm font-bold hover:opacity-90 transition flex items-center gap-2" style={{ background: "#059669" }}>
            <CheckCircle className="h-4 w-4" /> Submit Registration
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HMS PORTAL SHELL
═══════════════════════════════════════════════════════ */
const HMS_NAV = [
  { id:"dashboard",    label:"Dashboard",          icon:LayoutDashboard, badge:2  },
  { id:"admissions",   label:"Admissions",         icon:ClipboardList,   badge:14 },
  { id:"rooms",        label:"Room Allocation",    icon:BedDouble,       badge:0  },
  { id:"occupancy",    label:"Occupancy Tracking", icon:Activity,        badge:0  },
  { id:"attendance",   label:"Attendance",         icon:CheckCircle,     badge:0  },
  { id:"residents",    label:"Residents Records",  icon:Users,           badge:0  },
  { id:"facilities",   label:"Facilities",         icon:Wrench,          badge:3  },
  { id:"grievances",   label:"Grievances",         icon:MessageSquare,   badge:7  },
  { id:"assets",       label:"Assets",             icon:Package,         badge:0  },
  { id:"reports",      label:"Reports",            icon:FileText,        badge:0  },
  { id:"hostel-reg",   label:"Add New Hostel",     icon:Plus,            badge:0  },
];

export function HMSPortal({ onBack }: { onBack: () => void }) {
  const [nav, setNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  function renderScreen() {
    switch (nav) {
      case "dashboard":  return <ScreenDashboard setNav={setNav} />;
      case "admissions": return <ScreenAdmissions />;
      case "rooms":      return <ScreenRooms />;
      case "occupancy":  return <ScreenOccupancy />;
      case "attendance": return <ScreenAttendance />;
      case "residents":  return <ScreenResidents />;
      case "facilities": return <ScreenFacilities />;
      case "grievances": return <ScreenGrievances />;
      case "assets":     return <ScreenAssets />;
      case "reports":    return <ScreenReports />;
      case "hostel-reg": return <ScreenHostelRegistration />;
      default:           return <ScreenDashboard setNav={setNav} />;
    }
  }

  const activeLabel = HMS_NAV.find(n => n.id === nav)?.label || "Dashboard";

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f6fa" }}>
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-[220px]"} shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen z-30 bg-white border-r border-gray-100 shadow-sm`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-gray-100 min-h-[64px]">
          <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0 text-white font-black text-xs" style={{ background: PRIMARY }}>
            <Home className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-black text-gray-900 text-sm leading-none">HMS Portal</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Hostel Management</div>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)} className="ml-auto text-gray-300 hover:text-gray-600 transition shrink-0">
            <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
          {HMS_NAV.map(item => (
            <button key={item.id} onClick={() => setNav(item.id)} title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all ${nav === item.id ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
              style={nav === item.id ? { background: PRIMARY } : {}}>
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="flex-1 text-left text-xs truncate">{item.label}</span>}
              {!collapsed && item.badge > 0 && (
                <span className={`h-5 min-w-5 px-1 rounded-full text-[10px] font-black grid place-items-center ${nav === item.id ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"}`}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-100">
          <button onClick={onBack} title={collapsed ? "Back to Admin" : undefined}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-xs font-semibold text-white transition hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg,#363092,#1e2a7a)" }}>
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Back to Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
          <img src={mhSeal} alt="MH Seal" className="h-8 w-auto object-contain shrink-0" />
          <div className="h-5 w-px bg-gray-200" />
          {nav !== "dashboard" && (
            <button onClick={() => setNav("dashboard")} className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition shrink-0">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          )}
          <div className="text-sm text-gray-500">
            <span className="font-black text-gray-900 cursor-pointer hover:text-blue-600 transition" onClick={() => setNav("dashboard")}>HMS Portal</span>
            <ChevronRight className="inline h-3.5 w-3.5 mx-1 text-gray-300" />
            <span className="font-semibold">{activeLabel}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {/* Live website sync indicator */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Website Sync Active
            </div>
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
              {["EN","HI","MR"].map(l => (
                <button key={l} className={`px-2 py-1 rounded text-[11px] font-bold transition ${l === "EN" ? "bg-white shadow-sm" : "text-gray-400"}`}>{l}</button>
              ))}
            </div>
            <button className="relative h-8 w-8 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-blue-400 transition">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[8px] font-black grid place-items-center">9</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full grid place-items-center text-white text-xs font-black shrink-0" style={{ background: PRIMARY }}>AP</div>
              <div>
                <div className="text-xs font-bold text-gray-800 leading-none">A. Pawar</div>
                <div className="text-[10px] font-bold" style={{ color: ACCENT }}>ADMIN</div>
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

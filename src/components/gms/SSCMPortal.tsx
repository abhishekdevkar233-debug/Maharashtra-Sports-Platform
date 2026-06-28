import React, { useState } from "react";
import {
  LayoutDashboard, Award, Users, ClipboardList, CreditCard,
  FileText, BarChart3, ChevronRight, Search, Plus, CheckCircle,
  XCircle, Clock, AlertTriangle, TrendingUp, TrendingDown,
  Eye, Edit3, Download, X, LogOut, ArrowLeft, MapPin,
  Bell, Activity, RefreshCw, Star, Shield, BookOpen,
  DollarSign, Filter, Send, Printer, QrCode, BadgeCheck,
  CalendarDays, Hash, Building2, Layers,
} from "lucide-react";
import mhSeal from "@/assets/mh-seal.png";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — exact HMS match
═══════════════════════════════════════════════════════ */
const PRIMARY = "#1e3a5f";
const ACCENT  = "#f97316";

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENT LIBRARY — mirrors HMS exactly
═══════════════════════════════════════════════════════ */
function Badge({ label, color }: { label: string; color: string }) {
  const map: Record<string, string> = {
    green:  "border border-emerald-500 text-emerald-600",
    red:    "border border-red-400 text-red-600",
    amber:  "border border-amber-400 text-amber-600",
    blue:   "border border-blue-400 text-blue-600",
    indigo: "border border-indigo-400 text-indigo-600",
    gray:   "border border-gray-400 text-gray-500",
    purple: "border border-purple-400 text-purple-600",
    navy:   "border border-[#1e3a5f]/50 text-[#1e3a5f]",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${map[color] || map.gray}`}>{label}</span>
  );
}

function KpiCard({ label, value, sub, icon: Icon, color, trend }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; trend?: "up" | "down" | "neutral";
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
  const [show, setShow] = useState(10);
  const [search, setSearch] = useState("");
  const allRows = React.Children.toArray(children);
  const cnt = allRows.length;
  const rows = allRows.slice(0, show);
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <select value={show} onChange={e => setShow(+e.target.value)}
          className="h-9 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#363092]">
          {[10, 25, 50].map(n => <option key={n} value={n}>Show {n}</option>)}
        </select>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
            className="h-9 pl-8 pr-3 w-56 rounded-xl border border-gray-200 text-xs text-gray-700 placeholder:text-gray-400 bg-white focus:outline-none focus:border-[#363092]"/>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-10 px-4 py-3"><input type="checkbox" className="rounded border-gray-300"/></th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider w-12 whitespace-nowrap">SL</th>
                {heads.map(h => <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((child, i) => {
                if (!React.isValidElement(child)) return child;
                const idx = String(i + 1).padStart(2, "0");
                const tr = child as React.ReactElement<{ children?: React.ReactNode }>;
                return React.cloneElement(tr, {}, [
                  <td key="cb" className="w-10 px-4 py-3"><input type="checkbox" className="rounded border-gray-300"/></td>,
                  <td key="sl" className="px-4 py-3 text-[10px] font-bold text-gray-400 tabular-nums">{idx}</td>,
                  ...React.Children.toArray(tr.props.children)
                ]);
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between px-1 mt-3">
        <span className="text-xs text-gray-500">Showing 1 to {Math.min(show, cnt)} of {cnt} entries</span>
        <div className="flex items-center gap-1">
          {["«", "‹", "1", "2", "›", "»"].map((l, i) => (
            <button key={i} className={`h-7 w-7 rounded-lg border text-xs font-bold transition ${l === "1" ? "border-[#363092] bg-[#363092] text-white" : "border-gray-200 text-gray-500 hover:border-[#363092] hover:text-[#363092]"}`}>{l}</button>
          ))}
        </div>
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
   MASTER DATA
═══════════════════════════════════════════════════════ */
const SCHEMES = [
  { id: "SCH-001", name: "Shiv Chhatrapati Sports Award",       type: "Award",       sport: "All",        amount: 500000, freq: "One-time",  ageMin: 18, ageMax: 40, budget: 5000000, utilized: 4000000, active: true,  beneficiaries: 8  },
  { id: "SCH-002", name: "Eklavya Sports Scholarship",          type: "Scholarship", sport: "All",        amount: 2000,  freq: "Monthly",   ageMin: 12, ageMax: 25, budget: 2400000, utilized: 1800000, active: true,  beneficiaries: 75 },
  { id: "SCH-003", name: "Sports Stipend Scheme",               type: "Stipend",     sport: "All",        amount: 5000,  freq: "Monthly",   ageMin: 14, ageMax: 30, budget: 6000000, utilized: 4200000, active: true,  beneficiaries: 70 },
  { id: "SCH-004", name: "National Games Medal Incentive",      type: "Award",       sport: "All",        amount: 200000,freq: "One-time",  ageMin: 14, ageMax: 45, budget: 3000000, utilized: 1400000, active: true,  beneficiaries: 7  },
  { id: "SCH-005", name: "Sub-Junior Talent Stipend",           type: "Stipend",     sport: "All",        amount: 1500,  freq: "Monthly",   ageMin: 10, ageMax: 14, budget: 1800000, utilized: 900000,  active: true,  beneficiaries: 50 },
  { id: "SCH-006", name: "International Achievement Award",     type: "Award",       sport: "All",        amount: 1000000,freq:"One-time",  ageMin: 14, ageMax: 45, budget: 5000000, utilized: 2500000, active: true,  beneficiaries: 3  },
  { id: "SCH-007", name: "Wrestling Excellence Scholarship",    type: "Scholarship", sport: "Wrestling",  amount: 3000,  freq: "Monthly",   ageMin: 14, ageMax: 28, budget: 720000,  utilized: 540000,  active: true,  beneficiaries: 15 },
  { id: "SCH-008", name: "Para-Sports Support Stipend",         type: "Stipend",     sport: "Para-Sports",amount: 4000,  freq: "Monthly",   ageMin: 10, ageMax: 45, budget: 960000,  utilized: 480000,  active: false, beneficiaries: 10 },
];

const BENEFICIARIES = [
  { id: "BEN-001", name: "Arjun Deshmukh",  sport: "Athletics", district: "Pune",       age: 19, scheme: "Sports Stipend Scheme",           schemeId: "SCH-003", amount: 5000,  status: "Active",   enrolled: "01 Apr 2027", bank: "SBI ****1234", disbursed: 60000  },
  { id: "BEN-002", name: "Priya Jadhav",    sport: "Swimming",  district: "Nashik",     age: 17, scheme: "Eklavya Sports Scholarship",      schemeId: "SCH-002", amount: 2000,  status: "Active",   enrolled: "15 Mar 2027", bank: "BOB ****5678", disbursed: 24000  },
  { id: "BEN-003", name: "Ravi Bhosale",    sport: "Wrestling", district: "Kolhapur",   age: 22, scheme: "Wrestling Excellence Scholarship", schemeId: "SCH-007", amount: 3000,  status: "Active",   enrolled: "10 Jan 2027", bank: "UCO ****9012", disbursed: 54000  },
  { id: "BEN-004", name: "Sneha Kulkarni",  sport: "Badminton", district: "Nashik",     age: 16, scheme: "Sub-Junior Talent Stipend",       schemeId: "SCH-005", amount: 1500,  status: "Active",   enrolled: "01 Apr 2027", bank: "PNB ****3456", disbursed: 18000  },
  { id: "BEN-005", name: "Omkar Shinde",    sport: "Boxing",    district: "Nagpur",     age: 21, scheme: "Sports Stipend Scheme",           schemeId: "SCH-003", amount: 5000,  status: "Suspended",enrolled: "20 Feb 2027", bank: "SBI ****7890", disbursed: 25000  },
  { id: "BEN-006", name: "Kavita Patil",    sport: "Athletics", district: "Pune",       age: 18, scheme: "Eklavya Sports Scholarship",      schemeId: "SCH-002", amount: 2000,  status: "Active",   enrolled: "01 Apr 2027", bank: "HDFC ****1122",disbursed: 24000  },
  { id: "BEN-007", name: "Rahul Khedkar",   sport: "Wrestling", district: "Amravati",   age: 24, scheme: "Shiv Chhatrapati Sports Award",   schemeId: "SCH-001", amount: 500000,status: "Completed",enrolled: "05 Jan 2027", bank: "SBI ****3344", disbursed: 500000 },
  { id: "BEN-008", name: "Sonal More",      sport: "Badminton", district: "Aurangabad", age: 15, scheme: "Sub-Junior Talent Stipend",       schemeId: "SCH-005", amount: 1500,  status: "Active",   enrolled: "15 Mar 2027", bank: "BOI ****5566", disbursed: 18000  },
];

const APPLICATIONS = [
  { id: "APP-2027-089", name: "Meena Raut",      sport: "Athletics", district: "Latur",     scheme: "Eklavya Sports Scholarship",  received: "Today 09:14",    status: "Pending",   docs: "Complete",        src: "website" },
  { id: "APP-2027-088", name: "Suresh Pawar",    sport: "Kabaddi",   district: "Solapur",   scheme: "Sports Stipend Scheme",       received: "Today 08:30",    status: "Pending",   docs: "Missing PAN",     src: "website" },
  { id: "APP-2027-087", name: "Diksha More",     sport: "Swimming",  district: "Pune",      scheme: "Sub-Junior Talent Stipend",   received: "Yesterday",      status: "Approved",  docs: "Complete",        src: "website" },
  { id: "APP-2027-086", name: "Ganesh Bhosle",   sport: "Boxing",    district: "Nagpur",    scheme: "Sports Stipend Scheme",       received: "Yesterday",      status: "In Review", docs: "Complete",        src: "offline" },
  { id: "APP-2027-085", name: "Anjali Shinde",   sport: "Badminton", district: "Nashik",    scheme: "Eklavya Sports Scholarship",  received: "2 days ago",     status: "Waitlist",  docs: "Complete",        src: "website" },
  { id: "APP-2027-084", name: "Rohan Kulkarni",  sport: "Football",  district: "Kolhapur",  scheme: "Sports Stipend Scheme",       received: "3 days ago",     status: "Rejected",  docs: "Incomplete",      src: "offline" },
];

const CERTIFICATES = [
  { id: "CERT-2027-0041", name: "Rahul Khedkar",   type: "Shiv Chhatrapati Awardee",  sport: "Wrestling", event: "National Wrestling Championship 2027", issued: "15 Jun 2027", status: "Issued",  qr: "QR4412A" },
  { id: "CERT-2027-0040", name: "Arjun Deshmukh",  type: "Achievement Certificate",   sport: "Athletics", event: "State Athletics Championship 2027",   issued: "10 Jun 2027", status: "Issued",  qr: "QR4411B" },
  { id: "CERT-2027-0039", name: "Priya Jadhav",    type: "Merit Certificate",         sport: "Swimming",  event: "Maharashtra Swimming Meet 2027",      issued: "05 Jun 2027", status: "Issued",  qr: "QR4410C" },
  { id: "CERT-2027-0038", name: "Ravi Bhosale",    type: "Achievement Certificate",   sport: "Wrestling", event: "National Games Trials 2027",          issued: "01 Jun 2027", status: "Issued",  qr: "QR4409D" },
  { id: "CERT-2027-0037", name: "Sneha Kulkarni",  type: "Participation Certificate", sport: "Badminton", event: "State Badminton Open 2027",           issued: "28 May 2027", status: "Issued",  qr: "QR4408E" },
  { id: "CERT-2027-0036", name: "Omkar Shinde",    type: "Achievement Certificate",   sport: "Boxing",    event: "State Boxing Open 2027",              issued: "20 May 2027", status: "Revoked", qr: "QR4407F" },
  { id: "CERT-2027-0035", name: "Kavita Patil",    type: "Participation Certificate", sport: "Athletics", event: "Inter-District Athletics 2027",       issued: "—",           status: "Draft",   qr: "—"       },
];

const PAYMENTS = [
  { id: "PAY-2027-0561", beneficiary: "Arjun Deshmukh",  scheme: "Sports Stipend",        amount: 5000,  date: "01 Jul 2027", utr: "UTR2027070101", mode: "NEFT", status: "Success" },
  { id: "PAY-2027-0560", beneficiary: "Priya Jadhav",    scheme: "Eklavya Scholarship",   amount: 2000,  date: "01 Jul 2027", utr: "UTR2027070102", mode: "NEFT", status: "Success" },
  { id: "PAY-2027-0559", beneficiary: "Ravi Bhosale",    scheme: "Wrestling Scholarship", amount: 3000,  date: "01 Jul 2027", utr: "UTR2027070103", mode: "NEFT", status: "Success" },
  { id: "PAY-2027-0558", beneficiary: "Sneha Kulkarni",  scheme: "Sub-Junior Stipend",    amount: 1500,  date: "01 Jul 2027", utr: "UTR2027070104", mode: "NEFT", status: "Pending" },
  { id: "PAY-2027-0557", beneficiary: "Kavita Patil",    scheme: "Eklavya Scholarship",   amount: 2000,  date: "01 Jul 2027", utr: "—",             mode: "NEFT", status: "Failed"  },
  { id: "PAY-2027-0556", beneficiary: "Sonal More",      scheme: "Sub-Junior Stipend",    amount: 1500,  date: "01 Jul 2027", utr: "UTR2027070106", mode: "NEFT", status: "Success" },
  { id: "PAY-2027-0555", beneficiary: "Rahul Khedkar",   scheme: "Shiv Chhatrapati Award",amount: 500000,date: "15 Jun 2027", utr: "UTR2027061501", mode: "RTGS", status: "Success" },
];

const AUDIT_LOG = [
  { action: "Application APP-2027-087 approved",      by: "Priya Kale (State Officer)", time: "Yesterday 04:12 PM", type: "approval"  },
  { action: "Certificate CERT-2027-0041 issued",      by: "Admin",                      time: "15 Jun 2027 11:00 AM",type: "cert"     },
  { action: "Payment PAY-2027-0555 of ₹5,00,000 processed", by: "Finance Officer",    time: "15 Jun 2027 10:30 AM",type: "payment"  },
  { action: "Certificate CERT-2027-0036 revoked",     by: "Admin",                      time: "18 May 2027 02:00 PM",type: "revoke"   },
  { action: "Scheme SCH-008 deactivated",             by: "Admin",                      time: "01 May 2027 09:00 AM",type: "scheme"   },
  { action: "BEN-005 Omkar Shinde stipend suspended", by: "District Officer",           time: "10 Mar 2027 03:45 PM",type: "suspend"  },
];

/* ═══════════════════════════════════════════════════════
   SCREEN 1 — DASHBOARD
═══════════════════════════════════════════════════════ */
function ScreenDashboard({ setNav }: { setNav: (n: string) => void }) {
  const totalBudget    = SCHEMES.reduce((a, s) => a + s.budget, 0);
  const totalUtilized  = SCHEMES.reduce((a, s) => a + s.utilized, 0);
  const totalBenef     = SCHEMES.reduce((a, s) => a + s.beneficiaries, 0);
  const utilizationPct = Math.round((totalUtilized / totalBudget) * 100);

  const ALERTS = [
    { msg: "14 new applications pending review — 3 overdue (>7 days)",      type: "danger"  },
    { msg: "July stipend disbursement due by 5 Jul 2027 for 210 athletes",  type: "warning" },
    { msg: "SCH-008 Para-Sports Stipend budget 50% utilized — review needed",type: "info"   },
    { msg: "2 certificates in Draft status — issue pending since 10 Jun",   type: "warning" },
  ];

  const SCHEME_UTIL = SCHEMES.filter(s => s.active).map(s => ({
    name: s.name.length > 32 ? s.name.slice(0, 32) + "…" : s.name,
    pct: Math.round((s.utilized / s.budget) * 100),
    utilized: s.utilized,
    budget: s.budget,
    type: s.type,
  }));

  const typeColor: Record<string, string> = { Scholarship: "#363092", Stipend: "#059669", Award: "#f97316" };

  return (
    <div className="p-6 space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Active Schemes"     value={SCHEMES.filter(s=>s.active).length} sub="Across all sports"        icon={Layers}       color={PRIMARY}   />
        <KpiCard label="Total Beneficiaries"value={totalBenef}                          sub="Enrolled athletes"        icon={Users}        color="#059669"   trend="up" />
        <KpiCard label="Budget Utilized"    value={`₹${(totalUtilized/10000000).toFixed(1)}Cr`} sub={`${utilizationPct}% of total budget`} icon={DollarSign} color="#7c3aed" />
        <KpiCard label="Pending Approvals"  value={APPLICATIONS.filter(a=>a.status==="Pending").length} sub="Require action"   icon={ClipboardList} color={ACCENT} trend="neutral" />
      </div>

      {/* Quick stat strip */}
      <div className="grid grid-cols-4 gap-4">
        {[["Certificates Issued", CERTIFICATES.filter(c=>c.status==="Issued").length, "#1e3a5f", Award],
          ["Payments This Month", `₹${(PAYMENTS.filter(p=>p.status==="Success").reduce((a,p)=>a+p.amount,0)/100000).toFixed(1)}L`, "#059669", CreditCard],
          ["Waitlisted",          APPLICATIONS.filter(a=>a.status==="Waitlist").length, "#f59e0b", Clock],
          ["Failed Payments",     PAYMENTS.filter(p=>p.status==="Failed").length, "#dc2626", XCircle],
        ].map(([l, v, c, Ic]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black" style={{ color: c as string }}>{v as string|number}</div>
              <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
            </div>
            <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: `${c as string}15` }}>
              <Ic className="h-5 w-5" style={{ color: c as string }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Budget utilization bars */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800">Budget Utilization — All Schemes</h2>
            <span className="text-xs text-gray-400">Overall: <span className="font-black text-gray-700">{utilizationPct}%</span></span>
          </div>
          <div className="space-y-3">
            {SCHEME_UTIL.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${typeColor[s.type]}15`, color: typeColor[s.type] }}>{s.type}</span>
                    <span className="text-xs font-semibold text-gray-700 truncate max-w-[55%]">{s.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 ml-2 shrink-0">
                    ₹{(s.utilized/100000).toFixed(1)}L / ₹{(s.budget/100000).toFixed(1)}L ·{" "}
                    <span className={`font-black ${s.pct>=90?"text-red-500":s.pct>=70?"text-amber-500":"text-emerald-600"}`}>{s.pct}%</span>
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width:`${s.pct}%`, background: s.pct>=90?"#ef4444":s.pct>=70?"#f59e0b":"#059669" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="Alerts & Reminders" />
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
            <h2 className="text-base font-bold text-gray-800">Recent Applications</h2>
            <p className="text-xs text-gray-400 mt-0.5">From public portal · /scholarships</p>
          </div>
          <button onClick={() => setNav("applications")} className="text-xs font-bold hover:underline" style={{ color: PRIMARY }}>View All →</button>
        </div>
        <TableWrap heads={["App ID","Athlete","Sport","District","Scheme","Received","Status","Action"]}>
          {APPLICATIONS.slice(0,4).map((a,i) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3 font-mono text-[10px] text-gray-400">{a.id}</td>
              <td className="px-5 py-3 font-semibold text-gray-800 text-xs">{a.name}</td>
              <td className="px-5 py-3 text-xs text-gray-500">{a.sport}</td>
              <td className="px-5 py-3 text-xs text-gray-500">{a.district}</td>
              <td className="px-5 py-3 text-xs text-gray-500 max-w-[160px] truncate">{a.scheme}</td>
              <td className="px-5 py-3 text-xs text-gray-400">{a.received}</td>
              <td className="px-5 py-3"><Badge label={a.status} color={a.status==="Approved"?"green":a.status==="Pending"?"amber":a.status==="Rejected"?"red":a.status==="In Review"?"blue":"purple"} /></td>
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
   SCREEN 2 — SCHEME MANAGEMENT
═══════════════════════════════════════════════════════ */
function ScreenSchemes() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState<number|null>(null);

  const filtered = SCHEMES.filter(s => {
    const q = search.toLowerCase();
    return (typeFilter === "All" || s.type === typeFilter) &&
           (!q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
  });
  const sch = selected !== null ? SCHEMES[selected] : null;
  const typeColor: Record<string,string> = { Scholarship:"indigo", Stipend:"green", Award:"amber" };
  const TYPES = ["All","Scholarship","Stipend","Award"];

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Scheme Management</h1>
            <p className="text-xs text-gray-400 mt-0.5">{SCHEMES.filter(s=>s.active).length} active schemes across Maharashtra</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: ACCENT }}>
            <Plus className="h-4 w-4" /> New Scheme
          </button>
        </div>

        {/* Type filter strip */}
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID…" />
          <div className="flex gap-1">
            {TYPES.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`h-7 px-3 rounded-lg text-[11px] font-bold transition ${typeFilter===t?"text-white":"border border-gray-200 text-gray-500 hover:border-blue-300"}`}
                style={typeFilter===t?{background:PRIMARY}:{}}>
                {t}
              </button>
            ))}
          </div>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none ml-auto">
            <option>All Status</option><option>Active</option><option>Inactive</option>
          </select>
          <button className="h-9 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>

        {/* Scheme cards grid */}
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((s, i) => {
            const pct = Math.round((s.utilized/s.budget)*100);
            return (
              <div key={i} onClick={() => setSelected(SCHEMES.indexOf(s))}
                className={`bg-white rounded-2xl border shadow-sm p-5 cursor-pointer transition hover:shadow-md ${selected===SCHEMES.indexOf(s)?"border-[#1e3a5f] ring-2 ring-[#1e3a5f]/10":"border-gray-100 hover:border-gray-200"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:`${s.type==="Award"?"#f97316":s.type==="Stipend"?"#059669":"#363092"}15`, color:s.type==="Award"?"#f97316":s.type==="Stipend"?"#059669":"#363092" }}>{s.type}</span>
                      <span className="font-mono text-[10px] text-gray-400">{s.id}</span>
                    </div>
                    <div className="font-bold text-gray-900 text-sm leading-tight">{s.name}</div>
                    <div className="text-[11px] text-gray-400 mt-1">{s.sport} · Age {s.ageMin}–{s.ageMax} yrs · {s.freq}</div>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <Badge label={s.active?"Active":"Inactive"} color={s.active?"green":"gray"} />
                    <div className="text-base font-black text-gray-900 mt-1">₹{s.amount.toLocaleString("en-IN")}</div>
                    <div className="text-[10px] text-gray-400">{s.freq}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                  {[["Beneficiaries",s.beneficiaries,"#1e3a5f"],["Budget",`₹${(s.budget/100000).toFixed(1)}L`,"#7c3aed"],["Utilized",`${pct}%`,pct>=90?"#ef4444":pct>=70?"#f59e0b":"#059669"]].map(([l,v,c])=>(
                    <div key={l as string} className="bg-gray-50 rounded-xl py-2">
                      <div className="text-sm font-black" style={{color:c as string}}>{v as string|number}</div>
                      <div className="text-[9px] text-gray-400 font-semibold uppercase">{l as string}</div>
                    </div>
                  ))}
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${pct}%`,background:pct>=90?"#ef4444":pct>=70?"#f59e0b":"#059669"}} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      {sch && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Scheme Details</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex flex-col gap-2 pb-4 border-b border-gray-100">
              <div className="h-12 w-12 rounded-xl grid place-items-center" style={{background:`${PRIMARY}15`}}>
                <Award className="h-6 w-6" style={{color:PRIMARY}} />
              </div>
              <div className="font-black text-gray-900">{sch.name}</div>
              <div className="flex gap-2">
                <Badge label={sch.type} color={typeColor[sch.type]} />
                <Badge label={sch.active?"Active":"Inactive"} color={sch.active?"green":"gray"} />
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Scheme ID",sch.id],["Benefit Amount",`₹${sch.amount.toLocaleString("en-IN")} ${sch.freq}`],["Sport",sch.sport],["Age Criteria",`${sch.ageMin}–${sch.ageMax} years`],["Total Budget",`₹${(sch.budget/100000).toFixed(1)}L`],["Utilized",`₹${(sch.utilized/100000).toFixed(1)}L (${Math.round(sch.utilized/sch.budget*100)}%)`],["Beneficiaries",sch.beneficiaries]].map(([k,v])=>(
                <div key={k as string} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k as string}</span>
                  <span className="font-bold text-gray-700 text-right max-w-[55%]">{String(v)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Edit3 className="h-3.5 w-3.5" /> Edit Scheme
              </button>
              <button className="w-full h-8 rounded-xl border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center justify-center gap-2 transition">
                <XCircle className="h-3.5 w-3.5" /> {sch.active?"Deactivate":"Activate"} Scheme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 3 — BENEFICIARY RECORDS
═══════════════════════════════════════════════════════ */
function ScreenBeneficiaries() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number|null>(null);
  const filtered = BENEFICIARIES.filter(b => !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()));
  const ben = selected !== null ? BENEFICIARIES[selected] : null;
  const statusColor: Record<string,string> = { Active:"green", Suspended:"red", Completed:"gray" };

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Beneficiary Records</h1>
            <p className="text-xs text-gray-400 mt-0.5">All enrolled athletes across active schemes</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:PRIMARY}}>
            <Plus className="h-4 w-4" /> Enroll Athlete
          </button>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID…" />
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Schemes</option>{SCHEMES.map(s=><option key={s.id}>{s.name}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Districts</option>{["Pune","Nashik","Nagpur","Kolhapur","Amravati","Aurangabad"].map(d=><option key={d}>{d}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Status</option><option>Active</option><option>Suspended</option><option>Completed</option>
          </select>
          <button className="ml-auto h-9 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
        <TableWrap heads={["ID","Beneficiary","Sport","District","Scheme","Monthly/Award Amt","Enrolled","Total Disbursed","Status","Action"]}>
          {filtered.map((b,i)=>(
            <tr key={i} onClick={()=>setSelected(BENEFICIARIES.indexOf(b))} className={`cursor-pointer transition ${selected===BENEFICIARIES.indexOf(b)?"bg-blue-50":"hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{b.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{b.name}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{b.sport}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{b.district}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[160px] truncate">{b.scheme}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-gray-700">₹{b.amount.toLocaleString("en-IN")}</td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{b.enrolled}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-emerald-700">₹{b.disbursed.toLocaleString("en-IN")}</td>
              <td className="px-5 py-3.5"><Badge label={b.status} color={statusColor[b.status]} /></td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1.5">
                  <button className="h-7 w-7 rounded-full border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"><Eye className="h-3.5 w-3.5" /></button>
                  <button className="h-7 w-7 rounded-full border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 hover:border-amber-300 transition"><Edit3 className="h-3.5 w-3.5" /></button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {ben && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Beneficiary Profile</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex flex-col items-center gap-2 pb-4 border-b border-gray-100">
              <div className="h-16 w-16 rounded-2xl grid place-items-center text-white font-black text-2xl" style={{background:PRIMARY}}>
                {ben.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div className="text-center">
                <div className="font-black text-gray-900">{ben.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{ben.sport} · {ben.district}</div>
                <div className="mt-2"><Badge label={ben.status} color={statusColor[ben.status]} /></div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Beneficiary ID",ben.id],["Age",`${ben.age} years`],["Scheme",ben.scheme],["Benefit",`₹${ben.amount.toLocaleString("en-IN")}`],["Enrolled On",ben.enrolled],["Bank Account",ben.bank],["Total Disbursed",`₹${ben.disbursed.toLocaleString("en-IN")}`]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700 text-right max-w-[55%] truncate">{v}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button className="w-full h-8 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 flex items-center justify-center gap-2 transition">
                <CreditCard className="h-3.5 w-3.5" /> Process Payment
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Award className="h-3.5 w-3.5" /> Issue Certificate
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
   SCREEN 4 — APPLICATIONS & APPROVALS
═══════════════════════════════════════════════════════ */
function ScreenApplications() {
  const [tab, setTab]       = useState("pending");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number|null>(null);

  const tabs = [["pending","Pending",APPLICATIONS.filter(a=>a.status==="Pending").length],["review","In Review",1],["approved","Approved",2],["waitlist","Waitlist",1],["rejected","Rejected",1]];
  const filtered = APPLICATIONS.filter(a=>{
    const matchTab    = tab==="pending"?a.status==="Pending":tab==="review"?a.status==="In Review":tab==="approved"?a.status==="Approved":tab==="waitlist"?a.status==="Waitlist":a.status==="Rejected";
    const matchSearch = !search||a.name.toLowerCase().includes(search.toLowerCase())||a.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });
  const app = selected!==null ? APPLICATIONS[selected] : null;
  const statusColor: Record<string,string> = { Pending:"amber", Approved:"green", "In Review":"blue", Waitlist:"purple", Rejected:"red" };

  return (
    <div className="p-6 flex gap-5 h-full">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Applications & Approvals</h1>
            <p className="text-xs text-gray-400 mt-0.5">Applications from public portal & offline submissions</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:PRIMARY}}>
            <Plus className="h-4 w-4" /> Manual Entry
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-200 bg-blue-50">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-semibold text-blue-700">Live sync active — new applications from <strong>/scholarships</strong> appear here automatically</span>
        </div>

        <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
          {tabs.map(([id,label,count])=>(
            <button key={id} onClick={()=>setTab(id as string)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${tab===id?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
              {label as string}
              <span className={`h-5 min-w-5 px-1 rounded-full text-[10px] font-black grid place-items-center ${tab===id?"bg-orange-500 text-white":"bg-gray-200 text-gray-500"}`}>{count as number}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID…" />
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Schemes</option>{SCHEMES.map(s=><option key={s.id}>{s.name}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Districts</option>{["Pune","Nashik","Nagpur","Latur","Solapur","Kolhapur"].map(d=><option key={d}>{d}</option>)}
          </select>
        </div>

        <TableWrap heads={["App ID","Athlete","Sport","District","Scheme","Docs","Received","Source","Status","Actions"]}>
          {filtered.map((a,i)=>(
            <tr key={i} onClick={()=>setSelected(APPLICATIONS.indexOf(a))} className={`cursor-pointer transition ${selected===APPLICATIONS.indexOf(a)?"bg-blue-50":"hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[11px] text-gray-500">{a.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{a.name}</td>
              <td className="px-5 py-3.5 text-xs text-gray-600">{a.sport}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{a.district}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[140px] truncate">{a.scheme}</td>
              <td className="px-5 py-3.5"><Badge label={a.docs==="Complete"?"✓ Complete":a.docs} color={a.docs==="Complete"?"green":"amber"} /></td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{a.received}</td>
              <td className="px-5 py-3.5"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.src==="website"?"bg-blue-50 text-blue-600 border border-blue-200":"bg-gray-100 text-gray-500"}`}>{a.src==="website"?"🌐 Website":"Offline"}</span></td>
              <td className="px-5 py-3.5"><Badge label={a.status} color={statusColor[a.status]} /></td>
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

      {app && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Application Detail</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl grid place-items-center text-white font-black text-xl shrink-0" style={{background:PRIMARY}}>
                {app.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div>
                <div className="font-black text-gray-900">{app.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{app.sport} · {app.district}</div>
                <Badge label={app.status} color={statusColor[app.status]} />
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["App ID",app.id],["Scheme Applied",app.scheme],["Documents",app.docs],["Source",app.src==="website"?"🌐 Public Portal":"Offline"],["Received",app.received]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700 text-right max-w-[55%]">{v}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button className="w-full h-9 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" /> Approve & Enroll
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
   SCREEN 5 — STIPEND DISBURSEMENT
═══════════════════════════════════════════════════════ */
function ScreenDisbursement() {
  const [processed, setProcessed] = useState(false);
  const [month] = useState("July 2027");

  const recurringBens = BENEFICIARIES.filter(b=>b.status==="Active"&&b.amount<=10000);
  const totalDisbursement = recurringBens.reduce((a,b)=>a+b.amount,0);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Stipend Disbursement</h1>
          <p className="text-xs text-gray-400 mt-0.5">Monthly payout processing — {month}</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" /> Download Register
          </button>
          {!processed ? (
            <button onClick={()=>setProcessed(true)}
              className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{background:"#059669"}}>
              <CheckCircle className="h-3.5 w-3.5" /> Process Disbursement
            </button>
          ) : (
            <div className="h-9 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" /> Disbursement Processed
            </div>
          )}
        </div>
      </div>

      {processed && (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-emerald-200 bg-emerald-50">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">Disbursement for <strong>{month}</strong> processed. {recurringBens.length} athletes · ₹{totalDisbursement.toLocaleString("en-IN")} transferred via NEFT.</span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Athletes to Pay"   value={recurringBens.length}                              sub="This cycle"          icon={Users}       color={PRIMARY}   />
        <KpiCard label="Total Payout"      value={`₹${(totalDisbursement/1000).toFixed(0)}K`}        sub="Recurring stipends"  icon={CreditCard}  color="#059669"   />
        <KpiCard label="One-time Awards"   value="2"                                                  sub="Pending this month"  icon={Award}       color={ACCENT}    />
        <KpiCard label="Failed Last Month" value={PAYMENTS.filter(p=>p.status==="Failed").length}     sub="Require retry"       icon={AlertTriangle} color="#dc2626" />
      </div>

      {/* Scheme-wise breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {SCHEMES.filter(s=>s.active&&s.freq==="Monthly").map((s,i)=>{
          const bens = BENEFICIARIES.filter(b=>b.schemeId===s.id&&b.status==="Active");
          const total = bens.reduce((a,b)=>a+b.amount,0);
          return (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="text-xs font-bold text-gray-400 mb-1 truncate">{s.name}</div>
              <div className="text-xl font-black text-gray-900">₹{total.toLocaleString("en-IN")}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{bens.length} beneficiaries · ₹{s.amount.toLocaleString("en-IN")} each</div>
              <div className="mt-2"><Badge label={processed?"Processed":"Pending"} color={processed?"green":"amber"} /></div>
            </div>
          );
        })}
      </div>

      <TableWrap heads={["ID","Beneficiary","Sport","District","Scheme","Amount","Bank Account","Status","Action"]}>
        {recurringBens.map((b,i)=>(
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{b.id}</td>
            <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{b.name}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500">{b.sport}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500">{b.district}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[130px] truncate">{b.scheme}</td>
            <td className="px-5 py-3.5 text-xs font-bold text-gray-700">₹{b.amount.toLocaleString("en-IN")}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500">{b.bank}</td>
            <td className="px-5 py-3.5"><Badge label={processed?"Processed":"Pending"} color={processed?"green":"amber"} /></td>
            <td className="px-5 py-3.5">
              <button className="h-6 px-2 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 hover:bg-blue-100 transition">Payslip</button>
            </td>
          </tr>
        ))}
      </TableWrap>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 6 — CERTIFICATE MANAGEMENT
═══════════════════════════════════════════════════════ */
function ScreenCertificates() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState<number|null>(null);

  const CERT_TYPES = ["All","Shiv Chhatrapati Awardee","Achievement Certificate","Merit Certificate","Participation Certificate"];
  const filtered = CERTIFICATES.filter(c=>{
    const q = search.toLowerCase();
    return (typeFilter==="All"||c.type===typeFilter)&&(!q||c.name.toLowerCase().includes(q)||c.id.toLowerCase().includes(q));
  });
  const cert = selected!==null ? CERTIFICATES[selected] : null;
  const statusColor: Record<string,string> = { Issued:"green", Draft:"amber", Revoked:"red" };
  const typeIcon: Record<string,string> = { "Shiv Chhatrapati Awardee":"🏆","Achievement Certificate":"🥇","Merit Certificate":"📜","Participation Certificate":"🎖️","Coaching Excellence":"⭐" };

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Certificate Management</h1>
            <p className="text-xs text-gray-400 mt-0.5">Issue, manage & verify digital certificates</p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
              <Printer className="h-3.5 w-3.5" /> Bulk Print
            </button>
            <button className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{background:ACCENT}}>
              <Plus className="h-4 w-4" /> Issue Certificate
            </button>
          </div>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-4 gap-4">
          {[["Issued",CERTIFICATES.filter(c=>c.status==="Issued").length,"#059669",BadgeCheck],["Draft",CERTIFICATES.filter(c=>c.status==="Draft").length,"#f59e0b",FileText],["Revoked",CERTIFICATES.filter(c=>c.status==="Revoked").length,"#dc2626",XCircle],["Total",CERTIFICATES.length,"#1e3a5f",Award]].map(([l,v,c,Ic])=>(
            <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{background:`${c as string}15`}}>
                <Ic className="h-5 w-5" style={{color:c as string}} />
              </div>
              <div>
                <div className="text-xl font-black" style={{color:c as string}}>{v as number}</div>
                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{l as string}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or cert ID…" />
          <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}
            className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none min-w-[200px]">
            {CERT_TYPES.map(t=><option key={t}>{t}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Status</option><option>Issued</option><option>Draft</option><option>Revoked</option>
          </select>
        </div>

        <TableWrap heads={["Cert ID","Recipient","Type","Sport","Event","Issued On","QR Code","Status","Action"]}>
          {filtered.map((c,i)=>(
            <tr key={i} onClick={()=>setSelected(CERTIFICATES.indexOf(c))} className={`cursor-pointer transition ${selected===CERTIFICATES.indexOf(c)?"bg-blue-50":"hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{c.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{c.name}</td>
              <td className="px-5 py-3.5">
                <span className="text-xs text-gray-700">{typeIcon[c.type]||"📄"} {c.type}</span>
              </td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{c.sport}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[160px] truncate">{c.event}</td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{c.issued}</td>
              <td className="px-5 py-3.5 font-mono text-[10px] text-gray-500">{c.qr}</td>
              <td className="px-5 py-3.5"><Badge label={c.status} color={statusColor[c.status]} /></td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1.5">
                  {c.status==="Draft"&&<button className="h-6 px-2 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 hover:bg-emerald-100 transition">Issue</button>}
                  {c.status==="Issued"&&<button className="h-6 px-2 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1"><Download className="h-3 w-3"/>PDF</button>}
                  {c.status==="Issued"&&<button className="h-6 px-2 rounded-lg border border-gray-200 text-[10px] font-bold text-red-500 hover:border-red-300 hover:bg-red-50 transition">Revoke</button>}
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {cert && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Certificate Preview</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5 space-y-4">
            {/* Certificate mock */}
            <div className="rounded-xl border-2 p-5 text-center space-y-2" style={{borderColor:PRIMARY,background:`${PRIMARY}05`}}>
              <div className="text-3xl">{typeIcon[cert.type]||"📄"}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Government of Maharashtra</div>
              <div className="text-[10px] font-bold text-gray-500">Directorate of Sports & Youth Services</div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="text-sm font-black text-gray-900">{cert.type}</div>
              <div className="text-xs text-gray-500 mt-1">This is to certify that</div>
              <div className="text-base font-black" style={{color:PRIMARY}}>{cert.name}</div>
              <div className="text-xs text-gray-500">has {cert.type.includes("Participation")?"participated in":"achieved distinction in"}</div>
              <div className="text-xs font-bold text-gray-700">{cert.event}</div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <span>Issued: {cert.issued}</span>
                <span className="font-mono">{cert.qr!=="—"?cert.qr:"Draft"}</span>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Certificate ID",cert.id],["Recipient",cert.name],["Sport",cert.sport],["Status",cert.status]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700">{v}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {cert.status==="Draft"&&<button className="w-full h-9 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition flex items-center justify-center gap-2"><Send className="h-4 w-4"/>Issue Now</button>}
              {cert.status==="Issued"&&<button className="w-full h-9 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center justify-center gap-2" style={{background:PRIMARY}}><Download className="h-4 w-4"/>Download PDF</button>}
              {cert.status==="Issued"&&<button className="w-full h-9 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"><QrCode className="h-4 w-4"/>Verify QR</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 7 — PAYMENTS & AUDIT TRAIL
═══════════════════════════════════════════════════════ */
function ScreenPayments() {
  const [tab, setTab] = useState("payments");
  const payStatusColor: Record<string,string> = { Success:"green", Pending:"amber", Failed:"red" };
  const auditIcon: Record<string,React.ElementType> = { approval:CheckCircle, cert:Award, payment:CreditCard, revoke:XCircle, scheme:Layers, suspend:AlertTriangle };
  const auditColor: Record<string,string> = { approval:"#059669", cert:"#f97316", payment:"#1e3a5f", revoke:"#dc2626", scheme:"#7c3aed", suspend:"#f59e0b" };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Payments & Audit Trail</h1>
          <p className="text-xs text-gray-400 mt-0.5">Full transaction history and system audit log</p>
        </div>
        <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
          <Download className="h-3.5 w-3.5" /> Export Log
        </button>
      </div>

      <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
        {[["payments","Payment Transactions"],["audit","Audit Trail"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id as string)}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition ${tab===id?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
            {label as string}
          </button>
        ))}
      </div>

      {tab==="payments" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[["Total Disbursed",`₹${(PAYMENTS.filter(p=>p.status==="Success").reduce((a,p)=>a+p.amount,0)/100000).toFixed(1)}L`,"#059669"],["Pending",PAYMENTS.filter(p=>p.status==="Pending").length,"#f59e0b"],["Failed",PAYMENTS.filter(p=>p.status==="Failed").length,"#dc2626"]].map(([l,v,c])=>(
              <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 text-center">
                <div className="text-2xl font-black" style={{color:c as string}}>{v as string|number}</div>
                <div className="text-xs font-semibold text-gray-400 mt-1">{l as string}</div>
              </div>
            ))}
          </div>
          <TableWrap heads={["Payment ID","Beneficiary","Scheme","Amount","Date","UTR / Ref","Mode","Status","Action"]}>
            {PAYMENTS.map((p,i)=>(
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{p.id}</td>
                <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{p.beneficiary}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[130px] truncate">{p.scheme}</td>
                <td className="px-5 py-3.5 text-xs font-bold text-gray-700">₹{p.amount.toLocaleString("en-IN")}</td>
                <td className="px-5 py-3.5 text-xs text-gray-400">{p.date}</td>
                <td className="px-5 py-3.5 font-mono text-[10px] text-gray-500">{p.utr}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500">{p.mode}</td>
                <td className="px-5 py-3.5"><Badge label={p.status} color={payStatusColor[p.status]} /></td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1.5">
                    {p.status==="Failed"&&<button className="h-6 px-2 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200 hover:bg-amber-100 transition">Retry</button>}
                    <button className="h-6 px-2 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition flex items-center gap-1"><Download className="h-3 w-3"/>Receipt</button>
                  </div>
                </td>
              </tr>
            ))}
          </TableWrap>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {AUDIT_LOG.map((a,i)=>{
              const Ic = auditIcon[a.type]||Activity;
              return (
                <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition">
                  <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0" style={{background:`${auditColor[a.type]}15`}}>
                    <Ic className="h-4 w-4" style={{color:auditColor[a.type]}} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-gray-800">{a.action}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">by {a.by}</div>
                  </div>
                  <div className="text-[11px] text-gray-400 shrink-0">{a.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 8 — REPORTS & ANALYTICS
═══════════════════════════════════════════════════════ */
function ScreenReports() {
  const REPORTS = [
    { name: "Scheme-wise Beneficiary Report",      desc: "Count & payout per scheme",                 icon: Layers,       color: PRIMARY,    period: "As on date"  },
    { name: "Monthly Disbursement Register",        desc: "All payments processed this month",         icon: CreditCard,   color: "#059669",  period: "July 2027"   },
    { name: "District-wise Beneficiary Summary",   desc: "Athlete count & amount per district",        icon: MapPin,       color: "#7c3aed",  period: "As on date"  },
    { name: "Certificate Issuance Report",         desc: "All certificates issued by type & date",     icon: Award,        color: ACCENT,     period: "FY 2026-27"  },
    { name: "Application Status Report",           desc: "Pending, approved & rejected applications",  icon: ClipboardList,color: "#0891b2",  period: "As on date"  },
    { name: "Budget Utilization Report",           desc: "Scheme-wise budget vs actual spend",         icon: BarChart3,    color: "#dc2626",  period: "FY 2026-27"  },
    { name: "Failed Payment Report",               desc: "Payments failed with retry status",          icon: AlertTriangle,color: "#f59e0b",  period: "July 2027"   },
    { name: "Annual Audit Report",                 desc: "Full year scheme & payment audit trail",     icon: Shield,       color: PRIMARY,    period: "FY 2026-27"  },
    { name: "Sport-wise Distribution Report",      desc: "Beneficiaries grouped by sport",             icon: Star,         color: "#7c3aed",  period: "As on date"  },
  ];

  const DIST_DATA = [
    { district:"Pune",       count:3, amount:276000 },
    { district:"Nashik",     count:2, amount:42000  },
    { district:"Nagpur",     count:1, amount:125000 },
    { district:"Kolhapur",   count:1, amount:553000 },
    { district:"Amravati",   count:1, amount:500000 },
    { district:"Aurangabad", count:1, amount:18000  },
  ];
  const maxAmt = Math.max(...DIST_DATA.map(d=>d.amount));

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Reports & Analytics</h1>
          <p className="text-xs text-gray-400 mt-0.5">Generate and download scheme & payment reports</p>
        </div>
        <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
          <Download className="h-3.5 w-3.5" /> Export All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {REPORTS.map((r,i)=>(
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{background:`${r.color}15`}}>
                <r.icon className="h-5 w-5" style={{color:r.color}} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 text-sm leading-tight">{r.name}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{r.desc}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{r.period}</span>
              <button className="h-7 px-3 rounded-lg text-white text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition" style={{background:r.color}}>
                <Download className="h-3 w-3" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* District-wise chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionHeader title="District-wise Total Disbursement" />
        <div className="space-y-4">
          {DIST_DATA.map((d,i)=>(
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-700">{d.district}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-gray-900">₹{d.amount.toLocaleString("en-IN")}</span>
                  <span className="text-[10px] text-gray-400 ml-2">{d.count} beneficiar{d.count>1?"ies":"y"}</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{width:`${(d.amount/maxAmt)*100}%`,background:PRIMARY}} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SSCM PORTAL SHELL — exact HMS shell pattern
═══════════════════════════════════════════════════════ */
const SSCM_NAV = [
  { id:"dashboard",     label:"Dashboard",               icon:LayoutDashboard, badge:0 },
  { id:"schemes",       label:"Scheme Management",       icon:Layers,          badge:0 },
  { id:"beneficiaries", label:"Beneficiary Records",     icon:Users,           badge:0 },
  { id:"applications",  label:"Applications & Approvals",icon:ClipboardList,   badge:2 },
  { id:"disbursement",  label:"Stipend Disbursement",    icon:CreditCard,      badge:0 },
  { id:"certificates",  label:"Certificate Management",  icon:Award,           badge:1 },
  { id:"payments",      label:"Payments & Audit Trail",  icon:Shield,          badge:0 },
  { id:"reports",       label:"Reports & Analytics",     icon:BarChart3,       badge:0 },
];

export function SSCMPortal({ onBack }: { onBack: () => void }) {
  const [nav, setNav]           = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  function renderScreen() {
    switch (nav) {
      case "dashboard":     return <ScreenDashboard setNav={setNav} />;
      case "schemes":       return <ScreenSchemes />;
      case "beneficiaries": return <ScreenBeneficiaries />;
      case "applications":  return <ScreenApplications />;
      case "disbursement":  return <ScreenDisbursement />;
      case "certificates":  return <ScreenCertificates />;
      case "payments":      return <ScreenPayments />;
      case "reports":       return <ScreenReports />;
      default:              return <ScreenDashboard setNav={setNav} />;
    }
  }

  const activeLabel = SSCM_NAV.find(n => n.id === nav)?.label || "Dashboard";

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f6fa" }}>
      {/* Sidebar — exact HMS structure */}
      <aside className={`${collapsed ? "w-16" : "w-[220px]"} shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen z-30 bg-white border-r border-gray-100 shadow-sm`}>
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-gray-100 min-h-[64px]">
          <img src={mhSeal} alt="Maharashtra Seal" className="h-10 w-10 object-contain shrink-0"/>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-black text-gray-900 text-[11px] leading-tight">Sports Schemes & Scholarships</div>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)} className="ml-auto text-gray-300 hover:text-gray-600 transition shrink-0">
            <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
          </button>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
          {SSCM_NAV.map(item => (
            <button key={item.id} onClick={() => setNav(item.id)} title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all ${nav === item.id ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
              style={nav === item.id ? { background: "linear-gradient(135deg,#363092,#1e2a7a)" } : {}}>
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
            className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition group">
            <ArrowLeft className="h-4 w-4 shrink-0 group-hover:-translate-x-0.5 transition-transform"/>
            {!collapsed && <span>Back to Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
          {nav !== "dashboard" && (
            <button onClick={() => setNav("dashboard")} className="flex items-center gap-1.5 h-8 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#363092] hover:text-[#363092] transition shrink-0">
              <ArrowLeft className="h-3.5 w-3.5"/> Back
            </button>
          )}
          <div className="ml-auto flex items-center gap-3">
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
              {["EN","HI","MR"].map(l => (
                <button key={l} className={`px-2 py-1 rounded text-[11px] font-bold transition ${l==="EN"?"bg-white shadow-sm":"text-gray-400"}`}>{l}</button>
              ))}
            </div>
            <button className="relative h-8 w-8 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-blue-400 transition">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[8px] font-black grid place-items-center">3</span>
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

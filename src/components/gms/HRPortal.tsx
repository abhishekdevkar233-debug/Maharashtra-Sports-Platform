import { useState } from "react";
import {
  LayoutDashboard, Users, Clock, Calendar, Star,
  CreditCard, Minus, ShieldCheck, BarChart3,
  ChevronRight, Search, Plus, CheckCircle, XCircle,
  AlertTriangle, TrendingUp, TrendingDown, Eye, Edit3,
  Download, X, LogOut, ArrowLeft, Building2, Phone,
  Mail, User, FileText, Bell, Activity, RefreshCw,
  MoreVertical, ChevronDown, Upload, DollarSign,
  Briefcase, Award, Target, BookOpen, Home,
} from "lucide-react";
import mhSeal from "@/assets/mh-seal.png";

/* ═══════════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════════ */
const PRIMARY = "#0891b2";
const ACCENT  = "#f97316";

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════ */
function Badge({ label, color }: { label: string; color: string }) {
  const map: Record<string, string> = {
    green:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
    red:    "bg-red-50 text-red-600 border border-red-200",
    amber:  "bg-amber-50 text-amber-700 border border-amber-200",
    blue:   "bg-blue-50 text-blue-700 border border-blue-200",
    cyan:   "bg-cyan-50 text-cyan-700 border border-cyan-200",
    gray:   "bg-gray-100 text-gray-500 border border-gray-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${map[color] || map.gray}`}>{label}</span>;
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
        className="h-9 pl-9 pr-9 rounded-xl border border-gray-200 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition w-64" />
      {value && <button onClick={() => onChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="h-3.5 w-3.5" /></button>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const EMPLOYEES = [
  { id: "EMP-001", name: "Sunil Patil",     dept: "Hostel Management", designation: "Warden",              grade: "Group B", type: "Permanent",  status: "Active",   joining: "12 Apr 2015", dob: "14 Mar 1980", phone: "9800001111", email: "spatil@dsys.mah.gov.in",  district: "Pune",       basic: 45000, hra: 18000, ta: 3200, da: 12600, gross: 78800, pf: 5400, esi: 591, tds: 3200, net: 69609  },
  { id: "EMP-002", name: "Rekha More",      dept: "Hostel Management", designation: "Warden",              grade: "Group B", type: "Permanent",  status: "Active",   joining: "08 Jun 2017", dob: "22 Sep 1983", phone: "9800002222", email: "rmore@dsys.mah.gov.in",   district: "Pune",       basic: 42000, hra: 16800, ta: 3200, da: 11760, gross: 73760, pf: 5040, esi: 553, tds: 2800, net: 65367  },
  { id: "EMP-003", name: "Rajan Bhele",     dept: "Hostel Management", designation: "Warden",              grade: "Group B", type: "Permanent",  status: "Active",   joining: "01 Jan 2012", dob: "05 Nov 1976", phone: "9800003333", email: "rbhele@dsys.mah.gov.in",  district: "Nagpur",     basic: 52000, hra: 20800, ta: 3200, da: 14560, gross: 90560, pf: 6240, esi: 679, tds: 5200, net: 78441  },
  { id: "EMP-004", name: "Priya Kale",      dept: "Administration",    designation: "District Officer",    grade: "Group A", type: "Permanent",  status: "Active",   joining: "15 Mar 2010", dob: "11 Jul 1978", phone: "9800004444", email: "pkale@dsys.mah.gov.in",   district: "Nashik",     basic: 65000, hra: 26000, ta: 4000, da: 18200, gross: 113200,pf: 7800, esi: 0,   tds: 9500, net: 95900 },
  { id: "EMP-005", name: "Ganesh Jadhav",   dept: "Sports Training",   designation: "Coach",               grade: "Group B", type: "Permanent",  status: "Active",   joining: "20 Aug 2016", dob: "30 Dec 1981", phone: "9800005555", email: "gjadhav@dsys.mah.gov.in", district: "Kolhapur",   basic: 38000, hra: 15200, ta: 2400, da: 10640, gross: 66240, pf: 4560, esi: 497, tds: 1800, net: 59383  },
  { id: "EMP-006", name: "Sonal Desai",     dept: "Hostel Management", designation: "Assistant Warden",   grade: "Group C", type: "Contract",   status: "Active",   joining: "01 Apr 2022", dob: "18 Feb 1992", phone: "9800006666", email: "sdesai@dsys.mah.gov.in",  district: "Aurangabad", basic: 28000, hra: 11200, ta: 1600, da: 7840,  gross: 48640, pf: 3360, esi: 365, tds: 0,    net: 44915  },
  { id: "EMP-007", name: "Kavita Shinde",   dept: "Sports Training",   designation: "Coach",               grade: "Group B", type: "Permanent",  status: "On Leave", joining: "10 Sep 2018", dob: "25 Apr 1985", phone: "9800007777", email: "kshinde@dsys.mah.gov.in", district: "Amravati",   basic: 40000, hra: 16000, ta: 2400, da: 11200, gross: 69600, pf: 4800, esi: 522, tds: 2200, net: 62078  },
  { id: "EMP-008", name: "Dinesh Rao",      dept: "Administration",    designation: "Clerk",               grade: "Group C", type: "Permanent",  status: "Active",   joining: "05 Feb 2014", dob: "08 Jun 1979", phone: "9800008888", email: "drao@dsys.mah.gov.in",    district: "Solapur",    basic: 32000, hra: 12800, ta: 1600, da: 8960,  gross: 55360, pf: 3840, esi: 415, tds: 800,  net: 50305  },
  { id: "EMP-009", name: "Akash Sawant",    dept: "Infrastructure",    designation: "Facility Manager",   grade: "Group C", type: "Contract",   status: "Active",   joining: "01 Jul 2023", dob: "12 Oct 1994", phone: "9800009999", email: "asawant@dsys.mah.gov.in", district: "Ratnagiri",  basic: 26000, hra: 10400, ta: 1600, da: 7280,  gross: 45280, pf: 3120, esi: 340, tds: 0,    net: 41820  },
  { id: "EMP-010", name: "Meena Kulkarni",  dept: "Finance",           designation: "Accounts Officer",   grade: "Group B", type: "Permanent",  status: "Active",   joining: "22 Nov 2011", dob: "03 Jan 1977", phone: "9800010000", email: "mkulkarni@dsys.mah.gov.in",district: "Pune",       basic: 48000, hra: 19200, ta: 3200, da: 13440, gross: 83840, pf: 5760, esi: 629, tds: 4200, net: 73251  },
];

const DEPARTMENTS = ["All", "Hostel Management", "Administration", "Sports Training", "Infrastructure", "Finance"];

/* ═══════════════════════════════════════════════════════
   SCREEN 1 — DASHBOARD
═══════════════════════════════════════════════════════ */
function ScreenDashboard({ setNav }: { setNav: (n: string) => void }) {
  const active    = EMPLOYEES.filter(e => e.status === "Active").length;
  const onLeave   = EMPLOYEES.filter(e => e.status === "On Leave").length;
  const contract  = EMPLOYEES.filter(e => e.type === "Contract").length;
  const totalNet  = EMPLOYEES.reduce((a, e) => a + e.net, 0);

  const ALERTS = [
    { msg: "3 employees' PF challan due by 15 Jul 2027",          type: "warning" },
    { msg: "Kavita Shinde on medical leave — 5 days pending approval", type: "info" },
    { msg: "Form 16 generation due for FY 2026-27",               type: "danger"  },
    { msg: "2 contract renewals expiring this month",             type: "danger"  },
  ];

  const RECENT_ACTIONS = [
    { action: "Payroll processed",        by: "Meena Kulkarni",  time: "Today 10:00 AM",    type: "payroll"  },
    { action: "Leave approved",           by: "Priya Kale",      time: "Today 09:30 AM",    type: "leave"    },
    { action: "New employee onboarded",   by: "Admin",           time: "Yesterday 03:00 PM", type: "employee" },
    { action: "Appraisal cycle started",  by: "Admin",           time: "26 Jun 2027",        type: "appraisal"},
  ];

  const DEPT_STATS = [
    { dept: "Hostel Management", count: 3, color: "#7c3aed" },
    { dept: "Administration",    count: 2, color: "#0891b2" },
    { dept: "Sports Training",   count: 2, color: "#059669" },
    { dept: "Finance",           count: 1, color: "#f59e0b" },
    { dept: "Infrastructure",    count: 1, color: "#ef4444" },
  ];

  return (
    <div className="p-6 space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Employees"   value={EMPLOYEES.length} sub="Across all departments" icon={Users}       color={PRIMARY}   />
        <KpiCard label="Active Staff"      value={active}           sub={`${onLeave} on leave`}  icon={CheckCircle} color="#059669"   trend="up" />
        <KpiCard label="Monthly Payroll"   value={`₹${(totalNet/100000).toFixed(1)}L`} sub="Net payout this month" icon={CreditCard} color="#7c3aed" />
        <KpiCard label="Contract Staff"    value={contract}         sub="Renewals due: 2"        icon={Briefcase}   color={ACCENT}    trend="neutral" />
      </div>

      {/* Quick stats strip */}
      <div className="grid grid-cols-4 gap-4">
        {[["Departments", "5", Building2, "#0891b2"], ["Pending Leaves", "4", Calendar, "#f59e0b"], ["Open Appraisals", "2", Star, "#7c3aed"], ["Compliance Tasks", "3", ShieldCheck, "#dc2626"]].map(([l, v, Ic, c]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black" style={{ color: c as string }}>{v as string}</div>
              <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
            </div>
            <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: `${c as string}15` }}>
              <Ic className="h-5 w-5" style={{ color: c as string }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Dept breakdown */}
        <div className="col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="Staff by Department" />
          <div className="space-y-3 mt-2">
            {DEPT_STATS.map(d => (
              <div key={d.dept}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-700 truncate max-w-[65%]">{d.dept}</span>
                  <span className="text-[11px] font-black" style={{ color: d.color }}>{d.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(d.count / EMPLOYEES.length) * 100}%`, background: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="Recent Activity" />
          <div className="space-y-3">
            {RECENT_ACTIONS.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0"
                  style={{ background: a.type === "payroll" ? "#7c3aed15" : a.type === "leave" ? "#f5a62315" : a.type === "employee" ? "#05966915" : "#0891b215" }}>
                  {a.type === "payroll"   && <CreditCard className="h-4 w-4" style={{ color: "#7c3aed" }} />}
                  {a.type === "leave"     && <Calendar   className="h-4 w-4" style={{ color: "#f59e0b" }} />}
                  {a.type === "employee"  && <Users      className="h-4 w-4" style={{ color: "#059669" }} />}
                  {a.type === "appraisal" && <Star       className="h-4 w-4" style={{ color: PRIMARY }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-gray-800">{a.action}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">by {a.by}</div>
                </div>
                <div className="text-[11px] text-gray-400 shrink-0">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionHeader title="Alerts & Reminders" />
        <div className="grid grid-cols-2 gap-3">
          {ALERTS.map((a, i) => (
            <div key={i} className={`flex gap-2 p-3 rounded-xl text-xs ${a.type === "danger" ? "bg-red-50 border border-red-100" : a.type === "warning" ? "bg-amber-50 border border-amber-100" : "bg-blue-50 border border-blue-100"}`}>
              <AlertTriangle className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${a.type === "danger" ? "text-red-500" : a.type === "warning" ? "text-amber-500" : "text-blue-500"}`} />
              <span className={`font-medium leading-snug ${a.type === "danger" ? "text-red-700" : a.type === "warning" ? "text-amber-700" : "text-blue-700"}`}>{a.msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick employee table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-800">Employee Overview</h2>
          <button onClick={() => setNav("employees")} className="text-xs font-bold text-cyan-600 hover:underline">View All →</button>
        </div>
        <TableWrap heads={["ID", "Name", "Department", "Designation", "Type", "Status", "Net Pay"]}>
          {EMPLOYEES.slice(0, 5).map((e, i) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3 font-mono text-[10px] text-gray-400">{e.id}</td>
              <td className="px-5 py-3 font-bold text-gray-800 text-xs">{e.name}</td>
              <td className="px-5 py-3 text-xs text-gray-500">{e.dept}</td>
              <td className="px-5 py-3 text-xs text-gray-500">{e.designation}</td>
              <td className="px-5 py-3"><Badge label={e.type} color={e.type === "Permanent" ? "cyan" : "amber"} /></td>
              <td className="px-5 py-3"><Badge label={e.status} color={e.status === "Active" ? "green" : "blue"} /></td>
              <td className="px-5 py-3 text-xs font-bold text-gray-700">₹{e.net.toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </TableWrap>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ADD EMPLOYEE FORM (multi-step slide-over)
═══════════════════════════════════════════════════════ */
type NewEmp = {
  name: string; dob: string; phone: string; email: string; district: string; bloodGroup: string; aadhaar: string; pan: string;
  dept: string; designation: string; grade: string; type: string; joining: string; reportingTo: string;
  basic: string; hra: string; da: string; ta: string; bankName: string; accountNo: string; ifsc: string;
};

const BLANK: NewEmp = {
  name: "", dob: "", phone: "", email: "", district: "", bloodGroup: "", aadhaar: "", pan: "",
  dept: "", designation: "", grade: "", type: "Permanent", joining: "", reportingTo: "",
  basic: "", hra: "", da: "", ta: "", bankName: "", accountNo: "", ifsc: "",
};

const DISTRICTS = ["Pune", "Nashik", "Nagpur", "Aurangabad", "Amravati", "Kolhapur", "Solapur", "Ratnagiri", "Latur", "Mumbai City", "Thane"];
const GRADES    = ["Group A", "Group B", "Group C", "Group D"];
const BLOOD     = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const STEPS = [
  { label: "Personal Info",  icon: User       },
  { label: "Job Details",    icon: Briefcase  },
  { label: "Salary & Bank",  icon: CreditCard },
  { label: "Review",         icon: CheckCircle},
];

function AddEmployeeForm({ onClose, onSave }: { onClose: () => void; onSave: (e: NewEmp) => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<NewEmp>(BLANK);
  const [errors, setErrors] = useState<Partial<Record<keyof NewEmp, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof NewEmp, val: string) {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const err: Partial<Record<keyof NewEmp, string>> = {};
    if (step === 0) {
      if (!form.name.trim())    err.name    = "Full name is required";
      if (!form.dob)            err.dob     = "Date of birth is required";
      if (!form.phone.match(/^\d{10}$/)) err.phone = "Enter a valid 10-digit mobile number";
      if (!form.email.includes("@"))     err.email = "Enter a valid email address";
      if (!form.district)       err.district = "Select a district";
    }
    if (step === 1) {
      if (!form.dept)           err.dept        = "Select a department";
      if (!form.designation.trim()) err.designation = "Designation is required";
      if (!form.grade)          err.grade       = "Select a grade";
      if (!form.joining)        err.joining     = "Joining date is required";
    }
    if (step === 2) {
      if (!form.basic || isNaN(Number(form.basic))) err.basic = "Enter valid basic salary";
      if (!form.bankName.trim()) err.bankName   = "Bank name is required";
      if (!form.accountNo.match(/^\d{9,18}$/))    err.accountNo = "Enter valid account number";
      if (!form.ifsc.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) err.ifsc = "Enter valid IFSC (e.g. SBIN0001234)";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function next() { if (validate()) setStep(s => s + 1); }
  function back() { setStep(s => s - 1); }

  function handleSubmit() {
    onSave(form);
    setSubmitted(true);
  }

  const gross = Number(form.basic) + Number(form.hra) + Number(form.da) + Number(form.ta);
  const pf    = Math.round(Number(form.basic) * 0.12);
  const esi   = gross <= 21000 ? Math.round(gross * 0.0075) : 0;
  const net   = gross - pf - esi;

  const Field = ({ label, field, type = "text", placeholder = "", required = false }: {
    label: string; field: keyof NewEmp; type?: string; placeholder?: string; required?: boolean;
  }) => (
    <div>
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input
        type={type}
        value={form[field]}
        onChange={e => set(field, e.target.value)}
        placeholder={placeholder}
        className={`mt-1 w-full h-10 px-3 rounded-xl border text-sm outline-none transition ${errors[field] ? "border-red-400 ring-2 ring-red-100" : "border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"}`}
      />
      {errors[field] && <p className="text-[11px] text-red-500 mt-1">{errors[field]}</p>}
    </div>
  );

  const Select = ({ label, field, options, required = false }: {
    label: string; field: keyof NewEmp; options: string[]; required?: boolean;
  }) => (
    <div>
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <select
        value={form[field]}
        onChange={e => set(field, e.target.value)}
        className={`mt-1 w-full h-10 px-3 rounded-xl border text-sm outline-none bg-white transition ${errors[field] ? "border-red-400 ring-2 ring-red-100" : "border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"}`}>
        <option value="">Select…</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      {errors[field] && <p className="text-[11px] text-red-500 mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="w-[520px] bg-white h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100" style={{ background: PRIMARY }}>
          <div>
            <div className="font-black text-white text-base">Add New Employee</div>
            <div className="text-[11px] text-white/70 mt-0.5">Step {step + 1} of {STEPS.length} — {STEPS[step].label}</div>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-xl bg-white/10 hover:bg-white/20 grid place-items-center text-white transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex px-6 py-3 border-b border-gray-100 gap-1">
          {STEPS.map((s, i) => (
            <div key={i} className={`flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition ${i === step ? "bg-cyan-50" : i < step ? "bg-gray-50" : ""}`}>
              <div className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-black shrink-0 ${i < step ? "bg-emerald-500 text-white" : i === step ? "text-white" : "bg-gray-200 text-gray-500"}`}
                style={i === step ? { background: PRIMARY } : {}}>
                {i < step ? <CheckCircle className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-[10px] font-bold hidden sm:block ${i === step ? "text-cyan-700" : i < step ? "text-emerald-600" : "text-gray-400"}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Form body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="h-16 w-16 rounded-2xl grid place-items-center bg-emerald-100">
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
              <div>
                <div className="font-black text-gray-900 text-lg">Employee Added!</div>
                <div className="text-sm text-gray-500 mt-1">{form.name} has been added to the employee register.</div>
              </div>
              <button onClick={onClose} className="h-10 px-6 rounded-xl text-white font-bold text-sm hover:opacity-90 transition" style={{ background: PRIMARY }}>
                Close
              </button>
            </div>
          ) : step === 0 ? (
            <div className="space-y-4">
              <div className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-2">
                <User className="h-3.5 w-3.5" style={{ color: PRIMARY }} /> Personal Information
              </div>
              <Field label="Full Name" field="name" placeholder="e.g. Amit Kumar Sharma" required />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date of Birth" field="dob" type="date" required />
                <Select label="Blood Group" field="bloodGroup" options={BLOOD} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Mobile Number" field="phone" placeholder="10-digit number" required />
                <Field label="Email Address" field="email" type="email" placeholder="name@dsys.mah.gov.in" required />
              </div>
              <Select label="Home District" field="district" options={DISTRICTS} required />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Aadhaar Number" field="aadhaar" placeholder="12-digit Aadhaar" />
                <Field label="PAN Number" field="pan" placeholder="ABCDE1234F" />
              </div>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              <div className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5" style={{ color: PRIMARY }} /> Job Details
              </div>
              <Select label="Department" field="dept" options={DEPARTMENTS.filter(d => d !== "All")} required />
              <Field label="Designation" field="designation" placeholder="e.g. Warden, Coach, Clerk" required />
              <div className="grid grid-cols-2 gap-3">
                <Select label="Grade" field="grade" options={GRADES} required />
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Employment Type<span className="text-red-500 ml-0.5">*</span></label>
                  <div className="mt-1 flex gap-2">
                    {["Permanent", "Contract", "Deputation"].map(t => (
                      <button key={t} type="button" onClick={() => set("type", t)}
                        className={`flex-1 h-10 rounded-xl text-xs font-bold border transition ${form.type === t ? "text-white border-transparent" : "border-gray-200 text-gray-500 hover:border-cyan-300"}`}
                        style={form.type === t ? { background: PRIMARY } : {}}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date of Joining" field="joining" type="date" required />
                <Field label="Reporting Officer" field="reportingTo" placeholder="Name of reporting officer" />
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-4">
              <div className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5" style={{ color: PRIMARY }} /> Salary Structure & Bank Details
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Basic Salary (₹)" field="basic" type="number" placeholder="e.g. 45000" required />
                <Field label="HRA (₹)" field="hra" type="number" placeholder="e.g. 18000" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Dearness Allowance (₹)" field="da" type="number" placeholder="e.g. 12600" />
                <Field label="Travel Allowance (₹)" field="ta" type="number" placeholder="e.g. 3200" />
              </div>

              {/* Auto-calculated preview */}
              {Number(form.basic) > 0 && (
                <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 space-y-1.5 text-xs">
                  <div className="font-bold text-cyan-800 mb-2">Auto-calculated Preview</div>
                  {[["Gross Salary", `₹${gross.toLocaleString("en-IN")}`, false], ["PF Deduction (12%)", `-₹${pf.toLocaleString("en-IN")}`, false], ["ESI (0.75%)", `-₹${esi.toLocaleString("en-IN")}`, false], ["Estimated Net Pay", `₹${net.toLocaleString("en-IN")}`, true]].map(([k, v, bold]) => (
                    <div key={k as string} className={`flex justify-between ${bold ? "font-black text-cyan-900 border-t border-cyan-200 pt-1.5 mt-1.5" : "text-cyan-700"}`}>
                      <span>{k as string}</span><span>{v as string}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-100 pt-4">
                <div className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5" style={{ color: PRIMARY }} /> Bank Account Details
                </div>
                <div className="space-y-3">
                  <Field label="Bank Name" field="bankName" placeholder="e.g. State Bank of India" required />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Account Number" field="accountNo" placeholder="Account number" required />
                    <Field label="IFSC Code" field="ifsc" placeholder="e.g. SBIN0001234" required />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Step 3 — Review */
            <div className="space-y-4">
              <div className="text-xs font-bold text-gray-700 mb-2">Review all details before saving</div>

              {[
                { title: "Personal Info", icon: User, fields: [["Full Name", form.name], ["Date of Birth", form.dob], ["Phone", form.phone], ["Email", form.email], ["District", form.district], ["Blood Group", form.bloodGroup], ["Aadhaar", form.aadhaar || "—"], ["PAN", form.pan || "—"]] },
                { title: "Job Details",   icon: Briefcase, fields: [["Department", form.dept], ["Designation", form.designation], ["Grade", form.grade], ["Employment Type", form.type], ["Date of Joining", form.joining], ["Reporting To", form.reportingTo || "—"]] },
                { title: "Salary & Bank", icon: CreditCard, fields: [["Basic", `₹${Number(form.basic).toLocaleString("en-IN")}`], ["HRA", `₹${Number(form.hra).toLocaleString("en-IN")}`], ["DA", `₹${Number(form.da).toLocaleString("en-IN")}`], ["TA", `₹${Number(form.ta).toLocaleString("en-IN")}`], ["Gross", `₹${gross.toLocaleString("en-IN")}`], ["Est. Net Pay", `₹${net.toLocaleString("en-IN")}`], ["Bank", form.bankName], ["Account No", form.accountNo], ["IFSC", form.ifsc]] },
              ].map(section => (
                <div key={section.title} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <section.icon className="h-4 w-4" style={{ color: PRIMARY }} />
                    <span className="text-xs font-bold text-gray-700">{section.title}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {section.fields.map(([k, v]) => (
                      <div key={k} className="text-xs">
                        <span className="text-gray-400">{k}: </span>
                        <span className="font-semibold text-gray-700">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer nav */}
        {!submitted && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <button onClick={step === 0 ? onClose : back}
              className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-gray-300 hover:bg-white transition flex items-center gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" /> {step === 0 ? "Cancel" : "Back"}
            </button>
            <div className="text-[11px] text-gray-400">{step + 1} / {STEPS.length}</div>
            {step < STEPS.length - 1 ? (
              <button onClick={next}
                className="h-9 px-5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{ background: PRIMARY }}>
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button onClick={handleSubmit}
                className="h-9 px-5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{ background: "#059669" }}>
                <CheckCircle className="h-3.5 w-3.5" /> Save Employee
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 2 — EMPLOYEE RECORDS
═══════════════════════════════════════════════════════ */
function ScreenEmployees() {
  const [search, setSearch]     = useState("");
  const [dept, setDept]         = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [toast, setToast]       = useState("");

  const filtered = employees.filter(e => {
    const q = search.toLowerCase();
    const matchDept   = dept === "All" || e.dept === dept;
    const matchSearch = !q || e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q);
    return matchDept && matchSearch;
  });
  const emp = selected !== null ? employees[selected] : null;

  function handleSave(f: NewEmp) {
    const basic = Number(f.basic); const hra = Number(f.hra); const da = Number(f.da); const ta = Number(f.ta);
    const gross = basic + hra + da + ta;
    const pf    = Math.round(basic * 0.12);
    const esi   = gross <= 21000 ? Math.round(gross * 0.0075) : 0;
    const net   = gross - pf - esi;
    const newEmp = {
      id: `EMP-${String(employees.length + 1).padStart(3, "0")}`,
      name: f.name, dept: f.dept, designation: f.designation, grade: f.grade,
      type: f.type, status: "Active", joining: f.joining, dob: f.dob,
      phone: f.phone, email: f.email, district: f.district,
      basic, hra, ta, da, gross, pf, esi, tds: 0, net,
    };
    setEmployees(prev => [...prev, newEmp]);
    setShowForm(false);
    setToast(`${f.name} added successfully!`);
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <div className="p-6 flex gap-5 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-lg">
          <CheckCircle className="h-4 w-4" /> {toast}
        </div>
      )}

      {/* Add form modal */}
      {showForm && <AddEmployeeForm onClose={() => setShowForm(false)} onSave={handleSave} />}

      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Employee Records</h1>
            <p className="text-xs text-gray-400 mt-0.5">Master register of all departmental staff · {employees.length} employees</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: PRIMARY }}>
            <Plus className="h-4 w-4" /> Add Employee
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID…" />
          <select value={dept} onChange={e => setDept(e.target.value)}
            className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Status</option><option>Active</option><option>On Leave</option><option>Retired</option>
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Types</option><option>Permanent</option><option>Contract</option><option>Deputation</option>
          </select>
          <button className="ml-auto h-9 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-cyan-400 transition">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>

        <TableWrap heads={["ID", "Name", "Department", "Designation", "Grade", "Type", "Joining Date", "Status", "Action"]}>
          {filtered.map((e, i) => (
            <tr key={i} onClick={() => setSelected(employees.indexOf(e))}
              className={`cursor-pointer transition ${selected === employees.indexOf(e) ? "bg-cyan-50" : "hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{e.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{e.name}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{e.dept}</td>
              <td className="px-5 py-3.5 text-xs text-gray-600">{e.designation}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{e.grade}</td>
              <td className="px-5 py-3.5"><Badge label={e.type} color={e.type === "Permanent" ? "cyan" : "amber"} /></td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{e.joining}</td>
              <td className="px-5 py-3.5"><Badge label={e.status} color={e.status === "Active" ? "green" : "blue"} /></td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1.5">
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-cyan-600 hover:border-cyan-300 transition"><Eye className="h-3.5 w-3.5" /></button>
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 hover:border-amber-300 transition"><Edit3 className="h-3.5 w-3.5" /></button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {emp && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Employee Profile</span>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex flex-col items-center gap-2 pb-4 border-b border-gray-100">
              <div className="h-16 w-16 rounded-2xl grid place-items-center text-white font-black text-2xl" style={{ background: PRIMARY }}>
                {emp.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="text-center">
                <div className="font-black text-gray-900">{emp.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{emp.designation} · {emp.dept}</div>
                <div className="mt-2 flex justify-center gap-2">
                  <Badge label={emp.status} color={emp.status === "Active" ? "green" : "blue"} />
                  <Badge label={emp.type} color={emp.type === "Permanent" ? "cyan" : "amber"} />
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Employee ID", emp.id], ["Grade", emp.grade], ["Date of Birth", emp.dob], ["Joining Date", emp.joining], ["District", emp.district], ["Phone", emp.phone], ["Email", emp.email]].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700 text-right max-w-[55%] truncate">{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-xs">
              <div className="font-bold text-gray-700 mb-1">Salary Summary</div>
              {[["Basic", emp.basic], ["HRA", emp.hra], ["DA", emp.da], ["TA", emp.ta], ["Gross", emp.gross], ["PF Deduction", emp.pf], ["TDS", emp.tds], ["Net Pay", emp.net]].map(([k, v]) => (
                <div key={k as string} className={`flex justify-between ${k === "Net Pay" ? "font-black text-gray-900 border-t border-gray-200 pt-2 mt-1" : "text-gray-600"}`}>
                  <span>{k as string}</span>
                  <span>₹{(v as number).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
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
   SCREEN 3 — ATTENDANCE MANAGEMENT
═══════════════════════════════════════════════════════ */
function ScreenAttendance() {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const ATT = [
    { name: "Sunil Patil",    dept: "Hostel Mgmt", checkIn: "09:02 AM", checkOut: "06:05 PM", status: "Present",  shift: "General" },
    { name: "Rekha More",     dept: "Hostel Mgmt", checkIn: "09:15 AM", checkOut: "",          status: "Present",  shift: "General" },
    { name: "Rajan Bhele",    dept: "Hostel Mgmt", checkIn: "",         checkOut: "",          status: "Absent",   shift: "General" },
    { name: "Priya Kale",     dept: "Admin",       checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present",  shift: "General" },
    { name: "Ganesh Jadhav",  dept: "Sports",      checkIn: "06:00 AM", checkOut: "02:00 PM", status: "Present",  shift: "Morning" },
    { name: "Sonal Desai",    dept: "Hostel Mgmt", checkIn: "",         checkOut: "",          status: "On Leave", shift: "General" },
    { name: "Kavita Shinde",  dept: "Sports",      checkIn: "",         checkOut: "",          status: "On Leave", shift: "General" },
    { name: "Dinesh Rao",     dept: "Admin",       checkIn: "09:30 AM", checkOut: "",          status: "Late",     shift: "General" },
    { name: "Akash Sawant",   dept: "Infra",       checkIn: "08:55 AM", checkOut: "05:55 PM", status: "Present",  shift: "General" },
    { name: "Meena Kulkarni", dept: "Finance",     checkIn: "09:05 AM", checkOut: "06:10 PM", status: "Present",  shift: "General" },
  ];
  const statusColor: Record<string, string> = { Present: "green", Absent: "red", "On Leave": "blue", Late: "amber" };
  const present = ATT.filter(a => a.status === "Present").length;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Attendance Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">{today}</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-cyan-400 transition flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{ background: PRIMARY }}>
            <RefreshCw className="h-3.5 w-3.5" /> Sync Biometric
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[["Present", present, "#059669", CheckCircle], ["Absent", 1, "#dc2626", XCircle], ["On Leave", 2, "#3b82f6", Calendar], ["Late", 1, "#f59e0b", Clock]].map(([l, v, c, Ic]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl grid place-items-center shrink-0" style={{ background: `${c as string}15` }}>
              <Ic className="h-5 w-5" style={{ color: c as string }} />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">{v as number}</div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{l as string}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <SearchBar value="" onChange={() => {}} placeholder="Search employee…" />
        <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
          <option>All Departments</option>
          {DEPARTMENTS.filter(d => d !== "All").map(d => <option key={d}>{d}</option>)}
        </select>
        <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
          <option>All Status</option>
          {["Present", "Absent", "On Leave", "Late"].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <TableWrap heads={["Employee", "Department", "Shift", "Check-In", "Check-Out", "Status", "Action"]}>
        {ATT.map((a, i) => (
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-5 py-3.5 font-semibold text-gray-800 text-xs">{a.name}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500">{a.dept}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500">{a.shift}</td>
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
   SCREEN 4 — LEAVE MANAGEMENT
═══════════════════════════════════════════════════════ */
function ScreenLeave() {
  const [tab, setTab] = useState("pending");

  const LEAVES = [
    { id: "LV-2027-041", emp: "Kavita Shinde",  type: "Medical Leave",  from: "25 Jun 2027", to: "01 Jul 2027", days: 7, reason: "Knee surgery recovery", status: "Pending",  applied: "24 Jun 2027" },
    { id: "LV-2027-040", emp: "Sonal Desai",    type: "Casual Leave",   from: "27 Jun 2027", to: "28 Jun 2027", days: 2, reason: "Personal work",          status: "Pending",  applied: "23 Jun 2027" },
    { id: "LV-2027-039", emp: "Dinesh Rao",     type: "Earned Leave",   from: "01 Jul 2027", to: "07 Jul 2027", days: 7, reason: "Family function",         status: "Approved", applied: "20 Jun 2027" },
    { id: "LV-2027-038", emp: "Rajan Bhele",    type: "Casual Leave",   from: "20 Jun 2027", to: "20 Jun 2027", days: 1, reason: "Personal",                status: "Approved", applied: "18 Jun 2027" },
    { id: "LV-2027-037", emp: "Ganesh Jadhav",  type: "Earned Leave",   from: "10 Jun 2027", to: "14 Jun 2027", days: 5, reason: "Vacation",                status: "Rejected", applied: "05 Jun 2027" },
  ];

  const BALANCES = [
    { emp: "Sunil Patil",    cl: 5, el: 18, ml: 0,  sl: 3,  total: 26 },
    { emp: "Rekha More",     cl: 8, el: 22, ml: 0,  sl: 4,  total: 34 },
    { emp: "Priya Kale",     cl: 6, el: 30, ml: 0,  sl: 5,  total: 41 },
    { emp: "Kavita Shinde",  cl: 2, el: 12, ml: 21, sl: 0,  total: 35 },
    { emp: "Dinesh Rao",     cl: 3, el: 10, ml: 0,  sl: 2,  total: 15 },
  ];

  const tabs = [["pending", "Pending", 2], ["approved", "Approved", 2], ["rejected", "Rejected", 1]];
  const filtered = LEAVES.filter(l =>
    tab === "pending" ? l.status === "Pending" : tab === "approved" ? l.status === "Approved" : l.status === "Rejected"
  );
  const statusColor: Record<string, string> = { Pending: "amber", Approved: "green", Rejected: "red" };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Leave Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage leave applications and balances</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: PRIMARY }}>
          <Plus className="h-4 w-4" /> Apply Leave
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[["Casual Leave (CL)", "10 days", "#0891b2"], ["Earned Leave (EL)", "30 days", "#059669"], ["Medical Leave (ML)", "30 days", "#dc2626"], ["Special Leave (SL)", "15 days", "#7c3aed"]].map(([l, v, c]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="text-xs font-bold text-gray-400 mb-1">{l as string}</div>
            <div className="text-xl font-black" style={{ color: c as string }}>{v as string}</div>
            <div className="text-[10px] text-gray-400 mt-1">Annual entitlement</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
        {tabs.map(([id, label, count]) => (
          <button key={id} onClick={() => setTab(id as string)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${tab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            {label as string}
            <span className={`h-5 min-w-5 px-1 rounded-full text-[10px] font-black grid place-items-center ${tab === id ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}>{count as number}</span>
          </button>
        ))}
      </div>

      <TableWrap heads={["App ID", "Employee", "Leave Type", "From", "To", "Days", "Reason", "Applied On", "Status", "Action"]}>
        {filtered.map((l, i) => (
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{l.id}</td>
            <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{l.emp}</td>
            <td className="px-5 py-3.5 text-xs text-gray-600">{l.type}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500">{l.from}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500">{l.to}</td>
            <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{l.days}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[140px] truncate">{l.reason}</td>
            <td className="px-5 py-3.5 text-xs text-gray-400">{l.applied}</td>
            <td className="px-5 py-3.5"><Badge label={l.status} color={statusColor[l.status]} /></td>
            <td className="px-5 py-3.5">
              {l.status === "Pending" && (
                <div className="flex gap-1.5">
                  <button className="h-6 px-2 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 hover:bg-emerald-100 transition">Approve</button>
                  <button className="h-6 px-2 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold border border-red-200 hover:bg-red-100 transition">Reject</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </TableWrap>

      {/* Leave balance table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionHeader title="Leave Balance Summary" />
        <TableWrap heads={["Employee", "Casual Leave", "Earned Leave", "Medical Leave", "Special Leave", "Total Balance"]}>
          {BALANCES.map((b, i) => (
            <tr key={i} className="hover:bg-gray-50 transition">
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{b.emp}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-cyan-700">{b.cl} days</td>
              <td className="px-5 py-3.5 text-xs font-bold text-green-700">{b.el} days</td>
              <td className="px-5 py-3.5 text-xs font-bold text-red-600">{b.ml} days</td>
              <td className="px-5 py-3.5 text-xs font-bold text-purple-700">{b.sl} days</td>
              <td className="px-5 py-3.5 text-xs font-black text-gray-900">{b.total} days</td>
            </tr>
          ))}
        </TableWrap>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 5 — PERFORMANCE MANAGEMENT
═══════════════════════════════════════════════════════ */
function ScreenPerformance() {
  const APPRAISALS = [
    { emp: "Sunil Patil",    dept: "Hostel Mgmt", cycle: "FY 2026-27", rating: 4.2, grade: "Outstanding", increment: "₹3,500", status: "Completed" },
    { emp: "Rekha More",     dept: "Hostel Mgmt", cycle: "FY 2026-27", rating: 3.8, grade: "Very Good",   increment: "₹2,800", status: "Completed" },
    { emp: "Priya Kale",     dept: "Admin",       cycle: "FY 2026-27", rating: 4.6, grade: "Outstanding", increment: "₹5,000", status: "Completed" },
    { emp: "Ganesh Jadhav",  dept: "Sports",      cycle: "FY 2026-27", rating: 4.0, grade: "Very Good",   increment: "₹2,500", status: "Completed" },
    { emp: "Kavita Shinde",  dept: "Sports",      cycle: "FY 2026-27", rating: null, grade: "—",           increment: "—",      status: "Pending"   },
    { emp: "Meena Kulkarni", dept: "Finance",     cycle: "FY 2026-27", rating: null, grade: "—",           increment: "—",      status: "In Review" },
  ];

  const KPIS = [
    { kpi: "Punctuality & Attendance",    weight: "20%", score: 18 },
    { kpi: "Quality of Work",             weight: "25%", score: 22 },
    { kpi: "Initiative & Innovation",     weight: "15%", score: 12 },
    { kpi: "Teamwork & Collaboration",    weight: "20%", score: 17 },
    { kpi: "Discipline & Conduct",        weight: "20%", score: 19 },
  ];

  const gradeColor: Record<string, string> = { Outstanding: "green", "Very Good": "cyan", Good: "blue", Satisfactory: "amber", "—": "gray" };
  const statusColor: Record<string, string> = { Completed: "green", Pending: "amber", "In Review": "blue" };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Performance Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Annual appraisal cycle FY 2026–27</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: ACCENT }}>
          <Plus className="h-4 w-4" /> New Appraisal Cycle
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[["Completed", 4, "#059669"], ["Pending", 1, "#f59e0b"], ["In Review", 1, "#0891b2"], ["Avg Rating", "4.15", "#7c3aed"]].map(([l, v, c]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 text-center">
            <div className="text-2xl font-black" style={{ color: c as string }}>{v as string | number}</div>
            <div className="text-xs font-semibold text-gray-400 mt-1">{l as string}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <TableWrap heads={["Employee", "Department", "Cycle", "Rating", "Grade", "Increment", "Status", "Action"]}>
            {APPRAISALS.map((a, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{a.emp}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500">{a.dept}</td>
                <td className="px-5 py-3.5 text-xs text-gray-400">{a.cycle}</td>
                <td className="px-5 py-3.5">
                  {a.rating ? (
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-black text-gray-800">{a.rating}</span>
                    </div>
                  ) : <span className="text-xs text-gray-300">—</span>}
                </td>
                <td className="px-5 py-3.5"><Badge label={a.grade} color={gradeColor[a.grade]} /></td>
                <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{a.increment}</td>
                <td className="px-5 py-3.5"><Badge label={a.status} color={statusColor[a.status]} /></td>
                <td className="px-5 py-3.5">
                  <button className="h-6 px-2 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:border-cyan-300 hover:text-cyan-600 transition">
                    {a.status === "Pending" ? "Start" : "View"}
                  </button>
                </td>
              </tr>
            ))}
          </TableWrap>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="KPI Weightage" />
          <div className="space-y-4">
            {KPIS.map((k, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-gray-700 max-w-[70%] leading-tight">{k.kpi}</span>
                  <span className="text-[11px] font-black text-gray-500">{k.weight}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(k.score / 25) * 100}%`, background: PRIMARY }} />
                </div>
                <div className="text-[10px] text-right text-gray-400 mt-0.5">{k.score} / 25</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 6 — PAYROLL PROCESSING
═══════════════════════════════════════════════════════ */
function ScreenPayroll() {
  const [processed, setProcessed] = useState(false);
  const [month] = useState("June 2027");

  const grossTotal = EMPLOYEES.reduce((a, e) => a + e.gross, 0);
  const deductTotal = EMPLOYEES.reduce((a, e) => a + e.pf + e.esi + e.tds, 0);
  const netTotal = EMPLOYEES.reduce((a, e) => a + e.net, 0);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Payroll Processing</h1>
          <p className="text-xs text-gray-400 mt-0.5">Monthly payroll — {month}</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-cyan-400 transition flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" /> Download Register
          </button>
          {!processed ? (
            <button onClick={() => setProcessed(true)}
              className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{ background: "#059669" }}>
              <CheckCircle className="h-3.5 w-3.5" /> Run Payroll
            </button>
          ) : (
            <div className="h-9 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" /> Payroll Processed
            </div>
          )}
        </div>
      </div>

      {processed && (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-emerald-200 bg-emerald-50">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">Payroll for <strong>{month}</strong> processed successfully. {EMPLOYEES.length} payslips generated. Bank transfer initiated.</span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="Gross Payroll"     value={`₹${(grossTotal / 100000).toFixed(2)}L`} sub="Before deductions"  icon={DollarSign} color="#7c3aed" />
        <KpiCard label="Total Deductions"  value={`₹${(deductTotal / 100000).toFixed(2)}L`} sub="PF + ESI + TDS"    icon={Minus}      color="#dc2626" />
        <KpiCard label="Net Disbursement"  value={`₹${(netTotal / 100000).toFixed(2)}L`}   sub="Final bank transfer" icon={CreditCard}  color="#059669" />
      </div>

      <TableWrap heads={["ID", "Employee", "Department", "Basic", "HRA", "DA", "TA", "Gross", "PF", "ESI", "TDS", "Net Pay", "Payslip"]}>
        {EMPLOYEES.map((e, i) => (
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-4 py-3 font-mono text-[10px] text-gray-400">{e.id}</td>
            <td className="px-4 py-3 font-bold text-gray-800 text-xs">{e.name}</td>
            <td className="px-4 py-3 text-xs text-gray-500 max-w-[100px] truncate">{e.dept}</td>
            <td className="px-4 py-3 text-xs text-gray-600">₹{e.basic.toLocaleString("en-IN")}</td>
            <td className="px-4 py-3 text-xs text-gray-600">₹{e.hra.toLocaleString("en-IN")}</td>
            <td className="px-4 py-3 text-xs text-gray-600">₹{e.da.toLocaleString("en-IN")}</td>
            <td className="px-4 py-3 text-xs text-gray-600">₹{e.ta.toLocaleString("en-IN")}</td>
            <td className="px-4 py-3 text-xs font-bold text-gray-800">₹{e.gross.toLocaleString("en-IN")}</td>
            <td className="px-4 py-3 text-xs text-red-600">-₹{e.pf.toLocaleString("en-IN")}</td>
            <td className="px-4 py-3 text-xs text-red-600">-₹{e.esi.toLocaleString("en-IN")}</td>
            <td className="px-4 py-3 text-xs text-red-600">-₹{e.tds.toLocaleString("en-IN")}</td>
            <td className="px-4 py-3 text-xs font-black text-emerald-700">₹{e.net.toLocaleString("en-IN")}</td>
            <td className="px-4 py-3">
              <button className="h-6 px-2 rounded-lg bg-cyan-50 text-cyan-700 text-[10px] font-bold border border-cyan-200 hover:bg-cyan-100 transition flex items-center gap-1">
                <Download className="h-3 w-3" /> PDF
              </button>
            </td>
          </tr>
        ))}
      </TableWrap>

      {/* Payroll summary footer */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="grid grid-cols-5 gap-4 text-center">
          {[["Employees", EMPLOYEES.length, "#0891b2"], ["Gross", `₹${(grossTotal/100000).toFixed(2)}L`, "#7c3aed"], ["PF Contribution", `₹${(EMPLOYEES.reduce((a,e)=>a+e.pf,0)/1000).toFixed(0)}K`, "#dc2626"], ["TDS Deducted", `₹${(EMPLOYEES.reduce((a,e)=>a+e.tds,0)/1000).toFixed(0)}K`, "#f59e0b"], ["Net Paid", `₹${(netTotal/100000).toFixed(2)}L`, "#059669"]].map(([l,v,c]) => (
            <div key={l as string}>
              <div className="text-xl font-black" style={{ color: c as string }}>{v as string | number}</div>
              <div className="text-[10px] text-gray-400 font-semibold mt-1">{l as string}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 7 — DEDUCTIONS & REIMBURSEMENTS
═══════════════════════════════════════════════════════ */
function ScreenDeductions() {
  const [tab, setTab] = useState("deductions");

  const REIMBURSEMENTS = [
    { id: "RMB-041", emp: "Priya Kale",    type: "Travel Claim",   amount: 4200, date: "25 Jun 2027", purpose: "Nagpur district visit", status: "Pending"  },
    { id: "RMB-040", emp: "Ganesh Jadhav", type: "Medical Claim",  amount: 8500, date: "22 Jun 2027", purpose: "Hospital expense",      status: "Approved" },
    { id: "RMB-039", emp: "Sunil Patil",   type: "Travel Claim",   amount: 1800, date: "18 Jun 2027", purpose: "Pune to Mumbai",        status: "Approved" },
    { id: "RMB-038", emp: "Meena Kulkarni",type: "Phone Bill",     amount: 999,  date: "15 Jun 2027", purpose: "June mobile bill",      status: "Pending"  },
    { id: "RMB-037", emp: "Rajan Bhele",   type: "Medical Claim",  amount: 3200, date: "10 Jun 2027", purpose: "Dental treatment",      status: "Rejected" },
  ];

  const DEDUCTION_SUMMARY = [
    { label: "PF (Employer 12%)",   total: EMPLOYEES.reduce((a,e) => a+e.pf, 0),   color: "#0891b2" },
    { label: "ESI (Employer 3.25%)",total: Math.round(EMPLOYEES.reduce((a,e) => a+e.gross, 0) * 0.0325), color: "#7c3aed" },
    { label: "PF (Employee 12%)",   total: EMPLOYEES.reduce((a,e) => a+e.pf, 0),   color: "#059669" },
    { label: "ESI (Employee 0.75%)",total: EMPLOYEES.reduce((a,e) => a+e.esi, 0),  color: "#f59e0b" },
    { label: "TDS / Income Tax",    total: EMPLOYEES.reduce((a,e) => a+e.tds, 0),  color: "#dc2626" },
  ];

  const statusColor: Record<string, string> = { Pending: "amber", Approved: "green", Rejected: "red" };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">Deductions & Reimbursements</h1>
        <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: PRIMARY }}>
          <Plus className="h-4 w-4" /> New Claim
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
        {[["deductions", "Deductions Summary"], ["reimbursements", "Reimbursement Claims"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id as string)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${tab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            {label as string}
          </button>
        ))}
      </div>

      {tab === "deductions" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {DEDUCTION_SUMMARY.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-xs font-bold text-gray-400 mb-2">{d.label}</div>
                <div className="text-xl font-black" style={{ color: d.color }}>₹{d.total.toLocaleString("en-IN")}</div>
                <div className="text-[10px] text-gray-400 mt-1">For June 2027</div>
              </div>
            ))}
          </div>

          <TableWrap heads={["Employee", "Basic", "PF (EE)", "PF (ER)", "ESI (EE)", "ESI (ER)", "TDS", "Total Deduction"]}>
            {EMPLOYEES.map((e, i) => {
              const esiEr = Math.round(e.gross * 0.0325);
              const total = e.pf + e.esi + esiEr + e.tds;
              return (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{e.name}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-600">₹{e.basic.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3.5 text-xs text-cyan-700 font-semibold">₹{e.pf.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3.5 text-xs text-purple-700 font-semibold">₹{e.pf.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3.5 text-xs text-amber-700 font-semibold">₹{e.esi.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3.5 text-xs text-green-700 font-semibold">₹{esiEr.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3.5 text-xs text-red-600 font-semibold">₹{e.tds.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3.5 text-xs font-black text-gray-900">₹{total.toLocaleString("en-IN")}</td>
                </tr>
              );
            })}
          </TableWrap>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[["Pending", REIMBURSEMENTS.filter(r=>r.status==="Pending").length, "#f59e0b"], ["Approved", REIMBURSEMENTS.filter(r=>r.status==="Approved").length, "#059669"], ["Total Claimed", `₹${REIMBURSEMENTS.reduce((a,r)=>a+r.amount,0).toLocaleString("en-IN")}`, "#0891b2"]].map(([l,v,c]) => (
              <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 text-center">
                <div className="text-2xl font-black" style={{ color: c as string }}>{v as string | number}</div>
                <div className="text-xs font-semibold text-gray-400 mt-1">{l as string}</div>
              </div>
            ))}
          </div>
          <TableWrap heads={["Claim ID", "Employee", "Type", "Amount", "Date", "Purpose", "Status", "Action"]}>
            {REIMBURSEMENTS.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{r.id}</td>
                <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{r.emp}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500">{r.type}</td>
                <td className="px-5 py-3.5 text-xs font-bold text-gray-700">₹{r.amount.toLocaleString("en-IN")}</td>
                <td className="px-5 py-3.5 text-xs text-gray-400">{r.date}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[140px] truncate">{r.purpose}</td>
                <td className="px-5 py-3.5"><Badge label={r.status} color={statusColor[r.status]} /></td>
                <td className="px-5 py-3.5">
                  {r.status === "Pending" && (
                    <div className="flex gap-1.5">
                      <button className="h-6 px-2 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 hover:bg-emerald-100 transition">Approve</button>
                      <button className="h-6 px-2 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold border border-red-200 hover:bg-red-100 transition">Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </TableWrap>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 8 — STATUTORY COMPLIANCE
═══════════════════════════════════════════════════════ */
function ScreenCompliance() {
  const FILINGS = [
    { id: "PF-JUN-27",  type: "PF Challan",     period: "June 2027",    due: "15 Jul 2027", amount: "₹1,10,400", status: "Pending",  filed: "" },
    { id: "ESI-JUN-27", type: "ESI Return",      period: "June 2027",    due: "21 Jul 2027", amount: "₹28,640",   status: "Pending",  filed: "" },
    { id: "TDS-Q1-27",  type: "TDS Return (26Q)",period: "Q1 FY 2027-28",due: "31 Jul 2027", amount: "₹29,700",   status: "Pending",  filed: "" },
    { id: "PF-MAY-27",  type: "PF Challan",      period: "May 2027",     due: "15 Jun 2027", amount: "₹1,10,400", status: "Filed",    filed: "14 Jun 2027" },
    { id: "ESI-MAY-27", type: "ESI Return",       period: "May 2027",     due: "21 Jun 2027", amount: "₹28,640",   status: "Filed",    filed: "20 Jun 2027" },
    { id: "F16-26-27",  type: "Form 16",          period: "FY 2026-27",   due: "15 Jun 2027", amount: "—",          status: "Overdue",  filed: "" },
    { id: "PF-APR-27",  type: "PF Challan",      period: "April 2027",   due: "15 May 2027", amount: "₹1,10,400", status: "Filed",    filed: "14 May 2027" },
  ];

  const statusColor: Record<string, string> = { Pending: "amber", Filed: "green", Overdue: "red" };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Statutory Compliance</h1>
          <p className="text-xs text-gray-400 mt-0.5">PF, ESI, TDS, Form 16 and government filings</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{ background: ACCENT }}>
          <Upload className="h-4 w-4" /> File Now
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[["Pending Filings", 3, "#f59e0b", AlertTriangle], ["Overdue", 1, "#dc2626", XCircle], ["Filed This Month", 2, "#059669", CheckCircle], ["Total Liability", "₹1.69L", "#0891b2", ShieldCheck]].map(([l,v,c,Ic]) => (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${c as string}15` }}>
              <Ic className="h-5 w-5" style={{ color: c as string }} />
            </div>
            <div>
              <div className="text-xl font-black" style={{ color: c as string }}>{v as string | number}</div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{l as string}</div>
            </div>
          </div>
        ))}
      </div>

      <TableWrap heads={["Filing ID", "Type", "Period", "Due Date", "Amount", "Status", "Filed On", "Action"]}>
        {FILINGS.map((f, i) => (
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{f.id}</td>
            <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{f.type}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500">{f.period}</td>
            <td className="px-5 py-3.5 text-xs font-semibold" style={{ color: f.status === "Overdue" ? "#dc2626" : f.status === "Pending" ? "#f59e0b" : "#6b7280" }}>{f.due}</td>
            <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{f.amount}</td>
            <td className="px-5 py-3.5"><Badge label={f.status} color={statusColor[f.status]} /></td>
            <td className="px-5 py-3.5 text-xs text-gray-400">{f.filed || <span className="text-gray-300">—</span>}</td>
            <td className="px-5 py-3.5">
              <div className="flex gap-1.5">
                {f.status !== "Filed" && (
                  <button className="h-6 px-2 rounded-lg bg-cyan-50 text-cyan-700 text-[10px] font-bold border border-cyan-200 hover:bg-cyan-100 transition">File Now</button>
                )}
                <button className="h-6 px-2 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition">
                  <Download className="h-3 w-3" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </TableWrap>

      {/* Compliance calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionHeader title="Compliance Calendar — July 2027" />
        <div className="grid grid-cols-3 gap-3">
          {[
            { date: "07 Jul", task: "GPF Statement generation",     type: "info"    },
            { date: "15 Jul", task: "PF Challan — June 2027 due",   type: "danger"  },
            { date: "21 Jul", task: "ESI Return — June 2027 due",   type: "danger"  },
            { date: "31 Jul", task: "TDS Return (Q1) filing due",   type: "warning" },
            { date: "15 Aug", task: "PF Challan — July 2027 due",   type: "danger"  },
            { date: "31 Aug", task: "Annual increment processing",  type: "info"    },
          ].map((c, i) => (
            <div key={i} className={`flex gap-3 p-3 rounded-xl ${c.type === "danger" ? "bg-red-50 border border-red-100" : c.type === "warning" ? "bg-amber-50 border border-amber-100" : "bg-blue-50 border border-blue-100"}`}>
              <div className={`text-xs font-black shrink-0 ${c.type === "danger" ? "text-red-600" : c.type === "warning" ? "text-amber-600" : "text-blue-600"}`}>{c.date}</div>
              <div className={`text-xs font-medium leading-snug ${c.type === "danger" ? "text-red-700" : c.type === "warning" ? "text-amber-700" : "text-blue-700"}`}>{c.task}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 9 — REPORTS & ANALYTICS
═══════════════════════════════════════════════════════ */
function ScreenReports() {
  const REPORTS = [
    { name: "Monthly Payroll Register",          desc: "Full payroll details for all employees",        icon: CreditCard,  color: "#7c3aed", period: "June 2027"    },
    { name: "Attendance Summary Report",         desc: "Monthly attendance & LOP details",              icon: Clock,       color: "#0891b2", period: "June 2027"    },
    { name: "Leave Utilization Report",          desc: "Leave taken vs balance per employee",           icon: Calendar,    color: "#059669", period: "FY 2026-27"   },
    { name: "Headcount Report",                  desc: "Staff strength by dept, grade & type",          icon: Users,       color: "#f59e0b", period: "As on date"   },
    { name: "Department-wise Cost Analysis",     desc: "Salary cost breakdown per department",          icon: BarChart3,   color: "#dc2626", period: "June 2027"    },
    { name: "Increment & Appraisal History",     desc: "Year-wise increment & grade changes",           icon: TrendingUp,  color: "#059669", period: "FY 2026-27"   },
    { name: "PF Contribution Statement",         desc: "Employee & employer PF contributions",          icon: ShieldCheck, color: "#0891b2", period: "FY 2026-27"   },
    { name: "TDS & Form 16 Report",              desc: "Tax deductions and Form 16 details",            icon: FileText,    color: "#dc2626", period: "FY 2026-27"   },
    { name: "Contract Staff Expiry Report",      desc: "Contracts due for renewal in 30/60/90 days",   icon: AlertTriangle,color: "#f59e0b",period: "Next 90 days" },
  ];

  const DEPT_COST = [
    { dept: "Hostel Management", count: 3, netCost: EMPLOYEES.filter(e=>e.dept==="Hostel Management").reduce((a,e)=>a+e.net,0) },
    { dept: "Administration",    count: 2, netCost: EMPLOYEES.filter(e=>e.dept==="Administration").reduce((a,e)=>a+e.net,0) },
    { dept: "Sports Training",   count: 2, netCost: EMPLOYEES.filter(e=>e.dept==="Sports Training").reduce((a,e)=>a+e.net,0) },
    { dept: "Finance",           count: 1, netCost: EMPLOYEES.filter(e=>e.dept==="Finance").reduce((a,e)=>a+e.net,0) },
    { dept: "Infrastructure",    count: 1, netCost: EMPLOYEES.filter(e=>e.dept==="Infrastructure").reduce((a,e)=>a+e.net,0) },
  ];
  const maxCost = Math.max(...DEPT_COST.map(d => d.netCost));

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Reports & Analytics</h1>
          <p className="text-xs text-gray-400 mt-0.5">Generate and download HR & payroll reports</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-cyan-400 transition">
          <Download className="h-3.5 w-3.5" /> Export All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {REPORTS.map((r, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${r.color}15` }}>
                <r.icon className="h-5 w-5" style={{ color: r.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 text-sm leading-tight">{r.name}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{r.desc}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{r.period}</span>
              <button className="h-7 px-3 rounded-lg text-white text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition" style={{ background: r.color }}>
                <Download className="h-3 w-3" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dept cost chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionHeader title="Department-wise Net Payroll Cost — June 2027" />
        <div className="space-y-4">
          {DEPT_COST.map((d, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-gray-700">{d.dept}</span>
                <div className="text-right">
                  <span className="text-xs font-black text-gray-900">₹{d.netCost.toLocaleString("en-IN")}</span>
                  <span className="text-[10px] text-gray-400 ml-2">{d.count} staff</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(d.netCost / maxCost) * 100}%`, background: PRIMARY }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HR PORTAL SHELL
═══════════════════════════════════════════════════════ */
const HR_NAV = [
  { id: "dashboard",   label: "Dashboard",               icon: LayoutDashboard, badge: 0 },
  { id: "employees",   label: "Employee Records",         icon: Users,           badge: 0 },
  { id: "attendance",  label: "Attendance",               icon: Clock,           badge: 0 },
  { id: "leave",       label: "Leave Management",         icon: Calendar,        badge: 2 },
  { id: "performance", label: "Performance",              icon: Star,            badge: 0 },
  { id: "payroll",     label: "Payroll Processing",       icon: CreditCard,      badge: 0 },
  { id: "deductions",  label: "Deductions & Claims",      icon: Minus,           badge: 2 },
  { id: "compliance",  label: "Statutory Compliance",     icon: ShieldCheck,     badge: 3 },
  { id: "reports",     label: "Reports & Analytics",      icon: BarChart3,       badge: 0 },
];

export function HRPortal({ onBack }: { onBack: () => void }) {
  const [nav, setNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  function renderScreen() {
    switch (nav) {
      case "dashboard":   return <ScreenDashboard setNav={setNav} />;
      case "employees":   return <ScreenEmployees />;
      case "attendance":  return <ScreenAttendance />;
      case "leave":       return <ScreenLeave />;
      case "performance": return <ScreenPerformance />;
      case "payroll":     return <ScreenPayroll />;
      case "deductions":  return <ScreenDeductions />;
      case "compliance":  return <ScreenCompliance />;
      case "reports":     return <ScreenReports />;
      default:            return <ScreenDashboard setNav={setNav} />;
    }
  }

  const activeLabel = HR_NAV.find(n => n.id === nav)?.label || "Dashboard";

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f6fa" }}>
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-[220px]"} shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen z-30 bg-white border-r border-gray-100 shadow-sm`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-gray-100 min-h-[64px]">
          <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0 text-white font-black text-xs" style={{ background: PRIMARY }}>
            <Briefcase className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-black text-gray-900 text-sm leading-none">HR Portal</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Employee & Payroll</div>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)} className="ml-auto text-gray-300 hover:text-gray-600 transition shrink-0">
            <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
          {HR_NAV.map(item => (
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
            <button onClick={() => setNav("dashboard")} className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-cyan-400 hover:text-cyan-600 transition shrink-0">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          )}
          <div className="text-sm text-gray-500">
            <span className="font-black text-gray-900 cursor-pointer hover:text-cyan-600 transition" onClick={() => setNav("dashboard")}>HR Portal</span>
            <ChevronRight className="inline h-3.5 w-3.5 mx-1 text-gray-300" />
            <span className="font-semibold">{activeLabel}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
              {["EN", "HI", "MR"].map(l => (
                <button key={l} className={`px-2 py-1 rounded text-[11px] font-bold transition ${l === "EN" ? "bg-white shadow-sm" : "text-gray-400"}`}>{l}</button>
              ))}
            </div>
            <button className="relative h-8 w-8 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-cyan-400 transition">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[8px] font-black grid place-items-center">5</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full grid place-items-center text-white text-xs font-black shrink-0" style={{ background: PRIMARY }}>AP</div>
              <div>
                <div className="text-xs font-bold text-gray-800 leading-none">A. Pawar</div>
                <div className="text-[10px] font-bold" style={{ color: ACCENT }}>HR ADMIN</div>
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

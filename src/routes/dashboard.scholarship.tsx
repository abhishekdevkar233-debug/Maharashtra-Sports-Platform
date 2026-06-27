import { createFileRoute } from "@tanstack/react-router";
import { DashHeader, Kpi, Panel, DonutChart, AnimBar, DashFooter } from "@/components/dashboards/DashShell";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Wallet, BadgeCheck, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/dashboard/scholarship")({
  head: () => ({ meta: [{ title: "School National Competitions Scholarship" }] }),
  component: Page,
});

const GENDER_DONUT = [
  { label: "Boys",  value: 51, color: "#363092" },
  { label: "Girls", value: 49, color: "#FF6B35" },
];

const AGE_DONUT = [
  { label: "Under 17", value: 38, color: "#363092" },
  { label: "Under 19", value: 35, color: "#FF6B35" },
  { label: "Under 14", value: 25, color: "#0d9488" },
  { label: "Under 11", value: 2,  color: "#7c3aed" },
];

const TOP = [
  { name: "Pune",             value: 685430 },
  { name: "Kolhapur",         value: 415780 },
  { name: "Mumbai City",      value: 298450 },
  { name: "Nashik",           value: 215670 },
  { name: "Mumbai Suburban",  value: 185430 },
  { name: "Sangli",           value: 145300 },
  { name: "Satara",           value: 132950 },
  { name: "Thane",            value: 110940 },
];

const UTIL_BARS = [
  { label: "Pune",       value: 92 },
  { label: "Kolhapur",   value: 85 },
  { label: "Mumbai",     value: 78 },
  { label: "Nashik",     value: 71 },
  { label: "Nagpur",     value: 66 },
  { label: "Sangli",     value: 58 },
];

const ROWS = [
  ["Aarav Patil",       "Modern School, Pune",           "₹12,450"],
  ["Sneha Kale",        "Vidya Niketan, Kolhapur",       "₹9,800"],
  ["Rohan Deshmukh",    "St. Xavier's, Mumbai",          "₹8,600"],
  ["Priya Naik",        "Symbiosis School, Nashik",      "₹7,200"],
  ["Vikas Jadhav",      "Govt. High School, Sangli",     "₹6,950"],
  ["Anjali Pawar",      "Bharati Vidyapeeth, Pune",      "₹5,400"],
  ["Karthik Shinde",    "Sharada Vidyalaya, Satara",     "₹4,800"],
];

function Page() {
  return (
    <div className="min-h-screen" style={{ background: "#F4F6FB" }}>
      <DashHeader
        title="School National and Other Competitions"
        subtitle="Participants & Medalists Scholarship Tracking · FY 2026-27"
        updated="28 Jun 2026, 09:45 AM"
        right={
          <div className="flex flex-wrap gap-2 items-center">
            <select className="h-9 px-3 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-[#363092]">
              <option>Game: All</option>
            </select>
            <div className="flex items-center gap-1">
              {["2024-25","2025-26","2026-27"].map(y => (
                <label key={y} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 cursor-pointer hover:border-[#363092] bg-white text-xs font-semibold text-gray-600">
                  <input type="checkbox" defaultChecked className="h-3 w-3 accent-[#363092]" /> {y}
                </label>
              ))}
            </div>
            <div className="flex gap-1">
              {["Gold","Silver","Bronze","Participation"].map(r => (
                <button key={r} className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold border border-gray-200 bg-white text-gray-600 hover:bg-[#363092] hover:text-white hover:border-[#363092] transition">{r}</button>
              ))}
            </div>
          </div>
        }
      />

      <div className="container-page py-7 space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi label="Total Scholarship Amount" value="₹1,69,25,950" numeric={169.26} prefix="₹" suffix=" Lakh" sub="FY 2026-27 sanctioned" tone="indigo" icon={Wallet} />
          <Kpi label="Total Paid Amount"         value="₹1,69,25,950" numeric={169.26} prefix="₹" suffix=" Lakh" sub="100% disbursed"         tone="teal"   icon={BadgeCheck} />
          <Kpi label="Total Balance"             value="₹0"           numeric={0}      prefix="₹"                sub="Fully settled"           tone="orange" icon={Wallet} />
          <Kpi label="Total Players"             value="2,713"        numeric={2713}   decimals={0}              sub="Across 36 districts"     tone="violet" icon={Users} />
        </div>

        {/* Middle row */}
        <div className="grid xl:grid-cols-3 gap-5">

          {/* Charts */}
          <div className="xl:col-span-2 grid sm:grid-cols-2 gap-5">

            <Panel title="Scholarship by Gender">
              <DonutChart segments={GENDER_DONUT} />
            </Panel>

            <Panel title="Scholarship by Age Group">
              <DonutChart segments={AGE_DONUT} />
            </Panel>

            <Panel title="Top Districts by Scholarship (₹)" className="sm:col-span-2">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TOP} layout="vertical" margin={{ left: 8, right: 32, top: 4, bottom: 4 }}>
                    <XAxis type="number" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                      tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                    <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Scholarship"]}
                      contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} />
                    <Bar dataKey="value" fill="#363092" radius={[0, 8, 8, 0]} maxBarSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <Panel title="District Utilization">
              <div className="space-y-4">
                {UTIL_BARS.map(d => (
                  <AnimBar key={d.label} label={d.label} value={d.value}
                    color={d.value >= 80 ? "#16a34a" : d.value >= 65 ? "#363092" : "#FF6B35"} />
                ))}
              </div>
            </Panel>

            <Panel title="Quick Stats">
              <div className="space-y-3">
                {[
                  { label: "Sports covered",    val: "27",     color: "#363092" },
                  { label: "Avg. per athlete",  val: "₹6,238", color: "#0d9488" },
                  { label: "Gold medalists",    val: "341",    color: "#d97706" },
                  { label: "Female athletes",   val: "48.9%",  color: "#FF6B35" },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-600">{s.label}</span>
                    <span className="text-sm font-black" style={{ color: s.color }}>{s.val}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        {/* Player table */}
        <Panel title="Player-wise Scholarship Details" badge={`${ROWS.length} Records`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 py-3 px-4">#</th>
                  <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 py-3 px-4">Player Name</th>
                  <th className="text-left text-[10px] uppercase tracking-widest font-bold text-gray-400 py-3 px-4">School</th>
                  <th className="text-right text-[10px] uppercase tracking-widest font-bold text-gray-400 py-3 px-4">Scholarship (₹)</th>
                  <th className="text-center text-[10px] uppercase tracking-widest font-bold text-gray-400 py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([n, s, a], i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30 transition group">
                    <td className="py-3 px-4 text-xs text-gray-400">{String(i+1).padStart(2,"0")}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full grid place-items-center text-white text-[10px] font-black shrink-0"
                          style={{ background: `linear-gradient(135deg,#363092,#FF6B35)` }}>
                          {(n as string).split(" ").map((w: string) => w[0]).join("").slice(0,2)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{n}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{s}</td>
                    <td className="py-3 px-4 text-right text-sm font-bold text-gray-900">{a}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" /> Paid
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#363092]/5">
                  <td colSpan={3} className="py-3 px-4 text-sm font-black text-[#363092]">Total</td>
                  <td className="py-3 px-4 text-right text-sm font-black text-[#363092]">₹1,69,25,950</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>

      </div>
      <DashFooter note="Data covers FY 2024-25 through FY 2026-27. All amounts in ₹ unless specified." />
    </div>
  );
}

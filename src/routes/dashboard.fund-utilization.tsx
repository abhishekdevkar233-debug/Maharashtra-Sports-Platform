import { createFileRoute } from "@tanstack/react-router";
import { DashHeader, Kpi, Panel, SchemeRow, DonutChart, AnimBar, DashFooter } from "@/components/dashboards/DashShell";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Wallet, Trophy, Building2, TrendingUp, X, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/fund-utilization")({
  head: () => ({ meta: [{ title: "Individual Benefit Schemes — Fund Dashboard" }] }),
  component: Page,
});

const DEPTS = [
  { name: "Sports & Youth Services", value: 427.15 },
  { name: "Public Works Dept",       value: 287.45 },
  { name: "Rural Development",       value: 248.90 },
  { name: "School Education",        value: 187.75 },
  { name: "Tribal Development",      value: 153.21 },
  { name: "Urban Development",       value: 117.84 },
  { name: "Health Department",       value: 84.56  },
  { name: "PWD (WRD)",               value: 56.32  },
];

const DONUT_SEGMENTS = [
  { label: "Individual Benefit",    value: 32, color: "#363092" },
  { label: "Infrastructure",        value: 27, color: "#FF6B35" },
  { label: "Sports Development",    value: 22, color: "#0d9488" },
  { label: "Other Schemes",         value: 19, color: "#7c3aed" },
];

const DISTRICT_UTIL = [
  { label: "Pune",       value: 88 },
  { label: "Mumbai",     value: 81 },
  { label: "Nashik",     value: 74 },
  { label: "Nagpur",     value: 69 },
  { label: "Aurangabad", value: 63 },
  { label: "Kolhapur",   value: 57 },
];

const BAR_COLORS = ["#363092", "#4a3fa8", "#5e50be", "#7260d4", "#8671ea", "#9a82ff"];

function Page() {
  return (
    <div className="min-h-screen" style={{ background: "#F4F6FB" }}>
      <DashHeader
        title="Individual Benefit Schemes Dashboard"
        subtitle="Fund allocation, utilization & scheme-wise breakdown · FY 2026-27"
        updated="28 Jun 2026, 09:45 AM"
        right={
          <div className="flex gap-2">
            <button className="h-9 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 flex items-center gap-1.5 hover:border-[#363092] hover:text-[#363092] transition bg-white">
              <X className="h-3.5 w-3.5" /> Clear Filters
            </button>
            <button className="h-9 px-3 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 transition"
              style={{ background: "linear-gradient(135deg,#363092,#1e2a7a)" }}>
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        }
      />

      <div className="container-page py-7 space-y-6">

        {/* ── KPI Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi
            label="Total Approved Amount"
            value="₹163.45 Cr"
            numeric={163.45} prefix="₹" suffix=" Cr"
            sub="Sanctioned FY 2026-27"
            tone="indigo"
            icon={Wallet}
          />
          <Kpi
            label="Individual Benefit Schemes"
            value="₹251.19 Cr"
            numeric={251.19} prefix="₹" suffix=" Cr"
            sub="Total beneficiaries reached"
            tone="orange"
            icon={Trophy}
          />
          <Kpi
            label="Infrastructure Investment"
            value="₹209.67 Cr"
            numeric={209.67} prefix="₹" suffix=" Cr"
            sub="Active across 36 districts"
            tone="teal"
            icon={Building2}
          />
          <Kpi
            label="Sports Development Budget"
            value="₹175.25 Cr"
            numeric={175.25} prefix="₹" suffix=" Cr"
            sub="Programs & grants"
            tone="violet"
            icon={TrendingUp}
          />
        </div>

        {/* ── Middle row ── */}
        <div className="grid xl:grid-cols-3 gap-5">

          {/* Schemes list */}
          <Panel title="Individual Benefit Schemes" badge="3 ACTIVE SCHEMES" className="xl:col-span-2">
            <div className="space-y-3">
              <SchemeRow
                name="National & International Player Financial Assistance"
                code="2204-1658"
                fy="FY 2026-27"
                amount="₹163.45 Cr"
                allocated="100% allocated"
                icon={Trophy}
                tone="indigo"
              />
              <SchemeRow
                name="Olympic / National / State Championship Medalist Reward"
                code="2204-5321"
                fy="FY 2026-27"
                amount="₹251.19 Cr"
                allocated="100% allocated"
                icon={Trophy}
                tone="orange"
              />
              <SchemeRow
                name="Sports Excellence Scholarship — Elite Track"
                code="2204-8874"
                fy="FY 2026-27"
                amount="₹87.62 Cr"
                allocated="94% allocated"
                icon={Trophy}
                tone="teal"
              />
              <SchemeRow
                name="District Level Athlete Support Grant"
                code="2204-3310"
                fy="FY 2026-27"
                amount="₹42.30 Cr"
                allocated="78% allocated"
                icon={Building2}
                tone="violet"
              />
            </div>

            {/* Totals row */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-700">Total Sanctioned</span>
              <span className="text-lg font-black text-[#363092]">₹544.56 Cr</span>
            </div>
          </Panel>

          {/* Funding Distribution */}
          <Panel title="Funding Distribution">
            <DonutChart segments={DONUT_SEGMENTS} />
            <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
              {DONUT_SEGMENTS.map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
                    <span className="text-xs text-gray-600">{s.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.color, transition: "width 1.2s ease" }} />
                    </div>
                    <span className="text-xs font-bold w-8 text-right" style={{ color: s.color }}>{s.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* ── Bottom row ── */}
        <div className="grid xl:grid-cols-3 gap-5">

          {/* Bar chart — dept-wise */}
          <Panel title="Approved Fund by Department (₹ Cr)" badge="TOP 8" className="xl:col-span-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEPTS} layout="vertical" margin={{ left: 8, right: 32, top: 4, bottom: 4 }}>
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={148} tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(v: number) => [`₹${v.toFixed(2)} Cr`, "Fund"]}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12, boxShadow: "0 4px 20px -4px rgba(0,0,0,0.1)" }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={18}>
                    {DEPTS.map((_, i) => (
                      <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* District utilization */}
          <Panel title="District-wise Utilization">
            <div className="space-y-4">
              {DISTRICT_UTIL.map(d => (
                <AnimBar key={d.label} label={d.label} value={d.value}
                  color={d.value >= 80 ? "#16a34a" : d.value >= 65 ? "#363092" : "#FF6B35"} />
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-4 text-[11px]">
              {[["#16a34a","≥ 80%"],["#363092","65–79%"],["#FF6B35","< 65%"]].map(([c, l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: c }} />
                  <span className="text-gray-500">{l}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

      </div>
      <DashFooter note="All amounts are in ₹ Crore unless otherwise specified. Data as of 28 Jun 2026." />
    </div>
  );
}

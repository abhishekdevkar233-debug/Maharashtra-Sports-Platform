import { createFileRoute } from "@tanstack/react-router";
import { DashHeader, Kpi, Panel, DashFooter } from "@/components/dashboards/DashShell";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { ChevronRight, BarChart3, X } from "lucide-react";

export const Route = createFileRoute("/dashboard/fund-utilization")({
  head: () => ({ meta: [{ title: "State Sports Complex Fund Utilization" }] }),
  component: Page,
});

const DEPTS = [
  { name: "Sports & Youth Services", value: 42715.23 },
  { name: "Public Works Dept", value: 28745.91 },
  { name: "Rural Development", value: 24890.14 },
  { name: "School Education", value: 18775.60 },
  { name: "Tribal Development", value: 15321.08 },
  { name: "Urban Development", value: 11784.91 },
  { name: "Health Department", value: 8456.27 },
  { name: "PWD (WRD)", value: 5632.33 },
  { name: "Other Departments", value: 2568.45 },
  { name: "Women & Child Dev", value: 758.77 },
];
const SPLIT = [
  { name: "Released", value: 41.09, color: "#363092" },
  { name: "Utilized", value: 58.91, color: "#FF6B35" },
];

function Filter({ label, withArrow }: { label: string; withArrow?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <select className="h-10 px-3 pr-8 rounded-lg border border-gray-300 text-sm bg-white min-w-[160px]">
        <option>{label}: All</option>
      </select>
      {withArrow && <button className="h-10 w-10 rounded-lg border border-gray-300 grid place-items-center text-gray-500 hover:border-[#363092] hover:text-[#363092]"><ChevronRight className="h-4 w-4" /></button>}
    </div>
  );
}

function Page() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashHeader
        title="State Sports Complex Fund Utilization"
        subtitle="Financial Overview Dashboard"
        right={<button className="inline-flex items-center gap-1 text-xs font-semibold border border-gray-300 hover:border-[#363092] rounded-md px-3 py-2"><X className="h-3 w-3" /> Clear All Filters</button>}
      />
      <div className="container-page py-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi label="Total Approved Fund" value="₹1,59,890.69 Cr" tone="indigo" />
          <Kpi label="Total Released Fund" value="₹941.70 Cr" tone="orange" />
          <Kpi label="Total Utilized Fund" value="₹65,698.78 Cr" tone="teal" />
          <Kpi label="Total Pending Fund" value="₹0.00 Cr" tone="violet" />
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 p-4 flex flex-wrap gap-3">
          <Filter label="Department" withArrow />
          <Filter label="District" withArrow />
          <Filter label="Taluka" />
          <Filter label="Scheme" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Panel title="Approved Fund by Department (₹ Cr)" className="xl:col-span-1">
            <div className="h-[420px]">
              <ResponsiveContainer>
                <BarChart data={DEPTS} layout="vertical" margin={{ left: 8, right: 24 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")} Cr`} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {DEPTS.map((_, i) => <Cell key={i} fill={i === 0 ? "#363092" : `rgba(54,48,146,${0.85 - i * 0.07})`} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Fund Released vs Utilized (₹ Cr)">
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={SPLIT} dataKey="value" outerRadius={100} label={(e: { value: number }) => `${e.value.toFixed(2)}%`}>
                    {SPLIT.map(s => <Cell key={s.name} fill={s.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs">
              {SPLIT.map(s => (
                <div key={s.name} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />{s.name} · {s.value}%</div>
              ))}
            </div>
          </Panel>

          <Panel title="Fund Utilization Overview">
            <div className="h-[420px] grid place-items-center text-center px-6">
              <div>
                <div className="mx-auto h-16 w-16 rounded-2xl bg-[#363092]/10 text-[#363092] grid place-items-center">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h4 className="mt-4 font-bold text-gray-900">No data selected</h4>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">Please select value from filters to view analytics.</p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
      <DashFooter note="All amounts are in ₹ Crore unless otherwise specified." />
    </div>
  );
}

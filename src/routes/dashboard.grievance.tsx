import { createFileRoute } from "@tanstack/react-router";
import { DashHeader, Kpi, Panel, DashFooter } from "@/components/dashboards/DashShell";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard/grievance")({
  head: () => ({ meta: [{ title: "Grievance Redressal Intelligence Dashboard" }] }),
  component: Page,
});

const STATUS = [
  { name: "Auto Closed", value: 258, pct: 68.62, color: "#6B7280" },
  { name: "Reassigned", value: 45, pct: 11.97, color: "#363092" },
  { name: "Escalated", value: 36, pct: 9.57, color: "#dc2626" },
  { name: "Closed", value: 9, pct: 2.39, color: "#0d9488" },
  { name: "Assigned", value: 6, pct: 1.60, color: "#7c3aed" },
  { name: "Submitted", value: 5, pct: 1.33, color: "#FF6B35" },
  { name: "Resolved", value: 3, pct: 0.80, color: "#16a34a" },
  { name: "Forwarded For Input", value: 3, pct: 0.80, color: "#0891b2" },
  { name: "Transferred", value: 2, pct: 0.53, color: "#d97706" },
  { name: "Received with Input", value: 1, pct: 0.27, color: "#94a3b8" },
];
const TREND = [
  { m: "Nov", Submitted: 32, Resolved: 18, Closed: 22 },
  { m: "Dec", Submitted: 28, Resolved: 22, Closed: 25 },
  { m: "Jan", Submitted: 41, Resolved: 30, Closed: 33 },
  { m: "Feb", Submitted: 35, Resolved: 27, Closed: 28 },
  { m: "Mar", Submitted: 38, Resolved: 32, Closed: 30 },
  { m: "Apr", Submitted: 42, Resolved: 35, Closed: 36 },
  { m: "May", Submitted: 30, Resolved: 28, Closed: 26 },
  { m: "Jun", Submitted: 26, Resolved: 24, Closed: 24 },
  { m: "Jul", Submitted: 34, Resolved: 30, Closed: 32 },
  { m: "Aug", Submitted: 29, Resolved: 25, Closed: 27 },
  { m: "Sep", Submitted: 22, Resolved: 19, Closed: 21 },
  { m: "Oct", Submitted: 19, Resolved: 16, Closed: 18 },
];
const RECENT: Array<{ id: string; sub: string; st: string; tone: string; date: string }> = [
  { id: "GRV/2026/10/375", sub: "Sports Scholarship Delay", st: "Assigned", tone: "#7c3aed", date: "31 Oct" },
  { id: "GRV/2026/10/374", sub: "Facility Maintenance Issue", st: "Escalated", tone: "#dc2626", date: "31 Oct" },
  { id: "GRV/2026/10/373", sub: "Coach Payment Pending", st: "Reassigned", tone: "#363092", date: "30 Oct" },
  { id: "GRV/2026/10/372", sub: "Sports Kit Not Received", st: "Auto Closed", tone: "#6B7280", date: "30 Oct" },
  { id: "GRV/2026/10/371", sub: "Training Ground Issue", st: "Closed", tone: "#0d9488", date: "29 Oct" },
];

function Page() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashHeader
        title="Grievance Redressal Intelligence Dashboard"
        subtitle="Sports & Youth Services · FY 2026-27"
        updated="31 Oct 2026, 09:00 AM"
        right={<select className="h-9 px-3 rounded-lg border border-gray-300 text-xs bg-white"><option>26 Oct 2016 – 31 Oct 2026</option></select>}
      />
      <div className="container-page py-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <Kpi label="Resolved Grievances" value="273" sub="72.60% of Total" tone="teal" />
          <Kpi label="Total Submitted" value="376" sub="100%" tone="indigo" />
          <Kpi label="Assigned Cases" value="7" sub="1.86%" tone="violet" />
          <Kpi label="Escalated Cases" value="36" sub="9.57%" tone="red" />
          <Kpi label="Forwarded Cases" value="3" sub="0.80%" tone="amber" />
          <Kpi label="Avg Resolution Time" value="824.33 d" sub="Days" tone="gray" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Panel title="% of Total Grievance Status by Status">
            <div className="relative h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={STATUS} dataKey="value" innerRadius={70} outerRadius={100} paddingAngle={1}>
                    {STATUS.map(s => <Cell key={s.name} fill={s.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v} cases`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Total Received</div>
                  <div className="text-3xl font-bold text-gray-900">376</div>
                </div>
              </div>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs">
                <tbody>
                  {STATUS.map(s => (
                    <tr key={s.name} className="border-b border-gray-100">
                      <td className="py-1.5 pr-2"><span className="inline-block h-2.5 w-2.5 rounded-sm align-middle mr-2" style={{ background: s.color }} />{s.name}</td>
                      <td className="py-1.5 text-right font-semibold">{s.value}</td>
                      <td className="py-1.5 text-right text-gray-500 w-16">{s.pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <div className="space-y-4">
            <div className="rounded-2xl p-4 text-white" style={{ background: "linear-gradient(135deg,#363092,#2a2470)" }}>
              <div className="text-[11px] uppercase tracking-wider opacity-80 font-bold">Total Grievances Received</div>
              <div className="text-3xl font-bold mt-1">376</div>
            </div>
            <Panel title="Grievance Status Overview">
              <div className="h-80">
                <ResponsiveContainer>
                  <BarChart data={STATUS} layout="vertical" margin={{ left: 8, right: 60 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} label={{ position: "right", fontSize: 10, formatter: (v: unknown) => `${v}` }}>
                      {STATUS.map(s => <Cell key={s.name} fill={s.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Panel title="Grievance Trend Over Time" className="xl:col-span-1">
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="m" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="Submitted" stroke="#363092" strokeWidth={2} />
                  <Line type="monotone" dataKey="Resolved" stroke="#0d9488" strokeWidth={2} />
                  <Line type="monotone" dataKey="Closed" stroke="#FF6B35" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Resolution Time (In Days)">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-2xl bg-[#363092]/10 text-[#363092] grid place-items-center shrink-0">
                <Clock className="h-10 w-10" />
              </div>
              <div className="grid grid-cols-3 gap-3 flex-1 text-center">
                <div><div className="text-[10px] uppercase text-gray-500 font-bold">Avg</div><div className="text-xl font-bold text-gray-900">824.33</div></div>
                <div><div className="text-[10px] uppercase text-gray-500 font-bold">Median</div><div className="text-xl font-bold text-gray-900">312</div></div>
                <div><div className="text-[10px] uppercase text-gray-500 font-bold">Max</div><div className="text-xl font-bold text-gray-900">2,145</div></div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">Includes auto-closed and reassigned cases. Outliers contribute to a high mean.</div>
          </Panel>

          <Panel title="Recent Grievances" action={<button className="text-xs font-semibold text-[#363092] hover:text-[#FF6B35]">View All</button>}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="py-2 pr-2">ID</th><th className="py-2 pr-2">Subject</th><th className="py-2 pr-2">Status</th><th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT.map(r => (
                    <tr key={r.id} className="border-b border-gray-100">
                      <td className="py-2 pr-2 font-mono text-[10px] text-gray-600 whitespace-nowrap">{r.id}</td>
                      <td className="py-2 pr-2 text-gray-900">{r.sub}</td>
                      <td className="py-2 pr-2"><span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: r.tone }}>{r.st}</span></td>
                      <td className="py-2 text-gray-500 whitespace-nowrap">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
      <DashFooter note="Disclaimer: Figures reflect grievances logged through official channels only." />
    </div>
  );
}

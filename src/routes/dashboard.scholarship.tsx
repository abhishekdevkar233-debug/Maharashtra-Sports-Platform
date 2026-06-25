import { createFileRoute } from "@tanstack/react-router";
import { DashHeader, Kpi, Panel, DashFooter } from "@/components/dashboards/DashShell";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/dashboard/scholarship")({
  head: () => ({ meta: [{ title: "School National Competitions Scholarship" }] }),
  component: Page,
});

const GENDER = [{ name: "Boys", value: 50.94, color: "#363092" }, { name: "Girls", value: 49.06, color: "#FF6B35" }];
const AGE = [
  { name: "Under 17", value: 38.44, color: "#363092" },
  { name: "Under 19", value: 35.02, color: "#FF6B35" },
  { name: "Under 14", value: 25.29, color: "#0d9488" },
  { name: "Under 11", value: 0.66, color: "#7c3aed" },
];
const TOP = [
  { name: "Pune", value: 685430 }, { name: "Kolhapur", value: 415780 },
  { name: "Mumbai City", value: 298450 }, { name: "Nashik", value: 215670 },
  { name: "Mumbai Suburban", value: 185430 }, { name: "Sangli", value: 145300 },
  { name: "Satara", value: 132950 }, { name: "Thane", value: 110940 },
];
const ROWS = [
  ["Aarav Patil", "Modern School, Pune", "12,450"],
  ["Sneha Kale", "Vidya Niketan, Kolhapur", "9,800"],
  ["Rohan Deshmukh", "St. Xavier's, Mumbai", "8,600"],
  ["Priya Naik", "Symbiosis School, Nashik", "7,200"],
  ["Vikas Jadhav", "Govt. High School, Sangli", "6,950"],
  ["Anjali Pawar", "Bharati Vidyapeeth, Pune", "5,400"],
  ["Karthik Shinde", "Sharada Vidyalaya, Satara", "4,800"],
];

function Page() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashHeader
        title="School National and Other Competitions"
        subtitle="Participants & Medalists Scholarship Tracking"
        right={
          <div className="flex flex-wrap gap-2 items-center">
            <select className="h-9 px-3 rounded-lg border border-gray-300 text-xs bg-white"><option>Game: All</option></select>
            <div className="flex items-center gap-1 text-xs">
              {["Blank", "2022-23", "2023-24", "2024-25"].map(y => (
                <label key={y} className="flex items-center gap-1 px-2 py-1 rounded-md border border-gray-300 cursor-pointer hover:border-[#363092]">
                  <input type="checkbox" defaultChecked={y !== "Blank"} className="h-3 w-3" /> {y}
                </label>
              ))}
            </div>
            <div className="flex gap-1">
              {["First", "Second", "Third", "Participation"].map(r => (
                <button key={r} className="px-2.5 py-1 rounded-md text-[11px] font-semibold border border-gray-300 hover:bg-[#363092] hover:text-white hover:border-[#363092] transition">{r}</button>
              ))}
            </div>
          </div>
        }
      />
      <div className="container-page py-6 grid grid-cols-1 xl:grid-cols-[1fr,260px] gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Kpi label="Total Scholarship" value="₹1,69,25,950" tone="indigo" />
            <Kpi label="Total Paid Amount" value="₹1,69,25,950" tone="teal" />
            <Kpi label="Total Balance" value="₹0" tone="orange" />
            <Kpi label="Total Players" value="2,713" tone="violet" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Panel title="Scholarship by Gender">
              <div className="h-56">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={GENDER} dataKey="value" innerRadius={50} outerRadius={80}>
                      {GENDER.map(g => <Cell key={g.name} fill={g.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-3 text-xs">
                {GENDER.map(g => <div key={g.name} className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: g.color }} />{g.name} {g.value}%</div>)}
              </div>
            </Panel>
            <Panel title="Scholarship by Age Group">
              <div className="h-56">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={AGE} dataKey="value" innerRadius={50} outerRadius={80}>
                      {AGE.map(a => <Cell key={a.name} fill={a.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                {AGE.map(a => <div key={a.name} className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm" style={{ background: a.color }} />{a.name} ({a.value}%)</div>)}
              </div>
            </Panel>
            <Panel title="Top Districts by Scholarship (₹)">
              <div className="h-56">
                <ResponsiveContainer>
                  <BarChart data={TOP} layout="vertical" margin={{ left: 4, right: 8 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
                    <Bar dataKey="value" fill="#363092" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>

          <Panel title="Player-wise Scholarship Details">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="py-2 px-3">Player Name</th><th className="py-2 px-3">School Name</th><th className="py-2 px-3 text-right">Scholarship Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(([n, s, a]) => (
                    <tr key={n} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2.5 px-3 font-medium text-gray-900">{n}</td>
                      <td className="py-2.5 px-3 text-gray-600">{s}</td>
                      <td className="py-2.5 px-3 text-right font-semibold">{a}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#363092]/5 font-bold">
                    <td colSpan={2} className="py-3 px-3 text-[#363092]">Total</td>
                    <td className="py-3 px-3 text-right text-[#363092]">₹1,69,25,950</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <aside className="rounded-2xl border border-gray-200 bg-white p-4 h-fit">
          <div className="text-xs font-bold text-[#363092] uppercase tracking-wider">Note</div>
          <p className="mt-2 text-xs text-gray-600 leading-relaxed">All amounts are in ₹ unless otherwise specified.</p>
        </aside>
      </div>
      <DashFooter note="Data covers FY 2022-23 through FY 2024-25." />
    </div>
  );
}

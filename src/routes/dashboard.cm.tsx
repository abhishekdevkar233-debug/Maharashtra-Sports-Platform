import { createFileRoute } from "@tanstack/react-router";
import { DashHeader, DashFooter } from "@/components/dashboards/DashShell";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { MapPin, ArrowRight, TrendingUp, Wallet, Building2, Trophy } from "lucide-react";

export const Route = createFileRoute("/dashboard/cm")({
  head: () => ({ meta: [{ title: "CM Sports Development Dashboard — FY 2024-25" }] }),
  component: Page,
});

const KPIS = [
  { label: "Total Approved Amount", value: "₹163.45 Cr", sub: "Sanctioned FY 2024-25", icon: Wallet, color: "#363092" },
  { label: "Individual Benefit Schemes", value: "₹251.19 Cr", sub: "Total beneficiaries reached", icon: Trophy, color: "#FF6B35" },
  { label: "Infrastructure Investment", value: "₹209.67 Cr", sub: "Active across 36 districts", icon: Building2, color: "#0d9488" },
  { label: "Sports Development Budget", value: "₹175.25 Cr", sub: "Programs & grants", icon: TrendingUp, color: "#7c3aed" },
];

const INDIVIDUAL = [
  { name: "National & International Player Financial Assistance", code: "2204-1658", amt: "₹163.45 Cr", pct: 100 },
  { name: "Olympic / National / State Championship Medalist Reward", code: "2204-5321", amt: "₹251.19 Cr", pct: 100 },
  { name: "Kreeda Protsahan Yojana", code: "2204-1667", amt: "₹161.59 Cr", pct: 100 },
];
const INFRA = [
  { name: "District Sports Complexes", code: "2204-1701", amt: "₹209.67 Cr", pct: 95 },
  { name: "Taluka Sports Complexes", code: "2204-1702", amt: "₹130.00 Cr", pct: 90 },
  { name: "Sports Facility Maintenance Grant", code: "2204-5706", amt: "₹175.25 Cr", pct: 88 },
];
const FUNDING = [
  { name: "Individual Benefit Schemes", value: 575.23, pct: 47, color: "#363092" },
  { name: "Infrastructure & Community Schemes", value: 514.92, pct: 42, color: "#FF6B35" },
  { name: "Sports Development Grants", value: 175.25, pct: 11, color: "#0d9488" },
];
const DISTRICTS = [
  { n: "Pune", v: 92 }, { n: "Mumbai", v: 88 }, { n: "Nashik", v: 78 }, { n: "Nagpur", v: 74 },
  { n: "Kolhapur", v: 69 }, { n: "Aurangabad", v: 64 }, { n: "Thane", v: 60 }, { n: "Satara", v: 54 },
  { n: "Sangli", v: 49 }, { n: "Ahmednagar", v: 44 }, { n: "Solapur", v: 39 }, { n: "Latur", v: 33 },
];

function Gauge({ pct, color = "#363092" }: { pct: number; color?: string }) {
  const r = 32, c = 2 * Math.PI * r;
  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 80 80" className="-rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#EEF0F5" strokeWidth="7" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-base font-bold text-gray-900 leading-none">{pct}%</div>
          <div className="text-[8px] uppercase tracking-wider text-gray-400 mt-0.5">Utilized</div>
        </div>
      </div>
    </div>
  );
}

function GlassPanel({ title, action, children, className = "", accent = "#363092" }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string; accent?: string }) {
  return (
    <div className={`relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_-12px_rgba(54,48,146,0.18)] p-5 ${className}`}>
      <div className="absolute top-0 left-5 right-5 h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-[15px] tracking-tight">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function Page() {
  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg,#F5F6FB 0%,#EEF1F8 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle,#363092 0%,transparent 70%)", opacity: 0.12 }} />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full" style={{ background: "radial-gradient(circle,#FF6B35 0%,transparent 70%)", opacity: 0.1 }} />
      </div>

      <div className="relative">
        <DashHeader
          title="CM Sports Development Dashboard"
          subtitle="Financial Year 2024-25 · Government of Maharashtra"
          updated="21 May 2024, 11:30 AM"
          right={<span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Live · FY 2024-25</span>}
        />

        <div className="container-page py-6 space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {KPIS.map(({ label, value, sub, icon: I, color }) => (
              <div key={label} className="relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 p-5 shadow-[0_8px_30px_-12px_rgba(54,48,146,0.2)] overflow-hidden">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10" style={{ background: color }} />
                <div className="flex items-start justify-between">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-gray-500">{label}</div>
                  <div className="h-9 w-9 rounded-xl grid place-items-center text-white shadow-md" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                    <I className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl font-bold text-gray-900 tracking-tight">{value}</div>
                <div className="mt-1 text-[11px] font-medium" style={{ color }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Two-column 70 / 30 */}
          <div className="grid grid-cols-1 xl:grid-cols-[7fr_3fr] gap-6">
            {/* LEFT 70% */}
            <div className="space-y-6">
              <GlassPanel title="Individual Benefit Schemes" accent="#363092"
                action={<span className="text-[10px] font-bold uppercase tracking-wider bg-[#363092]/10 text-[#363092] px-2.5 py-1 rounded-full">3 Active Schemes</span>}>
                <div className="space-y-3">
                  {INDIVIDUAL.map(s => (
                    <div key={s.code} className="group rounded-xl border border-gray-200/70 bg-gradient-to-br from-white to-gray-50/50 p-4 flex flex-wrap items-center gap-4 hover:border-[#363092] hover:shadow-md transition-all">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#363092] to-[#4f48b5] grid place-items-center text-white shadow-sm">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-[220px]">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm leading-snug">{s.name}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-[#FF6B35]/10 text-[#FF6B35] px-2 py-0.5 rounded-full border border-[#FF6B35]/30">FY 2024-25</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono mt-1">Scheme Code: {s.code}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#363092]">{s.amt}</div>
                        <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 justify-end">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {s.pct}% allocated
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              <GlassPanel title="Infrastructure & Community Development Schemes" accent="#FF6B35"
                action={<span className="text-[10px] font-bold uppercase tracking-wider bg-[#FF6B35]/10 text-[#FF6B35] px-2.5 py-1 rounded-full">3 Active Projects</span>}>
                <div className="space-y-3">
                  {INFRA.map(s => (
                    <div key={s.name} className="rounded-xl border border-gray-200/70 bg-gradient-to-br from-white to-gray-50/50 p-4 flex items-center gap-4 hover:border-[#FF6B35] hover:shadow-md transition-all">
                      <Gauge pct={s.pct} color="#FF6B35" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">{s.name}</span>
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">● Active</span>
                        </div>
                        {s.code && <div className="text-[11px] text-gray-500 font-mono mt-1">Code: {s.code}</div>}
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-lg font-bold text-gray-900">{s.amt}</span>
                          <span className="text-[11px] text-gray-500">Approved allocation</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>

            {/* RIGHT 30% */}
            <div className="space-y-6">
              <GlassPanel title="Funding Distribution" accent="#363092">
                <div className="h-52">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={FUNDING} dataKey="value" innerRadius={52} outerRadius={82} paddingAngle={3}>
                        {FUNDING.map(f => <Cell key={f.name} fill={f.color} stroke="#fff" strokeWidth={2} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => `₹${v} Cr`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-2">
                  {FUNDING.map(f => (
                    <div key={f.name} className="flex items-center gap-2 text-[11px]">
                      <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: f.color }} />
                      <span className="flex-1 text-gray-700 leading-snug">{f.name}</span>
                      <span className="font-bold text-gray-900">{f.pct}%</span>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              <GlassPanel title="Budget Allocation Overview" accent="#FF6B35">
                <div className="h-44">
                  <ResponsiveContainer>
                    <BarChart data={FUNDING} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v: number) => `₹${v} Cr`} />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                        {FUNDING.map(f => <Cell key={f.name} fill={f.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassPanel>

              <GlassPanel title="District-wise Allocation" accent="#0d9488"
                action={<button className="text-[10px] font-bold uppercase tracking-wider text-[#363092] hover:text-[#FF6B35] inline-flex items-center gap-1">Details <ArrowRight className="h-3 w-3" /></button>}>
                <div className="grid grid-cols-3 gap-1.5">
                  {DISTRICTS.map(d => {
                    const intensity = d.v / 100;
                    return (
                      <div key={d.n} title={`${d.n}: ${d.v}% allocation`}
                        className="group relative rounded-lg px-2 py-2.5 text-[10px] font-semibold text-center cursor-pointer hover:scale-105 transition-transform"
                        style={{ background: `rgba(54,48,146,${0.18 + intensity * 0.75})`, color: intensity > 0.55 ? "#fff" : "#363092" }}>
                        <MapPin className="h-3 w-3 mx-auto mb-0.5 opacity-70" />
                        {d.n}
                        <div className="text-[9px] opacity-80 mt-0.5">{d.v}%</div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-500">
                  <span className="font-semibold">Low</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "linear-gradient(90deg, rgba(54,48,146,0.2), #363092)" }} />
                  <span className="font-semibold">High</span>
                </div>
                <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#363092] to-[#4f48b5] hover:from-[#FF6B35] hover:to-[#ff8556] text-white text-xs font-bold py-2.5 inline-flex items-center justify-center gap-2 shadow-md transition-all">
                  View District Details <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </GlassPanel>
            </div>
          </div>
        </div>

        <DashFooter note="All amounts are in ₹ Crore unless otherwise specified." />
      </div>
    </div>
  );
}

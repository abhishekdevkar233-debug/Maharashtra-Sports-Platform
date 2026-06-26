import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { Search, MapPin, ChevronRight, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/elite-athletes")({
  head: () => ({ meta: [{ title: "Elite Athletes" }] }),
  component: Page,
});

type Athlete = { id: string; name: string; sport: string; district: string; level: string };
const NAMES = ["Aarav Joshi", "Riya Patil", "Vikram Kale", "Sneha Desai", "Mahesh Pawar", "Priya Sawant", "Rohit Mane", "Asha Kulkarni", "Tejas Naik", "Meera Shah", "Sahil Gokhale", "Nidhi Rane"];
const SPORTS = ["Shooting", "Boxing", "Wrestling", "Badminton", "Hockey", "Athletics", "Weightlifting", "Archery", "Cycling", "Swimming", "Football", "Kabaddi"];
const DISTRICTS = ["Pune", "Mumbai", "Kolhapur", "Nagpur", "Aurangabad", "Nashik", "Pune", "Solapur", "Mumbai", "Pune", "Nagpur", "Nanded"];
const ATH: Athlete[] = NAMES.map((name, i) => ({
  id: String(i + 1), name, sport: SPORTS[i], district: DISTRICTS[i], level: i % 2 === 0 ? "National" : "International",
}));

const GRAD = [
  "from-violet-500 to-indigo-600", "from-orange-400 to-rose-500", "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-600", "from-fuchsia-400 to-pink-600", "from-sky-400 to-blue-600",
  "from-violet-500 to-purple-700", "from-rose-400 to-red-600",
];
const hash = (s: string) => s.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
const gradFor = (s: string) => GRAD[hash(s) % GRAD.length];
const initials = (n: string) => n.replace(/[.]/g, "").trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();

const PAGE_SIZE = 8;

function Page() {
  const [q, setQ] = useState("");
  const [sport, setSport] = useState("All sports");
  const [district, setDistrict] = useState("All districts");
  const [level, setLevel] = useState("All categories");
  const [page, setPage] = useState(1);

  const sports = useMemo(() => ["All sports", ...Array.from(new Set(ATH.map(a => a.sport))).sort()], []);
  const districts = useMemo(() => ["All districts", ...Array.from(new Set(ATH.map(a => a.district))).sort()], []);
  const levels = ["All categories", "National", "International"];

  const filtered = useMemo(() => ATH.filter(a =>
    a.name.toLowerCase().includes(q.toLowerCase()) &&
    (sport === "All sports" || a.sport === sport) &&
    (district === "All districts" || a.district === district) &&
    (level === "All categories" || a.level === level)
  ), [q, sport, district, level]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const shown = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const onFilter = (fn: (v: string) => void) => (v: string) => { fn(v); setPage(1); };
  const ctl = "h-11 px-4 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#363092]/30";

  return (
    <>
      <PageHero eyebrow="Athletes" title="Elite Athletes of Maharashtra" subtitle="Top-performing athletes across sports, representing the state at the highest competitive level." />
      <SectionWrap>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input value={q} onChange={e => onFilter(setQ)(e.target.value)} placeholder="Search athletes…" className={`${ctl} w-full pl-10`} />
          </div>
          <select value={sport} onChange={e => onFilter(setSport)(e.target.value)} className={ctl}>{sports.map(s => <option key={s}>{s}</option>)}</select>
          <select value={district} onChange={e => onFilter(setDistrict)(e.target.value)} className={ctl}>{districts.map(d => <option key={d}>{d}</option>)}</select>
          <select value={level} onChange={e => onFilter(setLevel)(e.target.value)} className={ctl}>{levels.map(l => <option key={l}>{l}</option>)}</select>
        </div>

        <div className="text-sm text-gray-500 mb-4">{filtered.length} athlete{filtered.length !== 1 ? "s" : ""} found</div>

        {shown.length === 0 ? (
          <div className="py-20 text-center text-gray-400">No athletes match your filters.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {shown.map(a => (
              <Link key={a.id} to="/elite-athletes/$id" params={{ id: a.id }}
                className="rounded-2xl border border-gray-200 overflow-hidden bg-white group hover:-translate-y-1 hover:shadow-xl hover:border-[#363092]/30 transition-all">
                <div className={`relative h-44 bg-gradient-to-br ${gradFor(a.sport)} grid place-items-center`}>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-bold text-[#363092] uppercase tracking-wider">{a.sport}</div>
                  <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold ${a.level === "International" ? "bg-[#FF6B35] text-white" : "bg-white/90 text-[#363092]"}`}>{a.level}</span>
                  <div className="h-20 w-20 rounded-full bg-white/25 backdrop-blur border border-white/40 grid place-items-center text-white text-2xl font-black shadow-lg group-hover:scale-105 transition">
                    {initials(a.name)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[11px] text-[#FF6B35] uppercase font-bold tracking-wider">{a.sport}</div>
                  <div className="font-bold text-gray-900 mt-0.5">{a.name}</div>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{a.district}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#363092] group-hover:gap-1.5 transition-all">Profile <ChevronRight className="h-3 w-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {pages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}
              className="h-9 w-9 grid place-items-center rounded-md border border-gray-200 disabled:opacity-40 hover:border-[#363092]"><ChevronLeft className="h-4 w-4" /></button>
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`h-9 w-9 rounded-md text-sm font-semibold ${safePage === i + 1 ? "bg-[#363092] text-white" : "border border-gray-200 hover:border-[#363092]"}`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={safePage === pages}
              className="h-9 w-9 grid place-items-center rounded-md border border-gray-200 disabled:opacity-40 hover:border-[#363092]"><ChevronRight className="h-4 w-4" /></button>
          </div>
        )}
      </SectionWrap>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ChevronRight, ChevronLeft, Trophy } from "lucide-react";
import { OLYMPIANS } from "@/data/olympians";

export const Route = createFileRoute("/olympians/")({
  head: () => ({ meta: [{ title: "Olympians — Maharashtra" }] }),
  component: Page,
});

export const initials = (n: string) =>
  n.replace(/[.]/g, "").trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();

const medalColor = (m: string) =>
  m.includes("Gold") ? "#d97706" : m.includes("Silver") ? "#6b7280" : m.includes("Bronze") ? "#b45309" : "#6366f1";

const PAGE_SIZE = 8;

function Page() {
  const [q, setQ] = useState("");
  const [sport, setSport] = useState("All sports");
  const [edition, setEdition] = useState("All editions");
  const [page, setPage] = useState(1);

  const sports = useMemo(() => ["All sports", ...Array.from(new Set(OLYMPIANS.map(o => o.sport))).sort()], []);
  const editions = useMemo(() => ["All editions", ...Array.from(new Set(OLYMPIANS.map(o => o.edition))).sort().reverse()], []);

  const filtered = useMemo(() => OLYMPIANS.filter(o =>
    o.name.toLowerCase().includes(q.toLowerCase()) &&
    (sport === "All sports" || o.sport === sport) &&
    (edition === "All editions" || o.edition === edition)
  ), [q, sport, edition]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const shown = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const reset = (fn: (v: string) => void) => (v: string) => { fn(v); setPage(1); };

  const ctl = "h-11 px-4 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#363092]/20 text-gray-700";

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-[#0f1b3d] text-white py-12">
        <div className="container-page">
          <div className="text-xs uppercase tracking-widest text-[#FF6B35] font-semibold mb-2">Athletes</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Maharashtra's Olympians</h1>
          <p className="mt-3 text-white/70 max-w-xl">Celebrating the athletes who carried Maharashtra's pride to the world's biggest stage.</p>
          {/* Stats strip */}
          <div className="mt-8 flex flex-wrap gap-8">
            {[["16", "Olympians"], ["11", "Medals"], ["7", "Sports"], ["4", "Editions"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-3xl font-black text-[#FF6B35]">{v}</div>
                <div className="text-xs text-white/60 uppercase tracking-wider mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-page py-3 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input value={q} onChange={e => reset(setQ)(e.target.value)} placeholder="Search athletes…"
              className={`${ctl} w-full pl-10`} />
          </div>
          <select value={sport} onChange={e => reset(setSport)(e.target.value)} className={ctl}>
            {sports.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={edition} onChange={e => reset(setEdition)(e.target.value)} className={ctl}>
            {editions.map(e => <option key={e}>{e === "All editions" ? e : `Olympics ${e}`}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="container-page py-8">
        <div className="text-sm text-gray-500 mb-6">{filtered.length} olympian{filtered.length !== 1 ? "s" : ""} found</div>

        {shown.length === 0 ? (
          <div className="py-24 text-center text-gray-400">No athletes match your filters.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {shown.map(o => (
              <Link key={o.id} to="/olympians/$id" params={{ id: o.id }}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                {/* Photo */}
                <div className="relative aspect-[4/4.5] overflow-hidden bg-gray-100">
                  {o.img
                    ? <img src={o.img} alt={o.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                    : <div className="w-full h-full bg-gradient-to-br from-[#363092] to-indigo-700 grid place-items-center text-white text-4xl font-black opacity-80">{initials(o.name)}</div>
                  }
                  {/* Sport pill — top left */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white text-[10px] font-bold text-gray-800 uppercase tracking-wide shadow-sm">
                    {o.sport}
                  </div>
                  {/* Medal or edition — top right */}
                  {o.medal !== "—" ? (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1 shadow-sm"
                         style={{ background: medalColor(o.medal) }}>
                      <Trophy className="h-3 w-3" />{o.medal}
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gray-600/80 text-[10px] font-bold text-white shadow-sm">
                      {o.edition}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="px-4 py-3">
                  <div className="text-[11px] font-bold text-[#FF6B35] uppercase tracking-wider">{o.sport}</div>
                  <div className="font-bold text-gray-900 text-base mt-0.5 group-hover:text-[#363092] transition-colors">{o.name}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Olympics {o.edition}</span>
                    <span className="text-xs font-semibold text-[#363092] flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                      Profile <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1}
              className="h-9 w-9 grid place-items-center rounded-full border border-gray-200 disabled:opacity-40 hover:border-[#363092] transition">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
                  safePage === i + 1 ? "bg-[#363092] text-white shadow-lg shadow-[#363092]/30" : "border border-gray-200 text-gray-700 hover:border-[#363092]"
                }`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={safePage === pages}
              className="h-9 w-9 grid place-items-center rounded-full border border-gray-200 disabled:opacity-40 hover:border-[#363092] transition">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

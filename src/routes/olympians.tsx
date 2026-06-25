import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { Search, Medal, Trophy } from "lucide-react";

export const Route = createFileRoute("/olympians")({
  head: () => ({ meta: [{ title: "Olympians — Maharashtra" }] }),
  component: Page,
});

const OLYMPIANS = [
  { id: "1", name: "P.T. Karnik", sport: "Athletics", edition: "2024", medal: "Bronze" },
  { id: "2", name: "Aarav Joshi", sport: "Shooting", edition: "2024", medal: "Silver" },
  { id: "3", name: "Riya Patil", sport: "Boxing", edition: "2020", medal: "Bronze" },
  { id: "4", name: "Vikram Kale", sport: "Wrestling", edition: "2024", medal: "—" },
  { id: "5", name: "Sneha Desai", sport: "Badminton", edition: "2024", medal: "Quarter-final" },
  { id: "6", name: "Mahesh Pawar", sport: "Hockey", edition: "2020", medal: "Bronze" },
  { id: "7", name: "Priya Sawant", sport: "Athletics", edition: "2024", medal: "—" },
  { id: "8", name: "Rohit Mane", sport: "Weightlifting", edition: "2020", medal: "—" },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Athletes" title="Maharashtra's Olympians" subtitle="Saluting the athletes who carried Maharashtra's pride to the world's biggest stage.">
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-xl">
          {[["24","Olympians"],["11","Medals"],["7","Sports"]].map(([v,l]) => (
            <div key={l} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center text-white">
              <div className="text-2xl font-bold">{v}</div>
              <div className="text-[11px] uppercase tracking-wider opacity-80">{l}</div>
            </div>
          ))}
        </div>
      </PageHero>
      <SectionWrap>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input placeholder="Search athletes…" className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200" />
          </div>
          <select className="h-11 px-4 rounded-lg border border-gray-200 text-sm"><option>All sports</option></select>
          <select className="h-11 px-4 rounded-lg border border-gray-200 text-sm"><option>All editions</option><option>2024</option><option>2020</option></select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {OLYMPIANS.map(o => (
            <Link to="/olympians/$id" params={{ id: o.id }} key={o.id} className="rounded-2xl border border-gray-200 bg-white overflow-hidden group hover:border-[#363092] transition">
              <div className="h-48 bg-gray-200" />
              <div className="p-4">
                <div className="text-[11px] uppercase text-[#FF6B35] font-bold tracking-wider">{o.sport}</div>
                <div className="font-bold text-gray-900 mt-0.5">{o.name}</div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Olympics {o.edition}</span>
                  <span className="flex items-center gap-1"><Medal className="h-3 w-3" />{o.medal}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {[1,2,3,4].map(p => <button key={p} className={`h-9 w-9 rounded-md text-sm ${p===1?"bg-[#363092] text-white":"border border-gray-200"}`}>{p}</button>)}
        </div>
      </SectionWrap>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { Search } from "lucide-react";

export const Route = createFileRoute("/elite-athletes")({
  head: () => ({ meta: [{ title: "Elite Athletes" }] }),
  component: Page,
});

const ATH = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i+1), name: ["Aarav Joshi","Riya Patil","Vikram Kale","Sneha Desai","Mahesh Pawar","Priya Sawant","Rohit Mane","Asha Kulkarni","Tejas Naik","Meera Shah","Sahil Gokhale","Nidhi Rane"][i],
  sport: ["Shooting","Boxing","Wrestling","Badminton","Hockey","Athletics","Weightlifting","Archery","Cycling","Swimming","Football","Kabaddi"][i],
  district: ["Pune","Mumbai","Kolhapur","Nagpur","Aurangabad","Nashik","Pune","Solapur","Mumbai","Pune","Nagpur","Nanded"][i],
  level: i % 2 === 0 ? "National" : "International",
}));

function Page() {
  return (
    <>
      <PageHero eyebrow="Athletes" title="Elite Athletes of Maharashtra" subtitle="Top-performing athletes across sports, representing the state at the highest competitive level." />
      <SectionWrap>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input placeholder="Search athletes…" className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200" />
          </div>
          <select className="h-11 px-4 rounded-lg border border-gray-200 text-sm"><option>All sports</option></select>
          <select className="h-11 px-4 rounded-lg border border-gray-200 text-sm"><option>All districts</option></select>
          <select className="h-11 px-4 rounded-lg border border-gray-200 text-sm"><option>All categories</option></select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {ATH.map(a => (
            <Link key={a.id} to="/elite-athletes/$id" params={{ id: a.id }} className="rounded-2xl border border-gray-200 overflow-hidden hover:border-[#363092] bg-white">
              <div className="h-48 bg-gray-200" />
              <div className="p-4">
                <div className="text-[11px] text-[#FF6B35] uppercase font-bold">{a.sport}</div>
                <div className="font-bold text-gray-900">{a.name}</div>
                <div className="mt-2 flex justify-between text-xs text-gray-500"><span>{a.district}</span><span>{a.level}</span></div>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

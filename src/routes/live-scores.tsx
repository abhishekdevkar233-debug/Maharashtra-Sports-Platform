import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";

export const Route = createFileRoute("/live-scores")({
  head: () => ({ meta: [{ title: "Live Scores" }] }),
  component: Page,
});

function Page() {
  const matches = [
    { sport: "Kabaddi", a: "Pune Warriors", b: "Mumbai Tigers", s: "32 – 28", v: "Balewadi", st: "LIVE" },
    { sport: "Cricket", a: "Vidarbha", b: "Mumbai", s: "186/4", v: "Wankhede", st: "LIVE" },
    { sport: "Football", a: "Nagpur FC", b: "Nashik United", s: "2 – 1", v: "Kalyani Nagar", st: "LIVE" },
    { sport: "Hockey", a: "Kolhapur", b: "Aurangabad", s: "3 – 2", v: "Major Dhyan Chand", st: "LIVE" },
  ];
  return (
    <>
      <PageHero eyebrow="Tournaments" title="Live Scores" subtitle="Real-time scores from ongoing competitions across Maharashtra." />
      <SectionWrap>
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {["Live","Upcoming","Completed"].map((t,i) => (
            <button key={t} className={`pb-3 text-sm font-semibold ${i===0?"border-b-[3px] border-[#363092] text-[#363092]":"text-gray-500"}`}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {matches.map(m => (
            <div key={m.a+m.b} className="rounded-2xl border border-gray-200 p-5 bg-white">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{m.sport} · {m.v}</span>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">● {m.st}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-gray-200" /><span className="font-semibold">{m.a}</span></div>
                <div className="text-2xl font-bold text-[#363092]">{m.s}</div>
                <div className="flex items-center gap-3"><span className="font-semibold">{m.b}</span><div className="h-10 w-10 rounded-full bg-gray-200" /></div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

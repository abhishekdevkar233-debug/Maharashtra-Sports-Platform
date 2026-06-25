import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/event-calendar")({
  head: () => ({ meta: [{ title: "Event Calendar" }] }),
  component: Page,
});

function Page() {
  const events = [
    { d: "12", m: "Jul", n: "State Athletics Championship", v: "Balewadi, Pune", s: "Athletics", status: "Open" },
    { d: "20", m: "Jul", n: "Maharashtra Cricket League Finals", v: "Wankhede, Mumbai", s: "Cricket", status: "Open" },
    { d: "05", m: "Aug", n: "Inter-District Football Cup", v: "Kolhapur", s: "Football", status: "Open" },
    { d: "12", m: "Aug", n: "State Wrestling Championship", v: "Kolhapur Akhada", s: "Wrestling", status: "Closing soon" },
    { d: "18", m: "Aug", n: "Badminton State Open", v: "Nagpur Indoor Hall", s: "Badminton", status: "Open" },
    { d: "02", m: "Sep", n: "Khelo India Selection Trials", v: "Multiple Venues", s: "Multi-sport", status: "Open" },
  ];
  return (
    <>
      <PageHero eyebrow="Tournaments" title="Event Calendar" subtitle="Stay up-to-date on upcoming state, national and inter-district sporting events." />
      <SectionWrap>
        <div className="flex flex-wrap gap-2 mb-6">
          {["All","July","August","September","October"].map((m,i) => (
            <button key={m} className={`px-4 py-1.5 rounded-full text-sm ${i===0?"bg-[#363092] text-white":"border border-gray-200 hover:border-[#363092]"}`}>{m}</button>
          ))}
        </div>
        <SectionTitle title="Upcoming Events" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map(e => (
            <div key={e.n} className="border border-gray-200 rounded-2xl p-5 flex gap-4 bg-white">
              <div className="text-center w-16 shrink-0">
                <div className="text-3xl font-bold text-[#363092]">{e.d}</div>
                <div className="text-xs uppercase text-gray-500">{e.m}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] uppercase text-[#FF6B35] font-bold">{e.s}</div>
                <div className="font-bold text-gray-900">{e.n}</div>
                <div className="mt-1 text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-4 w-4" />{e.v}</div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{e.status}</span>
                  <button className="text-sm font-semibold text-[#363092]">Register →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

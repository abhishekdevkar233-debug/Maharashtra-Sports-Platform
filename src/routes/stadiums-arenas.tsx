import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle, ImgBox } from "@/components/layout/PageShell";
import { MapPin, Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/stadiums-arenas")({
  head: () => ({ meta: [{ title: "Stadiums & Arenas" }] }),
  component: Page,
});

const VENUES = [
  { n: "Shree Shiv Chhatrapati Sports Complex", l: "Balewadi, Pune", c: "55,000", f: ["Athletics","Football","Indoor halls"] },
  { n: "DY Patil Stadium", l: "Navi Mumbai", c: "55,000", f: ["Cricket","Football"] },
  { n: "Wankhede Stadium", l: "Mumbai", c: "33,000", f: ["Cricket"] },
  { n: "Vidarbha Cricket Stadium", l: "Nagpur", c: "45,000", f: ["Cricket"] },
  { n: "Mahalaxmi Race Course Arena", l: "Mumbai", c: "20,000", f: ["Equestrian","Athletics"] },
  { n: "Pune Football Arena", l: "Pune", c: "12,000", f: ["Football"] },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Infrastructure" title="Stadiums & Arenas" subtitle="World-class venues hosting national and state-level competitions across Maharashtra." />
      <SectionWrap>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[["56","Stadiums"],["18","Indoor Arenas"],["36","Districts Covered"],["120k+","Combined Capacity"]].map(([v,l]) => (
            <div key={l} className="rounded-xl border border-gray-200 p-5 text-center">
              <div className="text-3xl font-bold text-[#363092]">{v}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
        <SectionTitle title="Featured Venues" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VENUES.map(v => (
            <div key={v.n} className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
              <ImgBox h={180} label="Venue Photo" />
              <div className="p-5">
                <h3 className="font-bold text-gray-900">{v.n}</h3>
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-4 w-4" /> {v.l}</div>
                <div className="mt-1 text-sm text-gray-500 flex items-center gap-1"><Users className="h-4 w-4" /> {v.c} seats</div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {v.f.map(x => <span key={x} className="text-[11px] bg-[#363092]/10 text-[#363092] px-2 py-0.5 rounded-full">{x}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap alt>
        <SectionTitle title="State-wide Overview" subtitle="An at-a-glance look at sports venues across Maharashtra." />
        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <ImgBox h={360} label="Maharashtra Venues Map" />
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <Trophy className="h-7 w-7 text-[#363092]" />
            <h3 className="mt-3 font-bold">Hosting the 39th National Games 2027</h3>
            <p className="mt-2 text-sm text-gray-600">Major venues across Pune, Mumbai, Nagpur and Nashik are being upgraded to deliver a world-class National Games experience.</p>
          </div>
        </div>
      </SectionWrap>
    </>
  );
}

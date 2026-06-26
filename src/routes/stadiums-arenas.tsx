import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { MapPin, Users } from "lucide-react";
import { VenuesDashboard } from "@/components/infrastructure/VenuesDashboard";
import vShivChhatrapati from "@/assets/venues/shiv-chhatrapati.jpg";
import vDyPatil from "@/assets/venues/dy-patil.jpg";
import vWankhede from "@/assets/venues/wankhede.jpg";
import vVidarbha from "@/assets/venues/vidarbha.jpg";
import vMahalaxmi from "@/assets/venues/mahalaxmi.avif";
import vPuneFootball from "@/assets/venues/pune-football.jpg";

export const Route = createFileRoute("/stadiums-arenas")({
  head: () => ({ meta: [{ title: "Stadiums & Arenas" }] }),
  component: Page,
});

const VENUES = [
  { n: "Shree Shiv Chhatrapati Sports Complex", l: "Balewadi, Pune", c: "55,000", f: ["Athletics","Football","Indoor halls"], img: vShivChhatrapati },
  { n: "DY Patil Stadium", l: "Navi Mumbai", c: "55,000", f: ["Cricket","Football"], img: vDyPatil },
  { n: "Wankhede Stadium", l: "Mumbai", c: "33,000", f: ["Cricket"], img: vWankhede },
  { n: "Vidarbha Cricket Stadium", l: "Nagpur", c: "45,000", f: ["Cricket"], img: vVidarbha },
  { n: "Mahalaxmi Race Course Arena", l: "Mumbai", c: "20,000", f: ["Equestrian","Athletics"], img: vMahalaxmi },
  { n: "Pune Football Arena", l: "Pune", c: "12,000", f: ["Football"], img: vPuneFootball },
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
              <img src={v.img} alt={v.n} className="w-full object-cover bg-gray-200" style={{ height: 180 }} />
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Interactive Infrastructure Map</h2>
            <p className="mt-2 text-gray-500 max-w-lg">Explore sports facilities across all 36 districts of Maharashtra — filter by facility type, region and more on our interactive map.</p>
          </div>
          <a href="/infrastructure-map"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition hover:opacity-90"
            style={{ background: "#FF6B35" }}>
            <MapPin className="h-5 w-5" /> Explore Interactive Map
          </a>
        </div>
      </SectionWrap>
    </>
  );
}

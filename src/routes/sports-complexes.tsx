import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle, ImgBox } from "@/components/layout/PageShell";
import { MapPin, Dumbbell, Waves, Building2 } from "lucide-react";

export const Route = createFileRoute("/sports-complexes")({
  head: () => ({ meta: [{ title: "Sports Complexes" }] }),
  component: Page,
});

function Page() {
  const items = [
    { n: "Balewadi Sports Complex", l: "Pune", sports: ["Athletics","Aquatics","Indoor"] },
    { n: "Mahalaxmi Sports Hub", l: "Mumbai", sports: ["Tennis","Cricket"] },
    { n: "Nagpur Divisional Sports Complex", l: "Nagpur", sports: ["Athletics","Hockey"] },
    { n: "Aurangabad District Sports Complex", l: "Chh. Sambhajinagar", sports: ["Football","Volleyball"] },
    { n: "Kolhapur Sports Authority Complex", l: "Kolhapur", sports: ["Wrestling","Athletics"] },
    { n: "Nashik Divisional Complex", l: "Nashik", sports: ["Indoor","Aquatics"] },
  ];
  return (
    <>
      <PageHero eyebrow="Infrastructure" title="Sports Complexes" subtitle="Multi-discipline complexes equipped for training, competitions and community sport." />
      <SectionWrap>
        <div className="flex flex-wrap gap-2 mb-6">
          {["All","Multi-sport","Aquatics","Indoor","Outdoor"].map((c, i) => (
            <button key={c} className={`px-4 py-1.5 rounded-full text-sm ${i === 0 ? "bg-[#363092] text-white" : "border border-gray-200 text-gray-700 hover:border-[#363092]"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(it => (
            <div key={it.n} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              <ImgBox h={170} label="Complex" />
              <div className="p-5">
                <h3 className="font-bold text-gray-900">{it.n}</h3>
                <div className="mt-1 text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-4 w-4" />{it.l}</div>
                <div className="mt-3 flex gap-1 flex-wrap">
                  {it.sports.map(s => <span key={s} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap alt>
        <SectionTitle title="Infrastructure Highlights" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { i: Building2, t: "Multi-sport Halls" },
            { i: Waves, t: "Olympic-size Pools" },
            { i: Dumbbell, t: "Strength & Conditioning" },
            { i: MapPin, t: "All 36 Districts" },
          ].map(({ i: I, t }) => (
            <div key={t} className="rounded-xl bg-white border border-gray-200 p-5 text-center">
              <I className="h-7 w-7 mx-auto text-[#363092]" />
              <div className="mt-3 font-semibold text-sm">{t}</div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

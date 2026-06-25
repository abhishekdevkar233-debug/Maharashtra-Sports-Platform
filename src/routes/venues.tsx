import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle, ImgBox } from "@/components/layout/PageShell";
import { MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/venues")({
  head: () => ({ meta: [{ title: "Venues" }] }),
  component: Page,
});

function Page() {
  const venues = [
    { n: "Shree Shiv Chhatrapati Sports Complex", l: "Pune", c: "55,000", s: ["Athletics","Aquatics"] },
    { n: "DY Patil Stadium", l: "Navi Mumbai", c: "55,000", s: ["Football","Cricket"] },
    { n: "Vidarbha Cricket Stadium", l: "Nagpur", c: "45,000", s: ["Cricket"] },
    { n: "Mahalaxmi Indoor Arena", l: "Mumbai", c: "8,000", s: ["Indoor"] },
    { n: "Nashik Divisional Sports Complex", l: "Nashik", c: "12,000", s: ["Athletics"] },
    { n: "Kolhapur Wrestling Akhada", l: "Kolhapur", c: "6,000", s: ["Wrestling"] },
  ];
  return (
    <>
      <PageHero eyebrow="Tournaments" title="Venues" subtitle="Premier venues hosting Maharashtra's tournaments and the 39th National Games 2027." />
      <SectionWrap>
        <SectionTitle title="Featured Venues" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map(v => (
            <div key={v.n} className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
              <ImgBox h={170} label="Venue" />
              <div className="p-5">
                <h3 className="font-bold text-gray-900">{v.n}</h3>
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-4 w-4" />{v.l}</div>
                <div className="mt-1 text-sm text-gray-500 flex items-center gap-1"><Users className="h-4 w-4" />{v.c}</div>
                <div className="mt-3 flex gap-1 flex-wrap">{v.s.map(x => <span key={x} className="text-[11px] bg-[#363092]/10 text-[#363092] px-2 py-0.5 rounded-full">{x}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>
      <SectionWrap alt>
        <SectionTitle title="Map Overview" />
        <ImgBox h={380} label="Maharashtra Venues Map" />
      </SectionWrap>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle, ImgBox } from "@/components/layout/PageShell";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/infrastructure-map")({
  head: () => ({ meta: [{ title: "Infrastructure Map" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Infrastructure" title="Interactive Infrastructure Map" subtitle="Explore 486 sports facilities across all 36 districts of Maharashtra." />
      <SectionWrap>
        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <div className="relative">
            <ImgBox h={500} label="Interactive Maharashtra Map" />
          </div>
          <div className="space-y-3">
            {[["Pune","82"],["Mumbai","64"],["Nagpur","41"],["Nashik","38"],["Aurangabad","29"],["Kolhapur","26"]].map(([d,n]) => (
              <div key={d} className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-white hover:border-[#363092]">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#363092]" /><span className="font-semibold">{d}</span></div>
                <span className="text-sm text-gray-500">{n} facilities</span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>
      <SectionWrap alt>
        <SectionTitle title="Facility Counts" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[["56","Stadiums"],["120","Sports Complexes"],["180","Training Centres"],["130","Indoor Halls"]].map(([v,l]) => (
            <div key={l} className="bg-white rounded-xl border border-gray-200 p-5 text-center">
              <div className="text-3xl font-bold text-[#363092]">{v}</div>
              <div className="text-xs uppercase text-gray-500 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

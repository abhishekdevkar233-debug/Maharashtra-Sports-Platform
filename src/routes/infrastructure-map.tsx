import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { VenuesDashboard } from "@/components/infrastructure/VenuesDashboard";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/infrastructure-map")({
  head: () => ({ meta: [{ title: "Interactive Infrastructure Map" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Infrastructure" title="Interactive Infrastructure Map" subtitle="Explore 486 sports facilities across all 36 districts of Maharashtra — filter by facility type, region and more." />
      <SectionWrap>
        {/* Full interactive map */}
        <SectionTitle
          title="State-wide Overview"
          subtitle="An interactive look at sports infrastructure across Maharashtra's districts."
        />
        <VenuesDashboard />
      </SectionWrap>

      {/* Top districts */}
      <SectionWrap alt>
        <SectionTitle title="Top Districts by Facilities" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            ["Pune", "82"],
            ["Mumbai", "64"],
            ["Nagpur", "41"],
            ["Nashik", "38"],
            ["Chhatrapati Sambhajinagar", "29"],
            ["Kolhapur", "26"],
          ].map(([d, n]) => (
            <div key={d} className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-[#363092] hover:shadow-sm transition">
              <div className="flex justify-center mb-2 text-[#FF6B35]"><MapPin className="h-5 w-5" /></div>
              <div className="font-bold text-gray-900 text-sm leading-tight">{d}</div>
              <div className="text-2xl font-black text-[#363092] mt-1">{n}</div>
              <div className="text-xs text-gray-400 mt-0.5">facilities</div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { NoticeToolbar, Select, Pagination, Badge } from "@/components/notices/NoticeShell";
import { Trophy, MapPin, Calendar, Download, ArrowRight, Medal, Volleyball, Dumbbell } from "lucide-react";

export const Route = createFileRoute("/notices/past-events")({
  head: () => ({ meta: [{ title: "Past Events — Notices" }] }),
  component: Page,
});

const EVENTS_BY_YEAR: Record<string, Array<{ icon: typeof Trophy; name: string; venue: string; dates: string; status: "Concluded" | "Report Available"; hasReport: boolean }>> = {
  "FY 2024-25": [
    { icon: Trophy, name: "Maharashtra State Athletics Championship", venue: "Shiv Chhatrapati Sports Complex, Pune", dates: "12 – 18 Mar 2025", status: "Report Available", hasReport: true },
    { icon: Volleyball, name: "State Volleyball League — Senior Men & Women", venue: "Nashik Sports Complex", dates: "02 – 09 Feb 2025", status: "Concluded", hasReport: false },
    { icon: Medal, name: "Khelo Maharashtra Youth Games", venue: "Mumbai, Multiple Venues", dates: "08 – 22 Dec 2024", status: "Report Available", hasReport: true },
    { icon: Dumbbell, name: "State Weightlifting Championship", venue: "Aurangabad Indoor Hall", dates: "14 – 17 Nov 2024", status: "Concluded", hasReport: false },
  ],
  "FY 2023-24": [
    { icon: Trophy, name: "Maharashtra State Hockey Championship", venue: "Mahalaxmi Hockey Stadium, Mumbai", dates: "05 – 12 Feb 2024", status: "Report Available", hasReport: true },
    { icon: Medal, name: "Inter-District Kabaddi Tournament", venue: "Kolhapur Sports Hall", dates: "18 – 24 Jan 2024", status: "Concluded", hasReport: false },
    { icon: Volleyball, name: "State Basketball League", venue: "Nagpur Indoor Arena", dates: "11 – 18 Dec 2023", status: "Report Available", hasReport: true },
  ],
};

function Page() {
  return (
    <>
      <PageHero eyebrow="Notices" title="Past Events" subtitle="Browse concluded tournaments, championships and sporting events across Maharashtra with reports and outcomes." />
      <SectionWrap>
        <NoticeToolbar placeholder="Search past events by name or venue…">
          <Select label="Year" options={["FY 2024-25", "FY 2023-24", "FY 2022-23"]} />
          <Select label="District" options={["All Districts", "Pune", "Mumbai", "Nashik", "Nagpur", "Kolhapur", "Aurangabad"]} />
        </NoticeToolbar>

        {Object.entries(EVENTS_BY_YEAR).map(([year, items]) => (
          <div key={year} className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-bold text-gray-900">{year}</h3>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-500">{items.length} events</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(e => (
                <div key={e.name} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#363092] hover:shadow-md transition flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#363092]/10 text-[#363092] grid place-items-center shrink-0">
                    <e.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 leading-snug">{e.name}</h4>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{e.dates}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge tone={e.status === "Report Available" ? "green" : "gray"}>{e.status}</Badge>
                      <div className="flex-1" />
                      <button className="inline-flex items-center gap-1 text-xs font-semibold text-[#363092] hover:text-[#FF6B35]">View details <ArrowRight className="h-3 w-3" /></button>
                      {e.hasReport && (
                        <button className="inline-flex items-center gap-1 text-xs font-semibold border border-gray-200 hover:border-[#363092] rounded-md px-2.5 py-1.5">
                          <Download className="h-3 w-3" /> Report
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Pagination />
      </SectionWrap>
    </>
  );
}

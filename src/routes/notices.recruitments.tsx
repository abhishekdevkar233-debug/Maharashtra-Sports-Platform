import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { NoticeToolbar, Select, Pagination, Badge } from "@/components/notices/NoticeShell";
import { Briefcase, MapPin, Users, Calendar, Download, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/notices/recruitments")({
  head: () => ({ meta: [{ title: "Recruitments — Notices" }] }),
  component: Page,
});

type R = { post: string; cls: string; dept: string; vacancies: number; scope: string; status: "Open" | "Closed"; deadline?: string; result?: string };

const LIST: R[] = [
  { post: "Sports Officer", cls: "Class II Gazetted", dept: "Directorate of Sports & Youth Services", vacancies: 48, scope: "All 36 districts", status: "Open", deadline: "15 Jul 2026" },
  { post: "Assistant Coach (Athletics)", cls: "Class III", dept: "Sports Academy, Pune", vacancies: 12, scope: "Pune, Nashik, Aurangabad", status: "Open", deadline: "30 Jun 2026" },
  { post: "Hostel Warden", cls: "Class III", dept: "Sports Hostels Division", vacancies: 24, scope: "Statewide", status: "Open", deadline: "10 Jul 2026" },
  { post: "Junior Clerk", cls: "Class IV", dept: "Directorate of Sports", vacancies: 60, scope: "All districts", status: "Closed", result: "Result declared 12 Jun 2026" },
  { post: "Physiotherapist", cls: "Class II", dept: "Sports Medicine Centre, Mumbai", vacancies: 6, scope: "Mumbai, Pune", status: "Open", deadline: "20 Jul 2026" },
  { post: "Sports Statistician", cls: "Class III", dept: "Directorate (Tech Cell)", vacancies: 4, scope: "Pune HQ", status: "Closed", result: "Merit list under review" },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Notices" title="Recruitments" subtitle="Current and recent recruitment notifications from the Directorate of Sports & Youth Services and its subordinate offices." />
      <SectionWrap>
        <NoticeToolbar placeholder="Search posts by title or department…">
          <Select label="Department" options={["All", "Directorate", "Sports Academy", "Hostels", "Sports Medicine"]} />
          <Select label="Status" options={["All", "Open", "Closed"]} />
        </NoticeToolbar>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {LIST.map((r, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-[#363092]/10 text-[#363092] grid place-items-center shrink-0">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-900 leading-snug">{r.post}</h4>
                    <div className="text-xs text-gray-500 mt-0.5">{r.cls} · {r.dept}</div>
                  </div>
                  <Badge tone={r.status === "Open" ? "green" : "gray"}>{r.status}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {r.vacancies} vacancies</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {r.scope}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  {r.deadline ? (
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[11px] font-bold px-2.5 py-1 rounded-full">
                      <Calendar className="h-3 w-3" /> Last date: {r.deadline}
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-500 font-medium">{r.result}</span>
                  )}
                  <div className="flex-1" />
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-[#363092] hover:text-[#FF6B35]">Details <ArrowRight className="h-3 w-3" /></button>
                  <button className="inline-flex items-center gap-1 text-xs font-semibold border border-gray-200 hover:border-[#363092] rounded-md px-2.5 py-1.5">
                    <Download className="h-3 w-3" /> Notification
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination />
      </SectionWrap>
    </>
  );
}

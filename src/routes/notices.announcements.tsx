import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { NoticeToolbar, Select, Pagination, Badge } from "@/components/notices/NoticeShell";
import { Megaphone, FileText, ScrollText, BellRing, Download, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/notices/announcements")({
  head: () => ({ meta: [{ title: "Announcements — Notices" }] }),
  component: Page,
});

type A = { icon: typeof FileText; title: string; date: string; cat: "Scheme" | "Policy" | "Circular" | "Notice"; badge: "Important" | "New" | "Open"; tone: "red" | "green" | "indigo"; priority?: boolean; hasFile?: boolean };

const LIST: A[] = [
  { icon: Megaphone, title: "Shiv Chhatrapati State Sports Award 2025–26 — Applications Open", date: "22 Jun 2026", cat: "Scheme", badge: "Open", tone: "green", priority: true, hasFile: true },
  { icon: FileText, title: "Revised Guidelines for District Sports Complex Operations", date: "18 Jun 2026", cat: "Policy", badge: "Important", tone: "red", priority: true, hasFile: true },
  { icon: ScrollText, title: "Circular: Athlete Stipend Disbursement Schedule — Q1 FY 2026-27", date: "10 Jun 2026", cat: "Circular", badge: "New", tone: "indigo", hasFile: true },
  { icon: BellRing, title: "Notice: National Games 2027 Volunteer Registration Drive", date: "05 Jun 2026", cat: "Notice", badge: "Open", tone: "green", hasFile: false },
  { icon: FileText, title: "Updated SOP for Sports Hostel Admissions", date: "28 May 2026", cat: "Policy", badge: "Important", tone: "red", priority: true, hasFile: true },
  { icon: Megaphone, title: "Khelo Maharashtra Youth Games — District Trials Schedule", date: "20 May 2026", cat: "Scheme", badge: "New", tone: "indigo", hasFile: true },
  { icon: ScrollText, title: "Circular: Mandatory Anti-Doping Awareness for Coaches", date: "12 May 2026", cat: "Circular", badge: "New", tone: "indigo", hasFile: true },
  { icon: BellRing, title: "Notice: Public Consultation — Draft Sports Policy 2026", date: "01 May 2026", cat: "Notice", badge: "Open", tone: "green", hasFile: true },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Notices" title="Announcements" subtitle="Official announcements, schemes, circulars and policy updates from the Sports & Youth Services Department." />
      <SectionWrap>
        <NoticeToolbar placeholder="Search announcements…">
          <Select label="Category" options={["All", "Scheme", "Policy", "Circular", "Notice"]} />
        </NoticeToolbar>

        <div className="mt-6 space-y-3">
          {LIST.map((a, i) => (
            <div key={i} className={`bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 hover:shadow-md transition ${a.priority ? "border-l-[4px] border-l-[#FF6B35]" : ""}`}>
              <div className="h-11 w-11 rounded-xl bg-[#363092]/10 text-[#363092] grid place-items-center shrink-0">
                <a.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="gray">{a.cat}</Badge>
                  <Badge tone={a.tone}>{a.badge}</Badge>
                  <span className="text-xs text-gray-500 ml-auto">{a.date}</span>
                </div>
                <h4 className="mt-2 font-bold text-gray-900 leading-snug">{a.title}</h4>
                <div className="mt-3 flex items-center gap-3">
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-[#363092] hover:text-[#FF6B35]">Read more <ArrowRight className="h-3 w-3" /></button>
                  {a.hasFile && (
                    <button className="inline-flex items-center gap-1 text-xs font-semibold border border-gray-200 hover:border-[#363092] rounded-md px-2.5 py-1.5">
                      <Download className="h-3 w-3" /> Download
                    </button>
                  )}
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

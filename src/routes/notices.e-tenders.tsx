import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { NoticeToolbar, Select, Pagination, Badge } from "@/components/notices/NoticeShell";
import { FileText, Download, ArrowRight, IndianRupee, ShieldCheck, Calendar } from "lucide-react";

export const Route = createFileRoute("/notices/e-tenders")({
  head: () => ({ meta: [{ title: "E-Tenders — Notices" }] }),
  component: Page,
});

type T = { ref: string; title: string; cat: "Construction" | "Equipment" | "Services"; status: "Open" | "Closed" | "Awarded"; value: string; emd: string; deadline: string; published: string };

const LIST: T[] = [
  { ref: "DSYS/2026/CW/0142", title: "Construction of Synthetic Athletics Track — Nashik Sports Complex", cat: "Construction", status: "Open", value: "₹ 18.50 Cr", emd: "₹ 18.50 L", deadline: "Closes 08 Jul 2026", published: "10 Jun 2026" },
  { ref: "DSYS/2026/EQ/0089", title: "Supply of Indoor Gymnasium Equipment — 12 District Centres", cat: "Equipment", status: "Open", value: "₹ 6.75 Cr", emd: "₹ 6.75 L", deadline: "Closes 30 Jun 2026", published: "01 Jun 2026" },
  { ref: "DSYS/2026/SV/0067", title: "Sports Hostel Catering & Housekeeping Services — Pune Region", cat: "Services", status: "Open", value: "₹ 2.40 Cr / yr", emd: "₹ 2.40 L", deadline: "Closes 25 Jun 2026", published: "28 May 2026" },
  { ref: "DSYS/2025/CW/0211", title: "Renovation of Mahalaxmi Hockey Stadium — Phase II", cat: "Construction", status: "Awarded", value: "₹ 12.30 Cr", emd: "—", deadline: "Awarded 04 May 2026", published: "22 Feb 2026" },
  { ref: "DSYS/2025/EQ/0188", title: "Procurement of Timing & Scoring Systems — National Games 2027", cat: "Equipment", status: "Closed", value: "₹ 9.10 Cr", emd: "—", deadline: "Closed 18 Apr 2026", published: "15 Feb 2026" },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Notices" title="E-Tenders" subtitle="Live, closed and awarded tenders issued by the Directorate of Sports & Youth Services and associated bodies." />
      <SectionWrap>
        <NoticeToolbar placeholder="Search by tender title or reference number…">
          <Select label="Category" options={["All", "Construction", "Equipment", "Services"]} />
          <Select label="Status" options={["All", "Open", "Closed", "Awarded"]} />
        </NoticeToolbar>

        <div className="mt-6 space-y-3">
          {LIST.map((t, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition">
              <div className="flex flex-wrap items-start gap-3">
                <div className="h-11 w-11 rounded-xl bg-[#363092]/10 text-[#363092] grid place-items-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-[260px]">
                  <div className="font-mono text-[11px] text-gray-500 tracking-wide">{t.ref}</div>
                  <h4 className="font-bold text-gray-900 leading-snug mt-0.5">{t.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone="gray">{t.cat}</Badge>
                  <Badge tone={t.status === "Open" ? "green" : t.status === "Awarded" ? "indigo" : "gray"}>{t.status}</Badge>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5">
                  <IndianRupee className="h-4 w-4 text-gray-400" />
                  <div><div className="text-[10px] text-gray-500 uppercase">Est. Value</div><div className="font-semibold text-gray-900">{t.value}</div></div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5">
                  <ShieldCheck className="h-4 w-4 text-gray-400" />
                  <div><div className="text-[10px] text-gray-500 uppercase">EMD</div><div className="font-semibold text-gray-900">{t.emd}</div></div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div><div className="text-[10px] text-gray-500 uppercase">Timeline</div><div className="font-semibold text-gray-900">{t.deadline}</div></div>
                </div>
              </div>
              <div className="mt-4 flex items-center flex-wrap gap-3">
                <span className="text-xs text-gray-500">Published {t.published}</span>
                <div className="flex-1" />
                {t.status === "Awarded" || t.status === "Closed" ? (
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-[#363092] hover:text-[#FF6B35]">View result <ArrowRight className="h-3 w-3" /></button>
                ) : (
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-[#363092] hover:text-[#FF6B35]">View tender <ArrowRight className="h-3 w-3" /></button>
                )}
                <button className="inline-flex items-center gap-1 text-xs font-semibold border border-gray-200 hover:border-[#363092] rounded-md px-2.5 py-1.5">
                  <Download className="h-3 w-3" /> Documents
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination />
      </SectionWrap>
    </>
  );
}

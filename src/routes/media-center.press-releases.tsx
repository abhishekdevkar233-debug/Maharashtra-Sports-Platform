import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaHero, MediaSection } from "@/components/media/MediaShell";
import { Calendar, Search, Download, FileText } from "lucide-react";

export const Route = createFileRoute("/media-center/press-releases")({
  head: () => ({ meta: [{ title: "Press Releases — DSYS Maharashtra" }] }),
  component: PressReleasesPage,
});

const YEARS = ["All", "2026", "2025", "2024", "2023"];
const CATS = ["All", "Policy", "Events", "Recruitment", "Schemes", "Tenders"];

const RELEASES = [
  { id: "pr-2026-018", ref: "DSYS/PR/2026/018", date: "20 Jun 2026", cat: "Schemes", title: "Launch of ₹250 Cr Sports Infrastructure Grant for districts", summary: "A five-year capital programme to upgrade 36 district sports complexes and 18 athlete hostels across Maharashtra." },
  { id: "pr-2026-017", ref: "DSYS/PR/2026/017", date: "12 Jun 2026", cat: "Events", title: "Maharashtra to host 39th National Games — venue list released", summary: "Twelve cities including Mumbai, Pune, Nagpur and Aurangabad confirmed as host venues for the 2027 edition." },
  { id: "pr-2026-016", ref: "DSYS/PR/2026/016", date: "01 Jun 2026", cat: "Recruitment", title: "Recruitment notification: 120 Sports Officers (Group B)", summary: "Online applications open from 5 June 2026. Eligibility criteria and exam schedule attached." },
  { id: "pr-2026-015", ref: "DSYS/PR/2026/015", date: "22 May 2026", cat: "Policy", title: "Revised Athlete Scholarship Policy 2026", summary: "Tiered scholarships introduced for State, National and International level performers with annual review." },
  { id: "pr-2026-014", ref: "DSYS/PR/2026/014", date: "10 May 2026", cat: "Tenders", title: "E-tender for synthetic athletics tracks at four districts", summary: "Bids invited from prequalified contractors. EMD ₹15 Lakh per package." },
];

function PressReleasesPage() {
  return (
    <>
      <MediaHero
        eyebrow="Media Center / Press Releases"
        title="Official press releases and announcements"
        subtitle="Departmental communications, circulars and notifications issued by the Directorate."
        crumbs={[{ label: "Home", to: "/" }, { label: "Media Center", to: "/media-center" }, { label: "Press Releases" }]}
      />

      <MediaSection>
        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input placeholder="Search by title or reference number…" className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 bg-white focus:border-purple-400 outline-none text-sm" />
          </div>
          <select className="h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm">
            {YEARS.map(y => <option key={y}>Year: {y}</option>)}
          </select>
          <select className="h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm">
            {CATS.map(c => <option key={c}>Category: {c}</option>)}
          </select>
        </div>

        <div className="space-y-4">
          {RELEASES.map(r => (
            <div key={r.id} className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 hover:border-purple-300 hover:shadow-md transition flex flex-col md:flex-row md:items-center gap-4">
              <div className="md:w-14 grid place-items-center h-14 w-14 rounded-xl bg-purple-50 text-purple-700 shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="font-mono text-gray-700">{r.ref}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{r.date}</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">{r.cat}</span>
                </div>
                <Link to="/media-center/press-releases/$id" params={{ id: r.id }} className="block mt-2 text-lg font-semibold text-gray-900 hover:text-purple-700 leading-snug">{r.title}</Link>
                <p className="mt-1 text-sm text-gray-600">{r.summary}</p>
              </div>
              <div className="flex md:flex-col items-stretch gap-2 md:w-44 shrink-0">
                <Link to="/media-center/press-releases/$id" params={{ id: r.id }} className="h-9 px-4 inline-flex items-center justify-center rounded-lg bg-purple-700 text-white text-sm font-medium hover:bg-purple-800">View Details</Link>
                <button className="h-9 px-4 inline-flex items-center justify-center gap-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-purple-300">
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </MediaSection>
    </>
  );
}

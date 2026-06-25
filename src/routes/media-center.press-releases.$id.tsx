import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaHero, MediaSection } from "@/components/media/MediaShell";
import { Calendar, Download, FileText, Building2, Share2, Facebook, Twitter, Linkedin } from "lucide-react";

export const Route = createFileRoute("/media-center/press-releases/$id")({
  head: () => ({ meta: [{ title: "Press Release — DSYS Maharashtra" }] }),
  component: PressReleaseDetails,
});

function PressReleaseDetails() {
  const { id } = Route.useParams();
  return (
    <>
      <MediaHero
        eyebrow="Press Release"
        title="Launch of ₹250 Cr Sports Infrastructure Grant for Districts"
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Media Center", to: "/media-center" },
          { label: "Press Releases", to: "/media-center/press-releases" },
          { label: id.toUpperCase() },
        ]}
      />

      <MediaSection>
        <div className="grid lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <span className="font-mono font-semibold text-gray-800">DSYS/PR/2026/018</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />20 June 2026</span>
                <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />Directorate of Sports & Youth Services</span>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-5">
                <p className="text-xl font-medium text-gray-900">
                  The Government of Maharashtra today announced a ₹250 Crore Sports Infrastructure Grant
                  to upgrade district sports complexes and athlete hostels across the state.
                </p>
                <p>
                  Under the new five-year programme, all 36 districts will receive funds for synthetic
                  surfaces, gymnasia, indoor halls, accessibility upgrades and digital scoreboards.
                  Eighteen athlete hostels — including six new constructions — will be added to support
                  residential training for Khelo India and National Games aspirants.
                </p>
                <h3 className="text-xl font-bold text-gray-900 mt-8">Key Provisions</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>₹150 Cr earmarked for synthetic tracks and indoor multi-sport halls</li>
                  <li>₹60 Cr for hostel construction and refurbishment</li>
                  <li>₹25 Cr for digital scoreboards, broadcast facilities and accessibility</li>
                  <li>₹15 Cr for operations, maintenance and training of facility managers</li>
                </ul>
                <p>
                  Implementation will be monitored through a quarterly review by the Hon'ble Minister of
                  Sports & Youth Welfare. Tenders for the first tranche will be floated in July 2026.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-5 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 grid place-items-center rounded-xl bg-white text-purple-700 border border-purple-200">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Official Press Release (PDF)</div>
                  <div className="text-xs text-gray-500">DSYS-PR-2026-018.pdf · 318 KB · English / मराठी</div>
                </div>
              </div>
              <button className="h-10 px-4 inline-flex items-center gap-2 rounded-lg bg-purple-700 text-white text-sm font-medium hover:bg-purple-800">
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500"><Share2 className="h-4 w-4" />Share</div>
              <div className="flex items-center gap-2">
                {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <button key={i} className="h-9 w-9 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"><Icon className="h-4 w-4" /></button>
                ))}
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Related Releases</h3>
              <ul className="space-y-4">
                {[
                  { id: "pr-2026-017", ref: "DSYS/PR/2026/017", title: "Maharashtra to host 39th National Games — venue list released" },
                  { id: "pr-2026-016", ref: "DSYS/PR/2026/016", title: "Recruitment notification: 120 Sports Officers (Group B)" },
                  { id: "pr-2026-015", ref: "DSYS/PR/2026/015", title: "Revised Athlete Scholarship Policy 2026" },
                ].map(r => (
                  <li key={r.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="text-[11px] font-mono text-gray-400">{r.ref}</div>
                    <Link to="/media-center/press-releases/$id" params={{ id: r.id }} className="text-sm font-medium text-gray-900 hover:text-purple-700 leading-snug">{r.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </MediaSection>
    </>
  );
}

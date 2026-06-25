import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaHero, MediaSection, PreviewBox } from "@/components/media/MediaShell";
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/media-center/news/$id")({
  head: () => ({ meta: [{ title: "News Article — DSYS Maharashtra" }] }),
  component: NewsDetails,
});

function NewsDetails() {
  const { id } = Route.useParams();
  return (
    <>
      <MediaHero
        eyebrow="News Article"
        title="Maharashtra wins 12 medals at National Junior Athletics 2025"
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Media Center", to: "/media-center" },
          { label: "News", to: "/media-center/news" },
          { label: id.replace(/-/g, " ") },
        ]}
      />

      <MediaSection>
        <div className="grid lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />22 June 2026</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4" />DSYS Newsroom</span>
              <span className="flex items-center gap-1"><Tag className="h-4 w-4" /><span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold text-xs">Athletes</span></span>
            </div>

            <PreviewBox h={400} label="Featured Cover" />

            <div className="prose prose-lg mt-8 max-w-none text-gray-700 leading-relaxed space-y-5">
              <p className="text-xl font-medium text-gray-900">
                Maharashtra topped the medal table at the 2025 National Junior Athletics Championship held in
                Hyderabad, claiming 12 medals — four gold, five silver and three bronze — across track and field.
              </p>
              <p>
                The state's performance was led by 800m runner Priya Patil and shot-putter Rohan Deshmukh, both
                products of the District Sports Complex training programme. Coaches credited the Directorate's
                scholarship and travel support for enabling three pre-event training camps in Bengaluru and Patiala.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-8">Medal Highlights</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>800m Women — Gold, Priya Patil (Solapur)</li>
                <li>Shot Put Men — Gold, Rohan Deshmukh (Pune)</li>
                <li>4×400m Relay Women — Gold, Maharashtra A</li>
                <li>Triple Jump — Silver, Aniket Salunke (Kolhapur)</li>
              </ul>
              <p>
                The Directorate has announced cash incentives under the Shiv Chhatrapati incentive scheme and
                will fast-track these athletes into the senior elite squad for the upcoming Asian Junior trials.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500"><Share2 className="h-4 w-4" />Share this article</div>
              <div className="flex items-center gap-2">
                {[Facebook, Twitter, Linkedin, LinkIcon].map((Icon, i) => (
                  <button key={i} className="h-9 w-9 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300">
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Related News</h3>
              <ul className="space-y-4">
                {[
                  { id: "khelo-india-prep", title: "State squad announced for Khelo India Youth Games 2026" },
                  { id: "shiv-chhatrapati", title: "Shiv Chhatrapati Award nominations open for 2025-26" },
                  { id: "coach-cert-program", title: "New NIS-affiliated coach certification rolled out" },
                ].map(r => (
                  <li key={r.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                    <PreviewBox h={70} label="" />
                    <div className="flex-1 min-w-0">
                      <Link to="/media-center/news/$id" params={{ id: r.id }} className="text-sm font-medium text-gray-900 hover:text-purple-700 line-clamp-2">{r.title}</Link>
                      <span className="text-xs text-gray-400 mt-1 block">22 Jun 2026</span>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/media-center/news" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-purple-700">All news <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </aside>
        </div>
      </MediaSection>
    </>
  );
}

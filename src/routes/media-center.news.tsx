import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaHero, MediaSection, PreviewBox } from "@/components/media/MediaShell";
import { Calendar, Search, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/media-center/news")({
  head: () => ({ meta: [{ title: "News — Media Center | DSYS Maharashtra" }] }),
  component: NewsPage,
});

const CATEGORIES = ["All", "Department", "Athletes", "Tournaments", "Schemes", "Infrastructure"];

const ARTICLES = [
  { id: "asian-games-medals", cat: "Athletes", date: "22 Jun 2026", title: "Maharashtra wins 12 medals at National Junior Athletics 2026", excerpt: "State athletes top the medal table with strong performances across track and field events in Hyderabad." },
  { id: "infra-grant-launch", cat: "Schemes", date: "18 Jun 2026", title: "₹250 Cr Sports Infrastructure Grant launched for 36 districts", excerpt: "CM announces a five-year programme to upgrade district sports complexes and athlete hostels." },
  { id: "balewadi-aquatic", cat: "Infrastructure", date: "10 Jun 2026", title: "Balewadi Aquatic Centre inaugurated in Pune", excerpt: "FINA-spec 50m pool with diving platform now open for elite athlete training camps." },
  { id: "khelo-india-prep", cat: "Tournaments", date: "05 Jun 2026", title: "State squad announced for Khelo India Youth Games 2026", excerpt: "428 athletes selected across 27 disciplines — Maharashtra contingent largest in the country." },
  { id: "coach-cert-program", cat: "Department", date: "29 May 2026", title: "New NIS-affiliated coach certification rolled out", excerpt: "Department partners with SAI to certify 1,200 coaches across districts over the next 18 months." },
  { id: "shiv-chhatrapati", cat: "Athletes", date: "20 May 2026", title: "Shiv Chhatrapati Award nominations open for 2026-27", excerpt: "Applications invited across 46 sports disciplines from athletes, coaches and lifetime achievers." },
];

function NewsPage() {
  return (
    <>
      <MediaHero
        eyebrow="Media Center / News"
        title="Latest news from Maharashtra sports"
        subtitle="Department updates, athlete achievements and event coverage from across the state."
        crumbs={[{ label: "Home", to: "/" }, { label: "Media Center", to: "/media-center" }, { label: "News" }]}
      />

      <MediaSection>
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input placeholder="Search news articles…" className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 bg-white focus:border-purple-400 outline-none text-sm" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {CATEGORIES.map((c, i) => (
              <button key={c} className={`px-4 h-11 rounded-lg text-sm font-medium whitespace-nowrap border ${i === 0 ? "bg-purple-700 text-white border-purple-700" : "bg-white text-gray-700 border-gray-200 hover:border-purple-300"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map(a => (
            <Link key={a.id} to="/media-center/news/$id" params={{ id: a.id }} className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-purple-300 hover:shadow-lg transition">
              <PreviewBox h={180} label={a.cat} />
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">{a.cat}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{a.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug group-hover:text-purple-700">{a.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{a.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-700">Read more <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map(p => (
            <button key={p} className={`h-9 w-9 rounded-lg text-sm font-medium ${p === 1 ? "bg-purple-700 text-white" : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300"}`}>{p}</button>
          ))}
          <span className="px-2 text-gray-400">…</span>
          <button className="h-9 px-3 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-purple-300">Next</button>
        </div>
      </MediaSection>
    </>
  );
}

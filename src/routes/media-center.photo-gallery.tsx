import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaHero, MediaSection, PreviewBox } from "@/components/media/MediaShell";
import { Search, Camera, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/media-center/photo-gallery")({
  head: () => ({ meta: [{ title: "Photo Gallery — DSYS Maharashtra" }] }),
  component: PhotoGalleryPage,
});

const TAGS = ["All Events", "Ceremonies", "Training", "Tournaments", "Inaugurations", "Athletes"];

const ALBUMS = [
  { id: "shiv-chhatrapati-2025", title: "Shiv Chhatrapati Awards 2026-27", date: "14 Jun 2026", count: 64, h: 260 },
  { id: "balewadi-inauguration", title: "Balewadi Aquatic Centre Inauguration", date: "10 Jun 2026", count: 42, h: 200 },
  { id: "khelo-india-camp", title: "Khelo India Training Camp — Pune", date: "02 Jun 2026", count: 88, h: 220 },
  { id: "national-junior-athletics", title: "National Junior Athletics — Hyderabad", date: "22 May 2026", count: 120, h: 240 },
  { id: "school-games-finals", title: "State School Games Finals 2026", date: "12 May 2026", count: 76, h: 200 },
  { id: "coach-summit", title: "Maharashtra Coach Summit 2026", date: "28 Apr 2026", count: 34, h: 220 },
  { id: "yuva-runs", title: "Yuva Runs Marathon — Mumbai", date: "10 Apr 2026", count: 152, h: 260 },
  { id: "rural-sports-fest", title: "Rural Sports Festival — Vidarbha", date: "22 Mar 2026", count: 96, h: 200 },
];

function PhotoGalleryPage() {
  return (
    <>
      <MediaHero
        eyebrow="Media Center / Photo Gallery"
        title="Moments from across Maharashtra sports"
        subtitle="Albums from tournaments, ceremonies, training camps and athlete milestones."
        crumbs={[{ label: "Home", to: "/" }, { label: "Media Center", to: "/media-center" }, { label: "Photo Gallery" }]}
      />

      <MediaSection>
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input placeholder="Search albums…" className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 bg-white focus:border-purple-400 outline-none text-sm" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {TAGS.map((t, i) => (
              <button key={t} className={`px-4 h-11 rounded-lg text-sm font-medium whitespace-nowrap border ${i === 0 ? "bg-purple-700 text-white border-purple-700" : "bg-white text-gray-700 border-gray-200 hover:border-purple-300"}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {ALBUMS.map(a => (
            <Link key={a.id} to="/media-center/photo-gallery/$id" params={{ id: a.id }} className="group block mb-6 break-inside-avoid rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-purple-300 hover:shadow-lg transition">
              <div className="relative">
                <PreviewBox h={a.h} label={a.title} />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/55 backdrop-blur text-white text-xs">
                  <Camera className="h-3 w-3" /> {a.count}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-700 leading-snug">{a.title}</h3>
                <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                  <span>{a.date}</span>
                  <span className="inline-flex items-center gap-1 text-purple-700 font-medium">View album <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </MediaSection>
    </>
  );
}

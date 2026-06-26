import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaHero, MediaSection } from "@/components/media/MediaShell";
import { Search, Camera, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";

import galAsianGames from "@/assets/gallery/asian-games.webp";
import galCricket from "@/assets/gallery/cricket-team.jpg";
import galWrestling from "@/assets/gallery/wrestling.avif";
import galBadminton from "@/assets/gallery/badminton.webp";
import galKheloIndia from "@/assets/gallery/khelo-india.jpg";
import newsKheloMedals from "@/assets/news/khelo-india-medals.png";
import newsKhoKho from "@/assets/news/kho-kho.png";
import newsSportsComplex from "@/assets/news/sports-complex.jpg";

export const Route = createFileRoute("/media-center/photo-gallery")({
  head: () => ({ meta: [{ title: "Photo Gallery — DSYS Maharashtra" }] }),
  component: PhotoGalleryPage,
});

const TAGS = ["All Events", "Ceremonies", "Training", "Tournaments", "Inaugurations", "Athletes"];

const ALBUMS = [
  { id: "khelo-india-medals", title: "Maharashtra wins 186 medals at Khelo India Youth Games 2026", date: "4 Jun 2026", count: 120, tag: "Tournaments", img: newsKheloMedals },
  { id: "asian-games-2023", title: "Asian Games 2023 — Team Maharashtra", date: "14 Oct 2023", count: 64, tag: "Tournaments", img: galAsianGames },
  { id: "cricket-team", title: "Maharashtra Cricket Team — Victory Celebration", date: "20 May 2026", count: 42, tag: "Ceremonies", img: galCricket },
  { id: "state-wrestling", title: "State Wrestling Championship 2026 — Pune", date: "18 Apr 2026", count: 88, tag: "Tournaments", img: galWrestling },
  { id: "badminton-camp", title: "Badminton Training Camp — Nagpur", date: "2 Mar 2026", count: 56, tag: "Training", img: galBadminton },
  { id: "khelo-india-youth", title: "Khelo India Youth Games 2026 — Chennai", date: "4 Jun 2026", count: 152, tag: "Tournaments", img: galKheloIndia },
  { id: "kho-kho-games", title: "Kho-Kho Maharashtra Youth Games 2026", date: "19 Jun 2026", count: 76, tag: "Tournaments", img: newsKhoKho },
  { id: "sports-complex-inauguration", title: "New Sports Complex Inauguration — Chhatrapati Sambhajinagar", date: "22 May 2026", count: 34, tag: "Inaugurations", img: newsSportsComplex },
];

function PhotoGalleryPage() {
  const [activeTag, setActiveTag] = useState("All Events");
  const [query, setQuery] = useState("");

  const filtered = ALBUMS.filter(a =>
    (activeTag === "All Events" || a.tag === activeTag) &&
    (query === "" || a.title.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <>
      <MediaHero
        eyebrow="Media Center / Photo Gallery"
        title="Moments from across Maharashtra sports"
        subtitle="Albums from tournaments, ceremonies, training camps and athlete milestones."
        crumbs={[{ label: "Home", to: "/" }, { label: "Media Center", to: "/media-center" }, { label: "Photo Gallery" }]}
      />

      <MediaSection>
        {/* Search + Filter bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search albums…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white focus:border-[#363092] outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" />
            {TAGS.map(t => (
              <button key={t} onClick={() => setActiveTag(t)}
                className={`px-4 h-11 rounded-xl text-sm font-medium whitespace-nowrap border transition ${
                  activeTag === t
                    ? "bg-[#363092] text-white border-[#363092]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#363092] hover:text-[#363092]"
                }`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500"><span className="font-semibold text-gray-900">{filtered.length}</span> albums found</p>
          <span className="text-xs text-gray-400 flex items-center gap-1"><Camera className="h-3.5 w-3.5" /> Click an album to view all photos</span>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
          {filtered.map((a, idx) => (
            <Link
              key={a.id}
              to="/media-center/photo-gallery/$id"
              params={{ id: a.id }}
              className="group block mb-6 break-inside-avoid rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-[#363092] hover:shadow-lg transition-all duration-200"
            >
              <div className="relative overflow-hidden" style={{ height: idx % 3 === 0 ? 260 : idx % 3 === 1 ? 200 : 230 }}>
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#363092] text-white text-[10px] font-semibold tracking-wide">
                  {a.tag}
                </span>
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur text-white text-xs font-medium">
                  <Camera className="h-3 w-3" /> {a.count} photos
                </span>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-[#363092] text-xs font-bold shadow">
                    View Album <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#363092] leading-snug line-clamp-2">{a.title}</h3>
                <p className="mt-1 text-xs text-gray-400">{a.date}</p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <Camera className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No albums found for your search.</p>
          </div>
        )}

        {/* Load more */}
        <div className="mt-8 text-center">
          <button className="px-8 py-3 rounded-xl border-2 border-[#363092] text-[#363092] font-semibold text-sm hover:bg-[#363092] hover:text-white transition">
            Load More Albums
          </button>
        </div>
      </MediaSection>
    </>
  );
}

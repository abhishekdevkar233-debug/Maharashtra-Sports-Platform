import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaHero, MediaSection } from "@/components/media/MediaShell";
import { Play, Search, Clock, Eye, Filter } from "lucide-react";
import { useState } from "react";

import galAsianGames from "@/assets/gallery/asian-games.webp";
import galCricket from "@/assets/gallery/cricket-team.jpg";
import galWrestling from "@/assets/gallery/wrestling.avif";
import galBadminton from "@/assets/gallery/badminton.webp";
import galKheloIndia from "@/assets/gallery/khelo-india.jpg";
import newsKheloMedals from "@/assets/news/khelo-india-medals.png";
import newsKhoKho from "@/assets/news/kho-kho.png";
import newsSportsComplex from "@/assets/news/sports-complex.jpg";

export const Route = createFileRoute("/media-center/video-gallery")({
  head: () => ({ meta: [{ title: "Video Gallery — DSYS Maharashtra" }] }),
  component: VideoGalleryPage,
});

const CATS = ["All", "Highlights", "Interviews", "Documentaries", "Training", "Ceremonies"];

const VIDEOS = [
  { id: "khelo-india-highlights", title: "Maharashtra wins 186 medals at Khelo India Youth Games 2026 — Full Highlights", cat: "Highlights", dur: "8:45", views: "21.9K", date: "4 Jun 2026", img: newsKheloMedals },
  { id: "asian-games-recap", title: "Asian Games 2023 — Team Maharashtra Race Recap", cat: "Highlights", dur: "5:33", views: "15.2K", date: "14 Oct 2023", img: galAsianGames },
  { id: "cricket-victory", title: "Maharashtra Cricket Team — Victory Celebration Ceremony", cat: "Ceremonies", dur: "4:32", views: "12.4K", date: "20 May 2026", img: galCricket },
  { id: "wrestling-championship", title: "State Wrestling Championship 2026 — Day 2 Highlights", cat: "Highlights", dur: "6:14", views: "8.7K", date: "18 Apr 2026", img: galWrestling },
  { id: "badminton-training", title: "Behind the Scenes — Badminton Training Camp Nagpur", cat: "Training", dur: "9:21", views: "6.5K", date: "2 Mar 2026", img: galBadminton },
  { id: "khelo-india-youth", title: "Khelo India Youth Games 2026 — Opening Ceremony", cat: "Ceremonies", dur: "22:10", views: "3.1K", date: "4 Jun 2026", img: galKheloIndia },
  { id: "kho-kho-games", title: "Kho-Kho Maharashtra Youth Games — Tournament Highlights", cat: "Highlights", dur: "7:18", views: "9.4K", date: "19 Jun 2026", img: newsKhoKho },
  { id: "sports-complex-tour", title: "Inside the New Sports Complex — Chhatrapati Sambhajinagar", cat: "Documentaries", dur: "12:48", views: "4.4K", date: "22 May 2026", img: newsSportsComplex },
];

function VideoGalleryPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");

  const featured = VIDEOS[0];
  const rest = VIDEOS.slice(1).filter(v =>
    (activeCat === "All" || v.cat === activeCat) &&
    (query === "" || v.title.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <>
      <MediaHero
        eyebrow="Media Center / Video Gallery"
        title="Watch Maharashtra sports in motion"
        subtitle="Tournament highlights, athlete interviews and behind-the-scenes documentaries."
        crumbs={[{ label: "Home", to: "/" }, { label: "Media Center", to: "/media-center" }, { label: "Video Gallery" }]}
      />

      <MediaSection>

        {/* Featured Video */}
        <Link
          to="/media-center/video-gallery/$id"
          params={{ id: featured.id }}
          className="group block rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-[#363092] hover:shadow-xl transition-all duration-300 mb-10"
        >
          <div className="grid lg:grid-cols-5">
            {/* Thumbnail */}
            <div className="lg:col-span-3 relative overflow-hidden" style={{ minHeight: 320 }}>
              <img src={featured.img} alt={featured.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-20 w-20 rounded-full bg-white/90 grid place-items-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-9 w-9 text-[#363092] fill-[#363092] ml-1" />
                </div>
              </div>
              <span className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 text-white text-sm font-mono">
                <Clock className="h-3.5 w-3.5" /> {featured.dur}
              </span>
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FF6B35] text-white text-xs font-bold tracking-wide">
                FEATURED
              </span>
            </div>
            {/* Info */}
            <div className="lg:col-span-2 p-7 flex flex-col justify-center">
              <span className="text-xs font-bold text-[#363092] uppercase tracking-widest">{featured.cat}</span>
              <h2 className="mt-3 text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#363092] transition-colors">{featured.title}</h2>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">Maharashtra's finest sporting moments captured — featuring top performers, dramatic finishes and champion celebrations.</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {featured.views} views</span>
                <span>{featured.date}</span>
              </div>
              <div className="mt-5">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#363092] text-white text-sm font-semibold group-hover:bg-[#FF6B35] transition-colors">
                  <Play className="h-4 w-4 fill-white" /> Watch Now
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Search + Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search videos…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white focus:border-[#363092] outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" />
            {CATS.map(c => (
              <button key={c} onClick={() => setActiveCat(c)}
                className={`px-4 h-11 rounded-xl text-sm font-medium whitespace-nowrap border transition ${
                  activeCat === c
                    ? "bg-[#363092] text-white border-[#363092]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#363092] hover:text-[#363092]"
                }`}>{c}</button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500"><span className="font-semibold text-gray-900">{rest.length}</span> videos found</p>
          <span className="text-xs text-gray-400 flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> Click a video to watch</span>
        </div>

        {/* Video grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rest.map(v => (
            <Link key={v.id} to="/media-center/video-gallery/$id" params={{ id: v.id }}
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-[#363092] hover:shadow-md transition-all duration-200">
              {/* Thumbnail */}
              <div className="relative overflow-hidden" style={{ height: 180 }}>
                <img src={v.img} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="h-12 w-12 rounded-full bg-white/90 grid place-items-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-5 w-5 text-[#363092] fill-[#363092] ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-white text-[10px] font-mono">
                  <Clock className="h-2.5 w-2.5" /> {v.dur}
                </span>
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#363092] text-white text-[10px] font-semibold">
                  {v.cat}
                </span>
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#363092] leading-snug line-clamp-2 transition-colors">{v.title}</h3>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {v.views}</span>
                  <span>{v.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {rest.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <Play className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No videos found for your search.</p>
          </div>
        )}

        {/* Load more */}
        <div className="mt-10 text-center">
          <button className="px-8 py-3 rounded-xl border-2 border-[#363092] text-[#363092] font-semibold text-sm hover:bg-[#363092] hover:text-white transition">
            Load More Videos
          </button>
        </div>
      </MediaSection>
    </>
  );
}

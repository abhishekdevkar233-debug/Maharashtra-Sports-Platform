import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaHero, MediaSection, PreviewBox } from "@/components/media/MediaShell";
import { Play, Search, Clock, Eye } from "lucide-react";

export const Route = createFileRoute("/media-center/video-gallery")({
  head: () => ({ meta: [{ title: "Video Gallery — DSYS Maharashtra" }] }),
  component: VideoGalleryPage,
});

const CATS = ["All", "Highlights", "Interviews", "Documentaries", "Training", "Ceremonies"];

const VIDEOS = [
  { id: "shiv-chhatrapati-highlights", title: "Shiv Chhatrapati Awards 2026-27 — Highlights Reel", cat: "Ceremonies", dur: "4:32", views: "12.4K", date: "14 Jun 2026" },
  { id: "priya-patil-interview", title: "Road to Asian Games — Priya Patil in conversation", cat: "Interviews", dur: "11:08", views: "8.2K", date: "10 Jun 2026" },
  { id: "balewadi-tour", title: "Inside the new Balewadi Aquatic Centre", cat: "Documentaries", dur: "6:14", views: "5.7K", date: "08 Jun 2026" },
  { id: "national-jr-day3", title: "National Junior Athletics — Day 3 Highlights", cat: "Highlights", dur: "8:45", views: "21.9K", date: "24 May 2026" },
  { id: "khelo-india-prep", title: "Behind the scenes — Khelo India training camp", cat: "Training", dur: "9:21", views: "6.5K", date: "02 Jun 2026" },
  { id: "coach-summit", title: "Maharashtra Coach Summit — Keynote Address", cat: "Ceremonies", dur: "22:10", views: "3.1K", date: "28 Apr 2026" },
  { id: "rural-sports-story", title: "Rural Sports Festival — A short documentary", cat: "Documentaries", dur: "12:48", views: "4.4K", date: "22 Mar 2026" },
  { id: "yuva-marathon", title: "Yuva Runs Marathon Mumbai — Race Recap", cat: "Highlights", dur: "5:33", views: "15.2K", date: "10 Apr 2026" },
];

function VideoGalleryPage() {
  const featured = VIDEOS[0];
  return (
    <>
      <MediaHero
        eyebrow="Media Center / Video Gallery"
        title="Watch Maharashtra sports in motion"
        subtitle="Tournament highlights, athlete interviews and behind-the-scenes documentaries."
        crumbs={[{ label: "Home", to: "/" }, { label: "Media Center", to: "/media-center" }, { label: "Video Gallery" }]}
      />

      <MediaSection>
        <Link to="/media-center/video-gallery/$id" params={{ id: featured.id }} className="group block rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-purple-300 hover:shadow-lg transition mb-10">
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-3 relative">
              <PreviewBox h={360} label="" tone="video" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="h-16 w-16 grid place-items-center rounded-full bg-white/90 text-purple-700 shadow-lg group-hover:scale-110 transition">
                  <Play className="h-7 w-7 fill-current ml-1" />
                </span>
              </div>
              <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-xs flex items-center gap-1"><Clock className="h-3 w-3" />{featured.dur}</span>
            </div>
            <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-center">
              <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Featured Video</span>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 leading-snug">{featured.title}</h2>
              <p className="mt-3 text-gray-600">Highlights from Maharashtra's flagship sports awards ceremony — 46 awardees across athletes, coaches and lifetime achievers.</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">{featured.cat}</span>
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{featured.views} views</span>
                <span>{featured.date}</span>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input placeholder="Search videos…" className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 bg-white focus:border-purple-400 outline-none text-sm" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {CATS.map((c, i) => (
              <button key={c} className={`px-4 h-11 rounded-lg text-sm font-medium whitespace-nowrap border ${i === 0 ? "bg-purple-700 text-white border-purple-700" : "bg-white text-gray-700 border-gray-200 hover:border-purple-300"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {VIDEOS.slice(1).map(v => (
            <Link key={v.id} to="/media-center/video-gallery/$id" params={{ id: v.id }} className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-purple-300 hover:shadow-md transition">
              <div className="relative">
                <PreviewBox h={170} label="" tone="video" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="h-12 w-12 grid place-items-center rounded-full bg-white/90 text-purple-700 group-hover:scale-110 transition">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{v.dur}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">{v.cat}</span>
                  <span className="text-gray-400">{v.date}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-purple-700 leading-snug line-clamp-2">{v.title}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500"><Eye className="h-3 w-3" />{v.views} views</div>
              </div>
            </Link>
          ))}
        </div>
      </MediaSection>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaHero, MediaSection, PreviewBox } from "@/components/media/MediaShell";
import { Play, Clock, Eye, Calendar, MapPin, Share2, Facebook, Twitter, Linkedin, ThumbsUp } from "lucide-react";

export const Route = createFileRoute("/media-center/video-gallery/$id")({
  head: () => ({ meta: [{ title: "Video — DSYS Maharashtra" }] }),
  component: VideoDetails,
});

const RELATED = [
  { id: "priya-patil-interview", title: "Road to Asian Games — Priya Patil in conversation", dur: "11:08", views: "8.2K" },
  { id: "balewadi-tour", title: "Inside the new Balewadi Aquatic Centre", dur: "6:14", views: "5.7K" },
  { id: "national-jr-day3", title: "National Junior Athletics — Day 3 Highlights", dur: "8:45", views: "21.9K" },
  { id: "khelo-india-prep", title: "Behind the scenes — Khelo India training camp", dur: "9:21", views: "6.5K" },
  { id: "rural-sports-story", title: "Rural Sports Festival — A short documentary", dur: "12:48", views: "4.4K" },
];

function VideoDetails() {
  const { id } = Route.useParams();
  return (
    <>
      <MediaHero
        eyebrow="Video Gallery"
        title="Shiv Chhatrapati Awards 2025-26 — Highlights Reel"
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Media Center", to: "/media-center" },
          { label: "Video Gallery", to: "/media-center/video-gallery" },
          { label: id.replace(/-/g, " ") },
        ]}
      />

      <MediaSection>
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden">
              <PreviewBox h={460} label="" tone="video" />
              <div className="absolute inset-0 grid place-items-center">
                <button className="h-20 w-20 grid place-items-center rounded-full bg-white/95 text-purple-700 shadow-2xl hover:scale-110 transition">
                  <Play className="h-9 w-9 fill-current ml-1" />
                </button>
              </div>
              <span className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-black/70 text-white text-xs flex items-center gap-1"><Clock className="h-3 w-3" />4:32</span>
            </div>

            <div className="mt-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                Shiv Chhatrapati Awards 2025-26 — Highlights Reel
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">Ceremonies</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />14 June 2026</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />Raj Bhavan, Mumbai</span>
                <span className="flex items-center gap-1"><Eye className="h-4 w-4" />12,423 views</span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button className="h-9 px-4 inline-flex items-center gap-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-purple-300"><ThumbsUp className="h-4 w-4" />Like</button>
                <button className="h-9 px-4 inline-flex items-center gap-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-purple-300"><Share2 className="h-4 w-4" />Share</button>
                <div className="ml-auto flex items-center gap-2">
                  {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                    <button key={i} className="h-9 w-9 grid place-items-center rounded-full border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"><Icon className="h-4 w-4" /></button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900">About this video</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  A four-minute highlight reel from the 2025-26 Shiv Chhatrapati Awards ceremony at Raj
                  Bhavan, Mumbai. The Hon'ble Governor presented Maharashtra's highest sports honour to
                  46 athletes, coaches and lifetime achievers across 46 disciplines.
                </p>
                <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-lg bg-purple-50 p-3"><div className="text-xs text-gray-500">Event</div><div className="font-semibold text-gray-900">Shiv Chhatrapati 2025-26</div></div>
                  <div className="rounded-lg bg-purple-50 p-3"><div className="text-xs text-gray-500">Producer</div><div className="font-semibold text-gray-900">DSYS Media Cell</div></div>
                  <div className="rounded-lg bg-purple-50 p-3"><div className="text-xs text-gray-500">Language</div><div className="font-semibold text-gray-900">मराठी / English</div></div>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <h3 className="font-semibold text-gray-900 mb-4">Related Videos</h3>
            <ul className="space-y-4">
              {RELATED.map(r => (
                <li key={r.id}>
                  <Link to="/media-center/video-gallery/$id" params={{ id: r.id }} className="flex gap-3 group">
                    <div className="relative w-36 shrink-0">
                      <PreviewBox h={80} label="" tone="video" />
                      <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/70 text-white text-[10px]">{r.dur}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-purple-700 leading-snug line-clamp-2">{r.title}</p>
                      <span className="text-xs text-gray-400 mt-1 block flex items-center gap-1"><Eye className="h-3 w-3" />{r.views} views</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </MediaSection>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Play, Share2, Heart, Search, Medal, Trophy,
  ChevronRight, Calendar, MapPin, ArrowLeft,
  SkipForward, Volume2, Maximize, Subtitles, Settings,
} from "lucide-react";
import { useState } from "react";
import { getOlympian } from "@/data/olympians";

export const Route = createFileRoute("/olympians/$id/highlights")({
  head: () => ({ meta: [{ title: "Athlete Highlights" }] }),
  component: Page,
});

const medalColor = (m: string) =>
  m.includes("Gold") ? "#d97706" : m.includes("Silver") ? "#6b7280" : m.includes("Bronze") ? "#b45309" : "#6366f1";

const CATEGORIES = ["All", "Olympics", "National Games", "Best Performances", "Interviews", "Training", "Awards", "Behind The Scenes"];

const PLAYLIST = [
  { t: "Medal Ceremony", sub: "Historic moment for India", d: "03:12", c: "Medal Ceremony", tint: "from-amber-500 to-orange-600" },
  { t: "Final Shot — Bronze Clinched!", sub: "The moment that brought glory", d: "02:45", c: "Best Performances", tint: "from-violet-500 to-indigo-700" },
  { t: "Qualification Round Highlights", sub: "Consistent and confident performance", d: "02:18", c: "Best Performances", tint: "from-emerald-500 to-teal-700" },
  { t: "Post Match Interview", sub: "Athlete on journey and motivation", d: "05:30", c: "Interviews", tint: "from-sky-500 to-blue-700" },
  { t: "Training Behind the Scenes", sub: "Hard work behind the success", d: "03:40", c: "Behind The Scenes", tint: "from-fuchsia-500 to-purple-700" },
  { t: "Award Ceremony Highlights", sub: "Receiving national recognition", d: "04:15", c: "Awards", tint: "from-rose-500 to-pink-700" },
];

function Page() {
  const { id } = Route.useParams();
  const a = getOlympian(id);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeVideo, setActiveVideo] = useState(0);
  const [progress] = useState(54);

  const p = a.participations[0];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="container-page py-3 flex items-center justify-between gap-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link to="/" className="hover:text-gray-700 transition">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/olympians" className="hover:text-gray-700 transition">Olympians</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/olympians/$id" params={{ id }} className="hover:text-gray-700 transition">{a.name}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-700 font-semibold">Highlights</span>
          </nav>
          <Link to="/olympians/$id" params={{ id }}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#363092] border border-gray-200 hover:border-[#363092] rounded-lg px-3 py-1.5 transition whitespace-nowrap">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Profile
          </Link>
        </div>
      </div>

      {/* ── ATHLETE TITLE STRIP ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-page py-5 flex flex-wrap items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">Highlights</h1>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-bold text-[#FF6B35] text-lg">{a.name}</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1.5 text-gray-500"><span className="text-base">🇮🇳</span>
                {a.medal !== "—" ? `Olympic ${a.medal} Medalist` : "Olympic Participant"}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{a.sport}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container-page py-6 grid lg:grid-cols-[1fr,380px] gap-6">

        {/* Left: Video player + info */}
        <div>
          {/* Video player */}
          <div className="bg-[#0f1b3d] rounded-2xl overflow-hidden shadow-xl">
            {/* Screen */}
            <div className="relative aspect-video bg-gradient-to-br from-[#0a1428] to-[#1a2d5a]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b3d]/80 via-transparent to-transparent" />

              {/* Top badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-white text-xs font-semibold">
                  <span className="text-base">🏅</span> {p?.venue} {p?.year} Olympics
                </div>
                {a.medal !== "—" && (
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                       style={{ background: medalColor(a.medal) }}>
                    <Medal className="h-3 w-3" />{a.medal} Medal
                  </div>
                )}
              </div>

              {/* Play button */}
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="h-16 w-16 rounded-full bg-white/90 grid place-items-center shadow-2xl group-hover:scale-110 transition">
                  <Play className="h-7 w-7 text-[#0f1b3d] fill-[#0f1b3d] ml-1" />
                </div>
              </button>
            </div>

            {/* Player controls */}
            <div className="px-4 py-3">
              {/* Progress bar */}
              <div className="relative h-1 bg-white/20 rounded-full mb-3 cursor-pointer group">
                <div className="h-full bg-[#FF6B35] rounded-full" style={{ width: `${progress}%` }} />
                <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#FF6B35] shadow-md opacity-0 group-hover:opacity-100 transition"
                     style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }} />
              </div>
              {/* Control buttons */}
              <div className="flex items-center justify-between text-white/70">
                <div className="flex items-center gap-3">
                  <button className="p-1.5 hover:text-white transition"><Play className="h-5 w-5 fill-current" /></button>
                  <button className="p-1.5 hover:text-white transition"><SkipForward className="h-5 w-5" /></button>
                  <button className="p-1.5 hover:text-white transition"><Volume2 className="h-5 w-5" /></button>
                  <span className="text-xs font-mono text-white/50">02:18 / 04:25</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:text-white transition"><Subtitles className="h-4 w-4" /></button>
                  <button className="p-1.5 hover:text-white transition"><Settings className="h-4 w-4" /></button>
                  <button className="p-1.5 hover:text-white transition"><Maximize className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Video info */}
          <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-black text-gray-900">{p?.venue} {p?.year} — {p?.badge === "—" ? "Performance" : p?.badge + " Winning Performance"}</h2>
                <div className="text-sm text-gray-500 mt-1">{p?.event} — Final</div>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{a.bio.split(".").slice(0, 2).join(".") + "."}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[#FF6B35]" />{p?.year}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#FF6B35]" />{p?.venue} Olympics</span>
              <span className="px-3 py-0.5 rounded-full bg-gray-100 text-xs font-semibold text-gray-600">Event: {p?.event}</span>
            </div>
            <div className="mt-5 flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f1b3d] text-white text-sm font-semibold hover:bg-[#1a2d5a] transition shadow-lg">
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:border-[#FF6B35] hover:text-[#FF6B35] transition">
                <Heart className="h-4 w-4" /> Add to Favourites
              </button>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[
              { icon: "🏅", label: "Olympic Medal", value: a.medal !== "—" ? `${a.medal} (${p?.venue} ${p?.year})` : "Participant" },
              { icon: "🎯", label: "Event", value: p?.event ?? a.sport },
              { icon: "📊", label: "Performance", value: p?.performance ?? "—" },
              { icon: "📈", label: "Final Ranking", value: p?.position ?? "—" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <div className="text-xl">{s.icon}</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">{s.label}</div>
                <div className="font-black text-gray-900 mt-1 text-sm leading-tight">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sidebar playlist */}
        <div>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input placeholder="Search highlights…"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#363092]/20" />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {CATEGORIES.slice(0, 5).map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  activeFilter === f
                    ? "bg-[#363092] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#363092]"
                }`}>{f}</button>
            ))}
          </div>

          {/* Playlist */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="font-bold text-gray-900 text-sm">More Highlights</div>
              <span className="text-xs text-gray-400">{PLAYLIST.length} videos</span>
            </div>
            <div className="divide-y divide-gray-50">
              {PLAYLIST.map((v, i) => (
                <button key={i} onClick={() => setActiveVideo(i)}
                  className={`w-full flex gap-3 p-3.5 text-left transition ${activeVideo === i ? "bg-violet-50" : "hover:bg-gray-50"}`}>
                  {/* Thumbnail */}
                  <div className={`relative h-[68px] w-[110px] shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${v.tint}`}>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="h-7 w-7 rounded-full bg-white/80 grid place-items-center">
                        <Play className="h-3 w-3 text-gray-800 fill-gray-800 ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-white font-semibold">{v.d}</div>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0 py-0.5">
                    <div className="text-[10px] font-bold text-[#FF6B35] uppercase tracking-wider mb-0.5">{v.c}</div>
                    <div className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug">{v.t}</div>
                    <div className="text-xs text-gray-400 mt-1 line-clamp-1">{v.sub}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-gray-100">
              <button className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-[#363092] hover:text-[#FF6B35] transition">
                View All Highlights <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

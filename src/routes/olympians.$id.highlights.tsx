import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Play, Share2, Heart, Search, Sparkles, Medal, Trophy,
  TrendingUp, Target, ChevronRight, Calendar, MapPin,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/olympians/$id/highlights")({
  head: () => ({ meta: [{ title: "Athlete Highlights — P.T. Karnik" }] }),
  component: Page,
});

const PLAYLIST = [
  { t: "Olympic Final Performance", d: "12:48", c: "Olympics", tint: "from-violet-500 to-indigo-600" },
  { t: "Training Session at Balewadi", d: "08:21", c: "Training", tint: "from-emerald-500 to-teal-600" },
  { t: "Post-Race Interview", d: "05:12", c: "Interview", tint: "from-orange-500 to-rose-600" },
  { t: "Padma Shri Award Ceremony", d: "03:45", c: "Awards", tint: "from-amber-500 to-yellow-600" },
  { t: "Behind The Scenes — Paris", d: "09:30", c: "BTS", tint: "from-fuchsia-500 to-pink-600" },
  { t: "Press Conference Highlights", d: "06:18", c: "Press", tint: "from-sky-500 to-blue-600" },
];

const GALLERY = [
  { t: "Asian Games Gold Run", c: "National Games", d: "11:02", tint: "from-amber-400 to-orange-600" },
  { t: "100m Final — Paris 2024", c: "Olympics", d: "10:45", tint: "from-violet-500 to-indigo-700" },
  { t: "Coach Interview", c: "Interviews", d: "07:55", tint: "from-emerald-500 to-teal-700" },
  { t: "Sprint Drills", c: "Training", d: "14:20", tint: "from-sky-500 to-blue-700" },
  { t: "Arjuna Award Speech", c: "Awards", d: "06:30", tint: "from-yellow-500 to-amber-700" },
  { t: "World Championships Bronze", c: "Athletics", d: "09:14", tint: "from-rose-500 to-pink-700" },
  { t: "Khelo India Featurette", c: "Athletics", d: "08:02", tint: "from-fuchsia-500 to-purple-700" },
  { t: "Documentary — The Journey", c: "Interviews", d: "22:40", tint: "from-indigo-500 to-violet-700" },
];

const FILTERS = ["All", "Olympics", "National Games", "Athletics", "Interviews", "Training", "Awards"];

const QUICK = [
  { icon: Medal, label: "Medal", value: "Bronze", tint: "from-orange-400 to-amber-600" },
  { icon: Target, label: "Event", value: "100m Sprint", tint: "from-violet-500 to-indigo-600" },
  { icon: TrendingUp, label: "Performance", value: "10.87s", tint: "from-emerald-500 to-teal-600" },
  { icon: Trophy, label: "Ranking", value: "World #5", tint: "from-amber-400 to-yellow-600" },
];

function Page() {
  const { id } = Route.useParams();
  const [active, setActive] = useState("All");
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
      {/* Breadcrumb + Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#363092 0%,#4338ca 60%,#1a1450 100%)" }} />
        <div className="absolute inset-0 opacity-25 pointer-events-none"
             style={{ background: "radial-gradient(circle at 90% 10%, #FF6B35 0%, transparent 50%)" }} />
        <div className="container-page relative py-10 md:py-14 text-white">
          <nav className="text-xs flex items-center gap-1.5 text-white/70">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/olympians" className="hover:text-white">Athletes</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/olympians/$id" params={{ id }} className="hover:text-white">P.T. Karnik</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white font-semibold">Highlights</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <div className="relative h-20 w-20 rounded-2xl bg-white/10 backdrop-blur border border-white/20 grid place-items-center text-white/60 font-black text-xl">PTK</div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">Athlete Highlights</h1>
              <p className="mt-2 text-white/75 max-w-2xl">Watch memorable performances, interviews, achievements and event highlights.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs">Athletics</span>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FF6B35] to-amber-500 text-xs font-semibold flex items-center gap-1.5"><Sparkles className="h-3 w-3" />Olympian</span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs">🇮🇳 India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 grid lg:grid-cols-[1fr,360px] gap-6">
        {/* Featured */}
        <div>
          <div className="rounded-[20px] overflow-hidden bg-white border border-gray-100 shadow-xl">
            <div className="relative aspect-video bg-gradient-to-br from-violet-600 via-indigo-700 to-violet-900">
              <div className="absolute inset-0 grid place-items-center">
                <button className="h-20 w-20 rounded-full bg-white/90 grid place-items-center shadow-2xl hover:scale-110 transition">
                  <Play className="h-8 w-8 text-[#363092] ml-1" />
                </button>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 rounded-full bg-white/90 text-[11px] font-bold text-[#363092] uppercase tracking-wider">Paris 2024</span>
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[11px] font-bold text-white flex items-center gap-1"><Medal className="h-3 w-3" />Bronze</span>
              </div>
              <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-black/60 text-white text-xs font-semibold">12:48</div>
            </div>
            <div className="p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">100m Sprint — Olympic Final 2024</h2>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><Trophy className="h-4 w-4 text-[#FF6B35]" />Olympic Games — Paris</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[#FF6B35]" />04 Aug 2024</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#FF6B35]" />Stade de France</span>
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A career-defining run from P.T. Karnik — a clean reaction off the blocks, a smooth drive phase,
                and a tight finish that secured a podium spot for Maharashtra and India on the world's biggest stage.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#363092] to-indigo-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg hover:scale-[1.02] transition">
                  <Share2 className="h-4 w-4" /> Share
                </button>
                <button className="px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-sm flex items-center gap-2 hover:border-[#FF6B35] hover:text-[#FF6B35] transition">
                  <Heart className="h-4 w-4" /> Add to Favorites
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK.map(s => (
              <div key={s.label} className="rounded-[20px] bg-white border border-gray-100 p-5 shadow-sm hover:-translate-y-1 hover:shadow-xl transition">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.tint} grid place-items-center text-white shadow-lg`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="mt-3 text-lg font-black text-gray-900">{s.value}</div>
                <div className="text-[11px] uppercase text-gray-500 font-semibold tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar playlist */}
        <aside>
          <div className="rounded-[20px] bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="font-bold text-gray-900">More Highlights</div>
              <span className="text-xs text-gray-500">{PLAYLIST.length} videos</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-[640px] overflow-y-auto">
              {PLAYLIST.map((v, i) => (
                <button key={i} className="w-full flex gap-3 p-3 text-left hover:bg-violet-50/60 transition">
                  <div className={`relative h-20 w-32 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br ${v.tint}`}>
                    <div className="absolute inset-0 grid place-items-center">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-white font-semibold">{v.d}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wider">{v.c}</div>
                    <div className="font-semibold text-sm text-gray-900 line-clamp-2">{v.t}</div>
                    <div className="mt-1 text-xs text-gray-500 line-clamp-1">Watch the full clip from the official archive.</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Gallery */}
      <section className="container-page pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-[#363092] to-[#FF6B35]" />
              <span className="text-xs uppercase tracking-widest text-[#363092] font-bold">Library</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Video Gallery</h2>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input placeholder="Search videos…" className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                active === f
                  ? "bg-gradient-to-r from-[#363092] to-indigo-600 text-white shadow-lg shadow-violet-900/20"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-[#363092]"
              }`}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GALLERY.map((v, i) => (
            <div key={i} className="group rounded-[20px] bg-white border border-gray-100 overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-2xl transition cursor-pointer">
              <div className={`relative aspect-video bg-gradient-to-br ${v.tint}`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition grid place-items-center">
                  <div className="h-14 w-14 rounded-full bg-white/90 grid place-items-center shadow-xl scale-90 group-hover:scale-100 transition">
                    <Play className="h-5 w-5 text-[#363092] ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] font-semibold">{v.d}</div>
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-bold text-[#363092] uppercase tracking-wider">{v.c}</div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-gray-900 group-hover:text-[#363092] transition line-clamp-2">{v.t}</div>
                <div className="mt-1 text-xs text-gray-500">Highlights · Maharashtra Sports</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

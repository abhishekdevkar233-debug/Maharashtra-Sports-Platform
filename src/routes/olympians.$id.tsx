import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Medal, Trophy, Share2, Play, Calendar, MapPin, User, GraduationCap,
  Award, ChevronRight, Sparkles, Target, TrendingUp, Heart,
} from "lucide-react";

export const Route = createFileRoute("/olympians/$id")({
  head: () => ({ meta: [{ title: "Athlete Profile — P.T. Karnik" }] }),
  component: Page,
});

const STATS = [
  { icon: Trophy, label: "Olympic Appearances", value: "3", tint: "from-violet-500 to-indigo-600" },
  { icon: Medal, label: "Gold Medals", value: "1", tint: "from-amber-400 to-yellow-500" },
  { icon: Medal, label: "Silver Medals", value: "2", tint: "from-slate-300 to-slate-500" },
  { icon: Medal, label: "Bronze Medals", value: "3", tint: "from-orange-400 to-amber-700" },
];

const PARTICIPATIONS = [
  { year: "2024", event: "100m Sprint", position: "5th", performance: "10.87 sec", venue: "Paris", badge: "Finalist", tint: "from-violet-500 to-indigo-600" },
  { year: "2020", event: "200m Sprint", position: "3rd", performance: "20.41 sec", venue: "Tokyo", badge: "Bronze", tint: "from-orange-400 to-amber-600" },
  { year: "2016", event: "4×100m Relay", position: "2nd", performance: "38.62 sec", venue: "Rio", badge: "Silver", tint: "from-slate-400 to-slate-600" },
  { year: "2012", event: "100m Sprint", position: "1st", performance: "10.21 sec", venue: "London", badge: "Gold", tint: "from-amber-400 to-yellow-600" },
];

const AWARDS = [
  { name: "Arjuna Award", year: "2023", desc: "National recognition for outstanding performance in athletics." },
  { name: "Shiv Chhatrapati Award", year: "2022", desc: "Maharashtra State's highest sporting honour." },
  { name: "Padma Shri", year: "2024", desc: "Civilian honour for distinguished contribution to sport." },
  { name: "Khel Ratna Nominee", year: "2024", desc: "Nominated for India's most prestigious sports award." },
  { name: "Asian Games Gold", year: "2023", desc: "Gold medal at 19th Asian Games — Hangzhou." },
  { name: "World Championship Bronze", year: "2022", desc: "Bronze at World Athletics Championships — Eugene." },
];

const RELATED = [
  { id: "2", name: "Aarav Joshi", sport: "Shooting", role: "Silver — 2024" },
  { id: "7", name: "Priya Sawant", sport: "Athletics", role: "Finalist — 2024" },
  { id: "3", name: "Riya Patil", sport: "Boxing", role: "Bronze — 2020" },
  { id: "4", name: "Vikram Kale", sport: "Wrestling", role: "Quarter — 2024" },
];

function Page() {
  const { id } = Route.useParams();
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#363092 0%,#4338ca 50%,#1a1450 100%)" }} />
        <div className="absolute inset-0 opacity-30 pointer-events-none"
             style={{ background: "radial-gradient(circle at 80% 20%, #FF6B35 0%, transparent 50%), radial-gradient(circle at 10% 80%, #a78bfa 0%, transparent 50%)" }} />
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container-page py-16 md:py-20 relative grid md:grid-cols-[380px,1fr] gap-10 items-center">
          {/* Portrait */}
          <div className="relative mx-auto md:mx-0">
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[#FF6B35] via-fuchsia-500 to-violet-400 opacity-60 blur-2xl" />
            <div className="relative h-[380px] w-[320px] rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 grid place-items-center text-white/40 text-7xl font-black">PTK</div>
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" /> Olympian
              </div>
              <div className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-white/90 grid place-items-center text-2xl">🇮🇳</div>
            </div>
          </div>
          {/* Info */}
          <div className="text-white">
            <div className="text-xs uppercase tracking-[0.25em] text-[#FF9D6B] font-semibold">Athlete #{id} · Maharashtra</div>
            <h1 className="text-5xl md:text-6xl font-black mt-3 tracking-tight">P.T. Karnik</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-sm">Athletics</span>
              <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF6B35] to-amber-500 text-sm font-semibold flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" />Olympian</span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-sm flex items-center gap-1.5">🇮🇳 India</span>
            </div>
            <p className="mt-5 text-white/80 max-w-xl text-lg leading-relaxed">
              P.T. Karnik proudly represented Maharashtra and India on the Olympic stage —
              a journey of grit, discipline and record-breaking performances.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/olympians/$id/highlights" params={{ id }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-amber-500 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-orange-900/40 hover:scale-[1.02] transition">
                <Play className="h-4 w-4" /> View Highlights
              </Link>
              <button className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/25 font-semibold text-sm flex items-center gap-2 hover:bg-white/20 transition">
                <Share2 className="h-4 w-4" /> Share Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-page -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="group rounded-[20px] bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-violet-900/5 p-5 hover:-translate-y-1 hover:shadow-2xl transition">
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${s.tint} grid place-items-center text-white shadow-lg`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-4xl font-black text-gray-900 tracking-tight">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-gray-500 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="container-page py-16 grid md:grid-cols-[1.4fr,1fr] gap-6">
        <div className="rounded-[20px] bg-white border border-gray-100 shadow-sm p-7">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-[#363092] to-[#FF6B35]" />
            <span className="text-xs uppercase tracking-widest text-[#363092] font-bold">About Athlete</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Biography & Journey</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Born and raised in Kolhapur, P.T. Karnik discovered athletics at the district school meet
            and went on to dominate the national circuit by age 18. A three-time Olympian, he holds the
            Indian national record in the 100m sprint and continues to inspire a generation of track athletes
            across Maharashtra.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            His career arc — from a small-town aspirant to an Asian Games gold medallist and Olympic finalist —
            mirrors the rise of Maharashtra's modern sports ecosystem, anchored by the Balewadi High Performance Centre.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[["12+","Years"],["38","Medals"],["3","Olympics"]].map(([v,l]) => (
              <div key={l} className="rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 p-4 text-center">
                <div className="text-2xl font-black text-[#363092]">{v}</div>
                <div className="text-[11px] uppercase text-gray-500 font-semibold">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[20px] bg-gradient-to-br from-[#363092] to-[#1a1450] text-white shadow-xl p-7">
          <div className="flex items-center gap-2 mb-1 opacity-90">
            <div className="h-1 w-10 rounded-full bg-[#FF6B35]" />
            <span className="text-xs uppercase tracking-widest font-bold">Personal Info</span>
          </div>
          <h2 className="text-2xl font-bold">Profile Details</h2>
          <dl className="mt-5 divide-y divide-white/10 text-sm">
            {[
              [Calendar, "Date of Birth", "14 Aug 1996"],
              [User, "Gender", "Male"],
              [Target, "Sport", "Athletics — Sprint"],
              [MapPin, "District", "Kolhapur"],
              [MapPin, "State", "Maharashtra"],
              [GraduationCap, "Coach", "Mr. Anil Joshi"],
              [Award, "Academy", "Balewadi HPC"],
              [Trophy, "Category", "Senior — Track"],
            ].map(([Icon, k, v]) => {
              const I = Icon as typeof Calendar;
              return (
                <div key={k as string} className="py-3 flex items-center gap-3">
                  <I className="h-4 w-4 text-[#FF9D6B]" />
                  <dt className="opacity-75 w-32">{k as string}</dt>
                  <dd className="font-semibold ml-auto">{v as string}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* OLYMPIC TIMELINE */}
      <section className="container-page pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-[#363092] to-[#FF6B35]" />
              <span className="text-xs uppercase tracking-widest text-[#363092] font-bold">Timeline</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Olympic Participation</h2>
          </div>
          <Link to="/olympians/$id/highlights" params={{ id }} className="hidden md:flex text-sm font-semibold text-[#363092] items-center gap-1 hover:gap-2 transition-all">
            View all highlights <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible pb-3 -mx-4 md:mx-0 px-4 md:px-0 snap-x">
          {PARTICIPATIONS.map(p => (
            <div key={p.year} className="snap-start shrink-0 w-[260px] md:w-auto rounded-[20px] bg-white border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-xl transition">
              <div className={`h-2 bg-gradient-to-r ${p.tint}`} />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-black text-gray-900">{p.year}</div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r ${p.tint}`}>{p.badge}</span>
                </div>
                <div className="mt-3 text-sm font-semibold text-gray-900">{p.event}</div>
                <div className="text-xs text-gray-500">{p.venue} Olympics</div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-lg bg-gray-50 py-2"><div className="text-xs text-gray-500">Position</div><div className="font-bold text-gray-900">{p.position}</div></div>
                  <div className="rounded-lg bg-gray-50 py-2"><div className="text-xs text-gray-500">Time</div><div className="font-bold text-gray-900">{p.performance}</div></div>
                </div>
                <button className="mt-4 w-full py-2 rounded-lg text-sm font-semibold text-[#363092] border border-[#363092]/20 hover:bg-[#363092] hover:text-white transition flex items-center justify-center gap-1">
                  View Performance <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section className="bg-gradient-to-b from-violet-50/50 to-white py-16">
        <div className="container-page">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-[#363092] to-[#FF6B35]" />
              <span className="text-xs uppercase tracking-widest text-[#363092] font-bold">Honours</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Awards & Recognition</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AWARDS.map(a => (
              <div key={a.name} className="group rounded-[20px] bg-white border border-gray-100 p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-violet-200 transition">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center text-white shadow-lg shrink-0 group-hover:scale-110 transition">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-gray-900">{a.name}</div>
                      <span className="text-xs font-semibold text-[#FF6B35]">{a.year}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="container-page py-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-[#363092] to-[#FF6B35]" />
            <span className="text-xs uppercase tracking-widest text-[#363092] font-bold">Gallery</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Career Moments</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { h: "h-64", t: "from-violet-400 to-indigo-600" },
            { h: "h-48", t: "from-orange-400 to-rose-500" },
            { h: "h-48", t: "from-emerald-400 to-teal-600" },
            { h: "h-64", t: "from-amber-400 to-orange-600" },
            { h: "h-48", t: "from-fuchsia-400 to-pink-600" },
            { h: "h-64", t: "from-sky-400 to-blue-600" },
            { h: "h-64", t: "from-violet-500 to-purple-700" },
            { h: "h-48", t: "from-yellow-400 to-amber-600" },
          ].map((g, i) => (
            <button key={i} className={`${g.h} relative rounded-2xl overflow-hidden group bg-gradient-to-br ${g.t} cursor-zoom-in`}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition grid place-items-center">
                <div className="opacity-0 group-hover:opacity-100 transition h-12 w-12 rounded-full bg-white/90 grid place-items-center">
                  <Sparkles className="h-5 w-5 text-[#363092]" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* RELATED */}
      <section className="bg-gradient-to-b from-white to-violet-50/40 py-16">
        <div className="container-page">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-10 rounded-full bg-gradient-to-r from-[#363092] to-[#FF6B35]" />
              <span className="text-xs uppercase tracking-widest text-[#363092] font-bold">Discover</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Related Athletes</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {RELATED.map(r => (
              <Link key={r.id} to="/olympians/$id" params={{ id: r.id }}
                className="group rounded-[20px] bg-white border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition">
                <div className="h-44 bg-gradient-to-br from-violet-200 via-indigo-300 to-violet-400 relative">
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-bold text-[#363092] uppercase tracking-wider">{r.sport}</div>
                </div>
                <div className="p-4">
                  <div className="font-bold text-gray-900 group-hover:text-[#363092] transition">{r.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.role}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Play, Share2, MapPin, Calendar, User, GraduationCap,
  Award, ChevronRight, Target, Medal, Trophy, Flag,
} from "lucide-react";
import { getOlympian } from "@/data/olympians";

export const Route = createFileRoute("/olympians/$id/")({
  head: () => ({ meta: [{ title: "Athlete Profile" }] }),
  component: Page,
});

const medalColor = (m: string) =>
  m.includes("Gold") ? "#d97706" : m.includes("Silver") ? "#6b7280" : m.includes("Bronze") ? "#b45309" : "#6366f1";

const RELATED_IDS = ["2", "7", "3", "9", "14", "12"];

function Page() {
  const { id } = Route.useParams();
  const a = getOlympian(id);
  const related = RELATED_IDS.filter(rid => rid !== id).slice(0, 4).map(getOlympian);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── HERO ── */}
      <section className="bg-[#0f1b3d] relative overflow-hidden">
        <div className="container-page">
          <div className="grid md:grid-cols-[420px,1fr] gap-0 min-h-[420px]">

            {/* Left — photo */}
            <div className="relative h-[340px] md:h-auto overflow-hidden">
              {a.img
                ? <img src={a.img} alt={a.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                : <div className="absolute inset-0 grid place-items-center text-white/30 text-8xl font-black">{a.initials}</div>
              }
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f1b3d]/80 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b3d]/70 to-transparent md:hidden" />
            </div>

            {/* Right — info */}
            <div className="relative z-10 py-12 px-0 md:px-10 flex flex-col justify-center text-white">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-5">
                <Link to="/" className="hover:text-white transition">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link to="/olympians" className="hover:text-white transition">Olympians</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/80">{a.name}</span>
              </nav>

              {/* Sport pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur text-xs font-semibold uppercase tracking-widest w-fit mb-4">
                <Target className="h-3.5 w-3.5 text-[#FF6B35]" />{a.sport}
              </div>

              {/* Name */}
              <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase leading-none">{a.name}</h1>

              {/* Medal subtitle */}
              {a.medal !== "—" ? (
                <div className="mt-3 text-[#FF6B35] font-bold text-xl">
                  Olympic {a.medal} Medalist
                </div>
              ) : (
                <div className="mt-3 text-white/60 font-semibold text-lg">Olympic Participant</div>
              )}

              {/* Flag line */}
              <div className="mt-3 flex items-center gap-2 text-sm text-white/70">
                <span className="text-lg">🇮🇳</span> Represented India · {a.sport}
              </div>

              {/* Key info row */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-4 py-2.5">
                  <Calendar className="h-4 w-4 text-[#FF6B35]" />
                  <div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Olympics</div>
                    <div className="font-semibold">{a.participations[0]?.venue} {a.participations[0]?.year}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-4 py-2.5">
                  <Flag className="h-4 w-4 text-[#FF6B35]" />
                  <div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Event</div>
                    <div className="font-semibold">{a.participations[0]?.event}</div>
                  </div>
                </div>
                {a.medal !== "—" && (
                  <div className="flex items-center gap-2 rounded-lg px-4 py-2.5" style={{ background: medalColor(a.medal) + "33", border: `1px solid ${medalColor(a.medal)}66` }}>
                    <Medal className="h-4 w-4" style={{ color: medalColor(a.medal) }} />
                    <div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">Medal</div>
                      <div className="font-semibold">{a.medal} Medal</div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/olympians/$id/highlights" params={{ id }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B35] hover:bg-[#e85c27] text-white font-semibold text-sm shadow-lg shadow-orange-900/30 transition">
                  <Play className="h-4 w-4 fill-white" /> Watch Highlights
                </Link>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur text-white font-semibold text-sm hover:bg-white/20 transition">
                  <Share2 className="h-4 w-4" /> Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-[#0a1428] border-t border-white/10">
          <div className="container-page grid grid-cols-4 divide-x divide-white/10">
            {[
              { icon: "🥇", label: "Gold", value: a.gold },
              { icon: "🥈", label: "Silver", value: a.silver },
              { icon: "🥉", label: "Bronze", value: a.bronze },
              { icon: "🏆", label: "International Medals", value: a.totalMedals },
            ].map(s => (
              <div key={s.label} className="py-5 px-6 text-center text-white">
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1 flex items-center justify-center gap-1.5">
                  <span>{s.icon}</span>{s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT + PERSONAL DETAILS ── */}
      <section className="container-page py-10 grid md:grid-cols-[1.2fr,1fr] gap-6">
        {/* About */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">About {a.name}</h2>
          <p className="text-gray-700 leading-relaxed">{a.bio}</p>
        </div>

        {/* Personal Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Personal Details</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
            {[
              [Calendar, "Date of Birth", a.dob],
              [User, "Hometown", a.district],
              [MapPin, "District", `${a.district}, Maharashtra`],
              [Target, "Sport", a.sport],
              [Award, "Discipline", a.category.split("—")[1]?.trim() ?? a.sport],
              [GraduationCap, "Coach", a.coach],
              [Trophy, "Training Academy", a.academy],
              [Flag, "Playing Hand", "Right"],
            ].map(([Icon, k, v]) => {
              const I = Icon as typeof Calendar;
              return (
                <div key={k as string}>
                  <dt className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold flex items-center gap-1.5 mb-1">
                    <I className="h-3.5 w-3.5" />{k as string}
                  </dt>
                  <dd className="font-semibold text-gray-900">{v as string}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* ── OLYMPIC PARTICIPATION ── */}
      <section className="container-page pb-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Olympic Participation</h2>
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr,repeat(3,1fr)] gap-4">
          {a.participations.map((p, i) => i === 0 ? (
            /* Featured — large dark card */
            <div key={p.year} className="bg-[#0f1b3d] text-white rounded-2xl p-7 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🏅</span>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/50">{p.venue} {p.year} Olympics</div>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white"
                     style={{ background: p.badge === "Gold" ? "#d97706" : p.badge === "Silver" ? "#6b7280" : p.badge === "Bronze" ? "#b45309" : "#6366f1" }}>
                  <Medal className="h-3 w-3" />{p.badge}
                </div>
              </div>
              <div className="mt-6">
                <div className="text-sm text-white/50 uppercase tracking-wider">Event</div>
                <div className="font-bold text-lg mt-1">{p.event}</div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Final Ranking</div>
                    <div className="font-black text-2xl mt-1">{p.position}</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Performance</div>
                    <div className="font-black text-xl mt-1">{p.performance}</div>
                  </div>
                </div>
                <Link to="/olympians/$id/highlights" params={{ id }}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FF6B35] text-white text-sm font-semibold hover:bg-[#e85c27] transition">
                  View Performance <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* Smaller cards for prior games */
            <div key={p.year} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{p.venue} {p.year}</div>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                     style={{ background: p.badge === "Gold" ? "#d97706" : p.badge === "Silver" ? "#6b7280" : p.badge === "Bronze" ? "#b45309" : "#94a3b8" }}>
                  {p.badge}
                </div>
                <div className="mt-3 font-semibold text-gray-900 text-sm">{p.event}</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="rounded-lg bg-gray-50 p-2.5">
                  <div className="text-gray-400">Ranking</div>
                  <div className="font-black text-gray-900 text-base mt-0.5">{p.position}</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-2.5">
                  <div className="text-gray-400">Result</div>
                  <div className="font-bold text-gray-900 mt-0.5 text-xs">{p.performance}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="container-page">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Awards & Recognition</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {a.awards.map(aw => (
              <div key={aw.name} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:border-amber-200 hover:bg-amber-50/40 transition">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center shadow-md">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{aw.name}</div>
                  <div className="text-xs text-[#FF6B35] font-semibold mt-0.5">{aw.year}</div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{aw.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED ATHLETES ── */}
      <section className="container-page py-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Related Athletes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map(r => (
            <Link key={r.id} to="/olympians/$id" params={{ id: r.id }}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {r.img
                  ? <img src={r.img} alt={r.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                  : <div className="w-full h-full bg-gradient-to-br from-[#363092] to-indigo-700 grid place-items-center text-white text-3xl font-black opacity-70">{r.initials}</div>
                }
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white text-[9px] font-bold text-gray-700 uppercase tracking-wide">{r.sport}</div>
              </div>
              <div className="p-4">
                <div className="text-[10px] font-bold text-[#FF6B35] uppercase tracking-wider">{r.sport}</div>
                <div className="font-bold text-gray-900 mt-0.5 group-hover:text-[#363092] transition">{r.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{r.medal !== "—" ? r.medal : "Participant"} · {r.edition}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame, Trophy, MapPin, CalendarDays, Users2, Target, CheckCircle2,
  TrendingUp, Zap, AlertTriangle, PlayCircle, Download, BookOpen,
} from "lucide-react";
import { LmsShell } from "@/components/lms/LmsShell";
import { LmsCard, ProgressBar } from "@/components/lms/LmsUI";
import {
  STUDENT, SUBJECTS, COURSES, COMPETITION_MODE, AI_DAILY_PLAN,
  CATCH_UP_ALERT, OFFLINE_STATUS, LMS_COLORS,
} from "@/lib/lms-data";

export const Route = createFileRoute("/lms/")({
  head: () => ({ meta: [{ title: "Dashboard — Athlete Learning Hub" }] }),
  component: Page,
});

const SLOT_META: Record<string, { icon: typeof Trophy; color: string }> = {
  Competition: { icon: Trophy, color: "#FDE68A" },
  Travel: { icon: MapPin, color: "#BFDBFE" },
  Study: { icon: BookOpen, color: "#A7F3D0" },
};

const continueCourse = COURSES.find((c) => c.status === "in-progress")!;

function Page() {
  const firstName = STUDENT.name.split(" ")[0];

  return (
    <LmsShell title="">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-2xl grid place-items-center shrink-0" style={{ background: LMS_COLORS.tealSoft, color: LMS_COLORS.teal }}>
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Welcome back, {firstName}</h1>
            <p className="text-[13px] text-slate-400 mt-0.5">{STUDENT.course.replace("— Science & Sports", "").trim() || STUDENT.course} · {STUDENT.school} — keep your momentum going</p>
          </div>
        </div>
        <div className="rounded-2xl bg-white border px-5 py-3 flex items-center gap-3 shrink-0" style={{ borderColor: LMS_COLORS.border }}>
          <Flame className="h-5 w-5" style={{ color: LMS_COLORS.accent }} />
          <div>
            <div className="text-[14px] font-extrabold text-slate-900 leading-tight">{STUDENT.streakDays}-day streak</div>
            <div className="text-[11px] text-slate-400">Best: {STUDENT.streakBest} days</div>
          </div>
        </div>
      </div>

      {/* Competition Mode banner */}
      {COMPETITION_MODE.active && (
        <div className="rounded-[24px] p-6 sm:p-7 text-white relative overflow-hidden mb-6"
          style={{ background: `linear-gradient(115deg, ${LMS_COLORS.primary}, ${LMS_COLORS.teal})` }}>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-white" /> COMPETITION MODE ACTIVE
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold mt-3">{COMPETITION_MODE.eventName}</h2>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2 text-white/85 text-[13px]">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {COMPETITION_MODE.location}</span>
                <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {COMPETITION_MODE.duration}</span>
                <span className="flex items-center gap-1.5"><Users2 className="h-3.5 w-3.5" /> {COMPETITION_MODE.coach}</span>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <div className="rounded-2xl bg-white/15 px-5 py-3 text-center min-w-[92px]">
                <div className="text-2xl font-extrabold leading-none">{COMPETITION_MODE.lessonsRemaining}</div>
                <div className="text-[10.5px] text-white/75 mt-1.5">Lessons Left</div>
              </div>
              <div className="rounded-2xl bg-white/15 px-5 py-3 text-center min-w-[92px]">
                <div className="text-2xl font-extrabold leading-none">{COMPETITION_MODE.estimatedStudyTime}</div>
                <div className="text-[10.5px] text-white/75 mt-1.5">Est. Study Time</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/20">
            <div className="text-[11px] font-bold tracking-wider text-white/80 mb-3">TODAY'S LEARNING PLAN — AUTO-ADJUSTED BY AI</div>
            <div className="grid sm:grid-cols-3 gap-3">
              {AI_DAILY_PLAN.map((p) => {
                const meta = SLOT_META[p.tag];
                const Icon = meta.icon;
                return (
                  <div key={p.slot} className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3.5">
                    <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-wide text-white/70 mb-1.5">
                      <Icon className="h-3.5 w-3.5" /> {p.slot.toUpperCase()}
                    </div>
                    <div className="text-[13.5px] font-semibold">{p.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Target, value: `${STUDENT.overallProgress}%`, label: "Learning Progress", color: LMS_COLORS.teal },
          { icon: CheckCircle2, value: `${STUDENT.attendance}%`, label: "Attendance", color: LMS_COLORS.primary },
          { icon: TrendingUp, value: `${STUDENT.academicScore}%`, label: "Academic Score", color: LMS_COLORS.primary },
          { icon: Zap, value: `${STUDENT.examReadiness}%`, label: "Exam Readiness", color: LMS_COLORS.warning },
        ].map((s) => (
          <LmsCard key={s.label} className="p-5">
            <div className="flex items-start justify-between">
              <div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
              <s.icon className="h-[18px] w-[18px]" style={{ color: s.color }} />
            </div>
            <div className="text-[12.5px] text-slate-500 font-medium mt-1">{s.label}</div>
          </LmsCard>
        ))}
      </div>

      {/* Catch-up alert */}
      <LmsCard className="p-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: LMS_COLORS.warningSoft, borderColor: "#FDE7C8" }}>
        <AlertTriangle className="h-5 w-5 shrink-0" style={{ color: LMS_COLORS.warning }} />
        <div className="flex-1">
          <div className="font-bold text-slate-900 text-[13.5px]">You missed {CATCH_UP_ALERT.missedLectures} lectures {CATCH_UP_ALERT.reason}</div>
          <div className="text-[12.5px] text-slate-500 mt-0.5">{CATCH_UP_ALERT.note}</div>
        </div>
        <button className="shrink-0 rounded-xl px-4 py-2.5 text-[12.5px] font-bold text-white transition hover:opacity-90" style={{ background: LMS_COLORS.warning }}>
          Generate Catch-Up Plan
        </button>
      </LmsCard>

      {/* Continue Learning + Offline */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 mb-6">
        <LmsCard className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold tracking-wider text-slate-400">CONTINUE LEARNING</span>
            <span className="text-[12px] text-slate-400">{continueCourse.subject}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl grid place-items-center shrink-0" style={{ background: LMS_COLORS.primarySoft, color: LMS_COLORS.primary }}>
              <PlayCircle className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-slate-900 text-[14.5px] truncate">{continueCourse.title}</div>
              <div className="text-[12px] text-slate-400 mt-0.5">12 min remaining · Mrs. Kulkarni</div>
            </div>
            <button className="shrink-0 rounded-xl px-4 py-2.5 text-[12.5px] font-bold text-white transition hover:opacity-90" style={{ background: LMS_COLORS.primary }}>
              Resume
            </button>
          </div>
          <div className="mt-4">
            <ProgressBar value={continueCourse.progress} color={LMS_COLORS.primary} />
          </div>
        </LmsCard>

        <LmsCard className="p-5 sm:p-6">
          <span className="text-[11px] font-bold tracking-wider text-slate-400">OFFLINE</span>
          <p className="text-[13.5px] text-slate-600 mt-3">{OFFLINE_STATUS.lessonsDownloaded} lessons downloaded for {OFFLINE_STATUS.trip}</p>
          <button className="mt-5 w-full rounded-xl border py-2.5 text-[12.5px] font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-1.5" style={{ borderColor: LMS_COLORS.border }}>
            <Download className="h-4 w-4" /> Manage Downloads
          </button>
        </LmsCard>
      </div>

      {/* My Subjects */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold tracking-wider text-slate-400">MY SUBJECTS</span>
        <Link to="/lms/subjects" className="text-[12.5px] font-bold" style={{ color: LMS_COLORS.primary }}>View all</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SUBJECTS.slice(0, 4).map((s) => (
          <Link key={s.id} to="/lms/subjects" className="rounded-2xl border bg-white p-4 hover:-translate-y-0.5 hover:shadow-md transition-all" style={{ borderColor: LMS_COLORS.border }}>
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: `${s.color}18`, color: s.color }}>
                <BookOpen className="h-[18px] w-[18px]" />
              </div>
              <span className="text-lg font-extrabold" style={{ color: s.color }}>{s.progress}%</span>
            </div>
            <div className="text-[13px] font-bold text-slate-800 mt-3">{s.name}</div>
          </Link>
        ))}
      </div>
    </LmsShell>
  );
}

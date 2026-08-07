import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, ClipboardCheck, AlertTriangle, FileDown, ChevronRight } from "lucide-react";
import { LmsShell } from "@/components/lms/LmsShell";
import { LmsCard, SectionHeading, ProgressBar, ProgressRing, Pill, IconTile } from "@/components/lms/LmsUI";
import { EXAMS, LMS_COLORS } from "@/lib/lms-data";

export const Route = createFileRoute("/lms/exams")({
  head: () => ({ meta: [{ title: "Exams — Athlete LMS" }] }),
  component: Page,
});

function readinessColor(v: number) {
  if (v >= 75) return LMS_COLORS.success;
  if (v >= 50) return LMS_COLORS.warning;
  return LMS_COLORS.danger;
}

const weakTopics = [
  { subject: "History & Civics", topic: "Freedom Struggle Timeline", score: 41 },
  { subject: "Science", topic: "Newton's Third Law Applications", score: 54 },
];

function Page() {
  const avgReadiness = Math.round(EXAMS.reduce((s, e) => s + e.readiness, 0) / EXAMS.length);

  return (
    <LmsShell title="Exams" subtitle="Prepare smart, not just hard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <LmsCard className="p-5 sm:p-6 flex items-center gap-5 lg:col-span-1">
          <ProgressRing value={avgReadiness} color={readinessColor(avgReadiness)} size={72} stroke={8} />
          <div>
            <div className="text-[13px] font-semibold text-slate-700">Exam Readiness Score</div>
            <div className="text-[11.5px] text-slate-400 mt-0.5">Average across all upcoming exams</div>
          </div>
        </LmsCard>

        <LmsCard className="p-5 sm:p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4" style={{ color: LMS_COLORS.warning }} />
            <div className="font-bold text-slate-900 text-[13.5px]">Recommended Revision — Weak Topics</div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {weakTopics.map((w) => (
              <div key={w.topic} className="rounded-xl border p-3.5" style={{ borderColor: LMS_COLORS.border }}>
                <div className="text-[11.5px] text-slate-400">{w.subject}</div>
                <div className="text-[13px] font-semibold text-slate-800 leading-snug mt-0.5">{w.topic}</div>
                <div className="flex items-center gap-2 mt-2">
                  <ProgressBar value={w.score} color={LMS_COLORS.danger} height={5} />
                  <span className="text-[11px] font-semibold text-slate-500 shrink-0">{w.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </LmsCard>
      </div>

      <SectionHeading title="Upcoming Exams" subtitle="Timetable, syllabus & preparation status" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {EXAMS.map((x) => (
          <LmsCard key={x.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <IconTile icon={<ClipboardCheck className="h-5 w-5" />} color={LMS_COLORS.primary} />
                <div>
                  <div className="font-bold text-slate-900 text-[14px]">{x.subject}</div>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400 mt-0.5">
                    <CalendarClock className="h-3.5 w-3.5" /> {x.date} · {x.time}
                  </div>
                </div>
              </div>
              <Pill color={readinessColor(x.readiness)} bg={`${readinessColor(x.readiness)}18`}>{x.readiness}% ready</Pill>
            </div>
            <div className="mt-3">
              <ProgressBar value={x.readiness} color={readinessColor(x.readiness)} />
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[11.5px] text-slate-400">Syllabus: {x.syllabus}</span>
              <button className="text-[12.5px] font-bold flex items-center gap-1" style={{ color: LMS_COLORS.primary }}>
                Practice Test <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </LmsCard>
        ))}
      </div>

      <SectionHeading title="Previous Papers & Instructions" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {["Mathematics — Term 1 Question Paper", "Teacher Instructions — Mid-Term Guidelines"].map((f) => (
          <LmsCard key={f} className="p-4 flex items-center gap-3">
            <IconTile icon={<FileDown className="h-[18px] w-[18px]" />} color={LMS_COLORS.success} />
            <div className="flex-1 min-w-0 text-[13px] font-medium text-slate-700 truncate">{f}</div>
            <button className="text-[12px] font-bold shrink-0" style={{ color: LMS_COLORS.primary }}>Download</button>
          </LmsCard>
        ))}
      </div>
    </LmsShell>
  );
}

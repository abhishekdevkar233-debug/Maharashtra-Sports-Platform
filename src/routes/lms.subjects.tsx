import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, PlayCircle, FileText, HelpCircle, ClipboardList } from "lucide-react";
import { LmsShell } from "@/components/lms/LmsShell";
import { LmsCard, ProgressBar } from "@/components/lms/LmsUI";
import { SUBJECTS, LMS_COLORS } from "@/lib/lms-data";

export const Route = createFileRoute("/lms/subjects")({
  head: () => ({ meta: [{ title: "Subjects — Athlete LMS" }] }),
  component: Page,
});

function Page() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => SUBJECTS.filter((s) => s.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <LmsShell title="Subjects" subtitle="Everything you're learning, organized simply">
      <div className="flex items-center gap-2 rounded-xl bg-white border px-3.5 py-2.5 w-full sm:w-80 mb-6" style={{ borderColor: LMS_COLORS.border }}>
        <Search className="h-4 w-4 text-slate-400 shrink-0" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search subjects…" className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((s) => (
          <LmsCard key={s.id} className="p-5 hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
              <div className="h-14 w-14 rounded-2xl grid place-items-center text-3xl" style={{ background: `${s.color}18` }}>{s.emoji}</div>
              <span className="text-[11px] font-semibold text-slate-400">{s.lastAccessed}</span>
            </div>
            <div className="mt-4 font-bold text-slate-900 text-[16px]">{s.name}</div>
            <div className="text-[12.5px] text-slate-400">{s.teacher}</div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-[11.5px] mb-1.5">
                <span className="text-slate-500 font-medium">Progress</span>
                <span className="font-bold text-slate-700">{s.progress}%</span>
              </div>
              <ProgressBar value={s.progress} color={s.color} />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="rounded-lg bg-slate-50 py-2">
                <PlayCircle className="h-3.5 w-3.5 mx-auto mb-1 text-slate-400" />
                <div className="text-[11px] font-bold text-slate-700">{s.lecturesDone}/{s.lectures}</div>
              </div>
              <div className="rounded-lg bg-slate-50 py-2">
                <FileText className="h-3.5 w-3.5 mx-auto mb-1 text-slate-400" />
                <div className="text-[11px] font-bold text-slate-700">{s.notes} notes</div>
              </div>
              <div className="rounded-lg bg-slate-50 py-2">
                <HelpCircle className="h-3.5 w-3.5 mx-auto mb-1 text-slate-400" />
                <div className="text-[11px] font-bold text-slate-700">{s.quizzes} quiz</div>
              </div>
            </div>

            {s.assignmentsDue > 0 && (
              <div className="flex items-center gap-1.5 mt-3 text-[11.5px] font-semibold" style={{ color: LMS_COLORS.warning }}>
                <ClipboardList className="h-3.5 w-3.5" /> {s.assignmentsDue} assignment{s.assignmentsDue > 1 ? "s" : ""} due
              </div>
            )}

            <button className="mt-4 w-full rounded-xl py-2.5 text-[12.5px] font-bold text-white transition hover:opacity-90" style={{ background: s.color }}>
              Continue Learning
            </button>
          </LmsCard>
        ))}
      </div>
    </LmsShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, LayoutGrid, List, PlayCircle, FileText, Presentation, Bookmark, Clock } from "lucide-react";
import { LmsShell } from "@/components/lms/LmsShell";
import { LmsCard, SectionHeading, ProgressBar, Pill } from "@/components/lms/LmsUI";
import { COURSES, LMS_COLORS, type Course } from "@/lib/lms-data";

export const Route = createFileRoute("/lms/my-learning")({
  head: () => ({ meta: [{ title: "My Learning — Athlete LMS" }] }),
  component: Page,
});

const TABS = ["All", "In Progress", "Completed", "Bookmarked"] as const;
const TYPE_ICON: Record<Course["type"], typeof PlayCircle> = { Video: PlayCircle, PDF: FileText, Slides: Presentation };
const BOOKMARKED_IDS = new Set(["c1", "c5"]);

function Page() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      if (query && !c.title.toLowerCase().includes(query.toLowerCase()) && !c.subject.toLowerCase().includes(query.toLowerCase())) return false;
      if (tab === "In Progress") return c.status === "in-progress";
      if (tab === "Completed") return c.status === "completed";
      if (tab === "Bookmarked") return BOOKMARKED_IDS.has(c.id);
      return true;
    });
  }, [tab, query]);

  const current = COURSES.filter((c) => c.status === "in-progress");
  const completed = COURSES.filter((c) => c.status === "completed");

  return (
    <LmsShell title="My Learning" subtitle="Your personalized courses, lessons and study materials">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Current Courses", value: current.length, color: LMS_COLORS.primary },
          { label: "Completed Courses", value: completed.length, color: LMS_COLORS.success },
          { label: "Bookmarked Lessons", value: BOOKMARKED_IDS.size, color: LMS_COLORS.accent },
          { label: "Total Learning Time", value: "18.5 hrs", color: LMS_COLORS.warning },
        ].map((s) => (
          <LmsCard key={s.label} className="p-4">
            <div className="text-xl font-extrabold text-slate-900">{s.value}</div>
            <div className="text-[11.5px] text-slate-400">{s.label}</div>
          </LmsCard>
        ))}
      </div>

      <LmsCard className="p-5 sm:p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-5">
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold whitespace-nowrap transition"
                style={tab === t ? { background: "#fff", color: LMS_COLORS.primary, boxShadow: "0 1px 2px rgba(15,23,42,0.08)" } : { color: "#64748B" }}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 w-full md:w-64">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses…" className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400" />
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 shrink-0">
            <button onClick={() => setView("grid")} className="p-1.5 rounded-lg" style={view === "grid" ? { background: "#fff", color: LMS_COLORS.primary } : { color: "#94A3B8" }} aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button onClick={() => setView("list")} className="p-1.5 rounded-lg" style={view === "list" ? { background: "#fff", color: LMS_COLORS.primary } : { color: "#94A3B8" }} aria-label="List view">
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📭</div>
            <div className="font-bold text-slate-700">No lessons found</div>
            <div className="text-sm text-slate-400 mt-1">Try a different search or filter.</div>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((c) => {
              const Icon = TYPE_ICON[c.type];
              return (
                <div key={c.id} className="rounded-2xl border p-4 hover:-translate-y-0.5 hover:shadow-md transition-all" style={{ borderColor: LMS_COLORS.border }}>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-2xl grid place-items-center text-2xl" style={{ background: LMS_COLORS.primarySoft }}>{c.thumbnail}</div>
                    {BOOKMARKED_IDS.has(c.id) && <Bookmark className="h-4 w-4 fill-current" style={{ color: LMS_COLORS.accent }} />}
                  </div>
                  <div className="text-[12px] text-slate-400 mt-3">{c.subject}</div>
                  <div className="font-bold text-slate-900 text-[14px] leading-snug mt-0.5 line-clamp-2">{c.title}</div>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400 mt-2">
                    <Icon className="h-3.5 w-3.5" /> {c.type} · {c.duration}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <ProgressBar value={c.progress} color={c.status === "completed" ? LMS_COLORS.success : LMS_COLORS.primary} height={6} />
                    <span className="text-[11px] font-semibold text-slate-500 shrink-0">{c.progress}%</span>
                  </div>
                  <button className="mt-4 w-full rounded-xl py-2 text-[12.5px] font-bold text-white transition hover:opacity-90" style={{ background: c.status === "completed" ? LMS_COLORS.success : LMS_COLORS.primary }}>
                    {c.status === "completed" ? "Review" : c.status === "not-started" ? "Start Lesson" : "Continue"}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((c) => {
              const Icon = TYPE_ICON[c.type];
              return (
                <div key={c.id} className="flex items-center gap-4 rounded-2xl border p-3.5" style={{ borderColor: LMS_COLORS.border }}>
                  <div className="h-11 w-11 rounded-xl grid place-items-center text-xl shrink-0" style={{ background: LMS_COLORS.primarySoft }}>{c.thumbnail}</div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-900 text-[13.5px] truncate">{c.title}</div>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400 mt-0.5">
                      <Icon className="h-3.5 w-3.5" /> {c.subject} · {c.duration}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 w-40 shrink-0">
                    <ProgressBar value={c.progress} color={c.status === "completed" ? LMS_COLORS.success : LMS_COLORS.primary} height={6} />
                    <span className="text-[11px] font-semibold text-slate-500 shrink-0">{c.progress}%</span>
                  </div>
                  {c.status === "completed" ? <Pill color={LMS_COLORS.success}>Completed</Pill> : c.status === "not-started" ? <Pill color="#94A3B8" bg="#F1F5F9"><Clock className="h-3 w-3" /> Pending</Pill> : <Pill color={LMS_COLORS.primary}>In Progress</Pill>}
                </div>
              );
            })}
          </div>
        )}
      </LmsCard>

      <div className="mt-6">
        <SectionHeading title="Estimated Completion" subtitle="Based on your current pace" />
        <LmsCard className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-slate-600">At your current pace of <span className="font-bold text-slate-900">50 min/day</span>, you'll complete your active syllabus by</div>
            <div className="text-xl font-extrabold mt-1" style={{ color: LMS_COLORS.primary }}>28 September 2026</div>
          </div>
          <ProgressBar value={68} />
        </LmsCard>
      </div>
    </LmsShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trophy, FileCheck2, ClipboardList, Dumbbell, Plane, BrainCircuit, MapPin, Sparkles } from "lucide-react";
import { LmsShell } from "@/components/lms/LmsShell";
import { LmsCard, SectionHeading, Pill, IconTile } from "@/components/lms/LmsUI";
import { CALENDAR_EVENTS, LMS_COLORS, type CalendarEvent } from "@/lib/lms-data";

export const Route = createFileRoute("/lms/calendar")({
  head: () => ({ meta: [{ title: "Competition Calendar — Athlete LMS" }] }),
  component: Page,
});

const TYPE_META: Record<CalendarEvent["type"], { icon: typeof Trophy; color: string; label: string }> = {
  competition: { icon: Trophy, color: LMS_COLORS.accent, label: "Competition" },
  exam: { icon: FileCheck2, color: LMS_COLORS.danger, label: "Exam" },
  assignment: { icon: ClipboardList, color: LMS_COLORS.warning, label: "Assignment" },
  training: { icon: Dumbbell, color: LMS_COLORS.success, label: "Training Camp" },
  travel: { icon: Plane, color: "#7C3AED", label: "Travel" },
  study: { icon: BrainCircuit, color: LMS_COLORS.primary, label: "AI Study Block" },
};

const VIEWS = ["Agenda", "Month", "Week"] as const;

function daysUntil(dateStr: string) {
  const diff = Math.ceil((new Date(dateStr).getTime() - new Date("2026-08-04").getTime()) / 86400000);
  return diff;
}

function Page() {
  const [view, setView] = useState<(typeof VIEWS)[number]>("Agenda");
  const nextComp = CALENDAR_EVENTS.find((e) => e.type === "competition");
  const sorted = [...CALENDAR_EVENTS].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <LmsShell title="Competition Calendar" subtitle="Your sports schedule and academics, in one place">
      {/* Countdown banner */}
      {nextComp && (
        <div className="rounded-[24px] p-6 sm:p-7 text-white relative overflow-hidden mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ background: `linear-gradient(120deg, ${LMS_COLORS.accent}, #EA580C)` }}>
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="relative">
            <Pill bg="rgba(255,255,255,0.2)" color="#fff"><Trophy className="h-3 w-3" /> Next Competition</Pill>
            <h2 className="text-xl sm:text-2xl font-extrabold mt-2">{nextComp.title}</h2>
            <div className="flex items-center gap-1.5 text-white/85 text-[13px] mt-1"><MapPin className="h-3.5 w-3.5" /> {nextComp.detail}</div>
          </div>
          <div className="relative text-center bg-white/15 rounded-2xl px-6 py-3 border border-white/25 shrink-0">
            <div className="text-3xl font-extrabold leading-none">{daysUntil(nextComp.date)}</div>
            <div className="text-[11px] text-white/80 mt-1">days to go</div>
          </div>
        </div>
      )}

      {/* AI suggestion */}
      <LmsCard className="p-5 mb-6 flex items-center gap-4" style={{ background: LMS_COLORS.primarySoft }}>
        <IconTile icon={<Sparkles className="h-5 w-5" />} color={LMS_COLORS.primary} />
        <div className="flex-1">
          <div className="font-bold text-slate-900 text-[13.5px]">AI Suggested Study Schedule</div>
          <div className="text-[12.5px] text-slate-500">Your study blocks have been auto-adjusted around the Nagpur travel days and training camp.</div>
        </div>
        <button className="shrink-0 rounded-xl px-4 py-2 text-[12.5px] font-bold text-white transition hover:opacity-90" style={{ background: LMS_COLORS.primary }}>Review Plan</button>
      </LmsCard>

      <div className="flex items-center justify-between mb-4">
        <SectionHeading title="Upcoming Schedule" subtitle="Competitions, exams, training & study — combined" />
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 mb-4 shrink-0">
          {VIEWS.map((v) => (
            <button key={v} onClick={() => setView(v)} className="px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold transition"
              style={view === v ? { background: "#fff", color: LMS_COLORS.primary, boxShadow: "0 1px 2px rgba(15,23,42,0.08)" } : { color: "#64748B" }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "Agenda" ? (
        <div className="space-y-3">
          {sorted.map((e) => {
            const meta = TYPE_META[e.type];
            const Icon = meta.icon;
            const d = new Date(e.date);
            return (
              <LmsCard key={e.id} className="p-4 sm:p-5 flex items-center gap-4">
                <div className="w-14 text-center shrink-0">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">{d.toLocaleDateString("en-IN", { month: "short" })}</div>
                  <div className="text-xl font-extrabold text-slate-900">{d.getDate()}</div>
                </div>
                <div className="h-10 w-px shrink-0" style={{ background: LMS_COLORS.border }} />
                <IconTile icon={<Icon className="h-4.5 w-4.5" />} color={meta.color} />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 text-[13.5px] truncate">{e.title}</div>
                  {e.detail && <div className="text-[11.5px] text-slate-400 mt-0.5">{e.detail}</div>}
                </div>
                <Pill color={meta.color}>{meta.label}</Pill>
              </LmsCard>
            );
          })}
        </div>
      ) : (
        <LmsCard className="p-10 text-center text-slate-400 text-sm">
          {view} view coming soon — use Agenda view for now to see your full combined schedule.
        </LmsCard>
      )}
    </LmsShell>
  );
}

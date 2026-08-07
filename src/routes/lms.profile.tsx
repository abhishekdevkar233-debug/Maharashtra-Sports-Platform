import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  School, GraduationCap, Medal, Users2, Building2, Trophy,
  Download, Bookmark, Globe, Bell, ShieldCheck,
} from "lucide-react";
import { LmsShell } from "@/components/lms/LmsShell";
import { LmsCard, SectionHeading, ProgressBar, Pill, IconTile } from "@/components/lms/LmsUI";
import { STUDENT, LMS_COLORS } from "@/lib/lms-data";

export const Route = createFileRoute("/lms/profile")({
  head: () => ({ meta: [{ title: "Profile — Athlete LMS" }] }),
  component: Page,
});

const TABS = ["Overview", "Achievements", "Settings"] as const;

const COMPETITION_HISTORY = [
  { event: "State Athletics Championship 2025", result: "Gold — 400m", date: "Mar 2025" },
  { event: "National Junior Athletics Meet", result: "Silver — 800m", date: "Nov 2025" },
  { event: "District Athletics Trials", result: "Gold — 400m & 800m", date: "Aug 2025" },
];

function Page() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");

  return (
    <LmsShell title="Profile" subtitle="Your academic and athletic identity, in one place">
      {/* Profile header */}
      <LmsCard className="p-6 sm:p-8 mb-6 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-24" style={{ background: `linear-gradient(120deg, ${LMS_COLORS.primary}, #7C3AED)` }} />
        <div className="relative flex flex-col sm:flex-row sm:items-end gap-5 pt-6">
          <div className="h-24 w-24 rounded-3xl grid place-items-center text-white text-2xl font-extrabold shrink-0 border-4 border-white shadow-lg" style={{ background: LMS_COLORS.accent }}>
            {STUDENT.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-extrabold text-slate-900">{STUDENT.name}</h2>
            <div className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500 mt-1">
              <School className="h-3.5 w-3.5" /> {STUDENT.school}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Pill color={LMS_COLORS.primary}>{STUDENT.course}</Pill>
            <Pill color={LMS_COLORS.success}>{STUDENT.level}</Pill>
          </div>
        </div>
      </LmsCard>

      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 mb-6 w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="px-4 py-1.5 rounded-lg text-[12.5px] font-semibold transition"
            style={tab === t ? { background: "#fff", color: LMS_COLORS.primary, boxShadow: "0 1px 2px rgba(15,23,42,0.08)" } : { color: "#64748B" }}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LmsCard className="p-5 sm:p-6">
              <SectionHeading title="Student Information" />
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: GraduationCap, label: "Course", value: STUDENT.course },
                  { icon: School, label: "Academic Year", value: STUDENT.year },
                  { icon: Medal, label: "Sport", value: STUDENT.sport },
                  { icon: Users2, label: "Coach", value: STUDENT.coach },
                  { icon: Building2, label: "Institute", value: STUDENT.institute },
                  { icon: Trophy, label: "Competition Level", value: STUDENT.level },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <IconTile icon={<f.icon className="h-4 w-4" />} color={LMS_COLORS.primary} />
                    <div className="min-w-0">
                      <div className="text-[11px] text-slate-400">{f.label}</div>
                      <div className="text-[13.5px] font-semibold text-slate-800 truncate">{f.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </LmsCard>

            <LmsCard className="p-5 sm:p-6">
              <SectionHeading title="Competition History" />
              <div className="space-y-3">
                {COMPETITION_HISTORY.map((c) => (
                  <div key={c.event} className="flex items-center gap-3 rounded-xl border p-3.5" style={{ borderColor: LMS_COLORS.border }}>
                    <IconTile icon={<Trophy className="h-4 w-4" />} color={LMS_COLORS.accent} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-slate-900 truncate">{c.event}</div>
                      <div className="text-[11.5px] text-slate-400">{c.date}</div>
                    </div>
                    <Pill color={LMS_COLORS.success}>{c.result}</Pill>
                  </div>
                ))}
              </div>
            </LmsCard>
          </div>

          <div className="space-y-6">
            <LmsCard className="p-5 sm:p-6">
              <SectionHeading title="Academic Progress" />
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <span className="text-slate-500">Overall completion</span>
                <span className="font-bold text-slate-800">{STUDENT.overallProgress}%</span>
              </div>
              <ProgressBar value={STUDENT.overallProgress} />
              <div className="grid grid-cols-2 gap-3 mt-5 text-center">
                <div className="rounded-xl bg-slate-50 py-3">
                  <div className="text-lg font-extrabold text-slate-900">96%</div>
                  <div className="text-[11px] text-slate-400">Attendance</div>
                </div>
                <div className="rounded-xl bg-slate-50 py-3">
                  <div className="text-lg font-extrabold text-slate-900">{STUDENT.streakDays}</div>
                  <div className="text-[11px] text-slate-400">Day Streak</div>
                </div>
              </div>
            </LmsCard>

            <LmsCard className="p-5 sm:p-6">
              <SectionHeading title="Learning Stats" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <IconTile icon={<Download className="h-4 w-4" />} color={LMS_COLORS.success} />
                  <div className="text-[13px] text-slate-700">5 items downloaded</div>
                </div>
                <div className="flex items-center gap-3">
                  <IconTile icon={<Bookmark className="h-4 w-4" />} color={LMS_COLORS.warning} />
                  <div className="text-[13px] text-slate-700">2 lessons bookmarked</div>
                </div>
              </div>
            </LmsCard>
          </div>
        </div>
      )}

      {tab === "Achievements" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STUDENT.achievements.map((a) => (
            <LmsCard key={a.id} className="p-5 text-center">
              <div className="text-4xl mb-2">{a.icon}</div>
              <div className="text-[12.5px] font-semibold text-slate-700 leading-snug">{a.label}</div>
            </LmsCard>
          ))}
        </div>
      )}

      {tab === "Settings" && (
        <LmsCard className="p-5 sm:p-6 max-w-xl">
          <SectionHeading title="Preferences" />
          <div className="space-y-4">
            {[
              { icon: Globe, label: "Language", value: "English" },
              { icon: Bell, label: "Notification Preferences", value: "Enabled" },
              { icon: ShieldCheck, label: "Security", value: "Password & 2FA" },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3 rounded-xl border p-3.5" style={{ borderColor: LMS_COLORS.border }}>
                <IconTile icon={<r.icon className="h-4 w-4" />} color={LMS_COLORS.primary} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-slate-800">{r.label}</div>
                  <div className="text-[11.5px] text-slate-400">{r.value}</div>
                </div>
                <button className="text-[12px] font-bold shrink-0" style={{ color: LMS_COLORS.primary }}>Manage</button>
              </div>
            ))}
          </div>
        </LmsCard>
      )}
    </LmsShell>
  );
}

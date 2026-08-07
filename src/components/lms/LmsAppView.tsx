import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  Home, BookOpen, Sparkles, CalendarDays, Grid3x3,
  Flame, Trophy, MapPin, PlayCircle, Send, Bell, Wifi,
  ChevronRight, ChevronLeft, LogOut, Award, CheckCircle2,
  ClipboardList, FileCheck2, Download, User, Clock3,
  Video, FileText, Presentation, RotateCcw,
} from "lucide-react";
import {
  STUDENT, SUBJECTS, COURSES, COMPETITION_MODE, AI_DAILY_PLAN,
  CALENDAR_EVENTS, ASSIGNMENTS, EXAMS, DOWNLOADS, LMS_COLORS,
} from "@/lib/lms-data";

type Tab = "home" | "learn" | "mentor" | "calendar" | "more";
type MoreScreenId = "menu" | "assignments" | "exams" | "downloads" | "profile";

const TABS: { id: Tab; icon: typeof Home; label: string }[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "learn", icon: BookOpen, label: "Learn" },
  { id: "mentor", icon: Sparkles, label: "Mentor" },
  { id: "calendar", icon: CalendarDays, label: "Calendar" },
  { id: "more", icon: Grid3x3, label: "More" },
];

function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-2xl bg-white border p-4 ${className}`} style={{ borderColor: LMS_COLORS.border, ...style }}>
      {children}
    </div>
  );
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

function SubHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="px-4 pt-5 pb-3 flex items-center gap-2 border-b" style={{ borderColor: LMS_COLORS.border }}>
      <button onClick={onBack} className="h-7 w-7 rounded-full grid place-items-center hover:bg-slate-100 shrink-0" aria-label="Back">
        <ChevronLeft className="h-4 w-4 text-slate-500" />
      </button>
      <div className="text-[15px] font-extrabold text-slate-900">{title}</div>
    </div>
  );
}

/* ── Home tab ─────────────────────────────────────────── */
function HomeScreen({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const continueCourse = COURSES.find((c) => c.status === "in-progress")!;
  return (
    <div className="flex-1 overflow-y-auto lms-app-noscroll bg-[#FAFAFC] pb-4" style={{ scrollbarWidth: "none" }}>
      <div className="px-4 pt-5 pb-1 flex items-center justify-between">
        <div>
          <div className="text-[11px] text-slate-400">Welcome back</div>
          <div className="text-[17px] font-extrabold text-slate-900 leading-tight">{STUDENT.name.split(" ")[0]}</div>
        </div>
        <button className="relative h-9 w-9 rounded-full bg-white border grid place-items-center" style={{ borderColor: LMS_COLORS.border }}>
          <Bell className="h-4 w-4 text-slate-500" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full" style={{ background: LMS_COLORS.accent }} />
        </button>
      </div>

      <div className="px-4 mt-3">
        <div className="rounded-2xl p-4 text-white relative overflow-hidden" style={{ background: `linear-gradient(120deg, ${LMS_COLORS.primary}, ${LMS_COLORS.teal})` }}>
          <div className="flex items-center gap-1.5 text-[10px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-white" /> COMPETITION MODE ACTIVE
          </div>
          <div className="text-[13.5px] font-bold mt-1.5 leading-snug">{COMPETITION_MODE.eventName}</div>
          <div className="flex items-center gap-1.5 text-[10.5px] text-white/80 mt-1">
            <MapPin className="h-3 w-3" /> {COMPETITION_MODE.location}
          </div>
          <div className="flex gap-2 mt-3">
            <div className="rounded-lg bg-white/15 px-3 py-1.5 text-center flex-1">
              <div className="text-[13px] font-extrabold leading-none">{COMPETITION_MODE.lessonsRemaining}</div>
              <div className="text-[8.5px] text-white/75 mt-1">Lessons Left</div>
            </div>
            <div className="rounded-lg bg-white/15 px-3 py-1.5 text-center flex-1">
              <div className="text-[13px] font-extrabold leading-none">{COMPETITION_MODE.estimatedStudyTime}</div>
              <div className="text-[8.5px] text-white/75 mt-1">Study Time</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
        <Card className="flex items-center gap-2 p-3">
          <Flame className="h-4 w-4" style={{ color: LMS_COLORS.accent }} />
          <div>
            <div className="text-[12.5px] font-extrabold text-slate-900 leading-none">{STUDENT.streakDays}d streak</div>
            <div className="text-[9.5px] text-slate-400 mt-0.5">Best {STUDENT.streakBest}d</div>
          </div>
        </Card>
        <Card className="flex items-center gap-2 p-3">
          <Trophy className="h-4 w-4" style={{ color: LMS_COLORS.teal }} />
          <div>
            <div className="text-[12.5px] font-extrabold text-slate-900 leading-none">{STUDENT.overallProgress}%</div>
            <div className="text-[9.5px] text-slate-400 mt-0.5">Progress</div>
          </div>
        </Card>
      </div>

      <div className="px-4 mt-4">
        <div className="text-[10.5px] font-bold tracking-wider text-slate-400 mb-2">CONTINUE LEARNING</div>
        <Card className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center text-lg shrink-0" style={{ background: LMS_COLORS.primarySoft }}>{continueCourse.thumbnail}</div>
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-bold text-slate-900 truncate">{continueCourse.title}</div>
            <Bar value={continueCourse.progress} color={LMS_COLORS.primary} />
          </div>
          <button onClick={() => onNavigate("learn")} className="shrink-0 h-8 w-8 rounded-full grid place-items-center text-white" style={{ background: LMS_COLORS.primary }}>
            <PlayCircle className="h-4 w-4" />
          </button>
        </Card>
      </div>

      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10.5px] font-bold tracking-wider text-slate-400">TODAY'S AI PLAN</div>
          <button onClick={() => onNavigate("mentor")}><Sparkles className="h-3.5 w-3.5" style={{ color: LMS_COLORS.primary }} /></button>
        </div>
        <div className="space-y-2">
          {AI_DAILY_PLAN.map((p) => (
            <Card key={p.slot} className="flex items-center justify-between p-3">
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase">{p.slot}</div>
                <div className="text-[12px] font-semibold text-slate-800">{p.title}</div>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Learn tab ────────────────────────────────────────── */
function LearnScreen() {
  return (
    <div className="flex-1 overflow-y-auto lms-app-noscroll bg-[#FAFAFC] pb-4" style={{ scrollbarWidth: "none" }}>
      <div className="px-4 pt-5 pb-2">
        <div className="text-[17px] font-extrabold text-slate-900">My Learning</div>
      </div>
      <div className="px-4">
        <div className="text-[10.5px] font-bold tracking-wider text-slate-400 mb-2">SUBJECTS</div>
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {SUBJECTS.slice(0, 4).map((s) => (
            <Card key={s.id} className="p-3">
              <div className="h-8 w-8 rounded-lg grid place-items-center text-base" style={{ background: `${s.color}18` }}>{s.emoji}</div>
              <div className="text-[12px] font-bold text-slate-800 mt-2 truncate">{s.name}</div>
              <div className="text-[10px] text-slate-400 mb-1.5">{s.progress}%</div>
              <Bar value={s.progress} color={s.color} />
            </Card>
          ))}
        </div>

        <div className="text-[10.5px] font-bold tracking-wider text-slate-400 mb-2">CONTINUE</div>
        <div className="space-y-2.5">
          {COURSES.filter((c) => c.status !== "not-started").map((c) => (
            <Card key={c.id} className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl grid place-items-center text-base shrink-0" style={{ background: LMS_COLORS.primarySoft }}>{c.thumbnail}</div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-semibold text-slate-900 truncate">{c.title}</div>
                <Bar value={c.progress} color={c.status === "completed" ? LMS_COLORS.teal : LMS_COLORS.primary} />
              </div>
              <span className="text-[10.5px] font-bold text-slate-400 shrink-0">{c.progress}%</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mentor tab ───────────────────────────────────────── */
type Msg = { id: number; from: "ai" | "me"; text: string };
const INITIAL_MSGS: Msg[] = [
  { id: 1, from: "ai", text: `Hi ${STUDENT.name.split(" ")[0]}! Want a quick revision plan before your next competition?` },
];

function MentorScreen() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MSGS);
  const [input, setInput] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: "me", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, from: "ai", text: "Got it — I'll schedule a 30 min focused block around your training today." }]);
    }, 700);
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FAFAFC]">
      <div className="px-4 pt-5 pb-3 flex items-center gap-2 border-b" style={{ borderColor: LMS_COLORS.border }}>
        <div className="h-8 w-8 rounded-xl grid place-items-center text-white" style={{ background: `linear-gradient(135deg, ${LMS_COLORS.primary}, ${LMS_COLORS.teal})` }}>
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="text-[13.5px] font-extrabold text-slate-900">MOA Mitra</div>
      </div>
      <div className="flex-1 overflow-y-auto lms-app-noscroll px-4 py-3 space-y-2.5" style={{ scrollbarWidth: "none" }}>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[80%] rounded-2xl px-3 py-2 text-[11.5px] leading-relaxed"
              style={m.from === "me" ? { background: LMS_COLORS.primary, color: "#fff" } : { background: "#F1F5F9", color: "#1E293B" }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-2 px-3 py-3 border-t" style={{ borderColor: LMS_COLORS.border }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask MOA Mitra…" className="flex-1 rounded-full bg-slate-100 px-3.5 py-2 text-[11.5px] outline-none" />
        <button type="submit" className="h-8 w-8 rounded-full grid place-items-center text-white shrink-0" style={{ background: LMS_COLORS.primary }}>
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}

/* ── Calendar tab ─────────────────────────────────────── */
function CalendarScreen() {
  const sorted = [...CALENDAR_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className="flex-1 overflow-y-auto lms-app-noscroll bg-[#FAFAFC] pb-4" style={{ scrollbarWidth: "none" }}>
      <div className="px-4 pt-5 pb-2">
        <div className="text-[17px] font-extrabold text-slate-900">Calendar</div>
      </div>
      <div className="px-4 space-y-2.5">
        {sorted.map((e) => {
          const d = new Date(e.date);
          return (
            <Card key={e.id} className="flex items-center gap-3">
              <div className="w-9 text-center shrink-0">
                <div className="text-[8.5px] font-bold text-slate-400 uppercase">{d.toLocaleDateString("en-IN", { month: "short" })}</div>
                <div className="text-[15px] font-extrabold text-slate-900">{d.getDate()}</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-semibold text-slate-900 truncate">{e.title}</div>
                {e.detail && <div className="text-[10px] text-slate-400 truncate">{e.detail}</div>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ── More menu ────────────────────────────────────────── */
const MORE_ITEMS: { id: MoreScreenId; icon: typeof ClipboardList; label: string; color: string; count?: number }[] = [
  { id: "assignments", icon: ClipboardList, label: "Assignments", color: LMS_COLORS.warning, count: ASSIGNMENTS.filter((a) => a.status === "pending").length },
  { id: "exams", icon: FileCheck2, label: "Exams", color: LMS_COLORS.danger, count: EXAMS.length },
  { id: "downloads", icon: Download, label: "Downloads", color: LMS_COLORS.teal, count: DOWNLOADS.length },
  { id: "profile", icon: User, label: "Profile", color: LMS_COLORS.primary },
];

function MoreMenuScreen({ onOpen }: { onOpen: (id: MoreScreenId) => void }) {
  return (
    <div className="flex-1 overflow-y-auto lms-app-noscroll bg-[#FAFAFC] pb-4" style={{ scrollbarWidth: "none" }}>
      <div className="px-4 pt-5 pb-2">
        <div className="text-[17px] font-extrabold text-slate-900">More</div>
      </div>
      <div className="px-4 grid grid-cols-2 gap-2.5">
        {MORE_ITEMS.map((it) => (
          <button key={it.id} onClick={() => onOpen(it.id)} className="text-left">
            <Card className="p-3.5 relative">
              <div className="h-9 w-9 rounded-xl grid place-items-center" style={{ background: `${it.color}18`, color: it.color }}>
                <it.icon className="h-4 w-4" />
              </div>
              <div className="text-[12.5px] font-bold text-slate-800 mt-2.5">{it.label}</div>
              {it.count !== undefined && <div className="text-[10px] text-slate-400 mt-0.5">{it.count} items</div>}
              <ChevronRight className="h-3.5 w-3.5 text-slate-300 absolute top-3.5 right-3.5" />
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Assignments ──────────────────────────────────────── */
function AssignmentsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#FAFAFC]">
      <SubHeader title="Assignments" onBack={onBack} />
      <div className="flex-1 overflow-y-auto lms-app-noscroll px-4 py-3 space-y-2.5" style={{ scrollbarWidth: "none" }}>
        {ASSIGNMENTS.map((a) => (
          <Card key={a.id} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg grid place-items-center shrink-0" style={{ background: a.status === "submitted" ? LMS_COLORS.tealSoft : LMS_COLORS.warningSoft, color: a.status === "submitted" ? LMS_COLORS.teal : LMS_COLORS.warning }}>
              {a.status === "submitted" ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-semibold text-slate-900 truncate">{a.title}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{a.subject} · Due {a.due}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ── Exams ────────────────────────────────────────────── */
function readinessColor(v: number) {
  if (v >= 75) return LMS_COLORS.teal;
  if (v >= 50) return LMS_COLORS.warning;
  return LMS_COLORS.danger;
}

function ExamsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#FAFAFC]">
      <SubHeader title="Exams" onBack={onBack} />
      <div className="flex-1 overflow-y-auto lms-app-noscroll px-4 py-3 space-y-2.5" style={{ scrollbarWidth: "none" }}>
        {EXAMS.map((x) => (
          <Card key={x.id}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[12.5px] font-bold text-slate-900">{x.subject}</div>
              <div className="text-[10px] font-bold" style={{ color: readinessColor(x.readiness) }}>{x.readiness}%</div>
            </div>
            <Bar value={x.readiness} color={readinessColor(x.readiness)} />
            <div className="text-[10px] text-slate-400 mt-1.5">{x.date} · {x.time} · {x.syllabus}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ── Downloads ────────────────────────────────────────── */
const DL_ICON: Record<string, typeof Video> = { Video: Video, PDF: FileText, Slides: Presentation, Assignment: ClipboardList };

function DownloadsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#FAFAFC]">
      <SubHeader title="Downloads" onBack={onBack} />
      <div className="flex-1 overflow-y-auto lms-app-noscroll px-4 py-3 space-y-2.5" style={{ scrollbarWidth: "none" }}>
        {DOWNLOADS.map((d) => {
          const Icon = DL_ICON[d.type] ?? FileText;
          return (
            <Card key={d.id} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg grid place-items-center shrink-0" style={{ background: LMS_COLORS.primarySoft, color: LMS_COLORS.primary }}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11.5px] font-semibold text-slate-900 truncate">{d.title}</div>
                <div className="text-[9.5px] text-slate-400 mt-0.5">{d.size} · {d.subject}</div>
              </div>
              <RotateCcw className="h-3.5 w-3.5 text-slate-300 shrink-0" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ── Profile ──────────────────────────────────────────── */
function ProfileScreen({ onBack, onExitApp }: { onBack: () => void; onExitApp: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#FAFAFC] overflow-hidden">
      <SubHeader title="Profile" onBack={onBack} />
      <div className="flex-1 overflow-y-auto lms-app-noscroll pb-4" style={{ scrollbarWidth: "none" }}>
        <div className="px-4 pt-4 pb-3 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full grid place-items-center text-white text-lg font-extrabold" style={{ background: LMS_COLORS.accent }}>
            {STUDENT.initials}
          </div>
          <div className="text-[14.5px] font-extrabold text-slate-900 mt-2.5">{STUDENT.name}</div>
          <div className="text-[11px] text-slate-400">{STUDENT.course}</div>
        </div>

        <div className="px-4 grid grid-cols-2 gap-2.5">
          <Card className="text-center p-3">
            <div className="text-[15px] font-extrabold" style={{ color: LMS_COLORS.primary }}>{STUDENT.attendance}%</div>
            <div className="text-[9.5px] text-slate-400">Attendance</div>
          </Card>
          <Card className="text-center p-3">
            <div className="text-[15px] font-extrabold" style={{ color: LMS_COLORS.teal }}>{STUDENT.overallProgress}%</div>
            <div className="text-[9.5px] text-slate-400">Progress</div>
          </Card>
        </div>

        <div className="px-4 mt-4">
          <div className="text-[10.5px] font-bold tracking-wider text-slate-400 mb-2">ACHIEVEMENTS</div>
          <div className="grid grid-cols-2 gap-2.5">
            {STUDENT.achievements.map((a) => (
              <Card key={a.id} className="text-center p-3">
                <div className="text-xl">{a.icon}</div>
                <div className="text-[10px] font-semibold text-slate-600 mt-1 leading-tight">{a.label}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="px-4 mt-4">
          <Link to="/lms/profile" className="w-full rounded-xl border py-2.5 text-[12px] font-bold text-slate-700 flex items-center justify-center gap-1.5" style={{ borderColor: LMS_COLORS.border }}>
            <Award className="h-3.5 w-3.5" /> View Full Profile
          </Link>
          <button onClick={onExitApp} className="w-full mt-2.5 rounded-xl py-2.5 text-[12px] font-bold text-white flex items-center justify-center gap-1.5" style={{ background: LMS_COLORS.danger }}>
            <LogOut className="h-3.5 w-3.5" /> Exit App View
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Phone frame ──────────────────────────────────────── */
export function LmsAppView() {
  const [tab, setTab] = useState<Tab>("home");
  const [moreScreen, setMoreScreen] = useState<MoreScreenId>("menu");

  function goTab(t: Tab) {
    setTab(t);
    if (t !== "more") setMoreScreen("menu");
  }

  function renderScreen() {
    if (tab === "more") {
      switch (moreScreen) {
        case "assignments": return <AssignmentsScreen onBack={() => setMoreScreen("menu")} />;
        case "exams": return <ExamsScreen onBack={() => setMoreScreen("menu")} />;
        case "downloads": return <DownloadsScreen onBack={() => setMoreScreen("menu")} />;
        case "profile": return <ProfileScreen onBack={() => setMoreScreen("menu")} onExitApp={() => goTab("home")} />;
        default: return <MoreMenuScreen onOpen={setMoreScreen} />;
      }
    }
    switch (tab) {
      case "learn": return <LearnScreen />;
      case "mentor": return <MentorScreen />;
      case "calendar": return <CalendarScreen />;
      default: return <HomeScreen onNavigate={goTab} />;
    }
  }

  return (
    <div className="flex flex-col items-center py-4">
      <style>{`.lms-app-noscroll::-webkit-scrollbar{display:none}`}</style>
      <div className="relative rounded-[44px] shadow-2xl overflow-hidden" style={{ width: 300, height: 640, background: "#111827", border: "10px solid #111827" }}>
        <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-white flex flex-col">
          <div className="h-8 shrink-0 flex items-center justify-between px-5 text-[10px] font-bold text-gray-900 z-10 bg-white">
            <span>9:41</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 h-4 w-20 rounded-full bg-black" />
            <div className="flex items-center gap-1">
              <Wifi className="h-3 w-3" />
              <span>5G</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {renderScreen()}
          </div>

          <div className="h-14 shrink-0 bg-white border-t flex items-center px-1" style={{ borderColor: LMS_COLORS.border }}>
            {TABS.map((t) => (
              <button key={t.id} onClick={() => goTab(t.id)} className="flex-1 flex flex-col items-center gap-0.5 py-1.5 transition">
                <t.icon className="h-[18px] w-[18px]" style={{ color: tab === t.id ? LMS_COLORS.primary : "#9CA3AF", strokeWidth: tab === t.id ? 2.4 : 1.8 }} />
                <span className="text-[9px] font-bold" style={{ color: tab === t.id ? LMS_COLORS.primary : "#9CA3AF" }}>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="h-4 shrink-0 bg-white flex items-center justify-center">
            <div className="h-1 w-16 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
        <CheckCircle2 className="h-3.5 w-3.5" style={{ color: LMS_COLORS.teal }} /> Live mobile preview of the Athlete Learning Hub
      </div>
    </div>
  );
}

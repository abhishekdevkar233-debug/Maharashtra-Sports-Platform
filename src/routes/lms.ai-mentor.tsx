import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Sparkles, Send, FileText, ListChecks, CalendarClock, Layers3,
  Languages, BrainCircuit, Target, Sun,
} from "lucide-react";
import { LmsShell } from "@/components/lms/LmsShell";
import { LmsCard, IconTile } from "@/components/lms/LmsUI";
import { LMS_COLORS, STUDENT } from "@/lib/lms-data";

export const Route = createFileRoute("/lms/ai-mentor")({
  head: () => ({ meta: [{ title: "AI Mentor — Athlete LMS" }] }),
  component: Page,
});

type Msg = { id: number; from: "ai" | "me"; text: string };

const TOOLS = [
  { icon: FileText, label: "Chapter Summary", color: LMS_COLORS.primary },
  { icon: ListChecks, label: "Practice MCQs", color: LMS_COLORS.success },
  { icon: CalendarClock, label: "Study Planner", color: LMS_COLORS.warning },
  { icon: Layers3, label: "Flashcards", color: LMS_COLORS.accent },
  { icon: Languages, label: "Translate EN ↔ MR", color: "#7C3AED" },
  { icon: BrainCircuit, label: "Explain Simply", color: "#DC2626" },
];

const SUGGESTIONS = [
  "Summarise Chapter 4 — Newton's Laws",
  "Create 5 MCQs on Quadratic Equations",
  "Plan my revision before the Aug 18 exam",
  "मराठीत निबंध कसा लिहायचा ते समजावा",
];

const INITIAL: Msg[] = [
  { id: 1, from: "ai", text: `Hi ${STUDENT.name.split(" ")[0]}! 👋 I'm your AI Mentor. I know you have State Athletics Trials coming up on Aug 6 — want me to build a study plan that works around your training schedule?` },
];

function Page() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Msg = { id: Date.now(), from: "me", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, {
        id: Date.now() + 1,
        from: "ai",
        text: "Here's a quick plan: 30 min Mathematics revision (weak topic: Quadratic Equations), 20 min Science reading, and a 10-min flashcard review — scheduled around your evening training. Want me to add this to your Competition Calendar?",
      }]);
      setTyping(false);
    }, 900);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <LmsShell title="AI Mentor" subtitle="Your academic assistant — built for student-athletes">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Chat panel */}
        <LmsCard className="flex flex-col h-[calc(100vh-180px)] min-h-[500px]">
          <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: LMS_COLORS.border }}>
            <div className="h-10 w-10 rounded-2xl grid place-items-center text-white" style={{ background: `linear-gradient(135deg, ${LMS_COLORS.primary}, #7C3AED)` }}>
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-[14px]">AI Mentor</div>
              <div className="text-[11.5px] text-slate-400 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online · Competition-aware</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                {m.from === "ai" && (
                  <div className="h-8 w-8 rounded-full grid place-items-center text-white text-xs mr-2 shrink-0" style={{ background: LMS_COLORS.primary }}>
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
                <div
                  className="max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed"
                  style={m.from === "me"
                    ? { background: LMS_COLORS.primary, color: "#fff", borderBottomRightRadius: 6 }
                    : { background: "#F1F5F9", color: "#1E293B", borderBottomLeftRadius: 6 }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="h-8 w-8 rounded-full grid place-items-center text-white mr-2" style={{ background: LMS_COLORS.primary }}>
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-slate-100 flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${i * 120}ms` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="px-5 pb-3 flex gap-2 overflow-x-auto">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} className="shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition" style={{ borderColor: LMS_COLORS.border }}>
                {s}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 px-5 py-4 border-t" style={{ borderColor: LMS_COLORS.border }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your syllabus…"
              className="flex-1 rounded-xl bg-slate-100 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400"
            />
            <button type="submit" className="h-10 w-10 rounded-xl grid place-items-center text-white shrink-0 transition hover:opacity-90" style={{ background: LMS_COLORS.primary }} aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </LmsCard>

        {/* Tools sidebar */}
        <div className="space-y-6">
          <LmsCard className="p-5">
            <div className="font-bold text-slate-900 text-[14px] mb-3">Mentor Tools</div>
            <div className="grid grid-cols-2 gap-2.5">
              {TOOLS.map((t) => (
                <button key={t.label} onClick={() => send(t.label)} className="rounded-xl border p-3 text-left hover:bg-slate-50 transition" style={{ borderColor: LMS_COLORS.border }}>
                  <IconTile icon={<t.icon className="h-4 w-4" />} color={t.color} />
                  <div className="text-[11.5px] font-semibold text-slate-700 mt-2 leading-tight">{t.label}</div>
                </button>
              ))}
            </div>
          </LmsCard>

          <LmsCard className="p-5" style={{ background: `linear-gradient(160deg, ${LMS_COLORS.successSoft}, #fff)` }}>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4" style={{ color: LMS_COLORS.success }} />
              <div className="font-bold text-slate-900 text-[13.5px]">Weak Topic Detected</div>
            </div>
            <p className="text-[12.5px] text-slate-600 leading-relaxed">Quadratic Equations in Mathematics needs attention — your last 2 quiz attempts scored below 60%.</p>
            <button onClick={() => send("Help me revise Quadratic Equations")} className="mt-3 text-[12.5px] font-bold" style={{ color: LMS_COLORS.success }}>Start Revision →</button>
          </LmsCard>

          <LmsCard className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="h-4 w-4" style={{ color: LMS_COLORS.accent }} />
              <div className="font-bold text-slate-900 text-[13.5px]">Daily Motivation</div>
            </div>
            <p className="text-[12.5px] text-slate-600 leading-relaxed italic">"Champions train their body on the field and their mind in the classroom — you're doing both."</p>
          </LmsCard>
        </div>
      </div>
    </LmsShell>
  );
}

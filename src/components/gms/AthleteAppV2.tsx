import { useState } from "react";
import {
  Home, Dumbbell, Watch as WatchIcon, Utensils, User, ArrowLeft,
  Bell, ChevronRight, Flame, Footprints, HeartPulse, Moon,
  Activity, Battery, CheckCircle2, FileText,
  Globe, LogOut, Sparkles, Send, Droplet, TrendingUp, Wifi,
} from "lucide-react";
import {
  ATHLETES, getWatchData, getTrainingRecovery, getSleepRecovery,
  getRecommendation, getAlerts, getSchedule, generateAiFoodTip,
  MH_BLUE, EMERALD, SAFFRON, RED, GRAY_BG,
  type Athlete,
} from "@/components/gms/CoachPortal";
import {
  FACILITIES, generateSlots, SLOT_COLOR, FACILITY_STATUS_COLOR, nextBookingId, generateQrToken,
  type Facility, type Slot, type Booking, type Purpose,
} from "@/components/gms/facilityBookingData";
import { CalendarDays, MapPin, Clock3, QrCode, X as CloseIcon } from "lucide-react";

// The app is scoped to a single signed-in athlete. In a real build this
// would come from auth; here it's the same record the Coach Portal uses,
// so every screen reflects the exact data the coach sees.
const ME: Athlete = ATHLETES[0];

type Tab = "home" | "training" | "watch" | "nutrition" | "profile";

const NAV_TABS: { id: Tab; icon: typeof Home; label: string }[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "training", icon: Dumbbell, label: "Training" },
  { id: "watch", icon: WatchIcon, label: "Watch" },
  { id: "nutrition", icon: Utensils, label: "Nutrition" },
  { id: "profile", icon: User, label: "Profile" },
];

/* ── Shared bits ─────────────────────────────────────────────────── */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2 px-0.5">{children}</div>;
}

function Ring({ pct, color, size = 64, thickness = 6 }: { pct: number; color: string; size?: number; thickness?: number }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90" style={{ width: size, height: size }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F1F4" strokeWidth={thickness} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c - (Math.min(pct, 100) / 100) * c} />
    </svg>
  );
}

/* ── Home ─────────────────────────────────────────────────────────── */

/** Three concentric rings — Samsung Health "Activity" style hero. */
function MultiRing({ rings, size = 132 }: { rings: { pct: number; color: string }[]; size?: number }) {
  const thickness = 9;
  const gap = 3;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90" style={{ width: size, height: size }}>
      {rings.map((ring, i) => {
        const r = size / 2 - thickness / 2 - i * (thickness + gap);
        const c = 2 * Math.PI * r;
        return (
          <g key={i}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F1F4" strokeWidth={thickness} />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={ring.color} strokeWidth={thickness} strokeLinecap="round"
              strokeDasharray={c} strokeDashoffset={c - (Math.min(ring.pct, 100) / 100) * c}
              style={{ transition: "stroke-dashoffset 0.4s ease" }} />
          </g>
        );
      })}
    </svg>
  );
}

const HERO_METRICS = ["steps", "calories", "readiness"] as const;
type HeroMetric = typeof HERO_METRICS[number];

function HomeScreen({ onNavigate, onOpenBooking }: { onNavigate: (t: Tab) => void; onOpenBooking: () => void }) {
  const rec = getRecommendation(ME.readiness);
  const watch = getWatchData(ME);
  const training = getTrainingRecovery(ME);
  const sleep = getSleepRecovery(ME);
  const schedule = getSchedule(ME);
  const alerts = getAlerts(ME);
  const steps = parseInt(watch.steps.replace(/,/g, ""), 10);
  const calories = parseInt(watch.calories, 10);
  const stepsGoal = 10000;
  const caloriesGoal = 2800;

  const [focus, setFocus] = useState<HeroMetric>("readiness");
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const trend = [
    { d: "M", v: Math.max(45, ME.readiness - 14) }, { d: "T", v: Math.max(45, ME.readiness - 9) },
    { d: "W", v: Math.max(45, ME.readiness - 11) }, { d: "T", v: Math.max(45, ME.readiness - 4) },
    { d: "F", v: Math.max(45, ME.readiness - 6) }, { d: "S", v: Math.max(45, ME.readiness - 1) },
    { d: "S", v: ME.readiness },
  ];

  const heroCopy: Record<HeroMetric, { value: string; label: string; color: string }> = {
    steps: { value: watch.steps, label: "steps today", color: MH_BLUE },
    calories: { value: watch.calories, label: "calories burned", color: SAFFRON },
    readiness: { value: `${ME.readiness}`, label: "AI readiness", color: EMERALD },
  };

  return (
    <div className="flex-1 overflow-y-auto aav2-noscroll bg-[#FAFAFB] pb-4" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <div>
          <div className="text-gray-400 text-[12px]">Good morning</div>
          <div className="text-gray-900 font-bold text-[19px] leading-tight">{ME.nameEn.split(" ")[0]}</div>
        </div>
        <button className="relative h-10 w-10 rounded-full bg-white border border-gray-100 grid place-items-center">
          <Bell className="h-4.5 w-4.5 text-gray-500" />
          {alerts.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full text-white text-[9px] font-bold grid place-items-center" style={{ background: RED }}>{alerts.length}</span>
          )}
        </button>
      </div>

      {/* Hero: tap to cycle Steps / Calories / Readiness, Samsung Health style */}
      <div className="px-5 mt-3">
        <Card className="flex flex-col items-center py-5">
          <button onClick={() => setFocus(HERO_METRICS[(HERO_METRICS.indexOf(focus) + 1) % HERO_METRICS.length])} className="relative" style={{ width: 132, height: 132 }}>
            <MultiRing
              size={132}
              rings={[
                { pct: (steps / stepsGoal) * 100, color: MH_BLUE },
                { pct: (calories / caloriesGoal) * 100, color: SAFFRON },
                { pct: ME.readiness, color: EMERALD },
              ]}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 leading-none">{heroCopy[focus].value}</div>
                <div className="text-[10px] text-gray-400 mt-1">{heroCopy[focus].label}</div>
              </div>
            </div>
          </button>
          <span className="inline-flex items-center gap-1 text-[12px] font-bold px-3 py-1 rounded-full mt-4" style={{ color: rec.color, background: rec.bg }}>
            <CheckCircle2 className="h-3 w-3" /> {rec.label} today
          </span>
          <div className="flex items-center gap-4 mt-3">
            {[{ k: "steps" as const, c: MH_BLUE, l: "Steps" }, { k: "calories" as const, c: SAFFRON, l: "Cal" }, { k: "readiness" as const, c: EMERALD, l: "Ready" }].map(m => (
              <button key={m.k} onClick={() => setFocus(m.k)} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: m.c, opacity: focus === m.k ? 1 : 0.35 }} />
                <span className="text-[10px] font-semibold" style={{ color: focus === m.k ? "#111827" : "#9CA3AF" }}>{m.l}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick stat chips — horizontal scroll, tap to expand */}
      <div className="mt-4 pl-5">
        <div className="flex gap-2.5 overflow-x-auto aav2-noscroll pr-5 pb-1" style={{ scrollbarWidth: "none" }}>
          {[
            { icon: HeartPulse, label: "Heart rate", value: watch.heartRate, detail: `Resting ${watch.restingHr}`, color: RED },
            { icon: Sparkles, label: "SpO2", value: watch.spo2, detail: "Blood oxygen", color: MH_BLUE },
            { icon: Moon, label: "Sleep", value: sleep.duration, detail: `Score ${sleep.sleepScore}/100`, color: "#7C3AED" },
            { icon: Activity, label: "Stress", value: watch.stress, detail: "Live from watch", color: SAFFRON },
          ].map((chip, i) => (
            <button
              key={chip.label}
              onClick={() => setActiveDay(prev => (prev === -100 - i ? null : -100 - i))}
              className="shrink-0 rounded-2xl bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] px-3.5 py-3 text-left transition-transform active:scale-95"
              style={{ width: 118 }}
            >
              <chip.icon className="h-4 w-4 mb-2" style={{ color: chip.color }} />
              <div className="text-[13px] font-bold text-gray-900 leading-none">{chip.value}</div>
              <div className="text-[9.5px] text-gray-400 mt-1">{activeDay === -100 - i ? chip.detail : chip.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly readiness trend — tap a bar to see the value */}
      <div className="px-5 mt-5">
        <SectionLabel>This week</SectionLabel>
        <Card>
          <div className="flex items-end justify-between gap-2" style={{ height: 76 }}>
            {trend.map((day, i) => (
              <button key={i} onClick={() => setActiveDay(i)} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                {activeDay === i && <span className="text-[9px] font-bold text-gray-900">{day.v}</span>}
                <div className="w-full rounded-full transition-all" style={{ height: `${day.v}%`, background: i === 6 ? MH_BLUE : "#E5E9FB", minHeight: 6 }} />
                <span className="text-[9px] font-semibold" style={{ color: i === 6 ? MH_BLUE : "#9CA3AF" }}>{day.d}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Today's training — tap to open Training tab */}
      <div className="px-5 mt-5">
        <SectionLabel>Today's training</SectionLabel>
        <button onClick={() => onNavigate("training")} className="w-full text-left">
          <Card className="flex items-center justify-between active:scale-[0.98] transition-transform">
            <div>
              <div className="text-[14px] font-bold text-gray-900">{training.session}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{schedule.nextSession.time} &middot; {training.sessionDuration}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: MH_BLUE, background: "#EFF6FF" }}>{training.load}% load</span>
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </div>
          </Card>
        </button>
      </div>

      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        <button onClick={() => onNavigate("watch")} className="text-left active:scale-[0.98] transition-transform">
          <Card>
            <div className="flex items-center gap-1.5 mb-1">
              <Wifi className="h-3.5 w-3.5" style={{ color: ME.online ? EMERALD : "#9CA3AF" }} />
              <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Recovery</div>
            </div>
            <div className="text-[14px] font-bold text-gray-900">{training.recoveryStatus}</div>
          </Card>
        </button>
        <Card>
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Next competition</div>
          <div className="text-[12px] font-bold text-gray-900 leading-snug line-clamp-2">{schedule.nextCompetition.name}</div>
        </Card>
      </div>

      <div className="px-5 mt-4">
        <button onClick={onOpenBooking} className="w-full text-left active:scale-[0.98] transition-transform">
          <Card className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: "#EFF6FF" }}>
              <QrCode className="h-4.5 w-4.5" style={{ color: MH_BLUE }} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-bold text-gray-900">Book a Facility</div>
              <div className="text-[11px] text-gray-400">Stadium, pool, ground & more — QR entry pass</div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300" />
          </Card>
        </button>
      </div>

      <div className="px-5 mt-5">
        <SectionLabel>Message from Coach Sanjay Kadam</SectionLabel>
        <Card className="flex gap-3">
          <div className="h-8 w-8 rounded-full grid place-items-center shrink-0 text-white text-[11px] font-bold" style={{ background: MH_BLUE }}>CR</div>
          <p className="text-[12.5px] text-gray-600 leading-relaxed">{ME.insight}</p>
        </Card>
      </div>
    </div>
  );
}

/* ── Training ─────────────────────────────────────────────────────── */

function TrainingScreen() {
  const training = getTrainingRecovery(ME);
  const [completed, setCompleted] = useState(false);
  const [rpe, setRpe] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [synced, setSynced] = useState(false);

  function submit() {
    setCompleted(true);
    setSynced(true);
    setTimeout(() => setSynced(false), 2500);
  }

  return (
    <div className="flex-1 overflow-y-auto aav2-noscroll bg-[#FAFAFB] pb-6" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 pt-6 pb-2">
        <div className="text-gray-900 font-bold text-[19px]">Training</div>
        <div className="text-gray-400 text-[12px]">Assigned by Coach Sanjay Kadam</div>
      </div>

      <div className="px-5 mt-3">
        <Card>
          <div className="text-[14px] font-bold text-gray-900">{training.session}</div>
          <div className="text-[11px] text-gray-400 mt-0.5 mb-3">{training.sessionDuration} &middot; Target intensity {training.load}%</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-2.5" style={{ background: GRAY_BG }}>
              <div className="text-[10px] text-gray-400 uppercase font-semibold">Recovery time</div>
              <div className="text-[13px] font-bold text-gray-900">{training.recoveryTime}</div>
            </div>
            <div className="rounded-xl p-2.5" style={{ background: GRAY_BG }}>
              <div className="text-[10px] text-gray-400 uppercase font-semibold">Muscle fatigue</div>
              <div className="text-[13px] font-bold text-gray-900">{training.muscleFatigue}</div>
            </div>
          </div>
          <div className="rounded-xl p-3 mt-3 text-[12px] text-gray-600 italic leading-relaxed" style={{ background: GRAY_BG }}>
            "{training.aiRecommendation}"
          </div>
        </Card>
      </div>

      <div className="px-5 mt-4">
        <SectionLabel>Session feedback</SectionLabel>
        <Card>
          {!completed ? (
            <>
              <div className="text-[12px] font-semibold text-gray-700 mb-1.5">Rate of Perceived Exertion (RPE)</div>
              <div className="flex items-center gap-3 mb-4">
                <input type="range" min={1} max={10} value={rpe} onChange={e => setRpe(Number(e.target.value))} className="flex-1 accent-current" style={{ color: MH_BLUE }} />
                <span className="text-[14px] font-bold w-6 text-center" style={{ color: MH_BLUE }}>{rpe}</span>
              </div>
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Optional notes for your coach…"
                rows={3}
                className="w-full rounded-xl border border-gray-200 p-3 text-[12.5px] text-gray-700 outline-none focus:border-[#2563EB] resize-none"
              />
              <button
                onClick={submit}
                className="w-full h-11 rounded-xl text-white text-[13px] font-bold mt-3 inline-flex items-center justify-center gap-1.5"
                style={{ background: MH_BLUE }}
              >
                <CheckCircle2 className="h-4 w-4" /> Mark session complete
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2" style={{ color: EMERALD }} />
              <div className="text-[13px] font-bold text-gray-900">Session logged</div>
              <div className="text-[11px] text-gray-400 mt-1">RPE {rpe}/10 &middot; {synced ? "Syncing to Coach Portal…" : "Synced to Coach Portal"}</div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ── Watch ────────────────────────────────────────────────────────── */

function Metric({ icon: Icon, label, value, color = MH_BLUE }: { icon: typeof Activity; label: string; value: string; color?: string }) {
  return (
    <Card className="!p-3">
      <div className="h-7 w-7 rounded-lg grid place-items-center mb-2" style={{ background: `${color}14` }}>
        <Icon className="h-3.5 w-3.5" style={{ color }} />
      </div>
      <div className="text-[13px] font-bold text-gray-900 leading-none">{value}</div>
      <div className="text-[9px] text-gray-400 mt-1 uppercase tracking-wide">{label}</div>
    </Card>
  );
}

function WatchScreen() {
  const watch = getWatchData(ME);
  const sleep = getSleepRecovery(ME);

  return (
    <div className="flex-1 overflow-y-auto aav2-noscroll bg-[#FAFAFB] pb-6" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <div>
          <div className="text-gray-900 font-bold text-[19px]">Watch</div>
          <div className="text-gray-400 text-[12px]">Last synced {ME.synced}</div>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: ME.online ? EMERALD : "#9CA3AF", background: ME.online ? "#ECFDF5" : "#F3F4F6" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: ME.online ? EMERALD : "#9CA3AF" }} /> {ME.online ? "Live" : "Offline"}
        </span>
      </div>

      <div className="px-5 mt-3 grid grid-cols-2 gap-3">
        <Metric icon={HeartPulse} label="Heart rate" value={watch.heartRate} color={RED} />
        <Metric icon={Activity} label="Resting HR" value={watch.restingHr} />
        <Metric icon={Sparkles} label="SpO2" value={watch.spo2} />
        <Metric icon={TrendingUp} label="HRV" value={watch.hrv} color={EMERALD} />
        <Metric icon={Flame} label="Calories" value={watch.calories} color={SAFFRON} />
        <Metric icon={Footprints} label="Steps" value={watch.steps} />
        <Metric icon={Activity} label="Body temp" value={watch.bodyTemp} />
        <Metric icon={Battery} label="Watch battery" value={watch.battery} />
      </div>

      <div className="px-5 mt-4">
        <SectionLabel>Sleep last night</SectionLabel>
        <Card className="flex items-center gap-4">
          <div className="relative shrink-0" style={{ width: 56, height: 56 }}>
            <Ring pct={sleep.recoveryScore} color={MH_BLUE} size={56} thickness={5} />
            <div className="absolute inset-0 grid place-items-center text-[11px] font-bold text-gray-900">{sleep.recoveryScore}</div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 flex-1 text-[11px]">
            <div><span className="text-gray-400">Duration</span><div className="font-bold text-gray-900">{sleep.duration}</div></div>
            <div><span className="text-gray-400">Sleep score</span><div className="font-bold text-gray-900">{sleep.sleepScore}/100</div></div>
            <div><span className="text-gray-400">Deep sleep</span><div className="font-bold text-gray-900">{sleep.deepSleep}</div></div>
            <div><span className="text-gray-400">REM sleep</span><div className="font-bold text-gray-900">{sleep.remSleep}</div></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ── Nutrition ────────────────────────────────────────────────────── */

function NutritionScreen() {
  const [logged, setLogged] = useState<string[]>([]);
  const tip = generateAiFoodTip(ME);

  return (
    <div className="flex-1 overflow-y-auto aav2-noscroll bg-[#FAFAFB] pb-6" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 pt-6 pb-2">
        <div className="text-gray-900 font-bold text-[19px]">Nutrition</div>
        <div className="text-gray-400 text-[12px]">Daily targets & meal plan</div>
      </div>

      <div className="px-5 mt-3">
        <Card>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-2xl font-bold text-gray-900">{ME.daily.kcal}</span>
            <span className="text-[11px] text-gray-400 font-semibold">kcal target</span>
          </div>
          {([["Protein", ME.daily.protein], ["Carbs", ME.daily.carbs], ["Fats", ME.daily.fats]] as const).map(([label, [cur, goal]]) => (
            <div key={label} className="mb-2.5 last:mb-0">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-600 mb-1">
                <span>{label}</span><span className="text-gray-400">{cur}g / {goal}g</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(cur / goal) * 100}%`, background: MH_BLUE }} />
              </div>
            </div>
          ))}
        </Card>
      </div>

      <div className="px-5 mt-4">
        <Card className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase"><Droplet className="h-3 w-3" /> Hydration</div>
            <div className="text-[14px] font-bold text-gray-900 mt-0.5">{ME.hydration.target}</div>
          </div>
          <div className="relative shrink-0" style={{ width: 48, height: 48 }}>
            <Ring pct={ME.hydration.pct} color={MH_BLUE} size={48} thickness={5} />
            <div className="absolute inset-0 grid place-items-center text-[10px] font-bold text-gray-900">{ME.hydration.pct}%</div>
          </div>
        </Card>
      </div>

      <div className="px-5 mt-4">
        <SectionLabel>Today's meals</SectionLabel>
        <div className="space-y-2.5">
          {ME.meals.map(m => (
            <Card key={m.time} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold" style={{ color: MH_BLUE }}>{m.time} <span className="text-gray-900">{m.label}</span></div>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{m.desc}</p>
              </div>
              <button
                onClick={() => setLogged(prev => prev.includes(m.label) ? prev : [...prev, m.label])}
                className="shrink-0 text-[10px] font-bold px-2.5 py-1.5 rounded-full"
                style={logged.includes(m.label) ? { color: EMERALD, background: "#ECFDF5" } : { color: MH_BLUE, background: "#EFF6FF" }}
              >
                {logged.includes(m.label) ? "Logged" : "Log meal"}
              </button>
            </Card>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4">
        <SectionLabel>Coach's nutrition tip</SectionLabel>
        <Card className="flex gap-2.5">
          <Send className="h-4 w-4 shrink-0 mt-0.5" style={{ color: MH_BLUE }} />
          <p className="text-[12px] text-gray-600 whitespace-pre-line leading-relaxed">{tip}</p>
        </Card>
      </div>
    </div>
  );
}

/* ── Profile ──────────────────────────────────────────────────────── */

function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  const [lang, setLang] = useState<"en" | "mr">("en");
  const docs = ["Aadhaar Card", "Athlete ID Card", "Medical Certificate", "Fitness Certificate"];

  return (
    <div className="flex-1 overflow-y-auto aav2-noscroll bg-[#FAFAFB] pb-6" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <div className="text-gray-900 font-bold text-[19px]">Profile</div>
        <button
          onClick={() => setLang(l => (l === "en" ? "mr" : "en"))}
          className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-full border border-gray-200 text-gray-600"
        >
          <Globe className="h-3 w-3" /> {lang === "en" ? "EN" : "मराठी"}
        </button>
      </div>

      <div className="px-5 mt-3">
        <Card className="flex items-center gap-3">
          <img src={ME.photo} alt={ME.nameEn} className="h-16 w-16 rounded-2xl object-cover" />
          <div className="min-w-0">
            <div className="text-[15px] font-bold text-gray-900">{lang === "en" ? ME.nameEn : ME.name}</div>
            <div className="text-[11px] text-gray-400 font-mono mt-0.5">{ME.code}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">{ME.sport} &middot; {ME.role}</div>
          </div>
        </Card>
      </div>

      <div className="px-5 mt-3">
        <Card>
          <div className="grid grid-cols-2 gap-y-2.5 text-[11px]">
            <div><span className="text-gray-400">Age / Gender</span><div className="font-bold text-gray-900">{ME.age} yrs &middot; {ME.gender}</div></div>
            <div><span className="text-gray-400">Height / Weight</span><div className="font-bold text-gray-900">{ME.heightCm} cm &middot; {ME.weightKg} kg</div></div>
            <div><span className="text-gray-400">District</span><div className="font-bold text-gray-900">{ME.district}</div></div>
            <div><span className="text-gray-400">Academy</span><div className="font-bold text-gray-900">{ME.academy}</div></div>
            <div><span className="text-gray-400">Coach</span><div className="font-bold text-gray-900">Coach Sanjay Kadam</div></div>
            <div><span className="text-gray-400">Event</span><div className="font-bold text-gray-900">{ME.event}</div></div>
          </div>
        </Card>
      </div>

      <div className="px-5 mt-4">
        <SectionLabel>Smart watch</SectionLabel>
        <Card className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl grid place-items-center" style={{ background: "#EFF6FF" }}>
              <WatchIcon className="h-4 w-4" style={{ color: MH_BLUE }} />
            </div>
            <div>
              <div className="text-[12.5px] font-bold text-gray-900">{ME.online ? "Connected" : "Not connected"}</div>
              <div className="text-[10.5px] text-gray-400">Wear OS &middot; Synced {ME.synced}</div>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-300" />
        </Card>
      </div>

      <div className="px-5 mt-4">
        <SectionLabel>Documents</SectionLabel>
        <Card className="!p-0 overflow-hidden">
          {docs.map((d, i) => (
            <div key={d} className={`flex items-center justify-between px-4 py-3 ${i < docs.length - 1 ? "border-b border-gray-100" : ""}`}>
              <div className="flex items-center gap-2.5">
                <FileText className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-[12px] font-semibold text-gray-700">{d}</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
            </div>
          ))}
        </Card>
      </div>

      <div className="px-5 mt-5">
        <button onClick={onLogout} className="w-full h-11 rounded-xl border border-red-100 text-red-500 text-[13px] font-bold flex items-center justify-center gap-1.5">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </div>
  );
}

/* ── Mobile facility booking flow ────────────────────────────────── */

function MiniQr({ token, size = 120 }: { token: string; size?: number }) {
  const cells = 12;
  const cell = size / cells;
  const bits: boolean[] = [];
  for (let i = 0; i < cells * cells; i++) {
    const c = token.charCodeAt(i % token.length) || 0;
    bits.push(((c * (i + 7)) % 5) < 2);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg bg-white shrink-0">
      {Array.from({ length: cells }, (_, r) =>
        Array.from({ length: cells }, (_, c) => {
          const isFinder = (r < 3 && c < 3) || (r < 3 && c >= cells - 3) || (r >= cells - 3 && c < 3);
          const on = isFinder
            ? (r === 1 && c === 1) || (r === 0 || r === 2 || c === 0 || c === 2) ||
              (r < 3 && c >= cells - 3 && (r === 0 || r === 2 || c === cells - 3 || c === cells - 1)) ||
              (r >= cells - 3 && c < 3 && (r === cells - 3 || r === cells - 1 || c === 0 || c === 2))
            : bits[r * cells + c];
          return on ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#111827" /> : null;
        })
      )}
    </svg>
  );
}

function todayIso() { return new Date().toISOString().slice(0, 10); }
function next7Days() {
  const out: string[] = [];
  const base = new Date();
  for (let i = 0; i < 7; i++) { const d = new Date(base); d.setDate(base.getDate() + i); out.push(d.toISOString().slice(0, 10)); }
  return out;
}
function fmtDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" });
}

type BookStep = "facilities" | "slots" | "form" | "pass";

function MobileBookingFlow({ athleteName, onClose }: { athleteName: string; onClose: () => void }) {
  const [step, setStep] = useState<BookStep>("facilities");
  const [facility, setFacility] = useState<Facility | null>(null);
  const [date, setDate] = useState(todayIso());
  const [slot, setSlot] = useState<Slot | null>(null);
  const [purpose, setPurpose] = useState<Purpose>("Practice");
  const [participants, setParticipants] = useState(1);
  const [booking, setBooking] = useState<Booking | null>(null);
  const dates = next7Days();

  function confirm() {
    if (!facility || !slot) return;
    const id = nextBookingId();
    const b: Booking = {
      id, facilityId: facility.id, facilityName: facility.name, athleteName, date, slot: slot.time,
      purpose, bookingType: "Individual", participants, coach: "", status: "Confirmed",
      qrToken: "", createdAt: new Date().toISOString(),
    };
    b.qrToken = generateQrToken(b);
    setBooking(b);
    setStep("pass");
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ background: "rgba(17,24,39,0.55)" }}>
      <div className="w-full max-w-sm h-[85%] bg-white rounded-3xl overflow-hidden flex flex-col">
        <div className="h-14 shrink-0 flex items-center px-4 border-b border-gray-100">
          {step !== "facilities" && step !== "pass" && (
            <button onClick={() => setStep(step === "slots" ? "facilities" : "slots")} className="h-8 w-8 grid place-items-center text-gray-500">
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <div className="text-[14px] font-bold text-gray-900 mx-auto">Book a Facility</div>
          <button onClick={onClose} className="h-8 w-8 grid place-items-center text-gray-500"><CloseIcon className="h-4 w-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto aav2-noscroll p-4" style={{ scrollbarWidth: "none" }}>
          {step === "facilities" && (
            <div className="space-y-3">
              {FACILITIES.map(f => {
                const c = FACILITY_STATUS_COLOR[f.status];
                const disabled = f.status === "Fully Booked" || f.status === "Under Maintenance";
                return (
                  <button key={f.id} disabled={disabled} onClick={() => { setFacility(f); setStep("slots"); }}
                    className="w-full text-left rounded-2xl p-3.5 flex items-center gap-3 disabled:opacity-50" style={{ background: GRAY_BG }}>
                    <span className="text-2xl shrink-0">{f.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-bold text-gray-900 truncate">{f.name}</div>
                      <div className="text-[10.5px] text-gray-400 flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> {f.location}</div>
                    </div>
                    <span className="text-[9px] font-bold uppercase px-2 py-1 rounded-full shrink-0" style={{ color: c.text, background: c.bg }}>{f.status}</span>
                  </button>
                );
              })}
            </div>
          )}

          {step === "slots" && facility && (
            <div>
              <div className="text-[13px] font-bold text-gray-900 mb-3">{facility.name}</div>
              <div className="flex gap-2 overflow-x-auto pb-1 mb-4 aav2-noscroll" style={{ scrollbarWidth: "none" }}>
                {dates.map(d => (
                  <button key={d} onClick={() => setDate(d)} className="shrink-0 rounded-xl px-3 py-2 text-center min-w-[64px]"
                    style={date === d ? { background: MH_BLUE, color: "white" } : { background: GRAY_BG, color: "#374151" }}>
                    <div className="text-[9px] font-semibold uppercase">{fmtDateShort(d).split(" ")[0]}</div>
                    <div className="text-[13px] font-bold">{fmtDateShort(d).split(" ")[1]}</div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {generateSlots(facility, date).map(s => {
                  const c = SLOT_COLOR[s.status];
                  const disabled = s.status === "Full" || s.status === "Maintenance";
                  return (
                    <button key={s.time} disabled={disabled} onClick={() => { setSlot(s); setStep("form"); }}
                      className="text-left rounded-xl p-3 border disabled:opacity-60" style={{ background: c.bg, borderColor: c.border }}>
                      <div className="text-[12px] font-bold text-gray-900">{s.time}</div>
                      <div className="text-[10px] mt-0.5" style={{ color: c.text }}>{disabled ? s.status : `${s.remaining}/${s.total} left`}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "form" && facility && slot && (
            <div>
              <div className="text-[13px] font-bold text-gray-900">{facility.name}</div>
              <div className="text-[11px] text-gray-400 mb-4">{fmtDateShort(date)} &middot; {slot.time}</div>
              <label className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Purpose</label>
              <div className="flex rounded-xl bg-gray-100 p-1 mt-1.5 mb-4">
                {(["Practice", "Training", "Competition"] as Purpose[]).map(p => (
                  <button key={p} onClick={() => setPurpose(p)} className="flex-1 h-8 rounded-lg text-[11px] font-semibold transition"
                    style={purpose === p ? { background: "white", color: MH_BLUE, boxShadow: "0 1px 2px rgba(0,0,0,0.08)" } : { color: "#6B7280" }}>
                    {p}
                  </button>
                ))}
              </div>
              <label className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Participants</label>
              <input type="number" min={1} value={participants} onChange={e => setParticipants(Number(e.target.value))}
                className="w-full h-10 mt-1.5 px-3 rounded-xl border border-gray-200 text-sm outline-none mb-5" />
              <button onClick={confirm} className="w-full h-11 rounded-xl text-white font-bold text-sm" style={{ background: MH_BLUE }}>
                Confirm Booking
              </button>
            </div>
          )}

          {step === "pass" && booking && (
            <div>
              <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <CheckCircle2 className="h-4 w-4" /> <span className="text-[12px] font-bold">Booking confirmed</span>
              </div>
              <p className="text-[11px] text-gray-400 mb-4">This QR Code is mandatory for stadium entry.</p>
              <div className="rounded-2xl overflow-hidden border border-gray-100">
                <div className="p-3.5 text-white" style={{ background: `linear-gradient(135deg,${MH_BLUE},#1e2a7a)` }}>
                  <div className="text-[9px] font-bold uppercase tracking-widest opacity-80">Digital Entry Pass</div>
                </div>
                <div className="p-4 flex gap-3">
                  <MiniQr token={booking.qrToken} />
                  <div className="min-w-0 flex-1 text-[11px] space-y-1">
                    <div><span className="text-gray-400">Booking ID</span><div className="font-bold text-gray-900 font-mono">{booking.id}</div></div>
                    <div><span className="text-gray-400">Athlete</span><div className="font-bold text-gray-900 truncate">{booking.athleteName}</div></div>
                    <div><span className="text-gray-400">Facility</span><div className="font-semibold text-gray-700 truncate">{booking.facilityName}</div></div>
                    <div><span className="text-gray-400">Date & Time</span><div className="font-semibold text-gray-700">{fmtDateShort(booking.date)}</div></div>
                  </div>
                </div>
                <div className="px-4 pb-3 flex items-center gap-1.5 text-[10px] text-gray-400"><Clock3 className="h-3 w-3" /> Valid until {booking.slot.split(" – ")[1]}</div>
              </div>
              <div className="rounded-xl mt-3 p-3 bg-amber-50">
                <p className="text-[10.5px] text-amber-800 leading-relaxed">Entry is permitted only through a valid QR Code. Without a valid QR Code, access to the facility will be denied.</p>
              </div>
              <button onClick={onClose} className="w-full h-10 rounded-xl mt-4 text-[13px] font-semibold" style={{ background: GRAY_BG, color: MH_BLUE }}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Phone shell ──────────────────────────────────────────────────── */

export function AthleteAppV2({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("home");
  const [showBooking, setShowBooking] = useState(false);

  function renderScreen() {
    switch (tab) {
      case "training": return <TrainingScreen />;
      case "watch": return <WatchScreen />;
      case "nutrition": return <NutritionScreen />;
      case "profile": return <ProfileScreen onLogout={onBack} />;
      default: return <HomeScreen onNavigate={setTab} onOpenBooking={() => setShowBooking(true)} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4" style={{ background: "#F5F6FA" }}>
      <style>{`.aav2-noscroll::-webkit-scrollbar{display:none}`}</style>
      <div className="mb-6 w-full max-w-sm flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>
        <div className="text-xs font-bold text-gray-400">Athlete App V2</div>
      </div>

      <div className="relative rounded-[44px] shadow-2xl overflow-hidden" style={{ width: 300, height: 640, background: "#111827", border: "10px solid #111827" }}>
        <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-white flex flex-col">
          <div className="h-8 shrink-0 flex items-center justify-between px-5 text-[10px] font-bold text-gray-900 z-10 bg-white">
            <span>9:41</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 h-4 w-20 rounded-full bg-black" />
            <div className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              <span>5G</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {renderScreen()}
          </div>

          <div className="h-14 shrink-0 bg-white border-t border-gray-100 flex items-center px-1">
            {NAV_TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="flex-1 flex flex-col items-center gap-0.5 py-1.5 transition">
                <t.icon className="h-[18px] w-[18px]" style={{ color: tab === t.id ? MH_BLUE : "#9ca3af", strokeWidth: tab === t.id ? 2.5 : 1.8 }} />
                <span className="text-[9px] font-bold" style={{ color: tab === t.id ? MH_BLUE : "#9ca3af" }}>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="h-4 shrink-0 bg-white flex items-center justify-center">
            <div className="h-1 w-16 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Maharashtra Sports — Athlete App V2</div>
        <div className="text-[11px] text-gray-300 mt-1">Live-synced with the Coach Portal &middot; {ME.nameEn}</div>
      </div>

      {showBooking && <MobileBookingFlow athleteName={ME.nameEn} onClose={() => setShowBooking(false)} />}
    </div>
  );
}

import { useState } from "react";
import {
  LayoutDashboard, Users, AlertTriangle, Search, Bell, LogOut,
  ArrowLeft, Zap, Moon, Activity, TrendingUp, TrendingDown,
  ShieldCheck, Utensils, Dumbbell, Share2, MoreHorizontal, CheckCircle2,
  Info, UserCircle2, ClipboardCheck, HeartPulse,
  CalendarDays, FileUp, Trophy, Sparkles, MapPin, Send, Wand2, Clock,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import photo1 from "@/assets/olympians/olympian_1.png";
import photo2 from "@/assets/olympians/olympian_2.png";
import photo3 from "@/assets/olympians/olympian_3.png";
import photo4 from "@/assets/olympians/olympian_4.png";
import photo5 from "@/assets/olympians/olympian_5.png";
import photo6 from "@/assets/olympians/olympian_6.png";

export const ACCENT = "#363092";

// Coach Dashboard-specific palette (per design spec)
export const SAFFRON = "#FF8A00";
export const MH_BLUE = "#2563EB";
export const GRAY_BG = "#F8FAFC";
export const EMERALD = "#10B981";
export const RED = "#EF4444";

export type Athlete = {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  role: string;
  sport: string;
  event: string;
  age: number;
  gender: "Male" | "Female";
  heightCm: number;
  weightKg: number;
  district: string;
  academy: string;
  online: boolean;
  photo: string;
  readiness: number;
  status: "Ready" | "Caution" | "High Risk";
  insight: string;
  insightIcon: typeof Zap;
  tier: string;
  rank: string;
  synced: string;
  daily: { kcal: number; protein: [number, number]; carbs: [number, number]; fats: [number, number] };
  meals: { time: string; label: string; desc: string }[];
  hydration: { target: string; note: string; pct: number };
  factors: { icon: typeof Moon; label: string; baseline: string; value: string; delta: string; up: boolean }[];
  loadAdjustment: { pct: number; note: string };
  mobility: { area: string; note: string; tags: string[] };
};

export const ATHLETES: Athlete[] = [
  {
    id: "onkar", code: "MSD-2026-011", name: "ओंकार पाटील", nameEn: "Onkar Patil", role: "Point Guard",
    sport: "Basketball", event: "Maharashtra State League 2026", age: 23, gender: "Male", heightCm: 182, weightKg: 78,
    district: "Pune", academy: "Pune Basketball Academy", online: true,
    photo: photo1, readiness: 84, status: "Ready",
    insight: "Optimal state detected. High CNS recovery with slight metabolic fatigue from yesterday's session.",
    insightIcon: CheckCircle2, tier: "Elite Performance Tier", rank: "#1 (Team Alpha)", synced: "4m ago",
    daily: { kcal: 3200, protein: [180, 210], carbs: [340, 450], fats: [82, 90] },
    meals: [
      { time: "08:00", label: "Pre-Training Fuel", desc: "High carb (80g), moderate protein (25g). Focus on oats/berries." },
      { time: "13:30", label: "Recovery Lunch", desc: "Lean protein (40g) + complex carbs. Focus on anti-inflammatory greens." },
    ],
    hydration: { target: "4.5 Liters / Day", note: "Include 1500mg Sodium and 400mg Magnesium during session to combat sweat loss.", pct: 70 },
    factors: [
      { icon: Activity, label: "Resting Heart Rate (RHR)", baseline: "Baseline: 52 bpm", value: "54 bpm", delta: "+4%", up: true },
      { icon: Moon, label: "Sleep Duration", baseline: "Goal: 8.5 hrs", value: "7h 12m", delta: "-1.2h", up: false },
      { icon: Dumbbell, label: "Training Volume (Acute)", baseline: "Baseline: 420kg/wk", value: "482 kg", delta: "+15%", up: true },
    ],
    loadAdjustment: { pct: 65, note: "Onkar is showing residual strain in the posterior chain. De-load lower body push movements today. Reallocate volume to upper body stability." },
    mobility: { area: "Hip Flexor Recovery", note: "High tension detected via bio-sensors during lateral transitions yesterday.", tags: ["Glute Activation", "Psoas Release"] },
  },
  {
    id: "sakshi", code: "MSD-2026-012", name: "साक्षी जाधव", nameEn: "Sakshi Jadhav", role: "Midfielder",
    sport: "Football", event: "Maharashtra State League 2026", age: 21, gender: "Female", heightCm: 165, weightKg: 58,
    district: "Nashik", academy: "Nashik Football Academy", online: true,
    photo: photo2, readiness: 68, status: "Caution",
    insight: "Increased muscular load in hamstrings. Recommend taper.",
    insightIcon: Zap, tier: "Squad A", rank: "#5 (Team Alpha)", synced: "12m ago",
    daily: { kcal: 2900, protein: [150, 190], carbs: [300, 400], fats: [70, 85] },
    meals: [
      { time: "07:30", label: "Pre-Training Fuel", desc: "Moderate carb, light protein. Focus on quick-digesting fruit." },
      { time: "13:00", label: "Recovery Lunch", desc: "Lean protein + complex carbs, hamstring-focused anti-inflammatory greens." },
    ],
    hydration: { target: "4.0 Liters / Day", note: "Add electrolytes during high-intensity drills.", pct: 55 },
    factors: [
      { icon: Activity, label: "Resting Heart Rate (RHR)", baseline: "Baseline: 58 bpm", value: "63 bpm", delta: "+9%", up: true },
      { icon: Moon, label: "Sleep Duration", baseline: "Goal: 8 hrs", value: "6h 40m", delta: "-1.3h", up: false },
      { icon: Dumbbell, label: "Training Volume (Acute)", baseline: "Baseline: 300kg/wk", value: "365 kg", delta: "+22%", up: true },
    ],
    loadAdjustment: { pct: 45, note: "Hamstring load trending high. Reduce sprint volume and prioritize eccentric recovery work today." },
    mobility: { area: "Hamstring Recovery", note: "Elevated muscular tension flagged during sprint intervals.", tags: ["Hamstring Stretch", "Foam Rolling"] },
  },
  {
    id: "rohan", code: "MSD-2026-013", name: "रोहन देशमुख", nameEn: "Rohan Deshmukh", role: "Defender",
    sport: "Football", event: "Maharashtra State League 2026", age: 24, gender: "Male", heightCm: 178, weightKg: 74,
    district: "Kolhapur", academy: "Kolhapur Sports Academy", online: false,
    photo: photo3, readiness: 91, status: "Ready",
    insight: "Peak cardiovascular efficiency. Full load cleared.",
    insightIcon: CheckCircle2, tier: "Elite Performance Tier", rank: "#2 (Team Alpha)", synced: "6m ago",
    daily: { kcal: 3100, protein: [175, 200], carbs: [330, 430], fats: [78, 88] },
    meals: [
      { time: "07:45", label: "Pre-Training Fuel", desc: "High carb, moderate protein. Focus on banana and whole grain toast." },
      { time: "13:15", label: "Recovery Lunch", desc: "Lean protein + complex carbs. Focus on leafy greens and quinoa." },
    ],
    hydration: { target: "4.3 Liters / Day", note: "Maintain steady intake through the match; add electrolytes post-session.", pct: 82 },
    factors: [
      { icon: Activity, label: "Resting Heart Rate (RHR)", baseline: "Baseline: 50 bpm", value: "49 bpm", delta: "-2%", up: false },
      { icon: Moon, label: "Sleep Duration", baseline: "Goal: 8 hrs", value: "8h 10m", delta: "+0.2h", up: false },
      { icon: Dumbbell, label: "Training Volume (Acute)", baseline: "Baseline: 400kg/wk", value: "398 kg", delta: "-0.5%", up: false },
    ],
    loadAdjustment: { pct: 95, note: "Rohan is fully recovered and cleared for maximal intensity training today." },
    mobility: { area: "Ankle Mobility", note: "Stable range of motion, no restrictions detected.", tags: ["Ankle Circles", "Calf Stretch"] },
  },
  {
    id: "sneha", code: "MSD-2026-014", name: "स्नेहा कुलकर्णी", nameEn: "Sneha Kulkarni", role: "Full Back",
    sport: "Football", event: "Maharashtra State League 2026", age: 22, gender: "Female", heightCm: 162, weightKg: 55,
    district: "Satara", academy: "Satara Football Academy", online: true,
    photo: photo4, readiness: 88, status: "Ready",
    insight: "Optimal recovery. Readiness trending upward.",
    insightIcon: CheckCircle2, tier: "Squad A", rank: "#3 (Team Alpha)", synced: "9m ago",
    daily: { kcal: 2850, protein: [155, 185], carbs: [290, 380], fats: [68, 80] },
    meals: [
      { time: "08:15", label: "Pre-Training Fuel", desc: "Moderate carb, light protein. Focus on oats and honey." },
      { time: "13:45", label: "Recovery Lunch", desc: "Lean protein + sweet potato. Focus on anti-inflammatory spices." },
    ],
    hydration: { target: "4.1 Liters / Day", note: "Standard hydration protocol; monitor urine colour pre-session.", pct: 78 },
    factors: [
      { icon: Activity, label: "Resting Heart Rate (RHR)", baseline: "Baseline: 55 bpm", value: "53 bpm", delta: "-3%", up: false },
      { icon: Moon, label: "Sleep Duration", baseline: "Goal: 8 hrs", value: "7h 55m", delta: "-0.1h", up: false },
      { icon: Dumbbell, label: "Training Volume (Acute)", baseline: "Baseline: 350kg/wk", value: "360 kg", delta: "+3%", up: true },
    ],
    loadAdjustment: { pct: 85, note: "Sneha is trending well. Maintain current training block with normal load." },
    mobility: { area: "Shoulder Mobility", note: "Minor tightness noted; recommend light dynamic stretching.", tags: ["Band Pull-Aparts", "Wall Slides"] },
  },
  {
    id: "viraj", code: "MSD-2026-015", name: "विराज शिंदे", nameEn: "Viraj Shinde", role: "Striker",
    sport: "Football", event: "Maharashtra State League 2026", age: 20, gender: "Male", heightCm: 175, weightKg: 68,
    district: "Nagpur", academy: "Nagpur Sports Complex", online: true,
    photo: photo5, readiness: 76, status: "Caution",
    insight: "Elevated acute load from sprint sessions. Monitor closely.",
    insightIcon: Zap, tier: "Squad A", rank: "#6 (Team Alpha)", synced: "18m ago",
    daily: { kcal: 3050, protein: [165, 195], carbs: [320, 410], fats: [75, 85] },
    meals: [
      { time: "07:30", label: "Pre-Training Fuel", desc: "High carb, moderate protein. Focus on rice and lean chicken." },
      { time: "13:00", label: "Recovery Lunch", desc: "Protein + complex carbs. Focus on anti-inflammatory berries." },
    ],
    hydration: { target: "4.4 Liters / Day", note: "Increase sodium intake given elevated sweat rate during sprints.", pct: 60 },
    factors: [
      { icon: Activity, label: "Resting Heart Rate (RHR)", baseline: "Baseline: 54 bpm", value: "60 bpm", delta: "+11%", up: true },
      { icon: Moon, label: "Sleep Duration", baseline: "Goal: 8 hrs", value: "6h 50m", delta: "-1.1h", up: false },
      { icon: Dumbbell, label: "Training Volume (Acute)", baseline: "Baseline: 380kg/wk", value: "430 kg", delta: "+13%", up: true },
    ],
    loadAdjustment: { pct: 55, note: "Viraj's sprint volume is elevated. Reduce max-velocity work and prioritize recovery today." },
    mobility: { area: "Groin & Adductor Recovery", note: "Increased tension detected during change-of-direction drills.", tags: ["Adductor Stretch", "Copenhagen Plank"] },
  },
  {
    id: "ankita", code: "MSD-2026-016", name: "अंकिता मोरे", nameEn: "Ankita More", role: "Goalkeeper",
    sport: "Football", event: "Maharashtra State League 2026", age: 23, gender: "Female", heightCm: 170, weightKg: 62,
    district: "Aurangabad", academy: "Aurangabad Sports Academy", online: false,
    photo: photo6, readiness: 90, status: "Ready",
    insight: "Excellent reaction time and recovery. Cleared for full training.",
    insightIcon: CheckCircle2, tier: "Elite Performance Tier", rank: "#4 (Team Alpha)", synced: "3m ago",
    daily: { kcal: 2750, protein: [148, 175], carbs: [270, 360], fats: [65, 78] },
    meals: [
      { time: "08:00", label: "Pre-Training Fuel", desc: "Moderate carb, light protein. Focus on eggs and toast." },
      { time: "13:20", label: "Recovery Lunch", desc: "Lean protein + complex carbs. Focus on leafy greens." },
    ],
    hydration: { target: "3.8 Liters / Day", note: "Standard hydration protocol for training day.", pct: 85 },
    factors: [
      { icon: Activity, label: "Resting Heart Rate (RHR)", baseline: "Baseline: 56 bpm", value: "55 bpm", delta: "-1%", up: false },
      { icon: Moon, label: "Sleep Duration", baseline: "Goal: 8 hrs", value: "8h 20m", delta: "+0.3h", up: false },
      { icon: Dumbbell, label: "Training Volume (Acute)", baseline: "Baseline: 280kg/wk", value: "275 kg", delta: "-2%", up: false },
    ],
    loadAdjustment: { pct: 90, note: "Ankita is fully recovered. Proceed with standard goalkeeper drills at full intensity." },
    mobility: { area: "Wrist & Shoulder Mobility", note: "Good range of motion following yesterday's dive drills.", tags: ["Wrist Rolls", "Shoulder Dislocates"] },
  },
];

/* ── Derived Athlete Profile Dashboard data ──────────────────────────
   Computed from each athlete's existing readiness/factor data so every
   widget stays per-athlete without hand-authoring duplicate stats. ── */

export function getRecommendation(readiness: number) {
  if (readiness >= 80) return { label: "Fit to Train", color: EMERALD, bg: "#ECFDF5" };
  if (readiness >= 60) return { label: "Recovery", color: SAFFRON, bg: "#FFF7ED" };
  return { label: "Rest", color: RED, bg: "#FEF2F2" };
}

function parseNum(s: string) {
  const m = s.match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : 0;
}

export function getWatchData(a: Athlete) {
  const rhr = parseNum(a.factors[0].value);
  const liveHr = Math.round(rhr + (100 - a.readiness) * 0.55);
  const spo2 = Math.max(94, Math.min(99, Math.round(99 - (100 - a.readiness) * 0.04)));
  const hrv = Math.round(30 + a.readiness * 0.55);
  const bodyTemp = (36.4 + (100 - a.readiness) * 0.01).toFixed(1);
  const stress = a.readiness >= 80 ? "Low" : a.readiness >= 60 ? "Moderate" : "High";
  const steps = Math.round(4200 + a.readiness * 62);
  const calories = Math.round(1600 + a.readiness * 9.5);
  const battery = Math.max(28, (a.code.charCodeAt(a.code.length - 1) * 7) % 100);
  return {
    heartRate: `${liveHr} bpm`, restingHr: `${rhr} bpm`, spo2: `${spo2}%`, hrv: `${hrv} ms`,
    bodyTemp: `${bodyTemp}°C`, stress, steps: steps.toLocaleString(), calories: `${calories} kcal`,
    battery: `${battery}%`, live: a.online,
  };
}

export function getTrainingRecovery(a: Athlete) {
  const fatigue = a.readiness >= 80 ? "Low" : a.readiness >= 60 ? "Moderate" : "High";
  const recoveryTime = a.readiness >= 80 ? "6h" : a.readiness >= 60 ? "14h" : "24h+";
  return {
    session: `${a.role} Specific Drills`,
    load: a.loadAdjustment.pct,
    sessionDuration: "75 min",
    recoveryTime,
    muscleFatigue: fatigue,
    recoveryStatus: getRecommendation(a.readiness).label,
    aiRecommendation: a.loadAdjustment.note,
  };
}

export function getPerformanceSummary(a: Athlete) {
  const base = a.readiness;
  const trend = [base - 12, base - 7, base - 10, base - 3, base - 5, base - 1, base].map(v => Math.max(40, Math.min(100, Math.round(v))));
  return {
    avgSpeed: `${(5.2 + base * 0.02).toFixed(1)} km/h`,
    topSpeed: `${(22 + base * 0.06).toFixed(1)} km/h`,
    sprintCount: Math.round(8 + base * 0.18),
    bestTiming: `${(13.5 - base * 0.02).toFixed(2)} s`,
    jumpHeight: `${(42 + base * 0.12).toFixed(0)} cm`,
    trend: trend.map((score, i) => ({ label: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "TODAY"][i], score })),
  };
}

export function getSleepRecovery(a: Athlete) {
  const durationStr = a.factors[1].value;
  const hours = parseNum(durationStr);
  const sleepScore = Math.max(40, Math.min(100, Math.round((hours / 8.5) * 100)));
  const deepSleep = `${Math.round(hours * 0.19 * 60)}m`;
  const remSleep = `${Math.round(hours * 0.21 * 60)}m`;
  const recoveryScore = Math.round((sleepScore + a.readiness) / 2);
  return { sleepScore, duration: durationStr, deepSleep, remSleep, recoveryScore };
}

export function getSchedule(a: Athlete) {
  const nextEvent = UPCOMING_EVENTS.find(e => e.athletes >= 18) ?? UPCOMING_EVENTS[0];
  return {
    nextSession: { name: `${a.role} Specific Drills`, time: "06:30 AM", date: "Tomorrow" },
    nextCompetition: { name: nextEvent.name, date: nextEvent.date, venue: nextEvent.venue },
  };
}

export function getAlerts(a: Athlete) {
  const alerts: { icon: typeof AlertTriangle; text: string; action: string; priority: "High" | "Medium"; color: string }[] = [];
  const rhrFactor = a.factors[0];
  if (rhrFactor.up && parseNum(rhrFactor.delta) >= 8) {
    alerts.push({ icon: HeartPulse, text: `Elevated resting heart rate — ${rhrFactor.value} (${rhrFactor.delta} vs baseline)`, action: "Recommend light session & monitor HR", priority: "High", color: RED });
  }
  const sleepHours = parseNum(a.factors[1].value);
  if (sleepHours < 7.5) {
    alerts.push({ icon: Moon, text: `Below-target sleep duration — ${a.factors[1].value} logged`, action: "Advise earlier wind-down & recovery focus", priority: "Medium", color: SAFFRON });
  }
  if (a.hydration.pct < 65) {
    alerts.push({ icon: Info, text: `Hydration tracking at ${a.hydration.pct}% of daily target`, action: "Prompt fluid & electrolyte intake before session", priority: "Medium", color: SAFFRON });
  }
  if (a.loadAdjustment.pct < 55) {
    alerts.push({ icon: AlertTriangle, text: "Excessive training load detected relative to recovery", action: "Reduce intensity — active recovery only today", priority: "High", color: RED });
  }
  if (a.readiness < 60) {
    alerts.push({ icon: TrendingDown, text: `Low recovery score — readiness at ${a.readiness}/100`, action: "Prioritize rest before next high-intensity block", priority: "High", color: RED });
  }
  return alerts;
}

/** Rule-based "AI" nutrition tip generator — drafts a personalized food-plan
 *  tip from the athlete's live macro, hydration and readiness data so the
 *  coach can review/edit before sending it on. */
export function generateAiFoodTip(a: Athlete): string {
  const lines: string[] = [];
  const [pCur, pGoal] = a.daily.protein;
  const [cCur, cGoal] = a.daily.carbs;
  const proteinPct = Math.round((pCur / pGoal) * 100);
  const carbPct = Math.round((cCur / cGoal) * 100);

  lines.push(`Hi ${a.nameEn.split(" ")[0]}, here's your food plan tip for today:`);

  if (a.hydration.pct < 65) {
    lines.push(`Your hydration is at ${a.hydration.pct}% of target — prioritize water and electrolytes before your ${a.role.toLowerCase()} session today.`);
  }
  if (proteinPct < 85) {
    lines.push(`Protein intake is trailing at ${proteinPct}% of goal (${pCur}g/${pGoal}g). Add a protein-rich snack — eggs, paneer, or a shake — within the next 2 hours.`);
  }
  if (carbPct < 85) {
    lines.push(`Carb intake is at ${carbPct}% of goal (${cCur}g/${cGoal}g) — top up with whole grains or fruit before training to keep energy stores full.`);
  }
  if (a.readiness < 65) {
    lines.push(`Readiness is lower than usual, so favour anti-inflammatory foods (leafy greens, berries, turmeric) and keep this meal light on fried/processed food.`);
  }
  if (lines.length === 1) {
    lines.push(`Macros and hydration are on track — stick to your current meal plan and maintain protein timing around training windows.`);
  }
  lines.push(`— Coach Sanjay Kadam`);
  return lines.join("\n");
}

type View = "dashboard" | "athletes" | "alerts" | "athlete-detail";
type DetailTab = "readiness" | "nutrition" | "fitness";

const NAV_ITEMS: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "athletes", label: "Athletes", icon: Users },
  { id: "alerts", label: "Alerts", icon: AlertTriangle },
];

const ALERTS = [
  {
    icon: AlertTriangle, tone: "#dc2626", bg: "#fee2e2", name: "Rohan Deshmukh", time: "2m ago",
    text: "Acute-to-Chronic Load ratio exceeded 1.3. Immediate reduction in training volume recommended to prevent hamstring strain.",
    tag: "CRITICAL RISK", tagTone: "#dc2626", tagBg: "#fee2e2",
  },
  {
    icon: UserCircle2, tone: "#7c3aed", bg: "#f3f0ff", name: "Sneha Kulkarni", time: "45m ago",
    text: "Sleep quality index dropped by 22% over 48 hours. HRV data indicates sympathetic dominance.",
    tag: "RECOVERY DELAY", tagTone: "#7c3aed", tagBg: "#f3f0ff",
  },
  {
    icon: Info, tone: "#0891b2", bg: "#e0f7fa", name: "Weekly Load Report", time: "2h ago",
    text: "Squad training volume reached target threshold for Microcycle 4. AI-generated session plans for tomorrow are ready for review.",
    tag: "LOGISTICS", tagTone: "#0891b2", tagBg: "#e0f7fa",
  },
  {
    icon: TrendingUp, tone: "#d97706", bg: "#fef3e2", name: "Midfield Group", time: "5h ago",
    text: "Anomalous deceleration patterns detected in 3 athletes. Correlation found with recent turf hardness data. Check hydration levels.",
    tag: "MECHANICAL STRESS", tagTone: "#d97706", tagBg: "#fef3e2",
  },
];

function statusColor(status: Athlete["status"]) {
  if (status === "Ready") return { fg: "#059669", bg: "#e6f7f2", bar: "#059669" };
  if (status === "Caution") return { fg: "#d97706", bg: "#fef3e2", bar: "#d97706" };
  return { fg: "#dc2626", bg: "#fee2e2", bar: "#dc2626" };
}

function Avatar({ name, photo, size = 44 }: { name: string; photo?: string; size?: number }) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w.replace(/["]/g, "")[0]).join("").toUpperCase();
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className="rounded-xl object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-xl grid place-items-center text-white font-bold shrink-0"
      style={{ width: size, height: size, background: `linear-gradient(135deg,${ACCENT},#1e2a7a)`, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

function Sidebar({ view, setView, onLogout }: { view: View; setView: (v: View) => void; onLogout: () => void }) {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen overflow-y-auto">
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-gray-100">
        <div className="h-9 w-9 rounded-xl grid place-items-center" style={{ background: ACCENT }}>
          <ShieldCheck className="h-4.5 w-4.5 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900 leading-none">Coach Portal</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Sports & Youth Services</div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map(item => {
          const active = view === item.id || (view === "athlete-detail" && item.id === "athletes");
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 h-11 rounded-xl text-sm font-semibold transition ${
                active ? "text-white shadow-sm" : "text-gray-600 hover:bg-gray-50"
              }`}
              style={active ? { background: ACCENT } : {}}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <div className="rounded-xl bg-[#f4f5fb] px-3.5 py-3 mb-2">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">System Status</div>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-gray-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> AI Core Online
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-1.5">
          <Avatar name="Coach Sanjay Kadam" size={36} />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-gray-900 leading-none truncate">Coach Sanjay Kadam</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Head of Performance</div>
          </div>
          <button onClick={onLogout} title="Logout" className="h-8 w-8 rounded-lg grid place-items-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ title, subtitle, searchPlaceholder }: { title: string; subtitle: string; searchPlaceholder: string }) {
  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center px-6 gap-4 sticky top-0 z-10">
      <div className="mr-auto">
        <h1 className="text-lg font-black text-gray-900 leading-none">{title}</h1>
        <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-1 font-semibold">{subtitle}</p>
      </div>
      <div className="relative hidden sm:block w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          placeholder={searchPlaceholder}
          className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/10 transition"
        />
      </div>
      <button className="relative h-9 w-9 rounded-lg border border-gray-200 grid place-items-center text-gray-500 hover:border-[#363092] hover:text-[#363092] transition">
        <Bell className="h-4 w-4" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>
      <div className="h-9 w-9 rounded-lg border border-gray-200 grid place-items-center text-gray-500">
        <UserCircle2 className="h-5 w-5" />
      </div>
    </div>
  );
}

function StatCard({ label, value, valueColor, note, noteColor }: { label: string; value: string; valueColor?: string; note: string; noteColor?: string }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-5 py-4">
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</div>
      <div className="flex items-baseline gap-2 mt-1.5">
        <span className="text-2xl font-black" style={{ color: valueColor ?? "#111827" }}>{value}</span>
        <span className="text-xs font-medium" style={{ color: noteColor ?? "#9ca3af" }}>{note}</span>
      </div>
    </div>
  );
}

function AthleteCard({ a, onOpen }: { a: Athlete; onOpen: () => void }) {
  const sc = statusColor(a.status);
  const Icon = a.insightIcon;
  return (
    <button onClick={onOpen} className="text-left rounded-2xl bg-white border border-gray-200 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start gap-3">
        <Avatar name={a.nameEn} photo={a.photo} />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-gray-900 leading-tight truncate">{a.nameEn}</div>
          <div className="text-[11px] text-gray-400 uppercase tracking-wide mt-0.5">{a.role}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl font-black" style={{ color: sc.fg }}>{a.readiness}</div>
          <div className="text-[10px] font-bold uppercase" style={{ color: sc.fg }}>{a.status}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          <span>Readiness Score</span><span style={{ color: sc.fg }}>{a.readiness}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${a.readiness}%`, background: sc.bar }} />
        </div>
      </div>

      <div className="mt-3 rounded-xl px-3 py-2.5" style={{ background: "#f4f5fb" }}>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: ACCENT }}>
          <Icon className="h-3 w-3" /> AI Insight
        </div>
        <p className="text-xs text-gray-600 italic mt-1 leading-relaxed">{a.insight}</p>
      </div>
    </button>
  );
}

/* ── Coach Dashboard data ─────────────────────────────────────────── */

export const UPCOMING_EVENTS = [
  { name: "Maharashtra State Athletics Championship", date: "05 Aug 2026", venue: "Balewadi, Pune", athletes: 24, daysRemaining: 8 },
  { name: "Inter-District Football League", date: "14 Aug 2026", venue: "Shivaji Stadium, Nagpur", athletes: 18, daysRemaining: 17 },
  { name: "39th National Games Trials", date: "22 Aug 2026", venue: "Wankhede Complex, Mumbai", athletes: 32, daysRemaining: 25 },
];

// Squad-wide figures derived from ATHLETES + the per-athlete AI helpers above.
const TRAINING_TODAY = ATHLETES.filter(a => a.status !== "High Risk");
const NEED_ATTENTION = ATHLETES.filter(a => getAlerts(a).length > 0);
const INJURY_RECOVERY = ATHLETES.filter(a => a.status === "High Risk" || getRecommendation(a.readiness).label === "Recovery");
const UNREAD_ALERTS_COUNT = ATHLETES.reduce((sum, a) => sum + getAlerts(a).length, 0);

const KPI_CARDS = [
  { label: "My Athletes", value: String(ATHLETES.length), sub: "Total under your squad", icon: Users, color: MH_BLUE },
  { label: "Training Today", value: String(TRAINING_TODAY.length), sub: `${ATHLETES.length - TRAINING_TODAY.length} resting`, icon: CalendarDays, color: EMERALD },
  { label: "Need Attention", value: String(NEED_ATTENTION.length), sub: "Fatigue, sleep or injury risk", icon: AlertTriangle, color: SAFFRON },
  { label: "Injury & Recovery", value: String(INJURY_RECOVERY.length), sub: "Injured + recovering athletes", icon: HeartPulse, color: RED },
  { label: "Upcoming Competitions", value: String(UPCOMING_EVENTS.length), sub: "Next 30 days", icon: Trophy, color: MH_BLUE },
  { label: "Unread Alerts", value: String(UNREAD_ALERTS_COUNT), sub: "AI & system notifications", icon: Bell, color: SAFFRON },
];

const QUICK_ACTIONS = [
  { label: "Mark Attendance", desc: "Record today's squad attendance", icon: ClipboardCheck, color: MH_BLUE },
  { label: "View Athletes", desc: "Browse full athlete directory", icon: Users, color: SAFFRON, nav: "athletes" as View },
  { label: "Create Training Session", desc: "Schedule a new session", icon: CalendarDays, color: EMERALD },
  { label: "Upload Performance", desc: "Submit new performance data", icon: FileUp, color: MH_BLUE },
  { label: "Report Injury", desc: "Log or update injury status", icon: HeartPulse, color: RED },
  { label: "View Competition Calendar", desc: "See upcoming fixtures", icon: Trophy, color: SAFFRON, nav: "alerts" as View },
];

// Squad split into two mock daily sessions for the schedule widget.
const TRAINING_SCHEDULE_TODAY = [
  { session: "Morning Session", time: "06:30 AM – 08:00 AM", squad: ATHLETES.slice(0, 4), status: "Completed", statusColor: EMERALD },
  { session: "Evening Session", time: "05:00 PM – 06:30 PM", squad: ATHLETES.slice(4, 8), status: "Upcoming", statusColor: MH_BLUE },
];

function recoveryLabel(readiness: number) {
  if (readiness >= 80) return "Good";
  if (readiness >= 60) return "Moderate";
  return "Low";
}

function statusEmoji(status: Athlete["status"]) {
  if (status === "Ready") return "🟢";
  if (status === "Caution") return "🟡";
  return "🔴";
}

function getSquadAlerts() {
  type SquadAlert = { athlete: string; text: string; priority: "High" | "Medium" | "Good"; color: string; icon: typeof AlertTriangle };
  const alerts: SquadAlert[] = [];
  ATHLETES.forEach(a => {
    getAlerts(a).forEach(al => alerts.push({ athlete: a.nameEn, text: al.text.split(" — ")[0].split(" logged")[0], priority: al.priority, color: al.color, icon: al.icon }));
    if (!a.online) alerts.push({ athlete: a.nameEn, text: "Watch Offline", priority: "Medium", color: SAFFRON, icon: Info });
    if (a.readiness >= 88) alerts.push({ athlete: a.nameEn, text: "Recovery Complete", priority: "Good", color: EMERALD, icon: CheckCircle2 });
  });
  const rank = { High: 0, Medium: 1, Good: 2 };
  return alerts.sort((x, y) => rank[x.priority] - rank[y.priority]).slice(0, 5);
}

function Panel({ title, action, children, className = "" }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white border border-gray-200 shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function KpiCard({ k }: { k: typeof KPI_CARDS[number] }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="h-10 w-10 rounded-xl grid place-items-center mb-3" style={{ background: `${k.color}14` }}>
        <k.icon className="h-5 w-5" style={{ color: k.color }} />
      </div>
      <div className="text-xl font-black text-gray-900 leading-none">{k.value}</div>
      <div className="text-[11px] font-semibold text-gray-400 mt-1.5 uppercase tracking-wide">{k.label}</div>
      <div className="text-[11px] text-gray-500 mt-2">{k.sub}</div>
    </div>
  );
}

function AthleteStatusSection({ onOpenAthlete }: { onOpenAthlete: (id: string) => void }) {
  return (
    <Panel title="Athlete Status" action={<span className="text-[11px] text-gray-400">{ATHLETES.length} athletes</span>}>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wide">
              <th className="px-2 pb-2 font-bold">Athlete</th>
              <th className="px-2 pb-2 font-bold">Readiness</th>
              <th className="px-2 pb-2 font-bold">Recovery</th>
              <th className="px-2 pb-2 font-bold">Sleep</th>
              <th className="px-2 pb-2 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {ATHLETES.map(a => {
              const sleep = getSleepRecovery(a);
              return (
                <tr key={a.id} onClick={() => onOpenAthlete(a.id)} className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition">
                  <td className="px-2 py-2.5 flex items-center gap-2.5">
                    <Avatar name={a.nameEn} photo={a.photo} size={28} />
                    <span className="font-semibold text-gray-900 whitespace-nowrap">{a.nameEn}</span>
                  </td>
                  <td className="px-2 py-2.5 font-bold" style={{ color: ACCENT }}>{a.readiness}</td>
                  <td className="px-2 py-2.5 text-gray-600">{recoveryLabel(a.readiness)}</td>
                  <td className="px-2 py-2.5 text-gray-600 whitespace-nowrap">{sleep.duration}</td>
                  <td className="px-2 py-2.5 whitespace-nowrap">{statusEmoji(a.status)} {a.status === "High Risk" ? "Attention" : a.status === "Caution" ? "Monitor" : "Ready"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function TodaysAlertsSection() {
  const alerts = getSquadAlerts();
  return (
    <Panel title="Today's AI Alerts" action={<span className="text-[11px] text-gray-400">Max 5 shown</span>}>
      {alerts.length === 0 ? (
        <div className="flex items-center gap-2 text-sm text-gray-400 py-4 justify-center">
          <CheckCircle2 className="h-4 w-4" style={{ color: EMERALD }} /> No active alerts
        </div>
      ) : (
        <div className="space-y-2.5">
          {alerts.map((al, i) => (
            <div key={i} className="rounded-xl p-3 flex items-center gap-3" style={{ background: `${al.color}0D`, borderLeft: `3px solid ${al.color}` }}>
              <al.icon className="h-4 w-4 shrink-0" style={{ color: al.color }} />
              <span className="text-sm text-gray-800 flex-1">
                <span className="font-semibold">{al.text}</span> — {al.athlete}
              </span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

function TrainingScheduleSection() {
  return (
    <Panel title="Training Schedule — Today's Sessions">
      <div className="space-y-4">
        {TRAINING_SCHEDULE_TODAY.map(s => (
          <div key={s.session} className="rounded-xl p-4" style={{ background: GRAY_BG }}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-bold text-gray-900">{s.session}</div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: s.statusColor, background: `${s.statusColor}14` }}>{s.status}</span>
            </div>
            <div className="text-xs text-gray-400 mb-3">{s.time}</div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {s.squad.length} athletes assigned</span>
              <span className="flex items-center gap-1.5"><ClipboardCheck className="h-3.5 w-3.5" /> {s.squad.filter(a => a.status !== "High Risk").length}/{s.squad.length} confirmed</span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function UpcomingCompetitionsSection() {
  return (
    <Panel title="Upcoming Competitions">
      <div className="space-y-3">
        {UPCOMING_EVENTS.map((e, i) => (
          <div key={i} className="rounded-xl p-3.5 flex items-start justify-between gap-3" style={{ background: GRAY_BG }}>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900 leading-snug">{e.name}</div>
              <div className="text-xs text-gray-400 mt-1 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {e.date}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.venue}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {e.athletes} athletes</span>
              </div>
            </div>
            <span className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: MH_BLUE, background: "#EFF6FF" }}>
              {e.daysRemaining}d
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DashboardView({ onNavigate, onOpenAthlete }: { onNavigate: (v: View) => void; onOpenAthlete: (id: string) => void }) {
  return (
    <>
      <TopBar title="Coach Dashboard" subtitle="Maharashtra Sports Department" searchPlaceholder="Search..." />
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {KPI_CARDS.map(k => <KpiCard key={k.label} k={k} />)}
        </div>

        {/* Quick actions */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {QUICK_ACTIONS.map(qa => (
            <button
              key={qa.label}
              onClick={() => qa.nav && onNavigate(qa.nav)}
              className="text-left rounded-2xl bg-white border border-gray-200 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              <div className="h-10 w-10 rounded-xl grid place-items-center mb-3" style={{ background: `${qa.color}14` }}>
                <qa.icon className="h-5 w-5" style={{ color: qa.color }} />
              </div>
              <div className="text-xs font-bold text-gray-900 leading-snug">{qa.label}</div>
              <div className="text-[10px] text-gray-400 mt-0.5 leading-snug">{qa.desc}</div>
            </button>
          ))}
        </div>

        {/* Athlete Status — most important section */}
        <div className="mb-6">
          <AthleteStatusSection onOpenAthlete={onOpenAthlete} />
        </div>

        {/* Remaining widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TodaysAlertsSection />
            <TrainingScheduleSection />
          </div>
          <div className="space-y-6">
            <UpcomingCompetitionsSection />
          </div>
        </div>
      </div>
    </>
  );
}

function AthletesView({ onOpenAthlete }: { onOpenAthlete: (id: string) => void }) {
  return (
    <>
      <TopBar title="Athletes" subtitle="Squad Directory" searchPlaceholder="Search athletes..." />
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ATHLETES.map(a => <AthleteCard key={a.id} a={a} onOpen={() => onOpenAthlete(a.id)} />)}
        </div>
      </div>
    </>
  );
}

function AlertsView() {
  return (
    <>
      <TopBar title="Critical Updates" subtitle="Operational Status" searchPlaceholder="Search alerts..." />
      <div className="p-6 md:p-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-end gap-2 mb-4">
          <button className="h-9 px-3.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#363092] hover:text-[#363092] transition">Mark as Read</button>
          <button className="h-9 px-3.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-red-300 hover:text-red-500 transition">Dismiss All</button>
        </div>

        <div className="space-y-3">
          {ALERTS.map((al, i) => (
            <div key={i} className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 flex items-start gap-4" style={{ borderLeft: `4px solid ${al.tone}` }}>
              <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: al.bg }}>
                <al.icon className="h-5 w-5" style={{ color: al.tone }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-bold text-gray-900">{al.name}</div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-gray-400">{al.time}</span>
                    <button className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#363092] hover:text-[#363092] transition">View Detail</button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{al.text}</p>
                <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: al.tagTone, background: al.tagBg }}>{al.tag}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <StatCard label="Alerts Today" value="4" note="" />
          <StatCard label="Avg Response" value="18m" note="" />
          <StatCard label="Resolved" value="92%" valueColor="#059669" note="" />
        </div>
      </div>
    </>
  );
}

function GaugeRing({ pct, color, size = 108, thickness = 9 }: { pct: number; color: string; size?: number; thickness?: number }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90" style={{ width: size, height: size }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF0F5" strokeWidth={thickness} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} />
    </svg>
  );
}

function WatchMetric({ icon: Icon, label, value, live, color = ACCENT }: { icon: typeof Activity; label: string; value: string; live?: boolean; color?: string }) {
  return (
    <div className="rounded-xl p-3.5" style={{ background: GRAY_BG }}>
      <div className="flex items-center justify-between mb-2">
        <div className="h-8 w-8 rounded-lg bg-white grid place-items-center">
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        {live && (
          <span className="flex items-center gap-1 text-[9px] font-bold uppercase" style={{ color: EMERALD }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: EMERALD }} /> Live
          </span>
        )}
      </div>
      <div className="text-base font-black text-gray-900 leading-none">{value}</div>
      <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">{label}</div>
    </div>
  );
}

function AthleteProfileDashboard({ athlete }: { athlete: Athlete }) {
  const rec = getRecommendation(athlete.readiness);
  const watch = getWatchData(athlete);
  const training = getTrainingRecovery(athlete);
  const perf = getPerformanceSummary(athlete);
  const sleep = getSleepRecovery(athlete);
  const schedule = getSchedule(athlete);
  const alerts = getAlerts(athlete);

  return (
    <div className="space-y-5">
      {/* AI Readiness gauge + recommendation */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 flex flex-wrap items-center gap-6">
        <div className="relative shrink-0" style={{ width: 108, height: 108 }}>
          <GaugeRing pct={athlete.readiness} color={ACCENT} />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900 leading-none">{athlete.readiness}</div>
              <div className="text-[9px] uppercase tracking-wider text-gray-400 mt-0.5">/ 100</div>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">AI Readiness Score</div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full mb-2" style={{ color: rec.color, background: rec.bg }}>
            <CheckCircle2 className="h-3.5 w-3.5" /> {rec.label} Today
          </span>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{athlete.insight}</p>
        </div>
      </div>

      {/* Watch Data (Live) */}
      <Panel title="Watch Data (Live)" action={<span className="text-[10px] text-gray-400">Battery {watch.battery}</span>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <WatchMetric icon={HeartPulse} label="Heart Rate" value={watch.heartRate} live={watch.live} color={RED} />
          <WatchMetric icon={Activity} label="Resting HR" value={watch.restingHr} live={watch.live} />
          <WatchMetric icon={Sparkles} label="SpO2" value={watch.spo2} live={watch.live} color={MH_BLUE} />
          <WatchMetric icon={Zap} label="HRV" value={watch.hrv} live={watch.live} color={EMERALD} />
          <WatchMetric icon={Info} label="Body Temp" value={watch.bodyTemp} live={watch.live} />
          <WatchMetric icon={AlertTriangle} label="Stress Level" value={watch.stress} live={watch.live} color={SAFFRON} />
          <WatchMetric icon={TrendingUp} label="Steps" value={watch.steps} live={watch.live} />
          <WatchMetric icon={Dumbbell} label="Calories Burned" value={watch.calories} live={watch.live} />
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Training & Recovery */}
        <Panel title="Training & Recovery">
          <div className="text-sm font-bold text-gray-900 mb-3">{training.session}</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Training Load</div>
              <div className="text-lg font-black" style={{ color: ACCENT }}>{training.load}%</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Session Duration</div>
              <div className="text-lg font-black text-gray-900">{training.sessionDuration}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Recovery Time</div>
              <div className="text-lg font-black text-gray-900">{training.recoveryTime}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Muscle Fatigue</div>
              <div className="text-lg font-black text-gray-900">{training.muscleFatigue}</div>
            </div>
          </div>
          <div className="rounded-xl p-3 text-xs text-gray-600 italic leading-relaxed flex gap-2" style={{ background: GRAY_BG }}>
            <Sparkles className="h-4 w-4 shrink-0" style={{ color: MH_BLUE }} /> "{training.aiRecommendation}"
          </div>
        </Panel>

        {/* Sleep & Recovery */}
        <Panel title="Sleep & Recovery">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0" style={{ width: 84, height: 84 }}>
              <GaugeRing pct={sleep.recoveryScore} color={EMERALD} size={84} thickness={7} />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-lg font-black text-gray-900 leading-none">{sleep.recoveryScore}</div>
                  <div className="text-[8px] uppercase tracking-wider text-gray-400 mt-0.5">Recovery</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 flex-1 text-xs">
              <div><span className="text-gray-400">Sleep Score</span><div className="font-bold text-gray-900">{sleep.sleepScore} / 100</div></div>
              <div><span className="text-gray-400">Duration</span><div className="font-bold text-gray-900">{sleep.duration}</div></div>
              <div><span className="text-gray-400">Deep Sleep</span><div className="font-bold text-gray-900">{sleep.deepSleep}</div></div>
              <div><span className="text-gray-400">REM Sleep</span><div className="font-bold text-gray-900">{sleep.remSleep}</div></div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Performance Summary */}
      <Panel title="Performance Summary">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          {[
            ["Avg Speed", perf.avgSpeed], ["Top Speed", perf.topSpeed], ["Sprints", perf.sprintCount],
            ["Best Timing", perf.bestTiming], ["Jump Height", perf.jumpHeight],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl p-3" style={{ background: GRAY_BG }}>
              <div className="text-sm font-black text-gray-900">{value}</div>
              <div className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={perf.trend} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[40, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke={ACCENT} strokeWidth={2.5} dot={{ r: 3, fill: ACCENT }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Upcoming Schedule */}
        <Panel title="Upcoming Schedule">
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl p-3" style={{ background: GRAY_BG }}>
              <div className="h-9 w-9 rounded-lg bg-white grid place-items-center shrink-0"><CalendarDays className="h-4 w-4" style={{ color: ACCENT }} /></div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900">{schedule.nextSession.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{schedule.nextSession.date} &middot; {schedule.nextSession.time}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl p-3" style={{ background: GRAY_BG }}>
              <div className="h-9 w-9 rounded-lg bg-white grid place-items-center shrink-0"><Trophy className="h-4 w-4" style={{ color: SAFFRON }} /></div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900">{schedule.nextCompetition.name}</div>
                <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2 flex-wrap">
                  <span>{schedule.nextCompetition.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {schedule.nextCompetition.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        {/* AI Alerts */}
        <Panel title="AI Alerts">
          {alerts.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-gray-400 py-4 justify-center">
              <CheckCircle2 className="h-4 w-4" style={{ color: EMERALD }} /> No active alerts
            </div>
          ) : (
            <div className="space-y-2.5">
              {alerts.map((al, i) => (
                <div key={i} className="rounded-xl p-3 flex items-start gap-3" style={{ background: `${al.color}0D`, borderLeft: `3px solid ${al.color}` }}>
                  <al.icon className="h-4 w-4 shrink-0 mt-0.5" style={{ color: al.color }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-gray-800 leading-snug">{al.text}</span>
                      <span className="shrink-0 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full" style={{ color: al.color, background: "#fff" }}>{al.priority}</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1">{al.action}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}

type SentGuidance = { text: string; time: string };

function CoachGuidancePanel({ athlete }: { athlete: Athlete }) {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<SentGuidance[]>([]);
  const [generating, setGenerating] = useState(false);

  function handleGenerate() {
    setGenerating(true);
    // Simulated AI drafting delay — swap for a real model call when available.
    setTimeout(() => {
      setDraft(generateAiFoodTip(athlete));
      setGenerating(false);
    }, 500);
  }

  function handleSend() {
    if (!draft.trim()) return;
    setSent(prev => [{ text: draft.trim(), time: "Just now" }, ...prev]);
    setDraft("");
  }

  return (
    <Panel
      title="Coach Guidance — Food Plan Tips"
      action={
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="h-8 px-3 rounded-lg text-xs font-semibold text-white inline-flex items-center gap-1.5 disabled:opacity-60"
          style={{ background: MH_BLUE }}
        >
          <Wand2 className="h-3.5 w-3.5" /> {generating ? "Generating…" : "Generate AI Tip"}
        </button>
      }
    >
      <textarea
        value={draft}
        onChange={e => setDraft(e.target.value)}
        placeholder="Write a nutrition tip, or click Generate AI Tip to draft one from this athlete's live macro & hydration data…"
        rows={4}
        className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-700 outline-none focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/10 transition resize-none"
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-[11px] text-gray-400">Reviewed by you before it reaches {athlete.nameEn.split(" ")[0]}</span>
        <button
          onClick={handleSend}
          disabled={!draft.trim()}
          className="h-9 px-4 rounded-lg text-white text-xs font-semibold inline-flex items-center gap-1.5 disabled:opacity-40"
          style={{ background: ACCENT }}
        >
          <Send className="h-3.5 w-3.5" /> Send to Athlete
        </button>
      </div>

      {sent.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Sent Guidance</div>
          <div className="space-y-2.5">
            {sent.map((s, i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: GRAY_BG }}>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 mb-1">
                  <Clock className="h-3 w-3" /> {s.time}
                </div>
                <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Panel>
  );
}

function AthleteDetailView({ athlete, onBack }: { athlete: Athlete; onBack: () => void }) {
  const [tab, setTab] = useState<DetailTab>("readiness");

  return (
    <>
      <div className="h-16 border-b border-gray-200 bg-white flex items-center px-6 gap-4 sticky top-0 z-10">
        <button onClick={onBack} className="h-9 px-3 rounded-lg border border-gray-200 flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:border-[#363092] hover:text-[#363092] transition">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        <h1 className="text-lg font-black text-gray-900">Athlete Detail</h1>
        <div className="ml-auto flex items-center gap-3">
          <button className="relative h-9 w-9 rounded-lg border border-gray-200 grid place-items-center text-gray-500 hover:border-[#363092] hover:text-[#363092] transition">
            <Bell className="h-4 w-4" />
          </button>
          <div className="h-9 w-9 rounded-lg border border-gray-200 grid place-items-center text-gray-500"><UserCircle2 className="h-5 w-5" /></div>
        </div>
      </div>

      <div className="p-6 md:p-8 max-w-6xl mx-auto w-full">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-start gap-5">
            <div className="relative shrink-0">
              <Avatar name={athlete.nameEn} photo={athlete.photo} size={84} />
              <span
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1"
                style={{ background: athlete.online ? EMERALD : "#94A3B8" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" /> {athlete.online ? "ONLINE" : "OFFLINE"}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md" style={{ color: ACCENT, background: "#eeeefa" }}>{athlete.tier}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-gray-100 text-gray-500">{athlete.sport} &middot; {athlete.role}</span>
                <span className="text-[10px] font-mono text-gray-400">{athlete.code}</span>
              </div>
              <h2 className="text-xl font-black text-gray-900">{athlete.nameEn}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{athlete.event}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-xs text-gray-500">
                <span>{athlete.age} yrs &middot; {athlete.gender}</span>
                <span>{athlete.heightCm} cm &middot; {athlete.weightKg} kg</span>
                <span>District: {athlete.district}</span>
                <span>Academy: {athlete.academy}</span>
                <span>Coach: Coach Sanjay Kadam</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <button className="h-10 px-4 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 flex items-center gap-1.5 hover:border-[#363092] hover:text-[#363092] transition">
                  <Share2 className="h-3.5 w-3.5" /> Export Data
                </button>
                <button className="h-10 w-10 rounded-lg border border-gray-200 grid place-items-center text-gray-500 hover:border-[#363092] hover:text-[#363092] transition">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[11px] text-gray-400">Session Load Rank: {athlete.rank} &middot; Last Synced: {athlete.synced}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-5 pt-4 border-t border-gray-100">
            {([
              ["readiness", "Readiness", Zap],
              ["nutrition", "Nutrition", Utensils],
              ["fitness", "Fitness Plan", Dumbbell],
            ] as const).map(([id, label, Icon]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 pb-2 text-sm font-semibold border-b-2 transition ${tab === id ? "text-gray-900" : "text-gray-400 hover:text-gray-600 border-transparent"}`}
                style={tab === id ? { color: ACCENT, borderColor: ACCENT } : {}}
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </button>
            ))}
          </div>
        </div>

        {tab === "readiness" && <AthleteProfileDashboard athlete={athlete} />}

        {tab === "nutrition" && (
          <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Daily Targets</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-gray-900">{athlete.daily.kcal}</span>
                <span className="text-xs text-gray-400 font-semibold">kcal</span>
              </div>
              {([
                ["Protein", athlete.daily.protein],
                ["Carbs", athlete.daily.carbs],
                ["Fats", athlete.daily.fats],
              ] as const).map(([label, [cur, goal]]) => (
                <div key={label} className="mb-3 last:mb-0">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-600 mb-1">
                    <span>{label}</span><span className="text-gray-400">{cur}g / {goal}g</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(cur / goal) * 100}%`, background: ACCENT }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Optimized Meal Timing</div>
                <div className="grid grid-cols-2 gap-3">
                  {athlete.meals.map(m => (
                    <div key={m.time} className="rounded-xl bg-[#f4f5fb] p-3">
                      <div className="text-sm font-bold" style={{ color: ACCENT }}>{m.time} <span className="text-gray-900 font-semibold">{m.label}</span></div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 flex items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Hydration Target</div>
                  <div className="text-xl font-black" style={{ color: ACCENT }}>{athlete.hydration.target}</div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{athlete.hydration.note}</p>
                </div>
                <div className="relative h-16 w-16 shrink-0 rounded-full grid place-items-center" style={{ background: `conic-gradient(${ACCENT} ${athlete.hydration.pct * 3.6}deg, #eeeefa 0deg)` }}>
                  <div className="h-12 w-12 rounded-full bg-white grid place-items-center text-[11px] font-bold text-gray-700">{athlete.hydration.pct}%</div>
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 flex gap-3">
                <Sparkles className="h-4 w-4 shrink-0 mt-0.5" style={{ color: MH_BLUE }} />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: MH_BLUE }}>AI Nutrition Recommendation</div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {athlete.hydration.pct < 65
                      ? `Hydration is trending low at ${athlete.hydration.pct}%. Prioritize fluids before the next session and add electrolytes.`
                      : `Macros on track for today's ${athlete.role.toLowerCase()} session. Maintain current protein and carb timing around training windows.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CoachGuidancePanel athlete={athlete} />
          </div>
          </>
        )}

        {tab === "fitness" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Today's Load Adjustment</div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-black" style={{ color: ACCENT }}>{athlete.loadAdjustment.pct}%</span>
                  <span className="text-xs text-gray-400 font-semibold">Target Intensity</span>
                </div>
                <div className="rounded-xl bg-[#f4f5fb] p-3 text-sm text-gray-600 italic leading-relaxed">"{athlete.loadAdjustment.note}"</div>
              </div>
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Mobility Focus Area</div>
                <div className="text-xl font-black text-gray-900 mb-2">{athlete.mobility.area}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{athlete.mobility.note}</p>
                <div className="flex gap-2 mt-3">
                  {athlete.mobility.tags.map(tg => (
                    <span key={tg} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-gray-100 text-gray-500">{tg}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Personalized Drill List</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Lateral Power Bounds", desc: "3 Sets x 8 Reps. Focus on ground contact time < 0.2s." },
                  { name: "Iso-Single Leg Holds", desc: "4 Sets x 30s. Focus on ankle stability and core brace." },
                  { name: "Clean Pull (De-loaded)", desc: "5 Sets x 3 Reps @ 40kg. Focus on triple extension speed." },
                ].map(d => (
                  <div key={d.name} className="rounded-xl overflow-hidden border border-gray-100">
                    <div className="h-24 grid place-items-center" style={{ background: "linear-gradient(135deg,#363092,#1e2a7a)" }}>
                      <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-bold text-gray-900">{d.name}</div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function CoachDashboard({ onLogout }: { onLogout: () => void }) {
  const [view, setView] = useState<View>("dashboard");
  const [athleteId, setAthleteId] = useState<string | null>(null);

  function openAthlete(id: string) {
    setAthleteId(id);
    setView("athlete-detail");
  }

  const athlete = ATHLETES.find(a => a.id === athleteId) ?? ATHLETES[0];

  return (
    <div className="min-h-screen flex" style={{ background: "#f4f5fb" }}>
      <Sidebar view={view} setView={(v) => { setView(v); if (v !== "athlete-detail") setAthleteId(null); }} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        {view === "dashboard" && <DashboardView onNavigate={setView} onOpenAthlete={openAthlete} />}
        {view === "athletes" && <AthletesView onOpenAthlete={openAthlete} />}
        {view === "alerts" && <AlertsView />}
        {view === "athlete-detail" && <AthleteDetailView athlete={athlete} onBack={() => setView("athletes")} />}
      </div>
    </div>
  );
}

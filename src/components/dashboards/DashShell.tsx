import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import indiaEmblem from "@/assets/india-emblem.png";
import mhSeal from "@/assets/mh-seal.png";

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1400, decimals = 2) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setVal(parseFloat((target * ease).toFixed(decimals)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, decimals]);

  return { ref, val };
}

/* ── KPI Card — new design matching screenshot ── */
const KPI_STYLES: Record<string, { icon: string; iconBg: string; accent: string; subtitleColor: string }> = {
  indigo: { icon: "📋", iconBg: "rgba(54,48,146,0.12)", accent: "#363092", subtitleColor: "#363092" },
  orange: { icon: "🏆", iconBg: "rgba(255,107,53,0.12)", accent: "#FF6B35", subtitleColor: "#FF6B35" },
  teal:   { icon: "🏗️", iconBg: "rgba(13,148,136,0.12)", accent: "#0d9488", subtitleColor: "#0d9488" },
  violet: { icon: "📈", iconBg: "rgba(124,58,237,0.12)", accent: "#7c3aed", subtitleColor: "#7c3aed" },
  red:    { icon: "⚠️", iconBg: "rgba(220,38,38,0.12)", accent: "#dc2626",  subtitleColor: "#dc2626" },
  amber:  { icon: "⭐", iconBg: "rgba(217,119,6,0.12)",  accent: "#d97706",  subtitleColor: "#d97706" },
  green:  { icon: "✅", iconBg: "rgba(22,163,74,0.12)",  accent: "#16a34a",  subtitleColor: "#16a34a" },
};

export function Kpi({
  label, value, sub, tone = "indigo", icon: IconComp, numeric, prefix = "", suffix = "",
}: {
  label: string; value: string; sub?: string; tone?: string;
  icon?: React.ElementType; numeric?: number; prefix?: string; suffix?: string;
}) {
  const style = KPI_STYLES[tone] ?? KPI_STYLES.indigo;
  const { ref, val } = useCountUp(numeric ?? 0, 1600, 2);

  const displayValue = numeric !== undefined
    ? `${prefix}${val.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${suffix}`
    : value;

  return (
    <div ref={ref as React.Ref<HTMLDivElement>}
      className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 90% 10%, ${style.accent}08 0%, transparent 70%)` }} />

      {/* Left: label + value + sub */}
      <div className="flex-1 min-w-0 relative">
        <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-gray-400 leading-none mb-2">{label}</div>
        <div className="text-2xl md:text-3xl font-black text-gray-900 leading-none tracking-tight">
          {displayValue}
        </div>
        {sub && (
          <div className="text-xs font-semibold mt-1.5" style={{ color: style.subtitleColor }}>{sub}</div>
        )}
      </div>

      {/* Right: icon badge */}
      <div className="h-14 w-14 rounded-2xl grid place-items-center shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: style.iconBg }}>
        {IconComp
          ? <IconComp className="h-6 w-6" style={{ color: style.accent }} />
          : <span className="text-2xl">{style.icon}</span>
        }
      </div>
    </div>
  );
}

/* ── Animated progress bar ── */
export function AnimBar({ value, color, label }: { value: number; color: string; label: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth(value), 100); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className="font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: color }} />
      </div>
    </div>
  );
}

/* ── Animated donut chart (pure CSS) ── */
export function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setAnimated(true), 200); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const total = segments.reduce((s, x) => s + x.value, 0);
  let cumulative = 0;
  const r = 60, cx = 80, cy = 80, stroke = 22;
  const circumference = 2 * Math.PI * r;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative">
        <svg width={160} height={160} className="-rotate-90">
          {/* Track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
          {segments.map((seg, i) => {
            const pct = seg.value / total;
            const dashArray = `${circumference * (animated ? pct : 0)} ${circumference}`;
            const offset = -circumference * (cumulative / total);
            cumulative += seg.value;
            return (
              <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                stroke={seg.color} strokeWidth={stroke}
                strokeDasharray={dashArray}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: `stroke-dasharray 1.2s ease ${i * 200}ms` }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-lg font-black text-gray-900">{total}%</div>
          <div className="text-[10px] text-gray-400 font-semibold">Total</div>
        </div>
      </div>
      <div className="mt-3 space-y-1.5 w-full">
        {segments.map(s => (
          <div key={s.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
              <span className="text-gray-600 font-medium">{s.label}</span>
            </div>
            <span className="font-bold" style={{ color: s.color }}>{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Scheme row ── */
export function SchemeRow({ name, code, fy, amount, allocated, icon: IconComp, tone = "indigo" }: {
  name: string; code: string; fy: string; amount: string;
  allocated: string; icon?: React.ElementType; tone?: string;
}) {
  const style = KPI_STYLES[tone] ?? KPI_STYLES.indigo;
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-gray-200 hover:shadow-sm transition group">
      <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: style.iconBg }}>
        {IconComp
          ? <IconComp className="h-5 w-5" style={{ color: style.accent }} />
          : <span className="text-lg">{style.icon}</span>
        }
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-gray-900 leading-snug">{name}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
            style={{ borderColor: style.accent + "40", color: style.accent, background: style.iconBg }}>{fy}</span>
        </div>
        <div className="text-[11px] text-gray-400 mt-0.5">Scheme Code: {code}</div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-base font-black text-gray-900">{amount}</div>
        <div className="text-[11px] font-semibold mt-0.5 flex items-center gap-1 justify-end" style={{ color: style.accent }}>
          <span className="h-1.5 w-1.5 rounded-full inline-block" style={{ background: style.accent }} />
          {allocated}
        </div>
      </div>
    </div>
  );
}

/* ── Panel ── */
export function Panel({ title, action, badge, children, className = "" }: {
  title: string; action?: ReactNode; badge?: string; children: ReactNode; className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-white border border-gray-100 shadow-sm p-5 ${className}`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900 text-base">{title}</h3>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#363092]/8 text-[#363092] tracking-wide">{badge}</span>
          )}
          {action}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── Header ── */
export function DashHeader({ title, subtitle, updated, right }: {
  title: string; subtitle?: string; updated?: string; right?: ReactNode;
}) {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container-page py-4 flex flex-wrap items-center gap-4">
        <img src={indiaEmblem} alt="" className="h-11 w-11 object-contain" />
        <div className="flex-1 min-w-[240px]">
          <h1 className="text-lg font-black text-gray-900 leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          {updated && <p className="text-[11px] text-gray-300 mt-0.5">Last updated: {updated}</p>}
        </div>
        <div className="flex items-center gap-3">
          {right}
          <img src={mhSeal} alt="" className="h-11 w-auto object-contain" />
        </div>
      </div>
    </div>
  );
}

/* ── Footer ── */
export function DashFooter({ note }: { note: string }) {
  return (
    <div className="container-page py-5 text-[11px] text-gray-400 flex flex-wrap justify-between gap-2 border-t border-gray-100 mt-6">
      <span>{note}</span>
      <span>Data Source: Directorate of Sports & Youth Services, Government of Maharashtra</span>
    </div>
  );
}

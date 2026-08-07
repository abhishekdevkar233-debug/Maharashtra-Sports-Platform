import type { ReactNode } from "react";
import { LMS_COLORS } from "@/lib/lms-data";

export function LmsCard({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-[20px] bg-white border shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className}`}
      style={{ borderColor: LMS_COLORS.border, ...style }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-[13px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function ProgressBar({ value, color = LMS_COLORS.primary, track = "#EEF2F7", height = 8 }: { value: number; color?: string; track?: string; height?: number }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ background: track, height }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
      />
    </div>
  );
}

export function ProgressRing({ value, size = 64, stroke = 7, color = LMS_COLORS.primary, label }: { value: number; size?: number; stroke?: number; color?: string; label?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, value) / 100) * c;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EEF2F7" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-[13px] font-bold text-slate-900">{label ?? `${value}%`}</span>
      </div>
    </div>
  );
}

export function Pill({ children, color = LMS_COLORS.primary, bg }: { children: ReactNode; color?: string; bg?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ color, background: bg ?? `${color}18` }}
    >
      {children}
    </span>
  );
}

export function IconTile({ icon, color }: { icon: ReactNode; color: string }) {
  return (
    <div className="h-11 w-11 rounded-2xl grid place-items-center shrink-0" style={{ background: `${color}18`, color }}>
      {icon}
    </div>
  );
}

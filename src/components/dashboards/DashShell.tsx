import type { ReactNode } from "react";
import indiaEmblem from "@/assets/india-emblem.png";
import mhSeal from "@/assets/mh-seal.png";

export function DashHeader({ title, subtitle, updated, right }: { title: string; subtitle?: string; updated?: string; right?: ReactNode }) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container-page py-5 flex flex-wrap items-center gap-4">
        <img src={indiaEmblem} alt="" className="h-12 w-12 object-contain" />
        <div className="flex-1 min-w-[240px]">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {updated && <p className="text-[11px] text-gray-400 mt-0.5">Last updated: {updated}</p>}
        </div>
        <div className="flex items-center gap-3">
          {right}
          <img src={mhSeal} alt="" className="h-12 w-auto object-contain" />
        </div>
      </div>
    </div>
  );
}

export function Kpi({ label, value, sub, tone = "indigo" }: { label: string; value: string; sub?: string; tone?: "indigo" | "orange" | "teal" | "violet" | "red" | "amber" | "gray" }) {
  const colors: Record<string, string> = {
    indigo: "#363092", orange: "#FF6B35", teal: "#0d9488", violet: "#7c3aed",
    red: "#dc2626", amber: "#d97706", gray: "#6B7280",
  };
  const c = colors[tone];
  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-1 w-full" style={{ background: c }} />
      <div className="text-[11px] uppercase tracking-wider font-bold text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
      {sub && <div className="mt-1 text-xs" style={{ color: c }}>{sub}</div>}
    </div>
  );
}

export function Panel({ title, action, children, className = "" }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white border border-gray-200 p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

export function DashFooter({ note }: { note: string }) {
  return (
    <div className="container-page py-6 text-[11px] text-gray-500 flex flex-wrap justify-between gap-2 border-t border-gray-200 mt-8">
      <span>{note}</span>
      <span>Data Source: Directorate of Sports & Youth Services, Government of Maharashtra</span>
    </div>
  );
}

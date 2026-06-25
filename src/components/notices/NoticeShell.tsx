import type { ReactNode } from "react";
import { Search } from "lucide-react";

export function NoticeToolbar({ placeholder, children }: { placeholder: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input placeholder={placeholder} className="w-full h-11 pl-10 pr-3 rounded-lg border border-gray-300 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/20 outline-none text-sm" />
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <select className="h-11 px-3 rounded-lg border border-gray-300 text-sm bg-white focus:border-[#363092] outline-none min-w-[160px]">
      <option>{label}</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

export function Pagination() {
  return (
    <div className="mt-8 flex justify-center gap-1">
      {["‹", "1", "2", "3", "4", "›"].map((p, i) => (
        <button key={i} className={`min-w-9 h-9 px-3 rounded-md text-sm font-medium border ${p === "1" ? "bg-[#363092] text-white border-[#363092]" : "bg-white text-gray-700 border-gray-200 hover:border-[#363092]"}`}>{p}</button>
      ))}
    </div>
  );
}

export function Badge({ tone, children }: { tone: "indigo" | "green" | "orange" | "red" | "gray" | "amber"; children: ReactNode }) {
  const styles = {
    indigo: "bg-[#363092]/10 text-[#363092]",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-[#FF6B35]",
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-700",
    gray: "bg-gray-100 text-gray-600",
  }[tone];
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${styles}`}>{children}</span>;
}

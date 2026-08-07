import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ClipboardList, CheckCircle2, Clock3 } from "lucide-react";
import { LmsShell } from "@/components/lms/LmsShell";
import { LmsCard, SectionHeading, Pill, IconTile } from "@/components/lms/LmsUI";
import { ASSIGNMENTS, LMS_COLORS } from "@/lib/lms-data";

export const Route = createFileRoute("/lms/assignments")({
  head: () => ({ meta: [{ title: "Assignments — Athlete Learning Hub" }] }),
  component: Page,
});

const TABS = ["All", "Pending", "Submitted"] as const;

function Page() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return ASSIGNMENTS.filter((a) => {
      if (query && !a.title.toLowerCase().includes(query.toLowerCase()) && !a.subject.toLowerCase().includes(query.toLowerCase())) return false;
      if (tab === "Pending") return a.status === "pending";
      if (tab === "Submitted") return a.status === "submitted";
      return true;
    });
  }, [tab, query]);

  const pending = ASSIGNMENTS.filter((a) => a.status === "pending").length;
  const submitted = ASSIGNMENTS.filter((a) => a.status === "submitted").length;

  return (
    <LmsShell title="Assignments" subtitle="Track and submit your coursework across every subject">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <LmsCard className="p-4">
          <div className="text-xl font-extrabold text-slate-900">{ASSIGNMENTS.length}</div>
          <div className="text-[11.5px] text-slate-400">Total Assignments</div>
        </LmsCard>
        <LmsCard className="p-4">
          <div className="text-xl font-extrabold" style={{ color: LMS_COLORS.warning }}>{pending}</div>
          <div className="text-[11.5px] text-slate-400">Pending</div>
        </LmsCard>
        <LmsCard className="p-4">
          <div className="text-xl font-extrabold" style={{ color: LMS_COLORS.success }}>{submitted}</div>
          <div className="text-[11.5px] text-slate-400">Submitted</div>
        </LmsCard>
      </div>

      <LmsCard className="p-5 sm:p-6">
        <SectionHeading title="All Assignments" />
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold whitespace-nowrap transition"
                style={tab === t ? { background: "#fff", color: LMS_COLORS.primary, boxShadow: "0 1px 2px rgba(15,23,42,0.08)" } : { color: "#64748B" }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 w-full md:w-64">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search assignments…" className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📋</div>
            <div className="font-bold text-slate-700">No assignments found</div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((a) => (
              <div key={a.id} className="flex items-center gap-3.5 rounded-2xl border p-3.5" style={{ borderColor: LMS_COLORS.border }}>
                <IconTile icon={<ClipboardList className="h-4 w-4" />} color={a.status === "submitted" ? LMS_COLORS.success : LMS_COLORS.warning} />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 text-[13.5px] truncate">{a.title}</div>
                  <div className="text-[11.5px] text-slate-400 mt-0.5">{a.subject} · Due {a.due}</div>
                </div>
                {a.status === "submitted"
                  ? <Pill color={LMS_COLORS.success}><CheckCircle2 className="h-3 w-3" /> Submitted</Pill>
                  : <Pill color={LMS_COLORS.warning}><Clock3 className="h-3 w-3" /> Pending</Pill>}
              </div>
            ))}
          </div>
        )}
      </LmsCard>
    </LmsShell>
  );
}

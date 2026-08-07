import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, PlayCircle, FileText, Presentation, ClipboardList, Trash2, RotateCcw, HardDrive, CheckCircle2 } from "lucide-react";
import { LmsShell } from "@/components/lms/LmsShell";
import { LmsCard, SectionHeading, ProgressBar, Pill, IconTile } from "@/components/lms/LmsUI";
import { DOWNLOADS, LMS_COLORS } from "@/lib/lms-data";

export const Route = createFileRoute("/lms/downloads")({
  head: () => ({ meta: [{ title: "Downloads — Athlete LMS" }] }),
  component: Page,
});

const TYPES = ["All", "Video", "PDF", "Slides", "Assignment"] as const;
const TYPE_ICON: Record<string, typeof PlayCircle> = { Video: PlayCircle, PDF: FileText, Slides: Presentation, Assignment: ClipboardList };
const TYPE_COLOR: Record<string, string> = { Video: LMS_COLORS.primary, PDF: LMS_COLORS.danger, Slides: LMS_COLORS.warning, Assignment: LMS_COLORS.success };

function Page() {
  const [filter, setFilter] = useState<(typeof TYPES)[number]>("All");
  const [query, setQuery] = useState("");
  const usedGB = 1.4, totalGB = 4;

  const filtered = useMemo(() => {
    return DOWNLOADS.filter((d) => {
      if (filter !== "All" && d.type !== filter) return false;
      if (query && !d.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [filter, query]);

  return (
    <LmsShell title="Downloads" subtitle="Access your learning material offline, anywhere">
      {/* Storage usage */}
      <LmsCard className="p-5 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <IconTile icon={<HardDrive className="h-5 w-5" />} color={LMS_COLORS.primary} />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-semibold text-slate-700">Storage Used</span>
              <span className="text-[12.5px] text-slate-400">{usedGB} GB of {totalGB} GB</span>
            </div>
            <ProgressBar value={(usedGB / totalGB) * 100} />
          </div>
          <Pill color={LMS_COLORS.success}><CheckCircle2 className="h-3 w-3" /> All synced</Pill>
        </div>
      </LmsCard>

      <LmsCard className="p-5 sm:p-6">
        <SectionHeading title="Recent Downloads" subtitle={`${DOWNLOADS.length} items available offline`} />

        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 overflow-x-auto">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold whitespace-nowrap transition"
                style={filter === t ? { background: "#fff", color: LMS_COLORS.primary, boxShadow: "0 1px 2px rgba(15,23,42,0.08)" } : { color: "#64748B" }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 w-full md:w-64">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search downloads…" className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📥</div>
            <div className="font-bold text-slate-700">Nothing downloaded yet</div>
            <div className="text-sm text-slate-400 mt-1">Save lessons for offline access from My Learning.</div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((d) => {
              const Icon = TYPE_ICON[d.type];
              return (
                <div key={d.id} className="flex items-center gap-3.5 rounded-2xl border p-3.5" style={{ borderColor: LMS_COLORS.border }}>
                  <IconTile icon={<Icon className="h-[18px] w-[18px]" />} color={TYPE_COLOR[d.type]} />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-900 text-[13.5px] truncate">{d.title}</div>
                    <div className="text-[11.5px] text-slate-400 mt-0.5">{d.subject} · {d.size} · Downloaded {d.date}</div>
                  </div>
                  <Pill color={LMS_COLORS.success} bg={LMS_COLORS.successSoft}>Offline Ready</Pill>
                  <div className="hidden sm:flex items-center gap-1 shrink-0">
                    <button className="p-2 rounded-lg hover:bg-slate-100" aria-label="Re-download">
                      <RotateCcw className="h-4 w-4 text-slate-400" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50" aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </LmsCard>
    </LmsShell>
  );
}

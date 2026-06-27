import { useState, type ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight, Upload } from "lucide-react";

export type Step = { title: string; subtitle?: string; content: ReactNode };

export function Field({ label, children, required, hint, full }: { label: string; children: ReactNode; required?: boolean; hint?: string; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1.5">
        {label} {required && <span className="text-[#FF6B35]">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-gray-500">{hint}</p>}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/15 outline-none text-sm bg-white" />;
}
export function Select({ options, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
  return (
    <select {...rest} className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-[#363092] outline-none text-sm bg-white">
      <option value="">Select…</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...props} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/15 outline-none text-sm bg-white" />;
}
export function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

export function UploadCard({ title, note }: { title: string; note?: string }) {
  return (
    <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#363092] hover:bg-[#363092]/5 cursor-pointer transition">
      <div className="h-9 w-9 rounded-lg bg-[#363092]/10 text-[#363092] grid place-items-center shrink-0">
        <Upload className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-[11px] text-gray-400 mt-0.5">{note || "PDF / JPG / PNG · Max 5 MB"}</div>
      </div>
      <input type="file" className="hidden" />
    </label>
  );
}

export function ReviewBlock({ title, rows }: { title: string; rows: Array<[string, string]> }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="text-[11px] uppercase tracking-wider font-bold text-[#363092] mb-3">{title}</div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3">
            <dt className="text-gray-500">{k}</dt>
            <dd className="font-semibold text-gray-900 text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}


export function MultiStepForm({
  eyebrow, title, subtitle, steps,
}: {
  eyebrow: string; title: string; subtitle: string;
  steps: Step[];
  eligibility?: string[];
  faqs?: Array<{ q: string; a: string }>;
}) {
  const [active, setActive] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const total = steps.length;

  const n = total;
  const edgePct = 100 / (2 * n);
  const trackWidth = 100 - 2 * edgePct;
  const filledWidth = active === 0 ? 0 : (active / (n - 1)) * trackWidth;

  if (submitted) return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-green-200 bg-green-50 p-10 text-center shadow-sm">
        <div className="h-16 w-16 rounded-full bg-green-100 grid place-items-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-xl font-black text-gray-900">Application Submitted!</h2>
        <p className="mt-2 text-sm text-gray-500">Your <span className="font-semibold text-[#363092]">{title}</span> has been received. You will be notified via SMS and email after verification.</p>
        <div className="mt-5 bg-white rounded-xl border border-gray-200 p-4 text-left">
          {[["Application ID", `REG-2026-${Math.floor(100000 + Math.random() * 900000)}`], ["Type", eyebrow], ["Status", "Under Review"]].map(([l, v]) => (
            <div key={l} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-xs text-gray-500">{l}</span>
              <span className="text-sm font-semibold text-gray-900">{v}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { setActive(0); setSubmitted(false); }}
          className="mt-5 px-6 py-2.5 rounded-xl bg-[#363092] text-white font-bold text-sm hover:bg-[#2a2470] transition">
          Start New Application
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f5f6fa] min-h-[calc(100vh-64px)] py-6" style={{ paddingInline: "1.25rem" }}>
      <div style={{ maxWidth: 1200, marginInline: "auto" }}>
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">

          {/* ── Compact header strip ───────────────────────── */}
          <div className="px-8 py-4" style={{ background: "linear-gradient(135deg,#363092 0%,#1e2a7a 100%)" }}>
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">{eyebrow}</p>
            <h2 className="text-base font-bold text-white mt-0.5 leading-snug">{title}</h2>
            <p className="text-xs text-white/60 mt-0.5 leading-relaxed">{subtitle}</p>
          </div>

          {/* ── Step progress bar ──────────────────────────── */}
          <div className="px-8 pt-6 pb-4 bg-white border-b border-gray-100">
            <div className="relative flex items-start">
              {/* track lines sit between circle centers */}
              <div className="absolute h-0.5 bg-gray-200"
                style={{ top: 16, left: `${edgePct}%`, width: `${trackWidth}%` }} />
              <div className="absolute h-0.5 bg-[#363092] transition-all duration-500"
                style={{ top: 16, left: `${edgePct}%`, width: `${filledWidth}%` }} />

              {steps.map((s, i) => {
                const done = i < active, current = i === active;
                return (
                  <div key={s.title} className="relative z-10 flex flex-col items-center flex-1 min-w-0 gap-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all duration-300 ${
                      done    ? "bg-[#363092] border-[#363092] text-white"
                      : current ? "bg-white border-[#363092] text-[#363092] shadow-sm"
                      : "bg-white border-gray-300 text-gray-400"
                    }`}>
                      {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </div>
                    <span className={`text-[11px] font-semibold text-center leading-tight transition-colors ${
                      current ? "text-[#363092]" : done ? "text-gray-600" : "text-gray-400"
                    }`}>{s.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Step body ─────────────────────────────────── */}
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">{steps[active].title}</h3>
              {steps[active].subtitle && <p className="text-xs text-gray-500 mt-0.5">{steps[active].subtitle}</p>}
            </div>
            {steps[active].content}

            {/* Navigation */}
            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <button
                disabled={active === 0}
                onClick={() => setActive(a => Math.max(0, a - 1))}
                className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#363092] hover:text-[#363092] transition disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <span className="text-xs text-gray-400">Step {active + 1} of {total}</span>
              {active < total - 1 ? (
                <button onClick={() => setActive(a => Math.min(total - 1, a + 1))}
                  className="inline-flex items-center gap-1.5 px-5 h-9 rounded-lg text-white text-sm font-semibold hover:bg-[#2a2470] transition"
                  style={{ background: "#363092" }}>
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={() => setSubmitted(true)}
                  className="inline-flex items-center gap-1.5 px-5 h-9 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition"
                  style={{ background: "#FF6B35" }}>
                  Submit <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

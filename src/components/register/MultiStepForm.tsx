import { useState, type ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight, Upload, ShieldCheck, HelpCircle } from "lucide-react";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";

export type Step = { title: string; subtitle?: string; content: ReactNode };

export function Field({ label, children, required, hint, full }: { label: string; children: ReactNode; required?: boolean; hint?: string; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
        {label} {required && <span className="text-[#FF6B35]">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-[11px] text-gray-500">{hint}</p>}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/20 outline-none text-sm bg-white" />;
}
export function Select({ options, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
  return (
    <select {...rest} className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:border-[#363092] outline-none text-sm bg-white">
      <option value="">Select…</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...props} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/20 outline-none text-sm bg-white" />;
}
export function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>;
}

export function UploadCard({ title, note }: { title: string; note?: string }) {
  return (
    <label className="flex flex-col gap-2 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#363092] hover:bg-[#363092]/5 cursor-pointer transition">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-[#363092]/10 text-[#363092] grid place-items-center">
          <Upload className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-900">{title}</div>
          <div className="text-[11px] text-gray-500">{note || "PDF / JPG / PNG · Max 5 MB"}</div>
        </div>
      </div>
      <input type="file" className="hidden" />
    </label>
  );
}

export function ReviewBlock({ title, rows }: { title: string; rows: Array<[string, string]> }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="text-xs uppercase tracking-wider font-bold text-[#363092]">{title}</div>
      <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 border-b border-dashed border-gray-100 py-1">
            <dt className="text-gray-500">{k}</dt><dd className="font-medium text-gray-900 text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Stepper({ steps, active }: { steps: Step[]; active: number }) {
  const n = steps.length;
  // Each step occupies 100/n % of the width.
  // Circle center sits at (100/(2n))% from each edge.
  const edgePct = 100 / (2 * n);
  const trackWidth = 100 - 2 * edgePct; // space between first and last circle centers
  const filledWidth = active === 0 ? 0 : (active / (n - 1)) * trackWidth;

  return (
    <div className="relative flex items-start pb-2">
      {/* Gray background track — only between first and last circle centers */}
      <div
        className="absolute top-[17px] h-0.5 bg-gray-200 z-0"
        style={{ left: `${edgePct}%`, width: `${trackWidth}%` }}
      />
      {/* Filled navy track */}
      <div
        className="absolute top-[17px] h-0.5 z-0 transition-all duration-500"
        style={{ left: `${edgePct}%`, width: `${filledWidth}%`, background: "#363092" }}
      />

      {steps.map((s, i) => {
        const done = i < active, current = i === active;
        return (
          <div key={s.title} className="relative z-10 flex flex-col items-center flex-1 min-w-0">
            <div className={`h-9 w-9 rounded-full grid place-items-center text-xs font-bold border-2 transition-all duration-300 ${
              done    ? "bg-[#363092] border-[#363092] text-white"
              : current ? "bg-white border-[#363092] text-[#363092]"
              : "bg-white border-gray-300 text-gray-400"
            }`}>
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <div className={`mt-2 text-[11px] font-semibold text-center leading-tight px-1 transition-colors ${
              current ? "text-[#363092]" : done ? "text-gray-700" : "text-gray-400"
            }`}>
              {s.title}
            </div>
          </div>
        );
      })}
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
    <SectionWrap>
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-12 text-center shadow-sm">
          <div className="h-20 w-20 rounded-full bg-green-100 grid place-items-center mx-auto mb-5 shadow">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Application Submitted!</h2>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Your <span className="font-semibold text-[#363092]">{title}</span> has been received. You will be notified via SMS and email after verification.
          </p>
          <div className="mt-6 max-w-sm mx-auto bg-white rounded-xl border border-gray-200 p-5 text-left">
            {[["Application ID", `REG-2026-${Math.floor(100000 + Math.random() * 900000)}`], ["Type", eyebrow], ["Status", "Under Review"]].map(([l, v]) => (
              <div key={l} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-500">{l}</span>
                <span className="text-sm font-semibold text-gray-900">{v}</span>
              </div>
            ))}
          </div>
          <button onClick={() => { setActive(0); setSubmitted(false); }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#363092] text-white font-bold text-sm hover:bg-[#2a2470] transition">
            Start New Application
          </button>
        </div>
      </div>
    </SectionWrap>
  );

  return (
    <SectionWrap>
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-[#363092]/20 bg-white overflow-hidden shadow-sm">

          {/* Navy Gradient Header */}
          <div className="p-6 md:p-8" style={{ background: "linear-gradient(135deg,#363092,#1a1464)" }}>
            <p className="text-xs text-white/60 uppercase tracking-widest font-bold">{eyebrow}</p>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1 leading-snug">{title}</h2>
            <p className="text-sm text-white/70 mt-1.5 leading-relaxed">{subtitle}</p>
            {/* Mini process indicators */}
            <div className="mt-5 flex flex-wrap gap-3">
              {["Register", "Verify", "Approval", "Account Creation"].map((s, i) => (
                <div key={s} className="flex items-center gap-1.5 text-white/80">
                  <span className="h-6 w-6 rounded-full bg-white/15 grid place-items-center text-[10px] font-bold shrink-0">{i + 1}</span>
                  <span className="text-xs font-medium">{s}</span>
                  {i < 3 && <ChevronRight className="h-3.5 w-3.5 text-white/30" />}
                </div>
              ))}
            </div>
          </div>

          {/* Stepper strip */}
          <div className="px-6 md:px-8 pt-7 pb-3 bg-gray-50 border-b border-gray-100">
            <div className="relative flex">
              <div className="absolute top-[17px] h-0.5 bg-gray-200"
                style={{ left: `${edgePct}%`, width: `${trackWidth}%` }} />
              <div className="absolute top-[17px] h-0.5 bg-[#363092] transition-all duration-500"
                style={{ left: `${edgePct}%`, width: `${filledWidth}%` }} />
              {steps.map((s, i) => {
                const done = i < active, current = i === active;
                return (
                  <div key={s.title} className="relative z-10 flex flex-col items-center flex-1 min-w-0">
                    <div className={`h-9 w-9 rounded-full grid place-items-center text-xs font-bold border-2 transition-all duration-300 ${
                      done ? "bg-[#363092] border-[#363092] text-white"
                      : current ? "bg-white border-[#363092] text-[#363092]"
                      : "bg-white border-gray-300 text-gray-400"
                    }`}>
                      {done ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <span className={`mt-1.5 text-[10px] font-semibold text-center leading-tight px-1 transition-colors ${
                      current ? "text-[#363092]" : done ? "text-gray-700" : "text-gray-400"
                    }`}>{s.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Body */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{steps[active].title}</h3>
            {steps[active].subtitle && <p className="text-sm text-gray-500 mb-4">{steps[active].subtitle}</p>}
            <div className="mt-4">{steps[active].content}</div>

            {/* Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <button
                disabled={active === 0}
                onClick={() => setActive(a => Math.max(0, a - 1))}
                className="inline-flex items-center gap-1.5 px-5 h-10 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#363092] hover:text-[#363092] transition disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <span className="text-xs text-gray-400">Step {active + 1} of {total}</span>
              {active < total - 1 ? (
                <button onClick={() => setActive(a => Math.min(total - 1, a + 1))}
                  className="inline-flex items-center gap-1.5 px-6 h-10 rounded-xl text-white text-sm font-semibold hover:bg-[#2a2470] transition"
                  style={{ background: "#363092" }}>
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={() => setSubmitted(true)}
                  className="inline-flex items-center gap-1.5 px-6 h-10 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition"
                  style={{ background: "#FF6B35" }}>
                  Submit Application <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </SectionWrap>
  );
}

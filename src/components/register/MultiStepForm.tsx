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
  return (
    <ol className="flex items-start gap-2 overflow-x-auto pb-2">
      {steps.map((s, i) => {
        const done = i < active, current = i === active;
        return (
          <li key={s.title} className="flex items-start gap-2 min-w-0 flex-1">
            <div className="flex flex-col items-center min-w-0">
              <div className={`h-9 w-9 rounded-full grid place-items-center text-xs font-bold shrink-0 ${done ? "bg-[#363092] text-white" : current ? "bg-white text-[#363092] ring-2 ring-[#363092]" : "bg-gray-100 text-gray-400"}`}>
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <div className={`mt-1.5 text-[11px] font-semibold text-center leading-tight max-w-[88px] truncate ${current || done ? "text-gray-900" : "text-gray-400"}`}>{s.title}</div>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mt-4 ${done ? "bg-[#363092]" : "bg-gray-200"}`} />}
          </li>
        );
      })}
    </ol>
  );
}

export function MultiStepForm({
  eyebrow, title, subtitle, steps, eligibility, faqs,
}: {
  eyebrow: string; title: string; subtitle: string;
  steps: Step[];
  eligibility: string[];
  faqs: Array<{ q: string; a: string }>;
}) {
  const [active, setActive] = useState(0);
  const total = steps.length;
  const progress = Math.round(((active + 1) / total) * 100);

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle}>
        <div className="mt-8 flex flex-wrap gap-2">
          {["Register", "Verify", "Approval", "Account Creation"].map((s, i) => (
            <div key={s} className="flex items-center gap-2 text-white/90">
              <span className="h-7 w-7 rounded-full bg-white/15 grid place-items-center text-xs font-bold">{i + 1}</span>
              <span className="text-sm font-medium">{s}</span>
              {i < 3 && <ChevronRight className="h-4 w-4 text-white/40" />}
            </div>
          ))}
        </div>
      </PageHero>

      <SectionWrap>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8">
          <div>
            <div className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8">
              <Stepper steps={steps} active={active} />
              <div className="mt-4 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#363092] to-[#FF6B35] transition-all" style={{ width: `${progress}%` }} />
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900">{steps[active].title}</h3>
                {steps[active].subtitle && <p className="text-sm text-gray-500 mt-1">{steps[active].subtitle}</p>}
                <div className="mt-6">{steps[active].content}</div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                <button disabled={active === 0} onClick={() => setActive(a => Math.max(0, a - 1))} className="inline-flex items-center gap-1 px-4 h-10 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:border-[#363092] disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <div className="text-xs text-gray-500">Step {active + 1} of {total}</div>
                {active < total - 1 ? (
                  <button onClick={() => setActive(a => Math.min(total - 1, a + 1))} className="inline-flex items-center gap-1 px-5 h-10 rounded-lg bg-[#363092] hover:bg-[#2a2470] text-white text-sm font-semibold">
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button className="inline-flex items-center gap-1 px-5 h-10 rounded-lg bg-[#FF6B35] hover:brightness-95 text-white text-sm font-semibold">
                    Submit Application <Check className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 text-[#363092] font-bold">
                <ShieldCheck className="h-5 w-5" /> Eligibility
              </div>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {eligibility.map(e => (
                  <li key={e} className="flex gap-2"><Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /><span>{e}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 text-[#363092] font-bold">
                <HelpCircle className="h-5 w-5" /> FAQs
              </div>
              <div className="mt-3 space-y-3">
                {faqs.map(f => (
                  <details key={f.q} className="group">
                    <summary className="cursor-pointer text-sm font-semibold text-gray-900 marker:hidden list-none flex justify-between gap-2">
                      {f.q} <ChevronRight className="h-4 w-4 text-gray-400 group-open:rotate-90 transition" />
                    </summary>
                    <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg,#363092,#2a2470)" }}>
              <div className="text-xs uppercase tracking-wider opacity-80 font-bold">Need help?</div>
              <div className="mt-1 font-bold">Help Desk · 1800-XXX-XXXX</div>
              <div className="mt-0.5 text-xs opacity-80">Mon–Fri, 10 AM – 6 PM</div>
            </div>
          </aside>
        </div>
      </SectionWrap>
    </>
  );
}

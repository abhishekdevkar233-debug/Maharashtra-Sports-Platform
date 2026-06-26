import { CheckCircle2, Circle } from "lucide-react";

export function StepBar({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-[#363092] z-0 transition-all duration-500"
          style={{ width: `${(current / (steps.length - 1)) * 100}%` }}
        />
        {steps.map((s, i) => (
          <div key={s} className="flex flex-col items-center z-10 flex-1">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              i < current ? "bg-[#363092] border-[#363092] text-white"
              : i === current ? "bg-white border-[#363092] text-[#363092]"
              : "bg-white border-gray-300 text-gray-400"
            }`}>
              {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`mt-1.5 text-[10px] font-semibold text-center leading-tight max-w-[64px] ${
              i <= current ? "text-[#363092]" : "text-gray-400"
            }`}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
      {children}
    </div>
  );
}

export function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputCls = "w-full h-11 px-3 rounded-xl border border-gray-200 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/10 outline-none text-sm transition";
export const selectCls = "w-full h-11 px-3 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm bg-white transition";
export const textareaCls = "w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/10 outline-none text-sm resize-none transition";

export function UploadBox({ label }: { label: string }) {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-[#363092] cursor-pointer transition group">
      <div className="h-10 w-10 rounded-full bg-gray-50 group-hover:bg-[#363092]/10 flex items-center justify-center mx-auto mb-2 transition">
        <svg className="h-5 w-5 text-gray-400 group-hover:text-[#363092]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
      </div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG — max 5MB</p>
    </div>
  );
}

export function NavButtons({ step, total, onBack, onNext, onSubmit }: {
  step: number; total: number; onBack: () => void; onNext: () => void; onSubmit?: () => void;
}) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
      <button onClick={onBack} disabled={step === 0}
        className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#363092] hover:text-[#363092] disabled:opacity-30 disabled:cursor-not-allowed transition">
        ← Back
      </button>
      {step < total - 1 ? (
        <button onClick={onNext}
          className="px-8 py-2.5 rounded-xl text-white text-sm font-semibold transition hover:opacity-90 shadow"
          style={{ background: "#363092" }}>
          Next Step →
        </button>
      ) : (
        <button onClick={onSubmit}
          className="px-8 py-2.5 rounded-xl text-white text-sm font-semibold transition hover:opacity-90 shadow"
          style={{ background: "#FF6B35" }}>
          Submit Application ✓
        </button>
      )}
    </div>
  );
}

export function SectionHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

export function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-500 uppercase tracking-wide w-40 shrink-0">{label}</span>
      <span className="text-sm font-semibold text-gray-900 text-right">{value || "—"}</span>
    </div>
  );
}

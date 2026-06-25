import { Camera } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow, title, subtitle, children,
}: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#363092 0%,#2a2470 60%,#1a1450 100%)" }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ background: "radial-gradient(circle at 80% 20%, #FF6B35 0%, transparent 50%)" }} />
      <div className="container-page py-16 md:py-24 relative">
        {eyebrow && <div className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-semibold mb-3">{eyebrow}</div>}
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-4 text-white/75 max-w-2xl text-base md:text-lg">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionWrap({ children, alt = false }: { children: ReactNode; alt?: boolean }) {
  return (
    <section className={`py-14 md:py-16 ${alt ? "bg-[#F9FAFB]" : "bg-white"}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative pl-3 border-l-[3px] border-[#FF6B35]">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
    </div>
  );
}

export function ImgBox({ h = 200, label = "Image" }: { h?: number; label?: string }) {
  return (
    <div className="grid place-items-center bg-gray-200 text-gray-500 rounded-md w-full" style={{ height: h }}>
      <div className="flex flex-col items-center gap-1 text-xs"><Camera className="h-5 w-5" />{label}</div>
    </div>
  );
}

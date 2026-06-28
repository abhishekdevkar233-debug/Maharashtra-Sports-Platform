import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight, Newspaper, FileText, Image as ImageIcon, Video, ArrowLeft } from "lucide-react";

export const PURPLE = "#6D28D9";
export const PURPLE_DARK = "#4C1D95";
export const PURPLE_SOFT = "#F5F3FF";

export function MediaHero({
  eyebrow, title, subtitle, crumbs, back,
}: {
  eyebrow?: string; title: string; subtitle?: string;
  crumbs?: { label: string; to?: string }[];
  back?: { label: string; to: string };
}) {
  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg,${PURPLE_DARK} 0%,${PURPLE} 60%,#8B5CF6 100%)` }}>
      <div className="absolute inset-0 opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle at 85% 15%, #ffffff55 0%, transparent 45%), radial-gradient(circle at 10% 90%, #ffffff33 0%, transparent 50%)" }} />
      <div className="container-page py-14 md:py-20 relative">
        {back && (
          <div className="mb-5">
            <Link to={back.to}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/15 text-white text-sm font-semibold hover:bg-black/60 transition">
              <ArrowLeft className="h-4 w-4" /> {back.label}
            </Link>
          </div>
        )}
        {crumbs && (
          <nav className="flex items-center gap-1 text-xs text-white/70 mb-4">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <div className="text-[11px] uppercase tracking-[0.25em] text-white/80 font-semibold mb-3">{eyebrow}</div>}
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-4 text-white/80 max-w-2xl text-base md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}

export function MediaSection({ children, alt = false }: { children: ReactNode; alt?: boolean }) {
  return (
    <section className={`py-12 md:py-16 ${alt ? "bg-[#FAFAFB]" : "bg-white"}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function PreviewBox({ h = 200, label = "Image", tone = "purple" }: { h?: number; label?: string; tone?: "purple" | "gray" | "video" }) {
  const bg =
    tone === "video" ? "linear-gradient(135deg,#1f1147,#4C1D95)" :
    tone === "purple" ? "linear-gradient(135deg,#EDE9FE,#DDD6FE)" :
    "linear-gradient(135deg,#F3F4F6,#E5E7EB)";
  const txt = tone === "video" ? "text-white/80" : "text-purple-700/70";
  return (
    <div className={`grid place-items-center rounded-xl w-full ${txt}`} style={{ height: h, background: bg }}>
      <div className="flex flex-col items-center gap-1 text-xs font-medium">
        {tone === "video" ? <Video className="h-7 w-7" /> : <ImageIcon className="h-6 w-6" />}
        <span className="opacity-80">{label}</span>
      </div>
    </div>
  );
}

export const MEDIA_CATEGORIES = [
  { key: "news", title: "News", desc: "Latest updates from the department and across Maharashtra sports.", to: "/media-center/news", icon: Newspaper },
  { key: "press", title: "Press Releases", desc: "Official communications, circulars and announcements.", to: "/media-center/press-releases", icon: FileText },
  { key: "photos", title: "Photo Gallery", desc: "Event coverage, ceremonies and athlete highlights.", to: "/media-center/photo-gallery", icon: ImageIcon },
  { key: "videos", title: "Video Gallery", desc: "Match highlights, interviews and documentary features.", to: "/media-center/video-gallery", icon: Video },
] as const;

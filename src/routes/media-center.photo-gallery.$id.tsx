import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { Calendar, MapPin, Camera, ChevronLeft, ChevronRight, X, Download, Share2, ZoomIn, Grid3X3, LayoutGrid, ChevronRight as Chevron } from "lucide-react";

import galAsianGames from "@/assets/gallery/asian-games.webp";
import galCricket from "@/assets/gallery/cricket-team.jpg";
import galWrestling from "@/assets/gallery/wrestling.avif";
import galBadminton from "@/assets/gallery/badminton.webp";
import galKheloIndia from "@/assets/gallery/khelo-india.jpg";
import newsKheloMedals from "@/assets/news/khelo-india-medals.png";
import newsKhoKho from "@/assets/news/kho-kho.png";
import newsSportsComplex from "@/assets/news/sports-complex.jpg";
import newsScholarships from "@/assets/news/scholarships.png";

export const Route = createFileRoute("/media-center/photo-gallery/$id")({
  head: () => ({ meta: [{ title: "Photo Album — DSYS Maharashtra" }] }),
  component: AlbumDetails,
});

const PRIMARY = "#363092";

type Photo = { src: string; caption: string; tag: string };

const ALBUMS: Record<string, {
  title: string; date: string; venue: string; desc: string;
  cover: string; photos: Photo[];
}> = {
  "khelo-india-medals": {
    title: "Maharashtra wins 186 medals at Khelo India Youth Games 2026",
    date: "4 Jun 2026", venue: "Chandigarh, Punjab",
    desc: "A historic performance as Maharashtra athletes sweep the medal table at Khelo India Youth Games 2026, with gold in athletics, swimming, wrestling and kabaddi.",
    cover: newsKheloMedals,
    photos: [
      { src: newsKheloMedals,   caption: "Maharashtra contingent marching at the opening ceremony",     tag: "Ceremony"  },
      { src: galKheloIndia,     caption: "Athletes celebrating gold medals on the podium",               tag: "Ceremony"  },
      { src: galAsianGames,     caption: "Track and field finals — 100m sprint",                        tag: "Athletics" },
      { src: galWrestling,      caption: "Wrestling finals — Maharashtra wins gold",                     tag: "Wrestling" },
      { src: galBadminton,      caption: "Badminton team in action during semi-finals",                  tag: "Badminton" },
      { src: galCricket,        caption: "Cricket squad after defeating Uttar Pradesh",                  tag: "Cricket"   },
      { src: newsKhoKho,        caption: "Kho-Kho team sprint drill during warm-up",                    tag: "Kho-Kho"   },
      { src: newsSportsComplex, caption: "Venue overview — Chandigarh Sports Complex",                  tag: "Venue"     },
      { src: newsScholarships,  caption: "Award ceremony — scholarship recipients felicitated",          tag: "Ceremony"  },
    ],
  },
  "asian-games-2023": {
    title: "Asian Games 2023 — Team Maharashtra",
    date: "14 Oct 2023", venue: "Hangzhou, China",
    desc: "Coverage of Maharashtra athletes competing at the 19th Asian Games in Hangzhou.",
    cover: galAsianGames,
    photos: [
      { src: galAsianGames, caption: "Team Maharashtra at the Asian Games opening parade", tag: "Ceremony" },
      { src: galCricket,    caption: "Cricket team practice session before quarterfinals",  tag: "Cricket"  },
      { src: galWrestling,  caption: "Wrestling bout — Maharashtra athlete wins bronze",    tag: "Wrestling"},
      { src: galBadminton,  caption: "Badminton doubles pair in action",                   tag: "Badminton"},
      { src: galKheloIndia, caption: "Athletics — Maharashtra 4×400m relay team",          tag: "Athletics"},
      { src: newsKheloMedals, caption: "Medal presentation ceremony",                      tag: "Ceremony" },
    ],
  },
  "cricket-team": {
    title: "Maharashtra Cricket Team — Victory Celebration",
    date: "20 May 2026", venue: "Pune, Maharashtra",
    desc: "Celebration after Maharashtra cricket team's landmark victory at the Ranji Trophy.",
    cover: galCricket,
    photos: [
      { src: galCricket,       caption: "Team photo with the Ranji Trophy",              tag: "Ceremony"  },
      { src: newsKheloMedals,  caption: "Captain addressing fans after the win",          tag: "Ceremony"  },
      { src: galAsianGames,    caption: "Victory parade through Pune city",               tag: "Ceremony"  },
      { src: galKheloIndia,    caption: "Training session before the final match",        tag: "Training"  },
      { src: galBadminton,     caption: "Press conference at MCA stadium",                tag: "Press"     },
    ],
  },
};

const FALLBACK = ALBUMS["khelo-india-medals"];

/* ── Lightbox ── */
function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: Photo[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const photo = photos[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const [thumbStart, setThumbStart] = useState(0);
  const VISIBLE = 6;

  useEffect(() => {
    if (index < thumbStart) setThumbStart(index);
    else if (index >= thumbStart + VISIBLE) setThumbStart(index - VISIBLE + 1);
  }, [index]);

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col bg-black/95" onClick={onClose}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0" onClick={e => e.stopPropagation()}>
        <div className="text-white/70 text-sm font-medium">
          <span className="text-white font-bold">{index + 1}</span> / {photos.length}
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium flex items-center gap-2 transition">
            <Download className="h-4 w-4" /> Download
          </button>
          <button className="h-9 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium flex items-center gap-2 transition">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center relative px-16 min-h-0" onClick={e => e.stopPropagation()}>
        <button onClick={onPrev} disabled={index === 0}
          className="absolute left-4 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/25 text-white transition disabled:opacity-30">
          <ChevronLeft className="h-7 w-7" />
        </button>

        <img
          key={photo.src + index}
          src={photo.src}
          alt={photo.caption}
          className="max-h-full max-w-full object-contain rounded-xl"
          style={{ maxHeight: "calc(100vh - 230px)" }}
        />

        <button onClick={onNext} disabled={index === photos.length - 1}
          className="absolute right-4 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white/25 text-white transition disabled:opacity-30">
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>

      {/* Caption + tag */}
      <div className="text-center pb-3 px-8 shrink-0" onClick={e => e.stopPropagation()}>
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1" style={{ background: `${PRIMARY}80`, color: "#fff" }}>{photo.tag}</span>
        <p className="text-white/80 text-sm">{photo.caption}</p>
      </div>

      {/* Thumbnail strip */}
      <div className="px-6 pb-5 shrink-0" onClick={e => e.stopPropagation()}>
        <div className="flex gap-2 justify-center">
          {photos.slice(thumbStart, thumbStart + VISIBLE).map((p, i) => {
            const realIdx = thumbStart + i;
            return (
              <button key={realIdx} onClick={() => {
                const el = document.querySelector(`[data-lb-idx="${realIdx}"]`) as HTMLElement;
                if (el) el.click();
              }}
                data-lb-idx={realIdx}
                onClick2={() => {}}
                className={`h-14 w-20 rounded-lg overflow-hidden border-2 transition shrink-0 ${realIdx === index ? "border-white scale-105" : "border-white/20 opacity-60 hover:opacity-90"}`}
                onClick={() => {
                  // navigate to this index via parent
                  const diff = realIdx - index;
                  if (diff > 0) for (let x = 0; x < diff; x++) onNext();
                  else if (diff < 0) for (let x = 0; x < -diff; x++) onPrev();
                }}>
                <img src={p.src} alt="" className="h-full w-full object-cover" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */
function AlbumDetails() {
  const { id } = Route.useParams();
  const album = ALBUMS[id] ?? FALLBACK;
  const { photos } = album;

  const [open, setOpen] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "masonry">("masonry");

  const close  = useCallback(() => setOpen(null), []);
  const prev   = useCallback(() => setOpen(i => (i != null && i > 0 ? i - 1 : i)), []);
  const next   = useCallback(() => setOpen(i => (i != null && i < photos.length - 1 ? i + 1 : i)), [photos.length]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb header */}
      <div style={{ background: PRIMARY }}>
        <div className="container-page py-3 flex items-center gap-1.5 text-xs text-white/70">
          <Link to="/" className="hover:text-white">Home</Link>
          <Chevron className="h-3 w-3" />
          <Link to="/media-center" className="hover:text-white">Media Center</Link>
          <Chevron className="h-3 w-3" />
          <span className="text-white">Photo Gallery</span>
        </div>
      </div>

      {/* Hero cover */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.2) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 container-page pb-8">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white mb-3" style={{ background: PRIMARY }}>Photo Album</span>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight max-w-3xl">{album.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{album.date}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{album.venue}</span>
            <span className="flex items-center gap-1.5"><Camera className="h-4 w-4" />{photos.length} photos</span>
          </div>
        </div>
      </div>

      <div className="container-page py-8">

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-gray-600 max-w-2xl">{album.desc}</p>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setView("masonry")}
              className={`h-9 w-9 grid place-items-center rounded-lg border transition ${view === "masonry" ? "border-[#363092] bg-[#363092] text-white" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button onClick={() => setView("grid")}
              className={`h-9 w-9 grid place-items-center rounded-lg border transition ${view === "grid" ? "border-[#363092] bg-[#363092] text-white" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button className="h-9 px-4 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 flex items-center gap-2 hover:border-[#363092] hover:text-[#363092] transition">
              <Download className="h-4 w-4" /> Download All
            </button>
            <button className="h-9 px-4 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 flex items-center gap-2 hover:border-gray-300 transition">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>

        {/* Grid — uniform */}
        {view === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((p, i) => (
              <button key={i} onClick={() => setOpen(i)}
                className="group relative rounded-xl overflow-hidden aspect-square bg-gray-100 hover:ring-2 hover:ring-[#363092] transition">
                <img src={p.src} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                  <ZoomIn className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-[10px] text-white line-clamp-2 leading-snug">{p.caption}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Masonry — Pinterest-style varying heights */}
        {view === "masonry" && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {photos.map((p, i) => {
              const heights = ["aspect-square", "aspect-[4/3]", "aspect-[3/4]", "aspect-[16/9]", "aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[3/2]", "aspect-square"];
              const h = heights[i % heights.length];
              return (
                <button key={i} onClick={() => setOpen(i)}
                  className={`group relative w-full rounded-xl overflow-hidden ${h} bg-gray-100 hover:ring-2 hover:ring-[#363092] transition break-inside-avoid block`}>
                  <img src={p.src} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    <ZoomIn className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: `${PRIMARY}cc` }}>{p.tag}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                    <p className="text-[11px] text-white line-clamp-2 leading-snug text-left">{p.caption}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Photo count summary */}
        <div className="mt-6 text-center text-sm text-gray-400">{photos.length} photos · Click any photo to view full screen</div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <Lightbox photos={photos} index={open} onClose={close} onPrev={prev} onNext={next} />
      )}
    </div>
  );
}

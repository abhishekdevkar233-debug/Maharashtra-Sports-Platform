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
import banner01 from "@/assets/banner-01.png";
import banner02 from "@/assets/banner-02.png";
import banner03 from "@/assets/banner-03.png";
import sportsCollage from "@/assets/sports-collage.png";
import vShivChhatrapati from "@/assets/venues/shiv-chhatrapati.jpg";
import vDyPatil from "@/assets/venues/dy-patil.jpg";
import vWankhede from "@/assets/venues/wankhede.jpg";
import vVidarbha from "@/assets/venues/vidarbha.jpg";
import vMahalaxmi from "@/assets/venues/mahalaxmi.avif";
import vPuneFootball from "@/assets/venues/pune-football.jpg";
import mhdPhoto1 from "@/assets/gallery/mahadeva/photo-1.jpg";
import mhdPhoto2 from "@/assets/gallery/mahadeva/photo-2.png";
import mhdPhoto3 from "@/assets/gallery/mahadeva/photo-3.png";
import mhdPhoto4 from "@/assets/gallery/mahadeva/photo-4.jpg";
import mhdPhoto5 from "@/assets/gallery/mahadeva/photo-5.jpg";

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
      { src: newsKheloMedals,   caption: "Maharashtra contingent at the grand opening ceremony of Khelo India Youth Games 2026",  tag: "Ceremony"  },
      { src: galKheloIndia,     caption: "Gold medalists on the podium — Maharashtra dominates the standings",                    tag: "Ceremony"  },
      { src: galWrestling,      caption: "Wrestling finals — Maharashtra athlete clinches gold in 65kg freestyle",                 tag: "Wrestling" },
      { src: galBadminton,      caption: "Maharashtra shuttlers advance to the semi-finals in doubles category",                  tag: "Badminton" },
      { src: galAsianGames,     caption: "Track and field — 100m sprint heats at Chandigarh Athletics Stadium",                   tag: "Athletics" },
      { src: galCricket,        caption: "Maharashtra cricket squad after defeating Uttar Pradesh in the quarter-final",          tag: "Cricket"   },
      { src: newsKhoKho,        caption: "Kho-Kho team warm-up drills ahead of the championship round",                          tag: "Kho-Kho"   },
      { src: sportsCollage,     caption: "A collage of Maharashtra's finest sporting moments of the games",                       tag: "Highlights"},
      { src: newsSportsComplex, caption: "Chandigarh Sports Complex — the host venue for Khelo India Youth Games 2026",          tag: "Venue"     },
      { src: vShivChhatrapati,  caption: "Shree Shiv Chhatrapati Sports Complex — Maharashtra's premier training base",          tag: "Venue"     },
      { src: banner01,          caption: "Maharashtra Sports Department felicitating Khelo India champions",                      tag: "Ceremony"  },
      { src: newsScholarships,  caption: "Scholarship award ceremony — outstanding athletes recognised by the Directorate",       tag: "Awards"    },
    ],
  },
  "asian-games-2023": {
    title: "Asian Games 2023 — Team Maharashtra",
    date: "14 Oct 2023", venue: "Hangzhou, China",
    desc: "Coverage of Maharashtra athletes competing at the 19th Asian Games in Hangzhou, China.",
    cover: galAsianGames,
    photos: [
      { src: galAsianGames,     caption: "Team Maharashtra marching proudly at the 19th Asian Games opening parade in Hangzhou", tag: "Ceremony" },
      { src: galWrestling,      caption: "Maharashtra wrestler in action — clinching a bronze medal in the 74kg category",       tag: "Wrestling"},
      { src: galBadminton,      caption: "Badminton doubles duo representing Maharashtra at the Asian Games 2023",               tag: "Badminton"},
      { src: galCricket,        caption: "Maharashtra cricketers in pre-match practice session before the quarterfinals",        tag: "Cricket"  },
      { src: galKheloIndia,     caption: "Maharashtra 4×400m relay team at the Asian Games athletics stadium",                  tag: "Athletics"},
      { src: vDyPatil,          caption: "DY Patil Stadium — venue for pre-departure training camp of Team Maharashtra",        tag: "Venue"    },
      { src: vWankhede,         caption: "Wankhede Stadium felicitation ceremony for returning Asian Games athletes",           tag: "Ceremony" },
      { src: banner02,          caption: "Maharashtra Government honours Asian Games medallists at state function",              tag: "Awards"   },
      { src: newsKheloMedals,   caption: "Medal tally presentation — Maharashtra's best-ever Asian Games performance",          tag: "Ceremony" },
      { src: sportsCollage,     caption: "Highlights montage — Maharashtra at the 19th Asian Games",                            tag: "Highlights"},
    ],
  },
  "cricket-team": {
    title: "Maharashtra Cricket Team — Ranji Trophy Victory 2026",
    date: "20 May 2026", venue: "Pune, Maharashtra",
    desc: "Celebrating Maharashtra's landmark Ranji Trophy victory and the team's triumphant homecoming in Pune.",
    cover: galCricket,
    photos: [
      { src: galCricket,        caption: "Maharashtra cricket team poses with the Ranji Trophy at MCA Stadium, Pune",           tag: "Ceremony" },
      { src: vWankhede,         caption: "Wankhede Stadium — venue of the Ranji Trophy final between Maharashtra and Delhi",    tag: "Venue"    },
      { src: vPuneFootball,     caption: "Pune Football Arena hosts the victory celebration for returning cricket heroes",      tag: "Venue"    },
      { src: galKheloIndia,     caption: "Captain addressing thousands of fans at the Balewadi homecoming rally",               tag: "Ceremony" },
      { src: galAsianGames,     caption: "Victory parade through FC Road, Pune — fans line the streets for the champions",     tag: "Ceremony" },
      { src: vVidarbha,         caption: "Vidarbha Cricket Association Stadium — quarter-final venue for Maharashtra",          tag: "Venue"    },
      { src: galBadminton,      caption: "Press conference at MCA — captain and coach speak to the media post-victory",        tag: "Press"    },
      { src: banner03,          caption: "Chief Minister congratulates Maharashtra cricket squad at Mantralaya",                tag: "Awards"   },
      { src: vMahalaxmi,        caption: "Mahalaxmi Race Course — gala awards night for Maharashtra cricket team",             tag: "Awards"   },
      { src: newsScholarships,  caption: "DSYS Directorate presents merit scholarships to the Ranji Trophy-winning squad",     tag: "Awards"   },
    ],
  },
  "project-maha-deva": {
    title: "Project Maha-Deva Launch — Mumbai, December 2025",
    date: "14 Dec 2025", venue: "Mumbai, Maharashtra",
    desc: "Highlights from the official launch of Project Maha-Deva — Maharashtra's flagship football development initiative featuring Lionel Messi, Tiger Shroff, and Chief Minister Devendra Fadnavis.",
    cover: mhdPhoto3,
    photos: [
      { src: mhdPhoto1, caption: "Lionel Messi plays football with a young Maha-Deva jersey-clad athlete at the launch event", tag: "Launch" },
      { src: mhdPhoto2, caption: "Tiger Shroff presents a ₹1 Crore cheque to CM Devendra Fadnavis for Project Maha-Deva", tag: "Ceremony" },
      { src: mhdPhoto3, caption: "Official poster — Launch of Project Maha-Deva, Mumbai | 14-12-2025", tag: "Launch" },
      { src: mhdPhoto4, caption: "Ground inspection at the Project Maha-Deva football training facility", tag: "Facilities" },
      { src: mhdPhoto5, caption: "Dignitaries and stakeholders gather for the cheque handover ceremony at the stadium", tag: "Ceremony" },
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

    </div>
  );
}

/* ── Page ── */
function AlbumDetails() {
  const { id } = Route.useParams();
  const album = ALBUMS[id] ?? FALLBACK;
  const { photos } = album;

  const [open, setOpen] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "masonry">("grid");

  const close  = useCallback(() => setOpen(null), []);
  const prev   = useCallback(() => setOpen(i => (i != null && i > 0 ? i - 1 : i)), []);
  const next   = useCallback(() => setOpen(i => (i != null && i < photos.length - 1 ? i + 1 : i)), [photos.length]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero — same structure as stadium detail */}
      <div className="relative h-[420px] overflow-hidden">
        <img src={album.cover} alt={album.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 35%), linear-gradient(to top, rgba(10,10,40,0.88) 0%, rgba(10,10,40,0.3) 60%, transparent 100%)" }} />

        {/* Back button — top left */}
        <div className="absolute top-5 left-0 right-0 px-6" style={{ maxWidth: 1200, marginInline: "auto" }}>
          <Link to="/media-center"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur text-white text-sm font-semibold hover:bg-black/70 transition">
            <ChevronLeft className="h-4 w-4" /> Back to Media Center
          </Link>
        </div>

        {/* Tags + title + meta — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8" style={{ maxWidth: 1200, marginInline: "auto" }}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B35] text-white text-[11px] font-bold">Photo Album</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight max-w-3xl">{album.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/80 text-sm">
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

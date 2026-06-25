import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MediaHero, MediaSection, PreviewBox } from "@/components/media/MediaShell";
import { Calendar, MapPin, Camera, ChevronLeft, ChevronRight, X, Download, Share2 } from "lucide-react";

export const Route = createFileRoute("/media-center/photo-gallery/$id")({
  head: () => ({ meta: [{ title: "Album — Photo Gallery | DSYS Maharashtra" }] }),
  component: AlbumDetails,
});

function AlbumDetails() {
  const { id } = Route.useParams();
  const photos = Array.from({ length: 18 }, (_, i) => i + 1);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <MediaHero
        eyebrow="Photo Album"
        title="Shiv Chhatrapati Awards 2025-26"
        subtitle="Maharashtra's highest sports honour, presented to 46 athletes and coaches at the Raj Bhavan ceremony."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Media Center", to: "/media-center" },
          { label: "Photo Gallery", to: "/media-center/photo-gallery" },
          { label: id.replace(/-/g, " ") },
        ]}
      />

      <MediaSection>
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PreviewBox h={360} label="Album Cover" />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Album Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-700"><Calendar className="h-4 w-4 text-purple-700" />14 June 2026</li>
              <li className="flex items-center gap-2 text-gray-700"><MapPin className="h-4 w-4 text-purple-700" />Raj Bhavan, Mumbai</li>
              <li className="flex items-center gap-2 text-gray-700"><Camera className="h-4 w-4 text-purple-700" />64 photos · 6 photographers</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Highlights from the awards ceremony recognising outstanding athletes, coaches and lifetime
              achievers across 46 sports disciplines.
            </p>
            <div className="mt-5 flex gap-2">
              <button className="flex-1 h-10 inline-flex items-center justify-center gap-1 rounded-lg bg-purple-700 text-white text-sm font-medium hover:bg-purple-800"><Download className="h-4 w-4" />Download all</button>
              <button className="h-10 w-10 grid place-items-center rounded-lg border border-gray-200 text-gray-700 hover:border-purple-300"><Share2 className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map(n => (
            <button key={n} onClick={() => setOpen(n)} className="rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-400 transition">
              <PreviewBox h={170} label={`Photo ${n}`} />
            </button>
          ))}
        </div>

        {open !== null && (
          <div className="fixed inset-0 z-[2000] bg-black/85 grid place-items-center p-6" onClick={() => setOpen(null)}>
            <button className="absolute top-5 right-5 h-10 w-10 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X className="h-5 w-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); setOpen(o => Math.max(1, (o ?? 1) - 1)); }} className="absolute left-5 h-12 w-12 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft className="h-6 w-6" /></button>
            <button onClick={(e) => { e.stopPropagation(); setOpen(o => Math.min(photos.length, (o ?? 1) + 1)); }} className="absolute right-5 h-12 w-12 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight className="h-6 w-6" /></button>
            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <PreviewBox h={520} label={`Photo ${open} of ${photos.length}`} />
              <div className="mt-3 text-center text-white/80 text-sm">Photo {open} of {photos.length}</div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Related Albums</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { id: "balewadi-inauguration", title: "Balewadi Aquatic Centre Inauguration", date: "10 Jun 2026" },
              { id: "khelo-india-camp", title: "Khelo India Training Camp — Pune", date: "02 Jun 2026" },
              { id: "coach-summit", title: "Maharashtra Coach Summit 2026", date: "28 Apr 2026" },
            ].map(r => (
              <Link key={r.id} to="/media-center/photo-gallery/$id" params={{ id: r.id }} className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-purple-300 hover:shadow-md transition">
                <PreviewBox h={150} label={r.title} />
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-purple-700">{r.title}</h4>
                  <span className="text-xs text-gray-500">{r.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MediaSection>
    </>
  );
}

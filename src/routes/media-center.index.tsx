import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { useState } from "react";
import {
  Search, Calendar, ArrowRight,
  Camera, Play, Clock, Eye, X, Newspaper, Filter,
} from "lucide-react";

import galAsianGames from "@/assets/gallery/asian-games.webp";
import galCricket from "@/assets/gallery/cricket-team.jpg";
import galWrestling from "@/assets/gallery/wrestling.avif";
import galBadminton from "@/assets/gallery/badminton.webp";
import galKheloIndia from "@/assets/gallery/khelo-india.jpg";
import newsKheloMedals from "@/assets/news/khelo-india-medals.png";
import newsKhoKho from "@/assets/news/kho-kho.png";
import newsSportsComplex from "@/assets/news/sports-complex.jpg";
import newsScholarships from "@/assets/news/scholarships.png";

export const Route = createFileRoute("/media-center/")({
  head: () => ({ meta: [{ title: "Media Center — Sports & Youth Services Maharashtra" }] }),
  component: MediaCenter,
});

const NEWS = [
  { id: "asian-games-medals",  cat: "Athletes",       date: "22 Jun 2026", title: "Maharashtra wins 12 medals at National Junior Athletics 2026",    excerpt: "State athletes top the medal table with strong performances across track and field events in Hyderabad.", img: galAsianGames },
  { id: "infra-grant-launch",  cat: "Schemes",        date: "18 Jun 2026", title: "₹250 Cr Sports Infrastructure Grant launched for 36 districts",   excerpt: "CM announces a five-year programme to upgrade district sports complexes and athlete hostels.", img: newsSportsComplex },
  { id: "balewadi-aquatic",    cat: "Infrastructure", date: "10 Jun 2026", title: "Balewadi Aquatic Centre inaugurated in Pune",                       excerpt: "FINA-spec 50m pool with diving platform now open for elite athlete training camps.", img: galKheloIndia },
  { id: "khelo-india-prep",    cat: "Tournaments",    date: "05 Jun 2026", title: "State squad announced for Khelo India Youth Games 2026",           excerpt: "428 athletes selected across 27 disciplines — Maharashtra contingent largest in the country.", img: newsKheloMedals },
  { id: "coach-cert-program",  cat: "Department",     date: "29 May 2026", title: "New NIS-affiliated coach certification rolled out",                 excerpt: "Department partners with SAI to certify 1,200 coaches across districts over the next 18 months.", img: galBadminton },
  { id: "shiv-chhatrapati",    cat: "Athletes",       date: "20 May 2026", title: "Shiv Chhatrapati Award nominations open for 2026-27",              excerpt: "Applications invited across 46 sports disciplines from athletes, coaches and lifetime achievers.", img: newsScholarships },
];

const PHOTOS = [
  { id: "khelo-india-medals",           title: "Maharashtra wins 186 medals at Khelo India Youth Games 2026", date: "4 Jun 2026",   count: 120, tag: "Tournaments",   img: newsKheloMedals },
  { id: "asian-games-2023",             title: "Asian Games 2023 — Team Maharashtra",                          date: "14 Oct 2023",  count: 64,  tag: "Tournaments",   img: galAsianGames },
  { id: "cricket-team",                 title: "Maharashtra Cricket Team — Victory Celebration",               date: "20 May 2026",  count: 42,  tag: "Ceremonies",    img: galCricket },
  { id: "state-wrestling",              title: "State Wrestling Championship 2026 — Pune",                    date: "18 Apr 2026",  count: 88,  tag: "Tournaments",   img: galWrestling },
  { id: "badminton-camp",               title: "Badminton Training Camp — Nagpur",                            date: "2 Mar 2026",   count: 56,  tag: "Training",      img: galBadminton },
  { id: "sports-complex-inauguration",  title: "New Sports Complex Inauguration — Chhatrapati Sambhajinagar", date: "22 May 2026",  count: 34,  tag: "Inaugurations", img: newsSportsComplex },
];

const VIDEOS = [
  { id: "khelo-india-highlights", title: "Maharashtra wins 186 medals at Khelo India Youth Games 2026 — Full Highlights", cat: "Highlights",    dur: "8:45",  views: "21.9K", date: "4 Jun 2026",  img: newsKheloMedals },
  { id: "asian-games-recap",      title: "Asian Games 2023 — Team Maharashtra Race Recap",                                 cat: "Highlights",    dur: "5:33",  views: "15.2K", date: "14 Oct 2023", img: galAsianGames },
  { id: "cricket-victory",        title: "Maharashtra Cricket Team — Victory Celebration Ceremony",                        cat: "Ceremonies",    dur: "4:32",  views: "12.4K", date: "20 May 2026", img: galCricket },
  { id: "wrestling-championship", title: "State Wrestling Championship 2026 — Day 2 Highlights",                          cat: "Highlights",    dur: "6:14",  views: "8.7K",  date: "18 Apr 2026", img: galWrestling },
  { id: "badminton-training",     title: "Behind the Scenes — Badminton Training Camp Nagpur",                            cat: "Training",      dur: "9:21",  views: "6.5K",  date: "2 Mar 2026",  img: galBadminton },
  { id: "kho-kho-games",          title: "Kho-Kho Maharashtra Youth Games — Tournament Highlights",                       cat: "Highlights",    dur: "7:18",  views: "9.4K",  date: "19 Jun 2026", img: newsKhoKho },
];

const NEWS_CATS = ["All", "Athletes", "Schemes", "Infrastructure", "Tournaments", "Department"];
const PHOTO_TAGS = ["All Events", "Ceremonies", "Training", "Tournaments", "Inaugurations"];
const VIDEO_CATS = ["All", "Highlights", "Interviews", "Documentaries", "Training", "Ceremonies"];

function SectionHead({ icon: Icon, title, color = "#363092" }: { icon: React.ElementType; title: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${color}15` }}>
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <div className="h-0.5 w-12 rounded-full mt-1" style={{ background: color }} />
      </div>
    </div>
  );
}

function NewsSection() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = NEWS.filter(a =>
    (cat === "All" || a.cat === cat) &&
    (query === "" || a.title.toLowerCase().includes(query.toLowerCase()) || a.excerpt.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <div>
      <SectionHead icon={Newspaper} title="News & Articles" color="#363092" />
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search news…"
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 text-sm focus:border-[#363092] outline-none" />
          {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X className="h-3.5 w-3.5" /></button>}
        </div>
        <div className="flex flex-wrap gap-2">
          {NEWS_CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 h-10 rounded-xl text-xs font-semibold border transition ${cat === c ? "bg-[#363092] text-white border-[#363092]" : "border-gray-200 text-gray-600 hover:border-[#363092]"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(a => (
          <Link key={a.id} to="/media-center/news/$id" params={{ id: a.id }}
            className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-[#363092] hover:shadow-lg transition-all duration-200">
            <div className="relative h-44 overflow-hidden">
              <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#363092] text-white text-[10px] font-bold">{a.cat}</span>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-2"><Calendar className="h-3 w-3" />{a.date}</p>
              <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[#363092] transition-colors line-clamp-2">{a.title}</h3>
              <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{a.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#363092]">Read more <ArrowRight className="h-3.5 w-3.5" /></span>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <div className="py-12 text-center text-gray-400">No articles found.</div>}
    </div>
  );
}

function PhotoSection() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All Events");
  const filtered = PHOTOS.filter(a =>
    (tag === "All Events" || a.tag === tag) &&
    (query === "" || a.title.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <div>
      <SectionHead icon={Camera} title="Photo Gallery" color="#0d9488" />
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search albums…"
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 text-sm focus:border-[#0d9488] outline-none" />
          {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X className="h-3.5 w-3.5" /></button>}
        </div>
        <div className="flex flex-wrap gap-2">
          <Filter className="h-4 w-4 text-gray-400 self-center shrink-0" />
          {PHOTO_TAGS.map(t => (
            <button key={t} onClick={() => setTag(t)}
              className={`px-3 h-10 rounded-xl text-xs font-semibold border transition ${tag === t ? "bg-[#0d9488] text-white border-[#0d9488]" : "border-gray-200 text-gray-600 hover:border-[#0d9488]"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(a => (
          <Link key={a.id} to="/media-center/photo-gallery/$id" params={{ id: a.id }}
            className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-[#0d9488] hover:shadow-lg transition-all duration-200">
            <div className="relative h-48 overflow-hidden">
              <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#0d9488] text-white text-[10px] font-bold">{a.tag}</span>
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur text-white text-xs font-medium">
                <Camera className="h-3 w-3" /> {a.count}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 group-hover:text-[#0d9488] transition-colors leading-snug line-clamp-2 text-sm">{a.title}</h3>
              <p className="mt-1 text-xs text-gray-400">{a.date}</p>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <div className="py-12 text-center text-gray-400">No albums found.</div>}
    </div>
  );
}

function VideoSection() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = VIDEOS.filter(v =>
    (cat === "All" || v.cat === cat) &&
    (query === "" || v.title.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <div>
      <SectionHead icon={Play} title="Video Gallery" color="#7c3aed" />
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search videos…"
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 text-sm focus:border-[#7c3aed] outline-none" />
          {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X className="h-3.5 w-3.5" /></button>}
        </div>
        <div className="flex flex-wrap gap-2">
          {VIDEO_CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 h-10 rounded-xl text-xs font-semibold border transition ${cat === c ? "bg-[#7c3aed] text-white border-[#7c3aed]" : "border-gray-200 text-gray-600 hover:border-[#7c3aed]"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(v => (
          <Link key={v.id} to="/media-center/video-gallery/$id" params={{ id: v.id }}
            className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-[#7c3aed] hover:shadow-lg transition-all duration-200">
            <div className="relative h-44 overflow-hidden">
              <img src={v.img} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-white/90 grid place-items-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="h-5 w-5 text-[#7c3aed] ml-0.5" />
                </div>
              </div>
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#7c3aed] text-white text-[10px] font-bold">{v.cat}</span>
              <span className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-white text-xs font-medium">
                <Clock className="h-3 w-3" /> {v.dur}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 group-hover:text-[#7c3aed] transition-colors leading-snug line-clamp-2 text-sm">{v.title}</h3>
              <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{v.views}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{v.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <div className="py-12 text-center text-gray-400">No videos found.</div>}
    </div>
  );
}

const TABS = [
  { id: "news",          label: "News",          accent: "#363092" },
  { id: "photo-gallery", label: "Photo Gallery", accent: "#0d9488" },
  { id: "video-gallery", label: "Video Gallery", accent: "#7c3aed" },
];

function MediaCenter() {
  const [active, setActive] = useState("news");

  return (
    <>
      <PageHero
        eyebrow="Media Center"
        title="Stories, updates and coverage from Maharashtra sports"
        subtitle="News, press releases, photo albums and video highlights — all in one place."
      />

      <div className="sticky top-[60px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container-page flex gap-0 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className="relative px-6 py-3.5 text-sm font-semibold whitespace-nowrap transition"
              style={{ color: active === t.id ? t.accent : "#6b7280" }}>
              {t.label}
              {active === t.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ background: t.accent }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <SectionWrap>
        {active === "news"          && <NewsSection />}
        {active === "photo-gallery" && <PhotoSection />}
        {active === "video-gallery" && <VideoSection />}
      </SectionWrap>
    </>
  );
}

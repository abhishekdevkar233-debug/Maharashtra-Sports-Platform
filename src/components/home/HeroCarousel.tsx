import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Users, Medal, Eye, EyeOff } from "lucide-react";
import b2 from "@/assets/banner-02.png";
import b3 from "@/assets/banner-03.png";

const NEWS = [
  "Your Voice for Maharashtra Youth Policy 2026 | Submit your suggestions before 31 July 2026",
  "Regarding the approval to develop a 'Krida e-Pramaan' system incorporating blockchain technology for the implementation of the 5% reservation",
  "39th National Games 2027 — Maharashtra | Venue registrations now open for all 36 districts",
  "Shiv Chhatrapati Sports Award 2026-27 — Applications invited from eligible athletes and coaches",
  "Maharashtra State Athletics Championship 2026 — Registrations open | Last date: 15 July 2026",
  "New Sports Hostel inaugurated at Balewadi High Performance Centre, Pune — 200 seats available",
];

const SLIDES = [
  { img: b2, eyebrow: "World-class Infrastructure", title: "Stadiums Built for", accent: "Champions of Tomorrow", subtitle: "486 sports facilities across Maharashtra — stadiums, training centres and academies powering the next generation.", focal: "center" },
  { img: b3, eyebrow: "Training the Future", title: "Where Discipline Meets", accent: "Olympic Ambition", subtitle: "Elite training programs and grassroots development preparing Maharashtra's athletes for national and global stage.", focal: "center 30%" },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [showText, setShowText] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => setI(p => (p + d + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative w-full overflow-hidden bg-[#0d1b4b]" style={{ height: "min(700px, 75vh)", minHeight: 480 }}>
      {SLIDES.map((s, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <img
            src={s.img}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover ${idx === i ? "animate-[kenburns_8s_ease-in-out_infinite_alternate]" : ""}`}
            style={{ objectPosition: s.focal }}
          />
          {/* gradient overlay behind text */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,27,75,0.85) 0%, rgba(13,27,75,0.55) 40%, rgba(13,27,75,0.1) 70%, transparent 100%)" }} />
        </div>
      ))}

      {/* Toggle button */}
      <button
        onClick={() => setShowText(v => !v)}
        title={showText ? "Hide text" : "Show text"}
        className="absolute top-4 right-16 md:right-20 z-20 h-9 w-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur grid place-items-center text-white transition">
        {showText ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>

      <div className="relative h-full container-page flex items-center">
        <div className={`max-w-xl text-white transition-all duration-500 ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
          <div className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-semibold mb-3">{SLIDES[i].eyebrow}</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            {SLIDES[i].title}<br />
            <span style={{ color: "#FF6B35" }}>{SLIDES[i].accent}</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/80 max-w-lg">{SLIDES[i].subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => navigate({ to: "/olympians" })}
              className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all duration-150"
              style={{ background: "#FF6B35" }}>
              <Medal className="h-4 w-4" /> Explore Olympians
            </button>
            <button
              onClick={() => navigate({ to: "/elite-athletes" })}
              className="px-6 py-3 rounded-lg font-semibold text-white border border-white/60 hover:bg-white/10 flex items-center gap-2 active:scale-95 transition-all duration-150">
              <Users className="h-4 w-4" /> Discover Elite Athletes
            </button>
          </div>
          <div className="mt-10 flex gap-2">
            {SLIDES.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)}
                className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-[#FF6B35]" : "w-2 bg-white/40"}`} />
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => go(-1)} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur grid place-items-center text-white"><ChevronLeft /></button>
      <button onClick={() => go(1)} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur grid place-items-center text-white"><ChevronRight /></button>

      {/* News Ticker */}
      <div className="absolute bottom-0 left-0 right-0 flex items-stretch h-10 z-10">
        <div className="shrink-0 flex items-center gap-2 bg-[#FF6B35] px-4 text-white text-xs font-bold uppercase tracking-widest">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          Latest News
        </div>
        <div className="flex-1 overflow-hidden bg-black/70 backdrop-blur-sm flex items-center">
          <div className="whitespace-nowrap animate-[ticker_35s_linear_infinite] text-white/90 text-xs font-medium">
            {NEWS.map((n, idx) => (
              <span key={idx} className="inline-flex items-center">
                <span className="mx-4 text-[#FF6B35]">◆</span>
                {n}
              </span>
            ))}
            {NEWS.map((n, idx) => (
              <span key={`b${idx}`} className="inline-flex items-center">
                <span className="mx-4 text-[#FF6B35]">◆</span>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes kenburns { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}

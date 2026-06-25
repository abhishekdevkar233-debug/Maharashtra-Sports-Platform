import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import b1 from "@/assets/banner-01.png";
import b2 from "@/assets/banner-02.png";
import b3 from "@/assets/banner-03.png";

const SLIDES = [
  { img: b1, eyebrow: "Excellence in Governance", title: "Empowering Maharashtra", accent: "Through Sports Excellence", subtitle: "Building champions through world-class infrastructure, training and dedicated leadership across all 36 districts.", focal: "center" },
  { img: b2, eyebrow: "World-class Infrastructure", title: "Stadiums Built for", accent: "Champions of Tomorrow", subtitle: "486 sports facilities across Maharashtra — stadiums, training centres and academies powering the next generation.", focal: "center" },
  { img: b3, eyebrow: "Training the Future", title: "Where Discipline Meets", accent: "Olympic Ambition", subtitle: "Elite training programs and grassroots development preparing Maharashtra's athletes for national and global stage.", focal: "center 30%" },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
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

      <div className="relative h-full container-page flex items-center">
        <div className="max-w-xl text-white">
          <div className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-semibold mb-3">{SLIDES[i].eyebrow}</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            {SLIDES[i].title}<br />
            <span style={{ color: "#FF6B35" }}>{SLIDES[i].accent}</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/80 max-w-lg">{SLIDES[i].subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg" style={{ background: "#FF6B35" }}>Explore Olympians</button>
            <button className="px-6 py-3 rounded-lg font-semibold text-white border border-white/60 hover:bg-white/10">Discover Elite Athletes</button>
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

      <style>{`@keyframes kenburns { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }`}</style>
    </section>
  );
}

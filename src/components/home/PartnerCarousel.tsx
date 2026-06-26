import { useRef, useState, useEffect } from "react";
import logo1 from "@/assets/partner-logos/logo-1.png";
import logo2 from "@/assets/partner-logos/logo-2.png";
import logo3 from "@/assets/partner-logos/logo-3.png";
import logo4 from "@/assets/partner-logos/logo-4.png";
import logo5 from "@/assets/partner-logos/logo-5.png";
import logo6 from "@/assets/partner-logos/logo-6.png";
import logo7 from "@/assets/partner-logos/logo-7.png";

const LOGOS = [
  { src: logo1, alt: "Make In India" },
  { src: logo2, alt: "Digital India" },
  { src: logo3, alt: "MyGov" },
  { src: logo4, alt: "Incredible India" },
  { src: logo5, alt: "PM India" },
  { src: logo6, alt: "India Gov" },
  { src: logo7, alt: "Data Gov" },
];

// Triplicate so the seamless loop always has content on both sides
const ITEMS = [...LOGOS, ...LOGOS, ...LOGOS];

export function PartnerCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const dragRef = useRef({ active: false, startX: 0, startPos: 0 });

  // Speed: px per frame (~60fps). 1 full set = LOGOS.length * (logoW + gap)
  // We'll use CSS animation instead for GPU-acceleration, pausing via JS class toggle
  const [paused, setPaused] = useState(false);

  return (
    <section className="bg-white border-y border-gray-100 py-6">
      <div className="container-page">
        {/* Fade mask on left & right edges */}
        <div
          className="relative overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div
            ref={trackRef}
            className={`flex items-center will-change-transform ${paused ? "[animation-play-state:paused]" : ""}`}
            style={{
              gap: "clamp(40px, 5vw, 60px)",
              width: "max-content",
              animation: "partnerScroll 30s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            /* Touch drag */
            onTouchStart={e => {
              dragRef.current = {
                active: true,
                startX: e.touches[0].clientX,
                startPos: posRef.current,
              };
              setPaused(true);
            }}
            onTouchMove={e => {
              if (!dragRef.current.active || !trackRef.current) return;
              const dx = e.touches[0].clientX - dragRef.current.startX;
              trackRef.current.style.animationDelay = `${dx / 60}s`;
            }}
            onTouchEnd={() => {
              dragRef.current.active = false;
              setPaused(false);
              if (trackRef.current) trackRef.current.style.animationDelay = "0s";
            }}
          >
            {ITEMS.map((logo, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center justify-center cursor-pointer"
                style={{ height: 80 }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="object-contain transition-all duration-300 hover:scale-105"
                  style={{
                    height: "clamp(48px, 5vw, 70px)",
                    width: "auto",
                    maxWidth: 180,
                  }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes partnerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}

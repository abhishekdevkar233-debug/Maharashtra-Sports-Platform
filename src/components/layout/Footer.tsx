import { Facebook, Instagram, Twitter, Youtube, MessageCircle, MapPin, Phone, Mail, Clock, ChevronRight, ArrowUp, Eye } from "lucide-react";
import { useState } from "react";
import mhSeal from "@/assets/mh-seal.png";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Schemes", href: "/award-schemes" },
  { label: "Infrastructure", href: "/stadiums-arenas" },
  { label: "Achievements", href: "/leadership-team" },
  { label: "Olympians", href: "/olympians" },
  { label: "Elite Athletes", href: "/elite-athletes" },
  { label: "Media", href: "/media-center/news" },
  { label: "Contact Us", href: "#" },
];

const INFO_LINKS = [
  { label: "Downloads", href: "#" },
  { label: "RTI", href: "#" },
  { label: "Citizen Charter", href: "#" },
  { label: "Tenders", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Contact Us", href: "#" },
];


export function Footer() {
  const [visitors] = useState(494140);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
      <footer className="text-white" style={{ background: "#1a1464" }}>
        {/* Main footer body */}
        <div className="container-page py-12" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.3fr", gap: "2.5rem" }}>

          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-4">
              <img src={mhSeal} alt="Maharashtra Seal" className="h-16 w-16 object-contain brightness-0 invert" />
              <div>
                <div className="font-bold text-white text-base leading-snug">Government of Maharashtra</div>
                <div className="font-semibold text-white/90 text-sm leading-snug">Sports & Youth Services<br />Department</div>
              </div>
            </div>
            <div className="mt-3 h-1 w-12 rounded-full bg-[#FF6B35]" />
            <p className="mt-4 text-sm text-white/90 leading-relaxed">
              Empowering Maharashtra through sports excellence, youth development and world-class infrastructure.
            </p>

            {/* Social */}
            <div className="mt-5">
              <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">Follow Us</div>
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, color: "#1877F2" },
                  { Icon: Instagram, color: "#E1306C" },
                  { Icon: Twitter, color: "#1DA1F2" },
                  { Icon: Youtube, color: "#FF0000" },
                  { Icon: MessageCircle, color: "#25D366" },
                ].map(({ Icon, color }, i) => (
                  <a key={i} href="#"
                    className="h-10 w-10 rounded-full border border-white/20 grid place-items-center text-white/90 hover:text-white hover:border-transparent transition-all duration-200"
                    onMouseEnter={e => (e.currentTarget.style.background = color)}
                    onMouseLeave={e => (e.currentTarget.style.background = "")}>
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-1">Quick Links</h4>
            <div className="h-0.5 w-8 bg-[#FF6B35] rounded-full mb-4" />
            <ul className="space-y-1">
              {QUICK_LINKS.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="flex items-center justify-between py-1.5 text-sm text-white/90 hover:text-white group transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-white/30 group-hover:bg-[#FF6B35] transition-colors" />
                      {l.label}
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-[#FF6B35] transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Information */}
          <div>
            <h4 className="font-bold text-white text-base mb-1">Information</h4>
            <div className="h-0.5 w-8 bg-[#FF6B35] rounded-full mb-4" />
            <ul className="space-y-1">
              {INFO_LINKS.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="flex items-center justify-between py-1.5 text-sm text-white/90 hover:text-white group transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-white/30 group-hover:bg-[#FF6B35] transition-colors" />
                      {l.label}
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-[#FF6B35] transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-bold text-white text-base mb-1">Contact Us</h4>
            <div className="h-0.5 w-8 bg-[#FF6B35] rounded-full mb-4" />
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <div className="h-9 w-9 shrink-0 rounded-full grid place-items-center text-[#FF6B35]" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-white/90 leading-relaxed pt-1">Directorate of Sports & Youth Services,<br />Shivaji Nagar, Pune – 411005</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="h-9 w-9 shrink-0 rounded-full grid place-items-center text-[#FF6B35]" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-white/90">+91 20 2553 3333</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="h-9 w-9 shrink-0 rounded-full grid place-items-center text-[#FF6B35]" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-white/90">info@sports.maharashtra.gov.in</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="h-9 w-9 shrink-0 rounded-full grid place-items-center text-[#FF6B35]" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Clock className="h-4 w-4" />
                </div>
                <span className="text-white/90">Mon – Fri, 10:00 AM – 6:00 PM</span>
              </li>
            </ul>
            <a href="#" className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/30 text-white text-sm font-semibold hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-colors">
              <MapPin className="h-4 w-4" /> Get Directions <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container-page py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/80">
            <div className="flex items-center gap-3 flex-wrap">
              <span>All rights reserved © 2026</span>
              <span className="text-white/20">|</span>
              <span>Last Updated : June 26 2026</span>
            </div>

            {/* Visitor counter */}
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-semibold" style={{ background: "#8B1A4A" }}>
              <Eye className="h-3.5 w-3.5" />
              {visitors.toLocaleString()} Visitors
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
              <span className="text-white/20">|</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/20">|</span>
              <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
              <span className="text-white/20">|</span>
              <button onClick={scrollToTop}
                className="flex items-center gap-1.5 border border-white/20 rounded-lg px-3 py-1 hover:border-white hover:text-white transition-colors">
                <ArrowUp className="h-3.5 w-3.5" /> Back to Top
              </button>
            </div>
          </div>
        </div>
      </footer>
  );
}

import { useState, useEffect, useRef } from "react";

/* ── scroll reveal hook ─────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, direction = "up" }: {
  children: React.ReactNode; delay?: number; direction?: "up"|"down"|"left"|"right"|"none";
}) {
  const { ref, visible } = useReveal();
  const translate = direction === "up" ? "translateY(40px)" : direction === "down" ? "translateY(-40px)"
    : direction === "left" ? "translateX(40px)" : direction === "right" ? "translateX(-40px)" : "none";
  return (
    <div ref={ref} style={{
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : translate,
    }}>
      {children}
    </div>
  );
}
import {
  Home, Info, Building2, GraduationCap, Users, Trophy,
  Image, FileText, LogIn, UserPlus, ChevronRight, MapPin,
  Phone, Mail, Globe, Facebook, Instagram, Twitter, Youtube,
  Menu, X, Bell, ChevronDown, Play, ArrowRight, Star,
  Calendar, Clock, Newspaper, Eye, Award, Zap, TrendingUp,
  Shield, BookOpen,
} from "lucide-react";
import mhSeal from "@/assets/mh-seal.png";

const P  = "#363092";
const OR = "#f97316";

/* ── nav items ─────────────────────────────── */
const NAV = [
  { label: "Home",         icon: Home,         id: "home"      },
  { label: "About Us",     icon: Info,         id: "about"     },
  { label: "Infrastructure", icon: Building2,  id: "infra"     },
  { label: "Schemes",      icon: GraduationCap,id: "schemes"   },
  { label: "Athletes",     icon: Users,        id: "athletes"  },
  { label: "Tournaments",  icon: Trophy,       id: "tournaments"},
  { label: "Media Center", icon: Image,        id: "media"     },
  { label: "Notices",      icon: FileText,     id: "notices"   },
];

/* ── mock data ──────────────────────────────── */
const LIVE_MATCHES = [
  { sport: "Kabaddi",    team1: "Pune A",    team2: "Nashik B",   score: "32 – 28", status: "LIVE",  time: "2nd Half"  },
  { sport: "Football",   team1: "Nagpur FC", team2: "Aurangabad", score: "1 – 0",   status: "LIVE",  time: "67'"       },
  { sport: "Volleyball", team1: "Kolhapur",  team2: "Sangli",     score: "2 – 1",   status: "LIVE",  time: "Set 4"     },
];

const NEWS = [
  { title: "District Athletics Championship 2026 — Registrations Open",        date: "28 Jun 2026", cat: "Announcement", img: "🏃" },
  { title: "15 Athletes Selected for State-Level Kabaddi Tournament",           date: "25 Jun 2026", cat: "Achievement",   img: "🏅" },
  { title: "New Sports Complex Inaugurated at Baramati",                         date: "20 Jun 2026", cat: "Infrastructure",img: "🏟️" },
  { title: "Scholarship Applications Invited for 2026-27 Academic Year",         date: "18 Jun 2026", cat: "Scheme",        img: "📚" },
];

const LEADERS = [
  { name: "Shri Rajesh Patil",  role: "District Sports Officer",       img: "RP" },
  { name: "Smt. Priya Kulkarni",role: "Dy. Director Sports",           img: "PK" },
  { name: "Shri Anil Bhosale",  role: "Asst. Director (Youth)",        img: "AB" },
  { name: "Smt. Kavita Jadhav", role: "Welfare Officer",               img: "KJ" },
];

const GALLERY = [
  { label: "District Athletics Meet 2026",  color: "#dbeafe", emoji: "🏃‍♂️" },
  { label: "Kabaddi Championship Final",    color: "#dcfce7", emoji: "🤸" },
  { label: "Swimming Trials — Baramati",    color: "#fce7f3", emoji: "🏊" },
  { label: "Award Ceremony 2025",           color: "#fef3c7", emoji: "🏆" },
  { label: "Yoga Day Celebration",          color: "#ede9fe", emoji: "🧘" },
  { label: "Football League Opening",       color: "#fee2e2", emoji: "⚽" },
];

const TOURNAMENTS = [
  { name: "District Kabaddi League",      date: "15 Jul 2026",  venue: "Indoor Stadium",    status: "Upcoming", sport: "Kabaddi"    },
  { name: "Sub-District Athletics",       date: "28 Jul 2026",  venue: "Balewadi Ground",   status: "Upcoming", sport: "Athletics"  },
  { name: "Inter-School Football Cup",    date: "10 Aug 2026",  venue: "Municipal Ground",  status: "Open",     sport: "Football"   },
  { name: "State Volleyball Qualifier",   date: "22 Aug 2026",  venue: "Sports Complex",    status: "Open",     sport: "Volleyball" },
];

const OTHER_SITES = [
  { name: "NIC Maharashtra",        url: "#", color: "#1e40af" },
  { name: "Govt of Maharashtra",    url: "#", color: "#15803d" },
  { name: "DSYS State Portal",      url: "#", color: P         },
  { name: "Digital India",          url: "#", color: "#b45309" },
  { name: "Maharashtra Tourism",    url: "#", color: "#be123c" },
  { name: "My Maharashtra App",     url: "#", color: "#6d28d9" },
];

const NOTICES = [
  { title: "Call for Applications — Shiv Chhatrapati Award 2026",           date: "30 Jun 2026", tag: "Award"        },
  { title: "Result of District Selection Trial — Athletics",                  date: "28 Jun 2026", tag: "Result"       },
  { title: "Tender Notice — Sports Equipment Supply 2026-27",                 date: "25 Jun 2026", tag: "Tender"       },
  { title: "Circular: Aadhaar Verification for Scholarship Beneficiaries",    date: "20 Jun 2026", tag: "Circular"     },
  { title: "Venue Change — Sub-District Volleyball Tournament",               date: "18 Jun 2026", tag: "Notice"       },
];

/* ═══════════════════════════════════════════
   SECTION COMPONENTS
══════════════════════════════════════════ */

function LiveUpdates() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % LIVE_MATCHES.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-black text-red-500 uppercase tracking-widest">Live Now</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">Live Sports Updates</h2>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl border hover:bg-gray-50 transition" style={{ color: P, borderColor: P }}>
            View All Matches <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LIVE_MATCHES.map((m, i) => (
            <div key={i} onClick={() => setActive(i)}
              className={`rounded-2xl p-5 cursor-pointer transition-all duration-300 border-2 ${active === i ? "border-red-400 shadow-lg scale-[1.02]" : "border-gray-100 hover:border-gray-200"}`}
              style={{ background: active === i ? "linear-gradient(135deg,#fff1f2,#fff)" : "white" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{m.sport}</span>
                <span className="flex items-center gap-1 text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />{m.status}
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-800 text-center flex-1">{m.team1}</span>
                <span className="text-lg font-black mx-3 px-3 py-1 rounded-xl" style={{ background: `${P}10`, color: P }}>{m.score}</span>
                <span className="text-sm font-bold text-gray-800 text-center flex-1">{m.team2}</span>
              </div>
              <div className="text-center text-[10px] text-gray-400 font-medium">{m.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="py-14" style={{ background: "#f8f9ff" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: OR }}>Our Team</div>
          <h2 className="text-2xl font-black text-gray-900">District Leadership</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">Dedicated officials steering sports development across the district</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {LEADERS.map((l, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition group">
              <div className="h-16 w-16 rounded-2xl grid place-items-center font-black text-white text-xl mx-auto mb-3 group-hover:scale-110 transition-transform"
                style={{ background: `linear-gradient(135deg,${P},${OR})` }}>{l.img}</div>
              <div className="text-sm font-bold text-gray-900 leading-snug">{l.name}</div>
              <div className="text-[11px] text-gray-400 mt-1 font-medium">{l.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsAnnouncements() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: OR }}>Latest</div>
            <h2 className="text-2xl font-black text-gray-900">News & Announcements</h2>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl border hover:bg-gray-50 transition" style={{ color: P, borderColor: P }}>
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEWS.map((n, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition cursor-pointer group bg-white">
              <div className="h-12 w-12 rounded-xl grid place-items-center text-2xl shrink-0 bg-gray-50">{n.img}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: `${P}15`, color: P }}>{n.cat}</span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3" />{n.date}</span>
                </div>
                <p className="text-sm font-bold text-gray-800 leading-snug group-hover:text-blue-700 transition">{n.title}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-400 transition shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoVideoGallery() {
  return (
    <section className="py-14" style={{ background: "#0d1b4b" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: OR }}>Memories</div>
            <h2 className="text-2xl font-black text-white">Photo & Video Gallery</h2>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl border border-white/20 text-white hover:bg-white/10 transition">
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden cursor-pointer group h-40"
              style={{ background: g.color }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">{g.emoji}</span>
                <span className="text-xs font-bold text-gray-700 text-center px-3">{g.label}</span>
              </div>
              {i === 0 && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full">
                  <Play className="h-3 w-3 fill-white" /> VIDEO
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OtherWebsites() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: OR }}>Quick Links</div>
          <h2 className="text-2xl font-black text-gray-900">Other Websites</h2>
          <p className="text-sm text-gray-500 mt-2">Useful government portals and services</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {OTHER_SITES.map((s, i) => (
            <a key={i} href={s.url}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center no-underline"
              style={{
                borderColor: hoveredIdx === i ? s.color : "#e5e7eb",
                background: hoveredIdx === i ? `${s.color}08` : "white",
                transform: hoveredIdx === i ? "translateY(-4px)" : "none",
                boxShadow: hoveredIdx === i ? `0 8px 24px -6px ${s.color}40` : "none",
              }}>
              <div className="h-12 w-12 rounded-xl grid place-items-center font-black text-white text-xs transition-all duration-300"
                style={{ background: s.color }}>
                <Globe className="h-6 w-6" />
              </div>
              <span className="text-[11px] font-bold text-gray-700 leading-tight">{s.name}</span>
              <div className="flex items-center gap-1 text-[10px] font-bold transition-all duration-300"
                style={{ color: hoveredIdx === i ? s.color : "transparent" }}>
                Visit <ArrowRight className="h-3 w-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function DistrictFooter() {
  return (
    <footer style={{ background: "#0d1b4b" }} className="pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={mhSeal} alt="MH Seal" className="h-14 w-14 object-contain" />
              <div>
                <div className="font-black text-white text-base leading-tight">District Sports Office</div>
                <div className="text-white/60 text-xs mt-0.5">Government of Maharashtra</div>
                <div className="text-xs mt-1 font-bold" style={{ color: OR }}>Sports & Youth Services Dept.</div>
              </div>
            </div>
            <p className="text-white/50 text-xs leading-relaxed max-w-xs">
              Empowering district athletes through infrastructure, schemes, and grassroots sports development across Maharashtra.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="h-8 w-8 rounded-full border border-white/20 grid place-items-center text-white/60 hover:text-white hover:border-white/60 transition">
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
          {/* Quick links */}
          <div>
            <div className="text-white font-bold text-sm mb-4">Quick Links</div>
            <div className="space-y-2">
              {["Home","About Us","Infrastructure","Schemes","Athletes","Tournaments"].map(l => (
                <button key={l} className="block text-white/50 text-xs hover:text-white transition">{l}</button>
              ))}
            </div>
          </div>
          {/* Contact */}
          <div>
            <div className="text-white font-bold text-sm mb-4">Contact</div>
            <div className="space-y-3">
              {[
                { icon: MapPin, text: "District Sports Office, Near Collector Office, Maharashtra" },
                { icon: Phone, text: "020-XXXXXXXX" },
                { icon: Mail,  text: "dso.district@sports.mah.gov.in" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-2.5 text-white/50 text-xs">
                  <c.icon className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: OR }} />
                  {c.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-white/30 text-[11px]">
          <span>© 2026 District Sports Office — Govt. of Maharashtra. All rights reserved.</span>
          <div className="flex gap-4">
            {["Privacy Policy","Terms of Use","Accessibility","Sitemap"].map(l => (
              <button key={l} className="hover:text-white/60 transition">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════ */
function HeroSection() {
  const [slide, setSlide] = useState(0);
  const SLIDES = [
    { title: "Empowering Athletes", accent: "Across Every Taluka", sub: "Grassroots sports development, scholarships and world-class facilities for every athlete in the district." },
    { title: "District Championships", accent: "2026 Season", sub: "Register now for kabaddi, athletics, volleyball and more. Represent your district at the state level." },
  ];
  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  const s = SLIDES[slide];
  return (
    <div className="relative overflow-hidden py-20 md:py-28 flex items-center"
      style={{ background: `linear-gradient(135deg, ${P} 0%, #1a1f5e 60%, #0d1b4b 100%)`, minHeight: 440 }}>
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full opacity-10" style={{ background: OR }} />
      <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full opacity-5 bg-white" />
      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 h-9 flex items-stretch bg-black/40 backdrop-blur-sm">
        <div className="shrink-0 flex items-center gap-2 px-4 font-black text-[11px] uppercase tracking-widest text-white" style={{ background: OR }}>
          <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> Latest
        </div>
        <div className="flex-1 overflow-hidden flex items-center">
          <div className="whitespace-nowrap animate-[ticker_30s_linear_infinite] text-white/80 text-[11px] font-medium">
            {NOTICES.map((n, i) => <span key={i} className="inline-flex items-center"><span className="mx-4" style={{ color: OR }}>◆</span>{n.title}</span>)}
            {NOTICES.map((n, i) => <span key={`b${i}`} className="inline-flex items-center"><span className="mx-4" style={{ color: OR }}>◆</span>{n.title}</span>)}
          </div>
        </div>
      </div>
      <style>{`@keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar({ onClose }: { onClose: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = document.getElementById("district-site-scroll");
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);
  return (
    <>
      {/* Gov strip */}
      <div className="flex items-center justify-between px-4 py-1.5 text-[11px] text-white/80" style={{ background: "#0d1b4b" }}>
        <div className="flex items-center gap-3">
          <img src={mhSeal} alt="MH Seal" className="h-7 w-7 object-contain" />
          <span className="font-semibold">Government of Maharashtra · District Sports Office</span>
        </div>
        <button onClick={onClose} className="flex items-center gap-1.5 text-white/60 hover:text-white transition text-[11px] font-semibold">
          <X className="h-3.5 w-3.5" /> Close Preview
        </button>
      </div>
      {/* Main nav */}
      <nav className={`sticky top-0 z-50 transition-shadow ${scrolled ? "shadow-lg" : ""}`} style={{ background: P }}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-2">
          <div className="font-black text-white text-sm mr-4 whitespace-nowrap">District <span style={{ color: OR }}>Sports</span></div>
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV.map(n => (
              <button key={n.id} className="px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5">
                <n.icon className="h-3.5 w-3.5" />{n.label}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            <button className="h-8 px-3 rounded-lg border border-white/30 text-white text-xs font-bold hover:bg-white/10 transition flex items-center gap-1.5">
              <LogIn className="h-3.5 w-3.5" /> Login
            </button>
            <button className="h-8 px-3 rounded-lg text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{ background: OR }}>
              <UserPlus className="h-3.5 w-3.5" /> Register
            </button>
          </div>
          <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden ml-auto text-white">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-3 space-y-1" style={{ background: P }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setMobileOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 text-sm font-semibold transition">
                <n.icon className="h-4 w-4" />{n.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2 border-t border-white/10">
              <button className="flex-1 h-9 rounded-xl border border-white/30 text-white text-xs font-bold flex items-center justify-center gap-1.5">
                <LogIn className="h-3.5 w-3.5" /> Login
              </button>
              <button className="flex-1 h-9 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5" style={{ background: OR }}>
                <UserPlus className="h-3.5 w-3.5" /> Register
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}


/* ═══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export function DistrictWebsiteTemplate({ onClose }: { onClose: () => void }) {
  return (
    <div id="district-site-scroll" className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <Navbar onClose={onClose} />
      <HeroSection />
      <Reveal><LiveUpdates /></Reveal>
      <Reveal direction="right"><Leadership /></Reveal>
      <Reveal><NewsAnnouncements /></Reveal>
      <Reveal direction="left"><PhotoVideoGallery /></Reveal>
      <Reveal><OtherWebsites /></Reveal>

      {/* Notices section */}
      <Reveal>
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: OR }}>Official</div>
              <h2 className="text-2xl font-black text-gray-900">Notices & Circulars</h2>
            </div>
            <button className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl border hover:bg-gray-50 transition" style={{ color: P, borderColor: P }}>
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {NOTICES.map((n, i) => (
              <Reveal key={i} delay={i * 80}>
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition cursor-pointer group bg-white">
                <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0" style={{ background: `${P}10` }}>
                  <FileText className="h-4 w-4" style={{ color: P }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition">{n.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: `${OR}15`, color: OR }}>{n.tag}</span>
                  <span className="text-[11px] text-gray-400">{n.date}</span>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-400 transition" />
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal direction="none"><DistrictFooter /></Reveal>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin, Phone, Mail, Globe, Trophy, Users, Building2,
  Calendar, ChevronRight, ArrowRight, Star, Target,
  Dumbbell, Award, Newspaper, ExternalLink, Facebook,
  Twitter, Youtube, Instagram,
} from "lucide-react";

import mhSeal from "@/assets/mh-seal.png";
import puneImg from "@/assets/teams/pune.png";
import venueImg from "@/assets/venues/shiv-chhatrapati.jpg";
import puneFbImg from "@/assets/venues/pune-football.jpg";
import banner1 from "@/assets/banner-01.png";
import banner2 from "@/assets/banner-02.png";
import galKheloIndia from "@/assets/gallery/khelo-india.jpg";
import galWrestling from "@/assets/gallery/wrestling.avif";
import galBadminton from "@/assets/gallery/badminton.webp";
import newsKheloMedals from "@/assets/news/khelo-india-medals.png";
import newsSportsComplex from "@/assets/news/sports-complex.jpg";
import newsScholarships from "@/assets/news/scholarships.png";

export const Route = createFileRoute("/district-websites/$id")({
  head: () => ({ meta: [{ title: "District Sports Portal — Maharashtra" }] }),
  component: DistrictPage,
});

/* ── District data map ── */
const DISTRICT_DATA: Record<string, {
  name: string; division: string; hq: string; color: string; light: string;
  tagline: string;
  dso: { name: string; phone: string; email: string; address: string };
  stats: { label: string; value: string; icon: string }[];
  sports: { name: string; color: string }[];
  events: { title: string; date: string; venue: string; tag: string }[];
  news: { title: string; date: string; cat: string; img: string }[];
  venues: { name: string; sport: string; img: string; capacity: string }[];
  achievements: { name: string; sport: string; award: string; year: string }[];
}> = {
  "pune": {
    name: "Pune", division: "Pune", hq: "Pune", color: "#EA580C", light: "#FFF7ED",
    tagline: "City of Champions — Powering Maharashtra's Sporting Legacy",
    dso: {
      name: "Shri. Rajesh Kumar Patil",
      phone: "+91 20 2612 3456",
      email: "dso.pune@sports.maharashtra.gov.in",
      address: "District Sports Office, Shiv Chhatrapati Sports Complex, Balewadi, Pune – 411 045",
    },
    stats: [
      { label: "Registered Athletes", value: "42,000+", icon: "users" },
      { label: "Sports Facilities",   value: "128",     icon: "building" },
      { label: "Active Academies",    value: "24",      icon: "star" },
      { label: "Medals in 2025–26",   value: "312",     icon: "trophy" },
    ],
    sports: [
      { name: "Athletics",   color: "#2563EB" },
      { name: "Wrestling",   color: "#7C3AED" },
      { name: "Badminton",   color: "#0D9488" },
      { name: "Football",    color: "#16A34A" },
      { name: "Swimming",    color: "#0891B2" },
      { name: "Table Tennis",color: "#DC2626" },
      { name: "Boxing",      color: "#D97706" },
      { name: "Kabaddi",     color: "#EA580C" },
    ],
    events: [
      { title: "Pune District Athletics Championship 2026", date: "15 Jul 2026", venue: "Balewadi Athletics Track", tag: "Athletics" },
      { title: "Sub-Junior Wrestling Tournament",           date: "22 Jul 2026", venue: "Shiv Chhatrapati Wrestling Hall", tag: "Wrestling" },
      { title: "Pune Football League — Season 5",          date: "1 Aug 2026",  venue: "Balewadi Football Ground", tag: "Football" },
      { title: "District Badminton Open 2026",             date: "10 Aug 2026", venue: "Balewadi Indoor Arena", tag: "Badminton" },
    ],
    news: [
      { title: "Pune athletes win 28 medals at State Junior Championship", date: "20 Jun 2026", cat: "Achievement", img: newsKheloMedals },
      { title: "New synthetic track inaugurated at Balewadi",             date: "12 Jun 2026", cat: "Infrastructure", img: newsSportsComplex },
      { title: "DSO Pune launches sports scholarship drive 2026–27",       date: "5 Jun 2026",  cat: "Schemes", img: newsScholarships },
    ],
    venues: [
      { name: "Shiv Chhatrapati Sports Complex", sport: "Multi-sport",  img: venueImg,    capacity: "25,000" },
      { name: "Balewadi Football Ground",        sport: "Football",     img: puneFbImg,   capacity: "8,000"  },
      { name: "Balewadi Aquatic Centre",         sport: "Swimming",     img: galKheloIndia, capacity: "2,000" },
      { name: "Deccan Gymkhana",                sport: "Multi-sport",  img: galBadminton, capacity: "5,000" },
    ],
    achievements: [
      { name: "Priya Patil",      sport: "Athletics", award: "Gold — National Junior 800m", year: "2026" },
      { name: "Rohan Deshmukh",   sport: "Shot Put",  award: "Gold — National Junior", year: "2026" },
      { name: "Ankita Raut",      sport: "Wrestling", award: "Silver — Khelo India", year: "2026" },
      { name: "Siddharth Bhosale",sport: "Badminton", award: "Bronze — National Schools", year: "2025" },
    ],
  },
};

const FALLBACK = DISTRICT_DATA["pune"];

const ICON_MAP: Record<string, React.ElementType> = {
  users: Users, building: Building2, star: Star, trophy: Trophy,
};

function DistrictPage() {
  const { id } = Route.useParams();
  const d = DISTRICT_DATA[id] ?? FALLBACK;
  const Icon = (k: string) => { const I = ICON_MAP[k]; return I ? <I className="h-5 w-5" /> : null; };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── TOP NAV BAR ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-page flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src={mhSeal} alt="MH Seal" className="h-8 w-8 object-contain" />
            <div>
              <div className="text-xs font-black text-gray-900 leading-none">Pune District Sports Office</div>
              <div className="text-[10px] text-gray-400">Government of Maharashtra</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {["Home","Events","Infrastructure","Schemes","Achievements","Contact"].map(n => (
              <a key={n} href={`#${n.toLowerCase()}`}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-[#EA580C] hover:bg-orange-50 transition">
                {n}
              </a>
            ))}
          </nav>
          <Link to="/district-websites" className="hidden md:flex items-center gap-1 text-xs text-gray-500 hover:text-[#363092] transition">
            ← All Districts
          </Link>
        </div>
      </div>

      {/* ── HERO ── */}
      <div id="home" className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, #1a1464 0%, #363092 50%, ${d.color} 100%)` }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #ffffff 0%, transparent 60%)" }} />
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          <img src={puneImg} alt="Pune" className="h-full w-full object-cover object-left" />
        </div>
        <div className="container-page py-16 md:py-24 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-white/60 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/district-websites" className="hover:text-white">District Websites</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{d.name} District</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-4">
            <MapPin className="h-3 w-3" style={{ color: d.color }} /> {d.division} Division
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-3">
            {d.name} District<br />
            <span style={{ color: d.color }}>Sports Portal</span>
          </h1>
          <p className="text-white/75 text-base md:text-lg max-w-xl mb-8">{d.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#events" className="h-11 px-6 rounded-xl font-bold text-sm text-white flex items-center gap-2 transition"
              style={{ background: d.color }}>
              <Calendar className="h-4 w-4" /> Upcoming Events
            </a>
            <a href="#contact" className="h-11 px-6 rounded-xl font-bold text-sm border border-white/40 text-white flex items-center gap-2 hover:bg-white/10 transition">
              <Phone className="h-4 w-4" /> Contact DSO
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-white/10" style={{ background: "rgba(0,0,0,0.25)" }}>
          <div className="container-page grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {d.stats.map(s => (
              <div key={s.label} className="px-6 py-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg grid place-items-center shrink-0" style={{ background: `${d.color}30` }}>
                  <span style={{ color: d.color }}>{Icon(s.icon)}</span>
                </div>
                <div>
                  <div className="text-xl font-black text-white leading-none">{s.value}</div>
                  <div className="text-[11px] text-white/55 mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SPORTS WE PROMOTE ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-page py-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Sports we promote</h2>
          <div className="flex flex-wrap gap-2">
            {d.sports.map(s => (
              <span key={s.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border"
                style={{ borderColor: s.color + "40", background: s.color + "10", color: s.color }}>
                <Dumbbell className="h-3 w-3" /> {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page py-12 space-y-14">

        {/* ── EVENTS ── */}
        <section id="events">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Upcoming Events</h2>
              <p className="text-sm text-gray-500 mt-1">Sports competitions & tournaments in {d.name} district</p>
            </div>
            <button className="h-9 px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#EA580C] hover:text-[#EA580C] transition flex items-center gap-1.5">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {d.events.map((e, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-orange-200 hover:shadow-md transition group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: d.light, color: d.color }}>{e.tag}</span>
                  <Calendar className="h-4 w-4 text-gray-300 group-hover:text-orange-400 transition" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-3">{e.title}</h3>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{e.date}</div>
                  <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{e.venue}</div>
                </div>
                <button className="mt-4 w-full h-8 rounded-lg text-xs font-bold border transition"
                  style={{ borderColor: d.color + "30", color: d.color }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = DISTRICT_DATA["pune"].light; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}>
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── VENUES + NEWS (2-col) ── */}
        <div id="infrastructure" className="grid lg:grid-cols-3 gap-8">

          {/* Venues */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Sports Infrastructure</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {d.venues.map((v, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-md hover:border-orange-200 transition">
                  <div className="h-40 overflow-hidden">
                    <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-gray-900 text-sm leading-snug">{v.name}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2"
                        style={{ background: d.light, color: d.color }}>{v.sport}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                      <Users className="h-3 w-3" /> Capacity: {v.capacity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News sidebar */}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Latest News</h2>
            <div className="space-y-4">
              {d.news.map((n, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-orange-200 transition group">
                  <div className="h-32 overflow-hidden">
                    <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: d.light, color: d.color }}>{n.cat}</span>
                    <h3 className="mt-2 font-bold text-gray-900 text-sm leading-snug line-clamp-2">{n.title}</h3>
                    <p className="mt-1 text-xs text-gray-400 flex items-center gap-1"><Calendar className="h-3 w-3" />{n.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ACHIEVEMENTS ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl grid place-items-center" style={{ background: d.light }}>
              <Award className="h-5 w-5" style={{ color: d.color }} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Recent Achievements</h2>
              <p className="text-sm text-gray-500">Our athletes making {d.name} proud</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {d.achievements.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 text-center hover:border-orange-200 hover:shadow-md transition">
                <div className="h-14 w-14 rounded-full grid place-items-center text-xl font-black text-white mx-auto mb-3"
                  style={{ background: `linear-gradient(135deg, ${d.color}, #1a1464)` }}>
                  {a.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <p className="font-bold text-gray-900 text-sm">{a.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.sport}</p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold" style={{ color: d.color }}>{a.award}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{a.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Contact District Sports Office</h2>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Contact card */}
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <div className="p-6 text-white" style={{ background: `linear-gradient(135deg, #1a1464, ${d.color})` }}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={mhSeal} alt="" className="h-10 w-10 object-contain brightness-0 invert" />
                  <div>
                    <p className="font-bold text-base">{d.name} District Sports Office</p>
                    <p className="text-white/70 text-xs">Directorate of Sports & Youth Services</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white/90">District Sports Officer</p>
                <p className="text-lg font-black mt-0.5">{d.dso.name}</p>
              </div>
              <div className="bg-white p-5 space-y-3">
                {[
                  { icon: Phone, label: d.dso.phone },
                  { icon: Mail,  label: d.dso.email },
                  { icon: MapPin, label: d.dso.address },
                ].map(({ icon: Ic, label }) => (
                  <div key={label} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="h-8 w-8 rounded-lg grid place-items-center shrink-0 mt-0.5" style={{ background: d.light }}>
                      <Ic className="h-4 w-4" style={{ color: d.color }} />
                    </div>
                    <span className="leading-relaxed">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links + social */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="h-4 w-4" style={{ color: d.color }} /> Quick Links
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Register as Athlete", icon: Users },
                    { label: "Apply for Scholarship", icon: Award },
                    { label: "Book Sports Facility", icon: Building2 },
                    { label: "Upcoming Events", icon: Calendar },
                    { label: "Download Forms", icon: Newspaper },
                    { label: "Grievance Portal", icon: Target },
                  ].map(({ label, icon: Ic }) => (
                    <button key={label}
                      className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 text-xs font-semibold text-gray-700 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50 transition text-left">
                      <Ic className="h-3.5 w-3.5 shrink-0" /> {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Youtube, Instagram].map((Ic, i) => (
                    <button key={i} className="h-10 w-10 rounded-xl grid place-items-center border border-gray-200 text-gray-500 hover:text-white transition"
                      style={{} as React.CSSProperties}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = d.color; (e.currentTarget as HTMLElement).style.borderColor = d.color; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.borderColor = ""; (e.currentTarget as HTMLElement).style.color = ""; }}>
                      <Ic className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-3">
            <img src={mhSeal} alt="" className="h-7 w-7 object-contain" />
            <span>© 2026 {d.name} District Sports Office · Government of Maharashtra</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/district-websites" className="hover:text-[#363092] transition flex items-center gap-1">
              ← Back to All Districts
            </Link>
            <Link to="/" className="hover:text-[#363092] transition">Main Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

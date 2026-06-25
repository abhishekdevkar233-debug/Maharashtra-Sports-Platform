import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Map as MapIcon, Contrast, ChevronDown, ArrowRight,
} from "lucide-react";
import indiaEmblem from "@/assets/india-emblem.png.asset.json";
import mhSeal from "@/assets/mh-seal.png.asset.json";
import digitalIndia from "@/assets/digital-india.png.asset.json";

type MegaCol = { title: string; items: { label: string; desc?: string; to?: string }[] };
type Featured = { tag: string; title: string; cta: string; stat?: string; variant: "indigo" | "orange" | "green" };

const NAV: Array<{
  label: string;
  to?: string;
  mega?: { cols: MegaCol[]; featured: Featured };
  small?: { items: { label: string; to?: string }[] };
}> = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    mega: {
      cols: [
        { title: "Department", items: [
          { label: "About Us", desc: "Vision, mission & values", to: "/about-us" },
          { label: "Organisation Structure", desc: "Departments & hierarchy", to: "/organisation-structure" },
          { label: "Leadership Team", desc: "Directors & officials", to: "/leadership-team" },
        ]},
        { title: "Policies & Reports", items: [
          { label: "Annual Reports" }, { label: "Budget & Finance" }, { label: "RTI Information" },
        ]},
        { title: "Quick Links", items: [{ label: "Social Media" }, { label: "Contact Us" }] },
      ],
      featured: { tag: "FEATURED", title: "39th National Games 2027 — Maharashtra", cta: "Learn More", stat: "2,840+ Registered Athletes", variant: "indigo" },
    },
  },
  {
    label: "Infrastructure",
    mega: {
      cols: [
        { title: "Facilities", items: [
          { label: "Stadiums & Arenas", to: "/stadiums-arenas" },
          { label: "Sports Complexes", to: "/sports-complexes" },
          { label: "Infrastructure Map", to: "/infrastructure-map" },
        ]},
        { title: "Training", items: [
          { label: "Sports Academies", to: "/sports-academies" },
          { label: "Training Centres" }, { label: "Hostels" },
        ]},
        { title: "District-wise", items: [{ label: "District Sports Offices" }, { label: "District Websites" }] },
      ],
      featured: { tag: "FEATURED", title: "Interactive Infrastructure Map — All 36 Districts", cta: "Explore Map", stat: "486 Sports facilities across Maharashtra", variant: "orange" },
    },
  },
  {
    label: "Schemes",
    mega: {
      cols: [
        { title: "Financial Support", items: [
          { label: "Scholarships", desc: "Merit-based awards", to: "/scholarships" },
          { label: "Stipends & Grants", to: "/stipends-grants" },
          { label: "Award Schemes", to: "/award-schemes" },
        ]},
        { title: "Training Programs", items: [
          { label: "Coaching Development" }, { label: "Elite Athlete Programs" },
        ]},
        { title: "Apply Online", items: [
          { label: "Athlete Registration" }, { label: "Scheme Application" }, { label: "Check Status" },
        ]},
      ],
      featured: { tag: "FEATURED", title: "Shiv Chhatrapati Award Applications 2025–26", cta: "Apply Now", stat: "24 Active schemes & programs", variant: "indigo" },
    },
  },
  { label: "Athletes", to: "/olympians" },
  {
    label: "Tournaments",
    mega: {
      cols: [
        { title: "Events", items: [
          { label: "Event Calendar", to: "/event-calendar" },
          { label: "Live Scores", to: "/live-scores" },
          { label: "Results Archive", to: "/results-archive" },
        ]},
        { title: "National Games 2027", items: [
          { label: "39th National Games", desc: "Maharashtra 2027", to: "/national-games" },
          { label: "Venues", to: "/venues" },
        ]},
        { title: "Registration", items: [{ label: "Player Registration" }, { label: "Team Registration" }] },
      ],
      featured: { tag: "LIVE", title: "Maharashtra State Athletics Championship 2025", cta: "View Scores", variant: "green" },
    },
  },
  {
    label: "Media Center",
    mega: {
      cols: [
        { title: "Read", items: [
          { label: "News", desc: "Latest department & sports news", to: "/media-center/news" },
          { label: "Press Releases", desc: "Official communications", to: "/media-center/press-releases" },
        ]},
        { title: "Watch & View", items: [
          { label: "Photo Gallery", desc: "Event & ceremony albums", to: "/media-center/photo-gallery" },
          { label: "Video Gallery", desc: "Highlights & interviews", to: "/media-center/video-gallery" },
        ]},
        { title: "Quick Links", items: [
          { label: "Media Center Home", to: "/media-center" },
          { label: "Press Accreditation" },
          { label: "Brand Assets" },
        ]},
      ],
      featured: { tag: "FEATURED", title: "Shiv Chhatrapati Awards 2025-26 — Highlights Reel", cta: "Watch Now", stat: "12.4K views this week", variant: "indigo" },
    },
  },
  {
    label: "Notices",
    mega: {
      cols: [
        { title: "Updates", items: [
          { label: "Announcements", desc: "Latest department notices", to: "/notices/announcements" },
          { label: "Past Events", desc: "Archive of completed events", to: "/notices/past-events" },
        ]},
        { title: "Opportunities", items: [
          { label: "Recruitments", desc: "Current job openings", to: "/notices/recruitments" },
          { label: "E-Tenders", desc: "Procurement & contracts", to: "/notices/e-tenders" },
        ]},
        { title: "Quick Links", items: [
          { label: "RTI Information" }, { label: "Circulars & Orders" }, { label: "Press Releases" },
        ]},
      ],
      featured: { tag: "NEW", title: "Sports Officer Recruitment 2025 — Apply by 30 Nov", cta: "View Notice", stat: "120+ Active openings", variant: "orange" },
    },
  },
  { label: "Dashboard", to: "/dashboard" },
];

function FeaturedCard({ f }: { f: Featured }) {
  const bg =
    f.variant === "orange" ? "linear-gradient(135deg,#FF6B35,#e85a22)" :
    f.variant === "green" ? "linear-gradient(135deg,#1a6b4a,#0f5238)" :
    "linear-gradient(135deg,#363092,#2a2470)";
  return (
    <div className="rounded-xl p-5 text-white h-full flex flex-col" style={{ background: bg }}>
      <span className="text-[10px] font-bold tracking-wider opacity-80">{f.tag}</span>
      <h4 className="mt-2 text-base font-bold leading-snug">{f.title}</h4>
      <button className="mt-3 inline-flex items-center gap-1 self-start rounded-md border border-white/40 px-3 py-1.5 text-xs font-semibold hover:bg-white/10 transition">
        {f.cta} <ArrowRight className="h-3 w-3" />
      </button>
      {f.stat && (
        <div className="mt-auto pt-4 text-xs opacity-90 border-t border-white/20 mt-4">{f.stat}</div>
      )}
    </div>
  );
}

export function Header() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [contrast, setContrast] = useState(false);

  return (
    <header className="sticky top-0 z-[1000] w-full bg-white shadow-sm">
      {/* Tier 1 - Utility */}
      <div className="h-9 border-b border-gray-200" style={{ background: "#F5F5F5" }}>
        <div className="container-page h-full flex items-center justify-between text-xs">
          <span className="text-gray-500 truncate">महाराष्ट्र शासन | Government of Maharashtra</span>
          <div className="hidden md:flex items-center gap-1 text-gray-700">
            <button className="px-2 py-0.5 rounded-full text-white font-semibold" style={{ background: "#363092" }}>EN</button>
            <button className="px-2 py-0.5 rounded-full hover:bg-gray-200">हिंदी</button>
            <button className="px-2 py-0.5 rounded-full hover:bg-gray-200">मराठी</button>
            <span className="mx-1 h-3 w-px bg-gray-300" />
            <button className="flex items-center gap-1 px-2 py-0.5 rounded-full hover:bg-gray-200"><Search className="h-3 w-3" />Search</button>
            <button className="flex items-center gap-1 px-2 py-0.5 rounded-full hover:bg-gray-200"><MapIcon className="h-3 w-3" />Sitemap</button>
            <span className="mx-1 h-3 w-px bg-gray-300" />
            <button className="px-2 py-0.5 rounded-full hover:bg-gray-200 font-bold">A+</button>
            <button className="px-2 py-0.5 rounded-full hover:bg-gray-200 font-bold">A-</button>
            <button onClick={() => setContrast(c => !c)} className="p-1 rounded-full hover:bg-gray-200" title="High contrast">
              <Contrast className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2 - Main header */}
      <div className="bg-white">
        <div className="container-page flex items-center justify-between gap-4 py-3 md:h-[100px]">
          <div className="flex items-center gap-4 shrink-0">
            <img src={indiaEmblem.url} alt="Government of India" className="h-14 w-14 md:h-16 md:w-16 object-contain" />
            <div className="h-12 w-px bg-gray-200 hidden sm:block" />
          </div>
          <div className="flex-1 text-center min-w-0 px-2">
            <div className="text-[15px] md:text-[17px] font-semibold leading-tight" style={{ color: "#363092" }}>
              क्रीडा व युवक सेवा विभाग
            </div>
            <div className="text-lg md:text-[22px] font-bold leading-tight text-gray-900 truncate">
              Sports &amp; Youth Services Department
            </div>
            <div className="text-[11px] md:text-xs uppercase tracking-wider text-gray-500 mt-0.5">
              Government of Maharashtra
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <img src={mhSeal.url} alt="Maharashtra State Seal" className="h-12 md:h-[60px] w-auto object-contain" />
            <div className="flex flex-col items-center">
              <img src={digitalIndia.url} alt="Digital India" className="h-8 md:h-10 w-auto object-contain" />
              <span className="text-[9px] uppercase tracking-wider text-gray-500 mt-0.5 hidden md:block">Digital India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 3 - Nav */}
      <nav className="border-b border-gray-200 bg-white relative" onMouseLeave={() => setOpenIdx(null)}>
        <div className="container-page h-12 flex items-center justify-between gap-4">
          <ul className="flex items-center justify-center flex-1 overflow-x-auto">
            {NAV.map((n, i) => (
              <li
                key={n.label}
                className="relative"
                onMouseEnter={() => setOpenIdx(n.mega || n.small ? i : null)}
              >
                {n.to ? (
                  <Link
                    to={n.to}
                    className="flex items-center gap-1 px-4 h-12 text-sm font-medium text-gray-700 hover:text-[#363092] border-b-[3px] border-transparent hover:border-[#363092] transition-colors whitespace-nowrap"
                    activeProps={{ style: { color: "#363092", borderBottomColor: "#363092" } }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {n.label}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 px-4 h-12 text-sm font-medium text-gray-700 hover:text-[#363092] border-b-[3px] border-transparent hover:border-[#363092] transition-colors whitespace-nowrap">
                    {n.label} <ChevronDown className="h-3 w-3" />
                  </button>
                )}

                {/* Small dropdown rendered inline */}


                {/* Small dropdown */}
                {openIdx === i && n.small && (
                  <div className="absolute right-0 mt-0 w-[260px] bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-[1001]">
                    {n.small.items.map(it => (
                      it.to
                        ? <Link key={it.label} to={it.to} className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 hover:text-[#363092]">{it.label}</Link>
                        : <a key={it.label} href="#" className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50 hover:text-[#363092]">{it.label}</a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/login" className="h-8 px-4 inline-flex items-center text-sm font-medium rounded-lg border border-[#363092] text-[#363092] hover:bg-[#363092] hover:text-white transition">Login</Link>
            <Link to="/register" className="h-8 px-4 inline-flex items-center text-sm font-medium rounded-lg text-white transition" style={{ background: "#363092" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2a2470")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#363092")}>
              Register
            </Link>
          </div>
        </div>
        {/* Mega menu rendered at nav level for proper centering */}
        {openIdx !== null && NAV[openIdx]?.mega && (
          <div
            className="absolute left-0 right-0 top-full z-[1001] pt-1 px-4"
            onMouseEnter={() => setOpenIdx(openIdx)}
          >
            <div className="mx-auto w-[min(1100px,100%)] bg-white border border-gray-200 rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-5">
              {NAV[openIdx]!.mega!.cols.map((c) => (
                <div key={c.title}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 pb-2 border-b border-gray-200 mb-2">{c.title}</div>
                  <ul className="space-y-1">
                    {c.items.map((it) => {
                      const inner = (
                        <span className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50 group">
                          <span className="h-7 w-7 rounded-md bg-gray-100 group-hover:bg-[#363092]/10 shrink-0" />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-gray-900">{it.label}</span>
                            {it.desc && <span className="block text-xs text-gray-500">{it.desc}</span>}
                          </span>
                        </span>
                      );
                      return (
                        <li key={it.label}>
                          {it.to ? <Link to={it.to}>{inner}</Link> : <a href="#">{inner}</a>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <div><FeaturedCard f={NAV[openIdx]!.mega!.featured} /></div>
            </div>
          </div>
        )}
      </nav>

    </header>
  );
}

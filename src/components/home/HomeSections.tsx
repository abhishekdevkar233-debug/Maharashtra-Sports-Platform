import { useState, useEffect } from "react";
import { ArrowRight, MapPin, Phone, FileText, Award, Users, Shield, AlertCircle, ChevronLeft, ChevronRight, ChevronDown, Trophy, Briefcase, Building2, Target, FileSpreadsheet, ClipboardList } from "lucide-react";

// Leadership photos
import imgFadnavis from "@/assets/leaders/fadnavis.png";
import imgShinde from "@/assets/leaders/shinde.png";
import imgPawar from "@/assets/leaders/pawar.png";
import imgDeol from "@/assets/leaders/deol.png";
import imgSingle from "@/assets/leaders/single.png";

// Team logos
import logoAurangabad from "@/assets/teams/aurangabad.png";
import logoKolhapur from "@/assets/teams/kolhapur.png";
import logoKonkan from "@/assets/teams/konkan.png";
import logoMumbai from "@/assets/teams/mumbai.png";
import logoNagpur from "@/assets/teams/nagpur.png";
import logoNashik from "@/assets/teams/nashik.png";
import logoPune from "@/assets/teams/pune.png";
import logoVidarbha from "@/assets/teams/vidarbha.png";

// News & Announcements images
import newsFeatured from "@/assets/news/khelo-india-medals.png";
import newsScholarships from "@/assets/news/scholarships.png";
import newsKhoKho from "@/assets/news/kho-kho.png";
import newsSportsComplex from "@/assets/news/sports-complex.jpg";

// Directorate section image
import directorateBuilding from "@/assets/directorate-building.png";
import sportsCollage from "@/assets/sports-collage.png";

// Photo & Video Gallery images
import galAsianGames from "@/assets/gallery/asian-games.webp";
import galCricket from "@/assets/gallery/cricket-team.jpg";
import galWrestling from "@/assets/gallery/wrestling.avif";
import galBadminton from "@/assets/gallery/badminton.webp";
import galKheloIndia from "@/assets/gallery/khelo-india.jpg";


const SectionTitle = ({ title, right }: { title: string; right?: React.ReactNode }) => (
  <div className="flex items-end justify-between mb-6 gap-4">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative pl-3 border-l-[3px] border-[#FF6B35]">{title}</h2>
    {right}
  </div>
);

export function LiveUpdates() {
  const cards = [
    { sport: "Kabaddi Championship", a: "Pune Warriors", aLogo: logoPune, b: "Mumbai Tigers", bLogo: logoMumbai, score: "32 – 28", venue: "Balewadi, Pune", time: "Q3 · 12:40" },
    { sport: "State Football League", a: "Nagpur Hawks", aLogo: logoNagpur, b: "Nashik United", bLogo: logoNashik, score: "2 – 1", venue: "Kalyani Nagar", time: "78'" },
    { sport: "Maharashtra Cricket", a: "Vidarbha", aLogo: logoVidarbha, b: "Konkan XI", bLogo: logoKonkan, score: "186/4", venue: "Wankhede", time: "Over 32.4" },
    { sport: "Hockey Championship", a: "Kolhapur FC", aLogo: logoKolhapur, b: "Aurangabad", bLogo: logoAurangabad, score: "3 – 2", venue: "Major Dhyan Chand", time: "Q4" },
  ];
  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <SectionTitle title="Live Sports Updates" right={<a className="text-sm font-semibold text-[#363092] flex items-center gap-1 hover:text-[#FF6B35] transition-colors" href="/live-scores">View All Matches <ArrowRight className="h-3 w-3" /></a>} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(c => (
            <div key={c.sport} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold tracking-wider">● LIVE</span>
                <span className="text-xs text-gray-500">{c.sport}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <img src={c.aLogo} alt={c.a} className="h-14 w-14 rounded-full object-contain bg-gray-50 p-1 ring-1 ring-gray-200" />
                  <span className="text-xs font-medium text-gray-700 text-center">{c.a}</span>
                </div>
                <div className="text-xl font-bold text-gray-900 px-2">{c.score}</div>
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <img src={c.bLogo} alt={c.b} className="h-14 w-14 rounded-full object-contain bg-gray-50 p-1 ring-1 ring-gray-200" />
                  <span className="text-xs font-medium text-gray-700 text-center">{c.b}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
                <span>{c.venue}</span><span>{c.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Leadership() {
  const team = [
    { name: "Shri. Devendra Fadnavis", role: "Hon. Chief Minister", img: imgFadnavis },
    { name: "Shri. Eknath Shinde", role: "Hon. Deputy Chief Minister", img: imgShinde },
    { name: "Smt. Sunetra Ajit Pawar", role: "Hon. Minister", img: imgPawar },
    { name: "Shri. Ranjit Singh Deol IAS", role: "Principal Secretary", img: imgDeol },
    { name: "Shri. Deepak Single IAS", role: "Director, Sports & Youth Services", img: imgSingle },
  ];
  return (
    <section className="py-12" style={{ background: "#F9FAFB" }}>
      <div className="container-page">
        <SectionTitle title="Leadership" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {team.map(p => (
            <div key={p.name} className="text-center">
              <img src={p.img} alt={p.name} className="mx-auto h-32 w-32 rounded-full object-cover object-top bg-gray-200 shadow-md" />
              <div className="mt-4 font-bold text-gray-900 text-base">{p.name}</div>
              <div className="text-sm text-gray-500 mt-1">{p.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsSection() {
  const items = [
    { tag: "Announcement", color: "bg-[#363092]/10 text-[#363092]", date: "May 12, 2026", text: "Applications open for State Sports Scholarships 2026–27", img: newsScholarships },
    { tag: "News", color: "bg-orange-100 text-orange-600", date: "May 18, 2026", text: "Kho-Kho Maharashtra Youth Games to be held from 19th–20th June 2026", img: newsKhoKho },
    { tag: "Update", color: "bg-green-100 text-green-700", date: "May 22, 2026", text: "New Sports Complex inaugurated in Chhatrapati Sambhajinagar", img: newsSportsComplex },
  ];
  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <SectionTitle title="News & Announcements" right={<a className="text-sm font-semibold text-[#363092] flex items-center gap-1 hover:text-[#FF6B35] transition-colors" href="/notices/announcements">View All News <ArrowRight className="h-3 w-3" /></a>} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured card — left half */}
          <div className="relative rounded-2xl overflow-hidden min-h-[360px] bg-gray-800">
            <img src={newsFeatured} alt="Maharashtra wins 186 medals at Khelo India Youth Games 2026" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/20" />
            <div className="relative h-full p-7 flex flex-col justify-end text-white">
              <span className="self-start px-2.5 py-0.5 rounded-md bg-[#FF6B35] text-[10px] font-bold tracking-wider mb-3">FEATURED</span>
              <h3 className="text-2xl md:text-3xl font-bold leading-snug">Maharashtra wins 186 medals at Khelo India Youth Games 2026</h3>
              <div className="mt-3 text-sm text-white/70">June 4, 2026 · Chennai</div>
            </div>
          </div>

          {/* News list — right half */}
          <div className="flex flex-col justify-between gap-4">
            {items.map(it => (
              <div key={it.text} className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-[#363092] hover:shadow-sm transition flex-1">
                <img src={it.img} alt={it.text} className="h-20 w-24 object-cover bg-gray-200 rounded-lg shrink-0" />
                <div className="min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${it.color}`}>{it.tag}</span>
                    <span className="text-xs text-gray-400">{it.date}</span>
                  </div>
                  <div className="mt-1.5 text-base font-semibold text-gray-900 leading-snug">{it.text}</div>
                  <a href="#" className="mt-2 text-xs font-semibold text-[#363092] flex items-center gap-1">Read More <ArrowRight className="h-3 w-3" /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const items = [
    { name: "Asian Games 2023", loc: "Hangzhou, China", img: galAsianGames },
    { name: "Maharashtra Cricket Team", loc: "Victory Celebration", img: galCricket },
    { name: "State Wrestling Championship 2026", loc: "Pune", img: galWrestling },
    { name: "Badminton Training Camp", loc: "Nagpur", img: galBadminton },
    { name: "Khelo India Youth Games 2026", loc: "Chennai, Tamil Nadu", img: galKheloIndia },
  ];
  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <SectionTitle title="Photo & Video Gallery" right={<a className="text-sm font-semibold text-[#363092] flex items-center gap-1 hover:text-[#FF6B35] transition-colors" href="/media-center/photo-gallery">View All Gallery <ArrowRight className="h-3 w-3" /></a>} />
        <div className="flex gap-6 border-b border-gray-200 mb-5">
          <button className="pb-2 text-sm font-semibold border-b-[3px] border-[#363092] text-[#363092]">Photos</button>
          <button className="pb-2 text-sm font-medium text-gray-500">Videos</button>
        </div>
        <div className="relative">
          <div className="grid grid-cols-5 gap-5">
            {items.map(it => (
              <div key={it.name} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl">
                  <img src={it.img} alt={it.name} className="h-[220px] w-full object-cover bg-gray-200 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="mt-3 text-sm font-bold text-gray-900 leading-tight">{it.name}</div>
                <div className="text-xs text-[#FF6B35] mt-0.5">{it.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const items = [
    { i: Trophy, label: "Competition Management", desc: "Organize state and district level competitions" },
    { i: Award, label: "Awards", desc: "Recognise outstanding sporting achievements" },
    { i: Users, label: "5% Reservation", desc: "Reservation benefits for sportspersons" },
    { i: Shield, label: "Grievances", desc: "File and track citizen grievances" },
    { i: FileText, label: "Grace Marks", desc: "Academic grace marks for athletes" },
    { i: AlertCircle, label: "Objection", desc: "Submit formal objections online" },
  ];
  return (
    <section className="py-12" style={{ background: "#F9FAFB" }}>
      <div className="container-page">
        <SectionTitle title="Our Services" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map(({ i: I, label, desc }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-lg p-5 text-center">
              <I className="h-8 w-8 mx-auto text-[#363092]" strokeWidth={1.5} />
              <div className="mt-3 font-bold text-sm text-gray-900">{label}</div>
              <div className="mt-1 text-xs text-gray-500">{desc}</div>
              <a href="#" className="mt-3 text-xs font-semibold text-[#363092] flex items-center justify-center gap-1">Know More <ArrowRight className="h-3 w-3" /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Directorate() {
  const tiles = [
    { i: Target, label: "Mission & Vision", d: "Our guiding principles" },
    { i: Briefcase, label: "Budget", d: "Annual allocations & spend" },
    { i: Building2, label: "Organizational Structure", d: "Departments & hierarchy" },
    { i: ClipboardList, label: "Functions", d: "Roles and responsibilities" },
    { i: FileSpreadsheet, label: "Quotations", d: "Open quotations & bids" },
    { i: FileText, label: "Tenders", d: "Active e-tenders" },
  ];
  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <SectionTitle title="Directorate of Sports and Youth Services" />
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-3">
            <div className="group border border-gray-200 rounded-xl p-4 hover:border-[#363092] hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="overflow-hidden rounded-md">
                <img src={sportsCollage} alt="Directorate of Sports" className="w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ height: 180 }} />
              </div>
              <p className="mt-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">The Directorate is committed to promoting sports, youth welfare and physical education across Maharashtra through policy, programs and partnerships.</p>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiles.map(({ i: I, label, d }) => (
              <div key={label} className="border border-gray-200 rounded-lg p-4">
                <I className="h-7 w-7 text-[#363092]" strokeWidth={1.5} />
                <div className="mt-2 font-bold text-gray-900">{label}</div>
                <div className="text-xs text-gray-500">{d}</div>
                <a href="#" className="mt-3 text-xs font-semibold text-[#363092] flex items-center gap-1">Explore <ArrowRight className="h-3 w-3" /></a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Stylized district positions on the Maharashtra silhouette (viewBox 0 0 400 300)
// plus illustrative facility counts per district.
type District = { n: string; x: number; y: number; dso: number; stad: number; indoor: number; train: number; complex: number };
const DISTRICTS: District[] = [
  { n: "Palghar", x: 96, y: 116, dso: 1, stad: 2, indoor: 3, train: 6, complex: 1 },
  { n: "Thane", x: 108, y: 138, dso: 1, stad: 5, indoor: 8, train: 14, complex: 4 },
  { n: "Mumbai", x: 92, y: 152, dso: 1, stad: 7, indoor: 11, train: 18, complex: 5 },
  { n: "Raigad", x: 112, y: 172, dso: 1, stad: 3, indoor: 4, train: 8, complex: 2 },
  { n: "Ratnagiri", x: 120, y: 210, dso: 1, stad: 2, indoor: 3, train: 7, complex: 2 },
  { n: "Sindhudurg", x: 138, y: 248, dso: 1, stad: 2, indoor: 2, train: 5, complex: 1 },
  { n: "Nashik", x: 142, y: 108, dso: 1, stad: 5, indoor: 7, train: 13, complex: 3 },
  { n: "Dhule", x: 138, y: 78, dso: 1, stad: 2, indoor: 3, train: 6, complex: 1 },
  { n: "Jalgaon", x: 188, y: 78, dso: 1, stad: 3, indoor: 4, train: 9, complex: 2 },
  { n: "Ahmednagar", x: 172, y: 142, dso: 1, stad: 4, indoor: 5, train: 11, complex: 3 },
  { n: "Pune", x: 144, y: 166, dso: 1, stad: 8, indoor: 12, train: 20, complex: 6 },
  { n: "Satara", x: 152, y: 196, dso: 1, stad: 3, indoor: 5, train: 10, complex: 2 },
  { n: "Sangli", x: 182, y: 216, dso: 1, stad: 3, indoor: 4, train: 9, complex: 2 },
  { n: "Kolhapur", x: 162, y: 232, dso: 1, stad: 4, indoor: 6, train: 12, complex: 3 },
  { n: "Solapur", x: 216, y: 188, dso: 1, stad: 4, indoor: 5, train: 11, complex: 3 },
  { n: "Chh. Sambhajinagar", x: 210, y: 122, dso: 1, stad: 4, indoor: 6, train: 12, complex: 3 },
  { n: "Jalna", x: 236, y: 128, dso: 1, stad: 2, indoor: 3, train: 7, complex: 1 },
  { n: "Beed", x: 234, y: 160, dso: 1, stad: 2, indoor: 4, train: 8, complex: 2 },
  { n: "Latur", x: 270, y: 176, dso: 1, stad: 3, indoor: 4, train: 9, complex: 2 },
  { n: "Nanded", x: 300, y: 152, dso: 1, stad: 3, indoor: 5, train: 10, complex: 2 },
  { n: "Akola", x: 250, y: 92, dso: 1, stad: 2, indoor: 3, train: 7, complex: 1 },
  { n: "Amravati", x: 272, y: 96, dso: 1, stad: 3, indoor: 4, train: 9, complex: 2 },
  { n: "Wardha", x: 304, y: 120, dso: 1, stad: 2, indoor: 3, train: 7, complex: 1 },
  { n: "Nagpur", x: 322, y: 100, dso: 1, stad: 6, indoor: 9, train: 16, complex: 4 },
  { n: "Chandrapur", x: 330, y: 150, dso: 1, stad: 3, indoor: 4, train: 8, complex: 2 },
  { n: "Gadchiroli", x: 356, y: 152, dso: 1, stad: 1, indoor: 2, train: 5, complex: 1 },
];

/* ---- Mini Maharashtra map rendered from GeoJSON ---- */
type DistrictPath = { name: string; d: string; cx: number; cy: number };
type MiniGeo = { vw: number; vh: number; districts: DistrictPath[] };

function buildMiniGeo(fc: any): MiniGeo {
  const VW = 400, PAD = 8;
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  const rings = (g: any): number[][][] =>
    g.type === "Polygon" ? g.coordinates : g.coordinates.flat();
  for (const f of fc.features)
    for (const ring of rings(f.geometry))
      for (const [lo, la] of ring) {
        if (lo < minLon) minLon = lo; if (lo > maxLon) maxLon = lo;
        if (la < minLat) minLat = la; if (la > maxLat) maxLat = la;
      }
  const ls = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180);
  const scale = (VW - PAD * 2) / ((maxLon - minLon) * ls);
  const VH = (maxLat - minLat) * scale + PAD * 2;
  const px = (lo: number, la: number) => [
    (lo * ls - minLon * ls) * scale + PAD,
    (maxLat - la) * scale + PAD,
  ];
  const districts = fc.features.map((f: any) => {
    let d = "", nx = Infinity, ny = Infinity, xx = -Infinity, xy = -Infinity;
    for (const ring of rings(f.geometry)) {
      ring.forEach(([lo, la]: number[], i: number) => {
        const [x, y] = px(lo, la);
        if (x < nx) nx = x; if (y < ny) ny = y;
        if (x > xx) xx = x; if (y > xy) xy = y;
        d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
      });
      d += "Z";
    }
    return { name: f.properties.district, d, cx: (nx + xx) / 2, cy: (ny + xy) / 2 };
  });
  return { vw: VW, vh: VH, districts };
}

function MiniMaharashtraMap({ selected, onSelect }: { selected: string; onSelect: (n: string) => void }) {
  const [geo, setGeo] = useState<MiniGeo | null>(null);
  useEffect(() => {
    fetch("/maharashtra-districts.geojson").then(r => r.json()).then(fc => setGeo(buildMiniGeo(fc))).catch(() => {});
  }, []);
  if (!geo) return <div className="h-full grid place-items-center text-white/40 text-xs">Loading map…</div>;
  return (
    <svg viewBox={`0 0 ${geo.vw} ${geo.vh}`} className="w-full h-auto select-none">
      {geo.districts.map(dg => {
        const active = dg.name === selected;
        return (
          <g key={dg.name} onClick={() => onSelect(dg.name)} className="cursor-pointer">
            <path
              d={dg.d}
              fill={active ? "rgba(255,107,53,0.55)" : "rgba(255,255,255,0.10)"}
              stroke={active ? "#FF6B35" : "rgba(255,255,255,0.30)"}
              strokeWidth={active ? 1.5 : 0.6}
              className="transition-all duration-200 hover:fill-[rgba(255,107,53,0.3)]"
            >
              <title>{dg.name}</title>
            </path>
            {active && (
              <>
                <circle cx={dg.cx} cy={dg.cy} r={6} fill="#FF6B35" opacity={0.35} className="animate-ping" />
                <circle cx={dg.cx} cy={dg.cy} r={4} fill="#FF6B35" stroke="#fff" strokeWidth={1} />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function DistrictFinder() {
  const [selected, setSelected] = useState<District>(DISTRICTS.find(d => d.n === "Kolhapur")!);

  return (
    <section className="py-12 text-white" style={{ background: "#1a237e" }}>
      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Find Sports Offices and Facilities in Your District</h2>
          <p className="mt-3 text-white/70 text-sm max-w-md">Search across all 36 districts of Maharashtra to discover stadiums, training centres, sports academies and district sports offices near you.</p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <select
                value={selected.n}
                onChange={(e) => setSelected(DISTRICTS.find(d => d.n === e.target.value)!)}
                className="w-full h-12 pl-4 pr-10 rounded-lg text-gray-900 bg-white border border-white/20 shadow-sm appearance-none cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              >
                {DISTRICTS.map(d => <option key={d.n} value={d.n}>{d.n}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
            <button className="h-12 px-6 rounded-lg font-semibold text-white shrink-0 hover:brightness-110 transition" style={{ background: "#FF6B35" }}>Search District</button>
          </div>
          <div className="mt-4 text-xs text-white/50">Tip: click any marker on the map to select a district.</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Interactive Maharashtra map */}
          <div className="relative bg-white/10 rounded-xl p-2 overflow-hidden">
            <MiniMaharashtraMap
              selected={selected.n}
              onSelect={(name) => {
                const d = DISTRICTS.find(d => d.n === name);
                if (d) setSelected(d);
              }}
            />
            <div className="absolute bottom-2 left-3 text-[10px] uppercase tracking-wider text-white/40">Maharashtra · 36 Districts</div>
          </div>

          {/* Selected district stats */}
          <div className="bg-white/10 rounded-lg p-5">
            <div className="text-xs uppercase text-white/60 tracking-wider">Selected District</div>
            <div className="text-xl font-bold mt-1 flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#FF6B35]" />{selected.n}</div>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li className="flex justify-between"><span>District Sports Office</span><span className="font-semibold text-white">{selected.dso}</span></li>
              <li className="flex justify-between"><span>Stadiums</span><span className="font-semibold text-white">{selected.stad}</span></li>
              <li className="flex justify-between"><span>Indoor Facilities</span><span className="font-semibold text-white">{selected.indoor}</span></li>
              <li className="flex justify-between"><span>Training Centres</span><span className="font-semibold text-white">{selected.train}</span></li>
              <li className="flex justify-between"><span>Sports Complex</span><span className="font-semibold text-white">{selected.complex}</span></li>
            </ul>
            <a href="#" className="mt-4 inline-flex text-sm font-semibold text-[#FF6B35] items-center gap-1">View All Facilities <ArrowRight className="h-3 w-3" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Downloads() {
  const items = [
    { label: "GRs", color: "bg-orange-100 text-orange-600" },
    { label: "List Of Competitions", color: "bg-teal-100 text-teal-600" },
    { label: "Anti Doping", color: "bg-red-100 text-red-600" },
    { label: "Citizen Charter", color: "bg-indigo-100 text-indigo-600" },
    { label: "RTI", color: "bg-purple-100 text-purple-600" },
    { label: "Right to Public Service Act", color: "bg-green-100 text-green-600" },
    { label: "Important Links", color: "bg-yellow-100 text-yellow-700" },
    { label: "Mission Lakshyavedh", color: "bg-pink-100 text-pink-600" },
  ];
  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <SectionTitle title="Downloads & Information" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {items.map(it => (
            <div key={it.label} className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <div className={`h-16 w-16 mx-auto rounded-xl grid place-items-center ${it.color}`}><FileText className="h-8 w-8" /></div>
              <div className="mt-4 text-sm font-bold text-gray-900 min-h-[2.5rem] leading-snug">{it.label}</div>
              <a href="#" className="mt-3 text-xs font-semibold text-[#363092] flex justify-center items-center gap-1">View All <ArrowRight className="h-3 w-3" /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

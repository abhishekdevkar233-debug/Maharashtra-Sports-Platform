import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import {
  Home, ShieldCheck, Calendar, MapPin, Users, ArrowRight, CheckCircle2,
  FileText, ClipboardList, Phone, Mail, Search, Filter, X,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/hostel-schemes")({
  head: () => ({ meta: [
    { title: "Hostel Schemes — Sports & Youth Services Maharashtra" },
    { name: "description", content: "Sports hostel facilities and residential programs for Maharashtra athletes." },
  ] }),
  component: Page,
});

const HOSTELS = [
  { name: "Shiv Chhatrapati Sports Complex Hostel", city: "Pune", district: "Pune", capacity: 200, sports: ["Athletics", "Wrestling", "Boxing", "Weightlifting"], facilities: ["Gymnasium", "Swimming Pool", "Mess Hall", "Study Room", "Medical Centre"], type: "State Elite", color: "#363092" },
  { name: "Dr. Babasaheb Ambedkar Sports Hostel", city: "Nagpur", district: "Nagpur", capacity: 150, sports: ["Kabaddi", "Kho-Kho", "Football", "Hockey"], facilities: ["Indoor Hall", "Playground", "Cafeteria", "Library", "Wi-Fi"], type: "Regional", color: "#FF6B35" },
  { name: "Chatrapati Sambhajinagar Sports Hostel", city: "Chhatrapati Sambhajinagar", district: "Chhatrapati Sambhajinagar", capacity: 120, sports: ["Cricket", "Badminton", "Table Tennis", "Swimming"], facilities: ["Cricket Ground", "Indoor Courts", "Mess", "CCTV", "Medical Room"], type: "Regional", color: "#0d9488" },
  { name: "Nashik District Sports Hostel", city: "Nashik", district: "Nashik", capacity: 100, sports: ["Archery", "Athletics", "Volleyball", "Basketball"], facilities: ["Archery Range", "Track", "Mess Hall", "Study Room", "Wi-Fi"], type: "District", color: "#7c3aed" },
  { name: "Kolhapur Sports Hostel", city: "Kolhapur", district: "Kolhapur", capacity: 80, sports: ["Wrestling", "Kabaddi", "Football", "Athletics"], facilities: ["Wrestling Mat", "Gymnasium", "Cafeteria", "Recreation Room"], type: "District", color: "#0891b2" },
  { name: "Amravati Sports Hostel", city: "Amravati", district: "Amravati", capacity: 90, sports: ["Kabaddi", "Kho-Kho", "Athletics", "Cricket"], facilities: ["Playground", "Indoor Hall", "Mess", "Library", "Medical Room"], type: "District", color: "#d97706" },
];

const TYPES = ["All", "State Elite", "Regional", "District", "Women"];
const ALL_SPORTS = ["All Sports", "Athletics", "Wrestling", "Boxing", "Weightlifting", "Kabaddi", "Kho-Kho", "Football", "Hockey", "Cricket", "Badminton", "Table Tennis", "Swimming", "Archery", "Volleyball", "Basketball"];

function BadgeType({ type, color }: { type: string; color: string }) {
  return (
    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: `${color}18`, color }}>
      {type}
    </span>
  );
}

function Page() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [activeSport, setActiveSport] = useState("All Sports");

  const filtered = HOSTELS.filter(h => {
    const matchType = activeType === "All" || h.type === activeType;
    const matchSport = activeSport === "All Sports" || h.sports.includes(activeSport);
    const q = query.toLowerCase();
    const matchQuery = q === "" || h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q) || h.district.toLowerCase().includes(q) || h.sports.some(s => s.toLowerCase().includes(q)) || h.facilities.some(f => f.toLowerCase().includes(q));
    return matchType && matchSport && matchQuery;
  });

  const hasFilters = query || activeType !== "All" || activeSport !== "All Sports";
  const clearAll = () => { setQuery(""); setActiveType("All"); setActiveSport("All Sports"); };

  return (
    <>
      <PageHero
        eyebrow="Schemes / Hostel"
        title="Sports Hostel Schemes"
        subtitle="Residential facilities and accommodation programs empowering Maharashtra athletes to train, study and excel — all under one roof."
      />


      {/* Hostel Search & Locations */}
      <SectionWrap>
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by hostel name, city, district, sport or facility…"
              className="w-full h-13 py-3.5 pl-12 pr-10 rounded-xl border border-gray-200 bg-white focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/10 outline-none text-sm shadow-sm"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-gray-400 shrink-0" />
            <div className="flex flex-wrap gap-2">
              {TYPES.map(t => (
                <button key={t} onClick={() => setActiveType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${activeType === t ? "bg-[#363092] text-white border-[#363092]" : "bg-white text-gray-600 border-gray-200 hover:border-[#363092]"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="h-5 w-px bg-gray-200 hidden sm:block" />
            <select value={activeSport} onChange={e => setActiveSport(e.target.value)}
              className="h-9 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 bg-white focus:border-[#363092] outline-none">
              {ALL_SPORTS.map(s => <option key={s}>{s}</option>)}
            </select>
            {hasFilters && (
              <button onClick={clearAll} className="h-9 px-3 rounded-lg border border-red-200 text-xs font-semibold text-red-500 hover:bg-red-50 transition flex items-center gap-1">
                <X className="h-3.5 w-3.5" /> Clear All
              </button>
            )}
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-900">{filtered.length}</span> of {HOSTELS.length} hostels
            </p>
            {hasFilters && <p className="text-xs text-[#363092] font-semibold">Filters active</p>}
          </div>
        </div>

        {/* Cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(h => (
              <div key={h.name} className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-[#363092] hover:shadow-lg transition-all duration-200">
                <div className="h-2" style={{ background: h.color }} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${h.color}15` }}>
                      <Home className="h-5 w-5" style={{ color: h.color }} />
                    </div>
                    <BadgeType type={h.type} color={h.color} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#363092] transition">{h.name}</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5 text-[#FF6B35] shrink-0" /> {h.city}, {h.district}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                    <Users className="h-3.5 w-3.5 text-[#363092] shrink-0" /> Capacity: <span className="font-semibold text-gray-900 ml-1">{h.capacity} athletes</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {h.sports.map(s => (
                      <span key={s} className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition ${activeSport === s ? "bg-[#363092] text-white" : "bg-gray-100 text-gray-600"}`}>{s}</span>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1.5">Facilities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {h.facilities.map(f => (
                        <span key={f} className="inline-flex items-center gap-1 text-[11px] text-gray-600">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link to="/register/youth-club"
                    className="mt-4 w-full h-9 rounded-xl border border-gray-200 hover:bg-[#363092] hover:text-white hover:border-[#363092] text-sm font-semibold text-gray-600 flex items-center justify-center gap-1.5 transition">
                    Apply for Admission <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Home className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-500">No hostels found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different search term or clear the filters</p>
            <button onClick={clearAll} className="mt-4 px-6 py-2.5 rounded-xl bg-[#363092] text-white text-sm font-semibold hover:bg-[#2a2470] transition">
              Clear Filters
            </button>
          </div>
        )}
      </SectionWrap>

      {/* How to Apply */}
      <SectionWrap alt>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">How to Apply</h2>
          <p className="text-sm text-gray-500 mt-1">Simple 4-step process to secure your hostel admission.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200 z-0" />
          {[
            { step: 1, icon: ClipboardList, title: "Register Online", desc: "Create your athlete profile on the portal with Aadhaar and sports details." },
            { step: 2, icon: FileText, title: "Submit Documents", desc: "Upload eligibility proof, achievement certificates and medical fitness report." },
            { step: 3, icon: ShieldCheck, title: "Verification", desc: "District Sports Office verifies documents within 7–10 working days." },
            { step: 4, icon: Home, title: "Allotment", desc: "Receive your hostel allotment letter and report on the joining date." },
          ].map(({ step, icon: I, title, desc }) => (
            <div key={step} className="relative z-10 bg-white rounded-2xl border border-gray-200 p-5 text-center hover:border-[#363092] hover:shadow-sm transition">
              <div className="h-12 w-12 rounded-full bg-[#363092] grid place-items-center mx-auto text-white font-black text-sm mb-4 shadow-lg">{step}</div>
              <I className="h-6 w-6 text-[#363092] mx-auto mb-2" />
              <h4 className="font-bold text-gray-900">{title}</h4>
              <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">{desc}</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-[#FF6B35] font-semibold">
                <Calendar className="h-3 w-3" /> Apply: July – September
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/register/youth-club"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-sm transition hover:opacity-90 shadow-lg"
            style={{ background: "linear-gradient(135deg,#363092,#2a2470)" }}>
            Start Your Application <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionWrap>

      {/* Contact CTA */}
      <SectionWrap alt>
        <div className="rounded-2xl text-white p-8 md:p-12 text-center" style={{ background: "linear-gradient(135deg,#363092 0%,#2a2470 100%)" }}>
          <h2 className="text-2xl md:text-3xl font-black">Need help with hostel admission?</h2>
          <p className="mt-2 text-white/70 max-w-lg mx-auto">Our hostel management team is available Mon–Fri, 10 AM – 6 PM to assist with applications, documents and queries.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="tel:+912025533333" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#363092] font-bold text-sm hover:bg-gray-100 transition">
              <Phone className="h-4 w-4" /> Call Help Desk
            </a>
            <a href="mailto:hostel@sports.maharashtra.gov.in" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/30 text-white font-bold text-sm hover:bg-white/10 transition">
              <Mail className="h-4 w-4" /> hostel@sports.maharashtra.gov.in
            </a>
          </div>
        </div>
      </SectionWrap>
    </>
  );
}

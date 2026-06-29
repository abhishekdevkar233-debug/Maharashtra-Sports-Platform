import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { useState } from "react";
import { Search, Globe, MapPin, X, ExternalLink, Layout } from "lucide-react";
import { DistrictWebsiteTemplate } from "@/components/district/DistrictWebsiteTemplate";

export const Route = createFileRoute("/district-websites/")({
  head: () => ({ meta: [{ title: "District Websites — DSYS Maharashtra" }] }),
  component: DistrictWebsites,
});

const PRIMARY = "#363092";

const DIVISIONS: Record<string, string[]> = {
  "Konkan":      ["Mumbai City", "Mumbai Suburban", "Thane", "Raigad", "Ratnagiri", "Sindhudurg"],
  "Nashik":      ["Nashik", "Dhule", "Nandurbar", "Jalgaon", "Ahmednagar"],
  "Pune":        ["Pune", "Solapur", "Satara", "Sangli", "Kolhapur"],
  "Aurangabad":  ["Aurangabad", "Jalna", "Beed", "Latur", "Osmanabad", "Nanded", "Hingoli", "Parbhani"],
  "Amravati":    ["Amravati", "Akola", "Washim", "Buldhana", "Yavatmal"],
  "Nagpur":      ["Nagpur", "Wardha", "Bhandara", "Gondiya", "Chandrapur", "Gadchiroli"],
};

const DIVISION_COLORS: Record<string, { bg: string; accent: string; text: string }> = {
  "Konkan":     { bg: "#EFF6FF", accent: "#2563EB", text: "#1D4ED8" },
  "Nashik":     { bg: "#F0FDF4", accent: "#16A34A", text: "#15803D" },
  "Pune":       { bg: "#FFF7ED", accent: "#EA580C", text: "#C2410C" },
  "Aurangabad": { bg: "#FAF5FF", accent: "#7C3AED", text: "#6D28D9" },
  "Amravati":   { bg: "#FFF1F2", accent: "#E11D48", text: "#BE123C" },
  "Nagpur":     { bg: "#ECFDF5", accent: "#0D9488", text: "#0F766E" },
};

const DISTRICT_URLS: Record<string, string> = {
  "Mumbai City":      "https://mumbaicity.gov.in",
  "Mumbai Suburban":  "https://mumbaisuburban.gov.in",
  "Thane":            "https://thane.gov.in",
  "Raigad":           "https://raigad.gov.in",
  "Ratnagiri":        "https://ratnagiri.gov.in",
  "Sindhudurg":       "https://sindhudurg.gov.in",
  "Nashik":           "https://nashik.gov.in",
  "Dhule":            "https://dhule.gov.in",
  "Nandurbar":        "https://nandurbar.gov.in",
  "Jalgaon":          "https://jalgaon.gov.in",
  "Ahmednagar":       "https://ahmednagar.gov.in",
  "Pune":             "https://pune.gov.in",
  "Solapur":          "https://solapur.gov.in",
  "Satara":           "https://satara.gov.in",
  "Sangli":           "https://sangli.gov.in",
  "Kolhapur":         "https://kolhapur.gov.in",
  "Aurangabad":       "https://aurangabad.gov.in",
  "Jalna":            "https://jalna.gov.in",
  "Beed":             "https://beed.gov.in",
  "Latur":            "https://latur.gov.in",
  "Osmanabad":        "https://osmanabad.gov.in",
  "Nanded":           "https://nanded.gov.in",
  "Hingoli":          "https://hingoli.gov.in",
  "Parbhani":         "https://parbhani.gov.in",
  "Amravati":         "https://amravati.gov.in",
  "Akola":            "https://akola.gov.in",
  "Washim":           "https://washim.gov.in",
  "Buldhana":         "https://buldhana.gov.in",
  "Yavatmal":         "https://yavatmal.gov.in",
  "Nagpur":           "https://nagpur.gov.in",
  "Wardha":           "https://wardha.gov.in",
  "Bhandara":         "https://bhandara.gov.in",
  "Gondiya":          "https://gondiya.gov.in",
  "Chandrapur":       "https://chandrapur.gov.in",
  "Gadchiroli":       "https://gadchiroli.gov.in",
};

function districtSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function districtInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

const ALL_DISTRICTS = Object.values(DIVISIONS).flat();

function DistrictCard({ name, colors, division }: {
  name: string;
  colors: { bg: string; accent: string; text: string };
  division?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const url = DISTRICT_URLS[name] ?? `https://${districtSlug(name)}.sports.maharashtra.gov.in`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border bg-white transition-all duration-200 text-center cursor-pointer"
      style={{
        borderColor: hovered ? colors.accent + "80" : "#E5E7EB",
        boxShadow: hovered ? `0 4px 16px -4px ${colors.accent}30` : "none",
        textDecoration: "none",
      }}
    >
      <div
        className="h-12 w-12 rounded-xl grid place-items-center text-sm font-black transition-transform duration-200"
        style={{ background: colors.bg, color: colors.accent, transform: hovered ? "scale(1.1)" : "scale(1)" }}
      >
        {districtInitials(name)}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-900 leading-snug">{name}</p>
        {division && <p className="text-[10px] text-gray-400 mt-0.5">{division}</p>}
      </div>
      <div className="flex items-center gap-1 text-[10px] font-semibold transition-opacity duration-200"
        style={{ color: colors.accent, opacity: hovered ? 1 : 0 }}>
        <ExternalLink className="h-3 w-3" /> Visit portal
      </div>
    </a>
  );
}

function DistrictWebsites() {
  const [query, setQuery] = useState("");
  const [activeDivision, setActiveDivision] = useState("All");
  const [showTemplate, setShowTemplate] = useState(false);
  const divisions = ["All", ...Object.keys(DIVISIONS)];

  const filtered = ALL_DISTRICTS.filter(d => {
    const matchDiv = activeDivision === "All" || DIVISIONS[activeDivision]?.includes(d);
    const matchQ   = query === "" || d.toLowerCase().includes(query.toLowerCase());
    return matchDiv && matchQ;
  });

  const getDivision = (d: string) =>
    Object.entries(DIVISIONS).find(([, dists]) => dists.includes(d))?.[0] ?? "";

  return (
    <>
      {showTemplate && <DistrictWebsiteTemplate onClose={() => setShowTemplate(false)} />}

      <PageHero
        eyebrow="Infrastructure"
        title="District Sports Websites"
        subtitle="Official sports portals for all 36 districts of Maharashtra — your gateway to local sports offices, events, and athlete support."
      />

      <div style={{ background: PRIMARY }}>
        <div className="container-page py-4">
          <div className="grid grid-cols-3 divide-x divide-white/20">
            {[["36","Districts"],["6","Divisions"],["486","Sports Facilities"]].map(([v,l]) => (
              <div key={l} className="px-6 text-center">
                <div className="text-2xl font-black text-white">{v}</div>
                <div className="text-[11px] text-white/60 uppercase tracking-widest mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionWrap>
        {/* Website Template button */}
        <div className="mb-6 flex items-center justify-between p-5 rounded-2xl border-2 border-dashed border-[#363092]/30 bg-[#363092]/5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl grid place-items-center shrink-0" style={{ background: "#363092" }}>
              <Layout className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-sm font-black text-gray-900">District Website Template</div>
              <div className="text-xs text-gray-500 mt-0.5">Preview the standard district sports website design — ready to deploy for any district</div>
            </div>
          </div>
          <button onClick={() => setShowTemplate(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition shrink-0 shadow-md"
            style={{ background: "#363092" }}>
            <Layout className="h-4 w-4" /> View Website Template
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search district…"
              className="w-full h-11 pl-10 pr-10 rounded-xl border border-gray-200 text-sm focus:border-[#363092] outline-none" />
            {query && <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"><X className="h-4 w-4" /></button>}
          </div>
          <div className="flex flex-wrap gap-2">
            {divisions.map(div => (
              <button key={div} onClick={() => setActiveDivision(div)}
                className="h-11 px-4 rounded-xl text-sm font-semibold border transition whitespace-nowrap"
                style={activeDivision === div
                  ? { background: PRIMARY, color: "#fff", borderColor: PRIMARY }
                  : { background: "#fff", color: "#374151", borderColor: "#E5E7EB" }}>
                {div}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">Showing <span className="font-bold text-gray-900">{filtered.length}</span> of 36 districts
            {activeDivision !== "All" && <span className="ml-1 text-[#363092] font-semibold">· {activeDivision} Division</span>}
          </p>
          <span className="text-xs text-gray-400 flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> Click a card to visit the district portal</span>
        </div>

        {query === "" && activeDivision === "All" ? (
          <div className="space-y-10">
            {Object.entries(DIVISIONS).map(([division, districts]) => {
              const colors = DIVISION_COLORS[division];
              return (
                <div key={division}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-lg grid place-items-center shrink-0" style={{ background: colors.bg }}>
                      <MapPin className="h-4 w-4" style={{ color: colors.accent }} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-gray-900">{division} Division</h2>
                      <p className="text-xs text-gray-400">{districts.length} districts</p>
                    </div>
                    <div className="flex-1 h-px bg-gray-100 ml-2" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {districts.map(d => <DistrictCard key={d} name={d} colors={colors} />)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filtered.map(d => {
              const div = getDivision(d);
              const colors = DIVISION_COLORS[div] ?? { bg: "#F3F4F6", accent: "#6B7280", text: "#374151" };
              return <DistrictCard key={d} name={d} colors={colors} division={div} />;
            })}
            {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-400">
                <Globe className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No districts found for "{query}"</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-gray-100 bg-gray-50 p-5 flex items-start gap-4">
          <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0" style={{ background: `${PRIMARY}15` }}>
            <Globe className="h-4 w-4" style={{ color: PRIMARY }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">About District Sports Portals</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Each district website is maintained by the respective District Sports Office under the supervision of the
              Directorate of Sports &amp; Youth Services, Government of Maharashtra. For technical issues contact <span className="text-[#363092] font-medium">support@sports.maharashtra.gov.in</span>
            </p>
          </div>
        </div>
      </SectionWrap>
    </>
  );
}

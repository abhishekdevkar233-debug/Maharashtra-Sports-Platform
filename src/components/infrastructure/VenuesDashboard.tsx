import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUpLib from "react-countup";

// react-countup ships as CJS without an __esModule flag, so the default import
// can resolve to the module object instead of the component. Unwrap defensively.
const CountUp = ((CountUpLib as any).default ?? CountUpLib) as typeof CountUpLib;
import { Search, RotateCcw, X, MapPin, Building2, Waves, Dumbbell, Target, Footprints } from "lucide-react";

/* ----------------------------- Data ----------------------------- */
// [stadiums, indoorHalls, swimmingPools, trainingCenters, athleticsTracks]
const INFRA: Record<string, [number, number, number, number, number]> = {
  Pune: [8, 12, 6, 20, 5], Mumbai: [7, 11, 5, 18, 4], Nagpur: [6, 9, 4, 16, 4],
  Thane: [5, 8, 4, 14, 3], Nashik: [5, 7, 3, 13, 3], Aurangabad: [4, 6, 3, 12, 3],
  Kolhapur: [4, 6, 3, 12, 2], Solapur: [4, 5, 2, 11, 3], Ahmednagar: [4, 5, 2, 11, 2],
  Amravati: [3, 4, 2, 9, 2], Sangli: [3, 4, 2, 9, 2], Satara: [3, 5, 2, 10, 2],
  Jalgaon: [3, 4, 2, 9, 2], Nanded: [3, 5, 2, 10, 2], Latur: [3, 4, 1, 9, 2],
  Raigad: [3, 4, 2, 8, 2], Ratnagiri: [2, 3, 1, 7, 2], Dhule: [2, 3, 1, 6, 1],
  Akola: [2, 3, 1, 7, 1], Chandrapur: [3, 4, 1, 8, 2], Beed: [2, 4, 1, 8, 2],
  Jalna: [2, 3, 1, 7, 1], Palghar: [2, 3, 1, 6, 1], Yavatmal: [2, 3, 1, 7, 1],
  Buldhana: [2, 3, 1, 7, 1], Wardha: [2, 3, 1, 7, 1], Parbhani: [2, 3, 1, 7, 1],
  Bhandara: [2, 2, 1, 6, 1], Gondia: [1, 2, 1, 5, 1], Osmanabad: [2, 3, 1, 7, 1],
  Hingoli: [1, 2, 1, 5, 1], Washim: [1, 2, 1, 5, 1], Nandurbar: [1, 2, 1, 5, 1],
  Sindhudurg: [2, 2, 1, 5, 1], Gadchiroli: [1, 1, 0, 4, 1],
};

const REGION: Record<string, string> = {};
const assignRegion = (names: string[], r: string) => names.forEach(n => (REGION[n] = r));
assignRegion(["Mumbai", "Thane", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg"], "Konkan");
assignRegion(["Pune", "Satara", "Sangli", "Kolhapur", "Solapur", "Ahmednagar"], "Western Maharashtra");
assignRegion(["Nashik", "Dhule", "Nandurbar", "Jalgaon"], "North Maharashtra");
assignRegion(["Aurangabad", "Jalna", "Beed", "Latur", "Osmanabad", "Nanded", "Parbhani", "Hingoli"], "Marathwada");
assignRegion(["Nagpur", "Wardha", "Chandrapur", "Gadchiroli", "Bhandara", "Gondia", "Amravati", "Akola", "Washim", "Buldhana", "Yavatmal"], "Vidarbha");

const REGIONS = ["All", "Konkan", "Western Maharashtra", "North Maharashtra", "Marathwada", "Vidarbha"];
const FACILITIES = ["All", "Stadiums", "Indoor Halls", "Swimming Pools", "Training Centers", "Athletics Tracks"] as const;
type Facility = (typeof FACILITIES)[number];
const FAC_INDEX: Record<Facility, number> = { All: -1, Stadiums: 0, "Indoor Halls": 1, "Swimming Pools": 2, "Training Centers": 3, "Athletics Tracks": 4 };

const totalOf = (n: string) => (INFRA[n] ? INFRA[n].reduce((a, b) => a + b, 0) : 0);
const metricOf = (n: string, f: Facility) => {
  if (!INFRA[n]) return 0;
  return f === "All" ? totalOf(n) : INFRA[n][FAC_INDEX[f]];
};

// Orange sequential scale (light -> dark)
const SCALE = ["#FFEAD7", "#FFCBA0", "#FFA868", "#FF7A1F", "#E85D00"];
const colorFor = (val: number, max: number) => {
  if (max <= 0) return SCALE[0];
  const r = val / max;
  if (r > 0.8) return SCALE[4];
  if (r > 0.6) return SCALE[3];
  if (r > 0.4) return SCALE[2];
  if (r > 0.2) return SCALE[1];
  return SCALE[0];
};

/* ------------------------- Projection helpers ------------------------- */
type Ring = number[][];
function ringsOf(geom: any): Ring[] {
  if (geom.type === "Polygon") return geom.coordinates;
  if (geom.type === "MultiPolygon") return geom.coordinates.flat();
  return [];
}

type DistrictGeo = { name: string; d: string; cx: number; cy: number; bw: number; bh: number };
type Geo = { VW: number; VH: number; districts: DistrictGeo[] };

function buildGeo(fc: any): Geo {
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  for (const f of fc.features) for (const ring of ringsOf(f.geometry)) for (const [lon, lat] of ring) {
    if (lon < minLon) minLon = lon; if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat; if (lat > maxLat) maxLat = lat;
  }
  const lonScale = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180);
  const rawMinX = minLon * lonScale, rawMaxX = maxLon * lonScale;
  const rawMinY = -maxLat, rawMaxY = -minLat;
  const pad = 16, VW = 820;
  const scale = (VW - pad * 2) / (rawMaxX - rawMinX);
  const VH = (rawMaxY - rawMinY) * scale + pad * 2;
  const project = (lon: number, lat: number): [number, number] => [
    (lon * lonScale - rawMinX) * scale + pad,
    (-lat - rawMinY) * scale + pad,
  ];

  const districts: DistrictGeo[] = fc.features.map((f: any) => {
    let d = "", nx = Infinity, ny = Infinity, xx = -Infinity, xy = -Infinity;
    for (const ring of ringsOf(f.geometry)) {
      ring.forEach(([lon, lat], i) => {
        const [x, y] = project(lon, lat);
        if (x < nx) nx = x; if (y < ny) ny = y; if (x > xx) xx = x; if (y > xy) xy = y;
        d += (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
      });
      d += "Z";
    }
    return { name: f.properties.district, d, cx: (nx + xx) / 2, cy: (ny + xy) / 2, bw: xx - nx, bh: xy - ny };
  });
  return { VW, VH, districts };
}

/* ------------------------------ Component ------------------------------ */
const KPIS = [
  { icon: "🏟", label: "Total Venues", key: "total" as const },
  { icon: "🏊", label: "Swimming Pools", key: "swimmingPools" as const },
  { icon: "🏸", label: "Indoor Sports Halls", key: "indoorHalls" as const },
  { icon: "🏹", label: "Training Centers", key: "trainingCenters" as const },
  { icon: "🏃", label: "Athletics Tracks", key: "athleticsTracks" as const },
];
const kpiValue = (key: string, names: string[]) =>
  names.reduce((sum, n) => {
    if (!INFRA[n]) return sum;
    if (key === "total") return sum + totalOf(n);
    const idx = { swimmingPools: 2, indoorHalls: 1, trainingCenters: 3, athleticsTracks: 4 }[key]!;
    return sum + INFRA[n][idx];
  }, 0);

export function VenuesDashboard() {
  const [geo, setGeo] = useState<Geo | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [facility, setFacility] = useState<Facility>("All");
  const [region, setRegion] = useState("All");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/maharashtra-districts.geojson").then(r => r.json()).then(fc => setGeo(buildGeo(fc))).catch(() => {});
  }, []);

  const inScope = (n: string) => region === "All" || REGION[n] === region;
  const metricMax = useMemo(() => Math.max(...Object.keys(INFRA).map(n => metricOf(n, facility))), [facility]);
  const totalMax = useMemo(() => Math.max(...Object.keys(INFRA).map(totalOf)), []);

  const scopeNames = selected ? [selected] : Object.keys(INFRA).filter(inScope);
  const scopeLabel = selected ?? (region === "All" ? "Maharashtra" : region);

  // Zoom transform for the selected district
  const zoom = useMemo(() => {
    if (!geo || !selected) return { scale: 1, x: 0, y: 0 };
    const dg = geo.districts.find(d => d.name === selected);
    if (!dg) return { scale: 1, x: 0, y: 0 };
    const s = Math.min(geo.VW / (dg.bw || 1), geo.VH / (dg.bh || 1)) * 0.55;
    const sc = Math.max(1.2, Math.min(s, 4));
    return { scale: sc, x: geo.VW / 2 - dg.cx * sc, y: geo.VH / 2 - dg.cy * sc };
  }, [geo, selected]);

  const reset = () => { setSelected(null); setSearch(""); setFacility("All"); setRegion("All"); setHovered(null); };
  const trySelect = (q: string) => {
    const m = Object.keys(INFRA).find(n => n.toLowerCase() === q.trim().toLowerCase());
    if (m) setSelected(m);
  };

  const ctl = "h-10 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/50 focus:border-[#FF6B00]";

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_-30px_rgba(13,27,75,0.35)] overflow-hidden">
      {/* Top controls */}
      <div className="flex flex-wrap items-center gap-3 p-4 md:p-5 border-b border-gray-100">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            list="mh-districts" value={search} placeholder="Search district…"
            onChange={(e) => { setSearch(e.target.value); trySelect(e.target.value); }}
            onKeyDown={(e) => e.key === "Enter" && trySelect(search)}
            className={`${ctl} w-full pl-9`}
          />
          <datalist id="mh-districts">{Object.keys(INFRA).map(n => <option key={n} value={n} />)}</datalist>
        </div>
        <select value={facility} onChange={(e) => setFacility(e.target.value as Facility)} className={ctl}>
          {FACILITIES.map(f => <option key={f} value={f}>{f === "All" ? "All Facilities" : f}</option>)}
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)} className={ctl}>
          {REGIONS.map(r => <option key={r} value={r}>{r === "All" ? "All Regions" : r}</option>)}
        </select>
        <button onClick={reset} className="h-10 px-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0d1b4b] text-white text-sm font-semibold hover:bg-[#162765] transition">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      <div>
        {/* Map — full width */}
        <div ref={mapRef} className="relative bg-gradient-to-br from-[#F7F9FC] to-[#EEF2FA] px-6 pt-4 pb-10"
          onMouseMove={(e) => { const r = mapRef.current!.getBoundingClientRect(); setPointer({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
          onMouseLeave={() => setHovered(null)}>
          {!geo ? (
            <div className="h-[420px] grid place-items-center text-gray-400 text-sm">Loading Maharashtra map…</div>
          ) : (
            <svg viewBox={`0 0 ${geo.VW} ${geo.VH}`} className="w-full h-auto select-none" role="img" aria-label="Maharashtra district infrastructure map">
              <motion.g animate={zoom} transition={{ type: "spring", stiffness: 120, damping: 22 }} style={{ originX: 0, originY: 0 }}>
                {geo.districts.map((dg, i) => {
                  const val = metricOf(dg.name, facility);
                  const fill = colorFor(val, metricMax);
                  const dim = !inScope(dg.name);
                  const isHot = totalOf(dg.name) / totalMax > 0.72;
                  const active = hovered === dg.name || selected === dg.name;
                  return (
                    <g key={dg.name}>
                      <motion.path
                        d={dg.d}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: dim ? 0.18 : 1, fill }}
                        transition={{ opacity: { delay: i * 0.012, duration: 0.5 }, fill: { duration: 0.5 } }}
                        stroke={active ? "#0d1b4b" : "#ffffff"}
                        strokeWidth={active ? 1.8 : 0.7}
                        vectorEffect="non-scaling-stroke"
                        className="cursor-pointer"
                        style={{ filter: active ? "drop-shadow(0 4px 10px rgba(255,107,0,0.45))" : "none" }}
                        onMouseEnter={() => setHovered(dg.name)}
                        onClick={() => setSelected(dg.name)}
                      />
                      {isHot && !dim && (
                        <motion.circle cx={dg.cx} cy={dg.cy} r={4} fill="#E85D00"
                          animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          style={{ transformOrigin: `${dg.cx}px ${dg.cy}px` }} vectorEffect="non-scaling-stroke" />
                      )}
                    </g>
                  );
                })}
              </motion.g>
            </svg>
          )}

          {/* Tooltip */}
          <AnimatePresence>
            {hovered && INFRA[hovered] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.12 }}
                className="pointer-events-none absolute z-20 w-52 rounded-xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-xl p-3"
                style={{ left: Math.min(pointer.x + 14, (mapRef.current?.clientWidth ?? 600) - 220), top: pointer.y + 14 }}>
                <div className="font-bold text-[#0d1b4b] flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#FF6B00]" />{hovered}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-gray-400">{REGION[hovered]}</div>
                <div className="mt-2 space-y-1 text-xs">
                  {[["Total Venues", totalOf(hovered)], ["Stadiums", INFRA[hovered][0]], ["Indoor Halls", INFRA[hovered][1]], ["Swimming Pools", INFRA[hovered][2]]].map(([l, v]) => (
                    <div key={l as string} className="flex justify-between"><span className="text-gray-500">{l}</span><span className="font-semibold text-gray-900">{v}</span></div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 md:left-6 flex items-center gap-2 text-[10px] text-gray-500">
            <span className="font-semibold">Low</span>
            <div className="flex">{SCALE.map(c => <span key={c} className="h-2.5 w-6" style={{ background: c }} />)}</div>
            <span className="font-semibold">High</span>
            <span className="ml-2 hidden sm:inline">· {facility === "All" ? "Total venues" : facility}</span>
          </div>
        </div>

      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && INFRA[selected] && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)} className="fixed inset-0 z-[1100] bg-black/40 backdrop-blur-sm" />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed top-0 right-0 z-[1101] h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto">
              <div className="sticky top-0 bg-[#0d1b4b] text-white p-5 flex items-start justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#FF6B00] font-bold">{REGION[selected]}</div>
                  <h3 className="text-2xl font-bold mt-1 flex items-center gap-2"><MapPin className="h-5 w-5 text-[#FF6B00]" />{selected}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="h-9 w-9 grid place-items-center rounded-full hover:bg-white/15"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-5">
                <div className="rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#e85d00] text-white p-5">
                  <div className="text-xs uppercase tracking-wider text-white/80">Total Sports Venues</div>
                  <div className="text-4xl font-bold mt-1"><CountUp end={totalOf(selected)} duration={1} /></div>
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { i: Building2, l: "Stadiums", v: INFRA[selected][0] },
                    { i: Dumbbell, l: "Indoor Sports Halls", v: INFRA[selected][1] },
                    { i: Waves, l: "Swimming Pools", v: INFRA[selected][2] },
                    { i: Target, l: "Training Centers", v: INFRA[selected][3] },
                    { i: Footprints, l: "Athletics Tracks", v: INFRA[selected][4] },
                  ].map(({ i: I, l, v }) => {
                    const max = Math.max(...INFRA[selected]);
                    return (
                      <div key={l} className="rounded-xl border border-gray-200 p-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm font-medium text-gray-800"><I className="h-4 w-4 text-[#FF6B00]" />{l}</span>
                          <span className="font-bold text-[#0d1b4b]">{v}</span>
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <motion.div className="h-full rounded-full bg-[#FF6B00]" initial={{ width: 0 }} animate={{ width: `${(v / (max || 1)) * 100}%` }} transition={{ duration: 0.6 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <a href="#" className="mt-5 inline-flex w-full justify-center items-center gap-1.5 rounded-xl bg-[#0d1b4b] text-white py-3 text-sm font-semibold hover:bg-[#162765] transition">
                  View facility directory for {selected}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

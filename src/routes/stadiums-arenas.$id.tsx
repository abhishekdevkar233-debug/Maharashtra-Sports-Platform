import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { MapPin, Users, ArrowLeft, Calendar, Award, Phone, Globe, CheckCircle2, Image } from "lucide-react";
import vShivChhatrapati from "@/assets/venues/shiv-chhatrapati.jpg";
import vDyPatil from "@/assets/venues/dy-patil.jpg";
import vWankhede from "@/assets/venues/wankhede.jpg";
import vVidarbha from "@/assets/venues/vidarbha.jpg";
import vMahalaxmi from "@/assets/venues/mahalaxmi.avif";
import vPuneFootball from "@/assets/venues/pune-football.jpg";

export const Route = createFileRoute("/stadiums-arenas/$id")({
  head: () => ({ meta: [{ title: "Venue Detail" }] }),
  component: Page,
});

const VENUES: Record<string, {
  name: string; location: string; capacity: string; sports: string[];
  img: string; gallery: string[];
  about: string; established: string; area: string; surface: string;
  facilities: string[]; events: { year: string; name: string }[];
  contact: { phone: string; email: string; web: string };
}> = {
  "shree-shiv-chhatrapati": {
    name: "Shree Shiv Chhatrapati Sports Complex",
    location: "Balewadi, Pune",
    capacity: "55,000",
    sports: ["Athletics", "Football", "Indoor halls", "Swimming", "Badminton"],
    img: vShivChhatrapati,
    gallery: [vShivChhatrapati, vDyPatil, vWankhede],
    about: "Shree Shiv Chhatrapati Sports Complex at Balewadi, Pune is one of India's premier multi-sport venues. Built for the 1994 National Games, the complex spans 70 acres and hosts elite competitions in athletics, football, aquatics, and numerous indoor disciplines. It is the home ground for many of Maharashtra's top training programs and international events.",
    established: "1994",
    area: "70 acres",
    surface: "Synthetic track (IAAF certified)",
    facilities: ["Olympic-size Swimming Pool", "Synthetic Athletic Track", "Football Ground", "Indoor Badminton Courts", "Gymnasium & Fitness Centre", "Athlete Hostel (500 beds)", "Cafeteria & Canteen", "Medical Centre"],
    events: [
      { year: "1994", name: "12th National Games — Host venue" },
      { year: "2008", name: "Commonwealth Youth Games" },
      { year: "2018", name: "Khelo India School Games" },
      { year: "2024", name: "Maharashtra State Athletics Championship" },
    ],
    contact: { phone: "+91 20 2729 0000", email: "info@balewadi.sports.mah.gov.in", web: "balewadi.sports.mah.gov.in" },
  },
  "dy-patil": {
    name: "DY Patil Stadium",
    location: "Navi Mumbai",
    capacity: "55,000",
    sports: ["Cricket", "Football", "Concerts"],
    img: vDyPatil,
    gallery: [vDyPatil, vShivChhatrapati, vWankhede],
    about: "DY Patil Stadium in Navi Mumbai is a world-class multi-purpose stadium renowned for hosting Indian Premier League matches, international football friendlies, and large-scale concerts. With a seating capacity of 55,000 and state-of-the-art floodlights and drainage systems, it stands as one of the finest private stadiums in Asia.",
    established: "2008",
    area: "35 acres",
    surface: "Natural grass (FIFA standard)",
    facilities: ["International Cricket Pitch", "FIFA-standard Football Ground", "VIP & Corporate Boxes", "Full Floodlight System", "Media Centre", "Player Dressing Rooms", "Hospitality Lounges", "Large LED Scoreboard"],
    events: [
      { year: "2010", name: "IPL Season 3 Matches" },
      { year: "2016", name: "India vs. Bangladesh T20 World Cup" },
      { year: "2022", name: "FIFA U-17 Women's World Cup" },
      { year: "2025", name: "ISL — Mumbai City FC home matches" },
    ],
    contact: { phone: "+91 22 6123 4567", email: "info@dypatilstadium.com", web: "dypatilstadium.com" },
  },
  "wankhede": {
    name: "Wankhede Stadium",
    location: "Mumbai",
    capacity: "33,000",
    sports: ["Cricket"],
    img: vWankhede,
    gallery: [vWankhede, vDyPatil, vVidarbha],
    about: "Wankhede Stadium is Mumbai's iconic cricket ground, located in the heart of South Mumbai. Home to the Mumbai Cricket Association, it is one of India's most prestigious venues, having hosted the 2011 ICC Cricket World Cup Final. Its electric atmosphere and heritage make it a landmark in Indian cricket.",
    established: "1974",
    area: "12 acres",
    surface: "Natural grass (drop-in pitch system)",
    facilities: ["5 Pitches including Main Square", "Modern Dressing Rooms", "Press Box & Commentary Boxes", "Suresh Bafna Pavilion", "MCA Clubhouse", "Practice Nets & Grounds", "Museum & Trophy Gallery"],
    events: [
      { year: "1987", name: "Reliance World Cup — Semi-final" },
      { year: "2011", name: "ICC Cricket World Cup Final — India vs Sri Lanka" },
      { year: "2016", name: "ICC World T20 Final" },
      { year: "2023", name: "ICC Cricket World Cup 2023 — Group Stage" },
    ],
    contact: { phone: "+91 22 2279 3356", email: "info@mumbaicricket.com", web: "mumbaicricket.com" },
  },
  "vidarbha": {
    name: "Vidarbha Cricket Stadium",
    location: "Nagpur",
    capacity: "45,000",
    sports: ["Cricket"],
    img: vVidarbha,
    gallery: [vVidarbha, vWankhede, vPuneFootball],
    about: "The Vidarbha Cricket Association Stadium, commonly known as the VCA Stadium, is situated at Jamtha, Nagpur. It is a modern cricket venue known for its fan-friendly design, excellent pitch conditions, and solar energy installations. The stadium is the home ground of the Vidarbha cricket team and has hosted numerous international matches.",
    established: "2012",
    area: "40 acres",
    surface: "Natural grass (BCCI approved)",
    facilities: ["Modern Pavilion with 4 Tiers", "Solar Power Generation (1 MW)", "Rainwater Harvesting System", "Practice Pitches", "Indoor Training Facility", "Media Centre", "Cafeteria"],
    events: [
      { year: "2015", name: "India vs South Africa — 4th Test Match" },
      { year: "2019", name: "India vs West Indies — 2nd T20I" },
      { year: "2023", name: "IPL 2023 — Orange Cap Ceremony" },
      { year: "2024", name: "India vs New Zealand — 3rd Test" },
    ],
    contact: { phone: "+91 712 266 3300", email: "info@vcastadium.com", web: "vcastadium.com" },
  },
  "mahalaxmi": {
    name: "Mahalaxmi Race Course Arena",
    location: "Mumbai",
    capacity: "20,000",
    sports: ["Equestrian", "Athletics"],
    img: vMahalaxmi,
    gallery: [vMahalaxmi, vShivChhatrapati, vDyPatil],
    about: "The Mahalaxmi Race Course is a heritage sporting venue set in the heart of Mumbai. Known for horse racing and equestrian events, the sprawling green grounds also serve as a venue for large-scale athletics meets. Its iconic grandstand and lush oval track are a defining feature of Mumbai's sporting landscape.",
    established: "1883",
    area: "225 acres",
    surface: "Turf & dirt tracks (equestrian-grade)",
    facilities: ["Main Turf Racecourse", "Members' Enclosure", "Historic Grandstand", "Stabling for 2,000+ Horses", "Veterinary Centre", "Public Gallery", "Event Pavilion"],
    events: [
      { year: "1995", name: "Royal Western India Turf Club — Centenary Derby" },
      { year: "2010", name: "Maharashtra State Equestrian Championship" },
      { year: "2022", name: "Mumbai Marathon Start Point" },
      { year: "2024", name: "Royal Derby & Mumbai Cup — Annual Race Season" },
    ],
    contact: { phone: "+91 22 2307 1401", email: "info@rwitc.com", web: "rwitc.com" },
  },
  "pune-football": {
    name: "Pune Football Arena",
    location: "Pune",
    capacity: "12,000",
    sports: ["Football"],
    img: vPuneFootball,
    gallery: [vPuneFootball, vDyPatil, vShivChhatrapati],
    about: "Pune Football Arena is Pune's dedicated football venue, home to FC Pune City and a hub for state-level football development. The stadium features a modern grass pitch, compact seating bowl that creates an intimate atmosphere, and excellent training facilities supporting grassroots and elite football programs across western Maharashtra.",
    established: "2007",
    area: "8 acres",
    surface: "Natural grass (FIFA Category 2)",
    facilities: ["Full-size FIFA Football Pitch", "Practice Ground", "Modern Dressing Rooms", "Floodlights (UEFA-grade)", "Media Box", "Club Office & Ticketing"],
    events: [
      { year: "2014", name: "ISL Season 1 — FC Pune City Home Matches" },
      { year: "2018", name: "Santosh Trophy — Maharashtra Home Matches" },
      { year: "2022", name: "I-League Qualifier Matches" },
      { year: "2025", name: "Maharashtra State Football Championship" },
    ],
    contact: { phone: "+91 20 2653 0011", email: "info@punefootball.in", web: "punefootball.in" },
  },
};

function StatBadge({ icon: I, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
      <div className="h-9 w-9 rounded-lg bg-[#363092]/10 text-[#363092] grid place-items-center shrink-0">
        <I className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
        <div className="text-sm font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

function Page() {
  const { id } = useParams({ from: "/stadiums-arenas/$id" });
  const venue = VENUES[id];

  if (!venue) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🏟️</div>
        <h2 className="text-2xl font-bold text-gray-900">Venue not found</h2>
        <Link to="/stadiums-arenas" className="mt-4 inline-flex items-center gap-2 text-[#363092] font-semibold hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Stadiums
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f5f6fa] min-h-screen">
      {/* Hero image */}
      <div className="relative h-[420px] overflow-hidden">
        <img src={venue.img} alt={venue.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,40,0.85) 0%, rgba(10,10,40,0.3) 60%, transparent 100%)" }} />
        <div className="absolute top-5 left-0 right-0 px-6" style={{ maxWidth: 1200, marginInline: "auto" }}>
          <Link to="/stadiums-arenas"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur text-white text-sm font-semibold hover:bg-white/30 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Stadiums
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8" style={{ maxWidth: 1200, marginInline: "auto" }}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {venue.sports.map(s => (
              <span key={s} className="px-2.5 py-0.5 rounded-full bg-[#FF6B35] text-white text-[11px] font-bold">{s}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{venue.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/80 text-sm">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{venue.location}</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{venue.capacity} seats</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Est. {venue.established}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-8" style={{ maxWidth: 1200, marginInline: "auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="h-1 w-5 rounded-full bg-[#FF6B35] inline-block" />
                About the Venue
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">{venue.about}</p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatBadge icon={Users} label="Capacity" value={`${venue.capacity} seats`} />
              <StatBadge icon={Calendar} label="Established" value={venue.established} />
              <StatBadge icon={Award} label="Area" value={venue.area} />
              <StatBadge icon={CheckCircle2} label="Surface" value={venue.surface} />
            </div>

            {/* Photo gallery */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="h-1 w-5 rounded-full bg-[#FF6B35] inline-block" />
                Photo Gallery
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {venue.gallery.map((src, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden group cursor-pointer" style={{ height: 140 }}>
                    <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Image className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notable Events */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="h-1 w-5 rounded-full bg-[#FF6B35] inline-block" />
                Notable Events Hosted
              </h2>
              <div className="space-y-3">
                {venue.events.map(e => (
                  <div key={e.name} className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0">
                    <div className="shrink-0 px-3 py-1 rounded-lg bg-[#363092]/10 text-[#363092] text-xs font-bold">{e.year}</div>
                    <div className="text-sm text-gray-700 font-medium">{e.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Facilities */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider text-[#363092]">Facilities</h3>
              <ul className="space-y-2">
                {venue.facilities.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-[#363092] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sports hosted */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider text-[#363092]">Sports Hosted</h3>
              <div className="flex flex-wrap gap-2">
                {venue.sports.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-xl bg-[#363092]/10 text-[#363092] text-xs font-semibold">{s}</span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider text-[#363092]">Contact</h3>
              <div className="space-y-3">
                <a href={`tel:${venue.contact.phone}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#363092] transition">
                  <Phone className="h-4 w-4 shrink-0 text-[#363092]" /> {venue.contact.phone}
                </a>
                <a href={`mailto:${venue.contact.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#363092] transition">
                  <Globe className="h-4 w-4 shrink-0 text-[#363092]" /> {venue.contact.email}
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="rounded-xl overflow-hidden bg-gray-100" style={{ height: 140 }}>
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs flex-col gap-1">
                    <MapPin className="h-6 w-6" />
                    <span>{venue.location}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

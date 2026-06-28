import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, ArrowLeft, Clock, Eye, Bookmark, ChevronRight } from "lucide-react";

import galAsianGames from "@/assets/gallery/asian-games.webp";
import galCricket from "@/assets/gallery/cricket-team.jpg";
import galWrestling from "@/assets/gallery/wrestling.avif";
import galBadminton from "@/assets/gallery/badminton.webp";
import galKheloIndia from "@/assets/gallery/khelo-india.jpg";
import newsKheloMedals from "@/assets/news/khelo-india-medals.png";
import newsKhoKho from "@/assets/news/kho-kho.png";
import newsSportsComplex from "@/assets/news/sports-complex.jpg";
import newsScholarships from "@/assets/news/scholarships.png";

export const Route = createFileRoute("/media-center/news/$id")({
  head: () => ({ meta: [{ title: "News Article — DSYS Maharashtra" }] }),
  component: NewsDetails,
});

const NEWS_MAP: Record<string, {
  cat: string; date: string; readTime: string; views: string;
  title: string; excerpt: string; img: string;
  body: { type: "p" | "h3" | "ul"; content: string | string[] }[];
  tags: string[];
}> = {
  "asian-games-medals": {
    cat: "Athletes", date: "22 Jun 2026", readTime: "4 min read", views: "12.4K",
    title: "Maharashtra wins 12 medals at National Junior Athletics 2026",
    excerpt: "State athletes top the medal table with strong performances across track and field events in Hyderabad.",
    img: galAsianGames,
    tags: ["Athletics", "National Championship", "Junior", "Medal Tally"],
    body: [
      { type: "p", content: "Maharashtra topped the medal table at the 2026 National Junior Athletics Championship held in Hyderabad, claiming 12 medals — four gold, five silver and three bronze — across track and field events." },
      { type: "p", content: "The state's performance was led by 800m runner Priya Patil and shot-putter Rohan Deshmukh, both products of the District Sports Complex training programme. Coaches credited the Directorate's scholarship and travel support for enabling three pre-event training camps in Bengaluru and Patiala." },
      { type: "h3", content: "Medal Highlights" },
      { type: "ul", content: ["800m Women — Gold, Priya Patil (Solapur)", "Shot Put Men — Gold, Rohan Deshmukh (Pune)", "4×400m Relay Women — Gold, Maharashtra A", "Triple Jump — Silver, Aniket Salunke (Kolhapur)", "100m Hurdles — Silver, Sonal Bhosale (Nashik)"] },
      { type: "p", content: "The Directorate has announced cash incentives under the Shiv Chhatrapati incentive scheme and will fast-track these athletes into the senior elite squad for the upcoming Asian Junior trials." },
      { type: "h3", content: "Director's Statement" },
      { type: "p", content: "\"This medal haul reflects years of investment in grassroots infrastructure and athlete welfare. We will continue to expand our district-level academies and ensure every talented youth in Maharashtra gets a pathway to national glory,\" said Director Shri Deepak Single IAS." },
    ],
  },
  "infra-grant-launch": {
    cat: "Schemes", date: "18 Jun 2026", readTime: "3 min read", views: "8.1K",
    title: "₹250 Cr Sports Infrastructure Grant launched for 36 districts",
    excerpt: "CM announces a five-year programme to upgrade district sports complexes and athlete hostels.",
    img: newsSportsComplex,
    tags: ["Infrastructure", "Grant", "Districts", "Policy"],
    body: [
      { type: "p", content: "Chief Minister announced a ₹250 crore Sports Infrastructure Grant that will be disbursed across all 36 districts of Maharashtra over the next five years, targeting the upgrade of district sports complexes and athlete hostel facilities." },
      { type: "h3", content: "Key Allocations" },
      { type: "ul", content: ["₹80 Cr for synthetic tracks and turf grounds", "₹60 Cr for hostel renovation and new dormitories", "₹50 Cr for aquatic and indoor facilities", "₹40 Cr for equipment and technology upgrades", "₹20 Cr for coaching staff and administration"] },
      { type: "p", content: "The grant is part of the government's Vision 2030 plan to place Maharashtra among the top three states for sports infrastructure by the end of the decade." },
    ],
  },
  "balewadi-aquatic": {
    cat: "Infrastructure", date: "10 Jun 2026", readTime: "3 min read", views: "6.8K",
    title: "Balewadi Aquatic Centre inaugurated in Pune",
    excerpt: "FINA-spec 50m pool with diving platform now open for elite athlete training camps.",
    img: galKheloIndia,
    tags: ["Aquatics", "Pune", "Balewadi", "Infrastructure"],
    body: [
      { type: "p", content: "The state-of-the-art Balewadi Aquatic Centre in Pune was inaugurated on 10 June 2026, becoming Maharashtra's first FINA-specification 50-metre competitive pool equipped with electronic timing and an eight-lane diving platform." },
      { type: "p", content: "The facility will serve as the home base for the Maharashtra swimming and water polo squads and will host national-level training camps starting July 2026." },
      { type: "h3", content: "Facility Features" },
      { type: "ul", content: ["50m × 25m FINA-spec competition pool", "10m, 7.5m and 5m diving platforms", "Spectator capacity of 2,000 seats", "Dedicated warm-up pool", "Sports science and physiotherapy centre"] },
    ],
  },
  "khelo-india-prep": {
    cat: "Tournaments", date: "05 Jun 2026", readTime: "5 min read", views: "18.2K",
    title: "State squad announced for Khelo India Youth Games 2026",
    excerpt: "428 athletes selected across 27 disciplines — Maharashtra contingent largest in the country.",
    img: newsKheloMedals,
    tags: ["Khelo India", "Youth Games", "Squad", "Tournaments"],
    body: [
      { type: "p", content: "The Directorate of Sports & Youth Services has announced a 428-strong contingent for the Khelo India Youth Games 2026, making Maharashtra the largest state squad in the competition's history." },
      { type: "p", content: "Athletes were selected through district-level trials held over March and April, with final selections made by a panel of national coaches and DSYS officials." },
      { type: "h3", content: "Discipline Breakdown" },
      { type: "ul", content: ["Athletics — 84 athletes", "Swimming — 36 athletes", "Wrestling — 28 athletes", "Kabaddi — 24 athletes", "Football — 22 athletes", "23 other disciplines — 234 athletes"] },
      { type: "p", content: "The contingent will be supported with full travel, accommodation and equipment allowances under the department's tournament support scheme." },
    ],
  },
  "coach-cert-program": {
    cat: "Department", date: "29 May 2026", readTime: "3 min read", views: "4.5K",
    title: "New NIS-affiliated coach certification rolled out",
    excerpt: "Department partners with SAI to certify 1,200 coaches across districts over the next 18 months.",
    img: galBadminton,
    tags: ["Coaching", "Certification", "SAI", "NIS"],
    body: [
      { type: "p", content: "The Directorate has launched a new NIS-affiliated coach certification programme in partnership with the Sports Authority of India, targeting 1,200 coaches across all 36 districts over the next 18 months." },
      { type: "p", content: "The programme covers scientific coaching methodologies, sports nutrition, injury prevention and athlete psychology, and will be delivered through a blend of residential modules and online assessments." },
      { type: "h3", content: "Programme Structure" },
      { type: "ul", content: ["Level 1 — District grassroots coaches (800 seats)", "Level 2 — Academy and school coaches (300 seats)", "Level 3 — High-performance elite coaches (100 seats)"] },
    ],
  },
  "shiv-chhatrapati": {
    cat: "Athletes", date: "20 May 2026", readTime: "2 min read", views: "9.3K",
    title: "Shiv Chhatrapati Award nominations open for 2026-27",
    excerpt: "Applications invited across 46 sports disciplines from athletes, coaches and lifetime achievers.",
    img: newsScholarships,
    tags: ["Awards", "Shiv Chhatrapati", "Nominations", "Recognition"],
    body: [
      { type: "p", content: "The Directorate of Sports & Youth Services has opened nominations for the prestigious Shiv Chhatrapati Sports Award 2026-27, inviting applications across 46 sports disciplines from athletes, coaches and those eligible for the lifetime achievement category." },
      { type: "p", content: "The award is Maharashtra's highest sports honour, presented annually by the Governor." },
      { type: "h3", content: "Award Categories" },
      { type: "ul", content: ["Best Senior Athlete (Male & Female)", "Best Junior Athlete (Male & Female)", "Best Coach of the Year", "Best Team of the Year", "Lifetime Achievement Award"] },
      { type: "p", content: "Nominations are accepted online through the department portal until 31 July 2026. Shortlisted candidates will be interviewed by a selection committee in August." },
    ],
  },
};

const FALLBACK = NEWS_MAP["asian-games-medals"];

function NewsDetails() {
  const { id } = Route.useParams();
  const article = NEWS_MAP[id] ?? FALLBACK;
  const related = Object.entries(NEWS_MAP)
    .filter(([k]) => k !== id)
    .slice(0, 3)
    .map(([k, v]) => ({ id: k, ...v }));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero — same structure as stadium detail */}
      <div className="relative h-[420px] overflow-hidden">
        <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 35%), linear-gradient(to top, rgba(10,10,40,0.88) 0%, rgba(10,10,40,0.3) 60%, transparent 100%)" }} />

        {/* Back button — top left */}
        <div className="absolute top-5 left-0 right-0 px-6" style={{ maxWidth: 1200, marginInline: "auto" }}>
          <Link to="/media-center"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur text-white text-sm font-semibold hover:bg-black/70 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Media Center
          </Link>
        </div>

        {/* Tags + title + meta — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8" style={{ maxWidth: 1200, marginInline: "auto" }}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B35] text-white text-[11px] font-bold">{article.cat}</span>
            {article.tags.slice(0, 3).map(t => (
              <span key={t} className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur text-white text-[11px] font-semibold">{t}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight max-w-3xl">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/80 text-sm">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{article.date}</span>
            <span className="flex items-center gap-1.5"><User className="h-4 w-4" />DSYS Newsroom</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{article.readTime}</span>
            <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" />{article.views} views</span>
          </div>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid lg:grid-cols-12 gap-10">

          {/* ── Article ── */}
          <article className="lg:col-span-8">

            {/* Excerpt lead */}
            <p className="text-lg font-medium text-gray-700 leading-relaxed mb-6 border-l-4 border-[#363092] pl-4 bg-[#363092]/5 py-3 rounded-r-xl">
              {article.excerpt}
            </p>

            {/* Body */}
            <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
              {article.body.map((block, i) => {
                if (block.type === "h3") return (
                  <h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-2">{block.content as string}</h3>
                );
                if (block.type === "ul") return (
                  <ul key={i} className="list-none space-y-2 pl-0">
                    {(block.content as string[]).map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-[#363092] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
                return <p key={i}>{block.content as string}</p>;
              })}
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              <Tag className="h-4 w-4 text-gray-400 self-center" />
              {article.tags.map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 text-gray-600 bg-white hover:border-[#363092] hover:text-[#363092] cursor-pointer transition">{t}</span>
              ))}
            </div>

            {/* Share row */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-600"><Share2 className="h-4 w-4" />Share this article</span>
              <div className="flex items-center gap-2">
                {[
                  { Icon: Facebook, color: "#1877F2", label: "Facebook" },
                  { Icon: Twitter, color: "#1DA1F2", label: "Twitter" },
                  { Icon: Linkedin, color: "#0A66C2", label: "LinkedIn" },
                  { Icon: LinkIcon, color: "#363092", label: "Copy link" },
                ].map(({ Icon, color, label }) => (
                  <button key={label} title={label}
                    className="h-9 w-9 grid place-items-center rounded-full border border-gray-200 text-gray-500 hover:text-white transition"
                    style={{ ["--hover-bg" as string]: color }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = color; (e.currentTarget as HTMLElement).style.borderColor = color; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.borderColor = ""; (e.currentTarget as HTMLElement).style.color = ""; }}>
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
                <button
                  className="h-9 px-4 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 flex items-center gap-1.5 hover:border-[#363092] hover:text-[#363092] transition">
                  <Bookmark className="h-3.5 w-3.5" /> Save
                </button>
              </div>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-4 space-y-5">

            {/* About department */}
            <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg,#363092,#1e2a7a)" }}>
              <div className="text-xs uppercase tracking-widest text-white/60 mb-1">Published by</div>
              <div className="font-bold text-base">DSYS Newsroom</div>
              <div className="text-sm text-white/80 mt-1">Directorate of Sports & Youth Services, Maharashtra</div>
              <div className="mt-3 pt-3 border-t border-white/20 text-xs text-white/60">Official communications &amp; sports news coverage</div>
            </div>

            {/* Related news */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="h-1 w-4 rounded-full inline-block" style={{ background: "#363092" }} />
                Related News
              </h3>
              <ul className="space-y-4">
                {related.map(r => (
                  <li key={r.id} className="group flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="h-16 w-20 rounded-xl overflow-hidden shrink-0">
                      <img src={r.img} alt={r.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to="/media-center/news/$id" params={{ id: r.id }}
                        className="text-sm font-semibold text-gray-900 hover:text-[#363092] line-clamp-2 leading-snug transition-colors">
                        {r.title}
                      </Link>
                      <span className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />{r.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/media-center" className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-[#363092] border border-[#363092]/20 rounded-xl py-2 hover:bg-[#363092]/5 transition">
                View all news <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

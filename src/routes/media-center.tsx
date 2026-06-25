import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaHero, MediaSection, PreviewBox, MEDIA_CATEGORIES } from "@/components/media/MediaShell";
import { ArrowRight, Calendar, Tag, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/media-center")({
  head: () => ({
    meta: [
      { title: "Media Center — Sports & Youth Services, Maharashtra" },
      { name: "description", content: "News, press releases, photo and video coverage from the Directorate of Sports & Youth Services." },
    ],
  }),
  component: MediaCenter,
});

const trending = [
  { tag: "News", title: "Maharashtra wins 12 medals at National Junior Athletics 2026", date: "22 Jun 2026" },
  { tag: "Press Release", title: "Launch of ₹250 Cr Sports Infrastructure Grant for Districts", date: "18 Jun 2026" },
  { tag: "Video", title: "Shiv Chhatrapati Awards 2026-27 — Highlights Reel", date: "14 Jun 2026" },
  { tag: "Photo", title: "Inauguration of Balewadi Aquatic Centre, Pune", date: "10 Jun 2026" },
];

function MediaCenter() {
  return (
    <>
      <MediaHero
        eyebrow="Media Center"
        title="Stories, updates and coverage from across Maharashtra sports"
        subtitle="Department announcements, athlete features, event galleries and video highlights — curated by the Directorate of Sports & Youth Services."
        crumbs={[{ label: "Home", to: "/" }, { label: "Media Center" }]}
      />

      <MediaSection>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explore by Category</h2>
            <p className="text-gray-500 mt-1">Four hubs of curated content</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MEDIA_CATEGORIES.map(c => {
            const Icon = c.icon;
            return (
              <Link key={c.key} to={c.to} className="group rounded-2xl border border-gray-200 bg-white p-5 hover:border-purple-300 hover:shadow-lg transition">
                <PreviewBox h={150} label={c.title} />
                <div className="mt-4 flex items-center gap-2">
                  <span className="grid place-items-center h-9 w-9 rounded-lg bg-purple-50 text-purple-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-700 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </MediaSection>

      <MediaSection alt>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-200 overflow-hidden">
            <PreviewBox h={340} label="Featured Story Cover" />
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">FEATURED</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />24 Jun 2026</span>
                <span className="flex items-center gap-1"><Tag className="h-3 w-3" />Athlete Story</span>
              </div>
              <h3 className="mt-3 text-2xl font-bold text-gray-900 leading-snug">
                From Solapur to the Podium — Priya Patil's Road to the Asian Games
              </h3>
              <p className="mt-2 text-gray-600">
                A long-form profile of Maharashtra's rising 800m star, her training base in Pune and the
                state's scholarship support that funded three international training camps.
              </p>
              <Link to="/media-center/news" className="mt-4 inline-flex items-center gap-1 text-purple-700 font-medium">
                Read full story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-purple-700" />
              <h3 className="font-semibold text-gray-900">Trending This Week</h3>
            </div>
            <ul className="space-y-4">
              {trending.map((t, i) => (
                <li key={i} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <span className="text-2xl font-bold text-purple-200 w-7">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-purple-700 font-semibold">{t.tag}</div>
                    <p className="text-sm text-gray-900 leading-snug font-medium">{t.title}</p>
                    <span className="text-xs text-gray-400">{t.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MediaSection>
    </>
  );
}

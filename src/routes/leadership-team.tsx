import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { Mail, Phone } from "lucide-react";
import single from "@/assets/leaders/single.png";

export const Route = createFileRoute("/leadership-team")({
  head: () => ({ meta: [{ title: "Leadership Team" }] }),
  component: Page,
});

const TEAM = [
  { name: "Dr. Arjun Deshmukh", role: "Director General of Sports" },
  { name: "Smt. Meera Kulkarni", role: "Joint Director — Sports Development" },
  { name: "Shri. Rohan Patil", role: "Deputy Director — Infrastructure" },
  { name: "Dr. Neha Joshi", role: "Director — Athlete Welfare" },
  { name: "Shri. Vikram Sawant", role: "Chief Sports Officer" },
  { name: "Capt. Sanjay Rao", role: "Head Coach — Olympic Programs" },
  { name: "Dr. Priya Nair", role: "Lead — Sports Science & Nutrition" },
  { name: "Shri. Aditya Gokhale", role: "Director — Coaching & Training" },
];

const AVATAR_COLORS = ["#363092", "#FF6B35", "#0d9488", "#7c3aed", "#dc2626", "#0891b2"];

function initials(name: string) {
  return name
    .replace(/(Dr|Shri|Smt|Capt|Mr|Ms)\.?\s*/gi, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();
}

const SHADOW = "0 8px 24px -10px rgba(54,48,146,0.35), 0 2px 6px rgba(17,24,39,0.08)";

function Page() {
  return (
    <>
      <PageHero eyebrow="Our People" title="Leadership Team" subtitle="Meet the leaders driving sports and youth development across Maharashtra." />

      <SectionWrap>
        <Reveal>
          <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 p-6 md:p-8 bg-white grid md:grid-cols-[160px,1fr] gap-6 items-center">
            <img src={single} alt="Shri. Deepak Single IAS" className="h-32 w-32 rounded-full object-cover mx-auto ring-4 ring-white" style={{ boxShadow: SHADOW }} />
            <div>
              <div className="text-xs uppercase tracking-wider text-[#FF6B35] font-bold">Director</div>
              <h2 className="text-2xl font-bold mt-1">Shri. Deepak Single IAS</h2>
              <p className="text-gray-600 mt-2">As Director of the Sports & Youth Services Department, Shri Single leads strategy, infrastructure expansion and athlete welfare programs across Maharashtra.</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> director@sports.maharashtra.gov.in</span>
                <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> +91 20 2553 3333</span>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionWrap>

      <SectionWrap alt>
        <Reveal><SectionTitle title="Senior Leadership" /></Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {TEAM.map((p, idx) => {
            const c = AVATAR_COLORS[idx % AVATAR_COLORS.length];
            return (
              <Reveal key={p.name} delay={idx * 80}>
                <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center hover:border-[#363092]/30 hover:shadow-md transition h-full">
                  <div className="mx-auto h-28 w-28 rounded-full grid place-items-center text-white text-3xl font-bold ring-4 ring-white"
                    style={{ boxShadow: SHADOW, background: `linear-gradient(135deg, ${c}, ${c}cc)` }}>
                    {initials(p.name)}
                  </div>
                  <div className="mt-4 font-bold text-gray-900 text-sm leading-tight">{p.name}</div>
                  <div className="text-xs text-gray-500 mt-1 min-h-[2rem]">{p.role}</div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-center gap-3 text-gray-400">
                    <Mail className="h-4 w-4" /><Phone className="h-4 w-4" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SectionWrap>
    </>
  );
}

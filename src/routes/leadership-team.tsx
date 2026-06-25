import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Mail, Phone } from "lucide-react";
import fadnavis from "@/assets/leaders/fadnavis.png.asset.json";
import shinde from "@/assets/leaders/shinde.png.asset.json";
import pawar from "@/assets/leaders/pawar.png.asset.json";
import deol from "@/assets/leaders/deol.png.asset.json";
import single from "@/assets/leaders/single.png.asset.json";

export const Route = createFileRoute("/leadership-team")({
  head: () => ({ meta: [{ title: "Leadership Team" }] }),
  component: Page,
});

const TEAM = [
  { name: "Shri. Devendra Fadnavis", role: "Hon. Chief Minister", img: fadnavis.url },
  { name: "Shri. Eknath Shinde", role: "Hon. Deputy Chief Minister", img: shinde.url },
  { name: "Smt. Sunetra Ajit Pawar", role: "Hon. Minister", img: pawar.url },
  { name: "Shri. Ranjit Singh Deol IAS", role: "Principal Secretary", img: deol.url },
  { name: "Shri. Deepak Single IAS", role: "Director", img: single.url },
];

const SHADOW = "0 8px 24px -10px rgba(54,48,146,0.35), 0 2px 6px rgba(17,24,39,0.08)";

function Page() {
  return (
    <>
      <PageHero eyebrow="Our People" title="Leadership Team" subtitle="Meet the leaders driving sports and youth development across Maharashtra." />
      <SectionWrap>
        <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 p-6 md:p-8 bg-white grid md:grid-cols-[160px,1fr] gap-6 items-center">
          <img src={single.url} alt="Shri. Deepak Single IAS" className="h-32 w-32 rounded-full object-cover mx-auto ring-4 ring-white" style={{ boxShadow: SHADOW }} />
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
      </SectionWrap>
      <SectionWrap alt>
        <SectionTitle title="Senior Leadership" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {TEAM.map(p => (
            <div key={p.name} className="bg-white border border-gray-200 rounded-2xl p-5 text-center hover:border-[#363092]/30 transition">
              <img src={p.img} alt={p.name} className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-white" style={{ boxShadow: SHADOW }} />
              <div className="mt-4 font-bold text-gray-900 text-sm leading-tight">{p.name}</div>
              <div className="text-xs text-gray-500 mt-1">{p.role}</div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-center gap-3 text-gray-400">
                <Mail className="h-4 w-4" /><Phone className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

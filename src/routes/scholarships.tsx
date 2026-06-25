import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Award, Calendar, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/scholarships")({
  head: () => ({ meta: [{ title: "Scholarships" }] }),
  component: Page,
});

function Page() {
  const items = [
    { n: "Shiv Chhatrapati Merit Scholarship", e: "State-level medalists", b: "₹50,000 / year", d: "Annual scholarship for top performers in state competitions." },
    { n: "National Champion Scholarship", e: "National medalists", b: "₹1,00,000 / year", d: "For athletes representing Maharashtra at the national level." },
    { n: "Youth Talent Scholarship", e: "U-18 emerging talent", b: "₹25,000 / year", d: "Support for promising school and college-level athletes." },
    { n: "Para Athlete Excellence Award", e: "Para athletes", b: "₹75,000 / year", d: "Recognition for para sportspersons of the state." },
  ];
  return (
    <>
      <PageHero eyebrow="Schemes" title="Sports Scholarships" subtitle="Financial support that powers Maharashtra's athletes from grassroots to global." />
      <SectionWrap>
        <SectionTitle title="Available Scholarships" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map(s => (
            <div key={s.n} className="rounded-2xl border border-gray-200 bg-white p-6">
              <Award className="h-7 w-7 text-[#363092]" />
              <h3 className="mt-3 text-lg font-bold">{s.n}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.d}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><div className="text-xs uppercase text-gray-400">Eligibility</div><div className="font-medium">{s.e}</div></div>
                <div><div className="text-xs uppercase text-gray-400">Benefit</div><div className="font-medium text-[#363092]">{s.b}</div></div>
              </div>
              <button className="mt-5 px-4 py-2 rounded-lg bg-[#363092] text-white text-sm font-semibold">Apply Now</button>
            </div>
          ))}
        </div>
      </SectionWrap>
      <SectionWrap alt>
        <SectionTitle title="How to Apply" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Register on portal","Submit documents","Verification","Disbursement"].map((s, i) => (
            <div key={s} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="text-[11px] uppercase text-[#FF6B35] font-bold">Step {i+1}</div>
              <div className="mt-1 font-semibold text-gray-900 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#363092]" /> {s}</div>
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1"><Calendar className="h-3 w-3" /> Applications open July – Sept</div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

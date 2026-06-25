import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Trophy, Star, Medal } from "lucide-react";

export const Route = createFileRoute("/award-schemes")({
  head: () => ({ meta: [{ title: "Award Schemes" }] }),
  component: Page,
});

function Page() {
  const awards = [
    { n: "Shiv Chhatrapati State Sports Award", c: "Highest state honour for sporting excellence.", e: "Outstanding lifetime contribution", b: "Cash prize + Medal + Citation" },
    { n: "Jeevan Gaurav Puraskar", c: "Lifetime achievement in sports.", e: "Veteran sportspersons", b: "Cash prize + Citation" },
    { n: "Best Coach Award", c: "Recognising exceptional coaching.", e: "Coaches mentoring elite athletes", b: "Cash prize + Medal" },
    { n: "Sports Promotion Award", c: "Outstanding contribution to sports development.", e: "Individuals and institutions", b: "Citation + Trophy" },
  ];
  return (
    <>
      <PageHero eyebrow="Schemes" title="Award Schemes" subtitle="Celebrating athletes, coaches and contributors who lift Maharashtra's sporting legacy." />
      <SectionWrap>
        <SectionTitle title="Award Categories" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {awards.map(a => (
            <div key={a.n} className="rounded-2xl border border-gray-200 bg-white p-6">
              <Trophy className="h-7 w-7 text-[#FF6B35]" />
              <h3 className="mt-3 text-lg font-bold">{a.n}</h3>
              <p className="text-sm text-gray-600 mt-1">{a.c}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><div className="text-xs uppercase text-gray-400">Eligibility</div><div className="font-medium">{a.e}</div></div>
                <div><div className="text-xs uppercase text-gray-400">Recognition</div><div className="font-medium">{a.b}</div></div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>
      <SectionWrap alt>
        <SectionTitle title="Notable Achievements" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { i: Medal, t: "186 medals", d: "Khelo India Youth Games 2026" },
            { i: Star, t: "42 awardees", d: "Shiv Chhatrapati 2026 cycle" },
            { i: Trophy, t: "8 Olympians", d: "Currently representing India" },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <I className="h-8 w-8 mx-auto text-[#363092]" />
              <div className="mt-3 text-2xl font-bold">{t}</div>
              <div className="text-xs text-gray-500 mt-1">{d}</div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

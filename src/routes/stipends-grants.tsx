import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { BadgeIndianRupee, FileCheck } from "lucide-react";

export const Route = createFileRoute("/stipends-grants")({
  head: () => ({ meta: [{ title: "Stipends & Grants" }] }),
  component: Page,
});

function Page() {
  const items = [
    { n: "Monthly Training Stipend", p: "Continuous support for athletes in training camps.", b: "₹15,000 / month", e: "Camp-selected athletes" },
    { n: "Equipment Grant", p: "One-time grant for sport-specific equipment.", b: "Up to ₹2,00,000", e: "Performance-based" },
    { n: "Travel & Accommodation Grant", p: "Coverage for inter-state competition travel.", b: "Actuals", e: "Selected athletes" },
    { n: "Federation Support Grant", p: "Funding for recognised state sports federations.", b: "Up to ₹50,00,000", e: "Recognised bodies" },
  ];
  return (
    <>
      <PageHero eyebrow="Schemes" title="Stipends & Grants" subtitle="Financial assistance for athletes, coaches and sports organisations across Maharashtra." />
      <SectionWrap>
        <SectionTitle title="Available Programs" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map(i => (
            <div key={i.n} className="rounded-2xl border border-gray-200 bg-white p-6">
              <BadgeIndianRupee className="h-7 w-7 text-[#363092]" />
              <h3 className="mt-3 text-lg font-bold">{i.n}</h3>
              <p className="text-sm text-gray-600 mt-1">{i.p}</p>
              <div className="mt-3 text-sm">
                <span className="inline-block bg-[#363092]/10 text-[#363092] px-3 py-1 rounded-full font-semibold mr-2">{i.b}</span>
                <span className="text-gray-500">{i.e}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>
      <SectionWrap alt>
        <SectionTitle title="Funding Categories" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Athlete Stipends","Coaching Grants","Equipment","Federation Support"].map(c => (
            <div key={c} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
              <FileCheck className="h-6 w-6 mx-auto text-[#363092]" />
              <div className="mt-3 font-semibold text-sm">{c}</div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

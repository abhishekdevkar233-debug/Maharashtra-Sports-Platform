import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { Target, Eye, Heart, Trophy, Users, GraduationCap, Building2, Award } from "lucide-react";
import departmentVisual from "@/assets/department-visual.png";

export const Route = createFileRoute("/about-us")({
  head: () => ({ meta: [{ title: "About Us — Sports & Youth Services" }, { name: "description", content: "About the Sports & Youth Services Department of Maharashtra." }] }),
  component: AboutUs,
});

function AboutUs() {
  return (
    <>
      <PageHero eyebrow="About Department" title="Building the future of sports in Maharashtra" subtitle="The Sports & Youth Services Department drives policy, programs and partnerships that empower athletes and youth across all 36 districts of Maharashtra." />

      <SectionWrap>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal delay={0}>
            <img src={departmentVisual} alt="Department Visual" className="w-full rounded-2xl object-cover shadow-md" style={{ height: 360 }} />
          </Reveal>
          <Reveal delay={150}>
            <div>
              <SectionTitle title="Who we are" />
              <p className="text-gray-600 leading-relaxed">Established to nurture sporting excellence and youth welfare, the department coordinates state-level competitions, training infrastructure, financial assistance and grassroots programs. Through transparent governance and modern facilities, we are building a generation of champions.</p>
              <p className="mt-4 text-gray-600 leading-relaxed">From scholarships and stipends to world-class stadiums and academies, every initiative is designed to give every aspiring athlete a fair, well-supported path to the podium.</p>
            </div>
          </Reveal>
        </div>
      </SectionWrap>

      <SectionWrap alt>
        <Reveal><SectionTitle title="Mission, Vision & Values" subtitle="The principles that guide our work." /></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { i: Target, t: "Mission", d: "To promote sports and youth development through inclusive programs, modern infrastructure and dedicated support for athletes at every level." },
            { i: Eye, t: "Vision", d: "A Maharashtra recognised globally as a powerhouse of sporting talent and youth leadership." },
            { i: Heart, t: "Core Values", d: "Integrity, inclusion, excellence and a relentless commitment to the wellbeing of every athlete." },
          ].map(({ i: I, t, d }, idx) => (
            <Reveal key={t} delay={idx * 120}>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full">
                <div className="h-12 w-12 rounded-xl grid place-items-center bg-[#363092]/10 text-[#363092]"><I className="h-6 w-6" /></div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{t}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrap>

      <SectionWrap>
        <Reveal><SectionTitle title="What we do" /></Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { i: Trophy, t: "Competitions" },
            { i: GraduationCap, t: "Athlete Development" },
            { i: Building2, t: "Infrastructure" },
            { i: Users, t: "Youth Programs" },
            { i: Award, t: "Awards & Honours" },
            { i: Target, t: "Policy & Reforms" },
            { i: Heart, t: "Welfare Schemes" },
            { i: Eye, t: "Public Engagement" },
          ].map(({ i: I, t }, idx) => (
            <Reveal key={t} delay={idx * 70}>
              <div className="rounded-xl border border-gray-200 p-5 hover:border-[#363092] transition h-full">
                <I className="h-7 w-7 text-[#363092]" strokeWidth={1.5} />
                <div className="mt-3 font-semibold text-gray-900">{t}</div>
                <div className="mt-1 text-xs text-gray-500">Curated, accessible and athlete-first.</div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

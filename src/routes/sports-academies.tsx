import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle, ImgBox } from "@/components/layout/PageShell";
import { MapPin, Trophy, GraduationCap, Users } from "lucide-react";

export const Route = createFileRoute("/sports-academies")({
  head: () => ({ meta: [{ title: "Sports Academies" }] }),
  component: Page,
});

function Page() {
  const list = [
    { n: "Maharashtra Cricket Academy", s: "Cricket", l: "Pune" },
    { n: "State Wrestling Academy", s: "Wrestling", l: "Kolhapur" },
    { n: "Athletics High Performance Centre", s: "Athletics", l: "Pune" },
    { n: "Aquatics Centre of Excellence", s: "Swimming", l: "Mumbai" },
    { n: "Badminton Training Academy", s: "Badminton", l: "Nagpur" },
    { n: "Hockey Development Centre", s: "Hockey", l: "Aurangabad" },
  ];
  return (
    <>
      <PageHero eyebrow="Infrastructure" title="Sports Academies" subtitle="Sport-specific academies developing the next generation of Maharashtra's elite athletes." />
      <SectionWrap>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(a => (
            <div key={a.n} className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
              <ImgBox h={170} label="Academy" />
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-wider text-[#FF6B35] font-bold">{a.s}</div>
                <h3 className="mt-1 font-bold text-gray-900">{a.n}</h3>
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-4 w-4" />{a.l}</div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>
      <SectionWrap alt>
        <SectionTitle title="Programs & Development" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { i: Trophy, t: "Elite Performance", d: "Personalised training for podium-bound athletes." },
            { i: GraduationCap, t: "Grassroots Programs", d: "Talent identification from school level upwards." },
            { i: Users, t: "Coach Education", d: "Continuous development for certified coaches." },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="bg-white border border-gray-200 rounded-2xl p-6">
              <I className="h-7 w-7 text-[#363092]" />
              <h3 className="mt-3 font-bold">{t}</h3>
              <p className="mt-1 text-sm text-gray-600">{d}</p>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

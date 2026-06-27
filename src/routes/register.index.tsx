import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import {
  ShieldCheck, Landmark, GraduationCap, Trophy, Building2, Users, UserRound, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/register/")({
  head: () => ({ meta: [
    { title: "Registration Services — Sports & Youth Services" },
    { name: "description", content: "Register under sports and youth service categories with the Directorate of Sports & Youth Services, Maharashtra." },
  ] }),
  component: Page,
});

const CATS = [
  { i: UserRound,   t: "Sports Person / Coach",     d: "Register athletes, coaches, trainers, referees and sports professionals.", to: "/register/athlete-coach" },
  { i: ShieldCheck, t: "Sports Department Officer", d: "Register departmental officers and government sports officials.", to: "/register/department-officer" },
  { i: GraduationCap, t: "School / College / Institution", d: "Register schools, colleges and educational institutions in sports programs.", to: "/register/institution" },
  { i: Landmark,    t: "Local Self Government",     d: "Register municipal corporations, councils and local governing bodies.", to: "/register/local-self-government" },
  { i: Trophy,      t: "Sports Association",        d: "Register district, state and recognized sports associations.", to: "/register/association" },
  { i: Building2,   t: "Sports Complex / Govt Facility", d: "Register stadiums, sports complexes and government-managed facilities.", to: "/register/sports-complex" },
  { i: Users,       t: "Youth Institution / Club",  d: "Register youth clubs, NGOs and community organizations.", to: "/register/youth-club" },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Registration Hub" title="Registration Services" subtitle="Register under the appropriate category to access schemes, competitions, infrastructure and welfare programs of the Directorate of Sports & Youth Services, Maharashtra." />
      <SectionWrap>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATS.map(({ i: I, t, d, to }) => (
            <Link
              key={t}
              to={to}
              className="group rounded-xl border border-gray-200 bg-white p-4 hover:border-[#363092] hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
            >
              <div className="h-9 w-9 rounded-lg grid place-items-center bg-[#363092]/10 text-[#363092] group-hover:bg-[#363092] group-hover:text-white transition">
                <I className="h-4.5 w-4.5" strokeWidth={1.6} />
              </div>
              <h3 className="mt-3 text-sm font-bold text-gray-900 leading-snug">{t}</h3>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed flex-1">{d}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#363092] group-hover:text-[#FF6B35] transition">
                Start Registration <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </SectionWrap>
      <SectionWrap alt>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">Need help choosing?</h2>
          <p className="mt-2 text-gray-600">Our help desk supports applicants across all 36 districts. Reach out for assistance with category selection, documents or application status.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="tel:+912025533333" className="rounded-md bg-[#363092] hover:bg-[#2a2470] text-white px-5 py-2.5 text-sm font-semibold transition">Call Help Desk</a>
            <a href="mailto:help@sports.maharashtra.gov.in" className="rounded-md border border-gray-300 hover:border-[#363092] text-gray-800 px-5 py-2.5 text-sm font-semibold transition">Email Support</a>
          </div>
        </div>
      </SectionWrap>
    </>
  );
}

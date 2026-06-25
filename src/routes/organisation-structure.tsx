import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Building2, MapPin, Users, ShieldCheck, Briefcase, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/organisation-structure")({
  head: () => ({ meta: [{ title: "Organisation Structure" }, { name: "description", content: "Departmental hierarchy and divisions." }] }),
  component: Page,
});

function Node({ title, role }: { title: string; role: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 text-center shadow-sm">
      <div className="font-bold text-gray-900">{title}</div>
      <div className="text-xs text-gray-500 mt-1">{role}</div>
    </div>
  );
}

function Page() {
  return (
    <>
      <PageHero eyebrow="Department" title="Organisation Structure" subtitle="A modern, transparent view of how the Sports & Youth Services Department is organised." />
      <SectionWrap>
        <SectionTitle title="Hierarchy" subtitle="From the Minister's office to the District Sports Offices." />
        <div className="space-y-6">
          <div className="flex justify-center"><Node title="Hon. Minister" role="Sports & Youth Services" /></div>
          <div className="mx-auto h-6 w-px bg-gray-300" />
          <div className="flex justify-center"><Node title="Principal Secretary" role="IAS" /></div>
          <div className="mx-auto h-6 w-px bg-gray-300" />
          <div className="flex justify-center"><Node title="Director" role="Sports & Youth Services" /></div>
          <div className="mx-auto h-6 w-px bg-gray-300" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Node title="Joint Director — Sports" role="Competitions & Training" />
            <Node title="Joint Director — Youth" role="Programs & Welfare" />
            <Node title="Joint Director — Admin" role="Finance & HR" />
          </div>
          <div className="mx-auto h-6 w-px bg-gray-300" />
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            {["Pune Region","Mumbai Region","Nashik Region","Aurangabad Region","Nagpur Region","Amravati Region"].map(r => (
              <Node key={r} title={r} role="Regional Office" />
            ))}
          </div>
          <div className="mx-auto h-6 w-px bg-gray-300" />
          <div className="text-center text-sm text-gray-500">36 District Sports Offices</div>
        </div>
      </SectionWrap>

      <SectionWrap alt>
        <SectionTitle title="Functional Divisions" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { i: Building2, t: "Infrastructure Division" },
            { i: GraduationCap, t: "Training & Academies" },
            { i: Users, t: "Athlete Welfare" },
            { i: ShieldCheck, t: "Anti-Doping & Compliance" },
            { i: Briefcase, t: "Finance & Budget" },
            { i: MapPin, t: "Regional Operations" },
          ].map(({ i: I, t }) => (
            <div key={t} className="bg-white border border-gray-200 rounded-xl p-5">
              <I className="h-7 w-7 text-[#363092]" strokeWidth={1.5} />
              <div className="mt-3 font-semibold text-gray-900">{t}</div>
              <div className="text-xs text-gray-500 mt-1">Drives a focused area of departmental work.</div>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

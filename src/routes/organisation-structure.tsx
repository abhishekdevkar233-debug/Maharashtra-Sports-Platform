import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Reveal } from "@/components/ui/Reveal";
import { useEffect, useRef, useState } from "react";
import { Building2, MapPin, Users, ShieldCheck, Briefcase, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/organisation-structure")({
  head: () => ({ meta: [{ title: "Organisation Structure" }, { name: "description", content: "Departmental hierarchy and divisions." }] }),
  component: Page,
});

function Node({ title, role, small }: { title: string; role: string; small?: boolean }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#363092]/40 hover:bg-[#363092]/[0.03] cursor-default ${small ? "px-3 py-2" : "px-4 py-3"}`}>
      <div className={`font-bold text-gray-900 ${small ? "text-xs" : "text-sm"}`}>{title}</div>
      <div className={`text-gray-400 mt-0.5 ${small ? "text-[10px]" : "text-xs"}`}>{role}</div>
    </div>
  );
}

/* Each hierarchy row fades + drops in based on `step` index */
function HRow({ children, step, visible }: { children: React.ReactNode; step: number; visible: boolean }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: `opacity 500ms ease ${step * 130}ms, transform 500ms ease ${step * 130}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* Connector line — grows in height */
function Connector({ step, visible }: { step: number; visible: boolean }) {
  return (
    <div className="flex justify-center">
      <div
        style={{
          width: 1,
          height: visible ? 16 : 0,
          background: "#e5e7eb",
          transition: `height 300ms ease ${step * 130 + 80}ms`,
        }}
      />
    </div>
  );
}

function HierarchyChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <HRow step={0} visible={visible}>
        <div className="flex justify-center"><div className="w-52"><Node title="Hon. Minister" role="Sports & Youth Services" /></div></div>
      </HRow>
      <Connector step={1} visible={visible} />
      <HRow step={2} visible={visible}>
        <div className="flex justify-center"><div className="w-52"><Node title="Principal Secretary" role="IAS" /></div></div>
      </HRow>
      <Connector step={3} visible={visible} />
      <HRow step={4} visible={visible}>
        <div className="flex justify-center"><div className="w-52"><Node title="Director" role="Sports & Youth Services" /></div></div>
      </HRow>
      <Connector step={5} visible={visible} />
      <HRow step={6} visible={visible}>
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
          <Node title="Joint Director — Sports" role="Competitions & Training" />
          <Node title="Joint Director — Youth" role="Programs & Welfare" />
          <Node title="Joint Director — Admin" role="Finance & HR" />
        </div>
      </HRow>
      <Connector step={7} visible={visible} />
      <HRow step={8} visible={visible}>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {["Pune Region","Mumbai Region","Nashik Region","Aurangabad Region","Nagpur Region","Amravati Region"].map(r => (
            <Node key={r} title={r} role="Regional Office" small />
          ))}
        </div>
      </HRow>
      <Connector step={9} visible={visible} />
      <HRow step={10} visible={visible}>
        <div className="text-center text-xs text-gray-400 font-medium py-1">36 District Sports Offices</div>
      </HRow>
    </div>
  );
}

function Page() {
  return (
    <>
      <PageHero eyebrow="Department" title="Organisation Structure" subtitle="A modern, transparent view of how the Sports & Youth Services Department is organised." />

      <SectionWrap>
        <Reveal><SectionTitle title="Hierarchy" subtitle="From the Minister's office to the District Sports Offices." /></Reveal>
        <div className="mt-4">
          <HierarchyChart />
        </div>
      </SectionWrap>

      <SectionWrap alt>
        <Reveal><SectionTitle title="Functional Divisions" /></Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { i: Building2, t: "Infrastructure Division" },
            { i: GraduationCap, t: "Training & Academies" },
            { i: Users, t: "Athlete Welfare" },
            { i: ShieldCheck, t: "Anti-Doping & Compliance" },
            { i: Briefcase, t: "Finance & Budget" },
            { i: MapPin, t: "Regional Operations" },
          ].map(({ i: I, t }, idx) => (
            <Reveal key={t} delay={idx * 90}>
              <div className="bg-white border border-gray-200 rounded-xl p-5 h-full">
                <I className="h-7 w-7 text-[#363092]" strokeWidth={1.5} />
                <div className="mt-3 font-semibold text-gray-900">{t}</div>
                <div className="text-xs text-gray-500 mt-1">Drives a focused area of departmental work.</div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

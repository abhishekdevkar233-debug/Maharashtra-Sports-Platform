import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { BarChart3, MessageSquareWarning, Building2, GraduationCap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboards — Sports & Youth Services" }] }),
  component: Page,
});

const SERVICES = [
  { i: BarChart3, t: "CM Dashboard", d: "View state sports performance, district-wise progress, budget utilization and key performance indicators.", cta: "Open Dashboard", to: "/dashboard/cm", color: "#363092" },
  { i: MessageSquareWarning, t: "Grievance Redressal", d: "Submit, track and manage grievances related to sports schemes, facilities and athlete services.", cta: "Open Dashboard", to: "/dashboard/grievance", color: "#FF6B35" },
  { i: Building2, t: "DSYS Complex", d: "Explore sports complexes, facilities, booking availability and infrastructure information.", cta: "Open Dashboard", to: "/dashboard/fund-utilization", color: "#0d9488" },
  { i: GraduationCap, t: "Scholarship", d: "Apply and track scholarships, athlete benefits and sports excellence rewards.", cta: "Open Dashboard", to: "/dashboard/scholarship", color: "#7c3aed" },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="DSYS Dashboards"
        title="Your one-stop platform for sports development, athlete welfare, and grievance management."
        subtitle="Access analytics, services and operational dashboards of the Directorate of Sports & Youth Services, Maharashtra — in one place."
      />
      <SectionWrap>
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative pl-3 border-l-[3px] border-[#FF6B35]">Explore Our Services</h2>
          <p className="mt-2 text-gray-500">Pick a dashboard to dive into performance, finance, athletes or grievances.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map(({ i: I, t, d, cta, to, color }) => (
            <Link key={t} to={to} className="group rounded-2xl border border-gray-200 bg-white p-6 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(54,48,146,0.45)] hover:border-[#363092] transition-all flex flex-col">
              <div className="h-14 w-14 rounded-2xl grid place-items-center text-white" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                <I className="h-7 w-7" strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">{t}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{d}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#363092] group-hover:bg-[#FF6B35] text-white px-3.5 py-2 text-sm font-semibold w-fit transition">
                {cta} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </span>
            </Link>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}

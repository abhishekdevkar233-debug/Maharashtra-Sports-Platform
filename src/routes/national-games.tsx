import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Trophy, Calendar, MapPin, Flag } from "lucide-react";

export const Route = createFileRoute("/national-games")({
  head: () => ({ meta: [{ title: "39th National Games — Maharashtra 2027" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg,#363092,#FF6B35)" }} className="text-white">
        <div className="container-page py-20">
          <div className="text-xs uppercase tracking-[0.2em] font-bold">National Games</div>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 leading-tight">39th National Games<br />Maharashtra 2027</h1>
          <p className="mt-4 text-white/85 max-w-2xl">India's biggest multi-sport event returns to Maharashtra. Hosted across Pune, Mumbai, Nagpur and Nashik.</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[["28","States & UTs"],["38","Sports"],["12,000+","Athletes"],["4","Host Cities"]].map(([v,l]) => (
              <div key={l} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">{v}</div>
                <div className="text-[10px] uppercase opacity-80">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SectionWrap>
        <SectionTitle title="Featured Sports" />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {["Athletics","Swimming","Wrestling","Boxing","Hockey","Cricket","Football","Shooting","Archery","Cycling","Kabaddi","Badminton"].map(s => (
            <div key={s} className="rounded-xl border border-gray-200 p-4 text-center text-sm font-semibold hover:border-[#363092]">{s}</div>
          ))}
        </div>
      </SectionWrap>
      <SectionWrap alt>
        <SectionTitle title="Latest Updates" />
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { i: Flag, t: "Mascot reveal", d: "Official Games mascot launched in Pune." },
            { i: Calendar, t: "Schedule live", d: "Day-wise schedule for all 38 sports published." },
            { i: MapPin, t: "Venue ready", d: "Balewadi inaugurated as primary athletics hub." },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="bg-white border border-gray-200 rounded-2xl p-6">
              <I className="h-7 w-7 text-[#FF6B35]" />
              <h3 className="mt-3 font-bold">{t}</h3>
              <p className="mt-1 text-sm text-gray-600">{d}</p>
            </div>
          ))}
        </div>
      </SectionWrap>
      <SectionWrap>
        <SectionTitle title="Medal Tally (Provisional)" />
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr><th className="text-left px-5 py-3">Rank</th><th className="text-left px-5 py-3">State</th><th className="text-center px-3">Gold</th><th className="text-center px-3">Silver</th><th className="text-center px-3">Bronze</th><th className="text-right px-5">Total</th></tr>
            </thead>
            <tbody>
              {[["1","Maharashtra",54,42,38,134],["2","Haryana",48,38,30,116],["3","Karnataka",36,32,28,96],["4","Tamil Nadu",30,28,30,88]].map((r,i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-bold text-[#363092]">{r[0]}</td>
                  <td className="px-5 py-3 font-semibold">{r[1]}</td>
                  <td className="text-center">{r[2]}</td><td className="text-center">{r[3]}</td><td className="text-center">{r[4]}</td>
                  <td className="px-5 py-3 text-right font-bold">{r[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrap>
    </>
  );
}

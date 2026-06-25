import { createFileRoute } from "@tanstack/react-router";
import { SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Trophy, Medal } from "lucide-react";

export const Route = createFileRoute("/elite-athletes/$id")({
  head: () => ({ meta: [{ title: "Elite Athlete Profile" }] }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return (
    <>
      <section style={{ background: "linear-gradient(135deg,#363092,#1a1450)" }} className="text-white">
        <div className="container-page py-14 grid md:grid-cols-[260px,1fr] gap-10 items-center">
          <div className="h-64 w-64 mx-auto md:mx-0 rounded-2xl bg-white/10" />
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-semibold">Athlete #{id} · Elite</div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Riya Patil</h1>
            <div className="mt-2 text-white/80">Boxing · 60 kg Lightweight</div>
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
              {[["24","Bouts"],["18","Wins"],["7","Medals"]].map(([v,l]) => (
                <div key={l} className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold">{v}</div>
                  <div className="text-[10px] uppercase opacity-80">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SectionWrap>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold">Biography</h2>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">Riya represents Maharashtra at national boxing championships and is currently training at the State Boxing Academy. Her career spans multiple Khelo India medals and an Asian Youth podium.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold">Recent Competitions</h2>
              <ul className="mt-3 text-sm divide-y divide-gray-100">
                {[["Khelo India 2024","Gold"],["National Championship 2023","Silver"],["Asian Youth 2023","Bronze"],["State Championship 2023","Gold"]].map(([e,r]) => (
                  <li key={e} className="py-3 flex justify-between"><span>{e}</span><span className="text-[#363092] font-semibold flex items-center gap-1"><Medal className="h-4 w-4" />{r}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold flex items-center gap-2"><Trophy className="h-4 w-4 text-[#FF6B35]" />Profile</h3>
              <dl className="mt-3 text-sm space-y-2 text-gray-600">
                <div className="flex justify-between"><dt>District</dt><dd>Mumbai</dd></div>
                <div className="flex justify-between"><dt>Academy</dt><dd>State Boxing Academy</dd></div>
                <div className="flex justify-between"><dt>National Rank</dt><dd className="text-gray-900 font-semibold">#3</dd></div>
                <div className="flex justify-between"><dt>Category</dt><dd>Senior</dd></div>
              </dl>
            </div>
          </aside>
        </div>
        <div className="mt-10">
          <SectionTitle title="Performance Timeline" />
          <div className="rounded-2xl border border-gray-200 p-6">
            {["2024 – Asian Games Trials Qualifier","2023 – National Silver","2022 – Khelo India Gold","2021 – State Champion"].map((t,i) => (
              <div key={t} className="flex gap-4 py-3 border-b last:border-0 border-gray-100">
                <div className="h-2 w-2 rounded-full bg-[#FF6B35] mt-2" />
                <div className="text-sm text-gray-700">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>
    </>
  );
}

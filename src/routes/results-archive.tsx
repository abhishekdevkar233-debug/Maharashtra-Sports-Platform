import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Download } from "lucide-react";

export const Route = createFileRoute("/results-archive")({
  head: () => ({ meta: [{ title: "Results Archive" }] }),
  component: Page,
});

function Page() {
  const rows = [
    ["2024","Khelo India Youth Games","Maharashtra","1st"],
    ["2024","State Athletics Championship","Pune District","1st"],
    ["2023","National Wrestling Championship","Kolhapur","2nd"],
    ["2023","Senior Cricket League","Mumbai","1st"],
    ["2022","Inter-District Football","Nagpur","1st"],
    ["2022","State Badminton Open","Nashik","3rd"],
  ];
  return (
    <>
      <PageHero eyebrow="Tournaments" title="Results Archive" subtitle="Historical results from state and national tournaments hosted by the department." />
      <SectionWrap>
        <div className="flex flex-wrap gap-3 mb-6">
          <select className="h-11 px-4 rounded-lg border border-gray-200 text-sm"><option>All years</option><option>2024</option><option>2023</option></select>
          <select className="h-11 px-4 rounded-lg border border-gray-200 text-sm"><option>All sports</option></select>
        </div>
        <SectionTitle title="Tournament Records" />
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="text-left px-5 py-3">Year</th>
                <th className="text-left px-5 py-3">Tournament</th>
                <th className="text-left px-5 py-3">Winner</th>
                <th className="text-left px-5 py-3">Rank</th>
                <th className="text-right px-5 py-3">Document</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-semibold text-[#363092]">{r[0]}</td>
                  <td className="px-5 py-3">{r[1]}</td>
                  <td className="px-5 py-3">{r[2]}</td>
                  <td className="px-5 py-3">{r[3]}</td>
                  <td className="px-5 py-3 text-right"><a href="#" className="text-[#363092] inline-flex items-center gap-1"><Download className="h-4 w-4" />PDF</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrap>
    </>
  );
}

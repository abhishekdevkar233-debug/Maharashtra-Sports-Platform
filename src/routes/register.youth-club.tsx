import { createFileRoute } from "@tanstack/react-router";
import { MultiStepForm, Field, Input, Select, Textarea, Grid2, UploadCard, ReviewBlock } from "@/components/register/MultiStepForm";

export const Route = createFileRoute("/register/youth-club")({
  head: () => ({ meta: [{ title: "Youth Institution / Club Registration" }] }),
  component: Page,
});

function Page() {
  return (
    <MultiStepForm
      eyebrow="Youth Registration"
      title="Youth Institution / Club Registration"
      subtitle="Register youth clubs, NGOs and community organizations to participate in Nehru Yuva Kendra programs, sports drives and youth development schemes."
      eligibility={[
        "Registered NGO, society, trust or recognised youth club",
        "Minimum 15 active members",
        "Operational for at least 1 year",
        "Activity records and PAN available",
      ]}
      faqs={[
        { q: "Can unregistered clubs apply?", a: "Unregistered community clubs can apply for provisional status, subject to mentor body endorsement." },
        { q: "What activities qualify?", a: "Sports, cultural, environmental and skill-development activities for ages 13–35 are recognised." },
      ]}
      steps={[
        { title: "Organisation", content: (
          <Grid2>
            <Field label="Organization Name" required><Input /></Field>
            <Field label="Organization Type" required><Select options={["Registered Youth Club", "NGO", "Community Trust", "Self-Help Group"]} /></Field>
            <Field label="Registration Number" required><Input /></Field>
            <Field label="Establishment Year" required><Input type="number" /></Field>
          </Grid2>
        )},
        { title: "Leadership", content: (
          <Grid2>
            <Field label="President Name" required><Input /></Field>
            <Field label="Secretary Name" required><Input /></Field>
            <Field label="Contact Number" required full><Input /></Field>
          </Grid2>
        )},
        { title: "Activities", content: (
          <Grid2>
            <Field label="Activity Categories" required full><Input placeholder="Sports, Culture, Skill Development…" /></Field>
            <Field label="Number of Members" required><Input type="number" /></Field>
            <Field label="Operational Area" required><Input placeholder="Wards / Villages covered" /></Field>
          </Grid2>
        )},
        { title: "Location", content: (
          <Grid2>
            <Field label="District" required><Select options={["Pune", "Mumbai", "Nashik", "Nagpur"]} /></Field>
            <Field label="Taluka" required><Input /></Field>
            <Field label="Address" required full><Textarea /></Field>
          </Grid2>
        )},
        { title: "Documents", content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadCard title="Registration Certificate" />
            <UploadCard title="PAN Card" />
            <UploadCard title="Activity Report" />
          </div>
        )},
        { title: "Review", content: (
          <div className="space-y-4">
            <ReviewBlock title="Organisation" rows={[["Name", "—"], ["Type", "—"], ["Reg. No.", "—"], ["Est. Year", "—"]]} />
            <ReviewBlock title="Activities" rows={[["Members", "—"], ["Area", "—"]]} />
            <label className="flex items-start gap-2 text-sm text-gray-700"><input type="checkbox" className="mt-1" /> All information is true and submitted by an authorised office-bearer.</label>
          </div>
        )},
      ]}
    />
  );
}

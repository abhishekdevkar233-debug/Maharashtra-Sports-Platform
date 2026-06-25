import { createFileRoute } from "@tanstack/react-router";
import { MultiStepForm, Field, Input, Select, Textarea, Grid2, UploadCard, ReviewBlock } from "@/components/register/MultiStepForm";

export const Route = createFileRoute("/register/association")({
  head: () => ({ meta: [{ title: "Sports Association Registration" }] }),
  component: Page,
});

function Page() {
  return (
    <MultiStepForm
      eyebrow="Association Registration"
      title="Sports Association Registration"
      subtitle="Register district, state and recognised sports associations to access affiliation, grants, tournament hosting rights and athlete welfare programs."
      eligibility={[
        "Registered under the Societies Registration Act or Trust Act",
        "Active executive committee with current term",
        "Valid PAN and audited annual report",
        "Minimum 25 affiliated members / clubs",
      ]}
      faqs={[
        { q: "Do I need a national federation affiliation?", a: "Recognition by the relevant National Sports Federation is preferred but not mandatory at registration." },
        { q: "How often must records be updated?", a: "Annual updates after every AGM, or whenever office-bearers change." },
      ]}
      steps={[
        { title: "Association", content: (
          <Grid2>
            <Field label="Association Name" required><Input /></Field>
            <Field label="Sports Category" required><Select options={["Athletics", "Cricket", "Hockey", "Football", "Kabaddi", "Volleyball", "Other"]} /></Field>
            <Field label="Registration Number" required><Input /></Field>
            <Field label="Establishment Year" required><Input type="number" /></Field>
          </Grid2>
        )},
        { title: "Office", content: (
          <Grid2>
            <Field label="District" required><Select options={["Pune", "Mumbai", "Nashik", "Nagpur"]} /></Field>
            <Field label="Website"><Input placeholder="https://" /></Field>
            <Field label="Office Address" required full><Textarea /></Field>
          </Grid2>
        )},
        { title: "Executive Committee", content: (
          <Grid2>
            <Field label="President Name" required><Input /></Field>
            <Field label="Secretary Name" required><Input /></Field>
            <Field label="Treasurer Name" required><Input /></Field>
            <Field label="Contact Details" required full><Textarea placeholder="Phone & email for each office-bearer" /></Field>
          </Grid2>
        )},
        { title: "Membership", content: (
          <Grid2>
            <Field label="Number of Members" required><Input type="number" /></Field>
            <Field label="Affiliated Clubs" required><Input type="number" /></Field>
            <Field label="District Coverage" full><Input placeholder="Districts covered" /></Field>
          </Grid2>
        )},
        { title: "Documents", content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadCard title="Registration Certificate" />
            <UploadCard title="Constitution Document" />
            <UploadCard title="PAN Card" />
            <UploadCard title="Annual Report" />
          </div>
        )},
        { title: "Review", content: (
          <div className="space-y-4">
            <ReviewBlock title="Association" rows={[["Name", "—"], ["Sport", "—"], ["Reg. No.", "—"], ["Est. Year", "—"]]} />
            <ReviewBlock title="Membership" rows={[["Members", "—"], ["Clubs", "—"], ["Districts", "—"]]} />
            <label className="flex items-start gap-2 text-sm text-gray-700"><input type="checkbox" className="mt-1" /> Submitted on behalf of the association's executive committee.</label>
          </div>
        )},
      ]}
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { MultiStepForm, Field, Input, Select, Textarea, Grid2, UploadCard, ReviewBlock } from "@/components/register/MultiStepForm";

export const Route = createFileRoute("/register/local-self-government")({
  head: () => ({ meta: [{ title: "Local Self Government Registration" }] }),
  component: Page,
});

function Page() {
  return (
    <MultiStepForm
      eyebrow="LSG Registration"
      title="Local Self Government Registration"
      subtitle="Register municipal corporations, councils, gram panchayats and other local governing bodies to participate in state sports schemes and infrastructure programs."
      eligibility={[
        "Recognised local self-government body in Maharashtra",
        "Valid registration / formation certificate",
        "Authorised officer with attested ID",
        "Population & jurisdiction data available",
      ]}
      faqs={[
        { q: "Which bodies can register?", a: "Municipal corporations, municipal councils, nagar panchayats, zilla parishads and gram panchayats." },
        { q: "Is a sports cell mandatory?", a: "A designated sports nodal officer is required; a formal cell is recommended but not mandatory at registration." },
      ]}
      steps={[
        { title: "Organisation", content: (
          <Grid2>
            <Field label="Organization Type" required><Select options={["Municipal Corporation", "Municipal Council", "Nagar Panchayat", "Zilla Parishad", "Gram Panchayat"]} /></Field>
            <Field label="Organization Name" required><Input placeholder="e.g. Pune Municipal Corporation" /></Field>
            <Field label="Registration Number" required><Input /></Field>
            <Field label="Establishment Year" required><Input type="number" placeholder="YYYY" /></Field>
          </Grid2>
        )},
        { title: "Jurisdiction", content: (
          <Grid2>
            <Field label="Division" required><Select options={["Konkan", "Pune", "Nashik", "Aurangabad", "Amravati", "Nagpur"]} /></Field>
            <Field label="District" required><Select options={["Pune", "Mumbai", "Nashik", "Nagpur"]} /></Field>
            <Field label="Taluka" required><Input /></Field>
            <Field label="Ward Count" required><Input type="number" /></Field>
            <Field label="Population Served" required full><Input type="number" placeholder="e.g. 1,50,000" /></Field>
          </Grid2>
        )},
        { title: "Authorised Officer", content: (
          <Grid2>
            <Field label="Officer Name" required><Input /></Field>
            <Field label="Designation" required><Input /></Field>
            <Field label="Mobile Number" required><Input /></Field>
            <Field label="Email Address" required><Input type="email" /></Field>
          </Grid2>
        )},
        { title: "Sports Infrastructure", content: (
          <Grid2>
            <Field label="Number of Playgrounds" required><Input type="number" /></Field>
            <Field label="Stadium Availability" required><Select options={["Yes", "No", "Under Construction"]} /></Field>
            <Field label="Sports Facilities" full><Textarea placeholder="List indoor halls, swimming pools, courts, etc." /></Field>
          </Grid2>
        )},
        { title: "Documents", content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadCard title="Registration Certificate" />
            <UploadCard title="Government Approval Letter" />
            <UploadCard title="Address Proof" />
          </div>
        )},
        { title: "Review", content: (
          <div className="space-y-4">
            <ReviewBlock title="Organisation" rows={[["Type", "—"], ["Name", "—"], ["Reg. No.", "—"], ["Est. Year", "—"]]} />
            <ReviewBlock title="Jurisdiction" rows={[["Division", "—"], ["District", "—"], ["Wards", "—"], ["Population", "—"]]} />
            <label className="flex items-start gap-2 text-sm text-gray-700"><input type="checkbox" className="mt-1" /> All information is verified and authorised by the competent authority.</label>
          </div>
        )},
      ]}
    />
  );
}

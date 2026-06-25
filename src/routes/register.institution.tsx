import { createFileRoute } from "@tanstack/react-router";
import { MultiStepForm, Field, Input, Select, Textarea, Grid2, UploadCard, ReviewBlock } from "@/components/register/MultiStepForm";

export const Route = createFileRoute("/register/institution")({
  head: () => ({ meta: [{ title: "Educational Institution Registration" }] }),
  component: Page,
});

function Page() {
  return (
    <MultiStepForm
      eyebrow="Institution Registration"
      title="School / College / University Registration"
      subtitle="Register educational institutions participating in Maharashtra's school and inter-collegiate sports programs, scholarships and tournaments."
      eligibility={[
        "Recognised by a state, central or autonomous board / university",
        "Valid UDISE / AISHE / affiliation code",
        "Principal-authenticated submission",
        "Minimum one playground or indoor facility",
      ]}
      faqs={[
        { q: "Where do I find the UDISE code?", a: "Refer to the UDISE+ portal of the Ministry of Education or your district education office." },
        { q: "Can colleges without grounds register?", a: "Yes — colleges using shared / municipal facilities can register and declare partnered grounds." },
      ]}
      steps={[
        { title: "Institution", content: (
          <Grid2>
            <Field label="Institution Type" required><Select options={["School", "Junior College", "Senior College", "University"]} /></Field>
            <Field label="Institution Name" required><Input /></Field>
            <Field label="Affiliation Board" required><Select options={["Maharashtra State Board", "CBSE", "ICSE", "IB", "University Affiliated"]} /></Field>
            <Field label="UDISE / AISHE Code" required><Input /></Field>
            <Field label="Establishment Year" required><Input type="number" placeholder="YYYY" /></Field>
          </Grid2>
        )},
        { title: "Location", content: (
          <Grid2>
            <Field label="District" required><Select options={["Pune", "Mumbai", "Nashik", "Nagpur", "Kolhapur"]} /></Field>
            <Field label="Taluka" required><Input /></Field>
            <Field label="Full Address" required full><Textarea /></Field>
          </Grid2>
        )},
        { title: "Principal", content: (
          <Grid2>
            <Field label="Principal Name" required><Input /></Field>
            <Field label="Mobile Number" required><Input /></Field>
            <Field label="Email Address" required full><Input type="email" /></Field>
          </Grid2>
        )},
        { title: "Sports", content: (
          <Grid2>
            <Field label="Student Strength" required><Input type="number" /></Field>
            <Field label="Sports Offered" required><Input placeholder="Comma separated" /></Field>
            <Field label="Grounds Available" required><Input type="number" /></Field>
            <Field label="Indoor Facilities" required><Input placeholder="e.g. Gym, Table Tennis" /></Field>
            <Field label="Coaches Available" full><Input type="number" /></Field>
          </Grid2>
        )},
        { title: "Documents", content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadCard title="Recognition Certificate" />
            <UploadCard title="Affiliation Certificate" />
            <UploadCard title="Institution ID Proof" />
          </div>
        )},
        { title: "Review", content: (
          <div className="space-y-4">
            <ReviewBlock title="Institution" rows={[["Type", "—"], ["Name", "—"], ["Board", "—"], ["UDISE", "—"]]} />
            <ReviewBlock title="Sports" rows={[["Students", "—"], ["Sports", "—"], ["Grounds", "—"], ["Coaches", "—"]]} />
            <label className="flex items-start gap-2 text-sm text-gray-700"><input type="checkbox" className="mt-1" /> I declare that this submission is authorised by the institution's head.</label>
          </div>
        )},
      ]}
    />
  );
}

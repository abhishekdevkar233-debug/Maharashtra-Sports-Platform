import { createFileRoute } from "@tanstack/react-router";
import { MultiStepForm, Field, Input, Select, Textarea, Grid2, UploadCard, ReviewBlock } from "@/components/register/MultiStepForm";

export const Route = createFileRoute("/register/department-officer")({
  head: () => ({ meta: [{ title: "Sports Department Officer Registration" }] }),
  component: Page,
});

const STATES = ["Maharashtra"];
const DIVISIONS = ["Konkan", "Pune", "Nashik", "Aurangabad", "Amravati", "Nagpur"];
const DISTRICTS = ["Pune", "Mumbai City", "Mumbai Suburban", "Nashik", "Nagpur", "Kolhapur", "Aurangabad", "Thane"];
const TALUKAS = ["Haveli", "Mulshi", "Maval", "Khed", "Junnar"];
const DEPT_TYPES = ["Directorate", "District Office", "Taluka Office", "Subordinate Office"];

function Page() {
  return (
    <MultiStepForm
      eyebrow="Officer Registration"
      title="Sports Department Officer Registration"
      subtitle="Register departmental officers and government sports officials for portal access, scheme administration and reporting."
      eligibility={[
        "Serving officer of the Sports & Youth Services Department or affiliated body",
        "Valid Government Employee ID and posting order",
        "Aadhaar-linked mobile number",
        "Official email address (preferred)",
      ]}
      faqs={[
        { q: "How long does verification take?", a: "Standard verification is completed within 5–7 working days after submission of valid documents." },
        { q: "What if my designation changes?", a: "You can update your designation from your dashboard; HR re-approval is required for class-level changes." },
        { q: "Can I save and resume later?", a: "Yes, once mobile/email is verified the application auto-saves at each step." },
      ]}
      steps={[
        { title: "Administrative", subtitle: "Where are you posted?", content: (
          <Grid2>
            <Field label="State" required><Select options={STATES} /></Field>
            <Field label="Division" required><Select options={DIVISIONS} /></Field>
            <Field label="District" required><Select options={DISTRICTS} /></Field>
            <Field label="Taluka" required><Select options={TALUKAS} /></Field>
          </Grid2>
        )},
        { title: "Department", subtitle: "Department & office details", content: (
          <Grid2>
            <Field label="Department Name" required><Input placeholder="e.g. Sports & Youth Services" /></Field>
            <Field label="Office Name" required><Input placeholder="e.g. District Sports Office, Pune" /></Field>
            <Field label="Department Type" required><Select options={DEPT_TYPES} /></Field>
            <Field label="Office Address" required full><Textarea placeholder="Full office address" /></Field>
          </Grid2>
        )},
        { title: "Officer Info", subtitle: "Your identity and contact", content: (
          <Grid2>
            <Field label="Officer Name" required><Input placeholder="Full name as per records" /></Field>
            <Field label="Designation" required><Input placeholder="e.g. District Sports Officer" /></Field>
            <Field label="Employee ID" required><Input placeholder="GOV-EMP-XXXXXX" /></Field>
            <Field label="Aadhaar Number" required hint="12-digit Aadhaar; will be masked"><Input placeholder="XXXX XXXX XXXX" /></Field>
            <Field label="Mobile Number" required><Input placeholder="+91 9XXXXXXXXX" /></Field>
            <Field label="Email Address" required><Input type="email" placeholder="name@maharashtra.gov.in" /></Field>
          </Grid2>
        )},
        { title: "Contact", subtitle: "Official communication channels", content: (
          <Grid2>
            <Field label="Landline Number"><Input placeholder="STD code + number" /></Field>
            <Field label="Department Website"><Input placeholder="https://" /></Field>
            <Field label="Office Address" full><Textarea placeholder="Postal address" /></Field>
          </Grid2>
        )},
        { title: "Verification", subtitle: "Upload documents & verify", content: (
          <div className="space-y-5">
            <Grid2>
              <UploadCard title="Government ID" note="Employee ID card · PDF/JPG · Max 5 MB" />
              <UploadCard title="Appointment Letter" note="Latest posting order · PDF · Max 5 MB" />
            </Grid2>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Captcha</div>
                <div className="mt-1.5 h-11 rounded-lg border border-gray-300 grid place-items-center font-mono tracking-[0.4em] text-gray-700 bg-gray-50 select-none">G7P4ZQ</div>
              </div>
              <div className="flex-1"><Input placeholder="Enter captcha" /></div>
            </div>
          </div>
        )},
        { title: "Review", subtitle: "Confirm and submit", content: (
          <div className="space-y-4">
            <ReviewBlock title="Administrative" rows={[["State", "Maharashtra"], ["Division", "Pune"], ["District", "Pune"], ["Taluka", "Haveli"]]} />
            <ReviewBlock title="Department" rows={[["Department", "Sports & Youth Services"], ["Office", "District Sports Office, Pune"], ["Type", "District Office"]]} />
            <ReviewBlock title="Officer" rows={[["Name", "—"], ["Designation", "—"], ["Employee ID", "—"], ["Mobile", "—"]]} />
            <label className="flex items-start gap-2 text-sm text-gray-700"><input type="checkbox" className="mt-1" /> I confirm that the information provided is true and complete to the best of my knowledge.</label>
          </div>
        )},
      ]}
    />
  );
}

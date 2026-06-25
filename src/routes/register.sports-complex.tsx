import { createFileRoute } from "@tanstack/react-router";
import { MultiStepForm, Field, Input, Select, Textarea, Grid2, UploadCard, ReviewBlock } from "@/components/register/MultiStepForm";

export const Route = createFileRoute("/register/sports-complex")({
  head: () => ({ meta: [{ title: "Sports Complex Registration" }] }),
  component: Page,
});

function Page() {
  return (
    <MultiStepForm
      eyebrow="Facility Registration"
      title="Sports Complex / Government Facility Registration"
      subtitle="Register stadiums, sports complexes and government-managed facilities for inclusion in the state infrastructure map, bookings and tournament hosting."
      eligibility={[
        "Owned, operated or managed by a government / recognised body",
        "Functional with at least one indoor or outdoor discipline",
        "Valid ownership / lease / NOC documentation",
        "Geo-located address and site photographs",
      ]}
      faqs={[
        { q: "Can private facilities register?", a: "Private facilities can register under PPP partnerships subject to departmental approval." },
        { q: "What if my facility is under upgrade?", a: "Register and mark sections as 'Under Maintenance' — they will appear with the correct status." },
      ]}
      steps={[
        { title: "Facility", content: (
          <Grid2>
            <Field label="Facility Name" required><Input /></Field>
            <Field label="Facility Type" required><Select options={["Stadium", "Indoor Complex", "Multi-Sport Complex", "Swimming Pool", "Sports Hostel"]} /></Field>
            <Field label="Ownership Type" required><Select options={["State Government", "Local Body", "PSU / Board", "PPP", "Private Affiliated"]} /></Field>
            <Field label="Establishment Year" required><Input type="number" /></Field>
          </Grid2>
        )},
        { title: "Location", content: (
          <Grid2>
            <Field label="District" required><Select options={["Pune", "Mumbai", "Nashik", "Nagpur", "Kolhapur"]} /></Field>
            <Field label="Taluka" required><Input /></Field>
            <Field label="Address" required full><Textarea /></Field>
            <Field label="Geo Location" required hint="Latitude, Longitude"><Input placeholder="18.5204, 73.8567" /></Field>
          </Grid2>
        )},
        { title: "Infrastructure", content: (
          <Grid2>
            <Field label="Indoor Facilities" full><Textarea placeholder="Halls, courts, gym, etc." /></Field>
            <Field label="Outdoor Facilities" full><Textarea placeholder="Tracks, fields, courts" /></Field>
            <Field label="Seating Capacity" required><Input type="number" /></Field>
            <Field label="Parking Capacity" required><Input type="number" /></Field>
          </Grid2>
        )},
        { title: "Management", content: (
          <Grid2>
            <Field label="Manager Name" required><Input /></Field>
            <Field label="Contact Number" required><Input /></Field>
            <Field label="Email Address" required full><Input type="email" /></Field>
          </Grid2>
        )},
        { title: "Documents", content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadCard title="Ownership / Lease Proof" />
            <UploadCard title="Facility Images" note="ZIP or multiple JPGs · Max 20 MB" />
            <UploadCard title="NOC Documents" />
          </div>
        )},
        { title: "Review", content: (
          <div className="space-y-4">
            <ReviewBlock title="Facility" rows={[["Name", "—"], ["Type", "—"], ["Ownership", "—"], ["Year", "—"]]} />
            <ReviewBlock title="Capacity" rows={[["Seating", "—"], ["Parking", "—"]]} />
            <label className="flex items-start gap-2 text-sm text-gray-700"><input type="checkbox" className="mt-1" /> The facility details and uploaded media are accurate.</label>
          </div>
        )},
      ]}
    />
  );
}

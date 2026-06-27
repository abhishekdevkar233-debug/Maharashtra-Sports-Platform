import { createFileRoute } from "@tanstack/react-router";
import { MultiStepForm, Field, Input, Select, Textarea, Grid2, UploadCard, ReviewBlock } from "@/components/register/MultiStepForm";
import { Trophy, Medal, Globe } from "lucide-react";

export const Route = createFileRoute("/register/athlete-coach")({
  head: () => ({ meta: [{ title: "Sports Person / Coach Registration" }] }),
  component: Page,
});

function AchCard({ icon: I, level, examples, color }: { icon: typeof Trophy; level: string; examples: string; color: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 hover:border-[#363092] transition">
      <div className="h-8 w-8 rounded-lg grid place-items-center mb-2" style={{ background: `${color}1a`, color }}>
        <I className="h-4 w-4" />
      </div>
      <div className="text-sm font-bold text-gray-900">{level}</div>
      <div className="text-[11px] text-gray-400 mb-2">{examples}</div>
      <Textarea placeholder={`Describe ${level.toLowerCase()} achievements…`} />
    </div>
  );
}

function OtpRow({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <div className="flex-1">
        <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">{label}</div>
        <div className="text-[11px] text-gray-400 mt-0.5">Sent to your registered {label.toLowerCase().includes("mobile") ? "mobile number" : "email"}.</div>
      </div>
      <div className="flex gap-1.5">
        {[...Array(6)].map((_, i) => (
          <input key={i} maxLength={1} className="h-9 w-9 text-center rounded-md border border-gray-200 focus:border-[#363092] outline-none font-bold text-sm" />
        ))}
      </div>
      <button className="h-9 px-4 rounded-lg border border-[#363092] text-[#363092] text-xs font-bold hover:bg-[#363092] hover:text-white transition">Verify</button>
    </div>
  );
}

function Page() {
  return (
    <MultiStepForm
      eyebrow="Athlete & Coach Registration"
      title="Sports Person / Coach Registration"
      subtitle="Build your verified athlete or coach profile — unlock scholarships, scheme eligibility and tournament entries."
      steps={[
        {
          title: "Personal & Contact",
          content: (
            <Grid2>
              <Field label="Registration Type" required><Select options={["Athlete", "Coach", "Referee", "Trainer / Physio"]} /></Field>
              <Field label="Gender" required><Select options={["Male", "Female", "Other"]} /></Field>
              <Field label="First Name" required><Input /></Field>
              <Field label="Last Name" required><Input /></Field>
              <Field label="Date of Birth" required><Input type="date" /></Field>
              <Field label="Aadhaar Number" required><Input placeholder="XXXX XXXX XXXX" /></Field>
              <Field label="Mobile Number" required><Input /></Field>
              <Field label="Email Address" required><Input type="email" /></Field>
              <Field label="Address" full required><Textarea /></Field>
            </Grid2>
          ),
        },
        {
          title: "Sports Profile",
          content: (
            <Grid2>
              <Field label="Sport" required><Select options={["Athletics", "Cricket", "Hockey", "Football", "Kabaddi", "Wrestling", "Badminton", "Swimming"]} /></Field>
              <Field label="Category" required><Select options={["Sub-Junior", "Junior", "Senior", "Veteran"]} /></Field>
              <Field label="Playing Level" required><Select options={["District", "State", "National", "International"]} /></Field>
              <Field label="District" required><Select options={["Pune", "Mumbai", "Nashik", "Nagpur", "Aurangabad", "Kolhapur"]} /></Field>
              <Field label="Academy / Club" full><Input placeholder="If associated with an academy or club" /></Field>
              <Field label="Certification Level (Coaches)" hint="Required only if Registration Type is Coach"><Select options={["NIS Diploma", "Federation Level 1", "Level 2", "Level 3", "International"]} /></Field>
              <Field label="Coaching Experience (years)" hint="Required only if Registration Type is Coach"><Input type="number" /></Field>
            </Grid2>
          ),
        },
        {
          title: "Achievements",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AchCard icon={Medal} level="State" examples="State championships, ranking" color="#363092" />
              <AchCard icon={Trophy} level="National" examples="Khelo India, Federation Cup" color="#FF6B35" />
              <AchCard icon={Globe} level="International" examples="Asian, Commonwealth, Olympic" color="#0d9488" />
            </div>
          ),
        },
        {
          title: "Documents",
          content: (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <UploadCard title="Aadhaar Card" />
              <UploadCard title="Passport Photo" note="JPG · 4:5 portrait · Max 2 MB" />
              <UploadCard title="Achievement Certificates" note="State / National proof · PDF" />
              <UploadCard title="Coaching Certificate" note="NIS / Federation cert · PDF" />
            </div>
          ),
        },
        {
          title: "Verify & Submit",
          content: (
            <div className="space-y-4">
              <OtpRow label="Mobile OTP" />
              <OtpRow label="Email OTP" />
              <p className="text-xs text-gray-400">Didn't receive? <button className="text-[#363092] font-semibold hover:underline">Resend OTP</button></p>
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <ReviewBlock title="Personal" rows={[["Name", "—"], ["Gender", "—"], ["DOB", "—"], ["Aadhaar", "—"]]} />
                <ReviewBlock title="Sports Profile" rows={[["Sport", "—"], ["Level", "—"], ["District", "—"], ["Academy", "—"]]} />
              </div>
              <label className="flex items-start gap-2 text-xs text-gray-600 mt-2">
                <input type="checkbox" className="mt-0.5 shrink-0" />
                I consent to the use of my data for athlete services and scheme administration by the Directorate of Sports & Youth Services, Maharashtra.
              </label>
            </div>
          ),
        },
      ]}
    />
  );
}

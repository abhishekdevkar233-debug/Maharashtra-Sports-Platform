import { createFileRoute } from "@tanstack/react-router";
import { MultiStepForm, Field, Input, Select, Textarea, Grid2, UploadCard, ReviewBlock } from "@/components/register/MultiStepForm";
import { Trophy, Medal, Globe } from "lucide-react";

export const Route = createFileRoute("/register/athlete-coach")({
  head: () => ({ meta: [{ title: "Sports Person / Coach Registration" }] }),
  component: Page,
});

function AchCard({ icon: I, level, examples, color }: { icon: typeof Trophy; level: string; examples: string; color: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 hover:border-[#363092] transition">
      <div className="h-10 w-10 rounded-lg grid place-items-center" style={{ background: `${color}1a`, color }}>
        <I className="h-5 w-5" />
      </div>
      <div className="mt-3 font-bold text-gray-900">{level}</div>
      <div className="text-[11px] text-gray-500 mb-3">{examples}</div>
      <Textarea placeholder={`Describe your ${level.toLowerCase()} achievements…`} />
    </div>
  );
}

function OtpRow({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider font-semibold text-gray-600">{label}</div>
        <div className="text-xs text-gray-500 mt-0.5">Sent to your registered {label.toLowerCase().includes("mobile") ? "mobile" : "email"}.</div>
      </div>
      <div className="flex gap-1.5">
        {[...Array(6)].map((_, i) => (
          <input key={i} maxLength={1} className="h-10 w-10 text-center rounded-md border border-gray-300 focus:border-[#363092] outline-none font-bold" />
        ))}
      </div>
      <button className="h-10 px-4 rounded-lg border border-[#363092] text-[#363092] text-sm font-semibold hover:bg-[#363092] hover:text-white transition">Verify</button>
    </div>
  );
}

function Page() {
  return (
    <MultiStepForm
      eyebrow="Athlete & Coach Registration"
      title="Sports Person / Coach Registration"
      subtitle="Build your verified athlete or coach profile — unlock scholarships, scheme eligibility, tournament entries and elite athlete pathways."
      eligibility={[
        "Aadhaar holder, age 8+ for athletes",
        "Valid certification for coaches (NIS / Federation)",
        "District-level participation proof or higher",
        "Photograph and ID documents ready",
      ]}
      faqs={[
        { q: "Do parents register minors?", a: "Yes, athletes under 18 are registered by a parent/guardian whose details and consent are captured." },
        { q: "Can I add achievements later?", a: "Yes — your profile remains editable and achievements can be added with verification proof." },
      ]}
      steps={[
        { title: "Personal", content: (
          <Grid2>
            <Field label="Registration Type" required><Select options={["Athlete", "Coach", "Referee", "Trainer / Physio"]} /></Field>
            <Field label="Gender" required><Select options={["Male", "Female", "Other"]} /></Field>
            <Field label="First Name" required><Input /></Field>
            <Field label="Last Name" required><Input /></Field>
            <Field label="Date of Birth" required full><Input type="date" /></Field>
          </Grid2>
        )},
        { title: "Contact", content: (
          <Grid2>
            <Field label="Aadhaar Number" required><Input placeholder="XXXX XXXX XXXX" /></Field>
            <Field label="Mobile Number" required><Input /></Field>
            <Field label="Email Address" required full><Input type="email" /></Field>
            <Field label="Address" required full><Textarea /></Field>
          </Grid2>
        )},
        { title: "Sports Profile", content: (
          <Grid2>
            <Field label="Sport" required><Select options={["Athletics", "Cricket", "Hockey", "Football", "Kabaddi", "Wrestling", "Badminton", "Swimming"]} /></Field>
            <Field label="Category" required><Select options={["Sub-Junior", "Junior", "Senior", "Veteran"]} /></Field>
            <Field label="Playing Level" required><Select options={["District", "State", "National", "International"]} /></Field>
            <Field label="District" required><Select options={["Pune", "Mumbai", "Nashik", "Nagpur"]} /></Field>
            <Field label="Academy Name" full><Input placeholder="If associated" /></Field>
          </Grid2>
        )},
        { title: "Achievements", content: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AchCard icon={Medal} level="State" examples="State championships, ranking" color="#363092" />
            <AchCard icon={Trophy} level="National" examples="Khelo India, Federation Cup" color="#FF6B35" />
            <AchCard icon={Globe} level="International" examples="Asian, Commonwealth, Olympic" color="#0d9488" />
          </div>
        )},
        { title: "Coach Info", subtitle: "Required if you selected 'Coach' as your registration type.", content: (
          <Grid2>
            <Field label="Certification Level" required><Select options={["NIS Diploma", "Federation Level 1", "Level 2", "Level 3", "International"]} /></Field>
            <Field label="Experience (years)" required><Input type="number" /></Field>
            <Field label="Specialisation" required full><Input placeholder="e.g. Sprint coaching, Strength & Conditioning" /></Field>
          </Grid2>
        )},
        { title: "Documents", content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadCard title="Aadhaar Card" />
            <UploadCard title="Passport Photo" note="JPG · 4:5 portrait · Max 2 MB" />
            <UploadCard title="Certificates" note="Coaching / academic · PDF" />
            <UploadCard title="Sports Achievement Proof" />
          </div>
        )},
        { title: "OTP Verify", content: (
          <div className="space-y-3">
            <OtpRow label="Mobile OTP" />
            <OtpRow label="Email OTP" />
            <p className="text-xs text-gray-500">Didn't receive a code? <button className="text-[#363092] font-semibold hover:underline">Resend</button></p>
          </div>
        )},
        { title: "Review", content: (
          <div className="space-y-4">
            <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg,#363092,#FF6B35)" }}>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-white/15 grid place-items-center text-xl font-bold">88%</div>
                <div>
                  <div className="text-xs uppercase tracking-wider opacity-80 font-bold">Profile Completion</div>
                  <div className="text-lg font-bold">Looking great — almost ready to submit.</div>
                </div>
              </div>
            </div>
            <ReviewBlock title="Personal" rows={[["Name", "—"], ["Gender", "—"], ["DOB", "—"], ["Aadhaar", "—"]]} />
            <ReviewBlock title="Sports Profile" rows={[["Sport", "—"], ["Level", "—"], ["District", "—"], ["Academy", "—"]]} />
            <label className="flex items-start gap-2 text-sm text-gray-700"><input type="checkbox" className="mt-1" /> I consent to the use of my data for athlete services and scheme administration.</label>
          </div>
        )},
      ]}
    />
  );
}

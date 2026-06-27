import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Award, Calendar, CheckCircle2, Search, Filter, X, Upload, ChevronRight, ChevronLeft, CheckCircle, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/scholarships")({
  head: () => ({ meta: [{ title: "Scholarships — Sports & Youth Services Maharashtra" }] }),
  component: Page,
});

const ALL_SCHOLARSHIPS = [
  { n: "Shiv Chhatrapati Merit Scholarship", e: "State-level medalists", b: "₹50,000 / year", d: "Annual scholarship for top performers in state competitions.", cat: "Merit", level: "State", status: "Open" },
  { n: "National Champion Scholarship", e: "National medalists", b: "₹1,00,000 / year", d: "For athletes representing Maharashtra at the national level.", cat: "Merit", level: "National", status: "Open" },
  { n: "Youth Talent Scholarship", e: "U-18 emerging talent", b: "₹25,000 / year", d: "Support for promising school and college-level athletes.", cat: "Youth", level: "District", status: "Open" },
  { n: "Para Athlete Excellence Award", e: "Para athletes", b: "₹75,000 / year", d: "Recognition for para sportspersons of the state.", cat: "Para", level: "State", status: "Open" },
  { n: "Rural Sports Scholarship", e: "Athletes from rural areas", b: "₹20,000 / year", d: "Encouraging talent from rural Maharashtra to participate in competitive sports.", cat: "Rural", level: "District", status: "Open" },
  { n: "Women Athlete Scholarship", e: "Female athletes (all levels)", b: "₹40,000 / year", d: "Dedicated financial support for women athletes across all disciplines.", cat: "Women", level: "State", status: "Open" },
  { n: "Olympic Aspirant Grant", e: "Athletes with Olympic potential", b: "₹2,00,000 / year", d: "High-value grant for athletes on the national Olympic training pathway.", cat: "Elite", level: "National", status: "Closed" },
  { n: "School Sports Excellence Award", e: "Class 8–12 students", b: "₹15,000 / year", d: "Recognising and supporting school-level champions in inter-school tournaments.", cat: "Youth", level: "District", status: "Open" },
  { n: "Coach Development Scholarship", e: "NIS / certified coaches", b: "₹30,000 / year", d: "Supporting certified coaches pursuing advanced training and certifications.", cat: "Coach", level: "State", status: "Open" },
  { n: "Khelo India Achiever Grant", e: "Khelo India medal winners", b: "₹60,000 / year", d: "Reward for Maharashtra athletes who win medals at Khelo India Games.", cat: "Merit", level: "National", status: "Closed" },
  { n: "Tribal Sports Scholarship", e: "Athletes from scheduled tribes", b: "₹18,000 / year", d: "Reserved scholarship for talented athletes from tribal communities of Maharashtra.", cat: "Rural", level: "District", status: "Open" },
  { n: "International Achiever Award", e: "International medalists", b: "₹3,00,000 / year", d: "Top-tier award for athletes winning medals at Asian, Commonwealth or Olympic Games.", cat: "Elite", level: "International", status: "Open" },
];

const STEPS = ["Personal Info", "Sports Profile", "Documents", "Review & Submit"];
const DISTRICTS = ["Pune","Mumbai City","Mumbai Suburban","Thane","Nashik","Nagpur","Aurangabad","Kolhapur","Solapur","Ahmednagar","Amravati","Sangli","Satara","Jalgaon","Nanded","Latur","Raigad","Ratnagiri","Dhule","Akola","Chandrapur","Beed","Jalna","Palghar","Yavatmal","Buldhana","Wardha","Parbhani","Bhandara","Gondia","Osmanabad","Hingoli","Washim","Nandurbar","Sindhudurg","Gadchiroli"];
const SPORTS = ["Athletics","Cricket","Hockey","Football","Kabaddi","Wrestling","Badminton","Swimming","Boxing","Weightlifting","Archery","Volleyball","Basketball","Table Tennis","Kho-Kho","Judo","Taekwondo","Shooting","Cycling","Gymnastics"];
const CATS = ["All", "Merit", "Youth", "Para", "Women", "Elite", "Rural", "Coach"];
const LEVELS = ["All Levels", "District", "State", "National", "International"];
const STATUSES = ["All Status", "Open", "Closed"];

const STATUS_COLOR: Record<string, string> = { Open: "bg-green-100 text-green-700", Closed: "bg-red-100 text-red-600" };
const CAT_COLOR: Record<string, string> = {
  Merit: "bg-[#363092]/10 text-[#363092]", Youth: "bg-blue-100 text-blue-700",
  Para: "bg-purple-100 text-purple-700", Women: "bg-pink-100 text-pink-700",
  Elite: "bg-amber-100 text-amber-700", Rural: "bg-green-100 text-green-700", Coach: "bg-teal-100 text-teal-700",
};

type AppForm = { name:string; dob:string; gender:string; aadhaar:string; mobile:string; email:string; district:string; address:string; sport:string; category:string; level:string; achievements:string; coach:string; academy:string; agreed:boolean };
const EMPTY: AppForm = { name:"",dob:"",gender:"",aadhaar:"",mobile:"",email:"",district:"",address:"",sport:"",category:"",level:"",achievements:"",coach:"",academy:"",agreed:false };

const inp = "w-full h-11 px-3 rounded-xl border border-gray-200 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/10 outline-none text-sm transition bg-white";
const sel = "w-full h-11 px-3 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm bg-white transition";

function FL({ label, required, children }: { label:string; required?:boolean; children:React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function UploadField({ label }: { label: string }) {
  return (
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-5 cursor-pointer hover:border-[#363092] transition group">
      <Upload className="h-6 w-6 text-gray-400 group-hover:text-[#363092] mb-2 transition" />
      <span className="text-xs font-semibold text-gray-600 group-hover:text-[#363092] transition text-center">{label}</span>
      <span className="text-[10px] text-gray-400 mt-0.5">PDF / JPG / PNG — max 5 MB</span>
      <input type="file" className="hidden" />
    </label>
  );
}

function ReviewRow({ label, value }: { label:string; value:string }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-500 uppercase tracking-wide w-40 shrink-0">{label}</span>
      <span className="text-sm font-semibold text-gray-900 text-right">{value||"—"}</span>
    </div>
  );
}

type Scholarship = typeof ALL_SCHOLARSHIPS[0];

function InlineApplicationForm({ scholarship, onBack }: { scholarship: Scholarship; onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<AppForm>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [appId] = useState(`SCH-2026-${Math.floor(100000 + Math.random()*900000)}`);
  const set = (k: keyof AppForm, v: string|boolean) => setForm(f => ({ ...f, [k]: v }));

  const n = STEPS.length;
  const edgePct = 100 / (2 * n);
  const trackWidth = 100 - 2 * edgePct;
  const filledWidth = step === 0 ? 0 : (step / (n - 1)) * trackWidth;

  if (submitted) return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
      <div className="h-20 w-20 rounded-full bg-green-100 grid place-items-center mx-auto mb-5 shadow">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-black text-gray-900">Application Submitted!</h2>
      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
        Your application for <span className="font-semibold text-[#363092]">{scholarship.n}</span> has been received. You will be notified via SMS and email.
      </p>
      <div className="mt-6 max-w-sm mx-auto bg-white rounded-xl border border-gray-200 p-5 text-left space-y-1">
        <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Application Details</div>
        <ReviewRow label="Application ID" value={appId} />
        <ReviewRow label="Scholarship" value={scholarship.n} />
        <ReviewRow label="Applicant" value={form.name||"—"} />
        <ReviewRow label="Status" value="Under Review" />
      </div>
      <button onClick={onBack} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#363092] text-white font-bold text-sm hover:bg-[#2a2470] transition">
        <ArrowLeft className="h-4 w-4" /> Back to Scholarships
      </button>
    </div>
  );

  return (
    <div className="rounded-2xl border border-[#363092]/20 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6" style={{ background: "linear-gradient(135deg,#363092,#1a1464)" }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Scholarship Application</p>
            <h2 className="text-xl font-bold text-white mt-1 leading-snug">{scholarship.n}</h2>
            <p className="text-sm text-white/70 mt-1">Benefit: <span className="font-semibold text-white">{scholarship.b}</span> · {scholarship.e}</p>
          </div>
          <button onClick={onBack} className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white transition shrink-0 ml-4">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stepper */}
      <div className="px-8 pt-7 pb-2 bg-gray-50 border-b border-gray-100">
        <div className="relative flex">
          <div className="absolute top-[17px] h-0.5 bg-gray-200" style={{ left:`${edgePct}%`, width:`${trackWidth}%` }} />
          <div className="absolute top-[17px] h-0.5 bg-[#363092] transition-all duration-500" style={{ left:`${edgePct}%`, width:`${filledWidth}%` }} />
          {STEPS.map((s, i) => (
            <div key={s} className="relative z-10 flex flex-col items-center flex-1">
              <div className={`h-9 w-9 rounded-full grid place-items-center text-xs font-bold border-2 transition-all ${i < step ? "bg-[#363092] border-[#363092] text-white" : i === step ? "bg-white border-[#363092] text-[#363092]" : "bg-white border-gray-300 text-gray-400"}`}>
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i+1}
              </div>
              <span className={`mt-1.5 text-[10px] font-semibold text-center leading-tight ${i <= step ? "text-[#363092]" : "text-gray-400"}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Body */}
      <div className="p-8">
        {step === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FL label="Full Name" required><input className={inp} placeholder="As per Aadhaar" value={form.name} onChange={e => set("name",e.target.value)} /></FL>
            <FL label="Date of Birth" required><input type="date" className={inp} value={form.dob} onChange={e => set("dob",e.target.value)} /></FL>
            <FL label="Gender" required>
              <select className={sel} value={form.gender} onChange={e => set("gender",e.target.value)}>
                <option value="">Select</option>
                {["Male","Female","Other"].map(g => <option key={g}>{g}</option>)}
              </select>
            </FL>
            <FL label="Aadhaar Number" required><input className={inp} placeholder="XXXX XXXX XXXX" maxLength={14} value={form.aadhaar} onChange={e => set("aadhaar",e.target.value)} /></FL>
            <FL label="Mobile Number" required><input className={inp} placeholder="+91 9XXXXXXXXX" value={form.mobile} onChange={e => set("mobile",e.target.value)} /></FL>
            <FL label="Email Address"><input type="email" className={inp} placeholder="your@email.com" value={form.email} onChange={e => set("email",e.target.value)} /></FL>
            <FL label="District" required>
              <select className={sel} value={form.district} onChange={e => set("district",e.target.value)}>
                <option value="">Select district</option>
                {DISTRICTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </FL>
            <FL label="Residential Address" required>
              <textarea rows={2} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm resize-none transition bg-white" value={form.address} onChange={e => set("address",e.target.value)} />
            </FL>
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FL label="Sport / Discipline" required>
              <select className={sel} value={form.sport} onChange={e => set("sport",e.target.value)}>
                <option value="">Select sport</option>
                {SPORTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </FL>
            <FL label="Age Category" required>
              <select className={sel} value={form.category} onChange={e => set("category",e.target.value)}>
                <option value="">Select category</option>
                {["Sub-Junior (U-14)","Junior (U-18)","Senior (18+)","Veteran (35+)","Para"].map(c => <option key={c}>{c}</option>)}
              </select>
            </FL>
            <FL label="Highest Competition Level" required>
              <select className={sel} value={form.level} onChange={e => set("level",e.target.value)}>
                <option value="">Select level</option>
                {["District","State","National","International"].map(l => <option key={l}>{l}</option>)}
              </select>
            </FL>
            <FL label="Coach / Trainer Name"><input className={inp} placeholder="Optional" value={form.coach} onChange={e => set("coach",e.target.value)} /></FL>
            <FL label="Academy / Club Name"><input className={inp} placeholder="If affiliated" value={form.academy} onChange={e => set("academy",e.target.value)} /></FL>
            <FL label="Key Achievements" required>
              <textarea rows={3} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm resize-none transition bg-white" placeholder="List medals, titles and records…" value={form.achievements} onChange={e => set("achievements",e.target.value)} />
            </FL>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UploadField label="Aadhaar Card" />
            <UploadField label="Passport Photograph" />
            <UploadField label="Sports Achievement Certificate" />
            <UploadField label="School / College Bonafide" />
            <UploadField label="Bank Passbook / Cancelled Cheque" />
            <UploadField label="Income Certificate (if applicable)" />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-2xl p-5 text-white" style={{ background:"linear-gradient(135deg,#363092,#1a1464)" }}>
              <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Applying for</p>
              <p className="text-xl font-bold text-white mt-1">{scholarship.n}</p>
              <p className="text-sm text-white/70 mt-0.5">Benefit: {scholarship.b} · Eligibility: {scholarship.e}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Personal Details</p>
                <ReviewRow label="Full Name" value={form.name} />
                <ReviewRow label="Date of Birth" value={form.dob} />
                <ReviewRow label="Gender" value={form.gender} />
                <ReviewRow label="Aadhaar" value={form.aadhaar ? form.aadhaar.replace(/\d(?=\d{4})/g,"X") : ""} />
                <ReviewRow label="Mobile" value={form.mobile} />
                <ReviewRow label="District" value={form.district} />
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Sports Profile</p>
                <ReviewRow label="Sport" value={form.sport} />
                <ReviewRow label="Category" value={form.category} />
                <ReviewRow label="Level" value={form.level} />
                <ReviewRow label="Academy" value={form.academy} />
              </div>
            </div>
            <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#363092] transition bg-gray-50">
              <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#363092]" checked={form.agreed} onChange={e => set("agreed",e.target.checked)} />
              <span className="text-sm text-gray-600 leading-relaxed">I hereby declare that the information provided is true and correct. I understand that any false information will lead to disqualification and legal action.</span>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button onClick={() => step > 0 ? setStep(s => s-1) : onBack()}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#363092] hover:text-[#363092] transition">
            <ChevronLeft className="h-4 w-4" />{step === 0 ? "Cancel" : "Back"}
          </button>
          <span className="text-xs text-gray-400">Step {step+1} of {STEPS.length}</span>
          {step < STEPS.length-1 ? (
            <button onClick={() => setStep(s => s+1)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition"
              style={{ background:"#363092" }}>
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={() => setSubmitted(true)} disabled={!form.agreed}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition ${form.agreed ? "hover:opacity-90" : "opacity-40 cursor-not-allowed"}`}
              style={{ background:"#FF6B35" }}>
              Submit Application <CheckCircle2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Page() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [level, setLevel] = useState("All Levels");
  const [status, setStatus] = useState("All Status");
  const [applying, setApplying] = useState<Scholarship | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (applying && formRef.current) {
      setTimeout(() => formRef.current!.scrollIntoView({ behavior:"smooth", block:"start" }), 50);
    }
  }, [applying]);

  const filtered = ALL_SCHOLARSHIPS.filter(s =>
    (cat === "All" || s.cat === cat) &&
    (level === "All Levels" || s.level === level) &&
    (status === "All Status" || s.status === status) &&
    (query === "" || s.n.toLowerCase().includes(query.toLowerCase()) || s.d.toLowerCase().includes(query.toLowerCase()) || s.e.toLowerCase().includes(query.toLowerCase()))
  );
  const hasFilters = query || cat !== "All" || level !== "All Levels" || status !== "All Status";
  const clearAll = () => { setQuery(""); setCat("All"); setLevel("All Levels"); setStatus("All Status"); };

  return (
    <>
      {!applying && (
        <PageHero eyebrow="Schemes" title="Sports Scholarships" subtitle="Financial support that powers Maharashtra's athletes from grassroots to global." />
      )}

      <SectionWrap>

        {/* Search bar */}
        {!applying && (
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search scholarships by name, eligibility or description…"
              className="w-full h-11 pl-11 pr-10 rounded-xl border border-gray-200 bg-white focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/10 outline-none text-sm"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Scholarship Cards */}
        {!applying && (
          filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map(s => (
                <div key={s.n} className={`group rounded-2xl border bg-white p-6 hover:shadow-lg transition-all duration-200 flex flex-col ${applying ? "opacity-50" : "hover:border-[#363092]"} border-gray-200`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-11 w-11 rounded-xl bg-[#363092]/10 grid place-items-center shrink-0">
                      <Award className="h-6 w-6 text-[#363092]" />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${CAT_COLOR[s.cat]||"bg-gray-100 text-gray-600"}`}>{s.cat}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${STATUS_COLOR[s.status]}`}>{s.status}</span>
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-[#363092] transition-colors">{s.n}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed flex-1">{s.d}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Eligibility</div>
                      <div className="text-sm font-semibold text-gray-900 mt-0.5">{s.e}</div>
                    </div>
                    <div className="rounded-xl p-3" style={{ background:"#36309212" }}>
                      <div className="text-[10px] uppercase tracking-wider text-[#363092] font-bold">Benefit</div>
                      <div className="text-sm font-bold text-[#363092] mt-0.5">{s.b}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button disabled={s.status==="Closed"} onClick={() => s.status==="Open" && setApplying(s)}
                      className={`flex-1 h-10 rounded-xl text-sm font-semibold transition ${s.status==="Open" ? "bg-[#363092] text-white hover:bg-[#2a2470]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                      {s.status==="Open" ? "Apply Now →" : "Applications Closed"}
                    </button>
                    <span className="text-xs text-gray-400 border border-gray-200 px-3 h-10 rounded-xl flex items-center">{s.level}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-500">No scholarships found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
              <button onClick={clearAll} className="mt-4 px-6 py-2.5 rounded-xl bg-[#363092] text-white text-sm font-semibold">Clear Filters</button>
            </div>
          )
        )}

        {/* Inline Application Form */}
        {applying && (
          <div ref={formRef} className="mt-2">
            <InlineApplicationForm scholarship={applying} onBack={() => setApplying(null)} />
          </div>
        )}
      </SectionWrap>

      {!applying && (
        <SectionWrap alt>
          <SectionTitle title="How to Apply" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Register on portal","Submit documents","Verification","Disbursement"].map((s,i) => (
              <div key={s} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#363092] hover:shadow-sm transition">
                <div className="text-[11px] uppercase text-[#FF6B35] font-bold">Step {i+1}</div>
                <div className="mt-1 font-semibold text-gray-900 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#363092]" /> {s}</div>
                <div className="mt-2 text-xs text-gray-500 flex items-center gap-1"><Calendar className="h-3 w-3" /> Applications open July – Sept</div>
              </div>
            ))}
          </div>
        </SectionWrap>
      )}
    </>
  );
}

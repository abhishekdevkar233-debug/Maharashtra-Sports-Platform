import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap, SectionTitle } from "@/components/layout/PageShell";
import { Calendar, MapPin, X, ChevronLeft, ChevronRight, CheckCircle, Upload, CheckCircle2, ArrowLeft, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Reveal } from "@/components/ui/Reveal";

export const Route = createFileRoute("/event-calendar")({
  head: () => ({ meta: [{ title: "Event Calendar" }] }),
  component: Page,
});

const EVENTS = [
  { d:"12", m:"Jul", month:"July",     n:"State Athletics Championship",     v:"Balewadi, Pune",     s:"Athletics",   status:"Open",         fee:"₹200", age:"Open age",       desc:"Annual state-level athletics championship across 20+ track and field disciplines." },
  { d:"20", m:"Jul", month:"July",     n:"Maharashtra Cricket League Finals", v:"Wankhede, Mumbai",  s:"Cricket",     status:"Open",         fee:"₹500", age:"Open age",       desc:"District cricket teams compete for the Maharashtra Cricket League title." },
  { d:"05", m:"Aug", month:"August",   n:"Inter-District Football Cup",       v:"Kolhapur",          s:"Football",    status:"Open",         fee:"₹300", age:"U-21 & Senior",  desc:"Inter-district football championship representing all 36 districts of Maharashtra." },
  { d:"12", m:"Aug", month:"August",   n:"State Wrestling Championship",      v:"Kolhapur Akhada",   s:"Wrestling",   status:"Closing soon", fee:"₹150", age:"Junior & Senior", desc:"Traditional Maharashtra wrestling tournament in multiple weight categories." },
  { d:"18", m:"Aug", month:"August",   n:"Badminton State Open",              v:"Nagpur Indoor Hall", s:"Badminton",  status:"Open",         fee:"₹250", age:"All categories", desc:"State open badminton championship for singles, doubles and mixed doubles." },
  { d:"02", m:"Sep", month:"September",n:"Khelo India Selection Trials",      v:"Multiple Venues",   s:"Multi-sport", status:"Open",         fee:"Free", age:"U-18 / U-23",   desc:"Selection trials for Maharashtra contingent at the upcoming Khelo India Games." },
];

const MONTHS = ["All","July","August","September","October"];
const REG_STEPS = ["Personal Details","Event Info","Documents","Review"];
const DISTRICTS = ["Pune","Mumbai City","Mumbai Suburban","Thane","Nashik","Nagpur","Aurangabad","Kolhapur","Solapur","Ahmednagar","Amravati","Sangli","Satara","Jalgaon","Nanded","Latur","Raigad","Ratnagiri"];
const CATEGORIES = ["Sub-Junior (U-14)","Junior (U-18)","U-21","Senior","Veteran","Para"];

type Ev = typeof EVENTS[0];
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

function InlineRegistrationForm({ event, onBack }: { event:Ev; onBack:()=>void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name:"",dob:"",gender:"",aadhaar:"",mobile:"",email:"",district:"",address:"",category:"",sport:event.s,teamName:"",coach:"",agreed:false });
  const [submitted, setSubmitted] = useState(false);
  const [appId] = useState(`EVT-2026-${Math.floor(100000+Math.random()*900000)}`);
  const set = (k:string, v:string|boolean) => setForm(f=>({...f,[k]:v}));

  const n = REG_STEPS.length;
  const edgePct = 100/(2*n);
  const trackWidth = 100-2*edgePct;
  const filledWidth = step===0 ? 0 : (step/(n-1))*trackWidth;

  if (submitted) return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
      <div className="h-20 w-20 rounded-full bg-green-100 grid place-items-center mx-auto mb-5 shadow">
        <CheckCircle className="h-10 w-10 text-green-600"/>
      </div>
      <h2 className="text-2xl font-black text-gray-900">Registration Successful!</h2>
      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
        You are registered for <span className="font-semibold text-[#363092]">{event.n}</span>. A confirmation will be sent to your mobile.
      </p>
      <div className="mt-6 max-w-sm mx-auto bg-white rounded-xl border border-gray-200 p-5 text-left">
        {[["Registration ID",appId],["Event",event.n],["Date",`${event.d} ${event.m} 2026`],["Venue",event.v],["Name",form.name],["Category",form.category]].map(([l,v])=>(
          <div key={l} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-500">{l}</span>
            <span className="text-xs font-semibold text-gray-900">{v||"—"}</span>
          </div>
        ))}
      </div>
      <button onClick={onBack} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#363092] text-white font-bold text-sm hover:bg-[#2a2470] transition">
        <ArrowLeft className="h-4 w-4"/> Back to Events
      </button>
    </div>
  );

  return (
    <div className="rounded-2xl border border-[#363092]/20 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6" style={{background:"linear-gradient(135deg,#363092,#1a1464)"}}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Event Registration</p>
            <h2 className="text-xl font-bold text-white mt-1">{event.n}</h2>
            <p className="text-xs text-white/70 mt-1 flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/>{event.d} {event.m} 2026</span>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{event.v}</span>
              <span className="text-white/30">·</span>
              <span className="font-semibold text-white">Fee: {event.fee}</span>
            </p>
          </div>
          <button onClick={onBack} className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white transition shrink-0 ml-4">
            <X className="h-4 w-4"/>
          </button>
        </div>
      </div>

      {/* Stepper */}
      <div className="px-8 pt-7 pb-2 bg-gray-50 border-b border-gray-100">
        <div className="relative flex">
          <div className="absolute top-[17px] h-0.5 bg-gray-200" style={{left:`${edgePct}%`,width:`${trackWidth}%`}}/>
          <div className="absolute top-[17px] h-0.5 bg-[#363092] transition-all duration-500" style={{left:`${edgePct}%`,width:`${filledWidth}%`}}/>
          {REG_STEPS.map((s,i)=>(
            <div key={s} className="relative z-10 flex flex-col items-center flex-1">
              <div className={`h-9 w-9 rounded-full grid place-items-center text-xs font-bold border-2 transition-all ${i<step?"bg-[#363092] border-[#363092] text-white":i===step?"bg-white border-[#363092] text-[#363092]":"bg-white border-gray-300 text-gray-400"}`}>
                {i<step?<CheckCircle2 className="h-4 w-4"/>:i+1}
              </div>
              <span className={`mt-1.5 text-[10px] font-semibold text-center leading-tight ${i<=step?"text-[#363092]":"text-gray-400"}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {step===0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FL label="Full Name" required><input className={inp} placeholder="As per Aadhaar" value={form.name} onChange={e=>set("name",e.target.value)}/></FL>
            <FL label="Date of Birth" required><input type="date" className={inp} value={form.dob} onChange={e=>set("dob",e.target.value)}/></FL>
            <FL label="Gender" required>
              <select className={sel} value={form.gender} onChange={e=>set("gender",e.target.value)}>
                <option value="">Select</option>
                {["Male","Female","Other"].map(g=><option key={g}>{g}</option>)}
              </select>
            </FL>
            <FL label="Aadhaar Number" required><input className={inp} placeholder="XXXX XXXX XXXX" value={form.aadhaar} onChange={e=>set("aadhaar",e.target.value)}/></FL>
            <FL label="Mobile Number" required><input className={inp} placeholder="+91 9XXXXXXXXX" value={form.mobile} onChange={e=>set("mobile",e.target.value)}/></FL>
            <FL label="Email Address"><input type="email" className={inp} value={form.email} onChange={e=>set("email",e.target.value)}/></FL>
            <FL label="District" required>
              <select className={sel} value={form.district} onChange={e=>set("district",e.target.value)}>
                <option value="">Select district</option>
                {DISTRICTS.map(d=><option key={d}>{d}</option>)}
              </select>
            </FL>
            <FL label="Address" required>
              <textarea rows={2} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#363092] outline-none text-sm resize-none transition bg-white" value={form.address} onChange={e=>set("address",e.target.value)}/>
            </FL>
          </div>
        )}

        {step===1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 rounded-xl bg-[#363092]/5 border border-[#363092]/20 p-4">
              <p className="text-xs font-bold text-[#363092] uppercase tracking-wider mb-1">Registering for</p>
              <p className="font-bold text-gray-900">{event.n}</p>
              <p className="text-sm text-gray-500 mt-0.5">{event.d} {event.m} 2026 · {event.v}</p>
            </div>
            <FL label="Sport / Discipline" required><input className={inp} value={form.sport} readOnly/></FL>
            <FL label="Participation Category" required>
              <select className={sel} value={form.category} onChange={e=>set("category",e.target.value)}>
                <option value="">Select</option>
                {CATEGORIES.map(c=><option key={c}>{c}</option>)}
              </select>
            </FL>
            <FL label="Team / Club Name"><input className={inp} placeholder="If representing a club" value={form.teamName} onChange={e=>set("teamName",e.target.value)}/></FL>
            <FL label="Coach / Trainer Name"><input className={inp} placeholder="Optional" value={form.coach} onChange={e=>set("coach",e.target.value)}/></FL>
          </div>
        )}

        {step===2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Aadhaar Card","Passport Photograph","Sports Achievement Certificate","School / College ID / Bonafide"].map(label=>(
              <label key={label} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-[#363092] transition group">
                <Upload className="h-6 w-6 text-gray-400 group-hover:text-[#363092] mb-2 transition"/>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-[#363092] transition text-center">{label}</span>
                <span className="text-[10px] text-gray-400 mt-0.5">PDF / JPG / PNG — max 5 MB</span>
                <input type="file" className="hidden"/>
              </label>
            ))}
          </div>
        )}

        {step===3 && (
          <div className="space-y-5">
            <div className="rounded-2xl p-5 text-white" style={{background:"linear-gradient(135deg,#363092,#1a1464)"}}>
              <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Registering for</p>
              <p className="text-xl font-bold mt-0.5">{event.n}</p>
              <p className="text-sm text-white/70">{event.d} {event.m} 2026 · {event.v} · Fee: {event.fee}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Personal Details</p>
                {[["Name",form.name],["DOB",form.dob],["Gender",form.gender],["Mobile",form.mobile],["District",form.district]].map(([l,v])=>(
                  <div key={l} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-500">{l}</span>
                    <span className="text-sm font-semibold text-gray-900">{v||"—"}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Event Details</p>
                {[["Category",form.category],["Club / Team",form.teamName],["Coach",form.coach]].map(([l,v])=>(
                  <div key={l} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-500">{l}</span>
                    <span className="text-sm font-semibold text-gray-900">{v||"—"}</span>
                  </div>
                ))}
              </div>
            </div>
            <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#363092] transition bg-gray-50">
              <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#363092]" checked={form.agreed} onChange={e=>set("agreed",e.target.checked)}/>
              <span className="text-sm text-gray-600 leading-relaxed">I confirm the details provided are accurate and agree to the event rules and regulations of the Directorate of Sports & Youth Services, Maharashtra.</span>
            </label>
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button onClick={()=>step>0?setStep(s=>s-1):onBack()}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#363092] hover:text-[#363092] transition">
            <ChevronLeft className="h-4 w-4"/>{step===0?"Cancel":"Back"}
          </button>
          <span className="text-xs text-gray-400">Step {step+1} of {REG_STEPS.length}</span>
          {step<REG_STEPS.length-1?(
            <button onClick={()=>setStep(s=>s+1)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition"
              style={{background:"#363092"}}>
              Next <ChevronRight className="h-4 w-4"/>
            </button>
          ):(
            <button onClick={()=>setSubmitted(true)} disabled={!form.agreed}
              className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition ${form.agreed?"hover:opacity-90":"opacity-40 cursor-not-allowed"}`}
              style={{background:"#FF6B35"}}>
              Submit <CheckCircle2 className="h-4 w-4"/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Page() {
  const [activeMonth, setActiveMonth] = useState("All");
  const [query, setQuery] = useState("");
  const [registering, setRegistering] = useState<Ev|null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if (registering && formRef.current) {
      setTimeout(()=>formRef.current!.scrollIntoView({behavior:"smooth",block:"start"}),50);
    }
  },[registering]);

  const filtered = EVENTS.filter(e => {
    const monthOk = activeMonth === "All" || e.month === activeMonth;
    const q = query.toLowerCase();
    const queryOk = q === "" || e.n.toLowerCase().includes(q) || e.v.toLowerCase().includes(q) || e.s.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q);
    return monthOk && queryOk;
  });
  const statusStyle = (s:string) => s==="Closing soon" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-700";

  return (
    <>
      <PageHero eyebrow="Tournaments" title="Event Calendar" subtitle="Stay up-to-date on upcoming state, national and inter-district sporting events."/>
      <SectionWrap>
        {!registering && (
          <div className="relative mb-5 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by event name, sport, or venue…"
              className="w-full h-11 pl-9 pr-9 rounded-xl border border-gray-200 text-sm focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/10 outline-none transition" />
            {query && <button onClick={()=>setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="h-4 w-4"/></button>}
          </div>
        )}

        {!registering && (
          <div className="flex flex-wrap gap-2 mb-6">
            {MONTHS.map(m=>(
              <button key={m} onClick={()=>setActiveMonth(m)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${activeMonth===m?"bg-[#363092] text-white":"border border-gray-200 hover:border-[#363092] text-gray-600"}`}>
                {m}
              </button>
            ))}
          </div>
        )}

        {!registering && (
          <>
            <SectionTitle title="Upcoming Events"/>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-gray-400">No events found matching your search.</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((e, idx)=>(
                <Reveal key={e.n} delay={idx * 80}>
                <div className="group border border-gray-200 rounded-2xl p-5 flex gap-4 bg-white hover:border-[#363092] hover:shadow-md transition-all duration-200">
                  <div className="text-center w-16 shrink-0">
                    <div className="text-3xl font-bold text-[#363092]">{e.d}</div>
                    <div className="text-xs uppercase text-gray-500">{e.m}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] uppercase text-[#FF6B35] font-bold">{e.s}</div>
                    <div className="font-bold text-gray-900 group-hover:text-[#363092] transition-colors">{e.n}</div>
                    <div className="mt-1 text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-3.5 w-3.5"/>{e.v}</div>
                    <div className="mt-1 text-xs text-gray-400 flex items-center gap-1"><Calendar className="h-3 w-3"/>{e.age} · Fee: <span className="font-semibold text-gray-600 ml-1">{e.fee}</span></div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${statusStyle(e.status)}`}>{e.status}</span>
                      <button onClick={()=>setRegistering(e)} className="text-sm font-semibold text-[#363092] hover:text-[#FF6B35] transition-colors">
                        Register →
                      </button>
                    </div>
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {registering && (
          <div ref={formRef}>
            <InlineRegistrationForm event={registering} onBack={()=>setRegistering(null)}/>
          </div>
        )}
      </SectionWrap>
    </>
  );
}

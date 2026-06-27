import { useState } from "react";
import {
  LayoutDashboard, BookOpen, FileText, Users, ClipboardList,
  Award, BarChart3, Settings, ChevronRight, Search, Plus,
  CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp,
  TrendingDown, Eye, Edit3, Download, X, LogOut, ArrowLeft,
  Bell, Play, Video, Image, FileQuestion, Globe, Star,
  Filter, Upload, Trash2, ToggleLeft, ToggleRight, Lock,
  Unlock, RefreshCw, Hash, Layers, Target, Zap, BookMarked,
  GraduationCap, Languages, PenTool, BarChart2, Activity,
  ChevronDown, ChevronUp, CheckSquare, Circle,
} from "lucide-react";
import mhSeal from "@/assets/mh-seal.png";

/* ═══════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════ */
const PRIMARY = "#1e3a5f";
const ACCENT  = "#f97316";

/* ═══════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════ */
function Badge({ label, color }: { label: string; color: string }) {
  const map: Record<string, string> = {
    green:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
    red:    "bg-red-50 text-red-600 border border-red-200",
    amber:  "bg-amber-50 text-amber-700 border border-amber-200",
    blue:   "bg-blue-50 text-blue-700 border border-blue-200",
    indigo: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    gray:   "bg-gray-100 text-gray-500 border border-gray-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
    navy:   "bg-[#1e3a5f]/10 text-[#1e3a5f] border border-[#1e3a5f]/20",
    orange: "bg-orange-50 text-orange-600 border border-orange-200",
    cyan:   "bg-cyan-50 text-cyan-700 border border-cyan-200",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${map[color]||map.gray}`}>{label}</span>;
}

function KpiCard({ label, value, sub, icon: Icon, color, trend }: {
  label: string; value: string|number; sub?: string;
  icon: React.ElementType; color: string; trend?: "up"|"down"|"neutral";
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-start">
      <div className="h-12 w-12 rounded-xl grid place-items-center shrink-0" style={{background:`${color}15`}}>
        <Icon className="h-6 w-6" style={{color}}/>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</div>
        <div className="text-2xl font-black text-gray-900 mt-0.5">{value}</div>
        {sub && (
          <div className={`text-xs mt-1 flex items-center gap-1 font-medium ${trend==="up"?"text-emerald-600":trend==="down"?"text-red-500":"text-gray-400"}`}>
            {trend==="up"&&<TrendingUp className="h-3 w-3"/>}
            {trend==="down"&&<TrendingDown className="h-3 w-3"/>}
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

function TableWrap({ heads, children }: { heads: string[]; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {heads.map(h=><th key={h} className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v:string)=>void; placeholder?: string }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder||"Search…"}
        className="h-9 pl-9 pr-9 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition w-64"/>
      {value&&<button onClick={()=>onChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="h-3.5 w-3.5"/></button>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MASTER DATA
═══════════════════════════════════════════════ */
const CATEGORIES = ["Sports Education","Nutrition & Health","Fitness & Conditioning","Coaching Methodology","Sport-Specific","Compliance & Welfare","Athlete Development"];
const LANGUAGES  = ["English","Hindi","Marathi"];
const LEVELS     = ["Beginner","Intermediate","Advanced"];
const AUDIENCES  = ["Athlete","Coach","Official","All"];

const COURSES = [
  { id:"CRS-001", title:"Anti-Doping & WADA Compliance",         cat:"Compliance & Welfare",     sport:"All",        level:"Beginner",      audience:"All",      langs:["EN","HI","MR"], modules:5, duration:"3h 20m", enrolled:1247, completed:986,  rating:4.7, status:"Published",  mandatory:true,  thumb:"🛡️" },
  { id:"CRS-002", title:"POSH Policy & Workplace Safety",         cat:"Compliance & Welfare",     sport:"All",        level:"Beginner",      audience:"All",      langs:["EN","HI","MR"], modules:4, duration:"2h 10m", enrolled:1198, completed:1102, rating:4.5, status:"Published",  mandatory:true,  thumb:"⚖️" },
  { id:"CRS-003", title:"Athlete Nutrition Fundamentals",          cat:"Nutrition & Health",       sport:"All",        level:"Beginner",      audience:"Athlete",  langs:["EN","MR"],      modules:6, duration:"4h 00m", enrolled:892,  completed:541,  rating:4.8, status:"Published",  mandatory:false, thumb:"🥗" },
  { id:"CRS-004", title:"Football Coaching Methodology",           cat:"Coaching Methodology",     sport:"Football",   level:"Intermediate",  audience:"Coach",    langs:["EN","HI"],      modules:8, duration:"6h 30m", enrolled:213,  completed:98,   rating:4.6, status:"Published",  mandatory:false, thumb:"⚽" },
  { id:"CRS-005", title:"Athletics Training Techniques",           cat:"Sport-Specific",           sport:"Athletics",  level:"Intermediate",  audience:"Athlete",  langs:["EN","MR"],      modules:7, duration:"5h 15m", enrolled:341,  completed:189,  rating:4.9, status:"Published",  mandatory:false, thumb:"🏃" },
  { id:"CRS-006", title:"Strength & Conditioning for Combat Sports",cat:"Fitness & Conditioning", sport:"Wrestling",  level:"Advanced",      audience:"Athlete",  langs:["EN"],           modules:9, duration:"7h 45m", enrolled:187,  completed:62,   rating:4.7, status:"Published",  mandatory:false, thumb:"💪" },
  { id:"CRS-007", title:"Mental Toughness & Sports Psychology",    cat:"Athlete Development",      sport:"All",        level:"Intermediate",  audience:"Athlete",  langs:["EN","HI","MR"], modules:5, duration:"3h 30m", enrolled:654,  completed:312,  rating:4.8, status:"Published",  mandatory:false, thumb:"🧠" },
  { id:"CRS-008", title:"Jogging & Running for Beginners",         cat:"Sport-Specific",           sport:"Athletics",  level:"Beginner",      audience:"All",      langs:["EN","MR"],      modules:4, duration:"2h 00m", enrolled:489,  completed:398,  rating:4.4, status:"Published",  mandatory:false, thumb:"🏅" },
  { id:"CRS-009", title:"Talent Identification & Scouting",        cat:"Coaching Methodology",     sport:"All",        level:"Advanced",      audience:"Coach",    langs:["EN"],           modules:6, duration:"4h 20m", enrolled:128,  completed:41,   rating:4.6, status:"Draft",      mandatory:false, thumb:"🔍" },
  { id:"CRS-010", title:"First Aid & Sports Injury Management",    cat:"Nutrition & Health",       sport:"All",        level:"Beginner",      audience:"All",      langs:["EN","HI","MR"], modules:5, duration:"3h 10m", enrolled:0,    completed:0,    rating:0,   status:"Under Review",mandatory:false, thumb:"🩺" },
  { id:"CRS-011", title:"Swimming Technique Masterclass",          cat:"Sport-Specific",           sport:"Swimming",   level:"Intermediate",  audience:"Athlete",  langs:["EN"],           modules:7, duration:"5h 30m", enrolled:0,    completed:0,    rating:0,   status:"Draft",      mandatory:false, thumb:"🏊" },
  { id:"CRS-012", title:"Child Safeguarding in Sports",            cat:"Compliance & Welfare",     sport:"All",        level:"Beginner",      audience:"Coach",    langs:["EN","MR"],      modules:4, duration:"2h 30m", enrolled:0,    completed:0,    rating:0,   status:"Under Review",mandatory:true,  thumb:"👶" },
];

const LEARNERS = [
  { id:"LRN-001", name:"Arjun Deshmukh",  role:"Athlete", district:"Pune",       enrolled:4, completed:3, inProgress:1, lastActive:"Today",       cert:3, progress:84 },
  { id:"LRN-002", name:"Priya Jadhav",    role:"Athlete", district:"Nashik",     enrolled:3, completed:2, inProgress:1, lastActive:"Yesterday",    cert:2, progress:71 },
  { id:"LRN-003", name:"Ramesh Kumar",    role:"Coach",   district:"Pune",       enrolled:6, completed:5, inProgress:1, lastActive:"Today",        cert:5, progress:92 },
  { id:"LRN-004", name:"Anil Wagh",       role:"Coach",   district:"Kolhapur",   enrolled:5, completed:4, inProgress:1, lastActive:"2 days ago",   cert:4, progress:88 },
  { id:"LRN-005", name:"Sneha Kulkarni",  role:"Athlete", district:"Nashik",     enrolled:2, completed:1, inProgress:1, lastActive:"3 days ago",   cert:1, progress:55 },
  { id:"LRN-006", name:"Vijay Kale",      role:"Coach",   district:"Solapur",    enrolled:4, completed:2, inProgress:2, lastActive:"1 week ago",   cert:2, progress:63 },
  { id:"LRN-007", name:"Kavita Patil",    role:"Athlete", district:"Pune",       enrolled:3, completed:3, inProgress:0, lastActive:"Today",        cert:3, progress:100},
  { id:"LRN-008", name:"Ganesh More",     role:"Coach",   district:"Nagpur",     enrolled:5, completed:1, inProgress:4, lastActive:"4 days ago",   cert:1, progress:42 },
  { id:"LRN-009", name:"Sonal More",      role:"Athlete", district:"Aurangabad", enrolled:2, completed:0, inProgress:2, lastActive:"1 week ago",   cert:0, progress:28 },
  { id:"LRN-010", name:"Meena Raut",      role:"Coach",   district:"Aurangabad", enrolled:4, completed:3, inProgress:1, lastActive:"Today",        cert:3, progress:87 },
];

const ASSESSMENTS = [
  { id:"ASS-001", title:"Anti-Doping Final Test",           course:"Anti-Doping & WADA Compliance",    questions:20, passmark:70, attempts:986,  avgScore:82, passed:901, failed:85,  status:"Active" },
  { id:"ASS-002", title:"POSH Module Checkpoint",           course:"POSH Policy & Workplace Safety",   questions:15, passmark:75, attempts:1102, avgScore:88, passed:1058,failed:44,  status:"Active" },
  { id:"ASS-003", title:"Nutrition Knowledge Check",        course:"Athlete Nutrition Fundamentals",   questions:25, passmark:65, attempts:541,  avgScore:74, passed:489, failed:52,  status:"Active" },
  { id:"ASS-004", title:"Football Coaching Assessment",     course:"Football Coaching Methodology",    questions:30, passmark:70, attempts:98,   avgScore:78, passed:84,  failed:14,  status:"Active" },
  { id:"ASS-005", title:"Athletics Technique Quiz",         course:"Athletics Training Techniques",    questions:20, passmark:70, attempts:189,  avgScore:81, passed:172, failed:17,  status:"Active" },
  { id:"ASS-006", title:"Mental Toughness Self-Assessment", course:"Mental Toughness & Sports Psychology",questions:18,passmark:60,attempts:312,  avgScore:76, passed:298, failed:14,  status:"Active" },
  { id:"ASS-007", title:"First Aid Practical Quiz",         course:"First Aid & Sports Injury Management",questions:22,passmark:80,attempts:0,    avgScore:0,  passed:0,   failed:0,   status:"Draft"  },
];

const CERTIFICATES = [
  { id:"CERT-LMS-0412", learner:"Arjun Deshmukh",  course:"Anti-Doping & WADA Compliance",  issued:"20 Jun 2027", score:88, status:"Issued"  },
  { id:"CERT-LMS-0411", learner:"Ramesh Kumar",    course:"Football Coaching Methodology",   issued:"18 Jun 2027", score:92, status:"Issued"  },
  { id:"CERT-LMS-0410", learner:"Anil Wagh",       course:"Athlete Nutrition Fundamentals",  issued:"15 Jun 2027", score:79, status:"Issued"  },
  { id:"CERT-LMS-0409", learner:"Kavita Patil",    course:"POSH Policy & Workplace Safety",  issued:"14 Jun 2027", score:95, status:"Issued"  },
  { id:"CERT-LMS-0408", learner:"Priya Jadhav",    course:"Mental Toughness & Sports Psychology",issued:"10 Jun 2027",score:84,status:"Issued" },
  { id:"CERT-LMS-0407", learner:"Meena Raut",      course:"Anti-Doping & WADA Compliance",  issued:"08 Jun 2027", score:77, status:"Issued"  },
  { id:"CERT-LMS-0406", learner:"Ganesh More",     course:"Athlete Nutrition Fundamentals",  issued:"05 Jun 2027", score:68, status:"Revoked" },
];

/* ═══════════════════════════════════════════════
   SCREEN 1 — DASHBOARD
═══════════════════════════════════════════════ */
function ScreenDashboard({ setNav }: { setNav:(n:string)=>void }) {
  const totalEnrolled   = COURSES.reduce((a,c)=>a+c.enrolled,0);
  const totalCompleted  = COURSES.reduce((a,c)=>a+c.completed,0);
  const publishedCount  = COURSES.filter(c=>c.status==="Published").length;
  const overallComplete = totalEnrolled>0?Math.round((totalCompleted/totalEnrolled)*100):0;

  const ALERTS = [
    { msg:"CRS-010 & CRS-012 are 'Under Review' — content approval pending from SME",  type:"warning" },
    { msg:"3 learners have not started any mandatory course — POSH compliance at risk",  type:"danger"  },
    { msg:"CRS-009 Talent Identification course still in Draft — publish to unlock",     type:"info"    },
    { msg:"Assessment pass rate for Anti-Doping dropped 4% this week",                  type:"warning" },
  ];

  const CAT_DATA = CATEGORIES.map(cat=>({
    cat, count: COURSES.filter(c=>c.cat===cat&&c.status==="Published").length,
    enrolled: COURSES.filter(c=>c.cat===cat).reduce((a,c)=>a+c.enrolled,0),
  })).filter(c=>c.count>0);

  const TOP_COURSES = [...COURSES].filter(c=>c.enrolled>0).sort((a,b)=>b.enrolled-a.enrolled).slice(0,5);

  return (
    <div className="p-6 space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Courses"       value={COURSES.length}          sub={`${publishedCount} published`}          icon={BookOpen}      color={PRIMARY}   trend="neutral"/>
        <KpiCard label="Total Enrollments"   value={totalEnrolled.toLocaleString("en-IN")} sub="+214 this month"         icon={Users}         color="#059669"   trend="up"/>
        <KpiCard label="Completion Rate"     value={`${overallComplete}%`}   sub={`${totalCompleted.toLocaleString()} completed`} icon={CheckCircle} color="#7c3aed" trend="up"/>
        <KpiCard label="Certificates Issued" value={CERTIFICATES.filter(c=>c.status==="Issued").length} sub="This year" icon={Award}         color={ACCENT}    trend="up"/>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          ["Mandatory Courses",  COURSES.filter(c=>c.mandatory).length,                    "#dc2626", Lock       ],
          ["Under Review",       COURSES.filter(c=>c.status==="Under Review").length,       "#f59e0b", Clock      ],
          ["Draft Courses",      COURSES.filter(c=>c.status==="Draft").length,              "#6b7280", FileText   ],
          ["Active Learners",    LEARNERS.filter(l=>l.lastActive==="Today"||l.lastActive==="Yesterday").length,"#059669",Activity],
        ].map(([l,v,c,Ic])=>{ const Icon=Ic as React.ElementType; return (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black" style={{color:c as string}}>{v as number}</div>
              <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
            </div>
            <div className="h-10 w-10 rounded-xl grid place-items-center" style={{background:`${c as string}15`}}>
              <Icon className="h-5 w-5" style={{color:c as string}}/>
            </div>
          </div>
        );})}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Top courses by enrollment */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-800">Top Courses by Enrollment</h2>
            <button onClick={()=>setNav("courses")} className="text-xs font-bold hover:underline" style={{color:PRIMARY}}>View All →</button>
          </div>
          <div className="space-y-3">
            {TOP_COURSES.map((c,i)=>{
              const pct=c.enrolled>0?Math.round((c.completed/c.enrolled)*100):0;
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition cursor-pointer" onClick={()=>setNav("courses")}>
                  <div className="text-2xl shrink-0">{c.thumb}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800 text-xs truncate">{c.title}</div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{width:`${pct}%`,background:pct>=80?"#059669":pct>=50?"#f59e0b":"#1e3a5f"}}/>
                      </div>
                      <span className="text-[10px] font-black shrink-0" style={{color:pct>=80?"#059669":pct>=50?"#f59e0b":"#1e3a5f"}}>{pct}%</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-gray-900">{c.enrolled.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-400">learners</div>
                  </div>
                  <Badge label={c.status} color={c.status==="Published"?"green":c.status==="Draft"?"gray":"amber"}/>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-800 mb-4">Platform Alerts</h2>
          <div className="space-y-3">
            {ALERTS.map((a,i)=>(
              <div key={i} className={`flex gap-2 p-3 rounded-xl text-xs ${a.type==="danger"?"bg-red-50 border border-red-100":a.type==="warning"?"bg-amber-50 border border-amber-100":"bg-blue-50 border border-blue-100"}`}>
                <AlertTriangle className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${a.type==="danger"?"text-red-500":a.type==="warning"?"text-amber-500":"text-blue-500"}`}/>
                <span className={`font-medium leading-snug ${a.type==="danger"?"text-red-700":a.type==="warning"?"text-amber-700":"text-blue-700"}`}>{a.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category breakdown + Language coverage */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-800 mb-4">Category-wise Enrollment</h2>
          <div className="space-y-3">
            {CAT_DATA.sort((a,b)=>b.enrolled-a.enrolled).map((c,i)=>(
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-700">{c.cat}</span>
                  <span className="text-xs font-black text-gray-900">{c.enrolled.toLocaleString()} enrolled · <span className="text-gray-400">{c.count} courses</span></span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${Math.min((c.enrolled/2000)*100,100)}%`,background:PRIMARY}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-800 mb-4">Language Coverage</h2>
          <div className="space-y-4">
            {[["English","EN",COURSES.filter(c=>c.langs.includes("EN")).length,"#1e3a5f"],
              ["Hindi","HI",COURSES.filter(c=>c.langs.includes("HI")).length,"#7c3aed"],
              ["Marathi","MR",COURSES.filter(c=>c.langs.includes("MR")).length,"#f97316"]].map(([name,code,cnt,clr])=>(
              <div key={code as string}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg grid place-items-center text-white text-[10px] font-black" style={{background:clr as string}}>{code as string}</div>
                    <span className="text-xs font-semibold text-gray-700">{name as string}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-gray-900">{cnt as number}</span>
                    <span className="text-xs text-gray-400"> / {COURSES.filter(c=>c.status==="Published").length} courses</span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${Math.round(((cnt as number)/COURSES.filter(c=>c.status==="Published").length)*100)}%`,background:clr as string}}/>
                </div>
                <div className="text-[10px] text-gray-400 mt-1 text-right">{Math.round(((cnt as number)/COURSES.filter(c=>c.status==="Published").length)*100)}% coverage</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCREEN 2 — COURSE MANAGEMENT
═══════════════════════════════════════════════ */
function ScreenCourses() {
  const [search, setSearch]       = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [statusFilter, setStatus] = useState("All");
  const [selected, setSelected]   = useState<number|null>(null);
  const [showForm, setShowForm]   = useState(false);

  const filtered = COURSES.filter(c=>{
    const q=search.toLowerCase();
    return (catFilter==="All"||c.cat===catFilter)
        && (statusFilter==="All"||c.status===statusFilter)
        && (!q||c.title.toLowerCase().includes(q)||c.id.toLowerCase().includes(q));
  });
  const course  = selected!==null ? COURSES[selected] : null;
  const scColor: Record<string,string> = { Published:"green", Draft:"gray", "Under Review":"amber", Archived:"red" };
  const lvlColor: Record<string,string>= { Beginner:"green", Intermediate:"blue", Advanced:"purple" };

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Course Management</h1>
            <p className="text-xs text-gray-400 mt-0.5">{COURSES.filter(c=>c.status==="Published").length} published · {COURSES.length} total</p>
          </div>
          <button onClick={()=>setShowForm(true)} className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:ACCENT}}>
            <Plus className="h-4 w-4"/> Create Course
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by title or ID…"/>
          <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
          <div className="flex gap-1">
            {["All","Published","Draft","Under Review"].map(s=>(
              <button key={s} onClick={()=>setStatus(s)}
                className={`h-7 px-3 rounded-lg text-[11px] font-bold transition ${statusFilter===s?"text-white":"border border-gray-200 text-gray-500 hover:border-blue-300"}`}
                style={statusFilter===s?{background:PRIMARY}:{}}>
                {s}
              </button>
            ))}
          </div>
          <button className="ml-auto h-9 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
            <Download className="h-3.5 w-3.5"/> Export
          </button>
        </div>

        <TableWrap heads={["ID","Course","Category","Level","Audience","Languages","Modules","Enrolled","Completion","Rating","Status","Mandatory","Action"]}>
          {filtered.map((c,i)=>{
            const pct=c.enrolled>0?Math.round((c.completed/c.enrolled)*100):0;
            return (
              <tr key={i} onClick={()=>setSelected(COURSES.indexOf(c))} className={`cursor-pointer transition ${selected===COURSES.indexOf(c)?"bg-blue-50":"hover:bg-gray-50"}`}>
                <td className="px-4 py-3.5 font-mono text-[10px] text-gray-400">{c.id}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{c.thumb}</span>
                    <span className="font-bold text-gray-800 text-xs max-w-[160px] truncate">{c.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs text-gray-500 max-w-[110px] truncate">{c.cat}</td>
                <td className="px-4 py-3.5"><Badge label={c.level} color={lvlColor[c.level]}/></td>
                <td className="px-4 py-3.5"><Badge label={c.audience} color="navy"/></td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-0.5">
                    {c.langs.map(l=><span key={l} className="text-[9px] font-black px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{l}</span>)}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs font-bold text-gray-700">{c.modules}</td>
                <td className="px-4 py-3.5 text-xs font-bold text-gray-700">{c.enrolled.toLocaleString()}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-14 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{width:`${pct}%`,background:pct>=80?"#059669":pct>=50?"#f59e0b":"#1e3a5f"}}/>
                    </div>
                    <span className="text-[11px] font-black" style={{color:pct>=80?"#059669":pct>=50?"#f59e0b":"#1e3a5f"}}>{pct}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  {c.rating>0?<div className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400"/><span className="text-xs font-bold text-gray-700">{c.rating}</span></div>:<span className="text-xs text-gray-300">—</span>}
                </td>
                <td className="px-4 py-3.5"><Badge label={c.status} color={scColor[c.status]}/></td>
                <td className="px-4 py-3.5">{c.mandatory?<Lock className="h-3.5 w-3.5 text-red-400"/>:<Unlock className="h-3.5 w-3.5 text-gray-300"/>}</td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-1.5">
                    <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"><Eye className="h-3.5 w-3.5"/></button>
                    <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 hover:border-amber-300 transition"><Edit3 className="h-3.5 w-3.5"/></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </TableWrap>
      </div>

      {/* Course detail panel */}
      {course && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Course Details</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4"/></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="text-center pb-4 border-b border-gray-100">
              <div className="text-5xl mb-3">{course.thumb}</div>
              <div className="font-black text-gray-900 text-sm leading-tight">{course.title}</div>
              <div className="text-xs text-gray-400 mt-1">{course.cat}</div>
              <div className="mt-2 flex gap-1.5 justify-center flex-wrap">
                <Badge label={course.status} color={scColor[course.status]}/>
                <Badge label={course.level} color={lvlColor[course.level]}/>
                {course.mandatory&&<Badge label="Mandatory" color="red"/>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Modules",course.modules],["Duration",course.duration],["Enrolled",course.enrolled.toLocaleString()],["Completed",course.completed.toLocaleString()]].map(([k,v])=>(
                <div key={k} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-base font-black text-gray-900">{v}</div>
                  <div className="text-[10px] text-gray-400 font-semibold">{k}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-xs">
              {[["Target Audience",course.audience],["Sport",course.sport],["Languages",course.langs.join(", ")],["Rating",course.rating>0?`⭐ ${course.rating}`:"Not rated yet"]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700 text-right max-w-[55%]">{String(v)}</span>
                </div>
              ))}
            </div>
            {course.status==="Under Review"&&(
              <div className="space-y-2">
                <button className="w-full h-9 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4"/> Approve & Publish
                </button>
                <button className="w-full h-9 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 flex items-center justify-center gap-2 transition">
                  <XCircle className="h-4 w-4"/> Return for Revision
                </button>
              </div>
            )}
            {course.status==="Draft"&&(
              <button className="w-full h-9 rounded-xl text-white text-xs font-bold hover:opacity-90 flex items-center justify-center gap-2 transition" style={{background:ACCENT}}>
                <Upload className="h-4 w-4"/> Submit for Review
              </button>
            )}
            {course.status==="Published"&&(
              <div className="space-y-2">
                <button className="w-full h-9 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                  <Edit3 className="h-3.5 w-3.5"/> Edit Course
                </button>
                <button className="w-full h-9 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 flex items-center justify-center gap-2 transition">
                  <Trash2 className="h-3.5 w-3.5"/> Archive Course
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create course slide-over */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={()=>setShowForm(false)}/>
          <div className="w-[480px] bg-white h-full overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <div className="font-black text-gray-900">Create New Course</div>
                <div className="text-xs text-gray-400 mt-0.5">Fill in course details below</div>
              </div>
              <button onClick={()=>setShowForm(false)} className="h-8 w-8 rounded-xl border border-gray-200 grid place-items-center text-gray-400 hover:text-gray-600 transition"><X className="h-4 w-4"/></button>
            </div>
            <div className="p-6 space-y-5">
              {[["Course Title","Enter full course title","text"],["Short Description","Brief overview (max 200 chars)","text"],["Duration","e.g. 3h 30m","text"]].map(([label,ph,type])=>(
                <div key={label as string}>
                  <label className="text-xs font-bold text-gray-700 mb-1.5 block">{label as string}</label>
                  <input type={type as string} placeholder={ph as string} className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"/>
                </div>
              ))}
              {[["Category","Select category",CATEGORIES],["Level","Select level",LEVELS],["Target Audience","Select audience",AUDIENCES],["Sport","Select sport",["All","Athletics","Swimming","Wrestling","Badminton","Boxing","Kabaddi","Football"]]].map(([label,ph,opts])=>(
                <div key={label as string}>
                  <label className="text-xs font-bold text-gray-700 mb-1.5 block">{label as string}</label>
                  <select className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 bg-white">
                    <option value="">{ph as string}</option>
                    {(opts as string[]).map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 block">Available Languages</label>
                <div className="flex gap-3">
                  {LANGUAGES.map(l=>(
                    <label key={l} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked={l==="English"} className="rounded"/>
                      <span className="text-xs font-semibold text-gray-700">{l}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200">
                <div>
                  <div className="text-xs font-bold text-gray-700">Mandatory Course</div>
                  <div className="text-[11px] text-gray-400">Auto-enroll all learners</div>
                </div>
                <div className="h-6 w-11 rounded-full bg-gray-200 relative cursor-pointer">
                  <div className="h-5 w-5 rounded-full bg-white shadow absolute top-0.5 left-0.5 transition-all"/>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={()=>setShowForm(false)} className="flex-1 h-10 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">Cancel</button>
                <button className="flex-1 h-10 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:PRIMARY}}>Save as Draft</button>
                <button className="flex-1 h-10 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:ACCENT}}>Submit for Review</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCREEN 3 — CONTENT BUILDER
═══════════════════════════════════════════════ */
function ScreenContent() {
  const [activeCourse, setActiveCourse] = useState(0);
  const c = COURSES.filter(c=>c.status!=="Archived")[activeCourse];

  const MODULES_SAMPLE = [
    { title:"Introduction & Overview",     lessons:[{t:"Welcome Video",type:"video",dur:"8m"},{t:"Course Guide PDF",type:"pdf",dur:""},{t:"Module Quiz",type:"quiz",q:5}] },
    { title:"Core Concepts",               lessons:[{t:"Concept Explanation",type:"video",dur:"22m"},{t:"Reading Material",type:"pdf",dur:""},{t:"Case Studies",type:"slides",dur:""},{t:"Checkpoint Quiz",type:"quiz",q:8}] },
    { title:"Practical Application",       lessons:[{t:"Demonstration Video",type:"video",dur:"18m"},{t:"Exercise Workbook",type:"pdf",dur:""},{t:"Practice Quiz",type:"quiz",q:10}] },
    { title:"Advanced Topics",             lessons:[{t:"Expert Interview",type:"video",dur:"35m"},{t:"Research Notes",type:"pdf",dur:""},{t:"Advanced Quiz",type:"quiz",q:12}] },
    { title:"Final Assessment",            lessons:[{t:"Final Exam",type:"quiz",q:20}] },
  ];

  const typeIcon: Record<string,React.ElementType> = { video:Video, pdf:FileText, slides:Image, quiz:FileQuestion };
  const typeColor: Record<string,string> = { video:"#1e3a5f", pdf:"#dc2626", slides:"#f97316", quiz:"#7c3aed" };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Content Builder</h1>
          <p className="text-xs text-gray-400 mt-0.5">Upload and organize course content — videos, PDFs, slides, quizzes</p>
        </div>
        <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:PRIMARY}}>
          <Plus className="h-4 w-4"/> Add Module
        </button>
      </div>

      {/* Course picker */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {COURSES.filter(c=>c.status!=="Archived").map((course,i)=>(
          <button key={i} onClick={()=>setActiveCourse(i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shrink-0 ${activeCourse===i?"text-white shadow-sm":"border border-gray-200 text-gray-500 hover:border-blue-300 bg-white"}`}
            style={activeCourse===i?{background:PRIMARY}:{}}>
            <span>{course.thumb}</span> {course.title.length>28?course.title.slice(0,28)+"…":course.title}
          </button>
        ))}
      </div>

      {c && (
        <div className="grid grid-cols-3 gap-5">
          {/* Module list */}
          <div className="col-span-2 space-y-3">
            {MODULES_SAMPLE.slice(0, c.modules>5?5:c.modules).map((mod,mi)=>(
              <div key={mi} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-lg grid place-items-center text-white text-[11px] font-black shrink-0" style={{background:PRIMARY}}>{mi+1}</div>
                    <span className="font-bold text-gray-800 text-sm">{mod.title}</span>
                    <Badge label={`${mod.lessons.length} lessons`} color="blue"/>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="h-7 px-2.5 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:bg-gray-100 transition flex items-center gap-1"><Plus className="h-3 w-3"/> Lesson</button>
                    <button className="h-7 w-7 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 transition"><Edit3 className="h-3.5 w-3.5"/></button>
                  </div>
                </div>
                <div className="divide-y divide-gray-50">
                  {mod.lessons.map((l,li)=>{
                    const Icon=typeIcon[l.type]||FileText;
                    return (
                      <div key={li} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">
                        <div className="h-8 w-8 rounded-lg grid place-items-center shrink-0" style={{background:`${typeColor[l.type]}15`}}>
                          <Icon className="h-4 w-4" style={{color:typeColor[l.type]}}/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-gray-800">{l.t}</div>
                          <div className="text-[11px] text-gray-400 mt-0.5 capitalize">
                            {l.type}{l.type==="quiz"?` · ${(l as {t:string;type:string;q:number}).q} questions`:l.dur?` · ${l.dur}`:""}
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 transition"><Eye className="h-3.5 w-3.5"/></button>
                          <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 transition"><Edit3 className="h-3.5 w-3.5"/></button>
                          <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-red-500 transition"><Trash2 className="h-3.5 w-3.5"/></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Upload panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Upload Content</h3>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 transition cursor-pointer group">
                <Upload className="h-8 w-8 mx-auto text-gray-300 group-hover:text-blue-400 transition mb-2"/>
                <div className="text-xs font-bold text-gray-500">Drop files here or click to browse</div>
                <div className="text-[11px] text-gray-400 mt-1">MP4, PDF, PPTX · Max 500MB</div>
              </div>
              <div className="mt-3 space-y-2">
                {[["Video Lesson","MP4, MOV",Video,"#1e3a5f"],["PDF / Notes","PDF, DOCX",FileText,"#dc2626"],["Presentation","PPTX, Slides",Image,"#f97316"],["Quiz / Assessment","via Builder",FileQuestion,"#7c3aed"]].map(([l,ext,Ic,clr])=>{
                  const Icon=Ic as React.ElementType;
                  return (
                    <button key={l as string} className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition">
                      <div className="h-8 w-8 rounded-lg grid place-items-center shrink-0" style={{background:`${clr as string}15`}}>
                        <Icon className="h-4 w-4" style={{color:clr as string}}/>
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-gray-700">{l as string}</div>
                        <div className="text-[10px] text-gray-400">{ext as string}</div>
                      </div>
                      <Plus className="h-3.5 w-3.5 text-gray-400 ml-auto"/>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Language Versions</h3>
              <div className="space-y-2">
                {LANGUAGES.map(l=>{
                  const has=c.langs.includes(l==="English"?"EN":l==="Hindi"?"HI":"MR");
                  return (
                    <div key={l} className={`flex items-center justify-between p-3 rounded-xl border ${has?"border-emerald-200 bg-emerald-50":"border-dashed border-gray-200"}`}>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md grid place-items-center text-white text-[10px] font-black" style={{background:has?PRIMARY:"#9ca3af"}}>
                          {l[0]}
                        </div>
                        <span className="text-xs font-bold text-gray-700">{l}</span>
                      </div>
                      {has?<Badge label="Available" color="green"/>:<button className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"><Plus className="h-3 w-3"/>Add</button>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCREEN 4 — LEARNER MANAGEMENT
═══════════════════════════════════════════════ */
function ScreenLearners() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number|null>(null);

  const filtered = LEARNERS.filter(l=>!search||l.name.toLowerCase().includes(search.toLowerCase())||l.id.toLowerCase().includes(search.toLowerCase()));
  const learner  = selected!==null ? LEARNERS[selected] : null;

  function ProgressBar({ pct }: { pct: number }) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{width:`${pct}%`,background:pct===100?"#059669":pct>=70?"#1e3a5f":pct>=40?"#f59e0b":"#dc2626"}}/>
        </div>
        <span className="text-[11px] font-black w-8 text-right" style={{color:pct===100?"#059669":pct>=70?"#1e3a5f":pct>=40?"#f59e0b":"#dc2626"}}>{pct}%</span>
      </div>
    );
  }

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Learner Management</h1>
            <p className="text-xs text-gray-400 mt-0.5">{LEARNERS.length} registered learners — athletes, coaches & officials</p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
              <Upload className="h-3.5 w-3.5"/> Bulk Enroll
            </button>
            <button className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{background:PRIMARY}}>
              <Plus className="h-4 w-4"/> Add Learner
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[["Total Learners",LEARNERS.length,"#1e3a5f"],["Active Today",LEARNERS.filter(l=>l.lastActive==="Today").length,"#059669"],["100% Complete",LEARNERS.filter(l=>l.progress===100).length,"#7c3aed"],["Certificates",LEARNERS.reduce((a,l)=>a+l.cert,0),"#f97316"]].map(([l,v,c])=>(
            <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 text-center">
              <div className="text-2xl font-black" style={{color:c as string}}>{v as number}</div>
              <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID…"/>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Roles</option><option>Athlete</option><option>Coach</option><option>Official</option>
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Districts</option>{["Pune","Nashik","Nagpur","Kolhapur","Solapur","Aurangabad"].map(d=><option key={d}>{d}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Progress</option><option>100% Complete</option><option>In Progress</option><option>Not Started</option>
          </select>
          <button className="ml-auto h-9 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
            <Download className="h-3.5 w-3.5"/> Export
          </button>
        </div>

        <TableWrap heads={["ID","Learner","Role","District","Enrolled","Completed","In Progress","Last Active","Certificates","Overall Progress","Action"]}>
          {filtered.map((l,i)=>(
            <tr key={i} onClick={()=>setSelected(LEARNERS.indexOf(l))} className={`cursor-pointer transition ${selected===LEARNERS.indexOf(l)?"bg-blue-50":"hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{l.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{l.name}</td>
              <td className="px-5 py-3.5"><Badge label={l.role} color={l.role==="Athlete"?"blue":"green"}/></td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{l.district}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{l.enrolled}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-emerald-700">{l.completed}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-blue-600">{l.inProgress}</td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{l.lastActive}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-amber-600">{l.cert} 🏅</td>
              <td className="px-5 py-3.5 min-w-[130px]"><ProgressBar pct={l.progress}/></td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1.5">
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"><Eye className="h-3.5 w-3.5"/></button>
                  <button className="h-6 px-2 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition">Enroll</button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {learner && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Learner Profile</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4"/></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex flex-col items-center gap-2 pb-4 border-b border-gray-100">
              <div className="h-16 w-16 rounded-2xl grid place-items-center text-white font-black text-2xl" style={{background:PRIMARY}}>
                {learner.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div className="text-center">
                <div className="font-black text-gray-900">{learner.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{learner.role} · {learner.district}</div>
              </div>
              <div className="w-full">
                <div className="text-[11px] text-gray-400 text-center mb-1.5">Overall Progress</div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${learner.progress}%`,background:learner.progress===100?"#059669":learner.progress>=70?"#1e3a5f":"#f59e0b"}}/>
                </div>
                <div className="text-center mt-1 text-xs font-black" style={{color:learner.progress===100?"#059669":PRIMARY}}>{learner.progress}%</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Enrolled",learner.enrolled,"#1e3a5f"],["Completed",learner.completed,"#059669"],["In Progress",learner.inProgress,"#f59e0b"],["Certificates",learner.cert,"#f97316"]].map(([k,v,c])=>(
                <div key={k} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-black" style={{color:c as string}}>{v as string|number}</div>
                  <div className="text-[10px] text-gray-400 font-semibold">{k}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-xs">
              {[["Learner ID",learner.id],["Last Active",learner.lastActive]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700">{v}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button className="w-full h-8 rounded-xl text-white text-xs font-bold hover:opacity-90 flex items-center justify-center gap-2 transition" style={{background:PRIMARY}}>
                <BookOpen className="h-3.5 w-3.5"/> View Course History
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Plus className="h-3.5 w-3.5"/> Enroll in Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCREEN 5 — ASSESSMENTS & QUIZZES
═══════════════════════════════════════════════ */
function ScreenAssessments() {
  const [selected, setSelected] = useState<number|null>(null);
  const ass = selected!==null ? ASSESSMENTS[selected] : null;

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Assessments & Quizzes</h1>
            <p className="text-xs text-gray-400 mt-0.5">Manage question banks, pass marks & results</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:ACCENT}}>
            <Plus className="h-4 w-4"/> Create Assessment
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[["Total Assessments",ASSESSMENTS.length,"#1e3a5f"],["Total Attempts",ASSESSMENTS.reduce((a,x)=>a+x.attempts,0).toLocaleString(),"#059669"],["Overall Pass Rate",`${Math.round((ASSESSMENTS.reduce((a,x)=>a+x.passed,0)/Math.max(ASSESSMENTS.reduce((a,x)=>a+x.attempts,0),1))*100)}%`,"#7c3aed"],["Avg Score",`${Math.round(ASSESSMENTS.filter(a=>a.avgScore>0).reduce((a,x)=>a+x.avgScore,0)/ASSESSMENTS.filter(a=>a.avgScore>0).length)}%`,"#f97316"]].map(([l,v,c])=>(
            <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 text-center">
              <div className="text-2xl font-black" style={{color:c as string}}>{v as string|number}</div>
              <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
            </div>
          ))}
        </div>

        <TableWrap heads={["ID","Assessment","Linked Course","Questions","Pass Mark","Attempts","Avg Score","Passed","Failed","Pass Rate","Status","Action"]}>
          {ASSESSMENTS.map((a,i)=>{
            const passRate=a.attempts>0?Math.round((a.passed/a.attempts)*100):0;
            return (
              <tr key={i} onClick={()=>setSelected(i)} className={`cursor-pointer transition ${selected===i?"bg-blue-50":"hover:bg-gray-50"}`}>
                <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{a.id}</td>
                <td className="px-5 py-3.5 font-bold text-gray-800 text-xs max-w-[150px] truncate">{a.title}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[150px] truncate">{a.course}</td>
                <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{a.questions}</td>
                <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{a.passmark}%</td>
                <td className="px-5 py-3.5 text-xs text-gray-600">{a.attempts.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{a.avgScore>0?`${a.avgScore}%`:"—"}</td>
                <td className="px-5 py-3.5 text-xs font-bold text-emerald-700">{a.passed.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-xs font-bold text-red-500">{a.failed}</td>
                <td className="px-5 py-3.5">
                  {a.attempts>0?(
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-12 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{width:`${passRate}%`,background:passRate>=80?"#059669":passRate>=60?"#f59e0b":"#dc2626"}}/>
                      </div>
                      <span className="text-[11px] font-black" style={{color:passRate>=80?"#059669":passRate>=60?"#f59e0b":"#dc2626"}}>{passRate}%</span>
                    </div>
                  ):<span className="text-xs text-gray-300">—</span>}
                </td>
                <td className="px-5 py-3.5"><Badge label={a.status} color={a.status==="Active"?"green":"gray"}/></td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1.5">
                    <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"><Eye className="h-3.5 w-3.5"/></button>
                    <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 hover:border-amber-300 transition"><Edit3 className="h-3.5 w-3.5"/></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </TableWrap>
      </div>

      {ass && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Assessment Details</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4"/></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="pb-4 border-b border-gray-100">
              <div className="font-black text-gray-900 text-sm">{ass.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{ass.course}</div>
              <div className="mt-2"><Badge label={ass.status} color={ass.status==="Active"?"green":"gray"}/></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Questions",ass.questions,"#1e3a5f"],["Pass Mark",`${ass.passmark}%`,"#059669"],["Attempts",ass.attempts,"#7c3aed"],["Avg Score",ass.avgScore>0?`${ass.avgScore}%`:"—","#f97316"]].map(([k,v,c])=>(
                <div key={k} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-lg font-black" style={{color:c as string}}>{String(v)}</div>
                  <div className="text-[10px] text-gray-400 font-semibold">{k}</div>
                </div>
              ))}
            </div>
            {ass.attempts>0&&(
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-gray-500">Pass / Fail Split</span>
                  <span className="font-black text-gray-700">{ass.passed} / {ass.failed}</span>
                </div>
                <div className="h-4 bg-red-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-400 rounded-l-full" style={{width:`${Math.round((ass.passed/ass.attempts)*100)}%`}}/>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-emerald-600 font-bold">✓ Passed {Math.round((ass.passed/ass.attempts)*100)}%</span>
                  <span className="text-red-500 font-bold">✗ Failed {Math.round((ass.failed/ass.attempts)*100)}%</span>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <button className="w-full h-8 rounded-xl text-white text-xs font-bold hover:opacity-90 flex items-center justify-center gap-2 transition" style={{background:PRIMARY}}>
                <Edit3 className="h-3.5 w-3.5"/> Edit Questions
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Download className="h-3.5 w-3.5"/> Export Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCREEN 6 — CERTIFICATIONS
═══════════════════════════════════════════════ */
function ScreenCertifications() {
  const [search, setSearch] = useState("");
  const filtered = CERTIFICATES.filter(c=>!search||c.learner.toLowerCase().includes(search.toLowerCase())||c.course.toLowerCase().includes(search.toLowerCase())||c.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Certifications</h1>
          <p className="text-xs text-gray-400 mt-0.5">LMS digital certificates — issued on course completion & assessment pass</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5"/> Bulk Export
          </button>
          <button className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{background:PRIMARY}}>
            <PenTool className="h-4 w-4"/> Template Designer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[["Issued",CERTIFICATES.filter(c=>c.status==="Issued").length,"#059669"],["Revoked",CERTIFICATES.filter(c=>c.status==="Revoked").length,"#dc2626"],["This Month",CERTIFICATES.filter(c=>c.status==="Issued"&&c.issued.includes("Jun 2027")).length,"#1e3a5f"],["Avg Score",`${Math.round(CERTIFICATES.filter(c=>c.status==="Issued").reduce((a,c)=>a+c.score,0)/CERTIFICATES.filter(c=>c.status==="Issued").length)}%`,"#f97316"]].map(([l,v,c])=>(
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 text-center">
            <div className="text-2xl font-black" style={{color:c as string}}>{v as string|number}</div>
            <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
          </div>
        ))}
      </div>

      {/* Certificate template preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-800">Certificate Template Preview</h2>
          <button className="h-7 px-3 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition flex items-center gap-1">
            <Edit3 className="h-3 w-3"/> Customize
          </button>
        </div>
        <div className="max-w-lg mx-auto rounded-2xl border-2 p-8 text-center" style={{borderColor:PRIMARY,background:`${PRIMARY}05`}}>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Government of Maharashtra</div>
          <div className="text-xs font-bold text-gray-500 mt-0.5">Directorate of Sports & Youth Services</div>
          <div className="h-px bg-gray-200 my-4"/>
          <div className="text-sm font-black text-gray-900">CERTIFICATE OF COMPLETION</div>
          <div className="text-xs text-gray-500 mt-2">This is to certify that</div>
          <div className="text-lg font-black mt-1" style={{color:PRIMARY}}>[ Learner Name ]</div>
          <div className="text-xs text-gray-500 mt-1">has successfully completed</div>
          <div className="text-sm font-black text-gray-800 mt-1">[ Course Title ]</div>
          <div className="text-xs text-gray-400 mt-0.5">with a score of <strong>[ Score ]%</strong></div>
          <div className="h-px bg-gray-200 my-4"/>
          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <span>Issued: [ Date ]</span>
            <span className="font-mono">LMS-CERT-[ ID ]</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by learner, course, or cert ID…"/>
        <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none ml-auto">
          <option>All Status</option><option>Issued</option><option>Revoked</option>
        </select>
      </div>

      <TableWrap heads={["Cert ID","Learner","Course","Score","Issued On","Status","Action"]}>
        {filtered.map((c,i)=>(
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{c.id}</td>
            <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{c.learner}</td>
            <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[200px] truncate">{c.course}</td>
            <td className="px-5 py-3.5">
              <span className="text-xs font-black" style={{color:c.score>=80?"#059669":c.score>=65?"#f59e0b":"#dc2626"}}>{c.score}%</span>
            </td>
            <td className="px-5 py-3.5 text-xs text-gray-400">{c.issued}</td>
            <td className="px-5 py-3.5"><Badge label={c.status} color={c.status==="Issued"?"green":"red"}/></td>
            <td className="px-5 py-3.5">
              <div className="flex gap-1.5">
                {c.status==="Issued"&&<button className="h-6 px-2 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1"><Download className="h-3 w-3"/>PDF</button>}
                {c.status==="Issued"&&<button className="h-6 px-2 rounded-lg border border-red-200 text-red-600 text-[10px] font-bold hover:bg-red-50 transition">Revoke</button>}
              </div>
            </td>
          </tr>
        ))}
      </TableWrap>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCREEN 7 — ANALYTICS & REPORTS
═══════════════════════════════════════════════ */
function ScreenAnalytics() {
  const REPORTS = [
    { name:"Course Completion Report",         desc:"Completion % per course by learner group",  icon:BookOpen,      color:PRIMARY,   period:"As on date"  },
    { name:"Learner Progress Report",          desc:"Individual learner progress across all courses",icon:Users,      color:"#059669", period:"As on date"  },
    { name:"Assessment Results Summary",       desc:"Pass rate, avg score, retake analysis",      icon:ClipboardList,color:"#7c3aed", period:"As on date"  },
    { name:"Certificate Issuance Register",    desc:"All certificates issued with scores",        icon:Award,        color:ACCENT,    period:"FY 2026-27"  },
    { name:"District-wise Learner Report",     desc:"Enrollment & completion per district",       icon:BarChart3,    color:"#0891b2", period:"As on date"  },
    { name:"Mandatory Course Compliance",      desc:"POSH & Anti-Doping completion status",       icon:Lock,         color:"#dc2626", period:"As on date"  },
    { name:"Language-wise Engagement",         desc:"Learner preference & completion per language",icon:Languages,   color:"#f59e0b", period:"As on date"  },
    { name:"Inactive Learner Report",          desc:"Learners with no activity >14 days",         icon:AlertTriangle,color:"#dc2626", period:"Last 30 days" },
    { name:"Content Gap Analysis",             desc:"Sports/topics with no course coverage",       icon:Target,       color:PRIMARY,   period:"As on date"  },
  ];

  const DIST = [
    { d:"Pune",       enrolled:412, completed:334 },
    { d:"Nashik",     enrolled:287, completed:198 },
    { d:"Nagpur",     enrolled:341, completed:241 },
    { d:"Kolhapur",   enrolled:198, completed:142 },
    { d:"Amravati",   enrolled:154, completed:88  },
    { d:"Aurangabad", enrolled:176, completed:121 },
    { d:"Solapur",    enrolled:132, completed:79  },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Analytics & Reports</h1>
          <p className="text-xs text-gray-400 mt-0.5">Platform-wide LMS insights and downloadable reports</p>
        </div>
        <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
          <Download className="h-3.5 w-3.5"/> Export All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-800 mb-4">District-wise Enrollment vs Completion</h2>
          <div className="space-y-4">
            {DIST.map((d,i)=>{
              const pct=Math.round((d.completed/d.enrolled)*100);
              return (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-700">{d.d}</span>
                    <div className="text-xs text-gray-500">
                      <span className="font-black text-gray-900">{d.enrolled}</span> enrolled ·{" "}
                      <span className="font-black text-emerald-700">{d.completed}</span> completed ·{" "}
                      <span className="font-black" style={{color:pct>=80?"#059669":pct>=60?"#f59e0b":"#dc2626"}}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden relative">
                    <div className="h-full rounded-full" style={{width:`${(d.enrolled/500)*100}%`,background:"#e5e7eb"}}/>
                    <div className="h-full rounded-full absolute top-0 left-0" style={{width:`${(d.completed/500)*100}%`,background:pct>=80?"#059669":pct>=60?"#1e3a5f":"#f59e0b"}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-bold text-gray-800 mb-4">Mandatory Compliance</h2>
          <div className="space-y-4">
            {COURSES.filter(c=>c.mandatory&&c.status==="Published").map((c,i)=>{
              const pct=c.enrolled>0?Math.round((c.completed/c.enrolled)*100):0;
              return (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{c.thumb}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-gray-800 truncate">{c.title}</div>
                      <div className="text-[10px] text-gray-400">{c.enrolled} enrolled</div>
                    </div>
                    <span className="text-xs font-black shrink-0" style={{color:pct>=90?"#059669":pct>=70?"#f59e0b":"#dc2626"}}>{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${pct}%`,background:pct>=90?"#059669":pct>=70?"#f59e0b":"#dc2626"}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {REPORTS.map((r,i)=>(
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{background:`${r.color}15`}}>
                <r.icon className="h-5 w-5" style={{color:r.color}}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 text-sm leading-tight">{r.name}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{r.desc}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{r.period}</span>
              <button className="h-7 px-3 rounded-lg text-white text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition" style={{background:r.color}}>
                <Download className="h-3 w-3"/> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCREEN 8 — SETTINGS & CONFIGURATION
═══════════════════════════════════════════════ */
function ScreenSettings() {
  const [notifs, setNotifs] = useState({ enrollment:true, completion:true, assessment:false, inactivity:true });
  const [banner, setBanner] = useState("New course added: 'First Aid & Sports Injury Management' — Enroll now!");

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Settings & Configuration</h1>
          <p className="text-xs text-gray-400 mt-0.5">Platform-wide LMS configuration and controls</p>
        </div>
        <button className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{background:PRIMARY}}>
          <CheckCircle className="h-4 w-4"/> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Announcement banner */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-3">Platform Announcement Banner</h2>
          <textarea value={banner} onChange={e=>setBanner(e.target.value)} rows={3}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none"/>
          <div className="mt-3 p-3 rounded-xl border border-blue-200 bg-blue-50 text-xs font-medium text-blue-800">
            📢 {banner}
          </div>
          <div className="flex gap-2 mt-3">
            <button className="h-8 px-3 rounded-xl text-white text-xs font-bold hover:opacity-90 flex items-center gap-1.5 transition" style={{background:PRIMARY}}>
              Publish Banner
            </button>
            <button className="h-8 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition">
              Clear
            </button>
          </div>
        </div>

        {/* Notification triggers */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-3">Notification Triggers</h2>
          <div className="space-y-3">
            {[
              ["enrollment","Send email on course enrollment","#1e3a5f"],
              ["completion","Send email on course completion","#059669"],
              ["assessment","Send email on assessment results","#7c3aed"],
              ["inactivity","Alert admin on 14-day inactivity","#f97316"],
            ].map(([key,label,color])=>(
              <div key={key} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg grid place-items-center" style={{background:`${color as string}15`}}>
                    <Bell className="h-4 w-4" style={{color:color as string}}/>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{label}</span>
                </div>
                <button onClick={()=>setNotifs(n=>({...n,[key as keyof typeof notifs]:!n[key as keyof typeof notifs]}))}
                  className="transition">
                  {notifs[key as keyof typeof notifs]
                    ?<ToggleRight className="h-6 w-6" style={{color:PRIMARY}}/>
                    :<ToggleLeft className="h-6 w-6 text-gray-300"/>}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Category management */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-800">Course Categories</h2>
            <button className="h-7 px-3 rounded-lg text-white text-[10px] font-bold hover:opacity-90 transition flex items-center gap-1" style={{background:ACCENT}}>
              <Plus className="h-3 w-3"/> Add
            </button>
          </div>
          <div className="space-y-2">
            {CATEGORIES.map((cat,i)=>(
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <span className="text-xs font-semibold text-gray-700">{cat}</span>
                <div className="flex gap-1.5">
                  <span className="text-[10px] font-bold text-gray-400">{COURSES.filter(c=>c.cat===cat).length} courses</span>
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 transition"><Edit3 className="h-3 w-3"/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access control */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-3">Role-based Access Control</h2>
          <div className="space-y-3">
            {[["Admin","Full access — create, edit, publish, manage all","green"],["Content Manager","Create & edit courses, upload content","blue"],["District Officer","View learner progress in their district only","indigo"],["Athlete","Enroll & complete assigned courses","gray"],["Coach","Enroll & complete courses + view athlete progress","purple"]].map(([role,desc,color])=>(
              <div key={role} className="flex items-start justify-between gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <div className="flex items-start gap-2.5">
                  <Badge label={role as string} color={color}/>
                  <span className="text-[11px] text-gray-500 leading-snug">{desc as string}</span>
                </div>
                <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 shrink-0 transition"><Edit3 className="h-3 w-3"/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LMS PORTAL SHELL
═══════════════════════════════════════════════ */
const LMS_NAV = [
  { id:"dashboard",     label:"Dashboard",              icon:LayoutDashboard, badge:0 },
  { id:"courses",       label:"Course Management",      icon:BookOpen,        badge:2 },
  { id:"content",       label:"Content Builder",        icon:PenTool,         badge:0 },
  { id:"learners",      label:"Learner Management",     icon:Users,           badge:0 },
  { id:"assessments",   label:"Assessments & Quizzes",  icon:ClipboardList,   badge:0 },
  { id:"certifications",label:"Certifications",         icon:Award,           badge:0 },
  { id:"analytics",     label:"Analytics & Reports",    icon:BarChart3,       badge:0 },
  { id:"settings",      label:"Settings & Config",      icon:Settings,        badge:0 },
];

export function LMSPortal({ onBack }: { onBack: () => void }) {
  const [nav, setNav]           = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  function renderScreen() {
    switch (nav) {
      case "dashboard":      return <ScreenDashboard setNav={setNav}/>;
      case "courses":        return <ScreenCourses/>;
      case "content":        return <ScreenContent/>;
      case "learners":       return <ScreenLearners/>;
      case "assessments":    return <ScreenAssessments/>;
      case "certifications": return <ScreenCertifications/>;
      case "analytics":      return <ScreenAnalytics/>;
      case "settings":       return <ScreenSettings/>;
      default:               return <ScreenDashboard setNav={setNav}/>;
    }
  }

  const activeLabel = LMS_NAV.find(n => n.id === nav)?.label || "Dashboard";

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f6fa" }}>
      <aside className={`${collapsed?"w-16":"w-[220px]"} shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen z-30 bg-white border-r border-gray-100 shadow-sm`}>
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-gray-100 min-h-[64px]">
          <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0 text-white" style={{background:PRIMARY}}>
            <GraduationCap className="h-5 w-5"/>
          </div>
          {!collapsed&&(
            <div className="min-w-0">
              <div className="font-black text-gray-900 text-sm leading-none">LMS Portal</div>
              <div className="text-[10px] text-gray-400 mt-0.5">e-Learning Platform</div>
            </div>
          )}
          <button onClick={()=>setCollapsed(c=>!c)} className="ml-auto text-gray-300 hover:text-gray-600 transition shrink-0">
            <ChevronRight className={`h-4 w-4 transition-transform ${collapsed?"":"rotate-180"}`}/>
          </button>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
          {LMS_NAV.map(item=>(
            <button key={item.id} onClick={()=>setNav(item.id)} title={collapsed?item.label:undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all ${nav===item.id?"text-white shadow-sm":"text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
              style={nav===item.id?{background:PRIMARY}:{}}>
              <item.icon className="h-4 w-4 shrink-0"/>
              {!collapsed&&<span className="flex-1 text-left text-xs truncate">{item.label}</span>}
              {!collapsed&&item.badge>0&&(
                <span className={`h-5 min-w-5 px-1 rounded-full text-[10px] font-black grid place-items-center ${nav===item.id?"bg-white/20 text-white":"bg-orange-100 text-orange-600"}`}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-100">
          <button onClick={onBack} title={collapsed?"Back to Admin":undefined}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-xs text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition">
            <LogOut className="h-4 w-4 shrink-0"/>
            {!collapsed&&<span>Back to Admin</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
          <img src={mhSeal} alt="MH Seal" className="h-8 w-auto object-contain shrink-0"/>
          <div className="h-5 w-px bg-gray-200"/>
          {nav!=="dashboard"&&(
            <button onClick={()=>setNav("dashboard")} className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition shrink-0">
              <ArrowLeft className="h-3.5 w-3.5"/> Back
            </button>
          )}
          <div className="text-sm text-gray-500">
            <span className="font-black text-gray-900 cursor-pointer hover:text-blue-600 transition" onClick={()=>setNav("dashboard")}>LMS Portal</span>
            <ChevronRight className="inline h-3.5 w-3.5 mx-1 text-gray-300"/>
            <span className="font-semibold">{activeLabel}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"/>
              {LEARNERS.filter(l=>l.lastActive==="Today").length} Learners Active
            </div>
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
              {["EN","HI","MR"].map(l=>(
                <button key={l} className={`px-2 py-1 rounded text-[11px] font-bold transition ${l==="EN"?"bg-white shadow-sm":"text-gray-400"}`}>{l}</button>
              ))}
            </div>
            <button className="relative h-8 w-8 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-blue-400 transition">
              <Bell className="h-4 w-4"/>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[8px] font-black grid place-items-center">4</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full grid place-items-center text-white text-xs font-black shrink-0" style={{background:PRIMARY}}>AP</div>
              <div>
                <div className="text-xs font-bold text-gray-800 leading-none">A. Pawar</div>
                <div className="text-[10px] font-bold" style={{color:ACCENT}}>ADMIN</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}

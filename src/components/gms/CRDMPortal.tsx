import { useState } from "react";
import {
  LayoutDashboard, Building2, Users, GraduationCap, MapPin,
  BarChart3, ChevronRight, Search, Plus, CheckCircle,
  XCircle, Clock, AlertTriangle, TrendingUp, TrendingDown,
  Eye, Edit3, Download, X, LogOut, ArrowLeft, Bell,
  Activity, Star, Shield, BookOpen, Filter, Layers,
  Award, FileText, RefreshCw, Hash, Phone, Mail,
  CalendarDays, BadgeCheck, Wrench, Flag, Globe,
  Target, Zap, Database, GitBranch, Navigation,
} from "lucide-react";
import mhSeal from "@/assets/mh-seal.png";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — exact HMS match
═══════════════════════════════════════════════════════ */
const PRIMARY = "#1e3a5f";
const ACCENT  = "#f97316";

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENT LIBRARY
═══════════════════════════════════════════════════════ */
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
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${map[color] || map.gray}`}>{label}</span>
  );
}

function KpiCard({ label, value, sub, icon: Icon, color, trend }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; trend?: "up" | "down" | "neutral";
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-start">
      <div className="h-12 w-12 rounded-xl grid place-items-center shrink-0" style={{ background: `${color}15` }}>
        <Icon className="h-6 w-6" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</div>
        <div className="text-2xl font-black text-gray-900 mt-0.5">{value}</div>
        {sub && (
          <div className={`text-xs mt-1 flex items-center gap-1 font-medium ${trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-gray-400"}`}>
            {trend === "up" && <TrendingUp className="h-3 w-3" />}
            {trend === "down" && <TrendingDown className="h-3 w-3" />}
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ title, action, actionLabel, actionColor }: { title: string; action?: () => void; actionLabel?: string; actionColor?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-bold text-gray-800">{title}</h2>
      {action && actionLabel && (
        <button onClick={action} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition" style={{ background: actionColor || PRIMARY }}>
          <Plus className="h-3.5 w-3.5" />{actionLabel}
        </button>
      )}
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
              {heads.map(h => <th key={h} className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Search…"}
        className="h-9 pl-9 pr-9 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition w-64" />
      {value && <button onClick={() => onChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="h-3.5 w-3.5" /></button>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MASTER DATA
═══════════════════════════════════════════════════════ */
const ASSOCIATIONS = [
  { id:"MSA-001", name:"Maharashtra Athletics Association",   sport:"Athletics",   type:"Olympic",     president:"Rajesh Patil",     regNo:"MSA/ATH/2003/001", affiliated:"AAI",  status:"Active",      lastAudit:"Mar 2027", members:284, grantEligible:true  },
  { id:"MSA-002", name:"Maharashtra Swimming Association",    sport:"Swimming",    type:"Olympic",     president:"Sunita Mehta",     regNo:"MSA/SWM/2005/002", affiliated:"SAI",  status:"Active",      lastAudit:"Jan 2027", members:196, grantEligible:true  },
  { id:"MSA-003", name:"Maharashtra Wrestling Federation",    sport:"Wrestling",   type:"Olympic",     president:"Anil Bhosale",     regNo:"MSA/WRE/2001/003", affiliated:"WFI",  status:"Active",      lastAudit:"Feb 2027", members:341, grantEligible:true  },
  { id:"MSA-004", name:"Maharashtra Badminton Association",   sport:"Badminton",   type:"Olympic",     president:"Prerna Joshi",     regNo:"MSA/BAD/2007/004", affiliated:"BAI",  status:"Active",      lastAudit:"Apr 2027", members:412, grantEligible:true  },
  { id:"MSA-005", name:"Maharashtra Kabaddi Federation",      sport:"Kabaddi",     type:"Non-Olympic", president:"Ganesh Shinde",    regNo:"MSA/KAB/2010/005", affiliated:"AKFI", status:"Active",      lastAudit:"Dec 2026", members:578, grantEligible:true  },
  { id:"MSA-006", name:"Maharashtra Chess Association",       sport:"Chess",       type:"Non-Olympic", president:"Varsha Kulkarni",  regNo:"MSA/CHE/2008/006", affiliated:"AICF", status:"Provisional", lastAudit:"Oct 2026", members:127, grantEligible:false },
  { id:"MSA-007", name:"Maharashtra Boxing Association",      sport:"Boxing",      type:"Olympic",     president:"Mohan Deshmukh",   regNo:"MSA/BOX/2004/007", affiliated:"BFI",  status:"Active",      lastAudit:"Feb 2027", members:203, grantEligible:true  },
  { id:"MSA-008", name:"Maharashtra Football Association",    sport:"Football",    type:"Olympic",     president:"Ibrahim Shaikh",   regNo:"MSA/FOO/2000/008", affiliated:"AIFF", status:"Under Review",lastAudit:"Aug 2026", members:892, grantEligible:false },
];

const ATHLETES = [
  { id:"ATH-2027-0001", name:"Arjun Deshmukh",  sport:"Athletics",   district:"Pune",       dob:"12 Mar 2008", level:"National",      coach:"Ramesh Kumar",    status:"Active",      aadhaar:"XXXX XXXX 4521", achievements:"State Gold 2026, National Silver 2027" },
  { id:"ATH-2027-0002", name:"Priya Jadhav",    sport:"Swimming",    district:"Nashik",     dob:"05 Jul 2010", level:"State",         coach:"Sanjay Patil",    status:"Active",      aadhaar:"XXXX XXXX 8734", achievements:"State Silver 2026" },
  { id:"ATH-2027-0003", name:"Ravi Bhosale",    sport:"Wrestling",   district:"Kolhapur",   dob:"22 Jan 2005", level:"International", coach:"Anil Wagh",       status:"Active",      aadhaar:"XXXX XXXX 3312", achievements:"National Gold 2026, Asian Trial Qualifier 2027" },
  { id:"ATH-2027-0004", name:"Sneha Kulkarni",  sport:"Badminton",   district:"Nashik",     dob:"18 Sep 2011", level:"Sub-Junior",    coach:"Meena Raut",      status:"Active",      aadhaar:"XXXX XXXX 6654", achievements:"District Champion 2026" },
  { id:"ATH-2027-0005", name:"Omkar Shinde",    sport:"Boxing",      district:"Nagpur",     dob:"30 Apr 2006", level:"Junior",        coach:"Vijay Kale",      status:"Suspended",   aadhaar:"XXXX XXXX 9901", achievements:"State Bronze 2025" },
  { id:"ATH-2027-0006", name:"Kavita Patil",    sport:"Athletics",   district:"Pune",       dob:"14 Nov 2009", level:"State",         coach:"Ramesh Kumar",    status:"Active",      aadhaar:"XXXX XXXX 2278", achievements:"State Gold 2027" },
  { id:"ATH-2027-0007", name:"Rahul Khedkar",   sport:"Wrestling",   district:"Amravati",   dob:"07 Jun 2003", level:"International", coach:"Anil Wagh",       status:"Active",      aadhaar:"XXXX XXXX 5567", achievements:"Shiv Chhatrapati Awardee 2027, Nat Champion 2026" },
  { id:"ATH-2027-0008", name:"Sonal More",      sport:"Badminton",   district:"Aurangabad", dob:"02 Feb 2012", level:"Sub-Junior",    coach:"Meena Raut",      status:"Active",      aadhaar:"XXXX XXXX 1134", achievements:"District Runner-up 2026" },
  { id:"ATH-2027-0009", name:"Pratik Sawant",   sport:"Kabaddi",     district:"Kolhapur",   dob:"09 Aug 2004", level:"National",      coach:"Ganesh More",     status:"Active",      aadhaar:"XXXX XXXX 7890", achievements:"National Championship Finalist 2026" },
  { id:"ATH-2027-0010", name:"Dipali Naik",     sport:"Swimming",    district:"Pune",       dob:"25 Dec 2007", level:"Junior",        coach:"Sanjay Patil",    status:"Active",      aadhaar:"XXXX XXXX 4456", achievements:"State Silver 2027" },
];

const ACADEMIES = [
  { id:"ACE-001", name:"Shiv Chhatrapati Sports Complex – Balewadi",  sport:"Multi-Sport", district:"Pune",       type:"State",   capacity:500, coaches:18, status:"Operational", condition:"Excellent", lat:18.5593, lng:73.7800, facilities:["Athletics Track","Swimming Pool","Wrestling Hall","Gymnasium","Badminton Courts","Football Ground"] },
  { id:"ACE-002", name:"Nashik District Sports Academy",               sport:"Athletics",   district:"Nashik",     type:"District",capacity:120, coaches:6,  status:"Operational", condition:"Good",      lat:20.0000, lng:73.7898, facilities:["Athletics Track","Gymnasium","Dormitory"] },
  { id:"ACE-003", name:"Kolhapur Wrestling Academy",                   sport:"Wrestling",   district:"Kolhapur",   type:"District",capacity:80,  coaches:4,  status:"Operational", condition:"Good",      lat:16.7050, lng:74.2433, facilities:["Wrestling Hall","Gymnasium","Dormitory"] },
  { id:"ACE-004", name:"Nagpur Sports Training Centre",                sport:"Multi-Sport", district:"Nagpur",     type:"State",   capacity:200, coaches:10, status:"Operational", condition:"Fair",      lat:21.1458, lng:79.0882, facilities:["Athletics Track","Gymnasium","Football Ground"] },
  { id:"ACE-005", name:"Aurangabad Badminton Academy",                 sport:"Badminton",   district:"Aurangabad", type:"Private", capacity:60,  coaches:3,  status:"Operational", condition:"Good",      lat:19.8762, lng:75.3433, facilities:["Badminton Courts","Gymnasium"] },
  { id:"ACE-006", name:"Amravati Sub-Junior Sports Centre",            sport:"Multi-Sport", district:"Amravati",   type:"District",capacity:90,  coaches:5,  status:"Under Repair",condition:"Fair",      lat:20.9374, lng:77.7796, facilities:["Athletics Track","Dormitory"] },
  { id:"ACE-007", name:"Solapur Boxing Training Centre",               sport:"Boxing",      district:"Solapur",    type:"District",capacity:50,  coaches:3,  status:"Operational", condition:"Good",      lat:17.6805, lng:75.9064, facilities:["Boxing Ring","Gymnasium"] },
];

const COACHES = [
  { id:"COA-001", name:"Ramesh Kumar",   sport:"Athletics",   cert:"NIS Diploma",       centre:"Shiv Chhatrapati Complex",     athletes:12, expYrs:15, renewal:"Dec 2028", rating:4.8, status:"Active",  district:"Pune"      },
  { id:"COA-002", name:"Sanjay Patil",   sport:"Swimming",    cert:"SAI Level 3",       centre:"Shiv Chhatrapati Complex",     athletes:8,  expYrs:10, renewal:"Mar 2028", rating:4.5, status:"Active",  district:"Pune"      },
  { id:"COA-003", name:"Anil Wagh",      sport:"Wrestling",   cert:"NIS Diploma",       centre:"Kolhapur Wrestling Academy",   athletes:10, expYrs:18, renewal:"Jun 2027", rating:4.9, status:"Active",  district:"Kolhapur"  },
  { id:"COA-004", name:"Meena Raut",     sport:"Badminton",   cert:"SAI Level 2",       centre:"Aurangabad Badminton Academy", athletes:7,  expYrs:8,  renewal:"Aug 2027", rating:4.3, status:"Active",  district:"Aurangabad"},
  { id:"COA-005", name:"Vijay Kale",     sport:"Boxing",      cert:"State Certified",   centre:"Solapur Boxing Centre",        athletes:9,  expYrs:12, renewal:"Jan 2028", rating:4.1, status:"Active",  district:"Solapur"   },
  { id:"COA-006", name:"Ganesh More",    sport:"Kabaddi",     cert:"SAI Level 1",       centre:"Nagpur Sports Centre",         athletes:14, expYrs:7,  renewal:"May 2027", rating:3.9, status:"Renewal Due", district:"Nagpur" },
  { id:"COA-007", name:"Sunita Bhagat",  sport:"Athletics",   cert:"International",     centre:"Nashik District Academy",      athletes:6,  expYrs:20, renewal:"Oct 2029", rating:5.0, status:"Active",  district:"Nashik"    },
  { id:"COA-008", name:"Pradeep Naik",   sport:"Football",    cert:"SAI Level 2",       centre:"Nagpur Sports Centre",         athletes:15, expYrs:9,  renewal:"Apr 2027", rating:4.0, status:"Renewal Due", district:"Nagpur" },
];

const INFRASTRUCTURE = [
  { id:"INF-001", name:"Balewadi Stadium – Main Arena",      type:"Stadium",        district:"Pune",       sport:"Multi-Sport", ownership:"State",     capacity:15000, condition:"Excellent", lastMaint:"Feb 2027", nextMaint:"Aug 2027", lat:18.5593, lng:73.7800 },
  { id:"INF-002", name:"Nashik District Athletics Track",    type:"Athletics Track",district:"Nashik",     sport:"Athletics",   ownership:"Municipal", capacity:500,   condition:"Good",      lastMaint:"Jan 2027", nextMaint:"Jul 2027", lat:20.0100, lng:73.7900 },
  { id:"INF-003", name:"Kolhapur Wrestling Hall",            type:"Indoor Hall",    district:"Kolhapur",   sport:"Wrestling",   ownership:"State",     capacity:300,   condition:"Good",      lastMaint:"Mar 2027", nextMaint:"Sep 2027", lat:16.7000, lng:74.2400 },
  { id:"INF-004", name:"Nagpur Football Ground",             type:"Football Ground",district:"Nagpur",     sport:"Football",    ownership:"Municipal", capacity:8000,  condition:"Fair",      lastMaint:"Nov 2026", nextMaint:"May 2027", lat:21.1500, lng:79.0900 },
  { id:"INF-005", name:"Aurangabad Indoor Badminton Hall",   type:"Indoor Hall",    district:"Aurangabad", sport:"Badminton",   ownership:"Private",   capacity:200,   condition:"Good",      lastMaint:"Apr 2027", nextMaint:"Oct 2027", lat:19.8800, lng:75.3500 },
  { id:"INF-006", name:"Amravati Swimming Pool",             type:"Swimming Pool",  district:"Amravati",   sport:"Swimming",    ownership:"Municipal", capacity:150,   condition:"Needs Repair",lastMaint:"Sep 2026", nextMaint:"Overdue",  lat:20.9400, lng:77.7800 },
  { id:"INF-007", name:"Solapur Boxing Ring – District Hall",type:"Indoor Hall",    district:"Solapur",    sport:"Boxing",      ownership:"State",     capacity:200,   condition:"Good",      lastMaint:"Feb 2027", nextMaint:"Aug 2027", lat:17.6800, lng:75.9100 },
  { id:"INF-008", name:"Pune SAI Gymnasium",                 type:"Gymnasium",      district:"Pune",       sport:"Multi-Sport", ownership:"SAI",       capacity:80,    condition:"Excellent", lastMaint:"May 2027", nextMaint:"Nov 2027", lat:18.5200, lng:73.8600 },
];

const GRANTS = [
  { id:"GRT-001", scheme:"Annual Maintenance Grant",        assoc:"Maharashtra Athletics Association", amount:800000,  sanctioned:"01 Apr 2027", status:"Released",  utilized:620000  },
  { id:"GRT-002", scheme:"Infrastructure Development Grant",assoc:"Maharashtra Wrestling Federation",  amount:2500000, sanctioned:"15 Jan 2027", status:"Released",  utilized:1800000 },
  { id:"GRT-003", scheme:"Talent Identification Fund",      assoc:"Maharashtra Badminton Association", amount:500000,  sanctioned:"01 Apr 2027", status:"Processing",utilized:0       },
  { id:"GRT-004", scheme:"Annual Maintenance Grant",        assoc:"Maharashtra Swimming Association",  amount:600000,  sanctioned:"01 Apr 2027", status:"Released",  utilized:450000  },
  { id:"GRT-005", scheme:"National Games Preparation Grant",assoc:"Maharashtra Boxing Association",    amount:1200000, sanctioned:"10 Mar 2027", status:"Released",  utilized:950000  },
  { id:"GRT-006", scheme:"Annual Maintenance Grant",        assoc:"Maharashtra Kabaddi Federation",    amount:400000,  sanctioned:"01 Apr 2027", status:"On Hold",   utilized:0       },
  { id:"GRT-007", scheme:"State Policy – Elite Athlete Support",assoc:"Maharashtra Wrestling Federation",amount:750000,sanctioned:"20 Feb 2027", status:"Released",  utilized:750000  },
];

/* ═══════════════════════════════════════════════════════
   SCREEN 1 — DASHBOARD
═══════════════════════════════════════════════════════ */
function ScreenDashboard({ setNav }: { setNav: (n: string) => void }) {
  const ALERTS = [
    { msg:"Coach Ganesh More & Pradeep Naik certification renewal overdue — action needed",   type:"danger"  },
    { msg:"INF-006 Amravati Swimming Pool maintenance overdue — inspection required",          type:"danger"  },
    { msg:"MSA-008 Maharashtra Football Association annual return pending since Aug 2026",     type:"warning" },
    { msg:"MSA-006 Maharashtra Chess Association provisional status — upgrade review due",     type:"warning" },
    { msg:"3 new athlete registrations pending District Officer verification",                 type:"info"    },
  ];

  const SPORT_DIST = [
    { sport:"Kabaddi",   athletes:578, color:"#f97316" },
    { sport:"Football",  athletes:892, color:"#1e3a5f" },
    { sport:"Badminton", athletes:412, color:"#7c3aed" },
    { sport:"Wrestling", athletes:341, color:"#059669" },
    { sport:"Athletics", athletes:284, color:"#0891b2" },
    { sport:"Boxing",    athletes:203, color:"#dc2626" },
    { sport:"Swimming",  athletes:196, color:"#f59e0b" },
  ];
  const maxAthletes = Math.max(...SPORT_DIST.map(s => s.athletes));

  const RECENT_REG = [
    { entity:"Arjun Deshmukh",                       type:"Athlete",     district:"Pune",     date:"Today 09:22", status:"Pending"  },
    { entity:"Latur District Boxing Academy",         type:"Academy",     district:"Latur",    date:"Today 08:15", status:"Pending"  },
    { entity:"Sonal More",                            type:"Athlete",     district:"Aurangabad",date:"Yesterday", status:"Verified" },
    { entity:"Amol Pawar (Coach)",                    type:"Coach",       district:"Nashik",   date:"Yesterday",   status:"Verified" },
    { entity:"Maharashtra Archery Association",       type:"Association", district:"Pune",     date:"2 days ago",  status:"Approved" },
  ];

  const entypeColor: Record<string,string> = { Athlete:"blue", Academy:"purple", Coach:"green", Association:"navy" };

  return (
    <div className="p-6 space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Registered Associations" value={ASSOCIATIONS.length}        sub="Across all sports"         icon={Flag}          color={PRIMARY}   trend="neutral" />
        <KpiCard label="Total Athletes"           value="3,247"                      sub="+128 this quarter"         icon={Users}         color="#059669"   trend="up"      />
        <KpiCard label="Academies & Centres"      value={ACADEMIES.length}           sub="State + District + Private"icon={Building2}     color="#7c3aed"   trend="neutral" />
        <KpiCard label="Coaches & Officials"      value={COACHES.length}             sub={`${COACHES.filter(c=>c.status==="Renewal Due").length} renewals due`} icon={GraduationCap} color={ACCENT} trend="neutral" />
      </div>

      {/* Secondary stat strip */}
      <div className="grid grid-cols-4 gap-4">
        {[
          ["Infrastructure Assets", INFRASTRUCTURE.length,                                                    "#1e3a5f", MapPin      ],
          ["Grants Released",       `₹${(GRANTS.filter(g=>g.status==="Released").reduce((a,g)=>a+g.amount,0)/10000000).toFixed(1)}Cr`, "#059669", Award ],
          ["Pending Verifications", "3",                                                                       "#f59e0b", Clock       ],
          ["Infra Maintenance Due", INFRASTRUCTURE.filter(i=>i.nextMaint==="Overdue").length,                 "#dc2626", AlertTriangle],
        ].map(([l,v,c,Ic])=>{ const Icon = Ic as React.ElementType; return (
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black" style={{color:c as string}}>{v as string|number}</div>
              <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
            </div>
            <div className="h-10 w-10 rounded-xl grid place-items-center" style={{background:`${c as string}15`}}>
              <Icon className="h-5 w-5" style={{color:c as string}} />
            </div>
          </div>
        );})}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Sport-wise athlete chart */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="Sport-wise Athlete Distribution" />
          <div className="space-y-3">
            {SPORT_DIST.sort((a,b)=>b.athletes-a.athletes).map((s,i)=>(
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-700">{s.sport}</span>
                  <span className="text-xs font-black text-gray-900">{s.athletes.toLocaleString("en-IN")} athletes</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{width:`${(s.athletes/maxAthletes)*100}%`,background:s.color}} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="System Alerts" />
          <div className="space-y-3">
            {ALERTS.map((a,i)=>(
              <div key={i} className={`flex gap-2 p-3 rounded-xl text-xs ${a.type==="danger"?"bg-red-50 border border-red-100":a.type==="warning"?"bg-amber-50 border border-amber-100":"bg-blue-50 border border-blue-100"}`}>
                <AlertTriangle className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${a.type==="danger"?"text-red-500":a.type==="warning"?"text-amber-500":"text-blue-500"}`} />
                <span className={`font-medium leading-snug ${a.type==="danger"?"text-red-700":a.type==="warning"?"text-amber-700":"text-blue-700"}`}>{a.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District-wise infrastructure map placeholder + recent registrations */}
      <div className="grid grid-cols-3 gap-5">
        {/* Geo summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="District Coverage" />
          <div className="space-y-2">
            {["Pune","Nashik","Nagpur","Kolhapur","Amravati","Aurangabad","Solapur","Latur"].map((d,i)=>{
              const aths = ATHLETES.filter(a=>a.district===d).length;
              const aces = ACADEMIES.filter(a=>a.district===d).length;
              return (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer" onClick={()=>setNav("infrastructure")}>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-700">{d}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">{aths} athletes</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200">{aces} centres</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent registrations */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-800">Recent Registrations</h2>
            <button onClick={()=>setNav("athletes")} className="text-xs font-bold hover:underline" style={{color:PRIMARY}}>View All →</button>
          </div>
          <div className="space-y-2">
            {RECENT_REG.map((r,i)=>(
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition">
                <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0 text-white text-xs font-black"
                  style={{background:r.type==="Athlete"?"#1e3a5f":r.type==="Academy"?"#7c3aed":r.type==="Coach"?"#059669":"#f97316"}}>
                  {r.type[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800 text-xs truncate">{r.entity}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{r.district} · {r.date}</div>
                </div>
                <Badge label={r.type} color={entypeColor[r.type]} />
                <Badge label={r.status} color={r.status==="Approved"?"green":r.status==="Verified"?"blue":"amber"} />
                <div className="flex gap-1.5">
                  {r.status==="Pending"&&<button className="h-6 px-2 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 hover:bg-emerald-100 transition">Verify</button>}
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"><Eye className="h-3.5 w-3.5"/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 2 — SPORTS ASSOCIATIONS
═══════════════════════════════════════════════════════ */
function ScreenAssociations() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState<number|null>(null);

  const filtered = ASSOCIATIONS.filter(a=>{
    const q = search.toLowerCase();
    return (typeFilter==="All"||a.type===typeFilter)&&(!q||a.name.toLowerCase().includes(q)||a.id.toLowerCase().includes(q));
  });
  const assoc = selected!==null ? ASSOCIATIONS[selected] : null;
  const statusColor: Record<string,string> = { Active:"green", Provisional:"amber", "Under Review":"blue" };

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Sports Associations</h1>
            <p className="text-xs text-gray-400 mt-0.5">{ASSOCIATIONS.filter(a=>a.status==="Active").length} active · {ASSOCIATIONS.length} total registered associations</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:ACCENT}}>
            <Plus className="h-4 w-4" /> Register Association
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID…" />
          <div className="flex gap-1">
            {["All","Olympic","Non-Olympic"].map(t=>(
              <button key={t} onClick={()=>setTypeFilter(t)}
                className={`h-7 px-3 rounded-lg text-[11px] font-bold transition ${typeFilter===t?"text-white":"border border-gray-200 text-gray-500 hover:border-blue-300"}`}
                style={typeFilter===t?{background:PRIMARY}:{}}>
                {t}
              </button>
            ))}
          </div>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none ml-auto">
            <option>All Status</option><option>Active</option><option>Provisional</option><option>Under Review</option>
          </select>
          <button className="h-9 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>

        <TableWrap heads={["ID","Association","Sport","Type","President","Reg No.","Affiliation","Members","Last Audit","Status","Action"]}>
          {filtered.map((a,i)=>(
            <tr key={i} onClick={()=>setSelected(ASSOCIATIONS.indexOf(a))} className={`cursor-pointer transition ${selected===ASSOCIATIONS.indexOf(a)?"bg-blue-50":"hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{a.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs max-w-[180px] truncate">{a.name}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{a.sport}</td>
              <td className="px-5 py-3.5"><Badge label={a.type} color={a.type==="Olympic"?"navy":"purple"}/></td>
              <td className="px-5 py-3.5 text-xs text-gray-700 font-semibold">{a.president}</td>
              <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{a.regNo}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{a.affiliated}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{a.members}</td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{a.lastAudit}</td>
              <td className="px-5 py-3.5"><Badge label={a.status} color={statusColor[a.status]}/></td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1.5">
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"><Eye className="h-3.5 w-3.5"/></button>
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 hover:border-amber-300 transition"><Edit3 className="h-3.5 w-3.5"/></button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {assoc && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Association Profile</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4"/></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex flex-col items-center gap-2 pb-4 border-b border-gray-100">
              <div className="h-16 w-16 rounded-2xl grid place-items-center text-white font-black text-2xl" style={{background:PRIMARY}}>
                {assoc.sport[0]}
              </div>
              <div className="text-center">
                <div className="font-black text-gray-900 text-sm leading-tight">{assoc.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{assoc.sport} · {assoc.type}</div>
                <div className="mt-2 flex gap-2 justify-center">
                  <Badge label={assoc.status} color={statusColor[assoc.status]}/>
                  <Badge label={assoc.grantEligible?"Grant Eligible":"Ineligible"} color={assoc.grantEligible?"green":"red"}/>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Reg No.",assoc.regNo],["President",assoc.president],["National Affiliation",assoc.affiliated],["Member Athletes",assoc.members],["Last Audit",assoc.lastAudit]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700 text-right max-w-[55%]">{String(v)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button className="w-full h-8 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center justify-center gap-2" style={{background:PRIMARY}}>
                <Award className="h-3.5 w-3.5"/> View Grants
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Edit3 className="h-3.5 w-3.5"/> Edit Profile
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Download className="h-3.5 w-3.5"/> Download Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 3 — ATHLETE REGISTRY
═══════════════════════════════════════════════════════ */
function ScreenAthletes() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [selected, setSelected] = useState<number|null>(null);

  const LEVELS = ["All","Sub-Junior","Junior","State","National","International"];
  const filtered = ATHLETES.filter(a=>{
    const q = search.toLowerCase();
    return (levelFilter==="All"||a.level===levelFilter)&&(!q||a.name.toLowerCase().includes(q)||a.id.toLowerCase().includes(q)||a.sport.toLowerCase().includes(q));
  });
  const athlete = selected!==null ? ATHLETES[selected] : null;
  const levelColor: Record<string,string> = { "Sub-Junior":"gray","Junior":"blue","State":"indigo","National":"purple","International":"amber" };
  const statusColor: Record<string,string> = { Active:"green", Suspended:"red", Inactive:"gray" };

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Athlete Registry</h1>
            <p className="text-xs text-gray-400 mt-0.5">Master list of all registered athletes — Maharashtra</p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5"/> Bulk Import
            </button>
            <button className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{background:PRIMARY}}>
              <Plus className="h-4 w-4"/> Register Athlete
            </button>
          </div>
        </div>

        {/* Level filter strip */}
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name, ID, or sport…" />
          <div className="flex gap-1 flex-wrap">
            {LEVELS.map(l=>(
              <button key={l} onClick={()=>setLevelFilter(l)}
                className={`h-7 px-3 rounded-lg text-[11px] font-bold transition ${levelFilter===l?"text-white":"border border-gray-200 text-gray-500 hover:border-blue-300"}`}
                style={levelFilter===l?{background:PRIMARY}:{}}>
                {l}
              </button>
            ))}
          </div>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none ml-auto">
            <option>All Districts</option>{["Pune","Nashik","Nagpur","Kolhapur","Amravati","Aurangabad"].map(d=><option key={d}>{d}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Sports</option>{["Athletics","Swimming","Wrestling","Badminton","Boxing","Kabaddi","Football"].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>

        <TableWrap heads={["Ath ID","Athlete","Sport","District","DOB","Level","Coach","Achievements","Status","Action"]}>
          {filtered.map((a,i)=>(
            <tr key={i} onClick={()=>setSelected(ATHLETES.indexOf(a))} className={`cursor-pointer transition ${selected===ATHLETES.indexOf(a)?"bg-blue-50":"hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{a.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{a.name}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{a.sport}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{a.district}</td>
              <td className="px-5 py-3.5 text-xs text-gray-400">{a.dob}</td>
              <td className="px-5 py-3.5"><Badge label={a.level} color={levelColor[a.level]}/></td>
              <td className="px-5 py-3.5 text-xs text-gray-600">{a.coach}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[160px] truncate">{a.achievements}</td>
              <td className="px-5 py-3.5"><Badge label={a.status} color={statusColor[a.status]}/></td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1.5">
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"><Eye className="h-3.5 w-3.5"/></button>
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-amber-500 hover:border-amber-300 transition"><Edit3 className="h-3.5 w-3.5"/></button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {athlete && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Athlete Profile</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4"/></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex flex-col items-center gap-2 pb-4 border-b border-gray-100">
              <div className="h-16 w-16 rounded-2xl grid place-items-center text-white font-black text-2xl" style={{background:PRIMARY}}>
                {athlete.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div className="text-center">
                <div className="font-black text-gray-900">{athlete.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{athlete.sport} · {athlete.district}</div>
                <div className="mt-2 flex gap-2 justify-center">
                  <Badge label={athlete.level} color={levelColor[athlete.level]}/>
                  <Badge label={athlete.status} color={statusColor[athlete.status]}/>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Athlete ID",athlete.id],["Date of Birth",athlete.dob],["Aadhaar",athlete.aadhaar],["Coach",athlete.coach],["Achievements",athlete.achievements]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50 gap-2">
                  <span className="text-gray-400 font-medium shrink-0">{k}</span>
                  <span className="font-bold text-gray-700 text-right text-[11px]">{v}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button className="w-full h-8 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center justify-center gap-2" style={{background:PRIMARY}}>
                <FileText className="h-3.5 w-3.5"/> View Full Profile
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Edit3 className="h-3.5 w-3.5"/> Edit Record
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Download className="h-3.5 w-3.5"/> Athlete ID Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 4 — ACADEMIES & TRAINING CENTRES
═══════════════════════════════════════════════════════ */
function ScreenAcademies() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState<number|null>(null);

  const filtered = ACADEMIES.filter(a=>{
    const q = search.toLowerCase();
    return (typeFilter==="All"||a.type===typeFilter)&&(!q||a.name.toLowerCase().includes(q)||a.id.toLowerCase().includes(q));
  });
  const academy = selected!==null ? ACADEMIES[selected] : null;
  const condColor: Record<string,string> = { Excellent:"green", Good:"blue", Fair:"amber", "Needs Repair":"red" };
  const statusColor: Record<string,string> = { Operational:"green", "Under Repair":"amber", Closed:"red" };
  const typeColor: Record<string,string> = { State:"navy", District:"blue", Private:"purple" };

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Academies & Training Centres</h1>
            <p className="text-xs text-gray-400 mt-0.5">Geo-tagged registry of all sports academies in Maharashtra</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:PRIMARY}}>
            <Plus className="h-4 w-4"/> Register Academy
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID…" />
          <div className="flex gap-1">
            {["All","State","District","Private"].map(t=>(
              <button key={t} onClick={()=>setTypeFilter(t)}
                className={`h-7 px-3 rounded-lg text-[11px] font-bold transition ${typeFilter===t?"text-white":"border border-gray-200 text-gray-500 hover:border-blue-300"}`}
                style={typeFilter===t?{background:PRIMARY}:{}}>
                {t}
              </button>
            ))}
          </div>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none ml-auto">
            <option>All Districts</option>{["Pune","Nashik","Nagpur","Kolhapur","Amravati","Aurangabad","Solapur"].map(d=><option key={d}>{d}</option>)}
          </select>
          <button className="h-9 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
            <Navigation className="h-3.5 w-3.5"/> Map View
          </button>
        </div>

        {/* Academy cards */}
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((ac,i)=>(
            <div key={i} onClick={()=>setSelected(ACADEMIES.indexOf(ac))}
              className={`bg-white rounded-2xl border shadow-sm p-5 cursor-pointer transition hover:shadow-md ${selected===ACADEMIES.indexOf(ac)?"border-[#1e3a5f] ring-2 ring-[#1e3a5f]/10":"border-gray-100"}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge label={ac.type} color={typeColor[ac.type]}/>
                    <span className="font-mono text-[10px] text-gray-400">{ac.id}</span>
                  </div>
                  <div className="font-bold text-gray-900 text-sm leading-tight">{ac.name}</div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                    <MapPin className="h-3 w-3"/> {ac.district} · {ac.sport}
                  </div>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <Badge label={ac.status} color={statusColor[ac.status]}/>
                  <Badge label={ac.condition} color={condColor[ac.condition]}/>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[["Capacity",ac.capacity,"#1e3a5f"],["Coaches",ac.coaches,"#059669"],["Facilities",ac.facilities.length,"#7c3aed"]].map(([l,v,c])=>(
                  <div key={l as string} className="bg-gray-50 rounded-xl py-2 text-center">
                    <div className="text-sm font-black" style={{color:c as string}}>{v as number}</div>
                    <div className="text-[9px] text-gray-400 font-semibold uppercase">{l as string}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {ac.facilities.slice(0,4).map((f,j)=>(
                  <span key={j} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{f}</span>
                ))}
                {ac.facilities.length>4&&<span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">+{ac.facilities.length-4} more</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {academy && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Academy Details</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4"/></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex flex-col gap-2 pb-4 border-b border-gray-100">
              <div className="h-12 w-12 rounded-xl grid place-items-center" style={{background:`${PRIMARY}15`}}>
                <Building2 className="h-6 w-6" style={{color:PRIMARY}}/>
              </div>
              <div className="font-black text-gray-900 text-sm">{academy.name}</div>
              <div className="flex gap-2">
                <Badge label={academy.type} color={typeColor[academy.type]}/>
                <Badge label={academy.status} color={statusColor[academy.status]}/>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Academy ID",academy.id],["District",academy.district],["Sport Focus",academy.sport],["Capacity",`${academy.capacity} athletes`],["Coaches",academy.coaches],["Condition",academy.condition],["Geo",`${academy.lat.toFixed(4)}, ${academy.lng.toFixed(4)}`]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700 text-right max-w-[55%]">{String(v)}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Facilities</div>
              <div className="flex flex-wrap gap-1.5">
                {academy.facilities.map((f,i)=><span key={i} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{f}</span>)}
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full h-8 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center justify-center gap-2" style={{background:PRIMARY}}>
                <Navigation className="h-3.5 w-3.5"/> View on Map
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Edit3 className="h-3.5 w-3.5"/> Edit Academy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 5 — COACHES & OFFICIALS
═══════════════════════════════════════════════════════ */
function ScreenCoaches() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number|null>(null);

  const filtered = COACHES.filter(c=>!search||c.name.toLowerCase().includes(search.toLowerCase())||c.id.toLowerCase().includes(search.toLowerCase())||c.sport.toLowerCase().includes(search.toLowerCase()));
  const coach = selected!==null ? COACHES[selected] : null;
  const statusColor: Record<string,string> = { Active:"green", "Renewal Due":"amber", Inactive:"gray", Suspended:"red" };
  const certColor: Record<string,string> = { "NIS Diploma":"navy", "SAI Level 3":"blue", "SAI Level 2":"indigo", "SAI Level 1":"cyan", "State Certified":"purple", "International":"amber" };

  function StarRating({ rating }: { rating: number }) {
    return (
      <div className="flex items-center gap-0.5">
        {[1,2,3,4,5].map(s=>(
          <Star key={s} className={`h-3 w-3 ${s<=Math.round(rating)?"fill-amber-400 text-amber-400":"text-gray-200"}`}/>
        ))}
        <span className="text-[10px] font-bold text-gray-600 ml-1">{rating}</span>
      </div>
    );
  }

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Coaches & Officials</h1>
            <p className="text-xs text-gray-400 mt-0.5">{COACHES.filter(c=>c.status==="Active").length} active · {COACHES.filter(c=>c.status==="Renewal Due").length} certification renewals pending</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition" style={{background:PRIMARY}}>
            <Plus className="h-4 w-4"/> Register Coach
          </button>
        </div>

        {COACHES.filter(c=>c.status==="Renewal Due").length>0 && (
          <div className="flex items-center gap-3 p-3 rounded-xl border border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0"/>
            <span className="text-xs font-semibold text-amber-700">
              <strong>{COACHES.filter(c=>c.status==="Renewal Due").length} coaches</strong> have certification renewals due —{" "}
              {COACHES.filter(c=>c.status==="Renewal Due").map(c=>c.name).join(", ")}. Action required.
            </span>
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name, ID, or sport…"/>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Sports</option>{["Athletics","Swimming","Wrestling","Badminton","Boxing","Kabaddi","Football"].map(s=><option key={s}>{s}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Certifications</option>{["NIS Diploma","SAI Level 3","SAI Level 2","SAI Level 1","State Certified","International"].map(c=><option key={c}>{c}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Status</option><option>Active</option><option>Renewal Due</option>
          </select>
          <button className="ml-auto h-9 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
            <Download className="h-3.5 w-3.5"/> Export
          </button>
        </div>

        <TableWrap heads={["ID","Coach","Sport","Certification","Assigned Centre","Athletes","Experience","Cert Renewal","Rating","Status","Action"]}>
          {filtered.map((c,i)=>(
            <tr key={i} onClick={()=>setSelected(COACHES.indexOf(c))} className={`cursor-pointer transition ${selected===COACHES.indexOf(c)?"bg-blue-50":c.status==="Renewal Due"?"bg-amber-50/50 hover:bg-amber-50":"hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{c.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{c.name}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{c.sport}</td>
              <td className="px-5 py-3.5"><Badge label={c.cert} color={certColor[c.cert]}/></td>
              <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[140px] truncate">{c.centre}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{c.athletes}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{c.expYrs} yrs</td>
              <td className="px-5 py-3.5 text-xs font-semibold" style={{color:c.status==="Renewal Due"?"#f59e0b":"#374151"}}>{c.renewal}</td>
              <td className="px-5 py-3.5"><StarRating rating={c.rating}/></td>
              <td className="px-5 py-3.5"><Badge label={c.status} color={statusColor[c.status]}/></td>
              <td className="px-5 py-3.5">
                <div className="flex gap-1.5">
                  {c.status==="Renewal Due"&&<button className="h-6 px-2 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200 hover:bg-amber-100 transition">Renew</button>}
                  <button className="h-6 w-6 rounded-lg border border-gray-200 grid place-items-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"><Eye className="h-3.5 w-3.5"/></button>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {coach && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Coach Profile</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4"/></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex flex-col items-center gap-2 pb-4 border-b border-gray-100">
              <div className="h-16 w-16 rounded-2xl grid place-items-center text-white font-black text-2xl" style={{background:PRIMARY}}>
                {coach.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div className="text-center">
                <div className="font-black text-gray-900">{coach.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{coach.sport} Coach · {coach.district}</div>
                <div className="flex items-center gap-1.5 justify-center mt-1">
                  {[1,2,3,4,5].map(s=><Star key={s} className={`h-3.5 w-3.5 ${s<=Math.round(coach.rating)?"fill-amber-400 text-amber-400":"text-gray-200"}`}/>)}
                  <span className="text-xs font-black text-gray-700">{coach.rating}</span>
                </div>
                <div className="mt-2 flex gap-2 justify-center">
                  <Badge label={coach.cert} color={certColor[coach.cert]}/>
                  <Badge label={coach.status} color={statusColor[coach.status]}/>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Coach ID",coach.id],["Assigned Centre",coach.centre],["Athletes",coach.athletes],["Experience",`${coach.expYrs} years`],["Cert Renewal",coach.renewal]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className="font-bold text-gray-700 text-right max-w-[55%]">{String(v)}</span>
                </div>
              ))}
            </div>
            {coach.status==="Renewal Due"&&(
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                  <AlertTriangle className="h-3.5 w-3.5"/><span>Certification renewal overdue</span>
                </div>
                <button className="mt-2 w-full h-7 rounded-lg bg-amber-500 text-white text-[10px] font-bold hover:bg-amber-600 transition">Initiate Renewal</button>
              </div>
            )}
            <div className="space-y-2">
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Edit3 className="h-3.5 w-3.5"/> Edit Profile
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Download className="h-3.5 w-3.5"/> Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 6 — INFRASTRUCTURE MAP
═══════════════════════════════════════════════════════ */
function ScreenInfrastructure() {
  const [search, setSearch] = useState("");
  const [condFilter, setCondFilter] = useState("All");
  const [selected, setSelected] = useState<number|null>(null);

  const filtered = INFRASTRUCTURE.filter(inf=>{
    const q = search.toLowerCase();
    return (condFilter==="All"||inf.condition===condFilter)&&(!q||inf.name.toLowerCase().includes(q)||inf.district.toLowerCase().includes(q));
  });
  const infra = selected!==null ? INFRASTRUCTURE[selected] : null;
  const condColor: Record<string,string> = { Excellent:"green", Good:"blue", Fair:"amber", "Needs Repair":"red" };
  const ownColor: Record<string,string> = { State:"navy", Municipal:"blue", Private:"purple", SAI:"indigo" };
  const CONDITIONS = ["All","Excellent","Good","Fair","Needs Repair"];
  const typeIcon: Record<string,React.ElementType> = { Stadium:Flag, "Athletics Track":Activity, "Indoor Hall":Building2, "Football Ground":Target, "Swimming Pool":Zap, Gymnasium:Shield };

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Sports Infrastructure</h1>
            <p className="text-xs text-gray-400 mt-0.5">Geo-tagged infrastructure assets — grounds, pools, stadiums, halls</p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
              <Navigation className="h-3.5 w-3.5"/> Full Map View
            </button>
            <button className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{background:PRIMARY}}>
              <Plus className="h-4 w-4"/> Add Asset
            </button>
          </div>
        </div>

        {/* Condition summary strip */}
        <div className="grid grid-cols-4 gap-4">
          {[["Excellent",INFRASTRUCTURE.filter(i=>i.condition==="Excellent").length,"#059669"],["Good",INFRASTRUCTURE.filter(i=>i.condition==="Good").length,"#1e3a5f"],["Fair",INFRASTRUCTURE.filter(i=>i.condition==="Fair").length,"#f59e0b"],["Needs Repair",INFRASTRUCTURE.filter(i=>i.condition==="Needs Repair").length,"#dc2626"]].map(([l,v,c])=>(
            <div key={l as string} onClick={()=>setCondFilter(condFilter===l?"All":l as string)} className={`bg-white rounded-2xl border shadow-sm px-5 py-4 cursor-pointer transition hover:shadow-md ${condFilter===l?"ring-2 ring-[#1e3a5f]/20 border-[#1e3a5f]":"border-gray-100"}`}>
              <div className="text-2xl font-black" style={{color:c as string}}>{v as number}</div>
              <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or district…"/>
          <div className="flex gap-1">
            {CONDITIONS.map(c=>(
              <button key={c} onClick={()=>setCondFilter(c)}
                className={`h-7 px-3 rounded-lg text-[11px] font-bold transition ${condFilter===c?"text-white":"border border-gray-200 text-gray-500 hover:border-blue-300"}`}
                style={condFilter===c?{background:PRIMARY}:{}}>
                {c}
              </button>
            ))}
          </div>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none ml-auto">
            <option>All Types</option>{["Stadium","Athletics Track","Indoor Hall","Football Ground","Swimming Pool","Gymnasium"].map(t=><option key={t}>{t}</option>)}
          </select>
          <select className="h-9 px-3 rounded-xl border border-gray-200 text-xs text-gray-600 bg-white outline-none">
            <option>All Ownership</option>{["State","Municipal","Private","SAI"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>

        {/* Map placeholder */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-48 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a5f' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}/>
          <div className="text-center">
            <Navigation className="h-10 w-10 mx-auto mb-3 text-gray-300"/>
            <p className="text-sm font-bold text-gray-400">Interactive Geo-Map</p>
            <p className="text-xs text-gray-300 mt-1">{INFRASTRUCTURE.length} assets plotted across Maharashtra districts</p>
            <div className="flex items-center gap-3 justify-center mt-3 flex-wrap">
              {[["Excellent","#059669"],["Good","#1e3a5f"],["Fair","#f59e0b"],["Needs Repair","#dc2626"]].map(([l,c])=>(
                <div key={l} className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                  <div className="h-2.5 w-2.5 rounded-full" style={{background:c}}/>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>

        <TableWrap heads={["ID","Asset Name","Type","District","Sport","Ownership","Capacity","Condition","Last Maint","Next Maint","Action"]}>
          {filtered.map((inf,i)=>{
            const Ic = typeIcon[inf.type] || Building2;
            return (
              <tr key={i} onClick={()=>setSelected(INFRASTRUCTURE.indexOf(inf))} className={`cursor-pointer transition ${selected===INFRASTRUCTURE.indexOf(inf)?"bg-blue-50":inf.nextMaint==="Overdue"?"bg-red-50/50 hover:bg-red-50":"hover:bg-gray-50"}`}>
                <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{inf.id}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Ic className="h-3.5 w-3.5 text-gray-400 shrink-0"/>
                    <span className="font-bold text-gray-800 text-xs max-w-[160px] truncate">{inf.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-gray-500">{inf.type}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500">{inf.district}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500">{inf.sport}</td>
                <td className="px-5 py-3.5"><Badge label={inf.ownership} color={ownColor[inf.ownership]}/></td>
                <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{inf.capacity.toLocaleString("en-IN")}</td>
                <td className="px-5 py-3.5"><Badge label={inf.condition} color={condColor[inf.condition]}/></td>
                <td className="px-5 py-3.5 text-xs text-gray-400">{inf.lastMaint}</td>
                <td className="px-5 py-3.5 text-xs font-semibold" style={{color:inf.nextMaint==="Overdue"?"#dc2626":"#374151"}}>{inf.nextMaint}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1.5">
                    {inf.nextMaint==="Overdue"&&<button className="h-6 px-2 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold border border-red-200 hover:bg-red-100 transition">Urgent</button>}
                    <button className="h-6 px-2 rounded-lg bg-gray-50 text-gray-600 text-[10px] font-bold border border-gray-200 hover:bg-gray-100 transition">Log</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </TableWrap>
      </div>

      {infra && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Infrastructure Details</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4"/></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex flex-col gap-2 pb-4 border-b border-gray-100">
              <div className="h-12 w-12 rounded-xl grid place-items-center" style={{background:`${PRIMARY}15`}}>
                <MapPin className="h-6 w-6" style={{color:PRIMARY}}/>
              </div>
              <div className="font-black text-gray-900 text-sm">{infra.name}</div>
              <div className="flex gap-2">
                <Badge label={infra.condition} color={condColor[infra.condition]}/>
                <Badge label={infra.ownership} color={ownColor[infra.ownership]}/>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Asset ID",infra.id],["Type",infra.type],["District",infra.district],["Sport",infra.sport],["Capacity",infra.capacity.toLocaleString("en-IN")],["Last Maintenance",infra.lastMaint],["Next Due",infra.nextMaint],["Geo",`${infra.lat.toFixed(4)}, ${infra.lng.toFixed(4)}`]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className={`font-bold text-right max-w-[55%] ${k==="Next Due"&&String(v)==="Overdue"?"text-red-600":"text-gray-700"}`}>{String(v)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button className="w-full h-8 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center justify-center gap-2" style={{background:"#059669"}}>
                <Wrench className="h-3.5 w-3.5"/> Log Maintenance
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Edit3 className="h-3.5 w-3.5"/> Edit Details
              </button>
              <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                <Navigation className="h-3.5 w-3.5"/> View on Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 7 — SCHEMES, POLICIES & GRANTS
═══════════════════════════════════════════════════════ */
function ScreenGrants() {
  const [tab, setTab] = useState("grants");
  const grantStatusColor: Record<string,string> = { Released:"green", Processing:"blue", "On Hold":"amber" };

  const POLICIES = [
    { id:"POL-001", title:"Elite Athlete Support Policy 2024",        category:"Athlete",       notified:"01 Jan 2024", status:"Active",  desc:"Monthly stipend & nutritional support for national-level athletes" },
    { id:"POL-002", title:"Sports Infrastructure Development Fund",   category:"Infrastructure",notified:"15 Apr 2023", status:"Active",  desc:"Capital grants for constructing and upgrading sports venues" },
    { id:"POL-003", title:"Talent Identification Programme",          category:"Talent",        notified:"01 Jul 2024", status:"Active",  desc:"District-level scouting and sub-junior development pipeline" },
    { id:"POL-004", title:"Sports Association Annual Support Scheme", category:"Association",   notified:"01 Apr 2020", status:"Active",  desc:"Recurring maintenance and administrative grants to recognized associations" },
    { id:"POL-005", title:"International Medal Cash Incentive",       category:"Athlete",       notified:"10 Aug 2022", status:"Active",  desc:"One-time cash award for Olympic/Asian/Commonwealth medal winners" },
    { id:"POL-006", title:"Coach Certification Subsidy Scheme",       category:"Coach",         notified:"01 Jan 2025", status:"Active",  desc:"Reimburse NIS/SAI certification fees for state-employed coaches" },
  ];

  const totalGranted   = GRANTS.reduce((a,g)=>a+g.amount,0);
  const totalUtilized  = GRANTS.reduce((a,g)=>a+g.utilized,0);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Schemes, Policies & Grants</h1>
          <p className="text-xs text-gray-400 mt-0.5">State sports policies, association grants, and scheme tracking</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5"/> Add Policy
          </button>
          <button className="h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5" style={{background:ACCENT}}>
            <Plus className="h-4 w-4"/> Release Grant
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Total Grants FY27"   value={`₹${(totalGranted/10000000).toFixed(1)}Cr`}  sub="Across all associations"   icon={Award}    color={PRIMARY}   />
        <KpiCard label="Utilized"            value={`₹${(totalUtilized/10000000).toFixed(1)}Cr`} sub={`${Math.round(totalUtilized/totalGranted*100)}% of total`} icon={Target} color="#059669" />
        <KpiCard label="Active Policies"     value={POLICIES.filter(p=>p.status==="Active").length} sub="State sports policies"  icon={BookOpen} color="#7c3aed"   />
        <KpiCard label="Grants On Hold"      value={GRANTS.filter(g=>g.status==="On Hold").length} sub="Require review"         icon={Clock}    color={ACCENT}    />
      </div>

      <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
        {[["grants","Grant Tracker"],["policies","Policies & Schemes"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id as string)}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition ${tab===id?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
            {label as string}
          </button>
        ))}
      </div>

      {tab==="grants" ? (
        <TableWrap heads={["Grant ID","Scheme","Association","Amount Sanctioned","Sanctioned On","Utilized","Utilization%","Status","Action"]}>
          {GRANTS.map((g,i)=>{
            const pct = g.amount>0?Math.round(g.utilized/g.amount*100):0;
            return (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{g.id}</td>
                <td className="px-5 py-3.5 text-xs font-semibold text-gray-700 max-w-[160px] truncate">{g.scheme}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[160px] truncate">{g.assoc}</td>
                <td className="px-5 py-3.5 text-xs font-bold text-gray-700">₹{(g.amount/100000).toFixed(1)}L</td>
                <td className="px-5 py-3.5 text-xs text-gray-400">{g.sanctioned}</td>
                <td className="px-5 py-3.5 text-xs font-bold text-emerald-700">₹{(g.utilized/100000).toFixed(1)}L</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{width:`${pct}%`,background:pct>=90?"#ef4444":pct>=70?"#f59e0b":"#059669"}}/>
                    </div>
                    <span className="text-[11px] font-black" style={{color:pct>=90?"#ef4444":pct>=70?"#f59e0b":"#059669"}}>{pct}%</span>
                  </div>
                </td>
                <td className="px-5 py-3.5"><Badge label={g.status} color={grantStatusColor[g.status]}/></td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1.5">
                    <button className="h-6 px-2 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 hover:bg-blue-100 transition">View</button>
                    {g.status==="On Hold"&&<button className="h-6 px-2 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 hover:bg-emerald-100 transition">Release</button>}
                  </div>
                </td>
              </tr>
            );
          })}
        </TableWrap>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {POLICIES.map((p,i)=>{
            const catColor: Record<string,string> = { Athlete:"blue", Infrastructure:"purple", Talent:"green", Association:"navy", Coach:"amber" };
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge label={p.category} color={catColor[p.category]}/>
                      <span className="font-mono text-[10px] text-gray-400">{p.id}</span>
                    </div>
                    <div className="font-bold text-gray-900 text-sm leading-tight">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-1.5 leading-relaxed">{p.desc}</div>
                  </div>
                  <Badge label={p.status} color="green"/>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <span className="text-[11px] text-gray-400">Notified: <span className="font-bold text-gray-600">{p.notified}</span></span>
                  <button className="h-6 px-2.5 rounded-lg bg-gray-50 text-gray-600 text-[10px] font-bold border border-gray-200 hover:bg-gray-100 transition flex items-center gap-1">
                    <Eye className="h-3 w-3"/> View Policy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCREEN 8 — REPORTS & ANALYTICS
═══════════════════════════════════════════════════════ */
function ScreenReports() {
  const DIST_DATA = [
    { district:"Pune",       athletes:680, academies:2, coaches:3, infra:3 },
    { district:"Nashik",     athletes:342, academies:1, coaches:2, infra:1 },
    { district:"Nagpur",     athletes:418, academies:1, coaches:2, infra:2 },
    { district:"Kolhapur",   athletes:295, academies:1, coaches:1, infra:1 },
    { district:"Amravati",   athletes:210, academies:1, coaches:1, infra:1 },
    { district:"Aurangabad", athletes:187, academies:1, coaches:1, infra:1 },
    { district:"Solapur",    athletes:165, academies:1, coaches:1, infra:1 },
    { district:"Latur",      athletes:120, academies:0, coaches:0, infra:0 },
  ];
  const maxAth = Math.max(...DIST_DATA.map(d=>d.athletes));

  const REPORT_CARDS = [
    { name:"District-wise Athlete Count Report",    desc:"Athletes per district with sport breakdown",   icon:Users,         color:PRIMARY,    period:"As on date"  },
    { name:"Sport-wise Registration Summary",       desc:"Total registered athletes by sport",           icon:BarChart3,     color:"#059669",  period:"As on date"  },
    { name:"Association Annual Returns Report",     desc:"All association audit & compliance status",    icon:Flag,          color:"#7c3aed",  period:"FY 2026-27"  },
    { name:"Academy & Centre Utilization Report",   desc:"Capacity vs actual strength per centre",       icon:Building2,     color:ACCENT,     period:"As on date"  },
    { name:"Coach-to-Athlete Ratio Report",         desc:"Athlete load per coach by sport & district",   icon:GraduationCap, color:"#0891b2",  period:"As on date"  },
    { name:"Infrastructure Condition Report",       desc:"Asset condition & maintenance schedule",       icon:MapPin,        color:"#dc2626",  period:"As on date"  },
    { name:"Grant Utilization Report",              desc:"Scheme-wise grant release & utilization",      icon:Award,         color:"#f59e0b",  period:"FY 2026-27"  },
    { name:"Data Gap Analysis",                     desc:"Districts with missing athletes, infra, coaches",icon:Database,    color:"#7c3aed",  period:"As on date"  },
    { name:"Performance Monitoring Dashboard",      desc:"National/international results tracking",      icon:TrendingUp,    color:PRIMARY,    period:"CY 2027"     },
  ];

  const GAP_DISTRICTS = [
    { district:"Latur",    gaps:["No Academy","No Coach","No Major Infra"], severity:"High"   },
    { district:"Osmanabad",gaps:["No Academy","No Coach"],                  severity:"High"   },
    { district:"Washim",   gaps:["No Coach","Limited Infra"],               severity:"Medium" },
    { district:"Hingoli",  gaps:["No Coach"],                               severity:"Low"    },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Reports & Analytics</h1>
          <p className="text-xs text-gray-400 mt-0.5">Data-driven insights for decision-making — CRDM analytics layer</p>
        </div>
        <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-1.5 hover:border-blue-400 transition">
          <Download className="h-3.5 w-3.5"/> Export All
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[["Total Repository Entries","4,143","All entities combined","#1e3a5f",Database],["Districts with Full Coverage","6","Athlete + Coach + Infra","#059669",CheckCircle],["Districts with Gaps","2","Need immediate action","#dc2626",AlertTriangle],["Data Completeness","94%","Across all entity types","#7c3aed",BarChart3]].map(([l,v,s,c,Ic])=>(
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3 items-start">
            <div className="h-11 w-11 rounded-xl grid place-items-center shrink-0" style={{background:`${c as string}15`}}>
              <Ic className="h-5 w-5" style={{color:c as string}}/>
            </div>
            <div>
              <div className="text-xl font-black" style={{color:c as string}}>{v as string}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{l as string}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{s as string}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Athlete density chart */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="District-wise Athlete Density"/>
          <div className="space-y-3">
            {DIST_DATA.sort((a,b)=>b.athletes-a.athletes).map((d,i)=>(
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-400"/>
                    <span className="text-xs font-semibold text-gray-700 w-24">{d.district}</span>
                    <div className="flex gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-600 font-bold border border-purple-200">{d.academies} centres</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-bold border border-green-200">{d.coaches} coaches</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-gray-900">{d.athletes.toLocaleString("en-IN")} athletes</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${(d.athletes/maxAth)*100}%`,background:d.athletes<200?"#dc2626":d.athletes<400?"#f59e0b":PRIMARY}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data gap panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="Infrastructure Gap Analysis"/>
          <div className="space-y-3">
            {GAP_DISTRICTS.map((g,i)=>(
              <div key={i} className={`p-3 rounded-xl border ${g.severity==="High"?"bg-red-50 border-red-200":g.severity==="Medium"?"bg-amber-50 border-amber-200":"bg-blue-50 border-blue-200"}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-gray-800">{g.district}</span>
                  <Badge label={g.severity} color={g.severity==="High"?"red":g.severity==="Medium"?"amber":"blue"}/>
                </div>
                <div className="flex flex-col gap-1">
                  {g.gaps.map((gap,j)=>(
                    <div key={j} className="flex items-center gap-1.5 text-[11px] text-gray-600 font-medium">
                      <XCircle className={`h-3 w-3 ${g.severity==="High"?"text-red-500":g.severity==="Medium"?"text-amber-500":"text-blue-500"}`}/>
                      {gap}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report cards */}
      <div className="grid grid-cols-3 gap-4">
        {REPORT_CARDS.map((r,i)=>(
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

/* ═══════════════════════════════════════════════════════
   CRDM PORTAL SHELL — exact HMS shell pattern
═══════════════════════════════════════════════════════ */
const CRDM_NAV = [
  { id:"dashboard",      label:"Dashboard",                icon:LayoutDashboard, badge:3  },
  { id:"associations",   label:"Sports Associations",      icon:Flag,            badge:0  },
  { id:"athletes",       label:"Athlete Registry",         icon:Users,           badge:3  },
  { id:"academies",      label:"Academies & Centres",      icon:Building2,       badge:0  },
  { id:"coaches",        label:"Coaches & Officials",      icon:GraduationCap,   badge:2  },
  { id:"infrastructure", label:"Infrastructure Map",       icon:MapPin,          badge:1  },
  { id:"grants",         label:"Schemes, Policies & Grants",icon:Award,          badge:0  },
  { id:"reports",        label:"Reports & Analytics",      icon:BarChart3,       badge:0  },
];

export function CRDMPortal({ onBack }: { onBack: () => void }) {
  const [nav, setNav]           = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  function renderScreen() {
    switch (nav) {
      case "dashboard":      return <ScreenDashboard setNav={setNav} />;
      case "associations":   return <ScreenAssociations />;
      case "athletes":       return <ScreenAthletes />;
      case "academies":      return <ScreenAcademies />;
      case "coaches":        return <ScreenCoaches />;
      case "infrastructure": return <ScreenInfrastructure />;
      case "grants":         return <ScreenGrants />;
      case "reports":        return <ScreenReports />;
      default:               return <ScreenDashboard setNav={setNav} />;
    }
  }

  const activeLabel = CRDM_NAV.find(n => n.id === nav)?.label || "Dashboard";

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f6fa" }}>
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-[220px]"} shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen z-30 bg-white border-r border-gray-100 shadow-sm`}>
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-gray-100 min-h-[64px]">
          <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0 text-white" style={{ background: PRIMARY }}>
            <Database className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-black text-gray-900 text-sm leading-none">CRDM Portal</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Central Repository</div>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)} className="ml-auto text-gray-300 hover:text-gray-600 transition shrink-0">
            <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
          </button>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
          {CRDM_NAV.map(item => (
            <button key={item.id} onClick={() => setNav(item.id)} title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all ${nav === item.id ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
              style={nav === item.id ? { background: PRIMARY } : {}}>
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="flex-1 text-left text-xs truncate">{item.label}</span>}
              {!collapsed && item.badge > 0 && (
                <span className={`h-5 min-w-5 px-1 rounded-full text-[10px] font-black grid place-items-center ${nav === item.id ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"}`}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-100">
          <button onClick={onBack} title={collapsed ? "Back to Admin" : undefined}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-xs text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition">
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Back to Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
          <img src={mhSeal} alt="MH Seal" className="h-8 w-auto object-contain shrink-0" />
          <div className="h-5 w-px bg-gray-200" />
          {nav !== "dashboard" && (
            <button onClick={() => setNav("dashboard")} className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition shrink-0">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          )}
          <div className="text-sm text-gray-500">
            <span className="font-black text-gray-900 cursor-pointer hover:text-blue-600 transition" onClick={() => setNav("dashboard")}>CRDM Portal</span>
            <ChevronRight className="inline h-3.5 w-3.5 mx-1 text-gray-300" />
            <span className="font-semibold">{activeLabel}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync Active
            </div>
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
              {["EN","HI","MR"].map(l => (
                <button key={l} className={`px-2 py-1 rounded text-[11px] font-bold transition ${l==="EN"?"bg-white shadow-sm":"text-gray-400"}`}>{l}</button>
              ))}
            </div>
            <button className="relative h-8 w-8 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-blue-400 transition">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[8px] font-black grid place-items-center">5</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full grid place-items-center text-white text-xs font-black shrink-0" style={{ background: PRIMARY }}>AP</div>
              <div>
                <div className="text-xs font-bold text-gray-800 leading-none">A. Pawar</div>
                <div className="text-[10px] font-bold" style={{ color: ACCENT }}>ADMIN</div>
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

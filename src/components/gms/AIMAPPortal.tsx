import { useState } from "react";
import {
  LayoutDashboard, Users, Brain, TrendingUp, TrendingDown,
  Activity, Award, BarChart3, Settings, ChevronRight,
  X, LogOut, ArrowLeft, Bell, AlertTriangle, CheckCircle,
  XCircle, Clock, Zap, Target, Eye, Download, RefreshCw,
  Star, Shield, MapPin, Calendar, Filter, ChevronDown,
  Cpu, Database, GitBranch, Layers, Radio, Wifi,
  ThumbsUp, ThumbsDown, ArrowUpRight, ArrowDownRight,
  Minus, Info, Play, Pause, SkipForward,
} from "lucide-react";
import mhSeal from "@/assets/mh-seal.png";

/* ═══════════════════════════════════════
   TOKENS
═══════════════════════════════════════ */
const PRIMARY = "#1e3a5f";
const ACCENT  = "#f97316";
const AI_COLOR = "#6d28d9";

/* ═══════════════════════════════════════
   MINI CHART HELPERS (pure SVG)
═══════════════════════════════════════ */
function Sparkline({ data, color, height = 40, width = 120 }: { data: number[]; color: string; height?: number; width?: number }) {
  if (!data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(" ");
  const areaBottom = `${width},${height} 0,${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={`${pts} ${areaBottom}`} fill={`url(#sg-${color.replace("#","")})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* last dot */}
      <circle cx={(data.length-1)/(data.length-1)*width} cy={height-((data[data.length-1]-min)/range)*(height-6)-3} r="3" fill={color}/>
    </svg>
  );
}

function RadarChart({ labels, values, color }: { labels: string[]; values: number[]; color: string }) {
  const N = labels.length, cx = 90, cy = 90, R = 72;
  const pts = values.map((v, i) => {
    const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
    const r = (v / 100) * R;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const gridPts = (r: number) => Array.from({ length: N }, (_, i) => {
    const a = (i / N) * 2 * Math.PI - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  const polyPts = pts.map(p => `${p.x},${p.y}`).join(" ");
  return (
    <svg viewBox="0 0 180 180" className="w-full h-full">
      {[0.25,0.5,0.75,1].map(f=>(
        <polygon key={f} points={gridPts(R*f)} fill="none" stroke="#e5e7eb" strokeWidth="1"/>
      ))}
      {Array.from({length:N},(_,i)=>{
        const a=(i/N)*2*Math.PI-Math.PI/2;
        return <line key={i} x1={cx} y1={cy} x2={cx+R*Math.cos(a)} y2={cy+R*Math.sin(a)} stroke="#e5e7eb" strokeWidth="1"/>;
      })}
      <polygon points={polyPts} fill={`${color}25`} stroke={color} strokeWidth="2"/>
      {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3" fill={color}/>)}
      {labels.map((l,i)=>{
        const a=(i/N)*2*Math.PI-Math.PI/2;
        const x=cx+(R+14)*Math.cos(a), y=cy+(R+14)*Math.sin(a);
        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#6b7280" fontWeight="600">{l}</text>;
      })}
    </svg>
  );
}

function DonutChart({ pct, color, size = 80, label }: { pct: number; color: string; size?: number; label?: string }) {
  const r = (size - 12) / 2, c = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="#f3f4f6" strokeWidth="8"/>
        <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={circ * 0.25}
          strokeLinecap="round" style={{ transition: "stroke-dasharray 1s ease" }}/>
      </svg>
      {label && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-black" style={{ color }}>{pct}%</span>
          <span className="text-[8px] text-gray-400 font-semibold leading-none mt-0.5">{label}</span>
        </div>
      )}
    </div>
  );
}

function HeatCell({ value }: { value: number }) {
  const bg = value >= 90 ? "#059669" : value >= 70 ? "#34d399" : value >= 50 ? "#fbbf24" : value >= 30 ? "#f97316" : value > 0 ? "#ef4444" : "#f3f4f6";
  return (
    <div className="h-6 w-6 rounded-md transition-all hover:scale-110 cursor-pointer"
      style={{ background: bg }}
      title={`${value}%`}
    />
  );
}

function RiskBar({ score, label }: { score: number; label: string }) {
  const color = score >= 70 ? "#ef4444" : score >= 40 ? "#f59e0b" : "#059669";
  const badge = score >= 70 ? "High" : score >= 40 ? "Medium" : "Low";
  const badgeColor = score >= 70 ? "red" : score >= 40 ? "amber" : "green";
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-gray-700 w-28 truncate">{label}</span>
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-xs font-black w-8 text-right" style={{ color }}>{score}</span>
      <Badge label={badge} color={badgeColor} />
    </div>
  );
}

/* ═══════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════ */
function Badge({ label, color }: { label: string; color: string }) {
  const map: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    red: "bg-red-50 text-red-600 border border-red-200",
    amber: "bg-amber-50 text-amber-700 border border-amber-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
    gray: "bg-gray-100 text-gray-500 border border-gray-200",
    navy: "bg-[#1e3a5f]/10 text-[#1e3a5f] border border-[#1e3a5f]/20",
    ai: "bg-violet-50 text-violet-700 border border-violet-200",
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${map[color] || map.gray}`}>{label}</span>;
}

function AIChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-50 text-violet-700 border border-violet-200">
      <Brain className="h-2.5 w-2.5" /> {label}
    </span>
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

/* ═══════════════════════════════════════
   MASTER DATA
═══════════════════════════════════════ */
const ATHLETES_AI = [
  { id: "ATH-001", name: "Arjun Deshmukh",  sport: "Athletics",  district: "Pune",     age: 19, coach: "Ramesh Kumar",  injuryRisk: 22, dropoutRisk: 8,  medalPotential: 87, trend: "up",    attendance: 94, pb: "10.84s (100m)", benchmark: "State: 10.9s / Nat: 10.72s", perf: [72,74,76,75,78,80,82,84,85,87], nutrition: "Normal",   weight: 68, bmi: 21.4 },
  { id: "ATH-002", name: "Priya Jadhav",    sport: "Swimming",   district: "Nashik",   age: 17, coach: "Sanjay Patil",  injuryRisk: 31, dropoutRisk: 15, medalPotential: 74, trend: "up",    attendance: 88, pb: "1:02.3 (100m Freestyle)", benchmark: "State: 1:03 / Nat: 59.8s", perf: [60,62,65,63,67,68,71,72,73,74], nutrition: "Normal",   weight: 56, bmi: 20.1 },
  { id: "ATH-003", name: "Ravi Bhosale",    sport: "Wrestling",  district: "Kolhapur", age: 22, coach: "Anil Wagh",     injuryRisk: 68, dropoutRisk: 12, medalPotential: 91, trend: "plateau",attendance:79, pb: "National Gold 66kg",         benchmark: "Asian Trials Qualifier",      perf: [80,82,85,84,85,86,85,86,87,91], nutrition: "Warning",  weight: 67, bmi: 22.8 },
  { id: "ATH-004", name: "Sneha Kulkarni",  sport: "Badminton",  district: "Nashik",   age: 16, coach: "Meena Raut",   injuryRisk: 14, dropoutRisk: 22, medalPotential: 62, trend: "up",    attendance: 91, pb: "Sub-Junior State Finalist",  benchmark: "State Finals",                perf: [42,45,48,50,52,55,57,59,61,62], nutrition: "Normal",   weight: 52, bmi: 19.5 },
  { id: "ATH-005", name: "Omkar Shinde",    sport: "Boxing",     district: "Nagpur",   age: 21, coach: "Vijay Kale",   injuryRisk: 82, dropoutRisk: 45, medalPotential: 55, trend: "down",  attendance: 61, pb: "State Bronze 60kg",          benchmark: "State Level",                 perf: [70,68,72,65,63,60,58,57,56,55], nutrition: "Warning",  weight: 61, bmi: 21.0 },
  { id: "ATH-006", name: "Kavita Patil",    sport: "Athletics",  district: "Pune",     age: 18, coach: "Ramesh Kumar",  injuryRisk: 19, dropoutRisk: 6,  medalPotential: 78, trend: "up",    attendance: 96, pb: "State Gold 400m (54.2s)",    benchmark: "State: 54.5s / Nat: 52.1s",   perf: [55,58,60,62,65,67,70,73,76,78], nutrition: "Normal",   weight: 55, bmi: 20.2 },
  { id: "ATH-007", name: "Rahul Khedkar",   sport: "Wrestling",  district: "Amravati", age: 24, coach: "Anil Wagh",    injuryRisk: 44, dropoutRisk: 5,  medalPotential: 96, trend: "up",    attendance: 92, pb: "Shiv Chhatrapati Awardee",   benchmark: "International Trails",        perf: [84,86,88,87,90,91,93,94,95,96], nutrition: "Normal",   weight: 74, bmi: 23.1 },
  { id: "ATH-008", name: "Dipali Naik",     sport: "Swimming",   district: "Pune",     age: 20, coach: "Sanjay Patil", injuryRisk: 35, dropoutRisk: 18, medalPotential: 69, trend: "up",    attendance: 85, pb: "State Silver 200m",          benchmark: "State: 2:14 / Nat: 2:08",     perf: [50,53,55,58,59,62,64,66,68,69], nutrition: "Normal",   weight: 58, bmi: 20.8 },
];

const COACHES_AI = [
  { id:"COA-001", name:"Ramesh Kumar",  sport:"Athletics",  athletes:12, effectiveness:91, improvement:8.4, attendance:96, planAdherence:94, rating:4.8, district:"Pune",       trend:"up",    sparkData:[80,82,84,85,87,88,90,91,91,91] },
  { id:"COA-002", name:"Sanjay Patil",  sport:"Swimming",   athletes:8,  effectiveness:84, improvement:6.2, attendance:91, planAdherence:88, rating:4.5, district:"Pune",       trend:"up",    sparkData:[74,76,77,78,80,81,82,83,84,84] },
  { id:"COA-003", name:"Anil Wagh",     sport:"Wrestling",  athletes:10, effectiveness:88, improvement:7.1, attendance:89, planAdherence:91, rating:4.9, district:"Kolhapur",   trend:"plateau",sparkData:[84,85,85,86,87,88,88,88,88,88] },
  { id:"COA-004", name:"Meena Raut",    sport:"Badminton",  athletes:7,  effectiveness:76, improvement:5.3, attendance:88, planAdherence:82, rating:4.3, district:"Aurangabad", trend:"up",    sparkData:[66,68,70,71,72,73,74,75,76,76] },
  { id:"COA-005", name:"Vijay Kale",    sport:"Boxing",     athletes:9,  effectiveness:61, improvement:2.1, attendance:74, planAdherence:68, rating:4.1, district:"Solapur",    trend:"down",  sparkData:[72,70,68,67,65,64,63,62,61,61] },
  { id:"COA-006", name:"Ganesh More",   sport:"Kabaddi",    athletes:14, effectiveness:72, improvement:4.8, attendance:81, planAdherence:76, rating:3.9, district:"Nagpur",     trend:"up",    sparkData:[60,62,64,66,67,68,69,70,71,72] },
  { id:"COA-007", name:"Sunita Bhagat", sport:"Athletics",  athletes:6,  effectiveness:95, improvement:9.8, attendance:98, planAdherence:97, rating:5.0, district:"Nashik",     trend:"up",    sparkData:[84,86,88,90,91,92,93,94,95,95] },
];

const RECOMMENDATIONS = [
  { id:"REC-001", type:"Injury Prevention",   priority:"High",   athlete:"Omkar Shinde",   message:"Training load 38% above safe threshold for 12 days. Reduce intensity by 30% and add 2 rest days this week. Risk score: 82/100.", action:"Notify Coach",  status:"Pending", icon:"🚨", ai:true },
  { id:"REC-002", type:"Trial Recommendation",priority:"High",   athlete:"Rahul Khedkar",  message:"Performance metrics exceed national benchmark by 14%. Recommend immediate nomination for Asian Wrestling Trials 2027.", action:"Nominate",      status:"Pending", icon:"🏆", ai:true },
  { id:"REC-003", type:"Nutrition Intervention",priority:"Medium",athlete:"Ravi Bhosale",  message:"BMI increased 1.8 points in 30 days with no corresponding strength gain. Dietitian consultation recommended.", action:"Schedule Consult",status:"Accepted", icon:"🥗", ai:true },
  { id:"REC-004", type:"Dropout Risk Alert",  priority:"Medium", athlete:"Omkar Shinde",   message:"45% dropout probability detected. Factors: attendance decline (61%), 3 consecutive training suspensions, no recent achievements.", action:"Counselling",   status:"Pending", icon:"⚠️", ai:true },
  { id:"REC-005", type:"Performance Boost",   priority:"Low",    athlete:"Kavita Patil",   message:"400m PB improving at +1.2% weekly — top 5% growth rate in state. Add interval sessions 3x/week to accelerate gains.", action:"Update Plan",   status:"Accepted", icon:"⚡", ai:true },
  { id:"REC-006", type:"Coach Alert",         priority:"High",   athlete:"Vijay Kale (Coach)", message:"Athlete improvement rate declined 18% over 60 days. 3 athletes show simultaneous plateau. Training methodology review needed.", action:"Schedule Review",status:"Pending", icon:"👨‍🏫", ai:true },
  { id:"REC-007", type:"LMS Nudge",           priority:"Low",    athlete:"Ganesh More (Coach)","message":"Coach has not completed 'Talent Identification' LMS course (Draft). Completion increases avg athlete improvement by 12% per data.", action:"Enroll",       status:"Dismissed", icon:"📚", ai:true },
];

const ATTENDANCE_GRID = {
  days: ["M","T","W","T","F","S","M","T","W","T","F","S","M","T","W","T","F","S","M","T"],
  athletes: [
    { name:"Arjun D.",  vals:[95,100,95,100,90,0,100,95,100,95,90,0,100,100,95,100,90,0,95,100] },
    { name:"Priya J.",  vals:[90,85,90,95,80,0,90,88,92,90,85,0,88,90,92,88,80,0,90,95] },
    { name:"Ravi B.",   vals:[80,75,80,85,70,0,78,80,82,80,75,0,80,82,78,80,75,0,82,85] },
    { name:"Sneha K.",  vals:[95,100,95,100,95,0,100,95,100,95,100,0,95,100,95,100,95,0,100,100] },
    { name:"Omkar S.",  vals:[60,50,65,55,45,0,60,55,50,60,45,0,55,60,50,55,45,0,60,65] },
    { name:"Kavita P.", vals:[100,100,95,100,100,0,100,100,100,95,100,0,100,100,100,100,95,0,100,100] },
    { name:"Rahul K.",  vals:[90,95,90,95,95,0,92,95,90,95,90,0,95,90,95,92,95,0,90,95] },
  ],
};

/* ═══════════════════════════════════════
   SCREEN 1 — AI DASHBOARD
═══════════════════════════════════════ */
function ScreenDashboard({ setNav }: { setNav:(n:string)=>void }) {
  const highRisk   = ATHLETES_AI.filter(a=>a.injuryRisk>=70).length;
  const medalReady = ATHLETES_AI.filter(a=>a.medalPotential>=85).length;
  const dropoutAt  = ATHLETES_AI.filter(a=>a.dropoutRisk>=30).length;
  const avgPerf    = Math.round(ATHLETES_AI.reduce((a,x)=>a+x.medalPotential,0)/ATHLETES_AI.length);

  const PLATFORM_HEALTH = [
    { label:"Data Completeness", val:94, color:"#059669" },
    { label:"Model Accuracy",    val:88, color:AI_COLOR   },
    { label:"Alert Response",    val:72, color:ACCENT      },
    { label:"Sync Status",       val:99, color:PRIMARY     },
  ];

  const LIVE_ALERTS = [
    { msg:"🚨 Omkar Shinde injury risk CRITICAL (82) — training suspended",    time:"2 min ago",  type:"danger"  },
    { msg:"🏆 Rahul Khedkar medal potential hit 96 — Asian Trials eligible",  time:"14 min ago", type:"success" },
    { msg:"⚠️ Coach Vijay Kale effectiveness score dropped below 65 threshold",time:"1 hr ago",  type:"warning" },
    { msg:"📉 Ravi Bhosale attendance dropped 13% — 3rd consecutive week",    time:"2 hr ago",   type:"warning" },
    { msg:"✅ Kavita Patil PB improved 400m — 54.2s → 53.9s (state rank #2)",time:"3 hr ago",   type:"success" },
    { msg:"🧠 AI model retrained with Q2 2027 data — accuracy improved to 88%",time:"Today 06:00",type:"info"   },
  ];

  const PERF_DIST = [
    { range:"90–100 (Elite)",   count:2, color:"#059669" },
    { range:"75–89 (Advanced)", count:3, color:PRIMARY    },
    { range:"60–74 (Good)",     count:2, color:"#f59e0b"  },
    { range:"Below 60 (Risk)",  count:1, color:"#ef4444"  },
  ];

  return (
    <div className="p-6 space-y-5">
      {/* Hero KPI strip with gradients */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label:"Athletes Monitored", value:ATHLETES_AI.length,    sub:"Real-time tracking",    color1:"#1e3a5f", color2:"#2d5986", icon:Users },
          { label:"Avg Medal Potential", value:`${avgPerf}%`,         sub:"AI score, all athletes", color1:AI_COLOR,  color2:"#7c3aed", icon:Brain },
          { label:"High Injury Risk",    value:highRisk,              sub:"Require immediate action",color1:"#dc2626", color2:"#ef4444", icon:AlertTriangle },
          { label:"AI Recommendations", value:RECOMMENDATIONS.filter(r=>r.status==="Pending").length, sub:"Awaiting action", color1:ACCENT, color2:"#fb923c", icon:Zap },
        ].map(({ label, value, sub, color1, color2, icon: Icon }) => (
          <div key={label} className="rounded-2xl p-5 text-white shadow-lg relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}>
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-10 bg-white" />
            <div className="absolute -right-2 -bottom-6 h-24 w-24 rounded-full opacity-10 bg-white" />
            <Icon className="h-7 w-7 mb-3 opacity-90" />
            <div className="text-3xl font-black">{value}</div>
            <div className="text-xs font-bold opacity-90 mt-0.5">{label}</div>
            <div className="text-[11px] opacity-70 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {/* Second strip */}
      <div className="grid grid-cols-4 gap-4">
        {[
          ["Medal-Ready Athletes", medalReady,  "#059669"],
          ["Dropout Risk Flags",   dropoutAt,   "#f59e0b"],
          ["Coaches Monitored",    COACHES_AI.length, PRIMARY ],
          ["Model Accuracy",      "88%",        AI_COLOR  ],
        ].map(([l,v,c])=>(
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black" style={{color:c as string}}>{v as string|number}</div>
              <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
            </div>
            <div className="h-10 w-10 rounded-xl grid place-items-center" style={{background:`${c as string}15`}}>
              <Activity className="h-5 w-5" style={{color:c as string}}/>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Live AI alert feed */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="font-bold text-gray-800 text-sm">Live AI Alert Feed</span>
            </div>
            <div className="flex items-center gap-2">
              <AIChip label="AI Monitored"/>
              <button onClick={()=>setNav("recommendations")} className="text-xs font-bold hover:underline" style={{color:PRIMARY}}>View All →</button>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {LIVE_ALERTS.map((a,i)=>(
              <div key={i} className={`flex items-start gap-3 px-5 py-3 ${a.type==="danger"?"bg-red-50":a.type==="success"?"bg-emerald-50":a.type==="warning"?"bg-amber-50":""}`}>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-semibold leading-snug ${a.type==="danger"?"text-red-800":a.type==="success"?"text-emerald-800":a.type==="warning"?"text-amber-800":"text-gray-700"}`}>{a.msg}</div>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform health */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800">Platform Health</h2>
            <AIChip label="AI Score"/>
          </div>
          <div className="flex justify-center mb-5">
            <div className="relative h-32 w-32">
              <DonutChart pct={92} color={AI_COLOR} size={128} label="Health"/>
            </div>
          </div>
          <div className="space-y-3">
            {PLATFORM_HEALTH.map((h,i)=>(
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600">{h.label}</span>
                  <span className="text-xs font-black" style={{color:h.color}}>{h.val}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${h.val}%`,background:h.color}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance distribution + Top athletes */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Performance Distribution</h2>
          <div className="space-y-4">
            {PERF_DIST.map((p,i)=>(
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 w-4 rounded shrink-0" style={{background:p.color}}/>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] font-semibold text-gray-600">{p.range}</span>
                    <span className="text-[11px] font-black text-gray-900">{p.count}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${(p.count/ATHLETES_AI.length)*100}%`,background:p.color}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 text-center">
            <div className="text-2xl font-black" style={{color:AI_COLOR}}>{avgPerf}%</div>
            <div className="text-xs text-gray-400 mt-0.5">Platform Average Medal Potential</div>
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800">Top Athletes — AI Performance Score</h2>
            <button onClick={()=>setNav("athletes")} className="text-xs font-bold hover:underline" style={{color:PRIMARY}}>Full Tracker →</button>
          </div>
          <div className="space-y-3">
            {[...ATHLETES_AI].sort((a,b)=>b.medalPotential-a.medalPotential).map((ath,i)=>(
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer" onClick={()=>setNav("athletes")}>
                <div className="h-7 w-7 rounded-full grid place-items-center text-white text-[10px] font-black shrink-0" style={{background:i<3?"#f97316":PRIMARY}}>
                  {i+1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-800 truncate">{ath.name}</span>
                    <Badge label={ath.sport} color="navy"/>
                    {ath.trend==="up"&&<TrendingUp className="h-3 w-3 text-emerald-500"/>}
                    {ath.trend==="down"&&<TrendingDown className="h-3 w-3 text-red-400"/>}
                    {ath.trend==="plateau"&&<Minus className="h-3 w-3 text-amber-400"/>}
                  </div>
                  <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${ath.medalPotential}%`,background:ath.medalPotential>=85?"#059669":ath.medalPotential>=70?"#1e3a5f":"#f59e0b"}}/>
                  </div>
                </div>
                <div className="w-24 shrink-0">
                  <Sparkline data={ath.perf} color={ath.medalPotential>=85?"#059669":PRIMARY} width={96} height={28}/>
                </div>
                <div className="text-sm font-black w-8 text-right shrink-0" style={{color:ath.medalPotential>=85?"#059669":PRIMARY}}>{ath.medalPotential}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 2 — ATHLETE PERFORMANCE TRACKER
═══════════════════════════════════════ */
function ScreenAthletes() {
  const [selected, setSelected] = useState(0);
  const ath = ATHLETES_AI[selected];

  const radarLabels = ["Speed","Strength","Endurance","Technique","Recovery","Mental"];
  const radarVals   = [
    Math.round(ath.medalPotential*0.95),
    Math.round(ath.medalPotential*0.88),
    Math.round(ath.medalPotential*1.02),
    Math.round(ath.medalPotential*0.91),
    Math.round(100-ath.injuryRisk*0.8),
    Math.round(100-ath.dropoutRisk*1.2),
  ].map(v=>Math.min(v,100));

  const riskColor = (s:number) => s>=70?"#ef4444":s>=40?"#f59e0b":"#059669";
  const trendIcon = ath.trend==="up"?TrendingUp:ath.trend==="down"?TrendingDown:Minus;
  const trendColor= ath.trend==="up"?"#059669":ath.trend==="down"?"#ef4444":"#f59e0b";
  const TI = trendIcon;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Athlete Performance Tracker</h1>
          <p className="text-xs text-gray-400 mt-0.5">AI-powered individual performance analytics & benchmarking</p>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5"/> Export Report
          </button>
          <AIChip label="AI-Powered Insights Active"/>
        </div>
      </div>

      {/* Athlete selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {ATHLETES_AI.map((a,i)=>(
          <button key={i} onClick={()=>setSelected(i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shrink-0 ${selected===i?"text-white shadow-sm":"border border-gray-200 text-gray-500 hover:border-blue-300 bg-white"}`}
            style={selected===i?{background:PRIMARY}:{}}>
            <span className="h-5 w-5 rounded-full grid place-items-center text-[9px] font-black text-white shrink-0" style={{background:a.injuryRisk>=70?"#ef4444":a.medalPotential>=85?"#059669":ACCENT}}>{a.name[0]}</span>
            {a.name.split(" ")[0]}
            {a.injuryRisk>=70&&<span className="h-2 w-2 rounded-full bg-red-400 ml-0.5"/>}
          </button>
        ))}
      </div>

      {/* Main dashboard for selected athlete */}
      <div className="grid grid-cols-3 gap-5">
        {/* Left — profile + risk + stats */}
        <div className="space-y-4">
          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-14 w-14 rounded-2xl grid place-items-center text-white font-black text-xl shrink-0" style={{background:PRIMARY}}>
                {ath.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div>
                <div className="font-black text-gray-900">{ath.name}</div>
                <div className="text-xs text-gray-500">{ath.sport} · {ath.district} · Age {ath.age}</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <TI className="h-3.5 w-3.5" style={{color:trendColor}}/>
                  <span className="text-xs font-bold capitalize" style={{color:trendColor}}>{ath.trend}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Coach",ath.coach],["Personal Best",ath.pb],["Benchmark",ath.benchmark],["Attendance",`${ath.attendance}%`],["Nutrition",ath.nutrition],["BMI",`${ath.bmi}`]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">{k}</span>
                  <span className={`font-bold text-right max-w-[55%] truncate ${k==="Nutrition"&&v==="Warning"?"text-amber-600":k==="Attendance"&&ath.attendance<80?"text-red-500":"text-gray-700"}`}>{String(v)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk scores */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-bold text-gray-800">AI Risk Scores</h2>
              <AIChip label="AI"/>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-600">Injury Risk</span>
                  <span className="text-xs font-black" style={{color:riskColor(ath.injuryRisk)}}>{ath.injuryRisk}/100</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${ath.injuryRisk}%`,background:riskColor(ath.injuryRisk)}}/>
                </div>
                <div className="text-[10px] text-gray-400 mt-1">{ath.injuryRisk>=70?"⚠️ High Risk — immediate action needed":ath.injuryRisk>=40?"Moderate — monitor closely":"Low — normal training"}</div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-600">Dropout Risk</span>
                  <span className="text-xs font-black" style={{color:riskColor(ath.dropoutRisk)}}>{ath.dropoutRisk}/100</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${ath.dropoutRisk}%`,background:riskColor(ath.dropoutRisk)}}/>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-semibold text-gray-600">Medal Potential</span>
                  <span className="text-xs font-black" style={{color:ath.medalPotential>=85?"#059669":ath.medalPotential>=65?"#1e3a5f":"#f59e0b"}}>{ath.medalPotential}/100</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${ath.medalPotential}%`,background:ath.medalPotential>=85?"#059669":ath.medalPotential>=65?"#1e3a5f":"#f59e0b"}}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centre — radar + performance trend */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-800">Attribute Radar</h2>
              <AIChip label="AI Scored"/>
            </div>
            <div className="h-52 w-full">
              <RadarChart labels={radarLabels} values={radarVals} color={ath.medalPotential>=85?"#059669":PRIMARY}/>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Performance Trend (10 sessions)</h2>
            <div className="h-24 w-full">
              <Sparkline data={ath.perf} color={ath.trend==="down"?"#ef4444":ath.trend==="up"?"#059669":"#f59e0b"} width={320} height={96}/>
            </div>
            <div className="flex justify-between text-[11px] text-gray-400 mt-2">
              <span>Session 1</span>
              <span>Session 10 (Latest: <span className="font-black text-gray-700">{ath.perf[ath.perf.length-1]}</span>)</span>
            </div>
          </div>
        </div>

        {/* Right — donut gauges + benchmarks */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-4">Performance Gauges</h2>
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              <div className="text-center">
                <DonutChart pct={ath.attendance} color={ath.attendance>=85?"#059669":"#ef4444"} size={72} label="Attend."/>
                <div className="text-[10px] text-gray-500 mt-1 font-semibold">Attendance</div>
              </div>
              <div className="text-center">
                <DonutChart pct={ath.medalPotential} color={ath.medalPotential>=80?"#059669":PRIMARY} size={72} label="Potential"/>
                <div className="text-[10px] text-gray-500 mt-1 font-semibold">Medal Potential</div>
              </div>
              <div className="text-center">
                <DonutChart pct={Math.max(0,100-ath.injuryRisk)} color={ath.injuryRisk<40?"#059669":"#ef4444"} size={72} label="Safe"/>
                <div className="text-[10px] text-gray-500 mt-1 font-semibold">Injury Safe</div>
              </div>
              <div className="text-center">
                <DonutChart pct={Math.max(0,100-ath.dropoutRisk)} color={ath.dropoutRisk<30?"#059669":"#f59e0b"} size={72} label="Retained"/>
                <div className="text-[10px] text-gray-500 mt-1 font-semibold">Retention</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-bold text-gray-800">AI Recommendations</h2>
              <AIChip label="3"/>
            </div>
            <div className="space-y-2">
              {RECOMMENDATIONS.filter(r=>r.athlete.includes(ath.name.split(" ")[0])).slice(0,3).map((r,i)=>(
                <div key={i} className={`p-3 rounded-xl border text-xs ${r.priority==="High"?"border-red-200 bg-red-50":r.priority==="Medium"?"border-amber-200 bg-amber-50":"border-blue-200 bg-blue-50"}`}>
                  <div className="font-bold text-gray-800 mb-1">{r.icon} {r.type}</div>
                  <div className={`leading-snug ${r.priority==="High"?"text-red-700":r.priority==="Medium"?"text-amber-700":"text-blue-700"}`}>{r.message.length>90?r.message.slice(0,90)+"…":r.message}</div>
                  <div className="mt-2 flex gap-2">
                    <button className="h-5 px-2 rounded text-[9px] font-bold text-white" style={{background:r.priority==="High"?"#ef4444":r.priority==="Medium"?"#f59e0b":"#1e3a5f"}}>{r.action}</button>
                  </div>
                </div>
              ))}
              {!RECOMMENDATIONS.filter(r=>r.athlete.includes(ath.name.split(" ")[0])).length&&(
                <div className="text-center py-4 text-xs text-gray-400">No active recommendations</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 3 — PREDICTIVE INSIGHTS
═══════════════════════════════════════ */
function ScreenPredictive() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Predictive Insights</h1>
          <p className="text-xs text-gray-400 mt-0.5">AI model outputs — injury risk, dropout probability, medal potential</p>
        </div>
        <div className="flex gap-2">
          <AIChip label="Models Running"/>
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5"/> Retrain Models
          </button>
        </div>
      </div>

      {/* AI model cards */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { title:"Injury Risk Predictor",    desc:"Analyses training load, rest days, injury history",   accuracy:91, lastRun:"2 hrs ago",  color:"#ef4444", icon:"🦴" },
          { title:"Dropout Risk Model",        desc:"Attendance trend, performance plateau, family flags",  accuracy:84, lastRun:"2 hrs ago",  color:"#f59e0b", icon:"📉" },
          { title:"Medal Potential Ranker",    desc:"PB vs state/national benchmarks + growth trajectory", accuracy:88, lastRun:"2 hrs ago",  color:"#059669", icon:"🏅" },
        ].map((m,i)=>(
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className="font-bold text-gray-900 text-sm">{m.title}</div>
                <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{m.desc}</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Model Accuracy</span>
                <span className="font-black" style={{color:m.color}}>{m.accuracy}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{width:`${m.accuracy}%`,background:m.color}}/>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Last run: {m.lastRun}</span>
                <AIChip label="Active"/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Injury risk ranking */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-800">Injury Risk Rankings — All Athletes</h2>
            <AIChip label="AI Scored"/>
          </div>
          <div className="flex gap-2">
            <Badge label="High ≥70" color="red"/>
            <Badge label="Medium 40–69" color="amber"/>
            <Badge label="Low <40" color="green"/>
          </div>
        </div>
        <div className="space-y-3">
          {[...ATHLETES_AI].sort((a,b)=>b.injuryRisk-a.injuryRisk).map((a,i)=>(
            <RiskBar key={i} score={a.injuryRisk} label={`${a.name} (${a.sport})`}/>
          ))}
        </div>
      </div>

      {/* Dropout risk + Medal potential side by side */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-base font-bold text-gray-800">Dropout Risk Analysis</h2>
            <AIChip label="AI"/>
          </div>
          <div className="space-y-3">
            {[...ATHLETES_AI].sort((a,b)=>b.dropoutRisk-a.dropoutRisk).map((a,i)=>(
              <RiskBar key={i} score={a.dropoutRisk} label={`${a.name}`}/>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-base font-bold text-gray-800">Medal Potential Rankings</h2>
            <AIChip label="AI Ranked"/>
          </div>
          <div className="space-y-3">
            {[...ATHLETES_AI].sort((a,b)=>b.medalPotential-a.medalPotential).map((a,i)=>(
              <div key={i} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full grid place-items-center text-white text-[10px] font-black shrink-0" style={{background:i===0?"#f97316":i===1?"#6b7280":i===2?"#92400e":PRIMARY}}>
                  {i+1}
                </div>
                <span className="text-xs font-semibold text-gray-700 w-32 truncate">{a.name}</span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${a.medalPotential}%`,background:a.medalPotential>=85?"#059669":a.medalPotential>=70?"#1e3a5f":"#f59e0b"}}/>
                </div>
                <span className="text-xs font-black w-8 text-right" style={{color:a.medalPotential>=85?"#059669":a.medalPotential>=70?"#1e3a5f":"#f59e0b"}}>{a.medalPotential}</span>
                {a.medalPotential>=85&&<Badge label="Trial Ready" color="green"/>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 4 — COACH PERFORMANCE ANALYTICS
═══════════════════════════════════════ */
function ScreenCoachAnalytics() {
  const [selected, setSelected] = useState<number|null>(null);
  const coach = selected!==null ? COACHES_AI[selected] : null;

  return (
    <div className="p-6 flex gap-5">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">Coach Performance Analytics</h1>
            <p className="text-xs text-gray-400 mt-0.5">AI-computed effectiveness scores, athlete improvement rates, compliance</p>
          </div>
          <AIChip label="AI Effectiveness Engine"/>
        </div>

        {/* Top 3 coaches visual */}
        <div className="grid grid-cols-3 gap-4">
          {[...COACHES_AI].sort((a,b)=>b.effectiveness-a.effectiveness).slice(0,3).map((c,i)=>(
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center relative overflow-hidden cursor-pointer hover:shadow-md transition" onClick={()=>setSelected(COACHES_AI.indexOf(c))}>
              {i===0&&<div className="absolute top-3 right-3 text-xl">🥇</div>}
              {i===1&&<div className="absolute top-3 right-3 text-xl">🥈</div>}
              {i===2&&<div className="absolute top-3 right-3 text-xl">🥉</div>}
              <div className="h-16 w-16 rounded-2xl grid place-items-center text-white font-black text-2xl mx-auto mb-3" style={{background:i===0?ACCENT:PRIMARY}}>
                {c.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div className="font-black text-gray-900">{c.name}</div>
              <div className="text-xs text-gray-400 mt-0.5">{c.sport} · {c.district}</div>
              <div className="mt-4 flex justify-center">
                <DonutChart pct={c.effectiveness} color={c.effectiveness>=85?"#059669":PRIMARY} size={72} label="Score"/>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="bg-gray-50 rounded-xl py-1.5">
                  <div className="text-sm font-black text-gray-900">+{c.improvement}%</div>
                  <div className="text-[9px] text-gray-400">Athlete Improv.</div>
                </div>
                <div className="bg-gray-50 rounded-xl py-1.5">
                  <div className="text-sm font-black text-gray-900">{c.attendance}%</div>
                  <div className="text-[9px] text-gray-400">Attendance</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full table */}
        <TableWrap heads={["ID","Coach","Sport","District","Athletes","Effectiveness","Athlete Improv.","Attendance","Plan Adherence","Rating","Trend","Action"]}>
          {[...COACHES_AI].sort((a,b)=>b.effectiveness-a.effectiveness).map((c,i)=>(
            <tr key={i} onClick={()=>setSelected(COACHES_AI.indexOf(c))} className={`cursor-pointer transition ${selected===COACHES_AI.indexOf(c)?"bg-blue-50":c.effectiveness<65?"bg-red-50/40 hover:bg-red-50":"hover:bg-gray-50"}`}>
              <td className="px-5 py-3.5 font-mono text-[10px] text-gray-400">{c.id}</td>
              <td className="px-5 py-3.5 font-bold text-gray-800 text-xs">{c.name}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{c.sport}</td>
              <td className="px-5 py-3.5 text-xs text-gray-500">{c.district}</td>
              <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{c.athletes}</td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${c.effectiveness}%`,background:c.effectiveness>=85?"#059669":c.effectiveness>=70?"#1e3a5f":"#ef4444"}}/>
                  </div>
                  <span className="text-xs font-black" style={{color:c.effectiveness>=85?"#059669":c.effectiveness>=70?"#1e3a5f":"#ef4444"}}>{c.effectiveness}</span>
                </div>
              </td>
              <td className="px-5 py-3.5 text-xs font-bold text-emerald-700">+{c.improvement}%</td>
              <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{c.attendance}%</td>
              <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{c.planAdherence}%</td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s=><Star key={s} className={`h-3 w-3 ${s<=Math.round(c.rating)?"fill-amber-400 text-amber-400":"text-gray-200"}`}/>)}
                  <span className="text-[10px] text-gray-600 ml-1 font-bold">{c.rating}</span>
                </div>
              </td>
              <td className="px-5 py-3.5">
                {c.trend==="up"?<TrendingUp className="h-4 w-4 text-emerald-500"/>:c.trend==="down"?<TrendingDown className="h-4 w-4 text-red-400"/>:<Minus className="h-4 w-4 text-amber-400"/>}
              </td>
              <td className="px-5 py-3.5">
                <div className="w-24 h-8">
                  <Sparkline data={c.sparkData} color={c.trend==="up"?"#059669":c.trend==="down"?"#ef4444":"#f59e0b"} width={96} height={32}/>
                </div>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>

      {coach && (
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Coach Analytics</span>
            <button onClick={()=>setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4"/></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="text-center pb-4 border-b border-gray-100">
              <div className="h-14 w-14 rounded-2xl grid place-items-center text-white font-black text-2xl mx-auto mb-2" style={{background:PRIMARY}}>
                {coach.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div className="font-black text-gray-900">{coach.name}</div>
              <div className="text-xs text-gray-400">{coach.sport} · {coach.district}</div>
              <div className="mt-3 flex justify-center">
                <DonutChart pct={coach.effectiveness} color={coach.effectiveness>=85?"#059669":PRIMARY} size={80} label="Score"/>
              </div>
              <div className="text-xs text-gray-500 mt-2">Effectiveness Score</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Athletes",coach.athletes,"#1e3a5f"],["Improv.",`+${coach.improvement}%`,"#059669"],["Attendance",`${coach.attendance}%`,"#7c3aed"],["Plan Adhere.",`${coach.planAdherence}%`,"#f97316"]].map(([k,v,c])=>(
                <div key={k} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-base font-black" style={{color:c}}>{String(v)}</div>
                  <div className="text-[9px] text-gray-400 font-semibold">{String(k)}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 mb-2">Effectiveness Trend</div>
              <div className="h-16 w-full">
                <Sparkline data={coach.sparkData} color={coach.trend==="up"?"#059669":coach.trend==="down"?"#ef4444":"#f59e0b"} width={272} height={64}/>
              </div>
            </div>
            <button className="w-full h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
              <Download className="h-3.5 w-3.5"/> Download Coach Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 5 — ATTENDANCE MONITOR
═══════════════════════════════════════ */
function ScreenAttendance() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Attendance & Compliance Monitor</h1>
          <p className="text-xs text-gray-400 mt-0.5">Real-time heatmap · 20-day rolling window · AI absenteeism alerts</p>
        </div>
        <div className="flex gap-2">
          <AIChip label="Anomaly Detection Active"/>
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5"/> Export
          </button>
        </div>
      </div>

      {/* Summary donut strip */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label:"Avg Attendance", pct:Math.round(ATHLETES_AI.reduce((a,x)=>a+x.attendance,0)/ATHLETES_AI.length), color:"#1e3a5f" },
          { label:"≥90% Compliant",  pct:Math.round(ATHLETES_AI.filter(a=>a.attendance>=90).length/ATHLETES_AI.length*100), color:"#059669" },
          { label:"60–89% Moderate", pct:Math.round(ATHLETES_AI.filter(a=>a.attendance>=60&&a.attendance<90).length/ATHLETES_AI.length*100), color:"#f59e0b" },
          { label:"<60% Critical",   pct:Math.round(ATHLETES_AI.filter(a=>a.attendance<60).length/ATHLETES_AI.length*100), color:"#ef4444" },
        ].map((d,i)=>(
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <DonutChart pct={d.pct} color={d.color} size={64} label=""/>
            <div>
              <div className="text-xl font-black" style={{color:d.color}}>{d.pct}%</div>
              <div className="text-xs font-semibold text-gray-400 mt-0.5">{d.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-800">20-Day Attendance Heatmap</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-semibold">
              {[["#ef4444","<30%"],["#f97316","30–50%"],["#fbbf24","50–70%"],["#34d399","70–90%"],["#059669","90–100%"]].map(([c,l])=>(
                <span key={l} className="flex items-center gap-1"><span className="h-3 w-3 rounded-sm" style={{background:c}}/>{l}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Day headers */}
            <div className="flex gap-2 mb-2 ml-28">
              {ATTENDANCE_GRID.days.map((d,i)=>(
                <div key={i} className="h-6 w-6 text-center text-[9px] font-bold text-gray-400">{d}</div>
              ))}
            </div>
            {/* Athlete rows */}
            {ATTENDANCE_GRID.athletes.map((ath,i)=>(
              <div key={i} className="flex items-center gap-2 mb-2">
                <div className="w-24 text-xs font-semibold text-gray-700 truncate">{ath.name}</div>
                <div className="flex gap-2">
                  {ath.vals.map((v,j)=>(
                    v===0?<div key={j} className="h-6 w-6 rounded-md bg-gray-100" title="Rest Day"/>:<HeatCell key={j} value={v}/>
                  ))}
                </div>
                <div className="ml-2 text-xs font-black" style={{color:Math.round(ath.vals.filter(v=>v>0).reduce((a,x)=>a+x,0)/ath.vals.filter(v=>v>0).length)>=85?"#059669":"#ef4444"}}>
                  {Math.round(ath.vals.filter(v=>v>0).reduce((a,x)=>a+x,0)/ath.vals.filter(v=>v>0).length)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance alerts */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-bold text-gray-800">AI Absenteeism Alerts</h2>
          <AIChip label="Auto-detected"/>
        </div>
        <div className="space-y-3">
          {ATHLETES_AI.filter(a=>a.attendance<85).map((a,i)=>(
            <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border ${a.attendance<65?"border-red-200 bg-red-50":"border-amber-200 bg-amber-50"}`}>
              <div className="h-9 w-9 rounded-xl grid place-items-center text-white text-xs font-black shrink-0" style={{background:a.attendance<65?"#ef4444":"#f59e0b"}}>
                {a.attendance}%
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 text-xs">{a.name} — {a.sport}</div>
                <div className={`text-[11px] mt-0.5 ${a.attendance<65?"text-red-600":"text-amber-600"}`}>
                  {a.attendance<65?"Critical attendance — risk of disqualification":"Moderate — below 85% threshold"}. Coach: {a.coach}
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button className="h-7 px-2.5 rounded-lg text-[10px] font-bold text-white" style={{background:a.attendance<65?"#ef4444":"#f59e0b"}}>Alert Coach</button>
                <button className="h-7 px-2.5 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-600 hover:bg-white transition">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 6 — RECOMMENDATIONS ENGINE
═══════════════════════════════════════ */
function ScreenRecommendations() {
  const [recs, setRecs] = useState(RECOMMENDATIONS);
  const act = (id:string, action:"Accepted"|"Dismissed") => setRecs(r=>r.map(x=>x.id===id?{...x,status:action}:x));

  const priColor: Record<string,string> = { High:"red", Medium:"amber", Low:"blue" };
  const tabs = ["All","Pending","Accepted","Dismissed"] as const;
  const [tab, setTab] = useState<typeof tabs[number]>("All");

  const filtered = recs.filter(r=>tab==="All"||r.status===tab||(tab==="Pending"&&r.status==="Pending"));

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">AI Recommendations Engine</h1>
          <p className="text-xs text-gray-400 mt-0.5">AI-generated interventions — accept to log, dismiss to archive with reason</p>
        </div>
        <AIChip label={`${recs.filter(r=>r.status==="Pending").length} Pending AI Actions`}/>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[["Total Recommendations",recs.length,"#1e3a5f"],["Pending Action",recs.filter(r=>r.status==="Pending").length,"#f59e0b"],["Accepted",recs.filter(r=>r.status==="Accepted").length,"#059669"],["Dismissed",recs.filter(r=>r.status==="Dismissed").length,"#6b7280"]].map(([l,v,c])=>(
          <div key={l as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 text-center">
            <div className="text-2xl font-black" style={{color:c as string}}>{v as number}</div>
            <div className="text-xs font-semibold text-gray-400 mt-0.5">{l as string}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-0.5 bg-gray-100 rounded-xl p-1 w-fit">
        {tabs.map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${tab===t?"bg-white text-gray-900 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((r,i)=>(
          <div key={i} className={`bg-white rounded-2xl border shadow-sm p-5 transition ${r.status==="Pending"?"border-gray-200":r.status==="Accepted"?"border-emerald-200":"border-gray-100 opacity-60"}`}>
            <div className="flex items-start gap-4">
              <div className="text-3xl shrink-0">{r.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className="font-black text-gray-900 text-sm">{r.type}</span>
                  <Badge label={r.priority} color={priColor[r.priority]}/>
                  <Badge label={`For: ${r.athlete}`} color="navy"/>
                  <AIChip label="AI Generated"/>
                  {r.status!=="Pending"&&<Badge label={r.status} color={r.status==="Accepted"?"green":"gray"}/>}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{r.message}</p>
              </div>
              {r.status==="Pending"&&(
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={()=>act(r.id,"Accepted")}
                    className="h-8 px-4 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition flex items-center gap-1.5">
                    <ThumbsUp className="h-3.5 w-3.5"/> {r.action}
                  </button>
                  <button onClick={()=>act(r.id,"Dismissed")}
                    className="h-8 px-4 rounded-xl border border-gray-200 text-gray-500 text-xs font-bold hover:bg-gray-50 transition flex items-center gap-1.5">
                    <ThumbsDown className="h-3.5 w-3.5"/> Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 7 — PROGRAM EFFECTIVENESS
═══════════════════════════════════════ */
function ScreenPrograms() {
  const PROGRAMS = [
    { name:"Balewadi Elite Track Program",   sport:"Athletics",  centre:"Shiv Chhatrapati Complex", athletes:28, stateLevel:18, national:8, intl:2, coach:"Ramesh Kumar",   effectiveness:91, duration:"12 months", cost:"₹8.4L" },
    { name:"Maharashtra Wrestling Academy",   sport:"Wrestling",  centre:"Kolhapur Academy",          athletes:16, stateLevel:12, national:7, intl:3, coach:"Anil Wagh",     effectiveness:88, duration:"18 months", cost:"₹6.2L" },
    { name:"Swimming Excellence Programme",  sport:"Swimming",   centre:"Shiv Chhatrapati Complex", athletes:14, stateLevel:9,  national:3, intl:0, coach:"Sanjay Patil",   effectiveness:76, duration:"12 months", cost:"₹5.1L" },
    { name:"Badminton Junior Academy",        sport:"Badminton",  centre:"Aurangabad Academy",        athletes:12, stateLevel:6,  national:1, intl:0, coach:"Meena Raut",    effectiveness:69, duration:"12 months", cost:"₹3.8L" },
    { name:"Nagpur Boxing Programme",         sport:"Boxing",     centre:"Nagpur Sports Centre",      athletes:18, stateLevel:8,  national:2, intl:0, coach:"Vijay Kale",    effectiveness:61, duration:"12 months", cost:"₹4.5L" },
    { name:"Sub-Junior Multi-Sport Track",    sport:"Multi",      centre:"Nashik District Academy",   athletes:35, stateLevel:14, national:4, intl:0, coach:"Sunita Bhagat", effectiveness:84, duration:"6 months",  cost:"₹7.2L" },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Training Program Effectiveness</h1>
          <p className="text-xs text-gray-400 mt-0.5">AI-measured programme outcomes — athlete output rate per centre</p>
        </div>
        <AIChip label="AI Analysis Active"/>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {PROGRAMS.map((p,i)=>{
          const outputRate = Math.round(((p.national+p.intl)/p.athletes)*100);
          return (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-4">
                  <div className="font-black text-gray-900 text-sm leading-tight">{p.name}</div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge label={p.sport} color="navy"/>
                    <span className="text-[11px] text-gray-400">📍 {p.centre}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <DonutChart pct={p.effectiveness} color={p.effectiveness>=85?"#059669":p.effectiveness>=70?"#1e3a5f":"#ef4444"} size={60} label=""/>
                  <div className="text-[9px] text-gray-400 text-center mt-1">Effectiveness</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                {[["Total",p.athletes,"#6b7280"],["State",p.stateLevel,"#1e3a5f"],["National",p.national,"#7c3aed"],["Intl.",p.intl,"#f97316"]].map(([l,v,c])=>(
                  <div key={l} className="bg-gray-50 rounded-xl py-2">
                    <div className="text-base font-black" style={{color:c}}>{v}</div>
                    <div className="text-[9px] text-gray-400 font-semibold uppercase">{l}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 font-medium">National+ Output Rate</span>
                  <span className="font-black" style={{color:outputRate>=20?"#059669":outputRate>=10?"#f59e0b":"#ef4444"}}>{outputRate}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${outputRate}%`,background:outputRate>=20?"#059669":outputRate>=10?"#f59e0b":"#ef4444"}}/>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 text-[11px] text-gray-400">
                <span>👨‍🏫 {p.coach}</span>
                <span>⏱ {p.duration}</span>
                <span>💰 {p.cost}/yr</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCREEN 8 — REPORTS & AI NARRATIVES
═══════════════════════════════════════ */
function ScreenReports() {
  const REPORTS = [
    { name:"Executive Performance Summary",  desc:"AI narrative: top performers, risks, recommendations — ministry-ready",  icon:Brain,     color:AI_COLOR,  period:"Monthly"     },
    { name:"Athlete Development Report",     desc:"Individual progress, PB trends, benchmark comparison per athlete",       icon:Users,     color:PRIMARY,   period:"Quarterly"   },
    { name:"Coach Effectiveness Report",     desc:"All coaches ranked by AI effectiveness score with rationale",            icon:Star,      color:ACCENT,    period:"Monthly"     },
    { name:"Injury Risk Analysis Report",    desc:"District-wise injury risk distribution and prevention recommendations",   icon:AlertTriangle,color:"#ef4444",period:"Weekly"    },
    { name:"Dropout Risk Report",            desc:"Athletes flagged for dropout risk with intervention suggestions",         icon:TrendingDown,color:"#f59e0b",period:"Weekly"    },
    { name:"Medal Potential Pipeline",       desc:"Top 20 athletes by AI medal score — trial nomination list",              icon:Award,     color:"#059669", period:"Quarterly"  },
    { name:"Program ROI Report",             desc:"Cost per state/national athlete produced per training programme",         icon:BarChart3, color:"#7c3aed", period:"Quarterly"  },
    { name:"Attendance & Compliance Report", desc:"Heatmap export, absenteeism analysis, district compliance rates",        icon:Activity,  color:PRIMARY,   period:"Monthly"     },
    { name:"AI Model Performance Report",    desc:"Accuracy metrics, drift analysis, retraining recommendations",           icon:Cpu,       color:AI_COLOR,  period:"Monthly"     },
  ];

  const NARRATIVE = `🏆 EXECUTIVE SUMMARY — June 2027

Maharashtra Sports AI Platform identified 2 athletes (Rahul Khedkar, Arjun Deshmukh) as immediately trial-eligible with medal potentials of 96 and 87 respectively. Coach Sunita Bhagat and Ramesh Kumar lead effectiveness rankings at 95 and 91.

⚠️ CRITICAL ALERTS
• Omkar Shinde (Boxing, Nagpur) — Injury risk score 82/100. Training suspended. Physiotherapy intervention required within 48 hours.
• Coach Vijay Kale (Boxing) — Effectiveness score dropped to 61. Athlete improvement rate declined 18% over 60 days. Mandatory review scheduled.

📈 POSITIVE TRENDS
• Kavita Patil 400m PB improved from 54.2s → 53.9s — state rank #2. Recommend national trials nomination.
• Overall platform medal potential improved from 72% to 76% this quarter — 5.5% growth.

🧠 AI RECOMMENDATION ACTIONS PENDING: 4 of 7 recommendations require admin action within 72 hours.`;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Reports & AI Narratives</h1>
          <p className="text-xs text-gray-400 mt-0.5">Auto-generated executive reports — AI narrative summaries + data exports</p>
        </div>
        <div className="flex gap-2">
          <AIChip label="AI Narrative Engine"/>
          <button className="h-9 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-400 transition flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5"/> Export All
          </button>
        </div>
      </div>

      {/* AI Narrative preview */}
      <div className="bg-white rounded-2xl border border-violet-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-violet-100" style={{background:"linear-gradient(135deg,#ede9fe,#f5f3ff)"}}>
          <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0" style={{background:AI_COLOR}}>
            <Brain className="h-5 w-5 text-white"/>
          </div>
          <div className="flex-1">
            <div className="font-black text-violet-900 text-sm">AI-Generated Executive Narrative</div>
            <div className="text-[11px] text-violet-600 mt-0.5">Auto-compiled from all platform data · Updated 2 hours ago</div>
          </div>
          <div className="flex gap-2">
            <button className="h-8 px-3 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5"/> Download PDF
            </button>
            <button className="h-8 px-3 rounded-xl border border-violet-300 text-violet-700 text-xs font-bold hover:bg-violet-50 transition flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5"/> Regenerate
            </button>
          </div>
        </div>
        <div className="p-5">
          <pre className="text-xs text-gray-700 leading-relaxed font-sans whitespace-pre-wrap">{NARRATIVE}</pre>
        </div>
      </div>

      {/* Report cards */}
      <div className="grid grid-cols-3 gap-4">
        {REPORTS.map((r,i)=>(
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition cursor-pointer group">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl grid place-items-center shrink-0" style={{background:`${r.color}15`}}>
                <r.icon className="h-5 w-5" style={{color:r.color}}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 text-sm leading-tight">{r.name}</div>
                <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{r.desc}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{r.period}</span>
              <button className="h-7 px-3 rounded-lg text-white text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition" style={{background:r.color}}>
                <Download className="h-3 w-3"/> Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   AI MAP PORTAL SHELL
═══════════════════════════════════════ */
const AIMAP_NAV = [
  { id:"dashboard",       label:"AI Dashboard",               icon:LayoutDashboard, badge:5 },
  { id:"athletes",        label:"Athlete Performance",        icon:Users,           badge:0 },
  { id:"predictive",      label:"Predictive Insights",        icon:Brain,           badge:0 },
  { id:"coaches",         label:"Coach Analytics",            icon:Star,            badge:0 },
  { id:"attendance",      label:"Attendance Monitor",         icon:Activity,        badge:2 },
  { id:"recommendations", label:"AI Recommendations",         icon:Zap,             badge:4 },
  { id:"programs",        label:"Program Effectiveness",      icon:Target,          badge:0 },
  { id:"reports",         label:"Reports & AI Narratives",    icon:BarChart3,       badge:0 },
];

export function AIMAPPortal({ onBack }: { onBack: () => void }) {
  const [nav, setNav]           = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  function renderScreen() {
    switch (nav) {
      case "dashboard":       return <ScreenDashboard setNav={setNav}/>;
      case "athletes":        return <ScreenAthletes/>;
      case "predictive":      return <ScreenPredictive/>;
      case "coaches":         return <ScreenCoachAnalytics/>;
      case "attendance":      return <ScreenAttendance/>;
      case "recommendations": return <ScreenRecommendations/>;
      case "programs":        return <ScreenPrograms/>;
      case "reports":         return <ScreenReports/>;
      default:                return <ScreenDashboard setNav={setNav}/>;
    }
  }

  const activeLabel = AIMAP_NAV.find(n => n.id === nav)?.label || "AI Dashboard";
  const pendingRecs = RECOMMENDATIONS.filter(r=>r.status==="Pending").length;

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f6fa" }}>
      <aside className={`${collapsed?"w-16":"w-[220px]"} shrink-0 flex flex-col transition-all duration-300 sticky top-0 h-screen z-30 bg-white border-r border-gray-100 shadow-sm`}>
        <div className="flex items-center gap-2.5 px-3 py-4 border-b border-gray-100 min-h-[64px]">
          <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0 text-white" style={{background:`linear-gradient(135deg,${PRIMARY},${AI_COLOR})`}}>
            <Brain className="h-5 w-5"/>
          </div>
          {!collapsed&&(
            <div className="min-w-0">
              <div className="font-black text-gray-900 text-sm leading-none">AI MAP Portal</div>
              <div className="text-[10px] text-gray-400 mt-0.5">AI Analytics Platform</div>
            </div>
          )}
          <button onClick={()=>setCollapsed(c=>!c)} className="ml-auto text-gray-300 hover:text-gray-600 transition shrink-0">
            <ChevronRight className={`h-4 w-4 transition-transform ${collapsed?"":"rotate-180"}`}/>
          </button>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
          {AIMAP_NAV.map(item=>(
            <button key={item.id} onClick={()=>setNav(item.id)} title={collapsed?item.label:undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all ${nav===item.id?"text-white shadow-sm":"text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
              style={nav===item.id?{background:`linear-gradient(135deg,${PRIMARY},${AI_COLOR})`}:{}}>
              <item.icon className="h-4 w-4 shrink-0"/>
              {!collapsed&&<span className="flex-1 text-left text-xs truncate">{item.label}</span>}
              {!collapsed&&item.badge>0&&(
                <span className={`h-5 min-w-5 px-1 rounded-full text-[10px] font-black grid place-items-center ${nav===item.id?"bg-white/20 text-white":"bg-orange-100 text-orange-600"}`}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {!collapsed&&(
          <div className="mx-2 mb-2 p-3 rounded-xl border border-violet-200 bg-violet-50">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse"/>
              <span className="text-[10px] font-bold text-violet-700">AI Engine Active</span>
            </div>
            <div className="text-[10px] text-violet-600">Models running · 88% accuracy · {pendingRecs} actions pending</div>
          </div>
        )}

        <div className="p-2 border-t border-gray-100">
          <button onClick={onBack} title={collapsed?"Back to Admin":undefined}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-xs font-semibold text-white transition hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg,#363092,#1e2a7a)" }}>
            <LogOut className="h-4 w-4 shrink-0"/>
            {!collapsed&&<span>Back to Admin</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar with AI branding */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-4 sticky top-0 z-20 shadow-sm">
          <img src={mhSeal} alt="MH Seal" className="h-8 w-auto object-contain shrink-0"/>
          <div className="h-5 w-px bg-gray-200"/>
          {nav!=="dashboard"&&(
            <button onClick={()=>setNav("dashboard")} className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition shrink-0">
              <ArrowLeft className="h-3.5 w-3.5"/> Back
            </button>
          )}
          <div className="text-sm text-gray-500">
            <span className="font-black text-gray-900 cursor-pointer hover:text-blue-600 transition" onClick={()=>setNav("dashboard")}>AI MAP Portal</span>
            <ChevronRight className="inline h-3.5 w-3.5 mx-1 text-gray-300"/>
            <span className="font-semibold">{activeLabel}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {/* AI status chip */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold" style={{borderColor:`${AI_COLOR}40`,background:`${AI_COLOR}08`,color:AI_COLOR}}>
              <div className="h-1.5 w-1.5 rounded-full animate-pulse" style={{background:AI_COLOR}}/>
              <Brain className="h-3.5 w-3.5"/>
              AI Engine Active · 88% accuracy
            </div>
            <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
              {["EN","HI","MR"].map(l=>(
                <button key={l} className={`px-2 py-1 rounded text-[11px] font-bold transition ${l==="EN"?"bg-white shadow-sm":"text-gray-400"}`}>{l}</button>
              ))}
            </div>
            <button className="relative h-8 w-8 rounded-xl border border-gray-200 grid place-items-center text-gray-500 hover:border-blue-400 transition">
              <Bell className="h-4 w-4"/>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[8px] font-black grid place-items-center">{pendingRecs}</span>
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

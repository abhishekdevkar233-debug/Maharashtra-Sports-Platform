import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionWrap } from "@/components/layout/PageShell";
import { useState, useRef, useEffect } from "react";
import { Search, X, ChevronRight, Clock, MapPin, Trophy, BarChart2, User, Calendar, ArrowLeft } from "lucide-react";
import puneImg from "@/assets/teams/pune.png";
import mumbaiImg from "@/assets/teams/mumbai.png";
import vidarbhaImg from "@/assets/teams/vidarbha.png";
import nagpurImg from "@/assets/teams/nagpur.png";
import nashikImg from "@/assets/teams/nashik.png";
import kolhapurImg from "@/assets/teams/kolhapur.png";
import aurangabadImg from "@/assets/teams/aurangabad.png";

export const Route = createFileRoute("/live-scores")({
  head: () => ({ meta: [{ title: "Live Scores" }] }),
  component: Page,
});

const TEAM_LOGOS: Record<string, string> = {
  "Pune Warriors": puneImg, "Mumbai Tigers": mumbaiImg,
  "Vidarbha": vidarbhaImg, "Mumbai": mumbaiImg,
  "Nagpur FC": nagpurImg, "Nashik United": nashikImg,
  "Kolhapur": kolhapurImg, "Aurangabad": aurangabadImg,
  "Pune": puneImg, "Nashik": nashikImg, "Nagpur": nagpurImg,
};

type Player = { name:string; runs?:number; balls?:number; wickets?:number; overs?:number; runs_given?:number; };
type Innings = { team:string; score:string; overs?:string; players:Player[] };
type ScoreCard = { innings?:Innings[]; events?:{min:number;event:string;player:string;team:string}[]; raids?:{team:string;points:number;tackles:number}[] };
type Match = { id:number; sport:string; a:string; b:string; score:string; venue:string; status:"LIVE"|"Upcoming"|"Completed"; date:string; time?:string; liveMin?:string; tournament:string; scorecard:ScoreCard };

const MATCHES: Match[] = [
  { id:1, sport:"Kabaddi", a:"Pune Warriors", b:"Mumbai Tigers", score:"32 – 28", venue:"Balewadi Indoor Stadium, Pune", status:"LIVE", date:"26 Jun 2026", liveMin:"2nd Half · 18 min", tournament:"Maharashtra Kabaddi League",
    scorecard:{ raids:[{team:"Pune Warriors",points:32,tackles:12},{team:"Mumbai Tigers",points:28,tackles:10}] }},
  { id:2, sport:"Cricket", a:"Vidarbha", b:"Mumbai", score:"186/4", venue:"Wankhede Stadium, Mumbai", status:"LIVE", date:"26 Jun 2026", liveMin:"32.2 overs", tournament:"Ranji Trophy 2026",
    scorecard:{ innings:[
      { team:"Vidarbha", score:"186/4", overs:"32.2", players:[
        {name:"Faiz Fazal",runs:54,balls:80},{name:"Akshay Wadkar*",runs:41,balls:60},{name:"Yash Thakur",runs:35,balls:55},{name:"Sanjay Ramaswamy",runs:28,balls:42},{name:"Umesh Yadav",runs:18,balls:22}]},
      { team:"Mumbai Bowlers", score:"—", overs:"32.2", players:[
        {name:"Shardul Thakur",wickets:2,overs:8,runs_given:38},{name:"Mohit Avasthi",wickets:1,overs:7,runs_given:31},{name:"Royston Dias",wickets:1,overs:6,runs_given:29},{name:"Shams Mulani",wickets:0,overs:6,runs_given:45}]}
    ]}},
  { id:3, sport:"Football", a:"Nagpur FC", b:"Nashik United", score:"2 – 1", venue:"Kalyani Nagar Ground, Pune", status:"LIVE", date:"26 Jun 2026", liveMin:"67'", tournament:"Maharashtra Football Cup",
    scorecard:{ events:[
      {min:12,event:"⚽ Goal",player:"Ravi Sharma",team:"Nagpur FC"},{min:28,event:"🟨 Yellow Card",player:"Ankit Patil",team:"Nashik United"},
      {min:34,event:"⚽ Goal",player:"Suresh Kamble",team:"Nashik United"},{min:51,event:"⚽ Goal",player:"Pradeep More",team:"Nagpur FC"},{min:63,event:"🔄 Sub",player:"Vijay Thoke",team:"Nagpur FC"}]}},
  { id:4, sport:"Hockey", a:"Kolhapur", b:"Aurangabad", score:"3 – 2", venue:"Major Dhyan Chand Hockey Ground", status:"LIVE", date:"26 Jun 2026", liveMin:"Q3 · 42'", tournament:"State Hockey Championship",
    scorecard:{ events:[
      {min:5,event:"🏑 Goal",player:"Sagar Patil",team:"Kolhapur"},{min:18,event:"🏑 Goal",player:"Ravi More",team:"Aurangabad"},
      {min:27,event:"🏑 PC Goal",player:"Akash Koli",team:"Kolhapur"},{min:35,event:"🏑 Goal",player:"Nilesh Desai",team:"Aurangabad"},{min:41,event:"🏑 Goal",player:"Sagar Patil",team:"Kolhapur"}]}},
  { id:5, sport:"Athletics", a:"Pune", b:"Nashik", score:"—", venue:"Balewadi Athletic Track, Pune", status:"Upcoming", date:"28 Jun 2026", time:"09:00 AM", tournament:"State Athletics Championship", scorecard:{} },
  { id:6, sport:"Wrestling", a:"Kolhapur", b:"Nagpur", score:"—", venue:"Kolhapur Akhada", status:"Upcoming", date:"29 Jun 2026", time:"11:00 AM", tournament:"State Wrestling Championship", scorecard:{} },
  { id:7, sport:"Badminton", a:"Mumbai", b:"Pune Warriors", score:"—", venue:"Balewadi Indoor Hall, Pune", status:"Upcoming", date:"30 Jun 2026", time:"02:00 PM", tournament:"Badminton State Open", scorecard:{} },
  { id:8, sport:"Cricket", a:"Mumbai", b:"Pune", score:"Mumbai won by 45 runs", venue:"Wankhede Stadium, Mumbai", status:"Completed", date:"24 Jun 2026", tournament:"Ranji Trophy 2026",
    scorecard:{ innings:[
      { team:"Mumbai", score:"312/8 (50 ov)", players:[
        {name:"Prithvi Shaw",runs:87,balls:92},{name:"Suryakumar Yadav",runs:74,balls:58},{name:"Shreyas Iyer",runs:55,balls:61},{name:"Sarfaraz Khan",runs:40,balls:38}]},
      { team:"Pune", score:"267/10 (47.3 ov)", players:[
        {name:"Rahul Tripathi",runs:72,balls:88},{name:"Venugopal Rao",runs:54,balls:67},{name:"Kedar Jadhav",runs:38,balls:40},{name:"Abhijeet Tomar",runs:31,balls:35}]}
    ]}},
  { id:9, sport:"Kabaddi", a:"Nashik United", b:"Aurangabad", score:"42 – 35", venue:"Nashik Indoor Stadium", status:"Completed", date:"23 Jun 2026", tournament:"Maharashtra Kabaddi League",
    scorecard:{ raids:[{team:"Nashik United",points:42,tackles:16},{team:"Aurangabad",points:35,tackles:13}] }},
  { id:10, sport:"Football", a:"Mumbai Tigers", b:"Kolhapur", score:"3 – 1", venue:"Mumbai Football Arena", status:"Completed", date:"22 Jun 2026", tournament:"Maharashtra Football Cup",
    scorecard:{ events:[
      {min:8,event:"⚽ Goal",player:"Ronit Shah",team:"Mumbai Tigers"},{min:31,event:"⚽ Goal",player:"Amol Patil",team:"Kolhapur"},
      {min:55,event:"⚽ Goal",player:"Vikram Naik",team:"Mumbai Tigers"},{min:78,event:"⚽ Goal",player:"Ronit Shah",team:"Mumbai Tigers"},{min:88,event:"🟥 Red Card",player:"Deepak More",team:"Kolhapur"}]}},
];

const SPORTS = ["All Sports","Cricket","Kabaddi","Football","Hockey","Athletics","Wrestling","Badminton"];

function TeamLogo({ name, size="md" }: { name:string; size?:"sm"|"md"|"lg" }) {
  const src = TEAM_LOGOS[name];
  const sz = size==="sm"?"h-10 w-10":size==="lg"?"h-20 w-20":"h-14 w-14";
  return src ? (
    <img src={src} alt={name} className={`${sz} rounded-full object-contain bg-gray-50 border border-gray-100 p-1 shadow-sm`}/>
  ) : (
    <div className={`${sz} rounded-full bg-[#363092]/10 grid place-items-center text-sm font-bold text-[#363092]`}>
      {name.slice(0,2).toUpperCase()}
    </div>
  );
}

function InlineScorecard({ match, onBack }: { match:Match; onBack:()=>void }) {
  const [tab, setTab] = useState<"scorecard"|"timeline"|"stats">("scorecard");
  const sc = match.scorecard;
  const hasScorecard = sc.innings && sc.innings.length>0;
  const hasTimeline = sc.events && sc.events.length>0;
  const hasRaids = sc.raids && sc.raids.length>0;

  return (
    <div className="rounded-2xl border border-[#363092]/20 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6" style={{background:"linear-gradient(135deg,#363092,#1a1464)"}}>
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">{match.tournament}</p>
            <p className="text-xs text-white/60 mt-0.5 flex items-center gap-1.5"><MapPin className="h-3 w-3"/>{match.venue}</p>
          </div>
          <div className="flex items-center gap-2">
            {match.status==="LIVE" ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500 text-white text-[11px] font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"/> LIVE · {match.liveMin}
              </span>
            ) : match.status==="Completed" ? (
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold">Full Time</span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold">{match.time}</span>
            )}
            <button onClick={onBack} className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white transition">
              <X className="h-4 w-4"/>
            </button>
          </div>
        </div>
        {/* Teams + Score */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-col items-center gap-2 flex-1">
            <TeamLogo name={match.a} size="lg"/>
            <span className="text-white font-bold text-sm text-center">{match.a}</span>
          </div>
          <div className="px-6 text-center">
            {match.status==="Upcoming" ? (
              <div>
                <div className="text-3xl font-black text-white/40">VS</div>
                <div className="text-xs text-white/50 mt-1 flex items-center justify-center gap-1"><Calendar className="h-3 w-3"/>{match.date} · {match.time}</div>
              </div>
            ) : (
              <div className="text-3xl font-black text-white tracking-wide">{match.score}</div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <TeamLogo name={match.b} size="lg"/>
            <span className="text-white font-bold text-sm text-center">{match.b}</span>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-[#363092] hover:text-[#FF6B35] transition">
          <ArrowLeft className="h-4 w-4"/> Back to all matches
        </button>
        <span className="text-xs text-gray-400">{match.sport} · {match.date}</span>
      </div>

      {/* Tabs */}
      {match.status!=="Upcoming" && (
        <div className="flex border-b border-gray-200 px-6">
          {["scorecard","timeline","stats"].map(t=>(
            <button key={t} onClick={()=>setTab(t as typeof tab)}
              className={`px-4 py-3 text-sm font-semibold capitalize border-b-2 transition ${tab===t?"border-[#363092] text-[#363092]":"border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t==="scorecard"?"Scorecard":t==="timeline"?"Timeline / Events":"Stats"}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {match.status==="Upcoming" && (
          <div className="text-center py-16 text-gray-400">
            <Clock className="h-14 w-14 mx-auto mb-3 text-gray-200"/>
            <p className="font-semibold text-lg">Match hasn't started yet</p>
            <p className="text-sm mt-1">Check back on {match.date} at {match.time}</p>
          </div>
        )}

        {match.status!=="Upcoming" && tab==="scorecard" && (
          <>
            {hasScorecard && sc.innings!.map((inn,idx)=>(
              <div key={idx} className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TeamLogo name={inn.team} size="sm"/>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{inn.team}</p>
                      {inn.overs && <p className="text-xs text-gray-500">{inn.overs} ov</p>}
                    </div>
                  </div>
                  <span className="text-2xl font-black text-[#363092]">{inn.score}</span>
                </div>
                <div className="rounded-xl border border-gray-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                      <th className="text-left px-4 py-2.5 font-bold">Player</th>
                      {inn.players[0]?.runs!==undefined && <><th className="text-center px-3 py-2.5 font-bold">R</th><th className="text-center px-3 py-2.5 font-bold">B</th></>}
                      {inn.players[0]?.wickets!==undefined && <><th className="text-center px-3 py-2.5 font-bold">W</th><th className="text-center px-3 py-2.5 font-bold">Ov</th><th className="text-center px-3 py-2.5 font-bold">R</th></>}
                    </tr></thead>
                    <tbody>
                      {inn.players.map((p,i)=>(
                        <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-2.5 font-medium text-gray-900">
                            <div className="flex items-center gap-2"><User className="h-3.5 w-3.5 text-gray-300 shrink-0"/>{p.name}</div>
                          </td>
                          {p.runs!==undefined && <><td className="text-center px-3 py-2.5 font-bold text-gray-900">{p.runs}</td><td className="text-center px-3 py-2.5 text-gray-500">{p.balls}</td></>}
                          {p.wickets!==undefined && <><td className="text-center px-3 py-2.5 font-bold text-[#363092]">{p.wickets}</td><td className="text-center px-3 py-2.5 text-gray-500">{p.overs}</td><td className="text-center px-3 py-2.5 text-gray-500">{p.runs_given}</td></>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            {hasRaids && sc.raids!.map((r,i)=>(
              <div key={i} className="mb-4 rounded-xl border border-gray-100 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TeamLogo name={r.team} size="sm"/>
                  <span className="font-bold text-gray-900">{r.team}</span>
                </div>
                <div className="flex gap-8">
                  <div className="text-center"><div className="text-3xl font-black text-[#363092]">{r.points}</div><div className="text-[10px] text-gray-400 uppercase mt-0.5">Points</div></div>
                  <div className="text-center"><div className="text-3xl font-black text-[#FF6B35]">{r.tackles}</div><div className="text-[10px] text-gray-400 uppercase mt-0.5">Tackles</div></div>
                </div>
              </div>
            ))}
            {!hasScorecard && !hasRaids && (
              <div className="text-center py-16 text-gray-400">
                <BarChart2 className="h-12 w-12 mx-auto mb-3 text-gray-200"/>
                <p>Scorecard not available yet</p>
              </div>
            )}
          </>
        )}

        {match.status!=="Upcoming" && tab==="timeline" && (
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-100"/>
            {hasTimeline ? sc.events!.map((ev,i)=>(
              <div key={i} className="relative mb-4 last:mb-0">
                <div className="absolute -left-[18px] h-4 w-4 rounded-full bg-[#363092] grid place-items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-white"/>
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 hover:border-[#363092]/30 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#363092]">{ev.min}'</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{background:"#36309218",color:"#363092"}}>{ev.team}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{ev.event}</p>
                  <p className="text-xs text-gray-500">{ev.player}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-16 text-gray-400">
                <Clock className="h-12 w-12 mx-auto mb-3 text-gray-200"/>
                <p>No timeline events available</p>
              </div>
            )}
          </div>
        )}

        {match.status!=="Upcoming" && tab==="stats" && (
          <div className="space-y-4">
            {[
              {label:"Possession / Raids",   a:54, b:46, unit:"%"},
              {label:"Shots / Successful Raids", a:8, b:5, unit:""},
              {label:"Corners / Super Raids", a:4, b:2, unit:""},
              {label:"Fouls / Touches",       a:11, b:14, unit:""},
            ].map(stat=>{
              const total = stat.a+stat.b;
              const pctA = total>0?(stat.a/total)*100:50;
              return (
                <div key={stat.label} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-[#363092]">{stat.a}{stat.unit}</span>
                    <span className="text-gray-500 uppercase tracking-wider">{stat.label}</span>
                    <span className="text-[#FF6B35]">{stat.b}{stat.unit}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden flex">
                    <div className="h-full rounded-l-full bg-[#363092] transition-all" style={{width:`${pctA}%`}}/>
                    <div className="h-full rounded-r-full bg-[#FF6B35] transition-all" style={{width:`${100-pctA}%`}}/>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                    <span>{match.a}</span><span>{match.b}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function MatchCard({ match, onClick }: { match:Match; onClick:()=>void }) {
  return (
    <div onClick={onClick} className="group rounded-2xl border border-gray-200 p-5 bg-white hover:shadow-lg hover:border-[#363092] transition-all duration-200 cursor-pointer">
      <div className="flex justify-between text-xs mb-4">
        <div>
          <span className="font-semibold text-[#363092]">{match.sport}</span>
          <span className="text-gray-400"> · </span>
          <span className="text-gray-500">{match.venue.split(",")[0]}</span>
        </div>
        {match.status==="LIVE" ? (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-[11px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse inline-block"/> LIVE
          </span>
        ) : match.status==="Upcoming" ? (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold">
            <Clock className="h-3 w-3"/> {match.time}
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold">Full Time</span>
        )}
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <TeamLogo name={match.a}/>
          <span className="font-semibold text-sm text-center text-gray-900 leading-tight">{match.a}</span>
        </div>
        {match.status==="Upcoming" ? (
          <div className="text-center px-4 shrink-0">
            <div className="text-2xl font-black text-gray-300">VS</div>
            <div className="text-[10px] text-gray-400 mt-1">{match.date}</div>
          </div>
        ) : (
          <div className="text-xl font-black text-[#363092] px-4 shrink-0 text-center">
            {match.score}
            {match.status==="LIVE" && <div className="text-[10px] text-gray-400 font-normal mt-0.5">{match.liveMin}</div>}
          </div>
        )}
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <TeamLogo name={match.b}/>
          <span className="font-semibold text-sm text-center text-gray-900 leading-tight">{match.b}</span>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[11px] text-gray-400 flex items-center gap-1"><Trophy className="h-3 w-3"/>{match.tournament}</span>
        <span className="text-xs font-semibold text-[#363092] flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
          {match.status==="Upcoming"?"Details":"View Scorecard"} <ChevronRight className="h-3.5 w-3.5"/>
        </span>
      </div>
    </div>
  );
}

function Page() {
  const [activeTab, setActiveTab] = useState<"LIVE"|"Upcoming"|"Completed">("LIVE");
  const [activeSport, setActiveSport] = useState("All Sports");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Match|null>(null);
  const scorecardRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if (selected && scorecardRef.current) {
      setTimeout(()=>scorecardRef.current!.scrollIntoView({behavior:"smooth",block:"start"}),50);
    }
  },[selected]);

  const tabs: Array<"LIVE"|"Upcoming"|"Completed"> = ["LIVE","Upcoming","Completed"];
  const tabCount = (t: typeof activeTab) => MATCHES.filter(m=>m.status===t).length;

  const filtered = MATCHES.filter(m=>{
    if (m.status!==activeTab) return false;
    if (activeSport!=="All Sports" && m.sport!==activeSport) return false;
    const q = search.toLowerCase();
    if (q) return m.a.toLowerCase().includes(q)||m.b.toLowerCase().includes(q)||m.sport.toLowerCase().includes(q)||m.tournament.toLowerCase().includes(q)||m.venue.toLowerCase().includes(q);
    return true;
  });

  return (
    <>
      <PageHero eyebrow="Tournaments" title="Live Scores" subtitle="Real-time scores, scorecards and match history from competitions across Maharashtra."/>
      <SectionWrap>

        {!selected && (
          <>
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit mb-6">
              {tabs.map(t=>(
                <button key={t} onClick={()=>setActiveTab(t)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab===t?"bg-white shadow text-[#363092]":"text-gray-500 hover:text-gray-700"}`}>
                  {t==="LIVE" && activeTab==="LIVE" && <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"/>}
                  {t}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${activeTab===t?"bg-[#363092] text-white":"bg-gray-200 text-gray-500"}`}>{tabCount(t)}</span>
                </button>
              ))}
            </div>

            {/* Search + Sport Filter */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                <input value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Search team, sport, tournament…"
                  className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 text-sm focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/10 outline-none"/>
                {search && <button onClick={()=>setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="h-3.5 w-3.5"/></button>}
              </div>
              <div className="flex flex-wrap gap-2">
                {SPORTS.map(s=>(
                  <button key={s} onClick={()=>setActiveSport(s)}
                    className={`px-3 h-10 rounded-xl border text-xs font-semibold transition ${activeSport===s?"bg-[#363092] text-white border-[#363092]":"border-gray-200 text-gray-600 hover:border-[#363092]"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{filtered.length}</span> {activeTab==="LIVE"?"live":activeTab==="Upcoming"?"upcoming":"completed"} matches
              </p>
              {activeTab==="Completed" && <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="h-3 w-3"/> Historical data — last 7 days</span>}
            </div>

            {filtered.length>0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map(m=><MatchCard key={m.id} match={m} onClick={()=>setSelected(m)}/>)}
              </div>
            ) : (
              <div className="py-20 text-center">
                <Search className="h-12 w-12 text-gray-200 mx-auto mb-4"/>
                <p className="text-lg font-semibold text-gray-500">No matches found</p>
                <p className="text-sm text-gray-400 mt-1">Try a different search or sport filter</p>
                <button onClick={()=>{setSearch("");setActiveSport("All Sports");}}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#363092] text-white text-sm font-semibold hover:bg-[#2a2470] transition">
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        {selected && (
          <div ref={scorecardRef}>
            <InlineScorecard match={selected} onBack={()=>setSelected(null)}/>
          </div>
        )}
      </SectionWrap>
    </>
  );
}

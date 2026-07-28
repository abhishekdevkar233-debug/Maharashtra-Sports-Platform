import { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutDashboard, Video, Upload, Camera, History, Users,
  FileBarChart, Watch, Settings, ArrowLeft, X,
  ChevronRight, Play, Pause, SkipBack, SkipForward, CheckCircle2, Clock, XCircle, Sparkles,
  TrendingUp, Target, Activity, Download, Share2, Film, Zap, Eye,
  ScanFace, Crosshair, Gauge, Navigation2, Footprints, HeartPulse,
  Flame, Timer, ShieldAlert, BarChart3, Save, GitCompareArrows,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

/* ── Theme: dark enterprise sports-analytics (Hudl / Catapult style) ── */
const BG = "#0B1220";
const PANEL = "#111B2E";
const BORDER = "rgba(255,255,255,0.08)";
const NEON_BLUE = "#38BDF8";
const NEON_GREEN = "#34D399";
const TEXT_MUTED = "#8B96AB";

type Section =
  | "dashboard" | "video-analysis" | "workspace" | "athlete-tracking"
  | "reports" | "watch-sync" | "settings";

const NAV: { id: Section; label: string; icon: typeof LayoutDashboard; children?: { id: string; label: string }[] }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "video-analysis", label: "Video Analysis", icon: Video, children: [
    { id: "upload", label: "Upload Video" },
    { id: "live", label: "Live Camera" },
    { id: "history", label: "Analysis History" },
  ] },
  { id: "athlete-tracking", label: "Athlete Tracking", icon: Users },
  { id: "reports", label: "AI Reports", icon: FileBarChart },
  { id: "watch-sync", label: "Smart Watch Sync", icon: Watch },
  { id: "settings", label: "Settings", icon: Settings },
];

const KPIS = [
  { label: "Videos Analyzed", value: "1,284", icon: Film, color: NEON_BLUE },
  { label: "Athletes Tracked", value: "312", icon: Users, color: NEON_GREEN },
  { label: "AI Accuracy", value: "96.4%", icon: Target, color: NEON_BLUE },
  { label: "Reports Generated", value: "428", icon: FileBarChart, color: NEON_GREEN },
  { label: "Active Analyses", value: "6", icon: Activity, color: "#FBBF24" },
];

type AnalysisStatus = "Completed" | "Processing" | "Failed";
type AnalysisRow = { id: string; video: string; sport: string; athlete: string; status: AnalysisStatus; date: string };

const INITIAL_ANALYSES: AnalysisRow[] = [
  { id: "a1", video: "100m_Final_Heat3.mp4", sport: "Athletics", athlete: "Onkar Patil", status: "Completed", date: "27 Jul 2026" },
  { id: "a2", video: "FootballMatch_Q2.mp4", sport: "Football", athlete: "Rohan Deshmukh", status: "Processing", date: "27 Jul 2026" },
  { id: "a3", video: "KabaddiRaid_Session.mp4", sport: "Kabaddi", athlete: "Squad B", status: "Completed", date: "26 Jul 2026" },
  { id: "a4", video: "SwimTrial_Lane4.mp4", sport: "Swimming", athlete: "Manasi Bhosale", status: "Failed", date: "25 Jul 2026" },
  { id: "a5", video: "BasketballDrill_PG.mp4", sport: "Basketball", athlete: "Onkar Patil", status: "Completed", date: "24 Jul 2026" },
];

const DUMMY_ATHLETES = ["Rohan Deshmukh", "Omkar Patil", "Sneha Jadhav", "Manasi Bhosale", "Aditya Pawar"];
const SPORTS = ["Athletics", "Football", "Kabaddi", "Swimming", "Basketball", "Wrestling"];
const CAMERA_ANGLES = ["Side View", "Front View", "Drone (Top-down)", "Broadcast Wide"];

function statusStyle(s: AnalysisStatus) {
  if (s === "Completed") return { color: NEON_GREEN, bg: "rgba(52,211,153,0.12)", icon: CheckCircle2 };
  if (s === "Processing") return { color: "#FBBF24", bg: "rgba(251,191,36,0.12)", icon: Clock };
  return { color: "#F87171", bg: "rgba(248,113,113,0.12)", icon: XCircle };
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl backdrop-blur-sm ${className}`} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}` }}>
      {children}
    </div>
  );
}

/* ── Dashboard ────────────────────────────────────────────────────── */

function Dashboard({ analyses, onGo, onOpenAnalysis }: { analyses: AnalysisRow[]; onGo: (s: Section, sub?: string) => void; onOpenAnalysis: (row: AnalysisRow) => void }) {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="text-[12px] mb-5" style={{ color: TEXT_MUTED }}>
        Home <ChevronRight className="inline h-3 w-3 mx-1" /> <span className="text-white font-medium">AI Vision Analytics</span>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <Sparkles className="h-5 w-5" style={{ color: NEON_BLUE }} />
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: NEON_BLUE }}>Enterprise AI Module</span>
        </div>
        <h1 className="text-3xl font-black text-white leading-tight">AI Vision Analytics</h1>
        <p className="text-sm mt-2 max-w-2xl leading-relaxed" style={{ color: TEXT_MUTED }}>
          Analyze athlete performance using AI-powered video tracking and wearable data integration — upload footage or connect a live feed to generate computer-vision performance insights in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Upload, label: "Upload Video", desc: "Analyze recorded match or training footage", action: () => onGo("video-analysis", "upload") },
          { icon: Camera, label: "Live Camera", desc: "Run real-time AI analysis from a connected camera", action: () => onGo("video-analysis", "live") },
          { icon: History, label: "Analysis History", desc: "Browse and revisit past AI analyses", action: () => onGo("video-analysis", "history") },
        ].map(a => (
          <button key={a.label} onClick={a.action} className="text-left rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 group"
            style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.10), rgba(52,211,153,0.06))", border: `1px solid ${BORDER}` }}>
            <div className="h-11 w-11 rounded-xl grid place-items-center mb-4" style={{ background: "rgba(56,189,248,0.15)" }}>
              <a.icon className="h-5 w-5" style={{ color: NEON_BLUE }} />
            </div>
            <div className="text-white font-bold text-[15px] flex items-center gap-1.5">
              {a.label} <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition" style={{ color: NEON_BLUE }} />
            </div>
            <p className="text-xs mt-1.5 leading-relaxed" style={{ color: TEXT_MUTED }}>{a.desc}</p>
          </button>
        ))}
      </div>

      <div className="mb-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: TEXT_MUTED }}>Quick statistics</div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {KPIS.map(k => (
          <Panel key={k.label} className="p-4">
            <div className="h-9 w-9 rounded-lg grid place-items-center mb-3" style={{ background: `${k.color}22` }}>
              <k.icon className="h-4 w-4" style={{ color: k.color }} />
            </div>
            <div className="text-xl font-black text-white leading-none">{k.value}</div>
            <div className="text-[10.5px] mt-1.5" style={{ color: TEXT_MUTED }}>{k.label}</div>
          </Panel>
        ))}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: TEXT_MUTED }}>Recent analyses</div>
        <button onClick={() => onGo("video-analysis", "history")} className="text-[11px] font-semibold flex items-center gap-1" style={{ color: NEON_BLUE }}>
          View all <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <Panel className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              {["Video", "Sport", "Athlete", "Status", "Date", ""].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide" style={{ color: TEXT_MUTED }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {analyses.slice(0, 5).map(row => {
              const st = statusStyle(row.status);
              return (
                <tr key={row.id} style={{ borderBottom: `1px solid ${BORDER}` }} className="hover:bg-white/[0.03] transition">
                  <td className="px-4 py-3 flex items-center gap-2.5 text-white font-medium">
                    <div className="h-8 w-11 rounded-md grid place-items-center shrink-0" style={{ background: "rgba(56,189,248,0.12)" }}>
                      <Film className="h-3.5 w-3.5" style={{ color: NEON_BLUE }} />
                    </div>
                    <span className="truncate">{row.video}</span>
                  </td>
                  <td className="px-4 py-3" style={{ color: TEXT_MUTED }}>{row.sport}</td>
                  <td className="px-4 py-3" style={{ color: TEXT_MUTED }}>{row.athlete}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full" style={{ color: st.color, background: st.bg }}>
                      <st.icon className="h-3 w-3" /> {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: TEXT_MUTED }}>{row.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      disabled={row.status !== "Completed"}
                      onClick={() => onOpenAnalysis(row)}
                      className="text-[11px] font-semibold px-3 py-1.5 rounded-lg disabled:opacity-30"
                      style={{ color: NEON_BLUE, background: "rgba(56,189,248,0.12)" }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

/* ── Step 1: Upload + Confirm ─────────────────────────────────────── */

type PendingUpload = { file: File; url: string; sport: string; athlete: string; cameraAngle: string; sessionDate: string; duration: string; resolution: string; fps: string; size: string };

function UploadTab({ onLaunch }: { onLaunch: (p: PendingUpload) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [meta, setMeta] = useState<{ duration: string; resolution: string } | null>(null);
  const [sport, setSport] = useState(SPORTS[0]);
  const [athlete, setAthlete] = useState("Auto Detect");
  const [cameraAngle, setCameraAngle] = useState(CAMERA_ANGLES[0]);
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().slice(0, 10));

  function handleFile(f: File | undefined) {
    if (!f) return;
    setFile(f);
    setMeta(null);
    const objUrl = URL.createObjectURL(f);
    setUrl(objUrl);
  }

  function reset() {
    if (url) URL.revokeObjectURL(url);
    setFile(null);
    setUrl("");
    setMeta(null);
  }

  const fps = useMemo(() => (file ? [30, 60][Math.abs(file.name.length) % 2] : 30), [file]);
  const sizeLabel = file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : "";

  if (!file) {
    return (
      <div className="max-w-2xl">
        <label
          className="flex flex-col items-center justify-center gap-3 rounded-2xl py-14 cursor-pointer transition hover:bg-white/[0.03]"
          style={{ border: `1.5px dashed ${BORDER}` }}
        >
          <input type="file" accept="video/*" className="hidden" onChange={e => handleFile(e.target.files?.[0])} />
          <div className="h-14 w-14 rounded-2xl grid place-items-center" style={{ background: "rgba(56,189,248,0.12)" }}>
            <Upload className="h-6 w-6" style={{ color: NEON_BLUE }} />
          </div>
          <div className="text-white font-bold text-sm">Click to select a video file</div>
          <div className="text-[11px]" style={{ color: TEXT_MUTED }}>MP4, MOV up to 2GB</div>
        </label>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: TEXT_MUTED }}>Video preview</div>
          <div className="rounded-2xl overflow-hidden" style={{ background: "#050B14", border: `1px solid ${BORDER}` }}>
            <video
              src={url}
              controls
              className="w-full aspect-video"
              onLoadedMetadata={e => {
                const v = e.currentTarget;
                const mins = Math.floor(v.duration / 60), secs = Math.round(v.duration % 60);
                setMeta({ duration: `${mins}:${secs.toString().padStart(2, "0")}`, resolution: `${v.videoWidth}×${v.videoHeight}` });
              }}
            />
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: TEXT_MUTED }}>File details</div>
          <Panel className="p-4 grid grid-cols-2 gap-y-3 gap-x-4 text-[12px]">
            <div><span style={{ color: TEXT_MUTED }}>File name</span><div className="text-white font-semibold truncate">{file.name}</div></div>
            <div><span style={{ color: TEXT_MUTED }}>File size</span><div className="text-white font-semibold">{sizeLabel}</div></div>
            <div><span style={{ color: TEXT_MUTED }}>Duration</span><div className="text-white font-semibold">{meta?.duration ?? "Loading…"}</div></div>
            <div><span style={{ color: TEXT_MUTED }}>Resolution</span><div className="text-white font-semibold">{meta?.resolution ?? "Loading…"}</div></div>
            <div><span style={{ color: TEXT_MUTED }}>FPS</span><div className="text-white font-semibold">{fps} fps</div></div>
            <div><span style={{ color: TEXT_MUTED }}>Camera angle</span><div className="text-white font-semibold">{cameraAngle}</div></div>
          </Panel>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wide" style={{ color: TEXT_MUTED }}>Sport type</label>
              <select value={sport} onChange={e => setSport(e.target.value)}
                className="w-full h-10 mt-1.5 px-3 rounded-xl text-sm text-white outline-none"
                style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
                {SPORTS.map(s => <option key={s} value={s} style={{ background: PANEL }}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wide" style={{ color: TEXT_MUTED }}>Athlete name</label>
              <select value={athlete} onChange={e => setAthlete(e.target.value)}
                className="w-full h-10 mt-1.5 px-3 rounded-xl text-sm text-white outline-none"
                style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
                <option style={{ background: PANEL }}>Auto Detect</option>
                {DUMMY_ATHLETES.map(a => <option key={a} value={a} style={{ background: PANEL }}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wide" style={{ color: TEXT_MUTED }}>Session date</label>
              <input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)}
                className="w-full h-10 mt-1.5 px-3 rounded-xl text-sm text-white outline-none"
                style={{ background: PANEL, border: `1px solid ${BORDER}`, colorScheme: "dark" }} />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wide" style={{ color: TEXT_MUTED }}>Camera angle</label>
              <select value={cameraAngle} onChange={e => setCameraAngle(e.target.value)}
                className="w-full h-10 mt-1.5 px-3 rounded-xl text-sm text-white outline-none"
                style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
                {CAMERA_ANGLES.map(c => <option key={c} value={c} style={{ background: PANEL }}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button onClick={reset} className="h-12 px-5 rounded-xl font-semibold text-sm" style={{ background: PANEL, color: "white", border: `1px solid ${BORDER}` }}>
              Change Video
            </button>
            <button
              onClick={() => onLaunch({
                file, url, sport, athlete, cameraAngle, sessionDate,
                duration: meta?.duration ?? "0:00", resolution: meta?.resolution ?? "—", fps: `${fps}`, size: sizeLabel,
              })}
              className="flex-1 h-12 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 transition"
              style={{ background: `linear-gradient(135deg, ${NEON_BLUE}, ${NEON_GREEN})`, color: "#06131F" }}
            >
              <Zap className="h-4 w-4" /> Start AI Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveTab() {
  const [live, setLive] = useState(false);
  return (
    <div className="max-w-2xl">
      <div className="rounded-2xl aspect-video grid place-items-center relative overflow-hidden" style={{ background: "#050B14", border: `1px solid ${BORDER}` }}>
        {live ? (
          <>
            <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: "#F87171", background: "rgba(248,113,113,0.15)" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" /> LIVE
            </div>
            <Eye className="h-10 w-10" style={{ color: NEON_BLUE, opacity: 0.4 }} />
          </>
        ) : (
          <div className="text-center">
            <Camera className="h-10 w-10 mx-auto mb-2" style={{ color: TEXT_MUTED }} />
            <div className="text-sm" style={{ color: TEXT_MUTED }}>No camera connected</div>
          </div>
        )}
      </div>
      <button
        onClick={() => setLive(l => !l)}
        className="w-full h-12 rounded-xl font-bold text-sm mt-5 inline-flex items-center justify-center gap-2 transition"
        style={live
          ? { background: "rgba(248,113,113,0.15)", color: "#F87171", border: "1px solid rgba(248,113,113,0.3)" }
          : { background: `linear-gradient(135deg, ${NEON_BLUE}, ${NEON_GREEN})`, color: "#06131F" }}
      >
        <Play className="h-4 w-4" /> {live ? "Stop Live Session" : "Start Live Session"}
      </button>
    </div>
  );
}

function HistoryTab({ analyses, onOpenAnalysis }: { analyses: AnalysisRow[]; onOpenAnalysis: (row: AnalysisRow) => void }) {
  return (
    <Panel className="overflow-hidden max-w-4xl">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
            {["Video", "Sport", "Athlete", "Status", "Date", ""].map(h => (
              <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide" style={{ color: TEXT_MUTED }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {analyses.map(row => {
            const st = statusStyle(row.status);
            return (
              <tr key={row.id} style={{ borderBottom: `1px solid ${BORDER}` }} className="hover:bg-white/[0.03] transition">
                <td className="px-4 py-3 text-white font-medium">{row.video}</td>
                <td className="px-4 py-3" style={{ color: TEXT_MUTED }}>{row.sport}</td>
                <td className="px-4 py-3" style={{ color: TEXT_MUTED }}>{row.athlete}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full" style={{ color: st.color, background: st.bg }}>
                    <st.icon className="h-3 w-3" /> {row.status}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ color: TEXT_MUTED }}>{row.date}</td>
                <td className="px-4 py-3 text-right">
                  <button disabled={row.status !== "Completed"} onClick={() => onOpenAnalysis(row)}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-lg disabled:opacity-30"
                    style={{ color: NEON_BLUE, background: "rgba(56,189,248,0.12)" }}>
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Panel>
  );
}

function VideoAnalysisSection({ sub, setSub, analyses, onLaunch, onOpenAnalysis }: {
  sub: string; setSub: (s: string) => void;
  analyses: AnalysisRow[];
  onLaunch: (p: PendingUpload) => void;
  onOpenAnalysis: (row: AnalysisRow) => void;
}) {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <h1 className="text-2xl font-black text-white mb-1">Video Analysis</h1>
      <p className="text-sm mb-6" style={{ color: TEXT_MUTED }}>Upload footage, run a live session, or revisit past analyses.</p>

      <div className="flex items-center gap-1 rounded-xl p-1 mb-6 w-fit" style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
        {[{ id: "upload", label: "Upload Video", icon: Upload }, { id: "live", label: "Live Camera", icon: Camera }, { id: "history", label: "Analysis History", icon: History }].map(t => (
          <button key={t.id} onClick={() => setSub(t.id)}
            className="flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12px] font-semibold transition"
            style={sub === t.id ? { background: NEON_BLUE, color: "#06131F" } : { color: TEXT_MUTED }}>
            <t.icon className="h-3.5 w-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {sub === "upload" && <UploadTab onLaunch={onLaunch} />}
      {sub === "live" && <LiveTab />}
      {sub === "history" && <HistoryTab analyses={analyses} onOpenAnalysis={onOpenAnalysis} />}
    </div>
  );
}

/* ── Step 2: full-screen AI Analysis Flow (processing → player → summary) ── */

const PIPELINE_STAGES = [
  "Upload Complete", "Extracting Frames", "Detecting Athlete", "Tracking Body Pose",
  "Calculating Speed", "Movement Analysis", "Comparing Previous Sessions", "Generating AI Report",
];

const TIMELINE_MARKERS = [
  { label: "Sprint Start", at: 0.05 },
  { label: "Acceleration Peak", at: 0.22 },
  { label: "Maximum Speed", at: 0.45 },
  { label: "Technique Issue", at: 0.68 },
  { label: "Fatigue Detected", at: 0.82 },
  { label: "Finish Line", at: 0.97 },
];

const LIVE_EVENT_TEMPLATES = [
  "Maximum acceleration detected", "Stride length reduced", "Body lean improved",
  "Possible fatigue detected", "Top speed reached", "Ground contact time increasing",
  "Cadence stabilizing", "Direction change detected",
];

function ProcessingScreen({ onDone }: { onDone: () => void }) {
  const [stageIdx, setStageIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setStageIdx(i => {
        if (i >= PIPELINE_STAGES.length - 1) { clearInterval(iv); setTimeout(onDone, 500); return i; }
        return i + 1;
      });
    }, 420);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <div className="h-16 w-16 rounded-2xl grid place-items-center mb-6" style={{ background: "rgba(56,189,248,0.15)" }}>
        <Gauge className="h-7 w-7 animate-spin" style={{ color: NEON_BLUE, animationDuration: "2.5s" }} />
      </div>
      <h2 className="text-xl font-black text-white mb-6">Running AI pipeline…</h2>
      <div className="w-full max-w-sm space-y-2.5">
        {PIPELINE_STAGES.map((s, i) => (
          <div key={s} className="flex items-center gap-3 transition-opacity" style={{ opacity: i <= stageIdx ? 1 : 0.35 }}>
            {i < stageIdx ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: NEON_GREEN }} />
            ) : i === stageIdx ? (
              <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin shrink-0" style={{ borderColor: NEON_BLUE, borderTopColor: "transparent" }} />
            ) : (
              <span className="h-4 w-4 rounded-full shrink-0" style={{ border: `2px solid ${BORDER}` }} />
            )}
            <span className="text-[13px]" style={{ color: i <= stageIdx ? "white" : TEXT_MUTED }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIPlayer({ pending, onFinish }: { pending: PendingUpload; onFinish: (detectedName: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [frame, setFrame] = useState(0);
  const [tick, setTick] = useState(0);
  const [events, setEvents] = useState<{ id: number; frame: number; text: string }[]>([]);
  const detectedName = useMemo(() => pending.athlete === "Auto Detect" ? DUMMY_ATHLETES[Math.floor(Math.random() * DUMMY_ATHLETES.length)] : pending.athlete, [pending.athlete]);
  const fps = Number(pending.fps) || 30;
  const eventIdRef = useRef(0);

  // drive the animated overlay + metrics
  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 200);
    return () => clearInterval(iv);
  }, []);

  // live AI event feed
  useEffect(() => {
    const iv = setInterval(() => {
      const text = LIVE_EVENT_TEMPLATES[Math.floor(Math.random() * LIVE_EVENT_TEMPLATES.length)];
      eventIdRef.current += 1;
      const id = eventIdRef.current;
      setEvents(prev => [...prev.slice(-3), { id, frame, text }]);
      setTimeout(() => setEvents(prev => prev.filter(e => e.id !== id)), 4000);
    }, 2600);
    return () => clearInterval(iv);
  }, [frame]);

  function onTimeUpdate() {
    const v = videoRef.current;
    if (!v) return;
    setProgress(v.duration ? v.currentTime / v.duration : 0);
    setFrame(Math.round(v.currentTime * fps));
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  }

  function skip(sec: number) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + sec));
  }

  function seekTo(fraction: number) {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = fraction * v.duration;
  }

  function setRate(r: number) {
    setSpeed(r);
    if (videoRef.current) videoRef.current.playbackRate = r;
  }

  function finish() {
    onFinish(detectedName);
  }

  // smooth pseudo-live metrics driven by tick + progress
  const t = tick * 0.2;
  const liveSpeed = Math.max(4, 24 + Math.sin(t * 0.9) * 8 + progress * 6);
  const maxSpeed = 31.8;
  const avgSpeed = 22.4;
  const accel = (2.5 + Math.abs(Math.sin(t * 1.3)) * 2.5).toFixed(1);
  const cadence = Math.round(168 + Math.sin(t * 0.7) * 6);
  const stride = (2.1 + Math.sin(t * 0.5) * 0.15).toFixed(2);
  const gct = Math.round(180 + Math.abs(Math.cos(t * 0.6)) * 40);
  const jump = (38 + Math.abs(Math.sin(t)) * 10).toFixed(0);
  const efficiency = Math.round(80 - progress * 8 + Math.sin(t * 0.4) * 3);
  const fatigue = Math.round(Math.min(95, progress * 70 + Math.abs(Math.sin(t * 0.3)) * 10));
  const perfScore = Math.round(92 - progress * 6);
  const injuryRisk = fatigue > 70 ? "Elevated" : fatigue > 40 ? "Moderate" : "Low";
  const confidence = (95 + Math.sin(t) * 2.5).toFixed(1);
  const distance = (progress * 0.4).toFixed(2);

  const boxX = 38 + Math.sin(t * 0.6) * 18;
  const boxY = 30 + Math.cos(t * 0.5) * 10;

  return (
    <div className="flex-1 flex min-h-0">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="relative flex-1 bg-black min-h-0">
          <video
            ref={videoRef}
            src={pending.url}
            autoPlay
            muted
            className="w-full h-full object-contain"
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
            onEnded={finish}
          />

          {/* AI overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <g style={{ filter: "drop-shadow(0 0 3px rgba(56,189,248,0.8))" }}>
              <rect x={boxX} y={boxY} width="16" height="34" fill="none" stroke={NEON_BLUE} strokeWidth="0.3" rx="1" />
              {/* skeleton */}
              <circle cx={boxX + 8} cy={boxY + 4} r="1.6" fill={NEON_GREEN} />
              <line x1={boxX + 8} y1={boxY + 5.5} x2={boxX + 8} y2={boxY + 18} stroke={NEON_GREEN} strokeWidth="0.35" />
              <line x1={boxX + 8} y1={boxY + 8} x2={boxX + 3} y2={boxY + 13} stroke={NEON_GREEN} strokeWidth="0.35" />
              <line x1={boxX + 8} y1={boxY + 8} x2={boxX + 13} y2={boxY + 13} stroke={NEON_GREEN} strokeWidth="0.35" />
              <line x1={boxX + 8} y1={boxY + 18} x2={boxX + 4} y2={boxY + 28} stroke={NEON_GREEN} strokeWidth="0.35" />
              <line x1={boxX + 8} y1={boxY + 18} x2={boxX + 12} y2={boxY + 28} stroke={NEON_GREEN} strokeWidth="0.35" />
              {[[boxX + 8, boxY + 4], [boxX + 3, boxY + 13], [boxX + 13, boxY + 13], [boxX + 4, boxY + 28], [boxX + 12, boxY + 28]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="0.9" fill={NEON_BLUE} />
              ))}
              {/* ground contact indicator */}
              <circle cx={boxX + 4} cy={boxY + 29} r={Math.abs(Math.sin(t * 2)) > 0.7 ? 1.4 : 0.5} fill="#FBBF24" opacity="0.9" />
            </g>
            {/* direction arrow */}
            <g transform={`translate(${boxX + 20} ${boxY + 15})`}>
              <line x1="0" y1="0" x2="6" y2="0" stroke={NEON_GREEN} strokeWidth="0.4" />
              <polygon points="6,-1.2 8,0 6,1.2" fill={NEON_GREEN} />
            </g>
            {/* motion trail */}
            {Array.from({ length: 5 }, (_, i) => (
              <circle key={i} cx={boxX + 8 - i * 3} cy={boxY + 34 + Math.sin(t - i * 0.3) * 1.5} r={1 - i * 0.15} fill={NEON_BLUE} opacity={0.35 - i * 0.06} />
            ))}
          </svg>

          {/* name tag + speed indicator */}
          <div className="absolute pointer-events-none" style={{ left: `${boxX}%`, top: `${boxY - 6}%` }}>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-bold text-white whitespace-nowrap" style={{ background: "rgba(11,18,32,0.85)", border: `1px solid ${NEON_BLUE}` }}>
              <ScanFace className="h-3 w-3" style={{ color: NEON_GREEN }} /> {detectedName}
              <span style={{ color: NEON_GREEN }}>{confidence}%</span>
            </div>
          </div>

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: NEON_GREEN, background: "rgba(52,211,153,0.15)" }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: NEON_GREEN }} /> AI ANALYSIS LIVE
            </div>
            <div className="text-[11px] font-mono px-2.5 py-1 rounded-lg text-white" style={{ background: "rgba(11,18,32,0.7)" }}>Frame {frame}</div>
          </div>

          <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white" style={{ background: "rgba(11,18,32,0.75)", border: `1px solid ${BORDER}` }}>
              <Gauge className="h-3.5 w-3.5" style={{ color: NEON_BLUE }} />
              <span className="text-lg font-black">{liveSpeed.toFixed(1)}</span>
              <span className="text-[10px]" style={{ color: TEXT_MUTED }}>km/h</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-lg text-white" style={{ background: "rgba(11,18,32,0.7)" }}>
              <Navigation2 className="h-3 w-3" style={{ color: NEON_GREEN }} /> Pace {(60 / Math.max(4, liveSpeed)).toFixed(2)} min/km
            </div>
            <div className="text-[10px] px-2 py-1 rounded-lg text-white" style={{ background: "rgba(11,18,32,0.7)" }}>Distance {distance} km</div>
          </div>

          {/* live AI events */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 w-64">
            {events.map(e => (
              <div key={e.id} className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] text-white animate-[fadeIn_0.3s_ease]" style={{ background: "rgba(11,18,32,0.85)", border: `1px solid ${NEON_BLUE}` }}>
                <Zap className="h-3 w-3 shrink-0" style={{ color: "#FBBF24" }} />
                <span><span className="font-mono" style={{ color: TEXT_MUTED }}>Frame {e.frame}</span> — {e.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* timeline */}
        <div className="shrink-0 px-5 py-3" style={{ background: PANEL, borderTop: `1px solid ${BORDER}` }}>
          <div className="relative h-1.5 rounded-full mb-2 cursor-pointer" style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              seekTo((e.clientX - rect.left) / rect.width);
            }}>
            <div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, ${NEON_BLUE}, ${NEON_GREEN})` }} />
            {TIMELINE_MARKERS.map(m => (
              <div key={m.label} className="absolute -top-1.5 group" style={{ left: `${m.at * 100}%` }}>
                <div className="h-3.5 w-3.5 -ml-1.5 rounded-full cursor-pointer" style={{ background: "#FBBF24", border: "2px solid #0B1220" }}
                  onClick={ev => { ev.stopPropagation(); seekTo(m.at); }} />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden group-hover:block text-[10px] font-semibold text-white px-2 py-1 rounded-md whitespace-nowrap" style={{ background: "#050B14", border: `1px solid ${BORDER}` }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => skip(-5)} className="h-8 w-8 rounded-lg grid place-items-center" style={{ color: "white" }}><SkipBack className="h-4 w-4" /></button>
            <button onClick={togglePlay} className="h-9 w-9 rounded-full grid place-items-center" style={{ background: NEON_BLUE, color: "#06131F" }}>
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button onClick={() => skip(5)} className="h-8 w-8 rounded-lg grid place-items-center" style={{ color: "white" }}><SkipForward className="h-4 w-4" /></button>
            <span className="text-[11px] font-mono" style={{ color: TEXT_MUTED }}>{formatTime(progress * duration)} / {formatTime(duration)}</span>
            <div className="flex items-center gap-1 ml-2">
              {[0.5, 1, 1.5, 2].map(r => (
                <button key={r} onClick={() => setRate(r)} className="px-2 h-6 rounded-md text-[10px] font-bold" style={speed === r ? { background: NEON_BLUE, color: "#06131F" } : { color: TEXT_MUTED }}>
                  {r}x
                </button>
              ))}
            </div>
            <button onClick={finish} className="ml-auto h-9 px-4 rounded-lg text-[12px] font-bold" style={{ background: NEON_GREEN, color: "#06131F" }}>
              Finish Analysis
            </button>
          </div>
        </div>
      </div>

      {/* right sidebar: live AI insights */}
      <aside className="w-72 shrink-0 overflow-y-auto p-4 space-y-2.5" style={{ background: PANEL, borderLeft: `1px solid ${BORDER}` }}>
        <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: TEXT_MUTED }}>Live AI Insights</div>
        {[
          { label: "Current Speed", value: `${liveSpeed.toFixed(1)} km/h`, icon: Gauge },
          { label: "Maximum Speed", value: `${maxSpeed} km/h`, icon: TrendingUp },
          { label: "Average Speed", value: `${avgSpeed} km/h`, icon: Activity },
          { label: "Acceleration", value: `${accel} m/s²`, icon: Zap },
          { label: "Cadence", value: `${cadence} spm`, icon: Footprints },
          { label: "Stride Length", value: `${stride} m`, icon: Navigation2 },
          { label: "Ground Contact Time", value: `${gct} ms`, icon: Timer },
          { label: "Jump Height", value: `${jump} cm`, icon: TrendingUp },
          { label: "Running Efficiency", value: `${efficiency}%`, icon: Crosshair },
          { label: "Fatigue Indicator", value: `${fatigue}%`, icon: Flame, warn: fatigue > 60 },
          { label: "Performance Score", value: `${perfScore}`, icon: BarChart3 },
          { label: "Injury Risk", value: injuryRisk, icon: ShieldAlert, warn: injuryRisk !== "Low" },
        ].map(m => (
          <div key={m.label} className="rounded-xl p-3 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}` }}>
            <div className="flex items-center gap-2">
              <m.icon className="h-3.5 w-3.5" style={{ color: m.warn ? "#F87171" : NEON_BLUE }} />
              <span className="text-[11px]" style={{ color: TEXT_MUTED }}>{m.label}</span>
            </div>
            <span className="text-[13px] font-black transition-all" style={{ color: m.warn ? "#F87171" : "white" }}>{m.value}</span>
          </div>
        ))}
      </aside>
    </div>
  );
}

function formatTime(s: number) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

type AnalysisReport = {
  pending: PendingUpload;
  detectedName: string;
  scores: { label: string; value: number }[];
  summary: string;
  speedTrend: { t: string; speed: number; accel: number }[];
  cadenceTrend: { t: string; v: number }[];
  fatigueTrend: { t: string; v: number }[];
  recommendations: string[];
};

/** Deterministic pseudo-random seed from a name, so each athlete gets stable-but-distinct stats. */
function seedFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h;
}
function seededRand(seed: number, salt: number) {
  return (Math.sin(seed + salt * 999.17) + 1) / 2;
}

type RaceAthlete = {
  rank: number; name: string; lane: number; status: "Finished" | "Running";
  topSpeed: number; avgSpeed: number; finishTime: number; aiScore: number; distance: number;
};

function buildRaceField(detectedName: string): RaceAthlete[] {
  const names = DUMMY_ATHLETES.includes(detectedName) ? DUMMY_ATHLETES : [detectedName, ...DUMMY_ATHLETES.slice(0, 4)];
  const unranked = names.map((name, i) => {
    const seed = seedFor(name);
    const topSpeed = Math.round((28 + seededRand(seed, 1) * 4) * 10) / 10;
    const avgSpeed = Math.round((topSpeed - (2 + seededRand(seed, 2) * 1.5)) * 10) / 10;
    const finishTime = Math.round((11.5 + (32 - topSpeed) * 0.35 + seededRand(seed, 3) * 0.3) * 100) / 100;
    const aiScore = Math.round(72 + (topSpeed - 28) * 5.5 + seededRand(seed, 4) * 6);
    return { name, lane: i + 1, status: "Finished" as const, topSpeed, avgSpeed, finishTime, aiScore, distance: 0.1 };
  });
  return unranked
    .sort((a, b) => b.aiScore - a.aiScore)
    .map((a, i) => ({ ...a, rank: i + 1 }));
}

function buildReport(pending: PendingUpload, detectedName: string): AnalysisReport {
  const seed = seedFor(detectedName);
  const speedTrend = Array.from({ length: 8 }, (_, i) => ({
    t: `${i * 5}s`, speed: Math.round((10 + Math.sin(i * 0.8 + seed) * 8 + i * 2) * 10) / 10, accel: Math.round((5 - i * 0.4 + seededRand(seed, i)) * 10) / 10,
  }));
  const cadenceTrend = Array.from({ length: 8 }, (_, i) => ({ t: `${i * 5}s`, v: Math.round(165 + Math.sin(i * 0.6 + seed) * 8) }));
  const fatigueTrend = Array.from({ length: 8 }, (_, i) => ({ t: `${i * 5}s`, v: Math.min(92, Math.round(i * 11 + seededRand(seed, i) * 6)) }));

  return {
    pending, detectedName,
    scores: [
      { label: "Overall Performance", value: Math.round(80 + seededRand(seed, 10) * 15) },
      { label: "AI Rating", value: Math.round(80 + seededRand(seed, 11) * 15) },
      { label: "Technique Score", value: Math.round(75 + seededRand(seed, 12) * 18) },
      { label: "Speed Score", value: Math.round(80 + seededRand(seed, 13) * 18) },
      { label: "Acceleration Score", value: Math.round(78 + seededRand(seed, 14) * 16) },
      { label: "Endurance Score", value: Math.round(65 + seededRand(seed, 15) * 20) },
      { label: "Running Efficiency", value: Math.round(72 + seededRand(seed, 16) * 18) },
      { label: "Fatigue Score", value: Math.round(55 + seededRand(seed, 17) * 25) },
      { label: "Movement Quality", value: Math.round(78 + seededRand(seed, 18) * 16) },
      { label: "Risk Assessment", value: Math.round(80 + seededRand(seed, 19) * 15) },
    ],
    summary: `${detectedName} maintained excellent acceleration during the first phase of the session, with a peak speed of 31.8 km/h in ${pending.sport.toLowerCase()}. Running posture remained stable throughout most of the session. A slight reduction in stride length and running efficiency was detected during the final phase, indicating the onset of fatigue. No major biomechanical abnormalities were identified. Overall execution is rated as Excellent with recommendations to improve late-stage endurance.`,
    speedTrend, cadenceTrend, fatigueTrend,
    recommendations: [
      "Improve knee drive during acceleration.",
      "Increase stride frequency in the final phase.",
      "Focus on sprint endurance drills.",
      "Reduce upper body movement.",
      "Recovery session recommended tomorrow.",
      "Hydration reminder.",
    ],
  };
}

const MEDAL = ["🥇", "🥈", "🥉"];
const RANK_ACCENT = [
  { color: "#FBBF24", bg: "rgba(251,191,36,0.10)", glow: "0 0 24px rgba(251,191,36,0.25)" },
  { color: "#CBD5E1", bg: "rgba(203,213,225,0.08)", glow: "0 0 18px rgba(203,213,225,0.15)" },
  { color: "#F59E0B", bg: "rgba(217,119,6,0.10)", glow: "0 0 16px rgba(217,119,6,0.18)" },
];

function RaceLeaderboard({ raceField, selectedName, onSelect }: { raceField: RaceAthlete[]; selectedName: string; onSelect: (name: string) => void }) {
  const fastest = Math.max(...raceField.map(a => a.topSpeed));
  const avgFinish = raceField.reduce((s, a) => s + a.finishTime, 0) / raceField.length;
  const bestScore = Math.max(...raceField.map(a => a.aiScore));
  const winner = raceField.find(a => a.rank === 1)!;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🏁</span>
        <h1 className="text-xl font-black text-white">Race Performance Leaderboard</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
        {[
          { label: "Total Athletes", value: String(raceField.length) },
          { label: "Fastest Speed", value: `${fastest.toFixed(1)} km/h` },
          { label: "Avg Finish Time", value: `${avgFinish.toFixed(2)} s` },
          { label: "Best AI Score", value: String(bestScore) },
          { label: "Race Winner", value: winner.name },
        ].map(s => (
          <Panel key={s.label} className="p-3.5">
            <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: TEXT_MUTED }}>{s.label}</div>
            <div className="text-[15px] font-black text-white truncate">{s.value}</div>
          </Panel>
        ))}
      </div>

      <div className="space-y-2.5">
        {raceField.map(a => {
          const accent = a.rank <= 3 ? RANK_ACCENT[a.rank - 1] : null;
          const selected = a.name === selectedName;
          return (
            <button
              key={a.name}
              onClick={() => onSelect(a.name)}
              className="w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all duration-300"
              style={{
                background: accent ? accent.bg : "rgba(255,255,255,0.03)",
                border: selected ? `1.5px solid ${NEON_BLUE}` : `1px solid ${accent ? accent.color + "55" : BORDER}`,
                boxShadow: selected ? `0 0 20px rgba(56,189,248,0.3)` : accent ? accent.glow : "none",
              }}
            >
              <div className="w-10 shrink-0 text-center">
                {a.rank <= 3 ? <span className="text-xl">{MEDAL[a.rank - 1]}</span> : <span className="text-sm font-black" style={{ color: TEXT_MUTED }}>#{a.rank}</span>}
              </div>
              <div className="h-10 w-10 rounded-full grid place-items-center shrink-0 font-bold text-[13px]"
                style={{ background: accent ? accent.color : NEON_BLUE, color: "#06131F" }}>
                {a.name.split(" ").map(w => w[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white font-bold text-[14px] truncate">{a.name}</div>
                <div className="text-[11px]" style={{ color: TEXT_MUTED }}>Lane {a.lane} &middot; <span style={{ color: NEON_GREEN }}>{a.status}</span></div>
              </div>
              <div className="hidden sm:flex items-center gap-5 shrink-0 text-center">
                <div><div className="text-[13px] font-black text-white">{a.topSpeed.toFixed(1)}</div><div className="text-[9px]" style={{ color: TEXT_MUTED }}>TOP KM/H</div></div>
                <div><div className="text-[13px] font-black text-white">{a.avgSpeed.toFixed(1)}</div><div className="text-[9px]" style={{ color: TEXT_MUTED }}>AVG KM/H</div></div>
                <div><div className="text-[13px] font-black text-white">{a.finishTime.toFixed(2)}s</div><div className="text-[9px]" style={{ color: TEXT_MUTED }}>FINISH</div></div>
                <div><div className="text-[13px] font-black" style={{ color: accent ? accent.color : NEON_BLUE }}>{a.aiScore}</div><div className="text-[9px]" style={{ color: TEXT_MUTED }}>AI SCORE</div></div>
              </div>
              <span
                className="shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-lg"
                style={selected ? { background: NEON_BLUE, color: "#06131F" } : { background: PANEL, color: "white", border: `1px solid ${BORDER}` }}
              >
                {selected ? "Viewing" : "View Analysis"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AISummaryDashboard({ pending, raceField, initialAthleteName, onSave, onBack }: {
  pending: PendingUpload; raceField: RaceAthlete[]; initialAthleteName: string;
  onSave: (athleteName: string) => void; onBack: () => void;
}) {
  const [selectedName, setSelectedName] = useState(initialAthleteName);
  const report = useMemo(() => buildReport(pending, selectedName), [pending, selectedName]);
  const watch = useMemo(() => {
    const seed = seedFor(selectedName);
    return {
      "Heart Rate": `${Math.round(150 + seededRand(seed, 30) * 25)} bpm`,
      HRV: `${Math.round(45 + seededRand(seed, 31) * 25)} ms`,
      SpO2: `${Math.round(95 + seededRand(seed, 32) * 4)}%`,
      Calories: `${Math.round(500 + seededRand(seed, 33) * 200)} kcal`,
      "Training Load": `${Math.round(250 + seededRand(seed, 34) * 150)} AU`,
      "Stress Level": seededRand(seed, 35) > 0.6 ? "Moderate" : "Low",
      "Recovery Score": `${Math.round(65 + seededRand(seed, 36) * 25)}/100`,
      "Sleep Score": `${Math.round(70 + seededRand(seed, 37) * 25)}/100`,
      "Body Temp": `${(36.6 + seededRand(seed, 38) * 0.8).toFixed(1)}°C`,
    };
  }, [selectedName]);

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] font-semibold mb-4" style={{ color: TEXT_MUTED }}>
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Video Analysis
      </button>

      <RaceLeaderboard raceField={raceField} selectedName={selectedName} onSelect={setSelectedName} />

      <div key={selectedName} className="animate-[fadeIn_0.35s_ease]">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5" style={{ color: NEON_BLUE }} />
              <h2 className="text-lg font-black text-white">Detailed AI Analysis — {selectedName}</h2>
            </div>
            <p className="text-sm" style={{ color: TEXT_MUTED }}>{pending.sport} &middot; {pending.file.name} &middot; {pending.sessionDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-3.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5" style={{ background: PANEL, color: "white", border: `1px solid ${BORDER}` }}>
              <Download className="h-3.5 w-3.5" /> Download AI Report (PDF)
            </button>
            <button className="h-9 px-3.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5" style={{ background: PANEL, color: "white", border: `1px solid ${BORDER}` }}>
              <BarChart3 className="h-3.5 w-3.5" /> Export Performance Data
            </button>
            <button className="h-9 px-3.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5" style={{ background: PANEL, color: "white", border: `1px solid ${BORDER}` }}>
              <Share2 className="h-3.5 w-3.5" /> Share with Coach
            </button>
            <button className="h-9 px-3.5 rounded-lg text-[12px] font-semibold flex items-center gap-1.5" style={{ background: PANEL, color: "white", border: `1px solid ${BORDER}` }}>
              <GitCompareArrows className="h-3.5 w-3.5" /> Compare Session
            </button>
            <button onClick={() => onSave(selectedName)} className="h-9 px-3.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5" style={{ background: NEON_GREEN, color: "#06131F" }}>
              <Save className="h-3.5 w-3.5" /> Save to History
            </button>
          </div>
        </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {report.scores.map(s => (
          <Panel key={s.label} className="p-4">
            <div className="text-2xl font-black" style={{ color: s.value >= 85 ? NEON_GREEN : s.value >= 70 ? "#FBBF24" : "#F87171" }}>{s.value}</div>
            <div className="text-[10.5px] mt-1.5" style={{ color: TEXT_MUTED }}>{s.label}</div>
          </Panel>
        ))}
      </div>

      <Panel className="p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4" style={{ color: NEON_BLUE }} />
          <div className="text-white font-bold text-sm">AI Performance Summary</div>
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: "#C7CEDB" }}>{report.summary}</p>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <Panel className="p-5">
          <div className="text-white font-bold text-sm mb-3">Speed vs Time</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.speedTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12 }} labelStyle={{ color: "white" }} />
                <Line type="monotone" dataKey="speed" stroke={NEON_BLUE} strokeWidth={2.5} dot={{ r: 3, fill: NEON_BLUE }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel className="p-5">
          <div className="text-white font-bold text-sm mb-3">Acceleration vs Time</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.speedTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12 }} labelStyle={{ color: "white" }} />
                <Line type="monotone" dataKey="accel" stroke={NEON_GREEN} strokeWidth={2.5} dot={{ r: 3, fill: NEON_GREEN }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel className="p-5">
          <div className="text-white font-bold text-sm mb-3">Cadence Trend</div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.cadenceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: TEXT_MUTED }} axisLine={false} tickLine={false} domain={["dataMin - 10", "dataMax + 10"]} />
                <Tooltip contentStyle={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12 }} labelStyle={{ color: "white" }} />
                <Line type="monotone" dataKey="v" stroke="#A78BFA" strokeWidth={2.5} dot={{ r: 3, fill: "#A78BFA" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel className="p-5">
          <div className="text-white font-bold text-sm mb-3">Fatigue Trend</div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.fatigueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: TEXT_MUTED }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 12 }} labelStyle={{ color: "white" }} />
                <Line type="monotone" dataKey="v" stroke="#F87171" strokeWidth={2.5} dot={{ r: 3, fill: "#F87171" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Panel className="p-5">
          <div className="text-white font-bold text-sm mb-3">AI Recommendations</div>
          <div className="space-y-2">
            {report.recommendations.map(r => (
              <div key={r} className="flex items-start gap-2 text-[12.5px]" style={{ color: "#C7CEDB" }}>
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: NEON_GREEN }} /> {r}
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Watch className="h-4 w-4" style={{ color: NEON_BLUE }} />
            <div className="text-white font-bold text-sm">Smart Watch Integration</div>
          </div>
          <p className="text-[11px] mb-3" style={{ color: TEXT_MUTED }}>Wearable metrics synchronized with the video timeline.</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[12px]">
            {Object.entries(watch).map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span style={{ color: TEXT_MUTED }}>{k}</span>
                <span className="text-white font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      </div>
    </div>
  );
}

function AIAnalysisFlow({ pending, onExit, onSave }: { pending: PendingUpload; onExit: () => void; onSave: (athleteName: string) => void }) {
  const [step, setStep] = useState<"processing" | "player" | "summary">("processing");
  const [finishedName, setFinishedName] = useState<string | null>(null);
  const raceField = useMemo(() => (finishedName ? buildRaceField(finishedName) : []), [finishedName]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: BG }}>
      <div className="h-14 shrink-0 flex items-center px-5 gap-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <button onClick={onExit} className="h-8 w-8 rounded-lg grid place-items-center" style={{ color: "white", background: PANEL }}>
          <X className="h-4 w-4" />
        </button>
        <div className="text-white font-bold text-sm truncate">{pending.file.name}</div>
        <span className="text-[11px]" style={{ color: TEXT_MUTED }}>{pending.sport} &middot; {pending.cameraAngle}</span>
        <div className="ml-auto flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ color: NEON_BLUE, background: "rgba(56,189,248,0.12)" }}>
          <Sparkles className="h-3 w-3" /> AI Vision Engine v3.2
        </div>
      </div>

      {step === "processing" && <ProcessingScreen onDone={() => setStep("player")} />}
      {step === "player" && (
        <AIPlayer pending={pending} onFinish={name => { setFinishedName(name); setStep("summary"); }} />
      )}
      {step === "summary" && finishedName && (
        <AISummaryDashboard pending={pending} raceField={raceField} initialAthleteName={finishedName} onBack={onExit} onSave={onSave} />
      )}
    </div>
  );
}

/* ── Lightweight standalone sections ─────────────────────────────── */

function SimpleSection({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <h1 className="text-2xl font-black text-white mb-1">{title}</h1>
      <p className="text-sm mb-6" style={{ color: TEXT_MUTED }}>{desc}</p>
      {children}
    </div>
  );
}

const TRACKED_ATHLETES = [
  { name: "Onkar Patil", sport: "Basketball", sessions: 24, accuracy: 97 },
  { name: "Rohan Deshmukh", sport: "Football", sessions: 19, accuracy: 95 },
  { name: "Ankita More", sport: "Football", sessions: 16, accuracy: 96 },
  { name: "Manasi Bhosale", sport: "Athletics", sessions: 21, accuracy: 98 },
];

function AthleteTrackingSection() {
  return (
    <SimpleSection title="Athlete Tracking" desc="AI-tracked athletes across all analyzed sessions.">
      <Panel className="overflow-hidden max-w-3xl">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              {["Athlete", "Sport", "Sessions", "Tracking Accuracy"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide" style={{ color: TEXT_MUTED }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TRACKED_ATHLETES.map(a => (
              <tr key={a.name} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <td className="px-4 py-3 text-white font-medium">{a.name}</td>
                <td className="px-4 py-3" style={{ color: TEXT_MUTED }}>{a.sport}</td>
                <td className="px-4 py-3" style={{ color: TEXT_MUTED }}>{a.sessions}</td>
                <td className="px-4 py-3 font-bold" style={{ color: NEON_GREEN }}>{a.accuracy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </SimpleSection>
  );
}

function ReportsSection({ analyses }: { analyses: AnalysisRow[] }) {
  return (
    <SimpleSection title="AI Reports" desc="All AI-generated performance reports, ready to export or share.">
      <Panel className="overflow-hidden max-w-3xl">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              {["Report", "Athlete", "Date", ""].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wide" style={{ color: TEXT_MUTED }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {analyses.filter(r => r.status === "Completed").map(r => (
              <tr key={r.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <td className="px-4 py-3 text-white font-medium">{r.video.replace(/\.\w+$/, "")} Report</td>
                <td className="px-4 py-3" style={{ color: TEXT_MUTED }}>{r.athlete}</td>
                <td className="px-4 py-3" style={{ color: TEXT_MUTED }}>{r.date}</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 ml-auto" style={{ color: NEON_BLUE, background: "rgba(56,189,248,0.12)" }}>
                    <Download className="h-3 w-3" /> Export
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </SimpleSection>
  );
}

function WatchSyncSection() {
  const devices = [
    { athlete: "Onkar Patil", device: "Garmin Forerunner", status: "Synced", lastSync: "4m ago" },
    { athlete: "Sneha Kulkarni", device: "Apple Watch Series 9", status: "Synced", lastSync: "9m ago" },
    { athlete: "Ankita More", device: "Wear OS", status: "Offline", lastSync: "3h ago" },
  ];
  return (
    <SimpleSection title="Smart Watch Sync" desc="Wearable data feeding into AI Vision Analytics for combined video + biometric insights.">
      <div className="space-y-3 max-w-2xl">
        {devices.map(d => (
          <Panel key={d.athlete} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg grid place-items-center" style={{ background: "rgba(56,189,248,0.12)" }}>
                <Watch className="h-4 w-4" style={{ color: NEON_BLUE }} />
              </div>
              <div>
                <div className="text-white font-semibold text-[13px]">{d.athlete}</div>
                <div className="text-[11px]" style={{ color: TEXT_MUTED }}>{d.device}</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={d.status === "Synced" ? { color: NEON_GREEN, background: "rgba(52,211,153,0.12)" } : { color: TEXT_MUTED, background: PANEL }}>
                {d.status}
              </span>
              <div className="text-[10px] mt-1" style={{ color: TEXT_MUTED }}>{d.lastSync}</div>
            </div>
          </Panel>
        ))}
      </div>
    </SimpleSection>
  );
}

function SettingsSection() {
  const [autoProcess, setAutoProcess] = useState(true);
  const [notify, setNotify] = useState(true);
  const [quality, setQuality] = useState("High");

  function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
    return (
      <button onClick={onClick} className="h-6 w-11 rounded-full relative transition" style={{ background: on ? NEON_GREEN : PANEL, border: `1px solid ${BORDER}` }}>
        <span className="absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white transition-all" style={{ left: on ? 22 : 3 }} />
      </button>
    );
  }

  return (
    <SimpleSection title="Settings" desc="Configure AI Vision Analytics processing preferences.">
      <Panel className="p-5 max-w-xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white text-sm font-semibold">Auto-process uploads</div>
            <div className="text-[11px] mt-0.5" style={{ color: TEXT_MUTED }}>Start AI analysis automatically after upload completes</div>
          </div>
          <Toggle on={autoProcess} onClick={() => setAutoProcess(v => !v)} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white text-sm font-semibold">Notify on completion</div>
            <div className="text-[11px] mt-0.5" style={{ color: TEXT_MUTED }}>Send an alert when a report is ready</div>
          </div>
          <Toggle on={notify} onClick={() => setNotify(v => !v)} />
        </div>
        <div>
          <div className="text-white text-sm font-semibold mb-2">Processing quality</div>
          <div className="flex gap-2">
            {["Standard", "High", "Ultra"].map(q => (
              <button key={q} onClick={() => setQuality(q)} className="px-3.5 h-8 rounded-lg text-[12px] font-semibold transition"
                style={quality === q ? { background: NEON_BLUE, color: "#06131F" } : { background: PANEL, color: TEXT_MUTED, border: `1px solid ${BORDER}` }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </Panel>
    </SimpleSection>
  );
}

/* ── Shell ────────────────────────────────────────────────────────── */

export function AIVisionAnalyticsPortal({ onBack }: { onBack: () => void }) {
  const [section, setSection] = useState<Section>("dashboard");
  const [videoSub, setVideoSub] = useState("upload");
  const [analyses, setAnalyses] = useState<AnalysisRow[]>(INITIAL_ANALYSES);
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisRow | null>(null);
  const [pending, setPending] = useState<PendingUpload | null>(null);

  function go(s: Section, sub?: string) {
    setSection(s);
    if (sub) setVideoSub(sub);
  }

  function openAnalysis(row: AnalysisRow) {
    setActiveAnalysis(row);
    setSection("workspace");
  }

  function saveReport(athleteName: string) {
    if (!pending) return;
    const row: AnalysisRow = {
      id: `local-${Date.now()}`, video: pending.file.name, sport: pending.sport,
      athlete: athleteName, status: "Completed", date: "Today",
    };
    setAnalyses(prev => [row, ...prev]);
    setPending(null);
    setSection("dashboard");
  }

  return (
    <div className="min-h-screen flex" style={{ background: BG, fontFamily: "'Inter', sans-serif" }}>
      <aside className="w-64 shrink-0 flex flex-col sticky top-0 h-screen overflow-y-auto" style={{ background: PANEL, borderRight: `1px solid ${BORDER}` }}>
        <div className="h-16 flex items-center gap-2.5 px-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="h-9 w-9 rounded-xl grid place-items-center" style={{ background: `linear-gradient(135deg, ${NEON_BLUE}, ${NEON_GREEN})` }}>
            <Eye className="h-4.5 w-4.5" style={{ color: "#06131F" }} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-white leading-none truncate">AI Vision Analytics</div>
            <div className="text-[9.5px] mt-1" style={{ color: TEXT_MUTED }}>Computer Vision + Wearables</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <button onClick={onBack} className="w-full flex items-center gap-2.5 px-3.5 h-9 rounded-lg text-[12px] font-semibold mb-2 transition" style={{ color: TEXT_MUTED }}>
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </button>
          {NAV.map(item => {
            const isActive = section === item.id || (item.id === "video-analysis" && section === "workspace");
            return (
              <div key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className="w-full flex items-center gap-3 px-3.5 h-10 rounded-xl text-[13px] font-semibold transition"
                  style={isActive ? { background: "rgba(56,189,248,0.15)", color: NEON_BLUE } : { color: "#C7CEDB" }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
                {item.children && section === "video-analysis" && (
                  <div className="ml-6 mt-1 space-y-0.5 mb-1">
                    {item.children.map(c => (
                      <button key={c.id} onClick={() => go("video-analysis", c.id)}
                        className="w-full text-left px-3 h-8 rounded-lg text-[12px] transition"
                        style={videoSub === c.id ? { color: NEON_GREEN, fontWeight: 700 } : { color: TEXT_MUTED }}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 text-[10px]" style={{ color: TEXT_MUTED, borderTop: `1px solid ${BORDER}` }}>
          Maharashtra Sports Department<br />AI Platform &middot; v1.0
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {section === "dashboard" ? (
          <Dashboard analyses={analyses} onGo={go} onOpenAnalysis={openAnalysis} />
        ) : section === "video-analysis" ? (
          <VideoAnalysisSection sub={videoSub} setSub={setVideoSub} analyses={analyses} onLaunch={setPending} onOpenAnalysis={openAnalysis} />
        ) : section === "workspace" && activeAnalysis ? (
          <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
            <button onClick={() => setSection("video-analysis")} className="flex items-center gap-1.5 text-[12px] font-semibold mb-4" style={{ color: TEXT_MUTED }}>
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Video Analysis
            </button>
            <h1 className="text-xl font-black text-white mb-1">{activeAnalysis.video}</h1>
            <p className="text-sm mb-6" style={{ color: TEXT_MUTED }}>{activeAnalysis.sport} &middot; {activeAnalysis.athlete} &middot; {activeAnalysis.date}</p>
            <Panel className="p-5">
              <p className="text-[13px] leading-relaxed" style={{ color: "#C7CEDB" }}>
                This session has already been processed. Re-run it from Upload Video to generate a fresh full AI Analysis Player walkthrough with live overlays and an updated AI Summary Dashboard.
              </p>
            </Panel>
          </div>
        ) : section === "athlete-tracking" ? (
          <AthleteTrackingSection />
        ) : section === "reports" ? (
          <ReportsSection analyses={analyses} />
        ) : section === "watch-sync" ? (
          <WatchSyncSection />
        ) : section === "settings" ? (
          <SettingsSection />
        ) : (
          <Dashboard analyses={analyses} onGo={go} onOpenAnalysis={openAnalysis} />
        )}
      </div>

      {pending && (
        <AIAnalysisFlow pending={pending} onExit={() => setPending(null)} onSave={saveReport} />
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Palette, X, Monitor, Tablet, Smartphone,
  Undo2, Redo2, Save, CheckCircle, Layers,
  Type, LayoutGrid, Zap, Eye, EyeOff,
  AlignLeft, AlignCenter, AlignRight,
} from "lucide-react";

/* ─── types ─────────────────────────────────────────────────── */
type Tab = "style" | "typography" | "layout" | "effects";
type Breakpoint = "desktop" | "tablet" | "mobile";
interface StyleEntry { selector: string; property: string; prev: string; next: string; }
type OverrideMap = Record<string, Record<string, string>>;

/* ─── helpers ────────────────────────────────────────────────── */
const VE_KEY = "ve_style_v1";

function getCssSel(el: HTMLElement): string {
  const path: string[] = [];
  let cur: HTMLElement | null = el;
  let depth = 0;
  while (cur && cur.tagName !== "HTML" && cur.tagName !== "BODY" && depth < 6) {
    if (cur.id) { path.unshift(`#${cur.id}`); break; }
    let seg = cur.tagName.toLowerCase();
    const parent = cur.parentElement;
    if (parent) {
      const idx = Array.from(parent.children).indexOf(cur as Element) + 1;
      seg += `:nth-child(${idx})`;
    }
    path.unshift(seg);
    cur = cur.parentElement as HTMLElement | null;
    depth++;
  }
  return path.join(" > ");
}

function loadOv(): OverrideMap {
  try { return JSON.parse(localStorage.getItem(VE_KEY) ?? "{}"); } catch { return {}; }
}

function savOv(o: OverrideMap) { localStorage.setItem(VE_KEY, JSON.stringify(o)); }

function ovToCSS(o: OverrideMap): string {
  return Object.entries(o)
    .map(([sel, props]) => {
      const decls = Object.entries(props).map(([k, v]) => `${k}:${v}!important`).join(";");
      return `${sel}{${decls}}`;
    }).join("\n");
}

function hexToRGB(hex: string): [number, number, number] {
  const m = hex.replace(/^#/, "").match(/.{2}/g);
  return m ? [parseInt(m[0], 16), parseInt(m[1], 16), parseInt(m[2], 16)] : [0, 0, 0];
}
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(n => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0")).join("");
}

/* ─── Color Picker ───────────────────────────────────────────── */
function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  const [mode, setMode] = useState<"hex" | "rgb">("hex");
  const safe = value.startsWith("#") ? value : "#000000";
  const [r, g, b] = hexToRGB(safe);
  const swatches = [
    "#363092", "#1e3a5f", "#f97316", "#7c3aed", "#059669", "#dc2626",
    "#0891b2", "#d97706", "#ec4899", "#64748b", "#ffffff", "#000000",
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input type="color" value={safe} onChange={e => onChange(e.target.value)}
          className="h-8 w-8 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0 p-0.5 bg-white" />
        <div className="flex flex-wrap gap-1">
          {swatches.map(s => (
            <button key={s} onClick={() => onChange(s)} title={s}
              className="h-5 w-5 rounded border border-gray-200 transition hover:scale-125"
              style={{ background: s }} />
          ))}
        </div>
      </div>
      <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5">
        {(["hex", "rgb"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 text-[9px] font-bold uppercase rounded-md py-0.5 transition ${mode === m ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}>
            {m}
          </button>
        ))}
      </div>
      {mode === "hex" ? (
        <input value={value} onChange={e => onChange(e.target.value)}
          className="w-full h-7 px-2 rounded-lg border border-gray-200 text-[11px] font-mono uppercase focus:border-orange-400 outline-none" />
      ) : (
        <div className="space-y-1">
          {(["R", "G", "B"] as const).map((ch, i) => (
            <label key={ch} className="flex items-center gap-2">
              <span className="text-[9px] w-3 font-bold text-gray-400">{ch}</span>
              <input type="range" min={0} max={255} value={[r, g, b][i]}
                onChange={e => { const a = [r, g, b] as [number, number, number]; a[i] = +e.target.value; onChange(rgbToHex(...a)); }}
                className="flex-1 accent-orange-500" style={{ height: 6 }} />
              <span className="text-[9px] w-7 text-right text-gray-500">{[r, g, b][i]}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Small helpers ──────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function MiniInput({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[9px] font-bold text-gray-400 uppercase block mb-0.5">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full h-7 px-2 rounded-lg border border-gray-200 text-[11px] focus:border-orange-400 outline-none transition" />
    </div>
  );
}

/* ─── Main VisualEditor ──────────────────────────────────────── */
export interface VisualEditorProps { open: boolean; onClose: () => void; }

export function VisualEditor({ open, onClose }: VisualEditorProps) {
  const [editMode, setEditMode] = useState(false);
  const [selectedEl, setSelectedEl] = useState<HTMLElement | null>(null);
  const [selCount, setSelCount] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("style");
  const [breakpoint, setBp] = useState<Breakpoint>("desktop");
  const [overrides, setOverrides] = useState<OverrideMap>(loadOv);
  const [history, setHistory] = useState<StyleEntry[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [saved, setSaved] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  /* Inject / update <style> tag — always active so overrides survive re-renders */
  useEffect(() => {
    if (!styleRef.current) {
      const s = document.createElement("style");
      s.id = "ve-overrides";
      document.head.appendChild(s);
      styleRef.current = s;
    }
    styleRef.current.textContent = ovToCSS(overrides);
  }, [overrides]);

  /* Edit mode: body attribute drives CSS hover outlines */
  useEffect(() => {
    if (editMode) {
      document.body.setAttribute("data-ve", "1");
    } else {
      document.body.removeAttribute("data-ve");
      document.querySelectorAll("[data-ve-sel]").forEach(el => el.removeAttribute("data-ve-sel"));
      setSelectedEl(null);
    }
    return () => document.body.removeAttribute("data-ve");
  }, [editMode]);

  /* Click capture: select elements */
  useEffect(() => {
    if (!editMode) return;
    const handle = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (panelRef.current?.contains(t)) return;
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll("[data-ve-sel]").forEach(el => el.removeAttribute("data-ve-sel"));
      t.setAttribute("data-ve-sel", "1");
      setSelectedEl(t);
      setSelCount(c => c + 1);
      setActiveTab("style");
    };
    document.addEventListener("click", handle, true);
    return () => document.removeEventListener("click", handle, true);
  }, [editMode]);

  /* When panel closes, leave edit mode */
  useEffect(() => { if (!open) { setEditMode(false); } }, [open]);

  /* Apply a style change */
  const apply = useCallback((prop: string, val: string) => {
    if (!selectedEl) return;
    const sel = getCssSel(selectedEl);
    const prev = overrides[sel]?.[prop] ?? "";
    selectedEl.style.setProperty(prop, val);
    setOverrides(ov => ({ ...ov, [sel]: { ...(ov[sel] ?? {}), [prop]: val } }));
    const entry: StyleEntry = { selector: sel, property: prop, prev, next: val };
    setHistory(h => [...h.slice(0, histIdx + 1), entry]);
    setHistIdx(i => i + 1);
  }, [selectedEl, histIdx, overrides]);

  function undo() {
    if (histIdx < 0) return;
    const e = history[histIdx];
    setOverrides(ov => {
      const nxt = { ...ov };
      if (e.prev) { nxt[e.selector] = { ...(nxt[e.selector] ?? {}), [e.property]: e.prev }; }
      else { const { [e.property]: _removed, ...rest } = nxt[e.selector] ?? {}; nxt[e.selector] = rest; }
      return nxt;
    });
    setHistIdx(i => i - 1);
  }

  function redo() {
    if (histIdx >= history.length - 1) return;
    const e = history[histIdx + 1];
    setOverrides(ov => ({ ...ov, [e.selector]: { ...(ov[e.selector] ?? {}), [e.property]: e.next } }));
    setHistIdx(i => i + 1);
  }

  function handleSave() {
    savOv(overrides);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function resetEl() {
    if (!selectedEl) return;
    const sel = getCssSel(selectedEl);
    selectedEl.removeAttribute("style");
    setOverrides(ov => { const n = { ...ov }; delete n[sel]; return n; });
  }

  function resetAll() {
    document.querySelectorAll("[style]").forEach(el => el.removeAttribute("style"));
    setOverrides({});
    localStorage.removeItem(VE_KEY);
  }

  function getVal(prop: string): string {
    if (!selectedEl) return "";
    return overrides[getCssSel(selectedEl)]?.[prop] ?? "";
  }

  const tabs: [Tab, string, React.ElementType][] = [
    ["style", "Style", Layers],
    ["typography", "Text", Type],
    ["layout", "Layout", LayoutGrid],
    ["effects", "FX", Zap],
  ];

  if (!open) return null;

  return (
    <>
      {/* Global edit-mode styles */}
      <style>{`
        [data-ve="1"] *:not([data-ve-panel] *):hover {
          outline: 2px dashed rgba(249,115,22,0.7) !important;
          outline-offset: 1px !important;
          cursor: crosshair !important;
        }
        [data-ve-sel="1"]:not([data-ve-panel] *) {
          outline: 2px solid #f97316 !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 4px rgba(249,115,22,0.12) !important;
        }
      `}</style>

      {/* ── Side panel ── */}
      <div
        data-ve-panel=""
        ref={panelRef}
        className="fixed top-0 right-0 bottom-0 z-[10000] bg-white border-l border-gray-200 shadow-2xl flex flex-col"
        style={{ width: 300, fontFamily: "system-ui, sans-serif", fontSize: 12 }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2.5 shrink-0" style={{ background: "#363092" }}>
          <Palette className="h-4 w-4 text-white" />
          <span className="text-white font-bold text-sm flex-1">Visual Editor</span>
          <button onClick={undo} disabled={histIdx < 0} title="Undo"
            className="h-7 w-7 rounded-lg grid place-items-center transition disabled:opacity-30"
            style={{ background: "rgba(255,255,255,0.12)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
            <Undo2 className="h-3.5 w-3.5 text-white" />
          </button>
          <button onClick={redo} disabled={histIdx >= history.length - 1} title="Redo"
            className="h-7 w-7 rounded-lg grid place-items-center transition disabled:opacity-30"
            style={{ background: "rgba(255,255,255,0.12)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
            <Redo2 className="h-3.5 w-3.5 text-white" />
          </button>
          <button onClick={onClose}
            className="h-7 w-7 rounded-lg grid place-items-center transition"
            style={{ background: "rgba(255,255,255,0.12)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
            <X className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Edit mode toggle + breakpoints */}
        <div className="px-3 py-2.5 border-b border-gray-100 space-y-2 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-700">Edit Mode</p>
              {editMode && selectedEl ? (
                <p className="text-[9px] text-orange-500 font-medium mt-0.5">
                  &lt;{selectedEl.tagName.toLowerCase()}&gt; selected
                </p>
              ) : (
                <p className="text-[9px] text-gray-400 mt-0.5">
                  {editMode ? "Click any element" : "Toggle to start"}
                </p>
              )}
            </div>
            <button onClick={() => setEditMode(m => !m)}
              className="relative h-6 w-11 rounded-full transition-colors duration-200 flex-shrink-0"
              style={{ background: editMode ? "#f97316" : "#d1d5db" }}>
              <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200"
                style={{ left: editMode ? 22 : 2 }} />
            </button>
          </div>
          <div className="flex gap-1 rounded-xl p-0.5" style={{ background: "#f3f4f6" }}>
            {([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as [Breakpoint, React.ElementType][]).map(([bp, Icon]) => (
              <button key={bp} onClick={() => setBp(bp)}
                className="flex-1 h-7 rounded-lg flex items-center justify-center transition"
                style={{
                  background: bp === breakpoint ? "#fff" : "transparent",
                  boxShadow: bp === breakpoint ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  color: bp === breakpoint ? "#363092" : "#9ca3af",
                }}>
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
          {breakpoint !== "desktop" && (
            <p className="text-[9px] font-medium" style={{ color: "#ea580c" }}>
              Preview: {breakpoint === "tablet" ? "768px" : "390px"} viewport
            </p>
          )}
        </div>

        {/* Tab bar */}
        {selectedEl && (
          <div className="flex border-b border-gray-100 shrink-0" style={{ background: "#f9fafb" }}>
            {tabs.map(([t, label, Icon]) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className="flex-1 flex flex-col items-center gap-0.5 py-2 border-b-2 transition"
                style={{
                  borderBottomColor: activeTab === t ? "#f97316" : "transparent",
                  color: activeTab === t ? "#ea580c" : "#9ca3af",
                  background: activeTab === t ? "#fff" : "transparent",
                }}>
                <Icon className="h-3.5 w-3.5" />
                <span className="text-[8px] font-bold uppercase tracking-wider">{label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto">
          {!selectedEl ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <Palette className="h-10 w-10 mb-3" style={{ color: "#d1d5db" }} />
              <p className="text-sm font-semibold text-gray-500">
                {editMode ? "Click any element to select it" : "Enable Edit Mode above"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {editMode ? "Hover to see outlines, click to select" : "Toggle the switch to start editing"}
              </p>
            </div>
          ) : (
            <div className="p-3 space-y-4">

              {/* ── STYLE ── */}
              {activeTab === "style" && (<>
                <Section title="Background Color">
                  <ColorPicker value={getVal("background-color") || "#ffffff"} onChange={v => apply("background-color", v)} />
                </Section>
                <Section title="Text Color">
                  <ColorPicker value={getVal("color") || "#000000"} onChange={v => apply("color", v)} />
                </Section>
                <Section title="Border Color">
                  <ColorPicker value={getVal("border-color") || "#e5e7eb"} onChange={v => apply("border-color", v)} />
                </Section>
                <Section title="Border">
                  <div className="grid grid-cols-2 gap-2">
                    <MiniInput label="Width" value={getVal("border-width")} onChange={v => apply("border-width", v)} placeholder="1px" />
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Style</p>
                      <select className="w-full h-7 px-2 rounded-lg border border-gray-200 text-[11px] bg-white outline-none"
                        value={getVal("border-style")} onChange={e => apply("border-style", e.target.value)}>
                        <option value="">–</option>
                        <option value="solid">solid</option>
                        <option value="dashed">dashed</option>
                        <option value="dotted">dotted</option>
                        <option value="none">none</option>
                      </select>
                    </div>
                  </div>
                  <MiniInput label="Radius" value={getVal("border-radius")} onChange={v => apply("border-radius", v)} placeholder="8px" />
                </Section>
                <Section title="Background Gradient">
                  <MiniInput label="CSS gradient" value={getVal("background-image")} onChange={v => apply("background-image", v)} placeholder="linear-gradient(135deg,#363092,#7c3aed)" />
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      ["Navy→Indigo", "linear-gradient(135deg,#363092,#7c3aed)"],
                      ["Orange", "linear-gradient(135deg,#f97316,#fbbf24)"],
                      ["Teal", "linear-gradient(135deg,#0891b2,#059669)"],
                      ["Rose", "linear-gradient(135deg,#ec4899,#dc2626)"],
                    ].map(([lbl, val]) => (
                      <button key={lbl} onClick={() => apply("background-image", val)}
                        className="h-7 rounded-lg text-[9px] font-bold text-white truncate px-1 transition hover:opacity-90"
                        style={{ background: val }}>{lbl}</button>
                    ))}
                  </div>
                </Section>
              </>)}

              {/* ── TYPOGRAPHY ── */}
              {activeTab === "typography" && (<>
                <Section title="Font">
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Family</p>
                    <select className="w-full h-7 px-2 rounded-lg border border-gray-200 text-[11px] bg-white outline-none"
                      value={getVal("font-family")} onChange={e => apply("font-family", e.target.value)}>
                      <option value="">System Default</option>
                      <option value="Inter, sans-serif">Inter</option>
                      <option value="'Roboto', sans-serif">Roboto</option>
                      <option value="'Poppins', sans-serif">Poppins</option>
                      <option value="'Playfair Display', serif">Playfair Display</option>
                      <option value="Georgia, serif">Georgia</option>
                      <option value="'JetBrains Mono', monospace">Monospace</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <MiniInput label="Size" value={getVal("font-size")} onChange={v => apply("font-size", v)} placeholder="14px" />
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Weight</p>
                      <select className="w-full h-7 px-2 rounded-lg border border-gray-200 text-[11px] bg-white outline-none"
                        value={getVal("font-weight")} onChange={e => apply("font-weight", e.target.value)}>
                        <option value="">Default</option>
                        <option value="300">Light 300</option>
                        <option value="400">Regular 400</option>
                        <option value="500">Medium 500</option>
                        <option value="600">SemiBold 600</option>
                        <option value="700">Bold 700</option>
                        <option value="800">ExtraBold 800</option>
                        <option value="900">Black 900</option>
                      </select>
                    </div>
                  </div>
                </Section>
                <Section title="Spacing">
                  <div className="grid grid-cols-2 gap-2">
                    <MiniInput label="Line Height" value={getVal("line-height")} onChange={v => apply("line-height", v)} placeholder="1.5" />
                    <MiniInput label="Letter Spacing" value={getVal("letter-spacing")} onChange={v => apply("letter-spacing", v)} placeholder="0em" />
                  </div>
                </Section>
                <Section title="Alignment">
                  <div className="flex gap-1">
                    {([["left", AlignLeft], ["center", AlignCenter], ["right", AlignRight]] as [string, React.ElementType][]).map(([v, Icon]) => (
                      <button key={v} onClick={() => apply("text-align", v)}
                        className="flex-1 h-8 rounded-lg flex items-center justify-center border transition"
                        style={{
                          borderColor: getVal("text-align") === v ? "#f97316" : "#e5e7eb",
                          background: getVal("text-align") === v ? "#fff7ed" : "transparent",
                          color: getVal("text-align") === v ? "#ea580c" : "#9ca3af",
                        }}>
                        <Icon className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>
                </Section>
                <Section title="Edit Text Content">
                  <textarea key={selCount}
                    defaultValue={selectedEl.textContent ?? ""}
                    onBlur={e => { if (selectedEl) selectedEl.textContent = e.target.value; }}
                    rows={3} placeholder="Edit text content…"
                    className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-[11px] resize-none focus:border-orange-400 outline-none" />
                  <p className="text-[9px] text-gray-400">Changes apply on blur. Session only.</p>
                </Section>
              </>)}

              {/* ── LAYOUT ── */}
              {activeTab === "layout" && (<>
                <Section title="Dimensions">
                  <div className="grid grid-cols-2 gap-2">
                    <MiniInput label="Width" value={getVal("width")} onChange={v => apply("width", v)} placeholder="auto" />
                    <MiniInput label="Height" value={getVal("height")} onChange={v => apply("height", v)} placeholder="auto" />
                    <MiniInput label="Min W" value={getVal("min-width")} onChange={v => apply("min-width", v)} placeholder="0" />
                    <MiniInput label="Max W" value={getVal("max-width")} onChange={v => apply("max-width", v)} placeholder="none" />
                  </div>
                </Section>
                <Section title="Padding">
                  <div className="grid grid-cols-2 gap-2">
                    {["top", "right", "bottom", "left"].map(d => (
                      <MiniInput key={d} label={d.charAt(0).toUpperCase() + d.slice(1)}
                        value={getVal(`padding-${d}`)} onChange={v => apply(`padding-${d}`, v)} placeholder="0" />
                    ))}
                  </div>
                </Section>
                <Section title="Margin">
                  <div className="grid grid-cols-2 gap-2">
                    {["top", "right", "bottom", "left"].map(d => (
                      <MiniInput key={d} label={d.charAt(0).toUpperCase() + d.slice(1)}
                        value={getVal(`margin-${d}`)} onChange={v => apply(`margin-${d}`, v)} placeholder="0" />
                    ))}
                  </div>
                </Section>
                <Section title="Display">
                  <select className="w-full h-7 px-2 rounded-lg border border-gray-200 text-[11px] bg-white outline-none"
                    value={getVal("display")} onChange={e => apply("display", e.target.value)}>
                    <option value="">Default</option>
                    <option value="block">block</option>
                    <option value="flex">flex</option>
                    <option value="grid">grid</option>
                    <option value="inline">inline</option>
                    <option value="inline-flex">inline-flex</option>
                    <option value="none">none (hidden)</option>
                  </select>
                </Section>
              </>)}

              {/* ── EFFECTS ── */}
              {activeTab === "effects" && (<>
                <Section title="Opacity">
                  <p className="text-[9px] text-gray-400 mb-1">
                    Value: {Math.round(parseFloat(getVal("opacity") || "1") * 100)}%
                  </p>
                  <input type="range" min={0} max={1} step={0.01}
                    value={parseFloat(getVal("opacity") || "1")}
                    onChange={e => apply("opacity", e.target.value)}
                    className="w-full accent-orange-500" />
                </Section>
                <Section title="Box Shadow">
                  <MiniInput label="Value" value={getVal("box-shadow")} onChange={v => apply("box-shadow", v)} placeholder="0 4px 12px rgba(0,0,0,.12)" />
                  <div className="grid grid-cols-2 gap-1">
                    {([["None","none"],["Soft","0 2px 8px rgba(0,0,0,.08)"],["Medium","0 4px 20px rgba(0,0,0,.14)"],["Strong","0 8px 32px rgba(0,0,0,.22)"]] as [string,string][]).map(([l,v]) => (
                      <button key={l} onClick={() => apply("box-shadow", v)}
                        className="h-7 rounded-lg border border-gray-200 text-[10px] font-medium text-gray-600 transition hover:border-orange-400 hover:text-orange-600">
                        {l}
                      </button>
                    ))}
                  </div>
                </Section>
                <Section title="Visibility">
                  <div className="flex gap-1">
                    {([["visible","Visible",Eye],["hidden","Hidden",EyeOff]] as [string,string,React.ElementType][]).map(([v,l,Icon]) => (
                      <button key={v} onClick={() => apply("visibility", v)}
                        className="flex-1 h-8 rounded-lg flex items-center justify-center gap-1 border text-[10px] font-bold transition"
                        style={{
                          borderColor: getVal("visibility") === v || (v === "visible" && !getVal("visibility")) ? "#f97316" : "#e5e7eb",
                          background: getVal("visibility") === v || (v === "visible" && !getVal("visibility")) ? "#fff7ed" : "transparent",
                          color: getVal("visibility") === v || (v === "visible" && !getVal("visibility")) ? "#ea580c" : "#9ca3af",
                        }}>
                        <Icon className="h-3.5 w-3.5" />{l}
                      </button>
                    ))}
                  </div>
                </Section>
                <Section title="Transform">
                  <MiniInput label="Rotate (deg)" value={getVal("--ve-rotate")} onChange={v => apply("transform", `rotate(${v}deg)`)} placeholder="0" />
                  <MiniInput label="Scale" value={getVal("--ve-scale")} onChange={v => apply("transform", `scale(${v})`)} placeholder="1" />
                </Section>
                <Section title="Animation">
                  <select className="w-full h-7 px-2 rounded-lg border border-gray-200 text-[11px] bg-white outline-none"
                    onChange={e => apply("animation", e.target.value)}>
                    <option value="">None</option>
                    <option value="pulse 2s ease-in-out infinite">Pulse</option>
                    <option value="bounce 1s infinite">Bounce</option>
                    <option value="spin 2s linear infinite">Spin</option>
                  </select>
                </Section>
              </>)}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="border-t border-gray-100 p-3 space-y-2 shrink-0">
          <div className="grid grid-cols-3 gap-1.5">
            <button onClick={resetEl} disabled={!selectedEl}
              className="h-8 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-500 transition disabled:opacity-30"
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#fca5a5"; (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = ""; (e.currentTarget as HTMLButtonElement).style.color = ""; }}>
              Reset El
            </button>
            <button onClick={resetAll}
              className="h-8 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-500 transition"
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#fca5a5"; (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = ""; (e.currentTarget as HTMLButtonElement).style.color = ""; }}>
              Reset All
            </button>
            <button onClick={handleSave}
              className="h-8 rounded-lg text-white text-[10px] font-bold flex items-center justify-center gap-1 transition hover:opacity-90"
              style={{ background: saved ? "#059669" : "#363092" }}>
              {saved ? <><CheckCircle className="h-3 w-3" />Saved!</> : <><Save className="h-3 w-3" />Save</>}
            </button>
          </div>
          <button onClick={handleSave}
            className="w-full h-8 rounded-lg text-white text-[10px] font-bold flex items-center justify-center gap-1 transition hover:opacity-90"
            style={{ background: "#f97316" }}>
            <CheckCircle className="h-3 w-3" /> Publish Changes
          </button>
        </div>
      </div>
    </>
  );
}

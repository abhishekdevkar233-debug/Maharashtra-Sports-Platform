import { useState } from "react";
import {
  ArrowLeft, MapPin, Clock, Users, CheckCircle2, XCircle, QrCode,
  Calendar, ShieldCheck, LogOut,
  ClipboardList, Ban, ScanLine, DoorOpen, UserX,
} from "lucide-react";
import {
  FACILITIES, generateSlots, SLOT_COLOR, FACILITY_STATUS_COLOR, nextBookingId, generateQrToken,
  type Facility, type Slot, type Booking, type Purpose, type BookingType, type ScanLog, type ScanResult,
} from "@/components/gms/facilityBookingData";

const ACCENT = "#363092";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}
function next7Days() {
  const out: string[] = [];
  const base = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" });
}

/** Deterministic stylized QR-like pattern — visual only, not a scannable real QR. */
function QrVisual({ token, size = 132 }: { token: string; size?: number }) {
  const cells = 12;
  const cell = size / cells;
  const bits: boolean[] = [];
  for (let i = 0; i < cells * cells; i++) {
    const c = token.charCodeAt(i % token.length) || 0;
    bits.push(((c * (i + 7)) % 5) < 2);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg bg-white">
      {Array.from({ length: cells }, (_, r) =>
        Array.from({ length: cells }, (_, c) => {
          const isFinder = (r < 3 && c < 3) || (r < 3 && c >= cells - 3) || (r >= cells - 3 && c < 3);
          const on = isFinder ? (r === 1 && c === 1 ? true : (r === 0 || r === 2 || c === 0 || c === 2) || (r < 3 && c >= cells - 3 && (r === 0 || r === 2 || c === cells - 3 || c === cells - 1)) || (r >= cells - 3 && c < 3 && (r === cells - 3 || r === cells - 1 || c === 0 || c === 2)) ? true : false) : bits[r * cells + c];
          return on ? <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#111827" /> : null;
        })
      )}
    </svg>
  );
}

function StatusBadge({ status }: { status: Facility["status"] }) {
  const c = FACILITY_STATUS_COLOR[status];
  return <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ color: c.text, background: c.bg }}>{status}</span>;
}

/* ── Step 1: Facilities ───────────────────────────────────────────── */

function FacilitiesStep({ facilities, onBook }: { facilities: Facility[]; onBook: (f: Facility) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {facilities.map(f => (
        <div key={f.id} className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="h-28 grid place-items-center text-4xl" style={{ background: "linear-gradient(135deg,#eeeefa,#f3f0ff)" }}>{f.emoji}</div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="text-sm font-bold text-gray-900 leading-snug">{f.name}</div>
              <StatusBadge status={f.status} />
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1 mb-1"><MapPin className="h-3 w-3" /> {f.location}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1 mb-3"><Clock className="h-3 w-3" /> {f.hours}</div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Occupancy</span>
              <span className="font-semibold text-gray-700">{f.occupancy}/{f.capacity}</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden mb-4">
              <div className="h-full rounded-full" style={{ width: `${(f.occupancy / f.capacity) * 100}%`, background: f.occupancy / f.capacity > 0.85 ? "#dc2626" : ACCENT }} />
            </div>
            <button
              disabled={f.status === "Fully Booked" || f.status === "Under Maintenance"}
              onClick={() => onBook(f)}
              className="w-full h-9 rounded-lg text-white text-xs font-bold disabled:opacity-40"
              style={{ background: ACCENT }}
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Step 2: Calendar + slots ─────────────────────────────────────── */

function CalendarStep({ facility, onPick, onBack }: { facility: Facility; onPick: (date: string, slot: Slot) => void; onBack: () => void }) {
  const dates = next7Days();
  const [date, setDate] = useState(dates[0]);
  const slots = generateSlots(facility, date);

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-4"><ArrowLeft className="h-3.5 w-3.5" /> Back to Facilities</button>
      <div className="text-sm font-bold text-gray-900 mb-1">{facility.name}</div>
      <div className="text-xs text-gray-500 mb-4">Select a date and time slot</div>

      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {dates.map(d => (
          <button key={d} onClick={() => setDate(d)}
            className="shrink-0 rounded-xl px-3.5 py-2.5 text-center min-w-[76px]"
            style={date === d ? { background: ACCENT, color: "white" } : { background: "#F4F5FB", color: "#374151" }}>
            <div className="text-[10px] font-semibold uppercase">{fmtDate(d).split(" ")[0]}</div>
            <div className="text-sm font-bold">{fmtDate(d).split(" ")[1]}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {slots.map(s => {
          const c = SLOT_COLOR[s.status];
          const disabled = s.status === "Full" || s.status === "Maintenance";
          return (
            <button key={s.time} disabled={disabled} onClick={() => onPick(date, s)}
              className="text-left rounded-xl p-3.5 border transition disabled:opacity-60"
              style={{ background: c.bg, borderColor: c.border }}>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: c.text }}>
                <Calendar className="h-3 w-3" /> {s.status}
              </div>
              <div className="text-sm font-bold text-gray-900">{s.time}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{disabled ? "No slots" : `${s.remaining}/${s.total} slots left`}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 3: Booking form ─────────────────────────────────────────── */

function BookingFormStep({ facility, date, slot, onSubmit, onBack }: {
  facility: Facility; date: string; slot: Slot;
  onSubmit: (details: { athleteName: string; purpose: Purpose; bookingType: BookingType; participants: number; coach: string }) => void;
  onBack: () => void;
}) {
  const [athleteName, setAthleteName] = useState("");
  const [purpose, setPurpose] = useState<Purpose>("Practice");
  const [bookingType, setBookingType] = useState<BookingType>("Individual");
  const [participants, setParticipants] = useState(1);
  const [coach, setCoach] = useState("");

  return (
    <div className="max-w-lg">
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-4"><ArrowLeft className="h-3.5 w-3.5" /> Back to Calendar</button>
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
        <div className="text-sm font-bold text-gray-900 mb-0.5">{facility.name}</div>
        <div className="text-xs text-gray-500 mb-4">{fmtDate(date)} &middot; {slot.time}</div>

        <div className="space-y-3.5">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Athlete / Booked by</label>
            <input value={athleteName} onChange={e => setAthleteName(e.target.value)} placeholder="e.g. Rohan Deshmukh"
              className="w-full h-10 mt-1.5 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#363092]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Purpose</label>
              <select value={purpose} onChange={e => setPurpose(e.target.value as Purpose)}
                className="w-full h-10 mt-1.5 px-3 rounded-xl border border-gray-200 text-sm outline-none bg-white">
                {(["Practice", "Training", "Competition"] as Purpose[]).map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Booking Type</label>
              <div className="flex rounded-xl bg-gray-100 p-1 mt-1.5">
                {(["Individual", "Team"] as BookingType[]).map(t => (
                  <button key={t} onClick={() => setBookingType(t)} className="flex-1 h-8 rounded-lg text-xs font-semibold transition"
                    style={bookingType === t ? { background: "white", color: ACCENT, boxShadow: "0 1px 2px rgba(0,0,0,0.08)" } : { color: "#6B7280" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Participants</label>
              <input type="number" min={1} max={facility.capacity} value={participants} onChange={e => setParticipants(Number(e.target.value))}
                className="w-full h-10 mt-1.5 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#363092]" />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Coach (optional)</label>
              <input value={coach} onChange={e => setCoach(e.target.value)} placeholder="e.g. Coach Sanjay Kadam"
                className="w-full h-10 mt-1.5 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#363092]" />
            </div>
          </div>

          <button
            disabled={!athleteName.trim()}
            onClick={() => onSubmit({ athleteName: athleteName.trim(), purpose, bookingType, participants, coach })}
            className="w-full h-11 rounded-xl text-white font-bold text-sm disabled:opacity-40 mt-1"
            style={{ background: ACCENT }}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Step 4: Digital Entry Pass ───────────────────────────────────── */

function EntryPassCard({ booking }: { booking: Booking }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm max-w-md">
      <div className="p-4 text-white" style={{ background: `linear-gradient(135deg,${ACCENT},#1e2a7a)` }}>
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Digital Entry Pass</div>
        <div className="text-sm font-bold mt-0.5">Directorate of Sports & Youth Services, Maharashtra</div>
      </div>
      <div className="p-5 bg-white flex gap-4">
        <QrVisual token={booking.qrToken} />
        <div className="min-w-0 flex-1 text-xs space-y-1.5">
          <div><span className="text-gray-400">Booking ID</span><div className="font-bold text-gray-900 font-mono">{booking.id}</div></div>
          <div><span className="text-gray-400">Athlete</span><div className="font-bold text-gray-900">{booking.athleteName}</div></div>
          <div><span className="text-gray-400">Facility</span><div className="font-semibold text-gray-700">{booking.facilityName}</div></div>
          <div><span className="text-gray-400">Date & Time</span><div className="font-semibold text-gray-700">{fmtDate(booking.date)} &middot; {booking.slot}</div></div>
        </div>
      </div>
      <div className="px-5 pb-4 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full" style={{ color: "#059669", background: "#ECFDF5" }}>{booking.status}</span>
        <span className="text-[10px] text-gray-400">Valid until {booking.slot.split(" – ")[1]}, {fmtDate(booking.date)}</span>
      </div>
      <div className="px-5 pb-5 rounded-b-2xl bg-amber-50 pt-3 -mt-1">
        <p className="text-[11px] text-amber-800 leading-relaxed">This QR Code is mandatory for stadium entry. Entry is permitted only through a valid QR Code.</p>
      </div>
    </div>
  );
}

function ConfirmationStep({ booking, onDone }: { booking: Booking; onDone: () => void }) {
  return (
    <div className="max-w-md">
      <div className="flex items-center gap-2 mb-1">
        <CheckCircle2 className="h-5 w-5" style={{ color: "#059669" }} />
        <div className="text-sm font-bold text-gray-900">Your booking has been confirmed.</div>
      </div>
      <p className="text-xs text-gray-500 mb-5">This QR Code is mandatory for stadium entry.</p>
      <EntryPassCard booking={booking} />
      <button onClick={onDone} className="mt-5 h-10 px-5 rounded-xl text-sm font-semibold" style={{ background: "#F4F5FB", color: ACCENT }}>
        Done
      </button>
    </div>
  );
}

/* ── My Bookings ──────────────────────────────────────────────────── */

function MyBookingsTab({ bookings, onView }: { bookings: Booking[]; onView: (b: Booking) => void }) {
  if (bookings.length === 0) return <p className="text-sm text-gray-400">No bookings yet — book a facility to see your Digital Entry Pass here.</p>;
  return (
    <div className="space-y-3 max-w-2xl">
      {bookings.map(b => (
        <button key={b.id} onClick={() => onView(b)} className="w-full text-left rounded-2xl bg-white border border-gray-200 shadow-sm p-4 flex items-center justify-between hover:shadow-md transition">
          <div>
            <div className="text-sm font-bold text-gray-900">{b.facilityName}</div>
            <div className="text-xs text-gray-500 mt-0.5">{fmtDate(b.date)} &middot; {b.slot} &middot; {b.athleteName}</div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full" style={
            b.status === "Confirmed" ? { color: "#059669", background: "#ECFDF5" } :
            b.status === "Checked In" ? { color: ACCENT, background: "#eeeefa" } :
            b.status === "Cancelled" ? { color: "#DC2626", background: "#FEF2F2" } : { color: "#D97706", background: "#FFFBEB" }
          }>{b.status}</span>
        </button>
      ))}
    </div>
  );
}

/* ── QR Scanner ───────────────────────────────────────────────────── */

function evaluateScan(booking: Booking | undefined): ScanResult {
  if (!booking) return "Booking Not Found";
  if (booking.status === "Cancelled") return "Expired Booking";
  if (booking.status === "Checked In") return "Already Checked In";
  return "Valid";
}

function ScannerTab({ bookings, onScan }: { bookings: Booking[]; onScan: (bookingId: string | null, result: ScanResult) => void }) {
  const [selectedId, setSelectedId] = useState("");
  const [result, setResult] = useState<{ result: ScanResult; booking?: Booking } | null>(null);

  function simulate(forceInvalid?: ScanResult) {
    if (forceInvalid) {
      setResult({ result: forceInvalid });
      onScan(null, forceInvalid);
      return;
    }
    const booking = bookings.find(b => b.id === selectedId);
    const r = evaluateScan(booking);
    setResult({ result: r, booking });
    onScan(booking?.id ?? null, r);
  }

  return (
    <div className="max-w-lg">
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <ScanLine className="h-4 w-4" style={{ color: ACCENT }} />
          <div className="text-sm font-bold text-gray-900">Simulate Entry Scan</div>
        </div>
        <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Select a booking QR to scan</label>
        <select value={selectedId} onChange={e => setSelectedId(e.target.value)}
          className="w-full h-10 mt-1.5 px-3 rounded-xl border border-gray-200 text-sm outline-none bg-white mb-3">
          <option value="">Choose booking…</option>
          {bookings.map(b => <option key={b.id} value={b.id}>{b.id} — {b.athleteName} ({b.facilityName})</option>)}
        </select>
        <div className="flex flex-wrap gap-2">
          <button disabled={!selectedId} onClick={() => simulate()} className="h-9 px-4 rounded-lg text-white text-xs font-bold disabled:opacity-40" style={{ background: ACCENT }}>
            Scan QR Code
          </button>
          <button onClick={() => simulate("Invalid QR Code")} className="h-9 px-4 rounded-lg text-xs font-semibold text-gray-600 border border-gray-200">Simulate Invalid Code</button>
          <button onClick={() => simulate("Wrong Time Slot")} className="h-9 px-4 rounded-lg text-xs font-semibold text-gray-600 border border-gray-200">Simulate Wrong Slot</button>
        </div>
      </div>

      {result && (
        result.result === "Valid" && result.booking ? (
          <div className="rounded-2xl p-6 text-center" style={{ background: "#ECFDF5", border: "1px solid #A7F3D0" }}>
            <CheckCircle2 className="h-10 w-10 mx-auto mb-2" style={{ color: "#059669" }} />
            <div className="text-lg font-black" style={{ color: "#059669" }}>Access Granted</div>
            <p className="text-xs text-emerald-800 mt-1">Welcome, {result.booking.athleteName}!</p>
            <div className="grid grid-cols-2 gap-3 mt-4 text-left text-xs">
              <div><span className="text-emerald-700/70">Facility</span><div className="font-bold text-emerald-900">{result.booking.facilityName}</div></div>
              <div><span className="text-emerald-700/70">Entry Time</span><div className="font-bold text-emerald-900">{new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div></div>
              <div><span className="text-emerald-700/70">Gate</span><div className="font-bold text-emerald-900">Gate {(seedGate(result.booking.id))}</div></div>
              <div><span className="text-emerald-700/70">Attendance</span><div className="font-bold text-emerald-900">Marked automatically</div></div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl p-6 text-center" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
            <XCircle className="h-10 w-10 mx-auto mb-2" style={{ color: "#DC2626" }} />
            <div className="text-lg font-black" style={{ color: "#DC2626" }}>Access Denied</div>
            <p className="text-xs text-red-800 mt-1 font-semibold">{result.result}</p>
            <p className="text-[11px] text-red-700 mt-2">Please contact the facility administrator.</p>
          </div>
        )
      )}
    </div>
  );
}

function seedGate(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return (h % 4) + 1;
}

/* ── Admin Dashboard ──────────────────────────────────────────────── */

function AdminTab({ facilities, bookings, scanLogs, onBlockToggle, onCancel }: {
  facilities: Facility[]; bookings: Booking[]; scanLogs: ScanLog[];
  onBlockToggle: (facilityId: string) => void; onCancel: (bookingId: string) => void;
}) {
  const today = todayIso();
  const todaysBookings = bookings.filter(b => b.date === today);
  const upcoming = bookings.filter(b => b.date > today);
  const noShows = bookings.filter(b => b.status === "No-Show");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Bookings", value: todaysBookings.length, icon: ClipboardList },
          { label: "Upcoming Bookings", value: upcoming.length, icon: Calendar },
          { label: "QR Scans Logged", value: scanLogs.length, icon: ScanLine },
          { label: "No-Show Athletes", value: noShows.length, icon: UserX },
        ].map(k => (
          <div key={k.label} className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4">
            <k.icon className="h-4 w-4 mb-2" style={{ color: ACCENT }} />
            <div className="text-xl font-black text-gray-900">{k.value}</div>
            <div className="text-[11px] text-gray-500 mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Live Facility Occupancy</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {facilities.map(f => (
            <div key={f.id} className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-xs font-bold text-gray-900 truncate">{f.name}</div>
                <StatusBadge status={f.status} />
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden mb-2">
                <div className="h-full rounded-full" style={{ width: `${(f.occupancy / f.capacity) * 100}%`, background: ACCENT }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">{f.occupancy}/{f.capacity} occupied</span>
                <button onClick={() => onBlockToggle(f.id)} className="text-[10px] font-bold flex items-center gap-1" style={{ color: f.status === "Under Maintenance" ? "#059669" : "#DC2626" }}>
                  <Ban className="h-3 w-3" /> {f.status === "Under Maintenance" ? "Unblock" : "Block for Maintenance"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Today's & Upcoming Bookings</div>
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                {["Booking ID", "Athlete", "Facility", "Date", "Slot", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 8).map(b => (
                <tr key={b.id} className="border-b border-gray-50">
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-700">{b.id}</td>
                  <td className="px-4 py-2.5 font-semibold text-gray-900">{b.athleteName}</td>
                  <td className="px-4 py-2.5 text-gray-500">{b.facilityName}</td>
                  <td className="px-4 py-2.5 text-gray-500">{fmtDate(b.date)}</td>
                  <td className="px-4 py-2.5 text-gray-500">{b.slot}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={
                      b.status === "Confirmed" ? { color: "#059669", background: "#ECFDF5" } :
                      b.status === "Cancelled" ? { color: "#DC2626", background: "#FEF2F2" } :
                      b.status === "Checked In" ? { color: ACCENT, background: "#eeeefa" } : { color: "#D97706", background: "#FFFBEB" }
                    }>{b.status}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {b.status === "Confirmed" && (
                      <button onClick={() => onCancel(b.id)} className="text-[11px] font-semibold text-red-500">Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-6 text-center text-xs text-gray-400">No bookings yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">QR Scan Logs &middot; Entry / Exit History</div>
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                {["Time", "Booking ID", "Athlete", "Facility", "Gate", "Result"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scanLogs.map(l => (
                <tr key={l.id} className="border-b border-gray-50">
                  <td className="px-4 py-2.5 text-gray-500">{l.time}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-700">{l.bookingId}</td>
                  <td className="px-4 py-2.5 text-gray-900 font-semibold">{l.athleteName}</td>
                  <td className="px-4 py-2.5 text-gray-500">{l.facilityName}</td>
                  <td className="px-4 py-2.5 text-gray-500">{l.gate}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={l.result === "Valid" ? { color: "#059669", background: "#ECFDF5" } : { color: "#DC2626", background: "#FEF2F2" }}>
                      {l.result === "Valid" ? "Access Granted" : l.result}
                    </span>
                  </td>
                </tr>
              ))}
              {scanLogs.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-6 text-center text-xs text-gray-400">No scans yet — try the QR Scanner tab.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Shell ────────────────────────────────────────────────────────── */

type Step = "facilities" | "calendar" | "form" | "confirm";
type Tab = "book" | "mybookings" | "scan" | "admin";

export function FacilityBookingPortal({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("book");
  const [step, setStep] = useState<Step>("facilities");
  const [facilities, setFacilities] = useState(FACILITIES);
  const [selected, setSelected] = useState<{ facility: Facility; date: string; slot: Slot } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [scanLogs, setScanLogs] = useState<ScanLog[]>([]);

  function startBooking(f: Facility) {
    setSelected({ facility: f, date: "", slot: { time: "", status: "Available", remaining: 0, total: 0 } });
    setStep("calendar");
  }

  function pickSlot(date: string, slot: Slot) {
    if (!selected) return;
    setSelected({ ...selected, date, slot });
    setStep("form");
  }

  function submitBooking(details: { athleteName: string; purpose: Purpose; bookingType: BookingType; participants: number; coach: string }) {
    if (!selected) return;
    const id = nextBookingId();
    const booking: Booking = {
      id, facilityId: selected.facility.id, facilityName: selected.facility.name,
      athleteName: details.athleteName, date: selected.date, slot: selected.slot.time,
      purpose: details.purpose, bookingType: details.bookingType, participants: details.participants,
      coach: details.coach, status: "Confirmed", qrToken: "", createdAt: new Date().toISOString(),
    };
    booking.qrToken = generateQrToken(booking);
    setBookings(prev => [booking, ...prev]);
    setActiveBooking(booking);
    setStep("confirm");
  }

  function viewBooking(b: Booking) {
    setActiveBooking(b);
    setTab("book");
    setStep("confirm");
  }

  function handleScan(bookingId: string | null, result: ScanResult) {
    const booking = bookings.find(b => b.id === bookingId);
    const log: ScanLog = {
      id: `log-${Date.now()}`, time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      bookingId: bookingId ?? "—", athleteName: booking?.athleteName ?? "Unknown", facilityName: booking?.facilityName ?? "—",
      result, gate: booking ? `Gate ${seedGate(booking.id)}` : "—",
    };
    setScanLogs(prev => [log, ...prev]);
    if (result === "Valid" && booking) {
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: "Checked In" } : b));
      setFacilities(prev => prev.map(f => f.id === booking.facilityId ? { ...f, occupancy: Math.min(f.capacity, f.occupancy + 1) } : f));
    }
  }

  function blockToggle(facilityId: string) {
    setFacilities(prev => prev.map(f => f.id === facilityId ? { ...f, status: f.status === "Under Maintenance" ? "Available" : "Under Maintenance" } : f));
  }

  function cancelBooking(bookingId: string) {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "Cancelled" } : b));
  }

  const TABS: { id: Tab; label: string; icon: typeof ClipboardList }[] = [
    { id: "book", label: "Book a Facility", icon: DoorOpen },
    { id: "mybookings", label: "My Bookings", icon: ClipboardList },
    { id: "scan", label: "QR Scanner", icon: ScanLine },
    { id: "admin", label: "Admin Dashboard", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f5fb" }}>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="h-14 flex items-center px-6 gap-4">
          <button onClick={onBack} className="h-8 px-3 rounded-lg border border-gray-200 flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:border-gray-300 transition">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg grid place-items-center" style={{ background: ACCENT }}>
              <QrCode className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 leading-none">Smart Facility Booking & Digital Access</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Maharashtra Sports Department</div>
            </div>
          </div>
          <button onClick={onBack} className="ml-auto h-8 px-3 rounded-lg border border-gray-200 flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:border-red-300 hover:text-red-500 transition">
            <LogOut className="h-3.5 w-3.5" /> Exit
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-6 md:p-8">
        <div className="flex items-center gap-1 rounded-xl p-1 mb-6 w-fit bg-white border border-gray-200 shadow-sm">
          {TABS.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); if (t.id === "book") setStep("facilities"); }}
              className="flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12px] font-semibold transition"
              style={tab === t.id ? { background: ACCENT, color: "white" } : { color: "#6B7280" }}>
              <t.icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "book" && (
          <>
            {step === "facilities" && <FacilitiesStep facilities={facilities} onBook={startBooking} />}
            {step === "calendar" && selected && <CalendarStep facility={selected.facility} onPick={pickSlot} onBack={() => setStep("facilities")} />}
            {step === "form" && selected && selected.date && (
              <BookingFormStep facility={selected.facility} date={selected.date} slot={selected.slot} onSubmit={submitBooking} onBack={() => setStep("calendar")} />
            )}
            {step === "confirm" && activeBooking && <ConfirmationStep booking={activeBooking} onDone={() => { setStep("facilities"); setTab("mybookings"); }} />}
          </>
        )}

        {tab === "mybookings" && <MyBookingsTab bookings={bookings} onView={viewBooking} />}
        {tab === "scan" && <ScannerTab bookings={bookings} onScan={handleScan} />}
        {tab === "admin" && <AdminTab facilities={facilities} bookings={bookings} scanLogs={scanLogs} onBlockToggle={blockToggle} onCancel={cancelBooking} />}
      </div>
    </div>
  );
}

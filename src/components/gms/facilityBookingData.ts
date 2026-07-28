export type FacilityStatus = "Available" | "Limited Slots" | "Fully Booked" | "Under Maintenance";

export type Facility = {
  id: string;
  name: string;
  location: string;
  hours: string;
  capacity: number;
  occupancy: number;
  status: FacilityStatus;
  emoji: string;
};

export const FACILITIES: Facility[] = [
  { id: "athletics", name: "Balewadi Stadium Athletics Track", location: "Balewadi, Pune", hours: "05:00 – 21:00", capacity: 120, occupancy: 64, status: "Available", emoji: "🏃" },
  { id: "pool", name: "Swimming Pool", location: "Balewadi Sports Complex, Pune", hours: "06:00 – 20:00", capacity: 40, occupancy: 37, status: "Limited Slots", emoji: "🏊" },
  { id: "cricket", name: "Cricket Ground", location: "Balewadi, Pune", hours: "06:00 – 19:00", capacity: 30, occupancy: 30, status: "Fully Booked", emoji: "🏏" },
  { id: "football", name: "Football Ground", location: "Balewadi, Pune", hours: "06:00 – 21:00", capacity: 44, occupancy: 18, status: "Available", emoji: "⚽" },
  { id: "indoor", name: "Indoor Hall (Badminton / Kabaddi)", location: "Shiv Chhatrapati Complex, Pune", hours: "06:00 – 22:00", capacity: 60, occupancy: 0, status: "Under Maintenance", emoji: "🏸" },
  { id: "gym", name: "Gymnasium", location: "Balewadi Sports Complex, Pune", hours: "05:00 – 22:00", capacity: 35, occupancy: 22, status: "Available", emoji: "🏋" },
];

export type SlotStatus = "Available" | "Limited" | "Full" | "Maintenance";
export type Slot = { time: string; status: SlotStatus; remaining: number; total: number };

const SLOT_TIMES = ["06:00 – 08:00", "08:00 – 10:00", "10:00 – 12:00", "14:00 – 16:00", "16:00 – 18:00", "18:00 – 20:00"];

function seedFrom(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
function seededPct(seed: number) {
  return (Math.sin(seed) + 1) / 2;
}

export function generateSlots(facility: Facility, dateIso: string): Slot[] {
  if (facility.status === "Under Maintenance") {
    return SLOT_TIMES.map(time => ({ time, status: "Maintenance" as const, remaining: 0, total: 8 }));
  }
  return SLOT_TIMES.map((time, i) => {
    const seed = seedFrom(`${facility.id}-${dateIso}-${time}-${i}`);
    const total = 8;
    const pct = seededPct(seed);
    const remaining = Math.round(pct * total);
    const status: SlotStatus = remaining === 0 ? "Full" : remaining <= 2 ? "Limited" : "Available";
    return { time, status, remaining, total };
  });
}

export const SLOT_COLOR: Record<SlotStatus, { bg: string; text: string; border: string }> = {
  Available: { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  Limited: { bg: "#FFFBEB", text: "#D97706", border: "#FDE68A" },
  Full: { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
  Maintenance: { bg: "#F3F4F6", text: "#6B7280", border: "#E5E7EB" },
};

export const FACILITY_STATUS_COLOR: Record<FacilityStatus, { bg: string; text: string }> = {
  Available: { bg: "#ECFDF5", text: "#059669" },
  "Limited Slots": { bg: "#FFFBEB", text: "#D97706" },
  "Fully Booked": { bg: "#FEF2F2", text: "#DC2626" },
  "Under Maintenance": { bg: "#F3F4F6", text: "#6B7280" },
};

export type Purpose = "Practice" | "Training" | "Competition";
export type BookingType = "Individual" | "Team";
export type BookingStatus = "Confirmed" | "Checked In" | "Cancelled" | "No-Show";

export type Booking = {
  id: string;
  facilityId: string;
  facilityName: string;
  athleteName: string;
  date: string;
  slot: string;
  purpose: Purpose;
  bookingType: BookingType;
  participants: number;
  coach: string;
  status: BookingStatus;
  qrToken: string;
  createdAt: string;
};

let bookingCounter = 1000;
export function nextBookingId() {
  bookingCounter += 1;
  return `MSD-BK-${bookingCounter}`;
}

export function generateQrToken(booking: Pick<Booking, "id" | "facilityId" | "date" | "slot">) {
  const raw = `${booking.id}|${booking.facilityId}|${booking.date}|${booking.slot}`;
  // btoa only accepts Latin1 — strip non-ASCII (e.g. the en-dash in slot times) before encoding.
  const safe = raw.replace(/[^\x00-\x7F]/g, "-");
  return btoa(safe).slice(0, 24);
}

export type ScanResult = "Valid" | "Expired Booking" | "Already Checked In" | "Booking Not Found" | "Wrong Time Slot" | "Facility Closed" | "Invalid QR Code";

export type ScanLog = { id: string; time: string; bookingId: string; athleteName: string; facilityName: string; result: ScanResult; gate: string };

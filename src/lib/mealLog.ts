import { useSyncExternalStore } from "react";

// Simple shared, in-memory meal log so the Athlete App and Coach Portal
// stay in sync within the same session — no backend, just a module-level
// store both components subscribe to.

export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";

export type Meal = {
  id: string;
  athleteCode: string;
  type: MealType;
  note: string;
  time: string;
  date: string;
  emoji: string;
  photoBg: string;
  coachFeedback: string;
};

export const MEAL_PHOTO_PRESETS = [
  { emoji: "🍛", bg: "linear-gradient(135deg,#FDE68A,#FBBF24)" },
  { emoji: "🥗", bg: "linear-gradient(135deg,#BBF7D0,#34D399)" },
  { emoji: "🍗", bg: "linear-gradient(135deg,#FECACA,#F87171)" },
  { emoji: "🍎", bg: "linear-gradient(135deg,#FCA5A5,#EF4444)" },
  { emoji: "🥣", bg: "linear-gradient(135deg,#BFDBFE,#60A5FA)" },
  { emoji: "🍚", bg: "linear-gradient(135deg,#E5E7EB,#9CA3AF)" },
];

let meals: Meal[] = [
  {
    id: "m1", athleteCode: "MSD-2026-011", type: "Breakfast",
    note: "Oats with banana and peanut butter, black coffee.",
    time: "7:30 AM", date: "Today", emoji: "🥣", photoBg: MEAL_PHOTO_PRESETS[4].bg,
    coachFeedback: "Good protein-carb balance before training. Keep this up.",
  },
  {
    id: "m2", athleteCode: "MSD-2026-011", type: "Lunch",
    note: "Grilled chicken, brown rice, salad.",
    time: "1:15 PM", date: "Today", emoji: "🍗", photoBg: MEAL_PHOTO_PRESETS[2].bg,
    coachFeedback: "",
  },
];

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return meals;
}

export function useMealLog(athleteCode: string): Meal[] {
  const all = useSyncExternalStore(subscribe, getSnapshot);
  return all.filter((m) => m.athleteCode === athleteCode);
}

export function addMeal(input: Omit<Meal, "id" | "coachFeedback">) {
  meals = [{ ...input, id: `m${Date.now()}`, coachFeedback: "" }, ...meals];
  emit();
}

export function setCoachFeedback(id: string, feedback: string) {
  meals = meals.map((m) => (m.id === id ? { ...m, coachFeedback: feedback } : m));
  emit();
}

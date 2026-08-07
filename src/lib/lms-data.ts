// Mock data for the Student-Athlete LMS portal (/lms/*)
// In a real deployment this would come from the backend API.

export const LMS_COLORS = {
  primary: "#4F46E5",
  primaryDark: "#3730A3",
  primarySoft: "#EEF2FF",
  teal: "#0D9488",
  tealSoft: "#F0FDFA",
  accent: "#F97316",
  accentSoft: "#FFF7ED",
  success: "#0D9488",
  successSoft: "#F0FDFA",
  warning: "#F97316",
  warningSoft: "#FFF7ED",
  danger: "#DC2626",
  bg: "#F8FAFC",
  border: "#E2E8F0",
};

export type Subject = {
  id: string;
  name: string;
  teacher: string;
  color: string;
  emoji: string;
  progress: number;
  lectures: number;
  lecturesDone: number;
  notes: number;
  quizzes: number;
  assignmentsDue: number;
  lastAccessed: string;
};

export const SUBJECTS: Subject[] = [
  { id: "math", name: "Mathematics", teacher: "Mrs. Kavita Rane", color: "#2563EB", emoji: "📐", progress: 72, lectures: 48, lecturesDone: 35, notes: 22, quizzes: 6, assignmentsDue: 1, lastAccessed: "Today, 9:40 AM" },
  { id: "science", name: "Science", teacher: "Mr. Suresh Patil", color: "#16A34A", emoji: "🔬", progress: 58, lectures: 40, lecturesDone: 23, notes: 19, quizzes: 4, assignmentsDue: 2, lastAccessed: "Yesterday" },
  { id: "english", name: "English", teacher: "Ms. Anjali Deshpande", color: "#F59E0B", emoji: "📖", progress: 85, lectures: 30, lecturesDone: 26, notes: 14, quizzes: 5, assignmentsDue: 0, lastAccessed: "2 days ago" },
  { id: "history", name: "History & Civics", teacher: "Mr. Ramesh Joshi", color: "#DC2626", emoji: "🏛️", progress: 40, lectures: 26, lecturesDone: 10, notes: 12, quizzes: 3, assignmentsDue: 1, lastAccessed: "3 days ago" },
  { id: "marathi", name: "Marathi", teacher: "Mrs. Snehal More", color: "#7C3AED", emoji: "✍️", progress: 63, lectures: 28, lecturesDone: 17, notes: 16, quizzes: 4, assignmentsDue: 0, lastAccessed: "4 days ago" },
  { id: "physical", name: "Sports Science", teacher: "Coach Vikram Sawant", color: "#0d9488", emoji: "🏃", progress: 91, lectures: 18, lecturesDone: 16, notes: 9, quizzes: 2, assignmentsDue: 0, lastAccessed: "Today, 7:15 AM" },
];

export type Course = {
  id: string;
  title: string;
  subject: string;
  type: "Video" | "PDF" | "Slides";
  progress: number;
  duration: string;
  thumbnail: string;
  status: "in-progress" | "completed" | "not-started";
};

export const COURSES: Course[] = [
  { id: "c1", title: "Algebra — Quadratic Equations", subject: "Mathematics", type: "Video", progress: 65, duration: "42 min", thumbnail: "📐", status: "in-progress" },
  { id: "c2", title: "Newton's Laws of Motion", subject: "Science", type: "Video", progress: 100, duration: "38 min", thumbnail: "🔬", status: "completed" },
  { id: "c3", title: "Grammar — Active & Passive Voice", subject: "English", type: "PDF", progress: 30, duration: "12 pages", thumbnail: "📖", status: "in-progress" },
  { id: "c4", title: "Indian Freedom Struggle — Ch.4", subject: "History & Civics", type: "Slides", progress: 0, duration: "24 slides", thumbnail: "🏛️", status: "not-started" },
  { id: "c5", title: "निबंधलेखन — पद्धती", subject: "Marathi", type: "PDF", progress: 100, duration: "8 pages", thumbnail: "✍️", status: "completed" },
  { id: "c6", title: "Sports Nutrition Basics", subject: "Sports Science", type: "Video", progress: 80, duration: "25 min", thumbnail: "🏃", status: "in-progress" },
];

export type CalendarEvent = {
  id: string;
  date: string; // ISO
  title: string;
  type: "competition" | "exam" | "assignment" | "training" | "travel" | "study";
  detail?: string;
};

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "e1", date: "2026-08-06", title: "State Athletics Trials", type: "competition", detail: "Balewadi Stadium, Pune" },
  { id: "e2", date: "2026-08-08", title: "Science Unit Test", type: "exam", detail: "Chapters 4–6" },
  { id: "e3", date: "2026-08-09", title: "Travel to Nagpur", type: "travel", detail: "For National Selection Camp" },
  { id: "e4", date: "2026-08-10", title: "National Selection Camp", type: "training", detail: "Nagpur Sports Complex" },
  { id: "e5", date: "2026-08-12", title: "English Essay Assignment Due", type: "assignment" },
  { id: "e6", date: "2026-08-14", title: "AI-Suggested Revision Block", type: "study", detail: "Mathematics — weak topic" },
  { id: "e7", date: "2026-08-18", title: "Mid-Term Exams Begin", type: "exam" },
];

export type ExamItem = {
  id: string;
  subject: string;
  date: string;
  time: string;
  readiness: number;
  syllabus: string;
};

export const EXAMS: ExamItem[] = [
  { id: "x1", subject: "Mathematics", date: "18 Aug 2026", time: "10:00 AM", readiness: 72, syllabus: "Ch. 1–6" },
  { id: "x2", subject: "Science", date: "20 Aug 2026", time: "10:00 AM", readiness: 54, syllabus: "Ch. 1–5" },
  { id: "x3", subject: "English", date: "22 Aug 2026", time: "10:00 AM", readiness: 88, syllabus: "Full syllabus" },
  { id: "x4", subject: "History & Civics", date: "24 Aug 2026", time: "10:00 AM", readiness: 41, syllabus: "Ch. 1–4" },
];

export const WEEKLY_PROGRESS = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 60 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 75 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 20 },
  { day: "Sun", minutes: 65 },
];

export const ANNOUNCEMENTS = [
  { id: "a1", title: "Youth Policy 2026 — Share your feedback", date: "2 Aug 2026", tag: "Notice" },
  { id: "a2", title: "New sports hostel opens at Balewadi HPC", date: "30 Jul 2026", tag: "Update" },
  { id: "a3", title: "Shiv Chhatrapati Award applications open", date: "28 Jul 2026", tag: "Scheme" },
];

export const DOWNLOADS = [
  { id: "d1", title: "Algebra — Quadratic Equations.mp4", type: "Video", size: "128 MB", subject: "Mathematics", date: "1 Aug 2026" },
  { id: "d2", title: "Newton's Laws — Notes.pdf", type: "PDF", size: "3.2 MB", subject: "Science", date: "30 Jul 2026" },
  { id: "d3", title: "Grammar Slides.pptx", type: "Slides", size: "6.8 MB", subject: "English", date: "29 Jul 2026" },
  { id: "d4", title: "Freedom Struggle Assignment.pdf", type: "Assignment", size: "1.1 MB", subject: "History & Civics", date: "27 Jul 2026" },
  { id: "d5", title: "Sports Nutrition Basics.mp4", type: "Video", size: "96 MB", subject: "Sports Science", date: "25 Jul 2026" },
];

export const COMPETITION_MODE = {
  active: true,
  eventName: "State Athletics Championship 2026",
  location: "Shree Shiv Chhatrapati Complex, Balewadi",
  duration: "5 – 8 Aug 2026",
  coach: "Coach Vikram Sawant",
  lessonsRemaining: 6,
  estimatedStudyTime: "2h 40m",
  status: "on track" as const,
};

export const AI_DAILY_PLAN: { slot: "Morning" | "Afternoon" | "Night"; title: string; tag: "Competition" | "Travel" | "Study" }[] = [
  { slot: "Morning", title: "Competition — Heats Round", tag: "Competition" },
  { slot: "Afternoon", title: "Travel to Balewadi", tag: "Travel" },
  { slot: "Night", title: "30 min Study — Mathematics", tag: "Study" },
];

export const CATCH_UP_ALERT = {
  missedLectures: 9,
  reason: "during the National Championship",
  note: "AI has prioritised the most exam-critical chapters into a catch-up plan",
};

export const OFFLINE_STATUS = {
  lessonsDownloaded: 4,
  trip: "the trip to Balewadi",
};

export const ASSIGNMENTS = [
  { id: "as1", subject: "Mathematics", title: "Quadratic Equations — Problem Set 4", due: "6 Aug 2026", status: "pending" as const },
  { id: "as2", subject: "Science", title: "Lab Report — Newton's Laws", due: "8 Aug 2026", status: "pending" as const },
  { id: "as3", subject: "Science", title: "Chapter 5 Worksheet", due: "9 Aug 2026", status: "pending" as const },
  { id: "as4", subject: "History & Civics", title: "Freedom Struggle Essay", due: "12 Aug 2026", status: "pending" as const },
  { id: "as5", subject: "English", title: "Active & Passive Voice Exercise", due: "30 Jul 2026", status: "submitted" as const },
];

export const STUDENT = {
  name: "Aarav Kulkarni",
  initials: "AK",
  school: "Balewadi High School, Pune",
  course: "Class 10 — Science & Sports",
  year: "2026–27",
  sport: "Athletics — 400m & 800m",
  coach: "Coach Vikram Sawant",
  institute: "Maharashtra High Performance Centre, Pune",
  level: "State & National",
  athleteId: "ATH-2024-00481",
  streakDays: 12,
  streakBest: 21,
  dailyGoalMinutes: 60,
  todayMinutes: 38,
  overallProgress: 68,
  attendance: 84,
  academicScore: 76,
  examReadiness: 65,
  achievements: [
    { id: "b1", label: "Gold — State Athletics 2025", icon: "🥇" },
    { id: "b2", label: "Silver — National Junior Meet", icon: "🥈" },
    { id: "b3", label: "Perfect Attendance — Term 1", icon: "🎯" },
    { id: "b4", label: "7-Day Study Streak", icon: "🔥" },
  ],
};

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye, EyeOff, Smartphone, UserRound, Award, Briefcase, Hotel, CalendarDays,
  ShieldCheck, FileSearch, GraduationCap, HelpCircle, ArrowRight, Lock, Mail,
} from "lucide-react";
import indiaEmblem from "@/assets/india-emblem.png.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Login — Sports & Youth Services" },
    { name: "description", content: "Sign in to the Sports & Youth Services portal, Government of Maharashtra." },
  ] }),
  component: Page,
});

const ALT = [
  { i: Smartphone, t: "Login with OTP" },
  { i: UserRound, t: "Athlete Login" },
  { i: Award, t: "Coach Login" },
  { i: Briefcase, t: "Department Staff" },
  { i: Hotel, t: "Hostel Management" },
  { i: CalendarDays, t: "Event Management" },
];

const QUICK = [
  { i: ShieldCheck, t: "Register New Account", to: "/register" },
  { i: FileSearch, t: "Track Application Status", to: "/login" },
  { i: GraduationCap, t: "View Sports Schemes", to: "/scholarships" },
  { i: HelpCircle, t: "Help & Support", to: "/login" },
];

function Page() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" style={{ background: "linear-gradient(135deg,#f8f9ff 0%, #f3f4f6 100%)" }}>
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(#363092 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="container-page py-12 md:py-16 grid grid-cols-1 lg:grid-cols-[1.05fr,1fr] gap-10 relative">
        {/* Welcome */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <img src={indiaEmblem.url} alt="" className="h-16 w-16 object-contain" />
            <div>
              <div className="text-sm font-semibold" style={{ color: "#363092" }}>क्रीडा व युवक सेवा विभाग</div>
              <div className="text-xl font-bold text-gray-900">Sports & Youth Services Department</div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Government of Maharashtra</div>
            </div>
          </div>
          <h1 className="mt-8 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Welcome back to the official sports portal of Maharashtra.</h1>
          <p className="mt-3 text-gray-600 leading-relaxed max-w-lg">Sign in to access schemes, athlete services, registrations, tournaments and departmental tools — all in one secure place.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
            {QUICK.map(({ i: I, t, to }) => (
              <Link key={t} to={to} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:border-[#363092] hover:text-[#363092] transition">
                <I className="h-4 w-4" /> {t}
              </Link>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white border border-gray-200 shadow-[0_30px_60px_-30px_rgba(54,48,146,0.35)] p-7 md:p-9">
          <h2 className="text-xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="text-sm text-gray-500 mt-1">Use your registered email or mobile number.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email or Mobile</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="you@example.com or +91 9XXXXXXXXX" className="w-full h-11 pl-10 pr-3 rounded-lg border border-gray-300 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/20 outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type={show ? "text" : "password"} placeholder="••••••••" className="w-full h-11 pl-10 pr-10 rounded-lg border border-gray-300 focus:border-[#363092] focus:ring-2 focus:ring-[#363092]/20 outline-none text-sm" />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700"><input type="checkbox" className="rounded border-gray-300" /> Remember me</label>
              <a href="#" className="text-[#363092] font-medium hover:underline">Forgot password?</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-11 rounded-lg border border-gray-300 grid place-items-center text-sm font-mono tracking-[0.3em] bg-gray-50 text-gray-700 select-none">A7K9X2</div>
              <input type="text" placeholder="Enter captcha" className="flex-1 h-11 px-3 rounded-lg border border-gray-300 focus:border-[#363092] outline-none text-sm" />
            </div>
            <button className="w-full h-11 rounded-lg bg-[#363092] hover:bg-[#2a2470] text-white font-semibold inline-flex items-center justify-center gap-2 transition">
              Sign In <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3 text-xs text-gray-400 uppercase tracking-wider">
            <div className="flex-1 h-px bg-gray-200" /> or use alternative access <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {ALT.map(({ i: I, t }) => (
              <button key={t} className="flex items-center gap-2 rounded-lg border border-gray-200 hover:border-[#363092] hover:text-[#363092] px-3 py-2.5 text-sm text-gray-700 transition">
                <I className="h-4 w-4" /> {t}
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm text-center text-gray-600">
            New to the portal? <Link to="/register" className="text-[#363092] font-semibold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

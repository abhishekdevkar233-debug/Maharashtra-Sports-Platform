import { ArrowRight, Camera, MapPin, Phone, FileText, Award, Users, Shield, AlertCircle, Image as ImageIcon, ChevronLeft, ChevronRight, Trophy, Briefcase, Building2, Target, FileSpreadsheet, ClipboardList } from "lucide-react";

const Placeholder = ({ h = 160, label = "Image" }: { h?: number; label?: string }) => (
  <div className="grid place-items-center bg-gray-200 text-gray-500 rounded-md w-full" style={{ height: h }}>
    <div className="flex flex-col items-center gap-1 text-xs"><Camera className="h-5 w-5" />{label}</div>
  </div>
);

const SectionTitle = ({ title, right }: { title: string; right?: React.ReactNode }) => (
  <div className="flex items-end justify-between mb-6 gap-4">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative pl-3 border-l-[3px] border-[#FF6B35]">{title}</h2>
    {right}
  </div>
);

export function LiveUpdates() {
  const cards = [
    { sport: "Kabaddi Championship", a: "Pune Warriors", b: "Mumbai Tigers", score: "32 – 28", venue: "Balewadi, Pune", time: "Q3 · 12:40" },
    { sport: "State Football League", a: "Nagpur FC", b: "Nashik United", score: "2 – 1", venue: "Kalyani Nagar", time: "78'" },
    { sport: "Maharashtra Cricket", a: "Vidarbha", b: "Mumbai", score: "186/4", venue: "Wankhede", time: "Over 32.4" },
    { sport: "Hockey Championship", a: "Kolhapur XI", b: "Aurangabad", score: "3 – 2", venue: "Major Dhyan Chand", time: "Q4" },
  ];
  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <SectionTitle title="Live Sports Updates" right={<a className="text-sm font-semibold text-[#363092] flex items-center gap-1" href="#">View All Matches <ArrowRight className="h-3 w-3" /></a>} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(c => (
            <div key={c.sport} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold tracking-wider">● LIVE</span>
                <span className="text-xs text-gray-500">{c.sport}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div className="h-9 w-9 rounded-full bg-gray-200" />
                  <span className="text-xs font-medium text-gray-700 text-center">{c.a}</span>
                </div>
                <div className="text-xl font-bold text-gray-900 px-2">{c.score}</div>
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div className="h-9 w-9 rounded-full bg-gray-200" />
                  <span className="text-xs font-medium text-gray-700 text-center">{c.b}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
                <span>{c.venue}</span><span>{c.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Leadership() {
  const team = [
    { name: "Shri. Devendra Fadnavis", role: "Hon. Chief Minister" },
    { name: "Shri. Eknath Shinde", role: "Hon. Deputy Chief Minister" },
    { name: "Smt. Sunetra Ajit Pawar", role: "Hon. Minister" },
    { name: "Shri. Ranjit Singh Deol IAS", role: "Principal Secretary" },
    { name: "Shri. Deepak Single IAS", role: "Director, Sports & Youth Services" },
  ];
  return (
    <section className="py-12" style={{ background: "#F9FAFB" }}>
      <div className="container-page">
        <SectionTitle title="Leadership" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {team.map(p => (
            <div key={p.name} className="text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-gray-200" />
              <div className="mt-3 font-bold text-gray-900 text-sm">{p.name}</div>
              <div className="text-xs text-gray-500 mt-1">{p.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsSection() {
  const items = [
    { tag: "Announcement", color: "bg-[#363092]/10 text-[#363092]", date: "May 12, 2024", text: "Applications open for State Sports Scholarships 2024–25" },
    { tag: "News", color: "bg-orange-100 text-orange-600", date: "May 18, 2024", text: "Kho-Kho Maharashtra Youth Games to be held from 19th–20th June 2024" },
    { tag: "Update", color: "bg-green-100 text-green-700", date: "May 22, 2024", text: "New Sports Complex inaugurated in Chhatrapati Sambhajinagar" },
  ];
  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <SectionTitle title="News & Announcements" right={<a className="text-sm font-semibold text-[#363092] flex items-center gap-1" href="#">View All News <ArrowRight className="h-3 w-3" /></a>} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden h-full min-h-[320px] bg-gray-800">
              <div className="absolute inset-0 bg-gray-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/20" />
              <div className="relative h-full p-6 flex flex-col justify-end text-white">
                <span className="self-start px-2 py-0.5 rounded bg-[#FF6B35] text-[10px] font-bold tracking-wider mb-3">FEATURED</span>
                <h3 className="text-xl md:text-2xl font-bold leading-snug">Maharashtra wins 186 medals at Khelo India Youth Games 2024</h3>
                <div className="mt-3 text-xs text-white/80">June 4, 2024 · Chennai</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-3">
            {items.map(it => (
              <div key={it.text} className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#363092] transition">
                <div className="h-16 w-16 bg-gray-200 rounded shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${it.color}`}>{it.tag}</span>
                    <span className="text-xs text-gray-500">{it.date}</span>
                  </div>
                  <div className="mt-1 text-sm font-medium text-gray-900 leading-snug">{it.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            <div className="border-2 border-orange-400 rounded-lg p-4 bg-orange-50 h-full flex flex-col">
              <div className="flex items-center gap-2 text-orange-700 font-bold text-sm"><AlertCircle className="h-4 w-4" /> Important Notice</div>
              <p className="mt-3 text-sm text-gray-700 flex-1">All district sports offices will remain closed on <strong>26 May 2024</strong> on account of Republic Day. Online services will continue to be available.</p>
              <a href="#" className="mt-3 text-sm font-semibold text-[#363092] flex items-center gap-1">View All Notices <ArrowRight className="h-3 w-3" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const items = [
    { name: "Asian Games 2023", loc: "Hangzhou, China" },
    { name: "Maharashtra Cricket Team", loc: "Victory Celebration" },
    { name: "State Wrestling Championship 2024", loc: "Pune" },
    { name: "Badminton Training Camp", loc: "Nagpur" },
    { name: "Khelo India Youth Games 2024", loc: "Chennai, Tamil Nadu" },
  ];
  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <SectionTitle title="Photo & Video Gallery" right={<a className="text-sm font-semibold text-[#363092] flex items-center gap-1" href="#">View All Gallery <ArrowRight className="h-3 w-3" /></a>} />
        <div className="flex gap-6 border-b border-gray-200 mb-5">
          <button className="pb-2 text-sm font-semibold border-b-[3px] border-[#363092] text-[#363092]">Photos</button>
          <button className="pb-2 text-sm font-medium text-gray-500">Videos</button>
        </div>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scroll-smooth pb-2">
            {items.map(it => (
              <div key={it.name} className="shrink-0 w-[200px]">
                <div className="h-[160px] bg-gray-200 rounded-md grid place-items-center text-gray-500"><ImageIcon className="h-6 w-6" /></div>
                <div className="mt-2 text-sm font-bold text-gray-900 leading-tight">{it.name}</div>
                <div className="text-xs text-gray-500">{it.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const items = [
    { i: Trophy, label: "Competition Management", desc: "Organize state and district level competitions" },
    { i: Award, label: "Awards", desc: "Recognise outstanding sporting achievements" },
    { i: Users, label: "5% Reservation", desc: "Reservation benefits for sportspersons" },
    { i: Shield, label: "Grievances", desc: "File and track citizen grievances" },
    { i: FileText, label: "Grace Marks", desc: "Academic grace marks for athletes" },
    { i: AlertCircle, label: "Objection", desc: "Submit formal objections online" },
  ];
  return (
    <section className="py-12" style={{ background: "#F9FAFB" }}>
      <div className="container-page">
        <SectionTitle title="Our Services" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map(({ i: I, label, desc }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-lg p-5 text-center">
              <I className="h-8 w-8 mx-auto text-[#363092]" strokeWidth={1.5} />
              <div className="mt-3 font-bold text-sm text-gray-900">{label}</div>
              <div className="mt-1 text-xs text-gray-500">{desc}</div>
              <a href="#" className="mt-3 text-xs font-semibold text-[#363092] flex items-center justify-center gap-1">Know More <ArrowRight className="h-3 w-3" /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Directorate() {
  const tiles = [
    { i: Target, label: "Mission & Vision", d: "Our guiding principles" },
    { i: Briefcase, label: "Budget", d: "Annual allocations & spend" },
    { i: Building2, label: "Organizational Structure", d: "Departments & hierarchy" },
    { i: ClipboardList, label: "Functions", d: "Roles and responsibilities" },
    { i: FileSpreadsheet, label: "Quotations", d: "Open quotations & bids" },
    { i: FileText, label: "Tenders", d: "Active e-tenders" },
  ];
  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <SectionTitle title="Directorate of Sports and Youth Services" />
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <Placeholder h={180} label="Directorate Building" />
              <p className="mt-3 text-sm text-gray-600">The Directorate is committed to promoting sports, youth welfare and physical education across Maharashtra through policy, programs and partnerships.</p>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiles.map(({ i: I, label, d }) => (
              <div key={label} className="border border-gray-200 rounded-lg p-4">
                <I className="h-7 w-7 text-[#363092]" strokeWidth={1.5} />
                <div className="mt-2 font-bold text-gray-900">{label}</div>
                <div className="text-xs text-gray-500">{d}</div>
                <a href="#" className="mt-3 text-xs font-semibold text-[#363092] flex items-center gap-1">Explore <ArrowRight className="h-3 w-3" /></a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DistrictFinder() {
  return (
    <section className="py-12 text-white" style={{ background: "#1a237e" }}>
      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Find Sports Offices and Facilities in Your District</h2>
          <p className="mt-3 text-white/70 text-sm max-w-md">Search across all 36 districts of Maharashtra to discover stadiums, training centres, sports academies and district sports offices near you.</p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <select className="flex-1 h-11 px-4 rounded-lg text-gray-900 bg-white">
              <option>Select District</option>
              <option>Pune</option><option>Mumbai</option><option>Nagpur</option><option>Kolhapur</option>
            </select>
            <button className="h-11 px-6 rounded-lg font-semibold text-white" style={{ background: "#FF6B35" }}>Search District</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative bg-white/10 rounded-lg h-[260px] grid place-items-center">
            <div className="text-white/40 text-xs">Maharashtra Map</div>
            <div className="absolute h-3 w-3 rounded-full bg-yellow-400 top-[55%] left-[35%] shadow-[0_0_0_4px_rgba(250,204,21,0.3)]" />
          </div>
          <div className="bg-white/10 rounded-lg p-5">
            <div className="text-xs uppercase text-white/60 tracking-wider">Selected District</div>
            <div className="text-xl font-bold mt-1">Kolhapur</div>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li className="flex justify-between"><span>District Sports Office</span><span>1</span></li>
              <li className="flex justify-between"><span>Stadiums</span><span>4</span></li>
              <li className="flex justify-between"><span>Indoor Facilities</span><span>6</span></li>
              <li className="flex justify-between"><span>Training Centres</span><span>12</span></li>
              <li className="flex justify-between"><span>Sports Complex</span><span>3</span></li>
            </ul>
            <a href="#" className="mt-4 inline-flex text-sm font-semibold text-[#FF6B35] items-center gap-1">View All Facilities <ArrowRight className="h-3 w-3" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Downloads() {
  const items = [
    { label: "GRs", color: "bg-orange-100 text-orange-600" },
    { label: "List Of Competitions", color: "bg-teal-100 text-teal-600" },
    { label: "Anti Doping", color: "bg-red-100 text-red-600" },
    { label: "Citizen Charter", color: "bg-indigo-100 text-indigo-600" },
    { label: "RTI", color: "bg-purple-100 text-purple-600" },
    { label: "Right to Public Service Act", color: "bg-green-100 text-green-600" },
    { label: "Important Links", color: "bg-yellow-100 text-yellow-700" },
    { label: "Mission Lakshyavedh", color: "bg-pink-100 text-pink-600" },
  ];
  return (
    <section className="bg-white py-12">
      <div className="container-page">
        <SectionTitle title="Downloads & Information" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {items.map(it => (
            <div key={it.label} className="border border-gray-200 rounded-lg p-4 text-center">
              <div className={`h-12 w-12 mx-auto rounded-lg grid place-items-center ${it.color}`}><FileText className="h-6 w-6" /></div>
              <div className="mt-3 text-xs font-bold text-gray-900 min-h-[2.5rem]">{it.label}</div>
              <a href="#" className="mt-2 text-xs font-semibold text-[#363092] flex justify-center items-center gap-1">View All <ArrowRight className="h-3 w-3" /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

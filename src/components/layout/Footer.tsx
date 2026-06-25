import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="text-white" style={{ background: "#0d1b4b" }}>
      <div className="container-page py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white/10 grid place-items-center font-bold">MH</div>
            <div className="text-sm font-semibold leading-tight">Government of Maharashtra<br /><span className="text-white/60 font-normal">Sports & Youth Services Department</span></div>
          </div>
          <p className="mt-4 text-sm text-white/60">Empowering Maharashtra through sports excellence, youth development and world-class infrastructure.</p>
          <div className="mt-4 flex gap-2">
            {[Facebook, Twitter, Instagram, Youtube].map((I, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#FF6B35] grid place-items-center transition"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {["Home", "Schemes", "Infrastructure", "Achievements", "Olympians", "Elite Athletes", "Media"].map(l => (
              <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Information</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {["Downloads", "RTI", "Citizen Charter", "Tenders", "FAQs", "Contact Us"].map(l => (
              <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Contact Us</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />Directorate of Sports & Youth Services, Shivaji Nagar, Pune – 411005</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" />+91 20 2553 3333</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" />info@sports.maharashtra.gov.in</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" />Mon – Fri, 10:00 AM – 6:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-4 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/60">
          <span>© 2024 Government of Maharashtra. All Rights Reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

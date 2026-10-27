import { useState } from "react";
import { 
  Briefcase, 
  Send, 
  Mail, 
  CheckCircle2,
  Crown,
  Sparkles
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function Footer() {
  const { setCurrentView, filterByCategory, addToast } = useJobs();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      addToast("Please provide a valid executive email address", "error");
      return;
    }
    setSubscribed(true);
    addToast("Subscribed! Executive briefings will arrive every Monday.", "success");
    setEmailInput("");
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#02050c] text-slate-300 pt-16 pb-12 border-t border-white/10 mt-auto relative overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full px-3 sm:px-5 lg:px-8 relative z-10">
        
        {/* Top Newsletter Grid */}
        <div className="bg-slate-900/80 rounded-3xl p-8 sm:p-12 mb-16 border border-amber-500/20 shadow-2xl relative overflow-hidden backdrop-blur-2xl gold-glow">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-3.5">
                <Mail className="w-3.5 h-3.5" />
                Discreet Briefings
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Receive Curated Executive Mandates Weekly
              </h3>
              <p className="mt-2.5 text-slate-400 text-sm sm:text-base max-w-xl font-light">
                Direct dispatches on strategic technology leadership, equity structures, and newly opened executive board retainers.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>You are subscribed. Weekly executive briefs will be dispatched to your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter confidential email..."
                    className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-2xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    Subscribe
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="col-span-2">
            <div 
              onClick={() => navigateTo("home")}
              className="flex items-center gap-3 cursor-pointer mb-5"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 shadow-md">
                <Crown className="w-5 h-5 stroke-[2.3]" />
              </div>
              <span className="text-2xl font-black text-white tracking-wider font-display">
                HIREHUB <span className="text-gold-gradient">ELITE</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6 font-light">
              HIREHUB ELITE is the private placement career sanctuary for tier-1 engineering, design, and executive leadership. Unparalleled compensation transparency and verified corporate retainers.
            </p>

            <div className="flex items-center gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400 hover:text-amber-300 flex items-center justify-center text-slate-400 transition"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400 hover:text-amber-300 flex items-center justify-center text-slate-400 transition"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400 hover:text-amber-300 flex items-center justify-center text-slate-400 transition"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.162c-.424.731-.666 1.581-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.18 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Candidates */}
          <div>
            <h4 className="text-white font-black text-xs tracking-widest uppercase mb-4">Talent Suite</h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <button onClick={() => navigateTo("jobs")} className="text-slate-400 hover:text-amber-300 transition">
                  Browse Appointments
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("saved")} className="text-slate-400 hover:text-amber-300 transition">
                  Saved Mandates
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("dashboard")} className="text-slate-400 hover:text-amber-300 transition">
                  Executive Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("companies")} className="text-slate-400 hover:text-amber-300 transition">
                  Elite Partner Roster
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="text-white font-black text-xs tracking-widest uppercase mb-4">Disciplines</h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <button onClick={() => filterByCategory("Software Development")} className="text-slate-400 hover:text-amber-300 transition">
                  Executive Engineering
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory("UI/UX Design")} className="text-slate-400 hover:text-amber-300 transition">
                  Product & Design
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory("Data Science")} className="text-slate-400 hover:text-amber-300 transition">
                  Artificial Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory("Finance")} className="text-slate-400 hover:text-amber-300 transition">
                  Fintech & Capital
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h4 className="text-white font-black text-xs tracking-widest uppercase mb-4">Ecosystem</h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <button onClick={() => navigateTo("about")} className="text-slate-400 hover:text-amber-300 transition">
                  The Philosophy
                </button>
              </li>
              <li>
                <a href="#faq" onClick={() => navigateTo("about")} className="text-slate-400 hover:text-amber-300 transition">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <span className="text-slate-400 block hover:text-amber-300 transition cursor-pointer">
                  Confidentiality Policy
                </span>
              </li>
              <li>
                <span className="text-slate-400 block hover:text-amber-300 transition cursor-pointer">
                  Partner Concierge
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HireHub Elite. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Executive Platform developed for</span>
            <span className="font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/30">
              Bademala Nikhil
            </span>
            <a
              href="mailto:nikhil@hirehub.dev"
              className="text-slate-400 hover:text-amber-300 transition"
            >
              nikhil@hirehub.dev
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

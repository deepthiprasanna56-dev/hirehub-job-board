import { useState } from "react";
import { 
  Target, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  Globe2,
  Crown,
  Award
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function AboutPage() {
  const { setCurrentView } = useJobs();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: "How does HireHub Elite vet corporate appointments and partners?",
      a: "Every corporate partner registered on HireHub Elite undergoes comprehensive corporate verification, executive compensation audit, and compliance checks to guarantee genuine executive mandates with market-topping packages."
    },
    {
      q: "Is it completely discreet and free for candidates?",
      a: "Yes, 100% complimentary and discreet. Candidates can research, save, track applications, and engage directly with hiring leadership without unwanted headhunter spam or subscription fees."
    },
    {
      q: "How does the real-time application tracking dashboard operate?",
      a: "When you apply for any position on HireHub, it is tracked in your personal Executive Dashboard with active status indicators: Applied, Under Review, Interview Scheduled, and Offer Extended."
    },
    {
      q: "Can I curate opportunities to review later?",
      a: "Yes. Simply click the bookmark icon on any card. Your wishlist is saved in your secure local session and easily accessible via the top navigation bar or your profile."
    },
    {
      q: "Are remote opportunities open to international leaders?",
      a: "Yes, appointments labeled as 'Remote' allow you to work from anywhere globally or across the designated continent, with full sovereign flexibility and home office stipends."
    }
  ];

  return (
    <div className="py-14 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-3.5">
            <Crown className="w-3.5 h-3.5" />
            The HireHub Philosophy
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Bridging Visionary Minds with Industry Defining Giants
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            HireHub Elite is engineered with a singular focus: to elevate executive career mobility with total transparency, dignity, and unparalleled compensation clarity.
          </p>
        </div>

        {/* Core Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/10 shadow-xl hover:border-amber-400/40 transition-all duration-300 backdrop-blur-xl hover:gold-glow">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-amber-400/30 text-amber-400 flex items-center justify-center mb-6 shadow-md">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Uncompromising Quality</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              We exclusively list verified tech, design, marketing, and finance appointments from vetted organizations committed to healthy, high-performing cultures.
            </p>
          </div>

          <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/10 shadow-xl hover:border-amber-400/40 transition-all duration-300 backdrop-blur-xl hover:gold-glow">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-amber-400/30 text-amber-400 flex items-center justify-center mb-6 shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Compensation Clarity</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Every mandate displays transparent base compensation, bonus structures, equity grants, and clear expectations upfront.
            </p>
          </div>

          <div className="bg-slate-900/80 p-8 rounded-3xl border border-white/10 shadow-xl hover:border-amber-400/40 transition-all duration-300 backdrop-blur-xl hover:gold-glow">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-amber-400/30 text-amber-400 flex items-center justify-center mb-6 shadow-md">
              <Globe2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Borderless Mobility</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Whether you lead asynchronously from anywhere on Earth, work hybrid in key financial centers, or relocate globally, we unlock sovereign mobility.
            </p>
          </div>
        </div>

        {/* Platform Numbers */}
        <div className="bg-slate-900/80 rounded-3xl p-8 sm:p-14 text-white shadow-2xl border border-amber-500/20 relative overflow-hidden backdrop-blur-2xl gold-glow">
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-5xl font-black text-gold-gradient">$165K+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Avg Base Package</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-black text-white">850+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Verified Enterprises</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-black text-gold-gradient">99.2%</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Direct Placement Rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-black text-white">45+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Global Jurisdictions</p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="max-w-3xl mx-auto pt-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm mt-1.5 font-light">
              Everything you need to know about navigating the HireHub Elite ecosystem.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 rounded-2xl border border-white/10 overflow-hidden transition backdrop-blur-xl"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-amber-300 transition"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/10 pt-4 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-slate-900 via-[#101726] to-slate-900 rounded-3xl p-8 sm:p-14 text-center text-white shadow-2xl border border-amber-500/30 gold-glow">
          <h2 className="text-2xl sm:text-4xl font-black">Ready to Command Your Next Appointment?</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-light">
            Review vetted executive openings with industry-defining packages and submit your dossier with complete privacy.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentView("jobs");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-9 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5"
            >
              Explore Open Mandates
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

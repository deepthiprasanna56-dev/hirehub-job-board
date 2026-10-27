import { useState } from "react";
import { 
  Target, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  Globe2
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function AboutPage() {
  const { setCurrentView } = useJobs();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: "How does HireHub ensure job postings are genuine and verified?",
      a: "Every company registered on HireHub undergoes corporate email verification, tax registration check, and compliance reviews. We do not permit anonymous or fraudulent job spam, ensuring safe applications for candidates."
    },
    {
      q: "Is it completely free for candidates to apply?",
      a: "Yes, 100% free! Candidates can search, bookmark, track applications, and apply to unlimited jobs without any fees or subscription locks."
    },
    {
      q: "How does the application tracking dashboard work?",
      a: "When you apply for any job on HireHub, it is instantly tracked in your personal Candidate Dashboard with real-time status updates: Applied, Under Review, Interview Scheduled, and Offer Extended."
    },
    {
      q: "Can I save jobs to apply later?",
      a: "Yes! Simply click the bookmark icon on any job card. Your saved wishlist is preserved in your session and easily accessible from the top navbar or your dashboard."
    },
    {
      q: "Are remote jobs genuinely location-independent?",
      a: "Yes, jobs labeled as 'Remote' allow you to work from anywhere within the designated region or globally, depending on the role description."
    }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Careers Worldwide
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Bridging Ambitious Talent with World-Class Companies
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            HireHub is built with a singular mission: to make the job search process transparent, delightful, and human. We eliminate recruiter ghosting and bring compensation transparency to the forefront.
          </p>
        </div>

        {/* Core Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Laser-Focused Quality</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We curate verified tech, design, marketing, and finance opportunities from companies with healthy work environments and competitive pay.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Salary Transparency</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every job posting features realistic compensation bands, required skills, and clear expectations upfront before you spend time applying.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Globe2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Global Mobility</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Whether you want to work remotely from home, hybrid in a metropolitan tech hub, or relocate abroad, HireHub connects you with global opportunities.
            </p>
          </div>
        </div>

        {/* Platform Numbers */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-indigo-400">15,000+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">Active Jobs Listed</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-purple-400">850+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">Verified Employers</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">98%</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">Interview Rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-amber-400">45+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">Countries Represented</p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="max-w-3xl mx-auto pt-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-sm mt-1">
              Have questions? Everything you need to know about navigating HireHub.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-indigo-600 transition"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black">Ready to Take Your Next Step?</h2>
          <p className="mt-3 text-indigo-100 max-w-xl mx-auto text-sm sm:text-base">
            Browse through hundreds of curated roles and submit your application with zero hassle today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentView("jobs");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-3.5 bg-white text-indigo-700 font-extrabold rounded-xl shadow-lg hover:bg-slate-50 transition transform hover:-translate-y-0.5"
            >
              Browse Openings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

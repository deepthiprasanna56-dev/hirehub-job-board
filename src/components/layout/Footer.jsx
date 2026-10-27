import { useState } from "react";
import { 
  Briefcase, 
  Send, 
  Mail, 
  CheckCircle2 
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function Footer() {
  const { setCurrentView, filterByCategory, addToast } = useJobs();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      addToast("Please enter a valid email address", "error");
      return;
    }
    setSubscribed(true);
    addToast("Thanks for subscribing to HireHub Job Alerts!", "success");
    setEmailInput("");
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Grid */}
        <div className="bg-gradient-to-r from-indigo-900/60 via-slate-800 to-indigo-950/80 rounded-3xl p-8 sm:p-10 mb-16 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
                <Mail className="w-3.5 h-3.5" />
                Never Miss an Opportunity
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Get Curated Job Alerts Straight to Your Inbox
              </h3>
              <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
                Subscribe to receive hand-picked tech, design, and product opportunities matching your preferences every Monday.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>You're subscribed! Weekly digests will be sent to your email.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your personal email..."
                    className="flex-1 px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50"
                  >
                    Subscribe
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="col-span-2">
            <div 
              onClick={() => navigateTo("home")}
              className="flex items-center gap-2.5 cursor-pointer mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">HireHub</span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              HireHub is a modern, responsive job board built for top tech talent and premier organizations. Discover remote, hybrid, and onsite careers with competitive compensation.
            </p>

            <div className="flex items-center gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition"
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
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition"
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
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.162c-.424.731-.666 1.581-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.18 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Candidates */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Candidates</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo("jobs")} className="text-slate-400 hover:text-white transition">
                  Browse All Jobs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("saved")} className="text-slate-400 hover:text-white transition">
                  Saved Job Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("dashboard")} className="text-slate-400 hover:text-white transition">
                  Candidate Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("companies")} className="text-slate-400 hover:text-white transition">
                  Company Directory
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory("Software Development")} className="text-slate-400 hover:text-white transition">
                  Remote Tech Jobs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => filterByCategory("Software Development")} className="text-slate-400 hover:text-white transition">
                  Software Development
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory("UI/UX Design")} className="text-slate-400 hover:text-white transition">
                  UI/UX Design
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory("Data Science")} className="text-slate-400 hover:text-white transition">
                  Data Science & AI
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory("Marketing")} className="text-slate-400 hover:text-white transition">
                  Product Marketing
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory("Finance")} className="text-slate-400 hover:text-white transition">
                  Finance & Fintech
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4">About & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo("about")} className="text-slate-400 hover:text-white transition">
                  About Us & Team
                </button>
              </li>
              <li>
                <a href="#faq" onClick={() => navigateTo("about")} className="text-slate-400 hover:text-white transition">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <span className="text-slate-400 block hover:text-white transition cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-slate-400 block hover:text-white transition cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-slate-400 block hover:text-white transition cursor-pointer">
                  Contact Support
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HireHub Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Frontend Task Project developed for</span>
            <span className="font-semibold text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/40">
              Bademala Nikhil Nikhil
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

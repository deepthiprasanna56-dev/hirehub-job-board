import { useState } from "react";
import { Search, MapPin, ArrowRight, TrendingUp, Sparkles, Award } from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function HeroSection() {
  const { searchQuery, setSearchQuery, setCurrentView } = useJobs();
  
  const [localKeyword, setLocalKeyword] = useState(searchQuery.keyword || "");
  const [localLocation, setLocalLocation] = useState(searchQuery.location || "");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery((prev) => ({
      ...prev,
      keyword: localKeyword,
      location: localLocation
    }));
    setCurrentView("jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickTagClick = (tag) => {
    setLocalKeyword(tag);
    setSearchQuery((prev) => ({
      ...prev,
      keyword: tag
    }));
    setCurrentView("jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:py-28 bg-gradient-to-b from-slate-950 via-[#07142a] to-[#020817]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_38%),radial-gradient(circle_at_right,_rgba(34,211,238,0.12),_transparent_28%)]"></div>
      <div className="w-full px-3 sm:px-5 lg:px-8 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-900/80 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-semibold shadow-xl backdrop-blur-xl">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="tracking-widest text-[11px] font-bold uppercase">Jobs that match your future</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 text-blue-400" />
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-3">
            <span className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-blue-300">
              Find top careers faster
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Find the right job for your next chapter
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Explore opportunities from leading companies, discover matching roles, and apply with confidence.
          </p>
        </div>

        <div className="mt-12 max-w-5xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="p-3 sm:p-4 bg-slate-900/80 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-5 flex items-center gap-3.5 px-4 py-3.5 bg-slate-950/70 rounded-2xl border border-white/10 focus-within:border-blue-400/80 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
                <Search className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="w-full">
                  <label htmlFor="hero-keyword" className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Job title, skills, or company
                  </label>
                  <input
                    id="hero-keyword"
                    type="text"
                    value={localKeyword}
                    onChange={(e) => setLocalKeyword(e.target.value)}
                    placeholder="e.g. React Developer, Product Manager"
                    className="w-full bg-transparent text-white placeholder-slate-500 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-4 flex items-center gap-3.5 px-4 py-3.5 bg-slate-950/70 rounded-2xl border border-white/10 focus-within:border-blue-400/80 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="w-full">
                  <label htmlFor="hero-location" className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Location
                  </label>
                  <input
                    id="hero-location"
                    type="text"
                    value={localLocation}
                    onChange={(e) => setLocalLocation(e.target.value)}
                    placeholder="City, state, or Remote"
                    className="w-full bg-transparent text-white placeholder-slate-500 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                  Search jobs
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-blue-300 flex items-center gap-1.5 mr-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              Popular searches:
            </span>
            {['Remote', 'React', 'Product Manager', 'Data Analyst', 'UI/UX', 'Freshers'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickTagClick(tag)}
                className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 hover:border-blue-400/40 hover:text-blue-300 font-medium transition backdrop-blur-md"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-xl text-center group hover:border-blue-500/30 transition">
            <p className="text-3xl sm:text-4xl font-black text-blue-300">15k+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Live Openings</p>
          </div>
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-xl text-center group hover:border-blue-500/30 transition">
            <p className="text-3xl sm:text-4xl font-black text-white">850+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Companies</p>
          </div>
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-xl text-center group hover:border-blue-500/30 transition">
            <p className="text-3xl sm:text-4xl font-black text-blue-300">99.2%</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Hiring Success</p>
          </div>
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-xl text-center group hover:border-blue-500/30 transition">
            <p className="text-3xl sm:text-4xl font-black text-white">24/7</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Job Alerts</p>
          </div>
        </div>
      </div>
    </section>
  );
}

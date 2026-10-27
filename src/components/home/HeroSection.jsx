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
    <section className="relative overflow-hidden pt-16 pb-24 md:py-28 bg-gradient-to-b from-slate-950 via-[#070b14] to-slate-950">
      
      {/* Luxury Ambient Glow Spheres */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-400/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full px-3 sm:px-5 lg:px-8 relative z-10">
        
        {/* Top VIP Announcement Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-900/90 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-xl backdrop-blur-xl hover:border-amber-400/60 transition cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-display tracking-widest text-[11px] font-bold">YOUR NEXT OPPORTUNITY STARTS HERE</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-light">Explore roles from companies hiring now</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 text-amber-400" />
          </div>
        </div>

        {/* Hero Editorial Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-3">
            <span className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-gold-gradient font-display">
              FIND WORK THAT MOVES YOU FORWARD
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-serif-luxury">
            Find your next{" "}
            <span className="text-gold-gradient italic font-normal">great opportunity</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Search jobs by role, skill, or company. Discover opportunities that fit your experience, goals, and preferred location.
          </p>
        </div>

        {/* Luxury Obsidian Search Form */}
        <div className="mt-12 max-w-4xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit}
            className="p-3 sm:p-4 bg-slate-900/80 rounded-3xl shadow-2xl border border-amber-500/25 backdrop-blur-2xl gold-glow"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Keyword / Role input */}
              <div className="md:col-span-5 flex items-center gap-3.5 px-4 py-3.5 bg-slate-950/70 hover:bg-slate-950 rounded-2xl border border-white/10 focus-within:border-amber-400/80 focus-within:ring-2 focus-within:ring-amber-500/20 transition">
                <Search className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="w-full">
                  <label htmlFor="hero-keyword" className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Job title, skills, or company
                  </label>
                  <input
                    id="hero-keyword"
                    type="text"
                    value={localKeyword}
                    onChange={(e) => setLocalKeyword(e.target.value)}
                    placeholder="e.g. Software Engineer, React, Google"
                    className="w-full bg-transparent text-white placeholder-slate-500 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Location input */}
              <div className="md:col-span-4 flex items-center gap-3.5 px-4 py-3.5 bg-slate-950/70 hover:bg-slate-950 rounded-2xl border border-white/10 focus-within:border-amber-400/80 focus-within:ring-2 focus-within:ring-amber-500/20 transition">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
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

              {/* Luxury Gold Submit Button */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                  Search jobs
                </button>
              </div>

            </div>
          </form>

          {/* Quick Luxury Search Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-amber-300/90 flex items-center gap-1.5 mr-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              Popular searches:
            </span>
            {["Software Engineer", "Data Analyst", "Product Manager", "Work from home", "Freshers", "Marketing"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickTagClick(tag)}
                className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 hover:border-amber-400/50 hover:text-amber-300 font-medium transition backdrop-blur-md"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Luxury Prestige Metrics Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-xl text-center group hover:border-amber-500/30 transition">
            <p className="text-3xl sm:text-4xl font-black text-gold-gradient">$165K+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Average Compensation</p>
          </div>
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-xl text-center group hover:border-amber-500/30 transition">
            <p className="text-3xl sm:text-4xl font-black text-white">850+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Verified Enterprises</p>
          </div>
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-xl text-center group hover:border-amber-500/30 transition">
            <p className="text-3xl sm:text-4xl font-black text-gold-gradient">99.2%</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Executive Match Rate</p>
          </div>
          <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/10 backdrop-blur-xl text-center group hover:border-amber-500/30 transition">
            <p className="text-3xl sm:text-4xl font-black text-white">&lt; 24 Hrs</p>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">Direct Recruiter Outreach</p>
          </div>
        </div>

        {/* Corporate Trust Badge Strip */}
        <div className="mt-16 pt-10 border-t border-white/10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6 flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Trusted by Leaders at Frontier Technologies & Global Scale-ups
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-lg font-black tracking-wider text-slate-300">TECHFLOW</span>
            <span className="text-lg font-black tracking-wider text-slate-300">INNOVATESTUDIO</span>
            <span className="text-lg font-black tracking-wider text-slate-300">DATASTRIDE</span>
            <span className="text-lg font-black tracking-wider text-slate-300">FINPULSE</span>
            <span className="text-lg font-black tracking-wider text-slate-300">APEXGUARD</span>
          </div>
        </div>

      </div>
    </section>
  );
}

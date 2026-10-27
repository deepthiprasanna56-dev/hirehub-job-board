import { useState } from "react";
import { Search, MapPin, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
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
    <section className="relative overflow-hidden pt-12 pb-20 md:py-24 bg-gradient-to-b from-indigo-50/60 via-white to-slate-50">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-0 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold shadow-sm hover:bg-indigo-100 transition cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Over 1,200+ new verified roles added this week</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </div>
        </div>

        {/* Hero Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Discover Your Next{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 bg-clip-text text-transparent">
              Dream Career
            </span>{" "}
            Opportunity
          </h1>
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed">
            Connect with top technology brands and innovative scale-ups. Search thousands of remote, hybrid, and onsite jobs tailored to your skills.
          </p>
        </div>

        {/* Central Search Form Box */}
        <div className="mt-10 max-w-4xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit}
            className="p-3 sm:p-4 bg-white rounded-3xl shadow-2xl shadow-indigo-500/10 border border-slate-200/90 backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Job title / keyword input */}
              <div className="md:col-span-5 flex items-center gap-3 px-4 py-3 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200/60 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 transition">
                <Search className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="w-full">
                  <label htmlFor="hero-keyword" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    What role?
                  </label>
                  <input
                    id="hero-keyword"
                    type="text"
                    value={localKeyword}
                    onChange={(e) => setLocalKeyword(e.target.value)}
                    placeholder="Job title, skills (e.g. React, UX)"
                    className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Location input */}
              <div className="md:col-span-4 flex items-center gap-3 px-4 py-3 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200/60 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 transition">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="w-full">
                  <label htmlFor="hero-location" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Where?
                  </label>
                  <input
                    id="hero-location"
                    type="text"
                    value={localLocation}
                    onChange={(e) => setLocalLocation(e.target.value)}
                    placeholder="City, Remote, or Country"
                    className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold rounded-2xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                >
                  <Search className="w-5 h-5" />
                  Search Jobs
                </button>
              </div>

            </div>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              Popular Searches:
            </span>
            {["React", "Remote", "Python", "UI/UX", "Full-time", "Senior Engineer", "Product Manager"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickTagClick(tag)}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 font-medium transition shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 sm:p-5 bg-white/80 rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <p className="text-2xl sm:text-3xl font-black text-indigo-600">15,400+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Live Open Positions</p>
          </div>
          <div className="p-4 sm:p-5 bg-white/80 rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <p className="text-2xl sm:text-3xl font-black text-violet-600">850+</p>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Verified Companies</p>
          </div>
          <div className="p-4 sm:p-5 bg-white/80 rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <p className="text-2xl sm:text-3xl font-black text-emerald-600">98%</p>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Candidate Satisfaction</p>
          </div>
          <div className="p-4 sm:p-5 bg-white/80 rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <p className="text-2xl sm:text-3xl font-black text-amber-600">&lt; 48 Hrs</p>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Average Response Rate</p>
          </div>
        </div>

      </div>
    </section>
  );
}

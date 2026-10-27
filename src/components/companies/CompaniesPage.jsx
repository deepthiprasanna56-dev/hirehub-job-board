import { useState } from "react";
import { Search, Star, MapPin, ArrowRight, Building2, Crown } from "lucide-react";
import { companies } from "../../data/companiesData";
import { useJobs } from "../../context/JobContext";

export default function CompaniesPage() {
  const { setCurrentView, setSearchQuery } = useJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const industries = ["All", "Cloud & AI", "Fintech", "Design", "Cybersecurity", "HealthTech", "HR Tech"];

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedIndustry === "All") return matchesSearch;
    const matchesIndustry = c.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
    return matchesSearch && matchesIndustry;
  });

  const handleViewCompanyJobs = (companyName) => {
    setSearchQuery((prev) => ({ ...prev, keyword: companyName }));
    setCurrentView("jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="py-14 bg-slate-950 min-h-screen text-slate-100">
      <div className="w-full px-3 sm:px-5 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-3.5">
            <Crown className="w-3.5 h-3.5" />
            Verified Corporate Partners
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Elite Corporate Directory
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-light">
            Discover verified tech titans, venture scale-ups, and corporate institutions with exceptional workplace ratings.
          </p>

          {/* Company Search Input */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search partner by name or domain..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-900 rounded-2xl border border-white/10 shadow-xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Industry Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedIndustry === ind
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md font-black"
                    : "bg-slate-900 text-slate-300 border border-white/10 hover:bg-white/5"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((comp) => (
            <div
              key={comp.id}
              className="bg-slate-900/75 rounded-3xl border border-white/10 p-7 shadow-xl hover:shadow-2xl hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 backdrop-blur-xl hover:gold-glow"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/10 overflow-hidden shrink-0 p-1.5 group-hover:scale-105 group-hover:border-amber-400/40 transition-all shadow-md">
                    <img 
                      src={comp.logo} 
                      alt={comp.name} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-xl text-amber-300 text-xs font-black">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{comp.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({comp.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                  {comp.name}
                </h3>
                
                <p className="text-xs font-semibold text-amber-400 mt-0.5">
                  {comp.industry}
                </p>

                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 font-light">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-400/80" />
                  {comp.location}
                </p>

                <p className="mt-3.5 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 font-light">
                  {comp.about}
                </p>

                {/* Company Perks */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {comp.perks.map((perk) => (
                    <span key={perk} className="text-[10px] font-medium text-slate-300 bg-slate-950 border border-white/10 px-2.5 py-1 rounded-lg">
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs font-bold text-slate-300">
                  <span className="text-gold-gradient font-black">{comp.openPositions}</span> Open Mandates
                </div>

                <button
                  onClick={() => handleViewCompanyJobs(comp.name)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-slate-950 font-black text-xs transition-all border border-amber-400/30"
                >
                  <span>View Roles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

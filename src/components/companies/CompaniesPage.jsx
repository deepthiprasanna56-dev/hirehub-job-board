import { useState } from "react";
import { Search, Star, MapPin, ArrowRight, Building2 } from "lucide-react";
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
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Verified Employer Directory
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Top Companies Hiring Now
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Discover company cultures, benefits, employee reviews, and open positions at leading technology organizations.
          </p>

          {/* Company Search Input */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company name or domain..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Industry Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedIndustry === ind
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
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
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 p-1 group-hover:scale-105 transition-transform shadow-xs">
                    <img 
                      src={comp.logo} 
                      alt={comp.name} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-amber-700 text-xs font-extrabold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{comp.rating}</span>
                    <span className="text-[10px] text-amber-600 font-normal">({comp.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition">
                  {comp.name}
                </h3>
                
                <p className="text-xs font-bold text-indigo-600 mt-0.5">
                  {comp.industry}
                </p>

                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {comp.location}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {comp.about}
                </p>

                {/* Company Perks */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {comp.perks.map((perk) => (
                    <span key={perk} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs font-bold text-slate-700">
                  <span className="text-indigo-600 font-extrabold">{comp.openPositions}</span> Open Positions
                </div>

                <button
                  onClick={() => handleViewCompanyJobs(comp.name)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition-all shadow-2xs"
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

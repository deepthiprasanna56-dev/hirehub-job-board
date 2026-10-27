import { Star, MapPin, ArrowRight } from "lucide-react";
import { companies } from "../../data/companiesData";
import { useJobs } from "../../context/JobContext";

export default function PopularCompanies() {
  const { setCurrentView, setSearchQuery } = useJobs();

  const handleCompanyClick = (companyName) => {
    setSearchQuery((prev) => ({ ...prev, keyword: companyName }));
    setCurrentView("jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Top Employers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Popular & Hiring Companies
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Work with the most innovative companies actively hiring talent globally with stellar workplace ratings.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView("companies");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition group self-start md:self-auto"
          >
            <span>View All Companies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.slice(0, 4).map((comp) => (
            <div
              key={comp.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                {/* Top Logo & Rating */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 p-1 group-hover:scale-105 transition-transform">
                    <img 
                      src={comp.logo} 
                      alt={comp.name} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg text-amber-700 text-xs font-extrabold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{comp.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {comp.name}
                </h3>
                
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {comp.industry}
                </p>

                <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {comp.location}
                </p>

                <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {comp.tagline}
                </p>

                {/* Perks tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {comp.perks.slice(0, 2).map((perk) => (
                    <span key={perk} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Open jobs & button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  {comp.openPositions} Openings
                </span>

                <button
                  onClick={() => handleCompanyClick(comp.name)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-indigo-600 group-hover:underline transition"
                >
                  <span>View Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

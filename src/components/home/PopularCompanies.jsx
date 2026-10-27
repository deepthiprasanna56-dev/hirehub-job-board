import { Star, MapPin, ArrowRight, Award, ShieldCheck } from "lucide-react";
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
    <section className="py-20 sm:py-28 bg-[#050811] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <Award className="w-3.5 h-3.5" />
              Verified Enterprise Employers
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3">
              Elite Corporate Partners
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl font-light">
              Organizations with proven leadership, outstanding compensation architectures, and visionary cultures.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView("companies");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition group self-start md:self-auto"
          >
            <span>View All Enterprise Partners</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.slice(0, 4).map((comp) => (
            <div
              key={comp.id}
              className="bg-slate-900/75 rounded-3xl border border-white/10 p-7 shadow-xl hover:shadow-2xl hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 backdrop-blur-xl hover:gold-glow"
            >
              <div>
                {/* Top Logo & Rating */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/10 overflow-hidden shrink-0 p-1.5 group-hover:scale-105 group-hover:border-amber-400/40 transition-all shadow-md">
                    <img 
                      src={comp.logo} 
                      alt={comp.name} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-xl text-amber-300 text-xs font-black">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{comp.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                  {comp.name}
                </h3>
                
                <p className="text-xs font-semibold text-amber-400/90 mt-1">
                  {comp.industry}
                </p>

                <p className="mt-2 text-xs text-slate-400 flex items-center gap-1 font-light">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-400/80" />
                  {comp.location}
                </p>

                <p className="mt-3.5 text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
                  {comp.tagline}
                </p>

                {/* Perks tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {comp.perks.slice(0, 2).map((perk) => (
                    <span key={perk} className="text-[10px] font-medium text-slate-300 bg-slate-950 border border-white/10 px-2.5 py-1 rounded-lg">
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Open jobs & button */}
              <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-black text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-xl">
                  {comp.openPositions} Retainers
                </span>

                <button
                  onClick={() => handleCompanyClick(comp.name)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-amber-300 group-hover:underline transition"
                >
                  <span>Explore Roles</span>
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

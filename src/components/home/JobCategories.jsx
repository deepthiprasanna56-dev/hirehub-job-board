import { 
  Code2, 
  LineChart, 
  Palette, 
  Megaphone, 
  Coins, 
  Users, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { categories } from "../../data/categoriesData";
import { useJobs } from "../../context/JobContext";

// Map string icon names to Lucide icon components
const iconMap = {
  Code2: Code2,
  LineChart: LineChart,
  Palette: Palette,
  Megaphone: Megaphone,
  Coins: Coins,
  Users: Users,
  Layers: Layers,
  ShieldCheck: ShieldCheck
};

export default function JobCategories() {
  const { filterByCategory, setCurrentView } = useJobs();

  return (
    <section className="py-20 sm:py-28 bg-[#050811] border-y border-white/10 relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full px-3 sm:px-5 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Strategic Disciplines
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3">
              Explore Curated Industry Sectors
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl font-light">
              High-impact roles across engineering, design, intelligence, and executive management.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView("jobs");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition group self-start md:self-auto"
          >
            <span>View All Opportunities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Code2;
            return (
              <div
                key={cat.id}
                onClick={() => filterByCategory(cat.name)}
                className="group p-7 bg-slate-900/60 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 relative overflow-hidden backdrop-blur-xl hover:gold-glow"
              >
                {/* Subtle top corner gold highlight */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-amber-500/15 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex items-center justify-between mb-5">
                  <div className="w-13 h-13 rounded-2xl flex items-center justify-center bg-slate-950 border border-white/10 group-hover:border-amber-400/40 text-amber-400 group-hover:scale-110 transition-all duration-300 shadow-md">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-white/5 border border-white/5 group-hover:border-amber-400/30 group-hover:text-amber-300 px-3 py-1 rounded-full transition">
                    {cat.count} roles
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                
                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
                  {cat.description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-amber-300 transition">
                  <span className="tracking-wide">Explore Sector</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

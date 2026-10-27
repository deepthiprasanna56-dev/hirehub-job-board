import { 
  Code2, 
  LineChart, 
  Palette, 
  Megaphone, 
  Coins, 
  Users, 
  Layers, 
  ShieldCheck, 
  ArrowRight 
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
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Explore Sectors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Browse Popular Job Categories
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Choose from the most in-demand industries and kickstart your application process.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView("jobs");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition group self-start md:self-auto"
          >
            <span>View All Sectors</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                className="group p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.bgColor} shadow-xs group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 px-2.5 py-1 rounded-full transition">
                    {cat.count} jobs
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                
                <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition">
                  <span>Explore Openings</span>
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

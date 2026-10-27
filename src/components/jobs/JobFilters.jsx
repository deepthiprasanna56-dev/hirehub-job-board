import { Filter, RotateCcw, Check, Flame } from "lucide-react";
import { useJobs } from "../../context/JobContext";
import { categories } from "../../data/categoriesData";

export default function JobFilters() {
  const { filters, setFilters, resetFilters } = useJobs();

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead / Executive"];
  const locationTypes = ["Remote", "Hybrid", "On-site"];

  const handleCheckboxToggle = (filterKey, value) => {
    setFilters((prev) => {
      const currentList = prev[filterKey] || [];
      const updatedList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];
      return { ...prev, [filterKey]: updatedList };
    });
  };

  const handleCategorySelect = (catName) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === catName ? "All" : catName
    }));
  };

  return (
    <div className="bg-slate-900/80 rounded-3xl border border-white/10 p-7 shadow-2xl space-y-7 backdrop-blur-2xl">
      
      {/* Filters Title & Reset */}
      <div className="flex items-center justify-between pb-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Filter className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-black tracking-wide text-white uppercase">Refine Roles</h3>
        </div>

        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Urgent Only Toggle */}
      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
          <Flame className="w-4 h-4 text-rose-400" />
          <span>Priority Retainers Only</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.urgentOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, urgentOnly: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-400"></div>
        </label>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3.5">
          Target Discipline
        </h4>
        <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
          <button
            onClick={() => handleCategorySelect("All")}
            className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
              filters.category === "All"
                ? "bg-amber-400/15 text-amber-300 font-bold border border-amber-400/30"
                : "text-slate-300 hover:bg-white/5 border border-transparent"
            }`}
          >
            <span>All Disciplines</span>
            {filters.category === "All" && <Check className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                filters.category === cat.name
                  ? "bg-amber-400/15 text-amber-300 font-bold border border-amber-400/30"
                  : "text-slate-300 hover:bg-white/5 border border-transparent"
              }`}
            >
              <span>{cat.name}</span>
              {filters.category === cat.name && <Check className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Location Type (Remote / Hybrid / On-site) */}
      <div className="pt-5 border-t border-white/10">
        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3.5">
          Workplace Model
        </h4>
        <div className="space-y-2.5">
          {locationTypes.map((loc) => {
            const isChecked = filters.locationType?.includes(loc);
            return (
              <label key={loc} className="flex items-center gap-3 text-xs font-medium text-slate-300 cursor-pointer select-none hover:text-white">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxToggle("locationType", loc)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-950 border-white/20 accent-amber-500"
                />
                <span>{loc}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Job Type */}
      <div className="pt-5 border-t border-white/10">
        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3.5">
          Engagement Type
        </h4>
        <div className="space-y-2.5">
          {jobTypes.map((type) => {
            const isChecked = filters.jobType?.includes(type);
            return (
              <label key={type} className="flex items-center gap-3 text-xs font-medium text-slate-300 cursor-pointer select-none hover:text-white">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxToggle("jobType", type)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-950 border-white/20 accent-amber-500"
                />
                <span>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience Level */}
      <div className="pt-5 border-t border-white/10">
        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3.5">
          Seniority & Experience
        </h4>
        <div className="space-y-2.5">
          {experienceLevels.map((exp) => {
            const isChecked = filters.experience?.includes(exp);
            return (
              <label key={exp} className="flex items-center gap-3 text-xs font-medium text-slate-300 cursor-pointer select-none hover:text-white">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxToggle("experience", exp)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-950 border-white/20 accent-amber-500"
                />
                <span>{exp}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Minimum Base Salary Slider */}
      <div className="pt-5 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            Min. Target Compensation
          </h4>
          <span className="text-xs font-black text-gold-gradient">
            {filters.minSalary > 0 ? `$${(filters.minSalary / 1000).toFixed(0)}k+ / yr` : "Any Package"}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="160000"
          step="10000"
          value={filters.minSalary}
          onChange={(e) => setFilters((prev) => ({ ...prev, minSalary: Number(e.target.value) }))}
          className="w-full accent-amber-400 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-bold">
          <span>$0</span>
          <span>$80k</span>
          <span>$160k+</span>
        </div>
      </div>

    </div>
  );
}

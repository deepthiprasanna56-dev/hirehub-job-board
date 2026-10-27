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
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-6">
      
      {/* Filters Title & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">Filter Jobs</h3>
        </div>

        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Urgent Only Toggle */}
      <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-rose-800 text-xs font-bold">
          <Flame className="w-4 h-4 text-rose-600" />
          <span>Urgently Hiring Only</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.urgentOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, urgentOnly: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
        </label>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Job Category
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => handleCategorySelect("All")}
            className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
              filters.category === "All"
                ? "bg-indigo-50 text-indigo-700 font-bold"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span>All Categories</span>
            {filters.category === "All" && <Check className="w-3.5 h-3.5 text-indigo-600" />}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                filters.category === cat.name
                  ? "bg-indigo-50 text-indigo-700 font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{cat.name}</span>
              {filters.category === cat.name && <Check className="w-3.5 h-3.5 text-indigo-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Location Type (Remote / Hybrid / On-site) */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Workplace Model
        </h4>
        <div className="space-y-2">
          {locationTypes.map((loc) => {
            const isChecked = filters.locationType?.includes(loc);
            return (
              <label key={loc} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxToggle("locationType", loc)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded-md"
                />
                <span>{loc}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Job Type */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Employment Type
        </h4>
        <div className="space-y-2">
          {jobTypes.map((type) => {
            const isChecked = filters.jobType?.includes(type);
            return (
              <label key={type} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxToggle("jobType", type)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded-md"
                />
                <span>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience Level */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Experience Level
        </h4>
        <div className="space-y-2">
          {experienceLevels.map((exp) => {
            const isChecked = filters.experience?.includes(exp);
            return (
              <label key={exp} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxToggle("experience", exp)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded-md"
                />
                <span>{exp}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Minimum Base Salary Slider */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Min. Salary Expectation
          </h4>
          <span className="text-xs font-extrabold text-indigo-600">
            {filters.minSalary > 0 ? `$${(filters.minSalary / 1000).toFixed(0)}k+ / yr` : "Any Salary"}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="160000"
          step="10000"
          value={filters.minSalary}
          onChange={(e) => setFilters((prev) => ({ ...prev, minSalary: Number(e.target.value) }))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
          <span>$0</span>
          <span>$80k</span>
          <span>$160k+</span>
        </div>
      </div>

    </div>
  );
}

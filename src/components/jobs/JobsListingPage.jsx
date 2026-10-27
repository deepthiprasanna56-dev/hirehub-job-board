import { useState, useMemo } from "react";
import { 
  Search, 
  MapPin, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  X, 
  Briefcase, 
  RotateCcw, 
  ArrowUpDown,
  Sparkles
} from "lucide-react";
import { useJobs } from "../../context/JobContext";
import JobCard from "./JobCard";
import JobFilters from "./JobFilters";

export default function JobsListingPage() {
  const { jobs, searchQuery, setSearchQuery, filters, setFilters, resetFilters } = useJobs();
  
  const [layout, setLayout] = useState("grid"); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState("latest"); // 'latest' | 'salary-high' | 'urgency'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Search input state
  const [keywordInput, setKeywordInput] = useState(searchQuery.keyword || "");
  const [locationInput, setLocationInput] = useState(searchQuery.location || "");

  const handleSearchApply = (e) => {
    e?.preventDefault();
    setSearchQuery((prev) => ({
      ...prev,
      keyword: keywordInput,
      location: locationInput
    }));
  };

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Keyword filter
      if (searchQuery.keyword && searchQuery.keyword.trim() !== "") {
        const q = searchQuery.keyword.toLowerCase().trim();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesSkills = job.skills.some((s) => s.toLowerCase().includes(q));
        const matchesDesc = job.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDesc) {
          return false;
        }
      }

      // Location filter
      if (searchQuery.location && searchQuery.location.trim() !== "") {
        const loc = searchQuery.location.toLowerCase().trim();
        const matchesLocation = job.location.toLowerCase().includes(loc);
        const matchesLocType = job.locationType.toLowerCase().includes(loc);
        if (!matchesLocation && !matchesLocType) {
          return false;
        }
      }

      // Category filter
      if (filters.category && filters.category !== "All") {
        if (job.category !== filters.category) return false;
      }

      // Workplace Model
      if (filters.locationType && filters.locationType.length > 0) {
        if (!filters.locationType.includes(job.locationType)) return false;
      }

      // Job Type
      if (filters.jobType && filters.jobType.length > 0) {
        if (!filters.jobType.includes(job.jobType)) return false;
      }

      // Experience Level
      if (filters.experience && filters.experience.length > 0) {
        if (!filters.experience.includes(job.experience)) return false;
      }

      // Salary Filter
      if (filters.minSalary && filters.minSalary > 0) {
        if (job.salaryMin < filters.minSalary) return false;
      }

      // Urgently hiring only
      if (filters.urgentOnly) {
        if (!job.urgentlyHiring) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "salary-high") {
        return (b.salaryMax || 0) - (a.salaryMax || 0);
      }
      if (sortBy === "urgency") {
        return (b.urgentlyHiring ? 1 : 0) - (a.urgentlyHiring ? 1 : 0);
      }
      return 0;
    });
  }, [jobs, searchQuery, filters, sortBy]);

  // Remove individual filter chip
  const removeChip = (key, value) => {
    if (key === "keyword") {
      setSearchQuery((prev) => ({ ...prev, keyword: "" }));
      setKeywordInput("");
    } else if (key === "location") {
      setSearchQuery((prev) => ({ ...prev, location: "" }));
      setLocationInput("");
    } else if (key === "category") {
      setFilters((prev) => ({ ...prev, category: "All" }));
    } else if (key === "urgentOnly") {
      setFilters((prev) => ({ ...prev, urgentOnly: false }));
    } else if (key === "minSalary") {
      setFilters((prev) => ({ ...prev, minSalary: 0 }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: prev[key].filter((item) => item !== value)
      }));
    }
  };

  const hasActiveFilters = Boolean(
    searchQuery.keyword ||
    searchQuery.location ||
    (filters.category && filters.category !== "All") ||
    filters.locationType?.length > 0 ||
    filters.jobType?.length > 0 ||
    filters.experience?.length > 0 ||
    filters.minSalary > 0 ||
    filters.urgentOnly
  );

  return (
    <div className="py-14 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Executive Registry
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Explore Open Appointments
          </h1>
          <p className="mt-2 text-slate-400 text-sm sm:text-base font-light">
            Review {jobs.length} verified executive, engineering, and leadership mandates worldwide.
          </p>
        </div>

        {/* Global Search Header Box */}
        <div className="bg-slate-900/80 rounded-3xl border border-white/10 p-5 shadow-2xl mb-10 backdrop-blur-2xl">
          <form onSubmit={handleSearchApply} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Keyword */}
            <div className="md:col-span-5 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 focus-within:border-amber-400/80 focus-within:ring-2 focus-within:ring-amber-500/20">
              <Search className="w-4 h-4 text-amber-400 shrink-0" />
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Search title, tech stack (e.g. React, UX, Python)"
                className="w-full bg-transparent text-sm font-semibold text-white placeholder-slate-500 focus:outline-none"
              />
              {keywordInput && (
                <button
                  type="button"
                  onClick={() => {
                    setKeywordInput("");
                    setSearchQuery((prev) => ({ ...prev, keyword: "" }));
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Location */}
            <div className="md:col-span-4 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 focus-within:border-amber-400/80 focus-within:ring-2 focus-within:ring-amber-500/20">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Location (e.g. Remote, San Francisco, London)"
                className="w-full bg-transparent text-sm font-semibold text-white placeholder-slate-500 focus:outline-none"
              />
              {locationInput && (
                <button
                  type="button"
                  onClick={() => {
                    setLocationInput("");
                    setSearchQuery((prev) => ({ ...prev, location: "" }));
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Buttons */}
            <div className="md:col-span-3 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                Filter Roles
              </button>

              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden p-3.5 rounded-2xl border border-white/10 text-slate-300 hover:bg-white/5 relative"
                aria-label="Filter"
              >
                <SlidersHorizontal className="w-5 h-5 text-amber-400" />
                {hasActiveFilters && (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute top-2 right-2"></span>
                )}
              </button>
            </div>

          </form>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Active Criteria:</span>

              {searchQuery.keyword && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                  "{searchQuery.keyword}"
                  <button onClick={() => removeChip("keyword")}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              {searchQuery.location && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-200 text-xs font-semibold">
                  Location: {searchQuery.location}
                  <button onClick={() => removeChip("location")}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              {filters.category && filters.category !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                  {filters.category}
                  <button onClick={() => removeChip("category")}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              {filters.urgentOnly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                  Priority Retainers
                  <button onClick={() => removeChip("urgentOnly")}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              {filters.minSalary > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-semibold">
                  ${(filters.minSalary / 1000).toFixed(0)}k+
                  <button onClick={() => removeChip("minSalary")}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              {filters.jobType?.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-slate-300 text-xs font-semibold">
                  {t}
                  <button onClick={() => removeChip("jobType", t)}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              ))}

              {filters.locationType?.map((l) => (
                <span key={l} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-slate-300 text-xs font-semibold">
                  {l}
                  <button onClick={() => removeChip("locationType", l)}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              ))}

              {filters.experience?.map((e) => (
                <span key={e} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-slate-300 text-xs font-semibold">
                  {e}
                  <button onClick={() => removeChip("experience", e)}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              ))}

              <button
                onClick={resetFilters}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Two Column Layout: Sidebar Filters + Job Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28">
            <JobFilters />
          </div>

          {/* Right Main Job List Area */}
          <div className="lg:col-span-8">
            
            {/* Controls Bar: Results count, Sort, Grid/List toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-slate-900/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
              <div className="text-sm font-semibold text-slate-300">
                Displaying <span className="font-black text-amber-400">{filteredJobs.length}</span> executive appointments
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="latest">Latest Appointed</option>
                    <option value="salary-high">Top Remuneration</option>
                    <option value="urgency">Priority Retainers</option>
                  </select>
                </div>

                {/* View Layout Toggle */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setLayout("grid")}
                    className={`p-1.5 rounded-lg transition ${
                      layout === "grid" ? "bg-amber-400 text-slate-950 font-black shadow-xs" : "text-slate-400 hover:text-white"
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout("list")}
                    className={`p-1.5 rounded-lg transition ${
                      layout === "list" ? "bg-amber-400 text-slate-950 font-black shadow-xs" : "text-slate-400 hover:text-white"
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Jobs Render */}
            {filteredJobs.length === 0 ? (
              <div className="bg-slate-900/60 rounded-3xl border border-white/10 p-14 text-center">
                <div className="w-16 h-16 bg-amber-400/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-400/20">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">No Appointments Match Your Filters</h3>
                <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto font-light">
                  Try adjusting keywords or relaxing compensation criteria to discover matching appointments.
                </p>
                <div className="mt-6">
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-sm font-black shadow-lg shadow-amber-500/20 transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : layout === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} layout="list" />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filters Slide-over */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-end">
          <div className="bg-slate-900 w-full max-w-sm min-h-screen p-6 shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-white/10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <h3 className="text-lg font-black text-white">Filter Appointments</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <JobFilters />
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black rounded-xl"
              >
                Show {filteredJobs.length} Positions
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

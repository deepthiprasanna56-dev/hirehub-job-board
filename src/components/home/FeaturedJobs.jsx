import { useState } from "react";
import { ArrowRight, Sparkles, Crown } from "lucide-react";
import { useJobs } from "../../context/JobContext";
import JobCard from "../jobs/JobCard";

export default function FeaturedJobs() {
  const { jobs, setCurrentView } = useJobs();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Curated Roles" },
    { id: "tech", label: "Executive Tech" },
    { id: "design", label: "Product & Design" },
    { id: "remote", label: "Global Remote" },
    { id: "urgent", label: "Priority Retainers" }
  ];

  // Filter jobs based on active tab
  const featuredList = jobs.filter((job) => {
    if (activeTab === "all") return job.featured;
    if (activeTab === "tech") return job.categoryId === "software-development" || job.categoryId === "cybersecurity";
    if (activeTab === "design") return job.categoryId === "ui-ux-design";
    if (activeTab === "remote") return job.locationType === "Remote";
    if (activeTab === "urgent") return job.urgentlyHiring;
    return true;
  }).slice(0, 6);

  return (
    <section className="py-20 sm:py-28 bg-slate-950 border-b border-white/10 relative">
      <div className="w-full px-3 sm:px-5 lg:px-8">
        
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/30">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Hand-Selected Appointments
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3">
              Featured Executive Positions
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl font-light">
              Verified high-compensation roles with equity, sovereign autonomy, and industry-defining impact.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black"
                    : "bg-slate-900/90 text-slate-300 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Jobs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredList.map((job) => (
            <JobCard key={job.id} job={job} layout="grid" />
          ))}
        </div>

        {/* Bottom CTA to browse all jobs */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              setCurrentView("jobs");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-900 text-amber-300 font-black text-sm border border-amber-500/30 hover:border-amber-400/60 shadow-xl transition-all group gold-glow hover:scale-[1.02]"
          >
            <span>Explore All 16+ Executive Opportunities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-amber-400" />
          </button>
        </div>

      </div>
    </section>
  );
}

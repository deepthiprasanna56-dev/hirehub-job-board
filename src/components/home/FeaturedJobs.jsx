import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useJobs } from "../../context/JobContext";
import JobCard from "../jobs/JobCard";

export default function FeaturedJobs() {
  const { jobs, setCurrentView } = useJobs();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Featured" },
    { id: "tech", label: "Software & Tech" },
    { id: "design", label: "Design & Creative" },
    { id: "remote", label: "100% Remote" },
    { id: "urgent", label: "Urgently Hiring" }
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
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Hand-picked Opportunities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Featured Job Openings
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Verified roles from industry-leading companies with competitive salaries and great cultures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
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
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              setCurrentView("jobs");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-sm border border-indigo-200/80 shadow-xs hover:shadow-md transition-all group"
          >
            <span>Explore All 16+ Live Job Opportunities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

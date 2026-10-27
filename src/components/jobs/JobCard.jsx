import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  Flame
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function JobCard({ job, layout = "grid" }) {
  const { 
    savedJobIds, 
    toggleSaveJob, 
    openJobDetails, 
    openApplyModal, 
    appliedJobs 
  } = useJobs();

  const isSaved = savedJobIds.includes(job.id);
  const isApplied = appliedJobs.some((app) => app.jobId === job.id);

  if (layout === "list") {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 group">
        
        {/* Left Side: Logo & Info */}
        <div className="flex items-start gap-4 flex-1">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
            <img 
              src={job.companyLogo} 
              alt={job.company} 
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80";
              }}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                {job.category}
              </span>
              {job.featured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
              {job.urgentlyHiring && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                  <Flame className="w-3 h-3" /> Urgent
                </span>
              )}
              <span className="text-xs text-slate-400 ml-auto md:ml-0 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {job.postedDate}
              </span>
            </div>

            <h3 
              onClick={() => openJobDetails(job)}
              className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 cursor-pointer transition flex items-center gap-1.5"
            >
              {job.title}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>

            <p className="text-sm font-semibold text-slate-600 mt-0.5">{job.company}</p>

            {/* Badges / Metrics */}
            <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {job.location} ({job.locationType})
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                {job.jobType} • {job.experience}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                <DollarSign className="w-3.5 h-3.5" />
                {job.salary}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 justify-end shrink-0">
          <button
            onClick={() => toggleSaveJob(job.id)}
            title={isSaved ? "Remove from saved" : "Save job"}
            className={`p-3 rounded-xl border transition-all ${
              isSaved
                ? "bg-indigo-50 border-indigo-300 text-indigo-600"
                : "bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-indigo-600" : ""}`} />
          </button>

          <button
            onClick={() => openJobDetails(job)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition"
          >
            Details
          </button>

          {isApplied ? (
            <button
              disabled
              className="px-5 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center gap-1.5 cursor-default"
            >
              <CheckCircle2 className="w-4 h-4" />
              Applied
            </button>
          ) : (
            <button
              onClick={() => openApplyModal(job)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
            >
              Apply Now
            </button>
          )}
        </div>

      </div>
    );
  }

  // Grid layout (Default card)
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-300 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 relative">
      
      {/* Top Bar: Company Logo, Badges & Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              <img 
                src={job.companyLogo} 
                alt={job.company} 
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 line-clamp-1">{job.company}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" />
                {job.location}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleSaveJob(job.id)}
            title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
            className={`p-2.5 rounded-xl border transition-all ${
              isSaved
                ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                : "bg-slate-50/80 border-slate-200/80 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-indigo-600" : ""}`} />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            {job.category}
          </span>
          {job.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
          {job.urgentlyHiring && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
              <Flame className="w-3 h-3" /> Urgent
            </span>
          )}
        </div>

        {/* Job Title */}
        <h3 
          onClick={() => openJobDetails(job)}
          className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 cursor-pointer transition line-clamp-2 leading-snug"
        >
          {job.title}
        </h3>

        {/* Job Specs Pills */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/60">
            {job.jobType}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/60">
            {job.locationType}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/60">
            {job.experience}
          </span>
        </div>

        {/* Skills Snippet */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/50">
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="text-[11px] font-semibold text-slate-400 self-center">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Bar: Salary & Apply Button */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Salary
          </span>
          <span className="text-sm font-extrabold text-slate-900">
            {job.salary}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => openJobDetails(job)}
            className="p-2 text-xs font-bold text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
          >
            Details
          </button>

          {isApplied ? (
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1 border border-emerald-200"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Applied
            </button>
          ) : (
            <button
              onClick={() => openApplyModal(job)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

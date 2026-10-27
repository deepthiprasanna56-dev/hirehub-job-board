import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  Flame,
  Crown
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
      <div className="bg-slate-900/80 rounded-3xl border border-white/10 hover:border-amber-400/40 p-6 sm:p-7 shadow-xl hover:gold-glow transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group backdrop-blur-xl">
        
        {/* Left Side: Logo & Info */}
        <div className="flex items-start gap-5 flex-1">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1.5 group-hover:scale-105 group-hover:border-amber-400/40 transition-all shadow-md">
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
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-0.5 rounded-full">
                {job.category}
              </span>
              {job.featured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                  <Crown className="w-3 h-3 text-amber-400" /> Featured
                </span>
              )}
              {job.urgentlyHiring && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-300 bg-rose-500/20 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                  <Flame className="w-3 h-3 text-rose-400" /> Urgent
                </span>
              )}
              <span className="text-xs text-slate-500 ml-auto md:ml-0 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {job.postedDate}
              </span>
            </div>

            <h3 
              onClick={() => openJobDetails(job)}
              className="text-xl font-bold text-white group-hover:text-amber-300 cursor-pointer transition flex items-center gap-2"
            >
              {job.title}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </h3>

            <p className="text-sm font-semibold text-slate-400 mt-1">{job.company}</p>

            {/* Badges / Metrics */}
            <div className="mt-3.5 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                {job.location} ({job.locationType})
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Briefcase className="w-3.5 h-3.5 text-amber-400/80" />
                {job.jobType} • {job.experience}
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 font-black bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-lg">
                <DollarSign className="w-3.5 h-3.5" />
                {job.salary}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10 justify-end shrink-0">
          <button
            onClick={() => toggleSaveJob(job.id)}
            title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
            className={`p-3 rounded-2xl border transition-all ${
              isSaved
                ? "bg-amber-400/20 border-amber-400 text-amber-300"
                : "bg-slate-950 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-amber-400 text-amber-400" : ""}`} />
          </button>

          <button
            onClick={() => openJobDetails(job)}
            className="px-5 py-3 rounded-2xl border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/5 hover:text-white transition"
          >
            Details
          </button>

          {isApplied ? (
            <button
              disabled
              className="px-6 py-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-sm flex items-center gap-1.5 cursor-default"
            >
              <CheckCircle2 className="w-4 h-4" />
              Applied
            </button>
          ) : (
            <button
              onClick={() => openApplyModal(job)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5"
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
    <div className="bg-slate-900/75 rounded-3xl border border-white/10 hover:border-amber-400/40 p-7 shadow-xl hover:gold-glow transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 relative backdrop-blur-xl">
      
      {/* Top Bar: Company Logo, Badges & Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1.5 group-hover:scale-105 group-hover:border-amber-400/40 transition-all shadow-md">
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
              <p className="text-sm font-bold text-white line-clamp-1">{job.company}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 font-light">
                <MapPin className="w-3 h-3 text-amber-400/80" />
                {job.location}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleSaveJob(job.id)}
            title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
            className={`p-2.5 rounded-2xl border transition-all ${
              isSaved
                ? "bg-amber-400/20 border-amber-400/60 text-amber-300"
                : "bg-slate-950 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-amber-400 text-amber-400" : ""}`} />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-0.5 rounded-full">
            {job.category}
          </span>
          {job.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
              <Crown className="w-3 h-3 text-amber-400" /> Featured
            </span>
          )}
          {job.urgentlyHiring && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-rose-300 bg-rose-500/20 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
              <Flame className="w-3 h-3 text-rose-400" /> Urgent
            </span>
          )}
        </div>

        {/* Job Title */}
        <h3 
          onClick={() => openJobDetails(job)}
          className="text-lg font-bold text-white group-hover:text-amber-300 cursor-pointer transition line-clamp-2 leading-snug"
        >
          {job.title}
        </h3>

        {/* Job Specs Pills */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
          <span className="px-3 py-1 rounded-xl bg-slate-950 border border-white/10">
            {job.jobType}
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-950 border border-white/10">
            {job.locationType}
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-950 border border-white/10">
            {job.experience}
          </span>
        </div>

        {/* Skills Snippet */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="text-[11px] font-medium text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/5">
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="text-[11px] font-semibold text-slate-500 self-center">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Bar: Salary & Apply Button */}
      <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
            Package / Salary
          </span>
          <span className="text-sm font-black text-gold-gradient">
            {job.salary}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openJobDetails(job)}
            className="p-2 text-xs font-bold text-slate-400 hover:text-white rounded-xl transition"
          >
            Details
          </button>

          {isApplied ? (
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Applied
            </button>
          ) : (
            <button
              onClick={() => openApplyModal(job)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition transform hover:-translate-y-0.5"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

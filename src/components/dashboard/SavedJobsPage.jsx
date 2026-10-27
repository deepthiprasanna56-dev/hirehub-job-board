import { Bookmark, ArrowRight, Sparkles } from "lucide-react";
import { useJobs } from "../../context/JobContext";
import JobCard from "../jobs/JobCard";

export default function SavedJobsPage() {
  const { jobs, savedJobIds, setCurrentView } = useJobs();

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <div className="py-14 bg-slate-950 min-h-screen text-slate-100">
      <div className="w-full px-3 sm:px-5 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Wishlist</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Saved Appointments
            </h1>
            <p className="text-slate-400 text-sm mt-1.5 font-light">
              Curate roles of interest and submit your candidatures at your own pace.
            </p>
          </div>

          {savedJobs.length > 0 && (
            <div className="text-sm font-semibold text-slate-300 bg-slate-900 px-5 py-3 rounded-2xl border border-white/10 shadow-lg self-start sm:self-auto">
              Curated: <span className="font-black text-gold-gradient">{savedJobs.length}</span> positions
            </div>
          )}
        </div>

        {/* Content */}
        {savedJobs.length === 0 ? (
          <div className="bg-slate-900/60 rounded-3xl border border-white/10 p-14 text-center max-w-xl mx-auto shadow-2xl my-8">
            <div className="w-16 h-16 bg-amber-400/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-400/20">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Your Wishlist is Empty</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed font-light">
              You haven't bookmarked any appointments yet. Click the bookmark icon on any card to save roles here.
            </p>
            <div className="mt-8">
              <button
                onClick={() => {
                  setCurrentView("jobs");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-sm font-black shadow-xl shadow-amber-500/20 hover:scale-105 transition"
              >
                <span>Browse Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} layout="grid" />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

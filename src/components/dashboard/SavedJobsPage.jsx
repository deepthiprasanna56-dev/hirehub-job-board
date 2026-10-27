import { Bookmark, ArrowRight } from "lucide-react";
import { useJobs } from "../../context/JobContext";
import JobCard from "../jobs/JobCard";

export default function SavedJobsPage() {
  const { jobs, savedJobIds, setCurrentView } = useJobs();

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              <Bookmark className="w-3.5 h-3.5 fill-indigo-600" />
              <span>Personal Wishlist</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Saved Jobs
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Keep track of roles you're interested in and apply whenever you're ready.
            </p>
          </div>

          {savedJobs.length > 0 && (
            <div className="text-sm font-semibold text-slate-600 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-2xs self-start sm:self-auto">
              Total Saved: <span className="font-extrabold text-indigo-600">{savedJobs.length}</span> positions
            </div>
          )}
        </div>

        {/* Content */}
        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-xl mx-auto shadow-xs my-8">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Your wishlist is empty</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              You haven't saved any jobs yet. When browsing jobs, click the bookmark icon to save roles here for later review.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setCurrentView("jobs");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-md hover:bg-indigo-700 transition"
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

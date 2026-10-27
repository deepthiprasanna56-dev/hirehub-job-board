import { 
  X, 
  MapPin, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Flame 
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function JobDetailsModal() {
  const { 
    selectedJob, 
    isDetailsModalOpen, 
    closeJobDetails, 
    openApplyModal, 
    savedJobIds, 
    toggleSaveJob, 
    appliedJobs, 
    addToast 
  } = useJobs();

  if (!isDetailsModalOpen || !selectedJob) return null;

  const isSaved = savedJobIds.includes(selectedJob.id);
  const isApplied = appliedJobs.some((app) => app.jobId === selectedJob.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast("Job link copied to clipboard!", "success");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Container */}
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header */}
        <div className="p-6 border-b border-slate-200 bg-white/95 sticky top-0 z-20 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 p-1 shadow-xs">
              <img 
                src={selectedJob.companyLogo} 
                alt={selectedJob.company} 
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=120&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  {selectedJob.category}
                </span>
                {selectedJob.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
                {selectedJob.urgentlyHiring && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                    <Flame className="w-3 h-3" /> Urgently Hiring
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {selectedJob.title}
              </h2>

              <p className="text-sm font-semibold text-slate-600 mt-0.5 flex items-center gap-2">
                <span>{selectedJob.company}</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-slate-500 font-normal">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedJob.location} ({selectedJob.locationType})
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={closeJobDetails}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-700">
          
          {/* Key Job Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div>
              <span className="block text-xs font-semibold uppercase text-slate-400 tracking-wider">Salary</span>
              <span className="text-base font-extrabold text-slate-900 mt-1 block">
                {selectedJob.salary}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase text-slate-400 tracking-wider">Job Type</span>
              <span className="text-base font-extrabold text-slate-900 mt-1 block">
                {selectedJob.jobType}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase text-slate-400 tracking-wider">Experience</span>
              <span className="text-base font-extrabold text-slate-900 mt-1 block">
                {selectedJob.experienceYears} ({selectedJob.experience})
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase text-slate-400 tracking-wider">Deadline</span>
              <span className="text-base font-extrabold text-slate-900 mt-1 block">
                {selectedJob.deadline}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">About The Role</h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {selectedJob.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {selectedJob.responsibilities && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Key Responsibilities</h3>
              <ul className="space-y-2.5">
                {selectedJob.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Qualifications & Requirements */}
          {selectedJob.requirements && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Requirements & Qualifications</h3>
              <ul className="space-y-2.5">
                {selectedJob.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Required */}
          {selectedJob.skills && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Required Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Benefits & Perks */}
          {selectedJob.benefits && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border border-indigo-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Benefits & Perks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedJob.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Action Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveJob(selectedJob.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-bold transition ${
                isSaved
                  ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-indigo-600" : ""}`} />
              <span>{isSaved ? "Saved" : "Save Job"}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-3 rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 text-sm font-bold transition"
              title="Share job"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div>
            {isApplied ? (
              <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-100 text-emerald-800 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Application Submitted</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  closeJobDetails();
                  openApplyModal(selectedJob);
                }}
                className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition transform hover:-translate-y-0.5"
              >
                Apply for this Role
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

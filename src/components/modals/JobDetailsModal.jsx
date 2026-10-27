import { 
  X, 
  MapPin, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Flame,
  Crown
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
    addToast("Confidential appointment link copied to clipboard!", "success");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Container */}
      <div 
        className="bg-slate-900 rounded-3xl shadow-2xl border border-amber-500/30 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden transform animate-in zoom-in-95 duration-200 text-slate-100 gold-glow"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-slate-900/95 sticky top-0 z-20 flex items-start justify-between gap-4 backdrop-blur-2xl">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/10 overflow-hidden shrink-0 p-1.5 shadow-md">
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
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-0.5 rounded-full">
                  {selectedJob.category}
                </span>
                {selectedJob.featured && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                    <Crown className="w-3 h-3 text-amber-400" /> Featured
                  </span>
                )}
                {selectedJob.urgentlyHiring && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-rose-300 bg-rose-500/20 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                    <Flame className="w-3 h-3 text-rose-400" /> Priority Retainer
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                {selectedJob.title}
              </h2>

              <p className="text-sm font-semibold text-slate-300 mt-1 flex items-center gap-2">
                <span>{selectedJob.company}</span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-slate-400 font-light">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {selectedJob.location} ({selectedJob.locationType})
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={closeJobDetails}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-300 font-light">
          
          {/* Key Job Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-950 border border-white/10">
            <div>
              <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Remuneration</span>
              <span className="text-base sm:text-lg font-black text-gold-gradient mt-1 block">
                {selectedJob.salary}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Engagement</span>
              <span className="text-base sm:text-lg font-bold text-white mt-1 block">
                {selectedJob.jobType}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Seniority</span>
              <span className="text-base sm:text-lg font-bold text-white mt-1 block">
                {selectedJob.experienceYears}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Appointment Close</span>
              <span className="text-base sm:text-lg font-bold text-white mt-1 block">
                {selectedJob.deadline}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Executive Summary</h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              {selectedJob.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {selectedJob.responsibilities && (
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Core Mandate & Deliverables</h3>
              <ul className="space-y-3">
                {selectedJob.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Qualifications & Requirements */}
          {selectedJob.requirements && (
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Candidate Profile & Pedigree</h3>
              <ul className="space-y-3">
                {selectedJob.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-2"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Required */}
          {selectedJob.skills && (
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Domain Mastery</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-amber-400/30 text-amber-300 text-xs font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Benefits & Perks */}
          {selectedJob.benefits && (
            <div className="p-7 rounded-3xl bg-slate-950 border border-amber-500/20">
              <h3 className="text-lg font-bold text-white mb-3.5 flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" /> Executive Privileges & Compensation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedJob.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-medium">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Action Footer */}
        <div className="p-6 sm:p-7 border-t border-white/10 bg-slate-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveJob(selectedJob.id)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border text-sm font-bold transition ${
                isSaved
                  ? "bg-amber-400/20 border-amber-400 text-amber-300"
                  : "bg-slate-900 border-white/10 text-slate-300 hover:text-white"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-amber-400" : ""}`} />
              <span>{isSaved ? "Saved" : "Save Role"}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-3.5 rounded-2xl border border-white/10 bg-slate-900 text-slate-300 hover:text-white text-sm font-bold transition"
              title="Share mandate link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div>
            {isApplied ? (
              <div className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Dossier Submitted</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  closeJobDetails();
                  openApplyModal(selectedJob);
                }}
                className="px-9 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5"
              >
                Submit Candidature
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

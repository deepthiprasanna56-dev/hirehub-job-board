import { useState } from "react";
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Loader2,
  Crown
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function ApplyModal() {
  const { selectedJob, isApplyModalOpen, closeApplyModal, user, applyToJob, addToast } = useJobs();

  const [fullName, setFullName] = useState(user?.name || "Deepthi Assistant");
  const [email, setEmail] = useState(user?.email || "deepthi@hirehub.dev");
  const [phone, setPhone] = useState(user?.phone || "+1 (415) 555-0101");
  const [portfolio, setPortfolio] = useState(user?.portfolioUrl || "https://github.com/microsoft/copilot");
  const [coverNote, setCoverNote] = useState("");
  const [resumeFile, setResumeFile] = useState({ name: user?.resumeName || "Deepthi_Assistant_Executive_Resume.pdf", size: "1.8 MB" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isApplyModalOpen || !selectedJob) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
      addToast(`Dossier "${file.name}" attached successfully`, "info");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !resumeFile) {
      addToast("Please complete the required dossier fields", "error");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const success = applyToJob(selectedJob.id, {
        name: fullName,
        email,
        phone,
        portfolio,
        coverNote,
        resumeName: resumeFile.name
      });

      setIsSubmitting(false);
      if (success) {
        setIsSuccess(true);
      }
    }, 850);
  };

  const handleDone = () => {
    setIsSuccess(false);
    closeApplyModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-6 animate-in fade-in duration-200">
      
      <div 
        className="bg-slate-900 rounded-3xl shadow-2xl border border-amber-500/30 max-w-2xl w-full overflow-hidden transform animate-in zoom-in-95 duration-200 text-slate-100 gold-glow"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="p-6 sm:p-7 border-b border-white/10 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">
                Submit Executive Dossier
              </h2>
              <p className="text-xs font-semibold text-amber-400 mt-0.5">
                {selectedJob.title} • {selectedJob.company}
              </p>
            </div>
          </div>

          <button
            onClick={closeApplyModal}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-10 text-center space-y-5">
            <div className="w-20 h-20 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-3xl flex items-center justify-center mx-auto shadow-2xl gold-glow">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">Executive Dossier Received</h3>
            
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
              Your confidential profile for <span className="font-bold text-amber-300">{selectedJob.title}</span> at <span className="font-bold text-amber-300">{selectedJob.company}</span> has been dispatched directly to the recruitment partners.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleDone}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-amber-500/20"
              >
                Return to Appointments
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                  Candidate Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Deepthi Assistant"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                  Confidential Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@executive.com"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                  Direct Telephone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                  LinkedIn / Portfolio URL
                </label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            {/* Resume Upload Area */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                Executive Resume / Dossier * (PDF, DOCX)
              </label>

              {resumeFile ? (
                <div className="flex items-center justify-between p-4 rounded-2xl border border-amber-400/40 bg-slate-950">
                  <div className="flex items-center gap-3">
                    <FileText className="w-7 h-7 text-amber-400" />
                    <div>
                      <p className="text-sm font-bold text-white">{resumeFile.name}</p>
                      <p className="text-xs text-slate-400">{resumeFile.size}</p>
                    </div>
                  </div>

                  <label className="cursor-pointer text-xs font-black text-amber-400 hover:text-amber-300">
                    Replace
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="border-2 border-dashed border-white/20 hover:border-amber-400 rounded-3xl p-7 flex flex-col items-center justify-center cursor-pointer bg-slate-950 transition">
                  <Upload className="w-8 h-8 text-amber-400 mb-2" />
                  <span className="text-sm font-bold text-white">Attach Confidential Dossier</span>
                  <span className="text-xs text-slate-400 mt-1">PDF or DOCX format</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Cover Note */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                Executive Rationale & Alignment (Optional)
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Highlight your track record, key enterprise achievements, and alignment with this mandate..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 resize-none"
              ></textarea>
            </div>

            {/* Submit Action */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeApplyModal}
                className="px-6 py-3 rounded-2xl border border-white/10 text-slate-400 font-bold text-sm hover:text-white transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-amber-500/20 transition flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  "Dispatch Candidature"
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

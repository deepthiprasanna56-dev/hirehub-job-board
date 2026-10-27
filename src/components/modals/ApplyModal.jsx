import { useState } from "react";
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Loader2 
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function ApplyModal() {
  const { selectedJob, isApplyModalOpen, closeApplyModal, user, applyToJob, addToast } = useJobs();

  const [fullName, setFullName] = useState(user?.name || "Bademala Nikhil");
  const [email, setEmail] = useState(user?.email || "nikhil@hirehub.dev");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [portfolio, setPortfolio] = useState(user?.portfolioUrl || "https://github.com/bademalanikhil");
  const [coverNote, setCoverNote] = useState("");
  const [resumeFile, setResumeFile] = useState({ name: user?.resumeName || "Bademala_Nikhil_Frontend_Resume.pdf", size: "1.8 MB" });
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
      addToast(`Resume "${file.name}" attached`, "info");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !resumeFile) {
      addToast("Please complete the required fields", "error");
      return;
    }

    setIsSubmitting(true);

    // Simulate network submission delay
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
    }, 900);
  };

  const handleDone = () => {
    setIsSuccess(false);
    closeApplyModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Apply for {selectedJob.title}
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {selectedJob.company} • {selectedJob.location}
            </p>
          </div>

          <button
            onClick={closeApplyModal}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">Application Submitted!</h3>
            
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your application for <span className="font-bold text-slate-800">{selectedJob.title}</span> at <span className="font-bold text-slate-800">{selectedJob.company}</span> has been received. You can track your interview status on your Dashboard.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleDone}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30"
              >
                Back to Opportunities
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Bademala Nikhil"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                  Portfolio / GitHub URL
                </label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Resume Upload Area */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                Resume / CV * (PDF, DOCX)
              </label>

              {resumeFile ? (
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-indigo-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{resumeFile.name}</p>
                      <p className="text-xs text-slate-500">{resumeFile.size}</p>
                    </div>
                  </div>

                  <label className="cursor-pointer text-xs font-bold text-indigo-600 hover:text-indigo-800">
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
                <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-indigo-50/30 transition">
                  <Upload className="w-8 h-8 text-indigo-500 mb-2" />
                  <span className="text-sm font-bold text-slate-700">Click to upload your resume</span>
                  <span className="text-xs text-slate-400 mt-1">PDF or DOCX up to 5MB</span>
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
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                Why are you a great fit? (Optional)
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Mention relevant experience, key projects, or why you want to join..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
              ></textarea>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeApplyModal}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-extrabold rounded-xl text-sm shadow-md shadow-indigo-600/30 transition flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Send Application"
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

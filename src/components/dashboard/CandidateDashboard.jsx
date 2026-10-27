import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Bookmark, 
  Edit3,
  Crown,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { useJobs } from "../../context/JobContext";
import JobCard from "../jobs/JobCard";

export default function CandidateDashboard() {
  const { user, updateProfile, appliedJobs, savedJobIds, jobs, openJobDetails, setCurrentView } = useJobs();
  const [activeTab, setActiveTab] = useState("applied"); // 'applied' | 'saved' | 'settings'

  // Edit profile state
  const [name, setName] = useState(user?.name || "Deepthi Assistant");
  const [title, setTitle] = useState(user?.title || "Senior Frontend Developer");
  const [email, setEmail] = useState(user?.email || "deepthi@hirehub.dev");
  const [phone, setPhone] = useState(user?.phone || "+1 (415) 555-0101");
  const [location, setLocation] = useState(user?.location || "Seattle / Remote, USA");
  const [bio, setBio] = useState(
    user?.bio || "Passionate frontend developer crafting responsive, pixel-perfect web applications with React, Tailwind CSS, and modern web architectures."
  );
  const [portfolioUrl, setPortfolioUrl] = useState(user?.portfolioUrl || "https://github.com/microsoft/copilot");

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      title,
      email,
      phone,
      location,
      bio,
      portfolioUrl
    });
    setActiveTab("applied");
  };

  const appliedJobsList = appliedJobs.map((app) => {
    const jobInfo = jobs.find((j) => j.id === app.jobId) || {
      title: "Software Engineer",
      company: "Tech Enterprise",
      location: "Remote",
      salary: "$140k - $170k"
    };
    return { ...app, jobInfo };
  });

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  const getStatusBadge = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-amber-400/10 text-amber-300 border-amber-400/30";
      case "Interview Scheduled":
        return "bg-purple-500/10 text-purple-300 border-purple-500/30";
      case "Offer Extended":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-blue-500/10 text-blue-300 border-blue-500/30";
    }
  };

  return (
    <div className="py-14 bg-slate-950 min-h-screen text-slate-100">
      <div className="w-full px-3 sm:px-5 lg:px-8 space-y-10">
        
        {/* Candidate Profile Header Card */}
        <div className="bg-slate-900/80 rounded-3xl border border-amber-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-2xl gold-glow">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-purple-500/5 to-transparent rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  alt={user?.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-amber-400/50 shadow-2xl"
                />
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-amber-400 border-2 border-slate-950 rounded-full flex items-center justify-center text-slate-950" title="Verified Talent">
                  <Crown className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-4xl font-black text-white">
                    {user?.name || "Deepthi Assistant"}
                  </h1>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Verified Candidate
                  </span>
                </div>

                <p className="text-base sm:text-lg font-bold text-gold-gradient mt-1">
                  {user?.title || "Senior Frontend Developer"}
                </p>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-5 text-xs text-slate-400 mt-3 font-light">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {user?.location || "Seattle / Remote, USA"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    {user?.email || "deepthi@hirehub.dev"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    {user?.phone || "+91 98765 43210"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab("settings");
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-slate-950 hover:bg-white/5 text-slate-200 font-bold text-sm shadow-md transition"
              >
                <Edit3 className="w-4 h-4 text-amber-400" />
                Edit Profile
              </button>

              <button
                onClick={() => {
                  setCurrentView("jobs");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5"
              >
                <Briefcase className="w-4 h-4" />
                Explore Roles
              </button>
            </div>
          </div>

          {/* Bio & Skills Preview */}
          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {user?.bio}
              </p>
              
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-xs font-bold text-slate-500 mr-1">Skills:</span>
                {(user?.skills || ["React", "JavaScript", "Tailwind CSS", "TypeScript"]).map((s) => (
                  <span key={s} className="px-3 py-1 rounded-xl bg-slate-950 text-slate-200 text-xs font-semibold border border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 flex items-center justify-end">
              <div className="flex items-center gap-3.5 p-3.5 bg-slate-950 rounded-2xl border border-amber-400/30 w-full sm:w-auto">
                <FileText className="w-7 h-7 text-amber-400 shrink-0" />
                <div className="text-left text-xs">
                  <p className="font-bold text-white truncate max-w-[160px]">{user?.resumeName || "Resume.pdf"}</p>
                  <p className="text-amber-400 font-semibold cursor-pointer hover:underline">Attached Dossier</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/70 p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Total Applied</p>
            <p className="text-3xl font-black text-white mt-1">{appliedJobs.length}</p>
            <p className="text-xs text-slate-500 mt-1">Active Mandates</p>
          </div>

          <div className="bg-slate-900/70 p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Under Review</p>
            <p className="text-3xl font-black text-amber-400 mt-1">
              {appliedJobs.filter((a) => a.status === "Under Review" || a.status === "Applied").length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Recruiter Evaluation</p>
          </div>

          <div className="bg-slate-900/70 p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Interviews</p>
            <p className="text-3xl font-black text-gold-gradient mt-1">1</p>
            <p className="text-xs text-slate-500 mt-1">Upcoming Meeting</p>
          </div>

          <div className="bg-slate-900/70 p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Saved Wishlist</p>
            <p className="text-3xl font-black text-white mt-1">{savedJobIds.length}</p>
            <p className="text-xs text-slate-500 mt-1">Curated Benchmarks</p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-white/10 gap-6 sm:gap-10">
          <button
            onClick={() => setActiveTab("applied")}
            className={`pb-4 text-sm sm:text-base font-black transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "applied"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Applied Mandates ({appliedJobs.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-4 text-sm sm:text-base font-black transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "saved"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Saved Wishlist ({savedJobIds.length})
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-4 text-sm sm:text-base font-black transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "settings"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            Profile & Settings
          </button>
        </div>

        {/* Tab Content 1: Applied Jobs */}
        {activeTab === "applied" && (
          <div className="space-y-4">
            {appliedJobsList.length === 0 ? (
              <div className="bg-slate-900/60 rounded-3xl border border-white/10 p-14 text-center">
                <p className="text-slate-400 font-light">You have not submitted applications yet.</p>
                <button
                  onClick={() => setCurrentView("jobs")}
                  className="mt-4 px-7 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 rounded-2xl font-black text-sm"
                >
                  Explore Executive Appointments
                </button>
              </div>
            ) : (
              appliedJobsList.map((app) => (
                <div
                  key={app.jobId}
                  className="bg-slate-900/80 rounded-3xl border border-white/10 p-6 sm:p-7 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 backdrop-blur-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center p-1.5 border border-white/10">
                      <img
                        src={app.jobInfo.companyLogo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80"}
                        alt={app.jobInfo.company}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <h3
                        onClick={() => openJobDetails(app.jobInfo)}
                        className="text-base sm:text-xl font-bold text-white hover:text-amber-300 cursor-pointer transition"
                      >
                        {app.jobInfo.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                        {app.jobInfo.company} • {app.jobInfo.location}
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1 font-light">
                        <Clock className="w-3 h-3 text-amber-400/80" /> Submitted {app.appliedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>

                    <button
                      onClick={() => openJobDetails(app.jobInfo)}
                      className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition"
                    >
                      Dossier
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab Content 2: Saved Jobs */}
        {activeTab === "saved" && (
          <div>
            {savedJobs.length === 0 ? (
              <div className="bg-slate-900/60 rounded-3xl border border-white/10 p-14 text-center">
                <p className="text-slate-400 font-light">No saved roles found in your wishlist.</p>
                <button
                  onClick={() => setCurrentView("jobs")}
                  className="mt-4 px-7 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 rounded-2xl font-black text-sm"
                >
                  Browse Roles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobs.map((job) => (
                  <JobCard key={job.id} job={job} layout="grid" />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 3: Profile Settings Form */}
        {activeTab === "settings" && (
          <div className="bg-slate-900/80 rounded-3xl border border-white/10 p-8 sm:p-10 shadow-2xl max-w-3xl backdrop-blur-2xl">
            <h2 className="text-2xl font-black text-white mb-6">Edit Executive Profile</h2>

            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Executive Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Portfolio or GitHub URL</label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Executive Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("applied")}
                  className="px-6 py-3 rounded-2xl border border-white/10 text-slate-400 font-bold text-sm hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black rounded-2xl text-sm shadow-lg shadow-amber-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

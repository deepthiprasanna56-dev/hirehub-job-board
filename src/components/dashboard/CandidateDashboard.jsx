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
  Edit3
} from "lucide-react";
import { useJobs } from "../../context/JobContext";
import JobCard from "../jobs/JobCard";

export default function CandidateDashboard() {
  const { user, updateProfile, appliedJobs, savedJobIds, jobs, openJobDetails, setCurrentView } = useJobs();
  const [activeTab, setActiveTab] = useState("applied"); // 'applied' | 'saved' | 'settings'

  // Edit profile state
  const [name, setName] = useState(user?.name || "Bademala Nikhil");
  const [title, setTitle] = useState(user?.title || "Senior Frontend Developer");
  const [email, setEmail] = useState(user?.email || "nikhil@hirehub.dev");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [location, setLocation] = useState(user?.location || "Hyderabad / Bangalore, India");
  const [bio, setBio] = useState(
    user?.bio || "Passionate frontend developer crafting responsive, pixel-perfect web applications with React, Tailwind CSS, and modern web architectures."
  );
  const [portfolioUrl, setPortfolioUrl] = useState(user?.portfolioUrl || "https://github.com/bademalanikhil");

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

  // Find job objects for applied records
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
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Interview Scheduled":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Offer Extended":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Candidate Profile Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="relative">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  alt={user?.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" title="Active Candidate"></span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {user?.name || "Bademala Nikhil"}
                  </h1>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                    {user?.role || "Candidate"}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1">
                  {user?.title || "Senior Frontend Developer"}
                </p>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 mt-2.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {user?.location || "Hyderabad / Bangalore, India"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {user?.email || "nikhil@hirehub.dev"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
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
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-xs transition"
              >
                <Edit3 className="w-4 h-4 text-slate-500" />
                Edit Profile
              </button>

              <button
                onClick={() => {
                  setCurrentView("jobs");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition"
              >
                <Briefcase className="w-4 h-4" />
                Explore Roles
              </button>
            </div>
          </div>

          {/* Bio & Skills Preview */}
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {user?.bio}
              </p>
              
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-xs font-bold text-slate-400 mr-1">Skills:</span>
                {(user?.skills || ["React", "JavaScript", "Tailwind CSS", "TypeScript"]).map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 flex items-center justify-end">
              <div className="flex items-center gap-3 p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 w-full sm:w-auto">
                <FileText className="w-6 h-6 text-indigo-600 shrink-0" />
                <div className="text-left text-xs">
                  <p className="font-bold text-slate-800 truncate max-w-[160px]">{user?.resumeName || "Resume.pdf"}</p>
                  <p className="text-indigo-600 font-semibold cursor-pointer hover:underline">Download / View</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Applied</p>
            <p className="text-2xl sm:text-3xl font-black text-indigo-600 mt-1">{appliedJobs.length}</p>
            <p className="text-xs text-slate-500 mt-1">Applications tracked</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Under Review</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
              {appliedJobs.filter((a) => a.status === "Under Review" || a.status === "Applied").length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Recruiter evaluations</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Interviews</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">1</p>
            <p className="text-xs text-slate-500 mt-1">Upcoming chats</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Saved Wishlist</p>
            <p className="text-2xl sm:text-3xl font-black text-violet-600 mt-1">{savedJobIds.length}</p>
            <p className="text-xs text-slate-500 mt-1">Bookmarked positions</p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-4 sm:gap-8">
          <button
            onClick={() => setActiveTab("applied")}
            className={`pb-3 text-sm sm:text-base font-extrabold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "applied"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Applied Roles ({appliedJobs.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 text-sm sm:text-base font-extrabold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "saved"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Saved Wishlist ({savedJobIds.length})
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 text-sm sm:text-base font-extrabold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "settings"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
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
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center">
                <p className="text-slate-600 font-medium">You haven't submitted any applications yet.</p>
                <button
                  onClick={() => setCurrentView("jobs")}
                  className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm"
                >
                  Find Jobs to Apply
                </button>
              </div>
            ) : (
              appliedJobsList.map((app) => (
                <div
                  key={app.jobId}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1">
                      <img
                        src={app.jobInfo.companyLogo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80"}
                        alt={app.jobInfo.company}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3
                        onClick={() => openJobDetails(app.jobInfo)}
                        className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition"
                      >
                        {app.jobInfo.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {app.jobInfo.company} • {app.jobInfo.location}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Applied {app.appliedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>

                    <button
                      onClick={() => openJobDetails(app.jobInfo)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      View Details
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
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center">
                <p className="text-slate-600 font-medium">No saved jobs found in your wishlist.</p>
                <button
                  onClick={() => setCurrentView("jobs")}
                  className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm"
                >
                  Browse Jobs
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
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs max-w-3xl">
            <h2 className="text-xl font-black text-slate-900 mb-6">Edit Candidate Profile</h2>

            <form onSubmit={handleProfileSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Portfolio or GitHub URL</label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Candidate Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("applied")}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

import { useState } from "react";
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Crown,
  Sparkles 
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, loginUser, addToast } = useJobs();

  const [mode, setMode] = useState(authMode || "login");
  const [role, setRole] = useState("Job Seeker");
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (mode === "signup" && !name)) {
      addToast("Please provide all required credentials", "error");
      return;
    }

    const userData = {
      name: mode === "signup" ? name : (name || "Bademala Nikhil"),
      email: email,
      phone: "+91 98765 43210",
      title: "Senior Full Stack / React Developer",
      location: "Hyderabad / Bangalore, India",
      bio: "Passionate developer searching for high-impact software engineering roles.",
      skills: ["React", "JavaScript", "Tailwind CSS", "TypeScript", "Node.js"],
      resumeName: "Bademala_Nikhil_Resume.pdf",
      portfolioUrl: "https://github.com/bademalanikhil",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: role
    };

    loginUser(userData);
  };

  const handleDemoCandidateLogin = () => {
    const demoUser = {
      name: "Bademala Nikhil",
      email: "nikhil@hirehub.dev",
      phone: "+91 98765 43210",
      title: "Frontend Engineer / React Developer",
      location: "Hyderabad / Bangalore, India",
      bio: "Passionate frontend developer crafting responsive, pixel-perfect web applications with React, Tailwind CSS, and modern architectures.",
      skills: ["React", "JavaScript", "Tailwind CSS", "TypeScript", "Node.js", "Git", "REST APIs"],
      resumeName: "Bademala_Nikhil_Resume.pdf",
      portfolioUrl: "https://github.com/bademalanikhil",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "Job Seeker"
    };

    loginUser(demoUser);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-6 animate-in fade-in duration-200">
      
      <div 
        className="bg-slate-900 rounded-3xl shadow-2xl border border-amber-500/30 max-w-md w-full overflow-hidden transform animate-in zoom-in-95 duration-200 text-slate-100 gold-glow"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 font-bold">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-white text-lg">HireHub Elite Access</span>
              <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Executive Portal</p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Body */}
        <div className="p-6 sm:p-8">
          
          {/* Mode Switch Tabs */}
          <div className="flex p-1 bg-slate-950 rounded-2xl mb-6 border border-white/10">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mode === "login"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mode === "signup"
                  ? "bg-amber-400 text-slate-950 shadow-md font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Request Access
            </button>
          </div>

          {/* Quick Demo Login Pill */}
          <div className="mb-6 p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between">
            <div className="text-xs">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Demo Executive:
              </p>
              <p className="text-amber-300/80 text-[11px]">Bademala Nikhil</p>
            </div>
            <button
              type="button"
              onClick={handleDemoCandidateLogin}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-xs font-black shadow-sm"
            >
              One-Click
            </button>
          </div>

          {/* Role selector if Signup */}
          {mode === "signup" && (
            <div className="mb-5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                Designated Membership:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("Job Seeker")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    role === "Job Seeker"
                      ? "bg-amber-400/15 border-amber-400 text-amber-300"
                      : "border-white/10 text-slate-400 hover:bg-white/5"
                  }`}
                >
                  Executive Talent
                </button>
                <button
                  type="button"
                  onClick={() => setRole("Employer")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    role === "Employer"
                      ? "bg-amber-400/15 border-amber-400 text-amber-300"
                      : "border-white/10 text-slate-400 hover:bg-white/5"
                  }`}
                >
                  Corporate Partner
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === "signup" && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bademala Nikhil"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                Executive Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nikhil@hirehub.dev"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Password
                </label>
                {mode === "login" && (
                  <span className="text-[11px] font-semibold text-amber-400 cursor-pointer hover:underline">
                    Reset key?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2"
            >
              <span>{mode === "login" ? "Access Portal" : "Submit Membership Request"}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}

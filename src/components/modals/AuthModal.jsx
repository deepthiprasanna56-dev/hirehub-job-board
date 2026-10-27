import { useEffect, useState } from "react";
import { Apple, ArrowLeft, ArrowRight, GitBranch, Hexagon, Lock, Mail, Sparkles, User, X } from "lucide-react";
import { useJobs } from "../../context/JobContext";

function GoogleMark() {
  return (
    <span className="bg-gradient-to-br from-[#4285f4] via-[#34a853] to-[#fbbc05] bg-clip-text text-xl font-black text-transparent" aria-hidden="true">
      G
    </span>
  );
}

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, loginUser, addToast } = useJobs();
  const [mode, setMode] = useState(authMode || "login");
  const [role, setRole] = useState("Job Seeker");
  const [passwordStep, setPasswordStep] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isAuthModalOpen) return;
    setMode(authMode || "login");
    setPasswordStep(false);
    setName("");
    setEmail("");
    setPassword("");
    setRole("Job Seeker");
  }, [authMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (event) => {
    event?.preventDefault();

    if (mode === "login" && !passwordStep) {
      if (!email) {
        addToast("Enter your email address to continue", "error");
        return;
      }
      setPasswordStep(true);
      return;
    }

    if (!email || !password || (mode === "signup" && !name.trim())) {
      addToast("Please provide all required details", "error");
      return;
    }

    const displayName = mode === "signup" ? name.trim() : (name.trim() || email.split("@")[0]);
    loginUser({
      name: displayName,
      email,
      phone: "+1 (415) 555-0101",
      title: "Software Engineer",
      location: "Remote",
      bio: "Building thoughtful products and looking for the next great opportunity.",
      skills: ["React", "JavaScript", "Tailwind CSS", "TypeScript", "Node.js"],
      resumeName: "My_Resume.pdf",
      portfolioUrl: "",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role,
    });
  };

  const handleDemoLogin = () => {
    loginUser({
      name: "Bademala Nikhil",
      email: "nikhil@hirehub.dev",
      phone: "+91 98765 43210",
      title: "Frontend Engineer / React Developer",
      location: "Hyderabad / Bangalore, India",
      bio: "Frontend developer crafting responsive, pixel-perfect applications with React and modern web tools.",
      skills: ["React", "JavaScript", "Tailwind CSS", "TypeScript", "Node.js", "Git", "REST APIs"],
      resumeName: "Bademala_Nikhil_Resume.pdf",
      portfolioUrl: "https://github.com/bademalanikhil",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "Job Seeker",
    });
  };

  const notifyProviderUnavailable = (provider) => {
    addToast(`${provider} sign-in is not connected yet. Use email to continue.`, "info");
  };

  const isEmailStep = mode === "login" && !passwordStep;

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-full items-center justify-center overflow-y-auto bg-[#09142f] p-4 sm:p-8"
      onClick={closeAuthModal}
      role="presentation"
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="hirehub-hex-grid" width="76" height="66" patternUnits="userSpaceOnUse">
            <path d="M19 1h38l18 32-18 32H19L1 33z" fill="none" stroke="#7196dc" strokeOpacity=".12" />
          </pattern>
          <radialGradient id="hirehub-login-glow">
            <stop offset="0" stopColor="#2563eb" stopOpacity=".28" />
            <stop offset="1" stopColor="#09142f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hirehub-hex-grid)" />
        <ellipse cx="50%" cy="48%" rx="48%" ry="58%" fill="url(#hirehub-login-glow)" />
      </svg>

      <div className="pointer-events-none absolute left-[max(20px,calc(50%-250px))] top-[max(24px,calc(50%-240px))] h-8 w-8 -rotate-45 border-l-2 border-t-2 border-blue-200/80" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[max(24px,calc(50%-240px))] right-[max(20px,calc(50%-250px))] h-8 w-8 -rotate-45 border-b-2 border-r-2 border-blue-300/70" aria-hidden="true" />

      <section
        className="relative z-10 my-auto w-full max-w-md rounded-[30px] border border-slate-400/30 bg-[#0b1531]/95 shadow-[0_28px_100px_rgba(0,0,0,.5)] ring-1 ring-blue-300/10 backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          aria-label="Close sign in"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-6 py-8 sm:px-9 sm:py-10">
          <div className="mb-6 flex items-center justify-center gap-2.5">
            <Hexagon className="h-6 w-6 fill-blue-400 text-blue-400" aria-hidden="true" />
            <span className="text-lg font-black tracking-[0.12em] text-white">HIREHUB</span>
          </div>

          <div className="mb-7 text-center">
            <h2 id="auth-title" className="text-3xl font-black tracking-tight text-white">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {mode === "signup" ? "Create a profile and find your next opportunity." : "Sign in to discover jobs picked for you."}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-3">
            <button type="button" onClick={() => notifyProviderUnavailable("Google")} aria-label="Continue with Google" title="Continue with Google" className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-[#111d3d] transition hover:border-blue-300/50 hover:bg-[#152449]">
              <GoogleMark />
            </button>
            <button type="button" onClick={() => notifyProviderUnavailable("Apple")} aria-label="Continue with Apple" title="Continue with Apple" className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-[#111d3d] text-white transition hover:border-blue-300/50 hover:bg-[#152449]">
              <Apple className="h-6 w-6 fill-current" />
            </button>
            <button type="button" onClick={() => notifyProviderUnavailable("GitHub")} aria-label="Continue with GitHub" title="Continue with GitHub" className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-[#111d3d] text-white transition hover:border-blue-300/50 hover:bg-[#152449]">
              <GitBranch className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <span className="h-px flex-1 bg-white/10" />
            <span>or continue with email</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {mode === "login" && !passwordStep && (
            <form onSubmit={handleSubmit} className="mb-5 flex rounded-2xl border border-white/10 bg-[#111d3d] p-1.5 transition focus-within:border-blue-300/60 focus-within:ring-2 focus-within:ring-blue-400/10">
              <Mail className="ml-3 my-auto h-5 w-5 shrink-0 text-blue-300" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm font-semibold text-white outline-none placeholder:text-slate-400"
              />
              <button type="submit" aria-label="Continue with email" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:scale-105 hover:bg-blue-100">
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">Full name</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111d3d] px-4 transition focus-within:border-blue-300/60 focus-within:ring-2 focus-within:ring-blue-400/10">
                    <User className="h-4 w-4 shrink-0 text-blue-300" />
                    <input type="text" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500" />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">I’m joining as</span>
                  <select value={role} onChange={(event) => setRole(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111d3d] px-4 py-3.5 text-sm text-white outline-none focus:border-blue-300/60">
                    <option className="bg-slate-900">Job Seeker</option>
                    <option className="bg-slate-900">Employer</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">Email address</span>
                  <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111d3d] px-4 transition focus-within:border-blue-300/60 focus-within:ring-2 focus-within:ring-blue-400/10">
                    <Mail className="h-4 w-4 shrink-0 text-blue-300" />
                    <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500" />
                  </span>
                </label>
              </>
            )}

            {passwordStep && mode === "login" && (
              <>
                <div className="flex items-center justify-between rounded-xl bg-blue-400/5 px-3 py-2.5 text-sm text-slate-300">
                  <span className="truncate">{email}</span>
                  <button type="button" onClick={() => setPasswordStep(false)} className="ml-3 shrink-0 font-semibold text-blue-300 hover:text-blue-200">Change</button>
                </div>
              </>
            )}

            {(mode === "signup" || passwordStep) && (
              <label className="block">
                <span className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>Password</span>
                  {mode === "login" && <button type="button" onClick={() => addToast("Password reset is not connected yet.", "info")} className="font-medium text-blue-300 hover:text-blue-200">Forgot password?</button>}
                </span>
                <span className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111d3d] px-4 transition focus-within:border-blue-300/60 focus-within:ring-2 focus-within:ring-blue-400/10">
                  <Lock className="h-4 w-4 shrink-0 text-blue-300" />
                  <input type={showPassword ? "text" : "password"} required autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-xs font-semibold text-slate-400 hover:text-white">{showPassword ? "Hide" : "Show"}</button>
                </span>
              </label>
            )}

            {(mode === "signup" || passwordStep) && (
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-[#0b1531]">
                <span>{mode === "signup" ? "Create account" : "Sign in"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </form>

          {isEmailStep && (
            <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
              <span>New to HireHub?</span>
              <button type="button" onClick={() => { setMode("signup"); setPasswordStep(false); }} className="font-semibold text-blue-300 hover:text-blue-200">Create an account</button>
            </div>
          )}

          {passwordStep && mode === "login" && (
            <button type="button" onClick={() => setPasswordStep(false)} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to email
            </button>
          )}

          {mode === "signup" && (
            <p className="mt-4 text-center text-xs text-slate-400">
              Already have an account? <button type="button" onClick={() => { setMode("login"); setPasswordStep(false); }} className="font-semibold text-blue-300 hover:text-blue-200">Sign in</button>
            </p>
          )}

          <div className="mt-7 border-t border-white/10 pt-5 text-center">
            <p className="text-[11px] leading-relaxed text-slate-400">
              By continuing, you agree to HireHub’s <span className="font-semibold text-slate-200">Terms of Service</span> and <span className="font-semibold text-slate-200">Privacy Policy</span>.
            </p>
            <button type="button" onClick={handleDemoLogin} className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 transition hover:text-blue-300">
              <Sparkles className="h-3.5 w-3.5" /> Try the demo profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

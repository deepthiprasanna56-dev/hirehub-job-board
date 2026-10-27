import { useState } from "react";
import { 
  Briefcase, 
  Bookmark, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ChevronDown, 
  Building2, 
  Home, 
  Info, 
  CheckCircle2,
  Crown,
  Sparkles
} from "lucide-react";
import { useJobs } from "../../context/JobContext";

export default function Navbar() {
  const { 
    currentView, 
    setCurrentView, 
    savedJobIds, 
    appliedJobs, 
    user, 
    logoutUser, 
    openAuthModal 
  } = useJobs();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "jobs", label: "Explore Careers", icon: Briefcase },
    { id: "companies", label: "Elite Partners", icon: Building2 },
    { id: "about", label: "About", icon: Info },
  ];

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-2xl border-b border-white/10 transition-all duration-200">
      <div className="w-full px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Luxury Crest */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform border border-amber-300/40">
              <Crown className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-display">
                  HIREHUB <span className="text-gold-gradient">ELITE</span>
                </span>
                <span className="hidden sm:inline-flex text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  PRIVATE PLACEMENT
                </span>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 block -mt-0.5">
                Executive & Tech Retainers
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-amber-300 bg-amber-500/10 border border-amber-500/20 shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Saved Jobs Icon Button */}
            <button
              onClick={() => handleNavClick("saved")}
              title="Saved Wishlist"
              className={`relative p-2.5 rounded-xl border transition-all ${
                currentView === "saved"
                  ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
                  : "bg-slate-900/80 text-slate-400 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              <Bookmark className="w-5 h-5" />
              {savedJobIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-amber-200 shadow-sm">
                  {savedJobIds.length}
                </span>
              )}
            </button>

            {/* Candidate Profile or Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3.5 rounded-full border border-amber-500/30 bg-slate-900/90 hover:bg-slate-800 transition shadow-lg hover:border-amber-400/60"
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-400/50"
                    />
                    <Sparkles className="w-3 h-3 text-amber-400 absolute -top-1 -right-1" />
                  </div>
                  <div className="text-left text-xs leading-tight">
                    <p className="font-bold text-white line-clamp-1">{user.name}</p>
                    <p className="text-[10px] text-amber-300/90 font-medium">Verified Talent</p>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-slate-900 rounded-2xl shadow-2xl border border-amber-500/20 py-2 z-50 backdrop-blur-2xl">
                    <div className="px-4 py-2.5 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                        <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      </div>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => handleNavClick("dashboard")}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2.5 font-medium transition"
                    >
                      <User className="w-4 h-4 text-amber-400/80" />
                      Executive Dashboard
                      {appliedJobs.length > 0 && (
                        <span className="ml-auto bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                          {appliedJobs.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => handleNavClick("saved")}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2.5 font-medium transition"
                    >
                      <Bookmark className="w-4 h-4 text-amber-400/80" />
                      Saved Wishlist
                      <span className="ml-auto bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full font-semibold border border-white/5">
                        {savedJobIds.length}
                      </span>
                    </button>

                    <div className="border-t border-white/10 my-1"></div>

                    <button
                      onClick={() => {
                        logoutUser();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 flex items-center gap-2.5 font-medium transition"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => openAuthModal("login")}
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="px-5 py-2 text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5"
                >
                  Join Elite
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => handleNavClick("saved")}
              className="p-2 rounded-lg text-slate-300 hover:bg-white/5 relative"
              aria-label="Saved jobs"
            >
              <Bookmark className="w-5 h-5" />
              {savedJobIds.length > 0 && (
                <span className="absolute 0 top-1 right-1 bg-amber-400 text-slate-950 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                  {savedJobIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-white/5 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950 px-4 pt-3 pb-6 shadow-2xl">
          <div className="flex flex-col gap-1 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold transition ${
                    isActive
                      ? "text-amber-300 bg-amber-500/10 font-bold border border-amber-500/20"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                  {item.label}
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick("saved")}
              className={`flex items-center justify-between px-3 py-3 rounded-xl text-base font-semibold transition ${
                currentView === "saved"
                  ? "text-amber-300 bg-amber-500/10 font-bold border border-amber-500/20"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-slate-400" />
                Saved Wishlist
              </div>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                {savedJobIds.length}
              </span>
            </button>

            {user && (
              <button
                onClick={() => handleNavClick("dashboard")}
                className={`flex items-center justify-between px-3 py-3 rounded-xl text-base font-semibold transition ${
                  currentView === "dashboard"
                    ? "text-amber-300 bg-amber-500/10 font-bold border border-amber-500/20"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  Candidate Dashboard
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  {appliedJobs.length} Applied
                </span>
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-white/10">
            {user ? (
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400/50" />
                  <div>
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg text-sm font-semibold"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("login");
                  }}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-white font-bold text-sm hover:bg-white/5"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("signup");
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-sm shadow-md"
                >
                  Join Elite
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

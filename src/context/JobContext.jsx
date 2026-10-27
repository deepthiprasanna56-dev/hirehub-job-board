import { useState, useEffect, useRef, useCallback } from "react";
import { jobsData } from "../data/jobsData";
import { JobContext } from "./jobContextDef";

const initialFilters = {
  category: "All",
  jobType: [],
  experience: [],
  locationType: [],
  minSalary: 0,
  urgentOnly: false
};

export function JobProvider({ children }) {
  // Navigation View
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'jobs' | 'companies' | 'about' | 'dashboard' | 'saved'

  // Search Bar Filter State
  const [searchQuery, setSearchQuery] = useState({
    keyword: "",
    location: "",
    category: "All"
  });

  // Detailed Filter Sidebar State
  const [filters, setFilters] = useState(initialFilters);

  // Saved / Wishlist Jobs
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const saved = localStorage.getItem("hirehub_saved_jobs");
      return saved ? JSON.parse(saved) : ["job-1", "job-2"];
    } catch {
      return ["job-1", "job-2"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("hirehub_saved_jobs", JSON.stringify(savedJobIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedJobIds]);

  // Applied Jobs Tracking
  const [appliedJobs, setAppliedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem("hirehub_applied_jobs");
      return saved
        ? JSON.parse(saved)
        : [
            {
              jobId: "job-1",
              appliedAt: "2 days ago",
              status: "Under Review",
              name: "Deepthi Assistant",
              email: "deepthi@hirehub.dev",
              phone: "+1 (415) 555-0101",
              portfolio: "https://github.com/microsoft/copilot",
              coverNote: "Excited about modern frontend systems and high-throughput UI design."
            }
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("hirehub_applied_jobs", JSON.stringify(appliedJobs));
    } catch (e) {
      console.error(e);
    }
  }, [appliedJobs]);

  // User Auth State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("hirehub_user");
      return savedUser
        ? JSON.parse(savedUser)
        : {
            name: "Deepthi Assistant",
            email: "deepthi@hirehub.dev",
            phone: "+1 (415) 555-0101",
            title: "Frontend Engineer / React Developer",
            location: "Seattle / Remote, USA",
            bio: "Passionate frontend developer crafting responsive, pixel-perfect web applications with React, Tailwind CSS, and Vite.",
            skills: ["React", "JavaScript", "Tailwind CSS", "TypeScript", "Node.js", "Git", "REST APIs"],
            resumeName: "Copilot_Assistant_Resume.pdf",
            portfolioUrl: "https://github.com/microsoft/copilot",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            role: "Job Seeker"
          };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("hirehub_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("hirehub_user");
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Modals state
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'signup'

  // Toast System
  const [toasts, setToasts] = useState([]);
  const toastCountRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = "success") => {
    toastCountRef.current += 1;
    const id = `toast-${toastCountRef.current}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  }, [removeToast]);

  // Toggle Save Job
  const toggleSaveJob = useCallback((jobId) => {
    setSavedJobIds((prev) => {
      const isSaved = prev.includes(jobId);
      if (isSaved) {
        addToast("Job removed from saved list", "info");
        return prev.filter((id) => id !== jobId);
      } else {
        addToast("Job saved to your wishlist!", "success");
        return [...prev, jobId];
      }
    });
  }, [addToast]);

  // Submit Application
  const applyToJob = useCallback((jobId, applicationDetails) => {
    const alreadyApplied = appliedJobs.some((app) => app.jobId === jobId);
    if (alreadyApplied) {
      addToast("You have already applied for this job!", "info");
      return false;
    }

    const newApp = {
      jobId,
      appliedAt: "Just now",
      status: "Applied",
      ...applicationDetails
    };

    setAppliedJobs((prev) => [newApp, ...prev]);
    addToast("Application submitted successfully! Check your Dashboard.", "success");
    return true;
  }, [appliedJobs, addToast]);

  // Open & Close Modals
  const openJobDetails = useCallback((job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  }, []);

  const closeJobDetails = useCallback(() => {
    setIsDetailsModalOpen(false);
  }, []);

  const openApplyModal = useCallback((job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  }, []);

  const closeApplyModal = useCallback(() => {
    setIsApplyModalOpen(false);
  }, []);

  const openAuthModal = useCallback((mode = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const loginUser = useCallback((userData) => {
    setUser(userData);
    addToast(`Welcome back, ${userData.name}!`, "success");
    closeAuthModal();
  }, [addToast, closeAuthModal]);

  const logoutUser = useCallback(() => {
    setUser(null);
    addToast("You have been signed out.", "info");
  }, [addToast]);

  const updateProfile = useCallback((updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    addToast("Profile updated successfully!", "success");
  }, [addToast]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchQuery({ keyword: "", location: "", category: "All" });
    addToast("Filters have been reset.", "info");
  }, [addToast]);

  // Quick helper to navigate to jobs with category pre-selected
  const filterByCategory = useCallback((categoryName) => {
    setFilters((prev) => ({ ...prev, category: categoryName }));
    setSearchQuery((prev) => ({ ...prev, category: categoryName }));
    setCurrentView("jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <JobContext.Provider
      value={{
        jobs: jobsData,
        currentView,
        setCurrentView,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        resetFilters,
        filterByCategory,
        savedJobIds,
        toggleSaveJob,
        appliedJobs,
        applyToJob,
        selectedJob,
        setSelectedJob,
        isDetailsModalOpen,
        openJobDetails,
        closeJobDetails,
        isApplyModalOpen,
        openApplyModal,
        closeApplyModal,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        user,
        loginUser,
        logoutUser,
        updateProfile,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export { useJobs } from "./useJobs";

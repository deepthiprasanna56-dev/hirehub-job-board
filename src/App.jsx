import { JobProvider, useJobs } from "./context/JobContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/home/HeroSection";
import JobCategories from "./components/home/JobCategories";
import FeaturedJobs from "./components/home/FeaturedJobs";
import PopularCompanies from "./components/home/PopularCompanies";
import JobsListingPage from "./components/jobs/JobsListingPage";
import CompaniesPage from "./components/companies/CompaniesPage";
import AboutPage from "./components/about/AboutPage";
import CandidateDashboard from "./components/dashboard/CandidateDashboard";
import SavedJobsPage from "./components/dashboard/SavedJobsPage";
import JobDetailsModal from "./components/modals/JobDetailsModal";
import ApplyModal from "./components/modals/ApplyModal";
import AuthModal from "./components/modals/AuthModal";
import Toast from "./components/common/Toast";

function MainContent() {
  const { currentView } = useJobs();

  return (
    <main className="flex-1">
      {currentView === "home" && (
        <>
          <HeroSection />
          <JobCategories />
          <FeaturedJobs />
          <PopularCompanies />
        </>
      )}

      {currentView === "jobs" && <JobsListingPage />}

      {currentView === "companies" && <CompaniesPage />}

      {currentView === "about" && <AboutPage />}

      {currentView === "saved" && <SavedJobsPage />}

      {currentView === "dashboard" && <CandidateDashboard />}
    </main>
  );
}

export default function App() {
  return (
    <JobProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        <MainContent />
        <Footer />

        {/* Global Overlays & Modals */}
        <JobDetailsModal />
        <ApplyModal />
        <AuthModal />
        <Toast />
      </div>
    </JobProvider>
  );
}

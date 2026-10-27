# 🚀 HireHub — Modern Responsive Job Board Website

A modern, fast, and feature-rich Job Board web application built using **React**, **Vite**, and **Tailwind CSS**. Designed with an intuitive, human-centered UI/UX, responsive across all screen breakpoints (320px, 768px, 1024px, 1440px+).

Developed for **Bademala Nikhil Nikhil** (Frontend Task).

---

## 🌟 Key Features

### 1. 🏠 Modern Landing Page
- **Hero Section**:
  - Keyword/role search input
  - Location search input
  - Quick-search tags (`React`, `Remote`, `UI/UX`, `Python`, etc.)
  - Real-time impact metrics (15k+ jobs, 850+ companies, 98% placement rate)
  - Animated glowing background with micro-interactions
- **Job Categories Section**:
  - In-demand sectors: **Software Development**, **Data Science**, **UI/UX Design**, **Marketing**, **Finance**, **Human Resources**, **Product Management**, **Cybersecurity & DevOps**
  - Interactive cards with dynamic counts and instant category filter navigation
- **Featured Jobs Section**:
  - Filter tabs: *All Featured*, *Software & Tech*, *Design & Creative*, *100% Remote*, *Urgently Hiring*
  - Comprehensive job cards with title, company, logo, location badge, job type, experience, salary, urgent/featured badges, and bookmark toggle
- **Popular Companies Section**:
  - Highlighting verified companies (*TechFlow*, *InnovateStudio*, *DataStride*, *FinPulse*, etc.) with company ratings, perks, and direct role links

### 2. 🔍 Advanced Job Search & Multi-Filter Engine
- **Live Search Bar**: Search by keyword, title, skills, company, or location.
- **Sidebar Filter System**:
  - Workplace Model: Remote, Hybrid, On-site
  - Employment Type: Full-time, Part-time, Contract, Internship
  - Experience Level: Entry Level, Mid Level, Senior Level, Lead / Executive
  - Category selector
  - Salary Range expectation slider
  - Urgently hiring toggle
- **Layout Switcher**: Toggle between responsive Grid View and dense List View.
- **Sorting**: Latest first, Highest Salary, Urgent roles first.
- **Active Filter Chips**: Instant dismissible badges for active criteria with "Clear All" reset.

### 3. 📄 Detailed Job Modal & Information View
- Complete role overview, responsibilities, requirements checklist, technical skills badges, company perks, deadline, and salary ranges.
- One-click share functionality (copies link to clipboard with confirmation toast).

### 4. 📝 Interactive Application Modal
- Pre-filled candidate details (customizable).
- Resume / CV upload dropzone (supports drag & drop / file selection).
- Cover note textarea and instant validation.
- Real-time simulated application submission with animated loading spinner and success confirmation screen.

### 5. 💖 Saved Jobs / Wishlist UI
- Save or unsave any job from anywhere with persistent `localStorage` storage.
- Real-time badge counter on the Navbar.
- Dedicated Wishlist view with quick apply and remove actions.

### 6. 👤 Candidate Profile & Dashboard
- Full Candidate Overview (Bademala Nikhil):
  - Profile card with avatar, role, contact info, bio, skills tags, and resume attachment.
  - Profile edit settings with live persistence.
- Application Tracking:
  - Tracks all applied jobs with status badges: `Applied`, `Under Review`, `Interview Scheduled`, `Offer Extended`.
  - Date applied timestamp and direct details preview.

### 7. 🏢 Verified Companies Directory
- Search companies by name or industry.
- Filter by industry pills (Cloud & AI, Fintech, Design, Cybersecurity, HealthTech, HR Tech).
- Employee counts, ratings, and open position counts.

### 8. ℹ️ About Us & FAQ Accordion
- Platform mission, quality assurance, salary transparency, and global mobility values.
- Collapsible interactive FAQ answering top candidate questions.

### 9. 🔔 Toast Notification System
- Floating notification alerts for actions: save/unsave jobs, submit application, profile updates, and filter resets.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React Context API (`JobProvider`, `useJobs`) with persistent `localStorage` for Saved and Applied jobs.
- **Clean Folder Structure**:
  ```
  hirehub-job-board/
  ├── public/
  │   └── favicon.svg
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   │   ├── about/
  │   │   │   └── AboutPage.jsx
  │   │   ├── common/
  │   │   │   └── Toast.jsx
  │   │   ├── companies/
  │   │   │   └── CompaniesPage.jsx
  │   │   ├── dashboard/
  │   │   │   ├── CandidateDashboard.jsx
  │   │   │   └── SavedJobsPage.jsx
  │   │   ├── home/
  │   │   │   ├── FeaturedJobs.jsx
  │   │   │   ├── HeroSection.jsx
  │   │   │   ├── JobCategories.jsx
  │   │   │   └── PopularCompanies.jsx
  │   │   ├── jobs/
  │   │   │   ├── JobCard.jsx
  │   │   │   ├── JobFilters.jsx
  │   │   │   └── JobsListingPage.jsx
  │   │   ├── layout/
  │   │   │   ├── Footer.jsx
  │   │   │   └── Navbar.jsx
  │   │   └── modals/
  │   │       ├── ApplyModal.jsx
  │   │       ├── AuthModal.jsx
  │   │       └── JobDetailsModal.jsx
  │   ├── context/
  │   │   ├── jobContextDef.js
  │   │   ├── JobContext.jsx
  │   │   └── useJobs.js
  │   ├── data/
  │   │   ├── categoriesData.js
  │   │   ├── companiesData.js
  │   │   └── jobsData.js
  │   ├── App.jsx
  │   ├── index.css
  │   └── main.jsx
  ├── index.html
  ├── vite.config.js
  └── package.json
  ```

---

## 💻 Getting Started Locally

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd hirehub-job-board
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended):
1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/<your-username>/hirehub-job-board.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** and import the `hirehub-job-board` repository.
4. Framework preset will automatically be detected as **Vite**.
5. Click **"Deploy"**. Your live URL will be ready in under a minute!

### Deploy to Netlify:
1. Push this repository to GitHub.
2. Go to [netlify.com](https://netlify.com) and log in.
3. Click **"Add new site" > "Import an existing project"** from GitHub.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **"Deploy site"**.

---

## 👨‍💻 Candidate / Developer
- **Name**: Bademala Nikhil Nikhil
- **Project**: Frontend Task – Job Board Website

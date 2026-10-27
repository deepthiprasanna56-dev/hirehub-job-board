# HireHub Elite

HireHub Elite is a premium executive job board built with React and Vite. It is designed for high-level professionals seeking senior, leadership, and specialized roles across technology, design, product, marketing, finance, and operations. The interface combines a polished luxury aesthetic with an intuitive hiring experience, making it easy to browse opportunities, compare companies, save roles, and track applications.

---

## Overview

This project is a modern, responsive job board with:

- A premium landing page for high-value job discovery
- Role and location-based search filters
- Company and job listings with rich details
- Saved jobs functionality
- Application tracking dashboard
- About page and FAQ section
- Authentication and demo login flow
- Responsive design optimized for desktop, tablet, and mobile

The application is structured around a React context-based state system and uses localStorage to persist saved jobs, applied jobs, and user profile data.

---

## Features

### Executive-style landing experience
- Hero section with strong branding and professional messaging
- Search for jobs by keyword and location
- Quick filter chips for common job types and specialties
- Featured roles and popular companies sections

### Advanced filtering and job discovery
- Filter by remote, hybrid, or on-site roles
- Filter by employment type and experience level
- Sort jobs by relevance and salary
- Toggle urgent openings and clear active filters easily

### Job detail and application flow
- Detailed modal for each role with responsibilities and requirements
- Candidate application form with resume upload support
- Cover note field and submission feedback
- Toast notifications for user actions

### User dashboard and job tracking
- Saved jobs list
- Applied jobs tracking with status updates
- Candidate profile management
- Resume and portfolio metadata display

### Brand and content sections
- About page highlighting product mission and value proposition
- FAQ accordion for common user questions
- Premium, modern UI styling with gold-accented luxury branding

---

## Tech Stack

- React 19
- Vite
- JavaScript
- Tailwind CSS
- Lucide React icons
- Local storage persistence

---

## Project Structure

```bash
hirehub-job-board/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── about/
│   │   ├── common/
│   │   ├── companies/
│   │   ├── dashboard/
│   │   ├── home/
│   │   ├── jobs/
│   │   ├── layout/
│   │   └── modals/
│   ├── context/
│   ├── data/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── public/
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app locally

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

---

## Deployment

### Vercel
1. Push the repo to GitHub
2. Import the project in Vercel
3. Select the Vite framework preset
4. Deploy

### Netlify
1. Push the project to GitHub
2. Import it into Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`
5. Deploy

---

## Notes

This project is designed as a frontend showcase and can be extended with real backend APIs, authentication services, database integration, and production-grade user data storage.

---

## Developer

- Name: Bademala Nikhil
- Project: HireHub Elite Frontend Job Board

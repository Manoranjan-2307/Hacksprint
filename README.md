# Geo-Vision — Automated Infrastructure Grievance & Triage 🌐⚡

> **Domain:** Digital Governance & Public Welfare Platform  
> **Location Focus:** Coimbatore, Tamil Nadu (Wards 1–100)  
> **Tech Stack:** Computer Vision + Full-Stack Engineering (React 19, Vite, Node.js, Express)  

---

## 🌟 Overview

**Geo-Vision** turns civic grievance reporting into a real-time, verifiable AI governance pipeline. Citizens snap a photo of an infrastructure issue (pothole, water leak, garbage dump, fallen tree, electrical hazard) instead of typing descriptions.

Computer Vision (CV) automatically classifies the issue, validates EXIF GPS metadata, calculates visual damage severity, clusters duplicate nearby reports within a 100m radius into a single master ticket, auto-routes to municipal departments, and enforces a **Signature Resolution Verification Loop** to confirm repairs before closing tickets.

---

## 🏗️ Project Architecture & Folder Structure

```text
Hacksprint/
├── FrontEnd/                   # React 19 Frontend Application
│   ├── src/                    # React Source Code
│   │   ├── assets/             # Brand assets & official logos
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header.jsx      # Top navigation header
│   │   │   ├── Sidebar.jsx     # 72px compact icon sidebar with hover tooltips
│   │   │   ├── PrototypeExplainer.jsx # Interactive 5-step pipeline header banner
│   │   │   ├── InteractiveMap.jsx  # Canvas geo-spatial map & density heatmaps
│   │   │   ├── GradCamViewer.jsx   # Explainable AI (XAI) Grad-CAM heatmap viewer
│   │   │   └── BeforeAfterVerifier.jsx # Side-by-side Before/After verification tool
│   │   ├── pages/              # Portal views by role
│   │   │   ├── Citizen/CitizenDashboard.jsx  # Citizen photo filing & EXIF guard
│   │   │   ├── Officer/OfficerDashboard.jsx  # Field officer dispatch & resolution loop
│   │   │   ├── Governance/AdminDashboard.jsx # Command center, hotspots & leaderboard
│   │   │   └── LoginPage.jsx   # Portal role selector
│   │   ├── utils/              # Core logic & algorithms
│   │   │   ├── cvEngine.js     # CV classifier, depth scorer & perceptual hash
│   │   │   └── mockData.js     # Pre-populated Coimbatore initial dataset
│   │   ├── App.jsx             # App router & global state
│   │   ├── index.css           # Global typography & styles
│   │   └── main.jsx            # Application entry point
│   ├── public/                 # Static assets & favicon
│   ├── index.html              # HTML entry point with Google Fonts & favicon
│   ├── vite.config.js          # Vite bundler configuration
│   ├── vercel.json             # Vercel deployment configuration
│   └── package.json            # Frontend dependencies
├── BackEnd/                    # Express.js REST API Server
│   ├── server.js               # REST API routes & Geo-Vision engine endpoints
│   ├── db.js                   # MySQL database connector module
│   ├── uploads/                # EXIF photo upload storage directory
│   └── package.json            # Backend dependencies
└── README.md                   # Project documentation & deployment guide
```

---

## 🚀 Development & Build Setup

### 1. Install Dependencies & Run Frontend
```bash
cd FrontEnd
npm install
npm run dev
```
Runs the Vite development server on `http://localhost:5173`.

### 2. Install Dependencies & Run Backend Server
```bash
cd BackEnd
npm install
npm start
```
Runs the Express REST API server on `http://localhost:5000`.

### 3. Production Build
```bash
cd FrontEnd
npm run build
```
Generates production build in `FrontEnd/dist/`.

---

## ☁️ Deployment Guide

### Deploying Frontend to Vercel / Netlify
1. Root Directory: `FrontEnd`
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Node Version: `18.x` or higher

### Deploying Backend to Render / Railway
1. Root Directory: `BackEnd`
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Environment Variable: `PORT=5000`

---

## 📄 License
Licensed under the MIT License.

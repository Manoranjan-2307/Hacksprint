# Geo-Vision Mobile — AI-Powered Mobile Infrastructure Grievance App 📱⚡

> **Domain:** Mobile Digital Governance & Public Welfare Application  
> **Location Focus:** Coimbatore Municipal Corporation, Tamil Nadu (Wards 1–100)  
> **Tech Stack:** React Native / Expo Mobile Frontend + Computer Vision Cloud API (YOLOv8, Node.js, Express)  

---

## 🌟 Overview

**Geo-Vision Mobile** is a zero-form, mobile-first civic governance application. Citizens open the mobile app and tap a single camera button to snap an infrastructure issue (potholes, water leaks, garbage dumps, fallen trees, electrical hazards) instead of typing manual descriptions on small smartphone screens.

Cloud Computer Vision (CV) automatically classifies the issue in <10ms, validates native camera EXIF GPS metadata, calculates visual damage severity (0–100), clusters duplicate nearby reports within a 100m radius into a single master ticket, dispatches to the assigned Coimbatore Ward Officer's mobile app, and enforces a **Signature Before/After Resolution Verification Loop** before closing tickets.

---

## 🏗️ Mobile App Architecture & Folder Structure

```text
Hacksprint/
├── FrontEnd/                   # React 19 Mobile Application Prototype
│   ├── src/                    # Mobile App Source Code
│   │   ├── assets/             # Mobile brand assets & official logos
│   │   ├── components/         # Mobile UI components
│   │   │   ├── Header.jsx      # Mobile app header & status bar
│   │   │   ├── Sidebar.jsx     # Compact touch navigation drawer
│   │   │   ├── PrototypeExplainer.jsx # 5-step mobile pipeline banner
│   │   │   ├── InteractiveMap.jsx  # Touch canvas geo-spatial map & density heatmaps
│   │   │   ├── GradCamViewer.jsx   # Mobile Explainable AI (XAI) Grad-CAM heatmap viewer
│   │   │   └── BeforeAfterVerifier.jsx # Mobile side-by-side Before/After verification tool
│   │   ├── pages/              # Mobile App Views by Role
│   │   │   ├── Citizen/CitizenDashboard.jsx  # Mobile camera snap & EXIF guard
│   │   │   ├── Officer/OfficerDashboard.jsx  # Mobile officer dispatch & resolution loop
│   │   │   ├── Governance/AdminDashboard.jsx # Mobile command center, hotspots & leaderboard
│   │   │   └── LoginPage.jsx   # Mobile role switcher
│   │   ├── utils/              # Core mobile logic & algorithms
│   │   │   ├── cvEngine.js     # CV classifier, depth scorer & perceptual hash
│   │   │   └── mockData.js     # Pre-populated Coimbatore initial dataset
│   │   ├── App.jsx             # Mobile App router & state
│   │   ├── index.css           # Mobile typography & styles
│   │   └── main.jsx            # Mobile entry point
│   ├── public/                 # Mobile static assets & favicon
│   ├── index.html              # Mobile HTML entry point
│   ├── vite.config.js          # Vite bundler configuration
│   ├── vercel.json             # Vercel deployment configuration
│   └── package.json            # Mobile app dependencies
├── BackEnd/                    # Cloud AI REST API Server
│   ├── server.js               # REST API routes & Geo-Vision engine endpoints
│   ├── db.js                   # MySQL database connector module
│   ├── uploads/                # EXIF photo upload storage directory
│   └── package.json            # Backend dependencies
└── README.md                   # Mobile App documentation & deployment guide
```

---

## 🚀 Development & Build Setup

### 1. Install Dependencies & Run Mobile App Prototype
```bash
cd FrontEnd
npm install
npm run dev
```
Runs the Vite mobile dev server on `http://localhost:5173`.

### 2. Install Dependencies & Run Backend API Server
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
Generates production mobile build in `FrontEnd/dist/`.

---

## ☁️ Deployment Guide

### Deploying Mobile App Frontend (Vercel)
1. Root Directory: `FrontEnd`
2. Build Command: `npm run build`
3. Output Directory: `dist`

### Deploying Cloud API Server (Render)
1. Root Directory: `BackEnd`
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Environment Variable: `PORT=5000`

---

## 📄 License
Licensed under the MIT License.

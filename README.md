# AskBIT — Intelligent Campus AI Assistant & RAG FAQ Portal 🎓⚡

> **An AI-Powered Campus Information Retrieval & Academic Assistance System for Bannari Amman Institute of Technology (BIT Sathy).**

---

## 🌟 Overview

**AskBIT** is an intelligent Retrieval-Augmented Generation (RAG) campus portal designed to streamline information access for Students, Parents, Faculty, and Administrators. Powered by a FAISS Vector Database, Sentence Transformer embeddings, and a responsive React 19 UI, AskBIT delivers instant, accurate answers to campus queries, academic regulations, examination schedules, hostel rules, and placement guidelines with verified source citations.

---

## ✨ Key Features

### 👨‍🎓 1. Student Assistant Hub
- **AI-Powered Instant FAQ**: Ask questions regarding attendance rules, course registration, exam re-evaluation, and hostel curfews.
- **Handbook Citations**: Every answer includes page-level citations from official academic handbooks and circulars.
- **Query History & Feedback**: Track past AI interactions and provide accuracy ratings.

### 👨‍👩‍👧 2. Parent Information Dashboard
- **Linked Student Overview**: Monitor student academic updates, placement eligibility, and fee deadlines.
- **Parent AI Queries**: Instant access to hostel rules, event On-Duty (OD) procedures, and official notices.

### 👨‍🏫 3. Faculty Portal & Review Suite
- **Low-Confidence Query Queue**: Review unanswered or low-confidence student queries forwarded by the AI engine.
- **Draft & Publish FAQ**: Draft new Q&A pairs and submit them for instant inclusion into the knowledge base.
- **Department Analytics**: Track query trends across AI & Data Science (AD), Information Technology (IT), and Computer Science (CSE).

### 🛡️ 4. Admin Management Control Panel
- **User Roster Control (`/admin2`)**: Create, edit, activate, or disable accounts for Students, Parents, and Faculty with custom Register IDs.
- **RAG & Vector DB Settings (`/admin3_2`)**: Upload dataset CSV/PDF files, adjust similarity thresholds (default: 0.75), and re-index the FAISS Vector Engine.
- **Roster Auto-Deduplication**: Built-in cache cleanup and 1-click **Reset Default Roster** utility.

### 🔒 5. Security & Protected Routing
- **Role-Based Access Control (RBAC)**: `<ProtectedRoute>` prevents unauthorized navigation between role dashboards.
- **Dual Authentication**: Google Firebase SSO (`firebase/auth`) + MySQL DB / Static Role Authentication.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite 6 |
| **Routing & Auth Guard** | React Router v7 (`react-router-dom`) with `<ProtectedRoute>` |
| **UI Components & Icons** | Material UI v6 (`@mui/material`), Bootstrap 5.3, Lucide React |
| **State & Persistence** | React Hooks, Zustand (`zustand`), Browser `localStorage` |
| **Backend Runtime** | Node.js v24, Express.js |
| **Database** | MySQL 8.0 (`mysql2` pooling driver) |
| **AI & Vector Search** | FAISS Vector DB, Sentence Transformers (`all-MiniLM-L6-v2`) |

---

## 📁 Directory Structure

```text
DC/
├── BackEnd/
│   ├── uploads/               # Uploaded circulars & handbooks
│   ├── uploads_pdfs/          # PDF Knowledge Base datasets
│   └── server.js              # Express API server & MySQL connection pool
└── FrontEnd/
    └── D_C/
        ├── src/
        │   ├── components/
        │   │   ├── Sidebar/
        │   │   │   ├── StudentSidebar.jsx
        │   │   │   ├── AdminSidebar.jsx
        │   │   │   ├── FacultySidebar.jsx
        │   │   │   └── ParentSidebar.jsx
        │   │   ├── Header.jsx
        │   │   └── functionality.js
        │   ├── pages/
        │   │   ├── Admin/
        │   │   │   ├── AdminDashboard.jsx
        │   │   │   ├── AdminUserManagement.jsx
        │   │   │   ├── AdminAnalytics.jsx
        │   │   │   ├── AdminQueries.jsx
        │   │   │   └── AdminRagSettings.jsx
        │   │   ├── Student/
        │   │   │   ├── StudentAssistant.jsx
        │   │   │   ├── StudentHistory.jsx
        │   │   │   ├── StudentFeedback.jsx
        │   │   │   └── StudentProfile.jsx
        │   │   ├── Faculty/
        │   │   │   ├── FacultyDashboard.jsx
        │   │   │   ├── FacultyAnalytics.jsx
        │   │   │   ├── FacultyLowConfidence.jsx
        │   │   │   └── FacultySubmitDraft.jsx
        │   │   ├── Parent/
        │   │   │   ├── ParentDashboard.jsx
        │   │   │   ├── ParentHistory.jsx
        │   │   │   ├── ParentFeedback.jsx
        │   │   │   └── ParentProfile.jsx
        │   │   ├── LoginPage.jsx
        │   │   └── firebase.js
        │   ├── App.jsx
        │   └── index.css
        └── package.json
```

---

## 🔑 Default Login Credentials

| Role | Username / Identifier | Password | Default Route |
| :--- | :--- | :--- | :--- |
| **Student (Rahul K)** | `7376242AD267` or `rahul` | `pass` | `/student1_1` |
| **Student (Sanjiv)** | `7376242AD292` or `sanjiv` | `pass` | `/student1_1` |
| **Student (Sujan)** | `7376242IT314` or `sujan` | `pass` | `/student1_1` |
| **Parent (Kanagaraj)** | `kanagaraj` or `parent` | `pass` | `/parent/dashboard` |
| **Faculty (Dr. Arun)** | `FAC001` or `arunkumar` | `pass` | `/faculty/dashboard` |
| **Admin (System Admin)**| `ADM001` or `admin` | `@min` | `/admin1` |

---

## 🚀 Quick Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- MySQL Server (v8.0+)
- npm or yarn

### 2. Frontend Setup
```bash
cd FrontEnd/D_C
npm install
npm run dev
```
Access the application at `http://localhost:5173`.

### 3. Backend Setup
```bash
cd BackEnd
npm install
node server.js
```
The Express backend server runs on `http://localhost:5000`.

---

## 📜 License & Acknowledgments

Developed for the **HACKORBIT** hackathon project submission.

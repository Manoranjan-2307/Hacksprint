import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

// Sidebars
import StudentSidebar from "./components/Sidebar/StudentSidebar";
import AdminSidebar from "./components/Sidebar/AdminSidebar";
import FacultySidebar from "./components/Sidebar/FacultySidebar";
import ParentSidebar from "./components/Sidebar/ParentSidebar";

import Header from "./components/Header";

// Student Pages
import StudentAssistant from "./pages/Student/StudentAssistant";
import StudentHistory from "./pages/Student/StudentHistory";
import StudentFeedback from "./pages/Student/StudentFeedback";
import StudentProfile from "./pages/Student/StudentProfile";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUserManagement from "./pages/Admin/AdminUserManagement";
import AdminAnalytics from "./pages/Admin/AdminAnalytics";
import AdminQueries from "./pages/Admin/AdminQueries";
import AdminRagSettings from "./pages/Admin/AdminRagSettings";

// Faculty Pages
import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
import FacultyAnalytics from "./pages/Faculty/FacultyAnalytics";
import FacultyLowConfidence from "./pages/Faculty/FacultyLowConfidence";
import FacultySubmitDraft from "./pages/Faculty/FacultySubmitDraft";

// Parent Pages
import ParentDashboard from "./pages/Parent/ParentDashboard";
import ParentHistory from "./pages/Parent/ParentHistory";
import ParentFeedback from "./pages/Parent/ParentFeedback";
import ParentProfile from "./pages/Parent/ParentProfile";

// Protected Route Component with Role-Based Access Control
const ProtectedRoute = ({ children, allowedRoles }) => {
  try {
    const storedUserStr = localStorage.getItem("campusiq_user");
    if (!storedUserStr) {
      return <Navigate to="/login" replace />;
    }
    const user = JSON.parse(storedUserStr);
    if (!user || (!user.name && !user.id)) {
      return <Navigate to="/login" replace />;
    }

    // Role-based route protection
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      if (user.role === "Admin") return <Navigate to="/admin1" replace />;
      if (user.role === "Faculty") return <Navigate to="/faculty/dashboard" replace />;
      if (user.role === "Parent") return <Navigate to="/parent/dashboard" replace />;
      return <Navigate to="/student1_1" replace />;
    }

    return children;
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
};

// Route-aware Error Boundary that resets error state automatically on route change
class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("RouteErrorBoundary caught an error:", error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locationKey !== this.props.locationKey && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  handleReset = () => {
    try {
      localStorage.removeItem("campusiq_user_list");
    } catch (e) {}
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "120px 40px 40px 120px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
          <h2 style={{ color: "#0F172A", fontWeight: 800 }}>Page View Reset</h2>
          <p style={{ color: "#64748B", marginBottom: "20px" }}>
            An unexpected error occurred. Click below to clear cache and reload.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: "12px 24px",
              backgroundColor: "#4F46E5",
              color: "#FFF",
              border: "none",
              borderRadius: "12px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(79, 70, 229, 0.3)",
            }}
          >
            Reset Cache & Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppContent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  // Check if session user exists
  const hasUserSession = Boolean(localStorage.getItem("campusiq_user"));

  const sidebarMap = {
    // Student Routes
    "/student1_1": <StudentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student1_2": <StudentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student1_3": <StudentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student1_4": <StudentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,

    // Admin Routes
    "/admin1": <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin2": <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin3": <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin3_1": <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin3_2": <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,

    // Faculty Routes
    "/faculty/dashboard": <FacultySidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/faculty/analytics": <FacultySidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/faculty/queries": <FacultySidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/faculty/draft": <FacultySidebar collapsed={collapsed} setCollapsed={setCollapsed} />,

    // Parent Routes
    "/parent/dashboard": <ParentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/parent/history": <ParentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/parent/feedback": <ParentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/parent/profile": <ParentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
  };

  const showSidebar = hasUserSession && !isLoginPage && sidebarMap[location.pathname];

  return (
    <div className="d-flex">
      {showSidebar}
      <div style={{ flex: 1 }}>
        {!isLoginPage && hasUserSession && <Header collapsed={collapsed} />}
        <RouteErrorBoundary locationKey={location.pathname}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Admin Protected Routes */}
            <Route path="/admin1" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin2" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminUserManagement /></ProtectedRoute>} />
            <Route path="/admin3" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminAnalytics /></ProtectedRoute>} />
            <Route path="/admin3_1" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminQueries /></ProtectedRoute>} />
            <Route path="/admin3_2" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminRagSettings /></ProtectedRoute>} />

            {/* Student Protected Routes */}
            <Route path="/student1_1" element={<ProtectedRoute allowedRoles={["Student", "Admin"]}><StudentAssistant /></ProtectedRoute>} />
            <Route path="/student1_2" element={<ProtectedRoute allowedRoles={["Student", "Admin"]}><StudentHistory /></ProtectedRoute>} />
            <Route path="/student1_3" element={<ProtectedRoute allowedRoles={["Student", "Admin"]}><StudentFeedback /></ProtectedRoute>} />
            <Route path="/student1_4" element={<ProtectedRoute allowedRoles={["Student", "Admin"]}><StudentProfile /></ProtectedRoute>} />

            {/* Faculty Protected Routes */}
            <Route path="/faculty/dashboard" element={<ProtectedRoute allowedRoles={["Faculty", "Admin"]}><FacultyDashboard /></ProtectedRoute>} />
            <Route path="/faculty/analytics" element={<ProtectedRoute allowedRoles={["Faculty", "Admin"]}><FacultyAnalytics /></ProtectedRoute>} />
            <Route path="/faculty/queries" element={<ProtectedRoute allowedRoles={["Faculty", "Admin"]}><FacultyLowConfidence /></ProtectedRoute>} />
            <Route path="/faculty/draft" element={<ProtectedRoute allowedRoles={["Faculty", "Admin"]}><FacultySubmitDraft /></ProtectedRoute>} />

            {/* Parent Protected Routes */}
            <Route path="/parent/dashboard" element={<ProtectedRoute allowedRoles={["Parent", "Admin"]}><ParentDashboard /></ProtectedRoute>} />
            <Route path="/parent/history" element={<ProtectedRoute allowedRoles={["Parent", "Admin"]}><ParentHistory /></ProtectedRoute>} />
            <Route path="/parent/feedback" element={<ProtectedRoute allowedRoles={["Parent", "Admin"]}><ParentFeedback /></ProtectedRoute>} />
            <Route path="/parent/profile" element={<ProtectedRoute allowedRoles={["Parent", "Admin"]}><ParentProfile /></ProtectedRoute>} />

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </RouteErrorBoundary>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
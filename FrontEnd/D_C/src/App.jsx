import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

// Student Sidebars
import S_Sidebar1 from "./components/Sidebar/S_Sidebar1";

// Admin Sidebar
import Admin_Sidebar from './components/Admin_Sidebar';

// Faculty Sidebar
import F1_Sidebar from "./components/Faculty_Sidebar/F1_Sidebar";

// Parent Sidebar
import P_Sidebar from "./components/Parent_Sidebar/P_Sidebar";

import Header from "./components/Header";

// Student Pages
import Student1_1 from "./pages/Students/Student1/Student1_1";
import Student1_2 from "./pages/Students/Student1/Student1_2";
import Student1_3 from "./pages/Students/Student1/Student1_3";
import Student1_4 from "./pages/Students/Student1/Student1_4";

// Admin Pages
import Admin1 from "./pages/Admin/Admin1";
import Admin2 from "./pages/Admin/Admin2";
import Admin3 from "./pages/Admin/Admin3";
import Admin3_1 from "./pages/Admin/Admin3_1";
import Admin3_2 from "./pages/Admin/Admin3_2";

// Faculty Pages
import FacultyDashboard from './pages/Faculty/Faculty1/FacultyDashboard';
import FacultyAnalytics from './pages/Faculty/Faculty1/FacultyAnalytics';
import FacultyLowConfidence from './pages/Faculty/Faculty1/FacultyLowConfidence';
import FacultySubmitDraft from './pages/Faculty/Faculty1/FacultySubmitDraft';

// Parent Pages
import Parent1_1 from "./pages/Parent/Parent1/Parent1_1";
import Parent1_2 from "./pages/Parent/Parent1/Parent1_2";
import Parent1_3 from "./pages/Parent/Parent1/Parent1_3";
import Parent1_4 from "./pages/Parent/Parent1/Parent1_4";

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
    "/student1_1": <S_Sidebar1 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student1_2": <S_Sidebar1 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student1_3": <S_Sidebar1 collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/student1_4": <S_Sidebar1 collapsed={collapsed} setCollapsed={setCollapsed} />,

    // Admin Routes
    "/admin1": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin2": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin3": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin3_1": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/admin3_2": <Admin_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,

    // Faculty Routes
    "/faculty/dashboard": <F1_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/faculty/analytics": <F1_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/faculty/queries": <F1_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/faculty/draft": <F1_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,

    // Parent Routes
    "/parent/dashboard": <P_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/parent/history": <P_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/parent/feedback": <P_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
    "/parent/profile": <P_Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />,
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
            <Route path="/admin1" element={<ProtectedRoute allowedRoles={["Admin"]}><Admin1 /></ProtectedRoute>} />
            <Route path="/admin2" element={<ProtectedRoute allowedRoles={["Admin"]}><Admin2 /></ProtectedRoute>} />
            <Route path="/admin3" element={<ProtectedRoute allowedRoles={["Admin"]}><Admin3 /></ProtectedRoute>} />
            <Route path="/admin3_1" element={<ProtectedRoute allowedRoles={["Admin"]}><Admin3_1 /></ProtectedRoute>} />
            <Route path="/admin3_2" element={<ProtectedRoute allowedRoles={["Admin"]}><Admin3_2 /></ProtectedRoute>} />

            {/* Student Protected Routes */}
            <Route path="/student1_1" element={<ProtectedRoute allowedRoles={["Student", "Admin"]}><Student1_1 /></ProtectedRoute>} />
            <Route path="/student1_2" element={<ProtectedRoute allowedRoles={["Student", "Admin"]}><Student1_2 /></ProtectedRoute>} />
            <Route path="/student1_3" element={<ProtectedRoute allowedRoles={["Student", "Admin"]}><Student1_3 /></ProtectedRoute>} />
            <Route path="/student1_4" element={<ProtectedRoute allowedRoles={["Student", "Admin"]}><Student1_4 /></ProtectedRoute>} />

            {/* Faculty Protected Routes */}
            <Route path="/faculty/dashboard" element={<ProtectedRoute allowedRoles={["Faculty", "Admin"]}><FacultyDashboard /></ProtectedRoute>} />
            <Route path="/faculty/analytics" element={<ProtectedRoute allowedRoles={["Faculty", "Admin"]}><FacultyAnalytics /></ProtectedRoute>} />
            <Route path="/faculty/queries" element={<ProtectedRoute allowedRoles={["Faculty", "Admin"]}><FacultyLowConfidence /></ProtectedRoute>} />
            <Route path="/faculty/draft" element={<ProtectedRoute allowedRoles={["Faculty", "Admin"]}><FacultySubmitDraft /></ProtectedRoute>} />

            {/* Parent Protected Routes */}
            <Route path="/parent/dashboard" element={<ProtectedRoute allowedRoles={["Parent", "Admin"]}><Parent1_1 /></ProtectedRoute>} />
            <Route path="/parent/history" element={<ProtectedRoute allowedRoles={["Parent", "Admin"]}><Parent1_2 /></ProtectedRoute>} />
            <Route path="/parent/feedback" element={<ProtectedRoute allowedRoles={["Parent", "Admin"]}><Parent1_3 /></ProtectedRoute>} />
            <Route path="/parent/profile" element={<ProtectedRoute allowedRoles={["Parent", "Admin"]}><Parent1_4 /></ProtectedRoute>} />

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
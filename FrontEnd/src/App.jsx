import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import PrototypeExplainer from "./components/PrototypeExplainer";
import CitizenDashboard from "./pages/Citizen/CitizenDashboard";
import OfficerDashboard from "./pages/Officer/OfficerDashboard";
import AdminDashboard from "./pages/Governance/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import { INITIAL_TICKETS } from "./utils/mockData";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://hacksprint-lhv6.onrender.com";

export default function App() {
  const [activeView, setActiveView] = useState("default");
  const [pipelineStep, setPipelineStep] = useState(1);

  // Load saved user or default to Citizen in Coimbatore
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("geovision_user");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: "Karthik R. (Citizen)",
      role: "Citizen",
      department: "Public",
      zone: "Coimbatore Zone 2 (Central)",
    };
  });

  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem("geovision_tickets");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cbeOnly = parsed.filter(t => 
            t.location?.address?.includes("Coimbatore") || 
            t.location?.address?.includes("Gandhipuram") ||
            t.location?.address?.includes("Peelamedu") ||
            t.location?.address?.includes("RS Puram") ||
            t.location?.address?.includes("Ukkadam") ||
            t.location?.address?.includes("Saibaba Colony") ||
            t.id?.includes("GV-CBE")
          );
          if (cbeOnly.length > 0) return cbeOnly;
        }
      }
    } catch (e) {}
    return INITIAL_TICKETS;
  });

  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    let intervalId;
    const fetchLiveTickets = () => {
      fetch(`${API_BASE_URL}/api/geovision/tickets`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("API Offline");
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setTickets(data);
            setIsBackendConnected(true);
          }
        })
        .catch(() => {
          setIsBackendConnected(false);
        });
    };

    fetchLiveTickets();
    intervalId = setInterval(fetchLiveTickets, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("geovision_tickets", JSON.stringify(tickets));
    } catch (e) {}
  }, [tickets]);

  const handleNavigate = (view) => {
    setActiveView(view);
    let targetRole = currentUser?.role || "Citizen";
    if (view === "citizen") targetRole = "Citizen";
    else if (view === "officer") targetRole = "Officer";
    else if (["heatmap", "hotspots", "accountability", "settings"].includes(view)) targetRole = "Admin";

    if (targetRole !== currentUser?.role) {
      const updatedUser = {
        ...currentUser,
        role: targetRole,
        name:
          targetRole === "Citizen"
            ? "Karthik R. (Citizen)"
            : targetRole === "Officer"
            ? "Officer Subramaniam V. (Coimbatore)"
            : "Coimbatore Municipal Director",
      };
      setCurrentUser(updatedUser);
      try {
        localStorage.setItem("geovision_user", JSON.stringify(updatedUser));
      } catch (e) {}
    }
  };

  const handleUserRoleChange = (newRole, targetView = null) => {
    const updatedUser = {
      ...currentUser,
      role: newRole,
      name:
        newRole === "Citizen"
          ? "Karthik R. (Citizen)"
          : newRole === "Officer"
          ? "Officer Subramaniam V. (Coimbatore)"
          : "Coimbatore Municipal Director",
    };
    setCurrentUser(updatedUser);
    if (targetView) {
      setActiveView(targetView);
    } else {
      setActiveView("default");
    }
    localStorage.setItem("geovision_user", JSON.stringify(updatedUser));
  };

  const handlePipelineStepSelect = (stepNum) => {
    setPipelineStep(stepNum);
    if (stepNum === 1 || stepNum === 2 || stepNum === 3) {
      setActiveView("citizen");
    } else if (stepNum === 5) {
      setActiveView("officer");
    } else if (stepNum === 4) {
      setActiveView("heatmap");
    }
  };

  const handleTicketCreated = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
    fetch(`${API_BASE_URL}/api/geovision/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    }).catch(() => {});
  };

  const handleTicketUpvoted = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, citizenImpactCount: (t.citizenImpactCount || 1) + 1 }
          : t
      )
    );
    fetch(`${API_BASE_URL}/api/geovision/tickets/${ticketId}/upvote`, { method: "POST" }).catch(() => {});
  };

  const handleResolveTicket = (ticketId, resolveData) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const isVerified = resolveData.verification?.verified;
          return {
            ...t,
            afterImage: resolveData.afterImage,
            resolutionVerification: resolveData.verification,
            status: isVerified ? "Resolved" : "Reopened_Audit",
            resolvedAt: isVerified ? new Date().toISOString() : t.resolvedAt,
            history: [
              ...(t.history || []),
              {
                timestamp: new Date().toISOString(),
                action: isVerified
                  ? `CV Resolution Verified (${resolveData.verification?.visualMatchPercent || 90}% Match)`
                  : "Resolution Verification Failed: Auto-reopened for Audit Review",
                actor: "Geo-Vision CV Verification Loop",
              },
            ],
          };
        }
        return t;
      })
    );

    fetch(`/api/geovision/tickets/${ticketId}/resolve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resolveData),
    }).catch(() => {});
  };

  const currentRole = currentUser?.role || "Citizen";

  const renderCurrentView = () => {
    if (activeView === "citizen") {
      return (
        <CitizenDashboard
          tickets={tickets}
          onTicketCreated={handleTicketCreated}
          onTicketUpvoted={handleTicketUpvoted}
        />
      );
    }

    if (activeView === "officer") {
      return <OfficerDashboard tickets={tickets} onResolveTicket={handleResolveTicket} />;
    }

    if (["heatmap", "hotspots", "accountability", "settings"].includes(activeView)) {
      return <AdminDashboard key={activeView} tickets={tickets} initialTab={activeView} />;
    }

    if (currentRole === "Officer") {
      return <OfficerDashboard tickets={tickets} onResolveTicket={handleResolveTicket} />;
    } else if (currentRole === "Admin") {
      return <AdminDashboard key="admin-default" tickets={tickets} initialTab="heatmap" />;
    } else {
      return (
        <CitizenDashboard
          tickets={tickets}
          onTicketCreated={handleTicketCreated}
          onTicketUpvoted={handleTicketUpvoted}
        />
      );
    }
  };

  return (
    <Router>
      <div className="d-flex min-vh-100 bg-light" style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}>
        {/* Sidebar Navigation */}
        <Sidebar
          activeView={activeView}
          onNavigate={handleNavigate}
          currentUser={currentUser}
          onUserRoleChange={handleUserRoleChange}
        />

        {/* Main Content Area */}
        <div className="flex-grow-1 d-flex flex-column overflow-x-hidden">
          <Header currentUser={currentUser} onUserRoleChange={handleUserRoleChange} />

          {/* Interactive Prototype Explainer Header Banner (Hover info only) */}
          <PrototypeExplainer />

          <main className="flex-grow-1">
            <Routes>
              <Route
                path="/login"
                element={<LoginPage onLoginSuccess={(u) => setCurrentUser(u)} />}
              />

              <Route
                path="*"
                element={renderCurrentView()}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
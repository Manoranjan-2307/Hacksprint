import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const collapsed = true;

  return (
    <div
      className="d-flex flex-column align-items-center vh-100 py-4 px-2"
      style={{
        background: "#FFFFFF",
        width: collapsed ? "100px" : "290px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.3s ease",
        zIndex: 1000,
        borderRight: "1px solid #E2E8F0",
        boxShadow: "4px 0 20px rgba(15, 23, 42, 0.04)",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Top Brand Logo Container */}
      <div className="d-flex align-items-center justify-content-center mb-4">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            boxShadow: "0 4px 14px rgba(139, 92, 246, 0.15)",
            transition: "transform 0.25s ease",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3413/3413535.png"
            alt="AskBIT Parent Logo"
            style={{ width: "30px", height: "30px", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Navigation List */}
      <div className="d-flex flex-column align-items-center justify-content-between flex-grow-1 w-100 pb-3" style={{ marginTop: "15px" }}>
        <ul
          className="nav flex-column align-items-center p-0 w-100"
          style={{ gap: "20px", display: "flex", flexDirection: "column" }}
        >
          {/* Ask Assistant */}
          <NavItem to="/parent/dashboard" icon="bi-chat-dots" label="Ask Assistant" location={location} />

          {/* Chat History */}
          <NavItem to="/parent/history" icon="bi-clock-history" label="Chat History" location={location} />

          {/* My Feedback */}
          <NavItem to="/parent/feedback" icon="bi-star" label="My Feedback" location={location} />

          {/* Student & Profile */}
          <NavItem to="/parent/profile" icon="bi-person-badge" label="Student & Profile" location={location} />
        </ul>

        {/* Logout Button */}
        <div className="w-100 d-flex justify-content-center">
          <NavItem to="/" icon="bi-box-arrow-right" label="Log-out" location={location} isLogout />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, location, isLogout }) => {
  const isActive = location.pathname === to;

  return (
    <li className="nav-item position-relative w-100 d-flex justify-content-center" style={{ listStyle: "none" }}>
      {/* Active Glowing Vertical Accent Bar */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            left: "-8px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "4px",
            height: "28px",
            borderRadius: "0 4px 4px 0",
            background: "linear-gradient(180deg, #8B5CF6 0%, #6366F1 100%)",
            boxShadow: "0 0 10px #8B5CF6",
          }}
        />
      )}

      <Link
        to={to}
        className={`nav-link custom-hover-effect d-flex align-items-center justify-content-center position-relative ${
          isLogout ? "logout-item" : ""
        }`}
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          background: isActive
            ? "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)"
            : "transparent",
          boxShadow: isActive ? "0 6px 18px rgba(139, 92, 246, 0.4)" : "none",
          overflow: "visible",
        }}
      >
        <i
          className={`bi ${icon} fs-4 custom-icon`}
          style={{
            color: isActive ? "#FFFFFF" : isLogout ? "#EF4444" : "#64748B",
            transition: "color 0.2s ease, transform 0.2s ease",
          }}
        />

        {/* Floating Tooltip Label */}
        <div
          className="nav-link-label shadow-lg"
          style={{
            position: "absolute",
            left: "calc(100% + 16px)",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#1E293B",
            color: "#F8FAFC",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            width: "140px",
            minWidth: "140px",
            padding: "8px 12px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            whiteSpace: "nowrap",
            textAlign: "center",
            zIndex: 9999,
            opacity: 0,
            visibility: "hidden",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            transition: "opacity 0.18s ease, visibility 0.18s ease",
          }}
        >
          <span>{label}</span>
        </div>
      </Link>

      <style>{`
        .custom-hover-effect:hover {
          background: ${
            isActive
              ? "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%) !important"
              : isLogout
              ? "rgba(239, 68, 68, 0.12) !important"
              : "rgba(139, 92, 246, 0.1) !important"
          };
          transform: translateY(-1px);
        }

        .custom-hover-effect:hover .custom-icon {
          color: ${isActive ? "#FFFFFF" : isLogout ? "#DC2626" : "#8B5CF6"} !important;
          transform: scale(1.08);
        }

        .custom-hover-effect:hover .nav-link-label {
          opacity: 1 !important;
          visibility: visible !important;
        }

        .nav-link-label::before {
          content: "";
          position: absolute;
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 6px solid #1E293B;
        }
      `}</style>
    </li>
  );
};

export default Sidebar;

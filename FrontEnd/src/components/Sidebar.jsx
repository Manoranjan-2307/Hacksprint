import React, { useState } from "react";
import {
  Eye,
  Camera,
  ShieldCheck,
  Map,
  Sparkles,
  Award,
  Settings,
  User,
  MapPin,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

export default function Sidebar({
  activeView,
  onNavigate,
  currentUser,
  onUserRoleChange,
}) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: "citizen",
      label: "Citizen Grievance Portal",
      shortLabel: "Citizen Portal",
      icon: Camera,
      badge: "Report",
      roleNeeded: "Citizen",
    },
    {
      id: "officer",
      label: "Field Officer Dispatch Queue",
      shortLabel: "Field Officer",
      icon: ShieldCheck,
      badge: "Triage",
      roleNeeded: "Officer",
    },
    {
      id: "heatmap",
      label: "Live Coimbatore Municipal Geo Map",
      shortLabel: "Coimbatore Map",
      icon: Map,
      badge: "CBE",
      roleNeeded: "Admin",
    },
    {
      id: "hotspots",
      label: "Hotspot Prediction Engine",
      shortLabel: "Hotspots",
      icon: Sparkles,
      badge: "Predict",
      roleNeeded: "Admin",
    },
    {
      id: "accountability",
      label: "Public Accountability Leaderboard",
      shortLabel: "Leaderboard",
      icon: Award,
      badge: "Rank",
      roleNeeded: "Admin",
    },
    {
      id: "settings",
      label: "CV Engine & System Thresholds",
      shortLabel: "Settings",
      icon: Settings,
      badge: "Config",
      roleNeeded: "Admin",
    },
  ];

  return (
    <aside
      className="bg-slate-900 text-white border-end border-secondary flex-shrink-0 d-flex flex-column align-items-center py-3 position-relative z-3 shadow"
      style={{
        width: "72px",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
      }}
    >
      {/* Brand Eye Logo Icon */}
      <div className="mb-4 text-center">
        <div
          onClick={() => onNavigate("citizen")}
          className="p-2 rounded-3 text-white d-flex align-items-center justify-content-center cursor-pointer shadow-sm transition-all hover-scale"
          style={{
            width: 44,
            height: 44,
            background: "linear-gradient(135deg, #0284c7, #0f172a)",
          }}
          title="Geo-Vision — Coimbatore Digital Governance"
        >
          <Eye size={26} className="text-cyan" />
        </div>
        <span
          className="badge bg-cyan text-dark fw-bold mt-1.5"
          style={{ fontSize: "10px", padding: "3px 6px", letterSpacing: "0.5px" }}
        >
          CBE
        </span>
      </div>

      {/* Role Switcher Icon Button */}
      <div className="mb-4 position-relative">
        <div className="dropdown">
          <button
            className="btn btn-dark btn-sm rounded-circle p-2.5 border border-secondary shadow-sm text-info d-flex align-items-center justify-content-center"
            style={{ width: 42, height: 42 }}
            type="button"
            data-bs-toggle="dropdown"
            title={`Role: ${currentUser?.role || "Citizen"}`}
          >
            <User size={20} />
          </button>
          <ul
            className="dropdown-menu shadow border-0 p-1 mt-2"
            style={{ minWidth: "180px", fontSize: "12px" }}
          >
            <li className="dropdown-header text-muted font-monospace" style={{ fontSize: "10px" }}>
              SWITCH ROLE
            </li>
            <li>
              <button
                className={`dropdown-item rounded py-1.5 ${
                  currentUser?.role === "Citizen" ? "active fw-bold" : ""
                }`}
                onClick={() => onUserRoleChange && onUserRoleChange("Citizen")}
              >
                🙋 Citizen Portal
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item rounded py-1.5 ${
                  currentUser?.role === "Officer" ? "active fw-bold" : ""
                }`}
                onClick={() => onUserRoleChange && onUserRoleChange("Officer")}
              >
                👷 Field Officer
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item rounded py-1.5 ${
                  currentUser?.role === "Admin" ? "active fw-bold" : ""
                }`}
                onClick={() => onUserRoleChange && onUserRoleChange("Admin")}
              >
                🏛️ Governance Admin
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-100 border-bottom border-secondary border-opacity-50 mb-3"></div>

      {/* Navigation Icons Column with Hover Tooltips */}
      <nav className="d-flex flex-column align-items-center gap-3.5 flex-grow-1 w-100 px-2 my-1">
        {menuItems.map((item) => {
          const IconComp = item.icon;
          const isActive =
            activeView === item.id ||
            (activeView === "default" &&
              ((item.id === "citizen" && currentUser?.role === "Citizen") ||
                (item.id === "officer" && currentUser?.role === "Officer") ||
                (item.id === "heatmap" && currentUser?.role === "Admin")));

          return (
            <div
              key={item.id}
              className="position-relative w-100 d-flex justify-content-center"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate(item.id);
                }}
                className={`btn p-0 d-flex align-items-center justify-content-center rounded-3 transition-all ${
                  isActive
                    ? "btn-primary text-white shadow"
                    : "btn-outline-secondary text-white-50 border-0 hover-bg-dark text-hover-white"
                }`}
                style={{ width: 46, height: 46 }}
              >
                <IconComp size={22} />
              </button>

              {/* Floating Hover Tooltip (HackOrbit Style - Clean Bold White Label) */}
              {hoveredItem === item.id && (
                <div
                  className="position-absolute start-100 top-50 translate-middle-y ms-2.5 bg-slate-900 text-white rounded-3 px-3 py-2 shadow-lg border border-secondary text-nowrap pointer-events-none fade-in z-5"
                  style={{
                    backgroundColor: "#0f172a",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
                  }}
                >
                  <span className="fw-bold text-white small" style={{ fontSize: "13px" }}>
                    {item.shortLabel}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom CBE Location Badge Icon */}
      <div className="mt-auto text-center position-relative" onMouseEnter={() => setHoveredItem("location")} onMouseLeave={() => setHoveredItem(null)}>
        <div className="p-2 rounded-circle bg-black bg-opacity-50 border border-secondary text-cyan d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
          <MapPin size={20} />
        </div>

        {hoveredItem === "location" && (
          <div
            className="position-absolute start-100 bottom-0 ms-2.5 bg-slate-900 text-white rounded-3 px-3 py-2 shadow-lg border border-secondary text-nowrap pointer-events-none z-5"
            style={{ backgroundColor: "#0f172a" }}
          >
            <span className="fw-bold text-white small" style={{ fontSize: "13px" }}>
              Coimbatore Municipal Corp
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}

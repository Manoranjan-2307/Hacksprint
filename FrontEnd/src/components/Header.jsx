import React from "react";
import { ShieldCheck, Scan, MapPin, User, LogOut, Wifi, WifiOff, ChevronDown, Award } from "lucide-react";

export default function Header({
  currentUser,
  onUserRoleChange,
  isOffline = false,
  offlineQueueCount = 0,
}) {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-slate-900 border-bottom border-secondary sticky-top py-2 px-3 shadow"
            style={{ backgroundColor: "#0f172a" }}>
      <div className="container-fluid px-0">
        {/* Brand Logo & Title */}
        <div className="navbar-brand d-flex align-items-center m-0 cursor-pointer">
          <div className="bg-primary bg-gradient p-2 rounded-3 text-white d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
               style={{ width: 42, height: 42, background: "linear-gradient(135deg, #0284c7, #0f172a)" }}>
            <Scan size={24} className="text-cyan" />
          </div>
          <div className="d-flex flex-column justify-content-center ms-3">
            <div className="fw-bold fs-5 text-white lh-sm mb-1">
              Geo-Vision
            </div>
            <small className="text-white-50 d-block" style={{ fontSize: "11.5px" }}>
              Automated Infrastructure Grievance & Triage
            </small>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="d-flex align-items-center gap-3 ms-auto">
          {/* Offline Sync Status Badge */}
          {isOffline ? (
            <span className="badge bg-danger bg-opacity-20 text-danger border border-danger d-flex align-items-center gap-1 px-3 py-2">
              <WifiOff size={14} /> Offline Mode ({offlineQueueCount} queued)
            </span>
          ) : (
            <span className="badge bg-success bg-opacity-10 text-success border border-success d-flex align-items-center gap-1 px-2 py-1"
                  style={{ fontSize: "11px" }}>
              <Wifi size={12} /> Live Sync Active
            </span>
          )}

          {/* Role Switcher Pill */}
          <div className="dropdown">
            <button
              className="btn btn-dark btn-sm dropdown-toggle d-flex align-items-center gap-2 border border-secondary px-3 py-1.5 rounded-pill shadow-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <User size={14} className="text-info" />
              <span className="fw-semibold text-white small">
                Role: {currentUser?.role || "Citizen"}
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-1" style={{ minWidth: "200px" }}>
              <li>
                <button
                  className={`dropdown-item rounded py-2 d-flex align-items-center justify-content-between ${
                    currentUser?.role === "Citizen" ? "active fw-bold" : ""
                  }`}
                  onClick={() => onUserRoleChange && onUserRoleChange("Citizen")}
                >
                  <span>🙋 Citizen Portal</span>
                  <small className="text-muted" style={{ fontSize: "10px" }}>Instant Capture</small>
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item rounded py-2 d-flex align-items-center justify-content-between ${
                    currentUser?.role === "Officer" ? "active fw-bold" : ""
                  }`}
                  onClick={() => onUserRoleChange && onUserRoleChange("Officer")}
                >
                  <span>👷 Field Officer</span>
                  <small className="text-muted" style={{ fontSize: "10px" }}>Triage & Close</small>
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item rounded py-2 d-flex align-items-center justify-content-between ${
                    currentUser?.role === "Admin" ? "active fw-bold" : ""
                  }`}
                  onClick={() => onUserRoleChange && onUserRoleChange("Admin")}
                >
                  <span>🏛️ Governance Admin</span>
                  <small className="text-muted" style={{ fontSize: "10px" }}>Heatmap & Audit</small>
                </button>
              </li>
            </ul>
          </div>

          {/* User Profile Pill */}
          <div className="d-none d-md-flex align-items-center gap-2 ps-2 border-start border-secondary">
            <div className="text-end">
              <div className="fw-semibold text-white small leading-none">
                {currentUser?.name || "Civic Citizen"}
              </div>
              <div className="text-white-50" style={{ fontSize: "11px" }}>
                {currentUser?.department || currentUser?.zone || "Coimbatore Zone 2 (Central)"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
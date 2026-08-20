import React, { useState } from "react";
import { Eye, ShieldCheck, User, Sparkles, Camera, MapPin, ArrowRight } from "lucide-react";

export default function LoginPage({ onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState("Citizen");
  const [username, setUsername] = useState("citizen_user");
  const [password, setPassword] = useState("password");

  const handleLogin = (e) => {
    e.preventDefault();
    const userObj = {
      name: selectedRole === "Citizen" ? "Anand R. (Citizen)" : selectedRole === "Officer" ? "Officer Vikram S. (Roads)" : "Director Municipal Admin",
      role: selectedRole,
      department: selectedRole === "Officer" ? "Roads & Public Infrastructure" : "Digital Governance Dept",
      zone: "Zone 4 — Central Metro",
    };
    localStorage.setItem("geovision_user", JSON.stringify(userObj));
    if (onLoginSuccess) onLoginSuccess(userObj);
  };

  const handleQuickLogin = (roleName, nameStr, deptStr) => {
    const userObj = {
      name: nameStr,
      role: roleName,
      department: deptStr || "Digital Governance",
      zone: "Zone 4 — Central Metro",
    };
    localStorage.setItem("geovision_user", JSON.stringify(userObj));
    if (onLoginSuccess) onLoginSuccess(userObj);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-slate-900 px-3 py-5"
         style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
      <div className="container max-w-lg" style={{ maxWidth: "520px" }}>
        {/* Brand Header */}
        <div className="text-center mb-4">
          <div className="d-inline-flex p-2 bg-white rounded-4 mb-3 shadow-lg align-items-center justify-content-center"
               style={{ minWidth: 160, height: 60 }}>
            <img src="/coimbatore_city_logo.png" alt="Coimbatore City Logo" style={{ height: "46px", objectFit: "contain" }} />
          </div>
          <h3 className="fw-bold text-white mb-1">Geo-Vision</h3>
          <p className="text-cyan small fw-semibold mb-2">Automated Infrastructure Grievance & Triage</p>
          <span className="badge bg-secondary font-monospace" style={{ fontSize: "11px" }}>
            Domain: Digital Governance
          </span>
        </div>

        {/* Login Form Card */}
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden bg-white">
          <div className="card-body p-4 p-md-5">
            <h5 className="fw-bold text-dark text-center mb-4">Select Portal Role</h5>

            {/* Quick Role Selector Buttons */}
            <div className="row g-2 mb-4">
              <div className="col-4">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("Citizen", "Anand R. (Citizen)", "Public")}
                  className={`btn w-100 p-2.5 rounded-3 border text-center transition-all ${
                    selectedRole === "Citizen" ? "btn-primary fw-bold" : "btn-light text-dark"
                  }`}
                  style={{ fontSize: "12px" }}
                >
                  <div className="fs-5 mb-1">🙋</div>
                  Citizen Portal
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("Officer", "Officer Vikram S.", "Roads & Infrastructure")}
                  className={`btn w-100 p-2.5 rounded-3 border text-center transition-all ${
                    selectedRole === "Officer" ? "btn-primary fw-bold" : "btn-light text-dark"
                  }`}
                  style={{ fontSize: "12px" }}
                >
                  <div className="fs-5 mb-1">👷</div>
                  Field Officer
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("Admin", "Municipal Director", "Digital Governance")}
                  className={`btn w-100 p-2.5 rounded-3 border text-center transition-all ${
                    selectedRole === "Admin" ? "btn-primary fw-bold" : "btn-light text-dark"
                  }`}
                  style={{ fontSize: "12px" }}
                >
                  <div className="fs-5 mb-1">🏛️</div>
                  Governance
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-dark">User Identifier</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter User ID or Email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-dark">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                style={{ background: "linear-gradient(135deg, #0284c7, #0f172a)" }}
              >
                Access Geo-Vision Platform <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="card-footer bg-light py-3 px-4 text-center border-top">
            <small className="text-muted" style={{ fontSize: "11px" }}>
              Computer Vision + Full-Stack Infrastructure Grievance Pipeline
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
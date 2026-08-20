import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, CheckCircle2, Filter, Cpu, MapPin, Clock, ArrowUpRight, Sparkles, RefreshCw, Eye } from "lucide-react";
import { CATEGORIES } from "../../utils/cvEngine";
import GradCamViewer from "../../components/GradCamViewer";
import BeforeAfterVerifier from "../../components/BeforeAfterVerifier";

export default function OfficerDashboard({
  tickets = [],
  onResolveTicket,
}) {
  const [selectedDepartment, setSelectedDepartment] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedTicket, setSelectedTicket] = useState(tickets[0] || null);

  // Filter tickets by department & status, sorted by CV Severity (High -> Low)
  const filteredTickets = tickets
    .filter((t) => {
      if (selectedDepartment !== "ALL" && t.department !== selectedDepartment) return false;
      if (statusFilter !== "ALL" && t.status !== statusFilter) return false;
      return true;
    })
    .sort((a, b) => b.severityScore - a.severityScore);

  const handleResolveComplete = (resolveData) => {
    if (!selectedTicket || !onResolveTicket) return;
    onResolveTicket(selectedTicket.id, resolveData);
  };

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      {/* Top Header Banner */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <ShieldCheck className="text-primary" size={28} />
            Municipal Field Agent & Priority Dispatch Console
          </h4>
          <p className="text-muted mb-0 small">
            CV-Driven Priority Queue. Critical damage is ranked first instead of FIFO.
          </p>
        </div>

        {/* Filters */}
        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Department Filter */}
          <select
            className="form-select form-select-sm border-secondary shadow-sm"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            style={{ width: "220px" }}
          >
            <option value="ALL">All Departments</option>
            {Object.values(CATEGORIES).map((c) => (
              <option key={c.id} value={c.department}>
                {c.department}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="form-select form-select-sm border-secondary shadow-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: "150px" }}
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Reopened_Audit">Audit Flagged</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Priority Queue List & Ticket Inspector */}
      <div className="row g-4">
        {/* Left Column: Priority Ticket List */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
            <div className="card-header bg-slate-900 text-white py-3 px-4 d-flex justify-content-between align-items-center"
                 style={{ backgroundColor: "#0f172a" }}>
              <div className="d-flex align-items-center gap-2">
                <Filter size={18} className="text-cyan" />
                <h6 className="fw-bold mb-0">Priority Dispatch Queue ({filteredTickets.length})</h6>
              </div>
              <span className="badge bg-secondary font-monospace" style={{ fontSize: "10px" }}>
                Ranked by CV Severity
              </span>
            </div>

            <div className="card-body p-0 overflow-y-auto" style={{ maxHeight: "720px" }}>
              {filteredTickets.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <CheckCircle2 size={40} className="mb-2 opacity-25 text-success" />
                  <p>No complaints found for the selected department/filter.</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {filteredTickets.map((t) => {
                    const isSelected = selectedTicket?.id === t.id;
                    const catInfo = CATEGORIES[t.category] || CATEGORIES.POTHOLE;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTicket(t)}
                        className={`list-group-item p-3 list-group-item-action cursor-pointer transition-all ${
                          isSelected ? "bg-primary bg-opacity-10 border-start border-4 border-primary" : ""
                        }`}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <span className="font-monospace fw-bold text-muted small">{t.id}</span>
                          <span
                            className={`badge ${
                              t.status === "Resolved"
                                ? "bg-success"
                                : t.status === "Reopened_Audit"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                            style={{ fontSize: "10px" }}
                          >
                            {t.status === "Reopened_Audit" ? "⚠️ Audit Flagged" : t.status}
                          </span>
                        </div>

                        <h6 className="fw-bold text-dark mb-1 truncate-1" style={{ fontSize: "14px" }}>
                          {t.title}
                        </h6>

                        <p className="text-muted small mb-2 truncate-1" style={{ fontSize: "12px" }}>
                          📍 {t.location?.address}
                        </p>

                        <div className="d-flex flex-wrap align-items-center gap-2">
                          <span
                            className={`badge ${
                              t.severityScore >= 75
                                ? "bg-danger"
                                : t.severityScore >= 45
                                ? "bg-warning text-dark"
                                : "bg-info text-dark"
                            }`}
                            style={{ fontSize: "10px" }}
                          >
                            CV Severity: {t.severityScore}/100 ({t.severityLabel})
                          </span>

                          <span className="badge bg-secondary" style={{ fontSize: "10px" }}>
                            👥 {t.citizenImpactCount || 1} Citizens
                          </span>

                          {t.estimatedDepthCm && (
                            <span className="badge bg-light text-dark border" style={{ fontSize: "10px" }}>
                              Depth: {t.estimatedDepthCm}cm
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Inspection & Resolution Verification */}
        <div className="col-lg-7">
          {selectedTicket ? (
            <div>
              {/* Ticket Summary Card */}
              <div className="card shadow-sm border-0 rounded-3 mb-4">
                <div className="card-header bg-white py-3 px-4 d-flex justify-content-between align-items-center border-bottom">
                  <div>
                    <span className="badge bg-primary mb-1">{selectedTicket.categoryLabel}</span>
                    <h5 className="fw-bold text-dark mb-0">{selectedTicket.title}</h5>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-dark font-monospace fs-6 px-3 py-1.5">{selectedTicket.id}</span>
                  </div>
                </div>

                <div className="card-body p-4">
                  {/* Location & Metadata Info */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <small className="text-muted d-block mb-1">LOCATION & ZONE</small>
                        <strong className="text-dark d-block">📍 {selectedTicket.location?.address}</strong>
                        <small className="text-muted font-monospace" style={{ fontSize: "11px" }}>
                          GPS: {selectedTicket.location?.lat}, {selectedTicket.location?.lng}
                        </small>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 bg-light rounded-3 border">
                        <small className="text-muted d-block mb-1">CV SEVERITY & IMPACT METRICS</small>
                        <div className="d-flex align-items-center gap-2">
                          <span className={`badge fs-6 ${selectedTicket.severityScore >= 75 ? "bg-danger" : "bg-warning text-dark"}`}>
                            {selectedTicket.severityScore}/100 {selectedTicket.severityLabel}
                          </span>
                          <span className="badge bg-secondary fs-6">
                            👥 {selectedTicket.citizenImpactCount || 1} Citizens
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Explainable AI (Grad-CAM) Viewer */}
                  <GradCamViewer
                    imageSrc={selectedTicket.beforeImage}
                    gradCamData={selectedTicket.gradCamData}
                    title="Officer Inspection: Explainable AI Heatmap & Damage Region"
                  />
                </div>
              </div>

              {/* Resolution Verification Loop Component */}
              <BeforeAfterVerifier
                ticket={selectedTicket}
                onResolveComplete={handleResolveComplete}
                isOfficer={true}
              />
            </div>
          ) : (
            <div className="card shadow-sm border-0 rounded-3 text-center py-5 text-muted">
              <Eye size={40} className="mb-2 opacity-25" />
              <p>Select a ticket from the priority queue on the left to inspect and verify resolution.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

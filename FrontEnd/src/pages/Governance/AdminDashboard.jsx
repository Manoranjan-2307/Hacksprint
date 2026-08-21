import React, { useState, useEffect } from "react";
import { ShieldCheck, Award, Map, Flame, AlertTriangle, TrendingUp, CheckCircle2, Clock, Cpu, Users, Settings, RefreshCw, BarChart2 } from "lucide-react";
import InteractiveMap from "../../components/InteractiveMap";
import { HOTSPOT_PREDICTIONS, ACCOUNTABILITY_LEADERBOARD } from "../../utils/mockData";

export default function AdminDashboard({ tickets = [], initialTab = "heatmap" }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab && ["heatmap", "hotspots", "accountability", "settings"].includes(initialTab)) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // System Stats
  const totalTickets = tickets.length + 380;
  const duplicateSavedCount = 142;
  const duplicateReductionPercent = 27.2;
  const verifiedRatePercent = 95.8;
  const auditFlagsCount = 4;

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      {/* Governance Title Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-primary font-monospace">COIMBATORE MUNICIPAL CORP</span>
          </div>
          <h4 className="fw-bold text-dark mb-0">
            Coimbatore Governance Command & Accountability Center
          </h4>
          <small className="text-muted">
            Geo-Vision Real-Time Triage, Coimbatore Ward Spatial Clustering & Transparent Officer Analytics
          </small>
        </div>

        {/* Tab Selector Buttons */}
        <div className="d-flex flex-wrap gap-2.5 bg-white p-2 rounded-3 border shadow-sm align-items-center">
          <button
            onClick={() => setActiveTab("heatmap")}
            className={`btn btn-sm rounded-3 px-3.5 py-2 fw-semibold d-flex align-items-center gap-2 ${
              activeTab === "heatmap" ? "btn-primary text-white shadow-sm" : "btn-light text-dark border-0"
            }`}
          >
            <Map size={16} /> Live Coimbatore Map
          </button>
          <button
            onClick={() => setActiveTab("hotspots")}
            className={`btn btn-sm rounded-3 px-3.5 py-2 fw-semibold d-flex align-items-center gap-2 ${
              activeTab === "hotspots" ? "btn-primary text-white shadow-sm" : "btn-light text-dark border-0"
            }`}
          >
            <Flame size={16} /> Hotspot Predictions
          </button>
          <button
            onClick={() => setActiveTab("accountability")}
            className={`btn btn-sm rounded-3 px-3.5 py-2 fw-semibold d-flex align-items-center gap-2 ${
              activeTab === "accountability" ? "btn-primary text-white shadow-sm" : "btn-light text-dark border-0"
            }`}
          >
            <Award size={16} /> Public Accountability
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`btn btn-sm rounded-3 px-3.5 py-2 fw-semibold d-flex align-items-center gap-2 ${
              activeTab === "settings" ? "btn-primary text-white shadow-sm" : "btn-light text-dark border-0"
            }`}
          >
            <Settings size={16} /> System Config
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 rounded-3 p-4 shadow-sm text-white" style={{ backgroundColor: "#0f172a" }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-white-50 text-uppercase fw-bold">Total Complaints (CBE)</span>
              <BarChart2 className="text-cyan" size={22} />
            </div>
            <h2 className="fw-bold mb-1 text-white">{totalTickets}</h2>
            <small className="text-cyan d-block fw-semibold" style={{ fontSize: "11.5px" }}>
              ⚡ &lt;10s Avg Filing Time via CV Capture
            </small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 rounded-3 p-4 shadow-sm text-white" style={{ backgroundColor: "#0284c7" }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-white-50 text-uppercase fw-bold">Duplicate Merged</span>
              <Users className="text-white" size={22} />
            </div>
            <h2 className="fw-bold mb-1 text-white">{duplicateSavedCount} <span className="fs-6 text-white-50">({duplicateReductionPercent}%)</span></h2>
            <small className="text-white-50 d-block" style={{ fontSize: "11.5px" }}>
              Eliminated queue flood via Spatial Clustering
            </small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 rounded-3 p-4 shadow-sm text-white" style={{ backgroundColor: "#059669" }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-white-50 text-uppercase fw-bold">Verified Resolutions</span>
              <CheckCircle2 className="text-white" size={22} />
            </div>
            <h2 className="fw-bold mb-1 text-white">{verifiedRatePercent}%</h2>
            <small className="text-white-50 d-block" style={{ fontSize: "11.5px" }}>
              CV Before/After Match Confirmed
            </small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 rounded-3 p-4 shadow-sm text-white" style={{ backgroundColor: "#e11d48" }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-white-50 text-uppercase fw-bold">Audit Flagged Re-opens</span>
              <AlertTriangle className="text-white" size={22} />
            </div>
            <h2 className="fw-bold mb-1 text-white">{auditFlagsCount}</h2>
            <small className="text-white-50 d-block" style={{ fontSize: "11.5px" }}>
              Requires Secondary Officer Field Review
            </small>
          </div>
        </div>
      </div>

      {/* Tab Content Views */}
      {activeTab === "heatmap" && (
        <div className="card shadow-sm border-0 rounded-3 p-3">
          <InteractiveMap
            tickets={tickets}
            hotspots={HOTSPOT_PREDICTIONS}
            height="560px"
          />
        </div>
      )}

      {activeTab === "hotspots" && (
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 rounded-3 h-100">
              <div className="card-header bg-slate-900 text-white py-3 px-4 d-flex justify-content-between align-items-center"
                   style={{ backgroundColor: "#0f172a" }}>
                <div className="d-flex align-items-center gap-2">
                  <Flame className="text-warning" size={20} />
                  <h6 className="fw-bold mb-0">Hotspot Prediction Engine — Coimbatore Zones</h6>
                </div>
                <span className="badge bg-danger">Proactive Maintenance</span>
              </div>

              <div className="card-body p-4">
                <p className="text-muted small mb-3">
                  Historical geo-tagged complaint clusters across Coimbatore reveal failure patterns. Shift from reactive repairs to proactive municipal maintenance.
                </p>

                <div className="d-flex flex-column gap-3">
                  {HOTSPOT_PREDICTIONS.map((hs) => (
                    <div key={hs.id} className="p-3 bg-light rounded-3 border border-start border-4 border-danger">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold text-dark">{hs.zone}</span>
                        <span className="badge bg-danger">{hs.riskLevel} ({hs.riskScore}%)</span>
                      </div>
                      <small className="text-muted d-block mb-2">
                        🏢 {hs.department} · Recurrence: <strong>{hs.recurrenceCount} Reports</strong>
                      </small>
                      <p className="small text-dark mb-2">
                        <strong>Cause:</strong> {hs.reason}
                      </p>
                      <div className="p-2 bg-white rounded border text-primary small">
                        <strong>Recommended Action:</strong> {hs.recommendedAction}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <InteractiveMap
              tickets={tickets}
              hotspots={HOTSPOT_PREDICTIONS}
              height="580px"
            />
          </div>
        </div>
      )}

      {activeTab === "accountability" && (
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-white py-3 px-4 border-bottom d-flex justify-content-between align-items-center">
                <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                  <Award className="text-warning" size={20} />
                  Coimbatore Department Accountability Metrics
                </h6>
                <span className="badge bg-light text-dark font-monospace">Verified Rate Ranking</span>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0" style={{ fontSize: "13px" }}>
                    <thead className="table-light">
                      <tr>
                        <th>Department</th>
                        <th>Total</th>
                        <th>Verified Rate %</th>
                        <th>Avg Turnaround</th>
                        <th>Audit Flags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ACCOUNTABILITY_LEADERBOARD.departments.map((d, i) => (
                        <tr key={i}>
                          <td className="fw-bold text-dark">{d.name}</td>
                          <td>{d.totalTickets}</td>
                          <td>
                            <span className="badge bg-success">{d.verifiedRate}%</span>
                          </td>
                          <td>{d.avgTurnaroundHrs} hrs</td>
                          <td>
                            {d.auditFlags > 0 ? (
                              <span className="badge bg-danger">{d.auditFlags}</span>
                            ) : (
                              <span className="badge bg-light text-dark">0</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-white py-3 px-4 border-bottom d-flex justify-content-between align-items-center">
                <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                  <ShieldCheck className="text-primary" size={20} />
                  Coimbatore Officer Verification Leaderboard
                </h6>
                <span className="badge bg-light text-dark font-monospace">Top Performers</span>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0" style={{ fontSize: "13px" }}>
                    <thead className="table-light">
                      <tr>
                        <th>Officer Name</th>
                        <th>Department</th>
                        <th>Verified Rate</th>
                        <th>Badge / Honor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ACCOUNTABILITY_LEADERBOARD.officers.map((off, i) => (
                        <tr key={i}>
                          <td>
                            <div className="fw-bold text-dark">{off.name}</div>
                            <small className="text-muted font-monospace">{off.id}</small>
                          </td>
                          <td className="small text-muted">{off.department}</td>
                          <td>
                            <span className="badge bg-success">{off.verifiedRate}%</span>
                          </td>
                          <td className="small fw-semibold text-primary">{off.badge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="card shadow-sm border-0 rounded-3 p-4 max-w-2xl">
          <h6 className="fw-bold text-dark mb-3">Coimbatore Geo-Vision Threshold & Engine Settings</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Duplicate Clustering Radius (Meters)</label>
              <input type="number" className="form-control" defaultValue={100} />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">CV Verification Sensitivity %</label>
              <input type="number" className="form-control" defaultValue={75} />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Coimbatore Center Lat Coordinate</label>
              <input type="text" className="form-control" defaultValue="11.0168" />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Coimbatore Center Lng Coordinate</label>
              <input type="text" className="form-control" defaultValue="76.9558" />
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-primary fw-bold px-4">Save Engine Settings</button>
          </div>
        </div>
      )}
    </div>
  );
}

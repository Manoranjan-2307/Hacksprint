import React from "react";

export default function PrototypeExplainer() {
  const steps = [
    {
      num: 1,
      id: "capture",
      title: "1. Capture & EXIF Guard",
      subtitle: "<10s Photo + Camera GPS",
      icon: "📸",
      badge: "EXIF Verified",
    },
    {
      num: 2,
      id: "classify",
      title: "2. CV Classify & Depth",
      subtitle: "Multi-Class & Depth Score",
      icon: "🧠",
      badge: "XAI Grad-CAM",
    },
    {
      num: 3,
      id: "cluster",
      title: "3. Spatial Duplicate Cluster",
      subtitle: "Perceptual Hash + 100m",
      icon: "📍",
      badge: "-30% Queue Flood",
    },
    {
      num: 4,
      id: "routing",
      title: "4. Priority Geo-Routing",
      subtitle: "Severity-Ranked Queue",
      icon: "🚦",
      badge: "Coimbatore Depts",
    },
    {
      num: 5,
      id: "verify",
      title: "5. Resolution Loop",
      subtitle: "Before/After CV Match",
      icon: "🔄",
      badge: "Signature Feature",
    },
  ];

  return (
    <div className="bg-slate-900 text-white border-bottom border-secondary py-3.5 px-3 px-md-4 mb-3 shadow-sm" style={{ backgroundColor: "#0f172a" }}>
      <div className="container-fluid px-0">
        {/* Banner Top Bar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold text-white small">
              End-to-End Computer Vision & Governance Pipeline
            </span>
          </div>
        </div>

        {/* 5-Step Pipeline Card Grid (Clean CSS Hover - No Floating Popups) */}
        <div className="row g-3">
          {steps.map((s) => (
            <div key={s.id} className="col-12 col-md">
              <div
                className="p-3 rounded-3 border transition-all h-100 bg-black bg-opacity-40 border-secondary border-opacity-50 text-white-50 feature-card-hover"
                style={{
                  cursor: "pointer",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fs-5">{s.icon}</span>
                  <span className="badge bg-secondary text-white" style={{ fontSize: "10px" }}>
                    {s.badge}
                  </span>
                </div>
                <div className="fw-bold text-white mb-1" style={{ fontSize: "13px", lineHeight: "1.3" }}>
                  {s.title}
                </div>
                <small className="text-white-50 d-block" style={{ fontSize: "11px" }}>
                  {s.subtitle}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

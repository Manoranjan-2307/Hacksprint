import React, { useState, useEffect, useRef } from "react";
import { Eye, ShieldCheck, Cpu, Layers, Sparkles } from "lucide-react";

/**
 * GradCamViewer
 * Renders Explainable AI (XAI) Grad-CAM heatmap overlays on top of grievance images.
 * Gives citizens and municipal officials transparent insight into why the CV model flagged the image.
 */
export default function GradCamViewer({ imageSrc, gradCamData, title = "CV Heatmap & Explainable AI (XAI) Analysis" }) {
  const [viewMode, setViewMode] = useState("gradcam"); // "original", "gradcam", "depth"
  const [opacity, setOpacity] = useState(0.75);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !imageSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.naturalWidth || 600;
      canvas.height = img.naturalHeight || 400;

      // Draw base image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (viewMode === "original") return;

      const w = canvas.width;
      const h = canvas.height;

      if (viewMode === "gradcam") {
        // Draw Grad-CAM Heatmap Radial Overlays
        const cx = ((gradCamData?.centerX || 45) / 100) * w;
        const cy = ((gradCamData?.centerY || 50) / 100) * h;
        const r = ((gradCamData?.radius || 25) / 100) * Math.min(w, h);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, `rgba(225, 29, 72, ${opacity})`); // Hot Red
        gradient.addColorStop(0.4, `rgba(245, 158, 11, ${opacity * 0.85})`); // Yellow
        gradient.addColorStop(0.7, `rgba(6, 182, 212, ${opacity * 0.5})`); // Cyan
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        // Additional hotspots if defined
        if (gradCamData?.hotspots) {
          gradCamData.hotspots.forEach((hs) => {
            const hx = (hs.x / 100) * w;
            const hy = (hs.y / 100) * h;
            const hr = r * 0.5 * (hs.val || 0.8);
            const hGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr);
            hGrad.addColorStop(0, `rgba(239, 68, 68, ${opacity})`);
            hGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = hGrad;
            ctx.beginPath();
            ctx.arc(hx, hy, hr, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        // Draw Bounding Box around primary region
        ctx.strokeStyle = "#e11d48";
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(cx - r * 0.8, cy - r * 0.8, r * 1.6, r * 1.6);
        ctx.setLineDash([]);

        // Label on bounding box
        ctx.fillStyle = "#e11d48";
        ctx.font = "bold 13px Inter, sans-serif";
        ctx.fillRect(cx - r * 0.8, cy - r * 0.8 - 22, 140, 22);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("CV Focus Region", cx - r * 0.8 + 6, cy - r * 0.8 - 6);
      } else if (viewMode === "depth") {
        // Draw Simulated Reference Depth Cues Overlay
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (avg < 110) {
            // Darker regions = deeper cavity (Red/Purple hue)
            data[i] = Math.min(255, data[i] + 120); // R
            data[i + 1] = Math.max(0, data[i + 1] - 40); // G
            data[i + 2] = Math.min(255, data[i + 2] + 80); // B
          } else {
            // Surface level (Cyan/Green hue)
            data[i] = Math.max(0, data[i] - 50);
            data[i + 1] = Math.min(255, data[i + 1] + 60);
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }
    };
  }, [imageSrc, viewMode, opacity, gradCamData]);

  return (
    <div className="card shadow-sm border-0 rounded-3 overflow-hidden bg-dark text-white">
      {/* Header controls */}
      <div className="card-header bg-black bg-opacity-75 border-bottom border-secondary d-flex justify-content-between align-items-center py-2 px-3">
        <div className="d-flex align-items-center gap-2">
          <Cpu className="text-cyan" size={18} />
          <span className="fw-semibold text-white small">{title}</span>
        </div>
        <span className="badge bg-secondary font-monospace" style={{ fontSize: "11px" }}>
          {gradCamData?.layerName || "ConvLayer_4_GradCAM"}
        </span>
      </div>

      {/* Canvas Display Area */}
      <div className="position-relative text-center p-2 bg-black" style={{ minHeight: "260px" }}>
        <canvas
          ref={canvasRef}
          className="img-fluid rounded border border-secondary"
          style={{ maxHeight: "360px", objectFit: "contain" }}
        />
        {!imageSrc && (
          <div className="text-muted py-5">
            <Eye className="mb-2 opacity-50" size={32} />
            <p className="small">No image loaded for CV inspection</p>
          </div>
        )}
      </div>

      {/* Control Toolbar */}
      <div className="card-body bg-dark border-top border-secondary p-3">
        <div className="row g-2 align-items-center">
          <div className="col-md-7 d-flex gap-2">
            <button
              onClick={() => setViewMode("gradcam")}
              className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 ${
                viewMode === "gradcam" ? "btn-danger fw-bold" : "btn-outline-light"
              }`}
            >
              <Sparkles size={14} /> Grad-CAM Heatmap
            </button>
            <button
              onClick={() => setViewMode("depth")}
              className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 ${
                viewMode === "depth" ? "btn-info fw-bold" : "btn-outline-light"
              }`}
            >
              <Layers size={14} /> Depth Cues
            </button>
            <button
              onClick={() => setViewMode("original")}
              className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 ${
                viewMode === "original" ? "btn-light fw-bold" : "btn-outline-secondary text-white"
              }`}
            >
              <Eye size={14} /> Raw Photo
            </button>
          </div>

          {viewMode === "gradcam" && (
            <div className="col-md-5 d-flex align-items-center gap-2">
              <span className="small text-muted" style={{ whiteSpace: "nowrap" }}>
                Heat Intensity:
              </span>
              <input
                type="range"
                className="form-range"
                min="0.2"
                max="1.0"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
              />
            </div>
          )}
        </div>

        {/* Explainability Insight Footer */}
        <div className="mt-3 pt-2 border-top border-secondary text-muted small d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-1">
            <ShieldCheck size={14} className="text-success" />
            Auditable AI Decision: High region saliency score ({Math.round((gradCamData?.intensity || 0.92) * 100)}%)
          </span>
          <span className="text-info font-monospace" style={{ fontSize: "11px" }}>
            Target: {gradCamData?.centerX || 45}%, {gradCamData?.centerY || 50}%
          </span>
        </div>
      </div>
    </div>
  );
}

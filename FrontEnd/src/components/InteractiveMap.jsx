import React, { useState, useRef, useEffect } from "react";
import { MapPin, Navigation, Layers, AlertCircle, Flame, Filter, CheckCircle2 } from "lucide-react";
import { CATEGORIES } from "../utils/cvEngine";

/**
 * InteractiveMap Component
 * Geo-Spatial Canvas & Grid Map for Geo-Vision
 * City: Coimbatore Corporation, Tamil Nadu
 */
export default function InteractiveMap({
  tickets = [],
  hotspots = [],
  onSelectTicket = null,
  selectableLocation = false,
  onLocationSelected = null,
  height = "450px",
}) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showHotspots, setShowHotspots] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [pinnedLocation, setPinnedLocation] = useState(null);

  const canvasRef = useRef(null);

  // Map Bounds for Coimbatore (lat: 10.95 to 11.08, lng: 76.90 to 77.05)
  const MIN_LAT = 10.95;
  const MAX_LAT = 11.08;
  const MIN_LNG = 76.90;
  const MAX_LNG = 77.05;

  const latLngToCanvas = (lat, lng, width, height) => {
    const x = ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * width;
    const y = height - ((lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * height;
    return { x, y };
  };

  const canvasToLatLng = (x, y, width, height) => {
    const lng = MIN_LNG + (x / width) * (MAX_LNG - MIN_LNG);
    const lat = MIN_LAT + ((height - y) / height) * (MAX_LAT - MIN_LAT);
    return { lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = (canvas.width = canvas.parentElement.offsetWidth || 800);
    const heightNum = (canvas.height = parseInt(height) || 450);

    // 1. Map Background (Dark Slate Navy)
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, heightNum);

    // Grid Lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    const gridStep = 40;
    for (let x = 0; x < width; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, heightNum);
      ctx.stroke();
    }
    for (let y = 0; y < heightNum; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Coimbatore Major Arterial Roads Simulation (Avinashi Road, Mettupalayam Road, Trichy Road)
    // Avinashi Road
    ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(width * 0.2, heightNum * 0.6);
    ctx.lineTo(width * 0.9, heightNum * 0.2);
    ctx.stroke();

    // Mettupalayam Road
    ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width * 0.35, heightNum * 0.9);
    ctx.lineTo(width * 0.45, heightNum * 0.05);
    ctx.stroke();

    // Trichy Road
    ctx.strokeStyle = "rgba(245, 158, 11, 0.2)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width * 0.25, heightNum * 0.7);
    ctx.lineTo(width * 0.95, heightNum * 0.75);
    ctx.stroke();

    // Landmark labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "bold 10px Inter, sans-serif";
    ctx.fillText("Gandhipuram (Zone 2)", width * 0.38, heightNum * 0.45);
    ctx.fillText("Peelamedu (Zone 3)", width * 0.65, heightNum * 0.35);
    ctx.fillText("RS Puram (Zone 1)", width * 0.22, heightNum * 0.52);
    ctx.fillText("Ukkadam (Zone 4)", width * 0.32, heightNum * 0.72);

    // 2. Heatmap Density
    if (showHeatmap && tickets.length > 0) {
      tickets.forEach((t) => {
        if (!t.location) return;
        const { x, y } = latLngToCanvas(t.location.lat, t.location.lng, width, heightNum);
        const radius = 45;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const heatColor = t.severityScore >= 75 ? "225, 29, 72" : "245, 158, 11";
        grad.addColorStop(0, `rgba(${heatColor}, 0.5)`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 3. Hotspots
    if (showHotspots && hotspots.length > 0) {
      hotspots.forEach((hs) => {
        if (!hs.location) return;
        const { x, y } = latLngToCanvas(hs.location.lat, hs.location.lng, width, heightNum);
        
        ctx.strokeStyle = "rgba(239, 68, 68, 0.75)";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(x, y, 52, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "rgba(239, 68, 68, 0.95)";
        ctx.font = "10px Inter, sans-serif";
        ctx.fillText(`🔥 Hotspot ${hs.riskScore}% Risk`, x - 35, y - 56);
      });
    }

    // 4. Ticket Markers
    const filteredTickets = tickets.filter(
      (t) => activeCategory === "ALL" || t.category === activeCategory
    );

    filteredTickets.forEach((t) => {
      if (!t.location) return;
      const { x, y } = latLngToCanvas(t.location.lat, t.location.lng, width, heightNum);

      const isSelected = selectedTicketId === t.id;
      const isCritical = t.severityScore >= 75;
      const isResolved = t.status === "Resolved";

      let markerColor = isCritical ? "#e11d48" : "#d97706";
      if (isResolved) markerColor = "#16a34a";

      if (isCritical && !isResolved) {
        ctx.strokeStyle = markerColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = markerColor;
      ctx.beginPath();
      ctx.arc(x, y, isSelected ? 9 : 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (t.citizenImpactCount > 1) {
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(x + 5, y - 12, 18, 12);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px Inter, sans-serif";
        ctx.fillText(`+${t.citizenImpactCount}`, x + 7, y - 3);
      }
    });

    // 5. Pinned Location
    if (pinnedLocation) {
      const { x, y } = latLngToCanvas(pinnedLocation.lat, pinnedLocation.lng, width, heightNum);
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillText("📍 Coimbatore Pin", x - 40, y - 15);
    }
  }, [tickets, hotspots, activeCategory, showHotspots, showHeatmap, selectedTicketId, pinnedLocation, height]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const width = canvas.width;
    const heightNum = canvas.height;

    const clickedTicket = tickets.find((t) => {
      if (!t.location) return false;
      const { x, y } = latLngToCanvas(t.location.lat, t.location.lng, width, heightNum);
      return Math.hypot(clickX - x, clickY - y) <= 18;
    });

    if (clickedTicket) {
      setSelectedTicketId(clickedTicket.id);
      if (onSelectTicket) onSelectTicket(clickedTicket);
      return;
    }

    if (selectableLocation) {
      const coords = canvasToLatLng(clickX, clickY, width, heightNum);
      setPinnedLocation(coords);
      if (onLocationSelected) {
        onLocationSelected({
          ...coords,
          address: `Coimbatore Map Pin (${coords.lat}, ${coords.lng}), Ward 42`,
        });
      }
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-3 overflow-hidden bg-dark text-white">
      <div className="card-header bg-black bg-opacity-75 border-bottom border-secondary d-flex flex-wrap justify-content-between align-items-center py-2 px-3 gap-2">
        <div className="d-flex align-items-center gap-2">
          <Navigation className="text-info" size={18} />
          <span className="fw-bold small text-white">Coimbatore Municipal Geo Map</span>
          <span className="badge bg-secondary font-monospace" style={{ fontSize: "10px" }}>
            Wards 1–100
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`btn btn-sm d-flex align-items-center gap-1 ${
              showHeatmap ? "btn-warning text-dark fw-bold" : "btn-outline-secondary text-white"
            }`}
          >
            <Layers size={13} /> Density Heat
          </button>
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`btn btn-sm d-flex align-items-center gap-1 ${
              showHotspots ? "btn-danger fw-bold" : "btn-outline-secondary text-white"
            }`}
          >
            <Flame size={13} /> Hotspots
          </button>
        </div>
      </div>

      <div className="bg-black bg-opacity-60 border-bottom border-secondary px-3 py-2.5 d-flex gap-2.5 overflow-x-auto align-items-center">
        <button
          onClick={() => setActiveCategory("ALL")}
          className={`btn btn-sm rounded-pill px-3 py-1 ${
            activeCategory === "ALL" ? "btn-light fw-bold" : "btn-outline-secondary text-white-50"
          }`}
          style={{ fontSize: "12px", whiteSpace: "nowrap" }}
        >
          All Issues ({tickets.length})
        </button>
        {Object.values(CATEGORIES).map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`btn btn-sm rounded-pill px-3 py-1 d-flex align-items-center gap-1.5 ${
              activeCategory === cat.id ? "btn-info fw-bold text-dark" : "btn-outline-secondary text-white-50"
            }`}
            style={{ fontSize: "11.5px", whiteSpace: "nowrap" }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: cat.color }}></span>
            {cat.label.split("/")[0]}
          </button>
        ))}
      </div>

      <div className="position-relative text-center bg-black overflow-hidden cursor-crosshair">
        <canvas ref={canvasRef} onClick={handleCanvasClick} style={{ width: "100%", height, display: "block" }} />

        {selectableLocation && !pinnedLocation && (
          <div className="position-absolute top-0 start-50 translate-middle-x mt-2 badge bg-primary px-3 py-2 shadow opacity-90">
            Click anywhere on Coimbatore map to pin location
          </div>
        )}
      </div>

      <div className="card-footer bg-black border-top border-secondary py-2 px-3 d-flex flex-wrap justify-content-between align-items-center text-muted small">
        <div className="d-flex align-items-center gap-3" style={{ fontSize: "11px" }}>
          <span className="d-flex align-items-center gap-1">
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#e11d48" }}></span> Critical
          </span>
          <span className="d-flex align-items-center gap-1">
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#d97706" }}></span> Moderate
          </span>
          <span className="d-flex align-items-center gap-1">
            <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#16a34a" }}></span> Resolved
          </span>
        </div>
        <span style={{ fontSize: "10px" }} className="text-secondary font-monospace">
          Coimbatore Spatial Engine (11.0168° N, 76.9558° E)
        </span>
      </div>
    </div>
  );
}

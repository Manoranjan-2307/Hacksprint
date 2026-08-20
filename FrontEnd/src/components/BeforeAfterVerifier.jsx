import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, RefreshCw, Sparkles, ShieldCheck, FileText } from "lucide-react";
import { verifyResolutionCV } from "../utils/cvEngine";

/**
 * BeforeAfterVerifier Component
 * Signature Feature of Geo-Vision: Resolution Verification Loop
 * CV engine compares Before & After photos to prevent false "Resolved" ticket closures.
 */
export default function BeforeAfterVerifier({
  ticket,
  onResolveComplete,
  isOfficer = true,
}) {
  const [afterImage, setAfterImage] = useState(ticket?.afterImage || "");
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(
    ticket?.resolutionVerification || null
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setAfterImage(event.target.result);
      setVerificationResult(null); // Reset until run
    };
    reader.readAsDataURL(file);
  };

  const handleRunVerification = async () => {
    if (!afterImage) return;
    setVerifying(true);

    try {
      const result = await verifyResolutionCV(ticket.beforeImage, afterImage, ticket.category);
      setVerificationResult(result);
      if (onResolveComplete) {
        onResolveComplete({ afterImage, verification: result });
      }
    } catch (err) {
      console.error("Verification error:", err);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-3 overflow-hidden bg-white mb-4">
      <div className="card-header bg-gradient text-white py-3 px-4 d-flex justify-content-between align-items-center"
           style={{ backgroundColor: "#0f172a" }}>
        <div className="d-flex align-items-center gap-2">
          <ShieldCheck className="text-warning" size={22} />
          <div>
            <h6 className="mb-0 fw-bold">CV Resolution Verification Loop</h6>
            <small className="text-white-50" style={{ fontSize: "11px" }}>
              Automated Before/After Surface & Residue Clearance Analysis
            </small>
          </div>
        </div>
        {verificationResult?.verified && (
          <span className="badge bg-success px-3 py-2 fs-7 d-flex align-items-center gap-1">
            <CheckCircle2 size={16} /> Resolution Confirmed
          </span>
        )}
        {verificationResult && !verificationResult.verified && (
          <span className="badge bg-danger px-3 py-2 fs-7 d-flex align-items-center gap-1">
            <AlertTriangle size={16} /> Audit Flagged
          </span>
        )}
      </div>

      <div className="card-body p-4">
        {/* Side-by-side image comparison */}
        <div className="row g-3 mb-4">
          {/* Before Photo */}
          <div className="col-md-6">
            <div className="border rounded p-2 text-center bg-light">
              <div className="d-flex justify-content-between align-items-center mb-2 px-1">
                <span className="badge bg-secondary">BEFORE REPAIR</span>
                <small className="text-muted">{ticket?.reportedAt ? new Date(ticket.reportedAt).toLocaleDateString() : "Citizen Upload"}</small>
              </div>
              <div className="overflow-hidden rounded" style={{ height: "200px" }}>
                <img
                  src={ticket?.beforeImage || "https://via.placeholder.com/400x250?text=Before+Photo"}
                  alt="Before Repair"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
          </div>

          {/* After Photo */}
          <div className="col-md-6">
            <div className="border rounded p-2 text-center bg-light">
              <div className="d-flex justify-content-between align-items-center mb-2 px-1">
                <span className="badge bg-primary">AFTER REPAIR</span>
                {afterImage ? (
                  <small className="text-success fw-semibold">Photo Loaded</small>
                ) : (
                  <small className="text-muted">Officer Verification Photo Required</small>
                )}
              </div>
              
              <div className="overflow-hidden rounded bg-white border d-flex align-items-center justify-content-center"
                   style={{ height: "200px" }}>
                {afterImage ? (
                  <img
                    src={afterImage}
                    alt="After Repair"
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <div className="text-center p-3">
                    <Sparkles className="text-muted mb-2 opacity-50" size={32} />
                    <p className="text-muted small mb-2">Upload Same-Angle After Photo</p>
                    {isOfficer && (
                      <label className="btn btn-sm btn-outline-primary cursor-pointer mb-0">
                        Choose Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="d-none"
                          onChange={handleFileUpload}
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>

              {isOfficer && afterImage && (
                <div className="mt-2 d-flex justify-content-between">
                  <label className="btn btn-sm btn-link text-decoration-none text-muted p-0">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="d-none"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <button
                    onClick={() => {
                      // Load sample solved image
                      setAfterImage("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80");
                      setVerificationResult(null);
                    }}
                    className="btn btn-sm btn-link text-decoration-none p-0 text-primary"
                  >
                    Use Sample Verified Fixed Photo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button for Officer */}
        {isOfficer && afterImage && !verificationResult && (
          <div className="text-center mb-4">
            <button
              onClick={handleRunVerification}
              disabled={verifying}
              className="btn btn-gradient-primary btn-lg px-4 py-2 fw-bold text-white shadow-sm"
              style={{ background: "linear-gradient(135deg, #0284c7, #0f172a)" }}
            >
              {verifying ? (
                <>
                  <RefreshCw className="spin me-2" size={18} />
                  Running Computer Vision Verification...
                </>
              ) : (
                <>
                  <Sparkles className="me-2" size={18} />
                  Run Resolution Verification Loop
                </>
              )}
            </button>
          </div>
        )}

        {/* Verification Result Output */}
        {verificationResult && (
          <div className={`p-3 rounded-3 border ${
            verificationResult.verified ? "bg-success bg-opacity-10 border-success" : "bg-danger bg-opacity-10 border-danger"
          }`}>
            <div className="d-flex align-items-start gap-3">
              {verificationResult.verified ? (
                <CheckCircle2 className="text-success flex-shrink-0 mt-1" size={28} />
              ) : (
                <AlertTriangle className="text-danger flex-shrink-0 mt-1" size={28} />
              )}
              
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className={`fw-bold mb-1 ${verificationResult.verified ? "text-success" : "text-danger"}`}>
                    {verificationResult.verified ? "Resolution Verified & Matched" : "Verification Failed: Audit Flagged"}
                  </h6>
                  <span className="badge bg-dark">
                    Site Restoration: {verificationResult.visualMatchPercent || 0}%
                  </span>
                </div>
                <p className="small mb-2 text-dark">
                  {verificationResult.reasoning}
                </p>
                <div className="d-flex gap-3 small text-muted font-monospace" style={{ fontSize: "11px" }}>
                  <span>Clearance Score: {(verificationResult.clearanceScore * 100).toFixed(0)}%</span>
                  <span>Tamper Check: {verificationResult.tamperFlag ? "FAILED (Identical photo detected)" : "PASSED"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

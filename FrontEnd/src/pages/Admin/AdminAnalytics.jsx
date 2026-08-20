import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Grid,
  Stack,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const STORAGE_KEY = "campusiq_faq_drafts";

const facultyList = [
  { id: "FAC001", name: "Dr. Arun Kumar", dept: "Associate Professor (AIDS)" },
  { id: "FAC002", name: "Dr. Sathishkumar", dept: "Professor (CSE)" },
];

const defaultInitialDrafts = [
  {
    id: "f1",
    question: "How to apply for On-Duty (OD) permission for college events?",
    answer: "Students must submit the OD application form through the ERP portal at least 2 days prior to the event. Approval requires verification from the Faculty Coordinator and HOD.",
    department: "AD",
    facultySubmitter: "Dr. Arun Kumar (AD)",
    submittedDate: "Today at 09:30 AM",
    status: "Pending Review",
    assignedFaculty: "Dr. Arun Kumar",
  },
  {
    id: "f2",
    question: "What is the procedure for semester exam re-evaluation?",
    answer: "Re-evaluation applications can be filed within 7 days of result publication via the Controller of Examinations portal with a fee of ₹500 per subject.",
    department: "CSE",
    facultySubmitter: "Dr. Sathishkumar (CSE)",
    submittedDate: "Yesterday at 04:15 PM",
    status: "Pending Review",
    assignedFaculty: "Dr. Sathishkumar",
  },
  {
    id: "f3",
    question: "What are the rules for GPU lab access in evening hours?",
    answer: "High-performance AI GPU labs remain open till 10:00 PM for AD department project work.",
    department: "AD",
    facultySubmitter: "Unassigned Student Query",
    submittedDate: "12 Aug 2026",
    status: "Unassigned",
    assignedFaculty: null,
  },
];

export default function AdminAnalytics() {
  const [drafts, setDrafts] = useState([]);
  const [publishedCount, setPublishedCount] = useState(1102);

  // Assign Faculty Dialog State
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState(null);
  const [selectedFacultyId, setSelectedFacultyId] = useState("FAC001");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setDrafts(JSON.parse(saved));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInitialDrafts));
        setDrafts(defaultInitialDrafts);
      }
    } catch (e) {
      setDrafts(defaultInitialDrafts);
    }
  }, []);

  const handleOpenAssignModal = (id) => {
    setSelectedFaqId(id);
    setOpenAssignModal(true);
  };

  const handleConfirmAssignFaculty = () => {
    const chosenFaculty = facultyList.find((f) => f.id === selectedFacultyId);
    if (!chosenFaculty || !selectedFaqId) return;

    const updated = drafts.map((d) => {
      if (d.id === selectedFaqId) {
        return {
          ...d,
          assignedFaculty: `${chosenFaculty.name} (${chosenFaculty.id})`,
          status: `Assigned: ${chosenFaculty.name} (${chosenFaculty.id})`,
        };
      }
      return d;
    });

    setDrafts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setOpenAssignModal(false);
    setToastMsg(`Assigned FAQ query to ${chosenFaculty.name} (ID: ${chosenFaculty.id}) for answering!`);
    setToastOpen(true);
  };

  const handleApprove = (id, question) => {
    const updated = drafts.map((d) => (d.id === id ? { ...d, status: "Approved & Published" } : d));
    setDrafts(updated);
    setPublishedCount((prev) => prev + 1);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setToastMsg(`Approved & Published: "${question}". FAISS Vector Database re-indexed!`);
    setToastOpen(true);
  };

  const handleReject = (id, question) => {
    const updated = drafts.map((d) => (d.id === id ? { ...d, status: "Rejected" } : d));
    setDrafts(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setToastMsg(`Rejected draft query: "${question}". Returned to faculty.`);
    setToastOpen(true);
  };

  const pendingCount = drafts.filter((d) => d.status.includes("Pending") || d.status.includes("Assigned") || d.status === "Unassigned").length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        pt: "115px",
        pb: 4,
        pl: { xs: 2, md: "116px" },
        pr: { xs: 2, md: 3 },
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <Box sx={{ maxWidth: "1150px", mx: "auto" }}>
        {/* Header Banner */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 2.5,
            borderRadius: "18px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                bgcolor: "rgba(139, 92, 246, 0.12)",
                color: "#8B5CF6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <QuizIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}>
                FAQ Knowledge Base & Faculty Assignment
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Assign faculty members to answer FAQs, review faculty submitted drafts, and approve vector store publishing
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Overview Stats Bar */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", borderLeft: "4px solid #8B5CF6" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                  Pending & Assigned FAQs
                </Typography>
                <PendingActionsIcon sx={{ color: "#8B5CF6" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#8B5CF6", my: 0.5 }}>
                {pendingCount}
              </Typography>
              <Typography sx={{ color: "#475569", fontSize: "0.8rem" }}>Assigned to Dr. Arun Kumar & Dr. Sathishkumar</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", borderLeft: "4px solid #16A34A" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                  Published Live FAQs
                </Typography>
                <CheckCircleIcon sx={{ color: "#16A34A" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#166534", my: 0.5 }}>
                {publishedCount}
              </Typography>
              <Typography sx={{ color: "#475569", fontSize: "0.8rem" }}>Active in FAISS vector store for AI search</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Pending Draft & Faculty Assignment List */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 2 }}>
          FAQ Review & Faculty Assignment Pipeline
        </Typography>

        <Stack spacing={2}>
          {drafts.map((item) => {
            const isPending = item.status.includes("Pending") || item.status.includes("Assigned") || item.status === "Unassigned";
            const isPublished = item.status.includes("Approved") || item.status === "Published";

            return (
              <Paper
                key={item.id}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "18px",
                  bgcolor: "#FFFFFF",
                  border: isPending ? "1.5px solid #8B5CF6" : "1px solid #E2E8F0",
                  boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, flexWrap: "wrap", mb: 1.5 }}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                      <Chip label={item.department || "AD"} size="small" sx={{ bgcolor: "#EEF2FF", color: "#4338CA", fontWeight: 700, fontSize: "0.75rem" }} />
                      {item.assignedFaculty && (
                        <Chip
                          icon={<AssignmentIndIcon style={{ color: "#0284C7", fontSize: 14 }} />}
                          label={`Assigned: ${item.assignedFaculty}`}
                          size="small"
                          sx={{ bgcolor: "#E0F2FE", color: "#0369A1", fontWeight: 700, fontSize: "0.75rem" }}
                        />
                      )}
                      <Typography sx={{ color: "#64748B", fontSize: "0.8rem" }}>
                        Submitted by: <strong>{item.facultySubmitter || "Faculty"}</strong> • {item.submittedDate}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.1rem" }}>
                      Q: {item.question}
                    </Typography>
                  </Box>

                  <Chip
                    label={item.status}
                    sx={{
                      bgcolor: isPending ? "#FEF3C7" : isPublished ? "#DCFCE7" : "#FEE2E2",
                      color: isPending ? "#92400E" : isPublished ? "#166534" : "#991B1B",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      borderRadius: "999px",
                      px: 0.5,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    color: "#334155",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    mb: 2,
                    bgcolor: "#F8FAFC",
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <strong>Answer Draft:</strong> {item.answer}
                </Typography>

                <Divider sx={{ mb: 2, borderColor: "#E2E8F0" }} />

                {isPending ? (
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, flexWrap: "wrap" }}>
                    <Button
                      variant="outlined"
                      startIcon={<AssignmentIndIcon />}
                      onClick={() => handleOpenAssignModal(item.id)}
                      sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, px: 2.5, color: "#0EA5E9", borderColor: "#BAE6FD" }}
                    >
                      Assign Faculty
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={() => handleReject(item.id, item.question)}
                      sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 700, px: 2.5 }}
                    >
                      Reject Draft
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => handleApprove(item.id, item.question)}
                      sx={{ bgcolor: "#8B5CF6", color: "#FFF", borderRadius: "12px", textTransform: "none", fontWeight: 700, px: 3, "&:hover": { bgcolor: "#7C3AED" } }}
                    >
                      Approve & Publish FAQ
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: isPublished ? "#166534" : "#991B1B" }}>
                    <MenuBookIcon fontSize="small" />
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 700 }}>
                      {isPublished ? "FAQ Published & Synced to Vector Store" : "Draft Rejected & Returned to Faculty"}
                    </Typography>
                  </Box>
                )}
              </Paper>
            );
          })}
        </Stack>

        {/* Assign Faculty Dialog */}
        <Dialog open={openAssignModal} onClose={() => setOpenAssignModal(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}>
          <DialogTitle sx={{ fontWeight: 800, color: "#0F172A" }}>Assign Faculty Member for FAQ</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: "#64748B", fontSize: "0.875rem", mb: 2 }}>
              Select a faculty expert to review and answer this student FAQ query:
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Select Faculty Member</InputLabel>
              <Select
                value={selectedFacultyId}
                label="Select Faculty Member"
                onChange={(e) => setSelectedFacultyId(e.target.value)}
                sx={{ borderRadius: "12px" }}
              >
                {facultyList.map((f) => (
                  <MenuItem key={f.id} value={f.id}>
                    <strong>{f.name}</strong> &nbsp;(ID: {f.id}) — {f.dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOpenAssignModal(false)} sx={{ color: "#64748B" }}>Cancel</Button>
            <Button variant="contained" onClick={handleConfirmAssignFaculty} sx={{ bgcolor: "#8B5CF6", fontWeight: 700, borderRadius: "10px", "&:hover": { bgcolor: "#7C3AED" } }}>
              Confirm Assignment
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={toastOpen} autoHideDuration={4500} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ borderRadius: "12px", fontWeight: 600 }}>
            {toastMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
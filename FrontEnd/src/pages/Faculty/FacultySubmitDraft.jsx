import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SendIcon from "@mui/icons-material/Send";
import SchemaIcon from "@mui/icons-material/Schema";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const STORAGE_KEY = "campusiq_faq_drafts";

const defaultInitialDrafts = [
  {
    id: "f1",
    question: "How to apply for On-Duty (OD) permission for college events?",
    answer: "Students must submit the OD application form through the ERP portal at least 2 days prior to the event. Approval requires verification from the Faculty Coordinator and HOD.",
    category: "Student Services",
    department: "CSE",
    facultySubmitter: "Dr. Arun Kumar (HOD CSE)",
    submittedDate: "Today at 09:30 AM",
    status: "Pending Review",
  },
  {
    id: "d101",
    question: "How to apply OD?",
    answer: "Students can apply OD through the ERP portal with supporting documents.",
    category: "Student Services",
    department: "CSE",
    facultySubmitter: "Dr. Arun Kumar (Prof. CSE)",
    submittedDate: "Today at 09:30 AM",
    status: "Pending Admin Approval",
  },
  {
    id: "d102",
    question: "What is the minimum attendance required for lab practicals?",
    answer: "Minimum 80% attendance is mandatory in lab practicals as per CSE department policy.",
    category: "Academics",
    department: "CSE",
    facultySubmitter: "Dr. Arun Kumar (Prof. CSE)",
    submittedDate: "12 Aug 2026",
    status: "Approved & Published",
  },
];

export default function FacultySubmitDraft() {
  const location = useLocation();
  const initialQ = location.state?.initialQuestion || "";
  const initialCat = location.state?.initialCategory || "Student Services";

  const [question, setQuestion] = useState(initialQ || "How to apply OD?");
  const [answer, setAnswer] = useState(
    initialQ
      ? ""
      : "Students can apply OD through the ERP portal with supporting documents."
  );
  const [category, setCategory] = useState(initialCat);
  const [department] = useState("CSE");
  const [submittedDrafts, setSubmittedDrafts] = useState([]);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSubmittedDrafts(JSON.parse(saved));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInitialDrafts));
        setSubmittedDrafts(defaultInitialDrafts);
      }
    } catch (e) {
      setSubmittedDrafts(defaultInitialDrafts);
    }
  }, []);

  const handleSubmitDraft = (e) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      setToastMsg("Please fill out both Question and Answer fields.");
      setToastOpen(true);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("campusiq_user") || "null");
    const facultyName = storedUser?.name || "Dr. Arun Kumar";

    const newDraft = {
      id: "draft_" + Date.now(),
      question: question.trim(),
      answer: answer.trim(),
      category,
      department,
      facultySubmitter: `${facultyName} (CSE)`,
      submittedDate: "Just now",
      status: "Pending Admin Approval",
    };

    const updatedList = [newDraft, ...submittedDrafts];
    setSubmittedDrafts(updatedList);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (err) {
      console.error("Error saving draft to storage:", err);
    }

    setQuestion("");
    setAnswer("");
    setSubmittedSuccess(true);
    setToastMsg("Success! FAQ Draft sent for Admin Review & Approval.");
    setToastOpen(true);
  };

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
              <PostAddIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}>
                FAQ Draft Creation & Submission
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Compose official FAQ answers for CSE students and submit to Admin for RAG vector store publishing
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Stack spacing={3}>
          {submittedSuccess && (
            <Alert
              icon={<CheckCircleOutlineIcon fontSize="inherit" />}
              severity="success"
              onClose={() => setSubmittedSuccess(false)}
              sx={{ borderRadius: "14px", fontWeight: 700, fontSize: "0.95rem" }}
            >
              FAQ Draft Submitted! Sent to Admin FAQ Approvals queue for review and vector DB sync.
            </Alert>
          )}

          {/* FAQ Draft Form Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: "18px",
              bgcolor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 2 }}>
              Compose New FAQ Answer Draft
            </Typography>

            <Box component="form" onSubmit={handleSubmitDraft}>
              <Stack spacing={2.2}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Box sx={{ flex: 1, minWidth: "220px" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{ borderRadius: "12px", bgcolor: "#F8FAFC" }}
                      >
                        <MenuItem value="Student Services">Student Services (OD / Leave)</MenuItem>
                        <MenuItem value="Academics">Academics (Attendance & Exams)</MenuItem>
                        <MenuItem value="Course Registration">Course Registration</MenuItem>
                        <MenuItem value="Placement">Placement & Training</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ flex: 1, minWidth: "220px" }}>
                    <TextField
                      label="Department"
                      size="small"
                      fullWidth
                      value={department}
                      InputProps={{ readOnly: true }}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#F1F5F9" } }}
                    />
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  size="small"
                  label="Question"
                  placeholder="e.g. How to apply OD?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#F8FAFC" } }}
                />

                <TextField
                  multiline
                  rows={3.5}
                  fullWidth
                  label="Official Answer Details"
                  placeholder="Write clear, step-by-step guidance for students..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#F8FAFC" } }}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SendIcon />}
                    sx={{
                      bgcolor: "#8B5CF6",
                      color: "#FFFFFF",
                      borderRadius: "12px",
                      px: 3.5,
                      py: 1.1,
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "0.95rem",
                      boxShadow: "0 6px 16px rgba(139, 92, 246, 0.25)",
                      "&:hover": { bgcolor: "#7C3AED" },
                    }}
                  >
                    Send for Admin Approval
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Paper>

          {/* Admin Approval Flow Pipeline Banner */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: "18px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <SchemaIcon sx={{ color: "#8B5CF6" }} />
              <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>
                Admin Approval Workflow Pipeline
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} divider={<Typography sx={{ color: "#CBD5E1" }}>→</Typography>}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: "#8B5CF6", fontWeight: 700, fontSize: "0.75rem" }}>1. FACULTY</Typography>
                <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.85rem" }}>Creates FAQ Draft</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: "#8B5CF6", fontWeight: 700, fontSize: "0.75rem" }}>2. ADMIN</Typography>
                <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.85rem" }}>Reviews & Approves</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: "#8B5CF6", fontWeight: 700, fontSize: "0.75rem" }}>3. VECTOR DB</Typography>
                <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.85rem" }}>FAISS Knowledge Sync</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: "#8B5CF6", fontWeight: 700, fontSize: "0.75rem" }}>4. AI BOT</Typography>
                <Typography sx={{ color: "#166534", fontWeight: 700, fontSize: "0.85rem" }}>Provides Better Answers</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Submitted Drafts History List */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: "18px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <HistoryEduIcon sx={{ color: "#8B5CF6" }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.1rem" }}>
                Submitted FAQ Drafts History
              </Typography>
            </Box>

            <Stack spacing={2}>
              {submittedDrafts.map((row) => (
                <Box key={row.id} sx={{ p: 2, borderRadius: "12px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>
                      Q: {row.question}
                    </Typography>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor: row.status.includes("Approved")
                          ? "#DCFCE7"
                          : row.status.includes("Rejected")
                          ? "#FEE2E2"
                          : "#FEF3C7",
                        color: row.status.includes("Approved")
                          ? "#166534"
                          : row.status.includes("Rejected")
                          ? "#991B1B"
                          : "#92400E",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>
                  <Typography sx={{ color: "#475569", fontSize: "0.875rem", mb: 0.8 }}>
                    <strong>A:</strong> {row.answer}
                  </Typography>
                  <Typography sx={{ color: "#64748B", fontSize: "0.775rem" }}>
                    Category: {row.category || "General"} • Submitted: {row.submittedDate}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>

        <Snackbar
          open={toastOpen}
          autoHideDuration={4500}
          onClose={() => setToastOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ borderRadius: "12px", fontWeight: 600 }}>
            {toastMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

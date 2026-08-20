import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PostAddIcon from "@mui/icons-material/PostAdd";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const STORAGE_KEY = "campusiq_faq_drafts";

const defaultLowConfidenceQueries = [
  {
    id: "lc1",
    studentQuery: "How to apply OD?",
    confidence: "42%",
    askedCount: 18,
    category: "Student Services / OD",
    department: "AD",
    status: "Needs Review",
    assignedTo: "Dr. Arun Kumar",
  },
  {
    id: "lc2",
    studentQuery: "What is the lab attendance condonation procedure for AI & Data Science?",
    confidence: "48%",
    askedCount: 14,
    category: "Academics",
    department: "AD",
    status: "Needs Review",
    assignedTo: "Dr. Arun Kumar",
  },
  {
    id: "lc3",
    studentQuery: "Where to submit fast-track semester course registration forms?",
    confidence: "51%",
    askedCount: 11,
    category: "Course Registration",
    department: "CSE",
    status: "Needs Review",
    assignedTo: "Dr. Sathishkumar",
  },
];

export default function FacultyLowConfidence() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("campusiq_user") || "null");

  const facultyName = storedUser?.name || "Dr. Arun Kumar";
  const facultyDept = storedUser?.dept || "Artificial Intelligence and Data Science";

  const [queries, setQueries] = useState(defaultLowConfidenceQueries);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter queries assigned to this faculty member or matching department
        const assignedItems = parsed.filter(
          (item) =>
            item.assignedFaculty === facultyName ||
            item.facultySubmitter?.includes(facultyName) ||
            item.department === (facultyDept.includes("Data") ? "AD" : "CSE")
        );
        if (assignedItems.length > 0) {
          setQueries(
            assignedItems.map((item) => ({
              id: item.id,
              studentQuery: item.question,
              confidence: "45%",
              askedCount: 12,
              category: item.category || "Academic",
              department: item.department || "AD",
              status: item.status,
              assignedTo: item.assignedFaculty || facultyName,
            }))
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [facultyName, facultyDept]);

  const handleCreateDraft = (queryText, category) => {
    navigate("/faculty/draft", { state: { initialQuestion: queryText, initialCategory: category } });
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
                bgcolor: "rgba(239, 68, 68, 0.12)",
                color: "#EF4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WarningAmberIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}>
                Assigned FAQ Queries Review ({facultyName})
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Review unanswered student questions assigned to you by Admin for expert answering ({facultyDept})
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Stack spacing={2}>
          {queries.map((item) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderLeft: "4px solid #EF4444",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, flexWrap: "wrap", mb: 1.5 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
                    <Chip label={`AI Confidence: ${item.confidence}`} size="small" sx={{ bgcolor: "#FEE2E2", color: "#991B1B", fontWeight: 800, fontSize: "0.75rem" }} />
                    <Chip
                      icon={<AssignmentIndIcon style={{ color: "#0369A1", fontSize: 14 }} />}
                      label={`Assigned to: ${item.assignedTo || facultyName}`}
                      size="small"
                      sx={{ bgcolor: "#E0F2FE", color: "#0369A1", fontWeight: 700, fontSize: "0.75rem" }}
                    />
                    <Chip label={item.category} size="small" sx={{ bgcolor: "#EEF2FF", color: "#4338CA", fontWeight: 700, fontSize: "0.75rem" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.15rem" }}>
                    "{item.studentQuery}"
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<PostAddIcon />}
                  onClick={() => handleCreateDraft(item.studentQuery, item.category)}
                  sx={{
                    bgcolor: "#8B5CF6",
                    color: "#FFF",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 2.5,
                    py: 0.9,
                    "&:hover": { bgcolor: "#7C3AED" },
                  }}
                >
                  Answer & Submit Draft
                </Button>
              </Box>

              <Divider sx={{ my: 1.5, borderColor: "#E2E8F0" }} />

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#64748B" }}>
                <HelpOutlineIcon fontSize="small" sx={{ color: "#EF4444" }} />
                <Typography sx={{ fontSize: "0.85rem", color: "#475569" }}>
                  <strong>Admin Note:</strong> Assigned to {facultyName} for faculty expert review and vector knowledge base update.
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

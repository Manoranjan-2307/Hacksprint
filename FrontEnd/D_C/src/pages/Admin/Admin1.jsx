import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/Quiz";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchemaIcon from "@mui/icons-material/Schema";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Admin1() {
  const navigate = useNavigate();

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
        {/* Top Control Panel Header Banner */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: "18px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "14px",
                  bgcolor: "rgba(139, 92, 246, 0.12)",
                  color: "#8B5CF6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AdminPanelSettingsIcon fontSize="large" />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0F172A",
                    fontWeight: 800,
                    fontSize: "1.6rem",
                    lineHeight: 1.2,
                  }}
                >
                  AskBIT Admin Control Panel
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748B", mt: 0.3 }}>
                  Complete System Controller • RBAC Permission: Full Access across All Departments
                </Typography>
              </Box>
            </Box>

            <Chip
              icon={<CheckCircleIcon style={{ color: "#166534", fontSize: 16 }} />}
              label="System Operational"
              sx={{
                bgcolor: "#DCFCE7",
                color: "#166534",
                fontWeight: 700,
                fontSize: "0.825rem",
                borderRadius: "999px",
                px: 1,
              }}
            />
          </Box>
        </Paper>

        {/* 4 Primary System Overview Metrics Cards */}
        <Grid container spacing={2.5} alignItems="stretch" sx={{ mb: 3.5 }}>
          {/* Total Users */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderLeft: "4px solid #4F46E5",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                  Total Users
                </Typography>
                <PeopleIcon sx={{ color: "#4F46E5" }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#0F172A", mb: 0.5 }}>
                  5,842
                </Typography>
                <Typography sx={{ color: "#475569", fontSize: "0.775rem", fontWeight: 600 }}>
                  Students: <strong>5,200</strong> | Faculty: <strong>500</strong>
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* FAQs Knowledge Base */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderLeft: "4px solid #0EA5E9",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                  Knowledge FAQs
                </Typography>
                <QuizIcon sx={{ color: "#0EA5E9" }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#0F172A", mb: 0.5 }}>
                  1,226
                </Typography>
                <Typography sx={{ color: "#475569", fontSize: "0.775rem", fontWeight: 600 }}>
                  Published: <strong>1,102</strong> | Drafts: <strong>124</strong>
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* AI Accuracy */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderLeft: "4px solid #16A34A",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                  AI Accuracy
                </Typography>
                <PrecisionManufacturingIcon sx={{ color: "#16A34A" }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#166534", mb: 0.5 }}>
                  92%
                </Typography>
                <Typography sx={{ color: "#475569", fontSize: "0.775rem", fontWeight: 600 }}>
                  High Confidence Verified Queries
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Pending Approvals */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderLeft: "4px solid #8B5CF6",
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.02)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                  Pending Approvals
                </Typography>
                <PendingActionsIcon sx={{ color: "#8B5CF6" }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#8B5CF6", mb: 0.5 }}>
                  24
                </Typography>
                <Typography sx={{ color: "#475569", fontSize: "0.775rem", fontWeight: 600 }}>
                  Faculty Drafts awaiting review
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* 4 Admin Module Workflow Action Cards */}
        <Typography variant="h6" sx={{ color: "#0F172A", fontWeight: 800, mb: 2 }}>
          Admin Workflow Modules
        </Typography>

        <Grid container spacing={2.5} alignItems="stretch" sx={{ mb: 4 }}>
          {/* User Management */}
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, boxShadow 0.2s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)" },
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <PeopleIcon sx={{ color: "#4F46E5", fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0F172A" }}>
                    1. User Management
                  </Typography>
                </Box>
                <Typography sx={{ color: "#475569", fontSize: "0.9rem", mb: 2.5, lineHeight: 1.5 }}>
                  Create student/faculty/admin accounts, assign RBAC roles, activate or disable user access, and filter users by department.
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate("/admin2")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#4F46E5",
                  color: "#FFF",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2.5,
                  py: 0.9,
                  alignSelf: "flex-start",
                  "&:hover": { bgcolor: "#4338CA" },
                }}
              >
                Open User Management
              </Button>
            </Paper>
          </Grid>

          {/* FAQ Knowledge Base Management */}
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, boxShadow 0.2s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)" },
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <QuizIcon sx={{ color: "#8B5CF6", fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0F172A" }}>
                    2. FAQ Knowledge Base & Approvals
                  </Typography>
                </Box>
                <Typography sx={{ color: "#475569", fontSize: "0.9rem", mb: 2.5, lineHeight: 1.5 }}>
                  Review 24 pending faculty FAQ drafts, check accuracy, approve or reject entries, and automatically refresh the vector store.
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate("/admin3")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#8B5CF6",
                  color: "#FFF",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2.5,
                  py: 0.9,
                  alignSelf: "flex-start",
                  "&:hover": { bgcolor: "#7C3AED" },
                }}
              >
                Review Pending FAQs ({24})
              </Button>
            </Paper>
          </Grid>

          {/* Analytics Monitoring */}
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, boxShadow 0.2s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)" },
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <AnalyticsIcon sx={{ color: "#0EA5E9", fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0F172A" }}>
                    3. System Analytics Monitoring
                  </Typography>
                </Box>
                <Typography sx={{ color: "#475569", fontSize: "0.9rem", mb: 2.5, lineHeight: 1.5 }}>
                  Track 50,000 total queries, analyze top trending student topics (Attendance, Exams, Fees), and monitor department usage.
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate("/admin3_1")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#0EA5E9",
                  color: "#FFF",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2.5,
                  py: 0.9,
                  alignSelf: "flex-start",
                  "&:hover": { bgcolor: "#0284C7" },
                }}
              >
                View Analytics Reports
              </Button>
            </Paper>
          </Grid>

          {/* AI Model & RAG Settings */}
          <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, boxShadow 0.2s ease",
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)" },
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <SettingsSuggestIcon sx={{ color: "#16A34A", fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0F172A" }}>
                    4. AI Model & RAG Settings
                  </Typography>
                </Box>
                <Typography sx={{ color: "#475569", fontSize: "0.9rem", mb: 2.5, lineHeight: 1.5 }}>
                  Configure Sentence Transformer embeddings, FAISS vector database parameters, similarity thresholds (0.75), and re-index datasets.
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate("/admin3_2")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#16A34A",
                  color: "#FFF",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2.5,
                  py: 0.9,
                  alignSelf: "flex-start",
                  "&:hover": { bgcolor: "#15803D" },
                }}
              >
                Configure RAG System
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* System Monitoring Workflow Diagram Banner */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "18px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <SchemaIcon sx={{ color: "#8B5CF6" }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.1rem" }}>
              Continuous AI Improvement Pipeline
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} divider={<Divider orientation="vertical" flexItem />}>
            <Box sx={{ flex: 1, p: 1 }}>
              <Typography sx={{ color: "#8B5CF6", fontWeight: 700, fontSize: "0.825rem" }}>STEP 1</Typography>
              <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>User Questions</Typography>
              <Typography sx={{ color: "#64748B", fontSize: "0.8rem", mt: 0.3 }}>Students ask handbook queries</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 1 }}>
              <Typography sx={{ color: "#8B5CF6", fontWeight: 700, fontSize: "0.825rem" }}>STEP 2</Typography>
              <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>Confidence Detection</Typography>
              <Typography sx={{ color: "#64748B", fontSize: "0.8rem", mt: 0.3 }}>Flags low confidence responses</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 1 }}>
              <Typography sx={{ color: "#8B5CF6", fontWeight: 700, fontSize: "0.825rem" }}>STEP 3</Typography>
              <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>Faculty & Admin Approval</Typography>
              <Typography sx={{ color: "#64748B", fontSize: "0.8rem", mt: 0.3 }}>Draft review and accuracy check</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 1 }}>
              <Typography sx={{ color: "#8B5CF6", fontWeight: 700, fontSize: "0.825rem" }}>STEP 4</Typography>
              <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>Vector DB Refresh</Typography>
              <Typography sx={{ color: "#64748B", fontSize: "0.8rem", mt: 0.3 }}>Re-indexes FAISS knowledge base</Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

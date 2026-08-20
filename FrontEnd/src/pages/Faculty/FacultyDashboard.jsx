import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PeopleIcon from "@mui/icons-material/People";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const [facultyName, setFacultyName] = useState("Dr. Arun Kumar");
  const [facultyDept, setFacultyDept] = useState("Artificial Intelligence and Data Science (AIDS)");
  const [facultyDeptCode, setFacultyDeptCode] = useState("AIDS");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("campusiq_user");
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        if (userObj.name) setFacultyName(userObj.name);
        if (userObj.dept) {
          setFacultyDept(userObj.dept);
          if (userObj.dept.includes("CSE") || userObj.dept.includes("Computer Science")) {
            setFacultyDeptCode("CSE");
          } else {
            setFacultyDeptCode("AIDS");
          }
        }
      }
    } catch (e) {
      console.warn("Could not read logged in faculty info:", e);
    }
  }, []);

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
        {/* Welcome Banner */}
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
                  width: 52,
                  height: 52,
                  borderRadius: "14px",
                  bgcolor: "rgba(139, 92, 246, 0.12)",
                  color: "#8B5CF6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SchoolIcon fontSize="large" />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}
                >
                  AskBIT Faculty Intelligence Dashboard
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748B", mt: 0.3 }}>
                  Welcome <strong>{facultyName}</strong> • Department of <strong>{facultyDept}</strong>
                </Typography>
              </Box>
            </Box>

            <Chip
              label={`${facultyDeptCode === "CSE" ? "Professor" : "Associate Professor"} • ${facultyDeptCode}`}
              sx={{
                bgcolor: "rgba(79, 70, 229, 0.1)",
                color: "#4338CA",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "999px",
                px: 1,
              }}
            />
          </Box>
        </Paper>

        {/* Core Metrics Grid - Equal Height Cards */}
        <Grid container spacing={2.5} alignItems="stretch" sx={{ mb: 3 }}>
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
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ color: "#64748B", fontSize: "0.775rem", fontWeight: 700, textTransform: "uppercase" }}>
                  Total Queries
                </Typography>
                <QuestionAnswerIcon sx={{ color: "#4F46E5", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#0F172A", my: 0.8 }}>
                  2,450
                </Typography>
                <Typography sx={{ color: "#16A34A", fontSize: "0.775rem", fontWeight: 700 }}>
                  +14.2% from last month
                </Typography>
              </Box>
            </Paper>
          </Grid>

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
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ color: "#64748B", fontSize: "0.775rem", fontWeight: 700, textTransform: "uppercase" }}>
                  Active Students
                </Typography>
                <PeopleIcon sx={{ color: "#0EA5E9", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#0F172A", my: 0.8 }}>
                  820
                </Typography>
                <Typography sx={{ color: "#64748B", fontSize: "0.775rem" }}>
                  {facultyDeptCode} Department
                </Typography>
              </Box>
            </Paper>
          </Grid>

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
                borderLeft: "4px solid #10B981",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ color: "#64748B", fontSize: "0.775rem", fontWeight: 700, textTransform: "uppercase" }}>
                  AI Search Accuracy
                </Typography>
                <PrecisionManufacturingIcon sx={{ color: "#10B981", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#0F172A", my: 0.8 }}>
                  92%
                </Typography>
                <Typography sx={{ color: "#16A34A", fontSize: "0.775rem", fontWeight: 700 }}>
                  High confidence threshold
                </Typography>
              </Box>
            </Paper>
          </Grid>

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
                borderLeft: "4px solid #EF4444",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ color: "#64748B", fontSize: "0.775rem", fontWeight: 700, textTransform: "uppercase" }}>
                  Assigned Low Confidence
                </Typography>
                <WarningAmberIcon sx={{ color: "#EF4444", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#EF4444", my: 0.8 }}>
                  3 Queries
                </Typography>
                <Typography sx={{ color: "#EF4444", fontSize: "0.775rem", fontWeight: 700 }}>
                  Assigned by Admin
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Quick Action Navigation Cards - Equal Height */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 2 }}>
          Faculty Intelligence Workflows
        </Typography>

        <Grid container spacing={2.5} alignItems="stretch">
          <Grid item xs={12} md={4} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              onClick={() => navigate("/faculty/queries")}
              sx={{
                p: 3,
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                  borderColor: "#EF4444",
                },
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ p: 1, borderRadius: "10px", bgcolor: "#FEE2E2", color: "#EF4444" }}>
                    <WarningAmberIcon />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.1rem" }}>
                    Assigned Low Confidence
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#64748B", mb: 2.5, lineHeight: 1.6 }}>
                  Review unanswered student questions assigned to you by Admin for {facultyDeptCode} department.
                </Typography>
              </Box>
              <Button endIcon={<ArrowForwardIcon />} sx={{ color: "#EF4444", fontWeight: 700, p: 0, textTransform: "none", alignSelf: "flex-start" }}>
                Review Assigned Queries
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              onClick={() => navigate("/faculty/draft")}
              sx={{
                p: 3,
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                  borderColor: "#8B5CF6",
                },
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ p: 1, borderRadius: "10px", bgcolor: "#EEF2FF", color: "#8B5CF6" }}>
                    <PostAddIcon />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.1rem" }}>
                    Submit FAQ Draft
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#64748B", mb: 2.5, lineHeight: 1.6 }}>
                  Compose official faculty answers and send them for Admin approval to update vector store.
                </Typography>
              </Box>
              <Button endIcon={<ArrowForwardIcon />} sx={{ color: "#8B5CF6", fontWeight: 700, p: 0, textTransform: "none", alignSelf: "flex-start" }}>
                Compose FAQ Draft
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              onClick={() => navigate("/faculty/analytics")}
              sx={{
                p: 3,
                width: "100%",
                height: "100%",
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                  borderColor: "#0EA5E9",
                },
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ p: 1, borderRadius: "10px", bgcolor: "#E0F2FE", color: "#0EA5E9" }}>
                    <AnalyticsIcon />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.1rem" }}>
                    Department Analytics
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#64748B", mb: 2.5, lineHeight: 1.6 }}>
                  Track student query volume trends, category breakdowns, and resolution speed.
                </Typography>
              </Box>
              <Button endIcon={<ArrowForwardIcon />} sx={{ color: "#0EA5E9", fontWeight: 700, p: 0, textTransform: "none", alignSelf: "flex-start" }}>
                View Analytics
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

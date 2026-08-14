import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CategoryIcon from "@mui/icons-material/Category";
import ApartmentIcon from "@mui/icons-material/Apartment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const topTopics = [
  { rank: 1, name: "Attendance Criteria & Regulations", count: "15,400", percent: 30.8, color: "#4F46E5" },
  { rank: 2, name: "Semester Exams & Re-evaluation", count: "12,100", percent: 24.2, color: "#0EA5E9" },
  { rank: 3, name: "Fee Payment & Due Dates", count: "9,800", percent: 19.6, color: "#8B5CF6" },
  { rank: 4, name: "Hostel Rules & Gate Timings", count: "7,200", percent: 14.4, color: "#16A34A" },
  { rank: 5, name: "Campus Placement Eligibility", count: "5,500", percent: 11.0, color: "#F59E0B" },
];

const deptComparison = [
  { dept: "CSE (Computer Science & Engg)", queries: 2450, totalShare: "38.9%", color: "#4F46E5" },
  { dept: "IT (Information Technology)", queries: 2100, totalShare: "33.3%", color: "#8B5CF6" },
  { dept: "ECE (Electronics & Comm Engg)", queries: 1800, totalShare: "28.5%", color: "#0EA5E9" },
  { dept: "MECH (Mechanical Engg)", queries: 1200, totalShare: "19.0%", color: "#F59E0B" },
];

export default function AdminQueries() {
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
                bgcolor: "rgba(14, 165, 233, 0.12)",
                color: "#0EA5E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AnalyticsIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}>
                System-Wide Analytics & Query Monitoring
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Monitor 50,000 total student queries, top trending academic topics, and department volume comparison
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Top Summary Metrics Cards */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", borderLeft: "4px solid #0EA5E9" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                  Total Queries Processed
                </Typography>
                <QuestionAnswerIcon sx={{ color: "#0EA5E9" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#0F172A", my: 0.5 }}>
                50,000
              </Typography>
              <Typography sx={{ color: "#166534", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5 }}>
                <TrendingUpIcon fontSize="small" /> +18.4% growth this month
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", borderLeft: "4px solid #8B5CF6" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                  Resolution Rate
                </Typography>
                <CategoryIcon sx={{ color: "#8B5CF6" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#8B5CF6", my: 0.5 }}>
                94.5%
              </Typography>
              <Typography sx={{ color: "#475569", fontSize: "0.8rem", fontWeight: 600 }}>Resolved by AI semantic search</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: "16px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", borderLeft: "4px solid #16A34A" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ color: "#64748B", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
                  Average Latency
                </Typography>
                <AnalyticsIcon sx={{ color: "#16A34A" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#166534", my: 0.5 }}>
                0.4 sec
              </Typography>
              <Typography sx={{ color: "#475569", fontSize: "0.8rem", fontWeight: 600 }}>Fast RAG vector retrieval time</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Most Asked Topics */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 2 }}>
                Most Asked Topics (Top 5 Breakdown)
              </Typography>

              <Stack spacing={2.5}>
                {topTopics.map((topic) => (
                  <Box key={topic.rank}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip
                          label={`#${topic.rank}`}
                          size="small"
                          sx={{ bgcolor: `${topic.color}15`, color: topic.color, fontWeight: 800, fontSize: "0.75rem", borderRadius: "6px" }}
                        />
                        <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>
                          {topic.name}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 700, color: topic.color, fontSize: "0.9rem" }}>
                        {topic.count} ({topic.percent}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={topic.percent * 2.5}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "#F1F5F9",
                        "& .MuiLinearProgress-bar": { bgcolor: topic.color, borderRadius: 4 },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Department Query Comparison */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <ApartmentIcon sx={{ color: "#4F46E5" }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.1rem" }}>
                  Department Query Volume
                </Typography>
              </Box>

              <Stack spacing={2} divider={<Divider />}>
                {deptComparison.map((item) => (
                  <Box key={item.dept} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem" }}>
                        {item.dept}
                      </Typography>
                      <Typography sx={{ color: "#64748B", fontSize: "0.775rem", mt: 0.2 }}>
                        Share: {item.totalShare} of student volume
                      </Typography>
                    </Box>

                    <Chip
                      label={`${item.queries} Queries`}
                      sx={{
                        bgcolor: `${item.color}15`,
                        color: item.color,
                        fontWeight: 800,
                        fontSize: "0.825rem",
                        borderRadius: "10px",
                        px: 0.5,
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

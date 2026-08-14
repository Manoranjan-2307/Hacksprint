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
import PieChartIcon from "@mui/icons-material/PieChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const cseQueryTrends = [
  { rank: 1, topic: "Attendance Rules & 75% Criteria", count: "784 Queries", percent: 32.0, color: "#4F46E5" },
  { rank: 2, topic: "Odd Semester Exam Timetable & Venues", count: "686 Queries", percent: 28.0, color: "#0EA5E9" },
  { rank: 3, topic: "Tier-1 Placement CGPA Eligibility", count: "490 Queries", percent: 20.0, color: "#8B5CF6" },
  { rank: 4, topic: "On-Duty (OD) & Leave Application", count: "294 Queries", percent: 12.0, color: "#16A34A" },
  { rank: 5, name: "Elective Course Registration Procedure", count: "196 Queries", percent: 8.0, color: "#F59E0B" },
];

const categoryBreakdown = [
  { category: "Academic Regulations", percent: 45, count: "1,102 Queries", color: "#4F46E5" },
  { category: "Placement & Training", percent: 25, count: "612 Queries", color: "#8B5CF6" },
  { category: "Hostel & Campus Life", percent: 20, count: "490 Queries", color: "#0EA5E9" },
  { category: "Fee Payment & ERP", percent: 10, count: "246 Queries", color: "#16A34A" },
];

export default function FacultyAnalytics() {
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
                bgcolor: "rgba(79, 70, 229, 0.12)",
                color: "#4F46E5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AnalyticsIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}>
                CSE Department Query Analytics
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Analyze 2,450 student queries in Computer Science & Engineering to identify common knowledge gaps
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Query Trends */}
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
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 2.5 }}>
                Top 5 Most Asked CSE Student Topics
              </Typography>

              <Stack spacing={2.5}>
                {cseQueryTrends.map((item) => (
                  <Box key={item.rank}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip label={`#${item.rank}`} size="small" sx={{ bgcolor: `${item.color}15`, color: item.color, fontWeight: 800, fontSize: "0.75rem" }} />
                        <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>
                          {item.topic || item.name}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 700, color: item.color, fontSize: "0.9rem" }}>
                        {item.count} ({item.percent}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.percent * 2.8}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "#F1F5F9",
                        "& .MuiLinearProgress-bar": { bgcolor: item.color, borderRadius: 4 },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Category Analysis */}
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
                <PieChartIcon sx={{ color: "#8B5CF6" }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.1rem" }}>
                  Category Analysis Breakdown
                </Typography>
              </Box>

              <Stack spacing={2} divider={<Divider />}>
                {categoryBreakdown.map((row) => (
                  <Box key={row.category} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.925rem" }}>
                        {row.category}
                      </Typography>
                      <Typography sx={{ color: "#64748B", fontSize: "0.775rem", mt: 0.2 }}>
                        {row.count}
                      </Typography>
                    </Box>

                    <Chip
                      label={`${row.percent}%`}
                      sx={{
                        bgcolor: `${row.color}15`,
                        color: row.color,
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        borderRadius: "10px",
                        px: 0.8,
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

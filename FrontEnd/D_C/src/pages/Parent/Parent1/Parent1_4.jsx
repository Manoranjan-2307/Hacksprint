import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ApartmentIcon from "@mui/icons-material/Apartment";

export default function Parent1_4() {
  const storedUser = JSON.parse(localStorage.getItem("campusiq_user") || "null");

  const parentName = storedUser?.name || "Kanagaraj";
  const parentEmail = storedUser?.email || "kanagaraj@bitsathy.ac.in";
  const parentPhone = storedUser?.phone || "8610834388";

  const studentName = storedUser?.linkedStudent || (storedUser?.name === "Venkatachalam" ? "Sanjiv" : storedUser?.name === "Palanisamy" ? "Sujan" : "Rahul K");
  const studentRoll = storedUser?.id || "7376242AD267";
  const studentDept =
    storedUser?.dept ||
    (studentRoll.includes("IT")
      ? "Information Technology (IT)"
      : "Artificial Intelligence and Data Science (AI & DS)");

  const getInitials = (name) => {
    if (!name) return "P";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
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
              <PersonIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}>
                Parent & Linked Student Profile
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Verified student support access linked to student {studentName} ({studentRoll})
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3} alignItems="stretch">
          {/* Left Column: Parent Details */}
          <Grid item xs={12} md={5} sx={{ display: "flex" }}>
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
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    bgcolor: "#8B5CF6",
                    fontSize: "1.8rem",
                    fontWeight: 800,
                    mb: 1.5,
                    boxShadow: "0 6px 18px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  {getInitials(parentName)}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A" }}>
                  {parentName}
                </Typography>
                <Chip
                  label="Parent Access (RBAC)"
                  size="small"
                  sx={{ bgcolor: "#EEF2FF", color: "#4338CA", fontWeight: 700, mt: 0.8 }}
                />
              </Box>

              <Divider sx={{ mb: 2.5 }} />

              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <PersonIcon sx={{ color: "#64748B" }} />
                  <Box>
                    <Typography sx={{ color: "#94A3B8", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700 }}>
                      Relationship
                    </Typography>
                    <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.925rem" }}>
                      Parent / Guardian of {studentName}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <EmailIcon sx={{ color: "#64748B" }} />
                  <Box>
                    <Typography sx={{ color: "#94A3B8", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700 }}>
                      Email Address
                    </Typography>
                    <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.925rem" }}>
                      {parentEmail}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <PhoneIcon sx={{ color: "#64748B" }} />
                  <Box>
                    <Typography sx={{ color: "#94A3B8", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700 }}>
                      Phone Number
                    </Typography>
                    <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.925rem" }}>
                      {parentPhone}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <ApartmentIcon sx={{ color: "#64748B" }} />
                  <Box>
                    <Typography sx={{ color: "#94A3B8", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700 }}>
                      Institution
                    </Typography>
                    <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.925rem" }}>
                      BIT (Bannari Amman Institute of Technology)
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Right Column: Linked Student Overview */}
          <Grid item xs={12} md={7} sx={{ display: "flex" }}>
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <SchoolIcon sx={{ color: "#4F46E5" }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.15rem" }}>
                  Linked Student Academic Overview
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  mb: 3,
                  borderRadius: "14px",
                  bgcolor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography sx={{ color: "#64748B", fontSize: "0.775rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Student Name
                    </Typography>
                    <Typography sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.05rem" }}>
                      {studentName}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography sx={{ color: "#64748B", fontSize: "0.775rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Register Number
                    </Typography>
                    <Typography sx={{ color: "#4F46E5", fontWeight: 800, fontSize: "1.05rem" }}>
                      {studentRoll}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography sx={{ color: "#64748B", fontSize: "0.775rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Department
                    </Typography>
                    <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.95rem" }}>
                      {studentDept}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography sx={{ color: "#64748B", fontSize: "0.775rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Year / Semester
                    </Typography>
                    <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.95rem" }}>
                      III Year / Semester 5
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", mb: 1.5 }}>
                Current Performance Summary
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "#DCFCE7", border: "1px solid #BBF7D0" }}>
                    <Typography sx={{ color: "#166534", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Current Attendance
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#15803D", my: 0.3 }}>
                      82%
                    </Typography>
                    <Typography sx={{ color: "#166534", fontSize: "0.725rem", fontWeight: 600 }}>
                      Above 75% threshold
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "#EEF2FF", border: "1px solid #C7D2FE" }}>
                    <Typography sx={{ color: "#3730A3", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                      CGPA Score
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#4338CA", my: 0.3 }}>
                      8.4
                    </Typography>
                    <Typography sx={{ color: "#3730A3", fontSize: "0.725rem", fontWeight: 600 }}>
                      Tier-1 Eligible
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "#F1F5F9", border: "1px solid #E2E8F0" }}>
                    <Typography sx={{ color: "#475569", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Academic Standing
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A", my: 0.3 }}>
                      Good
                    </Typography>
                    <Typography sx={{ color: "#475569", fontSize: "0.725rem", fontWeight: 600 }}>
                      0 Standing Arrears
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

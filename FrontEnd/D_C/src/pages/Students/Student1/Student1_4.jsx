import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function Student1_4() {
  const storedUser = JSON.parse(localStorage.getItem("campusiq_user") || "null");
  const userName = storedUser?.name || "Rahul K";
  const userEmail = storedUser?.email || "rahulk.ad24@bitsathy.ac.in";

  // State for editable profile fields
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState("8610834388");
  const [academicYear, setAcademicYear] = useState("2025-2026");

  // Notification switches state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);

  // Toast / Snackbar
  const [toastOpen, setToastOpen] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // Update local storage user email if changed
    const updatedUser = { ...(storedUser || {}), name: userName, email };
    localStorage.setItem("campusiq_user", JSON.stringify(updatedUser));

    setToastOpen(true);
  };

  const getInitials = (name) => {
    if (!name) return "S";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
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
              <Typography
                variant="h5"
                sx={{
                  color: "#0F172A",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  lineHeight: 1.2,
                }}
              >
                My Profile
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Manage your academic identity details and personal notification preferences
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Compact 2-Column Grid */}
        <Grid container spacing={2.5} alignItems="stretch">
          {/* Left Column (Avatar Card) */}
          <Grid item xs={12} md={4} sx={{ display: "flex" }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
              }}
            >
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  mb: 2,
                  bgcolor: "#8B5CF6",
                  background: "linear-gradient(135deg, #8B5CF6 0%, #4F46E5 100%)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  boxShadow: "0 8px 24px rgba(139, 92, 246, 0.25)",
                }}
              >
                {getInitials(userName)}
              </Avatar>

              <Typography
                variant="h6"
                sx={{ color: "#0F172A", fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.2 }}
              >
                {userName}
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5, mb: 1.5 }}>
                {email}
              </Typography>

              <Chip
                label="3rd Year • Semester 6"
                sx={{
                  bgcolor: "#EEF2FF",
                  color: "#4F46E5",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  borderRadius: "999px",
                  mb: 2.5,
                  px: 0.5,
                }}
              />

              <Divider sx={{ width: "100%", borderColor: "#E2E8F0", mb: 2.5 }} />

              <Stack spacing={1.8} sx={{ width: "100%", textAlign: "left" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <BadgeIcon sx={{ color: "#8B5CF6", fontSize: 20 }} />
                  <Box>
                    <Typography sx={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Roll Number / Student ID
                    </Typography>
                    <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.95rem" }}>
                      7376242AD267
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <SchoolIcon sx={{ color: "#8B5CF6", fontSize: 20 }} />
                  <Box>
                    <Typography sx={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Department
                    </Typography>
                    <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.95rem" }}>
                      AI & Data Science
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#16A34A",
                      ml: 0.8,
                      mr: 0.7,
                    }}
                  />
                  <Box>
                    <Typography sx={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                      Enrollment Status
                    </Typography>
                    <Typography sx={{ color: "#166534", fontWeight: 700, fontSize: "0.95rem" }}>
                      Active Regular Student
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Right Column (Details & Preferences Form) */}
          <Grid item xs={12} md={8} sx={{ display: "flex" }}>
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
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#0F172A", fontWeight: 700, fontSize: "1.15rem", mb: 2.5 }}
              >
                Personal & Academic Details
              </Typography>

              <Box component="form" onSubmit={handleSave}>
                <Grid container spacing={2}>
                  {/* Email field */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: <EmailIcon sx={{ color: "#8B5CF6", mr: 1, fontSize: 18 }} />,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          bgcolor: "#F8FAFC",
                          "& fieldset": { borderColor: "#E2E8F0" },
                          "&:hover fieldset": { borderColor: "#CBD5E1" },
                          "&.Mui-focused fieldset": { borderColor: "#8B5CF6" },
                        },
                      }}
                    />
                  </Grid>

                  {/* Phone field */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      InputProps={{
                        startAdornment: <PhoneIcon sx={{ color: "#8B5CF6", mr: 1, fontSize: 18 }} />,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          bgcolor: "#F8FAFC",
                          "& fieldset": { borderColor: "#E2E8F0" },
                          "&:hover fieldset": { borderColor: "#CBD5E1" },
                          "&.Mui-focused fieldset": { borderColor: "#8B5CF6" },
                        },
                      }}
                    />
                  </Grid>

                  {/* Academic Year Select */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="academic-year-label">Academic Year</InputLabel>
                      <Select
                        labelId="academic-year-label"
                        id="academic-year-select"
                        value={academicYear}
                        label="Academic Year"
                        onChange={(e) => setAcademicYear(e.target.value)}
                        sx={{
                          borderRadius: "12px",
                          bgcolor: "#F8FAFC",
                          "& fieldset": { borderColor: "#E2E8F0" },
                          "&:hover fieldset": { borderColor: "#CBD5E1" },
                          "&.Mui-focused fieldset": { borderColor: "#8B5CF6" },
                        }}
                      >
                        <MenuItem value="2024-2025">2024 - 2025</MenuItem>
                        <MenuItem value="2025-2026">2025 - 2026</MenuItem>
                        <MenuItem value="2026-2027">2026 - 2027</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Institution (Read-only) */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Institution / Campus"
                      value="BIT"
                      InputProps={{ readOnly: true }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          bgcolor: "#F1F5F9",
                          "& fieldset": { borderColor: "#E2E8F0" },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3, borderColor: "#E2E8F0" }} />

                {/* Notification Preferences with MUI Switches */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "#0F172A",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <NotificationsActiveIcon sx={{ color: "#8B5CF6", fontSize: 20 }} />
                  Notification Preferences
                </Typography>

                <Stack spacing={1.2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailAlerts}
                        onChange={(e) => setEmailAlerts(e.target.checked)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": { color: "#8B5CF6" },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#8B5CF6",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#334155", fontSize: "0.925rem", fontWeight: 600 }}>
                        Email Notifications for AI FAQ handbook updates
                      </Typography>
                    }
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={smsAlerts}
                        onChange={(e) => setSmsAlerts(e.target.checked)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": { color: "#8B5CF6" },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#8B5CF6",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#334155", fontSize: "0.925rem", fontWeight: 600 }}>
                        SMS Alerts for urgent exam timetable releases & deadlines
                      </Typography>
                    }
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={saveHistory}
                        onChange={(e) => setSaveHistory(e.target.checked)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": { color: "#8B5CF6" },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#8B5CF6",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#334155", fontSize: "0.925rem", fontWeight: 600 }}>
                        Auto-save search queries in Chat History
                      </Typography>
                    }
                  />
                </Stack>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
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
                      "&:hover": {
                        bgcolor: "#7C3AED",
                        boxShadow: "0 8px 20px rgba(124, 58, 237, 0.35)",
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Snackbar notification */}
        <Snackbar
          open={toastOpen}
          autoHideDuration={4000}
          onClose={() => setToastOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setToastOpen(false)}
            severity="success"
            sx={{ width: "100%", borderRadius: "12px", fontWeight: 600 }}
          >
            Profile details and notification preferences saved!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

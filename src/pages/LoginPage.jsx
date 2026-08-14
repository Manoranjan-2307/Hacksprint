import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link,
  Chip,
  Stack,
} from "@mui/material";
import {
  Email,
  Person,
  Lock,
  Visibility,
  VisibilityOff,
  School,
  Search,
  LiveHelp,
  QuestionAnswer,
  AutoAwesome,
} from "@mui/icons-material";
import { handleLogin, handleGoogleLogin, handleStaticLogin } from "../components/functionality.js";
import "../styles/loginpage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const isStaticLoginSuccessful = handleStaticLogin(username, password, navigate);
    if (!isStaticLoginSuccessful) {
      await handleLogin(username, password, navigate);
    }
  };

  const toggleShowPassword = () => setShowPassword((s) => !s);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        background: "linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 50%, #E0E7FF 100%)",
        color: "#0F172A",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: "1240px", width: "100%", mx: "auto" }}>
        <Grid container spacing={4} alignItems="center" justifyContent="between">
          {/* Left Hero Branding Section */}
          <Grid item xs={12} md={7}>
            <Box sx={{ pr: { md: 4 } }}>
              <Chip
                icon={<AutoAwesome style={{ color: "#8B5CF6", fontSize: 16 }} />}
                label="AI Powered College FAQ Portal 2026"
                sx={{
                  bgcolor: "rgba(139, 92, 246, 0.12)",
                  color: "#8B5CF6",
                  fontWeight: 700,
                  fontSize: "0.825rem",
                  borderRadius: "999px",
                  mb: 2.5,
                  px: 0.5,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "#0F172A",
                  letterSpacing: "-0.03em",
                  fontSize: { xs: "2.2rem", sm: "3rem", md: "3.4rem" },
                  lineHeight: 1.15,
                  mb: 2,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}
              >
                Campus<span style={{ color: "#8B5CF6" }}>IQ</span>
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: "#4F46E5",
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.3rem" },
                    fontWeight: 700,
                    mt: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Your Intelligent Campus Gateway
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#475569",
                  maxWidth: 580,
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  mb: 4,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}
              >
                Access real-time academic rules, exam timetables, attendance criteria, and instant AI-verified FAQ answers in one place.
              </Typography>

              {/* Feature Cards Grid */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      bgcolor: "#FFFFFF",
                      borderRadius: "16px",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                        borderColor: "#C7D2FE",
                      },
                      height: "100%",
                      borderLeft: "4px solid #4F46E5",
                    }}
                  >
                    <Box sx={{ bgcolor: "#EEF2FF", borderRadius: "12px", p: 1, display: "inline-flex", mb: 1.5 }}>
                      <Search sx={{ color: "#4F46E5", fontSize: 22 }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>
                      Smart FAQ Search
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5, fontSize: "0.825rem", lineHeight: 1.5 }}>
                      Find instant handbook answers with semantic AI precision.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      bgcolor: "#FFFFFF",
                      borderRadius: "16px",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                        borderColor: "#BAE6FD",
                      },
                      height: "100%",
                      borderLeft: "4px solid #0EA5E9",
                    }}
                  >
                    <Box sx={{ bgcolor: "#E0F2FE", borderRadius: "12px", p: 1, display: "inline-flex", mb: 1.5 }}>
                      <LiveHelp sx={{ color: "#0EA5E9", fontSize: 22 }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>
                      Chat History
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5, fontSize: "0.825rem", lineHeight: 1.5 }}>
                      Review previous queries, confidence scores, and source citations.
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      bgcolor: "#FFFFFF",
                      borderRadius: "16px",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 4px 18px rgba(15, 23, 42, 0.03)",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                        borderColor: "#DDD6FE",
                      },
                      height: "100%",
                      borderLeft: "4px solid #8B5CF6",
                    }}
                  >
                    <Box sx={{ bgcolor: "#F3E8FF", borderRadius: "12px", p: 1, display: "inline-flex", mb: 1.5 }}>
                      <QuestionAnswer sx={{ color: "#8B5CF6", fontSize: 22 }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>
                      Student Feedback
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5, fontSize: "0.825rem", lineHeight: 1.5 }}>
                      Submit portal suggestions and track resolution status in real-time.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Right Login Form Section */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: "20px",
                p: { xs: 3, sm: 4 },
                bgcolor: "#FFFFFF",
                color: "#0F172A",
                border: "1px solid #E2E8F0",
                boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
                maxWidth: 440,
                mx: "auto",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlignment: "center", mb: 3.5 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(139, 92, 246, 0.12)",
                    width: 60,
                    height: 60,
                    mb: 1.5,
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <School sx={{ fontSize: 34, color: "#8B5CF6" }} />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "1.4rem" }}>
                  Welcome Back 👋
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
                  Sign in to access your student portal
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "#F8FAFC",
                        "& fieldset": { borderColor: "#E2E8F0" },
                        "&:hover fieldset": { borderColor: "#CBD5E1" },
                        "&.Mui-focused fieldset": { borderColor: "#8B5CF6", borderWidth: "2px" },
                      },
                      "& .MuiInputBase-input": { fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "#8B5CF6", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "#F8FAFC",
                        "& fieldset": { borderColor: "#E2E8F0" },
                        "&:hover fieldset": { borderColor: "#CBD5E1" },
                        "&.Mui-focused fieldset": { borderColor: "#8B5CF6", borderWidth: "2px" },
                      },
                      "& .MuiInputBase-input": { fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#8B5CF6", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end" sx={{ color: "#64748B" }}>
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked sx={{ color: "#8B5CF6", "&.Mui-checked": { color: "#8B5CF6" } }} />}
                      label={<Typography sx={{ fontSize: "0.85rem", color: "#475569", fontWeight: 500 }}>Remember me</Typography>}
                    />
                    <Link href="#" underline="hover" sx={{ color: "#4F46E5", fontSize: "0.85rem", fontWeight: 600 }}>
                      Forgot Password?
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.3,
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #8B5CF6 0%, #4F46E5 100%)",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.975rem",
                      color: "#FFFFFF",
                      boxShadow: "0 8px 20px rgba(139, 92, 246, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #7C3AED 0%, #4338CA 100%)",
                        boxShadow: "0 10px 24px rgba(124, 58, 237, 0.4)",
                      },
                    }}
                  >
                    Sign In to Portal
                  </Button>
                </Stack>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2.5 }}>
                <Box sx={{ flex: 1, height: "1px", backgroundColor: "#E2E8F0" }} />
                <Typography variant="body2" sx={{ color: "#94A3B8", fontSize: "0.8rem", fontWeight: 600 }}>
                  OR
                </Typography>
                <Box sx={{ flex: 1, height: "1px", backgroundColor: "#E2E8F0" }} />
              </Box>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleGoogleLogin(navigate)}
                sx={{
                  textTransform: "none",
                  borderRadius: "12px",
                  borderColor: "#E2E8F0",
                  color: "#0F172A",
                  bgcolor: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  py: 1.1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.2,
                  "&:hover": { borderColor: "#CBD5E1", bgcolor: "#F8FAFC" },
                }}
              >
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="Google"
                  style={{ width: 18, height: 18 }}
                />
                <span>Continue with BIT Single Sign-On</span>
              </Button>

              <Box sx={{ textAlign: "center", mt: 2.5 }}>
                <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.85rem" }}>
                  Need assistance?{" "}
                  <Link href="#" underline="hover" sx={{ color: "#8B5CF6", fontWeight: 700 }}>
                    Contact Support Desk
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
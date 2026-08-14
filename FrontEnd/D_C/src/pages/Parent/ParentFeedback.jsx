import React, { useState } from "react";
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
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import SchemaIcon from "@mui/icons-material/Schema";
import FeedbackIcon from "@mui/icons-material/Feedback";

const feedbackByStudent = {
  // Parent 1 (Kanagaraj - Rahul K)
  "7376242AD267": [
    {
      id: "pf1",
      category: "Fees",
      rating: 5,
      query: "What is the fee payment deadline for Rahul K?",
      comments: "Very clear information provided regarding fee payment dates and ERP portal links.",
      date: "12 Aug 2026",
      status: "Resolved & Updated",
    },
    {
      id: "pf2",
      category: "Hostel",
      rating: 2,
      query: "What are the rules for special hostel late pass requests?",
      reason: "Need more details",
      comments: "Needed specific information about weekend home pass approval limits.",
      date: "10 Aug 2026",
      status: "Under Faculty Review",
    },
  ],

  // Parent 2 (Venkatachalam - Sanjiv)
  "7376242AD292": [
    {
      id: "pf1",
      category: "Academic",
      rating: 5,
      query: "How to apply for On-Duty (OD) for National Hackathons for Sanjiv?",
      comments: "Prompt and accurate response regarding HOD OD submission procedures.",
      date: "Today at 09:30 AM",
      status: "Resolved & Updated",
    },
    {
      id: "pf2",
      category: "Hostel",
      rating: 4,
      query: "What is the last date for 2nd installment mess fee for Sanjiv?",
      comments: "Clear confirmation of mess fee due date and online receipt downloading.",
      date: "11 Aug 2026",
      status: "Resolved & Updated",
    },
  ],

  // Parent 3 (Palanisamy - Sujan)
  "7376242IT314": [
    {
      id: "pf1",
      category: "Academic",
      rating: 5,
      query: "What are the prerequisite courses for Cloud Computing elective in IT?",
      comments: "Helpful response detailing course prerequisites and grade eligibility.",
      date: "Today at 09:00 AM",
      status: "Resolved & Updated",
    },
    {
      id: "pf2",
      category: "Placement",
      rating: 3,
      query: "Which IT software companies are visiting campus for 3rd year recruitment?",
      reason: "Need more details",
      comments: "Requested exact dates for company arrival and eligibility CGPA cutoffs.",
      date: "09 Aug 2026",
      status: "Under Faculty Review",
    },
  ],
};

export default function ParentFeedback() {
  const storedUser = JSON.parse(localStorage.getItem("campusiq_user") || "null");

  const studentRoll = storedUser?.id || "7376242AD267";
  const parentName = storedUser?.name || "Kanagaraj";
  const studentName = storedUser?.linkedStudent || (parentName === "Venkatachalam" ? "Sanjiv" : parentName === "Palanisamy" ? "Sujan" : "Rahul K");

  const initialList = feedbackByStudent[studentRoll] || feedbackByStudent["7376242AD267"];

  const [category, setCategory] = useState("Academic");
  const [rating, setRating] = useState(5);
  const [issueReason, setIssueReason] = useState("None");
  const [queryContext, setQueryContext] = useState("");
  const [comments, setComments] = useState("");
  const [history, setHistory] = useState(initialList);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!comments.trim()) {
      setToastMsg("Please enter feedback comments.");
      setToastOpen(true);
      return;
    }

    const newFeedback = {
      id: "pf_" + Date.now(),
      category,
      rating,
      query: queryContext || `Query regarding ${studentName}`,
      reason: issueReason !== "None" ? issueReason : undefined,
      comments,
      date: "Just now",
      status: "Under Faculty Review",
    };

    setHistory([newFeedback, ...history]);
    setComments("");
    setQueryContext("");
    setRating(5);
    setToastMsg(`Thank you ${parentName}! Your feedback has been sent for Faculty Review.`);
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
              <FeedbackIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}>
                Parent Feedback ({parentName})
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Report incorrect or outdated AI responses for <strong>{studentName}</strong> to trigger Faculty Review
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Stack spacing={3}>
          {/* Feedback Form Card */}
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
              Submit AI Response Feedback
            </Typography>

            <Box component="form" onSubmit={handleSubmitFeedback}>
              <Stack spacing={2.2}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Box sx={{ flex: 1, minWidth: "220px" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Category</InputLabel>
                      <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)} sx={{ borderRadius: "12px", bgcolor: "#F8FAFC" }}>
                        <MenuItem value="Academic">Academic Regulations</MenuItem>
                        <MenuItem value="Fees">Fee Payment</MenuItem>
                        <MenuItem value="Hostel">Hostel & Campus Rules</MenuItem>
                        <MenuItem value="Placement">Placement & Training</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ flex: 1, minWidth: "220px" }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Report Issue Reason</InputLabel>
                      <Select value={issueReason} label="Report Issue Reason" onChange={(e) => setIssueReason(e.target.value)} sx={{ borderRadius: "12px", bgcolor: "#F8FAFC" }}>
                        <MenuItem value="None">None (General Feedback)</MenuItem>
                        <MenuItem value="Wrong information">Wrong Information</MenuItem>
                        <MenuItem value="Outdated information">Outdated Information</MenuItem>
                        <MenuItem value="Need more details">Need More Details</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem" }}>
                    Response Quality Rating:
                  </Typography>
                  <Rating
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                </Box>

                <TextField
                  fullWidth
                  size="small"
                  label="Question / Query Topic"
                  placeholder={`e.g. Query regarding ${studentName}...`}
                  value={queryContext}
                  onChange={(e) => setQueryContext(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#F8FAFC" } }}
                />

                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  label="Detailed Feedback Comments"
                  placeholder="Tell us how we can improve the accuracy of this answer..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
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
                      boxShadow: "0 6px 16px rgba(139, 92, 246, 0.25)",
                      "&:hover": { bgcolor: "#7C3AED" },
                    }}
                  >
                    Submit Feedback
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Paper>

          {/* Feedback History List */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: "18px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 2 }}>
              Submitted Parent Feedback History ({parentName})
            </Typography>

            <Stack spacing={2}>
              {history.map((row) => (
                <Box key={row.id} sx={{ p: 2, borderRadius: "12px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip label={row.category} size="small" sx={{ bgcolor: "#EEF2FF", color: "#4338CA", fontWeight: 700, fontSize: "0.75rem" }} />
                      <Rating value={row.rating} readOnly size="small" />
                    </Box>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor: row.status.includes("Resolved") ? "#DCFCE7" : "#FEF3C7",
                        color: row.status.includes("Resolved") ? "#166534" : "#92400E",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>
                  <Typography sx={{ color: "#0F172A", fontWeight: 700, fontSize: "0.9rem", mb: 0.5 }}>
                    Query: "{row.query}"
                  </Typography>
                  <Typography sx={{ color: "#475569", fontSize: "0.85rem", mb: 0.5 }}>
                    Comments: {row.comments}
                  </Typography>
                  <Typography sx={{ color: "#94A3B8", fontSize: "0.75rem" }}>
                    Submitted: {row.date} {row.reason ? `• Issue: ${row.reason}` : ""}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>

        <Snackbar open={toastOpen} autoHideDuration={4500} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ borderRadius: "12px", fontWeight: 600 }}>
            {toastMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

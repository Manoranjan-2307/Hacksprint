import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  TextField,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  Stack,
  Divider,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SendIcon from "@mui/icons-material/Send";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import StarIcon from "@mui/icons-material/Star";

const initialPastFeedback = [
  {
    id: 1,
    date: "12 Aug 2026",
    category: "AI Answer Accuracy",
    rating: 5,
    comment: "The response regarding semester exam attendance criteria was clear and cited exact handbook pages.",
    status: "Resolved",
  },
  {
    id: 2,
    date: "10 Aug 2026",
    category: "UI/UX Issue",
    rating: 4,
    comment: "The sidebar hover labels look great, but would be nice if the theme toggle was persistent.",
    status: "Reviewed",
  },
  {
    id: 3,
    date: "08 Aug 2026",
    category: "General Suggestion",
    rating: 4,
    comment: "Can we add quick links to the ERP grade calculator in the AI responses?",
    status: "Pending",
  },
];

const ratingLabels = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export default function StudentFeedback() {
  const [category, setCategory] = useState("AI Answer Accuracy");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [pastFeedback, setPastFeedback] = useState(initialPastFeedback);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setToastMessage("Please enter your comments before submitting.");
      setToastOpen(true);
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: "Today",
      category,
      rating,
      comment,
      status: "Pending",
    };

    setPastFeedback([newEntry, ...pastFeedback]);
    setComment("");
    setRating(5);
    setCategory("AI Answer Accuracy");
    setToastMessage("Thank you! Your feedback has been submitted successfully.");
    setToastOpen(true);
  };

  const getStatusChipProps = (status) => {
    switch (status) {
      case "Resolved":
        return { bgcolor: "#DCFCE7", color: "#166534", label: "Resolved" };
      case "Reviewed":
        return { bgcolor: "#E0E7FF", color: "#3730A3", label: "Reviewed" };
      case "Pending":
      default:
        return { bgcolor: "#FEF3C7", color: "#92400E", label: "Pending" };
    }
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
              <RateReviewIcon fontSize="medium" />
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
                My Feedback
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Share your insights to help us enhance CampusIQ AI and student experiences
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Stack spacing={2.5}>
          {/* Feedback Form Paper */}
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
            <Typography
              variant="h6"
              sx={{ color: "#0F172A", fontWeight: 700, fontSize: "1.15rem", mb: 2 }}
            >
              Submit New Feedback
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.2}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {/* Feedback Category Dropdown */}
                  <FormControl size="small" sx={{ minWidth: 260, flex: 1 }}>
                    <InputLabel id="category-select-label" sx={{ color: "#475569" }}>
                      Feedback Category
                    </InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={category}
                      label="Feedback Category"
                      onChange={(e) => setCategory(e.target.value)}
                      sx={{
                        borderRadius: "12px",
                        bgcolor: "#F8FAFC",
                        "& fieldset": { borderColor: "#E2E8F0" },
                        "&:hover fieldset": { borderColor: "#CBD5E1" },
                        "&.Mui-focused fieldset": { borderColor: "#8B5CF6" },
                      }}
                    >
                      <MenuItem value="AI Answer Accuracy">AI Answer Accuracy</MenuItem>
                      <MenuItem value="UI/UX Issue">UI/UX Issue</MenuItem>
                      <MenuItem value="General Suggestion">General Suggestion</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Rating Component */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      bgcolor: "#F8FAFC",
                      px: 2,
                      py: 1,
                      borderRadius: "12px",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <Typography sx={{ color: "#475569", fontWeight: 600, fontSize: "0.9rem" }}>
                      Rating:
                    </Typography>
                    <Rating
                      name="feedback-rating"
                      value={rating}
                      onChange={(event, newValue) => {
                        if (newValue) setRating(newValue);
                      }}
                      emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                      sx={{ color: "#8B5CF6" }}
                    />
                    <Chip
                      label={`${rating}/5 (${ratingLabels[rating] || "Good"})`}
                      size="small"
                      sx={{
                        bgcolor: "rgba(139, 92, 246, 0.12)",
                        color: "#8B5CF6",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>
                </Box>

                {/* Compact TextField for Comments */}
                <TextField
                  multiline
                  rows={2.5}
                  fullWidth
                  placeholder="Describe your feedback, suggestion, or issue in detail..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      bgcolor: "#F8FAFC",
                      "& fieldset": { borderColor: "#E2E8F0" },
                      "&:hover fieldset": { borderColor: "#CBD5E1" },
                      "&.Mui-focused fieldset": { borderColor: "#8B5CF6" },
                    },
                    "& .MuiInputBase-input": { color: "#0F172A", fontSize: "0.95rem" },
                  }}
                />

                {/* Submit Feedback Button with #8B5CF6 background & hover ripple */}
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
                      "&:hover": {
                        bgcolor: "#7C3AED",
                        boxShadow: "0 8px 20px rgba(124, 58, 237, 0.35)",
                      },
                    }}
                  >
                    Submit Feedback
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Paper>

          {/* Past Feedback Table/List Container */}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <HistoryEduIcon sx={{ color: "#8B5CF6" }} />
              <Typography
                variant="h6"
                sx={{ color: "#0F172A", fontWeight: 700, fontSize: "1.15rem" }}
              >
                Submitted Feedback History
              </Typography>
            </Box>

            <TableContainer sx={{ overflowX: "auto" }}>
              <Table size="medium" sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                    <TableCell sx={{ color: "#475569", fontWeight: 700, fontSize: "0.85rem", py: 1.5 }}>
                      Date
                    </TableCell>
                    <TableCell sx={{ color: "#475569", fontWeight: 700, fontSize: "0.85rem", py: 1.5 }}>
                      Category
                    </TableCell>
                    <TableCell sx={{ color: "#475569", fontWeight: 700, fontSize: "0.85rem", py: 1.5 }}>
                      Rating
                    </TableCell>
                    <TableCell sx={{ color: "#475569", fontWeight: 700, fontSize: "0.85rem", py: 1.5 }}>
                      Comment Snippet
                    </TableCell>
                    <TableCell sx={{ color: "#475569", fontWeight: 700, fontSize: "0.85rem", py: 1.5, textAlign: "right" }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {pastFeedback.map((row) => {
                    const statusProps = getStatusChipProps(row.status);
                    return (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": { bgcolor: "#F8FAFC" },
                        }}
                      >
                        <TableCell sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.875rem" }}>
                          {row.date}
                        </TableCell>
                        <TableCell sx={{ color: "#4F46E5", fontWeight: 700, fontSize: "0.875rem" }}>
                          {row.category}
                        </TableCell>
                        <TableCell>
                          <Rating value={row.rating} readOnly size="small" sx={{ color: "#8B5CF6" }} />
                        </TableCell>
                        <TableCell sx={{ color: "#334155", fontSize: "0.9rem", maxWidth: 340 }}>
                          {row.comment}
                        </TableCell>
                        <TableCell textAlign="right" sx={{ textAlign: "right" }}>
                          <Chip
                            label={statusProps.label}
                            size="small"
                            sx={{
                              bgcolor: statusProps.bgcolor,
                              color: statusProps.color,
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              borderRadius: "999px",
                              px: 0.5,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>

        {/* Snackbar Notification */}
        <Snackbar
          open={toastOpen}
          autoHideDuration={4000}
          onClose={() => setToastOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setToastOpen(false)}
            severity={toastMessage.includes("Thank you") ? "success" : "warning"}
            sx={{ width: "100%", borderRadius: "12px", fontWeight: 600 }}
          >
            {toastMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

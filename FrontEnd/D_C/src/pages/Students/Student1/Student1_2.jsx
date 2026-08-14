import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryIcon from "@mui/icons-material/History";
import VerifiedIcon from "@mui/icons-material/Verified";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const initialHistoryItems = [
  {
    id: "q1",
    title: "Attendance Criteria",
    query: "What is the minimum attendance required to appear for semester exams?",
    answer: "Students must maintain a minimum of 75% attendance in each registered course to be eligible for semester end examinations. Condonation up to 10% may be granted on medical grounds subject to approval.",
    source: "Academic Regulations Handbook, Page 12",
    date: "12 Aug 2026",
    confidence: "96%",
    category: "Academics",
  },
  {
    id: "q2",
    title: "Hostel Timings",
    query: "What are the entry and exit timings for hostel residents?",
    answer: "Hostel gates close strictly at 8:30 PM for both boys and girls hostels. Special late permits must be submitted via the ERP student portal 4 hours prior.",
    source: "Hostel Code of Conduct, Section 4.2",
    date: "11 Aug 2026",
    confidence: "94%",
    category: "Campus Life",
  },
  {
    id: "q3",
    title: "Exam Fee Deadline",
    query: "When is the last date to pay the odd semester examination fee?",
    answer: "The due date for regular exam fee payment is 25th August 2026. Submissions after this date will incur a late fee of ₹500 until 30th August 2026.",
    source: "Controller of Examinations Notice #104",
    date: "10 Aug 2026",
    confidence: "98%",
    category: "Examinations",
  },
  {
    id: "q4",
    title: "Placement Eligibility",
    query: "What is the CGPA cutoff criteria for tier-1 campus recruitment drives?",
    answer: "A minimum cumulative GPA of 7.5 with no standing backlogs is required to register for Tier-1 campus placement drives.",
    source: "Training & Placement Cell Policy Guide, Page 5",
    date: "08 Aug 2026",
    confidence: "91%",
    category: "Placements",
  },
  {
    id: "q5",
    title: "Library Book Renewal",
    query: "How many times can a physical library book be renewed online?",
    answer: "Books borrowed from the Central Library can be renewed online up to 2 consecutive times unless reserved by another borrower.",
    source: "Central Library Rules & Digital Access Guide",
    date: "05 Aug 2026",
    confidence: "89%",
    category: "Facilities",
  },
];

export default function Student1_2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState("q1");

  const filteredItems = initialHistoryItems.filter(
    (item) =>
      item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccordionChange = (panelId) => (event, isExpanded) => {
    setExpandedId(isExpanded ? panelId : false);
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
        {/* Header Section with Title & Search Bar */}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
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
                <HistoryIcon fontSize="medium" />
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
                  Chat History
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                  Review your previously asked queries and AI-verified answers
                </Typography>
              </Box>
            </Box>

            {/* Search Bar next to header title */}
            <TextField
              size="small"
              placeholder="Search past queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#8B5CF6" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: "100%", sm: "320px" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "#F8FAFC",
                  "& fieldset": { borderColor: "#E2E8F0" },
                  "&:hover fieldset": { borderColor: "#CBD5E1" },
                  "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                },
              }}
            />
          </Box>
        </Paper>

        {/* History Item Count & Filter Status */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5, px: 0.5 }}>
          <Typography sx={{ color: "#64748B", fontSize: "0.875rem", fontWeight: 600 }}>
            Showing {filteredItems.length} of {initialHistoryItems.length} past queries
          </Typography>
          {searchTerm && (
            <Button
              size="small"
              onClick={() => setSearchTerm("")}
              sx={{ color: "#4F46E5", textTransform: "none", fontWeight: 600, fontSize: "0.8rem" }}
            >
              Clear Search
            </Button>
          )}
        </Box>

        {/* List View with Accordion Expansion */}
        <Stack spacing={1.5}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const isSelected = expandedId === item.id;
              return (
                <Accordion
                  key={item.id}
                  expanded={isSelected}
                  onChange={handleAccordionChange(item.id)}
                  elevation={0}
                  sx={{
                    borderRadius: "16px !important",
                    border: isSelected ? "1.5px solid #4F46E5" : "1px solid #E2E8F0",
                    bgcolor: "#FFFFFF",
                    boxShadow: isSelected
                      ? "0 8px 24px rgba(79, 70, 229, 0.08)"
                      : "0 2px 10px rgba(15, 23, 42, 0.02)",
                    transition: "all 0.2s ease-in-out",
                    "&:before": { display: "none" },
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: isSelected ? "#4F46E5" : "#64748B" }} />}
                    sx={{
                      px: 2.5,
                      py: 1,
                      minHeight: "68px",
                      "& .MuiAccordionSummary-content": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 1.5,
                        m: 0,
                      },
                    }}
                  >
                    {/* Left side: Query title & full question */}
                    <Box sx={{ flex: 1, minWidth: "260px" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: isSelected ? "#4F46E5" : "#0F172A",
                            fontSize: "1.05rem",
                          }}
                        >
                          {item.query}
                        </Typography>
                      </Box>
                      <Typography sx={{ color: "#64748B", fontSize: "0.825rem" }}>
                        Asked on {item.date} • Category: {item.category}
                      </Typography>
                    </Box>

                    {/* Right side: Confidence score badge & View Details action */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Chip
                        icon={<VerifiedIcon style={{ fontSize: 16, color: "#15803D" }} />}
                        label={`Confidence ${item.confidence}`}
                        size="small"
                        sx={{
                          bgcolor: "#DCFCE7",
                          color: "#15803D",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          borderRadius: "999px",
                          px: 0.5,
                        }}
                      />
                      <Button
                        size="small"
                        disableRipple
                        sx={{
                          color: isSelected ? "#4F46E5" : "#8B5CF6",
                          bgcolor: isSelected ? "rgba(79, 70, 229, 0.08)" : "rgba(139, 92, 246, 0.08)",
                          borderRadius: "10px",
                          fontWeight: 700,
                          textTransform: "none",
                          fontSize: "0.8rem",
                          px: 1.8,
                          py: 0.5,
                          "&:hover": {
                            bgcolor: isSelected ? "rgba(79, 70, 229, 0.15)" : "rgba(139, 92, 246, 0.15)",
                          },
                        }}
                      >
                        {isSelected ? "Hide Details" : "View Details"}
                      </Button>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      px: 2.5,
                      pb: 2.5,
                      pt: 0,
                      bgcolor: "#F8FAFC",
                      borderTop: "1px solid #E2E8F0",
                    }}
                  >
                    <Box sx={{ pt: 2 }}>
                      <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem", mb: 0.8 }}>
                        AI Answer:
                      </Typography>
                      <Typography
                        sx={{
                          color: "#334155",
                          fontSize: "0.95rem",
                          lineHeight: 1.65,
                          mb: 2,
                          bgcolor: "#FFFFFF",
                          p: 2,
                          borderRadius: "12px",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        {item.answer}
                      </Typography>

                      <Divider sx={{ borderColor: "#E2E8F0", mb: 1.5 }} />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "#64748B",
                          fontSize: "0.85rem",
                        }}
                      >
                        <MenuBookIcon sx={{ fontSize: 18, color: "#8B5CF6" }} />
                        <Typography sx={{ fontSize: "0.85rem", color: "#475569" }}>
                          <strong>Source Reference:</strong> {item.source}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: "16px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
              }}
            >
              <Typography sx={{ color: "#64748B", fontSize: "1rem", fontWeight: 600 }}>
                No past queries match "{searchTerm}"
              </Typography>
            </Paper>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
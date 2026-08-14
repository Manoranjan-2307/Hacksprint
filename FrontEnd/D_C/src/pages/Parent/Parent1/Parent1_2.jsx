import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryIcon from "@mui/icons-material/History";
import VerifiedIcon from "@mui/icons-material/Verified";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const historyByStudent = {
  // Parent 1 / Student 1 (Rahul K - AD)
  "7376242AD267": [
    {
      id: 1,
      topic: "Attendance Policy & Regulations",
      question: "What is the minimum attendance requirement for semester exams?",
      answer: "Students must maintain a minimum 75% attendance in each registered subject to be eligible to appear for semester end examinations. Condonation up to 65% is permitted under medical grounds.",
      source: "Academic Regulations Handbook • Page 12",
      confidence: "96% Verified",
      date: "Today at 10:14 AM",
      category: "Academic",
    },
    {
      id: 2,
      topic: "Semester Exam Timetable",
      question: "When will 5th semester AD end examinations begin?",
      answer: "Odd semester examinations for 3rd year AD students are scheduled to begin on November 15, 2026. Practical examinations will commence 1 week prior.",
      source: "Examination Cell Circular 2026 • Page 4",
      confidence: "98% Verified",
      date: "Yesterday at 04:30 PM",
      category: "Exams",
    },
    {
      id: 3,
      topic: "Fee Payment Deadline",
      question: "What is the last date for fee payment for Rahul K?",
      answer: "The semester fee payment deadline is 30 August 2026. Payments can be submitted via the student ERP portal without fine until the due date.",
      source: "Fee Circular 2026 • Page 2",
      confidence: "97% Verified",
      date: "12 Aug 2026",
      category: "Fees",
    },
    {
      id: 4,
      topic: "Hostel Rules & Gate Timings",
      question: "What are the rules for special hostel late pass requests?",
      answer: "Hostel gates close at 8:30 PM. Late permits up to 10:00 PM can be requested twice a month by submitting emergency pass requests approved by the Warden on ERP.",
      source: "Hostel Safety Handbook • Page 8",
      confidence: "95% Verified",
      date: "10 Aug 2026",
      category: "Hostel",
    },
    {
      id: 5,
      topic: "Placement Eligibility Criteria",
      question: "What is the CGPA criteria for AI & Data Science placement drives?",
      answer: "Students maintaining a CGPA >= 7.0 with 0 standing arrears are eligible to participate in Tier-1 recruitment drives. Training modules begin in 6th semester.",
      source: "Placement Cell Guide • Page 15",
      confidence: "94% Verified",
      date: "05 Aug 2026",
      category: "Placement",
    },
  ],

  // Parent 2 / Student 2 (Sanjiv - AD)
  "7376242AD292": [
    {
      id: 1,
      topic: "Hackathon On-Duty Approval",
      question: "How to apply for On-Duty (OD) for National Hackathons for Sanjiv?",
      answer: "Sanjiv can apply for OD through the ERP portal with supporting event acceptance letters at least 2 days prior. HOD approval is mandatory for national level hackathons.",
      source: "BIT OD Policy Guide • Page 4",
      confidence: "98% Verified",
      date: "Today at 09:15 AM",
      category: "Academic",
    },
    {
      id: 2,
      topic: "AI GPU Lab Access Timings",
      question: "What are the evening GPU lab timings for 3rd year AD students?",
      answer: "The High-Performance AI & Data Science GPU Lab is accessible for project work till 10:00 PM on weekdays with faculty coordinator approval.",
      source: "AD Department Lab Guidelines • Page 7",
      confidence: "97% Verified",
      date: "Yesterday at 06:10 PM",
      category: "Academic",
    },
    {
      id: 3,
      topic: "Hostel Mess Fee Deadline",
      question: "What is the last date for 2nd installment mess fee for Sanjiv?",
      answer: "The second installment hostel mess fee deadline is September 05, 2026. Online receipt can be downloaded immediately after ERP payment.",
      source: "Hostel Accounts Circular • Page 3",
      confidence: "99% Verified",
      date: "11 Aug 2026",
      category: "Fees",
    },
    {
      id: 4,
      topic: "Summer Internship Guidelines",
      question: "What is the minimum internship duration required for AD department?",
      answer: "A minimum of 4 weeks industry internship is mandatory during 3rd year summer vacation. Internship certificates must be submitted to the department coordinator.",
      source: "AD Internship Manual 2026 • Page 10",
      confidence: "95% Verified",
      date: "08 Aug 2026",
      category: "Placement",
    },
    {
      id: 5,
      topic: "Re-evaluation Procedure",
      question: "How to apply for semester exam answer script re-evaluation?",
      answer: "Re-evaluation applications can be submitted online within 7 days of result announcement with a prescribed fee of ₹500 per paper.",
      source: "COE Examination Rules • Page 14",
      confidence: "94% Verified",
      date: "02 Aug 2026",
      category: "Exams",
    },
  ],

  // Parent 3 / Student 3 (Sujan - IT)
  "7376242IT314": [
    {
      id: 1,
      topic: "Cloud Computing Prerequisite",
      question: "What are the prerequisite courses for Cloud Computing elective in IT for Sujan?",
      answer: "Sujan must complete Computer Networks and Operating Systems with a minimum 'C' grade to enroll in the Cloud Computing elective in 6th semester.",
      source: "IT Department Curriculum Handbook • Page 18",
      confidence: "97% Verified",
      date: "Today at 08:45 AM",
      category: "Academic",
    },
    {
      id: 2,
      topic: "IT Practical Attendance Rules",
      question: "What is the mandatory attendance requirement for IT practical labs?",
      answer: "A strict minimum of 80% attendance is required in IT practical lab sessions. Missing more than 2 lab experiments requires mandatory makeup lab hours.",
      source: "IT Lab Regulations 2026 • Page 5",
      confidence: "98% Verified",
      date: "Yesterday at 03:20 PM",
      category: "Academic",
    },
    {
      id: 3,
      topic: "Tuition Fee Deadline",
      question: "What is the last date for semester tuition fee payment for Sujan?",
      answer: "The odd semester tuition fee payment deadline is 30 August 2026. Late fine of ₹100 per day applies from 01 September 2026.",
      source: "BIT Accounts Circular 2026 • Page 1",
      confidence: "96% Verified",
      date: "13 Aug 2026",
      category: "Fees",
    },
    {
      id: 4,
      topic: "IT Software Recruitment",
      question: "Which IT software companies are visiting campus for 3rd year placement drives?",
      answer: "Major IT recruiters including TCS, Infosys, CTS, and Wipro are scheduled for placement drives beginning in August 2026.",
      source: "Placement Cell Circular • Page 9",
      confidence: "95% Verified",
      date: "09 Aug 2026",
      category: "Placement",
    },
    {
      id: 5,
      topic: "Industrial Visit Guidelines",
      question: "What are the safety guidelines for 3rd year IT industrial visits?",
      answer: "Students must wear college ID cards, formal dress code, and submit signed parent consent forms prior to departing for industrial visits.",
      source: "Student Conduct Manual • Page 22",
      confidence: "93% Verified",
      date: "04 Aug 2026",
      category: "Hostel",
    },
  ],
};

export default function Parent1_2() {
  const storedUser = JSON.parse(localStorage.getItem("campusiq_user") || "null");

  const studentRoll = storedUser?.id || "7376242AD267";
  const parentName = storedUser?.name || "Kanagaraj";
  const studentName = storedUser?.linkedStudent || (parentName === "Venkatachalam" ? "Sanjiv" : parentName === "Palanisamy" ? "Sujan" : "Rahul K");

  const historyList = historyByStudent[studentRoll] || historyByStudent["7376242AD267"];

  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);

  const filteredHistory = historyList.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
              <HistoryIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}>
                Parent Query Chat History ({parentName})
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Review past queries for linked student <strong>{studentName}</strong> ({studentRoll})
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Search Control */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2.5,
            borderRadius: "16px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder={`Search past queries for ${studentName} by topic or category...`}
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
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
                "& fieldset": { borderColor: "#E2E8F0" },
                "&:hover fieldset": { borderColor: "#CBD5E1" },
                "&.Mui-focused fieldset": { borderColor: "#8B5CF6" },
              },
            }}
          />
        </Paper>

        {/* History Accordions List */}
        <Stack spacing={2}>
          {filteredHistory.map((item) => (
            <Accordion
              key={item.id}
              expanded={expanded === item.id}
              onChange={handleAccordionChange(item.id)}
              elevation={0}
              sx={{
                borderRadius: "16px !important",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(15, 23, 42, 0.02)",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#8B5CF6" }} />}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", pr: 2, flexWrap: "wrap", gap: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Chip label={item.category} size="small" sx={{ bgcolor: "#EEF2FF", color: "#4338CA", fontWeight: 700, fontSize: "0.75rem" }} />
                    <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.975rem" }}>
                      {item.question}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#64748B", fontSize: "0.775rem" }}>
                    {item.date}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ bgcolor: "#F8FAFC", p: 2.5, borderTop: "1px solid #E2E8F0" }}>
                <Typography sx={{ color: "#334155", fontSize: "0.925rem", lineHeight: 1.6, mb: 2 }}>
                  <strong>Verified Answer:</strong> {item.answer}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ gap: 1 }}>
                  <Chip
                    icon={<VerifiedIcon style={{ color: "#166534", fontSize: 14 }} />}
                    label={item.confidence}
                    size="small"
                    sx={{ bgcolor: "#DCFCE7", color: "#166534", fontWeight: 800, fontSize: "0.75rem" }}
                  />
                  <Chip
                    icon={<MenuBookIcon style={{ color: "#0284C7", fontSize: 14 }} />}
                    label={`Source: ${item.source}`}
                    size="small"
                    sx={{ bgcolor: "#E0F2FE", color: "#0369A1", fontWeight: 700, fontSize: "0.75rem" }}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

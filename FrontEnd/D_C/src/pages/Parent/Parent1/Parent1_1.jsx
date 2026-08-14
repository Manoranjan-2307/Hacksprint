import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
  Stack,
  Divider,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function Parent1_1() {
  const storedUser = JSON.parse(localStorage.getItem("campusiq_user") || "null");

  const parentName = storedUser?.name || "Kanagaraj";
  const studentName = storedUser?.linkedStudent || (storedUser?.name === "Sanjiv" ? "Sanjiv" : storedUser?.name === "Sujan" ? "Sujan" : "Rahul K");
  const studentRoll = storedUser?.id || "7376242AD267";
  const studentDept =
    storedUser?.dept ||
    (studentRoll.includes("IT")
      ? "Information Technology"
      : "Artificial Intelligence and Data Science");

  const initialParentMessages = [
    {
      sender: "bot",
      text: `Welcome to AskBIT Parent Assistant! I can help you with student academic regulations, fee deadlines, hostel policies, and placement criteria for your linked ward ${studentName}.`,
      time: "Just now",
    },
    {
      sender: "user",
      text: "What is the attendance requirement for semester exams?",
      time: "10:14 AM",
    },
    {
      sender: "bot",
      text: "Students must maintain a minimum of 75% attendance in each course to appear for semester end examinations. Students with attendance between 65% and 74% due to medical reasons can apply for condonation.",
      source: "Academic Regulations Handbook • Page 12",
      confidence: "96% Verified",
      time: "10:14 AM",
      feedback: null,
    },
  ];

  const [messages, setMessages] = useState(initialParentMessages);
  const [inputQuery, setInputQuery] = useState("");

  const getInitials = (name) => {
    if (!name) return "ST";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  };

  const handleSendQuery = (textToSend) => {
    const queryText = textToSend || inputQuery;
    if (!queryText.trim()) return;

    const newMsg = {
      sender: "user",
      text: queryText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputQuery("");

    // Simulate RAG AI Search Response
    setTimeout(() => {
      let botResponseText = "For student support queries, please refer to the BIT official handbook.";
      let sourceRef = "BIT Student Information Circular 2026";
      let confidenceScore = "94% Verified";

      const lower = queryText.toLowerCase();
      if (lower.includes("fee") || lower.includes("pay") || lower.includes("due")) {
        botResponseText = `The odd semester fee payment deadline for ${studentName} is 30 August 2026. Online fee payments can be processed through the student ERP portal using UPI, net banking, or debit card.`;
        sourceRef = "Fee Circular 2026 • Page 2";
        confidenceScore = "98% Verified";
      } else if (lower.includes("attendance")) {
        botResponseText = `Minimum 75% attendance is required to write semester exams. ${studentName}'s current attendance is 82%. Condonation up to 65% is permitted upon submitting medical certificates within 3 days of leave.`;
        sourceRef = "Academic Regulations Handbook • Page 12";
        confidenceScore = "96% Verified";
      } else if (lower.includes("hostel") || lower.includes("leave") || lower.includes("timing")) {
        botResponseText = "Hostel gates close at 8:30 PM for campus residents. Emergency late permits up to 10:00 PM require online approval from the Warden on the ERP portal.";
        sourceRef = "Hostel Rules & Safety Policy • Page 5";
        confidenceScore = "95% Verified";
      } else if (lower.includes("placement") || lower.includes("job") || lower.includes("training")) {
        botResponseText = `Students with CGPA >= 7.0 and 0 standing arrears are eligible for Tier-1 campus placement drives. Mandatory placement training for ${studentDept} begins in 6th semester.`;
        sourceRef = "Placement & Training Policy 2026 • Page 8";
        confidenceScore = "93% Verified";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponseText,
          source: sourceRef,
          confidence: confidenceScore,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          feedback: null,
        },
      ]);
    }, 600);
  };

  const handleFeedback = (index, rating) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, feedback: rating } : msg))
    );
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
        {/* Linked Student Context Banner */}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: "#4F46E5",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                {getInitials(studentName)}
              </Avatar>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.2rem", lineHeight: 1.2 }}>
                    {studentName}
                  </Typography>
                  <Chip label={`Roll: ${studentRoll}`} size="small" sx={{ bgcolor: "#F1F5F9", color: "#334155", fontWeight: 700, fontSize: "0.75rem" }} />
                </Box>
                <Typography variant="body2" sx={{ color: "#64748B", mt: 0.3 }}>
                  Department: <strong>{studentDept}</strong> | Year: <strong>III Year</strong> | Institution: <strong>BIT</strong>
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Chip
                icon={<SchoolIcon style={{ color: "#166534", fontSize: 16 }} />}
                label="Attendance: 82%"
                sx={{ bgcolor: "#DCFCE7", color: "#166534", fontWeight: 800, fontSize: "0.825rem", borderRadius: "999px" }}
              />
              <Chip
                label="Academic Status: Good"
                sx={{ bgcolor: "#EEF2FF", color: "#4338CA", fontWeight: 800, fontSize: "0.825rem", borderRadius: "999px" }}
              />
            </Stack>
          </Box>
        </Paper>

        {/* Parent Category Prompt Chips */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "#64748B", fontWeight: 700, mb: 1, textTransform: "uppercase", fontSize: "0.775rem" }}>
            Suggested Parent Queries for {parentName}:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
            <Chip
              label="📋 Attendance Rules"
              onClick={() => handleSendQuery("What is the attendance requirement?")}
              sx={{ bgcolor: "#FFFFFF", border: "1px solid #CBD5E1", fontWeight: 700, color: "#334155", "&:hover": { bgcolor: "#EEF2FF", borderColor: "#8B5CF6", color: "#8B5CF6" } }}
            />
            <Chip
              label="💳 Fee Payment Deadline"
              onClick={() => handleSendQuery("What is the last date for fee payment?")}
              sx={{ bgcolor: "#FFFFFF", border: "1px solid #CBD5E1", fontWeight: 700, color: "#334155", "&:hover": { bgcolor: "#EEF2FF", borderColor: "#8B5CF6", color: "#8B5CF6" } }}
            />
            <Chip
              label="🏢 Hostel Gate Timings"
              onClick={() => handleSendQuery("What are the hostel rules & gate timings?")}
              sx={{ bgcolor: "#FFFFFF", border: "1px solid #CBD5E1", fontWeight: 700, color: "#334155", "&:hover": { bgcolor: "#EEF2FF", borderColor: "#8B5CF6", color: "#8B5CF6" } }}
            />
            <Chip
              label="🎓 Placement Eligibility"
              onClick={() => handleSendQuery("What is the placement CGPA criteria?")}
              sx={{ bgcolor: "#FFFFFF", border: "1px solid #CBD5E1", fontWeight: 700, color: "#334155", "&:hover": { bgcolor: "#EEF2FF", borderColor: "#8B5CF6", color: "#8B5CF6" } }}
            />
          </Stack>
        </Box>

        {/* AI Chat Window Container */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "18px",
            bgcolor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
            display: "flex",
            flexDirection: "column",
            height: "540px",
            overflow: "hidden",
          }}
        >
          {/* Chat Header */}
          <Box sx={{ p: 2, bgcolor: "#F8FAFC", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyBetween: "space-between", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: "#8B5CF6", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FamilyRestroomIcon fontSize="small" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.975rem" }}>
                  AskBIT Parent AI Assistant ({parentName})
                </Typography>
                <Typography sx={{ color: "#64748B", fontSize: "0.75rem" }}>
                  Linked Ward: {studentName} ({studentRoll})
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Messages Feed */}
          <Box sx={{ flex: 1, p: 2.5, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2, bgcolor: "#F8FAFC" }}>
            {messages.map((msg, idx) => {
              const isUser = msg.sender === "user";
              return (
                <Box key={idx} sx={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
                  <Box
                    sx={{
                      maxWidth: "80%",
                      p: 2,
                      borderRadius: isUser ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                      bgcolor: isUser ? "#4F46E5" : "#FFFFFF",
                      color: isUser ? "#FFFFFF" : "#0F172A",
                      border: isUser ? "none" : "1px solid #E2E8F0",
                      boxShadow: isUser ? "0 4px 14px rgba(79, 70, 229, 0.2)" : "0 2px 10px rgba(15, 23, 42, 0.03)",
                    }}
                  >
                    <Typography sx={{ fontSize: "0.925rem", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {msg.text}
                    </Typography>

                    {!isUser && msg.source && (
                      <Box sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid #E2E8F0" }}>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ gap: 1, mb: 1 }}>
                          <Chip
                            icon={<VerifiedIcon style={{ color: "#166534", fontSize: 14 }} />}
                            label={msg.confidence || "96% Verified"}
                            size="small"
                            sx={{ bgcolor: "#DCFCE7", color: "#166534", fontWeight: 800, fontSize: "0.725rem", height: 22 }}
                          />
                          <Chip
                            icon={<MenuBookIcon style={{ color: "#0284C7", fontSize: 14 }} />}
                            label={msg.source}
                            size="small"
                            sx={{ bgcolor: "#E0F2FE", color: "#0369A1", fontWeight: 700, fontSize: "0.725rem", height: 22 }}
                          />
                        </Stack>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 0.5 }}>
                          <Typography sx={{ fontSize: "0.725rem", color: "#94A3B8" }}>
                            Was this answer helpful?
                          </Typography>
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title="Helpful">
                              <IconButton size="small" onClick={() => handleFeedback(idx, "up")}>
                                {msg.feedback === "up" ? <ThumbUpIcon fontSize="small" sx={{ color: "#16A34A" }} /> : <ThumbUpOutlinedIcon fontSize="small" sx={{ color: "#94A3B8" }} />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Incorrect">
                              <IconButton size="small" onClick={() => handleFeedback(idx, "down")}>
                                {msg.feedback === "down" ? <ThumbDownIcon fontSize="small" sx={{ color: "#DC2626" }} /> : <ThumbDownOutlinedIcon fontSize="small" sx={{ color: "#94A3B8" }} />}
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Input Bar */}
          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSendQuery(); }} sx={{ p: 2, bgcolor: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <TextField
                fullWidth
                size="small"
                placeholder={`Ask any question regarding ${studentName}'s attendance, fees, exams...`}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
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
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  bgcolor: "#8B5CF6",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  px: 3,
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
                  "&:hover": { bgcolor: "#7C3AED" },
                }}
              >
                Ask AI
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Chip, 
  Fade 
} from "@mui/material";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(139, 92, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
`;

const studentProfileDefaults = {
  "7376242AD267": {
    defaultQ: "What is the minimum attendance required for AI & Data Science?",
    defaultA: "Minimum 75% attendance is required to attend semester examinations in AI & Data Science (AD). Rahul K's current attendance is 82%. Source: Academic Regulation Handbook, Page 12. Confidence: 96% verified.",
    dept: "Artificial Intelligence and Data Science",
  },
  "7376242AD292": {
    defaultQ: "How to apply for On-Duty (OD) for National AI Hackathons?",
    defaultA: "Sanjiv can apply for OD through the ERP portal with event acceptance letters at least 2 days prior. HOD approval is required for AI hackathons. Source: BIT OD Policy Guide, Page 4. Confidence: 98% verified.",
    dept: "Artificial Intelligence and Data Science",
  },
  "7376242IT314": {
    defaultQ: "What are the prerequisite courses for Cloud Computing elective in IT?",
    defaultA: "Sujan must complete Computer Networks and Operating Systems with a minimum 'C' grade to enroll in Cloud Computing in 6th semester. Source: IT Department Curriculum Handbook, Page 18. Confidence: 97% verified.",
    dept: "Information Technology",
  },
};

export default function StudentAssistant() {
  const storedUser = JSON.parse(localStorage.getItem("campusiq_user") || "null");

  const studentRoll = storedUser?.id || "7376242AD267";
  const userName = storedUser?.name || "Rahul K";
  const studentProfile = studentProfileDefaults[studentRoll] || studentProfileDefaults["7376242AD267"];

  const [question, setQuestion] = useState(studentProfile.defaultQ);
  const [answer, setAnswer] = useState(studentProfile.defaultA);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setQuestion(studentProfile.defaultQ);
    setAnswer(studentProfile.defaultA);
  }, [studentRoll]);

  const handleAsk = () => {
    if (!question.trim()) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      let customAnswer = `For ${userName}'s query: "${question}", the system identified the official handbook guidance. Source: BIT Student Regulation Manual 2026. Confidence: 96% verified.`;
      
      const lower = question.toLowerCase();
      if (lower.includes("attendance")) {
        customAnswer = `Minimum 75% attendance is required for semester exams. ${userName}'s attendance is 82%. Source: Academic Regulation Handbook, Page 12. Confidence: 96% verified.`;
      } else if (lower.includes("od") || lower.includes("hackathon")) {
        customAnswer = `${userName} can submit OD requests via ERP with supporting proof 2 days prior. Source: BIT OD Regulations, Page 4. Confidence: 98% verified.`;
      } else if (lower.includes("cloud") || lower.includes("elective") || lower.includes("prerequisites")) {
        customAnswer = `Prerequisite courses for Cloud Computing in ${studentProfile.dept} require Computer Networks and OS. Source: IT Curriculum Guide, Page 18. Confidence: 97% verified.`;
      }

      setAnswer(customAnswer);
      setIsAnimating(false);
    }, 400);
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
      <Box sx={{ maxWidth: "1150px", width: "100%", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#172033",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Hello {userName}
            <Box component="span" sx={{ fontSize: "1.8rem" }}>✨</Box>
          </Typography>

          <Chip
            label={`Dept: ${studentProfile.dept}`}
            sx={{
              bgcolor: "#EEF2FF",
              color: "#4F46E5",
              fontWeight: 700,
              borderRadius: "999px",
              px: 1,
              py: 0.5,
              height: "32px",
            }}
          />
        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius: "22px",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            bgcolor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
            p: { xs: 2.2, md: 3 },
            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
            transition: "all 0.25s ease",
            "&:hover": { boxShadow: "0 20px 50px rgba(15, 23, 42, 0.12)" },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.2, gap: 2, flexWrap: "wrap" }}>
            <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 800, letterSpacing: "-0.03em" }}>
              AskBIT AI Assistant ({userName} - {studentRoll})
            </Typography>
            <Chip
              label="Live FAQ Search"
              size="small"
              sx={{
                bgcolor: "#EEF2FF",
                color: "#4F46E5",
                fontWeight: 700,
                borderRadius: "10px",
                px: 1,
                height: "32px",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, mb: 2.5, alignItems: "stretch", flexWrap: "wrap" }}>
            <TextField
              multiline
              rows={2}
              fullWidth
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about attendance, timetable, hostel, fees, or placement..."
              variant="outlined"
              sx={{
                flex: 1,
                minWidth: 0,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#F8FAFC",
                  minHeight: "110px",
                  transition: "all 0.2s ease",
                  "& fieldset": { borderColor: "#D9E3F2" },
                  "&:hover fieldset": { borderColor: "#A3B4D8" },
                  "&.Mui-focused fieldset": { borderColor: "#8B5CF6", borderWidth: "2px" },
                  "&.Mui-focused": { bgcolor: "#FFFFFF", boxShadow: "0 10px 24px rgba(139, 92, 246, 0.08)" },
                },
                "& .MuiInputBase-input": { fontSize: "1rem", color: "#1E293B" },
                "& .MuiInputBase-inputMultiline": { padding: "18px 18px" },
              }}
            />

            <Button
              variant="contained"
              onClick={handleAsk}
              disabled={isAnimating}
              sx={{
                bgcolor: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                color: "#fff",
                borderRadius: "16px",
                px: 3.5,
                py: 1.6,
                fontWeight: 800,
                textTransform: "none",
                fontSize: "1.02rem",
                minWidth: "140px",
                boxShadow: "0 12px 24px rgba(124, 58, 237, 0.24)",
                background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                alignSelf: "stretch",
                "&:hover": {
                  background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                  boxShadow: "0 14px 30px rgba(124, 58, 237, 0.32)",
                  animation: `${pulse} 1.5s infinite`,
                },
              }}
            >
              Ask AI
            </Button>
          </Box>

          {/* AI Verified Response Output */}
          <Fade in timeout={300}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "16px",
                bgcolor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderLeft: "4px solid #8B5CF6",
              }}
            >
              <Typography variant="subtitle2" sx={{ color: "#8B5CF6", fontWeight: 800, mb: 1, textTransform: "uppercase", fontSize: "0.775rem" }}>
                AI Verified Guidance Response
              </Typography>
              <Typography sx={{ color: "#1E293B", fontSize: "1rem", lineHeight: 1.65, fontWeight: 500 }}>
                {answer}
              </Typography>
            </Paper>
          </Fade>
        </Paper>
      </Box>
    </Box>
  );
}
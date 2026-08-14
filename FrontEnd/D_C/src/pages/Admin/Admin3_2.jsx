import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Chip,
  Stack,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import StorageIcon from "@mui/icons-material/Storage";
import MemoryIcon from "@mui/icons-material/Memory";
import TuneIcon from "@mui/icons-material/Tune";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";

export default function Admin3_2() {
  const [embeddingModel, setEmbeddingModel] = useState("Sentence Transformer (all-MiniLM-L6-v2)");
  const [vectorDb, setVectorDb] = useState("FAISS (Facebook AI Similarity Search)");
  const [similarityThreshold, setSimilarityThreshold] = useState(0.75);
  const [topK, setTopK] = useState(5);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleSaveSettings = (e) => {
    if (e) e.preventDefault();
    setToastMsg("RAG Configuration saved successfully! Similarity threshold set to " + similarityThreshold + ".");
    setToastOpen(true);
  };

  const handleRefreshVectorStore = () => {
    setToastMsg("Vector Store Refreshed! 1,102 published FAQs re-indexed into FAISS.");
    setToastOpen(true);
  };

  const handleReindexDataset = () => {
    setToastMsg("FAQ Dataset re-indexing started. Embeddings updating in background...");
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
                bgcolor: "rgba(22, 163, 74, 0.12)",
                color: "#16A34A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SettingsSuggestIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.2 }}>
                AI Model & RAG Settings
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748B", mt: 0.2 }}>
                Configure RAG vector store parameters, similarity thresholds, top-k retrieval, and embedding re-indexing
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Main RAG Settings Form */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "18px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 3 }}>
                RAG Pipeline Configuration
              </Typography>

              <Box component="form" onSubmit={handleSaveSettings}>
                <Stack spacing={3}>
                  {/* Embedding Model */}
                  <FormControl fullWidth size="small">
                    <InputLabel id="embedding-model-label">Embedding Model</InputLabel>
                    <Select
                      labelId="embedding-model-label"
                      value={embeddingModel}
                      label="Embedding Model"
                      onChange={(e) => setEmbeddingModel(e.target.value)}
                      sx={{ borderRadius: "12px", bgcolor: "#F8FAFC" }}
                    >
                      <MenuItem value="Sentence Transformer (all-MiniLM-L6-v2)">
                        Sentence Transformer (all-MiniLM-L6-v2) - Default
                      </MenuItem>
                      <MenuItem value="OpenAI Text Embedding Ada 002">
                        OpenAI Text Embedding Ada 002
                      </MenuItem>
                      <MenuItem value="BGE Small English v1.5">
                        BGE Small English v1.5
                      </MenuItem>
                    </Select>
                  </FormControl>

                  {/* Vector Database */}
                  <FormControl fullWidth size="small">
                    <InputLabel id="vector-db-label">Vector Database Engine</InputLabel>
                    <Select
                      labelId="vector-db-label"
                      value={vectorDb}
                      label="Vector Database Engine"
                      onChange={(e) => setVectorDb(e.target.value)}
                      sx={{ borderRadius: "12px", bgcolor: "#F8FAFC" }}
                    >
                      <MenuItem value="FAISS (Facebook AI Similarity Search)">
                        FAISS (Facebook AI Similarity Search) - Local High Speed
                      </MenuItem>
                      <MenuItem value="Chroma DB">Chroma DB</MenuItem>
                      <MenuItem value="Pinecone Vector Database">Pinecone Vector Database</MenuItem>
                    </Select>
                  </FormControl>

                  <Divider sx={{ borderColor: "#E2E8F0" }} />

                  {/* Similarity Threshold Slider */}
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>
                        Similarity Threshold (Cosine Score)
                      </Typography>
                      <Chip label={`${similarityThreshold}`} color="primary" size="small" sx={{ fontWeight: 800, borderRadius: "6px" }} />
                    </Box>
                    <Typography sx={{ color: "#64748B", fontSize: "0.8rem", mb: 1.5 }}>
                      Queries scoring below this threshold will trigger low-confidence faculty review.
                    </Typography>
                    <Slider
                      value={similarityThreshold}
                      min={0.5}
                      max={0.95}
                      step={0.01}
                      onChange={(e, val) => setSimilarityThreshold(val)}
                      sx={{ color: "#8B5CF6" }}
                    />
                  </Box>

                  {/* Top-K Retrieval Slider */}
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography sx={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>
                        Top-K Document Retrieval Count
                      </Typography>
                      <Chip label={`${topK} Documents`} color="secondary" size="small" sx={{ fontWeight: 800, borderRadius: "6px" }} />
                    </Box>
                    <Typography sx={{ color: "#64748B", fontSize: "0.8rem", mb: 1.5 }}>
                      Number of relevant handbook context chunks passed to the LLM prompt.
                    </Typography>
                    <Slider
                      value={topK}
                      min={1}
                      max={10}
                      step={1}
                      onChange={(e, val) => setTopK(val)}
                      sx={{ color: "#4F46E5" }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      sx={{ bgcolor: "#8B5CF6", color: "#FFF", borderRadius: "12px", px: 3.5, py: 1.1, fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "#7C3AED" } }}
                    >
                      Save Configuration
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Quick System Action Controls Panel */}
          <Grid item xs={12} md={4}>
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
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 2 }}>
                Vector Store Operations
              </Typography>

              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefreshVectorStore}
                  sx={{ borderRadius: "12px", py: 1.2, textTransform: "none", fontWeight: 700, color: "#4F46E5", borderColor: "#C7D2FE" }}
                >
                  Refresh Vector Store & Embeddings
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<StorageIcon />}
                  onClick={handleReindexDataset}
                  sx={{ borderRadius: "12px", py: 1.2, textTransform: "none", fontWeight: 700, color: "#0EA5E9", borderColor: "#BAE6FD" }}
                >
                  Re-index FAQ Dataset
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => { setToastMsg("Exported full analytics CSV report!"); setToastOpen(true); }}
                  sx={{ borderRadius: "12px", py: 1.2, textTransform: "none", fontWeight: 700, color: "#16A34A", borderColor: "#BBF7D0" }}
                >
                  Export System Analytics Report
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar open={toastOpen} autoHideDuration={4500} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ borderRadius: "12px", fontWeight: 600 }}>
            {toastMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
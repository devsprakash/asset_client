// pages/admin/checklists/ImportChecklistFields.jsx
import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  alpha,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Alert,
  Snackbar,
  CircularProgress,
  Grid,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useChecklist } from "../context/ChecklistContext";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const primaryColor = "#002630";
const accentColor = "#356575";

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  bgcolor: "background.default",
}));

const StyledHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(
    2,
    3,
    2,
    { xs: 2, sm: 3, md: 8 }[
      theme.breakpoints.keys.find((k) => theme.breakpoints.up(k)) || "md"
    ],
  ),
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e2e8f0",
  borderRadius: 0,
  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(1.5, 2) },
}));

const UploadZone = styled(Box)(({ theme, isDragOver }) => ({
  position: "relative",
  border: "2px dashed",
  borderColor: isDragOver ? accentColor : alpha("#000", 0.15),
  borderRadius: 12,
  backgroundColor: isDragOver
    ? alpha(accentColor, 0.04)
    : alpha(theme.palette.background.default, 0.5),
  transition: "all 0.2s",
  textAlign: "center",
  padding: theme.spacing(8, 3),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: alpha(accentColor, 0.03),
    borderColor: alpha(accentColor, 0.5),
  },
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(5, 2) },
}));

const CATEGORIES = [
  "Safety",
  "Maintenance",
  "Compliance",
  "Audit",
  "Quality",
  "Operations",
];

const ImportChecklistFields = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { importChecklistFromExcel, loading } = useChecklist();
  const fileInputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [meta, setMeta] = useState({ name: "", description: "", category: "" });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    severity: "success",
  });
  const [importedResult, setImportedResult] = useState(null);

  const handleFileChange = (file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["xlsx", "xls"].includes(ext)) {
      setSnack({
        open: true,
        msg: "Only .xlsx and .xls files are supported.",
        severity: "error",
      });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setSnack({
        open: true,
        msg: "File size must be under 10MB.",
        severity: "error",
      });
      return;
    }
    setSelectedFile(file);
    setImportedResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files[0]);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setSnack({
        open: true,
        msg: "Please select an Excel file first.",
        severity: "error",
      });
      return;
    }
    if (!meta.name.trim()) {
      setSnack({
        open: true,
        msg: "Please provide a checklist name.",
        severity: "error",
      });
      return;
    }
    // Simulate progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      setUploadProgress(Math.min(prog, 90));
      if (prog >= 90) clearInterval(interval);
    }, 200);
    try {
      const result = await importChecklistFromExcel(selectedFile, meta);
      clearInterval(interval);
      setUploadProgress(100);
      setImportedResult(result._doc || result);
      setSnack({
        open: true,
        msg: "Checklist imported successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/admin/checklists"), 2000);
    } catch (err) {
      clearInterval(interval);
      setUploadProgress(0);
      setSnack({
        open: true,
        msg: err.message || "Import failed.",
        severity: "error",
      });
    }
  };

  const formatSize = (bytes) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <PageContainer>
      <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
        <Snackbar
          open={snack.open}
          autoHideDuration={4000}
          onClose={() => setSnack({ ...snack, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity={snack.severity}
            variant="filled"
            sx={{ borderRadius: "10px" }}
          >
            {snack.msg}
          </Alert>
        </Snackbar>

        {/* Header */}
        <Paper
          elevation={0}
          square
          sx={{
            px: { xs: 2, sm: 3, md: 6 },
            py: { xs: 2, sm: 2.5 },
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <IconButton
              size="small"
              onClick={() => navigate("/admin/checklists")}
              sx={{
                color: "#002630",
                bgcolor: "#f1f5f9",
                "&:hover": { bgcolor: "#e2e8f0" },
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#002630",
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                Import Checklist Fields
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
              >
                Upload an Excel sheet to auto-generate input fields
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "flex-end", sm: "flex-start" },
            }}
          >
            <Button
              variant="text"
              size="small"
              sx={{
                color: "#002630",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                fontWeight: 500,
                px: 2,
              }}
            >
              Preview
            </Button>
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={() => navigate("/admin/assign-checklist")}
              sx={{
                bgcolor: "#002630",
                color: "white",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                fontWeight: 500,
                px: 2,
                "&:hover": { bgcolor: "#003d4c" },
              }}
            >
              Assign to Customers
            </Button>
          </Stack>
        </Paper>

        <Container
          maxWidth="lg"
          sx={{ px: { xs: 2, sm: 3, md: 6 }, py: { xs: 3, sm: 4, md: 5 } }}
        >
          {/* Tab Indicator */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              mb: { xs: 3, sm: 4 },
            }}
          >
            <Typography
              variant="subtitle2"
              component="span"
              sx={{
                display: "inline-block",
                px: 2,
                py: 1.5,
                fontWeight: 700,
                color: accentColor,
                borderBottom: 2,
                borderColor: accentColor,
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
              }}
            >
              Checklist Builder
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Upload Card */}
            <Grid item xs={12} md={7}>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ borderRadius: 2, overflow: "hidden" }}
              >
                <Box sx={{ p: { xs: 3, sm: 4 } }}>
                  <UploadZone
                    isDragOver={isDragOver}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls"
                      hidden
                      onChange={(e) => handleFileChange(e.target.files[0])}
                    />

                    {selectedFile ? (
                      <>
                        <Box
                          sx={{
                            width: { xs: 48, sm: 56 },
                            height: { xs: 48, sm: 56 },
                            bgcolor: alpha(accentColor, 0.1),
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          <InsertDriveFileIcon
                            sx={{
                              color: accentColor,
                              fontSize: { xs: 28, sm: 32 },
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "#0f172a",
                            mb: 0.5,
                            fontSize: { xs: "0.95rem", sm: "1rem" },
                          }}
                        >
                          {selectedFile.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.75rem", mb: 2 }}
                        >
                          {formatSize(selectedFile.size)} · Excel Spreadsheet
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >
                          <Chip
                            label="Ready to import"
                            size="small"
                            icon={
                              <CheckCircleIcon
                                sx={{
                                  fontSize: "0.8rem !important",
                                  color: "#16a34a !important",
                                }}
                              />
                            }
                            sx={{
                              bgcolor: "#dcfce7",
                              color: "#166534",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                            }}
                          />
                          <Chip
                            label="Change file"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                            }}
                            icon={
                              <DeleteOutlineIcon
                                sx={{ fontSize: "0.8rem !important" }}
                              />
                            }
                            sx={{
                              bgcolor: "#f1f5f9",
                              color: "#475569",
                              fontSize: "0.7rem",
                              cursor: "pointer",
                            }}
                          />
                        </Stack>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            width: { xs: 56, sm: 64 },
                            height: { xs: 56, sm: 64 },
                            bgcolor: alpha(accentColor, 0.08),
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 3,
                          }}
                        >
                          <CloudUploadIcon
                            sx={{
                              color: accentColor,
                              fontSize: { xs: 32, sm: 40 },
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "#0f172a",
                            mb: 1,
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                          }}
                        >
                          Drop your Excel file here or click to browse
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxWidth: 360,
                            mx: "auto",
                            mb: 3,
                            fontSize: { xs: "0.65rem", sm: "0.75rem" },
                          }}
                        >
                          Supports .xlsx and .xls formats. The system will
                          automatically map columns to checklist fields.
                        </Typography>
                        <Button
                          variant="contained"
                          disableElevation
                          startIcon={<DescriptionIcon />}
                          onClick={(e) => e.preventDefault()}
                          sx={{
                            bgcolor: "#002630",
                            color: "white",
                            px: 4,
                            py: 1.25,
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            "&:hover": { bgcolor: "#003d4c" },
                          }}
                        >
                          Select File
                        </Button>
                      </>
                    )}
                  </UploadZone>

                  {/* Upload Progress */}
                  {loading && (
                    <Box sx={{ mt: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "0.75rem", color: "#64748b" }}
                        >
                          Importing checklist...
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: accentColor,
                          }}
                        >
                          {uploadProgress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                        sx={{
                          borderRadius: 4,
                          height: 6,
                          bgcolor: alpha(accentColor, 0.1),
                          "& .MuiLinearProgress-bar": { bgcolor: accentColor },
                        }}
                      />
                    </Box>
                  )}

                  {/* Import Result Preview */}
                  {importedResult && (
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        bgcolor: "#f0fdf4",
                        borderRadius: "10px",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: "#166534",
                          mb: 0.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: "1rem" }} /> Import
                        Successful
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.75rem", color: "#166534" }}
                      >
                        Created: <strong>{importedResult.name}</strong> ·{" "}
                        {importedResult.totalFields} fields across{" "}
                        {importedResult.sections?.length} sections
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>

            {/* Meta Info Sidebar */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ borderRadius: 2, p: { xs: 3, sm: 3.5 } }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#0f172a",
                    fontSize: "0.95rem",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <InfoOutlinedIcon
                    sx={{ fontSize: "1.1rem", color: accentColor }}
                  />{" "}
                  Checklist Details
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#475569",
                        mb: 0.75,
                        textTransform: "uppercase",
                        letterSpacing: "0.3px",
                      }}
                    >
                      Checklist Name *
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="e.g., Safety Inspection Q2"
                      value={meta.name}
                      onChange={(e) =>
                        setMeta((p) => ({ ...p, name: e.target.value }))
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          fontSize: "0.8rem",
                          "& fieldset": {
                            borderColor: alpha(accentColor, 0.2),
                          },
                          "&:hover fieldset": { borderColor: accentColor },
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#475569",
                        mb: 0.75,
                        textTransform: "uppercase",
                        letterSpacing: "0.3px",
                      }}
                    >
                      Category
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        value={meta.category}
                        onChange={(e) =>
                          setMeta((p) => ({ ...p, category: e.target.value }))
                        }
                        displayEmpty
                        sx={{
                          borderRadius: "10px",
                          fontSize: "0.8rem",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(accentColor, 0.2),
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em style={{ color: "#94a3b8" }}>Select category</em>
                        </MenuItem>
                        {CATEGORIES.map((c) => (
                          <MenuItem
                            key={c}
                            value={c}
                            sx={{ fontSize: "0.8rem" }}
                          >
                            {c}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#475569",
                        mb: 0.75,
                        textTransform: "uppercase",
                        letterSpacing: "0.3px",
                      }}
                    >
                      Description
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                      placeholder="Brief description of this checklist..."
                      value={meta.description}
                      onChange={(e) =>
                        setMeta((p) => ({ ...p, description: e.target.value }))
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          fontSize: "0.8rem",
                          "& fieldset": {
                            borderColor: alpha(accentColor, 0.2),
                          },
                        },
                      }}
                    />
                  </Box>

                  <Divider />

                  {/* Excel format hint */}
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: alpha(accentColor, 0.04),
                      borderRadius: "10px",
                      border: `1px dashed ${alpha(accentColor, 0.3)}`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: accentColor,
                        mb: 0.75,
                      }}
                    >
                      Expected Excel Format
                    </Typography>
                    {[
                      ["A", "Label (field name)"],
                      ["B", "Field Type (text_input, dropdown, etc.)"],
                      ["C", "Required (true/false)"],
                      ["D", "Placeholder text"],
                      ["E", "Options (comma-separated)"],
                    ].map(([col, desc]) => (
                      <Box key={col} sx={{ display: "flex", gap: 1, mb: 0.25 }}>
                        <Chip
                          label={col}
                          size="small"
                          sx={{
                            height: 18,
                            width: 24,
                            fontSize: "0.6rem",
                            bgcolor: accentColor,
                            color: "#fff",
                            borderRadius: "4px",
                          }}
                        />
                        <Typography
                          sx={{ fontSize: "0.65rem", color: "#475569" }}
                        >
                          {desc}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    startIcon={
                      loading ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <CloudUploadIcon />
                      )
                    }
                    onClick={handleImport}
                    disabled={loading || !selectedFile}
                    sx={{
                      bgcolor: "#002630",
                      color: "white",
                      py: 1.25,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      "&:hover": { bgcolor: "#003d4c" },
                      "&:disabled": { bgcolor: alpha("#002630", 0.4) },
                      borderRadius: "10px",
                    }}
                  >
                    {loading ? "Importing..." : "Import Checklist"}
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default ImportChecklistFields;

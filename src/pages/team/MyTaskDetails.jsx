import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Rating,
  Button,
  IconButton,
  Stack,
  Chip,
  alpha,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NoteIcon from "@mui/icons-material/Note";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0d3d56" },
    secondary: { main: "#1a6b8a" },
    success: { main: "#2e7d32" },
    warning: { main: "#ed6c02" },
    error: { main: "#d32f2f" },
    background: { default: "#f8f9fc", paper: "#ffffff" },
    text: { primary: "#1e293b", secondary: "#64748b" },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    h6: { fontWeight: 700, color: "#0d3d56", letterSpacing: "-0.01em" },
    subtitle2: { fontWeight: 600, color: "#0d3d56", fontSize: "0.85rem", letterSpacing: "-0.01em" },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #eef2f6",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)",
          transition: "all 0.2s ease",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#fff",
          "& fieldset": { borderColor: "#e2e8f0" },
          "&:hover fieldset": { borderColor: "#94a3b8" },
        },
        input: { padding: "12px 14px", fontSize: "0.875rem", color: "#1e293b" },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: { padding: "12px 14px", fontSize: "0.875rem" },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 8, borderRadius: 4, backgroundColor: "#e2e8f0" },
        bar: { borderRadius: 4, backgroundColor: "#0d3d56" },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: "4px 8px",
          color: "#cbd5e1",
          "&.Mui-checked": { color: "#0d3d56" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, textTransform: "none", fontWeight: 600, padding: "10px 24px" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 500 },
      },
    },
  },
});

const CHECKLIST_ITEMS = [
  "All safety guards in place",
  "No visible damage or wear",
  "Operating within normal parameters",
  "Emergency stop functional",
  "Proper ventilation",
];

const CONDITIONS = [
  { value: "Good", label: "Good", color: "#2e7d32", icon: CheckCircleIcon },
  { value: "Fair", label: "Fair", color: "#ed6c02", icon: WarningIcon },
  { value: "Poor", label: "Poor", color: "#d32f2f", icon: ErrorIcon },
  { value: "Critical", label: "Critical", color: "#b91c1c", icon: ErrorIcon },
];

// Upload Zone Component
function UploadZone({ label, height = 140 }) {
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    setFiles([...files, ...Array.from(e.dataTransfer.files)]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Box>
      {label && (
        <Typography variant="subtitle2" sx={{ mb: 1.5, display: "flex", alignItems: "center", gap: 0.5 }}>
          <PhotoCameraIcon sx={{ fontSize: 18, color: "#0d3d56" }} />
          {label}
        </Typography>
      )}
      <Box
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        sx={{
          border: `2px dashed ${dragging ? "#0d3d56" : "#e2e8f0"}`,
          borderRadius: 3,
          height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s",
          bgcolor: dragging ? alpha("#0d3d56", 0.02) : "#fafcff",
          "&:hover": { borderColor: "#94a3b8", bgcolor: "#f8fafc" },
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/heic"
          hidden
          onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}
        />
        <FileUploadOutlinedIcon sx={{ fontSize: 36, color: "#94a3b8", mb: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          Click to upload
        </Typography>
        <Typography variant="caption" color="text.disabled">
          PNG, JPG, HEIC up to 10MB
        </Typography>
        {files.length > 0 && (
          <Box sx={{ mt: 1, display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
            {files.slice(0, 3).map((file, idx) => (
              <Chip
                key={idx}
                label={file.name.length > 20 ? file.name.slice(0, 17) + "..." : file.name}
                size="small"
                onDelete={() => removeFile(idx)}
                deleteIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
                sx={{ fontSize: "0.7rem", height: 24 }}
              />
            ))}
            {files.length > 3 && (
              <Chip label={`+${files.length - 3} more`} size="small" sx={{ fontSize: "0.7rem" }} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Signature Pad Component
function SignaturePad() {
  const canvasRef = useRef();
  const [drawing, setDrawing] = useState(false);
  const [signed, setSigned] = useState(false);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches?.[0];
    return {
      x: (touch?.clientX ?? e.clientX) - rect.left,
      y: (touch?.clientY ?? e.clientY) - rect.top,
    };
  };

  const startDraw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDrawing(true);
    setSigned(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0d3d56";
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDraw = () => setDrawing(false);
  const clear = () => {
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1.5, display: "flex", alignItems: "center", gap: 0.5 }}>
        <EditIcon sx={{ fontSize: 18, color: "#0d3d56" }} />
        Digital Signature
      </Typography>
      <Box sx={{ border: "2px solid #e2e8f0", borderRadius: 3, overflow: "hidden", position: "relative", bgcolor: "#fff" }}>
        {!signed && (
          <Stack alignItems="center" justifyContent="center" sx={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            <Box sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
              <EditIcon sx={{ fontSize: 28, color: "#64748b" }} />
            </Box>
            <Typography variant="body2" color="text.secondary">Tap or draw to sign</Typography>
          </Stack>
        )}
        <canvas
          ref={canvasRef}
          width={900}
          height={160}
          style={{ display: "block", width: "100%", height: 160, cursor: "crosshair", background: "#fff" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        {signed && (
          <Button size="small" onClick={clear} sx={{ position: "absolute", bottom: 8, right: 8, fontSize: "0.7rem", color: "#64748b", bgcolor: "white", "&:hover": { bgcolor: "#f1f5f9" } }}>
            Clear
          </Button>
        )}
      </Box>
    </Box>
  );
}

// Section Component
function Section({ title, icon: Icon, children }) {
  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2.5, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 1 }}>
          {Icon && <Icon sx={{ fontSize: 22, color: "#0d3d56" }} />}
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
}

// ReadOnly Field
function ReadOnlyField({ value, icon: Icon }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {Icon && <Icon sx={{ fontSize: 18, color: "#64748b" }} />}
      <Box sx={{ flex: 1, bgcolor: "#f8fafc", borderRadius: 2, px: 2, py: 1.25, border: "1px solid #e2e8f0", color: "#1e293b", fontSize: "0.875rem", fontWeight: 500 }}>
        {value}
      </Box>
    </Box>
  );
}

// Checklist Row
function ChecklistRow({ label }) {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const [fileName, setFileName] = useState(null);

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: 1.5, py: 1, borderBottom: "1px solid #f1f5f9" }}>
      <Typography variant="body2" sx={{ color: "#334155", fontWeight: 500, minWidth: { sm: 220 }, fontSize: "0.85rem" }}>
        {label}
      </Typography>
      <RadioGroup row value={value} onChange={(e) => setValue(e.target.value)} sx={{ gap: 0 }}>
        <FormControlLabel value="yes" control={<Radio size="small" />} label={<Typography variant="body2">Yes</Typography>} sx={{ mr: 1 }} />
        <FormControlLabel value="no" control={<Radio size="small" />} label={<Typography variant="body2">No</Typography>} sx={{ mr: 1 }} />
      </RadioGroup>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }} onClick={() => inputRef.current.click()}>
        <PhotoCameraIcon sx={{ fontSize: 16, color: "#0d3d56" }} />
        <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>Add photo</Typography>
        <input ref={inputRef} type="file" hidden accept="image/*" onChange={(e) => setFileName(e.target.files[0]?.name)} />
      </Box>
      {fileName && (
        <Chip 
          label={fileName.length > 25 ? fileName.slice(0, 22) + "..." : fileName} 
          size="small" 
          onDelete={() => setFileName(null)} 
          deleteIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
          sx={{ fontSize: "0.7rem" }} 
        />
      )}
    </Box>
  );
}

// Main Component
export default function SafetyInspection() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [condition, setCondition] = useState("");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [inspectorName, setInspectorName] = useState("Mike Johnson");

  const progress = 35;

  const selectedCondition = CONDITIONS.find(c => c.value === condition);
  const ConditionIcon = selectedCondition?.icon;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", pb: 4 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 1.5, sm: 2, md: 3 } }}>
          {/* Header with Back Link */}
          <Box sx={{ pt: { xs: 2, sm: 3 }, pb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton 
                  onClick={() => navigate("/team")} 
                  sx={{ color: "#0d3d56", "&:hover": { bgcolor: alpha("#0d3d56", 0.04) } }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontSize: "1.35rem", fontWeight: 700, color: "#0d3d56" }}>
                  Safety Inspection
                </Typography>
              </Box>
              <Chip 
                label="Generator Unit" 
                size="small" 
                sx={{ bgcolor: "#e6f0f5", color: "#0d3d56", fontWeight: 600, fontSize: "0.7rem" }} 
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 5, mb: 1.5, display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 14 }} />
              Generator Unit A-12 • Building A – Floor 3
            </Typography>
          </Box>

          {/* Progress Card */}
          <Paper sx={{ p: { xs: 2, sm: 2.5 }, mb: 2, bgcolor: "#ffffff" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
              <Typography variant="body2" fontWeight={600}>Inspection Progress</Typography>
              <Typography variant="h6" fontWeight={700} color="primary">{progress}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
              Complete checklist, rating, and signature
            </Typography>
          </Paper>

          {/* Asset Information */}
          <Section title="Asset Information" icon={AssessmentIcon}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>Asset Name</Typography>
                <ReadOnlyField value="Generator Unit A-12" icon={ElectricalServicesIcon} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>Location</Typography>
                <ReadOnlyField value="Building A, Floor 3" icon={LocationOnIcon} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>Category</Typography>
                <ReadOnlyField value="Electrical / Power" icon={CategoryIcon} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>Last Inspection</Typography>
                <ReadOnlyField value="October 5, 2024" icon={CalendarTodayIcon} />
              </Grid>
            </Grid>
          </Section>

          {/* Inspection Details */}
          <Section title="Inspection Details" icon={AssignmentIcon}>
            <Typography variant="subtitle2" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
              <PersonIcon sx={{ fontSize: 16 }} />
              Inspector Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter inspector name"
              value={inspectorName}
              onChange={(e) => setInspectorName(e.target.value)}
              size="small"
              sx={{ mb: 2.5 }}
            />

            <Typography variant="subtitle2" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
              <AssessmentIcon sx={{ fontSize: 16 }} />
              Overall Condition
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
              <Select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                displayEmpty
                renderValue={(v) => v || "Select condition"}
                sx={{ bgcolor: "#fff" }}
              >
                {CONDITIONS.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box component={c.icon} sx={{ fontSize: 18, color: c.color }} />
                      <Typography>{c.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="subtitle2" sx={{ mb: 1.5, display: "flex", alignItems: "center", gap: 0.5 }}>
              <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32" }} />
              Safety Checklist
            </Typography>
            <Stack spacing={0.5} sx={{ mb: 3 }}>
              {CHECKLIST_ITEMS.map((item) => (
                <ChecklistRow key={item} label={item} />
              ))}
            </Stack>

            <Typography variant="subtitle2" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarIcon sx={{ fontSize: 16, color: "#f5b042" }} />
              Performance Rating
            </Typography>
            <Rating
              value={rating}
              onChange={(_, v) => setRating(v)}
              icon={<StarIcon sx={{ color: "#f5b042", fontSize: { xs: 28, sm: 32 } }} />}
              emptyIcon={<StarBorderIcon sx={{ color: "#cbd5e1", fontSize: { xs: 28, sm: 32 } }} />}
              sx={{ mb: 3 }}
            />

            <Typography variant="subtitle2" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
              <NoteIcon sx={{ fontSize: 16 }} />
              Additional Notes
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Enter observations, issues, or recommendations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{ mb: 3 }}
            />

            <UploadZone label="Upload Supporting Photos" height={130} />
          </Section>

          {/* Signature Section */}
          <Section title="Sign Off" icon={EditIcon}>
            <SignaturePad />
            <Box sx={{ mt: 3 }}>
              <UploadZone label="Upload Completed Action / Work Order" height={120} />
            </Box>
          </Section>

          {/* Action Buttons */}
          <Paper sx={{ p: { xs: 2, sm: 2.5 }, position: "sticky", bottom: 0, bgcolor: "#ffffff", borderTop: "1px solid #eef2f6", borderRadius: "16px 16px 0 0" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  sx={{ borderColor: "#cbd5e1", color: "#475569", py: 1.25, "&:hover": { borderColor: "#0d3d56", color: "#0d3d56" } }}
                >
                  Save Draft
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<SendIcon />}
                  sx={{ bgcolor: "#0d3d56", py: 1.25, "&:hover": { bgcolor: "#0a2f42" } }}
                  onClick={() => alert("Inspection submitted successfully!")}
                >
                  Submit Inspection
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
// pages/admin/checklists/CustomChecklistBuilder.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Rating,
  Chip,
  Divider,
  IconButton,
  Avatar,
  Grid,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { useChecklist } from "../context/ChecklistContext";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import SecurityIcon from "@mui/icons-material/Security";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SaveIcon from "@mui/icons-material/Save";
import PreviewIcon from "@mui/icons-material/Preview";
import AddIcon from "@mui/icons-material/Add";
import TextFieldsIcon from "@mui/icons-material/TextFields";

const primaryColor = "#085d63";

// ─── Styled Components ────────────────────────────────────────────
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(1) },
}));

const Header = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(3),
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  border: `1px solid ${alpha(primaryColor, 0.1)}`,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 2),
    marginBottom: theme.spacing(2),
    borderRadius: "12px",
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 320px",
  gap: theme.spacing(3),
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
  },
}));

const Sidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  border: `1px solid ${alpha(primaryColor, 0.1)}`,
  height: "fit-content",
  position: "sticky",
  top: 90,
  [theme.breakpoints.down("lg")]: { position: "static" },
}));

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  border: `1px solid ${alpha(primaryColor, 0.1)}`,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    borderRadius: "12px",
  },
}));

const SectionTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  "& .MuiSvgIcon-root": { fontSize: "1.1rem", color: primaryColor },
  "& .MuiTypography-root": {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#475569",
  marginBottom: theme.spacing(0.5),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  "& .required": { color: "#dc2626", fontSize: "0.7rem" },
}));

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    fontSize: "0.8rem",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: alpha(primaryColor, 0.2) },
    "&:hover fieldset": { borderColor: primaryColor },
    "&.Mui-focused fieldset": { borderColor: primaryColor },
  },
});

const UploadArea = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  border: "2px dashed",
  borderColor: alpha(primaryColor, 0.3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1.5),
  cursor: "pointer",
  "&:hover": { borderColor: primaryColor, bgcolor: alpha(primaryColor, 0.02) },
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(1.5) },
}));

const SignaturePad = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  border: `1px solid ${alpha(primaryColor, 0.2)}`,
  minHeight: "120px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)",
  backgroundSize: "20px 20px",
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  border: `1px solid ${alpha(primaryColor, 0.1)}`,
  marginBottom: theme.spacing(1.5),
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0.75, 0),
  borderBottom: `1px solid ${alpha(primaryColor, 0.1)}`,
  "&:last-child": { borderBottom: "none" },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(0.5),
  },
}));

const PrimaryButton = styled(Button)({
  textTransform: "none",
  fontSize: "0.8rem",
  fontWeight: 600,
  padding: "8px 20px",
  borderRadius: "10px",
  backgroundColor: primaryColor,
  color: "#ffffff",
  "&:hover": { backgroundColor: "#074a4f" },
  "&:disabled": { backgroundColor: alpha(primaryColor, 0.3) },
});

const SecondaryButton = styled(Button)({
  textTransform: "none",
  fontSize: "0.8rem",
  fontWeight: 600,
  padding: "8px 20px",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
  color: "#475569",
  border: `1px solid ${alpha(primaryColor, 0.2)}`,
  "&:hover": {
    borderColor: primaryColor,
    color: primaryColor,
    backgroundColor: alpha(primaryColor, 0.02),
  },
});

const StyledBreadcrumbs = styled(Breadcrumbs)({
  "& .MuiBreadcrumbs-li": { fontSize: "0.7rem" },
  "& .MuiLink-root": {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: "#64748b",
    textDecoration: "none",
    "&:hover": { color: primaryColor },
  },
});

const CATEGORIES = [
  "Safety",
  "Maintenance",
  "Compliance",
  "Audit",
  "Quality",
  "Operations",
];
const LOCATIONS = [
  "Main Warehouse",
  "Factory Floor - Section A",
  "Factory Floor - Section B",
  "Office Building",
  "Site Location - North Zone",
];

// ─── Main Component ───────────────────────────────────────────────
const CustomChecklistBuilder = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { createCustomChecklist, loading } = useChecklist();

  // Form meta state
  const [checklistName, setChecklistName] = useState("Custom Checklist");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    severity: "success",
  });

  // Form field values (live preview state)
  const [date, setDate] = useState(null);
  const [rating, setRating] = useState(4);
  const [checklist, setChecklist] = useState({
    equipmentOff: false,
    safetyGear: false,
    areaClear: false,
    documentationReady: false,
  });
  const [location, setLocation] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [inspectorName, setInspectorName] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleChecklistChange = (e) =>
    setChecklist((p) => ({ ...p, [e.target.name]: e.target.checked }));

  const buildPayload = () => {
    const checkboxItems = Object.entries(checklist)
      .filter(([, v]) => v)
      .map(
        ([k]) =>
          ({
            equipmentOff: "Equipment is powered off",
            safetyGear: "Safety gear is available",
            areaClear: "Area is clear of hazards",
            documentationReady: "Documentation is ready",
          })[k],
      );

    return {
      name: checklistName,
      description,
      category,
      status: "active",
      sections: [
        {
          sectionTitle: "Basic Information",
          sectionDescription: "Equipment and inspection details",
          fields: [
            {
              label: "Equipment Name",
              fieldType: "text_input",
              isRequired: true,
              placeholder: "Enter equipment name",
              order: 0,
            },
            {
              label: "Location",
              fieldType: "dropdown",
              isRequired: true,
              options: LOCATIONS,
              order: 1,
            },
            {
              label: "Inspection Date",
              fieldType: "date_picker",
              isRequired: true,
              order: 2,
            },
            {
              label: "Inspector Name",
              fieldType: "text_input",
              isRequired: true,
              placeholder: "Enter inspector name",
              order: 3,
            },
          ],
        },
        {
          sectionTitle: "Safety Checks",
          sectionDescription: "Pre-inspection safety checklist",
          fields: [
            {
              label: "Pre-Inspection Checklist",
              fieldType: "checkbox",
              isRequired: true,
              checkboxItems: [
                "Equipment is powered off",
                "Safety gear is available",
                "Area is clear of hazards",
                "Documentation is ready",
              ],
              order: 0,
            },
            {
              label: "Overall Equipment Condition",
              fieldType: "rating",
              isRequired: true,
              ratingMax: 5,
              order: 1,
            },
          ],
        },
        {
          sectionTitle: "Documentation",
          sectionDescription: "Upload supporting documents",
          fields: [
            {
              label: "Upload Equipment Photos",
              fieldType: "image_upload",
              isRequired: false,
              order: 0,
            },
            {
              label: "Additional Notes",
              fieldType: "text_area",
              isRequired: false,
              placeholder: "Enter any additional observations...",
              order: 1,
            },
            {
              label: "Inspector Signature",
              fieldType: "signature",
              isRequired: true,
              order: 2,
            },
          ],
        },
      ],
    };
  };

  const handleSaveDraft = async () => {
    if (!checklistName.trim() || !category) {
      setSnack({
        open: true,
        msg: "Please provide a checklist name and category.",
        severity: "error",
      });
      return;
    }
    try {
      const payload = { ...buildPayload(), status: "draft" };
      await createCustomChecklist(payload);
      setSnack({
        open: true,
        msg: "Draft saved successfully!",
        severity: "success",
      });
    } catch (err) {
      setSnack({
        open: true,
        msg: err.message || "Failed to save draft.",
        severity: "error",
      });
    }
  };

  const handleSubmit = async () => {
    if (!checklistName.trim() || !category) {
      setSnack({
        open: true,
        msg: "Please fill in the checklist name and category.",
        severity: "error",
      });
      return;
    }
    try {
      await createCustomChecklist(buildPayload());
      setSnack({
        open: true,
        msg: "Custom checklist created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/admin/checklists"), 1500);
    } catch (err) {
      setSnack({
        open: true,
        msg: err.message || "Failed to create checklist.",
        severity: "error",
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <PageContainer>
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
        <Header elevation={0}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 1.5, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <IconButton
                size="small"
                onClick={() => navigate("/admin/checklists")}
                sx={{
                  bgcolor: alpha(primaryColor, 0.05),
                  "&:hover": { bgcolor: alpha(primaryColor, 0.1) },
                }}
              >
                <ArrowBackIcon
                  sx={{ color: primaryColor, fontSize: "1.2rem" }}
                />
              </IconButton>
              <Box
                sx={{
                  width: 6,
                  height: 32,
                  background: `linear-gradient(135deg, ${primaryColor}, #38bdf8)`,
                  borderRadius: "3px",
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.1rem", sm: "1.3rem" },
                    color: "#0f172a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Custom Checklist Builder
                </Typography>
                <Typography
                  sx={{ fontSize: "0.75rem", color: "#64748b", mt: 0.25 }}
                >
                  Create a custom inspection checklist for your organization
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <SecondaryButton
                size="small"
                startIcon={<PreviewIcon sx={{ fontSize: "0.9rem" }} />}
              >
                Preview
              </SecondaryButton>
              <SecondaryButton
                size="small"
                startIcon={<SaveIcon sx={{ fontSize: "0.9rem" }} />}
                onClick={handleSaveDraft}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={14} color="inherit" />
                ) : (
                  "Save Draft"
                )}
              </SecondaryButton>
            </Box>
          </Box>
          <StyledBreadcrumbs separator="›">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/dashboard");
              }}
            >
              <HomeIcon sx={{ fontSize: "0.8rem", mr: 0.5 }} />
              Dashboard
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/checklists");
              }}
            >
              Checklists
            </Link>
            <Typography
              color={primaryColor}
              sx={{ fontWeight: 600, fontSize: "0.7rem" }}
            >
              Custom Builder
            </Typography>
          </StyledBreadcrumbs>
        </Header>

        <ContentWrapper>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Checklist Meta */}
            <FormSection elevation={0}>
              <SectionTitle>
                <InfoIcon />
                <Typography>Checklist Meta</Typography>
              </SectionTitle>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <FormLabel>
                    Checklist Name <span className="required">*</span>
                  </FormLabel>
                  <StyledTextField
                    fullWidth
                    size="small"
                    value={checklistName}
                    onChange={(e) => setChecklistName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormLabel>
                    Category <span className="required">*</span>
                  </FormLabel>
                  <FormControl fullWidth size="small">
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      displayEmpty
                      sx={{
                        borderRadius: "10px",
                        fontSize: "0.8rem",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: alpha(primaryColor, 0.2),
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em style={{ color: "#94a3b8" }}>Select</em>
                      </MenuItem>
                      {CATEGORIES.map((c) => (
                        <MenuItem key={c} value={c} sx={{ fontSize: "0.8rem" }}>
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormLabel>Description</FormLabel>
                  <StyledTextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe this checklist..."
                  />
                </Grid>
              </Grid>
            </FormSection>

            {/* Form Preview — Basic Info */}
            <FormSection elevation={0}>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  fontWeight: 700,
                  color: "#0f172a",
                  mb: 0.5,
                }}
              >
                Equipment Safety Inspection Form
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b", mb: 2 }}>
                Preview — All fields marked with * are required.
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <SectionTitle>
                <InfoIcon />
                <Typography>Basic Information</Typography>
              </SectionTitle>
              <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <FormLabel>
                    Equipment Name <span className="required">*</span>
                  </FormLabel>
                  <StyledTextField
                    fullWidth
                    size="small"
                    placeholder="Enter equipment name"
                    value={equipmentName}
                    onChange={(e) => setEquipmentName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EngineeringIcon
                            sx={{
                              fontSize: "0.9rem",
                              color: alpha(primaryColor, 0.6),
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>
                    Location <span className="required">*</span>
                  </FormLabel>
                  <FormControl fullWidth size="small">
                    <Select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      displayEmpty
                      sx={{
                        borderRadius: "10px",
                        fontSize: "0.8rem",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: alpha(primaryColor, 0.2),
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select Location</em>
                      </MenuItem>
                      {LOCATIONS.map((loc) => (
                        <MenuItem
                          key={loc}
                          value={loc}
                          sx={{ fontSize: "0.8rem" }}
                        >
                          {loc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>
                    Inspection Date <span className="required">*</span>
                  </FormLabel>
                  <DatePicker
                    value={date}
                    onChange={setDate}
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        sx: { "& .MuiInputBase-root": { fontSize: "0.8rem" } },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>
                    Inspector Name <span className="required">*</span>
                  </FormLabel>
                  <StyledTextField
                    fullWidth
                    size="small"
                    placeholder="Enter inspector name"
                    value={inspectorName}
                    onChange={(e) => setInspectorName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon
                            sx={{
                              fontSize: "0.9rem",
                              color: alpha(primaryColor, 0.6),
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <SectionTitle>
                <SecurityIcon />
                <Typography>Safety Checks</Typography>
              </SectionTitle>
              <Box sx={{ mb: 3 }}>
                <FormLabel>
                  Pre-Inspection Checklist <span className="required">*</span>
                </FormLabel>
                <Paper
                  variant="outlined"
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: "12px",
                    borderColor: alpha(primaryColor, 0.2),
                    bgcolor: "#f8fafc",
                  }}
                >
                  <FormGroup>
                    <Grid container spacing={1}>
                      {[
                        ["equipmentOff", "Equipment is powered off"],
                        ["safetyGear", "Safety gear is available"],
                        ["areaClear", "Area is clear of hazards"],
                        ["documentationReady", "Documentation is ready"],
                      ].map(([key, label]) => (
                        <Grid item xs={12} sm={6} key={key}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={key}
                                checked={checklist[key]}
                                onChange={handleChecklistChange}
                                size="small"
                                sx={{
                                  "&.Mui-checked": { color: primaryColor },
                                }}
                              />
                            }
                            label={
                              <Typography
                                sx={{ fontSize: "0.75rem", color: "#475569" }}
                              >
                                {label}
                              </Typography>
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </FormGroup>
                </Paper>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormLabel>Overall Equipment Condition</FormLabel>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Rating
                    value={rating}
                    onChange={(_, v) => setRating(v)}
                    size="small"
                    sx={{ "& .MuiRating-iconFilled": { color: primaryColor } }}
                  />
                  <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>
                    {rating} out of 5
                  </Typography>
                </Box>
              </Box>

              <SectionTitle>
                <DescriptionIcon />
                <Typography>Documentation</Typography>
              </SectionTitle>
              <Box sx={{ mb: 3 }}>
                <FormLabel>Upload Equipment Photos</FormLabel>
                <UploadArea elevation={0}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: alpha(primaryColor, 0.1),
                      color: primaryColor,
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: "1.2rem" }} />
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#0f172a",
                      textAlign: "center",
                    }}
                  >
                    Drag and drop or click to browse
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      color: "#94a3b8",
                      textAlign: "center",
                    }}
                  >
                    JPG, PNG, PDF (Max 10MB)
                  </Typography>
                </UploadArea>
                {uploadedFiles.length > 0 && (
                  <Box
                    sx={{ display: "flex", gap: 1, mt: 1.5, flexWrap: "wrap" }}
                  >
                    {uploadedFiles.map((f, i) => (
                      <Chip
                        key={i}
                        icon={
                          <AttachFileIcon
                            sx={{ fontSize: "0.7rem", color: primaryColor }}
                          />
                        }
                        label={f.name}
                        size="small"
                        onDelete={() =>
                          setUploadedFiles((p) => p.filter((_, j) => j !== i))
                        }
                        sx={{ fontSize: "0.65rem", height: "24px" }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
              <Box sx={{ mb: 3 }}>
                <FormLabel>Additional Notes</FormLabel>
                <StyledTextField
                  fullWidth
                  multiline
                  rows={isMobile ? 2 : 3}
                  size="small"
                  placeholder="Enter any additional observations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <FormLabel>
                  Inspector Signature <span className="required">*</span>
                </FormLabel>
                <SignaturePad elevation={0}>
                  <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                    Sign above using mouse or touch
                  </Typography>
                </SignaturePad>
              </Box>
            </FormSection>
          </Box>

          {/* Sidebar */}
          <Sidebar elevation={0}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#0f172a",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <InfoIcon sx={{ fontSize: "1rem", color: primaryColor }} /> Form
              Details
            </Typography>
            <InfoCard elevation={0}>
              {[
                ["Form Name", checklistName || "Untitled"],
                ["Category", category || "—"],
                ["Type", "Custom"],
                ["Total Fields", "8"],
                ["Version", "v1.0"],
              ].map(([label, value]) => (
                <InfoRow key={label}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "#64748b",
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#0f172a",
                    }}
                  >
                    {value}
                  </Typography>
                </InfoRow>
              ))}
            </InfoCard>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  color: "#64748b",
                  mb: 1,
                }}
              >
                Tags
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {["Custom", "Inspection"].map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    sx={{
                      height: "24px",
                      fontSize: "0.65rem",
                      bgcolor: alpha(primaryColor, 0.05),
                      border: `1px solid ${alpha(primaryColor, 0.2)}`,
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                p: 1.5,
                bgcolor: alpha(primaryColor, 0.04),
                borderRadius: "10px",
                border: "1px dashed",
                borderColor: alpha(primaryColor, 0.3),
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <WarningIcon
                sx={{ fontSize: "1rem", color: primaryColor, opacity: 0.7 }}
              />
              <Typography sx={{ fontSize: "0.7rem", color: "#475569" }}>
                <strong>Mandatory</strong> — All * fields are required
              </Typography>
            </Box>
            <Divider sx={{ my: 2.5 }} />
            <PrimaryButton
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={14} color="inherit" />
                ) : (
                  <CheckCircleIcon sx={{ fontSize: "0.9rem" }} />
                )
              }
            >
              {loading ? "Creating..." : "Create & Save"}
            </PrimaryButton>
          </Sidebar>
        </ContentWrapper>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${alpha(primaryColor, 0.1)}`,
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography sx={{ fontSize: "0.65rem", color: "#94a3b8" }}>
            Form ID: AUTO-GENERATED | Created: {new Date().toLocaleDateString()}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
              justifyContent: { xs: "stretch", sm: "flex-end" },
            }}
          >
            <SecondaryButton
              size="small"
              startIcon={<DeleteOutlineIcon sx={{ fontSize: "0.9rem" }} />}
              fullWidth={isMobile}
              onClick={() => {
                setEquipmentName("");
                setLocation("");
                setNotes("");
                setDate(null);
                setRating(4);
                setChecklist({
                  equipmentOff: false,
                  safetyGear: false,
                  areaClear: false,
                  documentationReady: false,
                });
              }}
            >
              Clear Form
            </SecondaryButton>
            <PrimaryButton
              size="small"
              startIcon={<CheckCircleIcon sx={{ fontSize: "0.9rem" }} />}
              fullWidth={isMobile}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit & Create"}
            </PrimaryButton>
          </Box>
        </Box>
      </PageContainer>
    </LocalizationProvider>
  );
};

export default CustomChecklistBuilder;

// pages/admin/checklists/GlobalChecklistBuilder.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  Grid,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link,
  Chip,
  Badge,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useChecklist } from "../context/ChecklistContext";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NotesIcon from "@mui/icons-material/Notes";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import StarIcon from "@mui/icons-material/Star";
import ImageIcon from "@mui/icons-material/Image";
import DrawIcon from "@mui/icons-material/Draw";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const primaryColor = "#085d63";

// ─── Styled Components ────────────────────────────────────────────
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f9fafc",
  minHeight: "100vh",
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(1) },
}));

const Header = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(3),
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  boxShadow: `0 4px 20px ${alpha(primaryColor, 0.06)}`,
  border: `1px solid ${alpha(primaryColor, 0.08)}`,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 2),
    marginBottom: theme.spacing(2),
    borderRadius: "16px",
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 300px",
  gap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
  },
}));

const Sidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  boxShadow: `0 4px 20px ${alpha(primaryColor, 0.04)}`,
  border: `1px solid ${alpha(primaryColor, 0.08)}`,
  height: "fit-content",
  position: "sticky",
  top: 90,
  [theme.breakpoints.down("md")]: { position: "static" },
}));

const FormSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  boxShadow: `0 4px 20px ${alpha(primaryColor, 0.02)}`,
  border: `1px solid ${alpha(primaryColor, 0.06)}`,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    borderRadius: "16px",
  },
}));

const FieldTypeItem = styled(Box)(({ theme, checked }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.2, 1.5),
  backgroundColor: checked ? alpha(primaryColor, 0.04) : "transparent",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  border: `1px solid ${checked ? alpha(primaryColor, 0.2) : "transparent"}`,
  "&:hover": {
    backgroundColor: alpha(primaryColor, 0.04),
    borderColor: alpha(primaryColor, 0.2),
    transform: "translateX(4px)",
  },
}));

const FieldTypeIcon = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(primaryColor, 0.1),
  borderRadius: "10px",
  color: primaryColor,
  marginRight: theme.spacing(1.5),
  "& .MuiSvgIcon-root": { fontSize: "1.1rem" },
}));

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    fontSize: "0.9rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: alpha(primaryColor, 0.15) },
    "&:hover fieldset": { borderColor: primaryColor },
    "&.Mui-focused fieldset": { borderColor: primaryColor, borderWidth: "2px" },
  },
});

const PreviewCard = styled(Paper)({
  padding: "16px",
  borderRadius: "14px",
  border: `1px solid ${alpha(primaryColor, 0.1)}`,
  backgroundColor: "#ffffff",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: alpha(primaryColor, 0.3),
    boxShadow: `0 4px 12px ${alpha(primaryColor, 0.08)}`,
  },
});

const PrimaryButton = styled(Button)({
  textTransform: "none",
  fontSize: "0.8rem",
  fontWeight: 600,
  padding: "8px 20px",
  borderRadius: "12px",
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
  borderRadius: "12px",
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
  "& .MuiBreadcrumbs-li": { fontSize: "0.75rem" },
  "& .MuiLink-root": {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: "#64748b",
    textDecoration: "none",
    fontSize: "0.75rem",
    "&:hover": { color: primaryColor },
  },
});

// ─── Field Type Definitions ───────────────────────────────────────
const FIELD_TYPES = [
  { id: "text_input", label: "Text Input", icon: <TextFieldsIcon /> },
  { id: "text_area", label: "Text Area", icon: <NotesIcon /> },
  { id: "dropdown", label: "Dropdown", icon: <ArrowDropDownCircleIcon /> },
  { id: "checkbox", label: "Checkbox", icon: <CheckBoxIcon /> },
  { id: "rating", label: "Rating", icon: <StarIcon /> },
  { id: "image_upload", label: "Image Upload", icon: <ImageIcon /> },
  { id: "signature", label: "Signature", icon: <DrawIcon /> },
  { id: "date_picker", label: "Date Picker", icon: <CalendarTodayIcon /> },
];

const CATEGORIES = [
  "Safety",
  "Maintenance",
  "Compliance",
  "Audit",
  "Quality",
  "Operations",
];

// ─── Main Component ───────────────────────────────────────────────
const GlobalChecklistBuilder = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { createGlobalChecklist, loading } = useChecklist();

  const [checklistName, setChecklistName] = useState("New Global Checklist");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sections, setSections] = useState([
    { sectionTitle: "Section 1", sectionDescription: "", fields: [] },
  ]);
  const [selectedFieldTypes, setSelectedFieldTypes] = useState({});
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    severity: "success",
  });

  const toggleFieldType = (id) =>
    setSelectedFieldTypes((p) => ({ ...p, [id]: !p[id] }));
  const selectedCount =
    Object.values(selectedFieldTypes).filter(Boolean).length;

  const addSelectedFields = () => {
    const newFields = FIELD_TYPES.filter((ft) => selectedFieldTypes[ft.id]).map(
      (ft, i) => ({
        label: ft.label,
        fieldType: ft.id,
        isRequired: false,
        placeholder: "",
        options: [],
        ratingMax: 5,
        checkboxItems: [],
        order: sections[activeSectionIdx].fields.length + i,
      }),
    );
    setSections((prev) =>
      prev.map((sec, idx) =>
        idx === activeSectionIdx
          ? { ...sec, fields: [...sec.fields, ...newFields] }
          : sec,
      ),
    );
    setSelectedFieldTypes({});
  };

  const removeField = (sectionIdx, fieldIdx) => {
    setSections((prev) =>
      prev.map((sec, i) =>
        i === sectionIdx
          ? { ...sec, fields: sec.fields.filter((_, fi) => fi !== fieldIdx) }
          : sec,
      ),
    );
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        sectionTitle: `Section ${prev.length + 1}`,
        sectionDescription: "",
        fields: [],
      },
    ]);
    setActiveSectionIdx(sections.length);
  };

  const handleSave = async () => {
    if (!checklistName.trim() || !category) {
      setSnack({
        open: true,
        msg: "Please fill in the checklist name and category.",
        severity: "error",
      });
      return;
    }
    const allFields = sections.reduce((acc, s) => acc + s.fields.length, 0);
    if (allFields === 0) {
      setSnack({
        open: true,
        msg: "Please add at least one field to your checklist.",
        severity: "error",
      });
      return;
    }
    try {
      await createGlobalChecklist({
        name: checklistName,
        description,
        category,
        sections,
        status: "active",
      });
      setSnack({
        open: true,
        msg: "Global checklist created successfully!",
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

  const totalFields = sections.reduce((acc, s) => acc + s.fields.length, 0);

  return (
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
                bgcolor: alpha(primaryColor, 0.04),
                "&:hover": { bgcolor: alpha(primaryColor, 0.12) },
              }}
            >
              <ArrowBackIcon sx={{ color: primaryColor, fontSize: "1.2rem" }} />
            </IconButton>
            <Box
              sx={{
                width: 6,
                height: 36,
                background: `linear-gradient(135deg, ${primaryColor}, #38bdf8)`,
                borderRadius: "4px",
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.2rem", sm: "1.4rem" },
                  color: "#0f172a",
                  letterSpacing: "-0.02em",
                }}
              >
                Global Checklist Builder
              </Typography>
              <Typography
                sx={{ fontSize: "0.75rem", color: "#64748b", mt: 0.25 }}
              >
                Create inspection checklists for global use — requires approval
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <SecondaryButton
              size="small"
              startIcon={<CloseIcon />}
              onClick={() => navigate("/admin/checklists")}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              size="small"
              startIcon={
                loading ? (
                  <CircularProgress size={14} color="inherit" />
                ) : (
                  <SaveIcon />
                )
              }
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Checklist"}
            </PrimaryButton>
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
            sx={{ fontWeight: 600, fontSize: "0.75rem" }}
          >
            Global Builder
          </Typography>
        </StyledBreadcrumbs>
      </Header>

      {/* Content */}
      <ContentWrapper>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Meta Info */}
          <FormSection elevation={0}>
            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#0f172a",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AssignmentIcon
                sx={{ fontSize: "1.1rem", color: primaryColor }}
              />{" "}
              Checklist Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
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
                  Checklist Name
                </Typography>
                <StyledTextField
                  fullWidth
                  size="small"
                  value={checklistName}
                  onChange={(e) => setChecklistName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
                  Category *
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                    sx={{
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(primaryColor, 0.15),
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: primaryColor,
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em style={{ color: "#94a3b8" }}>Select category</em>
                    </MenuItem>
                    {CATEGORIES.map((c) => (
                      <MenuItem key={c} value={c} sx={{ fontSize: "0.875rem" }}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
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
                <StyledTextField
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the purpose of this checklist..."
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* Sections & Fields */}
          {sections.map((section, sIdx) => (
            <FormSection
              key={sIdx}
              elevation={0}
              sx={{
                border:
                  activeSectionIdx === sIdx
                    ? `2px solid ${alpha(primaryColor, 0.3)}`
                    : `1px solid ${alpha(primaryColor, 0.06)}`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box sx={{ flex: 1, mr: 2 }}>
                  <TextField
                    variant="standard"
                    value={section.sectionTitle}
                    onChange={(e) =>
                      setSections((prev) =>
                        prev.map((s, i) =>
                          i === sIdx
                            ? { ...s, sectionTitle: e.target.value }
                            : s,
                        ),
                      )
                    }
                    onClick={() => setActiveSectionIdx(sIdx)}
                    inputProps={{
                      style: {
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#0f172a",
                      },
                    }}
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderColor: "transparent",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderColor: alpha(primaryColor, 0.3),
                      },
                      "& .MuiInput-underline:after": {
                        borderColor: primaryColor,
                      },
                    }}
                  />
                </Box>
                <Chip
                  label={`${section.fields.length} fields`}
                  size="small"
                  sx={{
                    bgcolor: alpha(primaryColor, 0.08),
                    color: primaryColor,
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>

              {section.fields.length === 0 ? (
                <Box
                  sx={{
                    py: 4,
                    textAlign: "center",
                    bgcolor: "#f8fafc",
                    borderRadius: "14px",
                    border: `2px dashed ${alpha(primaryColor, 0.15)}`,
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveSectionIdx(sIdx)}
                >
                  <AssignmentIcon
                    sx={{
                      fontSize: "1.8rem",
                      color: alpha(primaryColor, 0.3),
                      mb: 1,
                    }}
                  />
                  <Typography sx={{ fontSize: "0.85rem", color: "#64748b" }}>
                    {activeSectionIdx === sIdx
                      ? "Select field types from the right panel and click Add"
                      : "Click to select this section, then add fields"}
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={1.5}>
                  {section.fields.map((field, fIdx) => (
                    <Paper
                      key={fIdx}
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: "12px",
                        borderColor: alpha(primaryColor, 0.1),
                        "&:hover": { borderColor: alpha(primaryColor, 0.25) },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <DragIndicatorIcon
                            sx={{
                              fontSize: "0.9rem",
                              color: alpha(primaryColor, 0.35),
                              cursor: "grab",
                            }}
                          />
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: "8px",
                              bgcolor: alpha(primaryColor, 0.08),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {FIELD_TYPES.find((ft) => ft.id === field.fieldType)
                              ?.icon || (
                              <TextFieldsIcon
                                sx={{ fontSize: "0.9rem", color: primaryColor }}
                              />
                            )}
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "0.85rem",
                                color: "#0f172a",
                              }}
                            >
                              {field.label}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.7rem",
                                color: "#94a3b8",
                                textTransform: "capitalize",
                              }}
                            >
                              {field.fieldType.replace(/_/g, " ")}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          <Chip
                            label={field.isRequired ? "Required" : "Optional"}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.65rem",
                              bgcolor: field.isRequired
                                ? alpha(primaryColor, 0.08)
                                : "#f1f5f9",
                              color: field.isRequired
                                ? primaryColor
                                : "#64748b",
                            }}
                          />
                          <Tooltip title="Remove">
                            <IconButton
                              size="small"
                              onClick={() => removeField(sIdx, fIdx)}
                              sx={{ p: 0.5, color: "#ef4444" }}
                            >
                              <DeleteOutlineIcon sx={{ fontSize: "0.9rem" }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              )}
            </FormSection>
          ))}

          <Button
            onClick={addSection}
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              borderColor: alpha(primaryColor, 0.3),
              color: primaryColor,
              "&:hover": {
                borderColor: primaryColor,
                bgcolor: alpha(primaryColor, 0.03),
              },
            }}
          >
            Add Section
          </Button>
        </Box>

        {/* Sidebar */}
        <Sidebar elevation={0}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#0f172a",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AssignmentIcon sx={{ fontSize: "1rem", color: primaryColor }} />{" "}
              Field Types
            </Typography>
            {selectedCount > 0 && (
              <Badge
                badgeContent={selectedCount}
                color="primary"
                sx={{ "& .MuiBadge-badge": { bgcolor: primaryColor } }}
              />
            )}
          </Box>

          <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8", mb: 1.5 }}>
            Adding to:{" "}
            <strong style={{ color: primaryColor }}>
              {sections[activeSectionIdx]?.sectionTitle}
            </strong>
          </Typography>

          <Stack spacing={0.5} sx={{ mb: 2.5 }}>
            {FIELD_TYPES.map((field) => (
              <FieldTypeItem
                key={field.id}
                checked={selectedFieldTypes[field.id]}
                onClick={() => toggleFieldType(field.id)}
              >
                <FieldTypeIcon>{field.icon}</FieldTypeIcon>
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: "0.8rem",
                    color: "#1e293b",
                    fontWeight: 500,
                  }}
                >
                  {field.label}
                </Typography>
                <Checkbox
                  checked={!!selectedFieldTypes[field.id]}
                  size="small"
                  sx={{ p: 0.5, "&.Mui-checked": { color: primaryColor } }}
                />
              </FieldTypeItem>
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            disabled={selectedCount === 0}
            onClick={addSelectedFields}
            sx={{
              textTransform: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              py: 1.5,
              bgcolor: primaryColor,
              "&:hover": { bgcolor: "#074a4f" },
              "&:disabled": { bgcolor: alpha(primaryColor, 0.2) },
              borderRadius: "12px",
            }}
          >
            Add {selectedCount > 0 ? selectedCount : ""} Field
            {selectedCount !== 1 ? "s" : ""}
          </Button>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              p: 1.5,
              bgcolor: alpha(primaryColor, 0.04),
              borderRadius: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "#475569",
                mb: 0.5,
              }}
            >
              Summary
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>
                Sections
              </Typography>
              <Typography
                sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#0f172a" }}
              >
                {sections.length}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>
                Total Fields
              </Typography>
              <Typography
                sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#0f172a" }}
              >
                {totalFields}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>
                Type
              </Typography>
              <Chip
                label="Global"
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.6rem",
                  bgcolor: primaryColor,
                  color: "#fff",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: "10px",
              border: "1px dashed",
              borderColor: alpha(primaryColor, 0.3),
              bgcolor: "#fffbf0",
            }}
          >
            <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>
              🌍 <strong>Global checklists</strong> require Super Admin approval
              before they become available to use.
            </Typography>
          </Box>
        </Sidebar>
      </ContentWrapper>
    </PageContainer>
  );
};

export default GlobalChecklistBuilder;

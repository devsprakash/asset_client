// AssignChecklistModal.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Avatar,
  alpha,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
  Stack,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// ----------------------------------------------------------------------
// Styled Components
// ----------------------------------------------------------------------

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: "550px",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    margin: theme.spacing(2),
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      borderRadius: "16px",
    },
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(2.5, 3, 2, 3),
  borderBottom: "1px solid",
  borderColor: alpha("#000", 0.05),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
  "& .MuiTypography-root": {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.02em",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2.5),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3, 2.5, 3),
  borderTop: "1px solid",
  borderColor: alpha("#000", 0.05),
  justifyContent: "flex-end",
  gap: theme.spacing(1.5),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 2, 2, 2),
    flexDirection: "column-reverse",
    gap: theme.spacing(1),
    "& .MuiButton-root": {
      width: "100%",
    },
  },
}));

const CloseButton = styled(IconButton)({
  padding: "6px",
  backgroundColor: alpha("#64748b", 0.1),
  "&:hover": {
    backgroundColor: alpha("#64748b", 0.2),
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.1rem",
    color: "#475569",
  },
});

const SectionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f8fafc",
  borderRadius: "14px",
  border: "1px solid",
  borderColor: alpha("#e2e8f0", 0.8),
  marginBottom: theme.spacing(2.5),
  "&:last-child": {
    marginBottom: 0,
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
}));

const SectionTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  "& .MuiSvgIcon-root": {
    fontSize: "1.1rem",
    color: "#0284c7",
  },
  "& .MuiTypography-root": {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#0f172a",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
}));

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    fontSize: "0.8rem",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.75rem",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: alpha("#e2e8f0", 0.8),
    },
    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0284c7",
    },
  },
});

const StyledSelect = styled(Select)({
  fontSize: "0.8rem",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha("#e2e8f0", 0.8),
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#94a3b8",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0284c7",
  },
});

const FormLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  fontWeight: 600,
  color: "#64748b",
  marginBottom: theme.spacing(0.5),
  textTransform: "uppercase",
  letterSpacing: "0.3px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "0.8rem",
  fontWeight: 600,
  padding: "8px 24px",
  borderRadius: "10px",
  color: "#64748b",
  backgroundColor: "#ffffff",
  border: "2px solid",
  borderColor: alpha("#e2e8f0", 0.8),
  "&:hover": {
    backgroundColor: alpha("#f1f5f9", 0.7),
    borderColor: "#94a3b8",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
    fontSize: "0.75rem",
  },
}));

const AssignButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "0.8rem",
  fontWeight: 700,
  padding: "8px 28px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #003e52, #005a75)",
  color: "#ffffff",
  boxShadow: "0 6px 12px -4px rgba(0, 62, 82, 0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #005a75, #007a9e)",
    transform: "translateY(-1px)",
    boxShadow: "0 10px 16px -6px rgba(0, 62, 82, 0.4)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
    fontSize: "0.75rem",
  },
}));

const TitleBadge = styled(Box)(({ theme }) => ({
  width: 6,
  height: 28,
  background: "linear-gradient(135deg, #0284c7, #38bdf8)",
  borderRadius: "3px",
  marginRight: theme.spacing(1.2),
  [theme.breakpoints.down("sm")]: {
    height: 24,
  },
}));

const InfoChip = styled(Chip)({
  height: "24px",
  borderRadius: "6px",
  fontSize: "0.65rem",
  fontWeight: 500,
  backgroundColor: alpha("#0284c7", 0.08),
  color: "#0284c7",
  "& .MuiChip-label": {
    paddingLeft: 8,
    paddingRight: 8,
  },
});

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

const AssignChecklistModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState({
    checklist: "",
    primaryMember: "",
    dueDate: "",
    asset: "",
    secondaryMember: "",
  });

  const checklists = [
    "Safety Inspection",
    "Equipment Check",
    "Site Inspection",
    "Quality Assurance",
    "Compliance Audit",
  ];

  const teamMembers = [
    "John Smith",
    "Sarah Johnson",
    "Mike Chen",
    "Emma Wilson",
    "David Brown",
    "Lisa Anderson",
  ];

  const assets = [
    "Warehouse A - Section 1",
    "Factory Floor - Line 3",
    "Office Building - Floor 2",
    "Construction Site - Block B",
    "Fleet Vehicles - Garage",
    "Laboratory - Room 101",
  ];

  const handleSubmit = () => {
    console.log("Assigning checklist:", formData);
    // Add your assignment logic here
    onClose();
  };

  const handleClose = () => {
    setFormData({
      checklist: "",
      primaryMember: "",
      dueDate: "",
      asset: "",
      secondaryMember: "",
    });
    onClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      hideBackdrop={false}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
        },
      }}
      TransitionProps={{
        timeout: 300,
      }}
    >
      <StyledDialogTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TitleBadge />
          <Typography>
            Assign Checklist to Team Member
          </Typography>
        </Box>
        <CloseButton size="small" onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>

      <StyledDialogContent dividers={false}>
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "#64748b",
            mb: 2.5,
            pl: 0.5,
          }}
        >
          Select checklist, asset, team member, and due date
        </Typography>

        {/* Section 1: Select Checklist */}
        <SectionCard elevation={0}>
          <SectionTitle>
            <AssignmentIcon />
            <Typography>Select Checklist</Typography>
          </SectionTitle>

          <Stack spacing={2}>
            <Box>
              <FormLabel>Choose Checklist</FormLabel>
              <FormControl fullWidth size="small">
                <StyledSelect
                  value={formData.checklist}
                  onChange={(e) => setFormData({ ...formData, checklist: e.target.value })}
                  displayEmpty
                >
                  <MenuItem value="" disabled sx={{ fontSize: "0.8rem" }}>
                    <em>Select a checklist</em>
                  </MenuItem>
                  {checklists.map((item) => (
                    <MenuItem key={item} value={item} sx={{ fontSize: "0.8rem" }}>
                      {item}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </Box>

            <Grid container spacing={isMobile ? 1.5 : 2}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <FormLabel>Team Member (Primary)</FormLabel>
                  <FormControl fullWidth size="small">
                    <StyledSelect
                      value={formData.primaryMember}
                      onChange={(e) => setFormData({ ...formData, primaryMember: e.target.value })}
                      displayEmpty
                    >
                      <MenuItem value="" disabled sx={{ fontSize: "0.8rem" }}>
                        <em>Choose primary member</em>
                      </MenuItem>
                      {teamMembers.map((item) => (
                        <MenuItem key={item} value={item} sx={{ fontSize: "0.8rem" }}>
                          {item}
                        </MenuItem>
                      ))}
                    </StyledSelect>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <FormLabel>Due Date</FormLabel>
                  <StyledTextField
                    fullWidth
                    size="small"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon sx={{ fontSize: "0.8rem", color: "#64748b" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </SectionCard>

        {/* Section 2: Select Asset */}
        <SectionCard elevation={0}>
          <SectionTitle>
            <InventoryIcon />
            <Typography>Select Asset</Typography>
          </SectionTitle>

          <Stack spacing={2}>
            <Box>
              <FormLabel>Choose Asset</FormLabel>
              <FormControl fullWidth size="small">
                <StyledSelect
                  value={formData.asset}
                  onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
                  displayEmpty
                >
                  <MenuItem value="" disabled sx={{ fontSize: "0.8rem" }}>
                    <em>Select an asset</em>
                  </MenuItem>
                  {assets.map((item) => (
                    <MenuItem key={item} value={item} sx={{ fontSize: "0.8rem" }}>
                      {item}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </Box>

            <Box>
              <FormLabel>Team Member (Secondary)</FormLabel>
              <FormControl fullWidth size="small">
                <StyledSelect
                  value={formData.secondaryMember}
                  onChange={(e) => setFormData({ ...formData, secondaryMember: e.target.value })}
                  displayEmpty
                >
                  <MenuItem value="" disabled sx={{ fontSize: "0.8rem" }}>
                    <em>Choose secondary member</em>
                  </MenuItem>
                  {teamMembers.map((item) => (
                    <MenuItem key={item} value={item} sx={{ fontSize: "0.8rem" }}>
                      {item}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </Box>
          </Stack>
        </SectionCard>

        {/* Summary Preview */}
        {formData.checklist && formData.primaryMember && formData.dueDate && (
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: alpha("#0284c7", 0.04),
              borderRadius: "10px",
              border: `1px dashed ${alpha("#0284c7", 0.3)}`,
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <InfoChip
              icon={<CheckCircleIcon sx={{ fontSize: "0.8rem" }} />}
              label="Ready to assign"
              size="small"
            />
            <Typography sx={{ fontSize: "0.65rem", color: "#475569" }}>
              {formData.checklist} → {formData.primaryMember}
            </Typography>
          </Box>
        )}
      </StyledDialogContent>

      <StyledDialogActions>
        <CancelButton onClick={handleClose}>
          Cancel
        </CancelButton>
        <AssignButton
          variant="contained"
          onClick={handleSubmit}
          disableElevation
          disabled={!formData.checklist || !formData.primaryMember || !formData.dueDate || !formData.asset}
        >
          Assign Checklist
        </AssignButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default AssignChecklistModal;
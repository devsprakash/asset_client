// components/CreateChecklistModal.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Avatar,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PublicIcon from "@mui/icons-material/Public";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: "600px",
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
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.02em",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
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
  justifyContent: "space-between",
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

const TypeCard = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  backgroundColor: selected ? alpha("#085d63", 0.04) : "#ffffff",
  borderRadius: "14px",
  border: `2px solid ${selected ? "#085d63" : alpha("#e2e8f0", 0.8)}`,
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: selected ? "linear-gradient(90deg, #085d63, #085d63)" : "none",
  },
  "&:hover": {
    borderColor: selected ? "#085d63" : "#94a3b8",
    backgroundColor: selected ? alpha("#085d63", 0.06) : alpha("#f8fafc", 0.8),
    transform: "translateY(-1px)",
    boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    gap: theme.spacing(1.5),
  },
}));

const TypeIcon = styled(Avatar)(({ theme, selected }) => ({
  width: 48,
  height: 48,
  borderRadius: "14px",
  background: selected 
    ? "linear-gradient(135deg, #085d63, #085d63)" 
    : "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
  color: selected ? "#ffffff" : "#475569",
  transition: "all 0.3s ease",
  boxShadow: selected ? "0 6px 12px -4px rgba(2, 132, 199, 0.3)" : "none",
  "& .MuiSvgIcon-root": {
    fontSize: "1.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: 42,
    height: 42,
    borderRadius: "12px",
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
    },
  },
}));

const TypeContent = styled(Box)({
  flex: 1,
  paddingRight: "20px",
});

const TypeTitle = styled(Typography)(({ theme, selected }) => ({
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: theme.spacing(0.5),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.75),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));

const TypeDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: "#64748b",
  lineHeight: 1.5,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));

const SelectedBadge = styled(Box)({
  position: "absolute",
  top: 14,
  right: 14,
  color: "#085d63",
  display: "flex",
  alignItems: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "1.1rem",
  },
});

const CancelButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "0.8rem",
  fontWeight: 600,
  padding: "8px 24px",
  borderRadius: "10px",
  color: "#64748b",
  backgroundColor: "#ffffff",
  border: "1px solid",
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

const ContinueButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "0.8rem",
  fontWeight: 700,
  padding: "8px 28px",
  borderRadius: "10px",
  backgroundColor: "#085d63",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#074a4f",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
    fontSize: "0.75rem",
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  color: "#64748b",
  marginBottom: theme.spacing(2.5),
  paddingLeft: theme.spacing(0.5),
  fontWeight: 500,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    marginBottom: theme.spacing(2),
  },
}));

const TitleBadge = styled(Box)(({ theme }) => ({
  width: 6,
  height: 28,
  background: "linear-gradient(135deg, #085d63, #085d63)",
  borderRadius: "3px",
  marginRight: theme.spacing(1.2),
  [theme.breakpoints.down("sm")]: {
    height: 24,
  },
}));

const SelectedSummary = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  padding: theme.spacing(1.5),
  backgroundColor: alpha("#085d63", 0.04),
  borderRadius: "10px",
  border: `1px dashed ${alpha("#085d63", 0.3)}`,
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.2),
  },
}));

const CreateChecklistModal = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedType, setSelectedType] = useState(null);

  const types = [
    {
      id: "custom",
      title: "Custom Checklist",
      description: "Create a custom form for your team. Only visible to your organization.",
      icon: <AssignmentIcon />,
      path: "/admin/checklists/custom-builder",
    },
    {
      id: "global",
      title: "Global Checklist",
      description: "Create a global form to submit to Super Admin. Requires approval before use.",
      icon: <PublicIcon />,
      path: "/admin/checklists/global-builder",
    },
    {
      id: "import",
      title: "Import Checklist Fields",
      description: "Upload an Excel sheet to auto-generate input fields.",
      icon: <UploadFileIcon />,
      path: "/admin/checklists/import-fields",
    },
  ];

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
  };

  const handleCancel = () => {
    setSelectedType(null);
    onClose();
  };

  const handleContinue = () => {
    if (selectedType) {
      const selectedTypeData = types.find(t => t.id === selectedType);
      if (selectedTypeData) {
        onClose();
        navigate(selectedTypeData.path);
      }
    }
  };

  const handleCardClick = (typeId) => {
    handleTypeSelect(typeId);
  };

  const getSelectedTypeData = () => {
    return types.find(t => t.id === selectedType);
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <StyledDialogTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TitleBadge />
          <Typography>
            Create New Checklist
          </Typography>
          {!isMobile && (
            <AutoAwesomeIcon 
              sx={{ 
                ml: 1.2, 
                fontSize: "0.9rem", 
                color: "#f59e0b",
                opacity: 0.8 
              }} 
            />
          )}
        </Box>
        <CloseButton size="small" onClick={handleCancel}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>

      <StyledDialogContent dividers={false}>
        <Subtitle>
          Choose the type of Checklist you want to create
        </Subtitle>

        <Stack spacing={2}>
          {types.map((type) => (
            <TypeCard
              key={type.id}
              elevation={selectedType === type.id ? 2 : 0}
              selected={selectedType === type.id}
              onClick={() => handleCardClick(type.id)}
            >
              <TypeIcon selected={selectedType === type.id}>
                {type.icon}
              </TypeIcon>
              <TypeContent>
                <TypeTitle selected={selectedType === type.id}>
                  {type.title}
                  {selectedType === type.id && (
                    <CheckCircleIcon 
                      sx={{ 
                        fontSize: "0.8rem", 
                        color: "#085d63",
                        ml: 0.5 
                      }} 
                    />
                  )}
                </TypeTitle>
                <TypeDescription>{type.description}</TypeDescription>
              </TypeContent>
              {selectedType === type.id && (
                <SelectedBadge>
                  <CheckCircleIcon />
                </SelectedBadge>
              )}
            </TypeCard>
          ))}
        </Stack>

        {selectedType && (
          <SelectedSummary>
            <Typography
              sx={{
                fontSize: "0.7rem",
                color: "#085d63",
                display: "flex",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <InsertDriveFileIcon sx={{ fontSize: "0.8rem", color: "#085d63" }} />
              Selected: <strong>{getSelectedTypeData()?.title}</strong>
            </Typography>
          </SelectedSummary>
        )}
      </StyledDialogContent>

      <StyledDialogActions>
        <CancelButton onClick={handleCancel}>
          Cancel
        </CancelButton>
        {selectedType && (
          <ContinueButton
            variant="contained"
            onClick={handleContinue}
            disableElevation
          >
            Continue
          </ContinueButton>
        )}
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default CreateChecklistModal;
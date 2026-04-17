// components/RequestModal.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useChecklist } from "../context/ChecklistContext";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: "700px",
    borderRadius: "20px",
    margin: theme.spacing(2),
  },
}));

const CloseButton = styled(IconButton)({
  position: "absolute",
  right: 16,
  top: 16,
  color: "#64748b",
});

const RequestModal = ({ open, onClose, onSuccess }) => {
  const { submitChecklistRequest, loading } = useChecklist();
  const [formData, setFormData] = useState({
    checklistName: "",
    category: "",
    detailedDescription: "",
    businessJustification: "",
    urgencyLevel: "",
    expectedUsageFrequency: "",
    numberOfTeamMembers: "",
    additionalNotes: "",
  });

  const categories = ["Safety", "Maintenance", "Compliance", "Audit", "Quality", "Operations"];
  const urgencyLevels = ["low", "medium", "high", "critical"];
  const frequencies = ["daily", "weekly", "monthly", "quarterly"];

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.checklistName || !formData.category || !formData.detailedDescription || 
        !formData.businessJustification || !formData.urgencyLevel) {
      return;
    }

    try {
      const payload = {
        ...formData,
        numberOfTeamMembers: formData.numberOfTeamMembers ? Number(formData.numberOfTeamMembers) : undefined,
      };
      await submitChecklistRequest(payload);
      if (onSuccess) onSuccess("Checklist request submitted successfully!");
      handleClose();
    } catch (err) {
      console.error("Error submitting request:", err);
    }
  };

  const handleClose = () => {
    setFormData({
      checklistName: "",
      category: "",
      detailedDescription: "",
      businessJustification: "",
      urgencyLevel: "",
      expectedUsageFrequency: "",
      numberOfTeamMembers: "",
      additionalNotes: "",
    });
    onClose();
  };

  const isFormValid = () => {
    return formData.checklistName.trim() && 
           formData.category && 
           formData.detailedDescription.trim() && 
           formData.businessJustification.trim() && 
           formData.urgencyLevel;
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pr: 6, pb: 1, pt: 3, px: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
          Request New Checklist
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
          Submit a request for a new checklist to be created
        </Typography>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Checklist Name"
                required
                size="small"
                value={formData.checklistName}
                onChange={handleChange("checklistName")}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleChange("category")}
                  label="Category"
                  sx={{ borderRadius: "10px" }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Detailed Description"
            required
            multiline
            rows={3}
            size="small"
            value={formData.detailedDescription}
            onChange={handleChange("detailedDescription")}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          <TextField
            fullWidth
            label="Business Justification"
            required
            multiline
            rows={2}
            size="small"
            value={formData.businessJustification}
            onChange={handleChange("businessJustification")}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Urgency Level</InputLabel>
                <Select
                  value={formData.urgencyLevel}
                  onChange={handleChange("urgencyLevel")}
                  label="Urgency Level"
                  sx={{ borderRadius: "10px" }}
                >
                  {urgencyLevels.map((level) => (
                    <MenuItem key={level} value={level} sx={{ textTransform: "capitalize" }}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Expected Usage Frequency</InputLabel>
                <Select
                  value={formData.expectedUsageFrequency}
                  onChange={handleChange("expectedUsageFrequency")}
                  label="Expected Usage Frequency"
                  sx={{ borderRadius: "10px" }}
                >
                  {frequencies.map((freq) => (
                    <MenuItem key={freq} value={freq} sx={{ textTransform: "capitalize" }}>
                      {freq}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Team Members"
                type="number"
                size="small"
                value={formData.numberOfTeamMembers}
                onChange={handleChange("numberOfTeamMembers")}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Additional Notes (Optional)"
            multiline
            rows={2}
            size="small"
            value={formData.additionalNotes}
            onChange={handleChange("additionalNotes")}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1.5 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            borderColor: "#e2e8f0",
            color: "#64748b",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !isFormValid()}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            bgcolor: "#085d63",
            "&:hover": { bgcolor: "#074a4f" },
            "&:disabled": { bgcolor: alpha("#085d63", 0.3) },
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Submit Request"}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default RequestModal;
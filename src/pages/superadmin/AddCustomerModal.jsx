import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 8,
    maxWidth: 500,
    width: "100%",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: "24px 24px 16px 24px",
  "& h2": {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: 1.2,
    marginBottom: "4px",
  },
  "& .subtitle": {
    color: theme.palette.text.secondary,
    fontSize: "14px",
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "8px 24px 24px 24px",
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: "16px 24px 24px 24px",
  borderTop: `1px solid ${theme.palette.divider}`,
  justifyContent: "flex-end",
  gap: "12px",
}));

const FieldLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  marginBottom: "6px",
  color: "#1a1a1a",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#b0b0b0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0f4c61",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
    fontSize: "14px",
  },
});

const StyledSelect = styled(Select)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
  "& .MuiSelect-select": {
    padding: "12px 14px",
    fontSize: "14px",
  },
});

const PasswordField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
    fontSize: "14px",
    fontFamily: "monospace",
    letterSpacing: "2px",
  },
});

const CancelButton = styled(Button)({
  color: "#666",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
});

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0f4c61",
  color: "white",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  padding: "8px 24px",
  "&:hover": {
    backgroundColor: "#0a3a4a",
  },
}));

export default function AddCustomerModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    customerName: "Acme Corporation",
    email: "contact@acme.com",
    password: "*********",
    membershipPlan: "Standard - $49/mo",
    duration: "30",
    licenseLimit: "10",
    notes: "Additional information about the customer...",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
    onClose();
  };

  return (
    <StyledDialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      aria-labelledby="add-customer-dialog-title"
    >
      <StyledDialogTitle id="add-customer-dialog-title">
        <Typography variant="h2">Add New Customer</Typography>
        <Typography className="subtitle">
          Create a new customer account with membership details
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 20,
            color: "#666",
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </StyledDialogTitle>

      <StyledDialogContent>

           {/* Duration and License Limit */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <FieldLabel>Customer Name</FieldLabel>
        <StyledTextField
          fullWidth
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Enter customer name"
          size="small"
          variant="outlined"
        />
          </div>
          <div style={{ flex: 1 }}>
            
        {/* Email */}
        <FieldLabel>Email</FieldLabel>
        <StyledTextField
          fullWidth
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          size="small"
          variant="outlined"
        />
          </div>
        </div>
        {/* Password */}
        <FieldLabel>Create Temporary Password</FieldLabel>
        <PasswordField
          fullWidth
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter temporary password"
          size="small"
          variant="outlined"
        />

        {/* Membership Plan */}
        <FieldLabel>Membership Plan</FieldLabel>
        <FormControl fullWidth size="small">
          <StyledSelect
            name="membershipPlan"
            value={formData.membershipPlan}
            onChange={handleChange}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="Free - $0/mo">Free - $0/mo</MenuItem>
            <MenuItem value="Standard - $49/mo">Standard - $49/mo</MenuItem>
            <MenuItem value="Premium - $99/mo">Premium - $99/mo</MenuItem>
            <MenuItem value="Enterprise - $199/mo">Enterprise - $199/mo</MenuItem>
          </StyledSelect>
        </FormControl>

        {/* Duration and License Limit */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <FieldLabel>Duration (days)</FieldLabel>
            <StyledTextField
              fullWidth
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              placeholder="30"
              size="small"
              variant="outlined"
            />
          </div>
          <div style={{ flex: 1 }}>
            <FieldLabel>License Limit (Users)</FieldLabel>
            <StyledTextField
              fullWidth
              name="licenseLimit"
              type="number"
              value={formData.licenseLimit}
              onChange={handleChange}
              placeholder="10"
              size="small"
              variant="outlined"
            />
          </div>
        </div>

        {/* Notes */}
        <FieldLabel>Notes (Optional)</FieldLabel>
        <StyledTextField
          fullWidth
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={3}
          placeholder="Additional information about the customer..."
          size="small"
          variant="outlined"
        />
      </StyledDialogContent>

      <Divider />

      <StyledDialogActions>
        <CancelButton onClick={onClose}>
          Cancel
        </CancelButton>
        <AddButton onClick={handleSubmit} variant="contained">
          Add Customer
        </AddButton>
      </StyledDialogActions>
    </StyledDialog>
  );
}
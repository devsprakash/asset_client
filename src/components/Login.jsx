import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import { useAuth } from "../context/AuthContexts";
import InventoryIcon from "@mui/icons-material/Inventory";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";

const roleCredentials = [
  { role: "superadmin", email: "superadmin@example.com", password: "password", icon: AdminPanelSettingsIcon, color: "#0f4c61" },
  { role: "admin", email: "admin@example.com", password: "password", icon: GroupIcon, color: "#177e89" },
  { role: "team", email: "team@example.com", password: "password", icon: PersonIcon, color: "#2a9d8f" },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("superadmin");
  const [error, setError] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    const credentials = roleCredentials.find((r) => r.role === role);
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate(`/${result.role}`);
    } else {
      setError(result.error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8fafc",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "grey.200",
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#0f4c61",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <InventoryIcon sx={{ color: "white", fontSize: 32 }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="grey.900">
            Asset Inspection
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Select your role to login
          </Typography>
        </Box>

        {/* Role Cards */}
        <Box sx={{ display: "flex", gap: 1.5, mb: 4 }}>
          {roleCredentials.map(({ role, icon: Icon, color }) => (
            <Card
              key={role}
              onClick={() => handleRoleSelect(role)}
              sx={{
                flex: 1,
                cursor: "pointer",
                border: "2px solid",
                borderColor: selectedRole === role ? color : "transparent",
                bgcolor: selectedRole === role ? `${color}10` : "white",
                transition: "all 0.2s",
                "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
              }}
            >
              <CardContent sx={{ p: 2, textAlign: "center" }}>
                <Avatar sx={{ bgcolor: color, width: 40, height: 40, mx: "auto", mb: 1 }}>
                  <Icon sx={{ fontSize: 20 }} />
                </Avatar>
                <Typography variant="caption" fontWeight={600} textTransform="capitalize">
                  {role}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.secondary">
            OR LOGIN WITH CREDENTIALS
          </Typography>
        </Divider>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#0f4c61",
              py: 1.5,
              "&:hover": { bgcolor: "#0a3544" },
            }}
          >
            Sign In
          </Button>

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 2 }}>
            Demo Credentials are pre-filled based on role selection
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}
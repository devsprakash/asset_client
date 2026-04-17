// components/Login.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  IconButton,
  InputAdornment,
  Avatar,
  Stack,
  Link,
  useTheme,
  useMediaQuery,
  alpha,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContexts"; // Fixed import path (plural)
import Navbar from "../pages/landing/Navbar";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) {
      setError("");
      setSnackbarOpen(false);
    }
    if (success) {
      setSuccess("");
      setSuccessSnackbarOpen(false);
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      remember: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setSuccess(result.message || "Login successful! Redirecting to dashboard...");
        setSuccessSnackbarOpen(true);

        if (formData.remember) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("rememberedEmail", formData.email);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("rememberedEmail");
        }

        setTimeout(() => {
          navigate(result.redirectPath, { replace: true });
        }, 2000);
      } else {
        setError(result.error || "Invalid email or password");
        setSnackbarOpen(true);
        setLoading(false);
      }
    } catch (err) {
      console.error("Login submission error:", err);
      setError("An unexpected error occurred. Please try again.");
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbarOpen(false);
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberMe = localStorage.getItem("rememberMe");

    if (rememberMe === "true" && rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
        remember: true,
      }));
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f8fafc",
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 1.5, sm: 2, md: 3, lg: 4 },
          mt: { xs: 8, sm: 9, md: 10 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: { xs: "100%", sm: 500, md: 700, lg: 1000 },
            width: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "5fr 7fr" },
            borderRadius: { xs: "1rem", sm: "1.25rem" },
            overflow: "hidden",
            boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)",
          }}
        >
          {/* Left Side - Hero Section */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              justifyContent: "space-between",
              p: { xl: 5, lg: 4 },
              background:
                "linear-gradient(135deg, rgba(26, 74, 107, 0.95) 0%, rgba(0, 51, 80, 0.98) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    letterSpacing: "-0.025em",
                    mb: 1.5,
                  }}
                >
                  Precision in <br />
                  Every Asset.
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 4,
                    bgcolor: alpha("#ffffff", 0.3),
                    borderRadius: "full",
                    mb: 3,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: alpha("#ffffff", 0.8),
                    fontSize: "0.85rem",
                    maxWidth: "280px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  Experience the gold standard in institutional asset
                  management. Editorial-grade data accuracy for global
                  portfolios.
                </Typography>
              </Box>
            </Box>

            {/* Testimonial Card */}
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                bgcolor: alpha("#ffffff", 0.03),
                backdropFilter: "blur(12px)",
                borderRadius: "0.75rem",
                p: 2.5,
                border: "1px solid rgba(255,255,255,0.1)",
                mt: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.7rem",
                  fontStyle: "italic",
                  color: alpha("#ffffff", 0.9),
                  mb: 1.5,
                  lineHeight: 1.5,
                }}
              >
                "AMS Blue Ledger has redefined our reporting workflow. The
                clarity and integrity of data is unparalleled in the financial
                sector."
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLCu_EUKJrSJiUVVAXsi8T22b92VZxvYOuIuDjvPeHA2sjj8D1heZu_khnNtdSG-vZTY9AJp0ze4h8Ohjg_qSVkrhP3OlbILSfCeMm6aIWRY8r_14XplmwLKWLbvi8hm0_HJQ_45KSfAQljMwlPwrGixAmnAgrDdDqL9R5wXs8GpbjnM4LXPOa-qbc4-CRTSKhoRwBk7FyBKj9krpJ5RVy8leZWgp2uNYS0OoI7nzW_uvf49vfrEQ9OFTKNBzEHWBgnUNCrWxVsE1g"
                  sx={{
                    width: 40,
                    height: 40,
                    border: "1.5px solid rgba(255,255,255,0.2)",
                  }}
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      color: "white",
                      textTransform: "uppercase",
                    }}
                  >
                    Marcus Thorne
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.55rem",
                      color: alpha("#ffffff", 0.7),
                      display: "block",
                    }}
                  >
                    CIO, Veritas Global
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Decorative Flare */}
            <Box
              sx={{
                position: "absolute",
                bottom: -80,
                right: -80,
                width: 280,
                height: 280,
                bgcolor: alpha("#ffffff", 0.05),
                borderRadius: "50%",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            />
          </Box>

          {/* Right Side - Login Form */}
          <Box
            sx={{
              p: { xs: 2.5, sm: 3, md: 4, lg: 5 },
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: "100%", sm: 400 },
                mx: "auto",
                width: "100%",
              }}
            >
              {/* Header */}
              <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.6rem" },
                    fontWeight: 700,
                    color: "#0f172a",
                    mb: 0.5,
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#64748b", fontSize: "0.75rem" }}
                >
                  Sign in to access your dashboard
                </Typography>
              </Box>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  {/* Email Field */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        display: "block",
                        mb: 0.75,
                      }}
                    >
                      Email Address
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      disabled={loading || authLoading}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#fafbfc",
                          borderRadius: "0.5rem",
                          "& fieldset": {
                            borderColor: "#e2e8f0",
                          },
                          "&:hover fieldset": {
                            borderColor: alpha("#1a4a6b", 0.3),
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1a4a6b",
                            borderWidth: 1,
                          },
                        },
                        "& .MuiInputBase-input": {
                          py: { xs: 1.2, sm: 1.3 },
                          fontSize: "0.85rem",
                        },
                      }}
                    />
                  </Box>

                  {/* Password Field */}
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.75,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: "#94a3b8",
                          textTransform: "uppercase",
                        }}
                      >
                        Password
                      </Typography>
                      <Link
                        component="button"
                        type="button"
                        onClick={handleForgotPassword}
                        underline="hover"
                        sx={{
                          fontSize: "0.65rem",
                          color: "#1a4a6b",
                          fontWeight: 500,
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                            color: "#003350",
                          },
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          padding: 0,
                        }}
                      >
                        Forgot Password?
                      </Link>
                    </Box>
                    <TextField
                      fullWidth
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      disabled={loading || authLoading}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="small"
                              sx={{ p: 0.5 }}
                              disabled={loading || authLoading}
                            >
                              {showPassword ? (
                                <VisibilityOffIcon sx={{ fontSize: 16 }} />
                              ) : (
                                <VisibilityIcon sx={{ fontSize: 16 }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#fafbfc",
                          borderRadius: "0.5rem",
                          "& fieldset": {
                            borderColor: "#e2e8f0",
                          },
                          "&:hover fieldset": {
                            borderColor: alpha("#1a4a6b", 0.3),
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1a4a6b",
                            borderWidth: 1,
                          },
                        },
                        "& .MuiInputBase-input": {
                          py: { xs: 1.2, sm: 1.3 },
                          fontSize: "0.85rem",
                        },
                      }}
                    />
                  </Box>

                  {/* Remember Me Checkbox */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.remember}
                        onChange={handleCheckboxChange}
                        disabled={loading || authLoading}
                        sx={{
                          color: "#94a3b8",
                          "&.Mui-checked": {
                            color: "#1a4a6b",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{ fontSize: "0.75rem", color: "#64748b" }}
                      >
                        Remember me
                      </Typography>
                    }
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading || authLoading}
                    endIcon={
                      !(loading || authLoading) && <ArrowForwardIcon sx={{ fontSize: 16 }} />
                    }
                    sx={{
                      py: { xs: 1, sm: 1.2 },
                      bgcolor: "#1a4a6b",
                      borderRadius: "0.5rem",
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "0.8rem",
                      boxShadow: "0 4px 12px rgba(26,74,107,0.2)",
                      "&:hover": {
                        bgcolor: "#003350",
                        transform: "translateY(-1px)",
                      },
                      "&.Mui-disabled": {
                        bgcolor: alpha("#1a4a6b", 0.6),
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {(loading || authLoading) ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </Stack>
              </form>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSuccessSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbar-root": {
            mt: 8,
          },
        }}
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{
            width: "100%",
            minWidth: "300px",
            backgroundColor: "#4caf50",
            color: "white",
            fontWeight: 600,
            "& .MuiAlert-icon": {
              color: "white",
              fontSize: "24px",
            },
            "& .MuiAlert-message": {
              fontSize: "0.9rem",
              fontWeight: 500,
            },
            "& .MuiAlert-action": {
              color: "white",
            },
          }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
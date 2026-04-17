// components/ForgotPassword.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Avatar,
  Stack,
  Link,
  useTheme,
  useMediaQuery,
  alpha,
  Alert,
  Snackbar,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/landing/Navbar";

const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
  
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: { xs: "100%", sm: 480, md: 520 },
            width: "100%",
            borderRadius: { xs: "1rem", sm: "1.25rem" },
            overflow: "hidden",
            boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              p: { xs: 2.5, sm: 3, md: 4 },
              bgcolor: "white",
            }}
          >
            <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
              <Avatar
                sx={{
                  bgcolor: alpha("#1a4a6b", 0.1),
                  width: { xs: 48, sm: 56 },
                  height: { xs: 48, sm: 56 },
                  mx: "auto",
                  mb: 2,
                }}
              >
                <EmailIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: "#1a4a6b" }} />
              </Avatar>
              <Typography
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem" },
                  fontWeight: 700,
                  color: "#0f172a",
                  mb: 1,
                }}
              >
                Forgot Password?
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                  color: "#64748b",
                  maxWidth: "320px",
                  mx: "auto",
                }}
              >
                Enter your email address and we'll send you a link to reset your password.
              </Typography>
            </Box>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.55rem", sm: "0.6rem" },
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
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      required
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
                          fontSize: { xs: "0.8rem", sm: "0.85rem" },
                        },
                      }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    endIcon={<SendIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                    sx={{
                      py: { xs: 1, sm: 1.2 },
                      bgcolor: "#1a4a6b",
                      borderRadius: "0.5rem",
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: { xs: "0.75rem", sm: "0.8rem" },
                      boxShadow: "0 4px 12px rgba(26,74,107,0.2)",
                      "&:hover": {
                        bgcolor: "#003350",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.2s ease",
                      "&.Mui-disabled": {
                        bgcolor: alpha("#1a4a6b", 0.6),
                      },
                    }}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </Stack>
              </form>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <Alert
                  severity="success"
                  sx={{
                    mb: 3,
                    borderRadius: "0.5rem",
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                    "& .MuiAlert-message": {
                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                    },
                  }}
                >
                  Reset link sent! Please check your email at <strong>{email}</strong>
                </Alert>
                <Typography
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                    color: "#64748b",
                    mb: 2,
                  }}
                >
                  Didn't receive the email? Check your spam folder or try again.
                </Typography>
                <Button
                  onClick={() => setSubmitted(false)}
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                    color: "#1a4a6b",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: alpha("#1a4a6b", 0.04),
                    },
                  }}
                >
                  ← Resend email
                </Button>
              </Box>
            )}

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  color: "#94a3b8",
                }}
              >
                Remember your password?{" "}
                <Link
                  onClick={handleBackToLogin}
                  sx={{
                    color: "#1a4a6b",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontSize: { xs: "0.65rem", sm: "0.7rem" },
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Back to Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;
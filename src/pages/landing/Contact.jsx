// components/Contact.jsx - Minimal Version
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Stack,
  alpha,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: "#fafbfc",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.3rem", sm: "1.5rem" },
                fontWeight: 600,
                mb: 1,
                color: "#0f172a",
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                fontSize: "0.75rem",
                mb: 3,
              }}
            >
              Our team is here to help
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 20, color: "#1a4a6b" }} />
                <Typography variant="body2" sx={{ fontSize: "0.7rem", color: "#475569" }}>
                  Tech Park, Sector 62, Noida, India
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <PhoneIcon sx={{ fontSize: 20, color: "#1a4a6b" }} />
                <Typography variant="body2" sx={{ fontSize: "0.7rem", color: "#475569" }}>
                  +91 120 456 7890
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <EmailIcon sx={{ fontSize: 20, color: "#1a4a6b" }} />
                <Typography variant="body2" sx={{ fontSize: "0.7rem", color: "#475569" }}>
                  support@assetflow.com
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: 2.5,
                borderRadius: "1rem",
                border: `1px solid ${alpha("#0f172a", 0.06)}`,
              }}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={3}
                value={formData.message}
                onChange={handleChange}
                required
                size="small"
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 0.75,
                  borderRadius: "0.75rem",
                  bgcolor: "#1a4a6b",
                  fontSize: "0.75rem",
                  "&:hover": { bgcolor: "#003350" },
                }}
              >
                Send Message
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
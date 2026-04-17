// components/Footer.jsx
import React from "react";
import { Box, Container, Typography, Grid, Stack, IconButton } from "@mui/material";


const Footer = () => {
  return (
    <Box component="footer" sx={{ py: { xs: 2, md: 3 }, bgcolor: "background.default", borderTop: "1px solid #f1f5f9" }}>
      <Container maxWidth="xl">
        <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #f8fafc", textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{
              color: "#18181b",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            }}
          >
            © 2026 Asset Management System • Precision Engineered
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
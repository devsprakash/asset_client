// components/CTA.jsx - Minimal Version
import React from "react";
import { Box, Container, Typography, Button, Stack, alpha } from "@mui/material";

const CTA = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            background: "linear-gradient(135deg, #1a4a6b 0%, #003350 100%)",
            borderRadius: { xs: "1.5rem", md: "2rem" },
            p: { xs: 3, sm: 4, md: 5 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
              color: "white",
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            Ready to Elevate Your Asset Infrastructure?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.8)",
              maxWidth: "500px",
              mx: "auto",
              mb: 3,
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
            }}
          >
            Join 500+ enterprises. Start your 14-day free trial today.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "#1a4a6b",
                px: 3,
                py: 1,
                borderRadius: "1rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                "&:hover": { bgcolor: "white", transform: "translateY(-2px)" },
              }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "white",
                px: 3,
                py: 1,
                borderRadius: "1rem",
                fontSize: "0.75rem",
                "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.05)" },
              }}
            >
              Contact Sales
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default CTA;
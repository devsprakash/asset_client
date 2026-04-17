// components/Features.jsx - Card Style Minimal
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import BarChartIcon from "@mui/icons-material/BarChart";

const features = [
  {
    icon: <InventoryIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />,
    title: "Lifecycle Tracking",
    description:
      "Centralize your asset registry with granular lifecycle data and real-time status updates.",
  },
  {
    icon: <FactCheckIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />,
    title: "Smart Checklists",
    description:
      "Design dynamic, conditional logic checklists that standardize procedures.",
  },
  {
    icon: <QrCodeScannerIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />,
    title: "Mobile Inspections",
    description:
      "Execute thorough field audits using offline-first mobile tools.",
  },
  {
    icon: <BadgeIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />,
    title: "Workforce Orchestration",
    description:
      "Optimize field technician schedules and automate task assignments.",
  },
  {
    icon: <BusinessIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />,
    title: "Client Portal",
    description:
      "Provide stakeholders with secure, read-only transparency into asset health.",
  },
  {
    icon: <BarChartIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />,
    title: "Predictive Analytics",
    description:
      "Leverage historical data to predict maintenance needs before failures.",
  },
];

const Features = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      id="features"
      component="section"
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        bgcolor: "#fafbfc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: { xs: "60%", sm: "50%", md: "40%" },
          height: { xs: "60%", sm: "50%", md: "40%" },
          background: "radial-gradient(circle, rgba(26,74,107,0.02) 0%, rgba(26,74,107,0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: { xs: "60%", sm: "50%", md: "40%" },
          height: { xs: "60%", sm: "50%", md: "40%" },
          background: "radial-gradient(circle, rgba(26,74,107,0.02) 0%, rgba(26,74,107,0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <Container 
        maxWidth="xl" 
        sx={{
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, sm: 6, md: 7, lg: 8 } }}>
          <Typography
            variant="overline"
            sx={{
              color: "#1a4a6b",
              fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
              fontWeight: 600,
              letterSpacing: "0.1em",
              mb: 1.5,
              display: "block",
              textTransform: "uppercase",
            }}
          >
            WHY CHOOSE US
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" },
              fontWeight: 700,
              color: "#0f172a",
              mb: { xs: 1, sm: 1.5 },
              letterSpacing: "-0.02em",
            }}
          >
            Powerful Features for Modern Asset Management
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
              maxWidth: { xs: "100%", sm: "80%", md: "70%", lg: "550px" },
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Everything you need to manage, track, and optimize your assets efficiently
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={{ xs: 2, sm: 2.5, md: 3, lg: 3.5 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {features.map((feature, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={index}
              sx={{
                display: "flex",
              }}
            >
              <Card
                elevation={0}
                sx={{
                  borderRadius: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                  border: `1px solid ${alpha("#0f172a", 0.06)}`,
                  bgcolor: "#ffffff",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-4px)" },
                    boxShadow: { xs: "none", sm: "0 12px 24px -12px rgba(0,0,0,0.12)" },
                    borderColor: { sm: alpha("#1a4a6b", 0.1) },
                  },
                }}
              >
                <CardContent 
                  sx={{ 
                    p: { xs: 2, sm: 2.5, md: 3 },
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 40, sm: 42, md: 44 },
                      height: { xs: 40, sm: 42, md: 44 },
                      borderRadius: { xs: "0.75rem", sm: "1rem" },
                      bgcolor: alpha("#1a4a6b", 0.06),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: { xs: 1.5, sm: 2, md: 2.5 },
                      color: "#1a4a6b",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: { xs: "none", sm: "scale(1.05)" },
                        bgcolor: alpha("#1a4a6b", 0.1),
                      },
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem" },
                      mb: { xs: 0.75, sm: 1 },
                      color: "#0f172a",
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                      lineHeight: 1.5,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Optional: View All Features Link */}
        <Box sx={{ textAlign: "center", mt: { xs: 5, sm: 6, md: 7, lg: 8 } }}>
          <Typography
            component="a"
            href="#"
            sx={{
              color: "#1a4a6b",
              fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                gap: 1.5,
                color: "#003350",
              },
              transition: "all 0.2s ease",
            }}
          >
            View all features →
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
// components/Pricing.jsx - Optimized Design
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const plans = [
  {
    name: "Core",
    price: "₹999",
    period: "/mo",
    description: null,
    features: ["Up to 100 Assets", "5 Team Members", "Standard Dashboard"],
    popular: false,
    buttonText: "Start Plan",
  },
  {
    name: "Enterprise",
    price: "₹1999",
    period: "/mo",
    description: null,
    features: [
      "Unlimited Assets",
      "25 Team Members",
      "Dynamic Checklist Builder",
      "Full API Access",
    ],
    popular: true,
    buttonText: "Select Enterprise",
  },
  {
    name: "Custom",
    price: "Quote",
    period: "",
    description: "For multi-national organizations requiring localized compliance and custom ERP integrations.",
    features: ["White-labeling", "24/7 Priority Support"],
    popular: false,
    buttonText: "Contact Sales",
  },
];

const Pricing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      id="pricing"
      component="section"
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, sm: 7, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" },
              fontWeight: 700,
              mb: 1.5,
              letterSpacing: "-0.02em",
              color: "#0f172a",
            }}
          >
            Transparent Scaling
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.85rem", sm: "0.9rem" },
            }}
          >
            Infrastructure-grade solutions at predictable price points.
          </Typography>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          alignItems="center"
          justifyContent="center"
        >
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 3.5 },
                  borderRadius: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  border: "1px solid",
                  borderColor: alpha("#0f172a", 0.08),
                  ...(plan.popular && {
                    background: "linear-gradient(135deg, #1a4a6b 0%, #003350 100%)",
                    color: "white",
                    transform: { md: "scale(1.05)" },
                  }),
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: { xs: "translateY(-4px)", md: plan.popular ? "scale(1.05) translateY(-4px)" : "translateY(-4px)" },
                    boxShadow: "0 12px 24px -12px rgba(0,0,0,0.1)",
                    ...(plan.popular && {
                      boxShadow: "0 20px 35px -12px rgba(26,74,107,0.3)",
                    }),
                  },
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      px: { xs: 1.5, sm: 2 },
                      py: { xs: 0.5, sm: 0.75 },
                      bgcolor: "white",
                      color: "primary.main",
                      borderRadius: "full",
                      fontSize: { xs: "0.6rem", sm: "0.65rem" },
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Preferred
                  </Box>
                )}

                {/* Plan Name */}
                <Box sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                      mb: 1,
                      ...(plan.popular && { opacity: 0.9 }),
                      color: plan.popular ? "white" : "#0f172a",
                    }}
                  >
                    {plan.name}
                  </Typography>
                  <Stack direction="row" alignItems="baseline" spacing={0.5}>
                    <Typography
                      variant="h2"
                      fontWeight={800}
                      sx={{
                        fontSize: { xs: "2rem", sm: "2.2rem", md: "2rem" },
                        color: plan.popular ? "white" : "#1a4a6b",
                      }}
                    >
                      {plan.price}
                    </Typography>
                    {plan.period && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "0.7rem", sm: "0.75rem" },
                          ...(plan.popular && { opacity: 0.7, color: "white" }),
                          color: plan.popular ? "white" : "#64748b",
                        }}
                      >
                        {plan.period}
                      </Typography>
                    )}
                  </Stack>
                </Box>

                {/* Description */}
                {plan.description && (
                  <Typography
                    variant="body2"
                    sx={{
                      mb: { xs: 2, sm: 2.5, md: 3 },
                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      ...(plan.popular && { opacity: 0.8, color: "white" }),
                      color: plan.popular ? "white" : "#64748b",
                      lineHeight: 1.5,
                    }}
                  >
                    {plan.description}
                  </Typography>
                )}

                {/* Features List */}
                <Box sx={{ flex: 1, mb: { xs: 3, sm: 3.5, md: 4 } }}>
                  {plan.features.map((feature, i) => (
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      key={i}
                      sx={{ mb: { xs: 1, sm: 1.25, md: 1.5 } }}
                    >
                      <CheckCircleIcon
                        sx={{
                          fontSize: { xs: 16, sm: 17, md: 18 },
                          ...(plan.popular ? { color: "white" } : { color: "primary.main" }),
                        }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                          ...(plan.popular && { color: "white", opacity: 0.9 }),
                          color: plan.popular ? "white" : "#334155",
                        }}
                      >
                        {feature}
                      </Typography>
                    </Stack>
                  ))}
                </Box>

                {/* CTA Button */}
                <Button
                  variant={plan.popular ? "contained" : "outlined"}
                  fullWidth
                  sx={{
                    py: { xs: 1, sm: 1.25, md: 1.5 },
                    borderRadius: { xs: "0.875rem", sm: "1rem" },
                    fontWeight: 700,
                    fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                    textTransform: "none",
                    ...(plan.popular
                      ? {
                          bgcolor: "white",
                          color: "primary.main",
                          "&:hover": {
                            bgcolor: "#f8fafc",
                            transform: "translateY(-2px)",
                          },
                        }
                      : {
                          borderColor: alpha("#1a4a6b", 0.3),
                          color: "#1a4a6b",
                          "&:hover": {
                            borderColor: "#1a4a6b",
                            bgcolor: alpha("#1a4a6b", 0.04),
                            transform: "translateY(-2px)",
                          },
                        }),
                    transition: "all 0.2s ease",
                  }}
                >
                  {plan.buttonText}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Additional Trust Badge */}
        <Box sx={{ textAlign: "center", mt: { xs: 5, sm: 6, md: 7 } }}>
          <Typography
            variant="caption"
            sx={{
              color: "#94a3b8",
              fontSize: { xs: "0.6rem", sm: "0.65rem" },
              display: "block",
            }}
          >
            ⭐ Trusted by 500+ companies • No credit card required • Cancel anytime
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing;
// components/Hero.jsx - Alternative Design
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Stack,
  Grid,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import VerifiedIcon from "@mui/icons-material/Verified";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GroupsIcon from "@mui/icons-material/Groups";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Hero = ({ scrollToSection }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const features = [
    { icon: <VerifiedIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />, label: "Real-time Tracking" },
    { icon: <FactCheckIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />, label: "Smart Inspections" },
    { icon: <GroupsIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />, label: "Team Sync" },
    { icon: <AnalyticsIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />, label: "AI Analytics" },
  ];

  const stats = [
    { value: "500+", label: "Enterprise Clients" },
    { value: "50K+", label: "Assets Managed" },
    { value: "99.9%", label: "Uptime SLA" },
  ];

  return (
    <Box
      id="home"
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "100vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        bgcolor: "background.default",
        pt: { xs: 10, sm: 12, md: 14, lg: 16 },
        pb: { xs: 6, sm: 8, md: 10, lg: 12 },
      }}
    >
      {/* Background Gradient Effects - Enhanced */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: { xs: "-20%", md: "-10%" },
          width: { xs: "100%", md: "60%" },
          height: { xs: "80%", md: "70%" },
          background: "radial-gradient(circle, rgba(26,74,107,0.05) 0%, rgba(26,74,107,0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: { xs: "-20%", md: "-5%" },
          width: { xs: "100%", md: "50%" },
          height: { xs: "60%", md: "50%" },
          background: "radial-gradient(circle, rgba(26,74,107,0.03) 0%, rgba(26,74,107,0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <Container 
        maxWidth="xl" 
        sx={{
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
        }}
      >
        <Grid 
          container 
          spacing={{ xs: 4, sm: 6, md: 8, lg: 10 }} 
          alignItems="center"
          justifyContent="center"
        >
          {/* Left Content */}
          <Grid item xs={12} md={6} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ width: "100%" }}
            >
              {/* Status Badge */}
              <Chip
                label="✨ NEW PLATFORM LAUNCH"
                sx={{
                  backgroundColor: alpha("#1a4a6b", 0.08),
                  color: "#1a4a6b",
                  fontWeight: 600,
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  letterSpacing: "0.02em",
                  mb: { xs: 2.5, sm: 3, md: 4 },
                  borderRadius: "full",
                  height: { xs: 26, sm: 28 },
                  "& .MuiChip-label": { px: { xs: 1.5, sm: 2 } },
                }}
              />

              {/* Main Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { 
                    xs: "1.8rem", 
                    sm: "2.2rem", 
                    md: "2.5rem", 
                    lg: "3rem", 
                    xl: "3.5rem" 
                  },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: { xs: 1.5, sm: 2 },
                  letterSpacing: "-0.02em",
                }}
              >
                Transform Your
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    background: "linear-gradient(135deg, #1a4a6b 0%, #003350 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    mt: { xs: 0.5, sm: 1 },
                  }}
                >
                  Asset Management
                </Box>
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem", lg: "1.1rem" },
                  lineHeight: 1.6,
                  mb: { xs: 3, sm: 4, md: 5 },
                  maxWidth: { xs: "100%", md: "90%" },
                }}
              >
                The intelligent platform that gives you complete visibility and control over your assets, 
                from acquisition to retirement. Trusted by industry leaders worldwide.
              </Typography>

              {/* CTA Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.5, sm: 2 }}
                sx={{ mb: { xs: 4, sm: 5, md: 6 } }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => scrollToSection("pricing")}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                  sx={{
                    px: { xs: 2.5, sm: 3, md: 4 },
                    py: { xs: 1, sm: 1.2, md: 1.3 },
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #1a4a6b 0%, #003350 100%)",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 14px rgba(26,74,107,0.25)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(26,74,107,0.35)",
                    },
                  }}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrowIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                  sx={{
                    px: { xs: 2.5, sm: 3, md: 4 },
                    py: { xs: 1, sm: 1.2, md: 1.3 },
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                    fontWeight: 600,
                    borderColor: alpha("#1a4a6b", 0.3),
                    color: "#1a4a6b",
                    borderRadius: "1rem",
                    "&:hover": {
                      borderColor: "#1a4a6b",
                      backgroundColor: alpha("#1a4a6b", 0.04),
                    },
                  }}
                >
                  Watch Demo
                </Button>
              </Stack>

              {/* Trust Indicators */}
              <Stack
                direction="row"
                spacing={{ xs: 2, sm: 3, md: 4 }}
                sx={{ 
                  mb: { xs: 3, sm: 4, md: 5 }, 
                  flexWrap: "wrap", 
                  gap: { xs: 1.5, sm: 2 },
                  justifyContent: { xs: "flex-start", sm: "flex-start" }
                }}
              >
                {stats.map((stat, index) => (
                  <Box key={index} sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "#1a4a6b",
                        fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                        fontWeight: 500,
                        display: "block",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {/* Feature List */}
              <Grid 
                container 
                spacing={{ xs: 1.5, sm: 2 }} 
                sx={{ maxWidth: "100%" }}
              >
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: { xs: 28, sm: 32 },
                          height: { xs: 28, sm: 32 },
                          borderRadius: "0.75rem",
                          bgcolor: alpha("#1a4a6b", 0.08),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#1a4a6b",
                          flexShrink: 0,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: "#334155",
                          fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                        }}
                      >
                        {feature.label}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          {/* Right Content - Image/Visual */}
          <Grid item xs={12} md={6} lg={5.5} xl={5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ width: "100%" }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {/* Floating Elements - Responsive Positioning */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    top: { xs: "5%", sm: "10%", md: "5%" },
                    left: { xs: "0%", sm: "-5%", md: "-10%", lg: "-15%" },
                    zIndex: 2,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 1, sm: 1.5, md: 2 },
                      borderRadius: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      bgcolor: "white",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 0.75, sm: 1 },
                    }}
                  >
                    <CheckCircleIcon sx={{ color: "#10b981", fontSize: { xs: 16, sm: 18, md: 20 } }} />
                    <Typography 
                      variant="caption" 
                      fontWeight={600}
                      sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" } }}
                    >
                      Real-time sync
                    </Typography>
                  </Paper>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  style={{
                    position: "absolute",
                    bottom: { xs: "10%", sm: "15%", md: "10%" },
                    right: { xs: "0%", sm: "-5%", md: "-10%", lg: "-15%" },
                    zIndex: 2,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 1, sm: 1.5, md: 2 },
                      borderRadius: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      bgcolor: "white",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 0.75, sm: 1 },
                    }}
                  >
                    <AnalyticsIcon sx={{ color: "#1a4a6b", fontSize: { xs: 16, sm: 18, md: 20 } }} />
                    <Typography 
                      variant="caption" 
                      fontWeight={600}
                      sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" } }}
                    >
                      +32% efficiency
                    </Typography>
                  </Paper>
                </motion.div>

                {/* Main Image Card */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: { xs: "100%", sm: 500, md: 550, lg: 600 },
                    mx: "auto",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(circle at 30% 40%, rgba(26,74,107,0.1), transparent 70%)",
                      borderRadius: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                      filter: "blur(40px)",
                    }}
                  />
                  <Paper
                    elevation={0}
                    sx={{
                      position: "relative",
                      bgcolor: "background.paper",
                      borderRadius: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
                      overflow: "hidden",
                      boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                      alt="Asset Management Dashboard"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                    {/* Gradient Overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "30%",
                        background: "linear-gradient(to top, rgba(0,0,0,0.05), transparent)",
                        pointerEvents: "none",
                      }}
                    />
                  </Paper>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            position: "absolute",
            bottom: { xs: 20, sm: 25, md: 30 },
            left: "50%",
            transform: "translateX(-50%)",
            display: isMobile ? "none" : "block",
          }}
        >
          <Stack
            alignItems="center"
            spacing={1}
            sx={{
              cursor: "pointer",
              "&:hover": { opacity: 0.7 },
            }}
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.65rem", sm: "0.7rem" },
                letterSpacing: "0.1em",
              }}
            >
              SCROLL
            </Typography>
            <Box
              sx={{
                width: 2,
                height: { xs: 30, sm: 35, md: 40 },
                bgcolor: alpha("#1a4a6b", 0.3),
                borderRadius: 1,
              }}
            />
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;
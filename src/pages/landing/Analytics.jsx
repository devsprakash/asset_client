// components/Analytics.jsx - Optimized Clean Design
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MonitoringIcon from "@mui/icons-material/MonitorHeart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const Analytics = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const assetData = [40, 65, 95, 50, 80];
  const maxHeight = isMobile ? 100 : 120;

  const alerts = [
    {
      title: "HVAC Unit B-4",
      status: "Critical Fault Detected",
      type: "urgent",
      icon: <WarningIcon sx={{ fontSize: 14 }} />,
      color: "#ea580c",
      bgColor: "#fff7ed",
      badgeBg: "#fed7aa",
      badge: "URGENT",
    },
    {
      title: "Main Server Rack",
      status: "System Operating Normally",
      type: "safe",
      icon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
      color: "#059669",
      bgColor: "#f0fdf4",
      badgeBg: "#a7f3d0",
      badge: "SAFE",
    },
  ];

  return (
    <Box
      id="analytics"
      component="section"
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        bgcolor: "#fafbfc",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header - Refined */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, sm: 6, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{
              color: "#1a4a6b",
              fontWeight: 600,
              fontSize: { xs: "0.6rem", sm: "0.65rem" },
              letterSpacing: "0.1em",
              mb: 0.75,
              display: "block",
            }}
          >
            REAL-TIME INSIGHTS
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem", lg: "2rem" },
              fontWeight: 700,
              mb: 1,
              letterSpacing: "-0.02em",
              color: "#0f172a",
            }}
          >
            Actionable Intelligence
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              maxWidth: "500px",
              mx: "auto",
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
              lineHeight: 1.5,
            }}
          >
            Monitor every heartbeat of your operation through refined, real-time data visualization.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {/* Asset Health Card */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: "1.25rem",
                border: "1px solid",
                borderColor: alpha("#0f172a", 0.06),
                bgcolor: "#ffffff",
                transition: "all 0.2s ease",
                height: "100%",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px -8px rgba(0,0,0,0.08)",
                  borderColor: alpha("#1a4a6b", 0.15),
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: { xs: 2, sm: 2.5 } }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" }, color: "#0f172a" }}
                >
                  Asset Health
                </Typography>
                <Box
                  sx={{
                    width: { xs: 28, sm: 32 },
                    height: { xs: 28, sm: 32 },
                    borderRadius: "0.5rem",
                    bgcolor: alpha("#1a4a6b", 0.06),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MonitoringIcon sx={{ color: "#1a4a6b", fontSize: { xs: 16, sm: 18 } }} />
                </Box>
              </Stack>

              {/* Chart Bars - Responsive */}
              <Box
                sx={{
                  height: maxHeight,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: { xs: 0.75, sm: 1 },
                  mb: { xs: 2, sm: 2.5 },
                }}
              >
                {assetData.map((height, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: 1,
                      bgcolor: i === 2 ? "#1a4a6b" : alpha("#1a4a6b", 0.2 + i * 0.08),
                      height: `${(height / 100) * maxHeight}px`,
                      borderRadius: "0.375rem",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: i === 2 ? "#003350" : alpha("#1a4a6b", 0.5),
                      },
                    }}
                  />
                ))}
              </Box>

              {/* Stats Footer */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  pt: 1.5,
                  borderTop: "1px solid",
                  borderColor: alpha("#0f172a", 0.06),
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "#64748b", fontSize: { xs: "0.6rem", sm: "0.65rem" }, fontWeight: 500 }}
                >
                  Utilization Rate
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <TrendingUpIcon sx={{ fontSize: { xs: 10, sm: 12 }, color: "#10b981" }} />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      color: "#10b981",
                      fontSize: { xs: "0.6rem", sm: "0.65rem" },
                    }}
                  >
                    +12.4%
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          {/* Live Reports Card - Optimized */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: "1.25rem",
                border: "1px solid",
                borderColor: alpha("#0f172a", 0.06),
                bgcolor: "#ffffff",
                transition: "all 0.2s ease",
                height: "100%",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px -8px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: { xs: 2, sm: 2.5 } }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" }, color: "#0f172a" }}
                >
                  Live Reports
                </Typography>
                <Box
                  sx={{
                    width: { xs: 28, sm: 32 },
                    height: { xs: 28, sm: 32 },
                    borderRadius: "0.5rem",
                    bgcolor: alpha("#1a4a6b", 0.06),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AssignmentIcon sx={{ color: "#1a4a6b", fontSize: { xs: 16, sm: 18 } }} />
                </Box>
              </Stack>

              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, sm: 1.5 } }}>
                {alerts.map((alert, idx) => (
                  <Stack
                    key={idx}
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{
                      p: { xs: 1, sm: 1.25 },
                      bgcolor: alert.bgColor,
                      borderRadius: "0.875rem",
                      transition: "all 0.2s ease",
                      "&:hover": { transform: "translateX(4px)" },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                        borderRadius: "full",
                        bgcolor: alert.badgeBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {alert.icon}
                    </Box>
                    <Box flex={1}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" }, color: "#0f172a" }}
                      >
                        {alert.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#64748b", fontSize: { xs: "0.55rem", sm: "0.6rem" }, display: "block" }}
                      >
                        {alert.status}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{
                        color: alert.color,
                        fontSize: { xs: "0.55rem", sm: "0.6rem" },
                        letterSpacing: "0.02em",
                      }}
                    >
                      {alert.badge}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Team Performance Card - Compact */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: "1.25rem",
                border: "1px solid",
                borderColor: alpha("#0f172a", 0.06),
                bgcolor: "#ffffff",
                transition: "all 0.2s ease",
                height: "100%",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px -8px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: { xs: 2, sm: 2.5 } }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" }, color: "#0f172a" }}
                >
                  Team Performance
                </Typography>
                <Box
                  sx={{
                    width: { xs: 28, sm: 32 },
                    height: { xs: 28, sm: 32 },
                    borderRadius: "0.5rem",
                    bgcolor: alpha("#1a4a6b", 0.06),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GroupsIcon sx={{ color: "#1a4a6b", fontSize: { xs: 16, sm: 18 } }} />
                </Box>
              </Stack>

              {/* Circular Progress - Smaller */}
              <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ position: "relative", width: { xs: 80, sm: 90, md: 100 }, height: { xs: 80, sm: 90, md: 100 } }}>
                  <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke={alpha("#1a4a6b", 0.1)}
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#1a4a6b"
                      strokeWidth="8"
                      strokeDasharray="263.89"
                      strokeDashoffset="39.58"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                      color: "#1a4a6b",
                    }}
                  >
                    85%
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  textAlign: "center",
                  display: "block",
                  fontWeight: 500,
                  color: "#64748b",
                  fontSize: { xs: "0.55rem", sm: "0.6rem" },
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  mb: { xs: 1.5, sm: 2 },
                }}
              >
                Active Fleet Capacity
              </Typography>

              {/* Mini Stats - Compact */}
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                sx={{
                  pt: { xs: 1.5, sm: 2 },
                  borderTop: "1px solid",
                  borderColor: alpha("#0f172a", 0.06),
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: { xs: "0.55rem", sm: "0.6rem" },
                    color: "#64748b",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  ⚡ 24 Active Technicians
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Quick Stats Row - Optional */}
        <Grid container spacing={1.5} sx={{ mt: { xs: 2, sm: 3 } }}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center", p: 1 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#1a4a6b" }}
              >
                1,284
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" }, color: "#64748b" }}
              >
                Assets
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center", p: 1 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#1a4a6b" }}
              >
                98.5%
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" }, color: "#64748b" }}
              >
                Uptime
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center", p: 1 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, color: "#1a4a6b" }}
              >
                156
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" }, color: "#64748b" }}
              >
                Inspections
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Analytics;
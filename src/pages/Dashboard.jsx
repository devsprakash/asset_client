// pages/Dashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  History as HistoryIcon,
  Bolt as BoltIcon,
  Group as GroupIcon,
  Payments as PaymentsIcon,
  EventBusy as EventBusyIcon,
  AddCircle as AddCircleIcon,
  PersonAdd as PersonAddIcon,
  Analytics as AnalyticsIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";
import { useAuth } from "../context/AuthContexts";

// Custom color palette
const colors = {
  primary: "#002631",
  primaryContainer: "#003d4d",
  onPrimaryContainer: "#79a8ba",
  secondary: "#516072",
  secondaryContainer: "#d2e1f7",
  onSecondaryContainer: "#556477",
  tertiary: "#331d00",
  tertiaryContainer: "#503000",
  onTertiaryContainer: "#df8f00",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",
  surface: "#f7f9fb",
  surfaceContainerLow: "#f2f4f6",
  surfaceContainerLowest: "#ffffff",
  surfaceVariant: "#e0e3e5",
  outline: "#71787c",
  outlineVariant: "#c0c8cc",
};

// Stat Card Component
const StatCard = ({
  icon: Icon,
  title,
  value,
  trend,
  trendUp = true,
  bgColor,
  iconBg,
  trendColor,
  loading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={0}
      sx={{
        p: isMobile ? 2 : 3,
        borderRadius: 3,
        bgcolor: bgColor || "background.paper",
        border: "1px solid",
        borderColor: "transparent",
        transition: "all 0.2s",
        "&:hover": bgColor ? {} : { borderColor: colors.outlineVariant },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {bgColor && (
        <Box
          sx={{
            position: "absolute",
            top: -16,
            right: -16,
            width: 96,
            height: 96,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        />
      )}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor:
                iconBg ||
                (bgColor
                  ? "rgba(255,255,255,0.15)"
                  : colors.secondaryContainer),
              color: bgColor ? "white" : colors.onSecondaryContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon fontSize="small" />
          </Box>
          {trend && (
            <Box
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: bgColor
                  ? "rgba(255,255,255,0.15)"
                  : colors.surfaceContainerLow,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {trendUp ? (
                <TrendingUpIcon
                  sx={{
                    fontSize: 12,
                    color: bgColor ? "white" : trendColor || "inherit",
                  }}
                />
              ) : (
                <TrendingDownIcon
                  sx={{
                    fontSize: 12,
                    color: bgColor ? "white" : trendColor || "inherit",
                  }}
                />
              )}
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: bgColor ? "white" : "inherit" }}
              >
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: bgColor ? colors.onPrimaryContainer : colors.secondary,
            textTransform: "uppercase",
            fontSize: "0.65rem",
          }}
        >
          {title}
        </Typography>
        {loading ? (
          <CircularProgress size={20} sx={{ mt: 1 }} />
        ) : (
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: bgColor ? "white" : colors.primary,
              fontSize: isMobile ? "1.1rem" : "1.4rem",
              lineHeight: 1.2,
            }}
          >
            {value ?? 0}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

// Helper function to export CSV
const exportToCSV = (data, filename) => {
  if (!data) return;

  const flattenData = (obj, prefix = "") => {
    const result = {};
    for (const key in obj) {
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        Object.assign(result, flattenData(obj[key], `${prefix}${key}_`));
      } else if (Array.isArray(obj[key])) {
        result[`${prefix}${key}`] = JSON.stringify(obj[key]);
      } else {
        result[`${prefix}${key}`] = obj[key];
      }
    }
    return result;
  };

  const flatData = flattenData(data);
  const headers = Object.keys(flatData);
  const csvRows = [headers.join(",")];
  const values = headers.map((header) => {
    const value = flatData[header];
    const escaped =
      typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value;
    return escaped;
  });
  csvRows.push(values.join(","));

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

// Helper function to export PDF
const exportToPDF = async (data, filename) => {
  // Dynamic import for html2pdf
  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.createElement("div");
  element.style.padding = "20px";
  element.style.fontFamily = "Arial, sans-serif";
  element.innerHTML = `
    <h1 style="color: #002631; text-align: center;">Dashboard Report</h1>
    <p style="text-align: center; color: #666;">Generated on ${new Date().toLocaleString()}</p>
    <pre style="background: #f5f5f5; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 12px;">${JSON.stringify(data, null, 2)}</pre>
  `;

  document.body.appendChild(element);
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: `${filename}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  await html2pdf().set(opt).from(element).save();
  document.body.removeChild(element);
};

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuth();
  const {
    dashboardData,
    statsData,
    chartData,
    activities,
    loading,
    error,
    loadDashboard,
    exportDashboardReport,
    clearError,
  } = useDashboard();

  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const showToast = (msg, sev = "success") =>
    setToast({ open: true, message: msg, severity: sev });
  const closeToast = () => setToast((prev) => ({ ...prev, open: false }));

  const handleRefresh = () => {
    loadDashboard();
    showToast("Dashboard refreshed", "info");
  };

  const handleExport = async (type) => {
    setExporting(true);
    setExportAnchorEl(null);

    try {
      const exportBlob = await exportDashboardReport();
      if (exportBlob) {
        const text = await exportBlob.text();
        const data = JSON.parse(text);

        const filename = `dashboard_report_${new Date().toISOString().split("T")[0]}`;

        if (type === "csv") {
          exportToCSV(data, filename);
          showToast("CSV exported successfully", "success");
        } else if (type === "pdf") {
          await exportToPDF(data, filename);
          showToast("PDF exported successfully", "success");
        }
      } else {
        showToast("Failed to export dashboard", "error");
      }
    } catch (err) {
      console.error("Export error:", err);
      showToast("Failed to export dashboard", "error");
    } finally {
      setExporting(false);
    }
  };

  // Get role-specific data
  const getOverviewData = () => {
    if (user?.role === "super_admin") {
      return dashboardData?.overview || {};
    } else if (user?.role === "admin") {
      return dashboardData?.overview || {};
    } else {
      return statsData?.overview || {};
    }
  };

  const overview = getOverviewData();

  // Super Admin Stats
  const superAdminStats = [
    {
      icon: GroupIcon,
      title: "Total Customers",
      value: overview.totalClients,
      trend: `${overview.clientGrowth || 0}%`,
      trendUp: overview.clientGrowth >= 0,
      bgColor: colors.primaryContainer,
    },
    {
      icon: GroupIcon,
      title: "Active Customers",
      value: overview.activeClients,
      trend: "8.2%",
      trendUp: true,
      iconBg: colors.secondaryContainer,
    },
    {
      icon: PaymentsIcon,
      title: "Total Revenue",
      value: `$${overview.totalRevenue?.toLocaleString() || 0}`,
      trend: "15.3%",
      trendUp: true,
    },
    {
      icon: EventBusyIcon,
      title: "Expiring Soon",
      value: overview.expiringSoon || 0,
      trend: "3.1%",
      trendUp: false,
      iconBg: colors.errorContainer,
      trendColor: colors.onErrorContainer,
    },
  ];

  // Admin Stats
  const adminStats = [
    {
      icon: GroupIcon,
      title: "Team Members",
      value: overview.totalTeamMembers,
      bgColor: colors.primaryContainer,
    },
    {
      icon: GroupIcon,
      title: "Active Team",
      value: overview.activeTeamMembers,
      iconBg: colors.secondaryContainer,
    },
    { icon: PaymentsIcon, title: "Total Assets", value: overview.totalAssets },
    {
      icon: EventBusyIcon,
      title: "Inspections",
      value: overview.totalInspections,
      iconBg: colors.errorContainer,
    },
  ];

  // Team Stats
  const teamStats = [
    {
      icon: GroupIcon,
      title: "Total Tasks",
      value: overview.totalTasks,
      bgColor: colors.primaryContainer,
    },
    {
      icon: GroupIcon,
      title: "Completed",
      value: overview.completedTasks,
      iconBg: colors.secondaryContainer,
    },
    {
      icon: PaymentsIcon,
      title: "Completion Rate",
      value: `${overview.completionRate || 0}%`,
    },
    {
      icon: EventBusyIcon,
      title: "Performance Score",
      value: `${overview.performanceScore || 0}%`,
      iconBg: colors.errorContainer,
    },
  ];

  const statsToShow =
    user?.role === "super_admin"
      ? superAdminStats
      : user?.role === "admin"
        ? adminStats
        : teamStats;

  // Get chart data
  const revenueTrend = chartData?.revenueTrend || [];
  const clientGrowth = chartData?.clientGrowth || { labels: [], data: [] };
  const subscriptionDistribution = chartData?.subscriptionDistribution || [];

  return (
    <Box
      sx={{
        bgcolor: colors.surface,
        minHeight: "100vh",
        p: { xs: 1.5, sm: 2, md: 3 },
      }}
    >
      {/* Header with Export and Refresh */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2.5,
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: colors.primary,
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
          }}
        >
          Dashboard
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Refresh">
            <IconButton
              onClick={handleRefresh}
              size="small"
              sx={{ bgcolor: colors.surfaceContainerLow }}
            >
              <RefreshIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton
              onClick={(e) => setExportAnchorEl(e.currentTarget)}
              size="small"
              sx={{ bgcolor: colors.surfaceContainerLow }}
            >
              <DownloadIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={exportAnchorEl}
            open={Boolean(exportAnchorEl)}
            onClose={() => setExportAnchorEl(null)}
          >
            <MenuItem onClick={() => handleExport("csv")} disabled={exporting}>
              <ListItemIcon>
                <CsvIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Export as CSV" />
            </MenuItem>
            <MenuItem onClick={() => handleExport("pdf")} disabled={exporting}>
              <ListItemIcon>
                <PdfIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Export as PDF" />
            </MenuItem>
          </Menu>
        </Stack>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          onClose={clearError}
          sx={{ mb: 2, borderRadius: 2 }}
        >
          {error}
        </Alert>
      )}

      {/* Stats Grid */}
      <Grid
        container
        spacing={{ xs: 1.5, sm: 2 }}
        sx={{ mb: { xs: 3, sm: 4 } }}
      >
        {statsToShow.map((stat, idx) => (
          <Grid item xs={12} sm={6} lg={3} key={idx}>
            <StatCard {...stat} loading={loading} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Section - Only for Super Admin and Admin */}
      {(user?.role === "super_admin" || user?.role === "admin") && (
        <Grid
          container
          spacing={{ xs: 1.5, sm: 2 }}
          sx={{ mb: { xs: 3, sm: 4 } }}
        >
          {/* Customer Activity / Revenue Trend */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.5 },
                borderRadius: 3,
                height: "100%",
                bgcolor: "background.paper",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2.5,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: colors.primary,
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                  }}
                >
                  Revenue Trend
                </Typography>
              </Box>
              <Box sx={{ height: 200, overflowX: "auto" }}>
                {revenueTrend.length > 0 ? (
                  <Box sx={{ minWidth: 500 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 1,
                        height: 160,
                      }}
                    >
                      {revenueTrend.map((item, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              bgcolor: colors.primaryContainer,
                              height: `${(item.revenue / Math.max(...revenueTrend.map((r) => r.revenue))) * 140}px`,
                              borderRadius: "4px 4px 0 0",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 1,
                              fontSize: "0.55rem",
                              color: colors.outline,
                            }}
                          >
                            {item.month}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 200,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: colors.outline }}
                    >
                      No data available
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Revenue Distribution */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.5 },
                borderRadius: 3,
                height: "100%",
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.primary,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  mb: 2,
                }}
              >
                Subscription Distribution
              </Typography>
              <Stack spacing={1.5}>
                {subscriptionDistribution.length > 0 ? (
                  subscriptionDistribution.map((item, idx) => {
                    const colorsList = [
                      colors.primaryContainer,
                      colors.onTertiaryContainer,
                      colors.tertiaryContainer,
                      colors.secondary,
                    ];
                    return (
                      <Box
                        key={idx}
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            bgcolor: colorsList[idx % colorsList.length],
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, fontSize: "0.7rem" }}
                          >
                            {item.plan}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ fontSize: "0.6rem", color: colors.outline }}
                          >
                            {item.count} customers
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700, fontSize: "0.7rem" }}
                        >
                          ${item.potentialRevenue}/mo
                        </Typography>
                      </Box>
                    );
                  })
                ) : (
                  <Typography
                    variant="caption"
                    sx={{ color: colors.outline, textAlign: "center", py: 4 }}
                  >
                    No subscription data available
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Recent Activity Table */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              px: { xs: 2, sm: 2.5 },
              py: 1.5,
              borderBottom: "1px solid rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: colors.primary,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              <HistoryIcon
                sx={{ color: colors.primaryContainer, fontSize: "1.1rem" }}
              />
              Recent Activity
            </Typography>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "rgba(242,244,246,0.5)" }}>
                  <TableCell
                    sx={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: colors.secondary,
                      py: 1.5,
                    }}
                  >
                    Activity
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: colors.secondary,
                      py: 1.5,
                    }}
                  >
                    Details
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: colors.secondary,
                      py: 1.5,
                    }}
                  >
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                      <CircularProgress size={24} />
                    </TableCell>
                  </TableRow>
                ) : activities.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="center"
                      sx={{ py: 4, color: colors.outline }}
                    >
                      No recent activities
                    </TableCell>
                  </TableRow>
                ) : (
                  activities.slice(0, 5).map((activity, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell sx={{ py: 1.5 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography sx={{ fontSize: "1rem" }}>
                            {activity.icon}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: colors.primary,
                              fontSize: "0.7rem",
                            }}
                          >
                            {activity.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography
                          variant="caption"
                          sx={{ color: colors.secondary, fontSize: "0.65rem" }}
                        >
                          {activity.details}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography
                          variant="caption"
                          sx={{ color: colors.outline, fontSize: "0.6rem" }}
                        >
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Quick Actions */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: colors.primary,
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1.5,
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          <BoltIcon
            sx={{ color: colors.primaryContainer, fontSize: "1.1rem" }}
          />
          Quick Actions
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {[
            {
              icon: AddCircleIcon,
              title: "Create New Form",
              desc: "Initialize a new checklist",
              path:
                user?.role === "admin"
                  ? "/admin/checklists/custom-builder"
                  : "/admin/checklists/custom-builder",
            },
            {
              icon: PersonAddIcon,
              title: "Add Customer",
              desc: "Register a new client profile",
              path: "/admin/clients",
            },
            {
              icon: AnalyticsIcon,
              title: "Generate Report",
              desc: "Compile operational data",
              path: "/admin/reports",
            },
          ].map((action, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Button
                fullWidth
                onClick={() => navigate(action.path)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  p: { xs: 2, sm: 2.5 },
                  bgcolor: colors.primaryContainer,
                  borderRadius: 3,
                  textTransform: "none",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "scale(1.01)",
                    bgcolor: colors.primaryContainer,
                  },
                  boxShadow: "0 2px 8px rgba(0,38,49,0.08)",
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    bgcolor: "rgba(255,255,255,0.12)",
                    borderRadius: 1.5,
                    mb: 1.5,
                  }}
                >
                  <action.icon sx={{ color: "white", fontSize: "1.1rem" }} />
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    mb: 0.25,
                  }}
                >
                  {action.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.onPrimaryContainer,
                    textAlign: "left",
                    fontSize: "0.65rem",
                    lineHeight: 1.4,
                  }}
                >
                  {action.desc}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Toast Notifications */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={closeToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={closeToast}
          severity={toast.severity}
          sx={{ borderRadius: 2, fontSize: "0.7rem" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;

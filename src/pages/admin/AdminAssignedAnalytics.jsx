import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Avatar,
  Chip,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DownloadIcon from "@mui/icons-material/Download";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { main: "#084c61" },
    background: { default: "#f9fafb", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
          border: "1px solid #e5e7eb",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

const submissionData = [
  { day: "Jun 1", submissions: 1 },
  { day: "Jun 5", submissions: 2 },
  { day: "Jun 9", submissions: 0 },
  { day: "Jun 12", submissions: 3 },
  { day: "Jun 15", submissions: 1 },
  { day: "Jun 18", submissions: 2 },
  { day: "Jun 21", submissions: 1 },
  { day: "Jun 25", submissions: 2 },
  { day: "Jun 28", submissions: 0 },
  { day: "Jun 30", submissions: 2 },
];

const statusData = [
  { name: "Approved", value: 67, color: "#10b981" },
  { name: "Pending Review", value: 25, color: "#f59e0b" },
  { name: "Rejected", value: 8, color: "#ef4444" },
];

const performers = [
  { rank: 1, name: "John Smith", submissions: 3, score: 98 },
  { rank: 2, name: "Sarah Johnson", submissions: 2, score: 95 },
  { rank: 3, name: "Mike Davis", submissions: 2, score: 92 },
];

const MetricCard = ({ icon, iconBg, iconColor, trend, trendUp, title, value, subtitle }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper
      sx={{
        p: isMobile ? 1.5 : 2.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-2px)" },
        minHeight: isMobile ? 110 : 140,
        height: "100%",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={isMobile ? 1 : 1.5}>
        <Box
          sx={{
            p: isMobile ? 0.8 : 1,
            borderRadius: 2,
            bgcolor: iconBg,
            color: iconColor,
            display: "flex",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
        <Box display="flex" alignItems="center" gap={0.3}>
          {trendUp ? (
            <TrendingUpIcon sx={{ fontSize: isMobile ? 12 : 14, color: "#10b981" }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: isMobile ? 12 : 14, color: "#ef4444" }} />
          )}
          <Typography
            variant="caption"
            fontWeight={700}
            color={trendUp ? "#10b981" : "#ef4444"}
            fontSize={isMobile ? 9 : 11}
          >
            {trend}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          fontWeight={500} 
          fontSize={isMobile ? 9 : 10}
        >
          {title}
        </Typography>
        <Typography 
          variant="h5" 
          fontWeight={800} 
          fontSize={isMobile ? 20 : 26} 
          lineHeight={1.1} 
          mt={0.3}
        >
          {value}
        </Typography>
        <Typography 
          variant="caption" 
          color="text.disabled" 
          fontSize={isMobile ? 8 : 10} 
          mt={0.5} 
          display="block"
        >
          {subtitle}
        </Typography>
      </Box>
    </Paper>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1, fontSize: 11 }}>
        <Typography fontSize={10} color="text.secondary">{label}</Typography>
        <Typography fontSize={12} fontWeight={700} color="#084c61">
          {payload[0].value} submissions
        </Typography>
      </Paper>
    );
  }
  return null;
};

export default function FormAnalyticsDashboard() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleBackClick = () => {
    navigate("/admin/assigned-checklists");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: "#f9fafb", 
        minHeight: "100vh", 
        p: isMobile ? 1 : isMd ? 2 : 4,
        overflowX: "hidden",
      }}>

        {/* Header */}
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          gap={isMobile ? 2 : 1.5}
          mb={isMobile ? 2 : 3}
        >
          <Box sx={{ width: isMobile ? "100%" : "auto" }}>
            <Button
              startIcon={<ArrowBackIcon sx={{ fontSize: isMobile ? 16 : 14 }} />}
              size="small"
              onClick={handleBackClick}
              sx={{
                color: "text.secondary",
                fontSize: isMobile ? 13 : 11,
                p: isMobile ? 0.5 : 0,
                mb: 0.5,
                minWidth: 0,
                "&:hover": { bgcolor: "transparent", color: "text.primary" },
              }}
            >
              Back to Assigned Checklists
            </Button>
            <Typography 
              variant="h6" 
              fontWeight={800} 
              fontSize={isMobile ? 18 : 20} 
              lineHeight={1.2}
            >
              Form Analytics
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              fontSize={isMobile ? 12 : 11}
            >
              Safety Inspection Q2 2024
            </Typography>
          </Box>
          <Box 
            display="flex" 
            gap={1} 
            flexWrap="wrap"
            sx={{ width: isMobile ? "100%" : "auto" }}
          >
            <Button
              startIcon={<CalendarTodayIcon sx={{ fontSize: isMobile ? 16 : 13 }} />}
              variant="outlined"
              size="small"
              fullWidth={isMobile}
              sx={{
                color: "text.secondary",
                borderColor: "#d1d5db",
                fontSize: isMobile ? 12 : 11,
                borderRadius: 2,
                py: isMobile ? 1 : 0.6,
                px: isMobile ? 2 : 1.5,
                bgcolor: "white",
                flex: isMobile ? 1 : "0 1 auto",
                "&:hover": { borderColor: "#9ca3af", bgcolor: "#f9fafb" },
              }}
            >
              Last 30 Days
            </Button>
            <Button
              startIcon={<DownloadIcon sx={{ fontSize: isMobile ? 16 : 13 }} />}
              variant="contained"
              size="small"
              fullWidth={isMobile}
              sx={{
                bgcolor: "#084c61",
                fontSize: isMobile ? 12 : 11,
                borderRadius: 2,
                py: isMobile ? 1 : 0.6,
                px: isMobile ? 2 : 1.5,
                flex: isMobile ? 1 : "0 1 auto",
                "&:hover": { bgcolor: "#063b4b" },
              }}
            >
              Export Report
            </Button>
          </Box>
        </Box>

        {/* Metric Cards */}
        <Grid container spacing={isMobile ? 1 : 2} mb={isMobile ? 2 : 3}>
          <Grid item xs={6} sm={6} md={3}>
            <MetricCard
              icon={<PeopleIcon sx={{ fontSize: isMobile ? 20 : 22 }} />}
              iconBg="rgba(8,76,97,0.1)"
              iconColor="#084c61"
              trend="12%"
              trendUp={true}
              title="Total Responses"
              value="12"
              subtitle="+2 from last week"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MetricCard
              icon={<CheckCircleOutlineIcon sx={{ fontSize: isMobile ? 20 : 22 }} />}
              iconBg="#d1fae5"
              iconColor="#059669"
              trend="8%"
              trendUp={true}
              title="Completion Rate"
              value="60%"
              subtitle="12 of 20 completed"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MetricCard
              icon={<AccessTimeIcon sx={{ fontSize: isMobile ? 20 : 22 }} />}
              iconBg="#ffedd5"
              iconColor="#ea580c"
              trend="5%"
              trendUp={false}
              title="Avg. Time"
              value="8.5m"
              subtitle="-0.5m from last week"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MetricCard
              icon={<BarChartIcon sx={{ fontSize: isMobile ? 20 : 22 }} />}
              iconBg="#ede9fe"
              iconColor="#7c3aed"
              trend="15%"
              trendUp={true}
              title="Approval Rate"
              value="92%"
              subtitle="11 of 12 approved"
            />
          </Grid>
        </Grid>

        {/* Charts Row */}
        <Grid container spacing={isMobile ? 1 : 2} mb={isMobile ? 2 : 3}>
          {/* Submission Trend */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: isMobile ? 1.5 : 2.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight={700} fontSize={isMobile ? 12 : 13}>
                  Submission Trend
                </Typography>
                <Chip
                  label="Last 30 Days"
                  size="small"
                  sx={{ 
                    fontSize: isMobile ? 8 : 9, 
                    height: isMobile ? 18 : 20, 
                    bgcolor: "#f3f4f6", 
                    fontWeight: 700 
                  }}
                />
              </Box>
              <Box height={isMobile ? 160 : 220}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={submissionData} 
                    margin={{ top: 4, right: 8, left: isMobile ? -20 : -28, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: isMobile ? 8 : 9, fill: "#9ca3af" }}
                      tickLine={false}
                      axisLine={false}
                      interval={isMobile ? 2 : 1}
                    />
                    <YAxis
                      tick={{ fontSize: isMobile ? 8 : 9, fill: "#9ca3af" }}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="submissions"
                      stroke="#084c61"
                      strokeWidth={2}
                      dot={{ r: isMobile ? 2 : 3, fill: "#084c61", strokeWidth: 0 }}
                      activeDot={{ r: isMobile ? 4 : 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Status Distribution */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: isMobile ? 1.5 : 2.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight={700} fontSize={isMobile ? 12 : 13}>
                  Status Distribution
                </Typography>
                <Chip
                  label="12 Total"
                  size="small"
                  sx={{ 
                    fontSize: isMobile ? 8 : 9, 
                    height: isMobile ? 18 : 20, 
                    bgcolor: "#f3f4f6", 
                    fontWeight: 700 
                  }}
                />
              </Box>
              <Box height={isMobile ? 200 : 220}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="45%"
                      innerRadius={isMobile ? 35 : 55}
                      outerRadius={isMobile ? 60 : 80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      iconType="circle"
                      iconSize={isMobile ? 6 : 8}
                      layout={isMobile ? "horizontal" : "vertical"}
                      verticalAlign={isMobile ? "bottom" : "middle"}
                      align={isMobile ? "center" : "right"}
                      formatter={(value, entry) => (
                        <span style={{ fontSize: isMobile ? 9 : 10, color: "#374151" }}>
                          {value}: {entry.payload.value}%
                        </span>
                      )}
                      wrapperStyle={{ 
                        paddingTop: isMobile ? 12 : 8,
                        paddingLeft: isMobile ? 0 : 10,
                      }}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, ""]}
                      contentStyle={{ fontSize: 11, borderRadius: 8 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Detailed Statistics + Top Performers */}
        <Paper sx={{ p: isMobile ? 1.5 : 3 }}>
          {/* Detailed Stats */}
          <Typography fontWeight={700} fontSize={isMobile ? 12 : 13} mb={2}>
            Detailed Statistics
          </Typography>
          <Grid container spacing={isMobile ? 1 : 2} mb={3.5}>
            {/* Response Quality */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: isMobile ? 1.5 : 2,
                  bgcolor: "#eff6ff",
                  border: "1px solid #dbeafe",
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <Box display="flex" alignItems="center" gap={0.8} mb={1.5}>
                  <VerifiedIcon sx={{ fontSize: isMobile ? 14 : 16, color: "#2563eb" }} />
                  <Typography fontSize={isMobile ? 10 : 11} fontWeight={700} color="text.primary">
                    Response Quality
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={0.8}>
                  <Typography fontSize={isMobile ? 9 : 10} color="text.secondary">
                    Complete Responses
                  </Typography>
                  <Typography fontSize={isMobile ? 10 : 11} fontWeight={800}>
                    92%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={92}
                  sx={{
                    height: isMobile ? 5 : 6,
                    borderRadius: 3,
                    bgcolor: "#bfdbfe",
                    "& .MuiLinearProgress-bar": { bgcolor: "#084c61", borderRadius: 3 },
                  }}
                />
              </Box>
            </Grid>

            {/* Timeliness */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: isMobile ? 1.5 : 2,
                  bgcolor: "#eff6ff",
                  border: "1px solid #dbeafe",
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <Box display="flex" alignItems="center" gap={0.8} mb={1.5}>
                  <AccessTimeIcon sx={{ fontSize: isMobile ? 14 : 16, color: "#2563eb" }} />
                  <Typography fontSize={isMobile ? 10 : 11} fontWeight={700} color="text.primary">
                    Timeliness
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={0.8}>
                  <Typography fontSize={isMobile ? 9 : 10} color="text.secondary">
                    On-time Submissions
                  </Typography>
                  <Typography fontSize={isMobile ? 10 : 11} fontWeight={800}>
                    75%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  sx={{
                    height: isMobile ? 5 : 6,
                    borderRadius: 3,
                    bgcolor: "#bfdbfe",
                    "& .MuiLinearProgress-bar": { bgcolor: "#084c61", borderRadius: 3 },
                  }}
                />
              </Box>
            </Grid>

            {/* Issues Reported */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: isMobile ? 1.5 : 2,
                  bgcolor: "#eff6ff",
                  border: "1px solid #dbeafe",
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <Box display="flex" alignItems="center" gap={0.8} mb={1.5}>
                  <WarningAmberIcon sx={{ fontSize: isMobile ? 14 : 16, color: "#2563eb" }} />
                  <Typography fontSize={isMobile ? 10 : 11} fontWeight={700} color="text.primary">
                    Issues Reported
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography fontSize={isMobile ? 9 : 10} color="text.secondary">
                    Critical Issues
                  </Typography>
                  <Chip
                    label="2"
                    size="small"
                    sx={{ 
                      fontSize: isMobile ? 9 : 10, 
                      height: isMobile ? 16 : 18, 
                      bgcolor: "#fee2e2", 
                      color: "#dc2626", 
                      fontWeight: 700 
                    }}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography fontSize={isMobile ? 9 : 10} color="text.secondary">
                    Minor Issues
                  </Typography>
                  <Chip
                    label="5"
                    size="small"
                    sx={{ 
                      fontSize: isMobile ? 9 : 10, 
                      height: isMobile ? 16 : 18, 
                      bgcolor: "#ffedd5", 
                      color: "#ea580c", 
                      fontWeight: 700 
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Top Performers */}
          <Typography fontWeight={700} fontSize={isMobile ? 12 : 13} mb={1.5}>
            Top Performers
          </Typography>
          <Box display="flex" flexDirection="column" gap={1.2}>
            {performers.map((p) => (
              <Box
                key={p.rank}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  p: isMobile ? 1.5 : 2,
                  bgcolor: "#f9fafb",
                  borderRadius: 3,
                  transition: "background 0.15s",
                  "&:hover": { bgcolor: "#f3f4f6" },
                }}
              >
                <Box display="flex" alignItems="center" gap={isMobile ? 1 : 1.5}>
                  <Avatar
                    sx={{
                      width: isMobile ? 28 : 36,
                      height: isMobile ? 28 : 36,
                      bgcolor: "#084c61",
                      fontSize: isMobile ? 10 : 12,
                      fontWeight: 800,
                    }}
                  >
                    {p.rank}
                  </Avatar>
                  <Box>
                    <Typography fontSize={isMobile ? 11 : 12} fontWeight={700} lineHeight={1.2}>
                      {p.name}
                    </Typography>
                    <Typography fontSize={isMobile ? 9 : 10} color="text.disabled">
                      {p.submissions} submissions
                    </Typography>
                  </Box>
                </Box>
                <Box textAlign="right" minWidth={isMobile ? 80 : 110}>
                  <Typography fontSize={isMobile ? 9 : 10} fontWeight={600} color="text.secondary" mb={0.6}>
                    Score: {p.score}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={p.score}
                    sx={{
                      height: isMobile ? 4 : 5,
                      borderRadius: 3,
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": { bgcolor: "#084c61", borderRadius: 3 },
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
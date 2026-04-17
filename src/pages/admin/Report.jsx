import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
  alpha,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  TablePagination,
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Visibility, ChatBubbleOutline } from "@mui/icons-material";

// ---------- Styled Components ----------
const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Manrope", sans-serif',
  fontWeight: 700,
  color: "#0f172a",
  letterSpacing: "-0.01em",
  fontSize: "1.25rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
  },
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  color: "#64748b",
  fontSize: "0.7rem",
  marginTop: theme.spacing(0.5),
}));

const ExportButton = styled(Button)(({ theme, variant }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.65rem",
  fontWeight: 600,
  padding: "4px 10px",
  borderRadius: "6px",
  textTransform: "none",
  minWidth: "auto",
  ...(variant === "outlined" && {
    borderColor: "#e2e8f0",
    color: "#334155",
    "&:hover": {
      borderColor: "#003f5c",
      backgroundColor: alpha("#003f5c", 0.02),
    },
  }),
  ...(variant === "contained" && {
    backgroundColor: "#003f5c",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#002b42",
    },
  }),
}));

const NavButton = styled(ToggleButton)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.65rem",
  fontWeight: 500,
  padding: "4px 12px",
  textTransform: "none",
  border: "none",
  borderRadius: "6px !important",
  color: "#475569",
  "&.Mui-selected": {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  "&:hover": {
    backgroundColor: alpha("#f1f5f9", 0.7),
  },
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: theme.spacing(2),
  borderRadius: "10px",
  boxShadow: "0px 8px 20px rgba(0,30,46,0.04)",
  height: 140,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  border: "1px solid #edf2f7",
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.6rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  color: "#64748b",
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontFamily: '"Manrope", sans-serif',
  fontWeight: 800,
  fontSize: "1.5rem",
  color: "#00283d",
  lineHeight: 1.2,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
  },
}));

const TrendText = styled(Typography)(({ theme, color = "#10b981" }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.55rem",
  fontWeight: 600,
  color: color,
  display: "flex",
  alignItems: "center",
  gap: "2px",
  marginTop: theme.spacing(0.5),
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Manrope", sans-serif',
  fontWeight: 700,
  fontSize: "0.9rem",
  color: "#00283d",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const ChartSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.6rem",
  color: "#64748b",
}));

const ChartCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  padding: theme.spacing(2.5),
  boxShadow: "0px 8px 20px rgba(0,30,46,0.04)",
  border: "1px solid #edf2f7",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const LegendDot = styled(Box)(({ color }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: color,
  marginRight: "4px",
}));

const LegendText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.55rem",
  fontWeight: 600,
}));

const MonthLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.55rem",
  fontWeight: 500,
  color: "#64748b",
  marginTop: theme.spacing(0.5),
}));

const CategoryItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.75),
}));

const CategoryName = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.55rem",
  fontWeight: 500,
  color: "#334155",
}));

const DayLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.55rem",
  fontWeight: 500,
  color: "#64748b",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontWeight: 500,
  color: "#64748b",
  fontSize: "0.6rem",
  padding: theme.spacing(1, 1.5),
  borderBottom: `1px solid ${alpha("#e2e8f0", 0.8)}`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: alpha("#f8fafc", 0.8),
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
  const getStatusColors = () => {
    switch (status) {
      case "approved":
        return {
          bg: alpha("#10b981", 0.1),
          color: "#047857",
          borderColor: alpha("#10b981", 0.2),
        };
      case "pending":
        return {
          bg: alpha("#f59e0b", 0.1),
          color: "#b45309",
          borderColor: alpha("#f59e0b", 0.2),
        };
      case "reviewed":
        return {
          bg: alpha("#3b82f6", 0.1),
          color: "#1e40af",
          borderColor: alpha("#3b82f6", 0.2),
        };
      case "correction":
        return {
          bg: alpha("#ef4444", 0.1),
          color: "#b91c1c",
          borderColor: alpha("#ef4444", 0.2),
        };
      default:
        return {
          bg: alpha("#94a3b8", 0.1),
          color: "#475569",
          borderColor: alpha("#94a3b8", 0.2),
        };
    }
  };
  const colors = getStatusColors();
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    borderColor: colors.borderColor,
    fontWeight: 600,
    fontSize: "0.55rem",
    height: 20,
    "& .MuiChip-label": {
      px: 0.75,
    },
  };
});

const IssueBadge = styled(Chip)(({ theme, issuetype }) => ({
  backgroundColor:
    issuetype === "red" ? alpha("#ef4444", 0.1) : alpha("#10b981", 0.1),
  color: issuetype === "red" ? "#b91c1c" : "#047857",
  fontWeight: 600,
  fontSize: "0.5rem",
  height: 18,
  "& .MuiChip-label": {
    px: 0.75,
  },
}));

// ---------- Mock Data ----------
const metrics = [
  {
    label: "Completion Rate",
    value: "94.2%",
    trend: "+3.5% from last month",
    trendIcon: "arrow_upward",
    trendColor: "#10b981",
  },
  {
    label: "Avg Time/Inspection",
    value: "24 min",
    trend: "5 min faster",
    trendIcon: "arrow_downward",
    trendColor: "#10b981",
  },
  {
    label: "Issues Found",
    value: "18",
    trend: "This month",
    trendIcon: "",
    trendColor: "#64748b",
  },
  {
    label: "Forms Submitted",
    value: "206",
    trend: "+15% increase",
    trendIcon: "arrow_upward",
    trendColor: "#10b981",
  },
];

const monthlyData = [
  { month: "Jun", completed: 65, pending: 35 },
  { month: "Jul", completed: 70, pending: 30 },
  { month: "Aug", completed: 55, pending: 45 },
  { month: "Sep", completed: 80, pending: 20 },
  { month: "Oct", completed: 60, pending: 40 },
  { month: "Nov", completed: 75, pending: 25 },
];

const assetCategories = [
  { name: "Electrical", color: "#003f5c" },
  { name: "HVAC", color: "#3b82f6" },
  { name: "Machinery", color: "#0f172a" },
  { name: "Plumbing", color: "#0284c7" },
  { name: "Safety", color: "#0369a1" },
  { name: "Others", color: "#94a3b8" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mockReports = [
  {
    id: "1",
    formName: "Safety Inspection",
    assetName: "Forklift X-200",
    submittedBy: "Mike Johnson",
    submittedByInitials: "MJ",
    dateTime: "2024-11-03 14:30",
    score: 95,
    scoreStatus: "green",
    issues: 1,
    status: "pending",
    avatarColor: "#1e88e5",
  },
  {
    id: "2",
    formName: "Equipment Check",
    assetName: "Conveyor Belt A-12",
    submittedBy: "Sarah Williams",
    submittedByInitials: "SW",
    dateTime: "2024-11-02 10:15",
    score: 88,
    scoreStatus: "yellow",
    issues: 2,
    status: "reviewed",
    avatarColor: "#00acc1",
  },
  {
    id: "3",
    formName: "Daily Checklist",
    assetName: "Generator Unit B-04",
    submittedBy: "Tom Anderson",
    submittedByInitials: "TA",
    dateTime: "2024-11-02 09:00",
    score: 100,
    scoreStatus: "green",
    issues: 0,
    status: "approved",
    avatarColor: "#5e35b1",
  },
  {
    id: "4",
    formName: "Monthly Audit",
    assetName: "HVAC System C-21",
    submittedBy: "Lisa Brown",
    submittedByInitials: "LB",
    dateTime: "2024-11-01 16:45",
    score: 72,
    scoreStatus: "yellow",
    issues: 4,
    status: "correction",
    avatarColor: "#2e7d32",
  },
];

// ---------- Main Component ----------
function Reports() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState("analytics");
  const [memberFilter, setMemberFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleNavChange = (event, newValue) => {
    if (newValue !== null) setNavValue(newValue);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredReports = mockReports;
  const paginatedReports = filteredReports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Container
        maxWidth="xl"
        sx={{ py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}
      >
        {/* Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mb: 2.5 }}
        >
          <Box>
            <HeaderTitle variant="h5">Reports & Analytics</HeaderTitle>
            <HeaderSubtitle>
              Insights into your inspection activities and submitted reports
            </HeaderSubtitle>
          </Box>
          <Stack direction="row" spacing={1}>
            <ExportButton variant="outlined">Export PDF</ExportButton>
            <ExportButton variant="contained">Export CSV</ExportButton>
          </Stack>
        </Stack>

        {/* Navigation Tabs */}
        <Box sx={{ mb: 3 }}>
          <Paper
            elevation={0}
            sx={{
              display: "inline-flex",
              bgcolor: "#f1f5f9",
              p: 0.5,
              borderRadius: "8px",
            }}
          >
            <ToggleButtonGroup
              value={navValue}
              exclusive
              onChange={handleNavChange}
              sx={{
                "& .MuiToggleButtonGroup-grouped": {
                  border: "none",
                  borderRadius: "6px !important",
                },
              }}
            >
              <NavButton value="analytics">Analytics</NavButton>
              <NavButton value="reports">Submitted Reports</NavButton>
            </ToggleButtonGroup>
          </Paper>
        </Box>

        {/* Analytics Content */}
        {navValue === "analytics" && (
          <Box>
            {/* KPI Grid */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {metrics.map((metric, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <MetricCard>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <MetricLabel>{metric.label}</MetricLabel>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "1.1rem", color: "#94a3b8" }}
                      >
                        {metric.icon}
                      </span>
                    </Box>
                    <Box>
                      <MetricValue>{metric.value}</MetricValue>
                      <TrendText color={metric.trendColor}>
                        {metric.trendIcon && (
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "0.6rem" }}
                          >
                            {metric.trendIcon}
                          </span>
                        )}
                        {metric.trend}
                      </TrendText>
                    </Box>
                  </MetricCard>
                </Grid>
              ))}
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {/* Monthly Inspection Summary */}
              <Grid item xs={12} lg={8}>
                <ChartCard>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Box>
                      <ChartTitle>Monthly Inspection Summary</ChartTitle>
                      <ChartSubtitle>
                        Comparative analysis of status
                      </ChartSubtitle>
                    </Box>
                    <Stack direction="row" spacing={2}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <LegendDot color="#003f5c" />
                        <LegendText>Completed</LegendText>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <LegendDot color="#f59e0b" />
                        <LegendText>Pending</LegendText>
                      </Stack>
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      height: { xs: 160, md: 200 },
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      px: { xs: 0, sm: 1 },
                    }}
                  >
                    {monthlyData.map((item, idx) => {
                      const totalHeight = 120;
                      const completedHeight =
                        (item.completed / 100) * totalHeight;
                      const pendingHeight = (item.pending / 100) * totalHeight;
                      return (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              height: totalHeight,
                              width: { xs: 20, sm: 32 },
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              gap: 0.3,
                            }}
                          >
                            <Box
                              sx={{
                                height: pendingHeight,
                                width: "100%",
                                bgcolor: "#f59e0b",
                                borderRadius: "2px 2px 0 0",
                              }}
                            />
                            <Box
                              sx={{
                                height: completedHeight,
                                width: "100%",
                                bgcolor: "#003f5c",
                                borderRadius: "2px 2px 0 0",
                              }}
                            />
                          </Box>
                          <MonthLabel>{item.month}</MonthLabel>
                        </Box>
                      );
                    })}
                  </Box>
                </ChartCard>
              </Grid>

              {/* Assets by Category */}
              <Grid item xs={12} lg={4}>
                <ChartCard>
                  <ChartTitle sx={{ mb: 0.25 }}>Assets by Category</ChartTitle>
                  <ChartSubtitle sx={{ mb: 2 }}>
                    Asset distribution profile
                  </ChartSubtitle>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: { xs: 120, md: 140 },
                        height: { xs: 120, md: 140 },
                      }}
                    >
                      <svg
                        viewBox="0 0 36 36"
                        style={{
                          width: "100%",
                          height: "100%",
                          transform: "rotate(-90deg)",
                        }}
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9155"
                          fill="none"
                          stroke="#003f5c"
                          strokeWidth="4"
                          strokeDasharray="35 100"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9155"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="4"
                          strokeDasharray="25 100"
                          strokeDashoffset="-35"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9155"
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="4"
                          strokeDasharray="20 100"
                          strokeDashoffset="-60"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9155"
                          fill="none"
                          stroke="#0284c7"
                          strokeWidth="4"
                          strokeDasharray="15 100"
                          strokeDashoffset="-80"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9155"
                          fill="none"
                          stroke="#94a3b8"
                          strokeWidth="4"
                          strokeDasharray="5 100"
                          strokeDashoffset="-95"
                        />
                      </svg>
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"Manrope", sans-serif',
                            fontWeight: 800,
                            fontSize: "1rem",
                            color: "#003f5c",
                          }}
                        >
                          248
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: "0.45rem",
                            fontWeight: 600,
                            color: "#64748b",
                            letterSpacing: "0.03em",
                          }}
                        >
                          TOTAL
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Grid container spacing={0.5}>
                    {assetCategories.map((cat) => (
                      <Grid item xs={6} key={cat.name}>
                        <CategoryItem>
                          <LegendDot color={cat.color} />
                          <CategoryName>{cat.name}</CategoryName>
                        </CategoryItem>
                      </Grid>
                    ))}
                  </Grid>
                </ChartCard>
              </Grid>
            </Grid>

            {/* Weekly Trend */}
            <ChartCard>
              <Box sx={{ mb: 2 }}>
                <ChartTitle>Weekly Completion Rate Trend</ChartTitle>
                <ChartSubtitle>Performance tracking across zones</ChartSubtitle>
              </Box>

              <Box sx={{ height: { xs: 160, md: 200 }, position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {[100, 80, 60, 40, 20, 0].map((val) => (
                    <Box
                      key={val}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "0.5rem",
                          color: "#94a3b8",
                          width: 25,
                        }}
                      >
                        {val}%
                      </Typography>
                      <Divider
                        sx={{
                          flex: 1,
                          borderColor: alpha("#cbd5e1", 0.3),
                          borderStyle: "dashed",
                        }}
                      />
                    </Box>
                  ))}
                </Box>
                <svg
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "calc(100% - 16px)",
                    padding: "0 8px",
                  }}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#003f5c" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#003f5c" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 20,130 Q 90,100 160,120 T 300,90 T 440,110 T 580,70 T 720,90"
                    fill="none"
                    stroke="#003f5c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="300"
                    cy="90"
                    r="4"
                    fill="#003f5c"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="580"
                    cy="70"
                    r="4"
                    fill="#003f5c"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -16,
                    left: 32,
                    right: 16,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {days.map((day) => (
                    <DayLabel key={day}>{day}</DayLabel>
                  ))}
                </Box>
              </Box>
            </ChartCard>
          </Box>
        )}

        {/* Reports Content */}
        {navValue === "reports" && (
          <Box>
            {/* Filters */}
            <Paper
              elevation={0}
              sx={{ p: 2, borderRadius: 2, border: "1px solid #edf2f7", mb: 3 }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <FormControl
                  size="small"
                  sx={{ minWidth: { xs: "100%", sm: 180 } }}
                >
                  <InputLabel sx={{ fontSize: "0.7rem" }}>
                    All Member
                  </InputLabel>
                  <Select
                    value={memberFilter}
                    label="All Member"
                    onChange={(e) => setMemberFilter(e.target.value)}
                    sx={{ fontSize: "0.7rem", borderRadius: 1.5 }}
                  >
                    <MenuItem value="all">All Member</MenuItem>
                    <MenuItem value="mike">Mike Johnson</MenuItem>
                    <MenuItem value="sarah">Sarah Williams</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  size="small"
                  sx={{ minWidth: { xs: "100%", sm: 180 } }}
                >
                  <InputLabel sx={{ fontSize: "0.7rem" }}>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ fontSize: "0.7rem", borderRadius: 1.5 }}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="correction">Needs Correction</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  size="small"
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true, sx: { fontSize: "0.7rem" } }}
                  sx={{
                    minWidth: { xs: "100%", sm: 180 },
                    "& input": { fontSize: "0.7rem" },
                  }}
                />
              </Stack>
            </Paper>

            {/* Table */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px solid #edf2f7",
                overflow: "hidden",
              }}
            >
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Form / Asset</StyledTableCell>
                      <StyledTableCell>Submitted By</StyledTableCell>
                      <StyledTableCell>Date & Time</StyledTableCell>
                      <StyledTableCell>Score</StyledTableCell>
                      <StyledTableCell>Issues</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedReports.map((report) => (
                      <StyledTableRow key={report.id}>
                        <TableCell sx={{ py: 1.5 }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              color: "#0f172a",
                            }}
                          >
                            {report.formName}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.55rem", color: "#64748b" }}
                          >
                            {report.assetName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                bgcolor: report.avatarColor,
                                fontSize: "0.6rem",
                                fontWeight: 600,
                              }}
                            >
                              {report.submittedByInitials}
                            </Avatar>
                            <Typography sx={{ fontSize: "0.65rem" }}>
                              {report.submittedBy}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontSize: "0.65rem" }}>
                            {report.dateTime}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor:
                                  report.scoreStatus === "green"
                                    ? "#10b981"
                                    : "#f59e0b",
                              }}
                            />
                            <Typography
                              sx={{ fontWeight: 600, fontSize: "0.65rem" }}
                            >
                              {report.score}%
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <IssueBadge
                            issuetype={report.issues === 0 ? "green" : "red"}
                            label={
                              report.issues === 0
                                ? "No Issues"
                                : `${report.issues} Issue${report.issues > 1 ? "s" : ""}`
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <StatusChip
                            status={report.status}
                            label={
                              report.status === "pending"
                                ? "Pending Review"
                                : report.status === "reviewed"
                                  ? "Reviewed"
                                  : report.status === "approved"
                                    ? "Approved"
                                    : "Needs Correction"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Stack
                            direction="row"
                            spacing={0.5}
                            justifyContent="flex-end"
                          >
                            <Tooltip title="View">
                              <IconButton
                                onClick={() =>
                                  navigate("/admin/report-details")
                                }
                                size="small"
                                sx={{ color: "#64748b" }}
                              >
                                <Visibility sx={{ fontSize: "0.9rem" }} />
                        
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title={
                                report.status === "pending"
                                  ? "Give Feedback"
                                  : "View Feedback"
                              }
                            >
                              <IconButton
                                size="small"
                                sx={{ color: "#64748b" }}
                              >
                                <ChatBubbleOutline
                                  sx={{ fontSize: "0.9rem" }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredReports.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  borderTop: "1px solid #edf2f7",
                  "& .MuiTablePagination-toolbar": { minHeight: 48 },
                  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                    { fontSize: "0.65rem" },
                }}
              />
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Reports;

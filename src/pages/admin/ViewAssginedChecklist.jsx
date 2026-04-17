import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Avatar,
  Chip,
  Button,
  useMediaQuery,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Badge,
  alpha,
  Container,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const theme = createTheme({
  palette: {
    primary: { main: "#0f172a" },
    secondary: { main: "#004361" },
    background: { default: "#f8fafc", paper: "#ffffff" },
    status: {
      inProgress: "#e0f2fe",
      approved: "#dcfce7",
      pending: "#fef9c3",
    },
    text: {
      inProgress: "#0369a1",
      approved: "#15803d",
      pending: "#854d0e",
    },
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h4: { fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" },
    h6: { fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.01em" },
    subtitle1: { fontSize: "0.9rem", fontWeight: 600 },
    subtitle2: { fontSize: "0.8rem", fontWeight: 600 },
    body1: { fontSize: "0.85rem" },
    body2: { fontSize: "0.8rem" },
    caption: { fontSize: "0.7rem", fontWeight: 500 },
    overline: { fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em" },
  },
  shape: { borderRadius: 12 },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px 0 rgba(0,0,0,0.03)",
          border: "1px solid #e9eef2",
        },
        elevation1: { boxShadow: "0 4px 12px rgba(0,0,0,0.03)" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.75rem",
          fontWeight: 600,
          borderRadius: 10,
          padding: "6px 14px",
        },
        contained: { boxShadow: "none", "&:hover": { boxShadow: "none" } },
        outlined: {
          borderColor: "#e2e8f0",
          "&:hover": { borderColor: "#94a3b8" },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          padding: "14px 16px",
          borderBottom: "1px solid #edf2f7",
        },
        head: {
          fontSize: "0.7rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          color: "#475569",
          backgroundColor: "#fafcff",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600 },
        sizeSmall: { height: 22, fontSize: "0.65rem" },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.8rem",
          fontWeight: 600,
          minHeight: 42,
          color: "#64748b",
          "&.Mui-selected": { color: "#0f172a", fontWeight: 700 },
        },
      },
    },
  },
});

// Mock Data
const recentSubmissions = [
  {
    id: 1,
    name: "John Smith",
    date: "2024-06-15 10:30 AM",
    status: "approved",
    completion: 100,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    date: "2024-06-14 02:15 PM",
    status: "pending",
    completion: 95,
  },
  {
    id: 3,
    name: "Michael Chen",
    date: "2024-06-13 11:00 AM",
    status: "approved",
    completion: 100,
  },
  {
    id: 4,
    name: "Emily Wilson",
    date: "2024-06-12 09:45 AM",
    status: "inProgress",
    completion: 78,
  },
  {
    id: 5,
    name: "David Rodriguez",
    date: "2024-06-11 03:30 PM",
    status: "approved",
    completion: 100,
  },
];

const formFields = [
  { id: 1, name: "Inspector Name", type: "Text", required: true },
  { id: 2, name: "Facility Location", type: "Text", required: true },
  { id: 3, name: "Inspection Date", type: "Date", required: true },
  { id: 4, name: "Fire Safety Equipment", type: "Checkbox", required: true },
  { id: 5, name: "Emergency Exits Clear", type: "Radio", required: true },
  { id: 6, name: "Electrical Safety", type: "Checkbox", required: false },
  { id: 7, name: "General Hazards", type: "Text", required: false },
  { id: 8, name: "PPE Compliance", type: "Radio", required: false },
];

const assignees = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@acme.com`,
  completed: i < 13,
  department:
    i % 3 === 0 ? "Safety" : i % 3 === 1 ? "Operations" : "Maintenance",
}));

const MetricCard = ({ icon, bgColor, iconColor, label, value, trend }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={0}
      sx={{
        p: isMobile ? 2 : 2.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
        },
      }}
    >
      <Box
        sx={{
          width: isMobile ? 44 : 52,
          height: isMobile ? 44 : 52,
          bgcolor: alpha(iconColor, 0.1),
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            color: iconColor,
            fontSize: isMobile ? 18 : 22,
            display: "flex",
          }}
        >
          {icon}
        </Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ mb: 0.5, display: "block" }}
        >
          {label}
        </Typography>
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Typography
            variant="h5"
            fontWeight={800}
            fontSize={isMobile ? 16 : 20}
          >
            {value}
          </Typography>
          {trend && (
            <Chip
              label={trend}
              size="small"
              sx={{
                bgcolor: alpha("#10b981", 0.1),
                color: "#10b981",
                fontSize: "0.6rem",
                height: 18,
              }}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

const StatusChip = ({ status }) => {
  const config = {
    approved: {
      bg: "#dcfce7",
      color: "#166534",
      label: "Approved",
      icon: <CheckCircleIcon sx={{ fontSize: 12 }} />,
    },
    pending: {
      bg: "#fef9c3",
      color: "#854d0e",
      label: "Pending Review",
      icon: <ScheduleIcon sx={{ fontSize: 12 }} />,
    },
    inProgress: {
      bg: "#e0f2fe",
      color: "#075985",
      label: "In Progress",
      icon: <RefreshIcon sx={{ fontSize: 12 }} />,
    },
  };

  const { bg, color, label, icon } = config[status] || config.pending;

  return (
    <Chip
      icon={icon}
      label={label}
      size="small"
      sx={{
        bgcolor: bg,
        color: color,
        fontSize: "0.65rem",
        height: 24,
        fontWeight: 600,
        "& .MuiChip-icon": { ml: 0.5, color: "inherit" },
      }}
    />
  );
};

export default function FormManagementDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleBackClick = () => {
    navigate("/admin/assigned-checklists");
  };

  const completionRate = 60;
  const totalSubmissions = 12;
  const totalAssignees = 20;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: isMobile ? 2 : 3 }}
      >
        <Container maxWidth="xl" sx={{ px: isMobile ? 1.5 : 2 }}>
          {/* Header with Back Navigation */}
          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
              onClick={handleBackClick}
              sx={{
                color: "#475569",
                fontSize: "0.8rem",
                fontWeight: 600,
                p: 0.5,
                mb: 1.5,
                "&:hover": { bgcolor: "transparent", color: "#0f172a" },
              }}
            >
              Back to Assigned Checklists
            </Button>

            <Box
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              justifyContent="space-between"
              alignItems={isMobile ? "flex-start" : "center"}
              gap={2}
            >
              <Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Safety Inspection Q2 2024
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1.5}
                  flexWrap="wrap"
                >
                  <Chip
                    label="In Progress"
                    size="small"
                    sx={{
                      bgcolor: alpha("#0369a1", 0.1),
                      color: "#0369a1",
                      fontSize: "0.65rem",
                      height: 22,
                      fontWeight: 700,
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <ScheduleIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
                    Due in 15 days
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <PeopleIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
                    {totalAssignees} assignees
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" gap={1} flexWrap="wrap">
                <Button
                  onClick={() =>
                    navigate("/admin/assigned-checklists-analytics")
                  }
                  variant="contained"
                  startIcon={<AssessmentIcon sx={{ fontSize: 16 }} />}
                  size="small"
                  sx={{ bgcolor: "#004361", "&:hover": { bgcolor: "#003553" } }}
                >
                  View Analytics
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                  size="small"
                  sx={{ bgcolor: "white" }}
                >
                  Edit Form
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Metric Cards Grid */}
          <Grid container spacing={isMobile ? 1.5 : 2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={6} md={3}>
              <MetricCard
                icon={<DescriptionIcon />}
                iconColor="#004361"
                label="Total Submissions"
                value={totalSubmissions}
                trend="+2"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <MetricCard
                icon={<PeopleIcon />}
                iconColor="#7e22ce"
                label="Total Assignees"
                value={totalAssignees}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <MetricCard
                icon={<CheckCircleIcon />}
                iconColor="#16a34a"
                label="Completion Rate"
                value={`${completionRate}%`}
                trend="+8%"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <MetricCard
                icon={<ScheduleIcon />}
                iconColor="#ea580c"
                label="Days Remaining"
                value="15"
              />
            </Grid>
          </Grid>

          {/* Progress Overview Card */}
          <Paper elevation={0} sx={{ p: isMobile ? 2 : 2.5, mb: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1.5}
            >
              <Typography
                variant="subtitle1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <ChecklistIcon sx={{ fontSize: 18, color: "#004361" }} />
                Overall Progress
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
              >
                {totalSubmissions} of {totalAssignees} completed
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={completionRate}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: alpha("#004361", 0.1),
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#004361",
                  borderRadius: 4,
                },
              }}
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="caption" color="text.secondary">
                0%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                100%
              </Typography>
            </Box>
          </Paper>

          {/* Tabs Navigation */}
          <Paper elevation={0} sx={{ mb: 3, overflow: "hidden" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant={isSm ? "fullWidth" : "standard"}
              sx={{
                borderBottom: "1px solid #e9eef2",
                bgcolor: "white",
                "& .MuiTabs-indicator": { bgcolor: "#0f172a", height: 2.5 },
              }}
            >
              <Tab label="Submissions" iconPosition="end" />
              <Tab label="Form Structure" iconPosition="end" />
              <Tab label="Assignees" iconPosition="end" />
            </Tabs>
          </Paper>

          {/* Tab Content */}
          <Paper elevation={0} sx={{ overflow: "hidden" }}>
            {/* Submissions Tab */}
            {activeTab === 0 && (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    p: isMobile ? 2 : 3,
                    borderBottom: "1px solid #e9eef2",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    Recent Submissions
                    <Chip
                      label="12 total"
                      size="small"
                      sx={{
                        fontSize: "0.6rem",
                        height: 18,
                        bgcolor: alpha("#004361", 0.1),
                        color: "#004361",
                      }}
                    />
                  </Typography>
                  <Box display="flex" gap={1}>
                    <IconButton
                      size="small"
                      sx={{ bgcolor: alpha("#004361", 0.05) }}
                    >
                      <SearchIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ bgcolor: alpha("#004361", 0.05) }}
                    >
                      <FilterListIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <Button
                      variant="outlined"
                      startIcon={<FileDownloadIcon sx={{ fontSize: 14 }} />}
                      size="small"
                      sx={{ bgcolor: "white" }}
                    >
                      Export
                    </Button>
                  </Box>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Submitted By</TableCell>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Completion</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentSubmissions.map((row) => (
                        <TableRow
                          key={row.id}
                          hover
                          sx={{
                            "&:hover": { bgcolor: alpha("#004361", 0.02) },
                          }}
                        >
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1.5}>
                              <Avatar
                                sx={{
                                  width: 28,
                                  height: 28,
                                  bgcolor: alpha("#004361", 0.8),
                                  fontSize: "0.65rem",
                                  fontWeight: 600,
                                }}
                              >
                                {row.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </Avatar>
                              <Typography fontWeight={600} fontSize="0.75rem">
                                {row.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <ScheduleIcon
                                sx={{ fontSize: 12, color: "#94a3b8" }}
                              />
                              <Typography variant="caption">
                                {row.date}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <StatusChip status={row.status} />
                          </TableCell>
                          <TableCell>
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1}
                              sx={{ minWidth: 100 }}
                            >
                              <Box sx={{ width: 60, position: "relative" }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={row.completion}
                                  sx={{
                                    height: 4,
                                    borderRadius: 2,
                                    bgcolor: "#e2e8f0",
                                    "& .MuiLinearProgress-bar": {
                                      bgcolor:
                                        row.completion === 100
                                          ? "#16a34a"
                                          : "#004361",
                                      borderRadius: 2,
                                    },
                                  }}
                                />
                              </Box>
                              <Typography variant="caption" fontWeight={600}>
                                {row.completion}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Box
                              display="flex"
                              justifyContent="flex-end"
                              gap={0.5}
                            >
                              <IconButton
                                onClick={() =>
                                  navigate("/admin/sumbit-assigned-details")
                                }
                                size="small"
                                sx={{ color: "#475569" }}
                              >
                                <VisibilityIcon sx={{ fontSize: 18 }} />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{ color: "#475569" }}
                              >
                                <FileDownloadIcon sx={{ fontSize: 18 }} />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{ color: "#475569" }}
                              >
                                <MoreVertIcon sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {/* Form Structure Tab */}
            {activeTab === 1 && (
              <Box sx={{ p: isMobile ? 2 : 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    Form Fields
                    <Chip
                      label="8 fields"
                      size="small"
                      sx={{
                        fontSize: "0.6rem",
                        height: 18,
                        bgcolor: alpha("#004361", 0.1),
                        color: "#004361",
                      }}
                    />
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                    sx={{ bgcolor: "#004361" }}
                  >
                    Add Field
                  </Button>
                </Box>

                <Box display="flex" flexDirection="column" gap={1.5}>
                  {formFields.map((field, index) => (
                    <Paper
                      key={field.id}
                      variant="outlined"
                      sx={{
                        p: isMobile ? 1.5 : 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: 2,
                        borderColor: "#e9eef2",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: "#004361",
                          boxShadow: "0 2px 8px rgba(0,67,97,0.08)",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: alpha("#004361", 0.05),
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "#004361",
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </Box>
                        <Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontWeight={600} fontSize="0.85rem">
                              {field.name}
                            </Typography>
                            {field.required && (
                              <Chip
                                label="Required"
                                size="small"
                                sx={{
                                  bgcolor: alpha("#ef4444", 0.1),
                                  color: "#ef4444",
                                  fontSize: "0.55rem",
                                  height: 18,
                                  fontWeight: 700,
                                }}
                              />
                            )}
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {field.type}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton size="small" sx={{ color: "#64748b" }}>
                        <EditIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {/* Assignees Tab */}
            {activeTab === 2 && (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    p: isMobile ? 2 : 3,
                    borderBottom: "1px solid #e9eef2",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    Assigned Users
                    <Chip
                      label="20 total"
                      size="small"
                      sx={{
                        fontSize: "0.6rem",
                        height: 18,
                        bgcolor: alpha("#004361", 0.1),
                        color: "#004361",
                      }}
                    />
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FilterListIcon sx={{ fontSize: 14 }} />}
                    >
                      Filter
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<PeopleIcon sx={{ fontSize: 14 }} />}
                      sx={{ bgcolor: "#004361" }}
                    >
                      Add Users
                    </Button>
                  </Box>
                </Box>

                <Box
                  display="grid"
                  gridTemplateColumns={{
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={isMobile ? 1.5 : 2}
                  sx={{ p: isMobile ? 2 : 3 }}
                >
                  {assignees.map((user) => (
                    <Paper
                      key={user.id}
                      variant="outlined"
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: 2,
                        borderColor: "#e9eef2",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: "#004361",
                          boxShadow: "0 4px 12px rgba(0,67,97,0.08)",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: alpha("#004361", 0.8),
                            fontSize: "0.7rem",
                            fontWeight: 600,
                          }}
                        >
                          {user.name.split(" ")[1]}
                        </Avatar>
                        <Box>
                          <Typography fontWeight={600} fontSize="0.8rem">
                            {user.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block" }}
                          >
                            {user.email}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#004361",
                              bgcolor: alpha("#004361", 0.05),
                              px: 0.5,
                              py: 0.2,
                              borderRadius: 0.5,
                              mt: 0.3,
                              display: "inline-block",
                            }}
                          >
                            {user.department}
                          </Typography>
                        </Box>
                      </Box>
                      {user.completed ? (
                        <CheckCircleIcon
                          sx={{ fontSize: 22, color: "#16a34a" }}
                        />
                      ) : (
                        <ScheduleIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
                      )}
                    </Paper>
                  ))}
                </Box>
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

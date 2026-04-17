import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  alpha,
  Badge,
  Stack,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  Drawer,
  SwipeableDrawer,
  Fab,
  Divider,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom'

// Icons
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import AddIcon from "@mui/icons-material/Add";
import GridViewIcon from "@mui/icons-material/GridView";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BuildIcon from "@mui/icons-material/Build";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WaterIcon from "@mui/icons-material/Water";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

// Custom styled components with reduced font sizes
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "#f9fafc",
  fontFamily: '"Inter", sans-serif',
  padding: theme.spacing(2.5),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(1.5),
  },
}));

const ActionButton = styled(Button)(({ theme, variant }) => ({
  position: "relative",
  padding: theme.spacing(0.5, 1.5),
  fontSize: "0.65rem",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 6,
  minHeight: 28,
  "& svg": {
    fontSize: "0.9rem",
    marginRight: theme.spacing(0.5),
  },
  ...(variant === "outlined" && {
    borderColor: "#e2e8f0",
    color: "#0d4a5c",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#f8fafc",
      borderColor: "#0d4a5c",
    },
  }),
  ...(variant === "contained" && {
    backgroundColor: "#0d4a5c",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: alpha("#0d4a5c", 0.9),
    },
  }),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.4, 1),
    fontSize: "0.6rem",
    minHeight: 24,
    "& svg": {
      fontSize: "0.8rem",
    },
  },
}));

const NotificationDot = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 2,
  right: 2,
  width: 4,
  height: 4,
  backgroundColor: "#ef4444",
  borderRadius: "50%",
  border: "1px solid #ffffff",
}));

const FilterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  border: "1px solid #edf2f7",
  boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
  marginBottom: theme.spacing(3),
  backgroundColor: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  flex: 1,
  maxWidth: 500,
  "& .MuiOutlinedInput-root": {
    fontSize: "0.75rem",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    border: "1px solid #edf2f7",
    height: 36,
    "& fieldset": {
      border: "none",
    },
    "&:hover": {
      borderColor: "#0d4a5c",
    },
    "&.Mui-focused": {
      borderColor: "#0d4a5c",
      boxShadow: `0 0 0 2px ${alpha("#0d4a5c", 0.1)}`,
    },
  },
  "& .MuiInputAdornment-root": {
    "& svg": {
      fontSize: "0.9rem",
      color: "#94a3b8",
    },
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const FilterChip = styled(Box)(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.3),
  cursor: "pointer",
  padding: theme.spacing(0.3, 1),
  borderRadius: 16,
  backgroundColor: active ? alpha("#0d4a5c", 0.08) : "#ffffff",
  border: "1px solid #edf2f7",
  color: active ? "#0d4a5c" : "#64748b",
  fontSize: "0.7rem",
  fontWeight: 500,
  transition: "all 0.2s",
  minHeight: 28,
  "&:hover": {
    backgroundColor: active ? alpha("#0d4a5c", 0.12) : "#f8fafc",
    borderColor: "#0d4a5c",
  },
  "& svg": {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
    padding: theme.spacing(0.2, 0.8),
    minHeight: 24,
  },
}));

const ViewToggle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid #edf2f7",
  borderRadius: 6,
  overflow: "hidden",
  backgroundColor: "#ffffff",
}));

const ToggleButton = styled(IconButton)(({ theme, active }) => ({
  padding: theme.spacing(0.5),
  borderRadius: 0,
  backgroundColor: active ? "#0d4a5c" : "transparent",
  color: active ? "#ffffff" : "#94a3b8",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: active ? "#0d4a5c" : "#f1f5f9",
  },
  "& svg": {
    fontSize: "1rem",
  },
}));

const AssetCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: "1px solid #edf2f7",
  boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
  backgroundColor: "#ffffff",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(13,74,92,0.08)",
    transform: "translateY(-2px)",
    borderColor: alpha("#0d4a5c", 0.2),
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  paddingBottom: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
}));

const AssetTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#1e293b",
  marginBottom: theme.spacing(0.3),
  lineHeight: 1.4,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const LocationText = styled(Typography)(({ theme }) => ({
  fontSize: "0.65rem",
  color: "#64748b",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.3),
  "& svg": {
    fontSize: "0.7rem",
    color: "#94a3b8",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
  },
}));

const StatusBadge = styled(Chip)(({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "operational":
        return {
          backgroundColor: alpha("#0d4a5c", 0.1),
          color: "#0d4a5c",
          border: "1px solid",
          borderColor: alpha("#0d4a5c", 0.2),
        };
      case "inspection":
        return {
          backgroundColor: alpha("#f59e0b", 0.1),
          color: "#b45309",
          border: "1px solid",
          borderColor: alpha("#f59e0b", 0.2),
        };
      case "review":
        return {
          backgroundColor: alpha("#64748b", 0.1),
          color: "#475569",
          border: "1px solid",
          borderColor: alpha("#64748b", 0.2),
        };
      default:
        return {
          backgroundColor: "#f1f5f9",
          color: "#475569",
        };
    }
  };

  return {
    height: 20,
    fontSize: "0.6rem",
    fontWeight: 600,
    borderRadius: 10,
    "& .MuiChip-label": {
      padding: "0 8px",
    },
    ...getStatusStyles(),
  };
});

const CardContent_ = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1.5),
  paddingTop: theme.spacing(1),
  flex: 1,
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0.5, 0),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

const InfoLabel = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.3),
  fontSize: "0.65rem",
  color: "#94a3b8",
  "& svg": {
    fontSize: "0.7rem",
    color: "#cbd5e1",
  },
}));

const InfoValue = styled(Typography)(({ theme, highlight }) => ({
  fontSize: "0.65rem",
  fontWeight: 500,
  color: highlight ? "#0d4a5c" : "#334155",
}));

const RedDot = styled(Box)(({ theme }) => ({
  width: 6,
  height: 6,
  backgroundColor: "#ef4444",
  borderRadius: "50%",
  marginTop: theme.spacing(0.5),
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%": {
      boxShadow: "0 0 0 0 rgba(239, 68, 68, 0.4)",
    },
    "70%": {
      boxShadow: "0 0 0 4px rgba(239, 68, 68, 0)",
    },
    "100%": {
      boxShadow: "0 0 0 0 rgba(239, 68, 68, 0)",
    },
  },
}));

const MobileFilterDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80vh",
    backgroundColor: "#ffffff",
  },
}));

const QuickStatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 12,
  border: "1px solid #edf2f7",
  backgroundColor: "#ffffff",
  marginBottom: theme.spacing(2),
}));

function AssetManagement() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const assets = [
    {
      id: 1,
      title: "Generator Unit A-12",
      location: "Building A Floor 3",
      status: "operational",
      category: "Electrical",
      lastInspection: "2024-10-28",
      nextDue: "2024-11-28",
      showDot: true,
      model: "GEN-1200X",
      serial: "SN-12345",
      manufacturer: "PowerGen Corp",
      capacity: "1200 kW",
      installationDate: "2023-06-15",
    },
    {
      id: 2,
      title: "HVAC System B-04",
      location: "Building B - Rooftop",
      status: "inspection",
      category: "HVAC",
      lastInspection: "2024-10-25",
      nextDue: "2024-11-25",
      showDot: false,
      model: "HVAC-4500",
      serial: "SN-23456",
      manufacturer: "CoolTech Industries",
      capacity: "4500 CFM",
      installationDate: "2022-11-20",
    },
    {
      id: 3,
      title: "Conveyor Belt C-21",
      location: "Warehouse Section C",
      status: "review",
      category: "Machinery",
      lastInspection: "2024-10-20",
      nextDue: "2024-11-20",
      showDot: false,
      model: "CONV-300",
      serial: "SN-34567",
      manufacturer: "Industrial Systems",
      capacity: "300 ft/min",
      installationDate: "2023-08-10",
    },
    {
      id: 4,
      title: "Fire Panel F-02",
      location: "Building F - Security Room",
      status: "operational",
      category: "Safety",
      lastInspection: "2024-10-26",
      nextDue: "2024-11-26",
      showDot: false,
      model: "FP-2000",
      serial: "SN-45678",
      manufacturer: "FireSafe Systems",
      capacity: "128 Zones",
      installationDate: "2024-01-05",
    },
    {
      id: 5,
      title: "Compressor E-15",
      location: "Building E - Mechanical Room",
      status: "inspection",
      category: "Machinery",
      lastInspection: "2024-10-22",
      nextDue: "2024-11-22",
      showDot: false,
      model: "COMP-75",
      serial: "SN-56789",
      manufacturer: "AirTech Solutions",
      capacity: "75 HP",
      installationDate: "2023-03-12",
    },
    {
      id: 6,
      title: "Pump Station D-07",
      location: "Building D - Basement",
      status: "operational",
      category: "Plumbing",
      lastInspection: "2024-10-24",
      nextDue: "2024-11-24",
      showDot: false,
      model: "PUMP-500",
      serial: "SN-67890",
      manufacturer: "FlowMaster",
      capacity: "500 GPM",
      installationDate: "2022-09-18",
    },
    {
      id: 7,
      title: "Electrical Panel P-12",
      location: "Building A - Electrical Room",
      status: "review",
      category: "Electrical",
      lastInspection: "2024-10-18",
      nextDue: "2024-11-18",
      showDot: false,
      model: "PANEL-480",
      serial: "SN-78901",
      manufacturer: "EcoPower",
      capacity: "480V",
      installationDate: "2023-12-01",
    },
    {
      id: 8,
      title: "Cooling Tower CT-03",
      location: "Building B - Roof Level 2",
      status: "operational",
      category: "HVAC",
      lastInspection: "2024-10-27",
      nextDue: "2024-11-27",
      showDot: false,
      model: "CT-1500",
      serial: "SN-89012",
      manufacturer: "Cooling Systems Inc",
      capacity: "1500 tons",
      installationDate: "2021-07-22",
    },
    {
      id: 9,
      title: "Air Handler AH-07",
      location: "Building C - Mechanical Floor",
      status: "inspection",
      category: "HVAC",
      lastInspection: "2024-10-23",
      nextDue: "2024-11-23",
      showDot: false,
      model: "AHU-200",
      serial: "SN-90123",
      manufacturer: "AirFlow Dynamics",
      capacity: "20000 CFM",
      installationDate: "2023-04-15",
    },
  ];

  const categories = ["All", "Electrical", "HVAC", "Machinery", "Safety", "Plumbing"];
  const statuses = ["All", "Operational", "Inspection", "Review"];

  const getStatusText = (status) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "inspection":
        return "Inspection";
      case "review":
        return "Review";
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return <CheckCircleIcon sx={{ fontSize: "0.7rem", color: "#0d4a5c" }} />;
      case "inspection":
        return <ScheduleIcon sx={{ fontSize: "0.7rem", color: "#f59e0b" }} />;
      case "review":
        return <WarningIcon sx={{ fontSize: "0.7rem", color: "#64748b" }} />;
      default:
        return null;
    }
  };

  // Filter assets based on search, category, and status
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || asset.category.toLowerCase() === categoryFilter;
    const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Quick stats
  const totalAssets = assets.length;
  const operationalAssets = assets.filter(a => a.status === "operational").length;
  const inspectionAssets = assets.filter(a => a.status === "inspection").length;
  const reviewAssets = assets.filter(a => a.status === "review").length;

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCardClick = (assetId) => {
    navigate(`/team/assets-details`, { state: { assetId } });
  };

  // Mobile Filter Drawer
  const renderFilterDrawer = () => (
    <MobileFilterDrawer
      anchor="bottom"
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
      onOpen={() => setFilterDrawerOpen(true)}
      disableSwipeToOpen={false}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
            Filters
          </Typography>
          <IconButton size="small" onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>

        <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", mb: 1, display: "block" }}>
          Category
        </Typography>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {categories.map((cat) => (
            <Grid item xs={4} key={cat}>
              <Button
                fullWidth
                size="small"
                variant={categoryFilter === cat.toLowerCase() ? "contained" : "outlined"}
                onClick={() => setCategoryFilter(cat.toLowerCase())}
                sx={{
                  textTransform: "none",
                  fontSize: "0.65rem",
                  borderRadius: 6,
                  borderColor: "#edf2f7",
                  color: categoryFilter === cat.toLowerCase() ? "#ffffff" : "#64748b",
                  backgroundColor: categoryFilter === cat.toLowerCase() ? "#0d4a5c" : "transparent",
                  py: 0.5,
                  "&:hover": {
                    borderColor: "#0d4a5c",
                  },
                }}
              >
                {cat}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b", mb: 1, display: "block" }}>
          Status
        </Typography>
        <Grid container spacing={1} sx={{ mb: 3 }}>
          {statuses.map((status) => (
            <Grid item xs={4} key={status}>
              <Button
                fullWidth
                size="small"
                variant={statusFilter === status.toLowerCase() ? "contained" : "outlined"}
                onClick={() => setStatusFilter(status.toLowerCase())}
                sx={{
                  textTransform: "none",
                  fontSize: "0.65rem",
                  borderRadius: 6,
                  borderColor: "#edf2f7",
                  color: statusFilter === status.toLowerCase() ? "#ffffff" : "#64748b",
                  backgroundColor: statusFilter === status.toLowerCase() ? "#0d4a5c" : "transparent",
                  py: 0.5,
                  "&:hover": {
                    borderColor: "#0d4a5c",
                  },
                }}
              >
                {status}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            fullWidth
            size="small"
            variant="outlined"
            onClick={() => {
              setCategoryFilter("all");
              setStatusFilter("all");
            }}
            sx={{
              textTransform: "none",
              fontSize: "0.7rem",
              borderRadius: 6,
              borderColor: "#edf2f7",
              color: "#64748b",
              py: 0.8,
            }}
          >
            Reset
          </Button>
          <Button
            fullWidth
            size="small"
            variant="contained"
            onClick={() => setFilterDrawerOpen(false)}
            sx={{
              textTransform: "none",
              fontSize: "0.7rem",
              borderRadius: 6,
              backgroundColor: "#0d4a5c",
              py: 0.8,
              "&:hover": {
                backgroundColor: alpha("#0d4a5c", 0.9),
              },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </MobileFilterDrawer>
  );

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 1, md: 2 } }}>
        {/* Header */}
        <HeaderSection>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#0d4a5c",
                fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                letterSpacing: "-0.01em",
              }}
            >
              Asset Management
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#64748b",
                fontSize: { xs: "0.6rem", sm: "0.65rem" },
                display: "block",
                mt: 0.3,
              }}
            >
              Track and manage your assets
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              width: { xs: "100%", md: "auto" },
            }}
          >
            <ActionButton onClick={() => navigate("/team/asset-request")} variant="outlined" startIcon={<VisibilityIcon />}>
              My Asset Requests
              <NotificationDot />
            </ActionButton>

            <ActionButton onClick={() => navigate("/team/clone-asset")} variant="contained" startIcon={<FileCopyIcon />}>
              Clone Asset
            </ActionButton>

            <ActionButton onClick={() => navigate("/team/add-asset")} variant="contained" startIcon={<AddIcon />}>
              Add Asset
            </ActionButton>
          </Box>
        </HeaderSection>

        {/* Mobile Quick Stats */}
        {isMobile && (
          <QuickStatsCard>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0d4a5c", fontSize: "0.8rem" }}>
                    {totalAssets}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.55rem" }}>
                    Total
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0d4a5c", fontSize: "0.8rem" }}>
                    {operationalAssets}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.55rem" }}>
                    Active
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#f59e0b", fontSize: "0.8rem" }}>
                    {inspectionAssets}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.55rem" }}>
                    Inspect
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#64748b", fontSize: "0.8rem" }}>
                    {reviewAssets}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.55rem" }}>
                    Review
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </QuickStatsCard>
        )}

        {/* Search and Filters */}
        <FilterPaper>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1.5,
              alignItems: { xs: "stretch", md: "center" },
              justifyContent: "space-between",
            }}
          >
            {/* Search */}
            <SearchField
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Filters and View Toggle */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: { xs: "space-between", md: "flex-end" },
              }}
            >
              {!isMobile ? (
                // Desktop Filters
                <Box sx={{ display: "flex", gap: 1 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      displayEmpty
                      sx={{
                        fontSize: "0.7rem",
                        height: 32,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#edf2f7",
                        },
                      }}
                    >
                      <MenuItem value="all" sx={{ fontSize: "0.7rem" }}>All Categories</MenuItem>
                      <MenuItem value="electrical" sx={{ fontSize: "0.7rem" }}>Electrical</MenuItem>
                      <MenuItem value="hvac" sx={{ fontSize: "0.7rem" }}>HVAC</MenuItem>
                      <MenuItem value="machinery" sx={{ fontSize: "0.7rem" }}>Machinery</MenuItem>
                      <MenuItem value="safety" sx={{ fontSize: "0.7rem" }}>Safety</MenuItem>
                      <MenuItem value="plumbing" sx={{ fontSize: "0.7rem" }}>Plumbing</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      displayEmpty
                      sx={{
                        fontSize: "0.7rem",
                        height: 32,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#edf2f7",
                        },
                      }}
                    >
                      <MenuItem value="all" sx={{ fontSize: "0.7rem" }}>All Status</MenuItem>
                      <MenuItem value="operational" sx={{ fontSize: "0.7rem" }}>Operational</MenuItem>
                      <MenuItem value="inspection" sx={{ fontSize: "0.7rem" }}>Inspection</MenuItem>
                      <MenuItem value="review" sx={{ fontSize: "0.7rem" }}>Review</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              ) : (
                // Mobile Filter Chips
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <FilterChip 
                    active={categoryFilter !== "all"}
                    onClick={() => setFilterDrawerOpen(true)}
                  >
                    <CategoryIcon />
                    {categoryFilter === "all" ? "Category" : categoryFilter}
                  </FilterChip>
                  
                  <FilterChip 
                    active={statusFilter !== "all"}
                    onClick={() => setFilterDrawerOpen(true)}
                  >
                    {getStatusIcon(statusFilter)}
                    {statusFilter === "all" ? "Status" : statusFilter}
                  </FilterChip>
                </Box>
              )}

              {/* View Toggle */}
              <ViewToggle>
                <ToggleButton
                  active={viewMode === "grid" ? 1 : 0}
                  onClick={() => setViewMode("grid")}
                  size="small"
                >
                  <GridViewIcon />
                </ToggleButton>
                <ToggleButton
                  active={viewMode === "list" ? 1 : 0}
                  onClick={() => setViewMode("list")}
                  size="small"
                >
                  <MenuIcon />
                </ToggleButton>
              </ViewToggle>
            </Box>
          </Box>
        </FilterPaper>

        {/* Asset Grid */}
        <Grid container spacing={1.5}>
          {filteredAssets.map((asset) => (
            <Grid item xs={12} sm={6} lg={4} key={asset.id}>
              <AssetCard onClick={() => handleCardClick(asset.id)}>
                <CardHeader>
                  <Box sx={{ flex: 1 }}>
                    <AssetTitle>{asset.title}</AssetTitle>
                    <LocationText>
                      <LocationOnIcon />
                      {asset.location}
                    </LocationText>
                  </Box>
                  <StatusBadge
                    status={asset.status}
                    label={getStatusText(asset.status)}
                  />
                </CardHeader>

                <CardContent_>

                  <InfoRow>
                    <InfoLabel>
                      <CategoryIcon />
                      Category:
                    </InfoLabel>
                    <InfoValue>{asset.category}</InfoValue>
                  </InfoRow>
                  
                  <InfoRow>
                    <InfoLabel>
                      <CalendarTodayIcon />
                      Last:
                    </InfoLabel>
                    <InfoValue>{asset.lastInspection}</InfoValue>
                  </InfoRow>
                  
                  <InfoRow>
                    <InfoLabel>
                      <ScheduleIcon />
                      Next:
                    </InfoLabel>
                    <InfoValue highlight={true}>{asset.nextDue}</InfoValue>
                  </InfoRow>

                  {/* Mobile Expand */}
                  {isMobile && (
                    <>
                      <Button
                        fullWidth
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpandClick(asset.id);
                        }}
                        sx={{ 
                          mt: 0.5, 
                          textTransform: "none", 
                          color: "#0d4a5c",
                          fontSize: "0.6rem",
                          p: 0.3,
                        }}
                      >
                        {expandedId === asset.id ? "Less" : "More"}
                      </Button>
                      
                      <Collapse in={expandedId === asset.id}>
                        <Box sx={{ mt: 1, pt: 1, borderTop: "1px solid #edf2f7" }}>
                          <InfoRow>
                            <InfoLabel>Model:</InfoLabel>
                            <InfoValue>{asset.model}</InfoValue>
                          </InfoRow>
                          <InfoRow>
                            <InfoLabel>Serial:</InfoLabel>
                            <InfoValue>{asset.serial}</InfoValue>
                          </InfoRow>
                          <InfoRow>
                            <InfoLabel>Manufacturer:</InfoLabel>
                            <InfoValue>{asset.manufacturer}</InfoValue>
                          </InfoRow>
                        </Box>
                      </Collapse>
                    </>
                  )}
                </CardContent_>
              </AssetCard>
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredAssets.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
              No assets found matching your criteria
            </Typography>
            <Button
              variant="text"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setStatusFilter("all");
              }}
              sx={{ mt: 1, fontSize: "0.7rem", color: "#0d4a5c" }}
            >
              Clear filters
            </Button>
          </Box>
        )}

        {/* Footer */}
        <Box sx={{ 
          borderTop: "1px solid #edf2f7", 
          py: 2, 
          mt: 4,
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "0.6rem",
        }}>
          © 2026 Asset Management
        </Box>
      </Container>

      {/* Mobile Filter Drawer */}
      {isMobile && renderFilterDrawer()}

      {/* Mobile FAB */}
      {isMobile && (
        <Fab
          size="small"
          color="primary"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#0d4a5c",
            width: 40,
            height: 40,
            "&:hover": {
              backgroundColor: alpha("#0d4a5c", 0.9),
            },
          }}
          onClick={() => navigate("/team/add-asset")}
        >
          <AddIcon sx={{ fontSize: "1rem" }} />
        </Fab>
      )}
    </PageContainer>
  );
}

export default AssetManagement;
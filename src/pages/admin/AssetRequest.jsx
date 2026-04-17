import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  IconButton,
  Avatar,
  Badge,
  Stack,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  useTheme,
  useMediaQuery,
  alpha,
  Card,
  CardContent,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Zoom,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DoneIcon from "@mui/icons-material/Done";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WaterIcon from "@mui/icons-material/Water";
import BuildIcon from "@mui/icons-material/Build";

// Custom styled components with proper theme access
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "#f8fafc",
  fontFamily: '"Inter", "Public Sans", sans-serif',
  padding: theme.spacing(1.5),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2.5),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2.5),
  },
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  marginTop: theme.spacing(0.3),
  padding: theme.spacing(0.6),
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: alpha("#000000", 0.04),
  },
  "& svg": {
    fontSize: "1.1rem",
    color: "#475569",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#1e293b",
  lineHeight: 1.2,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
  },
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  color: "#64748b",
  marginTop: theme.spacing(0.3),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
  },
}));

const TabContainer = styled(Paper)(({ theme }) => ({
  display: "inline-flex",
  backgroundColor: "#f1f5f9",
  padding: theme.spacing(0.3),
  borderRadius: 8,
  marginBottom: theme.spacing(3),
  width: "fit-content",
  boxShadow: "none",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    "& .MuiToggleButtonGroup-root": {
      width: "100%",
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: theme.spacing(0.5, 1.8),
  fontSize: "0.7rem",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 6,
  color: "#64748b",
  border: "none",
  "&.Mui-selected": {
    backgroundColor: "#ffffff",
    color: "#1e293b",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.8),
  },
  "& svg": {
    fontSize: "0.8rem",
    marginRight: theme.spacing(0.3),
  },
  [theme.breakpoints.down("sm")]: {
    flex: 1,
    fontSize: "0.65rem",
    padding: theme.spacing(0.4, 0.8),
    "& svg": {
      fontSize: "0.7rem",
    },
  },
}));

const SummaryCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ theme, status }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  border: "1px solid",
  borderColor:
    status === "pending"
      ? "#fed7aa"
      : status === "approved"
        ? "#bbf7d0"
        : "#fecaca",
  backgroundColor: "#ffffff",
  position: "relative",
  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}));

const SummaryLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.65rem",
  fontWeight: 500,
  color: "#64748b",
  marginBottom: theme.spacing(0.3),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
  },
}));

const SummaryValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ theme, status }) => ({
  fontSize: "1.8rem",
  fontWeight: 700,
  color:
    status === "pending"
      ? "#f97316"
      : status === "approved"
        ? "#10b981"
        : "#ef4444",
  lineHeight: 1,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const StatusBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ theme, status }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  padding: "2px 8px",
  borderRadius: 16,
  fontSize: "0.55rem",
  fontWeight: 600,
  backgroundColor:
    status === "pending"
      ? "#fff7ed"
      : status === "approved"
        ? "#ecfdf5"
        : "#fef2f2",
  color:
    status === "pending"
      ? "#c2410c"
      : status === "approved"
        ? "#059669"
        : "#b91c1c",
  border: "1px solid",
  borderColor:
    status === "pending"
      ? "#fed7aa"
      : status === "approved"
        ? "#a7f3d0"
        : "#fecaca",
  [theme.breakpoints.down("sm")]: {
    top: 12,
    right: 12,
    fontSize: "0.5rem",
    padding: "1px 6px",
  },
}));

const FilterSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 10,
  border: "1px solid",
  borderColor: alpha(theme.palette.divider, 0.08),
  backgroundColor: "#ffffff",
  marginBottom: theme.spacing(3),
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1.5),
  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    fontSize: "0.7rem",
    height: 38,
    "& fieldset": {
      border: "none",
    },
    "&:hover": {
      backgroundColor: "#f1f5f9",
    },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
      boxShadow: `0 0 0 2px ${alpha("#0f4c5c", 0.15)}`,
    },
  },
  "& .MuiInputAdornment-root": {
    "& svg": {
      fontSize: "0.9rem",
      color: "#94a3b8",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiOutlinedInput-root": {
      fontSize: "0.65rem",
      height: 36,
    },
  },
}));

const StatusSelect = styled(Select)(({ theme }) => ({
  width: 180,
  backgroundColor: "#f8fafc",
  borderRadius: 8,
  fontSize: "0.7rem",
  height: 38,
  "& fieldset": {
    border: "none",
  },
  "&:hover": {
    backgroundColor: "#f1f5f9",
  },
  "&.Mui-focused": {
    backgroundColor: "#ffffff",
    boxShadow: `0 0 0 2px ${alpha("#0f4c5c", 0.15)}`,
  },
  "& .MuiSelect-select": {
    padding: "8px 12px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "0.65rem",
    height: 36,
  },
}));

const RequestCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: "1px solid",
  borderColor: alpha(theme.palette.divider, 0.08),
  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
  backgroundColor: "#ffffff",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    borderColor: alpha("#0f4c5c", 0.2),
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.8, 1.8, 1, 1.8),
}));

const RequesterInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.2),
  marginBottom: theme.spacing(1.5),
}));

const RequesterAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  backgroundColor: "#e2e8f0",
  color: "#475569",
  fontWeight: 600,
  fontSize: "0.8rem",
  [theme.breakpoints.down("sm")]: {
    width: 32,
    height: 32,
    fontSize: "0.7rem",
  },
}));

const RequesterName = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "#1e293b",
  lineHeight: 1.2,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

const RequesterRole = styled(Typography)(({ theme }) => ({
  fontSize: "0.6rem",
  color: "#64748b",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
  },
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return {
          backgroundColor: "#fff7ed",
          color: "#c2410c",
          borderColor: "#fed7aa",
        };
      case "approved":
        return {
          backgroundColor: "#ecfdf5",
          color: "#059669",
          borderColor: "#a7f3d0",
        };
      case "rejected":
        return {
          backgroundColor: "#fef2f2",
          color: "#b91c1c",
          borderColor: "#fecaca",
        };
      default:
        return {
          backgroundColor: "#f1f5f9",
          color: "#475569",
          borderColor: "#e2e8f0",
        };
    }
  };

  return {
    height: 20,
    fontSize: "0.55rem",
    fontWeight: 600,
    borderRadius: 16,
    "& .MuiChip-label": {
      padding: "0 6px",
    },
    ...getStatusStyles(),
  };
});

const AssetTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  fontWeight: 700,
  color: "#1e293b",
  marginBottom: theme.spacing(0.3),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const ParentInfo = styled(Typography)(({ theme }) => ({
  fontSize: "0.6rem",
  color: "#64748b",
  marginBottom: theme.spacing(0.8),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.3),
  "& svg": {
    fontSize: "0.7rem",
    color: "#94a3b8",
  },
}));

const CategoryTag = styled(Chip)(({ theme }) => ({
  height: 18,
  fontSize: "0.55rem",
  fontWeight: 600,
  backgroundColor: "#eff6ff",
  color: "#2563eb",
  borderRadius: 4,
  "& .MuiChip-label": {
    padding: "0 4px",
  },
}));

const AssetId = styled(Typography)(({ theme }) => ({
  fontSize: "0.6rem",
  color: "#94a3b8",
  marginLeft: theme.spacing(0.5),
}));

const InfoGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  "& svg": {
    fontSize: "0.8rem",
    color: "#94a3b8",
  },
  "& span": {
    fontSize: "0.65rem",
    color: "#64748b",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.6rem",
    },
  },
}));

const FullWidthInfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  gridColumn: "span 2",
  "& svg": {
    fontSize: "0.8rem",
    color: "#94a3b8",
  },
  "& span": {
    fontSize: "0.65rem",
    color: "#64748b",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.6rem",
    },
  },
}));

const CardFooter = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  padding: theme.spacing(1, 1.8, 1.8, 1.8),
  borderTop: "1px solid",
  borderColor: alpha(theme.palette.divider, 0.06),
  backgroundColor: alpha("#f8fafc", 0.5),
  display: "flex",
  gap: theme.spacing(1),
}));

const ViewButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "hasdot",
})(({ theme, hasdot }) => ({
  flex: 1,
  padding: theme.spacing(0.6),
  backgroundColor: "#f8fafc",
  border: "1px solid",
  borderColor: alpha(theme.palette.divider, 0.15),
  color: "#475569",
  fontSize: "0.65rem",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 6,
  "&:hover": {
    backgroundColor: "#ffffff",
    borderColor: "#0f4c5c",
  },
  "& .dot": {
    width: 4,
    height: 4,
    borderRadius: "50%",
    backgroundColor: "#ef4444",
    marginLeft: theme.spacing(0.5),
    display: hasdot ? "inline-block" : "none",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
    padding: theme.spacing(0.5),
  },
}));

const ApproveButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#10b981",
  color: "#ffffff",
  borderRadius: 6,
  padding: theme.spacing(0.5),
  "&:hover": {
    backgroundColor: "#059669",
  },
  "& svg": {
    fontSize: "1rem",
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(5, 2),
  backgroundColor: "#ffffff",
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
  "& svg": {
    fontSize: "2.5rem",
    color: "#cbd5e1",
    marginBottom: theme.spacing(1.5),
  },
  "& h6": {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#475569",
    marginBottom: theme.spacing(0.5),
  },
  "& p": {
    fontSize: "0.7rem",
    color: "#94a3b8",
  },
}));

// Parent Assets with showDot property
const parentRequests = [
  {
    id: 1,
    requester: "Michael Chen",
    role: "Technician",
    initials: "MC",
    assetName: "Generator Unit A-12",
    category: "Electrical",
    assetId: "PAR-2024-001",
    location: "Warehouse A",
    date: "Jan 15, 2024",
    createdBy: "Team Member 1",
    status: "pending",
    showDot: true,
  },
  {
    id: 2,
    requester: "Sarah Johnson",
    role: "Asset Manager",
    initials: "SJ",
    assetName: "Forklift Model XL-500",
    category: "Vehicle",
    assetId: "PAR-2024-002",
    location: "Warehouse B",
    date: "Jan 15, 2024",
    createdBy: "Team Member 2",
    status: "pending",
    showDot: true,
  },
  {
    id: 3,
    requester: "Robert Wilson",
    role: "Engineer",
    initials: "RW",
    assetName: "HVAC System B-04",
    category: "HVAC",
    assetId: "PAR-2024-003",
    location: "Building B - Rooftop",
    date: "Jan 14, 2024",
    createdBy: "Team Member 1",
    status: "approved",
    showDot: false,
  },
  {
    id: 4,
    requester: "Emily Davis",
    role: "Safety Officer",
    initials: "ED",
    assetName: "Fire Panel F-02",
    category: "Safety",
    assetId: "PAR-2024-004",
    location: "Building F - Lobby",
    date: "Jan 14, 2024",
    createdBy: "Team Member 3",
    status: "rejected",
    showDot: true,
  },
  {
    id: 5,
    requester: "Michael Chen",
    role: "Technician",
    initials: "MC",
    assetName: "Pump Station D-07",
    category: "Plumbing",
    assetId: "PAR-2024-005",
    location: "Building D - Basement",
    date: "Jan 13, 2024",
    createdBy: "Team Member 1",
    status: "pending",
    showDot: true,
  },
  {
    id: 6,
    requester: "Sarah Johnson",
    role: "Asset Manager",
    initials: "SJ",
    assetName: "Compressor E-15",
    category: "Machinery",
    assetId: "PAR-2024-006",
    location: "Building E - Mechanical Room",
    date: "Jan 13, 2024",
    createdBy: "Team Member 2",
    status: "approved",
    showDot: false,
  },
];

// Child Assets with showDot property
const childRequests = [
  {
    id: 101,
    requester: "Michael Chen",
    role: "Technician",
    initials: "MC",
    assetName: "Control Panel PCB-12",
    parentAsset: "Generator Unit A-12",
    category: "Electrical Component",
    assetId: "CHD-2024-101",
    location: "Building A - Electrical Room",
    date: "Jan 15, 2024",
    createdBy: "Team Member 1",
    status: "pending",
    showDot: true,
  },
  {
    id: 102,
    requester: "Lisa Brown",
    role: "Maintenance Tech",
    initials: "LB",
    assetName: "Air Handler Fan Motor",
    parentAsset: "HVAC System B-04",
    category: "HVAC Component",
    assetId: "CHD-2024-102",
    location: "Building B - Mechanical Floor",
    date: "Jan 15, 2024",
    createdBy: "Team Member 3",
    status: "approved",
    showDot: false,
  },
  {
    id: 103,
    requester: "Robert Wilson",
    role: "Engineer",
    initials: "RW",
    assetName: "Conveyor Belt Roller Set",
    parentAsset: "Conveyor Belt C-21",
    category: "Machinery Component",
    assetId: "CHD-2024-103",
    location: "Warehouse C - Line 2",
    date: "Jan 14, 2024",
    createdBy: "Team Member 2",
    status: "pending",
    showDot: true,
  },
  {
    id: 104,
    requester: "Emily Davis",
    role: "Safety Officer",
    initials: "ED",
    assetName: "Smoke Detector SD-02",
    parentAsset: "Fire Panel F-02",
    category: "Safety Component",
    assetId: "CHD-2024-104",
    location: "Building F - Security Room",
    date: "Jan 14, 2024",
    createdBy: "Team Member 3",
    status: "rejected",
    showDot: true,
  },
  {
    id: 105,
    requester: "Sarah Johnson",
    role: "Asset Manager",
    initials: "SJ",
    assetName: "Pressure Gauge PG-07",
    parentAsset: "Pump Station D-07",
    category: "Plumbing Component",
    assetId: "CHD-2024-105",
    location: "Building D - Pump Room",
    date: "Jan 13, 2024",
    createdBy: "Team Member 1",
    status: "approved",
    showDot: false,
  },
  {
    id: 106,
    requester: "Michael Chen",
    role: "Technician",
    initials: "MC",
    assetName: "Temperature Sensor TS-04",
    parentAsset: "HVAC System B-04",
    category: "HVAC Component",
    assetId: "CHD-2024-106",
    location: "Building B - Rooftop Unit",
    date: "Jan 13, 2024",
    createdBy: "Team Member 1",
    status: "pending",
    showDot: true,
  },
  {
    id: 107,
    requester: "Tom Anderson",
    role: "Technician",
    initials: "TA",
    assetName: "Belt Tensioner Kit",
    parentAsset: "Conveyor Belt C-21",
    category: "Machinery Component",
    assetId: "CHD-2024-107",
    location: "Warehouse C - Maintenance Bay",
    date: "Jan 12, 2024",
    createdBy: "Team Member 2",
    status: "pending",
    showDot: true,
  },
  {
    id: 108,
    requester: "Lisa Brown",
    role: "Maintenance Tech",
    initials: "LB",
    assetName: "Circuit Breaker CB-08",
    parentAsset: "Generator Unit A-12",
    category: "Electrical Component",
    assetId: "CHD-2024-108",
    location: "Building A - Electrical Panel",
    date: "Jan 12, 2024",
    createdBy: "Team Member 3",
    status: "approved",
    showDot: false,
  },
];

function AssetRequests() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [requestType, setRequestType] = useState("parent");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleRequestTypeChange = (event, newType) => {
    if (newType !== null) {
      setRequestType(newType);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const currentRequests =
    requestType === "parent" ? parentRequests : childRequests;

  // Filter requests based on search and status
  const filteredRequests = currentRequests.filter((request) => {
    const matchesSearch =
      request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requester.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = filteredRequests.filter(
    (r) => r.status === "pending",
  ).length;
  const approvedCount = filteredRequests.filter(
    (r) => r.status === "approved",
  ).length;
  const rejectedCount = filteredRequests.filter(
    (r) => r.status === "rejected",
  ).length;

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 1, md: 1.5 } }}>
        {/* Header */}
        <HeaderSection>
          <BackButton onClick={handleBack}>
            <ArrowBackIcon />
          </BackButton>
          <Box>
            <HeaderTitle>Asset Requests</HeaderTitle>
            <HeaderSubtitle>
              Review and manage asset addition requests
            </HeaderSubtitle>
          </Box>
        </HeaderSection>

        {/* Tabs */}
        <TabContainer elevation={0}>
          <ToggleButtonGroup
            value={requestType}
            exclusive
            onChange={handleRequestTypeChange}
            aria-label="request type"
            sx={{ border: "none" }}
          >
            <StyledToggleButton value="parent" aria-label="parent">
              <DeviceHubIcon />
              Parent ({parentRequests.length})
            </StyledToggleButton>
            <StyledToggleButton value="child" aria-label="child">
              <AccountTreeIcon />
              Child ({childRequests.length})
            </StyledToggleButton>
          </ToggleButtonGroup>
        </TabContainer>

        {/* Summary Cards */}
        <Grid container spacing={1.5} sx={{ mb: 3 }}>
          <Grid item xs={4}>
            <SummaryCard status="pending">
              <SummaryLabel>Pending</SummaryLabel>
              <SummaryValue status="pending">{pendingCount}</SummaryValue>
              <StatusBadge status="pending">Pending</StatusBadge>
            </SummaryCard>
          </Grid>
          <Grid item xs={4}>
            <SummaryCard status="approved">
              <SummaryLabel>Approved</SummaryLabel>
              <SummaryValue status="approved">{approvedCount}</SummaryValue>
              <StatusBadge status="approved">Approved</StatusBadge>
            </SummaryCard>
          </Grid>
          <Grid item xs={4}>
            <SummaryCard status="rejected">
              <SummaryLabel>Rejected</SummaryLabel>
              <SummaryValue status="rejected">{rejectedCount}</SummaryValue>
              <StatusBadge status="rejected">Rejected</StatusBadge>
            </SummaryCard>
          </Grid>
        </Grid>

        {/* Search and Filter */}
        <FilterSection>
          <SearchField
            placeholder={`Search ${requestType} assets...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
            fullWidth
          />
          <FormControl size="small" sx={{ minWidth: isMobile ? "100%" : 160 }}>
            <StatusSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </StatusSelect>
          </FormControl>
        </FilterSection>

        {/* Request Grid */}
        {filteredRequests.length > 0 ? (
          <Grid container spacing={1.5}>
            {filteredRequests.map((request, index) => (
              <Grid item xs={12} sm={6} lg={4} key={request.id}>
                <Zoom in={true} style={{ transitionDelay: `${index * 30}ms` }}>
                  <RequestCard>
                    <CardHeader>
                      <RequesterInfo>
                        <RequesterAvatar>{request.initials}</RequesterAvatar>
                        <Box sx={{ flex: 1 }}>
                          <RequesterName>{request.requester}</RequesterName>
                          <RequesterRole>{request.role}</RequesterRole>
                        </Box>
                        <StatusChip
                          status={request.status}
                          label={request.status}
                          size="small"
                        />
                      </RequesterInfo>

                      <AssetTitle>{request.assetName}</AssetTitle>

                      {requestType === "child" && request.parentAsset && (
                        <ParentInfo>
                          <DeviceHubIcon />
                          {request.parentAsset}
                        </ParentInfo>
                      )}

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                      >
                        <CategoryTag label={request.category} size="small" />
                        <AssetId>{request.assetId}</AssetId>
                      </Box>

                      <InfoGrid>
                        <InfoItem>
                          <LocationOnIcon />
                          <span>{request.location}</span>
                        </InfoItem>
                        <InfoItem>
                          <CalendarTodayIcon />
                          <span>{request.date}</span>
                        </InfoItem>
                        <FullWidthInfoItem>
                          <PersonIcon />
                          <span>{request.createdBy}</span>
                        </FullWidthInfoItem>
                      </InfoGrid>
                    </CardHeader>

                    <CardFooter>
                      <ViewButton
                        onClick={() => navigate("/admin/asset-details")}
                        hasdot={request.showDot ? 1 : 0}
                      >
                        View Details
                      </ViewButton>
                      {request.status === "pending" && (
                        <Tooltip title="Approve" arrow placement="top">
                          <ApproveButton size="small">
                            <DoneIcon />
                          </ApproveButton>
                        </Tooltip>
                      )}
                    </CardFooter>
                  </RequestCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState>
            <InventoryIcon />
            <Typography variant="h6">No requests found</Typography>
            <Typography variant="body2">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : `No ${requestType} requests to display`}
            </Typography>
          </EmptyState>
        )}

        {/* Footer */}
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: alpha(theme.palette.divider, 0.06),
            mt: 4,
            pt: 2,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.6rem",
              color: "#94a3b8",
            }}
          >
            © 2026 Asset Management System
          </Typography>
        </Box>
      </Container>
    </PageContainer>
  );
}

export default AssetRequests;

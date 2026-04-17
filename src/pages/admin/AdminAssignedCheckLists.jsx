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
  Stack,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  alpha,
  Tooltip,
  Fade,
  Zoom,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

// Custom styled components with reduced font sizes
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "#f8fafc",
  fontFamily: '"Inter", "Public Sans", sans-serif',
  padding: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
}));

const Header = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: 700,
  color: "#1a365d",
  lineHeight: 1.2,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: "#64748b",
  marginTop: theme.spacing(0.3),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));

const FilterSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  backgroundColor: "#ffffff",
  marginBottom: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 400,
  },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    fontSize: "0.75rem",
    height: 38,
    "& fieldset": {
      border: "none",
    },
    "&:hover": {
      backgroundColor: "#e2e8f0",
    },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
      boxShadow: `0 0 0 2px ${alpha("#1a365d", 0.2)}`,
    },
  },
  "& .MuiInputAdornment-root": {
    "& svg": {
      fontSize: "1rem",
      color: "#94a3b8",
    },
  },
}));

const FilterSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "#f1f5f9",
  borderRadius: 8,
  fontSize: "0.75rem",
  height: 38,
  minWidth: 140,
  "& fieldset": {
    border: "none",
  },
  "&:hover": {
    backgroundColor: "#e2e8f0",
  },
  "&.Mui-focused": {
    backgroundColor: "#ffffff",
    boxShadow: `0 0 0 2px ${alpha("#1a365d", 0.2)}`,
  },
  "& .MuiSelect-select": {
    padding: "8px 12px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const FilterSelectIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 8,
  top: "50%",
  transform: "translateY(-50%)",
  color: "#94a3b8",
  pointerEvents: "none",
  "& svg": {
    fontSize: "1rem",
  },
}));

const FilterControls = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "auto",
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
  height: "100%",
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.6rem",
  fontWeight: 600,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.3px",
  marginBottom: theme.spacing(0.5),
}));

const StatValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ theme, status }) => ({
  fontSize: "1.4rem",
  fontWeight: 700,
  color: status === "overdue" ? "#ef4444" : "#1e293b",
  lineHeight: 1.2,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 14,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
  overflow: "hidden",
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-head": {
    backgroundColor: "#f8fafc",
    color: "#1a365d",
    fontSize: "0.6rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    padding: theme.spacing(1.5, 1.5),
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5, 1.5),
  fontSize: "0.7rem",
  color: "#334155",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
}));

const FormName = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#1a365d",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));

const DateCell = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  "& svg": {
    fontSize: "0.8rem",
    color: "#94a3b8",
  },
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "in-progress":
        return {
          backgroundColor: "#eff6ff",
          color: "#2563eb",
          borderColor: "#bfdbfe",
        };
      case "completed":
        return {
          backgroundColor: "#ecfdf5",
          color: "#059669",
          borderColor: "#a7f3d0",
        };
      case "overdue":
        return {
          backgroundColor: "#fef2f2",
          color: "#dc2626",
          borderColor: "#fecaca",
        };
      case "pending":
        return {
          backgroundColor: "#f9fafb",
          color: "#6b7280",
          borderColor: "#e5e7eb",
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
    height: 22,
    fontSize: "0.55rem",
    fontWeight: 700,
    borderRadius: 6,
    "& .MuiChip-label": {
      padding: "0 6px",
    },
    ...getStatusStyles(),
  };
});

const SubmissionsBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 24,
  height: 24,
  padding: theme.spacing(0, 0.5),
  borderRadius: 20,
  backgroundColor: "#eff6ff",
  color: "#2563eb",
  fontSize: "0.65rem",
  fontWeight: 700,
}));

const ActionIconButton = styled(IconButton)(({ theme, hasdot }) => ({
  padding: theme.spacing(0.3),
  color: "#94a3b8",
  position: "relative",
  "&:hover": {
    color: "#1a365d",
    backgroundColor: alpha("#f1f5f9", 0.8),
  },
  "& svg": {
    fontSize: "1rem",
  },
  "& .dot": {
    position: "absolute",
    top: 2,
    right: 2,
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: "#ef4444",
    border: "1px solid #ffffff",
    display: hasdot ? "block" : "none",
  },
}));

const PaginationSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const PaginationInfo = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  color: "#64748b",
}));

const PaginationButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.6, 2),
  fontSize: "0.7rem",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 8,
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  color: "#475569",
  backgroundColor: "#ffffff",
  minHeight: 36,
  "&:hover": {
    backgroundColor: "#f8fafc",
    borderColor: "#94a3b8",
  },
  "&.Mui-disabled": {
    opacity: 0.5,
  },
}));

// Data
const checklistData = [
  {
    id: 1,
    formName: "Safety Inspection Q2 2024",
    assignedTo: "Team Member",
    createdDate: "2024-04-15",
    dueDate: "2024-06-30",
    status: "in-progress",
    submissions: 12,
    hasDot: true,
  },
  {
    id: 2,
    formName: "Equipment Maintenance Check",
    assignedTo: "Team Member 2",
    createdDate: "2024-05-01",
    dueDate: "2024-06-15",
    status: "completed",
    submissions: 8,
    hasDot: false,
  },
  {
    id: 3,
    formName: "Quality Assurance Audit",
    assignedTo: "Team Member 3",
    createdDate: "2024-05-20",
    dueDate: "2024-06-10",
    status: "overdue",
    submissions: 3,
    hasDot: true,
  },
  {
    id: 4,
    formName: "Asset Inventory Update",
    assignedTo: "Team Member 8",
    createdDate: "2024-06-01",
    dueDate: "2024-07-01",
    status: "pending",
    submissions: 0,
    hasDot: false,
  },
  {
    id: 5,
    formName: "Monthly Inspection Report",
    assignedTo: "Team Member 7",
    createdDate: "2024-05-25",
    dueDate: "2024-06-25",
    status: "in-progress",
    submissions: 5,
    hasDot: false,
  },
  {
    id: 6,
    formName: "Compliance Check 2024",
    assignedTo: "Team Member 6",
    createdDate: "2024-04-10",
    dueDate: "2024-06-20",
    status: "in-progress",
    submissions: 15,
    hasDot: true,
  },
  {
    id: 7,
    formName: "Workplace Safety Survey",
    assignedTo: "Team Member 9",
    createdDate: "2024-05-15",
    dueDate: "2024-06-30",
    status: "completed",
    submissions: 22,
    hasDot: false,
  },
  {
    id: 8,
    formName: "Emergency Equipment Check",
    assignedTo: "Team Member 2",
    createdDate: "2024-06-05",
    dueDate: "2024-07-05",
    status: "pending",
    submissions: 0,
    hasDot: false,
  },
];

function AssignedChecklist() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");

  // Stats
  const totalAssigned = checklistData.length;
  const inProgress = checklistData.filter(
    (item) => item.status === "in-progress",
  ).length;
  const completed = checklistData.filter(
    (item) => item.status === "completed",
  ).length;
  const overdue = checklistData.filter(
    (item) => item.status === "overdue",
  ).length;

  const getStatusText = (status) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "overdue":
        return "Overdue";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}>
        {/* Header */}
        <Header>
          <HeaderTitle>Assigned Checklist</HeaderTitle>
          <HeaderSubtitle>
            Track and manage checklist assignments
          </HeaderSubtitle>
        </Header>

        {/* Filter Section */}
        <FilterSection>
          <SearchWrapper>
            <SearchInput
              placeholder="Search forms or customers..."
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
          </SearchWrapper>

          <FilterControls>
            <Box
              sx={{ position: "relative", width: isMobile ? "50%" : "auto" }}
            >
              <FilterSelectIcon>
                <FilterListIcon />
              </FilterSelectIcon>
              <FormControl fullWidth size="small">
                <FilterSelect
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  displayEmpty
                  sx={{ pl: 4 }}
                >
                  <MenuItem value="all" sx={{ fontSize: "0.7rem" }}>
                    All Status
                  </MenuItem>
                  <MenuItem value="in-progress" sx={{ fontSize: "0.7rem" }}>
                    In Progress
                  </MenuItem>
                  <MenuItem value="completed" sx={{ fontSize: "0.7rem" }}>
                    Completed
                  </MenuItem>
                  <MenuItem value="overdue" sx={{ fontSize: "0.7rem" }}>
                    Overdue
                  </MenuItem>
                  <MenuItem value="pending" sx={{ fontSize: "0.7rem" }}>
                    Pending
                  </MenuItem>
                </FilterSelect>
              </FormControl>
            </Box>

            <Box
              sx={{ position: "relative", width: isMobile ? "50%" : "auto" }}
            >
              <FilterSelectIcon>
                <PeopleIcon />
              </FilterSelectIcon>
              <FormControl fullWidth size="small">
                <FilterSelect
                  value={customerFilter}
                  onChange={(e) => setCustomerFilter(e.target.value)}
                  displayEmpty
                  sx={{ pl: 4 }}
                >
                  <MenuItem value="all" sx={{ fontSize: "0.7rem" }}>
                    All Customers
                  </MenuItem>
                  <MenuItem value="team1" sx={{ fontSize: "0.7rem" }}>
                    Team Member 1
                  </MenuItem>
                  <MenuItem value="team2" sx={{ fontSize: "0.7rem" }}>
                    Team Member 2
                  </MenuItem>
                  <MenuItem value="team3" sx={{ fontSize: "0.7rem" }}>
                    Team Member 3
                  </MenuItem>
                </FilterSelect>
              </FormControl>
            </Box>
          </FilterControls>
        </FilterSection>

        {/* Stats Cards */}
        <Grid container spacing={1.5} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={6} lg={3}>
            <StatCard>
              <StatLabel>Total Assigned</StatLabel>
              <StatValue>{totalAssigned}</StatValue>
            </StatCard>
          </Grid>
          <Grid item xs={6} sm={6} lg={3}>
            <StatCard>
              <StatLabel>In Progress</StatLabel>
              <StatValue>{inProgress}</StatValue>
            </StatCard>
          </Grid>
          <Grid item xs={6} sm={6} lg={3}>
            <StatCard>
              <StatLabel>Completed</StatLabel>
              <StatValue>{completed}</StatValue>
            </StatCard>
          </Grid>
          <Grid item xs={6} sm={6} lg={3}>
            <StatCard>
              <StatLabel>Overdue</StatLabel>
              <StatValue status="overdue">{overdue}</StatValue>
            </StatCard>
          </Grid>
        </Grid>

        {/* Table */}
        <StyledTableContainer>
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: isMobile ? 900 : 650 }}>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Form Name</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Submissions</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {checklistData.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: alpha("#f1f5f9", 0.5),
                      },
                    }}
                  >
                    <StyledTableCell>
                      <FormName>{item.formName}</FormName>
                    </StyledTableCell>
                    <StyledTableCell>{item.assignedTo}</StyledTableCell>
                    <StyledTableCell>
                      <DateCell>
                        <CalendarTodayIcon />
                        {item.createdDate}
                      </DateCell>
                    </StyledTableCell>
                    <StyledTableCell>
                      <DateCell>
                        <CalendarTodayIcon />
                        {item.dueDate}
                      </DateCell>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <StatusChip
                        status={item.status}
                        label={getStatusText(item.status)}
                        size="small"
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <SubmissionsBadge>{item.submissions}</SubmissionsBadge>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 0.5,
                        }}
                      >
                        <Tooltip title="View" arrow placement="top">
                          <ActionIconButton onClick={(() => navigate('/admin/view-assigned-checklists'))}
                            size="small"
                            hasdot={item.hasDot ? 1 : 0}
                          >
                            <VisibilityIcon />
                          </ActionIconButton>
                        </Tooltip>
                        <Tooltip title="Edit" arrow placement="top">
                          <ActionIconButton size="small">
                            <EditIcon />
                          </ActionIconButton>
                        </Tooltip>
                        <Tooltip title="Analytics" arrow placement="top">
                          <ActionIconButton size="small" onClick={(() => navigate('/admin/assigned-checklists-analytics'))}>
                            <BarChartIcon />
                          </ActionIconButton>
                        </Tooltip>
                        <Tooltip title="Assign" arrow placement="top">
                          <ActionIconButton size="small">
                            <PersonAddIcon />
                          </ActionIconButton>
                        </Tooltip>
                      </Box>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </StyledTableContainer>

        {/* Pagination */}
        <PaginationSection>
          <PaginationInfo>
            Showing {checklistData.length} of {checklistData.length} forms
          </PaginationInfo>
          <Box sx={{ display: "flex", gap: 1 }}>
            <PaginationButton disabled>Previous</PaginationButton>
            <PaginationButton>Next</PaginationButton>
          </Box>
        </PaginationSection>
      </Container>
    </PageContainer>
  );
}

export default AssignedChecklist;

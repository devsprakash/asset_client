import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  useTheme,
  Container,
  Stack,
  useMediaQuery,
  Menu,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import {
  FilterAlt as FilterAltIcon,
  Group as GroupIcon,
  Add as AddIcon,
  Assignment as AssignmentIcon,
  PendingActions as PendingActionsIcon,
  TaskAlt as TaskAltIcon,
  RunningWithErrors as RunningWithErrorsIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  BarChart as BarChartIcon,
  PersonAdd as PersonAddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Custom color
const primaryColor = "#0f4c61";

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  overflow: "hidden",
}));

const KpiCard = styled(Paper)(({ theme, overdue }) => ({
  padding: theme.spacing(2),
  borderRadius: 10,
  border: overdue
    ? `2px solid ${theme.palette.error.main}`
    : `1px solid ${theme.palette.divider}`,
  backgroundColor: overdue
    ? theme.palette.mode === "dark"
      ? "rgba(211, 47, 47, 0.1)"
      : "rgba(255, 235, 235, 0.8)"
    : theme.palette.background.paper,
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  padding: theme.spacing(0.75),
  borderRadius: 8,
  backgroundColor:
    color === "primary"
      ? `${primaryColor}10`
      : color === "blue"
        ? theme.palette.mode === "dark"
          ? "rgba(33, 150, 243, 0.2)"
          : "#e3f2fd"
        : color === "green"
          ? theme.palette.mode === "dark"
            ? "rgba(76, 175, 80, 0.2)"
            : "#e8f5e9"
          : color === "red"
            ? theme.palette.mode === "dark"
              ? "rgba(211, 47, 47, 0.2)"
              : "#ffebee"
            : theme.palette.action.hover,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5),
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
    },
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  borderRadius: 16,
  height: 20,
  fontSize: "0.625rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  ...(status === "in-progress" && {
    backgroundColor:
      theme.palette.mode === "dark" ? `${primaryColor}30` : `${primaryColor}10`,
    color: primaryColor,
    border: `1px solid ${primaryColor}30`,
  }),
  ...(status === "completed" && {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(76, 175, 80, 0.2)" : "#e8f5e9",
    color: theme.palette.success.dark,
    border: "1px solid rgba(76, 175, 80, 0.3)",
  }),
  ...(status === "overdue" && {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(211, 47, 47, 0.2)" : "#ffebee",
    color: theme.palette.error.main,
    border: "1px solid rgba(211, 47, 47, 0.3)",
  }),
  ...(status === "pending" && {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(158, 158, 158, 0.2)" : "#f5f5f5",
    color: theme.palette.text.secondary,
    border: "1px solid rgba(158, 158, 158, 0.3)",
  }),
  [theme.breakpoints.down("sm")]: {
    height: 18,
    fontSize: "0.55rem",
  },
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme, status }) => ({
  height: 4,
  borderRadius: 2,
  backgroundColor: theme.palette.grey[200],
  "& .MuiLinearProgress-bar": {
    borderRadius: 2,
    backgroundColor:
      status === "completed"
        ? theme.palette.success.main
        : status === "overdue"
          ? theme.palette.error.main
          : primaryColor,
  },
}));

const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: "6px 10px",
  color: theme.palette.text.primary,
  fontSize: "0.75rem",
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    borderColor: primaryColor,
    backgroundColor: theme.palette.background.paper,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    padding: "5px 8px",
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
  "&:hover": {
    color: primaryColor,
    backgroundColor: `${primaryColor}10`,
  },
  [theme.breakpoints.down("sm")]: {
    padding: 2,
    "& .MuiSvgIcon-root": {
      fontSize: "1.1rem",
    },
  },
}));

const PaginationButton = styled(Button)(({ theme, active }) => ({
  minWidth: 28,
  height: 28,
  borderRadius: 6,
  fontSize: "0.7rem",
  fontWeight: 600,
  backgroundColor: active ? primaryColor : "transparent",
  color: active ? "#fff" : theme.palette.text.secondary,
  border: active ? "none" : `1px solid transparent`,
  "&:hover": {
    backgroundColor: active ? primaryColor : theme.palette.action.hover,
    borderColor: active ? "none" : theme.palette.divider,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 24,
    height: 24,
    fontSize: "0.65rem",
  },
}));

const MobileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 10,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
}));

export default function AssignedChecklist() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [customerFilter, setCustomerFilter] = useState("All Customers");
  const [page, setPage] = useState(1);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [customerAnchorEl, setCustomerAnchorEl] = useState(null);

  // Sample data
  const kpiData = [
    {
      label: "Total Assigned",
      value: 8,
      icon: <AssignmentIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />,
      color: "primary",
      badge: "Total",
    },
    {
      label: "In Progress",
      value: 3,
      icon: <PendingActionsIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />,
      color: "blue",
      badge: "Current",
    },
    {
      label: "Completed",
      value: 2,
      icon: <TaskAltIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />,
      color: "green",
      badge: "Done",
    },
    {
      label: "Overdue",
      value: 1,
      icon: <RunningWithErrorsIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />,
      color: "red",
      badge: "Critical",
      overdue: true,
    },
  ];

  const checklistData = [
    {
      id: 1,
      name: "Monthly Safety Audit",
      code: "#SA-0012",
      assignedTo: {
        name: "John Doe",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAZjE_hSbgDeya2M3-ercXiyZKZfWzS-9ipN1nGvP6IjM-wLXqWWXUXqu0Y67ZCAIapqjZfLo6Ocp5b3BO2436y81UCvyMXBN0SoOlJ4uwDv397_OAHRBz1lmt1iDS4GstW7ZmMHSh5kbiXaJneqqtgHsiNR1EhN4N5qrG3riyL6jBaPK_zyezgyCcgJjSCV4zSfBdCTcqvbsN4tq0YPiKZSwENsAhZNKopdaJR33L8rD-TCByyEi7vQ1YGpC83AnYDdRLC4F4S4U8",
      },
      createdDate: "Oct 01, 2023",
      dueDate: "Oct 15, 2023",
      status: "in-progress",
      progress: 60,
    },
    {
      id: 2,
      name: "Site Inspection",
      code: "#SI-0094",
      assignedTo: {
        name: "Jane Smith",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA1e9nEtnMjleQuXwFA0fh6Z3p5EpAtE11cvueCG6BQyQA2YVK-HuL2WGbuAws-c48_r2OT_IgmwDXDLX1PnFjlxp8BaQiweQ_K1YS9OB6ZnOkUrcot_YWoWKP3um0nuPdaLTYaZ4dv2yV07SF6bYtN_ypvy7i1FDcastE3I56ZYm6Bry-nSvF06BBW7sDc74EJjTdoI7Her0TZfu31I_IBQ2o8DsF3k1Bq01ChIFVRhWUTcKYFduCuwdUf8C9BNWwo4xrj_DExsq8",
      },
      createdDate: "Oct 02, 2023",
      dueDate: "Oct 10, 2023",
      status: "completed",
      progress: 100,
    },
    {
      id: 3,
      name: "Equipment Check",
      code: "#EC-1102",
      assignedTo: {
        name: "Mike Ross",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDMxenN1vTMGA8trl-zpq0rhMjVO5cDpZLfDT3b945a2ksJTBiHXLnQ2Bt-TGfQlv5GfbByPs_uDvY3UD-2K4b6FsWdEIxxTs2U2isAcIss1Ui_0aKbCrIloh1wm1aH0hc05kjXWgCFeyJ8g1Ej1CJIMXqmfYkgTbN6S2FPn-NZnA5dn0mQn-oKrA42R_KgpLeZR_tFc3Wgxqf52g5DASHSCtuSX9UYEQ2cAPkgmaxIuuiSfCCcWpOiE1NEp0Gd7Fdpv-NmCzESTIk",
      },
      createdDate: "Sep 25, 2023",
      dueDate: "Oct 01, 2023",
      status: "overdue",
      progress: 20,
    },
    {
      id: 4,
      name: "Inventory Review",
      code: "#IR-2283",
      assignedTo: {
        name: "Rachel Zane",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBQdAapk37FEy2KJYfzLGJmmrdnKb_mtUi5_oVAlvm2AcQ274qK_hIK0lXKvAoinxBk6HFpNfdCQiSZgxvJNIWELLcxSPEZ4tg6V4ZGKPni3V9og7KOaB9dfP6z3Nvq3BoggiOvqRwawLXI_4vGmBJ3W4M6lGSYbUnZoXaUjlaigmvpyARXQgwtKkeD4EtEH90IyoBBsLCy4TIqPSVwcX0oF3WhXP8FV08PDjIDY37qm0wsAVqlOS_S260_y3YF5ZncpJETv4mCNt0",
      },
      createdDate: "Oct 05, 2023",
      dueDate: "Oct 20, 2023",
      status: "pending",
      progress: 0,
    },
  ];

  const getStatusLabel = (status) => {
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

  const handleViewChecklist = (id) => {
    navigate(`/superadmin/view/checklists`);
  };

  const handleStatusFilterClick = (event) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleCustomerFilterClick = (event) => {
    setCustomerAnchorEl(event.currentTarget);
  };

  const handleStatusFilterClose = (value) => {
    if (value) {
      setStatusFilter(value);
    }
    setStatusAnchorEl(null);
  };

  const handleCustomerFilterClose = (value) => {
    if (value) {
      setCustomerFilter(value);
    }
    setCustomerAnchorEl(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Mobile Card View Component
  const MobileCardView = ({ data }) => (
    <Stack spacing={2}>
      {data.map((row) => (
        <MobileCard key={row.id} elevation={0}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1.5,
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, fontSize: "0.9rem" }}
              >
                {row.name}
              </Typography>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ fontSize: "0.65rem" }}
              >
                {row.code}
              </Typography>
            </Box>
            <StatusChip
              status={row.status}
              label={getStatusLabel(row.status)}
              size="small"
            />
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}
          >
            <Avatar
              src={row.assignedTo.avatar}
              sx={{ width: 28, height: 28 }}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "0.8rem" }}
            >
              {row.assignedTo.name}
            </Typography>
          </Box>

          <Grid container spacing={1} sx={{ mb: 1.5 }}>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.65rem", display: "block" }}
              >
                Created
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                {row.createdDate}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.65rem", display: "block" }}
              >
                Due
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.75rem",
                  color:
                    row.status === "overdue"
                      ? theme.palette.error.main
                      : "inherit",
                  fontWeight: row.status === "overdue" ? 600 : 400,
                }}
              >
                {row.dueDate}
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}
          >
            <Box sx={{ flex: 1 }}>
              <StyledLinearProgress
                variant="determinate"
                value={row.progress}
                status={row.status}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, fontSize: "0.7rem" }}
            >
              {row.progress}%
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <ActionButton size="small" onClick={() => handleViewChecklist(row.id)}>
              <VisibilityIcon sx={{ fontSize: 18 }} />
            </ActionButton>
            <ActionButton size="small">
              <EditIcon sx={{ fontSize: 18 }} />
            </ActionButton>
            <ActionButton size="small">
              <BarChartIcon sx={{ fontSize: 18 }} />
            </ActionButton>
            <ActionButton size="small">
              <PersonAddIcon sx={{ fontSize: 18 }} />
            </ActionButton>
          </Stack>
        </MobileCard>
      ))}
    </Stack>
  );

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 1.5, sm: 2, md: 3 } }}>
      {/* Header Section */}
      <Box
        sx={{
          mb: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "flex-end" },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              color: theme.palette.text.primary,
              mb: 0.25,
            }}
          >
            Assigned Checklist
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" } }}
          >
            Track and manage checklist assignments for your entire team.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          <FilterButton
            onClick={handleStatusFilterClick}
            endIcon={<ExpandMoreIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
            sx={{
              justifyContent: "space-between",
              width: { xs: "100%", sm: 130, md: 150 },
            }}
          >
            {statusFilter}
          </FilterButton>
          
          <Menu
            anchorEl={statusAnchorEl}
            open={Boolean(statusAnchorEl)}
            onClose={() => handleStatusFilterClose()}
          >
            <MenuItem onClick={() => handleStatusFilterClose("All Status")}>All Status</MenuItem>
            <MenuItem onClick={() => handleStatusFilterClose("In Progress")}>In Progress</MenuItem>
            <MenuItem onClick={() => handleStatusFilterClose("Completed")}>Completed</MenuItem>
            <MenuItem onClick={() => handleStatusFilterClose("Overdue")}>Overdue</MenuItem>
            <MenuItem onClick={() => handleStatusFilterClose("Pending")}>Pending</MenuItem>
          </Menu>

          <FilterButton
            onClick={handleCustomerFilterClick}
            endIcon={<ExpandMoreIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
            sx={{
              justifyContent: "space-between",
              width: { xs: "100%", sm: 160 },
            }}
          >
            {customerFilter}
          </FilterButton>
          
          <Menu
            anchorEl={customerAnchorEl}
            open={Boolean(customerAnchorEl)}
            onClose={() => handleCustomerFilterClose()}
          >
            <MenuItem onClick={() => handleCustomerFilterClose("All Customers")}>All Customers</MenuItem>
            <MenuItem onClick={() => handleCustomerFilterClose("John Doe")}>John Doe</MenuItem>
            <MenuItem onClick={() => handleCustomerFilterClose("Jane Smith")}>Jane Smith</MenuItem>
            <MenuItem onClick={() => handleCustomerFilterClose("Mike Ross")}>Mike Ross</MenuItem>
            <MenuItem onClick={() => handleCustomerFilterClose("Rachel Zane")}>Rachel Zane</MenuItem>
          </Menu>

          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
            sx={{
              bgcolor: primaryColor,
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              textTransform: "none",
              px: { xs: 2, sm: 2.5 },
              py: { xs: 0.75, sm: 1 },
              borderRadius: 2,
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                bgcolor: "#0a3a4a",
              },
            }}
          >
            New Assignment
          </Button>
        </Stack>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: { xs: 2, sm: 3 } }}>
        {kpiData.map((kpi, index) => (
          <Grid item xs={6} sm={6} lg={3} key={index}>
            <KpiCard elevation={0} overdue={kpi.overdue}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <IconWrapper color={kpi.color}>{kpi.icon}</IconWrapper>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.6rem",
                    color: kpi.overdue
                      ? theme.palette.error.main
                      : "text.disabled",
                    letterSpacing: 0.3,
                  }}
                >
                  {kpi.badge}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  mb: 0.25,
                  fontWeight: 500,
                  fontSize: "0.65rem",
                  display: "block",
                }}
              >
                {kpi.label}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  color: kpi.overdue ? theme.palette.error.main : "inherit",
                  lineHeight: 1.2,
                }}
              >
                {kpi.value}
              </Typography>
            </KpiCard>
          </Grid>
        ))}
      </Grid>

      {/* Table Section - Desktop */}
      {!isMobile ? (
        <StyledPaper elevation={0}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.02)"
                        : theme.palette.grey[50],
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <TableCell
                    sx={{
                      py: 2,
                      px: 2.5,
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      color: "text.secondary",
                      letterSpacing: 0.3,
                    }}
                  >
                    Checklist Name
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 2,
                      px: 2.5,
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      color: "text.secondary",
                      letterSpacing: 0.3,
                    }}
                  >
                    Assigned To
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 2,
                      px: 2.5,
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      color: "text.secondary",
                      letterSpacing: 0.3,
                    }}
                  >
                    Created
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 2,
                      px: 2.5,
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      color: "text.secondary",
                      letterSpacing: 0.3,
                    }}
                  >
                    Due Date
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 2,
                      px: 2.5,
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      color: "text.secondary",
                      letterSpacing: 0.3,
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 2,
                      px: 2.5,
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      color: "text.secondary",
                      letterSpacing: 0.3,
                    }}
                  >
                    Progress
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 2,
                      px: 2.5,
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      color: "text.secondary",
                      letterSpacing: 0.3,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checklistData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:hover": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.02)"
                            : theme.palette.action.hover,
                      },
                      ...(row.status === "overdue" && {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "rgba(211, 47, 47, 0.05)"
                            : "rgba(255, 235, 235, 0.3)",
                      }),
                    }}
                  >
                    <TableCell sx={{ py: 2, px: 2.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                      >
                        {row.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ fontSize: "0.65rem" }}
                      >
                        {row.code}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2.5 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar
                          src={row.assignedTo.avatar}
                          sx={{ width: 28, height: 28 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, fontSize: "0.75rem" }}
                        >
                          {row.assignedTo.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2.5 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {row.createdDate}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2.5 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "0.75rem",
                          color:
                            row.status === "overdue"
                              ? theme.palette.error.main
                              : "text.secondary",
                          fontWeight: row.status === "overdue" ? 600 : 400,
                        }}
                      >
                        {row.dueDate}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2.5 }}>
                      <StatusChip
                        status={row.status}
                        label={getStatusLabel(row.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          minWidth: 90,
                        }}
                      >
                        <Box sx={{ flex: 1, maxWidth: 70 }}>
                          <StyledLinearProgress
                            variant="determinate"
                            value={row.progress}
                            status={row.status}
                          />
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 600, fontSize: "0.65rem" }}
                        >
                          {row.progress}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2.5 }}>
                      <Stack direction="row" spacing={0.25}>
                        <ActionButton size="small" onClick={() => handleViewChecklist(row.id)}>
                          <VisibilityIcon sx={{ fontSize: 18 }} />
                        </ActionButton>
                        <ActionButton size="small">
                          <EditIcon sx={{ fontSize: 18 }} />
                        </ActionButton>
                        <ActionButton size="small">
                          <BarChartIcon sx={{ fontSize: 18 }} />
                        </ActionButton>
                        <ActionButton size="small">
                          <PersonAddIcon sx={{ fontSize: 18 }} />
                        </ActionButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            sx={{
              px: 2.5,
              py: 1.5,
              borderTop: `1px solid ${theme.palette.divider}`,
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.02)"
                  : theme.palette.grey[50],
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 500, fontSize: "0.65rem" }}
            >
              Showing 4 of 8 results
            </Typography>

            <Stack direction="row" spacing={0.5}>
              <PaginationButton 
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                <ChevronLeftIcon sx={{ fontSize: 16 }} />
              </PaginationButton>
              <PaginationButton 
                active={page === 1}
                onClick={() => handlePageChange(1)}
              >
                1
              </PaginationButton>
              <PaginationButton 
                active={page === 2}
                onClick={() => handlePageChange(2)}
              >
                2
              </PaginationButton>
              <PaginationButton 
                disabled={page === 2}
                onClick={() => handlePageChange(page + 1)}
              >
                <ChevronRightIcon sx={{ fontSize: 16 }} />
              </PaginationButton>
            </Stack>
          </Box>
        </StyledPaper>
      ) : (
        // Mobile Card View
        <MobileCardView data={checklistData} />
      )}
    </Container>
  );
}
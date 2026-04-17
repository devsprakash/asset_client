// pages/admin/TeamManagement.js
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Star as StarIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTeam } from "../context/TeamContext";
import AddMemberModal from "./AddMemberModal";
import EditMemberModal from "./EditMemberModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

// Color palette
const C = {
  primary: "#0d4a5c",
  primaryLight: "#e6f0f3",
  success: "#2e7d32",
  successLight: "#e8f5e9",
  warning: "#ed6c02",
  warningLight: "#fff4e5",
  error: "#d32f2f",
  errorLight: "#ffebea",
  surface: "#f8fafc",
  card: "#ffffff",
  border: "#e2e8f0",
  text: { primary: "#1e293b", secondary: "#475569", disabled: "#94a3b8" },
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return { bg: C.successLight, color: C.success, label: "Active" };
    case "inactive":
      return { bg: C.errorLight, color: C.error, label: "Inactive" };
    case "onleave":
      return { bg: C.warningLight, color: C.warning, label: "On Leave" };
    default:
      return {
        bg: C.border,
        color: C.text.disabled,
        label: status || "Unknown",
      };
  }
};

const getPerformanceColor = (score) => {
  if (score >= 80) return C.success;
  if (score >= 60) return C.primary;
  if (score >= 40) return C.warning;
  return C.error;
};

// Stat Card Component
const StatCard = ({ title, value, icon, color, loading }) => (
  <Card sx={{ height: "100%", borderRadius: 2 }}>
    <CardContent sx={{ p: 1.5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: C.text.disabled, fontWeight: 500, fontSize: "0.65rem" }}
        >
          {title}
        </Typography>
        <Box sx={{ p: 0.5, borderRadius: 1, bgcolor: `${color}18` }}>
          {icon}
        </Box>
      </Box>
      {loading ? (
        <CircularProgress size={20} sx={{ color }} />
      ) : (
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: color || C.text.primary,
            fontSize: "1.2rem",
          }}
        >
          {value ?? 0}
        </Typography>
      )}
    </CardContent>
  </Card>
);

// Member Card for Mobile View
const MemberCard = ({ member, onView, onEdit, onDelete }) => {
  const statusStyle = getStatusColor(member.status);
  const performanceColor = getPerformanceColor(member.performanceScore);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Paper sx={{ p: 1.5, mb: 1.5, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: C.primary,
              fontSize: "0.9rem",
            }}
          >
            {member.initials}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
              {member.name}
            </Typography>
            <Typography sx={{ fontSize: "0.65rem", color: C.text.secondary }}>
              {member.email}
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
        <Chip
          label={member.role}
          size="small"
          sx={{
            height: 20,
            fontSize: "0.6rem",
            bgcolor: C.primaryLight,
            color: C.primary,
          }}
        />
        <Chip
          label={statusStyle.label}
          size="small"
          sx={{
            height: 20,
            fontSize: "0.6rem",
            bgcolor: statusStyle.bg,
            color: statusStyle.color,
          }}
        />
        <Chip
          label={`${member.performanceScore}%`}
          size="small"
          sx={{
            height: 20,
            fontSize: "0.6rem",
            bgcolor: `${performanceColor}18`,
            color: performanceColor,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontSize: "0.6rem", color: C.text.disabled }}
        >
          {member.department || "No department"}
        </Typography>
        <Button
          size="small"
          onClick={() => onView(member.id)}
          sx={{ fontSize: "0.6rem", p: 0.5, minWidth: "auto" }}
        >
          View Details
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            onView(member.id);
            setAnchorEl(null);
          }}
          sx={{ fontSize: "0.7rem" }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onEdit(member);
            setAnchorEl(null);
          }}
          sx={{ fontSize: "0.7rem" }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(member);
            setAnchorEl(null);
          }}
          sx={{ fontSize: "0.7rem", color: C.error }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: C.error }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default function TeamManagement() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const {
    teamMembers,
    teamStats,
    loading,
    actionLoading,
    error,
    pagination,
    fetchTeamMembers,
    fetchTeamStats,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    updateFilters,
    changePage,
    clearError,
  } = useTeam();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = (msg, sev = "success") =>
    setToast({ open: true, message: msg, severity: sev });
  const closeToast = () => setToast((prev) => ({ ...prev, open: false }));

  // Fetch data on mount
  useEffect(() => {
    fetchTeamMembers();
    fetchTeamStats();
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      updateFilters({ search: searchTerm });
    }, 500);
    setSearchTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleAddMember = async (formData) => {
    const result = await addTeamMember(formData);
    if (result.success) {
      showToast(result.message);
      setAddModalOpen(false);
    } else {
      showToast(result.error, "error");
    }
    return result;
  };

  const handleEditMember = async (memberId, updateData) => {
    const result = await updateTeamMember(memberId, updateData);
    if (result.success) {
      showToast(result.message);
      setEditModalOpen(false);
      setSelectedMember(null);
    } else {
      showToast(result.error, "error");
    }
    return result;
  };

  const handleDeleteMember = async () => {
    if (!selectedMember) return;
    const result = await deleteTeamMember(selectedMember.id, true);
    if (result.success) {
      showToast(result.message);
      setDeleteModalOpen(false);
      setSelectedMember(null);
    } else {
      showToast(result.error, "error");
    }
    return result;
  };

  const handleRefresh = () => {
    fetchTeamMembers({}, true);
    fetchTeamStats(true);
  };

  console.log("team stats....", teamStats)
  const stats = [
    {
      title: "Total Members",
      value: teamStats?.total || 0,
      icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
      color: C.primary,
    },
    {
      title: "Active",
      value: teamStats?.active || 0,
      icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
      color: C.success,
    },
    {
      title: "Inactive",
      value: teamStats?.inactive || 0,
      icon: <CancelIcon sx={{ fontSize: 16 }} />,
      color: C.error,
    },
    {
      title: "On Leave",
      value: teamStats?.onLeave || 0,
      icon: <PendingIcon sx={{ fontSize: 16 }} />,
      color: C.warning,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: C.surface,
        minHeight: "100vh",
        p: { xs: 1.5, sm: 2, md: 2.5 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}>
        {/* Header */}
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
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: C.text.primary,
                fontSize: { xs: "1.1rem", sm: "1.2rem" },
                mb: 0.25,
              }}
            >
              Team Management
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: C.text.secondary, fontSize: "0.68rem" }}
            >
              Manage your inspection team members
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: "0.9rem" }} />}
            onClick={() => setAddModalOpen(true)}
            sx={{ bgcolor: C.primary, fontSize: "0.7rem", py: 0.75, px: 2 }}
          >
            Add Member
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
          {stats.map((stat, idx) => (
            <Grid item xs={6} sm={3} key={idx}>
              <StatCard {...stat} loading={loading} />
            </Grid>
          ))}
        </Grid>

        {/* Search and Filter Bar */}
        <Paper
          sx={{
            p: 1.5,
            mb: 2.5,
            borderRadius: 2,
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="Search by name or email..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ fontSize: "0.9rem", color: C.text.disabled }}
                  />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm("")}>
                    <CloseIcon sx={{ fontSize: "0.8rem" }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { fontSize: "0.75rem" },
            }}
          />
          <Tooltip title="Refresh">
            <IconButton
              onClick={handleRefresh}
              size="small"
              sx={{ bgcolor: C.surface }}
            >
              <RefreshIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Tooltip>
        </Paper>

        {/* Error Display */}
        {error && (
          <Alert
            severity="error"
            onClose={clearError}
            sx={{ mb: 2, borderRadius: 2, fontSize: "0.7rem" }}
          >
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && !teamMembers.length ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: C.primary }} />
          </Box>
        ) : teamMembers.length === 0 ? (
          <Paper sx={{ textAlign: "center", py: 6, borderRadius: 3 }}>
            <Typography sx={{ color: C.text.secondary, fontSize: "0.85rem" }}>
              No team members found
            </Typography>
            <Button
              onClick={() => setAddModalOpen(true)}
              sx={{ mt: 2, fontSize: "0.7rem" }}
            >
              Add your first team member
            </Button>
          </Paper>
        ) : isMobile ? (
          // Mobile Card View
          <Box>
            {teamMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onView={(id) => navigate(`/admin/team-details/${id}`)}
                onEdit={(member) => {
                  setSelectedMember(member);
                  setEditModalOpen(true);
                }}
                onDelete={(member) => {
                  setSelectedMember(member);
                  setDeleteModalOpen(true);
                }}
              />
            ))}
          </Box>
        ) : (
          // Desktop Table View
          <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ bgcolor: C.primaryLight }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: C.primary,
                        fontSize: "0.7rem",
                        py: 1.5,
                      }}
                    >
                      Member
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: C.primary,
                        fontSize: "0.7rem",
                        py: 1.5,
                      }}
                    >
                      Role
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: C.primary,
                        fontSize: "0.7rem",
                        py: 1.5,
                      }}
                    >
                      Department
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: C.primary,
                        fontSize: "0.7rem",
                        py: 1.5,
                      }}
                    >
                      Performance
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: C.primary,
                        fontSize: "0.7rem",
                        py: 1.5,
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: C.primary,
                        fontSize: "0.7rem",
                        py: 1.5,
                      }}
                      align="center"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamMembers.map((member) => {
                    const statusStyle = getStatusColor(member.status);
                    const performanceColor = getPerformanceColor(
                      member.performanceScore,
                    );
                    return (
                      <TableRow key={member.id} hover>
                        <TableCell sx={{ py: 1.5 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 36,
                                height: 36,
                                bgcolor: C.primary,
                                fontSize: "0.8rem",
                              }}
                            >
                              {member.initials}
                            </Avatar>
                            <Box>
                              <Typography
                                sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                              >
                                {member.name}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.65rem",
                                  color: C.text.secondary,
                                }}
                              >
                                {member.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.7rem", py: 1.5 }}>
                          {member.role}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.7rem", py: 1.5 }}>
                          {member.department || "—"}
                        </TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <LinearProgress
                              variant="determinate"
                              value={member.performanceScore}
                              sx={{
                                width: 60,
                                height: 4,
                                borderRadius: 2,
                                bgcolor: C.border,
                              }}
                            />
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "0.7rem",
                                color: performanceColor,
                              }}
                            >
                              {member.performanceScore}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Chip
                            label={statusStyle.label}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: "0.6rem",
                              bgcolor: statusStyle.bg,
                              color: statusStyle.color,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1.5 }}>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            justifyContent="center"
                          >
                            <Tooltip title="View Details">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  navigate(`/admin/team-details/${member.id}`)
                                }
                              >
                                <VisibilityIcon sx={{ fontSize: "0.9rem" }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setSelectedMember(member);
                                  setEditModalOpen(true);
                                }}
                              >
                                <EditIcon sx={{ fontSize: "0.9rem" }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setSelectedMember(member);
                                  setDeleteModalOpen(true);
                                }}
                                sx={{ color: C.error }}
                              >
                                <DeleteIcon sx={{ fontSize: "0.9rem" }} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5 }}>
            <TablePagination
              component="div"
              count={pagination.total}
              page={pagination.page - 1}
              onPageChange={(_, newPage) => changePage(newPage + 1)}
              rowsPerPage={pagination.limit}
              rowsPerPageOptions={[10]}
              labelRowsPerPage=""
              sx={{
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                  { fontSize: "0.7rem" },
              }}
            />
          </Box>
        )}

        {/* Modals */}
        <AddMemberModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddMember}
          loading={actionLoading}
        />
        <EditMemberModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedMember(null);
          }}
          member={selectedMember}
          onSubmit={handleEditMember}
          loading={actionLoading}
        />
        <DeleteConfirmModal
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedMember(null);
          }}
          member={selectedMember}
          onConfirm={handleDeleteMember}
          loading={actionLoading}
        />

        {/* Toast Notifications */}
        <Snackbar
          open={toast.open}
          autoHideDuration={5000}
          onClose={closeToast}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={closeToast}
            severity={toast.severity}
            variant="filled"
            sx={{ borderRadius: 2, fontSize: "0.7rem" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

// pages/ClientManagement.js - Complete working version with filters and search
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  Chip,
  LinearProgress,
  Divider,
  Modal,
  Fade,
  Backdrop,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  useTheme,
  useMediaQuery,
  Menu,
  ListItemIcon,
  ListItemText,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  Skeleton,
  Zoom,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  Circle as CircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useClient } from "../context/ClientContext";

// ─── Color palette ──────────────────────────────────────────────────────────
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

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

const getMembershipStyle = (plan = "") => {
  const map = {
    premium: { bg: "#fff4e5", color: "#ed6c02", label: "Premium" },
    standard: { bg: "#e6f0f3", color: "#0d4a5c", label: "Standard" },
    free: { bg: "#f0f3f5", color: "#5f6b7a", label: "Free" },
    enterprise: { bg: "#ede7f6", color: "#5e35b1", label: "Enterprise" },
  };
  return (
    map[plan.toLowerCase()] || {
      bg: C.border,
      color: C.text.secondary,
      label: plan,
    }
  );
};

// ─── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, title, value, subtitle, color, loading }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 3,
      bgcolor: C.card,
      border: "1px solid",
      borderColor: C.border,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 1,
      transition: "all 0.2s",
      "&:hover": {
        boxShadow: "0 4px 16px rgba(13,74,92,0.08)",
        transform: "translateY(-2px)",
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: C.text.secondary, fontWeight: 500, fontSize: "0.72rem" }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          p: 0.75,
          borderRadius: 1.5,
          bgcolor: color ? `${color}18` : C.primaryLight,
        }}
      >
        <Icon sx={{ fontSize: "1.1rem", color: color || C.primary }} />
      </Box>
    </Box>
    {loading ? (
      <Skeleton variant="text" width="50%" height={36} />
    ) : (
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: C.text.primary,
          fontSize: "1.6rem",
          lineHeight: 1,
        }}
      >
        {value ?? 0}
      </Typography>
    )}
    {subtitle && (
      <Typography
        variant="caption"
        sx={{ color: C.text.disabled, fontSize: "0.62rem" }}
      >
        {subtitle}
      </Typography>
    )}
  </Paper>
);

// ─── Client Card ─────────────────────────────────────────────────────────────
const ClientCard = ({ client, onEdit, onDelete, onViewDetails }) => {
  const plan = client.membershipPlan || "free";
  const daysLeft = client.daysRemaining ?? 0;
  const isActive = client.status === "active";
  const mStyle = getMembershipStyle(plan);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const usersUsed = client.usersUsed || 0;
  const licenseLimit = client.licenseLimit || 0;
  const usagePercentage =
    licenseLimit > 0
      ? Math.min(100, Math.round((usersUsed / licenseLimit) * 100))
      : 0;

  const isExpiringSoon = daysLeft > 0 && daysLeft <= 7;

  return (
    <Zoom in style={{ transitionDelay: "50ms" }}>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: "1px solid",
          borderColor: C.border,
          bgcolor: C.card,
          position: "relative",
          opacity: isActive ? 1 : 0.75,
          transition: "all 0.2s",
          "&:hover": {
            borderColor: C.primary,
            boxShadow: "0 4px 20px rgba(13,74,92,0.1)",
            transform: "translateY(-2px)",
          },
        }}
      >
        {!isActive && (
          <Chip
            label="Inactive"
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              height: 20,
              fontSize: "0.58rem",
              fontWeight: 700,
              bgcolor: C.errorLight,
              color: C.error,
            }}
          />
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: isActive ? C.primary : C.text.disabled,
              fontSize: "0.9rem",
              fontWeight: 700,
              borderRadius: 2,
            }}
          >
            {getInitials(client.customerName)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.25 }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: C.text.primary,
                  fontSize: "0.88rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {client.customerName}
              </Typography>
              <CircleIcon
                sx={{
                  color: isActive ? C.success : C.text.disabled,
                  fontSize: "0.45rem",
                  flexShrink: 0,
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: C.text.secondary,
                fontSize: "0.67rem",
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {client.email}
            </Typography>
          </Box>
          <IconButton
            size="small"
            sx={{ color: C.text.disabled, p: 0.5 }}
            onClick={(e) => setMenuAnchor(e.currentTarget)}
          >
            <MoreVertIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: C.text.disabled,
                fontSize: "0.6rem",
                display: "block",
                mb: 0.5,
              }}
            >
              Membership
            </Typography>
            <Chip
              label={mStyle.label}
              size="small"
              sx={{
                bgcolor: mStyle.bg,
                color: mStyle.color,
                fontSize: "0.62rem",
                fontWeight: 700,
                height: 22,
                borderRadius: 1,
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: C.text.disabled,
                fontSize: "0.6rem",
                display: "block",
                mb: 0.5,
              }}
            >
              Duration
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: "0.75rem",
                color: isExpiringSoon ? C.error : C.text.primary,
              }}
            >
              {daysLeft} days left {isExpiringSoon && "⚠️"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography
              variant="caption"
              sx={{ color: C.text.disabled, fontSize: "0.6rem" }}
            >
              License Usage
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: "0.67rem",
                color: usagePercentage > 85 ? C.error : C.text.primary,
              }}
            >
              {usersUsed} / {licenseLimit} ({usagePercentage}%)
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={usagePercentage}
            sx={{
              height: 5,
              borderRadius: 3,
              bgcolor: C.border,
              "& .MuiLinearProgress-bar": {
                bgcolor: usagePercentage > 85 ? C.error : C.primary,
                borderRadius: 3,
              },
            }}
          />
        </Box>

        <Divider sx={{ borderColor: C.border, mb: 1.5 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={
              <VisibilityIcon sx={{ fontSize: "0.85rem !important" }} />
            }
            onClick={() => onViewDetails(client._id)}
            sx={{
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "none",
              borderColor: C.border,
              color: C.text.secondary,
              py: 0.5,
              px: 1.5,
              borderRadius: 1.5,
              "&:hover": {
                borderColor: C.primary,
                color: C.primary,
                bgcolor: C.primaryLight,
              },
            }}
          >
            View
          </Button>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => onEdit(client)}
              sx={{
                color: C.text.secondary,
                p: 0.75,
                "&:hover": { color: C.primary, bgcolor: C.primaryLight },
              }}
            >
              <EditIcon sx={{ fontSize: "0.95rem" }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(client)}
              sx={{
                color: C.text.secondary,
                p: 0.75,
                "&:hover": { color: C.error, bgcolor: C.errorLight },
              }}
            >
              <DeleteIcon sx={{ fontSize: "0.95rem" }} />
            </IconButton>
          </Box>
        </Box>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
          PaperProps={{
            sx: {
              mt: 0.5,
              borderRadius: 2,
              minWidth: 150,
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              onEdit(client);
              setMenuAnchor(null);
            }}
            sx={{ fontSize: "0.75rem", py: 0.75 }}
          >
            <ListItemIcon>
              <EditIcon sx={{ fontSize: "1rem", color: C.text.secondary }} />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(client);
              setMenuAnchor(null);
            }}
            sx={{ fontSize: "0.75rem", py: 0.75, color: C.error }}
          >
            <ListItemIcon>
              <DeleteIcon sx={{ fontSize: "1rem", color: C.error }} />
            </ListItemIcon>
            <ListItemText primary={isActive ? "Deactivate" : "Activate"} />
          </MenuItem>
        </Menu>
      </Paper>
    </Zoom>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 560 },
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
  p: { xs: 3, sm: 4 },
  maxHeight: "90vh",
  overflowY: "auto",
};

const EMPTY_FORM = {
  customerName: "",
  email: "",
  password: "",
  membershipPlan: "standard",
  duration: "30",
  licenseLimit: "10",
  phone: "",
  website: "",
  notes: "",
};

export default function ClientManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const {
    clients,
    stats,
    pagination,
    filters,
    loading,
    actionLoading,
    fetchClients,
    addClient,
    editClient,
    changeClientStatus,
    updateFilters,
    changePage,
    resetFilters,
  } = useClient();

  // ── Local state ──────────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [membershipAnchorEl, setMembershipAnchorEl] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const searchTimeoutRef = useRef(null);

  const showToast = (msg, sev = "success") =>
    setToast({ open: true, message: msg, severity: sev });
  const closeToast = () => setToast((p) => ({ ...p, open: false }));

  // ─── Initial fetch on mount ───────────────────────────────────────────────
  useEffect(() => {
    fetchClients();
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  // ─── Debounced search ─────────────────────────────────────────────────────
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      updateFilters({ search: searchTerm });
      fetchClients({ search: searchTerm, page: 1 });
    }, 500);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchTerm]);

  // ─── Filter handlers ──────────────────────────────────────────────────────
  const handleStatusFilterChange = (status) => {
    updateFilters({ status });
    setFilterAnchorEl(null);
    fetchClients({ status, page: 1 });
  };

  const handleMembershipFilterChange = (membershipPlan) => {
    updateFilters({ membershipPlan });
    setMembershipAnchorEl(null);
    fetchClients({ membershipPlan, page: 1 });
  };

  const handleClearFilters = () => {
    resetFilters();
    setSearchTerm("");
  };

  // ─── Pagination handler ───────────────────────────────────────────────────
  const handlePageChange = (newPage) => {
    changePage(newPage);
    fetchClients({ page: newPage });
  };

  // ─── Form handlers ────────────────────────────────────────────────────────
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setFormErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.customerName.trim())
      errs.customerName = "Customer name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email";
    if (
      modalMode === "add" &&
      (!formData.duration || parseInt(formData.duration) < 1)
    )
      errs.duration = "Duration must be ≥ 1";
    if (!formData.licenseLimit || parseInt(formData.licenseLimit) < 1)
      errs.licenseLimit = "License limit must be ≥ 1";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (modalMode === "add") {
        await addClient({
          customerName: formData.customerName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password || undefined,
          membershipPlan: formData.membershipPlan,
          duration: parseInt(formData.duration),
          licenseLimit: parseInt(formData.licenseLimit),
          phone: formData.phone,
          website: formData.website,
          notes: formData.notes,
        });
        showToast("Client created successfully!");
        setOpenModal(false);
        setFormData(EMPTY_FORM);
      } else {
        await editClient(selectedClient._id, {
          customerName: formData.customerName.trim(),
          membershipPlan: formData.membershipPlan,
          extendDays: parseInt(formData.extendDays) || 0,
          licenseLimit: parseInt(formData.licenseLimit),
          phone: formData.phone,
          website: formData.website,
          notes: formData.notes,
        });
        showToast("Client updated successfully");
        setOpenModal(false);
      }
    } catch (error) {
      showToast(error.message || "An error occurred", "error");
    }
  };

  const handleToggleStatus = async (client) => {
    const newStatus = client.status === "active" ? "inactive" : "active";
    try {
      await changeClientStatus(client._id, newStatus);
      showToast(
        `Client ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
      );
    } catch (error) {
      showToast(error.message || "Failed to change status", "error");
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData(EMPTY_FORM);
    setFormErrors({});
    setOpenModal(true);
  };

  const openEditModal = (client) => {
    setSelectedClient(client);
    setFormData({
      customerName: client.customerName || "",
      email: client.email || "",
      password: "",
      membershipPlan: client.membershipPlan || "standard",
      extendDays: "0",
      licenseLimit: String(client.licenseLimit || 10),
      phone: client.phone || "",
      website: client.website || "",
      notes: client.notes || "",
    });
    setFormErrors({});
    setModalMode("edit");
    setOpenModal(true);
  };

  const statCards = [
    {
      icon: GroupIcon,
      title: "Total Customers",
      value: stats?.total || 0,
      subtitle: "All registered clients",
      color: C.primary,
    },
    {
      icon: PersonIcon,
      title: "Active Customers",
      value: stats?.active || 0,
      subtitle: "Currently active",
      color: C.success,
    },
    {
      icon: BusinessIcon,
      title: "Enterprise",
      value: stats?.byPlan?.enterprise || 0,
      subtitle: "Business plans",
      color: "#5e35b1",
    },
    {
      icon: WarningIcon,
      title: "Expiring Soon",
      value: stats?.expiringSoon || 0,
      subtitle: "Within 7 days",
      color: C.warning,
    },
  ];

  const getStatusDisplayText = () => {
    if (filters.status === "all") return "All Status";
    return filters.status === "active" ? "Active" : "Inactive";
  };

  const getMembershipDisplayText = () => {
    if (filters.membershipPlan === "all") return "All Plans";
    return (
      filters.membershipPlan.charAt(0).toUpperCase() +
      filters.membershipPlan.slice(1)
    );
  };

  const hasActiveFilters =
    filters.status !== "all" || filters.membershipPlan !== "all" || searchTerm;

  return (
    <Box
      sx={{
        bgcolor: C.surface,
        minHeight: "100vh",
        p: { xs: 2, sm: 2.5, md: 3 },
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: C.text.primary,
              fontSize: { xs: "1.2rem", sm: "1.4rem" },
              mb: 0.25,
            }}
          >
            Client Management
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: C.text.secondary, fontSize: "0.72rem" }}
          >
            Manage customer accounts and memberships
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
          onClick={openAddModal}
          sx={{
            bgcolor: C.primary,
            color: "white",
            fontSize: "0.78rem",
            fontWeight: 600,
            textTransform: "none",
            py: 1,
            px: 2.5,
            borderRadius: 2,
            boxShadow: "none",
            "&:hover": { bgcolor: "#0b3f4f", boxShadow: "none" },
          }}
        >
          Add Customer
        </Button>
      </Box>

      {/* ── Search and Filter row ── */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={1.5} alignItems="center">
          <Grid item xs={12} sm={7}>
            <Paper
              elevation={0}
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 2,
                bgcolor: C.card,
                border: "1px solid",
                borderColor: C.border,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SearchIcon
                sx={{
                  color: C.text.disabled,
                  fontSize: "1.1rem",
                  flexShrink: 0,
                }}
              />
              <TextField
                placeholder="Search customers by name or email..."
                variant="standard"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "0.82rem", py: 0.75, color: C.text.primary },
                }}
              />
              {searchTerm && (
                <IconButton
                  size="small"
                  onClick={() => setSearchTerm("")}
                  sx={{ p: 0.25 }}
                >
                  <CloseIcon
                    sx={{ fontSize: "0.9rem", color: C.text.disabled }}
                  />
                </IconButton>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: { xs: "flex-start", sm: "flex-end" },
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                endIcon={<FilterIcon sx={{ fontSize: "0.9rem" }} />}
                onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                sx={{
                  fontSize: "0.72rem",
                  textTransform: "none",
                  fontWeight: 500,
                  borderColor: C.border,
                  color:
                    filters.status !== "all" ? C.primary : C.text.secondary,
                  borderRadius: 1.5,
                  px: 1.5,
                  bgcolor: filters.status !== "all" ? C.primaryLight : C.card,
                }}
              >
                {getStatusDisplayText()}
              </Button>

              <Button
                variant="outlined"
                size="small"
                endIcon={<FilterIcon sx={{ fontSize: "0.9rem" }} />}
                onClick={(e) => setMembershipAnchorEl(e.currentTarget)}
                sx={{
                  fontSize: "0.72rem",
                  textTransform: "none",
                  fontWeight: 500,
                  borderColor: C.border,
                  color:
                    filters.membershipPlan !== "all"
                      ? C.primary
                      : C.text.secondary,
                  borderRadius: 1.5,
                  px: 1.5,
                  bgcolor:
                    filters.membershipPlan !== "all" ? C.primaryLight : C.card,
                }}
              >
                {getMembershipDisplayText()}
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="text"
                  size="small"
                  onClick={handleClearFilters}
                  sx={{
                    fontSize: "0.7rem",
                    textTransform: "none",
                    color: C.error,
                    minWidth: "auto",
                  }}
                >
                  Clear
                </Button>
              )}

              <Tooltip title="Refresh">
                <IconButton
                  onClick={() => fetchClients()}
                  sx={{
                    bgcolor: C.card,
                    border: "1px solid",
                    borderColor: C.border,
                    borderRadius: 1.5,
                    p: 0.75,
                  }}
                >
                  <RefreshIcon
                    sx={{ color: C.text.secondary, fontSize: "1.05rem" }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* ── Stat Cards ── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statCards.map((s, i) => (
          <Grid item xs={6} sm={3} key={i}>
            <StatCard {...s} loading={loading} />
          </Grid>
        ))}
      </Grid>

      {/* ── Results count ── */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: C.text.secondary, fontSize: "0.7rem" }}
        >
          {loading
            ? "Loading..."
            : `Showing ${clients.length} of ${pagination.total || 0} customers`}
        </Typography>
      </Box>

      {/* ── Client Grid ── */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress sx={{ color: C.primary }} />
        </Box>
      ) : clients.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography variant="h6" sx={{ color: C.text.secondary, mb: 1 }}>
            No customers found
          </Typography>
          <Typography variant="caption" sx={{ color: C.text.disabled }}>
            Try adjusting your search or filters
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {clients.map((client) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={client._id}>
              <ClientCard
                client={client}
                onEdit={openEditModal}
                onDelete={handleToggleStatus}
                onViewDetails={(id) =>
                  navigate(`/admin/clients-details/${id}`, {
                    state: { clientId: id },
                  })
                }
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ── Pagination ── */}
      {pagination.pages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
          <Button
            size="small"
            disabled={pagination.page <= 1 || loading}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            ← Prev
          </Button>
          <Typography
            variant="caption"
            sx={{ alignSelf: "center", color: C.text.secondary }}
          >
            Page {pagination.page} of {pagination.pages}
          </Typography>
          <Button
            size="small"
            disabled={pagination.page >= pagination.pages || loading}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next →
          </Button>
        </Box>
      )}

      {/* ── Filter Menus ── */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
      >
        <MenuItem
          selected={filters.status === "all"}
          onClick={() => handleStatusFilterChange("all")}
        >
          All Status
        </MenuItem>
        <MenuItem
          selected={filters.status === "active"}
          onClick={() => handleStatusFilterChange("active")}
        >
          Active
        </MenuItem>
        <MenuItem
          selected={filters.status === "inactive"}
          onClick={() => handleStatusFilterChange("inactive")}
        >
          Inactive
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={membershipAnchorEl}
        open={Boolean(membershipAnchorEl)}
        onClose={() => setMembershipAnchorEl(null)}
      >
        <MenuItem
          selected={filters.membershipPlan === "all"}
          onClick={() => handleMembershipFilterChange("all")}
        >
          All Plans
        </MenuItem>
        <MenuItem
          selected={filters.membershipPlan === "free"}
          onClick={() => handleMembershipFilterChange("free")}
        >
          Free
        </MenuItem>
        <MenuItem
          selected={filters.membershipPlan === "standard"}
          onClick={() => handleMembershipFilterChange("standard")}
        >
          Standard
        </MenuItem>
        <MenuItem
          selected={filters.membershipPlan === "premium"}
          onClick={() => handleMembershipFilterChange("premium")}
        >
          Premium
        </MenuItem>
        <MenuItem
          selected={filters.membershipPlan === "enterprise"}
          onClick={() => handleMembershipFilterChange("enterprise")}
        >
          Enterprise
        </MenuItem>
      </Menu>

      {/* ── Add/Edit Modal ── */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "94%", sm: 560 },
              maxWidth: "96vw",
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 24,
              p: { xs: 3, sm: 4 },
              maxHeight: "92vh",
              overflowY: "auto",
              outline: "none",
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 3, position: "relative", pr: 5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#1e293b",
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  mb: 0.5,
                }}
              >
                {modalMode === "add"
                  ? "Add New Customer"
                  : `Edit — ${selectedClient?.customerName}`}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  fontSize: "0.75rem",
                  display: "block",
                }}
              >
                {modalMode === "add"
                  ? "Create a new customer account with initial settings"
                  : "Update customer information and subscription details"}
              </Typography>

              {/* Close Button */}
              <IconButton
                onClick={() => setOpenModal(false)}
                size="small"
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  color: "#94a3b8",
                  "&:hover": { color: "#475569", bgcolor: "#f1f5f9" },
                }}
              >
                <CloseIcon sx={{ fontSize: "1.25rem" }} />
              </IconButton>
            </Box>

            <Stack spacing={3}>
              {/* Basic Info */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Customer Name *"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInput}
                    size="small"
                    fullWidth
                    error={!!formErrors.customerName}
                    helperText={formErrors.customerName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInput}
                    size="small"
                    fullWidth
                    disabled={modalMode === "edit"}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
              </Grid>

              {/* Password (only for Add) */}
              {modalMode === "add" && (
                <TextField
                  label="Temporary Password *"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInput}
                  size="small"
                  fullWidth
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              )}

              {/* Plan & Duration */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Membership Plan *</InputLabel>
                    <Select
                      name="membershipPlan"
                      value={formData.membershipPlan}
                      onChange={handleInput}
                      label="Membership Plan *"
                    >
                      <MenuItem value="free">Free — $0/mo</MenuItem>
                      <MenuItem value="standard">Standard — $49/mo</MenuItem>
                      <MenuItem value="premium">Premium — $99/mo</MenuItem>
                      <MenuItem value="enterprise">
                        Enterprise — $299/mo
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label={
                      modalMode === "add" ? "Duration (days) *" : "Extend Days"
                    }
                    name={modalMode === "add" ? "duration" : "extendDays"}
                    type="number"
                    value={
                      formData[modalMode === "add" ? "duration" : "extendDays"]
                    }
                    onChange={handleInput}
                    size="small"
                    fullWidth
                    error={!!formErrors.duration || !!formErrors.extendDays}
                    helperText={formErrors.duration || formErrors.extendDays}
                    InputProps={{ inputProps: { min: 1, max: 365 } }}
                  />
                </Grid>
              </Grid>

              {/* License Limit */}
              <TextField
                label="License Limit (Users) *"
                name="licenseLimit"
                type="number"
                value={formData.licenseLimit}
                onChange={handleInput}
                size="small"
                fullWidth
                error={!!formErrors.licenseLimit}
                helperText={formErrors.licenseLimit}
                InputProps={{ inputProps: { min: 1, max: 1000 } }}
              />

              {/* Contact Info */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInput}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleInput}
                    size="small"
                    fullWidth
                    placeholder="https://example.com"
                  />
                </Grid>
              </Grid>

              {/* Notes */}
              <TextField
                label="Notes"
                name="notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={handleInput}
                size="small"
                fullWidth
                placeholder="Additional notes or special instructions..."
              />

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  pt: 2,
                  borderTop: "1px solid #e2e8f0",
                  mt: 1,
                }}
              >
                <Button
                  variant="text"
                  onClick={() => setOpenModal(false)}
                  disabled={actionLoading}
                  sx={{ textTransform: "none", px: 3 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={actionLoading}
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: "#0d4a5c",
                    "&:hover": { bgcolor: "#0b3f4f" },
                    textTransform: "none",
                    px: 4,
                    fontWeight: 500,
                  }}
                >
                  {actionLoading ? (
                    <CircularProgress size={18} sx={{ color: "white" }} />
                  ) : modalMode === "add" ? (
                    "Create Customer"
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Modal>

      {/* ── Toast ── */}
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
          sx={{ fontSize: "0.78rem", borderRadius: 2 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

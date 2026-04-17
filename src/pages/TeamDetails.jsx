// pages/admin/TeamMemberDetails.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Button,
  IconButton,
  Divider,
  Stack,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarTodayIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useTeam } from "../context/TeamContext";

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
      return {
        bg: C.successLight,
        color: C.success,
        icon: <CheckCircleIcon sx={{ fontSize: 12 }} />,
      };
    case "inactive":
      return {
        bg: C.errorLight,
        color: C.error,
        icon: <WarningIcon sx={{ fontSize: 12 }} />,
      };
    default:
      return {
        bg: C.border,
        color: C.text.disabled,
        icon: <PendingIcon sx={{ fontSize: 12 }} />,
      };
  }
};

const getPerformanceColor = (score) => {
  if (score >= 80) return C.success;
  if (score >= 60) return C.primary;
  if (score >= 40) return C.warning;
  return C.error;
};

const DetailStatCard = ({ title, value, icon, color }) => (
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
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: color || C.text.primary,
          fontSize: "1.2rem",
        }}
      >
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const DetailsSkeleton = () => (
  <Box
    sx={{
      bgcolor: C.surface,
      minHeight: "100vh",
      p: { xs: 1.5, sm: 2, md: 2.5 },
    }}
  >
    <Container maxWidth="lg">
      <Paper sx={{ p: 2, mb: 2.5, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Skeleton variant="circular" width={56} height={56} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width={180} height={28} />
            <Skeleton variant="text" width={250} height={18} />
          </Box>
        </Box>
      </Paper>
      <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={6} sm={3} key={i}>
            <Skeleton variant="rounded" height={80} />
          </Grid>
        ))}
      </Grid>
      <Skeleton variant="rounded" height={180} sx={{ mb: 2.5 }} />
      <Skeleton variant="rounded" height={250} />
    </Container>
  </Box>
);

export default function TeamMemberDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    selectedMemberDetails,
    loading,
    actionLoading,
    fetchTeamMemberDetails,
    updateTeamMember,
    deleteTeamMember,
    formatDate,
    formatDateTime,
  } = useTeam();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    teamRole: "",
    department: "",
    location: "",
    phone: "",
    bio: "",
    status: "",
  });
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (id) fetchTeamMemberDetails(id);
  }, [id, fetchTeamMemberDetails]);
  useEffect(() => {
    if (selectedMemberDetails)
      setEditForm({
        teamRole:
          selectedMemberDetails.teamRole || selectedMemberDetails.role || "",
        department: selectedMemberDetails.department || "",
        location: selectedMemberDetails.location || "",
        phone: selectedMemberDetails.phone || "",
        bio: selectedMemberDetails.bio || "",
        status: selectedMemberDetails.status || "active",
      });
  }, [selectedMemberDetails]);

  const showToast = (msg, sev = "success") =>
    setToast({ open: true, message: msg, severity: sev });
  const closeToast = () => setToast((prev) => ({ ...prev, open: false }));

  const handleEdit = async () => {
    const result = await updateTeamMember(id, editForm);
    if (result.success) {
      showToast(result.message);
      setEditDialogOpen(false);
      await fetchTeamMemberDetails(id);
    } else showToast(result.error, "error");
  };

  const handleDelete = async () => {
    const result = await deleteTeamMember(id, true);
    if (result.success) {
      showToast(result.message);
      setDeleteDialogOpen(false);
      setTimeout(() => navigate("/admin/team"), 1500);
    } else showToast(result.error, "error");
  };

  if (loading && !selectedMemberDetails) return <DetailsSkeleton />;
  if (!selectedMemberDetails && !loading)
    return (
      <Box
        sx={{
          bgcolor: C.surface,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            Team member not found
          </Typography>
          <Button
            onClick={() => navigate("/admin/team")}
            variant="contained"
            sx={{ mt: 2, fontSize: "0.75rem" }}
          >
            Back to Team
          </Button>
        </Paper>
      </Box>
    );

  const statusStyle = getStatusColor(selectedMemberDetails?.status);
  const initials =
    selectedMemberDetails?.firstName && selectedMemberDetails?.lastName
      ? `${selectedMemberDetails.firstName.charAt(0)}${selectedMemberDetails.lastName.charAt(0)}`.toUpperCase()
      : selectedMemberDetails?.email?.charAt(0).toUpperCase() || "?";
  const stats = selectedMemberDetails?.stats || {};
  const performanceScore = stats.performanceScore || 0;
  const performanceColor = getPerformanceColor(performanceScore);

  return (
    <Box
      sx={{
        bgcolor: C.surface,
        minHeight: "100vh",
        p: { xs: 1.5, sm: 2, md: 2.5 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}>
        {/* Header Card */}
        <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 2.5, borderRadius: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap",
              mb: 1.5,
            }}
          >
            <IconButton
              onClick={() => navigate("/admin/team")}
              sx={{ bgcolor: C.primaryLight, p: 0.75 }}
            >
              <ArrowBackIcon sx={{ color: C.primary, fontSize: "1rem" }} />
            </IconButton>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: C.primary,
                fontSize: "1.3rem",
                fontWeight: 700,
              }}
            >
              {initials}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: C.text.primary,
                    fontSize: "1.1rem",
                  }}
                >
                  {selectedMemberDetails?.firstName}{" "}
                  {selectedMemberDetails?.lastName}
                </Typography>
                <Chip
                  icon={statusStyle.icon}
                  label={selectedMemberDetails?.status?.toUpperCase()}
                  size="small"
                  sx={{
                    bgcolor: statusStyle.bg,
                    color: statusStyle.color,
                    fontWeight: 600,
                    height: 22,
                    fontSize: "0.6rem",
                  }}
                />
                <Chip
                  label={
                    selectedMemberDetails?.roleDisplay ||
                    selectedMemberDetails?.teamRole ||
                    selectedMemberDetails?.role
                  }
                  size="small"
                  sx={{
                    bgcolor: C.primaryLight,
                    color: C.primary,
                    fontWeight: 600,
                    height: 22,
                    fontSize: "0.6rem",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <EmailIcon
                    sx={{ fontSize: "0.75rem", color: C.text.disabled }}
                  />
                  <Typography variant="caption" sx={{ fontSize: "0.68rem" }}>
                    {selectedMemberDetails?.email}
                  </Typography>
                </Box>
                {selectedMemberDetails?.phone && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PhoneIcon
                      sx={{ fontSize: "0.75rem", color: C.text.disabled }}
                    />
                    <Typography variant="caption" sx={{ fontSize: "0.68rem" }}>
                      {selectedMemberDetails?.phone}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon sx={{ fontSize: "0.85rem" }} />}
                onClick={() => setEditDialogOpen(true)}
                size="small"
                sx={{
                  textTransform: "none",
                  bgcolor: C.primary,
                  fontSize: "0.7rem",
                  py: 0.5,
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon sx={{ fontSize: "0.85rem" }} />}
                onClick={() => setDeleteDialogOpen(true)}
                size="small"
                sx={{
                  textTransform: "none",
                  color: C.error,
                  borderColor: C.error,
                  fontSize: "0.7rem",
                  py: 0.5,
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <WorkIcon sx={{ fontSize: "0.85rem", color: C.primary }} />
              <Typography variant="caption" sx={{ fontSize: "0.68rem" }}>
                {selectedMemberDetails?.department || "No department"}
              </Typography>
            </Box>
            {selectedMemberDetails?.location && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <LocationOnIcon
                  sx={{ fontSize: "0.85rem", color: C.primary }}
                />
                <Typography variant="caption" sx={{ fontSize: "0.68rem" }}>
                  {selectedMemberDetails?.location}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <CalendarTodayIcon
                sx={{ fontSize: "0.85rem", color: C.primary }}
              />
              <Typography variant="caption" sx={{ fontSize: "0.68rem" }}>
                Joined {formatDate(selectedMemberDetails?.joinDate)}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Stats Grid */}
        <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
          <Grid item xs={6} sm={3}>
            <DetailStatCard
              title="Total Inspections"
              value={stats.totalInspections || 0}
              icon={<AssignmentIcon sx={{ fontSize: 16, color: C.primary }} />}
              color={C.primary}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <DetailStatCard
              title="Assigned Tasks"
              value={stats.assignedCount || 0}
              icon={<PendingIcon sx={{ fontSize: 16, color: C.warning }} />}
              color={C.warning}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <DetailStatCard
              title="Completion Rate"
              value={`${stats.completionRate || 0}%`}
              icon={<CheckCircleIcon sx={{ fontSize: 16, color: C.success }} />}
              color={C.success}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <DetailStatCard
              title="Performance Score"
              value={`${performanceScore}%`}
              icon={
                <TrendingUpIcon
                  sx={{ fontSize: 16, color: performanceColor }}
                />
              }
              color={performanceColor}
            />
          </Grid>
        </Grid>

        {/* Performance Bar */}
        <Paper sx={{ p: 2, mb: 2.5, borderRadius: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 1.5, fontSize: "0.75rem" }}
          >
            Performance Overview
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography variant="caption" sx={{ fontSize: "0.62rem" }}>
                  Overall Performance
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: performanceColor,
                    fontSize: "0.62rem",
                  }}
                >
                  {performanceScore}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={performanceScore}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: C.border,
                  "& .MuiLinearProgress-bar": { bgcolor: performanceColor },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  sx={{
                    fontSize: 16,
                    color:
                      star <= Math.round(performanceScore / 20)
                        ? "#fbbf24"
                        : C.border,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Bio Section */}
        {selectedMemberDetails?.bio && (
          <Paper sx={{ p: 2, mb: 2.5, borderRadius: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, mb: 1, fontSize: "0.75rem" }}
            >
              About
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: C.text.secondary,
                lineHeight: 1.6,
                fontSize: "0.7rem",
              }}
            >
              {selectedMemberDetails?.bio}
            </Typography>
          </Paper>
        )}

        {/* Last Activity */}
        <Box
          sx={{
            mt: 2.5,
            pt: 1.5,
            textAlign: "center",
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: C.text.disabled, fontSize: "0.6rem" }}
          >
            Last active:{" "}
            {formatDateTime(
              selectedMemberDetails?.lastActiveAt ||
                selectedMemberDetails?.lastLoginDate,
            )}
          </Typography>
        </Box>
      </Container>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ borderBottom: `1px solid ${C.border}`, pb: 1.5, pt: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
              Edit Team Member
            </Typography>
            <IconButton size="small" onClick={() => setEditDialogOpen(false)}>
              <CloseIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "0.7rem" }}>Team Role</InputLabel>
              <Select
                value={editForm.teamRole}
                onChange={(e) =>
                  setEditForm({ ...editForm, teamRole: e.target.value })
                }
                label="Team Role"
                sx={{ fontSize: "0.7rem" }}
              >
                <MenuItem value="lead_inspector" sx={{ fontSize: "0.7rem" }}>
                  Lead Inspector
                </MenuItem>
                <MenuItem value="senior_inspector" sx={{ fontSize: "0.7rem" }}>
                  Senior Inspector
                </MenuItem>
                <MenuItem value="inspector" sx={{ fontSize: "0.7rem" }}>
                  Inspector
                </MenuItem>
                <MenuItem value="trainee" sx={{ fontSize: "0.7rem" }}>
                  Trainee
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Department"
              value={editForm.department}
              onChange={(e) =>
                setEditForm({ ...editForm, department: e.target.value })
              }
              size="small"
              fullWidth
              InputLabelProps={{ sx: { fontSize: "0.7rem" } }}
              sx={{ "& .MuiInputBase-input": { fontSize: "0.7rem" } }}
            />
            <TextField
              label="Location"
              value={editForm.location}
              onChange={(e) =>
                setEditForm({ ...editForm, location: e.target.value })
              }
              size="small"
              fullWidth
              InputLabelProps={{ sx: { fontSize: "0.7rem" } }}
              sx={{ "& .MuiInputBase-input": { fontSize: "0.7rem" } }}
            />
            <TextField
              label="Phone"
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
              size="small"
              fullWidth
              InputLabelProps={{ sx: { fontSize: "0.7rem" } }}
              sx={{ "& .MuiInputBase-input": { fontSize: "0.7rem" } }}
            />
            <TextField
              label="Bio"
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
              multiline
              rows={3}
              size="small"
              fullWidth
              InputLabelProps={{ sx: { fontSize: "0.7rem" } }}
              sx={{ "& .MuiInputBase-input": { fontSize: "0.7rem" } }}
              placeholder="Tell us about the team member..."
            />
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "0.7rem" }}>Status</InputLabel>
              <Select
                value={editForm.status}
                onChange={(e) =>
                  setEditForm({ ...editForm, status: e.target.value })
                }
                label="Status"
                sx={{ fontSize: "0.7rem" }}
              >
                <MenuItem value="active" sx={{ fontSize: "0.7rem" }}>
                  Active
                </MenuItem>
                <MenuItem value="inactive" sx={{ fontSize: "0.7rem" }}>
                  Inactive
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{ p: 2, pt: 1.5, borderTop: `1px solid ${C.border}` }}
        >
          <Button
            onClick={() => setEditDialogOpen(false)}
            disabled={actionLoading}
            sx={{ fontSize: "0.7rem" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEdit}
            variant="contained"
            disabled={actionLoading}
            sx={{ bgcolor: C.primary, fontSize: "0.7rem", py: 0.5 }}
          >
            {actionLoading ? <CircularProgress size={18} /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1, pt: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: C.error, fontSize: "1rem" }}
          >
            Delete Team Member
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            sx={{ color: C.text.secondary, fontSize: "0.7rem" }}
          >
            Are you sure you want to permanently delete{" "}
            <strong>
              {selectedMemberDetails?.firstName}{" "}
              {selectedMemberDetails?.lastName}
            </strong>
            ? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={actionLoading}
            sx={{ fontSize: "0.7rem" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            disabled={actionLoading}
            sx={{ bgcolor: C.error, fontSize: "0.7rem", py: 0.5 }}
          >
            {actionLoading ? (
              <CircularProgress size={18} />
            ) : (
              "Delete Permanently"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast */}
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
    </Box>
  );
}

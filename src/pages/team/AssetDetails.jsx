import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  IconButton,
  Paper,
  Grid,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LinkIcon from "@mui/icons-material/Link";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: { main: "#0d3d56" },
    background: { default: "#f0f2f0", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
          border: "1px solid #e5e7e5",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, borderRadius: 8 },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, fontSize: "0.75rem" } },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.875rem",
          color: "#555",
          "&.Mui-selected": { color: "#1a1a1a", fontWeight: 600 },
          minHeight: 40,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: "#1a1a1a",
          fontSize: "0.875rem",
          borderBottom: "1px solid #eee",
          py: 1.5,
        },
        body: {
          fontSize: "0.875rem",
          color: "#1a1a1a",
          borderBottom: "1px solid #f0f0f0",
        },
      },
    },
  },
});

// ── Data ──────────────────────────────────────────────────────────────────────
const INSPECTION_HISTORY = [
  {
    date: "10/28/2024",
    inspector: "Mike Johnson",
    status: "passed",
    score: "95%",
    notes: "All systems operational",
  },
  {
    date: "9/28/2024",
    inspector: "Sarah Wilson",
    status: "passed",
    score: "92%",
    notes: "Minor wear on tires",
  },
  {
    date: "8/28/2024",
    inspector: "Mike Johnson",
    status: "warning",
    score: "85%",
    notes: "Hydraulic fluid low",
  },
  {
    date: "7/28/2024",
    inspector: "Tom Brown",
    status: "passed",
    score: "94%",
    notes: "Excellent condition",
  },
];

const CHILD_ASSETS = [
  {
    id: 1,
    name: "Control Unit CU-100",
    serial: "CTL100-2024-0034",
    category: "Electronics",
    location: "Warehouse B – Bay 1",
  },
  {
    id: 2,
    name: "Tire Set TS-300",
    serial: "TIR300-2024-0156",
    category: "Wheels & Tires",
    location: "Warehouse A – Bay 5",
  },
  {
    id: 3,
    name: "Fork Assembly FA-400",
    serial: "FRK400-2024-0023",
    category: "Attachments",
    location: "Warehouse A – Bay 3",
  },
];

// ── Status chip ───────────────────────────────────────────────────────────────
function StatusChip({ status }) {
  const styles = {
    passed: { bgcolor: "#e8f5e9", color: "#2e7d32" },
    warning: { bgcolor: "#fff8e1", color: "#f59e0b" },
    failed: { bgcolor: "#fdecea", color: "#c62828" },
  };
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.4,
        borderRadius: 99,
        fontSize: "0.75rem",
        fontWeight: 600,
        ...styles[status],
      }}
    >
      {status}
    </Box>
  );
}

// ── Info tile (Last / Next / Days) ────────────────────────────────────────────
function InspectionTile({ icon, label, value }) {
  return (
    <Paper sx={{ p: 2.5, flex: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        {icon}
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
      <Typography
        variant="h6"
        sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a1a1a" }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

// ── Info row in Asset Information ─────────────────────────────────────────────
function InfoRow({ icon, label, children }) {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
      <Avatar sx={{ bgcolor: "#f0f2f0", width: 40, height: 40 }}>{icon}</Avatar>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

// ── Link Assets Modal ─────────────────────────────────────────────────────────
function LinkAssetsModal({ open, onClose, navigate }) {
  const [tab, setTab] = useState(0); // 0=Link Existing, 1=Add New
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([1]); // Control Unit pre-selected

  const filtered = CHILD_ASSETS.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.serial.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          border: "1px solid #e5e7e5",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          pb: 0,
          pt: 2.5,
          px: 3,
        }}
      >
        <Inventory2OutlinedIcon sx={{ color: "#0d3d56", fontSize: 22 }} />
        <Typography fontWeight={700} fontSize="1rem">
          Link Child Assets
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ ml: "auto", color: "#888" }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2, pb: 0 }}>
        {/* Toggle tabs */}
        <Box
          sx={{
            bgcolor: "#f0f2f0",
            borderRadius: 2,
            p: 0.5,
            display: "flex",
            mb: 2.5,
          }}
        >
          <Button
            fullWidth
            size="small"
            onClick={() => setTab(0)}
            startIcon={<SearchIcon fontSize="small" />}
            sx={{
              borderRadius: 1.5,
              py: 1,
              fontSize: "0.82rem",
              bgcolor: tab === 0 ? "#fff" : "transparent",
              color: "#1a1a1a",
              boxShadow: tab === 0 ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
              fontWeight: tab === 0 ? 600 : 400,
              "&:hover": { bgcolor: tab === 0 ? "#fff" : "#e8eae8" },
            }}
          >
            Link Existing
          </Button>
          <Button
            fullWidth
            size="small"
            onClick={() => setTab(1)}
            startIcon={<AddIcon fontSize="small" />}
            sx={{
              borderRadius: 1.5,
              py: 1,
              fontSize: "0.82rem",
              bgcolor: tab === 1 ? "#fff" : "transparent",
              color: "#1a1a1a",
              boxShadow: tab === 1 ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
              fontWeight: tab === 1 ? 600 : 400,
              "&:hover": { bgcolor: tab === 1 ? "#fff" : "#e8eae8" },
            }}
          >
            + Add New Assets
          </Button>
        </Box>

        {/* ── Tab 0: Link Existing ── */}
        {tab === 0 && (
          <>
            <TextField
              fullWidth
              size="small"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#aaa", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#fafafa",
                },
              }}
            />
            <Stack spacing={1.25} sx={{ mb: 1 }}>
              {filtered.map((asset) => {
                const isSelected = selected.includes(asset.id);
                return (
                  <Box
                    key={asset.id}
                    onClick={() => toggle(asset.id)}
                    sx={{
                      border: `1.5px solid ${isSelected ? "#0d3d56" : "#e5e7e5"}`,
                      borderRadius: 2,
                      p: 1.75,
                      cursor: "pointer",
                      bgcolor: isSelected ? "#eaf1f5" : "#fff",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      transition: "all 0.15s",
                      "&:hover": { borderColor: "#0d3d56", bgcolor: "#eaf1f5" },
                    }}
                  >
                    <Box>
                      <Typography fontWeight={700} fontSize="0.875rem">
                        {asset.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ mb: 0.75 }}
                      >
                        {asset.serial}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Chip
                          label={asset.category}
                          size="small"
                          sx={{
                            bgcolor: "#f0f2f0",
                            color: "#444",
                            fontSize: "0.7rem",
                            height: 20,
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {asset.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        border: `1.5px solid ${isSelected ? "#0d3d56" : "#ccc"}`,
                        bgcolor: isSelected ? "#0d3d56" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        mt: 0.25,
                      }}
                    >
                      {isSelected && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: "#fff",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </>
        )}

        {/* ── Tab 1: Add New ── */}
        {tab === 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 4,
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "#e8eaf0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon sx={{ fontSize: 32, color: "#555" }} />
            </Box>
            <Typography fontWeight={700} fontSize="1rem">
              Add New Asset
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Create a new asset to add to your inventory
            </Typography>
            <Button
              onClick={() => {
                onClose();
                navigate('/team/add-asset');
              }}
              variant="contained"
              sx={{
                bgcolor: "#0d3d56",
                px: 4,
                py: 1.25,
                borderRadius: 2,
                "&:hover": { bgcolor: "#0a2f42" },
              }}
            >
              + Create Asset
            </Button>
          </Box>
        )}
      </DialogContent>

      {/* Footer */}
      <DialogActions
        sx={{ px: 3, pb: 2.5, pt: 1.5, justifyContent: "space-between" }}
      >
        {tab === 0 ? (
          <>
            <Typography variant="body2" color="text.secondary">
              {selected.length} asset{selected.length !== 1 ? "s" : ""} selected
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{
                  borderColor: "#ddd",
                  color: "#333",
                  "&:hover": { borderColor: "#aaa" },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#0d3d56", "&:hover": { bgcolor: "#0a2f42" } }}
                onClick={() => {
                  alert(`Linked ${selected.length} asset(s) successfully!`);
                  onClose();
                }}
              >
                Link ({selected.length}) Assets
              </Button>
            </Box>
          </>
        ) : (
          <Button onClick={() => setTab(0)} sx={{ color: "#555", ml: "auto" }}>
            Back to Search
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AssetDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate('/team/assets');
  };

  const handleEditClick = () => {
    navigate('/team/edit-asset');
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      // Add delete logic here
      console.log('Asset deleted');
      navigate('/team/assets');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#f0f2f0", minHeight: "100vh", p: { xs: 2, md: 3 } }}>
        {/* ── Header ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton 
              onClick={handleBackClick} 
              size="small" 
              sx={{ color: "#0d3d56" }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                <Typography fontWeight={700} fontSize="1.25rem" color="#1a1a1a">
                  Forklift Model X-200
                </Typography>
                <Chip
                  label="operational"
                  size="small"
                  sx={{
                    bgcolor: "#e8f5e9",
                    color: "#2e7d32",
                    border: "1px solid #a5d6a7",
                    fontSize: "0.72rem",
                  }}
                />
                <Chip
                  label="Critical"
                  size="small"
                  sx={{
                    bgcolor: "#fdecea",
                    color: "#c62828",
                    border: "1px solid #ef9a9a",
                    fontSize: "0.72rem",
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Serial: FLX200-2024-0123
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              startIcon={<LinkIcon />}
              sx={{
                bgcolor: "#0d3d56",
                borderRadius: 2,
                px: 2.5,
                py: 1,
                "&:hover": { bgcolor: "#0a2f42" },
              }}
            >
              Link Assets
            </Button>
            <Button
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={handleEditClick}
              sx={{
                borderColor: "#ccc",
                color: "#333",
                borderRadius: 2,
                px: 2,
                py: 1,
                "&:hover": { borderColor: "#888" },
              }}
            >
              Edit Asset
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleDeleteClick}
              sx={{
                borderColor: "#ef9a9a",
                color: "#c62828",
                borderRadius: 2,
                px: 2,
                py: 1,
                "&:hover": { borderColor: "#c62828", bgcolor: "#fdecea" },
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>

        {/* ── Top cards ── */}
        <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
          {/* Image + Health */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ overflow: "hidden", p: 0 }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop"
                alt="Forklift warehouse"
                sx={{ width: "100%", height: 220, objectFit: "cover" }}
              />
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Health Score
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="#0d3d56">
                    87%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={87}
                  sx={{
                    height: 7,
                    borderRadius: 4,
                    bgcolor: "#d8dfe6",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#0d3d56",
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Asset Information + Tiles */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 2 }}>
              <Typography fontWeight={600} fontSize="1rem" sx={{ mb: 2.5 }}>
                Asset Information
              </Typography>
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={6}>
                  <InfoRow
                    icon={
                      <Inventory2OutlinedIcon
                        sx={{ color: "#555", fontSize: 20 }}
                      />
                    }
                    label="Category"
                  >
                    <Typography fontWeight={600} fontSize="0.95rem">
                      Material Handling
                    </Typography>
                  </InfoRow>
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoRow
                    icon={
                      <LocationOnOutlinedIcon
                        sx={{ color: "#555", fontSize: 20 }}
                      />
                    }
                    label="Location"
                  >
                    <Typography fontWeight={600} fontSize="0.95rem">
                      Warehouse A – Bay 3
                    </Typography>
                  </InfoRow>
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoRow
                    icon={
                      <PersonOutlineIcon sx={{ color: "#555", fontSize: 20 }} />
                    }
                    label="Assigned To"
                  >
                    <Typography fontWeight={600} fontSize="0.95rem">
                      Mike Johnson (Primary Member)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Louis Boxer (Secondary Member)
                    </Typography>
                  </InfoRow>
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoRow
                    icon={
                      <CalendarMonthOutlinedIcon
                        sx={{ color: "#555", fontSize: 20 }}
                      />
                    }
                    label="Purchase Date"
                  >
                    <Typography fontWeight={600} fontSize="0.95rem">
                      1/15/2024
                    </Typography>
                  </InfoRow>
                </Grid>
              </Grid>
            </Paper>

            {/* Inspection tiles */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <InspectionTile
                icon={
                  <CheckCircleOutlineIcon
                    sx={{ color: "#2e7d32", fontSize: 20 }}
                  />
                }
                label="Last Inspection"
                value="10/28/2024"
              />
              <InspectionTile
                icon={
                  <AccessTimeIcon sx={{ color: "#1565c0", fontSize: 20 }} />
                }
                label="Next Inspection"
                value="11/28/2024"
              />
              <InspectionTile
                icon={
                  <WarningAmberIcon sx={{ color: "#f59e0b", fontSize: 20 }} />
                }
                label="Days Until Due"
                value="27 days"
              />
            </Box>
          </Grid>
        </Grid>

        {/* ── Tabs ── */}
        <Paper sx={{ p: 0, overflow: "hidden" }}>
          <Box sx={{ borderBottom: "none" }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              sx={{
                px: 2,
                pt: 0.5,
                "& .MuiTabs-indicator": { backgroundColor: "#0d3d56" },
                bgcolor: "#f5f5f5",
                borderRadius: "12px 12px 0 0",
              }}
            >
              {[
                "Inspection History",
                "Maintenance Schedule",
                "Documents",
                "Specifications",
              ].map((t) => (
                <Tab key={t} label={t} />
              ))}
            </Tabs>
          </Box>

          {/* Inspection History Table */}
          {activeTab === 0 && (
            <TableContainer
              sx={{ bgcolor: "#fff", borderRadius: "0 0 12px 12px" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {[
                      "Date",
                      "Inspector",
                      "Status",
                      "Score",
                      "Notes",
                      "Actions",
                    ].map((h) => (
                      <TableCell
                        key={h}
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          color: "#1a1a1a",
                          py: 2,
                        }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {INSPECTION_HISTORY.map((row, i) => (
                    <TableRow key={i} sx={{ "&:last-child td": { border: 0 } }}>
                      <TableCell sx={{ py: 2.5 }}>{row.date}</TableCell>
                      <TableCell>{row.inspector}</TableCell>
                      <TableCell>
                        <StatusChip status={row.status} />
                      </TableCell>
                      <TableCell>{row.score}</TableCell>
                      <TableCell sx={{ color: "#888" }}>{row.notes}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: "#ddd",
                            color: "#333",
                            borderRadius: 99,
                            fontSize: "0.75rem",
                            "&:hover": { borderColor: "#888" },
                          }}
                        >
                          View Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {activeTab !== 0 && (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary" variant="body2">
                No data available for this section.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {/* ── Modal ── */}
      <LinkAssetsModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        navigate={navigate}
      />
    </ThemeProvider>
  );
}
import { useState } from "react";
import {
  Box, Typography, Button, IconButton, Card, CardContent,
  InputAdornment, TextField, Chip, Menu, MenuItem,
  Grid, Divider, useMediaQuery, AppBar, Toolbar, Paper
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddIcon from "@mui/icons-material/Add";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import HomeIcon from "@mui/icons-material/Home";

const theme = createTheme({
  palette: { 
    primary: { main: "#1a4a6b" }, 
    background: { default: "#f8fafc" } 
  },
  typography: { 
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 13,
    h6: { fontSize: "1rem", fontWeight: 700 },
    body1: { fontSize: "0.875rem" },
    body2: { fontSize: "0.75rem" },
    caption: { fontSize: "0.6875rem" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { 
          borderRadius: 20, 
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)", 
          border: "1px solid #eef2f6" 
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          "& fieldset": { borderColor: "#e2e8f0" },
          "&:hover fieldset": { borderColor: "#cbd5e1" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.75rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "0.6875rem",
          height: 24,
        },
      },
    },
  },
});

const statusChip = {
  Operational: { bg: "#e6f7e6", color: "#2e7d32" },
  "Under Inspection": { bg: "#fff3e0", color: "#ed6c02" },
  Maintenance: { bg: "#ffebee", color: "#d32f2f" },
};

const assets = [
  {
    id: 1, name: "Generator Unit A-12", location: "Building A Floor 3",
    status: "Operational", category: "Electrical",
    lastInspection: "2024-10-28", nextDue: "2024-11-28", duePrimary: true,
  },
  {
    id: 2, name: "HVAC System B-04", location: "Building B - Rooftop",
    status: "Under Inspection", category: "HVAC",
    lastInspection: "2024-10-25", nextDue: "2024-11-25", duePrimary: true,
  },
  {
    id: 3, name: "Conveyor Belt C-21", location: "Warehouse Section C",
    status: "Maintenance", category: "Machinery",
    lastInspection: "2024-10-20", nextDue: "2024-11-20",
  },
  {
    id: 4, name: "Pump Station D-07", location: "Building D - Basement",
    status: "Operational", category: "Plumbing",
    lastInspection: "2024-10-30", nextDue: "2024-11-30", duePrimary: true,
  },
  {
    id: 5, name: "Compressor E-15", location: "Building E-Floor 1",
    status: "Operational", category: "Machinery",
    lastInspection: "2024-10-26", nextDue: "2024-11-26", duePrimary: true,
  },
  {
    id: 6, name: "Fire Panel F-02", location: "Building F - Lobby",
    status: "Operational", category: "Safety",
    lastInspection: "2024-10-29", nextDue: "2024-11-29", duePrimary: true,
  },
];

function StatusBadge({ status }) {
  const s = statusChip[status] || { bg: "#e2e8f0", color: "#475569" };
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: s.bg, 
        color: s.color, 
        fontWeight: 600, 
        fontSize: "0.625rem",
        borderRadius: "12px", 
        height: 22,
      }}
    />
  );
}

function AssetCard({ asset }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Card sx={{ 
      height: "100%",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }
    }}>
      <CardContent sx={{ p: isMobile ? 2 : 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1, mb: 1 }}>
          <Typography 
            variant="subtitle1" 
            fontWeight={700} 
            sx={{ 
              color: "#0f172a", 
              fontSize: isMobile ? "0.875rem" : "0.9375rem",
              lineHeight: 1.3,
              flex: 1
            }}
          >
            {asset.name}
          </Typography>
          <StatusBadge status={asset.status} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <LocationOnOutlinedIcon sx={{ fontSize: 12, color: "#94a3b8" }} />
          <Typography variant="caption" sx={{ color: "#64748b" }}>
            {asset.location}
          </Typography>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>Category:</Typography>
            <Typography variant="caption" fontWeight={600} sx={{ color: "#1a4a6b" }}>
              {asset.category}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>Last Inspection:</Typography>
            <Typography variant="caption" fontWeight={500} sx={{ color: "#1e293b" }}>
              {asset.lastInspection}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>Next Due:</Typography>
            <Typography 
              variant="caption" 
              fontWeight={700} 
              sx={{ color: asset.duePrimary ? "#1a4a6b" : "#1e293b" }}
            >
              {asset.nextDue}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function AssetListItem({ asset }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const handleViewAsset = () => {
    window.location.href = `/super_admin/assets/${asset.id}`;
  };
  
  return (
    <Card sx={{ mb: 1.5 }}>
      <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
        <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2, alignItems: isMobile ? "flex-start" : "center" }}>
          <Box sx={{ flex: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 0.5 }}>
              <Typography variant="body2" fontWeight={700} sx={{ color: "#0f172a" }}>
                {asset.name}
              </Typography>
              <StatusBadge status={asset.status} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 12, color: "#94a3b8" }} />
              <Typography variant="caption" sx={{ color: "#64748b" }}>
                {asset.location}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", flex: 3, gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ minWidth: 100 }}>
              <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>Category</Typography>
              <Typography variant="caption" fontWeight={600} sx={{ color: "#1a4a6b" }}>
                {asset.category}
              </Typography>
            </Box>
            <Box sx={{ minWidth: 100 }}>
              <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>Last Inspection</Typography>
              <Typography variant="caption" sx={{ color: "#1e293b" }}>
                {asset.lastInspection}
              </Typography>
            </Box>
            <Box sx={{ minWidth: 100 }}>
              <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>Next Due</Typography>
              <Typography 
                variant="caption" 
                fontWeight={700} 
                sx={{ color: asset.duePrimary ? "#1a4a6b" : "#1e293b" }}
              >
                {asset.nextDue}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ fontSize: "0.6875rem", px: 1.5 }}
              onClick={handleViewAsset}
            >
              View
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function AssetsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [statusAnchor, setStatusAnchor] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const filtered = assets.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
                         a.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "Category" || a.category === selectedCategory;
    const matchStatus = selectedStatus === "Status" || a.status === selectedStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const handleBackClick = () => {
    window.location.href = "/super_admin/clients-details";
  };

  const handleCloneAsset = () => {
    // Navigate to clone asset page with query param to indicate clone mode
    window.location.href = "/super_admin/assets/clone";
  };

  const handleAddAsset = () => {
    // Navigate to add new asset page
    window.location.href = "/super_admin/assets/add";
  };

  const clearFilters = () => {
    setSelectedCategory("Category");
    setSelectedStatus("Status");
    setSearch("");
  };

  const hasActiveFilters = selectedCategory !== "Category" || selectedStatus !== "Status" || search !== "";

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", pb: 4 }}>
        {/* Mobile Header */}
        {isMobile && (
          <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: "white", borderBottom: "1px solid #eef2f6" }}>
            <Toolbar sx={{ px: 2, minHeight: 56 }}>
              <IconButton onClick={handleBackClick} sx={{ mr: 1 }}>
                <ArrowBackIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#0f172a" }}>
                  Assets
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748b" }}>
                  Tech Fow Inc
                </Typography>
              </Box>
              <IconButton size="small" sx={{ bgcolor: "#f1f5f9" }} onClick={handleAddAsset}>
                <AddIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}

        <Box sx={{ p: isMobile ? 2 : 3 }}>
          {/* Desktop Header */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <IconButton 
                  onClick={handleBackClick}
                  sx={{ bgcolor: "white", border: "1px solid #e2e8f0", borderRadius: 2 }}
                >
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ color: "#0f172a" }}>
                    Assets - Tech Fow Inc
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Manage and track all equipment and machinery
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Button
                  variant="contained"
                  startIcon={<ContentCopyIcon sx={{ fontSize: 16 }} />}
                  sx={{ bgcolor: "#1a4a6b", "&:hover": { bgcolor: "#153d5c" } }}
                  onClick={handleCloneAsset}
                >
                  Clone Asset
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{ borderColor: "#1a4a6b", color: "#1a4a6b" }}
                  onClick={handleAddAsset}
                >
                  Add Asset
                </Button>
              </Box>
            </Box>
          )}

          {/* Search & Filter Bar */}
          <Card sx={{ mb: 2 }}>
            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
              <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 1.5 }}>
                <TextField
                  placeholder="Search by name or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#94a3b8", fontSize: 18 }} />
                      </InputAdornment>
                    ),
                    endAdornment: search && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearch("")}>
                          <CloseIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                {!isMobile && (
                  <>
                    <Button
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => setCategoryAnchor(e.currentTarget)}
                      sx={{ 
                        textTransform: "none", 
                        color: "#475569", 
                        fontWeight: 500, 
                        borderRadius: 2, 
                        px: 2, 
                        border: "1px solid #e2e8f0", 
                        bgcolor: "white",
                        whiteSpace: "nowrap",
                        fontSize: "0.75rem"
                      }}
                    >
                      {selectedCategory}
                    </Button>
                    
                    <Button
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => setStatusAnchor(e.currentTarget)}
                      sx={{ 
                        textTransform: "none", 
                        color: "#475569", 
                        fontWeight: 500, 
                        borderRadius: 2, 
                        px: 2, 
                        border: "1px solid #e2e8f0", 
                        bgcolor: "white",
                        whiteSpace: "nowrap",
                        fontSize: "0.75rem"
                      }}
                    >
                      {selectedStatus}
                    </Button>
                    
                    <Box sx={{ display: "flex", border: "1px solid #e2e8f0", borderRadius: 2, overflow: "hidden" }}>
                      <IconButton
                        size="small"
                        onClick={() => setView("grid")}
                        sx={{
                          borderRadius: 0,
                          px: 1.2,
                          py: 0.8,
                          bgcolor: view === "grid" ? "#1a4a6b" : "white",
                          color: view === "grid" ? "white" : "#94a3b8",
                        }}
                      >
                        <GridViewIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Divider orientation="vertical" flexItem />
                      <IconButton
                        size="small"
                        onClick={() => setView("list")}
                        sx={{
                          borderRadius: 0,
                          px: 1.2,
                          py: 0.8,
                          bgcolor: view === "list" ? "#1a4a6b" : "white",
                          color: view === "list" ? "white" : "#94a3b8",
                        }}
                      >
                        <FormatListBulletedIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                    
                    <IconButton 
                      sx={{ border: "1px solid #e2e8f0", borderRadius: 2, bgcolor: "white", color: "#64748b" }}
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <TuneIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </>
                )}
                
                {isMobile && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FilterListIcon sx={{ fontSize: 16 }} />}
                      onClick={() => setShowFilters(!showFilters)}
                      fullWidth
                      sx={{ fontSize: "0.6875rem" }}
                    >
                      Filters {hasActiveFilters && `(${(selectedCategory !== "Category" ? 1 : 0) + (selectedStatus !== "Status" ? 1 : 0)})`}
                    </Button>
                    <Box sx={{ display: "flex", border: "1px solid #e2e8f0", borderRadius: 2, overflow: "hidden" }}>
                      <IconButton
                        size="small"
                        onClick={() => setView("grid")}
                        sx={{
                          borderRadius: 0,
                          px: 1,
                          py: 0.6,
                          bgcolor: view === "grid" ? "#1a4a6b" : "white",
                          color: view === "grid" ? "white" : "#94a3b8",
                        }}
                      >
                        <GridViewIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      <Divider orientation="vertical" flexItem />
                      <IconButton
                        size="small"
                        onClick={() => setView("list")}
                        sx={{
                          borderRadius: 0,
                          px: 1,
                          py: 0.6,
                          bgcolor: view === "list" ? "#1a4a6b" : "white",
                          color: view === "list" ? "white" : "#94a3b8",
                        }}
                      >
                        <FormatListBulletedIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Box>
              
              {/* Mobile Filters Panel */}
              {isMobile && showFilters && (
                <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #eef2f6" }}>
                  <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => setCategoryAnchor(e.currentTarget)}
                      sx={{ fontSize: "0.6875rem" }}
                    >
                      {selectedCategory}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => setStatusAnchor(e.currentTarget)}
                      sx={{ fontSize: "0.6875rem" }}
                    >
                      {selectedStatus}
                    </Button>
                    {hasActiveFilters && (
                      <Button
                        size="small"
                        color="error"
                        onClick={clearFilters}
                        sx={{ fontSize: "0.6875rem" }}
                      >
                        Clear All
                      </Button>
                    )}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Menus */}
          <Menu 
            anchorEl={categoryAnchor} 
            open={Boolean(categoryAnchor)} 
            onClose={() => setCategoryAnchor(null)}
            PaperProps={{ sx: { borderRadius: 2, mt: 0.5 } }}
          >
            {["Category", "Electrical", "HVAC", "Machinery", "Plumbing", "Safety"].map((c) => (
              <MenuItem 
                key={c} 
                onClick={() => { setSelectedCategory(c); setCategoryAnchor(null); }}
                sx={{ fontSize: "0.75rem", py: 1 }}
              >
                {c}
              </MenuItem>
            ))}
          </Menu>
          
          <Menu 
            anchorEl={statusAnchor} 
            open={Boolean(statusAnchor)} 
            onClose={() => setStatusAnchor(null)}
            PaperProps={{ sx: { borderRadius: 2, mt: 0.5 } }}
          >
            {["Status", "Operational", "Under Inspection", "Maintenance"].map((s) => (
              <MenuItem 
                key={s} 
                onClick={() => { setSelectedStatus(s); setStatusAnchor(null); }}
                sx={{ fontSize: "0.75rem", py: 1 }}
              >
                {s}
              </MenuItem>
            ))}
          </Menu>

          {/* Results Count */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              {filtered.length} asset{filtered.length !== 1 ? "s" : ""} found
            </Typography>
            {isMobile && (
              <Button
                size="small"
                startIcon={<AddIcon sx={{ fontSize: 14 }} />}
                variant="contained"
                sx={{ fontSize: "0.6875rem", py: 0.5 }}
                onClick={handleAddAsset}
              >
                Add Asset
              </Button>
            )}
          </Box>

          {/* Asset Display */}
          {view === "grid" ? (
            <Grid container spacing={isMobile ? 1.5 : 2}>
              {filtered.map((asset) => (
                <Grid item xs={12} sm={6} md={4} key={asset.id}>
                  <AssetCard asset={asset} />
                </Grid>
              ))}
              {filtered.length === 0 && (
                <Grid item xs={12}>
                  <Paper sx={{ textAlign: "center", py: 6, bgcolor: "transparent" }}>
                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                      No assets found matching your criteria
                    </Typography>
                    <Button size="small" onClick={clearFilters} sx={{ mt: 1, fontSize: "0.6875rem" }}>
                      Clear filters
                    </Button>
                  </Paper>
                </Grid>
              )}
            </Grid>
          ) : (
            <Box>
              {filtered.map((asset) => (
                <AssetListItem key={asset.id} asset={asset} />
              ))}
              {filtered.length === 0 && (
                <Paper sx={{ textAlign: "center", py: 6, bgcolor: "transparent" }}>
                  <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                    No assets found matching your criteria
                  </Typography>
                  <Button size="small" onClick={clearFilters} sx={{ mt: 1, fontSize: "0.6875rem" }}>
                    Clear filters
                  </Button>
                </Paper>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
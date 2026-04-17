import { useState } from "react";
import {
  Box, Typography, Card, CardContent, TextField, InputAdornment,
  Select, MenuItem, FormControl, Chip, IconButton, Table,
  TableBody, TableCell, TableHead, TableRow, Paper,
  useMediaQuery, Drawer, List, ListItem, ListItemText,
  Button, Divider, Stack, Grid, Collapse
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import PendingIcon from "@mui/icons-material/Pending";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: { 
    primary: { main: "#1a4a6b" }, 
    background: { default: "#f8fafc" } 
  },
  typography: { 
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 13,
    h5: { fontSize: "1.25rem", fontWeight: 800 },
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
          border: "1px solid #eef2f6",
          transition: "all 0.2s ease",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { 
          borderBottom: "1px solid #f1f5f9", 
          padding: "12px 12px",
          fontSize: "0.75rem",
        },
        head: { 
          fontWeight: 700, 
          color: "#1e293b", 
          fontSize: "0.75rem", 
          backgroundColor: "#f8fafc",
          padding: "12px 12px",
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

const statusStyles = {
  "In Progress": { bg: "#eff6ff", color: "#3b82f6", border: "#bfdbfe", icon: <PendingIcon sx={{ fontSize: 12 }} /> },
  Completed: { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", icon: <CheckCircleIcon sx={{ fontSize: 12 }} /> },
  Overdue: { bg: "#fff1f2", color: "#e11d48", border: "#fecdd3", icon: <WarningIcon sx={{ fontSize: 12 }} /> },
  Pending: { bg: "#f8fafc", color: "#475569", border: "#e2e8f0", icon: <PendingIcon sx={{ fontSize: 12 }} /> },
};

const rows = [
  { id: 1, name: "Safety Inspection Q2 2024", assignedTo: "Acme Corporation", createdDate: "2024-04-15", dueDate: "2024-06-30", status: "In Progress", submissions: 12 },
  { id: 2, name: "Equipment Maintenance Check", assignedTo: "TechFlow Inc", createdDate: "2024-05-01", dueDate: "2024-06-15", status: "Completed", submissions: 8 },
  { id: 3, name: "Quality Assurance Audit", assignedTo: "BuildPro", createdDate: "2024-05-20", dueDate: "2024-06-10", status: "Overdue", submissions: 3 },
  { id: 4, name: "Asset Inventory Update", assignedTo: "SafetyFirst Ltd", createdDate: "2024-06-01", dueDate: "2024-07-01", status: "Pending", submissions: 0 },
  { id: 5, name: "Monthly Inspection Report", assignedTo: "InspectCo", createdDate: "2024-05-25", dueDate: "2024-06-25", status: "In Progress", submissions: 5 },
  { id: 6, name: "Compliance Check 2024", assignedTo: "AssetGuard", createdDate: "2024-04-10", dueDate: "2024-06-20", status: "In Progress", submissions: 15 },
  { id: 7, name: "Workplace Safety Survey", assignedTo: "MaintenancePro", createdDate: "2024-05-15", dueDate: "2024-06-30", status: "Completed", submissions: 22 },
];

function StatCard({ label, value, valueColor, icon }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Card sx={{ 
      flex: 1,
      transition: "transform 0.2s",
      "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }
    }}>
      <CardContent sx={{ p: isMobile ? 2 : 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 500 }}>
            {label}
          </Typography>
          {icon && (
            <Box sx={{ color: valueColor || "#1a4a6b", opacity: 0.7 }}>
              {icon}
            </Box>
          )}
        </Box>
        <Typography 
          variant="h5" 
          fontWeight={700} 
          sx={{ 
            color: valueColor || "#0f172a", 
            fontSize: isMobile ? "1.25rem" : "1.5rem"
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

function StatusChip({ status }) {
  const s = statusStyles[status] || { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" };
  return (
    <Chip
      label={status}
      size="small"
      icon={s.icon}
      sx={{
        bgcolor: s.bg, 
        color: s.color,
        border: `1px solid ${s.border}`,
        fontWeight: 600, 
        fontSize: "0.625rem", 
        borderRadius: "12px", 
        height: 24,
        "& .MuiChip-icon": { fontSize: 12, marginLeft: "6px" }
      }}
    />
  );
}

function DateCell({ date }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <CalendarTodayOutlinedIcon sx={{ fontSize: 12, color: "#94a3b8" }} />
      <Typography variant="caption" sx={{ color: "#475569" }}>{date}</Typography>
    </Box>
  );
}

function SubmissionBadge({ count }) {
  return (
    <Box sx={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 28, height: 28, borderRadius: "50%",
      bgcolor: alpha("#1a4a6b", 0.1), 
      color: "#1a4a6b", 
      fontWeight: 700, 
      fontSize: "0.75rem",
    }}>
      {count}
    </Box>
  );
}

function MobileChecklistCard({ row }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card sx={{ mb: 1.5 }}>
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={700} sx={{ color: "#1a4a6b", mb: 0.5 }}>
              {row.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              {row.assignedTo}
            </Typography>
          </Box>
          <StatusChip status={row.status} />
        </Box>
        
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>Created</Typography>
            <DateCell date={row.createdDate} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>Due Date</Typography>
            <DateCell date={row.dueDate} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>Submissions</Typography>
            <SubmissionBadge count={row.submissions} />
          </Box>
        </Stack>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Collapse in={expanded}>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
            <Button size="small" variant="outlined" startIcon={<VisibilityOutlinedIcon sx={{ fontSize: 14 }} />}>
              View
            </Button>
            <Button size="small" variant="outlined" startIcon={<EditOutlinedIcon sx={{ fontSize: 14 }} />}>
              Edit
            </Button>
            <Button size="small" variant="outlined" startIcon={<BarChartOutlinedIcon sx={{ fontSize: 14 }} />}>
              Analytics
            </Button>
            <Button size="small" variant="outlined" startIcon={<PersonAddOutlinedIcon sx={{ fontSize: 14 }} />}>
              Assign
            </Button>
          </Box>
        </Collapse>
        
        <Button
          size="small"
          fullWidth
          onClick={() => setExpanded(!expanded)}
          sx={{ mt: 0.5, fontSize: "0.6875rem" }}
        >
          {expanded ? "Show less" : "Show actions"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function AssignedChecklist() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [customerFilter, setCustomerFilter] = useState("All Customers");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const filtered = rows.filter((r) => {
    const ms = search === "" || r.name.toLowerCase().includes(search.toLowerCase()) || r.assignedTo.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === "All Status" || r.status === statusFilter;
    const mc = customerFilter === "All Customers" || r.assignedTo === customerFilter;
    return ms && mst && mc;
  });

  const customers = ["All Customers", ...Array.from(new Set(rows.map((r) => r.assignedTo)))];
  
  const stats = {
    total: rows.length,
    inProgress: rows.filter(r => r.status === "In Progress").length,
    completed: rows.filter(r => r.status === "Completed").length,
    overdue: rows.filter(r => r.status === "Overdue").length,
  };

  const clearFilters = () => {
    setStatusFilter("All Status");
    setCustomerFilter("All Customers");
    setSearch("");
  };

  const hasActiveFilters = statusFilter !== "All Status" || customerFilter !== "All Customers" || search !== "";

  // Mobile Filters Drawer
  const MobileFiltersDrawer = () => (
    <Drawer
      anchor="bottom"
      open={mobileFiltersOpen}
      onClose={() => setMobileFiltersOpen(false)}
      PaperProps={{ sx: { borderRadius: "20px 20px 0 0", p: 2 } }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1rem" }}>Filters</Typography>
        <IconButton onClick={() => setMobileFiltersOpen(false)}>
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
      
      <Typography variant="caption" sx={{ color: "#64748b", mb: 1, display: "block" }}>Status</Typography>
      <Select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      >
        {["All Status", "In Progress", "Completed", "Overdue", "Pending"].map((s) => (
          <MenuItem key={s} value={s}>{s}</MenuItem>
        ))}
      </Select>
      
      <Typography variant="caption" sx={{ color: "#64748b", mb: 1, display: "block" }}>Customer</Typography>
      <Select
        value={customerFilter}
        onChange={(e) => setCustomerFilter(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      >
        {customers.map((c) => (
          <MenuItem key={c} value={c}>{c}</MenuItem>
        ))}
      </Select>
      
      <Button
        fullWidth
        variant="contained"
        onClick={() => setMobileFiltersOpen(false)}
        sx={{ mb: 1 }}
      >
        Apply Filters
      </Button>
      {hasActiveFilters && (
        <Button
          fullWidth
          variant="text"
          onClick={clearFilters}
          sx={{ color: "#ef4444" }}
        >
          Clear All
        </Button>
      )}
    </Drawer>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", p: isMobile ? 1.5 : 3 }}>

        {/* Title */}
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="h5" fontWeight={800} sx={{ color: "#0f172a", fontSize: isMobile ? "1.125rem" : "1.25rem" }}>
            Assigned Checklist
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748b", mt: 0.3, display: "block" }}>
            Track and manage checklist assignments
          </Typography>
        </Box>

        {/* Search + Filters */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row", 
          gap: 1.5, 
          mb: 2.5 
        }}>
          <TextField
            placeholder="Search forms or customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            fullWidth
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": { borderColor: "#e2e8f0" },
              },
            }}
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
          
          {!isMobile ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, bgcolor: "white", border: "1px solid #e2e8f0", borderRadius: 2, px: 1.5 }}>
                <FilterListIcon sx={{ color: "#94a3b8", fontSize: 16 }} />
                <FormControl size="small" variant="standard">
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    disableUnderline
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{ color: "#475569", fontSize: "0.75rem", fontWeight: 500, minWidth: 100 }}
                  >
                    {["All Status", "In Progress", "Completed", "Overdue", "Pending"].map((s) => (
                      <MenuItem key={s} value={s} sx={{ fontSize: "0.75rem" }}>{s}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, bgcolor: "white", border: "1px solid #e2e8f0", borderRadius: 2, px: 1.5 }}>
                <FilterListIcon sx={{ color: "#94a3b8", fontSize: 16 }} />
                <FormControl size="small" variant="standard">
                  <Select
                    value={customerFilter}
                    onChange={(e) => setCustomerFilter(e.target.value)}
                    disableUnderline
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{ color: "#475569", fontSize: "0.75rem", fontWeight: 500, minWidth: 120 }}
                  >
                    {customers.map((c) => (
                      <MenuItem key={c} value={c} sx={{ fontSize: "0.75rem" }}>{c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              
              {hasActiveFilters && (
                <Button
                  size="small"
                  onClick={clearFilters}
                  sx={{ color: "#64748b", fontSize: "0.6875rem" }}
                >
                  Clear
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="outlined"
              startIcon={<TuneIcon sx={{ fontSize: 16 }} />}
              onClick={() => setMobileFiltersOpen(true)}
              fullWidth
              sx={{ fontSize: "0.75rem" }}
            >
              Filters {hasActiveFilters && `(${(statusFilter !== "All Status" ? 1 : 0) + (customerFilter !== "All Customers" ? 1 : 0)})`}
            </Button>
          )}
        </Box>

        {/* Stat Cards */}
        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", 
          gap: 1.5, 
          mb: 3 
        }}>
          <StatCard label="Total Assigned" value={stats.total} icon={<CheckCircleIcon sx={{ fontSize: 16 }} />} />
          <StatCard label="In Progress" value={stats.inProgress} valueColor="#3b82f6" icon={<PendingIcon sx={{ fontSize: 16 }} />} />
          <StatCard label="Completed" value={stats.completed} valueColor="#16a34a" icon={<CheckCircleIcon sx={{ fontSize: 16 }} />} />
          <StatCard label="Overdue" value={stats.overdue} valueColor="#e11d48" icon={<WarningIcon sx={{ fontSize: 16 }} />} />
        </Box>

        {/* Table / Mobile Cards */}
        {!isMobile ? (
          <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #eef2f6", overflow: "auto" }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  {["Checklist Name", "Assigned To", "Created Date", "Due Date", "Status", "Submissions", "Actions"].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 700, color: "#64748b" }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:hover": { bgcolor: "#f8fafc" }, "&:last-child td": { border: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ color: "#1a4a6b", fontWeight: 500 }}>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: "#475569" }}>{row.assignedTo}</Typography>
                    </TableCell>
                    <TableCell><DateCell date={row.createdDate} /></TableCell>
                    <TableCell><DateCell date={row.dueDate} /></TableCell>
                    <TableCell><StatusChip status={row.status} /></TableCell>
                    <TableCell><SubmissionBadge count={row.submissions} /></TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <IconButton onClick={(() => navigate('/super_admin/view/checklists'))} size="small" sx={{ color: "#64748b", p: 0.6 }}>
                          <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "#64748b", p: 0.6 }}>
                          <EditOutlinedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton onClick={(() => navigate('/super_admin/analytics/checklists'))} size="small" sx={{ color: "#64748b", p: 0.6 }}>
                          <BarChartOutlinedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "#64748b", p: 0.6 }}>
                          <PersonAddOutlinedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: "center", py: 6, color: "#94a3b8" }}>
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Box>
            {filtered.map((row) => (
              <MobileChecklistCard key={row.id} row={row} />
            ))}
            {filtered.length === 0 && (
              <Paper sx={{ textAlign: "center", py: 6, bgcolor: "transparent", boxShadow: "none" }}>
                <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                  No records found
                </Typography>
                <Button size="small" onClick={clearFilters} sx={{ mt: 1, fontSize: "0.6875rem" }}>
                  Clear filters
                </Button>
              </Paper>
            )}
          </Box>
        )}

        {/* Mobile Filters Drawer */}
        <MobileFiltersDrawer />
      </Box>
    </ThemeProvider>
  );
}
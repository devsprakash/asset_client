// pages/Reports.jsx
import { useState, useEffect, useCallback } from "react";
import {
  Box, Typography, Button, Card, CardContent, IconButton, Divider, Avatar,
  useMediaQuery, Stack, Grid, Paper, Chip, Menu, MenuItem, ListItemIcon,
  ListItemText, CircularProgress, Alert, Snackbar, ToggleButton, ToggleButtonGroup,
  TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, OutlinedInput, Tab, Tabs, Badge
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend, AreaChart, Area
} from "recharts";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterListIcon from "@mui/icons-material/FilterList";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BusinessIcon from "@mui/icons-material/Business";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupsIcon from "@mui/icons-material/Groups";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useReport } from "../context/ReportContext";
import { useAuth } from "../context/AuthContexts";

const theme = createTheme({
  palette: { 
    primary: { main: "#1a4a6b" }, 
    background: { default: "#f8fafc" } 
  },
  typography: { 
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 13,
    h5: { fontSize: "1.125rem", fontWeight: 800 },
    h6: { fontSize: "0.875rem", fontWeight: 700 },
    body1: { fontSize: "0.75rem" },
    body2: { fontSize: "0.6875rem" },
    caption: { fontSize: "0.625rem" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { 
          borderRadius: 16, 
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)", 
          border: "1px solid #eef2f6",
          transition: "all 0.2s ease",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.6875rem",
          padding: "6px 12px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.75rem",
          minHeight: 40,
        },
      },
    },
  },
});

const CustomDot = (props) => {
  const { cx, cy } = props;
  return <circle cx={cx} cy={cy} r={4} fill="#1a4a6b" stroke="#fff" strokeWidth={2} />;
};

// Stat Card Component
function StatCard({ icon, label, value, sub, bg, loading }) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ 
      flex: 1, 
      minWidth: isMobile ? "calc(50% - 8px)" : 180, 
      borderRadius: 3, 
      background: bg, 
      p: isMobile ? 1.5 : 2, 
      color: "#fff", 
      transition: "transform 0.2s", 
      "&:hover": { transform: "translateY(-2px)" } 
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1 }}>
        {icon}
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{label}</Typography>
      </Box>
      {loading ? (
        <CircularProgress size={20} sx={{ color: "#fff" }} />
      ) : (
        <Typography variant="h5" fontWeight={800} sx={{ color: "#fff", lineHeight: 1.1, mb: 0.5, fontSize: isMobile ? "1.125rem" : "1.25rem" }}>
          {value}
        </Typography>
      )}
      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.5625rem" }}>{sub}</Typography>
    </Box>
  );
}

// Report Type Selector
function ReportTypeSelector({ value, onChange, isAdmin }) {
  const reportTypes = [
    { id: 'all', label: 'All Reports', icon: <AssessmentIcon sx={{ fontSize: 16 }} /> },
    { id: 'clients', label: 'Clients', icon: <BusinessIcon sx={{ fontSize: 16 }} /> },
    { id: 'assets', label: 'Assets', icon: <InventoryIcon sx={{ fontSize: 16 }} />, adminOnly: true },
    { id: 'team', label: 'Team', icon: <GroupsIcon sx={{ fontSize: 16 }} />, adminOnly: true },
    { id: 'inspections', label: 'Inspections', icon: <AssignmentIcon sx={{ fontSize: 16 }} /> },
    { id: 'financial', label: 'Financial', icon: <AttachMoneyIcon sx={{ fontSize: 16 }} /> },
    { id: 'compliance', label: 'Compliance', icon: <VerifiedIcon sx={{ fontSize: 16 }} />, adminOnly: true },
  ];

  const visibleTypes = reportTypes.filter(type => !type.adminOnly || (type.adminOnly && isAdmin));

  return (
    <ToggleButtonGroup value={value} exclusive onChange={(e, val) => val && onChange(val)} size="small" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
      {visibleTypes.map(type => (
        <ToggleButton key={type.id} value={type.id} sx={{ fontSize: "0.625rem", px: 1.5, py: 0.5 }}>
          {type.icon}
          <Typography sx={{ ml: 0.5, display: { xs: 'none', sm: 'inline' } }}>{type.label}</Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default function ReportsPage() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();
  const { 
    loading, 
    exporting, 
    error, 
    analyticsData, 
    reportData,
    getDashboardAnalytics, 
    getClientReport,
    getAssetReport,
    getTeamReport,
    getInspectionReport,
    getFinancialReport,
    getComplianceReport,
    exportBulkReports,
    clearError 
  } = useReport();

  const isAdmin = user?.role === 'admin';
  const isSuperAdmin = user?.role === 'super_admin' || user?.role === 'superadmin';

  const [dateRange, setDateRange] = useState(30);
  const [tabValue, setTabValue] = useState(0);
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [reportType, setReportType] = useState('all');
  const [reportFilters, setReportFilters] = useState({});
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (msg, sev = 'success') => setToast({ open: true, message: msg, severity: sev });
  const closeToast = () => setToast(prev => ({ ...prev, open: false }));

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    await getDashboardAnalytics(dateRange);
  };

  const handleExport = async (format) => {
    setExportAnchorEl(null);
    const dateRangeObj = { 
      startDate: new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
      endDate: new Date().toISOString().split('T')[0] 
    };
    
    let reportTypes = [];
    if (reportType === 'all') {
      reportTypes = isAdmin ? ['clients', 'assets', 'team', 'inspections', 'financial', 'compliance'] : ['clients', 'inspections', 'financial'];
    } else {
      reportTypes = [reportType];
    }
    
    const blob = await exportBulkReports(reportTypes, dateRangeObj, format);
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reports_export_${Date.now()}.${format === 'excel' ? 'xlsx' : 'pdf'}`;
      a.click();
      window.URL.revokeObjectURL(url);
      showToast(`Reports exported successfully as ${format.toUpperCase()}`, 'success');
    } else {
      showToast('Failed to export reports', 'error');
    }
  };

  const handleGenerateReport = async () => {
    let result = null;
    if (reportType === 'clients') {
      result = await getClientReport(reportFilters);
    } else if (reportType === 'assets' && isAdmin) {
      result = await getAssetReport(reportFilters);
    } else if (reportType === 'team' && isAdmin) {
      result = await getTeamReport(reportFilters);
    } else if (reportType === 'inspections') {
      result = await getInspectionReport(reportFilters);
    } else if (reportType === 'financial') {
      result = await getFinancialReport(reportFilters);
    } else if (reportType === 'compliance' && isAdmin) {
      result = await getComplianceReport(reportFilters);
    }
    
    if (result) {
      setFilterDialogOpen(false);
      showToast(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully`, 'success');
    }
  };

  // Prepare chart data from API
  const revenueTrend = analyticsData?.revenueTrend ? [
    { name: 'Current', value: analyticsData.revenueTrend.current, fill: '#1a4a6b' },
    { name: 'Previous', value: analyticsData.revenueTrend.previous, fill: '#64748b' },
    { name: 'Projected', value: analyticsData.revenueTrend.projected, fill: '#22c55e' }
  ] : [];

  const clientGrowthData = analyticsData?.clientGrowth ? [
    { name: 'Total', value: analyticsData.clientGrowth.total },
    { name: 'New', value: analyticsData.clientGrowth.new },
    { name: 'Previous Period', value: analyticsData.clientGrowth.previous }
  ] : [];

  const pieData = [
    { name: "Safety", value: 35, color: "#1a4a6b" },
    { name: "Equipment", value: 25, color: "#2e7d9e" },
    { name: "Quality", value: 20, color: "#f59e0b" },
    { name: "Maintenance", value: 15, color: "#8b5cf6" },
    { name: "Other", value: 5, color: "#94a3b8" },
  ];

  const statCards = [
    { icon: <BusinessIcon sx={{ fontSize: 18 }} />, label: "Total Clients", value: analyticsData?.clientGrowth?.total || 0, sub: `${analyticsData?.clientGrowth?.new || 0} new this period`, bg: "linear-gradient(135deg, #1a4a6b 0%, #1e6080 100%)" },
    { icon: <AssignmentIcon sx={{ fontSize: 18 }} />, label: "Active Checklists", value: analyticsData?.checklistUsage?.active || 0, sub: `${analyticsData?.checklistUsage?.activeRate || 0}% active rate`, bg: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)" },
    { icon: <PeopleOutlineIcon sx={{ fontSize: 18 }} />, label: "Total Clients", value: analyticsData?.clientGrowth?.total || 0, sub: `${analyticsData?.clientGrowth?.new || 0} new this period`, bg: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)" },
    { icon: <TrendingUpIcon sx={{ fontSize: 18 }} />, label: "Revenue Growth", value: `${analyticsData?.revenueTrend?.growth || 0}%`, sub: analyticsData?.revenueTrend?.growth > 10 ? "Above target" : "Below target", bg: (analyticsData?.revenueTrend?.growth || 0) > 10 ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" },
  ];

  const insights = analyticsData?.insights || [];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", p: isMobile ? 1.5 : 3 }}>
        
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: 2, mb: 2.5 }}>
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: "#0f172a", fontSize: isMobile ? "1rem" : "1.125rem" }}>
              Reports & Analytics
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b", mt: 0.3, display: "block" }}>
              View platform analytics and export reports
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, width: isMobile ? "100%" : "auto" }}>
            <ToggleButtonGroup size="small" value={dateRange} exclusive onChange={(e, val) => val && setDateRange(val)} sx={{ mr: 1 }}>
              <ToggleButton value={7} sx={{ fontSize: "0.625rem", px: 1.5 }}>7d</ToggleButton>
              <ToggleButton value={30} sx={{ fontSize: "0.625rem", px: 1.5 }}>30d</ToggleButton>
              <ToggleButton value={90} sx={{ fontSize: "0.625rem", px: 1.5 }}>90d</ToggleButton>
            </ToggleButtonGroup>
            <IconButton onClick={() => loadAnalytics()} size="small" sx={{ bgcolor: "#fff", border: "1px solid #e2e8f0" }}>
              <RefreshIcon sx={{ fontSize: "1rem", color: "#64748b" }} />
            </IconButton>
            <IconButton onClick={() => setFilterDialogOpen(true)} size="small" sx={{ bgcolor: "#fff", border: "1px solid #e2e8f0" }}>
              <FilterListIcon sx={{ fontSize: "1rem", color: "#64748b" }} />
            </IconButton>
            <Button variant="contained" startIcon={<DownloadIcon sx={{ fontSize: 14 }} />} onClick={(e) => setExportAnchorEl(e.currentTarget)} disabled={exporting} sx={{ bgcolor: "#1a4a6b", "&:hover": { bgcolor: "#153d5c" } }}>
              {exporting ? <CircularProgress size={16} /> : "Export"}
            </Button>
          </Box>
        </Box>

        {/* Error Alert */}
        {error && <Alert severity="error" onClose={clearError} sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        {/* Stat Cards */}
        <Box sx={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 1.5, mb: 2.5 }}>
          {statCards.map((card, i) => <StatCard key={i} {...card} loading={loading} />)}
        </Box>

        {/* Tabs */}
        <Paper sx={{ mb: 2.5, borderRadius: 2, overflow: 'hidden' }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} variant={isMobile ? "fullWidth" : "standard"} sx={{ minHeight: 40, '& .MuiTab-root': { fontSize: '0.7rem', minHeight: 40 } }}>
            <Tab label="Overview" />
            <Tab label="Revenue Analytics" />
            <Tab label="Client Analytics" />
            <Tab label="Performance" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {tabValue === 0 && (
          <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
            {/* Revenue Trend Chart */}
            <Grid item xs={12} md={7}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#0f172a", fontSize: "0.75rem", mb: 2 }}>
                    Revenue Comparison ({dateRange} days)
                  </Typography>
                  <ResponsiveContainer width="100%" height={isMobile ? 220 : 260}>
                    <BarChart data={revenueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: isMobile ? 10 : 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: isMobile ? 10 : 11 }} />
                      <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.6875rem" }} formatter={(value) => `$${value}`} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {revenueTrend.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Checklist Distribution Pie Chart */}
            <Grid item xs={12} md={5}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#0f172a", fontSize: "0.75rem", mb: 2 }}>
                    Checklist Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={isMobile ? 200 : 240}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={isMobile ? 50 : 60} outerRadius={isMobile ? 70 : 85} dataKey="value" paddingAngle={2} label={({ name, percent }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`} labelLine={!isMobile}>
                        {pieData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(val) => `${val}%`} contentStyle={{ borderRadius: 8, fontSize: "0.6875rem" }} />
                    </PieChart>
                  </ResponsiveContainer>
                  {isMobile && (<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center", mt: 1 }}>{pieData.map((item, i) => (<Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}><Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: item.color }} /><Typography variant="caption" sx={{ fontSize: "0.5625rem", color: "#64748b" }}>{item.name} {item.value}%</Typography></Box>))}</Box>)}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#0f172a", fontSize: "0.75rem", mb: 2 }}>
                    Revenue Insights
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: alpha("#1a4a6b", 0.04), borderRadius: 2 }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: "#64748b" }}>Monthly Recurring Revenue</Typography>
                        <Typography variant="h6" fontWeight={700} sx={{ color: "#1a4a6b" }}>${analyticsData?.revenueTrend?.current || 0}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: "#64748b" }}>Growth Rate</Typography>
                        <Typography variant="h6" fontWeight={700} sx={{ color: (analyticsData?.revenueTrend?.growth || 0) > 0 ? "#22c55e" : "#ef4444" }}>
                          {analyticsData?.revenueTrend?.growth > 0 ? '+' : ''}{analyticsData?.revenueTrend?.growth || 0}%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: "#64748b" }}>Projected Revenue</Typography>
                        <Typography variant="h6" fontWeight={700} sx={{ color: "#22c55e" }}>${analyticsData?.revenueTrend?.projected || 0}</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tabValue === 2 && (
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#0f172a", fontSize: "0.75rem", mb: 2 }}>
                    Client Growth
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={clientGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: isMobile ? 10 : 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: isMobile ? 10 : 11 }} />
                      <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.6875rem" }} />
                      <Bar dataKey="value" fill="#1a4a6b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tabValue === 3 && (
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#0f172a", fontSize: "0.75rem", mb: 2 }}>
                    Key Insights
                  </Typography>
                  {insights.length > 0 ? (
                    <Stack spacing={1.5}>
                      {insights.map((insight, idx) => (
                        <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, bgcolor: alpha("#1a4a6b", 0.04), borderRadius: 2 }}>
                          <TrendingUpIcon sx={{ fontSize: "1.2rem", color: "#1a4a6b" }} />
                          <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "#475569", flex: 1 }}>{insight}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="caption" sx={{ color: "#94a3b8" }}>No insights available</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Export Menu */}
        <Menu anchorEl={exportAnchorEl} open={Boolean(exportAnchorEl)} onClose={() => setExportAnchorEl(null)}>
          <MenuItem onClick={() => handleExport('excel')}>
            <ListItemIcon><TableChartIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Export as Excel" />
          </MenuItem>
          <MenuItem onClick={() => handleExport('pdf')}>
            <ListItemIcon><PictureAsPdfIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Export as PDF" />
          </MenuItem>
        </Menu>

        {/* Filter Dialog */}
        <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight={700}>Generate Report</Typography>
              <IconButton size="small" onClick={() => setFilterDialogOpen(false)}><CloseIcon fontSize="small" /></IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Report Type</InputLabel>
                <Select value={reportType} onChange={(e) => setReportType(e.target.value)} label="Report Type">
                  <MenuItem value="all">All Reports</MenuItem>
                  <MenuItem value="clients">Client Report</MenuItem>
                  {isAdmin && <MenuItem value="assets">Asset Report</MenuItem>}
                  {isAdmin && <MenuItem value="team">Team Report</MenuItem>}
                  <MenuItem value="inspections">Inspection Report</MenuItem>
                  <MenuItem value="financial">Financial Report</MenuItem>
                  {isAdmin && <MenuItem value="compliance">Compliance Report</MenuItem>}
                </Select>
              </FormControl>
              <TextField label="Start Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} onChange={(e) => setReportFilters({ ...reportFilters, startDate: e.target.value })} />
              <TextField label="End Date" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} onChange={(e) => setReportFilters({ ...reportFilters, endDate: e.target.value })} />
              {reportType === 'clients' && (
                <FormControl fullWidth size="small">
                  <InputLabel>Membership Plan</InputLabel>
                  <Select value={reportFilters.membershipPlan || ''} onChange={(e) => setReportFilters({ ...reportFilters, membershipPlan: e.target.value })} label="Membership Plan">
                    <MenuItem value="">All Plans</MenuItem>
                    <MenuItem value="free">Free</MenuItem>
                    <MenuItem value="standard">Standard</MenuItem>
                    <MenuItem value="premium">Premium</MenuItem>
                    <MenuItem value="enterprise">Enterprise</MenuItem>
                  </Select>
                </FormControl>
              )}
              {reportType === 'team' && isAdmin && (
                <FormControl fullWidth size="small">
                  <InputLabel>Team Role</InputLabel>
                  <Select value={reportFilters.teamRole || ''} onChange={(e) => setReportFilters({ ...reportFilters, teamRole: e.target.value })} label="Team Role">
                    <MenuItem value="">All Roles</MenuItem>
                    <MenuItem value="inspector">Inspector</MenuItem>
                    <MenuItem value="senior_inspector">Senior Inspector</MenuItem>
                    <MenuItem value="lead_inspector">Lead Inspector</MenuItem>
                    <MenuItem value="supervisor">Supervisor</MenuItem>
                  </Select>
                </FormControl>
              )}
              {reportType === 'assets' && isAdmin && (
                <FormControl fullWidth size="small">
                  <InputLabel>Asset Status</InputLabel>
                  <Select value={reportFilters.status || ''} onChange={(e) => setReportFilters({ ...reportFilters, status: e.target.value })} label="Asset Status">
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="In Maintenance">In Maintenance</MenuItem>
                    <MenuItem value="Retired">Retired</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button onClick={() => setFilterDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleGenerateReport} disabled={loading} sx={{ bgcolor: "#1a4a6b" }}>
              {loading ? <CircularProgress size={20} /> : "Generate Report"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Report Data Preview */}
        {reportData && reportData.data && reportData.data.length > 0 && (
          <Card sx={{ mt: 2.5 }}>
            <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#0f172a", fontSize: "0.75rem", mb: 1.5 }}>
                Report Preview: {reportData.reportType}
              </Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9' }}>
                      {Object.keys(reportData.data[0]).slice(0, 5).map(key => (
                        <th key={key} style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.data.slice(0, 5).map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).slice(0, 5).map((val, i) => (
                          <td key={i} style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>
                            {typeof val === 'object' ? JSON.stringify(val).substring(0, 50) : String(val).substring(0, 50)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {reportData.data.length > 5 && (
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1, color: '#64748b' }}>
                    + {reportData.data.length - 5} more records
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Toast */}
        <Snackbar open={toast.open} autoHideDuration={4000} onClose={closeToast} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert onClose={closeToast} severity={toast.severity} sx={{ borderRadius: 2, fontSize: "0.7rem" }}>{toast.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
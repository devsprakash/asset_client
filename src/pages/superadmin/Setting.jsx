import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  Divider,
  Select,
  MenuItem,
  FormControl,
  Avatar,
  Button,
  useMediaQuery,
  Drawer,
  IconButton,
  Stack,
  Paper,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

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
    MuiSwitch: {
      styleOverrides: {
        root: { width: 44, height: 24, padding: 0 },
        switchBase: {
          padding: 2,
          "&.Mui-checked": {
            transform: "translateX(20px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              bgcolor: "#1a4a6b",
              opacity: 1,
              border: 0,
            },
          },
        },
        thumb: { width: 20, height: 20, boxShadow: "none" },
        track: { borderRadius: 12, bgcolor: "#e2e8f0", opacity: 1 },
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
    MuiSelect: {
      styleOverrides: {
        root: { fontSize: "0.75rem" },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontSize: "0.75rem" },
      },
    },
  },
});

const navItems = [
  { key: "notifications", label: "Notifications", icon: <NotificationsOutlinedIcon sx={{ fontSize: 18 }} /> },
  { key: "security", label: "Security", icon: <LockOutlinedIcon sx={{ fontSize: 18 }} /> },
  { key: "preferences", label: "Preferences", icon: <LanguageOutlinedIcon sx={{ fontSize: 18 }} /> },
  { key: "appearance", label: "Appearance", icon: <PaletteOutlinedIcon sx={{ fontSize: 18 }} /> },
  { key: "admin", label: "Admin Controls", icon: <ShieldOutlinedIcon sx={{ fontSize: 18 }} /> },
  { key: "system", label: "System Settings", icon: <StorageOutlinedIcon sx={{ fontSize: 18 }} /> },
];

function ToggleRow({ label, desc, checked, onChange, noDivider }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: isMobile ? 1.5 : 2,
          gap: 1,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            fontWeight={700}
            sx={{ color: "#0f172a", fontSize: "0.6875rem", mb: 0.25 }}
          >
            {label}
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.5625rem" }}>
            {desc}
          </Typography>
        </Box>
        <Switch checked={checked} onChange={onChange} />
      </Box>
      {!noDivider && <Divider sx={{ my: 0 }} />}
    </>
  );
}

function SectionHeader({ icon, title, desc, iconBg = "#f1f5f9" }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
      <Avatar sx={{ width: 36, height: 36, bgcolor: iconBg, borderRadius: 2 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#0f172a", fontSize: "0.75rem" }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.5625rem" }}>
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}

function NotificationsPanel() {
  const [toggles, setToggles] = useState({
    email: true,
    tasks: true,
    inspection: true,
    team: false,
    alerts: true,
  });
  const toggle = (key) => setToggles((p) => ({ ...p, [key]: !p[key] }));

  const items = [
    { key: "email", label: "Email Notifications", desc: "Receive notifications via email" },
    { key: "tasks", label: "Task Assignments", desc: "Get notified when assigned new tasks" },
    { key: "inspection", label: "Inspection Reminders", desc: "Reminders for upcoming inspections" },
    { key: "team", label: "Team Updates", desc: "Updates from your team members" },
    { key: "alerts", label: "System Alerts", desc: "Important system notifications", noDivider: true },
  ];

  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <SectionHeader
          icon={<NotificationsOutlinedIcon sx={{ fontSize: 18, color: "#475569" }} />}
          title="Notification Settings"
          desc="Manage how you receive notifications"
        />
        {items.map((item) => (
          <ToggleRow
            key={item.key}
            label={item.label}
            desc={item.desc}
            checked={toggles[item.key]}
            onChange={() => toggle(item.key)}
            noDivider={item.noDivider}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function SecurityPanel() {
  const [toggles, setToggles] = useState({ twofa: true, sessions: false, audit: true });
  const toggle = (key) => setToggles((p) => ({ ...p, [key]: !p[key] }));
  
  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <SectionHeader
          icon={<LockOutlinedIcon sx={{ fontSize: 18, color: "#475569" }} />}
          title="Security Settings"
          desc="Manage your account security"
        />
        <ToggleRow label="Two-Factor Authentication" desc="Add an extra layer of security" checked={toggles.twofa} onChange={() => toggle("twofa")} />
        <ToggleRow label="Active Session Alerts" desc="Notify on new login sessions" checked={toggles.sessions} onChange={() => toggle("sessions")} />
        <ToggleRow label="Audit Log Access" desc="Enable detailed activity logging" checked={toggles.audit} onChange={() => toggle("audit")} noDivider />
      </CardContent>
    </Card>
  );
}

function PreferencesPanel() {
  const [lang, setLang] = useState("English");
  const [tz, setTz] = useState("Eastern Time (EST)");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");

  const selectSx = {
    "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.75rem" },
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <SectionHeader
          icon={<LanguageOutlinedIcon sx={{ fontSize: 18, color: "#475569" }} />}
          title="Preferences"
          desc="Customize your experience"
        />
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" fontWeight={700} sx={{ color: "#0f172a", mb: 0.5, display: "block", fontSize: "0.625rem" }}>
              Language
            </Typography>
            <FormControl fullWidth size="small">
              <Select value={lang} onChange={(e) => setLang(e.target.value)} IconComponent={KeyboardArrowDownIcon} sx={selectSx}>
                {["English", "Spanish", "French", "German", "Japanese"].map((l) => (
                  <MenuItem key={l} value={l}>{l}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography variant="caption" fontWeight={700} sx={{ color: "#0f172a", mb: 0.5, display: "block", fontSize: "0.625rem" }}>
              Timezone
            </Typography>
            <FormControl fullWidth size="small">
              <Select value={tz} onChange={(e) => setTz(e.target.value)} IconComponent={KeyboardArrowDownIcon} sx={selectSx}>
                {["Eastern Time (EST)", "Central Time (CST)", "Pacific Time (PST)", "UTC", "IST"].map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography variant="caption" fontWeight={700} sx={{ color: "#0f172a", mb: 0.5, display: "block", fontSize: "0.625rem" }}>
              Date Format
            </Typography>
            <FormControl fullWidth size="small">
              <Select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} IconComponent={KeyboardArrowDownIcon} sx={selectSx}>
                {["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"].map((f) => (
                  <MenuItem key={f} value={f}>{f}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function AppearancePanel() {
  const [selectedTheme, setSelectedTheme] = useState("Light");
  const [compact, setCompact] = useState(false);

  const themes = [
    { label: "Light", previewBg: "#f1f5f9", borderColor: "#e2e8f0" },
    { label: "Dark", previewBg: "#1e293b", borderColor: "#334155" },
    { label: "Auto", previewBg: "linear-gradient(135deg, #f1f5f9 50%, #1e293b 50%)", borderColor: "#e2e8f0" },
  ];

  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <SectionHeader
          icon={<PaletteOutlinedIcon sx={{ fontSize: 18, color: "#475569" }} />}
          title="Appearance"
          desc="Customize the look and feel"
        />

        <Typography variant="caption" fontWeight={700} sx={{ color: "#0f172a", mb: 1, display: "block", fontSize: "0.625rem" }}>
          Theme
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          {themes.map((t) => (
            <Box
              key={t.label}
              onClick={() => setSelectedTheme(t.label)}
              sx={{
                flex: 1,
                border: selectedTheme === t.label ? `2px solid #1a4a6b` : `1px solid ${t.borderColor}`,
                borderRadius: 2,
                p: 1,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Box sx={{ width: "100%", height: 50, borderRadius: 1, background: t.previewBg, mb: 0.5 }} />
              <Typography variant="caption" sx={{ textAlign: "center", display: "block", fontSize: "0.5625rem", color: selectedTheme === t.label ? "#1a4a6b" : "#64748b" }}>
                {t.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 1 }} />
        <ToggleRow label="Compact Mode" desc="Reduce spacing for denser layout" checked={compact} onChange={() => setCompact(!compact)} noDivider />
      </CardContent>
    </Card>
  );
}

function AdminPanel() {
  const [toggles, setToggles] = useState({ global: true, approval: true, bulk: false });
  const toggle = (key) => setToggles((p) => ({ ...p, [key]: !p[key] }));
  
  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <SectionHeader
          icon={<ShieldOutlinedIcon sx={{ fontSize: 18, color: "#475569" }} />}
          title="Admin Controls"
          desc="Manage platform-wide settings"
        />
        <ToggleRow label="Global Checklist Approval" desc="Require admin approval for global checklists" checked={toggles.global} onChange={() => toggle("global")} />
        <ToggleRow label="Customer Onboarding Approval" desc="Approve new customers before activation" checked={toggles.approval} onChange={() => toggle("approval")} />
        <ToggleRow label="Bulk Actions" desc="Enable bulk edit and delete operations" checked={toggles.bulk} onChange={() => toggle("bulk")} noDivider />
      </CardContent>
    </Card>
  );
}

function SystemPanel() {
  const [toggles, setToggles] = useState({ maintenance: false, debug: false, cache: true });
  const toggle = (key) => setToggles((p) => ({ ...p, [key]: !p[key] }));
  
  return (
    <Card>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <SectionHeader
          icon={<StorageOutlinedIcon sx={{ fontSize: 18, color: "#475569" }} />}
          title="System Settings"
          desc="Manage system-level configurations"
        />
        <ToggleRow label="Maintenance Mode" desc="Temporarily disable access for maintenance" checked={toggles.maintenance} onChange={() => toggle("maintenance")} />
        <ToggleRow label="Debug Mode" desc="Enable verbose error logging" checked={toggles.debug} onChange={() => toggle("debug")} />
        <ToggleRow label="Cache Enabled" desc="Use caching for improved performance" checked={toggles.cache} onChange={() => toggle("cache")} noDivider />
      </CardContent>
    </Card>
  );
}

const panels = {
  notifications: <NotificationsPanel />,
  security: <SecurityPanel />,
  preferences: (
    <Box>
      <PreferencesPanel />
      <AppearancePanel />
    </Box>
  ),
  appearance: (
    <Box>
      <PreferencesPanel />
      <AppearancePanel />
    </Box>
  ),
  admin: <AdminPanel />,
  system: <SystemPanel />,
};

export default function SettingsPage() {
  const [active, setActive] = useState("notifications");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNavClick = (key) => {
    setActive(key);
    if (isMobile) setMobileDrawerOpen(false);
  };

  const renderSidebar = () => (
    <Box sx={{ py: 1 }}>
      {navItems.map((item) => (
        <ListItemButton
          key={item.key}
          onClick={() => handleNavClick(item.key)}
          sx={{
            borderRadius: 2,
            mb: 0.5,
            bgcolor: active === item.key ? alpha("#1a4a6b", 0.08) : "transparent",
            "&:hover": { bgcolor: active === item.key ? alpha("#1a4a6b", 0.12) : alpha("#000", 0.04) },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: active === item.key ? "#1a4a6b" : "#64748b" }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.label} 
            primaryTypographyProps={{ 
              fontSize: "0.75rem", 
              fontWeight: active === item.key ? 600 : 500,
              color: active === item.key ? "#1a4a6b" : "#1e293b"
            }} 
          />
        </ListItemButton>
      ))}
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", p: { xs: 1.5, sm: 2, md: 3 } }}>
        
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: "#0f172a", fontSize: { xs: "1rem", sm: "1.125rem" } }}>
              Settings
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b", mt: 0.3, display: "block" }}>
              Manage your account settings and preferences
            </Typography>
          </Box>
          {isMobile && (
            <IconButton onClick={() => setMobileDrawerOpen(true)} sx={{ bgcolor: "white", border: "1px solid #e2e8f0", borderRadius: 2 }}>
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2.5, alignItems: "flex-start", flexDirection: { xs: "column", md: "row" } }}>
          
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Card sx={{ width: 260, flexShrink: 0, position: "sticky", top: 16 }}>
              <CardContent sx={{ p: 1.5 }}>
                {renderSidebar()}
              </CardContent>
            </Card>
          )}

          {/* Mobile Drawer */}
          <Drawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
            PaperProps={{ sx: { width: 280, borderRadius: 0, p: 2 } }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <IconButton onClick={() => setMobileDrawerOpen(false)}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
            {renderSidebar()}
          </Drawer>

          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            {panels[active] || panels.notifications}

            {/* Save / Reset buttons */}
            {(active === "preferences" || active === "appearance") && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1.5,
                  mt: 2.5,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<RestartAltIcon sx={{ fontSize: 14 }} />}
                  fullWidth={isMobile}
                  sx={{ borderColor: "#e2e8f0", color: "#475569" }}
                >
                  Reset to Defaults
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon sx={{ fontSize: 14 }} />}
                  fullWidth={isMobile}
                  sx={{ bgcolor: "#1a4a6b", "&:hover": { bgcolor: "#153d5c" } }}
                >
                  Save All Changes
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
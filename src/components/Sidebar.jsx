import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Button,
  Collapse,
  Divider,
  Tooltip,
  Badge,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useAuth } from "../context/AuthContexts";

// Navigation items - simplified without descriptions
const allNavItems = {
  superadmin: [
    { icon: GridViewIcon, label: "Dashboard", path: "/superadmin" },
    { icon: PeopleIcon, label: "Clients", path: "/superadmin/clients", badge: 3 },
    { icon: AssignmentIcon, label: "Checklists", path: "/superadmin/checklists" },
    { icon: CheckCircleIcon, label: "Assigned", path: "/superadmin/assigned" },
    { 
      icon: BarChartIcon, 
      label: "Reports", 
      path: "/superadmin/reports",
      subItems: [
        {  label: "Overview", path: "/superadmin/reports/overview" },
        { label: "Analytics", path: "/superadmin/reports/analytics" },
        { label: "Export", path: "/superadmin/reports/export" }
      ]
    },
    { icon: SettingsIcon, label: "Settings", path: "/superadmin/settings" },
  ],
  admin: [
    { icon: GridViewIcon, label: "Dashboard", path: "/admin" },
    { icon: PeopleIcon, label: "Team", path: "/admin/team", badge: 5 },
    { icon: AssignmentIcon, label: "Checklists", path: "/admin/checklists" },
    { icon: CheckCircleIcon, label: "Assets", path: "/admin/assets" },
    { icon: AssignmentIcon, label: "Assigned", path: "/admin/assigned" },
    { icon: BarChartIcon, label: "Reports", path: "/admin/reports" },
    { icon: SettingsIcon, label: "Settings", path: "/admin/settings" },
  ],
  team: [
    { icon: GridViewIcon, label: "Dashboard", path: "/team" },
    { icon: AssignmentIcon, label: "Tasks", path: "/team/tasks", badge: 8 },
    { icon: CheckCircleIcon, label: "History", path: "/team/history" },
    { icon: SettingsIcon, label: "Profile", path: "/team/profile" },
  ],
};

export default function Sidebar({ mobileOpen, onDrawerToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [openSubMenus, setOpenSubMenus] = useState({});

  // Set active item based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const navItems = allNavItems[user?.role] || allNavItems.team;
    
    // Check main items
    for (const item of navItems) {
      if (currentPath === item.path) {
        setActiveItem(item.label);
        return;
      }
      // Check subitems
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (currentPath === subItem.path) {
            setActiveItem(subItem.label);
            setOpenSubMenus(prev => ({ ...prev, [item.label]: true }));
            return;
          }
        }
      }
    }
  }, [location.pathname, user?.role]);

  const navItems = allNavItems[user?.role] || allNavItems.team;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = (path, label) => {
    setActiveItem(label);
    navigate(path);
    if (isMobile) {
      onDrawerToggle();
    }
  };

  const handleSubMenuToggle = (label) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
        position: "relative",
        transition: theme.transitions.create(['width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {/* Collapse toggle for desktop - Fixed positioning */}
      {!isMobile && (
        <IconButton
          onClick={handleCollapseToggle}
          sx={{
            position: "absolute",
            right: -8,
            top: 24,
            bgcolor: "#ffffff",
            border: "1px solid",
            borderColor: "#e0e0e0",
            width: 28,
            height: 28,
            "&:hover": { 
              bgcolor: "#f5f5f5",
              borderColor: "#d0d0d0",
            },
            zIndex: 1200,
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            transition: "all 0.2s",
          }}
          size="small"
        >
          {isCollapsed ? 
            <ChevronRightIcon sx={{ fontSize: 18 }} /> : 
            <ChevronLeftIcon sx={{ fontSize: 18 }} />
          }
        </IconButton>
      )}

      {/* Logo Section */}
      <Box 
        sx={{ 
          p: isCollapsed && !isMobile ? 2 : 2.5, 
          display: "flex", 
          alignItems: "center", 
          gap: 1.5, 
          borderBottom: "1px solid", 
          borderColor: "#f0f0f0",
          justifyContent: isCollapsed && !isMobile ? "center" : "flex-start",
          minHeight: 70,
        }}
      >
        <Box
          sx={{
            width: isCollapsed && !isMobile ? 40 : 36,
            height: isCollapsed && !isMobile ? 40 : 36,
            bgcolor: "#0f4c61",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          <InventoryIcon sx={{ color: "#ffffff", fontSize: isCollapsed && !isMobile ? 22 : 20 }} />
        </Box>
        
        {(!isCollapsed || isMobile) && (
          <Box sx={{ overflow: "hidden" }}>
            <Typography sx={{ 
              fontSize: 16, 
              fontWeight: 600, 
              color: "#202124", 
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}>
              AssetInspect
            </Typography>
            <Typography sx={{ 
              fontSize: 11, 
              color: "#5f6368", 
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}>
              {user?.role === "superadmin" ? "Super Admin" : 
               user?.role === "admin" ? "Admin" : "Team Member"}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Navigation Links */}
      <List 
        sx={{ 
          flex: 1, 
          px: isCollapsed && !isMobile ? 1 : 2, 
          py: 2, 
          display: "flex", 
          flexDirection: "column", 
          gap: 0.5, 
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#e0e0e0",
            borderRadius: "4px",
          },
        }} 
        disablePadding
      >
        {navItems.map(({ icon: Icon, label, path, badge, subItems }) => {
          const isActive = activeItem === label || 
            (subItems && subItems.some(sub => sub.label === activeItem));
          const hasSubItems = subItems && subItems.length > 0;
          const isSubMenuOpen = openSubMenus[label];

          return (
            <React.Fragment key={label}>
              <Tooltip 
                title={isCollapsed && !isMobile ? label : ""} 
                placement="right"
                arrow
              >
                <ListItem
                  onClick={() => {
                    if (hasSubItems) {
                      handleSubMenuToggle(label);
                    } else {
                      handleNavigation(path, label);
                    }
                  }}
                  sx={{
                    px: isCollapsed && !isMobile ? 2 : 2,
                    py: 1.5,
                    borderRadius: "10px",
                    cursor: "pointer",
                    bgcolor: isActive ? "#0f4c61" : "transparent",
                    color: isActive ? "#fff" : "#5f6368",
                    "&:hover": { 
                      bgcolor: isActive ? "#e8f0fe" : "#f5f5f5",
                    },
                    transition: "all 0.2s",
                    justifyContent: isCollapsed && !isMobile ? "center" : "flex-start",
                    minHeight: 44,
                  }}
                  disablePadding
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: isCollapsed && !isMobile ? "auto" : 40, 
                      color: "inherit",
                      mr: isCollapsed && !isMobile ? 0 : 1,
                    }}
                  >
                    <Badge
                      badgeContent={badge}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: 9,
                          height: 16,
                          minWidth: 16,
                          bgcolor: "#ea4335",
                        }
                      }}
                    >
                      <Icon sx={{ fontSize: 22, color: "inherit" }} />
                    </Badge>
                  </ListItemIcon>
                  
                  {(!isCollapsed || isMobile) && (
                    <>
                      <ListItemText
                        primary={label}
                        primaryTypographyProps={{ 
                          fontSize: 14, 
                          fontWeight: isActive ? 600 : 500, 
                          color: "inherit",
                        }}
                      />
                      {hasSubItems && (
                        <Box component="span" sx={{ color: "inherit", ml: 0.5 }}>
                          {isSubMenuOpen ? 
                            <ExpandLess sx={{ fontSize: 18 }} /> : 
                            <ExpandMore sx={{ fontSize: 18 }} />
                          }
                        </Box>
                      )}
                    </>
                  )}
                </ListItem>
              </Tooltip>

              {/* Submenu Items */}
              {hasSubItems && (!isCollapsed || isMobile) && (
                <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 5, pr: 1, mt: 0.5 }}>
                    {subItems.map((subItem) => (
                      <ListItem
                        key={subItem.label}
                        onClick={() => handleNavigation(subItem.path, subItem.label)}
                        sx={{
                          py: 1,
                          px: 1.5,
                          borderRadius: "8px",
                          cursor: "pointer",
                          color: activeItem === subItem.label ? "#1a73e8" : "#5f6368",
                          bgcolor: activeItem === subItem.label ? "#e8f0fe" : "transparent",
                          "&:hover": { bgcolor: "#f5f5f5" },
                          mb: 0.3,
                        }}
                      >
                        <ListItemText
                          primary={subItem.label}
                          primaryTypographyProps={{ 
                            fontSize: 13, 
                            fontWeight: activeItem === subItem.label ? 600 : 400,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>

      {/* Logout Section */}
      <Box sx={{ p: isCollapsed && !isMobile ? 1 : 2, borderTop: "1px solid", borderColor: "#f0f0f0" }}>
        <Tooltip title={isCollapsed && !isMobile ? "Log Out" : ""} placement="right" arrow>
          <Button
            onClick={handleLogout}
            startIcon={(!isCollapsed || isMobile) ? <LogoutIcon sx={{ fontSize: 20 }} /> : null}
            fullWidth
            sx={{
              justifyContent: isCollapsed && !isMobile ? "center" : "flex-start",
              color: "#5f6368",
              fontWeight: 500,
              fontSize: 14,
              textTransform: "none",
              px: isCollapsed && !isMobile ? 1 : 2,
              py: 1.2,
              borderRadius: "10px",
              minWidth: 0,
              "&:hover": { 
                color: "#d93025", 
                bgcolor: "#fce8e6",
              },
              "& .MuiButton-startIcon": { 
                mr: 1.5,
                m: isCollapsed && !isMobile ? 0 : undefined,
              },
            }}
          >
            {(!isCollapsed || isMobile) ? "Logout" : <LogoutIcon sx={{ fontSize: 22 }} />}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );

  // Mobile Drawer
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: 280,
            boxSizing: 'border-box',
            borderRight: "none",
            boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  // Desktop Sidebar
  return (
    <Box
      component="aside"
      sx={{
        width: isCollapsed ? 80 : 260,
        bgcolor: "#ffffff",
        borderRight: "1px solid",
        borderColor: "#f0f0f0",
        display: { xs: 'none', md: 'block' },
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        transition: theme.transitions.create(['width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflow: "hidden",
        boxShadow: "2px 0 8px rgba(0,0,0,0.02)",
      }}
    >
      {sidebarContent}
    </Box>
  );
}
// Sidebar.jsx - Updated with role-based navigation
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Tooltip,
  Badge,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  CircularProgress,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HistoryIcon from "@mui/icons-material/History";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import TaskIcon from "@mui/icons-material/Task";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useAuth } from "../context/AuthContexts";

// ─────────────────────────────────────────────
// Styled Components
// ─────────────────────────────────────────────

const MobileHeader = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 64,
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
  boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
  zIndex: 1100,
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

const MobileNavItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  borderRadius: 12,
  marginBottom: 8,
  padding: "12px 16px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: active
    ? alpha(theme.palette.primary.main, 0.08)
    : "transparent",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  "&:active": {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    transform: "scale(0.98)",
  },
  "& .MuiListItemIcon-root": {
    color: "inherit",
    minWidth: 40,
  },
}));

const BottomNavBar = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: 64,
  backgroundColor: "#ffffff",
  boxShadow: `0 -2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
  zIndex: 1100,
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));


const navItemsConfig = {
  admin: [
    {
      id: "dashboard",
      icon: DashboardIcon,
      label: "Dashboard",
      path: "/admin",
      roles: ["super_admin", "admin"],
    },
    {
      id: "clients",
      icon: GroupsIcon,
      label: "Client Management",
      path: "/admin/clients",
      roles: ["super_admin"], // Only super_admin can see this
    },
    {
      id: "checklists",
      icon: FactCheckIcon,
      label: "Checklists",
      path: "/admin/checklists",
      roles: ["super_admin", "admin"],
    },
    {
      id: "assets",
      icon: Inventory2Icon,
      label: "Assets Management",
      path: "/admin/assets",
      roles: ["admin"],
    },
    {
      id: "team",
      icon: PeopleAltIcon,
      label: "Team Management",
      path: "/admin/team",
      roles: ["admin"],
    },
    {
      id: "assigned",
      icon: AssignmentIcon,
      label: "Assigned Checklists",
      path: "/admin/assigned-checklists",
      roles: ["super_admin", "admin"],
    },
    {
      id: "reports",
      icon: AssessmentIcon,
      label: "Reports & Analytics",
      path: "/admin/reports",
      roles: ["super_admin", "admin"],
    },
    {
      id: "settings",
      icon: SettingsSuggestIcon,
      label: "Settings",
      path: "/admin/settings",
      roles: ["super_admin", "admin"],
    },
  ],
  team: [
    {
      id: "tasks",
      icon: TaskIcon,
      label: "My Tasks",
      path: "/team",
      roles: ["team"],
    },
    {
      id: "assets",
      icon: Inventory2Icon,
      label: "Assets Management",
      path: "/team/assets",
      roles: ["team"],
    },
    {
      id: "checklists",
      icon: FactCheckIcon,
      label: "My Checklists",
      path: "/team/checklists",
      roles: ["team"],
    },
    {
      id: "history",
      icon: HistoryIcon,
      label: "History",
      path: "/team/history",
      roles: ["team"],
    },
    {
      id: "profile",
      icon: PersonOutlineIcon,
      label: "Profile",
      path: "/team/profile",
      roles: ["team"],
    },
  ],
};

// Helper function to filter nav items based on user role
export const getNavItems = (userRole) => {
  if (userRole === "super_admin") {
    // Super admin sees all admin items
    return navItemsConfig.admin.filter((item) =>
      item.roles.includes("super_admin")
    );
  }
  if (userRole === "admin") {
    // Admin sees only items with 'admin' role
    return navItemsConfig.admin.filter((item) =>
      item.roles.includes("admin")
    );
  }
  if (userRole === "team") {
    return navItemsConfig.team;
  }
  return [];
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const getUserDisplayName = (user) => {
  if (!user) return "User";
  return user.name || user.email?.split("@")[0] || "User";
};

const getUserInitials = (user) => {
  if (!user) return "U";
  const name = user.name || user.email || "User";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function Sidebar({ mobileOpen, onDrawerToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);

  // Get filtered nav items based on user role
  const navItems = getNavItems(user?.role);

  // Check if user is authenticated, redirect to login if not
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (typeof mobileOpen === "boolean" && mobileOpen !== mobileMenuOpen) {
      setMobileMenuOpen(mobileOpen);
    }
  }, [mobileOpen]);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = navItems.findIndex((item) => currentPath === item.path);
    if (activeIndex !== -1) {
      setActiveItem(navItems[activeIndex].id);
      setBottomNavValue(activeIndex);
    } else {
      setActiveItem("");
    }
  }, [location.pathname, navItems]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigation = useCallback(
    (path, id, e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      console.log("Navigating to:", path, "Item ID:", id);

      setActiveItem(id);

      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }

      if (onDrawerToggle && mobileOpen) {
        onDrawerToggle();
      }

      navigate(path);
    },
    [navigate, onDrawerToggle, mobileOpen, mobileMenuOpen],
  );

  const handleBottomNavChange = (_event, newValue) => {
    const item = navItems[newValue];
    if (item) {
      setActiveItem(item.id);
      setBottomNavValue(newValue);
      navigate(item.path);
    }
  };

  const handleCollapseToggle = () => setIsCollapsed((prev) => !prev);
  const handleOpenMobileMenu = () => setMobileMenuOpen(true);
  const handleCloseMobileMenu = () => setMobileMenuOpen(false);

  // Show loading state while auth is initializing
  if (authLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          bgcolor: "#f8fafc",
        }}
      >
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  // If no user is authenticated, don't render sidebar
  if (!user || navItems.length === 0) {
    return null;
  }

  // ─────────────────────────────────────────────
  // Desktop Sidebar Content
  // ─────────────────────────────────────────────

  const desktopSidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        position: "relative",
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: isCollapsed ? 2 : 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          justifyContent: isCollapsed ? "center" : "flex-start",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          <Inventory2Icon sx={{ color: "#ffffff", fontSize: 22 }} />
        </Box>

        {!isCollapsed && (
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: theme.palette.text.primary,
                lineHeight: 1.2,
              }}
            >
              AssetInspect
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                color: theme.palette.text.secondary,
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {user?.role === "super_admin" ? "Super Admin" : user?.role || "Admin"}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Navigation Links */}
      <List sx={{ flex: 1, px: isCollapsed ? 1 : 2, py: 2 }}>
        {navItems.map(({ id, icon: Icon, label, path, badge }) => {
          const isActive = activeItem === id || location.pathname === path;
          return (
            <Tooltip
              key={id}
              title={isCollapsed ? label : ""}
              placement="right"
              arrow
            >
              <ListItem
                onClick={(e) => handleNavigation(path, id, e)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  py: 1.5,
                  px: 2,
                  cursor: "pointer",
                  backgroundColor: isActive
                    ? alpha(theme.palette.primary.main, 0.08)
                    : "transparent",
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  },
                  "& .MuiListItemIcon-root": {
                    color: "inherit",
                    minWidth: isCollapsed ? "auto" : 40,
                  },
                }}
              >
                <ListItemIcon>
                  <Badge
                    badgeContent={badge}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: 10,
                        height: 18,
                        minWidth: 18,
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: 22 }} />
                  </Badge>
                </ListItemIcon>

                {!isCollapsed && (
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                )}
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      {/* Logout */}
      <Box
        sx={{
          p: isCollapsed ? 2 : 3,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Tooltip title={isCollapsed ? "Logout" : ""} placement="right" arrow>
          <Button
            onClick={handleLogout}
            startIcon={!isCollapsed ? <LogoutRoundedIcon /> : null}
            fullWidth
            variant="text"
            sx={{
              justifyContent: isCollapsed ? "center" : "flex-start",
              color: theme.palette.text.secondary,
              fontWeight: 500,
              fontSize: 14,
              textTransform: "none",
              py: 1.2,
              px: isCollapsed ? 1 : 2,
              borderRadius: 2,
              "&:hover": {
                color: theme.palette.error.main,
                backgroundColor: alpha(theme.palette.error.main, 0.08),
              },
            }}
          >
            {!isCollapsed ? "Logout" : <LogoutRoundedIcon />}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );

  // ─────────────────────────────────────────────
  // Mobile Drawer Content
  // ─────────────────────────────────────────────

  const mobileMenuContent = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Inventory2Icon sx={{ color: "#ffffff", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              AssetInspect
            </Typography>
            <Typography
              sx={{ fontSize: 11, color: theme.palette.text.secondary }}
            >
              {user?.role === "super_admin" ? "Super Admin" : user?.role || "Admin"}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleCloseMobileMenu} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* User Profile */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
          }}
        >
          <Avatar
            sx={{ width: 44, height: 44, bgcolor: theme.palette.primary.main }}
          >
            {getUserInitials(user)}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }} noWrap>
              {getUserDisplayName(user)}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
              noWrap
            >
              {user?.email || ""}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Nav Links */}
      <List sx={{ px: 2, flex: 1, overflowY: "auto" }}>
        {navItems.map(({ id, icon: Icon, label, path, badge }) => {
          const isActive = activeItem === id || location.pathname === path;
          return (
            <MobileNavItem
              key={id}
              active={isActive}
              onClick={(e) => handleNavigation(path, id, e)}
            >
              <ListItemIcon>
                <Badge
                  badgeContent={badge}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: 10,
                      height: 18,
                      minWidth: 18,
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 24 }} />
                </Badge>
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: isActive ? 600 : 500,
                }}
              />
            </MobileNavItem>
          );
        })}
      </List>

      {/* Logout */}
      <Box sx={{ p: 2, mt: "auto" }}>
        <Button
          onClick={handleLogout}
          startIcon={<LogoutRoundedIcon />}
          fullWidth
          variant="outlined"
          color="error"
          sx={{ py: 1.5, borderRadius: 2, textTransform: "none", fontSize: 15 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  // ─────────────────────────────────────────────
  // Mobile Layout
  // ─────────────────────────────────────────────

  if (isMobile) {
    return (
      <>
        {/* Fixed Top Header */}
        <MobileHeader>
          <IconButton
            onClick={handleOpenMobileMenu}
            edge="start"
            sx={{ color: theme.palette.text.primary }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Inventory2Icon sx={{ color: "#ffffff", fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              AssetInspect
            </Typography>
          </Box>

          <IconButton
            onClick={handleLogout}
            size="small"
            sx={{ color: theme.palette.text.secondary }}
          >
            <LogoutRoundedIcon />
          </IconButton>
        </MobileHeader>

        {/* Spacer below fixed header */}
        <Box sx={{ height: 64 }} />

        {/* Slide-in Drawer */}
        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={handleCloseMobileMenu}
          keepMounted={false}
          sx={{
            "& .MuiDrawer-paper": {
              width: isSmallMobile ? "85%" : 320,
              maxWidth: 400,
              backgroundColor: "#ffffff",
              boxShadow: theme.shadows[8],
            },
          }}
        >
          {mobileMenuContent}
        </Drawer>

        {/* Bottom Navigation - Only show first 5 items */}
        {navItems.length > 0 && (
          <BottomNavBar elevation={3}>
            <BottomNavigation
              value={bottomNavValue}
              onChange={handleBottomNavChange}
              showLabels={!isSmallMobile}
              sx={{
                width: "100%",
                backgroundColor: "transparent",
                "& .MuiBottomNavigationAction-root": {
                  minWidth: 0,
                  py: 1,
                  color: theme.palette.text.secondary,
                  "&.Mui-selected": { color: theme.palette.primary.main },
                },
                "& .MuiBottomNavigationAction-label": {
                  fontSize: 11,
                  mt: 0.5,
                },
              }}
            >
              {navItems.slice(0, 5).map((item) => {
                const Icon = item.icon;
                return (
                  <BottomNavigationAction
                    key={item.id}
                    label={item.label}
                    icon={<Icon sx={{ fontSize: isSmallMobile ? 20 : 22 }} />}
                  />
                );
              })}
            </BottomNavigation>
          </BottomNavBar>
        )}

        {/* Spacer above fixed bottom nav */}
        <Box sx={{ height: 64 }} />
      </>
    );
  }

  // ─────────────────────────────────────────────
  // Desktop Layout
  // ─────────────────────────────────────────────

  return (
    <Box
      component="aside"
      sx={{
        width: isCollapsed ? 88 : 280,
        backgroundColor: "#ffffff",
        display: { xs: "none", md: "block" },
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        transition: theme.transitions.create(["width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflow: "hidden",
        boxShadow: `2px 0 8px ${alpha(theme.palette.common.black, 0.02)}`,
      }}
    >
      {desktopSidebarContent}
    </Box>
  );
}
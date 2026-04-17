import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAuth } from "../context/AuthContexts";

// ─────────────────────────────────────────────
// FIX 1: Removed hardcoded external avatar URL — it is brittle, may 404, and
// leaks a dependency on a third-party image service.
// Avatar now falls back to initials derived from the authenticated user.
// ─────────────────────────────────────────────

export default function TopHeader({ onMenuToggle }) {
  const { user, logout } = useAuth(); // FIX 2: Destructure `logout` from auth context
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  // FIX 3: Use real user data from auth context instead of hardcoded role-based names.
  const getUserDisplayName = () => {
    if (!user) return "User";
    return user.name || user.email?.split("@")[0] || "User";
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // FIX 4: Show real role from auth context, not the hardcoded string "admin".
  const getUserRole = () => user?.role || "member";

  const handleNotificationOpen = (event) => setNotificationAnchor(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);
  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  // FIX 5: Wired up the Logout menu item to actually call logout() instead of
  // just closing the menu — it was a no-op before.
  const handleLogout = async () => {
    handleUserMenuClose();
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Box
      component="header"
      sx={{
        height: 70,
        bgcolor: "#ffffff",
        borderBottom: "1px solid",
        borderColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3, md: 4 },
        position: "sticky",
        top: 0,
        zIndex: 1100,
        width: "100%",
        // FIX 6: Added box-sizing so horizontal padding doesn't overflow the header
        boxSizing: "border-box",
      }}
    >
      {/* Left Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {isMobile && (
          <IconButton
            onClick={onMenuToggle}
            sx={{ color: "#5f6368", p: 1, "&:hover": { bgcolor: "#f5f5f5" } }}
          >
            <MenuIcon sx={{ fontSize: 22 }} />
          </IconButton>
        )}
      </Box>

      {/* Center — Search Bar (desktop only) */}
      {!isMobile && (
        // FIX 7: Removed hardcoded `marginRight: "600px"` which broke layout on
        // most screen sizes. Used `mx: "auto"` to center the search bar naturally.
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: searchFocused ? "#ffffff" : "#f1f3f4",
            border: searchFocused ? "2px solid #1a73e8" : "2px solid transparent",
            borderRadius: "24px",
            px: 2,
            height: 46,
            width: isTablet ? 300 : 360,
            mx: "auto",
            transition: "all 0.2s ease",
            "&:hover": { bgcolor: "#e8eaed" },
          }}
        >
          <SearchIcon sx={{ color: "#5f6368", fontSize: 20, mr: 1 }} />
          <input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              border: "none",
              background: "transparent",
              width: "100%",
              fontSize: "15px",
              outline: "none",
              color: "#202124",
              fontFamily: "inherit",
            }}
          />
        </Box>
      )}

      {/* Right Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {/* Mobile Search Icon */}
        {isMobile && (
          <IconButton sx={{ color: "#5f6368", p: 1, "&:hover": { bgcolor: "#f5f5f5" } }}>
            <SearchIcon sx={{ fontSize: 22 }} />
          </IconButton>
        )}

        {/* Notifications Bell */}
        <IconButton
          onClick={handleNotificationOpen}
          sx={{ color: "#5f6368", p: 1, "&:hover": { bgcolor: "#f5f5f5" } }}
        >
          <Badge
            variant="dot"
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "#ea4335",
                width: 8,
                height: 8,
                borderRadius: "50%",
                top: 2,
                right: 2,
              },
            }}
          >
            <NotificationsNoneIcon sx={{ fontSize: 22 }} />
          </Badge>
        </IconButton>

        {/* User Avatar + Name */}
        <Box
          onClick={handleUserMenuOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            p: 0.5,
            borderRadius: "32px",
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          {/* FIX 1: No `src` — always render initials avatar from auth data */}
          <Avatar
            alt={getUserDisplayName()}
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#1a73e8",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {getUserInitials()}
          </Avatar>

          {!isMobile && (
            <>
              <Box sx={{ display: { xs: "none", sm: "block" }, ml: 0.5 }}>
                <Typography
                  sx={{ fontSize: 14, fontWeight: 500, color: "#202124", lineHeight: 1.3 }}
                >
                  {getUserDisplayName()}
                </Typography>
                {/* FIX 4: Show real role instead of hardcoded "admin" */}
                <Typography sx={{ fontSize: 12, color: "#5f6368", lineHeight: 1.2 }}>
                  {getUserRole()}
                </Typography>
              </Box>
              <KeyboardArrowDownIcon sx={{ color: "#5f6368", fontSize: 18 }} />
            </>
          )}
        </Box>

        {/* ── Notifications Menu ── */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          TransitionComponent={Fade}
          PaperProps={{
            elevation: 2,
            sx: {
              width: 300,
              mt: 1.5,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #f0f0f0",
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} color="#202124">
              Notifications
            </Typography>
            <Typography variant="caption" sx={{ color: "#1a73e8", cursor: "pointer" }}>
              Mark all read
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "#f0f0f0" }} />
          {[1, 2, 3].map((item) => (
            <MenuItem key={item} onClick={handleNotificationClose} sx={{ py: 2, px: 2 }}>
              <Box>
                <Typography variant="body2" fontWeight={500} color="#202124" sx={{ mb: 0.5 }}>
                  Notification {item}
                </Typography>
                <Typography variant="caption" color="#5f6368">
                  2 hours ago
                </Typography>
              </Box>
            </MenuItem>
          ))}
          <Divider sx={{ borderColor: "#f0f0f0" }} />
          <Box sx={{ p: 1, textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "#1a73e8", cursor: "pointer" }}>
              View all notifications
            </Typography>
          </Box>
        </Menu>

        {/* ── User Menu ── */}
        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={handleUserMenuClose}
          TransitionComponent={Fade}
          PaperProps={{
            elevation: 2,
            sx: {
              width: 240,
              mt: 1,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #f0f0f0",
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} color="#202124">
              {getUserDisplayName()}
            </Typography>
            <Typography variant="caption" color="#5f6368">
              {user?.email || "user@example.com"}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "#f0f0f0" }} />
          <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5, px: 2, color: "#202124" }}>
            <Typography variant="body2">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5, px: 2, color: "#202124" }}>
            <Typography variant="body2">Settings</Typography>
          </MenuItem>
          <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5, px: 2, color: "#202124" }}>
            <Typography variant="body2">Help</Typography>
          </MenuItem>
          <Divider sx={{ borderColor: "#f0f0f0" }} />
          {/* FIX 5: Actually calls logout() — was a no-op before */}
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 2, color: "#d93025" }}>
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
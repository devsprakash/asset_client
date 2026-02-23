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
  Fade
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAuth } from "../context/AuthContexts";

const USER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpdaApzkQdcIcJD62XV-wzwf-IG0DB_rpJ7e2qZCbgE7SwJxT0Mhax-T0CiCpfixY-TeSNmW6b5A6Vx8_vsfLQqcv1hPRZC40BScGJ0g0UXOc1YVOQNmbluY0uV_yMSIy8dCS5ePTCccNKvVbk6R4680hXPopXhgBZfQT8cES_BpnmQ25oU1_DuWQZGumdwX7Hxu295dhBgSAkHdIpGfPrYDlkA8XhIagJ8snO3WYML-45v41dGrMJKN614v_aR1NgJROQzLjL0YE";

export default function TopHeader({ onMenuToggle }) {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const getUserDisplayName = () => {
    if (user?.role === "superadmin") return "Sarah Chen";
    if (user?.role === "admin") return "Michael Wong";
    return "Alex Rivera";
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(" ").map(n => n[0]).join("");
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
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
      }}
    >
      {/* Left Section - Menu + Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {isMobile && (
          <IconButton 
            onClick={onMenuToggle}
            sx={{ 
              color: "#5f6368",
              p: 1,
              '&:hover': { bgcolor: "#f5f5f5" }
            }}
          >
            <MenuIcon sx={{ fontSize: 22 }} />
          </IconButton>
        )}
      </Box>

      {/* Center - Search Bar (Desktop only) */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: searchFocused ? "#ffffff" : "#f1f3f4",
            border: searchFocused ? "2px solid #1a73e8" : "2px solid transparent",
            borderRadius: "24px",
            px: 2,
            height: 46,
            marginRight:"600px",
            width: isTablet ? 300 : 360,
            transition: "all 0.2s ease",
            '&:hover': {
              bgcolor: "#e8eaed",
            }
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
              fontFamily: "inherit"
            }}
          />
        </Box>
      )}

      {/* Right Section - Actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {/* Mobile Search Icon */}
        {isMobile && (
          <IconButton 
            sx={{ color: "#5f6368", p: 1, '&:hover': { bgcolor: "#f5f5f5" } }}
          >
            <SearchIcon sx={{ fontSize: 22 }} />
          </IconButton>
        )}

        {/* Notifications */}
        <IconButton
          onClick={handleNotificationOpen}
          sx={{ 
            color: "#5f6368",
            p: 1,
            '&:hover': { bgcolor: "#f5f5f5" }
          }}
        >
          <Badge
            variant="dot"
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: "#ea4335",
                width: 8,
                height: 8,
                borderRadius: "50%",
                top: 2,
                right: 2,
              }
            }}
          >
            <NotificationsNoneIcon sx={{ fontSize: 22 }} />
          </Badge>
        </IconButton>

        {/* User Menu */}
        <Box
          onClick={handleUserMenuOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            p: 0.5,
            borderRadius: "32px",
            '&:hover': { bgcolor: "#f5f5f5" }
          }}
        >
          <Avatar
            src={USER_AVATAR}
            alt={getUserDisplayName()}
            sx={{ 
              width: 36, 
              height: 36,
              bgcolor: "#1a73e8",
              fontSize: 14,
              fontWeight: 500
            }}
          >
            {getUserInitials()}
          </Avatar>
          
          {!isMobile && (
            <>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 0.5 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#202124", lineHeight: 1.3 }}>
                  {getUserDisplayName()}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#5f6368", lineHeight: 1.2 }}>
                  {"admin"}
                </Typography>
              </Box>
              <KeyboardArrowDownIcon sx={{ color: "#5f6368", fontSize: 18 }} />
            </>
          )}
        </Box>

        {/* Notifications Menu */}
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
              border: "1px solid #f0f0f0"
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle2" fontWeight={600} color="#202124">Notifications</Typography>
            <Typography variant="caption" sx={{ color: "#1a73e8", cursor: "pointer" }}>Mark all read</Typography>
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

        {/* User Menu */}
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
              border: "1px solid #f0f0f0"
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
          <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5, px: 2, color: "#d93025" }}>
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
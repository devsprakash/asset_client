// components/Navbar.jsx - Alternative Design (Minimal Version)
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Drawer,
  Container,
  Stack,
  alpha,
  Divider,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ sections, activeSection, scrollToSection }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setDrawerOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "analytics", label: "Analytics" },
    { id: "features", label: "Features" },
    { id: "roles", label: "Solutions" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled 
            ? alpha("#ffffff", 0.95) 
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? `1px solid ${alpha("#1a4a6b", 0.1)}`
            : "none",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          height: { xs: 64, sm: 68, md: 72 },
          justifyContent: "center",
          boxShadow: scrolled 
            ? "0 4px 20px rgba(0, 0, 0, 0.03)" 
            : "none",
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
          }}
        >
          <Toolbar
            disableGutters
            sx={{ 
              justifyContent: "space-between", 
              py: 0, 
              minHeight: "auto",
              height: "100%",
              position: "relative",
            }}
          >
            {/* Logo - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ flexShrink: 0 }}
            >
              <Box
                onClick={handleLogoClick}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.85 },
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: { xs: 32, sm: 36, md: 38 },
                    height: { xs: 32, sm: 36, md: 38 },
                    background: "linear-gradient(135deg, #1a4a6b 0%, #003350 100%)",
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1.5,
                    transition: "all 0.3s ease",
                    "&:hover": { 
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 16px rgba(26,74,107,0.2)",
                    },
                    boxShadow: scrolled 
                      ? "0 2px 8px rgba(0,51,80,0.1)" 
                      : "0 4px 12px rgba(0,51,80,0.15)",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      fontFamily: '"Inter", sans-serif',
                      letterSpacing: "-0.02em",
                    }}
                  >
                    AF
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      background: "linear-gradient(135deg, #1a4a6b 0%, #003350 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    AssetFlow
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.55rem", sm: "0.6rem" },
                      color: "#64748b",
                      fontWeight: 500,
                      display: { xs: "none", sm: "block" },
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Smart Asset Management
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Desktop Navigation - Perfectly Centered */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: "auto",
                whiteSpace: "nowrap",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Stack
                  direction="row"
                  spacing={{ md: 0.5, lg: 1 }}
                  alignItems="center"
                  sx={{
                    bgcolor: scrolled ? alpha("#ffffff", 0.5) : "transparent",
                    borderRadius: 100,
                    p: 0.5,
                  }}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Button
                        onClick={() => handleNavClick(item.id)}
                        sx={{
                          color: activeSection === item.id ? "#1a4a6b" : "#5a6e8a",
                          fontWeight: activeSection === item.id ? 600 : 500,
                          fontSize: { md: "0.75rem", lg: "0.85rem" },
                          textTransform: "none",
                          px: { md: 1.5, lg: 2 },
                          py: 0.75,
                          borderRadius: 100,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: alpha("#1a4a6b", 0.06),
                            color: "#1a4a6b",
                          },
                          position: "relative",
                          "&::after": activeSection === item.id ? {
                            content: '""',
                            position: "absolute",
                            bottom: 2,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "20px",
                            height: "2px",
                            background: "linear-gradient(90deg, #1a4a6b, #003350)",
                            borderRadius: "2px",
                          } : {},
                        }}
                      >
                        {item.label}
                      </Button>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Box>

            {/* Desktop CTA Buttons - Right Side (Only Sign In) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ flexShrink: 0 }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <Button 
                  onClick={() => navigate('/login')}
                  variant="text"
                  startIcon={<LoginIcon sx={{ fontSize: { md: 16, lg: 18 } }} />}
                  sx={{
                    color: "#1a4a6b",
                    fontSize: { md: "0.75rem", lg: "0.8rem" },
                    fontWeight: 600,
                    borderRadius: 100,
                    px: { md: 1.5, lg: 2 },
                    py: 0.75,
                    "&:hover": {
                      backgroundColor: alpha("#1a4a6b", 0.06),
                    },
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </motion.div>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#1a4a6b",
                "&:hover": { 
                  bgcolor: alpha("#1a4a6b", 0.06),
                },
              }}
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer - Enhanced Design */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "80%", sm: "70%", md: "60%" },
            maxWidth: 380,
            bgcolor: "#ffffff",
            boxShadow: "-4px 0 24px rgba(0,0,0,0.05)",
            borderRadius: { xs: 0, sm: "20px 0 0 20px" },
          },
        }}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          {/* Drawer Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #1a4a6b 0%, #003350 100%)",
              p: { xs: 2.5, sm: 3 },
              color: "white",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box 
                display="flex" 
                alignItems="center"
                onClick={() => {
                  navigate('/');
                  setDrawerOpen(false);
                }}
                sx={{ cursor: "pointer" }}
              >
                <Box
                  sx={{
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    bgcolor: "rgba(255,255,255,0.15)",
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1.5,
                  }}
                >
                  <Typography
                    sx={{ 
                      color: "white", 
                      fontWeight: 700, 
                      fontSize: { xs: "1rem", sm: "1.1rem" }
                    }}
                  >
                    AF
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      color: "white",
                    }}
                  >
                    AssetFlow
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.6rem", sm: "0.65rem" },
                      opacity: 0.7,
                      mt: 0.25,
                    }}
                  >
                    Smart Asset Management
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => setDrawerOpen(false)}
                sx={{ 
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { 
                    bgcolor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: { xs: 20, sm: 22 } }} />
              </IconButton>
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ flex: 1, overflowY: "auto", p: { xs: 2, sm: 2.5 } }}>
            <List sx={{ p: 0 }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleNavClick(item.id)}
                      sx={{
                        borderRadius: 1.5,
                        mb: 0.5,
                        py: { xs: 1.2, sm: 1.5 },
                        backgroundColor: activeSection === item.id ? alpha("#1a4a6b", 0.06) : "transparent",
                        "&:hover": {
                          backgroundColor: alpha("#1a4a6b", 0.04),
                        },
                      }}
                    >
                      <ListItemText 
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: activeSection === item.id ? 600 : 500,
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          color: activeSection === item.id ? "#1a4a6b" : "#1e293b",
                        }}
                      />
                      {activeSection === item.id && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            bgcolor: "#1a4a6b",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </List>

            <Divider sx={{ my: { xs: 2, sm: 2.5 } }} />
            
            {/* Mobile CTA Section (Only Sign In) */}
            <Box display="flex" flexDirection="column" gap={1.5}>
              <Button 
                onClick={() => {
                  navigate('/login');
                  setDrawerOpen(false);
                }}
                variant="outlined"
                fullWidth
                startIcon={<LoginIcon sx={{ fontSize: 18 }} />}
                sx={{
                  borderColor: alpha("#1a4a6b", 0.3),
                  color: "#1a4a6b",
                  fontWeight: 600,
                  fontSize: { xs: "0.8rem", sm: "0.85rem" },
                  textTransform: "none",
                  py: { xs: 1, sm: 1.2 },
                  borderRadius: 1.5,
                  "&:hover": {
                    borderColor: "#1a4a6b",
                    backgroundColor: alpha("#1a4a6b", 0.04),
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Drawer>
    </>
  );
};

export default Navbar;
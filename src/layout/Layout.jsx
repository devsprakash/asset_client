// layout/Layout.jsx
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopBar";

export default function DashboardLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar 
        mobileOpen={mobileOpen} 
        onDrawerToggle={handleDrawerToggle} 
      />
      <Box 
        sx={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          overflow: "hidden",
          width: { xs: "100%", md: "calc(100% - 280px)" },
        }}
      >
        <TopHeader onMenuClick={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "auto",
            bgcolor: "#f8fafc",
            p: { xs: 2, sm: 2.5, md: 3 },
            mt: { xs: '64px', md: 0 }, // Add margin top for mobile header
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
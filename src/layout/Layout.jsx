import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopBar";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopHeader />
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "auto",
            bgcolor: "#f8fafc",
            p: 4
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
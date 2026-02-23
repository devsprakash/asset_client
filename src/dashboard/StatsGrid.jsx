import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const stats = [
  {
    icon: PeopleIcon,
    value: "156",
    label: "Total Customers",
    trend: "+12.5%",
    up: true,
    gradient: "linear-gradient(135deg, #0f4c61 0%, #0a3544 100%)",
  },
  {
    icon: PersonIcon,
    value: "142",
    label: "Active Customers",
    trend: "+8.2%",
    up: true,
    gradient: "linear-gradient(135deg, #177e89 0%, #115e66 100%)",
  },
  {
    icon: AttachMoneyIcon,
    value: "$24.3K",
    label: "Total Sales",
    trend: "+15.3%",
    up: true,
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #075985 100%)",
  },
  {
    icon: DescriptionIcon,
    value: "2",
    label: "Subscription Expiry Soon",
    trend: "-3.1%",
    up: false,
    gradient: "linear-gradient(135deg, #003d4d 0%, #002f3b 100%)",
    valueColor: "#f87171",
  },
];

function StatCard({ icon: Icon, value, label, trend, up, gradient, valueColor }) {
  return (
    <Box
      sx={{
        background: gradient,
        borderRadius: 4,
        p: 3,
        color: "white",
        boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "translateY(-2px)" },
        "&:hover .blob": { transform: "scale(1.5)" },
      }}
    >
      {/* Background blur blob */}
      <Box
        className="blob"
        sx={{
          position: "absolute", top: -16, right: -16,
          width: 96, height: 96, bgcolor: "rgba(255,255,255,0.1)",
          borderRadius: "50%", filter: "blur(20px)",
          transition: "transform 0.7s ease",
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
        {/* Icon */}
        <Box sx={{ p: 1.25, bgcolor: "rgba(255,255,255,0.12)", borderRadius: 2.5 }}>
          <Icon sx={{ fontSize: 24, color: "white" }} />
        </Box>

        {/* Trend badge */}
        <Box
          sx={{
            display: "flex", alignItems: "center", gap: 0.5,
            px: 1.25, py: 0.5, bgcolor: "rgba(255,255,255,0.12)",
            borderRadius: "9999px", fontSize: 10, fontWeight: 700,
          }}
        >
          {up ? (
            <TrendingUpIcon sx={{ fontSize: 12 }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 12 }} />
          )}
          <Typography sx={{ fontSize: 10, fontWeight: 700, color: "white" }}>{trend}</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2, position: "relative" }}>
        <Typography
          sx={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.2, color: valueColor || "white" }}
        >
          {value}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500, mt: 0.5, letterSpacing: 0.5 }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

export default function StatsGrid() {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} lg={3} key={stat.label}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
}

import React from "react";
import { Box, Typography } from "@mui/material";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const data = [
  { month: "Jan", Active: 45, Inactive: 12 },
  { month: "Feb", Active: 52, Inactive: 8 },
  { month: "Mar", Active: 60, Inactive: 15 },
  { month: "Apr", Active: 58, Inactive: 10 },
  { month: "May", Active: 75, Inactive: 7 },
  { month: "Jun", Active: 80, Inactive: 5 },
];

function LegendDot({ color, label, square }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ width: 12, height: 12, bgcolor: color, borderRadius: square ? 0.5 : 0.5 }} />
      <Typography sx={{ fontSize: 11, fontWeight: 600, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.8 }}>
        {label}
      </Typography>
    </Box>
  );
}

export default function CustomerActivityChart() {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 4,
        p: 4,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        border: "1px solid",
        borderColor: "grey.100",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h6" fontWeight={700} color="grey.800" fontSize={16}>
          Customer Activity
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <LegendDot color="#0f4c61" label="Active" />
          <LegendDot color="#cbd5e1" label="Inactive" />
        </Box>
      </Box>

      <Box sx={{ height: 256 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", fontSize: 13 }}
              cursor={{ fill: "rgba(15,76,97,0.04)" }}
            />
            <Bar dataKey="Active" fill="#0f4c61" radius={[6, 6, 0, 0]} maxBarSize={32} />
            <Bar dataKey="Inactive" fill="#cbd5e1" radius={[6, 6, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

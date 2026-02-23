import React from "react";
import { Box, Typography } from "@mui/material";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const data = [
  { name: "North America", value: 42, color: "#0f4c61" },
  { name: "Europe", value: 28, color: "#177e89" },
  { name: "Asia Pacific", value: 18, color: "#2a9d8f" },
  { name: "Others", value: 12, color: "#94a3b8" },
];

function CustomLegend() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>
      {data.map(({ name, value, color }) => (
        <Box key={name} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ width: 10, height: 10, bgcolor: color, borderRadius: "50%", flexShrink: 0 }} />
            <Typography sx={{ fontSize: 12, color: "text.secondary", fontWeight: 500 }}>{name}</Typography>
          </Box>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: "grey.800" }}>{value}%</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default function RevenueDistribution() {
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
      <Typography variant="h6" fontWeight={700} color="grey.800" fontSize={16} mb={3}>
        Revenue Distribution
      </Typography>

      <Box sx={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map(({ name, color }) => (
                <Cell key={name} fill={color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => [`${v}%`, "Share"]}
              contentStyle={{
                borderRadius: 12, border: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)", fontSize: 13,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <CustomLegend />
    </Box>
  );
}

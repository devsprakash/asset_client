import React from "react";
import { Box, Typography } from "@mui/material";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", Created: 140, Submitted: 30 },
  { month: "Feb", Created: 180, Submitted: 40 },
  { month: "Mar", Created: 220, Submitted: 45 },
  { month: "Apr", Created: 200, Submitted: 42 },
  { month: "May", Created: 280, Submitted: 55 },
  { month: "Jun", Created: 250, Submitted: 50 },
];

function LegendDot({ color, label }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ width: 12, height: 12, bgcolor: color, borderRadius: "50%" }} />
      <Typography sx={{ fontSize: 11, fontWeight: 600, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.8 }}>
        {label}
      </Typography>
    </Box>
  );
}

export default function FormUsageChart() {
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
          Form Usage Trend
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <LegendDot color="#177e89" label="Created" />
          <LegendDot color="#0f4c61" label="Submitted" />
        </Box>
      </Box>

      <Box sx={{ height: 256 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
            />
            <Line
              type="monotone"
              dataKey="Created"
              stroke="#177e89"
              strokeWidth={3}
              dot={{ r: 4, fill: "white", strokeWidth: 2, stroke: "#177e89" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Submitted"
              stroke="#0f4c61"
              strokeWidth={3}
              dot={{ r: 4, fill: "white", strokeWidth: 2, stroke: "#0f4c61" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

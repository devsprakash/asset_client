import React from "react";
import { Box, Typography } from "@mui/material";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", sales: 8200 },
  { month: "Feb", sales: 12400 },
  { month: "Mar", sales: 10800 },
  { month: "Apr", sales: 15600 },
  { month: "May", sales: 19200 },
  { month: "Jun", sales: 24300 },
];

export default function SalesOverview() {
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
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6" fontWeight={700} color="grey.800" fontSize={16}>
          Sales Overview
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#0f4c61", bgcolor: "rgba(15,76,97,0.08)", px: 1.5, py: 0.5, borderRadius: 2 }}>
          +15.3% ↑
        </Typography>
      </Box>

      <Box sx={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f4c61" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0f4c61" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(v) => [`$${v.toLocaleString()}`, "Sales"]}
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", fontSize: 13 }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#0f4c61"
              strokeWidth={3}
              fill="url(#salesGradient)"
              dot={{ r: 4, fill: "white", strokeWidth: 2, stroke: "#0f4c61" }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

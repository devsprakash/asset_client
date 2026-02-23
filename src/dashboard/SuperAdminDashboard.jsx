import React from "react";
import { Box, Grid } from "@mui/material";
import StatsGrid from "./StatsGrid";
import CustomerActivityChart from "./CustomerActivityChart";
import FormUsageChart from "./FormUsageChart";
import RevenueDistribution from "./RevenueDistribution";
import SalesOverview from "./SalesOverview";
import RecentActivity from "./RecentActivity";

export default function SuperAdminDashboard() {
  return (
    <Box>
      <StatsGrid />
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <CustomerActivityChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <RevenueDistribution />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormUsageChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SalesOverview />
        </Grid>
        <Grid item xs={12}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
}
// components/UserRoles.jsx - Ultra Minimal Design
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  alpha,
} from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TouchAppIcon from "@mui/icons-material/TouchApp";

const roles = [
  {
    title: "Executive",
    description: "Full system governance. Global oversight, multi-tenant billing, and strategic data exports.",
    icon: <SettingsSuggestIcon sx={{ fontSize: 18 }} />,
    focus: "Governance",
    color: "#1a4a6b",
  },
  {
    title: "Manager",
    description: "Operational excellence. Regional asset management, team leading, and performance tracking.",
    icon: <EngineeringIcon sx={{ fontSize: 18 }} />,
    focus: "Operations",
    color: "#2c6b94",
  },
  {
    title: "Technician",
    description: "Execution focus. Direct field inspections, issue reporting, and real-time task completion.",
    icon: <TouchAppIcon sx={{ fontSize: 18 }} />,
    focus: "Field Work",
    color: "#3d8bb8",
  },
];

const UserRoles = () => {
  return (
    <Box
      id="roles"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        {/* Simple Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{
              color: "#1a4a6b",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              mb: 1,
              display: "block",
            }}
          >
            ROLES
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
              fontWeight: 600,
              color: "#0f172a",
            }}
          >
            Designed for Every Tier
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {roles.map((role, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: "1rem",
                  border: `1px solid ${alpha("#0f172a", 0.06)}`,
                  bgcolor: "#ffffff",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: alpha(role.color, 0.3),
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {/* Icon and Title Row */}
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "0.625rem",
                      bgcolor: alpha(role.color, 0.08),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: role.color,
                    }}
                  >
                    {role.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{ fontSize: "1.2rem", color: "#0f172a" }}
                  >
                    {role.title}
                  </Typography>
                </Stack>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                    mb: 1.5,
                  }}
                >
                  {role.description}
                </Typography>

                {/* Focus Badge */}
                <Box
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.5,
                    bgcolor: alpha(role.color, 0.06),
                    borderRadius: "full",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: role.color,
                    }}
                  >
                    {role.focus}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default UserRoles;
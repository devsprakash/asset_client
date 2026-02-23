import React from "react";
import { Box, Typography, Paper, Avatar, LinearProgress } from "@mui/material";

const teamMembers = [
  { name: "John Doe", role: "Inspector", tasks: 12, completed: 8, avatar: "JD" },
  { name: "Jane Smith", role: "Auditor", tasks: 10, completed: 7, avatar: "JS" },
  { name: "Mike Johnson", role: "Technician", tasks: 15, completed: 9, avatar: "MJ" },
  { name: "Sarah Wilson", role: "Supervisor", tasks: 8, completed: 6, avatar: "SW" },
];

export default function TeamPerformance() {
  return (
    <Paper sx={{ p: 4, borderRadius: 4, height: "100%" }}>
      <Typography variant="h6" fontWeight={700} color="grey.800" gutterBottom>
        Team Performance
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        {teamMembers.map((member) => (
          <Box key={member.name} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Avatar sx={{ bgcolor: "#0f4c61", width: 32, height: 32, fontSize: 14 }}>
                {member.avatar}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600}>{member.name}</Typography>
                <Typography variant="caption" color="text.secondary">{member.role}</Typography>
              </Box>
              <Typography variant="body2" fontWeight={700}>
                {member.completed}/{member.tasks}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(member.completed / member.tasks) * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: "grey.100",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#0f4c61",
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
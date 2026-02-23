import React from "react";
import { Box, Typography, Paper, Avatar, Chip } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const activities = [
  { id: 1, user: "John Doe", action: "completed checklist", target: "Safety Inspection", time: "2 minutes ago", type: "complete" },
  { id: 2, user: "Jane Smith", action: "assigned new task", target: "Equipment Audit", time: "15 minutes ago", type: "assign" },
  { id: 3, user: "Mike Johnson", action: "submitted report", target: "Monthly Review", time: "1 hour ago", type: "submit" },
  { id: 4, user: "Sarah Wilson", action: "updated asset", target: "Generator #1234", time: "3 hours ago", type: "update" },
];

const getIcon = (type) => {
  switch(type) {
    case "complete": return <CheckCircleIcon sx={{ fontSize: 16 }} />;
    case "assign": return <AssignmentIcon sx={{ fontSize: 16 }} />;
    default: return <PersonIcon sx={{ fontSize: 16 }} />;
  }
};

export default function RecentActivity() {
  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Typography variant="h6" fontWeight={700} color="grey.800" gutterBottom>
        Recent Activity
      </Typography>
      
      <Timeline sx={{ p: 0, m: 0 }}>
        {activities.map((activity, index) => (
          <TimelineItem key={activity.id} sx={{ "&:before": { display: "none" } }}>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: "#0f4c61", p: 0.5, m: 0 }}>
                {getIcon(activity.type)}
              </TimelineDot>
              {index < activities.length - 1 && <TimelineConnector sx={{ bgcolor: "grey.200" }} />}
            </TimelineSeparator>
            <TimelineContent sx={{ pb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Typography variant="body2" fontWeight={600}>{activity.user}</Typography>
                <Typography variant="caption" color="text.secondary">{activity.action}</Typography>
                <Chip 
                  label={activity.target}
                  size="small"
                  sx={{ bgcolor: "grey.100", fontSize: 11, fontWeight: 500 }}
                />
              </Box>
              <Typography variant="caption" color="text.disabled">
                {activity.time}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}
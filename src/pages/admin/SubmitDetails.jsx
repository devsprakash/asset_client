import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Chip,
  Button,
  useMediaQuery,
  Divider,
  Container,
  TextField,
  Stack,
  alpha,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactoryIcon from "@mui/icons-material/Factory";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DescriptionIcon from "@mui/icons-material/Description";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import VerifiedIcon from "@mui/icons-material/Verified";

const theme = createTheme({
  palette: {
    primary: { main: "#0f172a" },
    secondary: { main: "#334155" },
    background: { default: "#f8fafc", paper: "#ffffff" },
    success: { main: "#166534", light: "#f0fdf4" },
    warning: { main: "#854d0e", light: "#fef9c3" },
    info: { main: "#0369a1", light: "#e0f2fe" },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h4: { fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontSize: "1.1rem", fontWeight: 700 },
    h6: { fontSize: "1rem", fontWeight: 600 },
    subtitle1: { fontSize: "0.85rem", fontWeight: 600 },
    subtitle2: { fontSize: "0.8rem", fontWeight: 600 },
    body1: { fontSize: "0.8rem" },
    body2: { fontSize: "0.75rem" },
    caption: { fontSize: "0.65rem", fontWeight: 500 },
    overline: { fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.03em" },
  },
  shape: { borderRadius: 10 },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03)",
          border: "1px solid #e2e8f0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.7rem",
          fontWeight: 600,
          borderRadius: 8,
          padding: "6px 12px",
          minHeight: 32,
        },
        contained: { boxShadow: "none" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600 },
        sizeSmall: { height: 20, fontSize: "0.6rem" },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontSize: '0.8rem',
            borderRadius: 10,
          },
        },
      },
    },
  },
});

// Mock response data
const submissionData = {
  id: 1,
  submittedBy: "John Smith",
  submittedDate: "2024-06-15",
  submittedTime: "10:30 AM",
  status: "approved",
  completion: 100,
  reviewedBy: "Admin User",
  reviewedDate: "2024-06-15",
  reviewedTime: "02:45 PM",
  responses: [
    {
      id: 1,
      question: "Inspector Name",
      type: "text",
      required: true,
      answer: "John Smith",
      icon: <PersonIcon sx={{ fontSize: 14 }} />,
    },
    {
      id: 2,
      question: "Facility Location",
      type: "text",
      required: true,
      answer: "Building A - Main Manufacturing Floor",
      icon: <LocationOnIcon sx={{ fontSize: 14 }} />,
    },
    {
      id: 3,
      question: "Inspection Date",
      type: "date",
      required: true,
      answer: "Saturday, June 15, 2024",
      icon: <EventIcon sx={{ fontSize: 14 }} />,
    },
    {
      id: 4,
      question: "Emergency Exits Clear",
      type: "text",
      required: true,
      answer: "Yes, all exits are clear and accessible",
      icon: <ExitToAppIcon sx={{ fontSize: 14 }} />,
    },
    {
      id: 5,
      question: "Electrical Systems",
      type: "checkbox",
      required: true,
      answer: [
        "Circuit breakers labeled",
        "No exposed wiring",
        "Grounding systems intact",
      ],
      icon: <ElectricalServicesIcon sx={{ fontSize: 14 }} />,
    },
  ],
  notes: "Overall facility is in excellent condition. Recommend scheduling regular maintenance for HVAC systems. Minor wear noted on floor markings in Zone C, suggest repainting during next maintenance window.",
  comments: [
    {
      id: 1,
      user: "Admin User",
      date: "2024-06-15",
      time: "02:45 PM",
      comment: "Excellent work on this inspection. All safety protocols followed correctly.",
    },
  ],
};

const SummaryItem = ({ icon, label, value, chip, progress }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
        <Box sx={{ color: "#64748b", display: "flex", alignItems: "center" }}>
          {icon}
        </Box>
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
      </Box>
      {chip ? (
        <Chip
          label={value}
          size="small"
          sx={{
            bgcolor: "#f0fdf4",
            color: "#166534",
            border: "1px solid #dcfce7",
            fontSize: "0.65rem",
            height: 22,
          }}
        />
      ) : progress ? (
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ flex: 1, maxWidth: 100 }}>
            <Box
              sx={{
                height: 6,
                bgcolor: "#f1f5f9",
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${value}%`,
                  height: "100%",
                  bgcolor: "#94a3b8",
                  borderRadius: 3,
                }}
              />
            </Box>
          </Box>
          <Typography variant="body2" fontWeight={600}>
            {value}%
          </Typography>
        </Box>
      ) : (
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {value}
        </Typography>
      )}
    </Box>
  );
};

const ResponseItem = ({ question, required, answer, icon, index }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Box sx={{ mb: 3 }}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: 1,
            bgcolor: alpha("#0f172a", 0.05),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.6rem",
            fontWeight: 700,
            color: "#475569",
          }}
        >
          {index}
        </Box>
        <Typography variant="subtitle2" sx={{ fontSize: isMobile ? "0.75rem" : "0.8rem" }}>
          {question}
        </Typography>
        {required && (
          <Chip
            label="Required"
            size="small"
            sx={{
              bgcolor: alpha("#ef4444", 0.08),
              color: "#ef4444",
              fontSize: "0.5rem",
              height: 16,
              "& .MuiChip-label": { px: 0.8 },
            }}
          />
        )}
      </Box>
      
      <Box sx={{ pl: 3 }}>
        <Box
          sx={{
            borderLeft: "2px solid",
            borderColor: "#cbd5e1",
            pl: 2,
            py: 0.5,
          }}
        >
          {Array.isArray(answer) ? (
            <Stack spacing={1}>
              {answer.map((item, i) => (
                <Box key={i} display="flex" alignItems="center" gap={1}>
                  <CheckCircleIcon sx={{ fontSize: 14, color: "#10b981" }} />
                  <Typography variant="body2" color="text.primary">
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Box display="flex" alignItems="center" gap={1}>
              {icon && (
                <Box sx={{ color: "#64748b" }}>{icon}</Box>
              )}
              <Typography variant="body2" color="text.primary">
                {answer}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <Box
      sx={{
        bgcolor: "#f8fafc",
        borderRadius: 2,
        p: 2,
        border: "1px solid #e2e8f0",
      }}
    >
      <Box display="flex" gap={1.5}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#cbd5e1",
            fontSize: "0.7rem",
          }}
        >
          <PersonIcon sx={{ fontSize: 16, color: "#475569" }} />
        </Avatar>
        <Box flex={1}>
          <Box display="flex" alignItems="baseline" gap={1} mb={0.5}>
            <Typography variant="subtitle2" sx={{ fontSize: "0.75rem" }}>
              {comment.user}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {comment.date} {comment.time}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {comment.comment}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default function SubmissionDetails() {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleBackClick = () => {
    navigate("/admin/view-assigned-checklists");
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      console.log("Adding comment:", comment);
      setComment("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: "#f8fafc", 
        minHeight: "100vh",
        py: isMobile ? 2 : 3,
      }}>
        <Container maxWidth="lg" sx={{ px: isMobile ? 1.5 : 2 }}>
          {/* Header with Back Navigation */}
          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon sx={{ fontSize: isMobile ? 14 : 16 }} />}
              onClick={handleBackClick}
              sx={{
                color: "#475569",
                fontSize: "0.75rem",
                fontWeight: 600,
                p: 0.5,
                mb: 1.5,
                "&:hover": { bgcolor: "transparent", color: "#0f172a" },
              }}
            >
              Back to Form Details
            </Button>
            
            <Box display="flex" justifyContent="space-between" alignItems={isMobile ? "flex-start" : "center"} flexDirection={isMobile ? "column" : "row"} gap={isMobile ? 1.5 : 0}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25 }}>
                  Submission Details
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Safety Inspection Q2 2024
                </Typography>
              </Box>
              
              <Button
                variant="outlined"
                startIcon={<DownloadIcon sx={{ fontSize: isMobile ? 14 : 16 }} />}
                size="small"
                sx={{
                  bgcolor: "white",
                  fontSize: "0.7rem",
                  borderColor: "#cbd5e1",
                }}
              >
                Export PDF
              </Button>
            </Box>
          </Box>

          {/* Summary Section */}
          <Paper elevation={0} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
            <Grid container spacing={isMobile ? 2 : 3}>
              {/* Row 1 */}
              <Grid item xs={6} sm={6} md={3}>
                <SummaryItem
                  icon={<PersonIcon sx={{ fontSize: 12 }} />}
                  label="Submitted By"
                  value={submissionData.submittedBy}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <SummaryItem
                  icon={<CalendarTodayIcon sx={{ fontSize: 12 }} />}
                  label="Submitted Date"
                  value={`${submissionData.submittedDate} ${submissionData.submittedTime}`}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <SummaryItem
                  icon={<CheckCircleIcon sx={{ fontSize: 12 }} />}
                  label="Status"
                  value="Approved"
                  chip
                />
              </Grid>
              <Grid item xs={6} sm={6} md={3}>
                <SummaryItem
                  icon={<AccessTimeIcon sx={{ fontSize: 12 }} />}
                  label="Completion"
                  value={submissionData.completion}
                  progress
                />
              </Grid>

              {/* Divider */}
              <Grid item xs={12}>
                <Divider sx={{ borderColor: "#e2e8f0", my: 1 }} />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={6} sm={6} md={3}>
                <SummaryItem
                  icon={<VerifiedIcon sx={{ fontSize: 12 }} />}
                  label="Reviewed By"
                  value={submissionData.reviewedBy}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={9}>
                <SummaryItem
                  icon={<CalendarTodayIcon sx={{ fontSize: 12 }} />}
                  label="Reviewed Date"
                  value={`${submissionData.reviewedDate} ${submissionData.reviewedTime}`}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Submission Responses */}
          <Paper elevation={0} sx={{ overflow: "hidden", mb: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                p: isMobile ? 2 : 3,
                borderBottom: "1px solid",
                borderColor: "#e2e8f0",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontSize: isMobile ? "0.85rem" : "0.9rem" }}>
                Submission Responses
              </Typography>
              <Chip
                label="7 Questions"
                size="small"
                sx={{
                  bgcolor: alpha("#0f172a", 0.05),
                  color: "#0f172a",
                  fontSize: "0.55rem",
                  height: 18,
                }}
              />
            </Box>
            
            <Box sx={{ p: isMobile ? 2 : 3 }}>
              {submissionData.responses.map((response, index) => (
                <ResponseItem
                  key={response.id}
                  index={index + 1}
                  question={response.question}
                  required={response.required}
                  answer={response.answer}
                  icon={response.icon}
                />
              ))}

              {/* Additional Notes */}
              <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "#e2e8f0" }}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <DescriptionIcon sx={{ fontSize: 16, color: "#64748b" }} />
                  <Typography variant="subtitle2">Additional Notes</Typography>
                </Box>
                <Box sx={{ pl: 3 }}>
                  <Box
                    sx={{
                      borderLeft: "2px solid",
                      borderColor: "#cbd5e1",
                      pl: 2,
                      py: 0.5,
                    }}
                  >
                    <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
                      {submissionData.notes}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Comments Section */}
          <Paper elevation={0} sx={{ overflow: "hidden" }}>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{
                p: isMobile ? 2 : 3,
                borderBottom: "1px solid",
                borderColor: "#e2e8f0",
              }}
            >
              <CommentIcon sx={{ fontSize: 16, color: "#64748b" }} />
              <Typography variant="subtitle1" sx={{ fontSize: isMobile ? "0.85rem" : "0.9rem" }}>
                Comments & Notes
              </Typography>
            </Box>
            
            <Box sx={{ p: isMobile ? 2 : 3 }}>
              {/* Existing Comments */}
              <Stack spacing={2} sx={{ mb: 3 }}>
                {submissionData.comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </Stack>

              {/* Add Comment Input */}
              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  multiline
                  rows={isMobile ? 3 : 4}
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: "white",
                      '& fieldset': {
                        borderColor: "#e2e8f0",
                      },
                      '&:hover fieldset': {
                        borderColor: "#94a3b8",
                      },
                    },
                  }}
                />
                {comment.trim() && (
                  <IconButton
                    size="small"
                    onClick={handleAddComment}
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      bgcolor: "#0f172a",
                      color: "white",
                      '&:hover': {
                        bgcolor: "#1e293b",
                      },
                      width: 28,
                      height: 28,
                    }}
                  >
                    <SendIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  alpha,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  ArrowBack,
  CheckCircle,
  Cancel,
  Person,
  CalendarToday,
  CheckBox,
  ReportProblem,
  Send,
  ExpandMore,
} from "@mui/icons-material";

// ---------- Styled Components ----------
const PageContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "#F8F9FA",
  minHeight: "100vh",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.5),
  },
}));

const StyledHeader = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(3),
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.02)",
  border: "1px solid #e9eef2",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "sticky",
  top: 0,
  zIndex: 10,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 2),
    marginBottom: theme.spacing(2),
  },
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  color: "#6b7280",
  padding: 4,
  "&:hover": {
    color: "#374151",
    backgroundColor: alpha("#6b7280", 0.04),
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#111827",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#FFF7E6",
  color: "#FFB800",
  fontWeight: 600,
  fontSize: "0.6rem",
  height: 22,
  border: "1px solid #FFE7B3",
  "& .MuiChip-label": {
    padding: "0 8px",
  },
}));

const AssetText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.7rem",
  color: "#6b7280",
  marginTop: theme.spacing(0.25),
}));

const ActionButton = styled(Button)(({ theme, variant }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.7rem",
  fontWeight: 600,
  padding: "6px 16px",
  borderRadius: "8px",
  textTransform: "none",
  boxShadow: "none",
  minWidth: "auto",
  ...(variant === "reject" && {
    backgroundColor: "#ffffff",
    color: "#374151",
    border: "1px solid #d1d5db",
    "&:hover": {
      backgroundColor: "#f9fafb",
      borderColor: "#9ca3af",
    },
    "& .MuiButton-startIcon": {
      color: "#6b7280",
    },
  }),
  ...(variant === "approve" && {
    backgroundColor: "#22C55E",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#16a34a",
    },
  }),
}));

const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  border: "1px solid #e9eef2",
  overflow: "hidden",
  height: "fit-content",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.02)",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontWeight: 700,
  fontSize: "0.85rem",
  color: "#111827",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    marginBottom: theme.spacing(1.5),
  },
}));

const InfoGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(1.5),
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

const InfoIconWrapper = styled(Box)(({ theme, bgcolor, iconcolor }) => ({
  width: 36,
  height: 36,
  borderRadius: "8px",
  backgroundColor: bgcolor || "#F0FDF4",
  color: iconcolor || "#22C55E",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "1.1rem",
  },
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.55rem",
  fontWeight: 600,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  marginBottom: theme.spacing(0.25),
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "#111827",
  lineHeight: 1.3,
}));

const ChecklistItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  borderBottom: "1px solid #f3f4f6",
  "&:first-of-type": {
    paddingTop: 0,
  },
  "&:last-child": {
    borderBottom: "none",
    paddingBottom: 0,
  },
}));

const QuestionRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#111827",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));

const AnswerText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.6rem",
  color: "#6b7280",
  marginLeft: theme.spacing(3.5),
  marginTop: theme.spacing(0.5),
}));

const CommentBox = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(3.5),
  marginTop: theme.spacing(1),
  backgroundColor: "#FFF5F5",
  border: "1px solid #FEE2E2",
  borderRadius: "8px",
  padding: theme.spacing(1, 1.5),
  fontSize: "0.65rem",
  color: "#EF4444",
  fontWeight: 500,
}));

const StickySidebar = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: theme.spacing(8),
  [theme.breakpoints.down("lg")]: {
    position: "static",
  },
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.7rem",
  fontWeight: 700,
  color: "#111827",
  marginBottom: theme.spacing(0.5),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "#f9fafb",
  fontSize: "0.7rem",
  height: 40,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e5e7eb",
    borderRadius: "8px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#003B50",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#003B50",
    borderWidth: 1,
  },
}));

const StyledTextArea = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: "#f9fafb",
    fontSize: "0.7rem",
    borderRadius: "8px",
    padding: theme.spacing(1, 1.5),
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e5e7eb",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#003B50",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#003B50",
    borderWidth: 1,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.7rem",
  fontWeight: 700,
  padding: "10px",
  borderRadius: "8px",
  textTransform: "none",
  backgroundColor: "#003B50",
  color: "#ffffff",
  width: "100%",
  marginTop: theme.spacing(2),
  "&:hover": {
    backgroundColor: "#002A3A",
  },
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(0.5),
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  },
}));

// ---------- Mock Data ----------
const reportData = {
  formName: "Safety Inspection",
  assetName: "Forklift X-200",
  status: "Pending Review",
  submittedBy: "Mike Johnson",
  dateTime: "2024-11-03 14:30",
  score: "95%",
  issues: "1",
  checklist: [
    { id: 1, question: "Are all safety guards in place?", answer: "Yes" },
    { id: 2, question: "Is the fire extinguisher accessible?", answer: "Yes" },
    { id: 3, question: "Are emergency exits clear?", answer: "Yes" },
    {
      id: 4,
      question: "Is protective equipment available?",
      answer: "Partial",
      note: "Missing safety goggles in Zone B",
    },
    { id: 5, question: "Are warning signs visible?", answer: "Yes" },
  ],
};

function ReportDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [assignTo, setAssignTo] = useState("");
  const [customField, setCustomField] = useState("");
  const [instructions, setInstructions] = useState("");

  return (
    <PageContainer maxWidth="xl">
      {/* Header */}
      <StyledHeader>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <BackButton component={RouterLink} to="/admin/reports" size="small">
            <ArrowBack sx={{ fontSize: "1.2rem" }} />
          </BackButton>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.25 }}>
              <HeaderTitle>{reportData.formName}</HeaderTitle>
              <StatusChip label={reportData.status} size="small" />
            </Stack>
            <AssetText>{reportData.assetName}</AssetText>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <ActionButton
            variant="reject"
            startIcon={<Cancel sx={{ fontSize: "1rem" }} />}
          >
            Reject
          </ActionButton>
          <ActionButton
            variant="approve"
            startIcon={<CheckCircle sx={{ fontSize: "1rem" }} />}
          >
            Approve
          </ActionButton>
        </Stack>
      </StyledHeader>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* Report Information */}
            <SectionCard>
              <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
                <SectionTitle>Report Information</SectionTitle>
                <InfoGrid>
                  <InfoItem>
                    <InfoIconWrapper bgcolor="#F0FDF4" iconcolor="#22C55E">
                      <Person />
                    </InfoIconWrapper>
                    <Box>
                      <InfoLabel>Submitted By</InfoLabel>
                      <InfoValue>{reportData.submittedBy}</InfoValue>
                    </Box>
                  </InfoItem>
                  <InfoItem>
                    <InfoIconWrapper bgcolor="#F0F9FF" iconcolor="#0EA5E9">
                      <CalendarToday />
                    </InfoIconWrapper>
                    <Box>
                      <InfoLabel>Date & Time</InfoLabel>
                      <InfoValue>{reportData.dateTime}</InfoValue>
                    </Box>
                  </InfoItem>
                  <InfoItem>
                    <InfoIconWrapper bgcolor="#F0FDF4" iconcolor="#22C55E">
                      <CheckBox />
                    </InfoIconWrapper>
                    <Box>
                      <InfoLabel>Score</InfoLabel>
                      <InfoValue>{reportData.score}</InfoValue>
                    </Box>
                  </InfoItem>
                  <InfoItem>
                    <InfoIconWrapper bgcolor="#FEF2F2" iconcolor="#EF4444">
                      <ReportProblem />
                    </InfoIconWrapper>
                    <Box>
                      <InfoLabel>Issues Found</InfoLabel>
                      <InfoValue>{reportData.issues}</InfoValue>
                    </Box>
                  </InfoItem>
                </InfoGrid>
              </Box>
            </SectionCard>

            {/* Checklist Responses */}
            <SectionCard>
              <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
                <SectionTitle sx={{ mb: 2.5 }}>Checklist Responses</SectionTitle>
                <Box>
                  {reportData.checklist.map((item) => (
                    <ChecklistItem key={item.id}>
                      <QuestionRow>
                        {item.answer === "Yes" && (
                          <CheckCircle sx={{ fontSize: "1.1rem", color: "#22C55E" }} />
                        )}
                        {item.answer === "Partial" && (
                          <Cancel sx={{ fontSize: "1.1rem", color: "#EF4444" }} />
                        )}
                        <QuestionText>{item.question}</QuestionText>
                      </QuestionRow>
                      <AnswerText>Answer: {item.answer}</AnswerText>
                      {item.note && (
                        <CommentBox>
                          {item.note}
                        </CommentBox>
                      )}
                    </ChecklistItem>
                  ))}
                </Box>
              </Box>
            </SectionCard>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          <StickySidebar>
            <SectionCard>
              <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
                <SectionTitle sx={{ mb: 1 }}>Corrective Plan</SectionTitle>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.7rem",
                    color: "#6b7280",
                    mb: 3,
                    lineHeight: 1.5,
                  }}
                >
                  Assign a pending inspection to a team member with specific instructions.
                </Typography>

                <Stack spacing={2.5}>
                  <Box>
                    <FormLabel>Assign To</FormLabel>
                    <FormControl fullWidth size="small">
                      <StyledSelect
                        value={assignTo}
                        onChange={(e) => setAssignTo(e.target.value)}
                        displayEmpty
                        IconComponent={ExpandMore}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <span style={{ color: "#9ca3af" }}>Select team member</span>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem value="" disabled>Select team member</MenuItem>
                        <MenuItem value="John Doe">John Doe</MenuItem>
                        <MenuItem value="Sarah Wilson">Sarah Wilson</MenuItem>
                        <MenuItem value="Mike Johnson">Mike Johnson</MenuItem>
                        <MenuItem value="Emily Chen">Emily Chen</MenuItem>
                      </StyledSelect>
                    </FormControl>
                  </Box>

                  <Box>
                    <FormLabel>Add Custom Field</FormLabel>
                    <FormControl fullWidth size="small">
                      <StyledSelect
                        value={customField}
                        onChange={(e) => setCustomField(e.target.value)}
                        displayEmpty
                        IconComponent={ExpandMore}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <span style={{ color: "#9ca3af" }}>Choose a field to add</span>;
                          }
                          return selected;
                        }}
                      >
                        <MenuItem value="" disabled>Choose a field to add</MenuItem>
                        <MenuItem value="Due Date">Due Date</MenuItem>
                        <MenuItem value="Priority">Priority</MenuItem>
                        <MenuItem value="Cost Estimate">Cost Estimate</MenuItem>
                      </StyledSelect>
                    </FormControl>
                  </Box>

                  <Box>
                    <FormLabel>Instructions</FormLabel>
                    <StyledTextArea
                      fullWidth
                      multiline
                      rows={4}
                      placeholder=""
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      variant="outlined"
                    />
                  </Box>

                  <SubmitButton
                    variant="contained"
                    startIcon={<Send sx={{ fontSize: "1rem" }} />}
                  >
                    Submit Corrective Plan
                  </SubmitButton>
                </Stack>
              </Box>
            </SectionCard>
          </StickySidebar>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default ReportDetails;
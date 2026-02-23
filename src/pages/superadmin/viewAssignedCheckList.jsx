import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
  Paper,
  Stack,
  Avatar,
  Tooltip,
  Divider,
  useMediaQuery,
  useTheme,
  Container,
  Button,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Assessment as AssessmentIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Custom color
const primaryColor = "#0f4c61";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid',
  borderColor: theme.palette.divider,
  transition: 'all 0.2s',
  '&:hover': { 
    transform: 'translateY(-2px)', 
    boxShadow: theme.shadows[4],
  },
  height: '100%',
}));

const StatCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  '&:last-child': {
    paddingBottom: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const StyledChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 24,
  ...(status === 'Approved' && {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(46, 125, 50, 0.2)' 
      : '#e8f5e9',
    color: '#2e7d32',
  }),
  ...(status === 'Pending Review' && {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(237, 108, 2, 0.2)' 
      : '#fff3e0',
    color: '#ed6c02',
  }),
}));

const SubmissionCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: 10,
  },
}));

const StatIconWrapper = styled(Avatar)(({ theme, color }) => ({
  width: 48,
  height: 48,
  backgroundColor: color === 'primary' 
    ? `${primaryColor}15`
    : color === 'info'
    ? theme.palette.mode === 'dark' ? 'rgba(2, 136, 209, 0.2)' : '#e1f5fe'
    : color === 'success'
    ? theme.palette.mode === 'dark' ? 'rgba(46, 125, 50, 0.2)' : '#e8f5e9'
    : color === 'warning'
    ? theme.palette.mode === 'dark' ? 'rgba(237, 108, 2, 0.2)' : '#fff3e0'
    : theme.palette.action.hover,
  [theme.breakpoints.down('sm')]: {
    width: 40,
    height: 40,
  },
}));

const StatCard = ({ icon, title, value, color }) => {
  const theme = useTheme();
  
  const getIconColor = () => {
    switch(color) {
      case 'primary': return primaryColor;
      case 'info': return theme.palette.info.main;
      case 'success': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      default: return primaryColor;
    }
  };

  return (
    <StyledCard elevation={0}>
      <StatCardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <StatIconWrapper color={color}>
            <Box sx={{ 
              color: getIconColor(),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {icon}
            </Box>
          </StatIconWrapper>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                fontWeight: 500,
                mb: 0.5,
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                lineHeight: 1.2,
              }}
            >
              {value}
            </Typography>
          </Box>
        </Stack>
      </StatCardContent>
    </StyledCard>
  );
};

export default function SafetyInspectionDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);

  const submissions = [
    {
      name: 'John Smith',
      date: '2024-06-15 10:30 AM',
      status: 'Approved',
      completion: 100,
    },
    {
      name: 'Sarah Johnson',
      date: '2024-06-14 02:15 PM',
      status: 'Pending Review',
      completion: 95,
    },
    {
      name: 'Michael Brown',
      date: '2024-06-13 09:45 AM',
      status: 'Pending Review',
      completion: 80,
    },
    {
      name: 'Emily Davis',
      date: '2024-06-12 11:20 AM',
      status: 'Approved',
      completion: 100,
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const tabs = [
    { label: 'Submissions', icon: <DescriptionIcon /> },
    { label: 'Checklist Structure', icon: <AssessmentIcon /> },
    { label: 'Assignees', icon: <PeopleIcon /> },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ mb: { xs: 3, sm: 4 } }}
      >
        <IconButton 
          onClick={handleBack}
          sx={{ 
            color: primaryColor,
            '&:hover': { 
              bgcolor: `${primaryColor}10`,
            },
          }}
        >
          <ArrowBackIcon fontSize={isMobile ? "medium" : "large"} />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
              mb: 0.5,
            }}
          >
            Safety Inspection Q2 2024
          </Typography>
          <Typography 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
            }}
          >
            In Progress • Quarterly safety inspection for all facilities and equipment
          </Typography>
        </Box>
        
        {/* Desktop Action Buttons */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<AssessmentIcon />}
              size="small"
              sx={{
                borderColor: primaryColor,
                color: primaryColor,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                '&:hover': {
                  borderColor: primaryColor,
                  backgroundColor: `${primaryColor}10`,
                },
              }}
            >
              Analytics
            </Button>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              size="small"
              sx={{
                borderColor: primaryColor,
                color: primaryColor,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                '&:hover': {
                  borderColor: primaryColor,
                  backgroundColor: `${primaryColor}10`,
                },
              }}
            >
              Edit Checklist
            </Button>
          </Box>
        )}
      </Stack>

      {/* Stats Grid */}
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid item xs={6} md={3}>
          <StatCard
            icon={<DescriptionIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
            title="Total Submissions"
            value="12"
            color="primary"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            icon={<PeopleIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
            title="Total Assignees"
            value="20"
            color="info"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            icon={<CheckCircleIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
            title="Completion Rate"
            value="60%"
            color="success"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            icon={<AccessTimeIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
            title="Days Remaining"
            value="15"
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Overall Progress */}
      <StyledPaper elevation={0} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              mb: 2,
            }}
          >
            Overall Progress
          </Typography>
          <Box>
            <Stack 
              direction="row" 
              justifyContent="space-between" 
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                12 of 20 completed
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  color: primaryColor,
                }}
              >
                60%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={60}
              sx={{
                height: { xs: 8, sm: 10 },
                borderRadius: 5,
                bgcolor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: primaryColor,
                },
              }}
            />
          </Box>
        </Box>
      </StyledPaper>

      {/* Mobile Action Buttons */}
      {isMobile && (
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            mb: 3,
            overflowX: 'auto',
            pb: 0.5,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <Button
            variant="outlined"
            startIcon={<AssessmentIcon />}
            size="small"
            sx={{
              borderColor: primaryColor,
              color: primaryColor,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.7rem',
              whiteSpace: 'nowrap',
              '&:hover': {
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}10`,
              },
            }}
          >
            Analytics
          </Button>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            size="small"
            sx={{
              borderColor: primaryColor,
              color: primaryColor,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.7rem',
              whiteSpace: 'nowrap',
              '&:hover': {
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}10`,
              },
            }}
          >
            Edit Checklist
          </Button>
        </Stack>
      )}

      {/* Tabs */}
      <StyledPaper elevation={0}>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
        }}>
          <Stack 
            direction="row" 
            spacing={{ xs: 2, sm: 4 }}
            sx={{ 
              px: { xs: 2, sm: 3 },
              minWidth: { xs: 400, sm: 'auto' },
            }}
          >
            {tabs.map((tab, index) => (
              <Box
                key={index}
                onClick={() => setActiveTab(index)}
                sx={{
                  py: 2,
                  borderBottom: 2,
                  borderColor: activeTab === index ? primaryColor : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box sx={{ 
                  color: activeTab === index ? primaryColor : 'text.secondary',
                }}>
                  {tab.icon}
                </Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: activeTab === index ? 600 : 400,
                    color: activeTab === index ? primaryColor : 'text.secondary',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Submissions Tab Content */}
          {activeTab === 0 && (
            <>
              <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                sx={{ mb: 3 }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                  }}
                >
                  Recent Submissions
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  size="small"
                  sx={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    '&:hover': {
                      borderColor: primaryColor,
                      backgroundColor: `${primaryColor}10`,
                    },
                  }}
                >
                  Export All
                </Button>
              </Stack>

              {submissions.map((item, i) => (
                <SubmissionCard key={i} variant="outlined" elevation={0}>
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    {/* Mobile Layout */}
                    {isMobile ? (
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: '0.9rem' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                              {item.date}
                            </Typography>
                          </Box>
                          <StyledChip
                            label={item.status}
                            status={item.status}
                            size="small"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={item.completion}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                bgcolor: theme.palette.grey[200],
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: item.completion === 100 ? theme.palette.success.main : primaryColor,
                                },
                              }}
                            />
                          </Box>
                          <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                            {item.completion}%
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <Tooltip title="View">
                            <IconButton size="small" sx={{ color: primaryColor }}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton size="small" sx={{ color: primaryColor }}>
                              <GetAppIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>
                    ) : (
                      /* Desktop Layout */
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: '0.9rem' }}>
                            {item.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {item.date}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <StyledChip
                            label={item.status}
                            status={item.status}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={item.completion}
                              sx={{
                                width: 80,
                                height: 6,
                                borderRadius: 3,
                                bgcolor: theme.palette.grey[200],
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: item.completion === 100 ? theme.palette.success.main : primaryColor,
                                },
                              }}
                            />
                            <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.75rem' }}>
                              {item.completion}%
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={2} sx={{ textAlign: 'right' }}>
                          <Tooltip title="View">
                            <IconButton size="small" sx={{ color: primaryColor }}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton size="small" sx={{ color: primaryColor }}>
                              <GetAppIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    )}
                  </CardContent>
                </SubmissionCard>
              ))}
            </>
          )}

          {/* Other Tab Contents - Placeholder */}
          {activeTab === 1 && (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Checklist Structure Content
              </Typography>
            </Box>
          )}
          {activeTab === 2 && (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Assignees Content
              </Typography>
            </Box>
          )}
        </Box>
      </StyledPaper>
    </Container>
  );
}
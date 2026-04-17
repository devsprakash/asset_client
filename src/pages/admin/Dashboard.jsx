import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  alpha,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Custom styled components with reduced font sizes
const KpiCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  backgroundColor: '#ffffff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const IconWrapper = styled(Box)(({ bgcolor }) => ({
  backgroundColor: bgcolor || '#e6f0ff',
  padding: '8px',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    fontSize: '1.2rem',
    color: bgcolor === '#fff4e5' ? '#ff9f1c' : '#003e54',
  },
  [theme => theme.breakpoints.down('sm')]: {
    padding: '6px',
    '& svg': {
      fontSize: '1rem',
    },
  },
}));

const ChartCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  backgroundColor: '#ffffff',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const ActivityItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f8fafc',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  },
}));

const StyledChip = styled(Chip)(({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return {
          backgroundColor: '#003e54',
          color: '#ffffff',
        };
      case 'progress':
        return {
          backgroundColor: '#93c5fd',
          color: '#1e3a8a',
        };
      case 'warning':
        return {
          backgroundColor: '#ef4444',
          color: '#ffffff',
        };
      case 'info':
        return {
          backgroundColor: '#bae6fd',
          color: '#0369a1',
        };
      default:
        return {
          backgroundColor: '#e2e8f0',
          color: '#475569',
        };
    }
  };

  return {
    height: 20,
    fontSize: '0.6rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    '& .MuiChip-label': {
      padding: '0 8px',
    },
    ...getStatusStyles(),
  };
});

const TrendBadge = styled(Box)(({ trend }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2px',
  fontSize: '0.65rem',
  fontWeight: 600,
  color: '#10b981',
  marginTop: '4px',
  '& svg': {
    fontSize: '0.8rem',
  },
}));

const LegendDot = styled(Box)(({ color }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: '4px',
  [theme => theme.breakpoints.down('sm')]: {
    width: 8,
    height: 8,
  },
}));

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const kpiData = [
    {
      title: 'Active Assets',
      value: '225',
      trend: '+8% from last month',
      icon: <InventoryIcon />,
      iconBg: '#e6f0ff',
    },
    {
      title: 'Assigned Checklist',
      value: '12',
      trend: '+3 new this week',
      icon: <AssignmentIcon />,
      iconBg: '#e6f0ff',
    },
    {
      title: 'Completed Inspections',
      value: '206',
      trend: '+15% from last month',
      icon: <CheckCircleIcon />,
      iconBg: '#e8f5e9',
    },
    {
      title: 'Team Members',
      value: '23',
      trend: 'All active',
      icon: <PeopleIcon />,
      iconBg: '#fff4e5',
    },
  ];

  const activityData = [
    {
      initials: 'MJ',
      name: 'Mike Johnson',
      action: 'Completed inspection',
      asset: 'Generator Unit A-12',
      status: 'success',
      time: '5 min ago',
    },
    {
      initials: 'SW',
      name: 'Sarah Williams',
      action: 'Started inspection',
      asset: 'HVAC System B-04',
      status: 'progress',
      time: '15 min ago',
    },
    {
      initials: 'TA',
      name: 'Tom Anderson',
      action: 'Reported issue',
      asset: 'Conveyor Belt C-21',
      status: 'warning',
      time: '1 hour ago',
    },
    {
      initials: 'LB',
      name: 'Lisa Brown',
      action: 'Completed inspection',
      asset: 'Pump Station D-07',
      status: 'success',
      time: '2 hours ago',
    },
    {
      initials: 'MJ',
      name: 'Mike Johnson',
      action: 'Updated asset info',
      asset: 'Compressor E-15',
      status: 'info',
      time: '3 hours ago',
    },
  ];

  const renderInspectionTrend = () => (
    <Box sx={{ position: 'relative', width: '100%', height: isMobile ? 180 : 220 }}>
      <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%' }}>
        {/* Grid lines */}
        <line stroke="#f1f5f9" strokeDasharray="2 2" x1="40" x2="480" y1="30" y2="30" />
        <line stroke="#f1f5f9" strokeDasharray="2 2" x1="40" x2="480" y1="70" y2="70" />
        <line stroke="#f1f5f9" strokeDasharray="2 2" x1="40" x2="480" y1="110" y2="110" />
        <line stroke="#e2e8f0" x1="40" x2="480" y1="150" y2="150" />

        {/* Axis Labels */}
        <text fill="#94a3b8" fontSize={isMobile ? "8" : "10"} textAnchor="end" x="35" y="35">80</text>
        <text fill="#94a3b8" fontSize={isMobile ? "8" : "10"} textAnchor="end" x="35" y="75">60</text>
        <text fill="#94a3b8" fontSize={isMobile ? "8" : "10"} textAnchor="end" x="35" y="115">40</text>
        <text fill="#94a3b8" fontSize={isMobile ? "8" : "10"} textAnchor="end" x="35" y="155">20</text>
        
        {/* Week labels */}
        <text fill="#94a3b8" fontSize={isMobile ? "7" : "9"} textAnchor="middle" x="40" y="185">W1</text>
        <text fill="#94a3b8" fontSize={isMobile ? "7" : "9"} textAnchor="middle" x="180" y="185">W2</text>
        <text fill="#94a3b8" fontSize={isMobile ? "7" : "9"} textAnchor="middle" x="330" y="185">W3</text>
        <text fill="#94a3b8" fontSize={isMobile ? "7" : "9"} textAnchor="middle" x="470" y="185">W4</text>

        {/* Completed Data Path (Navy) */}
        <path d="M40,100 L180,80 L330,95 L470,60" fill="none" stroke="#003e54" strokeWidth="2.5" />
        <circle cx="40" cy="100" fill="#003e54" r="3.5" />
        <circle cx="180" cy="80" fill="#003e54" r="3.5" />
        <circle cx="330" cy="95" fill="#003e54" r="3.5" />
        <circle cx="470" cy="60" fill="#003e54" r="3.5" />

        {/* Pending Data Path (Orange) */}
        <path d="M40,170 L180,180 L330,165 L470,185" fill="none" stroke="#ff9f1c" strokeWidth="2.5" />
        <circle cx="40" cy="170" fill="#ff9f1c" r="3.5" />
        <circle cx="180" cy="180" fill="#ff9f1c" r="3.5" />
        <circle cx="330" cy="165" fill="#ff9f1c" r="3.5" />
        <circle cx="470" cy="185" fill="#ff9f1c" r="3.5" />
      </svg>
    </Box>
  );

  const renderPieChart = () => (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: isMobile ? 140 : 180,
    }}>
      <svg width={isMobile ? 120 : 160} height={isMobile ? 120 : 160} viewBox="0 0 100 100">
        {/* Navy slice (dominant) */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#003e54"
          strokeWidth="20"
          strokeDasharray="160 251.2"
          transform="rotate(-90 50 50)"
        />
        {/* Light Blue slice */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#bae6fd"
          strokeWidth="20"
          strokeDasharray="40 251.2"
          strokeDashoffset="-160"
          transform="rotate(-90 50 50)"
        />
        {/* Orange slice */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#ff9f1c"
          strokeWidth="20"
          strokeDasharray="30 251.2"
          strokeDashoffset="-200"
          transform="rotate(-90 50 50)"
        />
        {/* Red slice */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="#ef4444"
          strokeWidth="20"
          strokeDasharray="21.2 251.2"
          strokeDashoffset="-230"
          transform="rotate(-90 50 50)"
        />
      </svg>
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#f8fafc',
      fontFamily: '"Inter", sans-serif',
    }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
        }}>
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                color: '#003e54',
                fontSize: { xs: '1.2rem', sm: '1.4rem' },
              }}
            >
              Dashboard
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#64748b',
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
              }}
            >
              Overview of your assets and team activity
            </Typography>
          </Box>
          <IconButton 
            size="small"
            sx={{ 
              border: '1px solid #e2e8f0',
              borderRadius: 1.5,
              p: 1,
            }}
          >
            <ViewModuleIcon sx={{ fontSize: '1.2rem', color: '#94a3b8' }} />
          </IconButton>
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={isMobile ? 1.5 : 2} sx={{ mb: 3 }}>
          {kpiData.map((kpi, index) => (
            <Grid item xs={6} md={3} key={index}>
              <KpiCard>
                <Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#94a3b8', 
                      fontWeight: 500,
                      fontSize: '0.6rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {kpi.title}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#334155',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' },
                      mt: 0.5,
                    }}
                  >
                    {kpi.value}
                  </Typography>
                  <TrendBadge trend="up">
                    <TrendingUpIcon sx={{ fontSize: '0.8rem' }} />
                    <Typography variant="caption" sx={{ fontSize: '0.6rem', fontWeight: 600 }}>
                      {kpi.trend}
                    </Typography>
                  </TrendBadge>
                </Box>
                <IconWrapper bgcolor={kpi.iconBg}>
                  {kpi.icon}
                </IconWrapper>
              </KpiCard>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={isMobile ? 1.5 : 2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <ChartCard>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#334155',
                  fontSize: '0.75rem',
                  mb: 2,
                }}
              >
                Inspection Trend
              </Typography>
              {renderInspectionTrend()}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 3, 
                mt: 2,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LegendDot color="#003e54" />
                  <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#475569' }}>
                    completed
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LegendDot color="#ff9f1c" />
                  <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#475569' }}>
                    pending
                  </Typography>
                </Box>
              </Box>
            </ChartCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartCard>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#334155',
                  fontSize: '0.75rem',
                  mb: 2,
                }}
              >
                Asset Status Distribution
              </Typography>
              {renderPieChart()}
            </ChartCard>
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 2,
            border: '1px solid #f1f5f9',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ 
            p: 2,
            borderBottom: '1px solid #f1f5f9',
          }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600, 
                color: '#334155',
                fontSize: '0.75rem',
              }}
            >
              Recent Team Activity
            </Typography>
          </Box>
          <Box>
            {activityData.map((activity, index) => (
              <React.Fragment key={index}>
                <ActivityItem>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5,
                    width: { xs: '100%', sm: 'auto' },
                  }}>
                    <Avatar 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        bgcolor: '#f1f5f9',
                        color: '#475569',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                      }}
                    >
                      {activity.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontSize: '0.7rem' }}>
                        <span style={{ fontWeight: 700, color: '#334155' }}>{activity.name}</span>
                        <span style={{ color: '#64748b' }}> {activity.action}</span>
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#94a3b8' }}>
                        {activity.asset}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5,
                    width: { xs: '100%', sm: 'auto' },
                    justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                    mt: { xs: 0.5, sm: 0 },
                  }}>
                    <StyledChip status={activity.status} label={activity.status} />
                    <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#94a3b8' }}>
                      {activity.time}
                    </Typography>
                  </Box>
                </ActivityItem>
                {index < activityData.length - 1 && (
                  <Divider sx={{ borderColor: '#f1f5f9' }} />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Dashboard;
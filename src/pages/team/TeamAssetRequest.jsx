import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  IconButton,
  Avatar,
  Badge,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Card,
  CardContent,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
  Zoom,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useNavigate } from 'react-router-dom'

// Custom styled components with reduced font sizes
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  fontFamily: '"Inter", sans-serif',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2.5),
  },
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  backgroundColor: '#ffffff',
  '&:hover': {
    backgroundColor: '#f8fafc',
  },
  '& svg': {
    fontSize: '1.1rem',
    color: '#0f4c5c',
  },
  [theme.breakpoints.down('sm')]: {
    width: 32,
    height: 32,
    '& svg': {
      fontSize: '1rem',
    },
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 700,
  color: '#0f4c5c',
  lineHeight: 1.2,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  color: '#64748b',
  marginTop: theme.spacing(0.2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
  },
}));

const TabContainer = styled(Paper)(({ theme }) => ({
  display: 'inline-flex',
  backgroundColor: '#f1f5f9',
  padding: theme.spacing(0.5),
  borderRadius: 8,
  marginBottom: theme.spacing(3),
  width: 'fit-content',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& .MuiToggleButtonGroup-root': {
      width: '100%',
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: theme.spacing(0.6, 2),
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: 6,
  color: '#64748b',
  border: 'none',
  '&.Mui-selected': {
    backgroundColor: '#ffffff',
    color: '#0f4c5c',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.8),
  },
  [theme.breakpoints.down('sm')]: {
    flex: 1,
    fontSize: '0.65rem',
    padding: theme.spacing(0.5, 1),
  },
}));

const SummaryCard = styled(Paper)(({ theme, status }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 12,
  border: '1px solid',
  borderColor: status === 'pending' ? '#fde68a' : '#bbf7d0',
  backgroundColor: status === 'pending' ? '#fffbeb' : '#f0fdf4',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2),
    gap: theme.spacing(1),
  },
}));

const SummaryIcon = styled(Box)(({ theme, status }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: status === 'pending' ? '#fed7aa' : '#bbf7d0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    fontSize: '1.1rem',
    color: status === 'pending' ? '#c2410c' : '#166534',
  },
  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
    '& svg': {
      fontSize: '1rem',
    },
  },
}));

const SummaryLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.6rem',
  fontWeight: 600,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.55rem',
  },
}));

const SummaryValue = styled(Typography)(({ theme, status }) => ({
  fontSize: '1.6rem',
  fontWeight: 700,
  color: status === 'pending' ? '#c2410c' : '#166534',
  lineHeight: 1,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3rem',
  },
}));

const RequestCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  backgroundColor: '#ffffff',
  height: '100%',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(15,76,92,0.08)',
    borderColor: alpha('#0f4c5c', 0.2),
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 1.5, 1, 1.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

const AssetTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 700,
  color: '#1e293b',
  marginBottom: theme.spacing(0.3),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const AssetSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.65rem',
  color: '#64748b',
  marginBottom: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  '& svg': {
    fontSize: '0.7rem',
    color: '#94a3b8',
  },
}));

const LocationText = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.3),
  color: '#94a3b8',
  fontSize: '0.65rem',
  '& svg': {
    fontSize: '0.7rem',
    color: '#94a3b8',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
  },
}));

const StatusChip = styled(Chip)(({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return {
          backgroundColor: '#fffbeb',
          color: '#92400e',
          borderColor: '#fde68a',
        };
      case 'approved':
        return {
          backgroundColor: '#f0fdf4',
          color: '#166534',
          borderColor: '#bbf7d0',
        };
      case 'rejected':
        return {
          backgroundColor: '#fef2f2',
          color: '#991b1b',
          borderColor: '#fecaca',
        };
      default:
        return {
          backgroundColor: '#f1f5f9',
          color: '#475569',
          borderColor: '#e2e8f0',
        };
    }
  };

  return {
    height: 22,
    fontSize: '0.6rem',
    fontWeight: 600,
    borderRadius: 20,
    '& .MuiChip-label': {
      padding: '0 8px',
    },
    ...getStatusStyles(),
  };
});

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0.5, 0),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const InfoLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: '0.65rem',
  color: '#94a3b8',
  '& svg': {
    fontSize: '0.7rem',
    color: '#cbd5e1',
  },
}));

const InfoValue = styled(Typography)(({ theme, highlight }) => ({
  fontSize: '0.65rem',
  fontWeight: 600,
  color: highlight ? '#0f4c5c' : '#334155',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
  },
}));

const ViewButton = styled(Button)(({ theme, hasdot }) => ({
  width: '100%',
  padding: theme.spacing(0.8),
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  borderRadius: 8,
  color: '#475569',
  fontSize: '0.65rem',
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: '#ffffff',
  position: 'relative',
  '&:hover': {
    backgroundColor: '#f8fafc',
    borderColor: '#0f4c5c',
  },
  '& .dot': {
    position: 'absolute',
    right: '30%',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#ef4444',
    display: hasdot ? 'block' : 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.6),
    fontSize: '0.6rem',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 700,
  color: '#0f4c5c',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    marginBottom: theme.spacing(1.5),
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6, 2),
  backgroundColor: '#ffffff',
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  '& svg': {
    fontSize: '3rem',
    color: '#cbd5e1',
    marginBottom: theme.spacing(2),
  },
  '& h6': {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#475569',
    marginBottom: theme.spacing(1),
  },
  '& p': {
    fontSize: '0.7rem',
    color: '#94a3b8',
  },
}));

// Parent Assets
const parentRequests = [
  {
    id: 1,
    title: 'Generator Unit A-12',
    location: 'Building A Floor 3',
    status: 'pending',
    category: 'Electrical',
    lastInspection: '2024-10-28',
    nextDue: '2024-11-28',
    parentId: 'PAR-001',
    requestDate: '2024-10-25',
  },
  {
    id: 2,
    title: 'HVAC System B-04',
    location: 'Building B - Rooftop',
    status: 'rejected',
    category: 'HVAC',
    lastInspection: '2024-10-25',
    nextDue: '2024-11-25',
    parentId: 'PAR-002',
    requestDate: '2024-10-22',
  },
  {
    id: 3,
    title: 'Conveyor Belt C-21',
    location: 'Warehouse Section C',
    status: 'approved',
    category: 'Machinery',
    lastInspection: '2024-10-20',
    nextDue: '2024-11-20',
    parentId: 'PAR-003',
    requestDate: '2024-10-18',
  },
  {
    id: 4,
    title: 'Pump Station D-07',
    location: 'Building D - Basement',
    status: 'pending',
    category: 'Plumbing',
    lastInspection: '2024-10-30',
    nextDue: '2024-11-30',
    parentId: 'PAR-004',
    requestDate: '2024-10-28',
  },
  {
    id: 5,
    title: 'Fire Panel F-02',
    location: 'Building F - Lobby',
    status: 'approved',
    category: 'Safety',
    lastInspection: '2024-10-29',
    nextDue: '2024-11-29',
    parentId: 'PAR-005',
    requestDate: '2024-10-26',
  },
];

const childRequests = [
  {
    id: 101,
    title: 'Control Panel PCB-12',
    location: 'Building A - Electrical Room',
    status: 'pending',
    category: 'Electrical Component',
    lastInspection: '2024-10-28',
    nextDue: '2024-11-28',
    parentAsset: 'Generator Unit A-12',
    childId: 'CHD-101',
    requestDate: '2024-10-27',
  },
  {
    id: 102,
    title: 'Air Handler Fan Motor',
    location: 'Building B - Mechanical Floor',
    status: 'approved',
    category: 'HVAC Component',
    lastInspection: '2024-10-26',
    nextDue: '2024-11-26',
    parentAsset: 'HVAC System B-04',
    childId: 'CHD-102',
    requestDate: '2024-10-24',
  },
  {
    id: 103,
    title: 'Conveyor Belt Roller Set',
    location: 'Warehouse Section C - Line 2',
    status: 'pending',
    category: 'Machinery Component',
    lastInspection: '2024-10-25',
    nextDue: '2024-11-25',
    parentAsset: 'Conveyor Belt C-21',
    childId: 'CHD-103',
    requestDate: '2024-10-23',
  },
  {
    id: 104,
    title: 'Pressure Gauge PG-07',
    location: 'Building D - Pump Room',
    status: 'approved',
    category: 'Plumbing Component',
    lastInspection: '2024-10-29',
    nextDue: '2024-11-29',
    parentAsset: 'Pump Station D-07',
    childId: 'CHD-104',
    requestDate: '2024-10-27',
  },
  {
    id: 105,
    title: 'Smoke Detector SD-02',
    location: 'Building F - Security Room',
    status: 'rejected',
    category: 'Safety Component',
    lastInspection: '2024-10-24',
    nextDue: '2024-11-24',
    parentAsset: 'Fire Panel F-02',
    childId: 'CHD-105',
    requestDate: '2024-10-22',
  },
  {
    id: 106,
    title: 'Temperature Sensor TS-04',
    location: 'Building B - Rooftop Unit',
    status: 'pending',
    category: 'HVAC Component',
    lastInspection: '2024-10-30',
    nextDue: '2024-11-30',
    parentAsset: 'HVAC System B-04',
    childId: 'CHD-106',
    requestDate: '2024-10-28',
  },
];

function MyRequests() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [requestType, setRequestType] = useState('parent');

  const handleRequestTypeChange = (event, newType) => {
    if (newType !== null) {
      setRequestType(newType);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const currentRequests = requestType === 'parent' ? parentRequests : childRequests;
  
  const pendingCount = currentRequests.filter(r => r.status === 'pending').length;
  const approvedCount = currentRequests.filter(r => r.status === 'approved').length;

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        {/* Header */}
        <HeaderSection>
          <BackButton onClick={handleBack}>
            <ArrowBackIcon />
          </BackButton>
          <Box>
            <HeaderTitle>My Requests</HeaderTitle>
            <HeaderSubtitle>Track the status of your submitted asset requests</HeaderSubtitle>
          </Box>
        </HeaderSection>

        {/* Tabs */}
        <TabContainer elevation={0}>
          <ToggleButtonGroup
            value={requestType}
            exclusive
            onChange={handleRequestTypeChange}
            aria-label="request type"
            sx={{ border: 'none' }}
          >
            <StyledToggleButton value="parent" aria-label="parent">
              <DeviceHubIcon sx={{ fontSize: '0.8rem', mr: 0.5 }} />
              Parent Asset ({parentRequests.length})
            </StyledToggleButton>
            <StyledToggleButton value="child" aria-label="child">
              <AccountTreeIcon sx={{ fontSize: '0.8rem', mr: 0.5 }} />
              Child Asset ({childRequests.length})
            </StyledToggleButton>
          </ToggleButtonGroup>
        </TabContainer>

        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6}>
            <SummaryCard status="pending">
              <SummaryIcon status="pending">
                <AccessTimeIcon />
              </SummaryIcon>
              <Box>
                <SummaryLabel>Pending</SummaryLabel>
                <SummaryValue status="pending">{pendingCount}</SummaryValue>
              </Box>
            </SummaryCard>
          </Grid>
          <Grid item xs={6}>
            <SummaryCard status="approved">
              <SummaryIcon status="approved">
                <CheckCircleIcon />
              </SummaryIcon>
              <Box>
                <SummaryLabel>Approved</SummaryLabel>
                <SummaryValue status="approved">{approvedCount}</SummaryValue>
              </Box>
            </SummaryCard>
          </Grid>
        </Grid>

        {/* Request History */}
        <Box>
          <SectionTitle>
            {requestType === 'parent' ? 'Parent Asset Requests' : 'Child Asset Requests'}
          </SectionTitle>
          
          {currentRequests.length > 0 ? (
            <Grid container spacing={2}>
              {currentRequests.map((request) => (
                <Grid item xs={12} sm={6} lg={4} key={request.id}>
                  <Zoom in={true} style={{ transitionDelay: `${request.id * 50}ms` }}>
                    <RequestCard>
                      <CardHeader>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box>
                            <AssetTitle>{request.title}</AssetTitle>
                            {requestType === 'child' && (
                              <AssetSubtitle>
                                <DeviceHubIcon sx={{ fontSize: '0.6rem' }} />
                                Parent: {request.parentAsset}
                              </AssetSubtitle>
                            )}
                          </Box>
                        </Box>
                        <StatusChip 
                          status={request.status} 
                          label={getStatusText(request.status)}
                          size="small"
                          variant="outlined"
                        />
                      </CardHeader>

                      <CardContent sx={{ pt: 1, pb: 1 }}>
                        <LocationText sx={{ mb: 1 }}>
                          <LocationOnIcon />
                          {request.location}
                        </LocationText>
                        
                        <InfoRow>
                          <InfoLabel>
                            <CategoryIcon />
                            Category:
                          </InfoLabel>
                          <InfoValue>{request.category}</InfoValue>
                        </InfoRow>
                        
                        {requestType === 'parent' && (
                          <InfoRow>
                            <InfoLabel>
                              <AccountTreeIcon />
                              Parent ID:
                            </InfoLabel>
                            <InfoValue>{request.parentId}</InfoValue>
                          </InfoRow>
                        )}
                        
                        {requestType === 'child' && (
                          <InfoRow>
                            <InfoLabel>
                              <AccountTreeIcon />
                              Child ID:
                            </InfoLabel>
                            <InfoValue>{request.childId}</InfoValue>
                          </InfoRow>
                        )}
                        
                        <InfoRow>
                          <InfoLabel>
                            <CalendarTodayIcon />
                            Last Inspection:
                          </InfoLabel>
                          <InfoValue>{request.lastInspection}</InfoValue>
                        </InfoRow>
                        
                        <InfoRow>
                          <InfoLabel>
                            <ScheduleIcon />
                            Next Due:
                          </InfoLabel>
                          <InfoValue highlight={true}>{request.nextDue}</InfoValue>
                        </InfoRow>
                        
                        <InfoRow>
                          <InfoLabel>
                            <AccessTimeIcon />
                            Requested:
                          </InfoLabel>
                          <InfoValue>{request.requestDate}</InfoValue>
                        </InfoRow>
                      </CardContent>

                      <CardActions sx={{ p: 1.5, pt: 0 }}>
                        <ViewButton onClick={(() => navigate('/team/my-request/deatils'))}
                          variant="outlined" 
                          hasdot={request.showDot ? 1 : 0}
                          endIcon={<VisibilityIcon sx={{ fontSize: '0.7rem', ml: 0.5 }} />}
                        >
                          View Details
                        </ViewButton>
                      </CardActions>
                    </RequestCard>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState>
              <InventoryIcon sx={{ fontSize: '3rem', color: '#cbd5e1' }} />
              <Typography variant="h6">No {requestType} requests found</Typography>
              <Typography variant="body2">
                There are no {requestType} asset requests to display at this time.
              </Typography>
            </EmptyState>
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ 
          borderTop: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.08),
          mt: 4,
          pt: 2,
          textAlign: 'center',
        }}>
          <Typography sx={{ 
            fontSize: '0.6rem', 
            color: '#94a3b8',
          }}>
            © 2026 Asset Management System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </PageContainer>
  );
}

export default MyRequests;
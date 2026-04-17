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
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Card,
  CardContent,
  Switch,
  Tooltip,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BadgeIcon from '@mui/icons-material/Badge';
import BuildIcon from '@mui/icons-material/Build';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterIcon from '@mui/icons-material/Water';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import VerifiedIcon from '@mui/icons-material/Verified';

// Custom styled components with reduced font sizes
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  fontFamily: '"Inter", "Public Sans", sans-serif',
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    paddingBottom: theme.spacing(10),
  },
}));

const Header = styled(Box)(({ theme }) => ({
  maxWidth: 1280,
  margin: '0 auto',
  padding: theme.spacing(2, 1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 1),
  },
}));

const HeaderLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
  },
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.6),
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: alpha('#000000', 0.04),
  },
  '& svg': {
    fontSize: '1.1rem',
    color: '#475569',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 700,
  color: '#1e293b',
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

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status'
})(({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return {
          backgroundColor: '#fef3c7',
          color: '#92400e',
          borderColor: '#fde68a',
        };
      case 'approved':
        return {
          backgroundColor: '#ecfdf5',
          color: '#059669',
          borderColor: '#a7f3d0',
        };
      case 'rejected':
        return {
          backgroundColor: '#fef2f2',
          color: '#b91c1c',
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
    height: 24,
    fontSize: '0.6rem',
    fontWeight: 600,
    borderRadius: 16,
    '& .MuiChip-label': {
      padding: '0 8px',
    },
    ...getStatusStyles(),
  };
});

const InfoChip = styled(Chip)(({ theme }) => ({
  height: 20,
  fontSize: '0.55rem',
  fontWeight: 600,
  backgroundColor: '#f1f5f9',
  color: '#475569',
  borderRadius: 16,
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: theme.spacing(2),
  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  border: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.06),
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 700,
  color: '#1e293b',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    marginBottom: theme.spacing(1.5),
  },
}));

const RequesterSection = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  border: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.06),
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2),
    gap: theme.spacing(1.2),
  },
}));

const RequesterAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: '#e2e8f0',
  color: '#475569',
  fontWeight: 600,
  fontSize: '0.85rem',
  border: '2px solid #ffffff',
  boxShadow: '0 0 0 2px #f1f5f9',
  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
    fontSize: '0.8rem',
  },
}));

const RequesterName = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#1e293b',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

const RequesterDetail = styled(Typography)(({ theme }) => ({
  fontSize: '0.65rem',
  color: '#64748b',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
  },
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.6rem',
  fontWeight: 500,
  color: '#94a3b8',
  marginBottom: theme.spacing(0.3),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.55rem',
  },
}));

const InfoValue = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8fafc',
  borderRadius: 6,
  padding: theme.spacing(0.8, 1.2),
  fontSize: '0.7rem',
  color: '#334155',
  fontWeight: 500,
  border: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.06),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.6, 1),
    fontSize: '0.65rem',
  },
}));

const ToggleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#f8fafc',
  borderRadius: 6,
  padding: theme.spacing(0.8, 1.2),
  border: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.06),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.6, 1),
  },
}));

const ToggleLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.65rem',
  fontWeight: 500,
  color: '#64748b',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#ffffff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#0f4c5c',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 10,
    backgroundColor: '#94a3b8',
    opacity: 1,
  },
}));

const InspectionTag = styled(Chip)(({ theme }) => ({
  height: 24,
  backgroundColor: '#083344',
  color: '#ffffff',
  fontSize: '0.6rem',
  fontWeight: 600,
  borderRadius: 16,
  '& .MuiChip-label': {
    padding: '0 10px',
  },
  [theme.breakpoints.down('sm')]: {
    height: 22,
    fontSize: '0.55rem',
    '& .MuiChip-label': {
      padding: '0 8px',
    },
  },
}));

const ScheduleChip = styled(Chip)(({ theme }) => ({
  height: 22,
  backgroundColor: 'transparent',
  border: '1px solid',
  borderColor: '#cbd5e1',
  color: '#334155',
  fontSize: '0.55rem',
  fontWeight: 700,
  borderRadius: 16,
  '& .MuiChip-label': {
    padding: '0 8px',
  },
  [theme.breakpoints.down('sm')]: {
    height: 20,
    fontSize: '0.5rem',
    '& .MuiChip-label': {
      padding: '0 6px',
    },
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#ffffff',
  borderTop: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.08),
  padding: theme.spacing(1.5),
  zIndex: 10,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const FooterContent = styled(Box)(({ theme }) => ({
  maxWidth: 1280,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
  },
}));

const FooterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'variantType'
})(({ theme, variantType }) => ({
  padding: theme.spacing(0.6, 2),
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: 6,
  minHeight: 36,
  ...(variantType === 'outline' && {
    border: '1px solid',
    borderColor: '#cbd5e1',
    color: '#475569',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: alpha('#f8fafc', 0.8),
      borderColor: '#94a3b8',
    },
  }),
  ...(variantType === 'approve' && {
    backgroundColor: '#22c55e',
    color: '#ffffff',
    boxShadow: '0 2px 4px rgba(34,197,94,0.15)',
    '&:hover': {
      backgroundColor: '#16a34a',
    },
  }),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5, 1.5),
    fontSize: '0.65rem',
    minHeight: 32,
    flex: 1,
  },
}));

const ScheduleBox = styled(Box)(({ theme }) => ({
  border: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.06),
  borderRadius: 8,
  padding: theme.spacing(1.5),
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2),
  },
}));

const ScheduleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#334155',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
    marginBottom: theme.spacing(0.8),
  },
}));

function AssetDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mheToggle, setMheToggle] = useState(false);

  const handleBack = () => {
    window.history.back();
  };

  const handleToggle = () => {
    setMheToggle(!mheToggle);
  };

  return (
    <PageContainer>
      {/* Header */}
      <Header>
        <HeaderLeft>
          <BackButton onClick={handleBack}>
            <ArrowBackIcon />
          </BackButton>
          <Box>
            <HeaderTitle>Generator Unit A-12</HeaderTitle>
            <HeaderSubtitle>Asset details, classification, and filters</HeaderSubtitle>
          </Box>
        </HeaderLeft>
        <StatusChip status="pending" label="Pending" />
      </Header>

      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}>
        {/* Requester Info */}
        <RequesterSection>
          <RequesterAvatar>MC</RequesterAvatar>
          <Box>
            <RequesterName>Requested by Michael Chen</RequesterName>
            <RequesterDetail>Technician • Jan 15, 2024 4:00 PM</RequesterDetail>
          </Box>
        </RequesterSection>

        {/* Core Identification */}
        <SectionCard sx={{ mb: 1.5 }}>
          <SectionTitle>Core Identification</SectionTitle>
          <Grid container spacing={1.5}>
            <Grid item xs={12} md={6}>
              <InfoLabel>Asset ID / Tag Number</InfoLabel>
              <InfoValue>AST-2024-001</InfoValue>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoLabel>Asset Name / Description</InfoLabel>
              <InfoValue>Generator Unit A-12</InfoValue>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoLabel>Serial Number</InfoLabel>
              <InfoValue>GEN-A12-2024</InfoValue>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoLabel>Asset Category</InfoLabel>
              <InfoValue>Electrical</InfoValue>
            </Grid>
          </Grid>
        </SectionCard>

        {/* Two Column Section */}
        <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
          {/* Primary Filters */}
          <Grid item xs={12} lg={6}>
            <SectionCard>
              <SectionTitle>Primary Filters</SectionTitle>
              <Stack spacing={1.5}>
                <Box>
                  <InfoLabel>Current Location</InfoLabel>
                  <InfoChip label="Warehouse A" size="small" />
                </Box>
                <Box>
                  <InfoLabel>Status</InfoLabel>
                  <InfoChip label="Active" size="small" />
                </Box>
                <Box>
                  <InfoLabel>Assigned User / Custodian</InfoLabel>
                  <InfoValue>John Smith</InfoValue>
                </Box>
              </Stack>
            </SectionCard>
          </Grid>

          {/* MHE Filters */}
          <Grid item xs={12} lg={6}>
            <SectionCard>
              <SectionTitle>Material Handling Equipment</SectionTitle>
              <Stack spacing={1.5}>
                <Box>
                  <InfoLabel>MHE Utilization Status</InfoLabel>
                  <InfoValue>Active</InfoValue>
                </Box>
                <Box>
                  <InfoLabel>MHE Runtime (Hours)</InfoLabel>
                  <InfoValue>1,250 hours</InfoValue>
                </Box>
                <ToggleContainer>
                  <ToggleLabel>Safety Certification</ToggleLabel>
                  <StyledSwitch
                    checked={mheToggle}
                    onChange={handleToggle}
                    size="small"
                  />
                </ToggleContainer>
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>

        {/* Important Dates */}
        <SectionCard sx={{ mb: 1.5 }}>
          <SectionTitle>Important Dates</SectionTitle>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6} lg={3}>
              <InfoLabel>Acquisition Date</InfoLabel>
              <InfoValue>Jan 10, 2024</InfoValue>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <InfoLabel>Warranty Expiry</InfoLabel>
              <InfoValue>Jan 10, 2027</InfoValue>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <InfoLabel>Commissioning Date</InfoLabel>
              <InfoValue>Jan 12, 2024</InfoValue>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <InfoLabel>Invoice Date</InfoLabel>
              <InfoValue>Jan 8, 2024</InfoValue>
            </Grid>
          </Grid>
        </SectionCard>

        {/* Inspection Systems */}
        <SectionCard sx={{ mb: 1.5 }}>
          <SectionTitle>Inspection Systems</SectionTitle>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <InspectionTag label="AMC Inspection" />
            <InspectionTag label="CAMC Inspection" />
          </Box>
          <Grid container spacing={1.5}>
            <Grid item xs={12} md={6}>
              <ScheduleBox>
                <ScheduleTitle>AMC Schedule</ScheduleTitle>
                <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                  <ScheduleChip label="Monthly" />
                  <ScheduleChip label="Quarterly" />
                </Box>
              </ScheduleBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <ScheduleBox>
                <ScheduleTitle>CAMC Schedule</ScheduleTitle>
                <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                  <ScheduleChip label="Weekly" />
                </Box>
              </ScheduleBox>
            </Grid>
          </Grid>
        </SectionCard>

        {/* Asset Condition */}
        <SectionCard>
          <SectionTitle>Asset Condition</SectionTitle>
          <InfoChip label="Normal" />
        </SectionCard>

        {/* Footer Spacer */}
        <Box sx={{ height: { xs: 70, sm: 80 } }} />
      </Container>

      {/* Footer Actions */}
      <Footer>
        <FooterContent>
          <FooterButton variantType="outline">
            Back to List
          </FooterButton>
          <FooterButton variantType="approve">
            Approve Asset
          </FooterButton>
        </FooterContent>
      </Footer>
    </PageContainer>
  );
}

export default AssetDetails;
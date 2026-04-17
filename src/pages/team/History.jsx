import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  alpha,
  Tooltip,
  Dialog,
  DialogContent,
  Fade,
  Slide,
  Zoom,
  Grow,
  Avatar,
  Divider,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import DateRangeIcon from '@mui/icons-material/DateRange';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';

// Custom styled components - Page Container
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  fontFamily: '"Inter", sans-serif',
  backgroundColor: '#f8fafc',
  padding: theme.spacing(1.5),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

const FilterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 10,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  marginBottom: theme.spacing(2.5),
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2),
    marginBottom: theme.spacing(2),
  },
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 10,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  backgroundColor: '#ffffff',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2),
  },
}));

const MetricTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.65rem',
  fontWeight: 500,
  color: '#64748b',
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
  },
}));

const MetricValue = styled(Typography)(({ theme, color }) => ({
  fontSize: '1.3rem',
  fontWeight: 600,
  color: color || '#003d52',
  lineHeight: 1.2,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const StatusChip = styled(Chip)(({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'approved':
        return {
          backgroundColor: '#003d52',
          color: '#ffffff',
        };
      case 'under-review':
        return {
          backgroundColor: '#bbdefb',
          color: '#003d52',
        };
      case 'needs-revision':
        return {
          backgroundColor: '#f44336',
          color: '#ffffff',
        };
      default:
        return {
          backgroundColor: '#e2e8f0',
          color: '#475569',
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  padding: theme.spacing(1.5, 1.5),
  fontSize: '0.7rem',
  color: '#475569',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 1),
    fontSize: '0.65rem',
  },
}));

const StyledTableHeadCell = styled(StyledTableCell)(({ theme }) => ({
  fontWeight: 600,
  color: '#003d52',
  backgroundColor: '#f8fafc',
  borderBottom: '1px solid #e2e8f0',
  fontSize: '0.7rem',
}));

const IconActionButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.4),
  color: '#003d52',
  '&:hover': {
    backgroundColor: alpha('#003d52', 0.04),
  },
  '& svg': {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
}));

const ScoreText = styled(Typography)(({ theme, score }) => ({
  fontSize: '0.7rem',
  fontWeight: 600,
  color: score >= 90 ? '#10b981' : score >= 70 ? '#f59e0b' : '#ef4444',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.65rem',
  },
}));

const StartTaskButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  color: '#475569',
  padding: theme.spacing(0.4, 1.2),
  fontSize: '0.6rem',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: 4,
  minHeight: 24,
  '&:hover': {
    backgroundColor: alpha('#f8fafc', 0.8),
    borderColor: '#003d52',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.3, 1),
    fontSize: '0.55rem',
  },
}));

// New Modal Styled Components - Based on HTML Design
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: theme.spacing(2),
    width: '100%',
    maxWidth: 560,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
      borderRadius: 12,
      maxWidth: 'calc(100% - 16px)',
    },
  },
  '& .MuiBackdrop-root': {
    backgroundColor: alpha('#000000', 0.2),
    backdropFilter: 'blur(4px)',
  },
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 3, 1, 3),
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2, 0.5, 2),
  },
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#003d52',
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const ModalSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#64748b',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  color: '#94a3b8',
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: alpha('#f1f5f9', 0.8),
  },
  '& svg': {
    fontSize: '1.2rem',
  },
  '& .dot': {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#ef4444',
  },
  [theme.breakpoints.down('sm')]: {
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    '& svg': {
      fontSize: '1rem',
    },
  },
}));

const SummaryCardsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 2),
    gap: theme.spacing(1.5),
  },
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  borderRadius: 12,
  height: 140,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    height: 120,
  },
}));

const SummaryCardLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: '#64748b',
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
}));

const StatusBadge = styled(Box)(({ theme }) => ({
  backgroundColor: '#003d52',
  color: '#ffffff',
  padding: theme.spacing(0.5, 2),
  borderRadius: 20,
  display: 'inline-block',
  fontSize: '0.75rem',
  fontWeight: 600,
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.65rem',
    padding: theme.spacing(0.3, 1.5),
  },
}));

const ScoreDisplay = styled(Box)(({ theme }) => ({
  fontSize: '2.2rem',
  fontWeight: 600,
  color: '#003d52',
  lineHeight: 1,
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
}));

const DetailsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const DetailsTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#003d52',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: theme.spacing(1.5),
  },
}));

const DetailRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  '&:last-child': {
    borderBottom: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 0),
  },
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  color: '#64748b',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#003d52',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

const ModalFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3, 3),
  display: 'flex',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 2, 2, 2),
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const FooterButton = styled(Button)(({ theme, variant }) => ({
  flex: 1,
  padding: theme.spacing(1.2, 2),
  fontSize: '0.8rem',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: 10,
  ...(variant === 'outline' && {
    border: `2px solid #003d52`,
    color: '#003d52',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: alpha('#003d52', 0.04),
    },
  }),
  ...(variant === 'contained' && {
    backgroundColor: '#003d52',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: alpha('#003d52', 0.9),
    },
  }),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    fontSize: '0.75rem',
    width: '100%',
  },
}));

function InspectionHistory() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const metricsData = [
    { label: 'Total Submissions', value: '8', color: '#003d52' },
    { label: 'Approved', value: '6', color: '#10b981' },
    { label: 'Under Review', value: '1', color: '#ef4444' },
    { label: 'Avg Score', value: '93%', color: '#003d52' },
  ];

  const tableData = [
    {
      asset: 'Generator Unit A-12',
      formType: 'Safety Inspection',
      date: '2024-11-02',
      status: 'approved',
      score: '95%',
      scoreValue: 95,
      showDot: true,
      actions: ['view', 'download'],
      inspector: 'Mike Johnson',
      details: {
        assetId: 'GEN-A12-2024',
        location: 'Building A - Floor 3',
        completedAt: '2024-11-02 14:30',
        duration: '45 minutes',
        findings: 'All systems operational. Regular maintenance completed.',
      },
    },
    {
      asset: 'HVAC System B-04',
      formType: 'Equipment Check',
      date: '2024-11-01',
      status: 'approved',
      score: '92%',
      scoreValue: 92,
      actions: ['view', 'download'],
      inspector: 'Sarah Williams',
      details: {
        assetId: 'HVAC-B04-2024',
        location: 'Building B - Rooftop',
        completedAt: '2024-11-01 10:15',
        duration: '30 minutes',
        findings: 'Filters replaced. Temperature calibration adjusted.',
      },
    },
    {
      asset: 'Pump Station D-07',
      formType: 'Daily Checklist',
      date: '2024-10-31',
      status: 'approved',
      score: '98%',
      scoreValue: 98,
      actions: ['view', 'download'],
      inspector: 'Tom Anderson',
      details: {
        assetId: 'PUMP-D07-2024',
        location: 'Building D - Basement',
        completedAt: '2024-10-31 09:00',
        duration: '25 minutes',
        findings: 'Pressure levels normal. No issues detected.',
      },
    },
    {
      asset: 'Compressor E-15',
      formType: 'Maintenance Log',
      date: '2024-10-30',
      status: 'under-review',
      score: '-',
      scoreValue: 0,
      actions: [],
      inspector: 'Lisa Brown',
      details: {
        assetId: 'COMP-E15-2024',
        location: 'Building E - Mechanical Room',
        completedAt: '2024-10-30 13:45',
        duration: '60 minutes',
        findings: 'Awaiting quality assurance review.',
      },
    },
    {
      asset: 'Fire Panel F-02',
      formType: 'Safety Inspection',
      date: '2024-10-29',
      status: 'approved',
      score: '96%',
      scoreValue: 96,
      actions: ['view', 'download'],
      inspector: 'Mike Johnson',
      details: {
        assetId: 'FIRE-F02-2024',
        location: 'Building F - Security Room',
        completedAt: '2024-10-29 11:30',
        duration: '40 minutes',
        findings: 'All sensors functional. Backup battery replaced.',
      },
    },
    {
      asset: 'Conveyor Belt C-21',
      formType: 'Equipment Check',
      date: '2024-10-28',
      status: 'needs-revision',
      score: '78%',
      scoreValue: 78,
      actions: ['start'],
      inspector: 'Sarah Williams',
      details: {
        assetId: 'CONV-C21-2024',
        location: 'Building C - Production Line',
        completedAt: '2024-10-28 15:20',
        duration: '35 minutes',
        findings: 'Belt tension needs adjustment. Roller bearings showing wear.',
      },
    },
    {
      asset: 'Generator Unit A-12',
      formType: 'Safety Inspection',
      date: '2024-10-27',
      status: 'approved',
      score: '94%',
      scoreValue: 94,
      actions: ['view', 'download'],
      inspector: 'Tom Anderson',
      details: {
        assetId: 'GEN-A12-2024',
        location: 'Building A - Floor 3',
        completedAt: '2024-10-27 09:45',
        duration: '40 minutes',
        findings: 'Monthly maintenance completed. Fuel levels checked.',
      },
    },
    {
      asset: 'HVAC System B-04',
      formType: 'Daily Checklist',
      date: '2024-10-26',
      status: 'approved',
      score: '91%',
      scoreValue: 91,
      actions: ['view', 'download'],
      inspector: 'Lisa Brown',
      details: {
        assetId: 'HVAC-B04-2024',
        location: 'Building B - Rooftop',
        completedAt: '2024-10-26 14:00',
        duration: '30 minutes',
        findings: 'Routine check completed. All parameters normal.',
      },
    },
  ];

  const handleViewClick = (row) => {
    setSelectedInspection(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedInspection(null), 200);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'under-review': return 'Under Review';
      case 'needs-revision': return 'Needs Revision';
      default: return status;
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}>
        {/* Header */}
        <HeaderSection>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              color: '#003d52',
              fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
            }}
          >
            Inspection History
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#64748b',
              fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
              mt: 0.3,
            }}
          >
            View your submitted inspection forms
          </Typography>
        </HeaderSection>

        {/* Filters */}
        <FilterPaper>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 1.5,
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
          }}>
            {/* Search */}
            <TextField
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{
                width: { xs: '100%', md: 300 },
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.7rem',
                  borderRadius: 2,
                  height: 36,
                  backgroundColor: 'transparent',
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '0.9rem', color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Filter Controls */}
            <Box sx={{ 
              display: 'flex', 
              gap: 1,
              flexDirection: { xs: 'row', sm: 'row' },
              justifyContent: { xs: 'space-between', md: 'flex-end' },
              width: { xs: '100%', md: 'auto' },
            }}>
              <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 110 } }}>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  displayEmpty
                  sx={{
                    fontSize: '0.7rem',
                    borderRadius: 2,
                    height: 36,
                    '& .MuiSelect-select': {
                      py: 0.5,
                    },
                  }}
                  IconComponent={ArrowDropDownIcon}
                >
                  <MenuItem value="all" sx={{ fontSize: '0.7rem' }}>All Status</MenuItem>
                  <MenuItem value="approved" sx={{ fontSize: '0.7rem' }}>Approved</MenuItem>
                  <MenuItem value="review" sx={{ fontSize: '0.7rem' }}>Under Review</MenuItem>
                  <MenuItem value="revision" sx={{ fontSize: '0.7rem' }}>Needs Revision</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                startIcon={<DateRangeIcon sx={{ fontSize: '0.8rem' }} />}
                endIcon={<ArrowDropDownIcon sx={{ fontSize: '0.8rem' }} />}
                sx={{
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.8rem',
                  height: 36,
                  borderColor: alpha(theme.palette.divider, 0.15),
                  color: '#475569',
                  textTransform: 'none',
                }}
              >
                {!isMobile && 'Date Range'}
              </Button>
            </Box>
          </Box>
        </FilterPaper>

        {/* Metrics Cards */}
        <Grid container spacing={isMobile ? 1 : 1.5} sx={{ mb: 2.5 }}>
          {metricsData.map((metric, index) => (
            <Grid item xs={6} md={3} key={index}>
              <MetricCard>
                <MetricTitle>{metric.label}</MetricTitle>
                <MetricValue color={metric.color}>{metric.value}</MetricValue>
              </MetricCard>
            </Grid>
          ))}
        </Grid>

        {/* Table */}
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: isMobile ? 700 : 600 }}>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell>Asset</StyledTableHeadCell>
                  <StyledTableHeadCell>Form Type</StyledTableHeadCell>
                  <StyledTableHeadCell>Submitted</StyledTableHeadCell>
                  <StyledTableHeadCell>Status</StyledTableHeadCell>
                  <StyledTableHeadCell>Score</StyledTableHeadCell>
                  <StyledTableHeadCell align="right">Actions</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow 
                    key={index}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: alpha('#f8fafc', 0.5),
                      },
                    }}
                  >
                    <StyledTableCell sx={{ fontWeight: 500 }}>{row.asset}</StyledTableCell>
                    <StyledTableCell>{row.formType}</StyledTableCell>
                    <StyledTableCell sx={{ color: '#94a3b8' }}>{row.date}</StyledTableCell>
                    <StyledTableCell>
                      <StatusChip 
                        status={row.status} 
                        label={getStatusText(row.status)}
                        size="small"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ScoreText score={row.scoreValue}>{row.score}</ScoreText>
                        {row.showDot && (
                          <FiberManualRecordIcon 
                            sx={{ 
                              fontSize: '0.35rem', 
                              color: '#ef4444',
                            }} 
                          />
                        )}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.2 }}>
                        {row.actions.includes('view') && (
                          <Tooltip title="View" arrow placement="top">
                            <IconActionButton size="small" onClick={() => handleViewClick(row)}>
                              <VisibilityIcon />
                            </IconActionButton>
                          </Tooltip>
                        )}
                        {row.actions.includes('download') && (
                          <Tooltip title="Download" arrow placement="top">
                            <IconActionButton size="small">
                              <DownloadIcon />
                            </IconActionButton>
                          </Tooltip>
                        )}
                        {row.actions.includes('start') && (
                          <StartTaskButton>
                            Start
                          </StartTaskButton>
                        )}
                      </Box>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>

        {/* Mobile Scroll Hint */}
        {isMobile && (
          <Box sx={{ mt: 1.5, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.55rem' }}>
              ← Swipe to scroll table →
            </Typography>
          </Box>
        )}

        {/* New Inspection Details Modal - Based on HTML Design */}
        <StyledDialog
          open={modalOpen}
          onClose={handleCloseModal}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 300 }}
          maxWidth="sm"
          fullWidth
          scroll="body"
        >
          {selectedInspection && (
            <>
              <ModalHeader>
                <ModalTitle>Inspection Details</ModalTitle>
                <ModalSubtitle>
                  {selectedInspection.formType} - {selectedInspection.asset}
                </ModalSubtitle>
                <CloseButton onClick={handleCloseModal}>
                  <CloseIcon />
                  <span className="dot" />
                </CloseButton>
              </ModalHeader>

              {/* Summary Cards */}
              <SummaryCardsSection>
                {/* Status Card */}
                <SummaryCard>
                  <SummaryCardLabel>Status</SummaryCardLabel>
                  <Box>
                    <StatusBadge>
                      {getStatusText(selectedInspection.status)}
                    </StatusBadge>
                  </Box>
                </SummaryCard>

                {/* Score Card */}
                <SummaryCard>
                  <SummaryCardLabel>Score</SummaryCardLabel>
                  <ScoreDisplay>
                    {selectedInspection.score}
                  </ScoreDisplay>
                </SummaryCard>
              </SummaryCardsSection>

              {/* Submission Details */}
              <DetailsSection>
                <DetailsTitle>Submission Details</DetailsTitle>
                
                <DetailRow>
                  <DetailLabel>Asset:</DetailLabel>
                  <DetailValue>{selectedInspection.asset}</DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Form Type:</DetailLabel>
                  <DetailValue>{selectedInspection.formType}</DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Submitted:</DetailLabel>
                  <DetailValue>{selectedInspection.date}</DetailValue>
                </DetailRow>

                {selectedInspection.details && (
                  <>
                    <DetailRow>
                      <DetailLabel>Asset ID:</DetailLabel>
                      <DetailValue>{selectedInspection.details.assetId}</DetailValue>
                    </DetailRow>
                    
                    <DetailRow>
                      <DetailLabel>Duration:</DetailLabel>
                      <DetailValue>{selectedInspection.details.duration}</DetailValue>
                    </DetailRow>
                  </>
                )}
              </DetailsSection>

              {/* Footer Actions */}
              <ModalFooter>
                <FooterButton variant="outline" startIcon={<PictureAsPdfIcon sx={{ fontSize: '0.9rem' }} />}>
                  Download PDF
                </FooterButton>
                <FooterButton variant="contained" startIcon={<ArticleIcon sx={{ fontSize: '0.9rem' }} />}>
                  View Full Report
                </FooterButton>
              </ModalFooter>
            </>
          )}
        </StyledDialog>
      </Container>
    </PageContainer>
  );
}

export default InspectionHistory;
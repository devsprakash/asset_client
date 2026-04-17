import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Chip,
  Divider,
  Slider,
  Switch,
  Grid,
  useTheme,
  useMediaQuery,
  alpha,
  Avatar,
  Badge,
  Tooltip,
  Collapse,
  Fade,
  Zoom,
  Fab,
  Drawer,
  SwipeableDrawer,
  Stack,
  Alert,
  AlertTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DeleteIcon from '@mui/icons-material/Delete';
import ComputerIcon from '@mui/icons-material/Computer';
import BusinessIcon from '@mui/icons-material/Business';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import WaterIcon from '@mui/icons-material/Water';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

// Custom styled components matching the HTML design
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  fontFamily: '"Inter", sans-serif',
  display: 'flex',
  flexDirection: 'column',
}));

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e2e8f0',
  padding: theme.spacing(1.5, 3),
  position: 'sticky',
  top: 0,
  zIndex: 50,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2),
  },
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  maxWidth: '1280px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  backgroundColor: '#ffffff',
  marginRight: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: '#f8fafc',
  },
  '& svg': {
    fontSize: '1.1rem',
    color: '#4b5563',
  },
  [theme.breakpoints.down('sm')]: {
    width: 32,
    height: 32,
    '& svg': {
      fontSize: '1rem',
    },
  },
}));

const DeleteHeaderButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.8, 2),
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  borderRadius: 8,
  color: '#4b5563',
  fontSize: '0.8rem',
  fontWeight: 500,
  textTransform: 'none',
  backgroundColor: '#ffffff',
  '&:hover': {
    backgroundColor: '#f8fafc',
  },
  '& svg': {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5, 1.5),
    fontSize: '0.7rem',
    '& svg': {
      fontSize: '0.9rem',
    },
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '1280px',
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const SearchSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  minWidth: 250,
  '& .MuiOutlinedInput-root': {
    height: 42,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
    fontSize: '0.8rem',
    '& fieldset': {
      border: 'none',
    },
    '&:hover': {
      borderColor: alpha('#003d5b', 0.3),
    },
    '&.Mui-focused': {
      borderColor: '#003d5b',
      boxShadow: `0 0 0 2px ${alpha('#003d5b', 0.1)}`,
    },
  },
  '& .MuiInputAdornment-root': {
    '& svg': {
      fontSize: '1rem',
      color: '#94a3b8',
    },
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    '& .MuiOutlinedInput-root': {
      height: 38,
      fontSize: '0.75rem',
    },
  },
}));

const FilterButton = styled(Button)(({ theme }) => ({
  height: 42,
  padding: theme.spacing(0, 2),
  backgroundColor: '#ffffff',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  borderRadius: 30,
  color: '#4b5563',
  fontSize: '0.8rem',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f8fafc',
    borderColor: alpha('#003d5b', 0.3),
  },
  '& svg': {
    fontSize: '1rem',
    marginRight: theme.spacing(0.5),
  },
  [theme.breakpoints.down('sm')]: {
    height: 38,
    fontSize: '0.75rem',
    padding: theme.spacing(0, 1.5),
  },
}));

const SidebarPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  backgroundColor: '#ffffff',
  height: 'fit-content',
  position: 'sticky',
  top: 90,
  [theme.breakpoints.down('lg')]: {
    position: 'static',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#1e293b',
  marginBottom: theme.spacing(1.5),
}));

const SubSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#334155',
  marginBottom: theme.spacing(1.5),
}));

const FilterLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  fontWeight: 600,
  color: '#475569',
  textTransform: 'uppercase',
  marginBottom: theme.spacing(1),
  letterSpacing: '0.02em',
}));

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '& .MuiSvgIcon-root': {
    fontSize: '1.1rem',
    color: '#94a3b8',
  },
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      color: '#003d5b',
    },
  },
}));

const CustomRadio = styled(Radio)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '& .MuiSvgIcon-root': {
    fontSize: '1.1rem',
    color: '#94a3b8',
  },
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      color: '#003d5b',
    },
  },
}));

const FormLabelStyled = styled(FormLabel)(({ theme }) => ({
  fontSize: '0.7rem',
  fontWeight: 600,
  color: '#475569',
  textTransform: 'uppercase',
  marginBottom: theme.spacing(1),
  letterSpacing: '0.02em',
  '&.Mui-focused': {
    color: '#003d5b',
  },
}));

const FormControlLabelStyled = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '0.75rem',
    color: '#4b5563',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    fontSize: '0.8rem',
    '& fieldset': {
      border: 'none',
    },
    '&:hover': {
      backgroundColor: '#eef2f6',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      boxShadow: `0 0 0 2px ${alpha('#003d5b', 0.2)}`,
    },
  },
  '& .MuiInputAdornment-root': {
    '& svg': {
      fontSize: '1rem',
      color: '#94a3b8',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      fontSize: '0.75rem',
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#f1f5f9',
  borderRadius: 8,
  fontSize: '0.8rem',
  '& fieldset': {
    border: 'none',
  },
  '&:hover': {
    backgroundColor: '#eef2f6',
  },
  '&.Mui-focused': {
    backgroundColor: '#ffffff',
    boxShadow: `0 0 0 2px ${alpha('#003d5b', 0.2)}`,
  },
  '& .MuiSelect-icon': {
    color: '#94a3b8',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

const StatusChip = styled(Chip)(({ theme, bgcolor, textcolor }) => ({
  backgroundColor: bgcolor || alpha('#003d5b', 0.1),
  color: textcolor || '#003d5b',
  fontSize: '0.65rem',
  fontWeight: 600,
  height: 22,
  borderRadius: 12,
  '& .MuiChip-label': {
    padding: '0 8px',
  },
  '& .MuiChip-deleteIcon': {
    fontSize: '0.8rem',
    color: textcolor || '#003d5b',
  },
}));

const InfoAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: 8,
  marginTop: theme.spacing(2),
  '& .MuiAlert-icon': {
    color: '#0369a1',
  },
  '& .MuiAlert-message': {
    fontSize: '0.8rem',
    color: '#0369a1',
    fontWeight: 500,
  },
}));

const SectionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  backgroundColor: '#ffffff',
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5),
}));

const SectionIcon = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 32,
  height: 32,
  backgroundColor: bgcolor || alpha('#003d5b', 0.1),
  color: '#003d5b',
  '& svg': {
    fontSize: '1.1rem',
  },
}));

const ToggleSwitch = styled(Switch)(({ theme }) => ({
  width: 44,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#003d5b',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#003d5b',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: alpha('#fff', 0.12),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
  },
  '& .MuiSwitch-track': {
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
    opacity: 1,
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#003d5b',
  height: 6,
  '& .MuiSlider-thumb': {
    width: 16,
    height: 16,
    backgroundColor: '#ffffff',
    border: '2px solid #003d5b',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0 0 0 8px ${alpha('#003d5b', 0.16)}`,
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 6,
    borderRadius: 4,
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#e2e8f0',
    height: 6,
    borderRadius: 4,
  },
}));

const MobileFilterDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '85vh',
    backgroundColor: '#ffffff',
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderTop: '1px solid #e2e8f0',
  padding: theme.spacing(2),
  position: 'sticky',
  bottom: 0,
  zIndex: 50,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const FooterContent = styled(Box)(({ theme }) => ({
  maxWidth: '1280px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
}));

const FooterButton = styled(Button)(({ theme, variant }) => ({
  padding: theme.spacing(1, 3),
  borderRadius: 8,
  fontSize: '0.8rem',
  fontWeight: 600,
  textTransform: 'none',
  ...(variant === 'cancel' && {
    border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
    color: '#4b5563',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
  }),
  ...(variant === 'save' && {
    backgroundColor: '#003d5b',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: alpha('#003d5b', 0.9),
    },
  }),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.8, 2),
    fontSize: '0.75rem',
  },
}));

function AddNewAsset() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [category, setCategory] = useState('others');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState({
    warehouseA: false,
    warehouseB: false,
    officeBuilding: true,
    factoryFloor: false,
    remoteSite: false,
  });
  const [selectedStatus, setSelectedStatus] = useState({
    active: false,
    maintenance: false,
    retired: false,
    transit: false,
    reserved: false,
  });
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [warrantyExpiry, setWarrantyExpiry] = useState('');
  const [commissioningDate, setCommissioningDate] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [inspectionSystems, setInspectionSystems] = useState(['AMC Inspection', 'CAMC Inspection']);
  const [selectedInspections, setSelectedInspections] = useState({
    amcWeekly: false,
    amcMonthly: false,
    amcQuarterly: false,
    amcHalfYearly: false,
    amcYearly: false,
    camcWeekly: false,
    camcMonthly: false,
    camcQuarterly: false,
    camcHalfYearly: false,
    camcYearly: false,
  });
  const [assetCondition, setAssetCondition] = useState({
    critical: false,
    normal: true,
  });
  const [mheUtilization, setMheUtilization] = useState({
    active: false,
    idle: false,
    notApplicable: false,
    underMaintenance: false,
    decommissioned: false,
  });
  const [mheRuntime, setMheRuntime] = useState('');
  const [mheSafetyCert, setMheSafetyCert] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState({
    truck: false,
    van: false,
    car: false,
    motorcycle: false,
    heavyDuty: false,
    notApplicable: false,
  });
  const [driver, setDriver] = useState('');
  const [loadStatus, setLoadStatus] = useState(50);
  const [healthIndex, setHealthIndex] = useState('green');
  const [vibeAlert, setVibeAlert] = useState(false);
  const [faultTypes, setFaultTypes] = useState({
    mechanical: false,
    electrical: false,
    thermal: false,
    hydraulic: false,
    software: false,
    notApplicable: false,
  });
  const [containerTypes, setContainerTypes] = useState({
    small: false,
    medium: false,
    large: false,
    industrial: false,
    notApplicable: false,
  });
  const [fillLevel, setFillLevel] = useState(50);
  const [collectionStatus, setCollectionStatus] = useState('');
  const [osPlatform, setOsPlatform] = useState({
    windows: false,
    macos: false,
    linux: false,
    ios: false,
    android: false,
    other: false,
    notApplicable: false,
  });
  const [softwareName, setSoftwareName] = useState('');
  const [licenseStatus, setLicenseStatus] = useState('');
  const [pmStatus, setPmStatus] = useState({
    upToDate: false,
    dueSoon: false,
    overdue: false,
    notScheduled: false,
    notApplicable: false,
  });
  const [safetyCompliance, setSafetyCompliance] = useState(false);
  const [maintenancePriority, setMaintenancePriority] = useState('medium');

  const handleLocationChange = (location) => {
    setSelectedLocations(prev => ({ ...prev, [location]: !prev[location] }));
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(prev => ({ ...prev, [status]: !prev[status] }));
  };

  const handleInspectionChange = (inspection) => {
    setSelectedInspections(prev => ({ ...prev, [inspection]: !prev[inspection] }));
  };

  const handleRemoveInspectionSystem = (system) => {
    setInspectionSystems(prev => prev.filter(s => s !== system));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    console.log('Saving asset...');
    // Add save logic here
  };

  // Mobile filter drawer
  const renderMobileFilterDrawer = () => (
    <MobileFilterDrawer
      anchor="bottom"
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
      onOpen={() => setFilterDrawerOpen(true)}
      disableSwipeToOpen={false}
    >
      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
            Primary Filters
          </Typography>
          <IconButton size="small" onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Box>

        {/* Current Location */}
        <Box sx={{ mb: 2.5 }}>
          <FilterLabel>Current Location</FilterLabel>
          <FormGroup>
            <FormControlLabelStyled
              control={<CustomCheckbox checked={selectedLocations.warehouseA} onChange={() => handleLocationChange('warehouseA')} />}
              label="Warehouse A"
            />
            <FormControlLabelStyled
              control={<CustomCheckbox checked={selectedLocations.warehouseB} onChange={() => handleLocationChange('warehouseB')} />}
              label="Warehouse B"
            />
            <FormControlLabelStyled
              control={<CustomCheckbox checked={selectedLocations.officeBuilding} onChange={() => handleLocationChange('officeBuilding')} />}
              label="Office Building"
            />
            <FormControlLabelStyled
              control={<CustomCheckbox checked={selectedLocations.factoryFloor} onChange={() => handleLocationChange('factoryFloor')} />}
              label="Factory Floor"
            />
            <FormControlLabelStyled
              control={<CustomCheckbox checked={selectedLocations.remoteSite} onChange={() => handleLocationChange('remoteSite')} />}
              label="Remote Site"
            />
          </FormGroup>
        </Box>

        {/* Status */}
        <Box sx={{ mb: 2.5 }}>
          <FilterLabel>Status</FilterLabel>
          <FormGroup>
            <FormControlLabelStyled
              control={<CustomCheckbox checked={selectedStatus.active} onChange={() => handleStatusChange('active')} />}
              label="Active"
            />
            <FormControlLabelStyled
              control={<CustomCheckbox checked={selectedStatus.maintenance} onChange={() => handleStatusChange('maintenance')} />}
              label="In Maintenance"
            />
            <FormControlLabelStyled
              control={<CustomCheckbox checked={selectedStatus.retired} onChange={() => handleStatusChange('retired')} />}
              label="Retired"
            />
            <FormControlLabelStyled
              control={<CustomCheckbox checked={selectedStatus.transit} onChange={() => handleStatusChange('transit')} />}
              label="In Transit"
            />
            <FormControlLabelStyled
              control={<CustomCheckbox checked={selectedStatus.reserved} onChange={() => handleStatusChange('reserved')} />}
              label="Reserved"
            />
          </FormGroup>
        </Box>

        <FooterButton
          fullWidth
          variant="save"
          onClick={() => setFilterDrawerOpen(false)}
          sx={{ mt: 1 }}
        >
          Apply Filters
        </FooterButton>
      </Box>
    </MobileFilterDrawer>
  );

  return (
    <PageContainer>
      {/* Header */}
      <Header>
        <HeaderContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BackButton onClick={handleBack}>
              <ArrowBackIcon />
            </BackButton>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#003d5b', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                Add New Asset
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                Asset details, classification, and category filters
              </Typography>
            </Box>
          </Box>
          <DeleteHeaderButton startIcon={<DeleteOutlineIcon />}>
            Delete
          </DeleteHeaderButton>
        </HeaderContent>
      </Header>

      {/* Main Content */}
      <MainContent>
        {/* Search and Filters */}
        <SearchSection>
          <SearchInput
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
          />
          
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <FilterButton endIcon={<ExpandMoreIcon />}>
                All Status
              </FilterButton>
              <FilterButton endIcon={<ExpandMoreIcon />}>
                All Memberships
              </FilterButton>
            </Box>
          ) : (
            <IconButton
              onClick={() => setFilterDrawerOpen(true)}
              sx={{
                border: '1px solid #e2e8f0',
                borderRadius: 30,
                width: 42,
                height: 42,
              }}
            >
              <FilterListIcon sx={{ fontSize: '1.1rem', color: '#4b5563' }} />
            </IconButton>
          )}
        </SearchSection>

        {/* Main Grid */}
        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} lg={3}>
            <SidebarPaper>
              <SectionTitle>Primary Filters</SectionTitle>
              
              {/* Current Location */}
              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Current Location</SubSectionTitle>
                <FormGroup>
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={selectedLocations.warehouseA} onChange={() => handleLocationChange('warehouseA')} />}
                    label="Warehouse A"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={selectedLocations.warehouseB} onChange={() => handleLocationChange('warehouseB')} />}
                    label="Warehouse B"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={selectedLocations.officeBuilding} onChange={() => handleLocationChange('officeBuilding')} />}
                    label="Office Building"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={selectedLocations.factoryFloor} onChange={() => handleLocationChange('factoryFloor')} />}
                    label="Factory Floor"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={selectedLocations.remoteSite} onChange={() => handleLocationChange('remoteSite')} />}
                    label="Remote Site"
                  />
                </FormGroup>
              </Box>

              {/* Custom Physical Address */}
              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Custom Physical Address</SubSectionTitle>
                <Stack spacing={1.5}>
                  <StyledTextField placeholder="Enter street address" size="small" fullWidth />
                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <StyledTextField placeholder="City" size="small" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <StyledTextField placeholder="State/Province" size="small" fullWidth />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <StyledTextField placeholder="Postal Code" size="small" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <StyledTextField placeholder="Country" size="small" fullWidth />
                    </Grid>
                  </Grid>
                </Stack>
              </Box>

              {/* Assigned User */}
              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Assigned User / Custodian</SubSectionTitle>
                <Stack spacing={1.5}>
                  <StyledTextField placeholder="Search and select primary user" size="small" fullWidth />
                  <StyledTextField placeholder="Search and select secondary user" size="small" fullWidth />
                </Stack>
              </Box>

              {/* Status */}
              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Status</SubSectionTitle>
                <FormGroup>
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={selectedStatus.active} onChange={() => handleStatusChange('active')} />}
                    label="Active"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={selectedStatus.maintenance} onChange={() => handleStatusChange('maintenance')} />}
                    label="In Maintenance"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={selectedStatus.retired} onChange={() => handleStatusChange('retired')} />}
                    label="Retired"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={selectedStatus.transit} onChange={() => handleStatusChange('transit')} />}
                    label="In Transit"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={selectedStatus.reserved} onChange={() => handleStatusChange('reserved')} />}
                    label="Reserved"
                  />
                </FormGroup>
              </Box>

              {/* Acquisition and Warranty */}
              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Acquisition Date</SubSectionTitle>
                <StyledTextField
                  placeholder="Select date"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={acquisitionDate}
                  onChange={(e) => setAcquisitionDate(e.target.value)}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Warranty / Lease Expiry</SubSectionTitle>
                <StyledTextField
                  placeholder="Select date"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={warrantyExpiry}
                  onChange={(e) => setWarrantyExpiry(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <StatusChip label="< 90 Days" size="small" onClick={() => {}} />
                  <StatusChip label="Expired" size="small" onClick={() => {}} />
                </Box>
              </Box>

              {/* Inspection Systems */}
              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Choose Inspection System</SubSectionTitle>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
                  {inspectionSystems.map((system) => (
                    <StatusChip
                      key={system}
                      label={system}
                      onDelete={() => handleRemoveInspectionSystem(system)}
                      bgcolor="#003d5b"
                      textcolor="#ffffff"
                    />
                  ))}
                </Box>
                <StyledSelect
                  value="CAMC Inspection"
                  size="small"
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="CAMC Inspection" sx={{ fontSize: '0.8rem' }}>CAMC Inspection</MenuItem>
                </StyledSelect>
              </Box>

              {/* AMC Inspection Schedule */}
              <Box sx={{ mb: 2 }}>
                <Paper sx={{ p: 1.5, backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase' }}>
                      AMC Inspection Schedule
                    </Typography>
                    <Button size="small" sx={{ fontSize: '0.65rem', color: '#0369a1', minWidth: 'auto', p: 0 }}>
                      Select All
                    </Button>
                  </Box>
                  <FormGroup>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={selectedInspections.amcWeekly} onChange={() => handleInspectionChange('amcWeekly')} />}
                      label="Weekly"
                    />
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={selectedInspections.amcMonthly} onChange={() => handleInspectionChange('amcMonthly')} />}
                      label="Monthly"
                    />
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={selectedInspections.amcQuarterly} onChange={() => handleInspectionChange('amcQuarterly')} />}
                      label="Quarterly"
                    />
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={selectedInspections.amcHalfYearly} onChange={() => handleInspectionChange('amcHalfYearly')} />}
                      label="Half Yearly"
                    />
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={selectedInspections.amcYearly} onChange={() => handleInspectionChange('amcYearly')} />}
                      label="Yearly"
                    />
                  </FormGroup>
                </Paper>
              </Box>

              {/* CAMC Inspection Schedule */}
              <Box sx={{ mb: 3 }}>
                <Paper sx={{ p: 1.5, backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#7e22ce', textTransform: 'uppercase' }}>
                      CAMC Inspection Schedule
                    </Typography>
                    <Button size="small" sx={{ fontSize: '0.65rem', color: '#7e22ce', minWidth: 'auto', p: 0 }}>
                      Select All
                    </Button>
                  </Box>
                  <FormGroup>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={selectedInspections.camcWeekly} onChange={() => handleInspectionChange('camcWeekly')} />}
                      label="Weekly"
                    />
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={selectedInspections.camcMonthly} onChange={() => handleInspectionChange('camcMonthly')} />}
                      label="Monthly"
                    />
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={selectedInspections.camcQuarterly} onChange={() => handleInspectionChange('camcQuarterly')} />}
                      label="Quarterly"
                    />
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={selectedInspections.camcHalfYearly} onChange={() => handleInspectionChange('camcHalfYearly')} />}
                      label="Half Yearly"
                    />
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={selectedInspections.camcYearly} onChange={() => handleInspectionChange('camcYearly')} />}
                      label="Yearly"
                    />
                  </FormGroup>
                </Paper>
              </Box>

              {/* Asset Condition */}
              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Choose Asset Condition</SubSectionTitle>
                <FormGroup>
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={assetCondition.critical} onChange={() => setAssetCondition(prev => ({ ...prev, critical: !prev.critical, normal: false }))} />}
                    label="Critical"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={assetCondition.normal} onChange={() => setAssetCondition(prev => ({ ...prev, normal: !prev.normal, critical: false }))} />}
                    label="Normal"
                  />
                </FormGroup>
              </Box>

              {/* Commissioning and Invoice */}
              <Box sx={{ mb: 1 }}>
                <SubSectionTitle>Commissioning Date</SubSectionTitle>
                <StyledTextField
                  placeholder="Select date"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={commissioningDate}
                  onChange={(e) => setCommissioningDate(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </Box>

              <Box>
                <SubSectionTitle>Invoice Date</SubSectionTitle>
                <StyledTextField
                  placeholder="Select date"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </Box>
            </SidebarPaper>
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} lg={9}>
            {/* Core Identification Card */}
            <SectionCard>
              <SectionHeader>
                <SectionIcon bgcolor={alpha('#003d5b', 0.1)}>
                  <InventoryIcon />
                </SectionIcon>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>
                  Core Identification
                </Typography>
              </SectionHeader>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Asset ID / Tag Number
                  </Typography>
                  <StyledTextField
                    placeholder="Enter asset ID or tag number"
                    size="small"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <InfoIcon sx={{ fontSize: '0.9rem', color: '#94a3b8' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Asset Name / Description
                  </Typography>
                  <StyledTextField
                    placeholder="Enter asset name or description"
                    size="small"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <InfoIcon sx={{ fontSize: '0.9rem', color: '#94a3b8' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Serial Number
                  </Typography>
                  <StyledTextField
                    placeholder="Enter serial number"
                    size="small"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <InfoIcon sx={{ fontSize: '0.9rem', color: '#94a3b8' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Asset Category
                  </Typography>
                  <StyledSelect
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    size="small"
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem value="others" sx={{ fontSize: '0.8rem' }}>Others</MenuItem>
                    <MenuItem value="material" sx={{ fontSize: '0.8rem' }}>Material Handling</MenuItem>
                    <MenuItem value="transportation" sx={{ fontSize: '0.8rem' }}>Transportation</MenuItem>
                  </StyledSelect>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Custom Asset Category
                  </Typography>
                  <StyledTextField
                    placeholder="Enter custom asset category name"
                    size="small"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <InfoAlert icon={<InfoIcon />}>
                Category selected: Others - All specialized filters are now available
              </InfoAlert>
            </SectionCard>

            {/* Material Handling Equipment Filters */}
            <SectionCard>
              <SectionHeader>
                <SectionIcon bgcolor={alpha('#0891b2', 0.1)}>
                  <PrecisionManufacturingIcon />
                </SectionIcon>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#0891b2' }}>
                  Material Handling Equipment Filters
                </Typography>
              </SectionHeader>

              <Box sx={{ mb: 2.5 }}>
                <FilterLabel>MHE: Utilization Status</FilterLabel>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={3}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={mheUtilization.active} onChange={() => setMheUtilization(prev => ({ ...prev, active: !prev.active }))} />}
                      label="Active"
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={mheUtilization.idle} onChange={() => setMheUtilization(prev => ({ ...prev, idle: !prev.idle }))} />}
                      label="Idle"
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={mheUtilization.notApplicable} onChange={() => setMheUtilization(prev => ({ ...prev, notApplicable: !prev.notApplicable }))} />}
                      label="Not Applicable"
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={mheUtilization.underMaintenance} onChange={() => setMheUtilization(prev => ({ ...prev, underMaintenance: !prev.underMaintenance }))} />}
                      label="Under Maintenance"
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={mheUtilization.decommissioned} onChange={() => setMheUtilization(prev => ({ ...prev, decommissioned: !prev.decommissioned }))} />}
                      label="Decommissioned"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <FilterLabel sx={{ mb: 0.5 }}>
                    MHE: Engine Status / <Box component="span" sx={{ color: '#94a3b8', fontWeight: 400, textTransform: 'capitalize' }}>Runtime (Hours)</Box>
                  </FilterLabel>
                  <StyledTextField
                    placeholder="Enter runtime hours"
                    size="small"
                    fullWidth
                    value={mheRuntime}
                    onChange={(e) => setMheRuntime(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <FilterLabel sx={{ mb: 0 }}>MHE: Safety Certification</FilterLabel>
                    <ToggleSwitch
                      checked={mheSafetyCert}
                      onChange={(e) => setMheSafetyCert(e.target.checked)}
                    />
                  </Box>
                </Grid>
              </Grid>
            </SectionCard>

            {/* Transportation Filters */}
            <SectionCard>
              <SectionHeader>
                <SectionIcon bgcolor={alpha('#2563eb', 0.1)}>
                  <LocalShippingIcon />
                </SectionIcon>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#2563eb' }}>
                  Transportation Filters
                </Typography>
              </SectionHeader>

              <Box sx={{ mb: 2.5 }}>
                <FilterLabel>Vehicle Type</FilterLabel>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={vehicleTypes.truck} onChange={() => setVehicleTypes(prev => ({ ...prev, truck: !prev.truck }))} />}
                      label="Truck"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={vehicleTypes.van} onChange={() => setVehicleTypes(prev => ({ ...prev, van: !prev.van }))} />}
                      label="Van"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={vehicleTypes.car} onChange={() => setVehicleTypes(prev => ({ ...prev, car: !prev.car }))} />}
                      label="Car"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={vehicleTypes.motorcycle} onChange={() => setVehicleTypes(prev => ({ ...prev, motorcycle: !prev.motorcycle }))} />}
                      label="Motorcycle"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={vehicleTypes.heavyDuty} onChange={() => setVehicleTypes(prev => ({ ...prev, heavyDuty: !prev.heavyDuty }))} />}
                      label="Heavy Duty"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={vehicleTypes.notApplicable} onChange={() => setVehicleTypes(prev => ({ ...prev, notApplicable: !prev.notApplicable }))} />}
                      label="Not Applicable"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <FilterLabel sx={{ mb: 0.5 }}>
                  Driver / <Box component="span" sx={{ color: '#94a3b8', fontWeight: 400, textTransform: 'capitalize' }}>Behavior Flag</Box>
                </FilterLabel>
                <StyledSelect
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                  size="small"
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="" sx={{ fontSize: '0.8rem' }}>Search and select driver</MenuItem>
                </StyledSelect>
              </Box>

              <Box>
                <FilterLabel sx={{ mb: 1 }}>Load Status: {loadStatus}%</FilterLabel>
                <StyledSlider
                  value={loadStatus}
                  onChange={(e, val) => setLoadStatus(val)}
                  valueLabelDisplay="auto"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.6rem' }}>0%</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.6rem' }}>100%</Typography>
                </Box>
              </Box>
            </SectionCard>

            {/* Rotating Machinery Filters */}
            <SectionCard>
              <SectionHeader>
                <SectionIcon bgcolor={alpha('#7c3aed', 0.1)}>
                  <SettingsIcon />
                </SectionIcon>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#7c3aed' }}>
                  Rotating Machinery Filters
                </Typography>
              </SectionHeader>

              <Box sx={{ mb: 2.5 }}>
                <FilterLabel sx={{ mb: 1 }}>Health Status Index</FilterLabel>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button
                    variant={healthIndex === 'green' ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setHealthIndex('green')}
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      borderColor: '#e2e8f0',
                      color: healthIndex === 'green' ? '#ffffff' : '#4b5563',
                      backgroundColor: healthIndex === 'green' ? '#10b981' : 'transparent',
                      '&:hover': {
                        backgroundColor: healthIndex === 'green' ? '#059669' : '#f1f5f9',
                      },
                    }}
                  >
                    Green
                  </Button>
                  <Button
                    variant={healthIndex === 'yellow' ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setHealthIndex('yellow')}
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      borderColor: '#e2e8f0',
                      color: healthIndex === 'yellow' ? '#ffffff' : '#4b5563',
                      backgroundColor: healthIndex === 'yellow' ? '#f59e0b' : 'transparent',
                      '&:hover': {
                        backgroundColor: healthIndex === 'yellow' ? '#d97706' : '#f1f5f9',
                      },
                    }}
                  >
                    Yellow
                  </Button>
                  <Button
                    variant={healthIndex === 'red' ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setHealthIndex('red')}
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      borderColor: '#e2e8f0',
                      color: healthIndex === 'red' ? '#ffffff' : '#4b5563',
                      backgroundColor: healthIndex === 'red' ? '#ef4444' : 'transparent',
                      '&:hover': {
                        backgroundColor: healthIndex === 'red' ? '#dc2626' : '#f1f5f9',
                      },
                    }}
                  >
                    Red
                  </Button>
                </Box>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <FilterLabel sx={{ mb: 0 }}>Vibration / Temperature Alert</FilterLabel>
                  <ToggleSwitch
                    checked={vibeAlert}
                    onChange={(e) => setVibeAlert(e.target.checked)}
                  />
                </Box>
              </Box>

              <Box>
                <FilterLabel sx={{ mb: 1 }}>Fault Type</FilterLabel>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={faultTypes.mechanical} onChange={() => setFaultTypes(prev => ({ ...prev, mechanical: !prev.mechanical }))} />}
                      label="Mechanical"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={faultTypes.electrical} onChange={() => setFaultTypes(prev => ({ ...prev, electrical: !prev.electrical }))} />}
                      label="Electrical"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={faultTypes.thermal} onChange={() => setFaultTypes(prev => ({ ...prev, thermal: !prev.thermal }))} />}
                      label="Thermal"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={faultTypes.hydraulic} onChange={() => setFaultTypes(prev => ({ ...prev, hydraulic: !prev.hydraulic }))} />}
                      label="Hydraulic"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={faultTypes.software} onChange={() => setFaultTypes(prev => ({ ...prev, software: !prev.software }))} />}
                      label="Software"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={faultTypes.notApplicable} onChange={() => setFaultTypes(prev => ({ ...prev, notApplicable: !prev.notApplicable }))} />}
                      label="Not Applicable"
                    />
                  </Grid>
                </Grid>
              </Box>
            </SectionCard>

            {/* Garbage Management Filters */}
            <SectionCard>
              <SectionHeader>
                <SectionIcon bgcolor={alpha('#0d9488', 0.1)}>
                  <DeleteIcon />
                </SectionIcon>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#0d9488' }}>
                  Garbage Management Filters
                </Typography>
              </SectionHeader>

              <Box sx={{ mb: 2.5 }}>
                <FilterLabel>Container Type / Size</FilterLabel>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={containerTypes.small} onChange={() => setContainerTypes(prev => ({ ...prev, small: !prev.small }))} />}
                      label="Small (120L)"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={containerTypes.medium} onChange={() => setContainerTypes(prev => ({ ...prev, medium: !prev.medium }))} />}
                      label="Medium (240L)"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={containerTypes.large} onChange={() => setContainerTypes(prev => ({ ...prev, large: !prev.large }))} />}
                      label="Large (660L)"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={containerTypes.industrial} onChange={() => setContainerTypes(prev => ({ ...prev, industrial: !prev.industrial }))} />}
                      label="Industrial (1100L)"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={containerTypes.notApplicable} onChange={() => setContainerTypes(prev => ({ ...prev, notApplicable: !prev.notApplicable }))} />}
                      label="Not Applicable"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <FilterLabel sx={{ mb: 1 }}>Smart Status (IoT Fill Level): {fillLevel}%</FilterLabel>
                <StyledSlider
                  value={fillLevel}
                  onChange={(e, val) => setFillLevel(val)}
                  valueLabelDisplay="auto"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.6rem' }}>0% Empty</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.6rem' }}>100% Full</Typography>
                </Box>
              </Box>

              <Box>
                <FilterLabel sx={{ mb: 0.5 }}>Collection Status</FilterLabel>
                <StyledSelect
                  value={collectionStatus}
                  onChange={(e) => setCollectionStatus(e.target.value)}
                  size="small"
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="" sx={{ fontSize: '0.8rem' }}>Select collection status</MenuItem>
                </StyledSelect>
              </Box>
            </SectionCard>

            {/* IT Assets Filters */}
            <SectionCard>
              <SectionHeader>
                <SectionIcon bgcolor={alpha('#2563eb', 0.1)}>
                  <ComputerIcon />
                </SectionIcon>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#2563eb' }}>
                  IT Assets Filters
                </Typography>
              </SectionHeader>

              <Box sx={{ mb: 2.5 }}>
                <FilterLabel>OS / Platform</FilterLabel>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={osPlatform.windows} onChange={() => setOsPlatform(prev => ({ ...prev, windows: !prev.windows }))} />}
                      label="Windows"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={osPlatform.macos} onChange={() => setOsPlatform(prev => ({ ...prev, macos: !prev.macos }))} />}
                      label="macOS"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={osPlatform.linux} onChange={() => setOsPlatform(prev => ({ ...prev, linux: !prev.linux }))} />}
                      label="Linux"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={osPlatform.ios} onChange={() => setOsPlatform(prev => ({ ...prev, ios: !prev.ios }))} />}
                      label="iOS"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={osPlatform.android} onChange={() => setOsPlatform(prev => ({ ...prev, android: !prev.android }))} />}
                      label="Android"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={osPlatform.other} onChange={() => setOsPlatform(prev => ({ ...prev, other: !prev.other }))} />}
                      label="Other"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={osPlatform.notApplicable} onChange={() => setOsPlatform(prev => ({ ...prev, notApplicable: !prev.notApplicable }))} />}
                      label="Not Applicable"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <FilterLabel sx={{ mb: 0.5 }}>Software Name</FilterLabel>
                <StyledTextField
                  placeholder="Enter software name"
                  size="small"
                  fullWidth
                  value={softwareName}
                  onChange={(e) => setSoftwareName(e.target.value)}
                />
              </Box>

              <Box>
                <FilterLabel sx={{ mb: 0.5 }}>License Status / Usage</FilterLabel>
                <StyledSelect
                  value={licenseStatus}
                  onChange={(e) => setLicenseStatus(e.target.value)}
                  size="small"
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="" sx={{ fontSize: '0.8rem' }}>Select license status</MenuItem>
                </StyledSelect>
              </Box>
            </SectionCard>

            {/* Facility Management Filters */}
            <SectionCard>
              <SectionHeader>
                <SectionIcon bgcolor={alpha('#0891b2', 0.1)}>
                  <BusinessIcon />
                </SectionIcon>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#0891b2' }}>
                  Facility Management Filters
                </Typography>
              </SectionHeader>

              <Box sx={{ mb: 2.5 }}>
                <FilterLabel>PM Status (Preventive Maintenance)</FilterLabel>
                <Grid container spacing={1}>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={pmStatus.upToDate} onChange={() => setPmStatus(prev => ({ ...prev, upToDate: !prev.upToDate }))} />}
                      label="Up to Date"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={pmStatus.dueSoon} onChange={() => setPmStatus(prev => ({ ...prev, dueSoon: !prev.dueSoon }))} />}
                      label="Due Soon"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={pmStatus.overdue} onChange={() => setPmStatus(prev => ({ ...prev, overdue: !prev.overdue }))} />}
                      label="Overdue"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={pmStatus.notScheduled} onChange={() => setPmStatus(prev => ({ ...prev, notScheduled: !prev.notScheduled }))} />}
                      label="Not Scheduled"
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControlLabelStyled
                      control={<CustomCheckbox checked={pmStatus.notApplicable} onChange={() => setPmStatus(prev => ({ ...prev, notApplicable: !prev.notApplicable }))} />}
                      label="Not Applicable"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <FilterLabel sx={{ mb: 0 }}>Safety / Compliance</FilterLabel>
                  <ToggleSwitch
                    checked={safetyCompliance}
                    onChange={(e) => setSafetyCompliance(e.target.checked)}
                  />
                </Box>
              </Box>

              <Box>
                <FilterLabel sx={{ mb: 1 }}>Maintenance Priority</FilterLabel>
                <RadioGroup value={maintenancePriority} onChange={(e) => setMaintenancePriority(e.target.value)}>
                  <FormControlLabelStyled
                    value="high"
                    control={<CustomRadio />}
                    label="High"
                  />
                  <FormControlLabelStyled
                    value="medium"
                    control={<CustomRadio />}
                    label="Medium"
                  />
                  <FormControlLabelStyled
                    value="low"
                    control={<CustomRadio />}
                    label="Low"
                  />
                </RadioGroup>
              </Box>
            </SectionCard>
          </Grid>
        </Grid>
      </MainContent>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterButton variant="cancel" onClick={handleCancel}>
            Cancel
          </FooterButton>
          <FooterButton variant="save" onClick={handleSave}>
            Save Asset
          </FooterButton>
        </FooterContent>
      </Footer>

      {/* Mobile Filter Drawer */}
      {isMobile && renderMobileFilterDrawer()}

      {/* Mobile FAB for quick actions */}
      {isSmallMobile && (
        <Fab
          color="primary"
          size="small"
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            backgroundColor: '#003d5b',
            '&:hover': {
              backgroundColor: alpha('#003d5b', 0.9),
            },
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ExpandMoreIcon sx={{ transform: 'rotate(180deg)' }} />
        </Fab>
      )}
    </PageContainer>
  );
}

export default AddNewAsset;
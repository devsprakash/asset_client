// pages/team/TeamAddAsset.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Chip,
  Grid,
  useTheme,
  useMediaQuery,
  alpha,
  Avatar,
  Stack,
  Alert,
  CircularProgress,
  Snackbar,
  Switch,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AssetProvider, useAsset } from '../../context/AssetContext';
import { useAuth } from '../../context/AuthContexts'; // Fixed: Changed from AuthContexts to AuthContext

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import WarningIcon from '@mui/icons-material/Warning';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

// Custom styled components
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

const StatusChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha('#003d5b', 0.1),
  color: '#003d5b',
  fontSize: '0.65rem',
  fontWeight: 600,
  height: 22,
  borderRadius: 12,
  '& .MuiChip-label': {
    padding: '0 8px',
  },
  '& .MuiChip-deleteIcon': {
    fontSize: '0.8rem',
    color: '#003d5b',
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

const SectionIcon = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: alpha('#003d5b', 0.1),
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

// Main component content that uses useAsset
function AddNewAssetContent() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, isAdmin, isTeam } = useAuth();
  const { createAsset, loading: assetLoading } = useAsset();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    serialNumber: '',
    model: '',
    manufacturer: '',
    category: 'other',
    customCategory: '',
    location: {
      type: 'warehouse_a',
      name: '',
      building: '',
      floor: '',
      bay: '',
      address: '',
    },
    status: 'active',
    condition: 'normal',
    healthScore: 100,
    isCritical: false,
    dates: {
      acquisitionDate: '',
      warrantyExpiryDate: '',
      commissioningDate: '',
      invoiceDate: '',
      lastInspectionDate: '',
      nextInspectionDate: '',
    },
    specifications: {
      weight: '',
      dimensions: '',
      powerSource: '',
      manufacturer: '',
      weightCapacity: '',
      runtime: 0,
      utilizationStatus: 'active',
    },
    mheDetails: {
      utilizationStatus: 'active',
      engineStatus: '',
      runtimeHours: 0,
      safetyCertification: {
        certified: false,
        certificationNumber: '',
        expiryDate: '',
      },
    },
    inspectionSystems: {
      amcInspection: false,
      camcInspection: false,
      amcSchedule: [],
      camcSchedule: [],
      lastInspectionDate: '',
      nextInspectionDate: '',
    },
    tags: [],
    notes: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  const handleDeepNestedChange = (parent, child, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: { ...prev[parent][child], [field]: value },
      },
    }));
  };

  const handleAddTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleBack = () => navigate(-1);
  const handleCancel = () => navigate('/team/assets');

  const handleSave = async () => {
    if (!formData.name) {
      setSnackbar({ open: true, message: 'Asset name is required', severity: 'error' });
      return;
    }

    setSaving(true);
    
    const token = localStorage.getItem("accessToken");
    if (!token || token === "undefined" || token === "null") {
      setSnackbar({ open: true, message: 'No authentication token found. Please login again.', severity: 'error' });
      setSaving(false);
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    
    const assetData = {
      name: formData.name,
      description: formData.description,
      serialNumber: formData.serialNumber,
      model: formData.model,
      manufacturer: formData.manufacturer,
      category: formData.category === 'other' && formData.customCategory ? 'other' : formData.category,
      location: formData.location,
      status: formData.status,
      condition: formData.condition,
      healthScore: parseInt(formData.healthScore),
      isCritical: formData.isCritical,
      dates: {
        acquisitionDate: formData.dates.acquisitionDate || undefined,
        warrantyExpiryDate: formData.dates.warrantyExpiryDate || undefined,
        commissioningDate: formData.dates.commissioningDate || undefined,
        invoiceDate: formData.dates.invoiceDate || undefined,
        lastInspectionDate: formData.dates.lastInspectionDate || undefined,
        nextInspectionDate: formData.dates.nextInspectionDate || undefined,
      },
      specifications: {
        weight: formData.specifications.weight,
        dimensions: formData.specifications.dimensions,
        powerSource: formData.specifications.powerSource,
        manufacturer: formData.specifications.manufacturer,
        weightCapacity: formData.specifications.weightCapacity,
        runtime: parseInt(formData.specifications.runtime) || 0,
        utilizationStatus: formData.specifications.utilizationStatus,
      },
      mheDetails: {
        utilizationStatus: formData.mheDetails.utilizationStatus,
        engineStatus: formData.mheDetails.engineStatus,
        runtimeHours: parseInt(formData.mheDetails.runtimeHours) || 0,
        safetyCertification: {
          certified: formData.mheDetails.safetyCertification.certified,
          certificationNumber: formData.mheDetails.safetyCertification.certificationNumber,
          expiryDate: formData.mheDetails.safetyCertification.expiryDate || undefined,
        },
      },
      inspectionSystems: {
        amcInspection: formData.inspectionSystems.amcInspection,
        camcInspection: formData.inspectionSystems.camcInspection,
        amcSchedule: formData.inspectionSystems.amcSchedule,
        camcSchedule: formData.inspectionSystems.camcSchedule,
        lastInspectionDate: formData.inspectionSystems.lastInspectionDate || undefined,
        nextInspectionDate: formData.inspectionSystems.nextInspectionDate || undefined,
      },
      tags: formData.tags,
      notes: formData.notes,
    };

    if (formData.category === 'other' && formData.customCategory) {
      assetData.customCategory = formData.customCategory;
    }

    console.log('Submitting asset data:', assetData);
    
    const result = await createAsset(assetData);
    
    if (result.success) {
      setSnackbar({ open: true, message: 'Asset created successfully! Redirecting...', severity: 'success' });
      setTimeout(() => navigate('/team/assets'), 2000);
    } else {
      setSnackbar({ open: true, message: result.error || 'Failed to create asset', severity: 'error' });
    }
    
    setSaving(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <PageContainer>
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
                Team Member - Asset details and classification
              </Typography>
            </Box>
          </Box>
        </HeaderContent>
      </Header>

      <MainContent>
        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} lg={3}>
            <SidebarPaper>
              <SectionTitle>Asset Details</SectionTitle>
              
              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Location</SubSectionTitle>
                <FormGroup>
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.location.type === 'warehouse_a'} onChange={() => handleNestedChange('location', 'type', 'warehouse_a')} />}
                    label="Warehouse A"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.location.type === 'warehouse_b'} onChange={() => handleNestedChange('location', 'type', 'warehouse_b')} />}
                    label="Warehouse B"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.location.type === 'office'} onChange={() => handleNestedChange('location', 'type', 'office')} />}
                    label="Office Building"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.location.type === 'factory'} onChange={() => handleNestedChange('location', 'type', 'factory')} />}
                    label="Factory Floor"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.location.type === 'remote'} onChange={() => handleNestedChange('location', 'type', 'remote')} />}
                    label="Remote Site"
                  />
                </FormGroup>
              </Box>

              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Address Details</SubSectionTitle>
                <Stack spacing={1.5}>
                  <StyledTextField 
                    placeholder="Street address" 
                    size="small" 
                    fullWidth 
                    value={formData.location.address}
                    onChange={(e) => handleNestedChange('location', 'address', e.target.value)}
                  />
                  <StyledTextField 
                    placeholder="Building" 
                    size="small" 
                    fullWidth 
                    value={formData.location.building}
                    onChange={(e) => handleNestedChange('location', 'building', e.target.value)}
                  />
                  <StyledTextField 
                    placeholder="Floor" 
                    size="small" 
                    fullWidth 
                    value={formData.location.floor}
                    onChange={(e) => handleNestedChange('location', 'floor', e.target.value)}
                  />
                  <StyledTextField 
                    placeholder="Bay" 
                    size="small" 
                    fullWidth 
                    value={formData.location.bay}
                    onChange={(e) => handleNestedChange('location', 'bay', e.target.value)}
                  />
                </Stack>
              </Box>

              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Status</SubSectionTitle>
                <FormGroup>
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.status === 'active'} onChange={() => handleChange('status', 'active')} />}
                    label="Active"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.status === 'in_maintenance'} onChange={() => handleChange('status', 'in_maintenance')} />}
                    label="In Maintenance"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.status === 'retired'} onChange={() => handleChange('status', 'retired')} />}
                    label="Retired"
                  />
                </FormGroup>
              </Box>

              <Box sx={{ mb: 3 }}>
                <SubSectionTitle>Important Dates</SubSectionTitle>
                <StyledTextField
                  type="date"
                  size="small"
                  fullWidth
                  label="Acquisition Date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.dates.acquisitionDate}
                  onChange={(e) => handleNestedChange('dates', 'acquisitionDate', e.target.value)}
                  sx={{ mb: 1.5 }}
                />
                <StyledTextField
                  type="date"
                  size="small"
                  fullWidth
                  label="Warranty Expiry"
                  InputLabelProps={{ shrink: true }}
                  value={formData.dates.warrantyExpiryDate}
                  onChange={(e) => handleNestedChange('dates', 'warrantyExpiryDate', e.target.value)}
                />
              </Box>

              <Box>
                <SubSectionTitle>Condition</SubSectionTitle>
                <FormGroup>
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.condition === 'excellent'} onChange={() => handleChange('condition', 'excellent')} />}
                    label="Excellent"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.condition === 'normal'} onChange={() => handleChange('condition', 'normal')} />}
                    label="Normal"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.condition === 'fair'} onChange={() => handleChange('condition', 'fair')} />}
                    label="Fair"
                  />
                  <FormControlLabelStyled
                    control={<CustomCheckbox checked={formData.condition === 'poor'} onChange={() => handleChange('condition', 'poor')} />}
                    label="Poor"
                  />
                </FormGroup>
              </Box>
            </SidebarPaper>
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} lg={9}>
            <SectionCard>
              <SectionHeader>
                <SectionIcon>
                  <InventoryIcon />
                </SectionIcon>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>
                  Core Identification
                </Typography>
              </SectionHeader>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Asset Name *
                  </Typography>
                  <StyledTextField
                    placeholder="Enter asset name"
                    size="small"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Description
                  </Typography>
                  <StyledTextField
                    placeholder="Enter description"
                    size="small"
                    fullWidth
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
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
                    value={formData.serialNumber}
                    onChange={(e) => handleChange('serialNumber', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Model
                  </Typography>
                  <StyledTextField
                    placeholder="Enter model"
                    size="small"
                    fullWidth
                    value={formData.model}
                    onChange={(e) => handleChange('model', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Manufacturer
                  </Typography>
                  <StyledTextField
                    placeholder="Enter manufacturer"
                    size="small"
                    fullWidth
                    value={formData.manufacturer}
                    onChange={(e) => handleChange('manufacturer', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Category
                  </Typography>
                  <StyledSelect
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    size="small"
                    fullWidth
                  >
                    <MenuItem value="electrical">Electrical</MenuItem>
                    <MenuItem value="mechanical">Mechanical</MenuItem>
                    <MenuItem value="material_handling">Material Handling</MenuItem>
                    <MenuItem value="vehicle">Vehicle</MenuItem>
                    <MenuItem value="safety">Safety</MenuItem>
                    <MenuItem value="hvac">HVAC</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </StyledSelect>
                </Grid>
                {formData.category === 'other' && (
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                      Custom Category
                    </Typography>
                    <StyledTextField
                      placeholder="Enter custom category"
                      size="small"
                      fullWidth
                      value={formData.customCategory}
                      onChange={(e) => handleChange('customCategory', e.target.value)}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Health Score"
                    type="number"
                    value={formData.healthScore}
                    onChange={(e) => handleChange('healthScore', e.target.value)}
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    size="small"
                  />
                </Grid>
              </Grid>

              <InfoAlert icon={<InfoIcon />}>
                Category selected: {formData.category}
              </InfoAlert>
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <SectionIcon>
                  <PrecisionManufacturingIcon />
                </SectionIcon>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#0891b2' }}>
                  Equipment Details
                </Typography>
              </SectionHeader>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Weight
                  </Typography>
                  <StyledTextField
                    placeholder="e.g., 2500 kg"
                    size="small"
                    fullWidth
                    value={formData.specifications.weight}
                    onChange={(e) => handleNestedChange('specifications', 'weight', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Dimensions
                  </Typography>
                  <StyledTextField
                    placeholder="e.g., 300x150x200 cm"
                    size="small"
                    fullWidth
                    value={formData.specifications.dimensions}
                    onChange={(e) => handleNestedChange('specifications', 'dimensions', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Power Source
                  </Typography>
                  <StyledTextField
                    placeholder="e.g., Diesel, Electric"
                    size="small"
                    fullWidth
                    value={formData.specifications.powerSource}
                    onChange={(e) => handleNestedChange('specifications', 'powerSource', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, color: '#475569', mb: 0.5 }}>
                    Runtime Hours
                  </Typography>
                  <StyledTextField
                    type="number"
                    placeholder="Runtime in hours"
                    size="small"
                    fullWidth
                    value={formData.specifications.runtime}
                    onChange={(e) => handleNestedChange('specifications', 'runtime', e.target.value)}
                  />
                </Grid>
              </Grid>
            </SectionCard>

            <SectionCard>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WarningIcon sx={{ color: formData.isCritical ? '#ef4444' : '#94a3b8', fontSize: '1.1rem' }} />
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, color: '#1e293b' }}>
                    Mark as Critical Asset
                  </Typography>
                </Box>
                <ToggleSwitch
                  checked={formData.isCritical}
                  onChange={(e) => handleChange('isCritical', e.target.checked)}
                />
              </Box>
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <SectionIcon>
                  <CategoryIcon />
                </SectionIcon>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>
                  Tags & Notes
                </Typography>
              </SectionHeader>

              <Box sx={{ mb: 2 }}>
                <FilterLabel>Tags</FilterLabel>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {formData.tags.map((tag, index) => (
                    <StatusChip key={index} label={tag} onDelete={() => handleRemoveTag(tag)} />
                  ))}
                </Box>
                <StyledTextField
                  placeholder="Type a tag and press Enter"
                  size="small"
                  fullWidth
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </Box>

              <Box>
                <FilterLabel>Additional Notes</FilterLabel>
                <StyledTextField
                  placeholder="Enter any additional notes"
                  multiline
                  rows={3}
                  fullWidth
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                />
              </Box>
            </SectionCard>
          </Grid>
        </Grid>
      </MainContent>

      <Footer>
        <FooterContent>
          <FooterButton variant="cancel" onClick={handleCancel} startIcon={<CancelIcon />}>
            Cancel
          </FooterButton>
          <FooterButton 
            variant="save" 
            onClick={handleSave}
            disabled={saving || assetLoading || !formData.name}
            startIcon={saving || assetLoading ? <CircularProgress size={16} /> : <SaveIcon />}
          >
            {saving || assetLoading ? 'Saving...' : 'Save Asset'}
          </FooterButton>
        </FooterContent>
      </Footer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}

// Wrapper component that provides the AssetProvider
function TeamAddAsset() {
  return (
    <AssetProvider>
      <AddNewAssetContent />
    </AssetProvider>
  );
}

export default TeamAddAsset;
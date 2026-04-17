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
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  alpha,
  Badge,
  Stack,
  Fab,
  Drawer,
  SwipeableDrawer,
  Divider,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import BuildIcon from '@mui/icons-material/Build';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WaterIcon from '@mui/icons-material/Water';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

// Custom styled components with reduced font sizes
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  fontFamily: '"Inter", sans-serif',
  padding: theme.spacing(1.5),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5),
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  '&:hover': {
    backgroundColor: '#f8fafc',
    borderColor: alpha('#0d4a5c', 0.3),
  },
  '& svg': {
    fontSize: '1.1rem',
    color: '#4b5563',
  },
  [theme.breakpoints.down('sm')]: {
    width: 32,
    height: 32,
    '& svg': {
      fontSize: '0.95rem',
    },
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 700,
  color: '#0d4a5c',
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

const SearchSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 10,
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  marginBottom: theme.spacing(2.5),
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2),
    marginBottom: theme.spacing(2),
  },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    height: 42,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    fontSize: '0.75rem',
    '& fieldset': {
      borderColor: alpha(theme.palette.divider, 0.15),
      borderWidth: 1,
    },
    '&:hover fieldset': {
      borderColor: alpha('#0d4a5c', 0.4),
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0d4a5c',
      borderWidth: 1.5,
    },
  },
  '& .MuiInputAdornment-root': {
    '& svg': {
      fontSize: '0.95rem',
      color: '#94a3b8',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      height: 38,
      fontSize: '0.7rem',
    },
  },
}));

const CategorySelect = styled(FormControl)(({ theme }) => ({
  minWidth: 180,
  [theme.breakpoints.down('md')]: {
    minWidth: '100%',
  },
  '& .MuiOutlinedInput-root': {
    height: 42,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    fontSize: '0.75rem',
    '& fieldset': {
      borderColor: alpha(theme.palette.divider, 0.15),
    },
    '&:hover fieldset': {
      borderColor: alpha('#0d4a5c', 0.4),
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0d4a5c',
      borderWidth: 1.5,
    },
  },
  '& .MuiSelect-icon': {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      height: 38,
      fontSize: '0.7rem',
    },
  },
}));

const MobileFilterChip = styled(Chip)(({ theme, active }) => ({
  height: 30,
  borderRadius: 16,
  fontSize: '0.65rem',
  fontWeight: 500,
  backgroundColor: active ? alpha('#0d4a5c', 0.08) : '#ffffff',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  color: active ? '#0d4a5c' : '#64748b',
  '& .MuiChip-icon': {
    fontSize: '0.8rem',
    color: active ? '#0d4a5c' : '#94a3b8',
  },
  '&:hover': {
    backgroundColor: active ? alpha('#0d4a5c', 0.12) : '#f8fafc',
  },
}));

const AssetCard = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  backgroundColor: '#ffffff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(13,74,92,0.06)',
    transform: 'translateY(-2px)',
    borderColor: alpha('#0d4a5c', 0.2),
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  paddingBottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
}));

const AssetTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#1e293b',
  lineHeight: 1.4,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const StatusChip = styled(Chip)(({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'operational':
        return {
          backgroundColor: alpha('#0d4a5c', 0.08),
          color: '#0d4a5c',
          borderColor: alpha('#0d4a5c', 0.2),
        };
      case 'inspection':
        return {
          backgroundColor: alpha('#f59e0b', 0.08),
          color: '#b45309',
          borderColor: alpha('#f59e0b', 0.2),
        };
      case 'review':
        return {
          backgroundColor: alpha('#8b5cf6', 0.08),
          color: '#6d28d9',
          borderColor: alpha('#8b5cf6', 0.2),
        };
      case 'maintenance':
        return {
          backgroundColor: alpha('#ef4444', 0.08),
          color: '#b91c1c',
          borderColor: alpha('#ef4444', 0.2),
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
    height: 20,
    fontSize: '0.6rem',
    fontWeight: 600,
    borderRadius: 10,
    '& .MuiChip-label': {
      padding: '0 6px',
    },
    ...getStatusStyles(),
  };
});

const LocationText = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.3),
  color: '#64748b',
  fontSize: '0.65rem',
  padding: theme.spacing(0, 1.5),
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1.5),
  '& svg': {
    fontSize: '0.7rem',
    color: '#94a3b8',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
    marginBottom: theme.spacing(1),
    '& svg': {
      fontSize: '0.65rem',
    },
  },
}));

const CardContent_ = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1.5),
  paddingTop: 0,
  flex: 1,
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0.6, 0),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const InfoLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.3),
  fontSize: '0.65rem',
  color: '#94a3b8',
  '& svg': {
    fontSize: '0.7rem',
    color: '#cbd5e1',
  },
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.65rem',
  fontWeight: 500,
  color: '#334155',
}));

const CloneButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1.5),
  marginTop: 0,
  padding: theme.spacing(0.8),
  backgroundColor: '#f8fafc',
  color: '#0d4a5c',
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: 6,
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  '&:hover': {
    backgroundColor: '#f1f5f9',
    borderColor: alpha('#0d4a5c', 0.3),
  },
  '& svg': {
    fontSize: '0.8rem',
    marginRight: theme.spacing(0.5),
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(1),
    padding: theme.spacing(0.6),
    fontSize: '0.65rem',
    '& svg': {
      fontSize: '0.75rem',
    },
  },
}));

const QuickStatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.2),
  borderRadius: 10,
  backgroundColor: '#ffffff',
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  marginBottom: theme.spacing(2),
}));

const MobileFilterDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '75vh',
    backgroundColor: '#ffffff',
  },
}));

function CloneAssets() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const assets = [
    {
      id: 1,
      title: 'Generator Unit A-12',
      location: 'Building A Floor 3',
      status: 'operational',
      statusText: 'Operational',
      assetId: 'GEN-A12',
      category: 'Electrical',
      lastInspection: '2024-10-28',
      model: 'GEN-1200',
      manufacturer: 'PowerCo',
    },
    {
      id: 2,
      title: 'HVAC System B-04',
      location: 'Building B - Rooftop',
      status: 'inspection',
      statusText: 'Inspection',
      assetId: 'HVAC-B04',
      category: 'HVAC',
      lastInspection: '2024-10-25',
      model: 'HVAC-2000',
      manufacturer: 'ClimateTech',
    },
    {
      id: 3,
      title: 'Conveyor Belt C-21',
      location: 'Warehouse Section C',
      status: 'review',
      statusText: 'Review',
      assetId: 'CONV-C21',
      category: 'Machinery',
      lastInspection: '2024-10-20',
      model: 'CONV-500',
      manufacturer: 'MechSys',
    },
    {
      id: 4,
      title: 'Pump Station D-07',
      location: 'Building D - Basement',
      status: 'operational',
      statusText: 'Operational',
      assetId: 'PUMP-D07',
      category: 'Plumbing',
      lastInspection: '2024-10-30',
      model: 'PUMP-150',
      manufacturer: 'FlowTech',
    },
    {
      id: 5,
      title: 'Compressor E-15',
      location: 'Building E-Floor 1',
      status: 'review',
      statusText: 'Review',
      assetId: 'COMP-E15',
      category: 'Machinery',
      lastInspection: '2024-10-26',
      model: 'COMP-300',
      manufacturer: 'AirPress',
    },
    {
      id: 6,
      title: 'Fire Panel F-02',
      location: 'Building F - Lobby',
      status: 'maintenance',
      statusText: 'Maintenance',
      assetId: 'FIRE-F02',
      category: 'Safety',
      lastInspection: '2024-10-29',
      model: 'FP-200',
      manufacturer: 'SafeGuard',
    },
  ];

  const categories = ['All', 'Electrical', 'HVAC', 'Machinery', 'Plumbing', 'Safety'];
  const statuses = ['All', 'Operational', 'Inspection', 'Review', 'Maintenance'];

  const handleBack = () => {
    navigate(-1);
  };

  const handleClone = (assetTitle) => {
    console.log(`Cloning asset: ${assetTitle}`);
    // Add your clone logic here
  };

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || asset.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Quick stats
  const totalAssets = assets.length;
  const operationalAssets = assets.filter(a => a.status === 'operational').length;
  const inspectionAssets = assets.filter(a => a.status === 'inspection').length;
  const maintenanceAssets = assets.filter(a => a.status === 'maintenance').length;

  // Mobile Filter Drawer
  const renderFilterDrawer = () => (
    <MobileFilterDrawer
      anchor="bottom"
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
      onOpen={() => setFilterDrawerOpen(true)}
      disableSwipeToOpen={false}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
            Filter Assets
          </Typography>
          <IconButton size="small" onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Box>

        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', mb: 1, display: 'block' }}>
          Category
        </Typography>
        <Grid container spacing={1} sx={{ mb: 2.5 }}>
          {categories.map((cat) => (
            <Grid item xs={4} key={cat}>
              <Button
                fullWidth
                size="small"
                variant={category === cat.toLowerCase() ? 'contained' : 'outlined'}
                onClick={() => {
                  setCategory(cat.toLowerCase());
                  setFilterDrawerOpen(false);
                }}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.65rem',
                  borderRadius: 6,
                  borderColor: '#e2e8f0',
                  color: category === cat.toLowerCase() ? '#ffffff' : '#64748b',
                  backgroundColor: category === cat.toLowerCase() ? '#0d4a5c' : 'transparent',
                  py: 0.5,
                  '&:hover': {
                    borderColor: '#0d4a5c',
                  },
                }}
              >
                {cat}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            size="small"
            variant="text"
            onClick={() => {
              setCategory('all');
              setFilterDrawerOpen(false);
            }}
            sx={{
              textTransform: 'none',
              fontSize: '0.7rem',
              color: '#64748b',
            }}
          >
            Reset
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => setFilterDrawerOpen(false)}
            sx={{
              textTransform: 'none',
              fontSize: '0.7rem',
              backgroundColor: '#0d4a5c',
              px: 3,
              '&:hover': {
                backgroundColor: alpha('#0d4a5c', 0.9),
              },
            }}
          >
            Done
          </Button>
        </Box>
      </Box>
    </MobileFilterDrawer>
  );

  return (
    <PageContainer>
      <Container maxWidth="xl" disableGutters={isMobile}>
        {/* Header with Back Button */}
        <HeaderSection>
          <BackButton onClick={handleBack} aria-label="Go back">
            <ArrowBackIcon />
          </BackButton>
          <Box>
            <HeaderTitle>Clone Assets</HeaderTitle>
            <HeaderSubtitle>Select an asset to clone with all details</HeaderSubtitle>
          </Box>
        </HeaderSection>

        {/* Mobile Quick Stats */}
        {isMobile && (
          <QuickStatsCard>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0d4a5c', fontSize: '0.8rem' }}>
                    {totalAssets}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.55rem' }}>
                    Total
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0d4a5c', fontSize: '0.8rem' }}>
                    {operationalAssets}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.55rem' }}>
                    Active
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b', fontSize: '0.8rem' }}>
                    {inspectionAssets}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.55rem' }}>
                    Inspect
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ef4444', fontSize: '0.8rem' }}>
                    {maintenanceAssets}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.55rem' }}>
                    Maint
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </QuickStatsCard>
        )}

        {/* Search and Filter Section */}
        <SearchSection>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 1.5,
          }}>
            <SearchInput
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              size="small"
            />

            {!isMobile ? (
              // Desktop Category Select
              <CategorySelect size="small">
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  displayEmpty
                  IconComponent={ArrowDropDownIcon}
                  sx={{
                    fontSize: '0.75rem',
                  }}
                >
                  <MenuItem value="all" sx={{ fontSize: '0.75rem' }}>All Categories</MenuItem>
                  {categories.slice(1).map((cat) => (
                    <MenuItem key={cat} value={cat.toLowerCase()} sx={{ fontSize: '0.75rem' }}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </CategorySelect>
            ) : (
              // Mobile Filter Chip
              <Box sx={{ display: 'flex', gap: 1 }}>
                <MobileFilterChip
                  icon={<CategoryIcon />}
                  label={category === 'all' ? 'Category' : category}
                  onClick={() => setFilterDrawerOpen(true)}
                  active={category !== 'all'}
                />
                <IconButton
                  size="small"
                  onClick={() => setFilterDrawerOpen(true)}
                  sx={{
                    border: '1px solid #e2e8f0',
                    borderRadius: 1,
                    height: 38,
                    width: 38,
                  }}
                >
                  <FilterListIcon sx={{ fontSize: '1rem', color: '#64748b' }} />
                </IconButton>
              </Box>
            )}
          </Box>
        </SearchSection>

        {/* Asset Grid */}
        <Grid container spacing={1.5}>
          {filteredAssets.map((asset) => (
            <Grid item xs={12} sm={6} lg={4} key={asset.id}>
              <AssetCard>
                <CardHeader>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AssetTitle>{asset.title}</AssetTitle>
                  </Box>
                  <StatusChip 
                    status={asset.status} 
                    label={asset.statusText}
                    size="small"
                    variant="outlined"
                  />
                </CardHeader>

                <LocationText>
                  <LocationOnIcon />
                  {asset.location}
                </LocationText>

                <CardContent_>
                  <InfoRow>
                    <InfoLabel>
                      <InventoryIcon />
                      Asset ID:
                    </InfoLabel>
                    <InfoValue>{asset.assetId}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>
                      <CategoryIcon />
                      Category:
                    </InfoLabel>
                    <InfoValue>{asset.category}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>
                      <CalendarTodayIcon />
                      Last Insp:
                    </InfoLabel>
                    <InfoValue>{asset.lastInspection}</InfoValue>
                  </InfoRow>

                  {/* Mobile Expandable Details */}
                  {isMobile && (
                    <>
                      <Button
                        fullWidth
                        size="small"
                        onClick={() => handleExpandClick(asset.id)}
                        sx={{ 
                          mt: 0.5, 
                          textTransform: 'none', 
                          color: '#0d4a5c',
                          fontSize: '0.6rem',
                          p: 0.2,
                        }}
                      >
                        {expandedId === asset.id ? 'Less' : 'More details'}
                      </Button>
                      
                      <Collapse in={expandedId === asset.id}>
                        <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #edf2f7' }}>
                          <InfoRow>
                            <InfoLabel>Model:</InfoLabel>
                            <InfoValue>{asset.model}</InfoValue>
                          </InfoRow>
                          <InfoRow>
                            <InfoLabel>Manufacturer:</InfoLabel>
                            <InfoValue>{asset.manufacturer}</InfoValue>
                          </InfoRow>
                        </Box>
                      </Collapse>
                    </>
                  )}
                </CardContent_>

                <CloneButton onClick={(()=> navigate("/team/clone/asset/deatils"))}
                  fullWidth
                  startIcon={<ContentCopyIcon />}
                >
                  Clone
                </CloneButton>
              </AssetCard>
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredAssets.length === 0 && (
          <Paper sx={{ 
            textAlign: 'center', 
            py: 4,
            px: 2,
            mt: 3,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          }}>
            <Typography sx={{ fontSize: '0.8rem', color: '#64748b', mb: 1 }}>
              No assets found
            </Typography>
            <Button
              size="small"
              onClick={() => {
                setSearchTerm('');
                setCategory('all');
              }}
              sx={{
                fontSize: '0.7rem',
                color: '#0d4a5c',
                textTransform: 'none',
              }}
            >
              Clear filters
            </Button>
          </Paper>
        )}

        {/* Footer */}
        <Box sx={{ 
          borderTop: '1px solid #edf2f7', 
          py: 1.5, 
          mt: 3,
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.6rem',
        }}>
          © 2026 Asset Management System
        </Box>
      </Container>

      {/* Mobile Filter Drawer */}
      {isMobile && renderFilterDrawer()}

      {/* Mobile FAB for Quick Clone */}
      {isMobile && filteredAssets.length > 0 && (
        <Tooltip title="Quick clone last asset" arrow>
          <Fab
            size="small"
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              backgroundColor: '#0d4a5c',
              width: 40,
              height: 40,
              '&:hover': {
                backgroundColor: alpha('#0d4a5c', 0.9),
              },
            }}
            onClick={() => handleClone(filteredAssets[0].title)}
          >
            <ContentCopyIcon sx={{ fontSize: '1rem' }} />
          </Fab>
        </Tooltip>
      )}
    </PageContainer>
  );
}

export default CloneAssets;
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
  TextField,
  InputAdornment,
  FormControl,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Alert,
  Switch,
  Fab,
  Fade,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Toolbar,
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
  Search as SearchIcon,
  DragIndicator as DragIndicatorIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  CheckBox as CheckBoxIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  CalendarToday as CalendarTodayIcon,
  TextFields as TextFieldsIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Assignment as AssignmentIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';

const primaryColor = "#0f4c61";

// Styled components with reduced sizing
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  border: '1px solid',
  borderColor: theme.palette.divider,
  transition: 'all 0.2s',
  '&:hover': { 
    transform: 'translateY(-2px)', 
    boxShadow: theme.shadows[4],
  },
  height: '100%',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
}));

const FieldCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(1),
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: primaryColor,
    boxShadow: `0 4px 12px ${alpha(primaryColor, 0.1)}`,
  },
}));

const AssigneeCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatIconWrapper = styled(Avatar)(({ theme, color }) => ({
  width: 40,
  height: 40,
  backgroundColor: color === 'primary' 
    ? `${primaryColor}15`
    : color === 'info'
    ? '#e1f5fe'
    : color === 'success'
    ? '#e8f5e9'
    : color === 'warning'
    ? '#fff3e0'
    : theme.palette.action.hover,
  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
  },
}));

// Checklist Fields Component
const ChecklistFields = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [fields, setFields] = useState([
    { id: 1, name: 'Inspector Name', required: true, type: 'Text' },
    { id: 2, name: 'Facility Location', required: true, type: 'Text' },
    { id: 3, name: 'Inspection Date', required: true, type: 'Date' },
    { id: 4, name: 'Fire Safety Equipment', required: true, type: 'Checkbox' },
    { id: 5, name: 'Emergency Exits Clear', required: true, type: 'Radio' },
    { id: 6, name: 'Electrical Systems', required: true, type: 'Checkbox' },
    { id: 7, name: 'Additional Notes', required: false, type: 'Text' },
  ]);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Text': return <TextFieldsIcon sx={{ fontSize: 16 }} />;
      case 'Date': return <CalendarTodayIcon sx={{ fontSize: 16 }} />;
      case 'Checkbox': return <CheckBoxIcon sx={{ fontSize: 16 }} />;
      case 'Radio': return <RadioButtonCheckedIcon sx={{ fontSize: 16 }} />;
      default: return <TextFieldsIcon sx={{ fontSize: 16 }} />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '0.875rem' }}>
            Checklist Fields
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {fields.length} fields • Drag to reorder
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: 14 }} />}
          size="small"
          sx={{
            bgcolor: primaryColor,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.6875rem',
            borderRadius: 2,
            py: 0.5,
          }}
        >
          Add Field
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search fields..."
        size="small"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.disabled', fontSize: 16 }} />
            </InputAdornment>
          ),
          sx: { borderRadius: 2, fontSize: '0.75rem' },
        }}
      />

      {fields.map((field) => (
        <FieldCard key={field.id} elevation={0}>
          <CardContent sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DragIndicatorIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
                <Box sx={{ 
                  width: 32, height: 32, borderRadius: 2, bgcolor: alpha(primaryColor, 0.1),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {getTypeIcon(field.type)}
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                    {field.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}>
                    FLD-{field.id.toString().padStart(3, '0')}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={field.type}
                  size="small"
                  sx={{ height: 20, fontSize: '0.625rem', bgcolor: alpha(primaryColor, 0.08), color: primaryColor }}
                />
                <Chip
                  label={field.required ? 'Required' : 'Optional'}
                  size="small"
                  sx={{ height: 20, fontSize: '0.625rem', bgcolor: field.required ? alpha(primaryColor, 0.08) : alpha('#000', 0.04) }}
                />
                <IconButton size="small">
                  <MoreVertIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </FieldCard>
      ))}
    </Box>
  );
};

// Assignees Component
const AssigneesList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');

  const assignees = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@acme.com`,
    role: i % 3 === 0 ? 'Inspector' : i % 3 === 1 ? 'Supervisor' : 'Manager',
    status: i % 4 === 0 ? 'Active' : i % 4 === 1 ? 'Away' : 'Busy',
    assignments: Math.floor(Math.random() * 8) + 3,
  }));

  const filteredAssignees = assignees.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return '#4caf50';
      case 'Away': return '#ff9800';
      case 'Busy': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '0.875rem' }}>
            Assigned Users
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {assignees.length} users
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: 14 }} />}
          size="small"
          sx={{ bgcolor: primaryColor, textTransform: 'none', fontWeight: 600, fontSize: '0.6875rem' }}
        >
          Add Users
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search users..."
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.disabled', fontSize: 16 }} />
            </InputAdornment>
          ),
          sx: { borderRadius: 2, fontSize: '0.75rem' },
        }}
      />

      <Grid container spacing={1.5}>
        {filteredAssignees.map((assignee) => (
          <Grid item xs={12} sm={6} key={assignee.id}>
            <AssigneeCard elevation={0}>
              <CardContent sx={{ p: 1.5 }}>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Box sx={{ width: 10, height: 10, bgcolor: getStatusColor(assignee.status), borderRadius: '50%', border: 2, borderColor: 'background.paper' }} />
                      }
                    >
                      <Avatar sx={{ width: 40, height: 40, bgcolor: alpha(primaryColor, 0.2), color: primaryColor, fontSize: '0.875rem' }}>
                        {assignee.name.charAt(0)}
                      </Avatar>
                    </Badge>
                    <IconButton size="small">
                      <MoreVertIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                      {assignee.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}>
                      {assignee.email}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                      <Chip label={assignee.role} size="small" sx={{ height: 20, fontSize: '0.625rem' }} />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AssignmentIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}>
                        {assignee.assignments} assignments
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small"><VisibilityIcon sx={{ fontSize: 14 }} /></IconButton>
                      <IconButton size="small"><EmailIcon sx={{ fontSize: 14 }} /></IconButton>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </AssigneeCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Main Dashboard Component
export default function SafetyInspectionDashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const submissions = [
    { name: 'John Smith', date: '2024-06-15', status: 'Approved', completion: 100 },
    { name: 'Sarah Johnson', date: '2024-06-14', status: 'Pending', completion: 95 },
    { name: 'Michael Brown', date: '2024-06-13', status: 'Pending', completion: 80 },
    { name: 'Emily Davis', date: '2024-06-12', status: 'Approved', completion: 100 },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const tabs = [
    { label: 'Submissions', icon: <DescriptionIcon sx={{ fontSize: 18 }} />, count: 12 },
    { label: 'Fields', icon: <AssessmentIcon sx={{ fontSize: 18 }} />, count: 7 },
    { label: 'Assignees', icon: <PeopleIcon sx={{ fontSize: 18 }} />, count: 20 },
  ];

  const StatCard = ({ icon, title, value, color }) => (
    <StyledCard elevation={0}>
      <CardContent sx={{ p: 1.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <StatIconWrapper color={color}>
            {icon}
          </StatIconWrapper>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem', fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1rem' }}>
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 2, md: 3 }, py: { xs: 1.5, sm: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
        <IconButton 
          onClick={handleBack}
          sx={{ color: primaryColor, bgcolor: alpha(primaryColor, 0.08), '&:hover': { bgcolor: alpha(primaryColor, 0.12) } }}
        >
          <ArrowBackIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}>
            Safety Inspection Q2 2024
          </Typography>
          <Typography variant="caption" color="text.secondary">
            In Progress • Quarterly inspection
          </Typography>
        </Box>
        
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<AssessmentIcon sx={{ fontSize: 16 }} />}
              size="small"
              sx={{ textTransform: 'none', fontSize: '0.6875rem', borderRadius: 2 }}
            >
              Analytics
            </Button>
            <Button
              variant="outlined"
              startIcon={<EditIcon sx={{ fontSize: 16 }} />}
              size="small"
              sx={{ textTransform: 'none', fontSize: '0.6875rem', borderRadius: 2 }}
            >
              Edit
            </Button>
          </Box>
        )}
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
        <Grid item xs={6} sm={3}>
          <StatCard icon={<DescriptionIcon sx={{ fontSize: 18 }} />} title="Submissions" value="12" color="primary" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard icon={<PeopleIcon sx={{ fontSize: 18 }} />} title="Assignees" value="20" color="info" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard icon={<CheckCircleIcon sx={{ fontSize: 18 }} />} title="Completion" value="60%" color="success" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard icon={<AccessTimeIcon sx={{ fontSize: 18 }} />} title="Days Left" value="15" color="warning" />
        </Grid>
      </Grid>

      {/* Progress Bar */}
      <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, mb: 2.5, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">Overall Progress</Typography>
          <Typography variant="caption" fontWeight={600} sx={{ color: primaryColor }}>60%</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={60}
          sx={{ height: 6, borderRadius: 3, bgcolor: theme.palette.grey[200], '& .MuiLinearProgress-bar': { bgcolor: primaryColor, borderRadius: 3 } }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', fontSize: '0.625rem' }}>
          12 of 20 completed
        </Typography>
      </Paper>

      {/* Mobile Action Buttons */}
      {isMobile && (
        <Box sx={{ display: 'flex', gap: 1, mb: 2.5, overflowX: 'auto', pb: 0.5 }}>
          <Button size="small" variant="outlined" startIcon={<AssessmentIcon sx={{ fontSize: 14 }} />} sx={{ textTransform: 'none', fontSize: '0.6875rem', whiteSpace: 'nowrap' }}>
            Analytics
          </Button>
          <Button size="small" variant="outlined" startIcon={<EditIcon sx={{ fontSize: 14 }} />} sx={{ textTransform: 'none', fontSize: '0.6875rem', whiteSpace: 'nowrap' }}>
            Edit Checklist
          </Button>
        </Box>
      )}

      {/* Main Content */}
      <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
          <Box sx={{ display: 'flex', px: 1.5, minWidth: { xs: 320, sm: 'auto' } }}>
            {tabs.map((tab, index) => (
              <Box
                key={index}
                onClick={() => setActiveTab(index)}
                sx={{
                  py: 1.5,
                  px: 1.5,
                  borderBottom: 2,
                  borderColor: activeTab === index ? primaryColor : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Box sx={{ color: activeTab === index ? primaryColor : 'text.secondary' }}>
                  {tab.icon}
                </Box>
                <Typography variant="caption" sx={{ fontWeight: activeTab === index ? 600 : 400, color: activeTab === index ? primaryColor : 'text.secondary', whiteSpace: 'nowrap' }}>
                  {tab.label}
                </Typography>
                <Chip
                  label={tab.count}
                  size="small"
                  sx={{ height: 18, fontSize: '0.5625rem', bgcolor: activeTab === index ? alpha(primaryColor, 0.12) : alpha('#000', 0.08) }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
          {/* Submissions Tab */}
          {activeTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                  Recent Submissions
                </Typography>
                <Button size="small" startIcon={<DownloadIcon sx={{ fontSize: 14 }} />} sx={{ textTransform: 'none', fontSize: '0.6875rem' }}>
                  Export
                </Button>
              </Box>

              {submissions.map((item, i) => (
                <Card key={i} variant="outlined" sx={{ mb: 1, borderRadius: 2 }}>
                  <CardContent sx={{ p: 1.5 }}>
                    {isMobile ? (
                      <Stack spacing={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}>
                              {item.date}
                            </Typography>
                          </Box>
                          <Chip
                            label={item.status}
                            size="small"
                            sx={{ height: 20, fontSize: '0.625rem', bgcolor: item.status === 'Approved' ? '#e8f5e9' : '#fff3e0', color: item.status === 'Approved' ? '#4caf50' : '#ff9800' }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress variant="determinate" value={item.completion} sx={{ flex: 1, height: 4, borderRadius: 2 }} />
                          <Typography variant="caption" fontWeight={500} sx={{ fontSize: '0.625rem' }}>{item.completion}%</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                          <IconButton size="small"><VisibilityIcon sx={{ fontSize: 14 }} /></IconButton>
                          <IconButton size="small"><GetAppIcon sx={{ fontSize: 14 }} /></IconButton>
                        </Box>
                      </Stack>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.75rem', width: 120 }}>{item.name}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6875rem', width: 100 }}>{item.date}</Typography>
                        <Chip label={item.status} size="small" sx={{ height: 20, fontSize: '0.625rem', width: 100 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 100 }}>
                          <LinearProgress variant="determinate" value={item.completion} sx={{ flex: 1, height: 4, borderRadius: 2 }} />
                          <Typography variant="caption" sx={{ fontSize: '0.625rem' }}>{item.completion}%</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton size="small"><VisibilityIcon sx={{ fontSize: 14 }} /></IconButton>
                          <IconButton size="small"><GetAppIcon sx={{ fontSize: 14 }} /></IconButton>
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* Checklist Fields Tab */}
          {activeTab === 1 && <ChecklistFields />}

          {/* Assignees Tab */}
          {activeTab === 2 && <AssigneesList />}
        </Box>
      </Paper>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderRadius: 0, borderTop: '1px solid', borderColor: 'divider', zIndex: 10 }}>
          <BottomNavigation
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ height: 56 }}
          >
            {tabs.map((tab, index) => (
              <BottomNavigationAction
                key={index}
                icon={tab.icon}
                label={tab.label}
                sx={{ fontSize: '0.625rem', '& .MuiBottomNavigationAction-label': { fontSize: '0.625rem' } }}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </Container>
  );
}
// pages/team/Profile.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  alpha,
  Badge,
  Tooltip,
  Fade,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TeamProvider, useTeam } from '../context/TeamContext';

// Icons
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LockIcon from '@mui/icons-material/Lock';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Styled Components (keep all your existing styled components here)
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  fontFamily: '"Inter", "Public Sans", sans-serif',
  padding: theme.spacing(1.5),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5),
  },
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  borderRadius: 14,
  padding: theme.spacing(2.5),
  backgroundColor: '#ffffff',
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  height: '100%',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(15,76,97,0.08)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: 12,
  },
}));

const SectionCard = styled(Paper)(({ theme }) => ({
  borderRadius: 14,
  backgroundColor: '#ffffff',
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(15,76,97,0.08)',
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2.5),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  backgroundColor: alpha('#f8fafc', 0.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 2),
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 12,
  backgroundColor: '#ffffff',
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: alpha('#0f4c61', 0.2),
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    fontSize: '0.75rem',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: alpha(theme.palette.divider, 0.15),
      borderWidth: 1,
    },
    '&:hover fieldset': {
      borderColor: alpha('#0f4c61', 0.4),
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0f4c61',
      borderWidth: 1.5,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.7rem',
    color: '#64748b',
  },
  '& .MuiInputBase-input': {
    fontSize: '0.75rem',
    padding: theme.spacing(1, 1.2),
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      fontSize: '0.7rem',
    },
    '& .MuiInputBase-input': {
      fontSize: '0.7rem',
      padding: theme.spacing(0.8, 1),
    },
  },
}));

const PasswordField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    fontSize: '0.75rem',
    backgroundColor: '#ffffff',
    '& fieldset': {
      borderColor: alpha(theme.palette.divider, 0.15),
    },
    '&:hover fieldset': {
      borderColor: alpha('#0f4c61', 0.4),
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0f4c61',
      borderWidth: 1.5,
    },
  },
  '& .MuiInputBase-input': {
    fontSize: '0.75rem',
    padding: theme.spacing(1, 1.2),
  },
  '& .MuiInputAdornment-root .MuiIconButton-root': {
    padding: theme.spacing(0.5),
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      fontSize: '0.7rem',
    },
    '& .MuiInputBase-input': {
      fontSize: '0.7rem',
      padding: theme.spacing(0.8, 1),
    },
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0f4c61',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '0.7rem',
  padding: theme.spacing(0.8, 2),
  borderRadius: 8,
  textTransform: 'none',
  boxShadow: `0 4px 8px ${alpha('#0f4c61', 0.2)}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha('#0f4c61', 0.9),
    transform: 'translateY(-1px)',
    boxShadow: `0 6px 12px ${alpha('#0f4c61', 0.25)}`,
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&.Mui-disabled': {
    backgroundColor: alpha('#0f4c61', 0.5),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.6, 1.5),
    fontSize: '0.65rem',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  color: '#64748b',
  fontWeight: 500,
  fontSize: '0.7rem',
  padding: theme.spacing(0.8, 2),
  borderRadius: 8,
  textTransform: 'none',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  backgroundColor: '#ffffff',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha('#f1f5f9', 0.8),
    borderColor: alpha('#0f4c61', 0.3),
    color: '#0f4c61',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.6, 1.5),
    fontSize: '0.65rem',
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.4, 0),
  '& .MuiSvgIcon-root': {
    fontSize: '0.9rem',
    color: '#94a3b8',
  },
  '& .info-text': {
    fontSize: '0.7rem',
    color: '#475569',
    fontWeight: 500,
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.8),
    '& .MuiSvgIcon-root': {
      fontSize: '0.8rem',
    },
    '& .info-text': {
      fontSize: '0.65rem',
    },
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha('#10b981', 0.1),
  color: '#059669',
  fontSize: '0.6rem',
  fontWeight: 600,
  height: 22,
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const LabelText = styled(Typography)(({ theme }) => ({
  fontSize: '0.6rem',
  fontWeight: 600,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
  marginBottom: theme.spacing(0.5),
}));

const TrendIndicator = styled(Box)(({ theme, up }) => ({
  display: 'flex',
  alignItems: 'center',
  color: up ? '#10b981' : '#ef4444',
  '& svg': {
    fontSize: '0.7rem',
  },
  '& span': {
    fontSize: '0.55rem',
    fontWeight: 600,
    marginLeft: '2px',
  },
}));

// Profile Content Component (uses useTeam hook)
const ProfileContent = () => {
  const theme = useTheme();
  const { 
    profile, 
    loading, 
    updateTeamProfile, 
    changePassword,
    formatDate,
    formatJoinDate,
    getFullName,
    getInitials,
    fetchTeamProfile
  } = useTeam();
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    bio: '',
    department: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        location: profile.location || '',
        bio: profile.bio || '',
        department: profile.department || ''
      });
    }
  }, [profile]);

  // Fetch profile on component mount
  useEffect(() => {
    fetchTeamProfile();
  }, [fetchTeamProfile]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async () => {
    const result = await updateTeamProfile(formData);
    if (result.success) {
      setSnackbar({ open: true, message: result.message, severity: 'success' });
      setIsEditing(false);
    } else {
      setSnackbar({ open: true, message: result.error, severity: 'error' });
    }
  };

  const handleChangePassword = async () => {
    const result = await changePassword(
      passwordData.currentPassword,
      passwordData.newPassword,
      passwordData.confirmPassword
    );
    
    if (result.success) {
      setSnackbar({ open: true, message: result.message, severity: 'success' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      setSnackbar({ open: true, message: result.error, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      phone: profile?.phone || '',
      location: profile?.location || '',
      bio: profile?.bio || '',
      department: profile?.department || ''
    });
  };

  if (loading && !profile) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#0f4c61' }} />
      </Box>
    );
  }

  const statsData = [
    {
      label: 'Inspections',
      value: profile?.stats?.totalInspections || 0,
      trend: '+0%',
      trendUp: true,
    },
    {
      label: 'On-Time Rate',
      value: `${profile?.stats?.onTimeRate || 0}%`,
      trend: '+0%',
      trendUp: true,
    },
    {
      label: 'Quality Score',
      value: (profile?.stats?.qualityScore || 0).toFixed(1),
      rating: profile?.stats?.qualityScore || 0,
    },
  ];

  return (
    <PageContainer>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}>
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              {/* Profile Card */}
              <ProfileCard>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  pb: 2,
                  borderBottom: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.08),
                }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box sx={{
                        width: 14,
                        height: 14,
                        bgcolor: profile?.status === 'active' ? '#10b981' : '#ef4444',
                        border: '2px solid #ffffff',
                        borderRadius: '50%',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }} />
                    }
                  >
                    <Avatar
                      sx={{
                        width: { xs: 70, sm: 80 },
                        height: { xs: 70, sm: 80 },
                        bgcolor: '#0f4c61',
                        fontSize: { xs: '1.5rem', sm: '1.8rem' },
                        fontWeight: 700,
                        mb: 1,
                        border: '3px solid #ffffff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    >
                      {getInitials()}
                    </Avatar>
                  </Badge>
                  
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '0.9rem', sm: '0.95rem' }, color: '#1e293b', mt: 1 }}>
                    {getFullName()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.65rem', mb: 0.5 }}>
                    {profile?.roleDisplay || profile?.teamRole || 'Team Member'}
                  </Typography>
                  <StatusChip 
                    label={profile?.status === 'active' ? 'Active' : 'Inactive'} 
                    size="small" 
                    sx={{ 
                      bgcolor: profile?.status === 'active' ? alpha('#10b981', 0.1) : alpha('#ef4444', 0.1),
                      color: profile?.status === 'active' ? '#059669' : '#dc2626'
                    }}
                  />
                </Box>

                <Stack spacing={1.2} sx={{ mt: 1.5 }}>
                  <InfoItem>
                    <MailOutlineIcon />
                    <Typography className="info-text">{profile?.email || 'N/A'}</Typography>
                  </InfoItem>
                  <InfoItem>
                    <PhoneIcon />
                    <Typography className="info-text">{profile?.phone || 'Not provided'}</Typography>
                  </InfoItem>
                  <InfoItem>
                    <LocationOnIcon />
                    <Typography className="info-text">{profile?.location || 'Not specified'}</Typography>
                  </InfoItem>
                  <InfoItem>
                    <BusinessCenterIcon />
                    <Typography className="info-text">{profile?.organization || 'N/A'}</Typography>
                  </InfoItem>
                  <InfoItem>
                    <CalendarTodayIcon />
                    <Typography className="info-text">Joined {formatJoinDate(profile?.joinDate)}</Typography>
                  </InfoItem>
                </Stack>
              </ProfileCard>

              {/* Change Password Card */}
              <ProfileCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box sx={{ 
                    p: 0.5, 
                    bgcolor: alpha('#0f4c61', 0.1), 
                    borderRadius: 1,
                    display: 'flex',
                  }}>
                    <LockIcon sx={{ fontSize: '0.9rem', color: '#0f4c61' }} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#1e293b' }}>
                    Change Password
                  </Typography>
                </Box>

                <Stack spacing={1.5}>
                  <Box>
                    <LabelText>Current Password</LabelText>
                    <PasswordField
                      fullWidth
                      name="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                      size="small"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              edge="end"
                              size="small"
                              sx={{ p: 0.3 }}
                            >
                              {showCurrentPassword ? 
                                <VisibilityOffIcon sx={{ fontSize: '0.8rem' }} /> : 
                                <VisibilityIcon sx={{ fontSize: '0.8rem' }} />
                              }
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelText>New Password</LabelText>
                    <PasswordField
                      fullWidth
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Enter new password (min. 6 characters)"
                      size="small"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              edge="end"
                              size="small"
                              sx={{ p: 0.3 }}
                            >
                              {showNewPassword ? 
                                <VisibilityOffIcon sx={{ fontSize: '0.8rem' }} /> : 
                                <VisibilityIcon sx={{ fontSize: '0.8rem' }} />
                              }
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box>
                    <LabelText>Confirm New Password</LabelText>
                    <PasswordField
                      fullWidth
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      size="small"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                              size="small"
                              sx={{ p: 0.3 }}
                            >
                              {showConfirmPassword ? 
                                <VisibilityOffIcon sx={{ fontSize: '0.8rem' }} /> : 
                                <VisibilityIcon sx={{ fontSize: '0.8rem' }} />
                              }
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <PrimaryButton 
                    fullWidth 
                    startIcon={<LockIcon />}
                    onClick={handleChangePassword}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={16} /> : 'Update Password'}
                  </PrimaryButton>
                </Stack>
              </ProfileCard>
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {/* Stats Cards */}
              <Grid container spacing={1.5}>
                {statsData.map((stat, index) => (
                  <Grid item xs={4} key={index}>
                    <StatCard>
                      <Typography variant="caption" sx={{ 
                        color: '#64748b', 
                        fontSize: '0.55rem', 
                        fontWeight: 600, 
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                        mb: 0.5,
                      }}>
                        {stat.label}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5, flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700, 
                          fontSize: { xs: '1rem', sm: '1.2rem' }, 
                          lineHeight: 1,
                          color: '#1e293b',
                        }}>
                          {stat.value}
                        </Typography>
                        {stat.trend && (
                          <TrendIndicator up={stat.trendUp}>
                            <ArrowUpwardIcon />
                            <span>{stat.trend}</span>
                          </TrendIndicator>
                        )}
                        {stat.rating !== undefined && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2, ml: 0.5 }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                sx={{
                                  fontSize: '0.7rem',
                                  color: star <= Math.floor(stat.rating) ? '#fbbf24' : 
                                         star === Math.ceil(stat.rating) && stat.rating % 1 !== 0 ? '#fbbf24' : '#e2e8f0',
                                }}
                              />
                            ))}
                            {stat.rating % 1 !== 0 && (
                              <StarHalfIcon sx={{ fontSize: '0.7rem', color: '#fbbf24', ml: -0.5 }} />
                            )}
                          </Box>
                        )}
                      </Box>
                    </StatCard>
                  </Grid>
                ))}
              </Grid>

              {/* Personal Information Card */}
              <SectionCard>
                <SectionHeader>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ 
                      p: 0.5, 
                      bgcolor: alpha('#0f4c61', 0.1), 
                      borderRadius: 1,
                      display: 'flex',
                    }}>
                      <BadgeIcon sx={{ fontSize: '0.9rem', color: '#0f4c61' }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#1e293b' }}>
                      Personal Information
                    </Typography>
                  </Box>
                  <Tooltip title={isEditing ? "Cancel editing" : "Edit profile information"} arrow placement="top">
                    <IconButton 
                      size="small" 
                      onClick={() => isEditing ? handleCancelEdit() : setIsEditing(true)}
                      sx={{ 
                        color: isEditing ? '#ef4444' : '#0f4c61',
                        bgcolor: isEditing ? alpha('#ef4444', 0.1) : alpha('#0f4c61', 0.1),
                      }}
                    >
                      {isEditing ? <CancelIcon sx={{ fontSize: '0.9rem' }} /> : <EditIcon sx={{ fontSize: '0.9rem' }} />}
                    </IconButton>
                  </Tooltip>
                </SectionHeader>

                <Box sx={{ p: { xs: 1.5, sm: 2.5 } }}>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={6}>
                      <LabelText>First Name</LabelText>
                      <StyledTextField
                        fullWidth
                        size="small"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LabelText>Last Name</LabelText>
                      <StyledTextField
                        fullWidth
                        size="small"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LabelText>Email Address</LabelText>
                      <StyledTextField
                        fullWidth
                        size="small"
                        type="email"
                        value={profile?.email || ''}
                        disabled
                        sx={{ '& .MuiInputBase-input.Mui-disabled': { bgcolor: '#f8fafc' } }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ fontSize: '0.8rem', color: '#94a3b8' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LabelText>Department</LabelText>
                      <StyledTextField
                        fullWidth
                        size="small"
                        name="department"
                        value={formData.department}
                        onChange={handleFormChange}
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <WorkIcon sx={{ fontSize: '0.8rem', color: '#94a3b8' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LabelText>Phone Number</LabelText>
                      <StyledTextField
                        fullWidth
                        size="small"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneInTalkIcon sx={{ fontSize: '0.8rem', color: '#94a3b8' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LabelText>Location</LabelText>
                      <StyledTextField
                        fullWidth
                        size="small"
                        name="location"
                        value={formData.location}
                        onChange={handleFormChange}
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeIcon sx={{ fontSize: '0.8rem', color: '#94a3b8' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LabelText>Bio</LabelText>
                      <StyledTextField
                        fullWidth
                        multiline
                        rows={3}
                        name="bio"
                        value={formData.bio}
                        onChange={handleFormChange}
                        disabled={!isEditing}
                        placeholder="Tell us about yourself..."
                        sx={{
                          '& .MuiInputBase-inputMultiline': {
                            fontSize: '0.7rem',
                            lineHeight: 1.5,
                            padding: '8px 12px',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  {isEditing && (
                    <Fade in={isEditing}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        gap: 1.5, 
                        mt: 3,
                        flexDirection: { xs: 'column', sm: 'row' },
                      }}>
                        <SecondaryButton 
                          startIcon={<CancelIcon />}
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </SecondaryButton>
                        <PrimaryButton 
                          startIcon={<SaveIcon />}
                          onClick={handleUpdateProfile}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={16} /> : 'Save Changes'}
                        </PrimaryButton>
                      </Box>
                    </Fade>
                  )}
                </Box>
              </SectionCard>

              {/* Recent Activity Card */}
              <SectionCard>
                <SectionHeader>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ 
                      p: 0.5, 
                      bgcolor: alpha('#0f4c61', 0.1), 
                      borderRadius: 1,
                      display: 'flex',
                    }}>
                      <AssignmentIcon sx={{ fontSize: '0.9rem', color: '#0f4c61' }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#1e293b' }}>
                      Performance Overview
                    </Typography>
                  </Box>
                </SectionHeader>
                <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography sx={{ fontSize: '0.6rem', color: '#64748b', mb: 0.5 }}>
                          Assigned Tasks
                        </Typography>
                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f4c61' }}>
                          {profile?.stats?.assignedCount || 0}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography sx={{ fontSize: '0.6rem', color: '#64748b', mb: 0.5 }}>
                          Completion Rate
                        </Typography>
                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f4c61' }}>
                          {profile?.stats?.completionRate || 0}%
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Typography sx={{ fontSize: '0.65rem', color: '#64748b' }}>
                      Last Login: {formatDate(profile?.lastLoginDate)}
                    </Typography>
                    <TrendIndicator up={true}>
                      <TrendingUpIcon sx={{ fontSize: '0.7rem' }} />
                      <span>Active</span>
                    </TrendIndicator>
                  </Box>
                </Box>
              </SectionCard>
            </Stack>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ 
          borderTop: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.08),
          mt: 3,
          pt: 2,
          textAlign: 'center',
        }}>
          <Typography sx={{ fontSize: '0.6rem', color: '#94a3b8' }}>
            © 2026 Profile Management System. All rights reserved.
          </Typography>
        </Box>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          icon={snackbar.severity === 'success' ? <CheckCircleIcon /> : undefined}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

// Main Profile Component - wraps ProfileContent with TeamProvider
const Profile = () => {
  return (
    <TeamProvider>
      <ProfileContent />
    </TeamProvider>
  );
};

export default Profile;
import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  History as HistoryIcon,
  Bolt as BoltIcon,
  Group as GroupIcon,
  Payments as PaymentsIcon,
  EventBusy as EventBusyIcon,
  AddCircle as AddCircleIcon,
  PersonAdd as PersonAddIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';

// Custom color palette matching the original design
const colors = {
  primary: '#002631',
  primaryContainer: '#003d4d',
  onPrimaryContainer: '#79a8ba',
  secondary: '#516072',
  secondaryContainer: '#d2e1f7',
  onSecondaryContainer: '#556477',
  tertiary: '#331d00',
  tertiaryContainer: '#503000',
  onTertiaryContainer: '#df8f00',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  surface: '#f7f9fb',
  surfaceContainerLow: '#f2f4f6',
  surfaceContainerLowest: '#ffffff',
  surfaceVariant: '#e0e3e5',
  outline: '#71787c',
  outlineVariant: '#c0c8cc',
};

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, trend, trendUp = true, bgColor, iconBg, trendColor }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={0}
      sx={{
        p: isMobile ? 2 : 3,
        borderRadius: 3,
        bgcolor: bgColor || 'background.paper',
        border: '1px solid',
        borderColor: 'transparent',
        transition: 'all 0.2s',
        '&:hover': bgColor ? {} : { borderColor: colors.outlineVariant },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {bgColor && (
        <Box
          sx={{
            position: 'absolute',
            top: -16,
            right: -16,
            width: 96,
            height: 96,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'scale(1.1)' },
          }}
        />
      )}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: iconBg || (bgColor ? 'rgba(255,255,255,0.15)' : colors.secondaryContainer),
              color: bgColor ? 'white' : colors.onSecondaryContainer,
              backdropFilter: bgColor ? 'blur(12px)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon fontSize="small" />
          </Box>
          <Box
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              bgcolor: bgColor ? 'rgba(255,255,255,0.15)' : colors.surfaceContainerLow,
              backdropFilter: bgColor ? 'blur(12px)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {trendUp ? (
              <TrendingUpIcon sx={{ fontSize: 12, color: bgColor ? 'white' : trendColor || 'inherit' }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 12, color: bgColor ? 'white' : trendColor || 'inherit' }} />
            )}
            <Typography variant="caption" sx={{ fontWeight: 700, color: bgColor ? 'white' : 'inherit' }}>
              {trend}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: bgColor ? colors.onPrimaryContainer : colors.secondary,
            textTransform: 'uppercase',
            fontSize: '0.65rem',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: bgColor ? 'white' : colors.primary,
            fontSize: isMobile ? '1.1rem' : '1.4rem',
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

// Main Dashboard Component
const super_adminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      bgcolor: colors.surface, 
      minHeight: '100vh', 
      p: { xs: 1.5, sm: 2, md: 3 },
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Stats Grid */}
      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={GroupIcon}
            title="Total Customers"
            value="156"
            trend="12.5%"
            trendUp={true}
            bgColor={colors.primaryContainer}
            iconBg="rgba(255,255,255,0.15)"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={GroupIcon}
            title="Active Customers"
            value="142"
            trend="8.2%"
            trendUp={true}
            iconBg={colors.secondaryContainer}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={PaymentsIcon}
            title="Total Sales"
            value="$24.3K"
            trend="15.3%"
            trendUp={true}
            iconBg={`${colors.tertiaryContainer}10`}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={EventBusyIcon}
            title="Subscription Expiry Soon"
            value="2"
            trend="3.1%"
            trendUp={false}
            iconBg={colors.errorContainer}
            trendColor={colors.onErrorContainer}
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        {/* Customer Activity Bar Chart */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 3, height: '100%', bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                Customer Activity
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: colors.primaryContainer }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: colors.secondary, fontSize: '0.6rem' }}>
                    Active
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#b9c8de' }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: colors.secondary, fontSize: '0.6rem' }}>
                    Inactive
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, gap: 0.5, mt: 2 }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const activeHeights = [100, 75, 85, 100, 66, 50, 25];
                const inactiveHeights = [66, 50, 33, 25, 50, 33, 16];
                return (
                  <Box key={day} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '2px', height: 160, alignItems: 'flex-end' }}>
                      <Box sx={{ width: '40%', bgcolor: colors.primaryContainer, height: `${activeHeights[i]}%`, borderRadius: '4px 4px 0 0' }} />
                      <Box sx={{ width: '40%', bgcolor: '#b9c8de', height: `${inactiveHeights[i]}%`, borderRadius: '4px 4px 0 0' }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: colors.outline, fontSize: '0.55rem', fontWeight: 500 }}>{day}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>

        {/* Form Usage Trend Line Chart */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 3, height: '100%', bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                Form Usage Trend
              </Typography>
              <MoreVertIcon sx={{ color: colors.secondary, fontSize: 18, cursor: 'pointer' }} />
            </Box>
            <Box sx={{ position: 'relative', height: 160 }}>
              <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradientCreated" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={colors.primary} stopOpacity="0.1" />
                    <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line x1="0" y1="50" x2="400" y2="50" stroke={colors.outlineVariant} strokeDasharray="4" strokeWidth="0.5" />
                <line x1="0" y1="100" x2="400" y2="100" stroke={colors.outlineVariant} strokeDasharray="4" strokeWidth="0.5" />
                <line x1="0" y1="150" x2="400" y2="150" stroke={colors.outlineVariant} strokeDasharray="4" strokeWidth="0.5" />
                {/* Area */}
                <path d="M0 150 Q 50 120, 100 140 T 200 80 T 300 100 T 400 40 L 400 200 L 0 200 Z" fill="url(#gradientCreated)" />
                {/* Created line */}
                <path d="M0 150 Q 50 120, 100 140 T 200 80 T 300 100 T 400 40" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
                {/* Submitted line */}
                <path d="M0 180 Q 50 160, 100 170 T 200 130 T 300 140 T 400 90" fill="none" stroke={colors.onTertiaryContainer} strokeWidth="2" strokeLinecap="round" strokeDasharray="4" />
              </svg>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.primary }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: colors.secondary, fontSize: '0.6rem' }}>Created</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.onTertiaryContainer }} />
                <Typography variant="caption" sx={{ fontWeight: 600, color: colors.secondary, fontSize: '0.6rem' }}>Submitted</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Sales Overview + Revenue Distribution */}
      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        {/* Sales Overview */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 3, height: '100%', bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                  Sales Overview
                </Typography>
                <Typography variant="caption" sx={{ color: colors.secondary, fontSize: '0.65rem', display: 'block', mt: 0.25 }}>
                  Monthly transactional data volume
                </Typography>
              </Box>
              <Stack direction="row" spacing={0.5}>
                <Button size="small" variant="contained" sx={{ 
                  bgcolor: colors.primary, 
                  color: 'white', 
                  fontSize: '0.65rem', 
                  py: 0.25, 
                  px: 1.5, 
                  minWidth: 0,
                  '&:hover': { bgcolor: colors.primary }
                }}>Monthly</Button>
                <Button size="small" variant="text" sx={{ 
                  bgcolor: colors.surfaceContainerLow, 
                  color: colors.secondary, 
                  fontSize: '0.65rem', 
                  py: 0.25, 
                  px: 1.5, 
                  minWidth: 0,
                  '&:hover': { bgcolor: colors.surfaceVariant }
                }}>Quarterly</Button>
              </Stack>
            </Box>
            <Box sx={{ position: 'relative', height: 180, mt: 2 }}>
              <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaSales" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9ecee1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#9ecee1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,350 Q100,320 200,340 T400,280 T600,220 T800,100 T1000,50 L1000,400 L0,400 Z" fill="url(#areaSales)" />
                <path d="M0,350 Q100,320 200,340 T400,280 T600,220 T800,100 T1000,50" fill="none" stroke={colors.primary} strokeWidth="2" />
                <circle cx="200" cy="340" r="3" fill={colors.primary} />
                <circle cx="400" cy="280" r="3" fill={colors.primary} />
                <circle cx="600" cy="220" r="3" fill={colors.primary} />
                <circle cx="800" cy="100" r="3" fill={colors.primary} />
                <circle cx="1000" cy="50" r="4" fill={colors.primary} />
              </svg>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 0.5 }}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
                  <Typography key={m} variant="caption" sx={{ fontWeight: 600, color: colors.secondary, fontSize: '0.6rem' }}>{m}</Typography>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Revenue Distribution Pie Chart */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 3, height: '100%', bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, fontSize: { xs: '0.95rem', sm: '1.1rem' }, mb: 0.25 }}>
              Revenue Distribution
            </Typography>
            <Typography variant="caption" sx={{ color: colors.secondary, fontSize: '0.65rem', display: 'block', mb: 2 }}>
              Breakdown by subscription tier
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 3 }}>
              <Box sx={{ position: 'relative', width: 140, height: 140 }}>
                <svg width="100%" height="100%" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke={colors.primary} strokeWidth="6" strokeDasharray="35 65" strokeDashoffset="0" />
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke={colors.onTertiaryContainer} strokeWidth="6" strokeDasharray="30 70" strokeDashoffset="-35" />
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke={colors.tertiaryContainer} strokeWidth="6" strokeDasharray="20 80" strokeDashoffset="-65" />
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke={colors.secondary} strokeWidth="6" strokeDasharray="15 85" strokeDashoffset="-85" />
                </svg>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: colors.primary, lineHeight: 1, fontSize: '1.1rem' }}>100%</Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.5rem', fontWeight: 700, color: colors.secondary, letterSpacing: '0.03em' }}>TOTAL</Typography>
                </Box>
              </Box>
              <Stack spacing={1}>
                {[
                  { color: colors.primary, label: 'Standard', percent: '35%' },
                  { color: colors.onTertiaryContainer, label: 'Premium', percent: '30%' },
                  { color: colors.tertiaryContainer, label: 'Enterprise', percent: '20%' },
                  { color: colors.secondary, label: 'Free', percent: '15%' },
                ].map(item => (
                  <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: colors.primary, lineHeight: 1.2, fontSize: '0.7rem' }}>{item.label}</Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary, fontSize: '0.6rem' }}>{item.percent} of revenue</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity Table */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper' }}>
          <Box sx={{ px: { xs: 2, sm: 2.5 }, py: 1.5, borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              <HistoryIcon sx={{ color: colors.primaryContainer, fontSize: '1.1rem' }} />
              Recent Activity
            </Typography>
            <Button variant="text" sx={{ color: colors.primaryContainer, fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', minWidth: 0 }}>View All</Button>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'rgba(242,244,246,0.5)' }}>
                  <TableCell sx={{ fontSize: '0.65rem', fontWeight: 700, color: colors.secondary, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>Customer</TableCell>
                  <TableCell sx={{ fontSize: '0.65rem', fontWeight: 700, color: colors.secondary, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>Last Login</TableCell>
                  <TableCell sx={{ fontSize: '0.65rem', fontWeight: 700, color: colors.secondary, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>Forms</TableCell>
                  <TableCell sx={{ fontSize: '0.65rem', fontWeight: 700, color: colors.secondary, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>Inspections</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { initials: 'AS', name: 'Alex Sterling', login: '2 mins ago', forms: '4 Pending', inspections: 12, online: true, color: colors.primaryContainer },
                  { initials: 'ML', name: 'Morgan Leandros', login: '1 hour ago', forms: '1 Pending', inspections: 28, online: false, color: colors.secondary },
                  { initials: 'RJ', name: 'Riley Johnson', login: 'Yesterday, 4:20 PM', forms: '8 Pending', inspections: 5, online: false, color: colors.tertiaryContainer },
                ].map((row, idx) => (
                  <TableRow key={idx} hover sx={{ '&:hover': { bgcolor: colors.surfaceContainerLow } }}>
                    <TableCell sx={{ py: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: row.color, fontSize: '0.6rem', fontWeight: 700 }}>{row.initials}</Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary, fontSize: '0.75rem' }}>{row.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}><Typography variant="body2" sx={{ color: colors.secondary, fontSize: '0.75rem' }}>{row.login}</Typography></TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Chip label={row.forms} size="small" sx={{ bgcolor: colors.secondaryContainer, color: colors.onSecondaryContainer, fontWeight: 600, fontSize: '0.6rem', height: 18 }} />
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}><Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, fontSize: '0.75rem' }}>{row.inspections}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Quick Actions */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          <BoltIcon sx={{ color: colors.primaryContainer, fontSize: '1.1rem' }} />
          Quick Actions
        </Typography>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {[
            { icon: AddCircleIcon, title: 'Create New Form', desc: 'Initialize a new architectural data collection sequence.' },
            { icon: PersonAddIcon, title: 'Add Customer', desc: 'Register a new client profile into the analytics engine.' },
            { icon: AnalyticsIcon, title: 'Generate Report', desc: 'Compile operational data into an executive summary.' },
          ].map((action, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Button
                fullWidth
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: { xs: 2, sm: 2.5 },
                  bgcolor: colors.primaryContainer,
                  borderRadius: 3,
                  textTransform: 'none',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'scale(1.01)', bgcolor: colors.primaryContainer },
                  boxShadow: '0 2px 8px rgba(0,38,49,0.08)',
                }}
              >
                <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.12)', borderRadius: 1.5, mb: 1.5, backdropFilter: 'blur(4px)' }}>
                  <action.icon sx={{ color: 'white', fontSize: '1.1rem' }} />
                </Box>
                <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 700, fontSize: { xs: '0.85rem', sm: '0.95rem' }, mb: 0.25 }}>
                  {action.title}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.onPrimaryContainer, textAlign: 'left', fontSize: '0.65rem', lineHeight: 1.4 }}>
                  {action.desc}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default super_adminDashboard;
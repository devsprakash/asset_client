import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputBase,
  Paper,
  Grid,
  Chip,
  Stack,
  useTheme,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useMediaQuery,
  Dialog,
  Slide,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CalendarToday as CalendarIcon,
  FilterList as FilterIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Description as DescriptionIcon,
  LocationOn as LocationIcon,
  Event as EventIcon,
  PlayArrow as PlayIcon,
  ViewList as ViewListIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  GppMaybe as ShieldIcon,
} from '@mui/icons-material';

// ─── Slide transition for Dialog ────────────────────────────────────────────
const SlideUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ─── Styled components ───────────────────────────────────────────────────────
const ViewToggleButton = styled(Button)(({ active }) => ({
  padding: '6px 12px',
  fontSize: '0.75rem',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: 6,
  backgroundColor: active ? '#f8fafc' : 'transparent',
  color: active ? '#475569' : '#94a3b8',
  minWidth: 'auto',
  '& .MuiButton-startIcon': { marginRight: '4px', '& svg': { fontSize: '0.875rem' } },
}));

const FilterSelect = styled(Select)({
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0', borderRadius: 8 },
  '& .MuiSelect-select': { padding: '8px 12px', fontSize: '0.75rem' },
});

const CalendarTableCell = styled(TableCell)(({ theme, clickable }) => ({
  border: '1px solid #e2e8f0',
  padding: theme.spacing(1),
  verticalAlign: 'top',
  height: 100,
  width: '14.28%',
  backgroundColor: '#ffffff',
  cursor: clickable ? 'pointer' : 'default',
  transition: 'background 0.15s',
  '&:hover': clickable ? { backgroundColor: '#f0f9ff' } : {},
  [theme.breakpoints.down('sm')]: { padding: '4px', height: 60 },
}));

const WeekDayCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #e2e8f0',
  padding: '8px',
  fontWeight: 600,
  color: '#1e293b',
  backgroundColor: '#f8fafc',
  textAlign: 'center',
  fontSize: '0.75rem',
  [theme.breakpoints.down('sm')]: { fontSize: '0.65rem', padding: '4px' },
}));

const WeekNumberCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #e2e8f0',
  fontWeight: 600,
  backgroundColor: '#f8fafc',
  fontSize: '0.75rem',
  padding: '8px',
  textAlign: 'center',
  width: '60px',
  [theme.breakpoints.down('sm')]: { width: '40px', padding: '4px', fontSize: '0.65rem' },
}));

const TaskDot = styled(Box)(({ priority }) => {
  const colors = {
    'extremely-critical': '#ff4d4d',
    high: '#4caf50',
    medium: '#2196f3',
    low: '#ff9800',
    'in-progress': '#9e9e9e',
    pending: '#000000',
  };
  return {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: colors[priority] || '#e2e8f0',
    display: 'inline-block',
    marginRight: '4px',
  };
});

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(1.5) },
}));

const TaskCard = styled(Paper)({
  borderRadius: 12,
  border: '1px solid #f1f5f9',
  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: '#ffffff',
});

const PriorityChip = styled(Chip)(({ priority }) => ({
  backgroundColor: priority === 'high' ? '#ff4d4d' : '#004e64',
  color: '#ffffff',
  fontSize: '0.65rem',
  fontWeight: 600,
  height: 20,
  borderRadius: 10,
  '& .MuiChip-label': { padding: '0 8px' },
}));

const StatusChip = styled(Chip)(({ status }) => {
  const map = {
    pending: { bg: '#a8d5e2', color: '#003e52' },
    progress: { bg: '#003e52', color: '#ffffff' },
    review: { bg: '#6c757d', color: '#ffffff' },
  };
  const c = map[status] || map.pending;
  return {
    backgroundColor: c.bg, color: c.color,
    fontSize: '0.65rem', fontWeight: 600, height: 20, borderRadius: 10,
    '& .MuiChip-label': { padding: '0 8px' },
  };
});

const TagChip = styled(Chip)({
  backgroundColor: '#ff5c5c',
  color: '#ffffff',
  fontSize: '0.65rem',
  fontWeight: 600,
  height: 20,
  borderRadius: 4,
  '& .MuiChip-label': { padding: '0 6px' },
});

const StyledButton = styled(Button)({
  backgroundColor: '#003e52',
  color: '#ffffff',
  fontWeight: 500,
  padding: '8px 12px',
  borderRadius: 6,
  textTransform: 'none',
  fontSize: '0.7rem',
  '&:hover': { backgroundColor: alpha('#003e52', 0.9) },
  '& .MuiButton-startIcon': { marginRight: '4px', '& svg': { fontSize: '0.875rem' } },
});

// ─── Modal task card (matches screenshot exactly) ────────────────────────────
const ModalTaskCard = ({ task }) => {
  const priorityChipColors = {
    'extremely-critical': { bg: '#ffe4e4', color: '#cc0000', label: 'Extremely Critical' },
    high: { bg: '#fde8d8', color: '#b94a00', label: 'High' },
    medium: { bg: '#e8f4fd', color: '#1565c0', label: 'Medium' },
    low: { bg: '#fff3e0', color: '#e65100', label: 'Low' },
  };

  const pc = priorityChipColors[task.priority] || priorityChipColors.medium;

  return (
    <Box sx={{
      borderRadius: 2,
      bgcolor: '#ffffff',
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      border: '1px solid #f1f5f9',
    }}>
      {/* Red left accent bar */}
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: 4, bgcolor: '#e53e3e', flexShrink: 0, borderRadius: '4px 0 0 4px' }} />
        <Box sx={{ p: 2, flex: 1 }}>
          {/* Title row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Box component="span" sx={{ fontSize: '1.1rem' }}>🧰</Box>
            <Typography sx={{ fontWeight: 700, color: '#1a202c', fontSize: '0.95rem' }}>
              {task.title}
            </Typography>
          </Box>

          {/* Subtitle */}
          <Typography sx={{ color: '#718096', fontSize: '0.75rem', mb: 1.5 }}>
            {task.subtitle}
          </Typography>

          {/* Type & Location */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <ShieldIcon sx={{ fontSize: '0.85rem', color: '#a0aec0' }} />
            <Typography sx={{ fontSize: '0.72rem', color: '#718096' }}>{task.type}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
            <LocationIcon sx={{ fontSize: '0.85rem', color: '#a0aec0' }} />
            <Typography sx={{ fontSize: '0.72rem', color: '#718096' }}>{task.location}</Typography>
          </Box>

          {/* Chips */}
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mb: 2 }}>
            <Chip
              label={pc.label}
              size="small"
              sx={{
                bgcolor: pc.bg,
                color: pc.color,
                fontWeight: 600,
                fontSize: '0.65rem',
                height: 22,
                borderRadius: '6px',
              }}
            />
            <Chip
              label="Pending"
              size="small"
              sx={{
                bgcolor: '#edf2f7',
                color: '#4a5568',
                fontWeight: 500,
                fontSize: '0.65rem',
                height: 22,
                borderRadius: '6px',
              }}
            />
            <Chip
              label="Critical Asset"
              size="small"
              sx={{
                bgcolor: '#fff0f0',
                color: '#c53030',
                fontWeight: 600,
                fontSize: '0.65rem',
                height: 22,
                borderRadius: '6px',
                border: '1px solid #fed7d7',
              }}
            />
          </Box>

          {/* Start Inspection button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#1a3c52',
              color: '#fff',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.82rem',
              py: 1.2,
              '&:hover': { bgcolor: '#0f2a3d' },
            }}
          >
            Start Inspection
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Data ────────────────────────────────────────────────────────────────────
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const calendarData = [
  { weekNumber: 28, days: [4, 5, 6, 7, 8, 9, 10] },
  { weekNumber: 29, days: [11, 12, 13, 14, 15, 16, 17] },
  { weekNumber: 30, days: [18, 19, 20, 21, 22, 23, 24] },
  { weekNumber: 31, days: [25, 26, 27, 28, 29, 30, 31] },
];

const tasksByDate = {
  5: [{ priority: 'extremely-critical' }, { priority: 'high' }],
  6: [{ priority: 'medium' }],
  7: [{ priority: 'low' }],
  8: [{ priority: 'in-progress' }],
  9: [{ priority: 'pending' }],
  12: [{ priority: 'extremely-critical' }],
  13: [{ priority: 'high' }, { priority: 'medium' }],
  14: [{ priority: 'low' }],
  15: [{ priority: 'in-progress' }],
  19: [{ priority: 'extremely-critical' }],
  20: [{ priority: 'high' }],
  21: [{ priority: 'medium' }, { priority: 'low' }],
  22: [{ priority: 'in-progress' }],
  26: [{ priority: 'pending' }],
  27: [{ priority: 'extremely-critical' }],
  28: [{ priority: 'high' }],
  29: [{ priority: 'medium' }],
};

// Modal task details keyed by date (or fallback)
const modalTasksByDate = {
  5: [
    {
      id: 1,
      title: 'HVAC System Inspection',
      subtitle: 'Central HVAC Unit #A1',
      type: 'Preventive Maintenance',
      location: 'Building A, Floor 3',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Fire Alarm Testing',
      subtitle: 'Fire Alarm Panel #12',
      type: 'Safety Compliance',
      location: 'Building B, Lobby',
      priority: 'extremely-critical',
    },
  ],
  8: [
    {
      id: 3,
      title: 'Generator Inspection',
      subtitle: 'Generator Unit A-12',
      type: 'Safety Inspection',
      location: 'Building A - Floor 3',
      priority: 'high',
    },
  ],
  13: [
    {
      id: 4,
      title: 'HVAC System B-04',
      subtitle: 'Rooftop Unit B-04',
      type: 'Equipment Check',
      location: 'Building B - Rooftop',
      priority: 'medium',
    },
    {
      id: 5,
      title: 'Pump Station D-07',
      subtitle: 'Primary Pump D-07',
      type: 'Daily Checklist',
      location: 'Building D - Basement',
      priority: 'high',
    },
  ],
};

const getModalTasks = (day) => {
  if (modalTasksByDate[day]) return modalTasksByDate[day];
  // fallback generic tasks based on dots
  const dots = tasksByDate[day] || [];
  return dots.map((dot, i) => ({
    id: i,
    title: `Inspection Task ${i + 1}`,
    subtitle: `Asset Unit #${day}0${i + 1}`,
    type: 'Routine Inspection',
    location: `Building ${String.fromCharCode(65 + i)}, Floor ${i + 1}`,
    priority: dot.priority,
  }));
};

const legendItems = [
  { label: 'Extremely Critical Priority', color: '#ff4d4d', dot: '🔴' },
  { label: 'High Priority', color: '#4caf50', dot: '🟢' },
  { label: 'Medium Priority', color: '#2196f3', dot: '🔵' },
  { label: 'Low Priority', color: '#ff9800', dot: '🟠' },
  { label: 'In Progress', color: '#9e9e9e', dot: '⚪' },
  { label: 'Pending', color: '#000000', dot: '⚫' },
];

const listTasks = [
  { id: 1, title: 'Generator Unit A-12', priority: 'high', status: 'pending', type: 'Safety Inspection', location: 'Building A - Floor 3', dueDate: '2024-11-05', buttonText: 'Start', showRedDot: true },
  { id: 2, title: 'HVAC System B-04', priority: 'medium', status: 'progress', type: 'Equipment Check', location: 'Building B - Rooftop', dueDate: '2024-11-06', buttonText: 'Continue', tag: 'Critical' },
  { id: 3, title: 'Pump Station D-07', priority: 'high', status: 'review', type: 'Daily Checklist', location: 'Building D - Basement', dueDate: '2024-11-04', buttonText: 'Start' },
  { id: 4, title: 'Generator Unit A-12', priority: 'high', status: 'pending', type: 'Safety Inspection', location: 'Building A - Floor 3', dueDate: '2024-11-05', buttonText: 'Start', showRedDot: true },
  { id: 5, title: 'HVAC System B-04', priority: 'medium', status: 'progress', type: 'Equipment Check', location: 'Building B - Rooftop', dueDate: '2024-11-06', buttonText: 'Continue', tag: 'Critical' },
  { id: 6, title: 'Pump Station D-07', priority: 'high', status: 'review', type: 'Daily Checklist', location: 'Building D - Basement', dueDate: '2024-11-04', buttonText: 'Start' },
];

// ─── Main Component ──────────────────────────────────────────────────────────
function MyTask() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [view, setView] = useState('calendar');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDotClick = (day) => {
    if (!tasksByDate[day] || tasksByDate[day].length === 0) return;
    setSelectedDay(day);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDay(null);
  };

  const modalTasks = selectedDay ? getModalTasks(selectedDay) : [];

  // Format date for modal header: "08 Jan 2026"
  const formatModalDate = (day) => {
    if (!day) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${String(day).padStart(2, '0')} ${months[0]} 2026`;
  };

  // ── Calendar view ──
  const renderCalendarView = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>January 2026</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" sx={{ border: '1px solid #e2e8f0', borderRadius: 1 }}>
            <ChevronLeftIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
          <IconButton size="small" sx={{ border: '1px solid #e2e8f0', borderRadius: 1 }}>
            <ChevronRightIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 2, mb: 3, overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <WeekNumberCell>Wk</WeekNumberCell>
              {weekDays.map((d) => <WeekDayCell key={d}>{d}</WeekDayCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {calendarData.map((week) => (
              <TableRow key={week.weekNumber}>
                <WeekNumberCell>{week.weekNumber}</WeekNumberCell>
                {week.days.map((day) => {
                  const hasTasks = !!(tasksByDate[day]?.length);
                  return (
                    <CalendarTableCell
                      key={day}
                      clickable={hasTasks ? 1 : 0}
                      onClick={() => handleDotClick(day)}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 500, display: 'block', mb: 0.5, fontSize: '0.7rem' }}>
                        {day}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                        {tasksByDate[day]?.map((task, i) => (
                          <TaskDot key={i} priority={task.priority} />
                        ))}
                      </Box>
                    </CalendarTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Legend */}
      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b', mb: 1.5, fontSize: '0.75rem' }}>Legend</Typography>
        <Grid container spacing={1}>
          {legendItems.map((item) => (
            <Grid item xs={12} sm={6} key={item.label}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '0.8rem' }}>{item.dot}</Typography>
                <Typography variant="caption" sx={{ color: '#475569', fontSize: '0.7rem' }}>{item.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );

  // ── List view ──
  const renderListView = () => (
    <>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[{ label: 'Total', val: 6 }, { label: 'Pending', val: 5 }, { label: 'In Progress', val: 1 }, { label: 'Due Today', val: 2 }].map((s) => (
          <Grid item xs={6} sm={6} md={3} key={s.label}>
            <StatCard>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.7rem' }}>{s.label}</Typography>
              <Typography variant="h6" sx={{ color: '#334155', fontWeight: 700, mt: 1, fontSize: '1.1rem' }}>{s.val}</Typography>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {listTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskCard>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <PriorityChip priority={task.priority} label={task.priority === 'high' ? 'High' : 'Medium'} />
                  <StatusChip status={task.status} label={task.status === 'pending' ? 'Pending' : task.status === 'progress' ? 'Progress' : 'Review'} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#003e52', fontSize: '0.8rem' }}>{task.title}</Typography>
                  {task.tag && <TagChip label={task.tag} />}
                </Box>
                <Stack spacing={1} sx={{ color: '#64748b' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DescriptionIcon sx={{ width: 12, height: 12, mr: 1, color: '#94a3b8' }} />
                    <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>{task.type}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ width: 12, height: 12, mr: 1, color: '#94a3b8' }} />
                    <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>{task.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventIcon sx={{ width: 12, height: 12, mr: 1, color: '#94a3b8' }} />
                    <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>Due: {task.dueDate}</Typography>
                  </Box>
                </Stack>
              </Box>
              <StyledButton fullWidth startIcon={<PlayIcon />} sx={{ mt: 2 }}>
                {task.buttonText}
              </StyledButton>
            </TaskCard>
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 2,
        }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              My Tasks
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', fontSize: '0.7rem' }}>
              Your assigned inspection tasks
            </Typography>
          </Box>

          <Paper elevation={0} sx={{
            display: 'flex',
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 1.5,
            p: 0.3,
            mt: { xs: 1, sm: 0 },
          }}>
            <ViewToggleButton active={view === 'list'} startIcon={<MenuIcon />} onClick={() => setView('list')}>List</ViewToggleButton>
            <ViewToggleButton active={view === 'calendar'} startIcon={<CalendarIcon />} onClick={() => setView('calendar')}>Calendar</ViewToggleButton>
          </Paper>
        </Box>

        {/* Filter Bar */}
        <Paper elevation={0} sx={{
          p: 1.5, mb: 3, borderRadius: 2, border: '1px solid #f1f5f9',
          display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', bgcolor: '#ffffff',
        }}>
          <FormControl sx={{ minWidth: { xs: '100%', sm: 140, md: 160 } }}>
            <FilterSelect value="all" displayEmpty size="small">
              <MenuItem value="all" sx={{ fontSize: '0.75rem' }}>All Tasks</MenuItem>
            </FilterSelect>
          </FormControl>
          <FormControl sx={{ minWidth: { xs: '100%', sm: 120, md: 140 } }}>
            <FilterSelect value="priority" displayEmpty size="small">
              <MenuItem value="priority" sx={{ fontSize: '0.75rem' }}>Priority</MenuItem>
            </FilterSelect>
          </FormControl>
          <FormControl sx={{ minWidth: { xs: '100%', sm: 130, md: 150 } }}>
            <InputBase
              type="date"
              value="2024-11-05"
              sx={{ width: '100%', p: '6px 10px', border: '1px solid #e2e8f0', borderRadius: 1.5, fontSize: '0.7rem' }}
            />
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<FilterIcon sx={{ fontSize: '0.875rem' }} />}
            sx={{ borderColor: '#e2e8f0', color: '#003e52', textTransform: 'none', fontSize: '0.7rem', padding: '4px 10px', minWidth: 'auto' }}
          >
            Filters
          </Button>
        </Paper>

        {/* Main Content */}
        {view === 'calendar' ? renderCalendarView() : renderListView()}
      </Container>

      {/* ── Task Detail Modal ── */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        TransitionComponent={SlideUp}
        keepMounted
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: '16px',
            maxHeight: '85vh',
          },
        }}
      >

        {/* Modal Header */}
        <Box sx={{ px: 2.5, pt: 1, pb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              bgcolor: '#1a3c52',
              borderRadius: 1.5,
              p: 0.8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CalendarIcon sx={{ fontSize: '1rem', color: '#fff' }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, color: '#1a202c', fontSize: '0.95rem' }}>
                {formatModalDate(selectedDay)}
              </Typography>
              <Typography sx={{ color: '#718096', fontSize: '0.72rem' }}>
                {modalTasks.length} task{modalTasks.length !== 1 ? 's' : ''} scheduled
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={handleCloseModal} sx={{ color: '#718096' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider />

        {/* Scrollable Task List */}
        <Box sx={{ overflowY: 'auto', px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {modalTasks.map((task) => (
            <ModalTaskCard key={task.id} task={task} />
          ))}
        </Box>
      </Dialog>
    </Box>
  );
}

export default MyTask;
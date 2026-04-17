import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Tooltip,
  alpha,
  useTheme,
  Card,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Badge,
  Fade,
  Zoom,
  Alert,
  AlertTitle,
  Snackbar,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  ContentCopy as CopyIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const primaryColor = '#0f4c61';

// Table Data
const checklistData = [
  {
    id: 1,
    name: 'Safety Inspection',
    type: 'Clone',
    receivedDate: '2024-10-15',
    assignments: 12,
    status: 'Active',
    category: 'Safety',
    createdBy: 'John Smith',
  },
  {
    id: 2,
    name: 'Equipment Check',
    type: 'Custom',
    receivedDate: '2024-10-20',
    assignments: 8,
    status: 'Active',
    category: 'Equipment',
    createdBy: 'Sarah Wilson',
  },
  {
    id: 3,
    name: 'Site Inspection',
    type: 'Global',
    receivedDate: '2024-10-10',
    assignments: 15,
    status: 'Active',
    category: 'Site',
    createdBy: 'Mike Johnson',
  },
  {
    id: 4,
    name: 'Quality Assurance',
    type: 'Custom',
    receivedDate: '2024-10-25',
    assignments: 6,
    status: 'Pending',
    category: 'Quality',
    createdBy: 'Emma Davis',
  },
  {
    id: 5,
    name: 'Compliance Audit',
    type: 'Clone',
    receivedDate: '2024-10-28',
    assignments: 4,
    status: 'Active',
    category: 'Compliance',
    createdBy: 'Robert Brown',
  },
  {
    id: 6,
    name: 'Fire Safety Check',
    type: 'Global',
    receivedDate: '2024-10-12',
    assignments: 9,
    status: 'Active',
    category: 'Safety',
    createdBy: 'Lisa Anderson',
  },
  {
    id: 7,
    name: 'Electrical Inspection',
    type: 'Custom',
    receivedDate: '2024-10-18',
    assignments: 7,
    status: 'Pending',
    category: 'Electrical',
    createdBy: 'David Wilson',
  },
  {
    id: 8,
    name: 'HVAC Maintenance',
    type: 'Clone',
    receivedDate: '2024-10-22',
    assignments: 5,
    status: 'Active',
    category: 'Maintenance',
    createdBy: 'Jennifer Lee',
  },
];

const typeColors = {
  Clone: { bg: alpha('#8b5cf6', 0.1), color: '#8b5cf6' },
  Custom: { bg: alpha('#3b82f6', 0.1), color: '#3b82f6' },
  Global: { bg: alpha('#10b981', 0.1), color: '#10b981' },
};

export default function CloneChecklist() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cloning, setCloning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(filteredData.map((item) => item.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClone = () => {
    setCloning(true);
    setTimeout(() => {
      setCloning(false);
      setShowSuccess(true);
      setSelected([]);
    }, 2000);
  };

  // Filter data
  const filteredData = checklistData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sort data
  const sortedData = filteredData.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (order === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ bgcolor: '#f8f6f6', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ color: primaryColor }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" fontWeight={900} color={primaryColor}>
              Select Checklist to Clone
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Choose a checklist from the list below to create a copy
          </Typography>
        </Box>

        {/* Search and Filter Bar */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search checklists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" gap={1} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={(e) => setFilterAnchor(e.currentTarget)}
                  sx={{
                    borderColor: alpha(primaryColor, 0.3),
                    color: 'text.primary',
                    textTransform: 'none',
                  }}
                >
                  Filter
                </Button>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  sx={{
                    bgcolor: primaryColor,
                    textTransform: 'none',
                    boxShadow: `0 4px 12px ${alpha(primaryColor, 0.3)}`,
                  }}
                >
                  Refresh
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={() => setFilterAnchor(null)}
          PaperProps={{ sx: { borderRadius: 2, minWidth: 200, p: 1 } }}
        >
          <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
            Filter by Type
          </Typography>
          {['all', 'Clone', 'Custom', 'Global'].map((type) => (
            <MenuItem key={type} onClick={() => { setTypeFilter(type); setFilterAnchor(null); }}>
              <ListItemText>
                {type === 'all' ? 'All Types' : type}
              </ListItemText>
            </MenuItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
            Filter by Status
          </Typography>
          {['all', 'Active', 'Pending'].map((status) => (
            <MenuItem key={status} onClick={() => { setStatusFilter(status); setFilterAnchor(null); }}>
              <ListItemText>
                {status === 'all' ? 'All Status' : status}
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={800} color={primaryColor}>
                  {checklistData.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Checklists
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={800} color="#8b5cf6">
                  {checklistData.filter(c => c.type === 'Clone').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clone Ready
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={800} color="#10b981">
                  {checklistData.filter(c => c.type === 'Global').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Global
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={800} color="#3b82f6">
                  {checklistData.filter(c => c.type === 'Custom').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Custom
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Cloning Progress */}
        {cloning && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Cloning selected checklists...
            </Typography>
            <LinearProgress sx={{ height: 6, borderRadius: 3 }} />
          </Box>
        )}

        {/* Table */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: alpha(primaryColor, 0.04) }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < filteredData.length}
                      checked={filteredData.length > 0 && selected.length === filteredData.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleRequestSort('name')}
                    >
                      Checklist Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'receivedDate'}
                      direction={orderBy === 'receivedDate' ? order : 'asc'}
                      onClick={() => handleRequestSort('receivedDate')}
                    >
                      Received Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'assignments'}
                      direction={orderBy === 'assignments' ? order : 'asc'}
                      onClick={() => handleRequestSort('assignments')}
                    >
                      Assignments
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    selected={selected.includes(row.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {row.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {row.category} • By {row.createdBy}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.type}
                        size="small"
                        sx={{
                          bgcolor: typeColors[row.type]?.bg,
                          color: typeColors[row.type]?.color,
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                        <Typography variant="body2">{row.receivedDate}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Badge
                        badgeContent={row.assignments}
                        color="primary"
                        sx={{ '& .MuiBadge-badge': { bgcolor: primaryColor } }}
                      >
                        <AssignmentIcon sx={{ color: 'text.disabled' }} />
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          bgcolor: row.status === 'Active' ? alpha('#10b981', 0.1) : alpha('#f59e0b', 0.1),
                          color: row.status === 'Active' ? '#10b981' : '#f59e0b',
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton size="small" sx={{ color: primaryColor }}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Clone">
                        <IconButton
                          size="small"
                          sx={{ color: '#8b5cf6' }}
                          onClick={() => {
                            setSelected([row.id]);
                            handleClone();
                          }}
                        >
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>

        {/* Action Buttons */}
        {selected.length > 0 && (
          <Fade in>
            <Paper sx={{ mt: 3, p: 2, borderRadius: 3, bgcolor: alpha(primaryColor, 0.04) }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  {selected.length} checklist(s) selected
                </Typography>
                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    onClick={() => setSelected([])}
                    sx={{
                      borderColor: alpha(primaryColor, 0.3),
                      color: 'text.primary',
                      textTransform: 'none',
                    }}
                  >
                    Clear Selection
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<CopyIcon />}
                    onClick={handleClone}
                    sx={{
                      bgcolor: '#8b5cf6',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#7c3aed' },
                    }}
                  >
                    Clone Selected
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Fade>
        )}

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={2000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ bgcolor: '#8b5cf6', color: 'white' }}>
            Checklist cloned successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
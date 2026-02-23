import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  LinearProgress,
  IconButton,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  Container,
  Stack,
  Divider,
  Paper,
  useMediaQuery,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CorporateFare as CorporateFareIcon,
  Bolt as BoltIcon,
  Public as PublicIcon,
  Terminal as TerminalIcon,
  Architecture as ArchitectureIcon,
  ShoppingCart as ShoppingCartIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import AddCustomerModal from "./AddCustomerModal";

// Custom color
const customColor = "#0f4c61";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.2s ease-in-out",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  "&:hover": {
    borderColor: customColor,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(15, 76, 97, 0.15)' 
    : 'rgba(15, 76, 97, 0.08)',
  color: customColor,
  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  height: 20,
  fontSize: "0.675rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  ...(status === "active" && {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(46, 125, 50, 0.15)'
      : '#e8f5e9',
    color: '#2e7d32',
  }),
  ...(status === "inactive" && {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(158, 158, 158, 0.15)'
      : '#f5f5f5',
    color: theme.palette.text.secondary,
  }),
  [theme.breakpoints.down('sm')]: {
    height: 18,
    fontSize: "0.6rem",
  },
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 6,
  borderRadius: 3,
  backgroundColor: theme.palette.grey[200],
  "& .MuiLinearProgress-bar": {
    borderRadius: 3,
    backgroundColor: value > 90 ? theme.palette.error.main : customColor,
  },
}));

const KPICard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 10,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const HeaderButton = styled(Button)(({ theme }) => ({
  backgroundColor: customColor,
  color: 'white',
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: '8px 16px',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: '#0a3a4a',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    padding: '6px 12px',
  },
}));

export default function ClientManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [membershipFilter, setMembershipFilter] = useState("All Memberships");

  // Sample customer data
  const customers = [
    {
      id: 1,
      name: "Acme Corporation",
      icon: <CorporateFareIcon sx={{ fontSize: isMobile ? 20 : 24 }} />,
      status: "active",
      membership: "Enterprise",
      daysLeft: 45,
      usage: 75,
      email: "contact@acme.com",
    },
    {
      id: 2,
      name: "TechFlow Inc",
      icon: <BoltIcon sx={{ fontSize: isMobile ? 20 : 24 }} />,
      status: "inactive",
      membership: "Premium",
      daysLeft: 0,
      usage: 10,
      email: "info@techflow.io",
    },
    {
      id: 3,
      name: "Global Solutions",
      icon: <PublicIcon sx={{ fontSize: isMobile ? 20 : 24 }} />,
      status: "active",
      membership: "Standard",
      daysLeft: 120,
      usage: 40,
      email: "hello@globalsol.com",
    },
    {
      id: 4,
      name: "CodeCraft Labs",
      icon: <TerminalIcon sx={{ fontSize: isMobile ? 20 : 24 }} />,
      status: "active",
      membership: "Enterprise",
      daysLeft: 12,
      usage: 92,
      email: "dev@codecraft.io",
    },
    {
      id: 5,
      name: "Urban Dynamics",
      icon: <ArchitectureIcon sx={{ fontSize: isMobile ? 20 : 24 }} />,
      status: "active",
      membership: "Premium",
      daysLeft: 18,
      usage: 55,
      email: "contact@urbandynamics.com",
    },
    {
      id: 6,
      name: "EcoStore Online",
      icon: <ShoppingCartIcon sx={{ fontSize: isMobile ? 20 : 24 }} />,
      status: "active",
      membership: "Free",
      daysLeft: 360,
      usage: 2,
      email: "support@ecostore.com",
    },
    {
      id: 7,
      name: "Nexus Digital",
      icon: <PublicIcon sx={{ fontSize: isMobile ? 20 : 24 }} />,
      status: "active",
      membership: "Standard",
      daysLeft: 75,
      usage: 60,
      email: "info@nexusdigital.com",
    },
    {
      id: 8,
      name: "Quantum Systems",
      icon: <TerminalIcon sx={{ fontSize: isMobile ? 20 : 24 }} />,
      status: "active",
      membership: "Enterprise",
      daysLeft: 90,
      usage: 45,
      email: "sales@quantum.com",
    },
    {
      id: 9,
      name: "Bright Ideas Co",
      icon: <BoltIcon sx={{ fontSize: isMobile ? 20 : 24 }} />,
      status: "inactive",
      membership: "Premium",
      daysLeft: 0,
      usage: 15,
      email: "hello@brightideas.co",
    },
  ];

  const kpiData = [
    { label: "Total Customers", value: 9 },
    { label: "Active Customers", value: 7 },
    { label: "Enterprise", value: 3 },
    { label: "Expiring Soon", value: 4, highlight: true },
  ];

  // Filter customers based on search and filters
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || 
                         customer.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesMembership = membershipFilter === "All Memberships" || 
                             customer.membership === membershipFilter;
    
    return matchesSearch && matchesStatus && matchesMembership;
  });

  const handleOpenModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
        {/* Header with Add Customer Button */}
        <Box sx={{ 
          mb: { xs: 2, sm: 3, md: 4 }, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}>
          <Box>
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              sx={{ 
                fontWeight: 900, 
                letterSpacing: -0.02, 
                mb: 0.25,
                fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
              }}
            >
              Client Management
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Manage customer accounts and memberships
            </Typography>
          </Box>
          <HeaderButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Add Customer
          </HeaderButton>
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          {kpiData.map((kpi, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <KPICard elevation={0}>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 0.5, 
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {kpi.label}
                </Typography>
                <Typography 
                  variant={isMobile ? "h4" : "h3"} 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2rem' },
                    color: kpi.highlight ? customColor : 'inherit',
                    lineHeight: 1.2,
                  }}
                >
                  {kpi.value}
                </Typography>
              </KPICard>
            </Grid>
          ))}
        </Grid>

        {/* Search & Filters */}
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: { xs: 18, sm: 20 } }} color="action" />
                    </InputAdornment>
                  ),
                }}
                size="small"
                sx={{ 
                  bgcolor: theme.palette.background.paper,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2}
                sx={{ width: '100%' }}
              >
                <FormControl size="small" sx={{ flex: 1, minWidth: { xs: '100%', sm: 140 } }}>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    displayEmpty
                    IconComponent={ExpandMoreIcon}
                    sx={{ 
                      borderRadius: 2, 
                      bgcolor: theme.palette.background.paper,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    <MenuItem value="All Status">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ flex: 1, minWidth: { xs: '100%', sm: 140 } }}>
                  <Select
                    value={membershipFilter}
                    onChange={(e) => setMembershipFilter(e.target.value)}
                    displayEmpty
                    IconComponent={ExpandMoreIcon}
                    sx={{ 
                      borderRadius: 2, 
                      bgcolor: theme.palette.background.paper,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    <MenuItem value="All Memberships">All Memberships</MenuItem>
                    <MenuItem value="Enterprise">Enterprise</MenuItem>
                    <MenuItem value="Premium">Premium</MenuItem>
                    <MenuItem value="Standard">Standard</MenuItem>
                    <MenuItem value="Free">Free</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Client Grid - 3 cards per row */}
        {filteredCustomers.length > 0 ? (
          <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
            {filteredCustomers.map((customer) => (
              <Grid item xs={12} sm={6} md={4} key={customer.id}>
                <StyledCard elevation={0}>
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <Box sx={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "flex-start", 
                      mb: 2 
                    }}>
                      <Box sx={{ display: "flex", gap: 1.5, alignItems: 'center' }}>
                        <IconWrapper>
                          {customer.icon}
                        </IconWrapper>
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 700,
                              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                              lineHeight: 1.2,
                              mb: 0.5,
                            }}
                          >
                            {customer.name}
                          </Typography>
                          <StatusChip
                            status={customer.status}
                            label={customer.status}
                            size="small"
                          />
                        </Box>
                      </Box>
                      <IconButton size="small" sx={{ p: 0.5 }}>
                        <MoreVertIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                      </IconButton>
                    </Box>

                    <Stack spacing={1.5}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                        >
                          Membership
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                            color: customer.membership === "Enterprise" ? customColor : 'inherit',
                          }}
                        >
                          {customer.membership}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                        >
                          Duration
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                            color: customer.daysLeft === 0 ? theme.palette.error.main : 'inherit',
                          }}
                        >
                          {customer.daysLeft} days left
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                        >
                          Email
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            color: 'text.secondary',
                            maxWidth: '120px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {customer.email}
                        </Typography>
                      </Box>

                      <Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                          >
                            Usage
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 700,
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
                            }}
                          >
                            {customer.usage}%
                          </Typography>
                        </Box>
                        <StyledLinearProgress 
                          variant="determinate" 
                          value={customer.usage}
                        />
                      </Box>
                    </Stack>
                  </CardContent>

                  <Divider />

                  <CardActions sx={{ 
                    p: { xs: 1.5, sm: 2 }, 
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'rgba(255,255,255,0.02)'
                      : theme.palette.grey[50],
                    justifyContent: "space-between",
                  }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: customColor,
                        color: "white",
                        fontWeight: 600,
                        fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                        padding: { xs: '4px 10px', sm: '6px 12px' },
                        '&:hover': {
                          bgcolor: '#0a3a4a',
                        },
                      }}
                    >
                      View Profile
                    </Button>
                    <Box>
                      <IconButton size="small" sx={{ p: { xs: 0.5, sm: 0.75 } }}>
                        <EditIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                      </IconButton>
                      <IconButton size="small" sx={{ p: { xs: 0.5, sm: 0.75 } }}>
                        <DeleteIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                      </IconButton>
                    </Box>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}>
            <Typography variant="h6" color="text.secondary">
              No customers found
            </Typography>
          </Box>
        )}
      </Container>

      {/* Add Customer Modal - Moved outside Container to ensure proper rendering */}
      <AddCustomerModal 
        open={addModalOpen} 
        onClose={handleCloseModal}
        customColor={customColor}
      />
    </>
  );
}
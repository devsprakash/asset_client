import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Chip,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Toggle = ({ checked, onChange }) => {
  return (
    <Box
      onClick={onChange}
      sx={{
        width: 44,
        height: 24,
        borderRadius: 12,
        bgcolor: checked ? '#0f766e' : '#cbd5e1',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          bgcolor: '#fff',
          position: 'absolute',
          top: 3,
          left: checked ? 23 : 3,
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}
      />
    </Box>
  );
};

const Tag = ({ children, filled }) => (
  <Chip
    label={children}
    variant={filled ? 'filled' : 'outlined'}
    sx={{
      height: 'auto',
      py: 0.25,
      px: 0.75,
      fontSize: '0.75rem',
      fontWeight: 500,
      bgcolor: filled ? '#0f4c5c' : 'transparent',
      color: filled ? '#fff' : '#334155',
      borderColor: filled ? 'none' : '#cbd5e1',
      '& .MuiChip-label': {
        px: 0.75,
        py: 0.125,
      },
    }}
  />
);

const Field = ({ label, value, ...props }) => (
  <Box {...props}>
    <Typography
      variant="caption"
      sx={{
        fontSize: '0.6875rem',
        color: '#64748b',
        fontWeight: 500,
        display: 'block',
        mb: 0.5,
        letterSpacing: '0.3px',
      }}
    >
      {label}
    </Typography>
    <Paper
      variant="outlined"
      sx={{
        p: '8px 12px',
        bgcolor: '#f8fafc',
        borderColor: '#e2e8f0',
        borderRadius: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: '0.8125rem',
          color: '#1e293b',
          fontWeight: 400,
          lineHeight: 1.4,
        }}
      >
        {value}
      </Typography>
    </Paper>
  </Box>
);

export default function CloneAssetDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState('AMC Inspection');

  return (
    <Box sx={{ bgcolor: '#f1f5f9', minHeight: '100vh', pb: { xs: 3, sm: 5 } }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: '#fff',
          borderBottom: '1px solid #e2e8f0',
          borderRadius: 0,
          p: { xs: 1.5, sm: '16px 28px' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <IconButton
              onClick={() => window.history.back()}
              size="small"
              sx={{ mt: 0.25, color: '#475569', p: 0.5 }}
            >
              <ArrowBackIcon sx={{ fontSize: '1.125rem' }} />
            </IconButton>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.125rem', sm: '1.25rem' },
                  fontWeight: 700,
                  color: '#0f172a',
                  mb: 0.25,
                  lineHeight: 1.3,
                }}
              >
                Generator Unit A-12
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.6875rem',
                  color: '#64748b',
                  lineHeight: 1.3,
                }}
              >
                Asset details, classification, and category filters
              </Typography>
            </Box>
          </Box>
          <Chip
            label="Approved"
            sx={{
              bgcolor: '#dcfce7',
              color: '#15803d',
              fontWeight: 600,
              fontSize: '0.6875rem',
              height: 'auto',
              py: 0.25,
              '& .MuiChip-label': {
                px: 1,
                py: 0.125,
              },
            }}
          />
        </Box>
      </Paper>

      <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2.5 }, py: { xs: 1.5, sm: 2.5 } }}>
        <Stack spacing={2}>
          {/* Requested By */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: '16px 20px' },
              border: '1px solid #e2e8f0',
              borderRadius: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: '#e2e8f0',
                  color: '#475569',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                MC
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    mb: 0.25,
                    lineHeight: 1.3,
                  }}
                >
                  Requested by{' '}
                  <Typography component="span" sx={{ color: '#0f172a', fontWeight: 600, fontSize: '0.75rem' }}>
                    Michael Chen
                  </Typography>
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.6875rem',
                    color: '#94a3b8',
                    lineHeight: 1.3,
                  }}
                >
                  Technician • January 15, 2024 • 4:00 PM
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Core Identification */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2.5 },
              border: '1px solid #e2e8f0',
              borderRadius: 1.5,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#0f172a',
                mb: 2,
                letterSpacing: '0.3px',
              }}
            >
              Core Identification
            </Typography>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <Field label="Asset ID / Tag Number" value="AST-2024-001" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field label="Asset Name / Description" value="Generator Unit A-12" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field label="Serial Number" value="GEN-A12-2024" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field label="Asset Category" value="Electrical" />
              </Grid>
            </Grid>
          </Paper>

          {/* Primary Filters + MHE Filters */}
          <Grid container spacing={1.5}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2.5 },
                  border: '1px solid #e2e8f0',
                  borderRadius: 1.5,
                  height: '100%',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    mb: 2,
                    letterSpacing: '0.3px',
                  }}
                >
                  Primary Filters
                </Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.6875rem',
                        color: '#64748b',
                        fontWeight: 500,
                        display: 'block',
                        mb: 0.75,
                      }}
                    >
                      Current Location
                    </Typography>
                    <Tag>Warehouse A</Tag>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.6875rem',
                        color: '#64748b',
                        fontWeight: 500,
                        display: 'block',
                        mb: 0.75,
                      }}
                    >
                      Status
                    </Typography>
                    <Tag>Active</Tag>
                  </Box>
                  <Field label="Assigned User / Custodian" value="John Smith" />
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2.5 },
                  border: '1px solid #e2e8f0',
                  borderRadius: 1.5,
                  height: '100%',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    mb: 2,
                    letterSpacing: '0.3px',
                  }}
                >
                  Material Handling Equipment Filters
                </Typography>
                <Stack spacing={1.5}>
                  <Field label="MHE Utilization Status" value="Active" />
                  <Field label="MHE Engine Status / Runtime (Hours)" value="1,250 hrs" />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pt: 0.5,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#334155', fontWeight: 500 }}>
                      MHE Safety Certification
                    </Typography>
                    <Toggle checked={true} />
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          {/* Important Dates */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2.5 },
              border: '1px solid #e2e8f0',
              borderRadius: 1.5,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#0f172a',
                mb: 2,
                letterSpacing: '0.3px',
              }}
            >
              Important Dates
            </Typography>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6} md={3}>
                <Field label="Acquisition Date" value="Jan 10, 2024" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Field label="Warranty / Lease Expiry" value="Jan 10, 2027" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Field label="Commissioning Date" value="Jan 12, 2024" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Field label="Invoice Date" value="Jan 8, 2024" />
              </Grid>
            </Grid>
          </Paper>

          {/* Inspection Systems */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2.5 },
              border: '1px solid #e2e8f0',
              borderRadius: 1.5,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#0f172a',
                mb: 1.5,
                letterSpacing: '0.3px',
              }}
            >
              Inspection Systems
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {['AMC Inspection', 'CAMC Inspection'].map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  variant={activeTab === tab ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: 20,
                    px: 1.5,
                    py: 0.5,
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    minWidth: 'auto',
                    bgcolor: activeTab === tab ? '#0f4c5c' : 'transparent',
                    color: activeTab === tab ? '#fff' : '#475569',
                    borderColor: activeTab === tab ? 'transparent' : '#cbd5e1',
                    '&:hover': {
                      bgcolor: activeTab === tab ? '#0a3a46' : '#f1f5f9',
                    },
                  }}
                >
                  {tab}
                </Button>
              ))}
            </Box>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: { xs: 1.25, sm: '14px 16px' },
                    borderRadius: 1.25,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#1e293b',
                      mb: 1,
                    }}
                  >
                    AMC Inspection Schedule
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                    <Tag>Monthly</Tag>
                    <Tag>Quarterly</Tag>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: { xs: 1.25, sm: '14px 16px' },
                    borderRadius: 1.25,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#1e293b',
                      mb: 1,
                    }}
                  >
                    CAMC Inspection Schedule
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                    <Tag>Weekly</Tag>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {/* Asset Condition */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2.5 },
              border: '1px solid #e2e8f0',
              borderRadius: 1.5,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#0f172a',
                mb: 1.5,
                letterSpacing: '0.3px',
              }}
            >
              Asset Condition
            </Typography>
            <Tag>Normal</Tag>
          </Paper>

          {/* Back Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
            <Button
              onClick={() => window.history.back()}
              variant="outlined"
              sx={{
                px: 2.5,
                py: 0.75,
                borderRadius: 1,
                borderColor: '#e2e8f0',
                color: '#334155',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#cbd5e1',
                  bgcolor: '#f8fafc',
                },
              }}
            >
              Back to List
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
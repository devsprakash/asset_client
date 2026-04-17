import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#003350',
      light: '#1a4a6b',
      dark: '#001e31',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#51606f',
      light: '#d4e4f6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9f9fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1c1e',
      secondary: '#42474e',
    },
    divider: 'rgba(194, 199, 206, 0.4)',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h1: { fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08 },
    h2: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 },
    h3: { fontWeight: 800, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.015em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    body1: { fontWeight: 400, lineHeight: 1.7 },
    body2: { fontWeight: 400, lineHeight: 1.65 },
    subtitle1: { fontWeight: 600 },
    button: { fontWeight: 700, textTransform: 'none', letterSpacing: '-0.01em' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '0.9rem',
          fontWeight: 700,
          transition: 'all 0.2s ease',
          '&:hover': { transform: 'translateY(-1px)' },
          '&:active': { transform: 'scale(0.97)' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #003350 0%, #1a4a6b 100%)',
          boxShadow: '0 8px 24px rgba(0, 51, 80, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1a4a6b 0%, #003350 100%)',
            boxShadow: '0 12px 32px rgba(0, 51, 80, 0.35)',
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
          '&:hover': { borderWidth: 2 },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 24px rgba(26, 28, 30, 0.06)',
          border: '1px solid rgba(194, 199, 206, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#f9f9fc',
            '& fieldset': { border: 'none' },
            '&:hover fieldset': { border: 'none' },
            '&.Mui-focused fieldset': {
              border: '2px solid #003350',
            },
          },
        },
      },
    },
  },
});

export default theme;
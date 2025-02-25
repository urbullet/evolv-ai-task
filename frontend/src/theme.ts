import {createTheme} from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {main: '#6366f1', light: '#818cf8'},
        secondary: {main: '#ec4899', light: '#f472b6'},
        success: {main: '#22c55e', dark: '#16a34a'},
        warning: {main: '#f59e0b'},
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {primary: '#1e293b', secondary: '#64748b'},
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        h3: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {main: '#6366f1', light: '#818cf8'},
        secondary: {main: '#ec4899', light: '#f472b6'},
        success: {main: '#22c55e', dark: '#16a34a'},
        warning: {main: '#f59e0b'},
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {primary: '#ffffff', secondary: '#e0e0e0'},
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        h3: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        /* Override for react-resizable handle arrows in dark mode */
        .react-grid-item > .react-resizable-handle::after {
          border-right: 2px solid rgba(255, 255, 255, 0.7) !important;
          border-bottom: 2px solid rgba(255, 255, 255, 0.7) !important;
        }
      `,
        },
    },
});

import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '10px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'primary',
        variant: 'contained',
      },
    },
    MuiStack: {
      defaultProps: {
        gap: '1.6rem',
      },
    },
  },
});

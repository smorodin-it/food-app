import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 480,
      laptop: 1024,
      desktop: 1200,
    },
  },

  typography: {
    htmlFontSize: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '10px',
        },
        '#root': {
          minWidth: 280,
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
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
        alignItems: 'flex-start',
        gap: '1.6rem',
        width: '100%',
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});

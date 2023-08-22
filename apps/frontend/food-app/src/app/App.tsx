import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { AppRouter } from './router/AppRouter';
import { SnackbarProvider } from 'notistack';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <CssBaseline />
        <AppRouter />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

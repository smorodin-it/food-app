import { AppRouter } from './router/AppRouter';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

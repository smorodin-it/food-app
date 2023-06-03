import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { AppRouter } from './router/AppRouter';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

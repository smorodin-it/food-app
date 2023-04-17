import { AppRouter } from '@food-app/frontend/router';
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

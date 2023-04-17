import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { AppPage } from '../page/AppPage';

interface AppRouterProps {
  a?: unknown;
}

export const router = createBrowserRouter([
  {
    path: routes.index(),
    element: <AppPage />,
  },
  {
    path: routes.signUp(),
    element: 'Sign Up',
  },
  {
    path: routes.signIn(),
    element: 'Sign In',
  },
]);

export const AppRouter = (props: AppRouterProps): JSX.Element => {
  return <RouterProvider router={router} />;
};

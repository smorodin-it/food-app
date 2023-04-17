import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { AppPage } from '../../../../../apps/frontend/food-app/src/app/page/AppPage';
import { SignInPage, SignInForm } from '@food-app/frontend/features/auth';

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
    element: (
      <SignInPage>
        <SignInForm />
      </SignInPage>
    ),
  },
]);

export const AppRouter = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

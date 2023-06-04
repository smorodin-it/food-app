import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AppPage } from '../page/AppPage';
import {
  SignInPage,
  SignInForm,
  RequireAuth,
} from '@food-app/frontend/features/auth';
import { routes } from '@food-app/frontend/utils';
import { AuthTabsSync } from '@food-app/frontend/features/auth';
import { FC } from 'react';

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<AuthTabsSync />}>
      <Route
        path={routes.index()}
        element={
          <RequireAuth>
            <AppPage />
          </RequireAuth>
        }
      ></Route>
      <Route path={routes.signUp()} element={'Sign Up Page'} />,
      <Route
        path={routes.signIn()}
        element={
          <SignInPage>
            <SignInForm />
          </SignInPage>
        }
      />
    </Route>,
  ])
);

export const AppRouter: FC = () => {
  return <RouterProvider router={router} />;
};

import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthStore } from '@food-app/frontend/data-access/auth';
import { routes } from '@food-app/frontend/utils';
import { observer } from 'mobx-react-lite';

interface RequireAuthProps {
  children: ReactElement;
}

export const RequireAuth: FC<RequireAuthProps> = observer((props) => {
  const location = useLocation();

  return AuthStore.isAuth ? (
    props.children
  ) : (
    <Navigate
      to={routes.signIn()}
      state={{ from: location.pathname }}
      replace
    />
  );
});

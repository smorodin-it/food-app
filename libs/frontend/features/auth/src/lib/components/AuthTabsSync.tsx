import {
  getFromLocalStorage,
  LocalStorageFields,
  routes,
} from '@food-app/frontend/utils';
import { AuthStore } from '@food-app/frontend/data-access/auth';
import { useEffect } from 'react';
import {
  Location,
  NavigateFunction,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const storageEventHandler = (
  event: StorageEvent,
  navigate: NavigateFunction,
  location: Location
) => {
  console.group('StorageEvent');
  console.log('event: ', event);
  const isHaveRefreshToken = !!getFromLocalStorage(
    LocalStorageFields.REFRESH_TOKEN
  );

  console.log('isHaveRefreshToken: ', isHaveRefreshToken);

  AuthStore.setAuth(isHaveRefreshToken);

  if (isHaveRefreshToken) {
    if (window.location.pathname === routes.signIn()) {
      if (location.state && 'from' in location.state) {
        console.log('state: ', location.state);
        navigate(location.state.from);
      } else {
        console.log('bad');
        navigate(routes.index());
      }
    }
  }
  console.groupEnd();
};

export const AuthTabsSync = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const eventHandler = (event: StorageEvent) => {
      storageEventHandler(event, navigate, location);
    };

    window.addEventListener('storage', eventHandler);

    return () => {
      window.removeEventListener('storage', eventHandler);
    };
  }, [location.hash]);

  return <Outlet />;
};

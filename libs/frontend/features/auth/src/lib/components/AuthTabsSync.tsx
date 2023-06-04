import {
  BroadcastAuthMessages,
  BroadcastChannels,
  isHaveTokens,
  routes,
} from '@food-app/frontend/utils';
import { AuthStore } from '@food-app/frontend/data-access/auth';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const AuthTabsSync = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const bcHandler = (event: MessageEvent<BroadcastAuthMessages>) => {
    switch (event.data) {
      case BroadcastAuthMessages.LOGIN:
        if (isHaveTokens()) {
          AuthStore.setAuth(true);
          if (location.pathname === routes.signIn()) {
            if (location.state && 'from' in location.state) {
              navigate(location.state.from);
            } else {
              navigate(routes.index());
            }
          }
        }
        break;

      case BroadcastAuthMessages.LOGOUT:
        AuthStore.clear();
        break;
    }
  };

  useEffect(() => {
    const bc = new BroadcastChannel(BroadcastChannels.AUTH);
    bc.onmessage = bcHandler;

    return () => {
      bc.close();
    };
  }, []);

  return <Outlet />;
};

import {
  BroadcastAuthMessages,
  BroadcastChannels,
  BroadcastMessageObject,
  routes,
} from '@food-app/frontend/utils';
import { AuthStore } from '@food-app/frontend/data-access/auth';
import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const AuthTabsSync: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bcHandler = (event: MessageEvent<BroadcastMessageObject>) => {
    switch (event.data.type) {
      case BroadcastAuthMessages.LOGIN:
        if (event.data.payload && event.data.payload.accessToken) {
          AuthStore.setAccessToken(event.data.payload.accessToken);

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

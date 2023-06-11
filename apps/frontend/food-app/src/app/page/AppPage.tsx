import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout/AppLayout';
import { AppSideBarLayout } from '../layout/AppLayout/AppSideBarLayout';
import { AppTopBarLayout } from '../layout/AppLayout/AppTopBarLayout';
import { AppAreaLayout } from '../layout/AppLayout/AppAreaLayout';
import { AppBarComponent, NavigationMenu } from '@food-app/frontend/ui';
import { NavigationMenuItems } from '../constants/menuItems';
import { useMediaQuery } from '@mui/material';
import { theme } from '../theme/theme';

export const AppPage: FC = () => {
  const isGTELaptop = useMediaQuery(theme.breakpoints.up('laptop'));

  const itemsWithAccess = NavigationMenuItems.filter(
    (menuItem) => menuItem.access
  );

  return (
    <AppLayout>
      {/* Show sidebar if screen gte laptop */}
      {isGTELaptop && (
        <AppSideBarLayout>
          <NavigationMenu menuItems={itemsWithAccess} />
        </AppSideBarLayout>
      )}
      {/* Show topbar if screen lt laptop */}
      {!isGTELaptop && (
        <AppTopBarLayout>
          <AppBarComponent menuItems={itemsWithAccess} title={'Food App'} />
        </AppTopBarLayout>
      )}
      <AppAreaLayout>
        <Outlet />
      </AppAreaLayout>
    </AppLayout>
  );
};

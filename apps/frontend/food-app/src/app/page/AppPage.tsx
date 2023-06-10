import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout/AppLayout';
import { AppSideBarLayout } from '../layout/AppLayout/AppSideBarLayout';
import { AppTopBarLayout } from '../layout/AppLayout/AppTopBarLayout';
import { AppAreaLayout } from '../layout/AppLayout/AppAreaLayout';
import { useWindowSize } from '@food-app/frontend/utils';
import {
  AppBarComponent,
  MediaMinWidthConstants,
  NavigationMenu,
} from '@food-app/frontend/ui';
import { NavigationMenuItems } from '../constants/menuItems';

export const AppPage: FC = () => {
  const { width } = useWindowSize();

  const itemsWithAccess = NavigationMenuItems.filter(
    (menuItem) => menuItem.access
  );

  return (
    <AppLayout>
      {/* Show sidebar if screen gte laptop */}
      {width >= MediaMinWidthConstants.LAPTOP && (
        <AppSideBarLayout>
          <NavigationMenu menuItems={itemsWithAccess} />
        </AppSideBarLayout>
      )}
      {/* Show topbar if screen lt laptop */}
      {width < MediaMinWidthConstants.LAPTOP && (
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

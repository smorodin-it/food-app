import React from 'react';
import { Outlet } from 'react-router-dom';
import AppLayout from '../layout/AppLayout/AppLayout';
import AppSideBarLayout from '../layout/AppLayout/AppSideBarLayout';
import AppTopBarLayout from '../layout/AppLayout/AppTopBarLayout';
import AppAreaLayout from '../layout/AppLayout/AppAreaLayout';

export const AppPage = (): JSX.Element => {
  return (
    <AppLayout>
      <AppSideBarLayout>Sidebar</AppSideBarLayout>
      <AppTopBarLayout>Top bar</AppTopBarLayout>
      <AppAreaLayout>
        <Outlet />
      </AppAreaLayout>
    </AppLayout>
  );
};

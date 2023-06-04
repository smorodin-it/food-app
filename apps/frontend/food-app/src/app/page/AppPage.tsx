import React, { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppLayout from '../layout/AppLayout/AppLayout';
import AppSideBarLayout from '../layout/AppLayout/AppSideBarLayout';
import AppTopBarLayout from '../layout/AppLayout/AppTopBarLayout';
import AppAreaLayout from '../layout/AppLayout/AppAreaLayout';
import { Button } from '@mui/material';
import { $api } from '@food-app/frontend/data-access/https';

export const AppPage: FC = () => {
  const [data, setData] = useState<any[]>([]);

  const handleClick = async (): Promise<void> => {
    try {
      const resp = await $api.get('/ingredient');

      if (resp) {
        setData(resp.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppLayout>
      <AppSideBarLayout>Sidebar</AppSideBarLayout>
      <AppTopBarLayout>Top bar</AppTopBarLayout>
      <AppAreaLayout>
        <Outlet />
        <Button onClick={handleClick}>Get data</Button>

        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      </AppAreaLayout>
    </AppLayout>
  );
};

import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { DrawerLeftMenuButton } from '../buttons';
import { NavigationMenuObjectsListRO } from '../menu';

interface AppBarComponent {
  title: string;
  menuItems: NavigationMenuObjectsListRO;
}

export const AppBarComponent = (props: AppBarComponent): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={'static'}>
        <Toolbar>
          <DrawerLeftMenuButton menuItems={props.menuItems} sx={{ mr: 2 }} />
          <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

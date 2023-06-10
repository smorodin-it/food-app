import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

interface AppBarComponent {
  title: string;
}

export const AppBarComponent = (props: AppBarComponent): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton
            size={'large'}
            edge={'start'}
            color={'inherit'}
            aria-label={'menu'}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

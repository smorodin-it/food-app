import { FC, useState } from 'react';
import { Box, Drawer, IconButton, SxProps, Theme } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { NavigationMenu, NavigationMenuObjectsListRO } from '../../menu';

interface DrawerLeftMenuButtonProps {
  menuItems: NavigationMenuObjectsListRO;
  sx: SxProps<Theme>;
}

export const DrawerLeftMenuButton: FC<DrawerLeftMenuButtonProps> = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuClick = (): void => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = (): void => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={props.sx}>
      <IconButton
        size={'large'}
        edge={'start'}
        color={'inherit'}
        aria-label={'menu'}
        onClick={handleMenuClick}
      >
        <Menu />
      </IconButton>
      <Drawer anchor={'left'} open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ minWidth: '23rem' }}>
          <NavigationMenu menuItems={props.menuItems} />
        </Box>
      </Drawer>
    </Box>
  );
};

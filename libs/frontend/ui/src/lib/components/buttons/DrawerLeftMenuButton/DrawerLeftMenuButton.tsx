import React, { useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
} from '@mui/material';
import { Inbox, Mail, Menu } from '@mui/icons-material';

interface DrawerLeftMenuButtonProps {
  sx: SxProps<Theme>;
}

export const DrawerLeftMenuButton = (props: DrawerLeftMenuButtonProps) => {
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
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

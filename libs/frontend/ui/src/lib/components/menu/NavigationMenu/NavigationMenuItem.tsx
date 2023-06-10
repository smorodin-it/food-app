import React, { FC, useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavigationMenuObjectRO } from '@food-app/frontend/ui';

interface NavigationMenuItemProps {
  menuItem: NavigationMenuObjectRO;
}

export const NavigationMenuItem: FC<NavigationMenuItemProps> = (props) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleMenuItemClick = (): void => {
    if (props.menuItem.children.length) {
      setOpen((prevState) => !prevState);
    } else {
      navigate(props.menuItem.route);
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleMenuItemClick}>
        <ListItemIcon>{props.menuItem.icon}</ListItemIcon>
        <ListItemText primary={props.menuItem.title} />
      </ListItemButton>
    </ListItem>
  );
};

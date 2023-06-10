import { FC } from 'react';
import { List } from '@mui/material';
import { NavigationMenuItem } from './NavigationMenuItem';
import { NavigationMenuObjectsListRO } from './types';

interface NavigationMenuProps {
  menuItems: NavigationMenuObjectsListRO;
}

export const NavigationMenu: FC<NavigationMenuProps> = (props) => {
  return (
    <List>
      {props.menuItems.map((menuItem) => (
        <NavigationMenuItem key={menuItem.title} menuItem={menuItem} />
      ))}
    </List>
  );
};

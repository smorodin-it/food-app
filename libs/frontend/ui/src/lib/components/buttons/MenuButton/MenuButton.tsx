import React, { ReactNode, useState, MouseEvent, FC } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  PopoverOrigin,
  Tooltip,
  Typography,
} from '@mui/material';
import { defaultMarginTop, defaultOrigin } from './constants';

export interface MenuItemObject {
  label: string;
  onClickHandler: () => void;
}

interface MenuButtonProps {
  btnContent: ReactNode;
  tooltip: string;
  menuItems: MenuItemObject[];
  disabled?: boolean;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  marginTop?: string | number;
}

export const MenuButton: FC<MenuButtonProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <Box flexGrow={0}>
      <Tooltip title={props.tooltip}>
        <Button onClick={handleMenuOpen} disabled={props.disabled}>
          {props.btnContent}
        </Button>
      </Tooltip>
      <Menu
        sx={{ mt: props.marginTop ?? defaultMarginTop }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={props.anchorOrigin ?? defaultOrigin}
        transformOrigin={props.transformOrigin ?? defaultOrigin}
      >
        {props.menuItems.map((item) => (
          <MenuItem key={item.label} onClick={item.onClickHandler}>
            <Typography>{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

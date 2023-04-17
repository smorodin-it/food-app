import { ReactNode } from 'react';

export interface MenuItemProps {
  menuItemValue: string | number;
  menuItemText: string;
}

export interface SelectComponentGeneralProps {
  label?: string;
  name: string;
  menuItems: MenuItemProps[];
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  helperText?: ReactNode;
}

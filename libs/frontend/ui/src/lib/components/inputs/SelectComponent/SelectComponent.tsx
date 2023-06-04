import { MenuItem, TextField } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { SelectComponentGeneralProps } from './types';

interface SelectProps {
  displayEmpty?: boolean;
}

export interface SelectComponentProps extends SelectComponentGeneralProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeCallback?: (event: ChangeEvent<HTMLInputElement>) => void;
  SelectProps?: SelectProps;
}

export const SelectComponent: FC<SelectComponentProps> = (props) => {
  const { menuItems, onChange, onChangeCallback, ...rest } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event);

    if (props.onChangeCallback) {
      props.onChangeCallback(event);
    }
  };

  return (
    <TextField onChange={handleChange} {...rest} select>
      {menuItems.map((item) => (
        <MenuItem
          key={item.menuItemValue}
          value={item.menuItemValue}
          sx={{ whiteSpace: 'initial' }}
        >
          {item.menuItemText}
        </MenuItem>
      ))}
    </TextField>
  );
};

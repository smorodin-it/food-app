import { MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { SelectComponentGeneralProps } from './types';

interface SelectMultipleComponentProps extends SelectComponentGeneralProps {
  value: string[] | number[];
  onChange: (event: SelectChangeEvent<unknown>) => void;
}

export const SelectMultipleComponent = (
  props: SelectMultipleComponentProps
): JSX.Element => {
  const { menuItems, value, onChange, ...rest } = props;
  return (
    <TextField
      {...rest}
      select
      SelectProps={{
        multiple: true,
        value: props.value,
        onChange: props.onChange,
      }}
    >
      {menuItems.map((item, key) => (
        <MenuItem key={key} value={item.menuItemValue}>
          {item.menuItemText}
        </MenuItem>
      ))}
    </TextField>
  );
};

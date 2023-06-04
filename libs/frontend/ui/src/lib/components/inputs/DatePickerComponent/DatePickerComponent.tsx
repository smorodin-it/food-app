import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { formatISO, isValid } from 'date-fns';

interface DatepickerComponentProps {
  label: string;
  name: string;
  value: string | null;
  onChange: (
    value: string | null,
    keyboardInputValue?: string | undefined
  ) => void;
  required?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  disableFuture?: boolean;
  disablePast?: boolean;
  disabled?: boolean;

  /**
   * Set value time to 23:59:59
   */
  dayEnd?: boolean;
}

export const DatePickerComponent: FC<DatepickerComponentProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleChange = (
    value: Date | null,
    keyboardInputValue?: string
  ): void => {
    if (value && isValid(value)) {
      if (props.dayEnd) {
        value.setHours(23, 59, 59);
      }
      props.onChange(formatISO(value), keyboardInputValue);
    } else {
      props.onChange(null, keyboardInputValue);
    }
  };

  return (
    <DatePicker
      label={props.label}
      value={props.value}
      onChange={handleChange}
      disableFuture={props.disableFuture}
      disablePast={props.disablePast}
      showDaysOutsideCurrentMonth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      disabled={props.disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          onClick={() => {
            if (!props.disabled) {
              setOpen(true);
            }
          }}
          name={props.name}
          required={props.required}
          error={props.error}
          helperText={props.helperText}
        />
      )}
    />
  );
};

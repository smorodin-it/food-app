import { DateTimePicker } from '@mui/x-date-pickers';
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
}

export const DateTimePickerComponent: FC<DatepickerComponentProps> = (
  props
) => {
  const [open, setOpen] = useState(false);

  const handleChange = (
    date: Date | null,
    keyboardInputValue?: string
  ): void => {
    if (date && isValid(date)) {
      props.onChange(formatISO(date), keyboardInputValue);
    } else {
      props.onChange(null, keyboardInputValue);
    }
  };

  return (
    <DateTimePicker
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

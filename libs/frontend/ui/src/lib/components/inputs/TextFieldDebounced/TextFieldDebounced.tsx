import React, {
  ChangeEvent,
  ReactNode,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { TextFieldWithCounter } from '../TextFieldWithCounter/TextFieldWithCounter';

interface TextFieldDebouncedProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  disabled?: boolean;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  type?: TextFieldProps['type'];
  autoFocus?: boolean;
}

export const TextFieldDebounced = (props: TextFieldDebouncedProps) => {
  const [value, setValue] = useState(props.value);
  const deferredValue = useDeferredValue(value);

  useEffect(() => {
    props.onChange(deferredValue);
  }, [deferredValue]);

  // If we get from props.value empty string - reset value.
  // We need this, if we reset values in formik
  useEffect(() => {
    if (props.value === '') {
      setValue(props.value);
    }
  }, [props.value]);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <TextFieldWithCounter
      name={props.name}
      value={value}
      onChange={handleChangeValue}
      label={props.label}
      required={props.required}
      error={props.error}
      helperText={props.helperText}
      disabled={props.disabled}
      type={props.type}
      maxLength={props.maxLength}
      multiline={props.multiline}
      rows={props.rows}
      minRows={props.minRows}
      maxRows={props.maxRows}
      autoFocus={props.autoFocus}
    />
  );
};

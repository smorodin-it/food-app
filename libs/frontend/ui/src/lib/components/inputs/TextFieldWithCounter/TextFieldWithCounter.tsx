import React, { ChangeEvent, FC, ReactNode } from 'react';
import { EndAdornmentStyled } from './EndAdornmentStyled';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

interface TextFieldWithCounterProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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

export const TextFieldWithCounter: FC<TextFieldWithCounterProps> = (props) => {
  return (
    <TextField
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      label={props.label}
      required={props.required}
      error={props.error}
      helperText={props.helperText}
      disabled={props.disabled}
      type={props.type}
      autoFocus={props.autoFocus}
      inputProps={{
        maxLength: props.maxLength,
      }}
      InputProps={
        props.maxLength
          ? {
              endAdornment: (
                <EndAdornmentStyled>
                  {`${props.value.toString().length} / ${props.maxLength}`}
                </EndAdornmentStyled>
              ),
            }
          : undefined
      }
      multiline={props.multiline}
      rows={props.rows}
      minRows={props.minRows}
      maxRows={props.maxRows}
    />
  );
};

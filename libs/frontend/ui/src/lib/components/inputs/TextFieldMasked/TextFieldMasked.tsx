import * as React from 'react';
import { IMaskInput } from 'react-imask';
import { RefCallback } from 'react';
import { TextField } from '@mui/material';
import { StandardTextFieldProps } from '@mui/material/TextField/TextField';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

export const TextFieldMaskedInput = React.forwardRef<HTMLElement, CustomProps>(
  function TextFieldMaskedInput(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={props.mask}
        inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

interface TextFieldMaskedProps extends StandardTextFieldProps {
  mask: string;
}

export const TextFieldMasked = (props: TextFieldMaskedProps) => {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: TextFieldMaskedInput as any,
        inputProps: { mask: props.mask },
      }}
    />
  );
};

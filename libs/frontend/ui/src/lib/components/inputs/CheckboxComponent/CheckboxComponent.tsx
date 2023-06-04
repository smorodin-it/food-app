import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { ChangeEvent, FC, ReactNode } from 'react';
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel';

interface CheckboxComponentProps {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  name?: string;
  checked?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
}

export const CheckboxComponent: FC<CheckboxComponentProps> = (props) => {
  return (
    <FormControl
      required={props.required}
      error={props.error}
      disabled={props.disabled}
    >
      <FormControlLabel
        control={
          <Checkbox
            value={props.value}
            checked={props.checked}
            name={props.name}
            onChange={props.onChange}
          />
        }
        label={<span dangerouslySetInnerHTML={{ __html: props.label }} />}
        labelPlacement={props.labelPlacement}
      />
      {!!props.helperText && (
        <FormHelperText>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

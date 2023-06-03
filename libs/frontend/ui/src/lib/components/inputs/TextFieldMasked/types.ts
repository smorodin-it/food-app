import { TextFieldProps } from '@mui/material/TextField/TextField';

export interface FormattedReturnValues {
  value: string;
  unmaskedValue: string;
  typedValue: unknown;
}

export type TextFieldMaskedOnChangeProp = (
  values: FormattedReturnValues
) => void;

type TextFieldOmitProps = 'value' | 'onChange';

export type TextFieldMaskedProps = {
  mask: string;
  value?: unknown;
  onChange?: TextFieldMaskedOnChangeProp;
} & Omit<TextFieldProps, TextFieldOmitProps>;

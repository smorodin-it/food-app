import { ChangeEvent } from 'react';

export interface NameProp {
  name: string;
}

export interface FieldValidationProps extends NameProp {
  required?: boolean;
  error: boolean;
  helperText: string | undefined;
}

export interface TextFieldValueOnChangeProps extends NameProp {
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface TextFieldValueDebouncedOnChangeProps extends NameProp {
  value: string;
  onChange: (value: string) => void;
}

export interface CheckboxValueOnChangeProps extends NameProp {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
export interface DatepickerValueOnChangeProps extends NameProp {
  value: string | null;
  onChange: (value: string | null, keyboardInputValue?: string) => void;
}

export interface SunWYSIWGEditorOnChangeProps extends NameProp {
  onChange: (content: string) => void;
  defaultValue: string;
}

export type SetPropsTextFieldObject = FieldValidationProps &
  TextFieldValueOnChangeProps;

export type SetPropsTextFieldDebouncedObject = FieldValidationProps &
  TextFieldValueDebouncedOnChangeProps;

export type SetPropsCheckboxObject = FieldValidationProps &
  CheckboxValueOnChangeProps;

export type SetPropsDatepickerObject = FieldValidationProps &
  DatepickerValueOnChangeProps;

export type SetSunWYSIWGEditorObject = FieldValidationProps &
  SunWYSIWGEditorOnChangeProps;

export type ResolveArgObj = Record<string, unknown>;

import { Dispatch, ReactNode } from 'react';

export interface MinimalAutocompleteDataOption
  extends Record<string, NonNullable<unknown>> {
  id: string;
}

export interface BaseAutocompleteProps<T> {
  options: NonNullable<T>[];
  fieldWithLabel: string;
  getOptionLabel?: (option: T) => string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderOption?: (props: Object, option: T, state?: Object) => ReactNode;
  groupBy?: (option: T) => string;
  uniqueIdentifierField?: keyof T;
  inputValue?: string;
  setInputValue?: Dispatch<string>;
  label?: string;
  required?: boolean;
  loading?: boolean;
  getOptionDisabled?: (option: T) => boolean;
  disabled?: boolean;
  onFocus?: () => Promise<void>;
  filterSelectedOptions?: boolean;
  error?: boolean;
  helperText?: string;
}

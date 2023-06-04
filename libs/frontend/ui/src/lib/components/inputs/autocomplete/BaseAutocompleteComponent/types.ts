import { Dispatch, ReactNode } from 'react';

export interface MinimalAutocompleteDataOption
  extends Record<string, NonNullable<unknown>> {
  id: string;
}

export interface BaseAutocompleteProps<T> {
  options: NonNullable<T>[];
  fieldWithLabel: string;
  getOptionLabel?: (option: T) => string;

  renderOption?: (
    props: Record<string, unknown>,
    option: T,
    state?: Record<string, unknown>
  ) => ReactNode;
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

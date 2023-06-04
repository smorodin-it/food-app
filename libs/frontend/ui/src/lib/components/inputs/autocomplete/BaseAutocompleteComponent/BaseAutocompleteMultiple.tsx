import React, { ReactElement, ReactNode, SyntheticEvent } from 'react';
import {
  Autocomplete,
  AutocompleteChangeReason,
  Chip,
  CircularProgress,
  TextField,
} from '@mui/material';
import { BaseAutocompleteProps } from './types';
import { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete/Autocomplete';
import { defaultUniqueIdentifier } from './constants';

interface BaseAutocompleteMultipleProps<T> extends BaseAutocompleteProps<T> {
  value?: string[] | null;
  onChange?: (valueIds: string[], options: T[], reason: string) => void;
  disableClearable?: true;
  renderTags?: (
    value: T[],
    getTagProps: AutocompleteRenderGetTagProps
  ) => React.ReactNode;
}

export function BaseAutocompleteMultiple<T extends Record<string, unknown>>(
  props: BaseAutocompleteMultipleProps<T>
): ReactElement {
  const handleGetValue = (): T[] | undefined => {
    if (props.value) {
      return props.options.filter((option) =>
        props.value?.includes(
          option[
            props.uniqueIdentifierField ?? defaultUniqueIdentifier
          ] as string
        )
      );
    }
    return undefined;
  };

  const handleChange = (
    event: SyntheticEvent,
    values: T[] | null,
    reason: AutocompleteChangeReason
  ): void => {
    if (values && props.onChange) {
      props.onChange(
        values.map(
          (val) =>
            val[
              props.uniqueIdentifierField ?? defaultUniqueIdentifier
            ] as string
        ),
        values,
        reason
      );
    }
  };

  return (
    <Autocomplete<T, true, true>
      multiple
      options={props.options}
      onFocus={props.onFocus}
      value={handleGetValue()}
      onChange={handleChange}
      getOptionDisabled={props.getOptionDisabled}
      disabled={props.disabled}
      disableClearable={props.disableClearable}
      getOptionLabel={(option) =>
        props.getOptionLabel
          ? props.getOptionLabel(option)
          : (option[props.fieldWithLabel] as string)
      }
      groupBy={props.groupBy}
      filterSelectedOptions={props.filterSelectedOptions}
      loading={props.loading}
      loadingText={'Загрузка...'}
      noOptionsText={'Ничего не найдено!'}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          required={props.required}
          error={props.error}
          helperText={props.helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {props.loading ? (
                  <CircularProgress color={'inherit'} size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(renderProps, option) =>
        props.renderOption ? (
          props.renderOption(renderProps as Record<string, unknown>, option)
        ) : (
          <li
            {...renderProps}
            key={
              option[
                props.uniqueIdentifierField ?? defaultUniqueIdentifier
              ] as string
            }
          >
            {option[props.fieldWithLabel] as ReactNode}
          </li>
        )
      }
      renderTags={(values, getTagProps) =>
        props.renderTags
          ? props.renderTags(values, getTagProps)
          : values.map((value, idx) => (
              <Chip
                {...getTagProps({
                  index: idx,
                })}
                label={value[props.fieldWithLabel] as string}
              />
            ))
      }
    />
  );
}

import React, { ReactElement, ReactNode, SyntheticEvent } from 'react';
import {
  Autocomplete,
  AutocompleteChangeReason,
  CircularProgress,
  TextField,
} from '@mui/material';
import { BaseAutocompleteProps, MinimalAutocompleteDataOption } from './types';
import { defaultUniqueIdentifier } from './constants';

interface BaseAutocompleteSingleProps<T> extends BaseAutocompleteProps<T> {
  value?: string | null;
  onChange?: (valueId: string, option: T, reason: string) => void;
  disableClearable?: true;
}

export function BaseAutocompleteSingle<T extends MinimalAutocompleteDataOption>(
  props: BaseAutocompleteSingleProps<T>
): ReactElement {
  const handleGetValue = (): NonNullable<T> | undefined => {
    if (props.value) {
      return props.options.find(
        (option) =>
          option[props.uniqueIdentifierField ?? defaultUniqueIdentifier] ===
          props.value
      );
    }
    return undefined;
  };

  const handleChange = (
    event: SyntheticEvent,
    value: NonNullable<T>,
    reason: AutocompleteChangeReason
  ): void => {
    if (props.onChange) {
      props.onChange(value?.id || '', value, reason);
    }
  };

  return (
    <Autocomplete<T, false, true>
      options={props.options}
      onFocus={props.onFocus}
      // FIXME: Can't set value to null and disable clearable to true.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value={handleGetValue(props.value, props.options) ?? null}
      onChange={handleChange}
      isOptionEqualToValue={(option) =>
        option[props.uniqueIdentifierField ?? defaultUniqueIdentifier] ===
        props.value
      }
      getOptionLabel={(option) =>
        props.getOptionLabel
          ? props.getOptionLabel(option)
          : (option[props.fieldWithLabel] as string)
      }
      groupBy={props.groupBy}
      filterSelectedOptions={props.filterSelectedOptions}
      disabled={props.disabled}
      getOptionDisabled={props.getOptionDisabled}
      disableClearable={props.disableClearable}
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
                  <CircularProgress color={'primary'} size={20} />
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
    />
  );
}

import { useFormikContext } from 'formik';
import { ChangeEvent } from 'react';
import {
  FieldValidationProps,
  ResolveArgObj,
  SetPropsCheckboxObject,
  SetPropsDatepickerObject,
  SetPropsTextFieldDebouncedObject,
  SetSunWYSIWGEditorObject,
} from './types';

import { SetPropsTextFieldObject } from './types';
import { ExcludeNullsAndArrays, NestedKeyOf } from '../../ts/utils';

/**
 * Позволяет получить данные из вложенного объекта
 * @param path
 * @param obj
 * @param separator
 */
function resolveData<T>(path: string, obj: unknown, separator = '.'): T {
  return path
    .split(separator)
    .reduce(
      (prev: unknown, curr: unknown) =>
        prev && (prev as ResolveArgObj)[curr as keyof ResolveArgObj],
      obj
    ) as T;
}

export function usePropsForFormik<T extends Record<keyof T, unknown>>() {
  const formik = useFormikContext<T>();

  const handleTextFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    formik.handleChange(event);
  };

  const handleTextFieldDebouncedChange = (
    name: string,
    value: string
  ): void => {
    formik.setFieldValue(name, value);
  };

  const handleCheckboxChange = (name: string, checked: boolean): void => {
    formik.setFieldValue(name, checked);
  };

  const handleDatepickerChange = (name: string, value: string | null): void => {
    formik.setFieldValue(name, value);
  };

  const handleSunWYSIWGEditor = (name: string, content: string): void => {
    formik.setFieldValue(name, content);
  };

  const setPropsForTextFieldFormik = (
    name: NestedKeyOf<ExcludeNullsAndArrays<T>>,
    required?: boolean
  ): SetPropsTextFieldObject => {
    const error = resolveData(name as string, formik.errors);
    const touched = resolveData(name as string, formik.touched);
    return {
      name: name as string,
      value: resolveData(name as string, formik.values),
      onChange: handleTextFieldChange,
      required: required,
      error: !!touched && !!error,
      helperText: touched && error ? (error as string) : undefined,
    };
  };

  const setPropsForTextFieldDebouncedFormik = (
    name: NestedKeyOf<ExcludeNullsAndArrays<T>>,
    required?: boolean
  ): SetPropsTextFieldDebouncedObject => {
    const error = resolveData(name as string, formik.errors);
    const touched = resolveData(name as string, formik.touched);

    return {
      name: name as string,
      value: resolveData(name as string, formik.values),
      onChange: (value) =>
        handleTextFieldDebouncedChange(name as string, value),
      required: required,
      error: !!touched && !!error,
      helperText: touched && error ? (error as string) : undefined,
    };
  };

  const setPropsForCheckboxFormik = (
    name: NestedKeyOf<ExcludeNullsAndArrays<T>>,
    required?: boolean
  ): SetPropsCheckboxObject => {
    const error = resolveData(name as string, formik.errors);
    const touched = resolveData(name as string, formik.touched);

    return {
      name: name as string,
      checked: resolveData(name as string, formik.values),
      onChange: (event) =>
        handleCheckboxChange(name as string, event.target.checked),
      required: required,
      error: !!touched && !!error,
      helperText: touched && error ? (error as string) : undefined,
    };
  };

  const setPropsForSunWYSIWGEditor = (
    name: NestedKeyOf<ExcludeNullsAndArrays<T>>
  ): SetSunWYSIWGEditorObject => {
    const error = resolveData(name as string, formik.errors);
    const touched = resolveData(name as string, formik.touched);

    return {
      name: name as string,
      defaultValue: resolveData(name as string, formik.values),
      onChange: (content) => handleSunWYSIWGEditor(name as string, content),
      error: !!touched && !!error,
      helperText: touched && error ? (error as string) : undefined,
    };
  };

  const setPropsForDatepickerFormik = (
    name: NestedKeyOf<ExcludeNullsAndArrays<T>>,
    required?: boolean
  ): SetPropsDatepickerObject => {
    const error = resolveData(name as string, formik.errors);
    const touched = resolveData(name as string, formik.touched);

    return {
      name: name as string,
      value: resolveData(name as string, formik.values),
      onChange: (value) => handleDatepickerChange(name as string, value),
      required: required,
      error: !!touched && !!error,
      helperText: touched && error ? (error as string) : undefined,
    };
  };

  const setPropsForTimepickerFormik = (
    name: NestedKeyOf<ExcludeNullsAndArrays<T>>,
    required?: boolean
  ): SetPropsDatepickerObject => {
    const error = resolveData(name as string, formik.errors);
    const touched = resolveData(name as string, formik.touched);

    return {
      name: name as string,
      value: resolveData(name as string, formik.values) || null,
      onChange: (value) => handleDatepickerChange(name as string, value),
      required: required,
      error: !!touched && !!error,
      helperText: touched && error ? (error as string) : undefined,
    };
  };

  const setPropsForErrorsFormik = (
    name: NestedKeyOf<ExcludeNullsAndArrays<T>>,
    required?: boolean
  ): FieldValidationProps => {
    const error = resolveData(name as string, formik.errors);
    const touched = resolveData(name as string, formik.touched);

    return {
      name: name as string,
      required: required,
      error: !!touched && !!error,
      helperText: touched && error ? (error as string) : undefined,
    };
  };

  return {
    setPropsForTextFieldFormik,
    setPropsForTextFieldDebouncedFormik,
    setPropsForCheckboxFormik,
    setPropsForDatepickerFormik,
    setPropsForTimepickerFormik,
    setPropsForErrorsFormik,
    setPropsForSunWYSIWGEditor,
    formik,
  };
}

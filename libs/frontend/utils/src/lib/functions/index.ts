import { LocalStorageFields } from '../constants';

export const getFromLocalStorage = (field: LocalStorageFields): string | null =>
  localStorage.getItem(field);

export const setToLocalStorage = (
  field: LocalStorageFields,
  data: string
): void => {
  localStorage.setItem(field, data);
};

export const removeFromLocalStorage = (field: LocalStorageFields): void => {
  localStorage.removeItem(field);
};

import { LocalStorageFields } from '../constants';

export const getFromLocalStorage = (field: LocalStorageFields): string | null =>
  localStorage.getItem(field);

const dispatchEventOnCase = (
  key: LocalStorageFields,
  oldValue: string | null,
  newValue?: string
): void => {
  let eventObject: StorageEventInit | null = null;

  switch (key) {
    case LocalStorageFields.REFRESH_TOKEN:
      eventObject = {
        key,
        oldValue,
        newValue,
        url: window.location.href,
        storageArea: localStorage,
      };
  }

  if (eventObject) {
    const storageEvent = new StorageEvent('storage', eventObject);
    window.dispatchEvent(storageEvent);
  }
};

export const setToLocalStorage = (
  key: LocalStorageFields,
  newValue: string
): void => {
  const oldValue = localStorage.getItem(key);
  localStorage.setItem(key, newValue);

  dispatchEventOnCase(key, oldValue, newValue);
};

export const removeFromLocalStorage = (key: LocalStorageFields): void => {
  const oldValue = localStorage.getItem(key);
  localStorage.removeItem(key);

  dispatchEventOnCase(key, oldValue);
};

export const isHaveTokens = (): boolean =>
  !!(
    getFromLocalStorage(LocalStorageFields.ACCESS_TOKEN) &&
    getFromLocalStorage(LocalStorageFields.REFRESH_TOKEN)
  );

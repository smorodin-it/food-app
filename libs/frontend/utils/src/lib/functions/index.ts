import {
  BroadcastAuthMessages,
  BroadcastChannels,
  LocalStorageFields,
} from '../constants';

export const checkIsDev = (): boolean => import.meta.env.DEV;

export const checkIsProd = (): boolean => import.meta.env.PROD;

export const getFromLocalStorage = (field: LocalStorageFields): string | null =>
  localStorage.getItem(field);

export const setToLocalStorage = (
  key: LocalStorageFields,
  newValue: string
): void => {
  localStorage.setItem(key, newValue);
};

export const removeFromLocalStorage = (key: LocalStorageFields): void => {
  localStorage.removeItem(key);
};

export const isHaveTokens = (): boolean =>
  !!(
    getFromLocalStorage(LocalStorageFields.ACCESS_TOKEN) &&
    getFromLocalStorage(LocalStorageFields.REFRESH_TOKEN)
  );

type BCMessages = BroadcastAuthMessages;

export const sendBroadcastMessage = (
  channel: BroadcastChannels,
  message: BCMessages
): void => {
  const bc = new BroadcastChannel(channel);
  bc.postMessage(message);
  bc.close();
};

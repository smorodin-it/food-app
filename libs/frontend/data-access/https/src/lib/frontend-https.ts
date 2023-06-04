import axios, { HttpStatusCode } from 'axios';
import { InternalAxiosRequestConfig } from 'axios/index';
import {
  BroadcastAuthMessages,
  BroadcastChannels,
  getFromLocalStorage,
  LocalStorageFields,
  removeFromLocalStorage,
  sendBroadcastMessage,
  setToLocalStorage,
} from '@food-app/frontend/utils';

declare module 'axios/index' {
  interface InternalAxiosRequestConfig {
    _isRetry?: boolean;
  }
}

export const $api = axios.create({
  baseURL: 'http://localhost:3333/api',
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const accessToken = getFromLocalStorage(LocalStorageFields.ACCESS_TOKEN);

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      const originalRequest: InternalAxiosRequestConfig | undefined =
        error.config;

      if (originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
          const refreshToken = getFromLocalStorage(
            LocalStorageFields.REFRESH_TOKEN
          );

          if (refreshToken) {
            const resp = await axios.post<{
              accessToken: string;
              refreshToken: string;
            }>('http://localhost:3333/api/auth/refresh', { refreshToken });

            if (resp) {
              setToLocalStorage(
                LocalStorageFields.ACCESS_TOKEN,
                resp.data.accessToken
              );
              setToLocalStorage(
                LocalStorageFields.REFRESH_TOKEN,
                resp.data.refreshToken
              );

              return $api.request(originalRequest);
            }
          }
        } catch (e) {
          removeFromLocalStorage(LocalStorageFields.ACCESS_TOKEN);
          removeFromLocalStorage(LocalStorageFields.REFRESH_TOKEN);

          sendBroadcastMessage(
            BroadcastChannels.AUTH,
            BroadcastAuthMessages.LOGOUT
          );
        }
      }
    }

    return error;
  }
);

import axios, { AxiosError } from 'axios';
// FIXME: Can this import something break?
import { HttpStatus } from '@nestjs/common';
import { InternalAxiosRequestConfig } from 'axios/index';
import {
  getFromLocalStorage,
  LocalStorageFields,
  removeFromLocalStorage,
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
  const accessToken = getFromLocalStorage(LocalStorageFields.ACCESS_TOKEM);

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (
      error instanceof AxiosError &&
      error.status === HttpStatus.UNAUTHORIZED
    ) {
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
            }>('http://localhost:3333/api', { refreshToken });

            if (resp) {
              setToLocalStorage(
                LocalStorageFields.ACCESS_TOKEM,
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
          console.log(e);
        }
      } else if (originalRequest && originalRequest._isRetry) {
        removeFromLocalStorage(LocalStorageFields.ACCESS_TOKEM);
        removeFromLocalStorage(LocalStorageFields.REFRESH_TOKEN);
        // await router.navigate(routes.signIn());
      }
    }

    return error;
  }
);

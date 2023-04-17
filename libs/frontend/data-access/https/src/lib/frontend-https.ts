import axios, { AxiosError } from 'axios';
// FIXME: Can this import something break?
import { HttpStatus } from '@nestjs/common';
import { InternalAxiosRequestConfig } from 'axios/index';

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
  const accessToken = localStorage.getItem('accessToken');

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
          const refreshToken = localStorage.getItem('refreshToken');

          if (refreshToken) {
            const resp = await axios.post<{
              accessToken: string;
              refreshToken: string;
            }>('http://localhost:3333/api', { refreshToken });

            if (resp) {
              localStorage.setItem('accessToken', resp.data.accessToken);
              localStorage.setItem('refreshToken', resp.data.refreshToken);

              return $api.request(originalRequest);
            }
          }
        } catch (e) {
          console.log(e);
        }
      } else if (originalRequest && originalRequest._isRetry) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        //   TODO: Implement redirect to sign in page
      }
    }

    return error;
  }
);

import axios, { CanceledError, HttpStatusCode } from 'axios';
import { InternalAxiosRequestConfig } from 'axios/index';
import {
  BroadcastAuthMessages,
  BroadcastChannels,
  sendBroadcastMessage,
} from '@food-app/frontend/utils';
import { AuthStore } from '../store/AuthStore';
import { AuthConstants } from '@food-app/backend/core';

declare module 'axios/index' {
  interface InternalAxiosRequestConfig {
    _isRetry?: boolean;
  }
}

export const $api = axios.create({
  baseURL: 'http://localhost:3333/api',
  withCredentials: true,
});

$api.interceptors.request.use((request) => {
  if (AuthStore.accessToken) {
    request.headers['Authorization'] = AuthStore.accessToken;
  }

  return request;
});

$api.interceptors.response.use(
  (response) => {
    if (response.headers[AuthConstants.responseAuthHeader]) {
      AuthStore.setAccessToken(
        response.headers[AuthConstants.responseAuthHeader]
      );
    }

    return response;
  },
  async (error) => {
    if (
      !(error instanceof CanceledError) &&
      error.response.status === HttpStatusCode.Unauthorized
    ) {
      const originalRequest: InternalAxiosRequestConfig | undefined =
        error.config;

      if (originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
          const resp = await axios.post(
            'http://localhost:3333/api/auth/refresh'
          );

          if (resp) {
            sendBroadcastMessage(BroadcastChannels.AUTH, {
              type: BroadcastAuthMessages.LOGIN,
              payload: {
                accessToken: resp.headers[AuthConstants.responseAuthHeader],
              },
            });

            return $api.request(originalRequest);
          }
        } catch (e) {
          sendBroadcastMessage(BroadcastChannels.AUTH, {
            type: BroadcastAuthMessages.LOGOUT,
          });
        }
      }
    }

    return Promise.reject(error);
  }
);

import axios from 'axios';

export function frontendHttps(): string {
  return 'frontend-https';
}

export const $api = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.0.1:3333/api',
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
    console.log(error.constructor.name);
  }
);

export const routes = {
  index: () => '/',
  signUp: () => '/sign-up',
  signIn: () => '/sign-in',
};

export enum LocalStorageFields {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export enum BroadcastChannels {
  AUTH = 'auth',
}

export enum BroadcastAuthMessages {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

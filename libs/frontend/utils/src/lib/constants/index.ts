export const routes = {
  index: () => '/',
  signUp: () => '/sign-up',
  signIn: () => '/sign-in',
};

export enum LocalStorageFields {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

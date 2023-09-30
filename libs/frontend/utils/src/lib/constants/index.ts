export const routes = {
  index: () => '/',
  signUp: () => '/sign-up',
  signIn: () => '/sign-in',
  ingredients: {
    list: () => '/ingredient',
    create: () => '/ingredient/add',
    update: (ingredientId = ':ingredientId') =>
      `/ingredient/edit/${ingredientId}`,
  },
};

export enum BroadcastChannels {
  AUTH = 'auth',
}

export enum BroadcastAuthMessages {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

import { SignInModel } from '@food-app/frontend/data-access/auth';

export const getSignInFormInitialObject = (): SignInModel => ({
  email: '',
  password: '',
});

import * as Yup from 'yup';

export const getSignInFormValidationSchema = () =>
  Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

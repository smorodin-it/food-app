import * as Yup from 'yup';

export const getSignInFormValidationSchema = () =>
  Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

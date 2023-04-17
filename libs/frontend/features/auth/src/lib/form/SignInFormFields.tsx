import { TextField } from '@mui/material';
import { usePropsForFormik } from '@food-app/frontend/utils';
import { SignInModel } from '@food-app/frontend/data-access/auth';

export const SignInFormFields = (): JSX.Element => {
  const { setPropsForTextFieldFormik } = usePropsForFormik<SignInModel>();

  return (
    <>
      <TextField
        label={'Email'}
        {...setPropsForTextFieldFormik('email', true)}
      />
      <TextField
        label={'Password'}
        type={'password'}
        {...setPropsForTextFieldFormik('password', true)}
      />
    </>
  );
};

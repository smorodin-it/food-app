import { TextField } from '@mui/material';
import { FC } from 'react';

export const SignInFormFields: FC = () => {
  return (
    <>
      <TextField label={'Email'} />
      <TextField label={'Password'} type={'password'} />
    </>
  );
};

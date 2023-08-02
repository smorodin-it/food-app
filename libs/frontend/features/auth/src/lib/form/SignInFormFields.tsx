import { FC } from 'react';
import { TextFieldFormComponent } from '@food-app/frontend/ui';

export const SignInFormFields: FC = () => {
  return (
    <>
      <TextFieldFormComponent label={'Email'} name={'email'} />
      <TextFieldFormComponent
        label={'Password'}
        name={'password'}
        type={'password'}
      />
    </>
  );
};

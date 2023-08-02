import {
  AuthService,
  AuthStore,
  SignInModel,
  signInSchema,
} from '@food-app/frontend/data-access/auth';
import { getSignInFormInitialObject } from '../utils/functions';
import { Button, Stack } from '@mui/material';
import { SignInFormFields } from './SignInFormFields';
import {
  BroadcastAuthMessages,
  BroadcastChannels,
  sendBroadcastMessage,
} from '@food-app/frontend/utils';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignInForm: FC = () => {
  const methods = useForm<SignInModel>({
    defaultValues: getSignInFormInitialObject(),
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInModel> = async (data) => {
    const resp = await AuthService.signIn({
      email: data.email,
      password: data.password,
    });

    if (resp) {
      AuthStore.processTokens(resp.data);
      sendBroadcastMessage(BroadcastChannels.AUTH, BroadcastAuthMessages.LOGIN);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack>
          <SignInFormFields />
          <Stack>
            <Button type={'submit'}>Sign In</Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
};

import { Form, FormikProvider, useFormik } from 'formik';
import {
  AuthService,
  AuthStore,
  SignInModel,
} from '@food-app/frontend/data-access/auth';
import { getSignInFormInitialObject } from '../utils/functions';
import { getSignInFormValidationSchema } from '../utils/formikValidation';
import { Button, Stack } from '@mui/material';
import { SignInFormFields } from './SignInFormFields';
import { useNavigate } from 'react-router-dom';

export const SignInForm = (): JSX.Element => {
  const navigate = useNavigate();

  const formik = useFormik<SignInModel>({
    initialValues: getSignInFormInitialObject(),
    validationSchema: getSignInFormValidationSchema(),
    onSubmit: async (values) => {
      const resp = await AuthService.signIn({
        email: values.email,
        password: values.password,
      });

      if (resp) {
        console.log(resp);
        AuthStore.setAuth(true);
        AuthStore.processTokens(resp.data);
        navigate('/');
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Stack>
          <SignInFormFields />
          <Stack>
            <Button onClick={() => formik.handleSubmit()}>Sign In</Button>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

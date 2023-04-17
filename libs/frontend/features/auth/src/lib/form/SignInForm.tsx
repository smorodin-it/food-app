import { Form, FormikProvider, useFormik } from 'formik';
import { SignInModel } from '@food-app/frontend/data-access/auth';
import { getSignInFormInitialObject } from '../utils/functions';
import { getSignInFormValidationSchema } from '../utils/formikValidation';
import { Button, Stack } from '@mui/material';
import { SignInFormFields } from './SignInFormFields';

export const SignInForm = (): JSX.Element => {
  const formik = useFormik<SignInModel>({
    initialValues: getSignInFormInitialObject(),
    validationSchema: getSignInFormValidationSchema(),
    onSubmit: async () => {
      return;
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

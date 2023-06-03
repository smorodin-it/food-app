import React from 'react';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

interface FormikLogButtonProps {
  all?: boolean;
  errors?: boolean;
  values?: boolean;
}

export const FormikLogButton = (props: FormikLogButtonProps): JSX.Element => {
  const formik = useFormikContext();

  const handleClick = (): void => {
    if (props.all || props.errors) {
      console.log(formik.errors);
    }

    if (props.all || props.values) {
      console.log(formik.values);
    }
  };

  return <Button onClick={handleClick}>LOG FORMIK</Button>;
};

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { ReactNode } from 'react';
import { Stack } from '@mui/material';
import { ButtonComponent } from '../../buttons';

interface BaseFormComponentProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  disabled?: boolean;
}

export const BaseFormComponent = <T extends FieldValues>(
  props: BaseFormComponentProps<T>
): JSX.Element => {
  return (
    <FormProvider {...props.methods}>
      <form onSubmit={props.methods.handleSubmit(props.onSubmit)}>
        <Stack>
          {props.children}
          <ButtonComponent
            type={'submit'}
            buttonText={'Submit'}
            disabled={props.disabled}
          />
        </Stack>
      </form>
    </FormProvider>
  );
};

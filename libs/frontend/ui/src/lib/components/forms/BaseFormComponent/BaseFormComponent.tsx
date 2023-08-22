import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { ReactNode } from 'react';
import { Stack } from '@mui/material';
import { ButtonComponent } from '../../buttons';
import { checkIsDev } from '@food-app/frontend/utils';
import { DevTool } from '@hookform/devtools';
import { LinearLoaderCentered } from '../../loaders';

interface BaseFormComponentProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export const BaseFormComponent = <T extends FieldValues>(
  props: BaseFormComponentProps<T>
): JSX.Element => {
  return (
    <FormProvider {...props.methods}>
      <form onSubmit={props.methods.handleSubmit(props.onSubmit)}>
        <Stack>
          {props.loading ? (
            <LinearLoaderCentered />
          ) : (
            <>
              {props.children}
              <ButtonComponent
                type={'submit'}
                buttonText={'Submit'}
                disabled={props.disabled}
              />
            </>
          )}
        </Stack>
      </form>
      {checkIsDev() && <DevTool control={props.methods.control} />}
    </FormProvider>
  );
};

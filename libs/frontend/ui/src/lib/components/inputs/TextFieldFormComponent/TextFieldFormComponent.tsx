import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { ComponentProps, FC } from 'react';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';

type TextFieldFormComponentProps = Omit<
  ComponentProps<typeof TextField>,
  keyof ControllerRenderProps
> & { name: string };

export const TextFieldFormComponent: FC<TextFieldFormComponentProps> = (
  props: TextFieldFormComponentProps
) => {
  const { name, ...rest } = props;

  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <TextField {...rest} {...field} />}
    />
  );
};

import { TextFieldFormComponent } from '@food-app/frontend/ui';
import { FC } from 'react';

interface IngredientAddEditFormFieldsProps {
  loading?: boolean;
  disabled?: boolean;
}

export const IngredientAddEditFormFields: FC<
  IngredientAddEditFormFieldsProps
> = (props) => {
  return (
    <>
      <TextFieldFormComponent
        label={'Name'}
        name={'name'}
        disabled={props.disabled}
      />
      <TextFieldFormComponent
        label={'Manufacturer'}
        name={'manufacturer'}
        disabled={props.disabled}
      />
      <TextFieldFormComponent
        label={'Barcode'}
        name={'barcode'}
        type={'number'}
        disabled={props.disabled}
      />
      <TextFieldFormComponent
        label={'Proteins'}
        name={'proteins'}
        type={'number'}
        disabled={props.disabled}
      />
      <TextFieldFormComponent
        label={'Carbs'}
        name={'carbs'}
        type={'number'}
        disabled={props.disabled}
      />
      <TextFieldFormComponent
        label={'Fats'}
        name={'fats'}
        type={'number'}
        disabled={props.disabled}
      />
      <TextFieldFormComponent
        label={'Calories'}
        name={'calories'}
        type={'number'}
        disabled={props.disabled}
      />
    </>
  );
};

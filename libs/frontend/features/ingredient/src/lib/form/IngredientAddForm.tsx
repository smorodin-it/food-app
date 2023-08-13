import {
  IngredientAddEditModel,
  ingredientAddEditModelSchema,
  IngredientService,
} from '@food-app/frontend/data-access/ingredient';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BaseFormComponent } from '@food-app/frontend/ui';
import { IngredientAddEditFormFields } from './IngredientAddEditFormFields';
import { FC, useEffect, useRef } from 'react';
import { getIngredientAddEditFormInitialObject } from '../utils/functions';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useApiHook } from '@food-app/frontend/utils';
import { ResponseAdd } from '@food-app/core';

export const IngredientAddForm: FC = () => {
  const { handleRequest: create } = useApiHook<ResponseAdd>({
    rejectMessage: 'Ошибка при отправке формы',
    resolveMessage: 'Форма успешно отправленна',
  });

  const methods = useForm<IngredientAddEditModel>({
    defaultValues: getIngredientAddEditFormInitialObject(),
    resolver: zodResolver(ingredientAddEditModelSchema),
  });

  const controllerRef = useRef(new AbortController());

  const onSubmit: SubmitHandler<IngredientAddEditModel> = async (
    data
  ): Promise<void> => {
    const resp = await create(() =>
      IngredientService.create(data, controllerRef.current)
    );

    if (resp) {
      console.log('created!', resp.id);
    }
  };

  useEffect(() => {
    return () => {
      controllerRef.current.abort();
    };
  }, []);

  return (
    <BaseFormComponent<IngredientAddEditModel>
      methods={methods}
      onSubmit={onSubmit}
    >
      <IngredientAddEditFormFields />
      <DevTool control={methods.control} />
    </BaseFormComponent>
  );
};

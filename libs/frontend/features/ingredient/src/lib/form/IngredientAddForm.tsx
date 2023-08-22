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
import { routes, useApiHook } from '@food-app/frontend/utils';
import { ResponseAdd } from '@food-app/core';
import { useNavigate } from 'react-router-dom';

export const IngredientAddForm: FC = () => {
  const { handleRequest: create } = useApiHook<ResponseAdd>({
    rejectMessage: 'Ошибка при отправке формы',
    resolveMessage: 'Форма успешно отправленна',
  });

  const methods = useForm<IngredientAddEditModel>({
    defaultValues: getIngredientAddEditFormInitialObject(),
    resolver: zodResolver(ingredientAddEditModelSchema),
  });

  const navigate = useNavigate();

  const controllerRef = useRef<AbortController | null>(null);

  const onSubmit: SubmitHandler<IngredientAddEditModel> = async (
    data
  ): Promise<void> => {
    controllerRef.current = new AbortController();

    const resp = await create(() =>
      IngredientService.create(data, controllerRef.current!)
    );

    if (resp) {
      navigate(routes.ingredients.update(resp.id));
    }
  };

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
    };
  }, []);

  return (
    <BaseFormComponent<IngredientAddEditModel>
      methods={methods}
      onSubmit={onSubmit}
    >
      <IngredientAddEditFormFields />
    </BaseFormComponent>
  );
};

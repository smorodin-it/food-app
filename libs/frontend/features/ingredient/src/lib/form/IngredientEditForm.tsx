import {
  IngredientAddEditModel,
  ingredientAddEditModelSchema,
  IngredientModel,
  IngredientService,
} from '@food-app/frontend/data-access/ingredient';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BaseFormComponent, LinearLoaderCentered } from '@food-app/frontend/ui';
import { IngredientAddEditFormFields } from './IngredientAddEditFormFields';
import { FC, useEffect, useRef, useState } from 'react';
import { getIngredientAddEditFormInitialObject } from '../utils/functions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApiHook } from '@food-app/frontend/utils';
import { ResponseStatus } from '@food-app/core';
import { useParams } from 'react-router-dom';

export const IngredientEditForm: FC = () => {
  const [loading, setLoading] = useState(true);

  const { handleRequest: retrieve } = useApiHook<IngredientModel>({
    rejectMessage: 'Ошибка при получении данных формы',
  });

  const { handleRequest: update } = useApiHook<ResponseStatus>({
    rejectMessage: 'Ошибка при отправке формы',
    resolveMessage: 'Форма успешно отправленна',
  });

  const controllerRef = useRef<AbortController | null>(null);

  const { ingredientId } = useParams<{ ingredientId: string }>();

  const methods = useForm<IngredientAddEditModel>({
    defaultValues: getIngredientAddEditFormInitialObject(),
    resolver: zodResolver(ingredientAddEditModelSchema),
  });

  const onSubmit: SubmitHandler<IngredientAddEditModel> = async (
    data
  ): Promise<void> => {
    if (ingredientId) {
      controllerRef.current = new AbortController();
      await update(() =>
        IngredientService.update(ingredientId, data, controllerRef.current!)
      );
    }
  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      controllerRef.current = new AbortController();
      let result = getIngredientAddEditFormInitialObject();

      if (ingredientId && controllerRef.current) {
        setLoading(true);
        const resp = await retrieve(() =>
          IngredientService.retrieve(ingredientId, controllerRef.current!)
        );

        if (resp) {
          result = {
            barcode: resp.barcode,
            calories: resp.calories,
            carbs: resp.carbs,
            fats: resp.fats,
            manufacturer: resp.manufacturer,
            name: resp.name,
            proteins: resp.proteins,
          };

          methods.reset(result);
          setLoading(false);
          controllerRef.current = null;
        }
      }
    };

    getData();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
        controllerRef.current = null;
      }
    };
  }, [ingredientId, methods, retrieve]);

  return loading ? (
    <LinearLoaderCentered />
  ) : (
    <BaseFormComponent<IngredientAddEditModel>
      methods={methods}
      onSubmit={onSubmit}
      loading={loading}
      disabled={methods.formState.isSubmitting}
    >
      <IngredientAddEditFormFields disabled={methods.formState.isSubmitting} />
    </BaseFormComponent>
  );
};

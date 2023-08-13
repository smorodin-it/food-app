import { useCallback, useEffect, useState } from 'react';
import {
  ButtonLinkComponent,
  CRUD_TABLE_ACTIONS,
  CrudTableComponent,
} from '@food-app/frontend/ui';
import { CrudTableSettings } from '@food-app/frontend/ui';
import { useApiHook } from '@food-app/frontend/utils';
import {
  IngredientListModel,
  IngredientService,
  IngredientStore,
} from '@food-app/frontend/data-access/ingredient';
import { ResponsePaginated } from '@food-app/core';
import { observer } from 'mobx-react-lite';

export const IngredientModule = observer((): JSX.Element => {
  const [loading, setLoading] = useState(true);

  const { handleRequest: list } = useApiHook<
    ResponsePaginated<IngredientListModel>
  >({ rejectMessage: 'Ошибка при получении списка ингридиентов' });

  const getData = useCallback(async () => {
    setLoading(true);

    const resp = await list((controller) => IngredientService.list(controller));

    if (resp) {
      IngredientStore.initData(resp);
      setLoading(false);
    }
  }, [list]);

  useEffect(() => {
    getData();

    return () => {
      IngredientStore.clear();
    };
  }, [getData]);

  const crudTableSettings: CrudTableSettings<IngredientListModel> = {
    actions: [
      {
        type: CRUD_TABLE_ACTIONS.TOP,
        renderComponent: () => {
          return <ButtonLinkComponent buttonText={'Add'} to={'/'} />;
        },
      },
      {
        type: CRUD_TABLE_ACTIONS.CELL,
        renderComponent: (object) => {
          return (
            <ButtonLinkComponent buttonText={'Edit'} to={`/${object?.id}`} />
          );
        },
      },
      {
        type: CRUD_TABLE_ACTIONS.CELL,
        renderComponent: (object) => {
          return (
            <ButtonLinkComponent buttonText={'Delete'} to={`/${object?.id}`} />
          );
        },
      },
    ],
    fields: [
      { header: 'Name', render: (object) => object.name },
      { header: 'Calories', render: (object) => object.calories },
      { header: 'Proteins', render: (object) => object.proteins },
      { header: 'Fats', render: (object) => object.fats },
      { header: 'Carbs', render: (object) => object.carbs },
    ],
  };

  return (
    <CrudTableComponent
      settings={crudTableSettings}
      loading={loading}
      storeData={IngredientStore.data}
      currentPage={1}
    />
  );
});

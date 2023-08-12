import { useCallback, useEffect } from 'react';
import {
  ButtonLinkComponent,
  CRUD_TABLE_ACTIONS,
  CrudTableComponent,
} from '@food-app/frontend/ui';
import { CrudTableSettings } from '@food-app/frontend/ui';

export const IngredientModule = (): JSX.Element => {
  const getData = useCallback(async (test: string) => {
    console.log(test);
  }, []);

  useEffect(() => {
    getData('asd');
  }, [getData]);

  const crudTableSettings: CrudTableSettings<{ id: string }> = {
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
          return <span>cell action</span>;
        },
      },
      {
        type: CRUD_TABLE_ACTIONS.CELL,
        renderComponent: (object) => {
          return <span>cell action</span>;
        },
      },
      {
        type: CRUD_TABLE_ACTIONS.CELL,
        renderComponent: (object) => {
          return <span>cell action</span>;
        },
      },
    ],
    fields: [{ header: 'test', render: (object) => 'test' }],
  };

  return (
    <CrudTableComponent
      settings={crudTableSettings}
      storeData={{
        list: [],
        total: 0,
      }}
      currentPage={1}
    />
  );
};

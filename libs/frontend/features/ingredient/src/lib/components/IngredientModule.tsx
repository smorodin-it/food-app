import { useEffect } from 'react';
import {
  CRUD_TABLE_ACTIONS,
  CrudTableComponent,
  CrudTableSettings,
} from '@food-app/frontend/ui';

export const IngredientModule = (): JSX.Element => {
  const getData = async () => {
    // const resp = .
    return;
  };

  useEffect(() => {
    getData();
  }, []);

  const crudTableSettings: CrudTableSettings<{ id: string }> = {
    actions: [
      {
        type: CRUD_TABLE_ACTIONS.TOP,
        renderComponent: () => {
          return <span>top action</span>;
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
    fields: [],
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

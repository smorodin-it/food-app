import { ObjectValue } from '@food-app/frontend/utils';

export const paginationDefaultSettings = {
  ROWS_PER_PAGE: 10,
  ROWS_PER_PAGE_OPTIONS: [10, 20, 50],
};

export const CRUD_TABLE_ACTIONS = {
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
  DETAILS: 'details',
} as const;

export type CrudTableActionsType = ObjectValue<typeof CRUD_TABLE_ACTIONS>;

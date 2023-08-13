import { IngredientAddEditModel } from '@food-app/frontend/data-access/ingredient';

export const getIngredientAddEditFormInitialObject =
  (): IngredientAddEditModel => ({
    barcode: 0,
    calories: 0,
    carbs: 0,
    fats: 0,
    manufacturer: '',
    name: '',
    proteins: 0,
  });

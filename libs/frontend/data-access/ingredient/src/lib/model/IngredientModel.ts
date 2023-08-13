export interface IngredientListModel extends Record<string, unknown> {
  id: string;
  name: string;
  proteins: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface IngredientModel {
  id: string;
  name: string;
  manufacturer: string;
  proteins: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface IngredientAddEditModel {
  name: string;
  manufacturer: string;
  proteins: number;
  carbs: number;
  fats: number;
  calories: number;
}

import { z } from 'zod';

export const ingredientListModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  proteins: z.number(),
  carbs: z.number(),
  fats: z.number(),
  calories: z.number(),
});

export type IngredientListModel = z.infer<typeof ingredientListModelSchema>;

export const ingredientModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  manufacturer: z.string(),
  proteins: z.number(),
  carbs: z.number(),
  fats: z.number(),
  calories: z.number(),
});

export type IngredientModel = z.infer<typeof ingredientModelSchema>;

export const ingredientAddEditModelSchema = z.object({
  barcode: z.coerce.number(),
  name: z.string(),
  manufacturer: z.string(),
  proteins: z.coerce.number(),
  carbs: z.coerce.number(),
  fats: z.coerce.number(),
  calories: z.coerce.number(),
});

export type IngredientAddEditModel = z.infer<
  typeof ingredientAddEditModelSchema
>;

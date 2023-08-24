import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/';

export const IngredientCreateUpdateSchema = z.object({
  name: z.string(),
  manufacturer: z.string(),
  barcode: z.string(),
  proteins: z.number(),
  carbs: z.number(),
  fats: z.number(),
  calories: z.number(),
});

export class IngredientCreateUpdateDto extends createZodDto(
  IngredientCreateUpdateSchema
) {}

export const IsDeletedSchema = z.object({
  isDeleted: z.boolean(),
});

export class IsDeletedDto extends createZodDto(IsDeletedSchema) {}

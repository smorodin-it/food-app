import { OmitType } from '@nestjs/mapped-types';

export class IngredientCreateDto {
  name!: string;
  manufacturer!: string;
  barcode!: number;
  proteins!: string;
  carbs!: string;
  fats!: string;
  calories!: string;
  userId!: string;
}

export class IngredientUpdateDto extends OmitType(IngredientCreateDto, [
  'userId',
] as const) {}

export class IsDeletedDto {
  isDeleted!: boolean;
}

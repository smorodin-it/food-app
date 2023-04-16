export class IngredientCreateUpdateDto {
  name!: string;
  manufacturer!: string;
  barcode!: number;
  proteins!: number;
  carbs!: number;
  fats!: number;
  calories!: number;
}

export class IsDeletedDto {
  isDeleted!: boolean;
}

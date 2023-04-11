import { Body, Injectable, Param } from '@nestjs/common';
import {
  Ingredient as IngredientModel,
  PrismaService,
} from '@food-app/backend/orm';
import { IngredientDto } from './backend-ingredient.dto';

@Injectable()
export class BackendIngredientService {
  constructor(private ps: PrismaService) {}

  async list(): Promise<IngredientModel[]> {
    return this.ps.ingredient.findMany();
  }

  async retrieve(
    @Param() ingredientId: string
  ): Promise<IngredientModel | null> {
    return this.ps.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
    });
  }

  async create(@Body() dto: IngredientDto): Promise<{ id: string }> {
    return this.ps.ingredient.create({
      data: {} as IngredientModel,
    });
  }
}

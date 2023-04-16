import { Injectable } from '@nestjs/common';
import {
  Ingredient as IngredientModel,
  PrismaService,
} from '@food-app/backend/orm';
import {
  IngredientCreateDto,
  IngredientUpdateDto,
  IsDeletedDto,
} from './backend-ingredient.dto';

@Injectable()
export class BackendIngredientService {
  constructor(private ps: PrismaService) {}

  async list(): Promise<IngredientModel[]> {
    return this.ps.ingredient.findMany();
  }

  async retrieve(ingredientId: string): Promise<IngredientModel | null> {
    return this.ps.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
    });
  }

  async create(dto: IngredientCreateDto): Promise<{ id: string }> {
    const ingredient = await this.ps.ingredient.create({
      data: {
        barcode: dto.barcode,
        name: dto.name,
        manufacturer: dto.manufacturer,
        userId: dto.userId,
        calories: dto.calories,
        proteins: dto.proteins,
        fats: dto.fats,
        carbs: dto.carbs,
      },
    });

    return {
      id: ingredient.id,
    };
  }

  async update(
    ingredientId: string,
    dto: IngredientUpdateDto
  ): Promise<{ status: boolean }> {
    const ingredient = await this.ps.ingredient.update({
      where: {
        id: ingredientId,
      },
      data: {
        barcode: dto.barcode,
        name: dto.name,
        manufacturer: dto.manufacturer,
        calories: dto.calories,
        proteins: dto.proteins,
        fats: dto.fats,
        carbs: dto.carbs,
      },
    });

    return {
      status: !!ingredient,
    };
  }

  async setIsDeletedStatus(
    ingredientId: string,
    dto: IsDeletedDto
  ): Promise<{ status: boolean }> {
    const ingredient = await this.ps.ingredient.update({
      where: {
        id: ingredientId,
      },
      data: {
        isDeleted: dto.isDeleted,
      },
    });

    return {
      status: !!ingredient,
    };
  }
}
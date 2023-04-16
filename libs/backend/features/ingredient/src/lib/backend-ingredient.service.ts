import { Injectable } from '@nestjs/common';
import {
  Ingredient as IngredientModel,
  PrismaService,
} from '@food-app/backend/orm';
import {
  IngredientCreateUpdateDto,
  IsDeletedDto,
} from './backend-ingredient.dto';
import { BackendClsStoreService } from '@food-app/backend/cls-store';

@Injectable()
export class BackendIngredientService {
  constructor(private ps: PrismaService, private cls: BackendClsStoreService) {}

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

  async retrieveByBarcode(barcode: number): Promise<IngredientModel | null> {
    return this.ps.ingredient.findUnique({
      where: { barcode },
    });
  }

  async create(dto: IngredientCreateUpdateDto): Promise<{ id: string }> {
    const ingredient = await this.ps.ingredient.create({
      data: {
        barcode: dto.barcode,
        name: dto.name,
        manufacturer: dto.manufacturer,
        calories: dto.calories,
        proteins: dto.proteins,
        fats: dto.fats,
        carbs: dto.carbs,
        User: {
          connect: {
            id: this.cls.get('user.id'),
          },
        },
      },
    });

    return {
      id: ingredient.id,
    };
  }

  async update(
    ingredientId: string,
    dto: IngredientCreateUpdateDto
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

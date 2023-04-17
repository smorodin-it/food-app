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

export type IngredientListResponse = Pick<
  IngredientModel,
  'id' & 'name' & 'calories' & 'proteins' & 'fats' & 'carbs'
>;

export type IngredientResponse = Pick<
  IngredientModel,
  'id' & 'name' & 'manufacturer' & 'calories' & 'proteins' & 'fats' & 'carbs'
>;

@Injectable()
export class BackendIngredientService {
  constructor(private ps: PrismaService, private cls: BackendClsStoreService) {}

  async list(): Promise<IngredientListResponse[]> {
    return this.ps.ingredient.findMany({
      select: {
        id: true,
        name: true,
        calories: true,
        proteins: true,
        fats: true,
        carbs: true,
      },
    });
  }

  async retrieve(ingredientId: string): Promise<IngredientResponse | null> {
    return this.ps.ingredient.findUnique({
      where: {
        id: ingredientId,
      },
      select: {
        id: true,
        name: true,
        manufacturer: true,
        calories: true,
        proteins: true,
        fats: true,
        carbs: true,
      },
    });
  }

  async retrieveByBarcode(barcode: number): Promise<IngredientResponse | null> {
    return this.ps.ingredient.findUnique({
      where: { barcode },
      select: {
        id: true,
        name: true,
        manufacturer: true,
        calories: true,
        proteins: true,
        fats: true,
        carbs: true,
      },
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

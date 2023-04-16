import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BackendIngredientService } from './backend-ingredient.service';
import { Ingredient as IngredientModel } from '@food-app/backend/orm';
import {
  IngredientCreateDto,
  IngredientUpdateDto,
  IsDeletedDto,
} from './backend-ingredient.dto';

@Controller('ingredient')
export class BackendIngredientController {
  constructor(private is: BackendIngredientService) {}

  @Get('/')
  async list(): Promise<IngredientModel[]> {
    return this.is.list();
  }

  @Post('/')
  async create(@Body() dto: IngredientCreateDto): Promise<{ id: string }> {
    return this.is.create(dto);
  }

  @Get('/:id')
  async retrieve(
    @Param('id') ingredientId: string
  ): Promise<IngredientModel | null> {
    return this.is.retrieve(ingredientId);
  }

  @Put('/:id')
  async update(
    @Param('id') ingredientId: string,
    @Body() dto: IngredientUpdateDto
  ) {
    return this.is.update(ingredientId, dto);
  }

  @Patch('/delete/:id')
  async delete(@Param('id') ingredientId: string, @Body() dto: IsDeletedDto) {
    return this.is.setIsDeletedStatus(ingredientId, dto);
  }
}

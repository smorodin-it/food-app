import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BackendIngredientService } from './backend-ingredient.service';
import { Ingredient as IngredientModel } from '@food-app/backend/orm';
import {
  IngredientCreateUpdateDto,
  IsDeletedDto,
} from './backend-ingredient.dto';
import { Request } from 'express';

@Controller('ingredient')
export class BackendIngredientController {
  constructor(private is: BackendIngredientService) {}

  @Get('/')
  async list(): Promise<IngredientModel[]> {
    return this.is.list();
  }

  @Post('/')
  async create(
    @Body() dto: IngredientCreateUpdateDto
  ): Promise<{ id: string }> {
    const ingredient = await this.is.create(dto);

    return { id: ingredient.id };
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
    @Body() dto: IngredientCreateUpdateDto
  ) {
    return this.is.update(ingredientId, dto);
  }

  @Patch('/delete/:id')
  async delete(@Param('id') ingredientId: string, @Body() dto: IsDeletedDto) {
    return this.is.setIsDeletedStatus(ingredientId, dto);
  }

  @Get('/barcode/:barcode')
  async retrieveByBarcode(
    @Param('barcode', ParseIntPipe) barcode: number
  ): Promise<IngredientModel | null> {
    return this.is.retrieveByBarcode(barcode);
  }
}

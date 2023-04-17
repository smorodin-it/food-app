import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  BackendIngredientService,
  IngredientListResponse,
  IngredientResponse,
} from './backend-ingredient.service';
import {
  IngredientCreateUpdateDto,
  IsDeletedDto,
} from './backend-ingredient.dto';

@Controller('ingredient')
export class BackendIngredientController {
  constructor(private is: BackendIngredientService) {}

  @Get('/')
  async list(): Promise<IngredientListResponse[]> {
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
  ): Promise<IngredientResponse | null> {
    return this.is.retrieve(ingredientId);
  }

  @Put('/:id')
  async update(
    @Param('id') ingredientId: string,
    @Body() dto: IngredientCreateUpdateDto
  ): Promise<{ status: boolean }> {
    return this.is.update(ingredientId, dto);
  }

  @Patch('/delete/:id')
  async delete(
    @Param('id') ingredientId: string,
    @Body() dto: IsDeletedDto
  ): Promise<{ status: boolean }> {
    return this.is.setIsDeletedStatus(ingredientId, dto);
  }

  @Get('/barcode/:barcode')
  async retrieveByBarcode(
    @Param('barcode', ParseIntPipe) barcode: number
  ): Promise<IngredientResponse | null> {
    return this.is.retrieveByBarcode(barcode);
  }
}

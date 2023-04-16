import { Module } from '@nestjs/common';
import { BackendIngredientController } from './backend-ingredient.controller';
import { BackendIngredientService } from './backend-ingredient.service';

@Module({
  controllers: [BackendIngredientController],
  providers: [BackendIngredientService],
  exports: [BackendIngredientService],
})
export class BackendIngredientModule {}

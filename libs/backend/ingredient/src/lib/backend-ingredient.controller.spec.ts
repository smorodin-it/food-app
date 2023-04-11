import { Test } from '@nestjs/testing';
import { BackendIngredientController } from './backend-ingredient.controller';
import { BackendIngredientService } from './backend-ingredient.service';

describe('BackendIngredientController', () => {
  let controller: BackendIngredientController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendIngredientService],
      controllers: [BackendIngredientController],
    }).compile();

    controller = module.get(BackendIngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

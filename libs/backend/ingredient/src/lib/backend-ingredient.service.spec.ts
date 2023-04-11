import { Test } from '@nestjs/testing';
import { BackendIngredientService } from './backend-ingredient.service';

describe('BackendIngredientService', () => {
  let service: BackendIngredientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendIngredientService],
    }).compile();

    service = module.get(BackendIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

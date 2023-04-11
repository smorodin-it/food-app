import { Controller } from '@nestjs/common';
import { BackendIngredientService } from './backend-ingredient.service';

@Controller('backend-ingredient')
export class BackendIngredientController {
  constructor(private backendIngredientService: BackendIngredientService) {}
}
